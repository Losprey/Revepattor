// Mealnest — Data init, migrations, export, Pexels
// ==========================================

// ======================== DATA ========================
// Default recipes loaded from external JSON to save 74KB
var FALLBACK_RECIPES = [
  {id:1,name:'Nový recept',nameEn:'New recipe',category:'Hlavné jedlá',time:30,image:'',imageData:'',ingredients:['Surovina 1','Surovina 2'],ingredientsEn:['Ingredient 1','Ingredient 2'],steps:['Krok 1','Krok 2'],stepsEn:['Step 1','Step 2'],tags:[],tagsEn:[],rating:0,notes:'',notesEn:'',favorite:false,nutrition:{kcal:0,protein:0,fat:0,carbs:0}}
];

async function loadDefaultRecipes() {
  if (recipes && recipes.length > 0) return;
  try {
    var resp = await fetch('recipes-default.json');
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    var data = await resp.json();
    if (data && data.length > 5) {
      recipes = data;
      saveToLS();
      refreshActiveTab();
      return;
    }
  } catch(e) {
    // Silent fail - use minimal fallback
  }
  // If fetch failed, use minimal fallback
  if (!recipes || recipes.length === 0) {
    recipes = JSON.parse(JSON.stringify(FALLBACK_RECIPES));
    saveToLS();
  }
}

// Migrate old raw localStorage data to namespaced keys BEFORE loading data
(function migrateOldDataIfNeeded() {
  if (window._lsGet.call(localStorage, '_migrated_v2') === '1') return;
  const dataKeys = ['mealPlan','mealPlanKids','planType','shoppingItems','tasks','recipes','cookingHistory'];
  dataKeys.forEach(k => {
    var raw = window._lsGet.call(localStorage, k);
    if (raw !== null) { window._lsSet.call(localStorage, storeNs + k, raw); }
  });
  window._lsSet.call(localStorage, '_migrated_v2', '1');
})();

// One-time: clear old Pexels caches and force re-fetch on v1.0.4+
(function migrateClearImageCache() {
  if (window._lsGet.call(localStorage, '_imgcache_cleared_v4') === '1') return;
  // Remove old pexels caches
  try { localStorage.removeItem('pexels_cache_v2'); } catch(e) {}
  try { localStorage.removeItem('pexels_cache_v3'); } catch(e) {}
  // Strip all pexels/placehold image URLs to force fresh fetch
  try {
    const rawRecipes = window._lsGet.call(localStorage, storeNs + 'recipes');
    if (rawRecipes) {
      const arr = JSON.parse(rawRecipes);
      let changed = false;
      arr.forEach(r => {
        if (r.image && (r.image.includes('pexels.com') || r.image.includes('placehold.co'))) {
          r.image = '';
          changed = true;
        }
      });
      if (changed) window._lsSet.call(localStorage, storeNs + 'recipes', JSON.stringify(arr));
    }
  } catch(e) {}
  window._lsSet.call(localStorage, '_imgcache_cleared_v4', '1');
})();

let recipes = (function() { var parsed = JSON.parse(localStorage.getItem('recipes') || 'null'); if (!parsed || !Array.isArray(parsed) || parsed.length === 0) { setTimeout(loadDefaultRecipes, 200); return []; } return parsed.filter(function(r) { return r != null && typeof r === 'object'; }); })();
// Migrate: add allergens/difficulty if missing
recipes = recipes.filter(function(r) { return r != null && typeof r === 'object'; }).map(r => ({
  ...r,
  allergens: r.allergens || [],
  difficulty: r.difficulty || (r.time <= 15 ? 1 : r.time <= 35 ? 2 : 3),
}));
let editingId = null, viewingId = null;
let cookingStep = 0, cookingRecipeId = null, cookingTimer = null, cookingTimerRunning = false, cookingTimerSeconds = 0;
let voiceRecognition = null, voiceListening = false;
let ingredientSearchSelected = new Set();
let currentPortion = 2, basePortion = 2;
let cookingHistory = (() => { try { return JSON.parse(localStorage.getItem('cookingHistory') || '[]'); } catch(e) { return []; } })();
const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
let mealPlan = (() => { try { return JSON.parse(localStorage.getItem('mealPlan') || '{}'); } catch(e) { return {}; } })();
let mealPlanKids = (() => { try { return JSON.parse(localStorage.getItem('mealPlanKids') || '{}'); } catch(e) { return {}; } })();
let planType = localStorage.getItem('planType') || 'adults';
let plannerWeekOffset = 0;
let _selectedPlannerDay = (new Date().getDay() + 6) % 7; // Today's index

function getWeekKey(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().slice(0, 10);
}

function getWeekLabel(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  const start = new Date(d);
  const end = new Date(d); end.setDate(end.getDate() + 6);
  return `${start.getDate()}.${start.getMonth()+1}. - ${end.getDate()}.${end.getMonth()+1}.${end.getFullYear()}`;
}

function plannerWeekStart(offset) {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7) + offset * 7);
  return monday;
}

function currentWeekKey() {
  return getWeekKey(plannerWeekStart(plannerWeekOffset));
}

function getWeekPlan(weekKey) {
  const plan = planType === 'kids' ? mealPlanKids : mealPlan;
  if (!plan[weekKey]) {
    plan[weekKey] = {};
    DAYS.forEach(d => { plan[weekKey][d] = {}; });
  }
  return plan[weekKey];
}

function saveWeekPlan() {
  localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  localStorage.setItem('mealPlanKids', JSON.stringify(mealPlanKids));
  localStorage.setItem('planType', planType);
}

// Migrate old flat mealPlan to week-based
(function() {
  const keys = Object.keys(mealPlan);
  if (keys.length && DAYS.includes(keys[0])) {
    const wk = getWeekKey(new Date());
    mealPlan[wk] = mealPlan;
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  }
})();

// ======================== LANGUAGE ========================
function t(key, enFallback) {
  if (enFallback !== undefined) return appSettings.lang === 'en' ? enFallback : key;
  return (LANG[lang] && LANG[lang][key]) || LANG.sk[key] || key;
}

function applyLang() {
  document.documentElement.lang = lang === 'en' ? 'en' : 'sk';
  const loginSub = document.getElementById('login-sub');
  if (loginSub) loginSub.textContent = lang === 'en'
    ? 'Save your meal plan, shopping list and tasks across devices.'
    : 'Ulož si jedálniček, nákupný zoznam a úlohy naprieč zariadeniami.';
  const loginGoogleLabel = document.getElementById('login-google-label');
  if (loginGoogleLabel) loginGoogleLabel.textContent = lang === 'en' ? 'Continue with Google' : 'Pokračovať cez Google';
  const loginGuestBtn = document.getElementById('login-guest-btn');
  if (loginGuestBtn) loginGuestBtn.textContent = lang === 'en' ? 'Continue without signing in' : 'Pokračovať bez prihlásenia';
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.dataset.lang;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if ('placeholder' in el) el.placeholder = t(key);
    } else {
      // preserve leading emoji/icons
      const txt = t(key);
      if (el.children.length === 0 || (el.children.length === 1 && el.querySelector('span'))) {
        el.textContent = txt;
      } else {
        // Set text on text nodes only or last child
        const spans = el.querySelectorAll('span');
        if (spans.length === 1 && spans[0].dataset.lang) {
          spans[0].textContent = txt.replace(/^[^\w]*\s*/,'');
        }
      }
    }
  });
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) langToggle.textContent = lang === 'en' ? '🇸🇰 SK' : '🇬🇧 EN';
  // Show/hide English name field in form
  const nameEnGroup = document.getElementById('name-en-group');
  if (nameEnGroup) nameEnGroup.style.display = lang === 'en' ? 'block' : 'none';
  // Update form title
  const formTitle = document.getElementById('form-title');
  if (editingId !== null) {
    if (formTitle) formTitle.textContent = t('formTitle') + ' (edit)';
  } else {
    if (formTitle) formTitle.textContent = t('formTitle');
  }
  // Planner labels
  const phTitle = document.getElementById('planner-hero-title'); if (phTitle) phTitle.textContent = lang==='en'?'📅 Meal Planner':'📅 Plánovač jedál';
  const phSub = document.getElementById('planner-hero-sub'); if (phSub) phSub.textContent = lang==='en'?'Plan the whole week in a few taps':'Naplánuj si celý týždeň na pár kliknutí';
  const phBtns = document.querySelectorAll('#planner-hero .hero-header-actions .btn');
  if (phBtns[0]) phBtns[0].textContent = lang==='en'?'🤖 AI week':'🤖 AI týždeň';
  if (phBtns[1]) phBtns[1].textContent = '↺ Reset';
  const ptA = document.getElementById('pt-adults-label'); if (ptA) ptA.textContent = lang==='en'?'Adults':'Dospelí';
  const ptK = document.getElementById('pt-kids-label'); if (ptK) ptK.textContent = lang==='en'?'Kids':'Deti';
  const plnThis = document.getElementById('pln-this'); if (plnThis) plnThis.textContent = lang==='en'?'This week':'Tento t\u00fd\u017ede\u0148';
  const plnNext = document.getElementById('pln-next'); if (plnNext) plnNext.textContent = lang==='en'?'Next week':'Bud\u00faci t\u00fd\u017ede\u0148';
  const paC = document.getElementById('pa-clear-label'); if (paC) paC.textContent = lang==='en'?'Clear current week':'Vymazať aktuálny týždeň';
  const paA = document.getElementById('pa-ai-label'); if (paA) paA.textContent = lang==='en'?'📝 AI Shop':'📝 AI nákup';
  const pipMealsLabel = document.getElementById('pip-meals-label'); if (pipMealsLabel) pipMealsLabel.textContent = lang==='en'?'meals':'jedál';
  const aiTip = document.getElementById('dash-ai-label'); if (aiTip) aiTip.textContent = lang==='en'?'AI tip of the day':'AI tip dňa';
  const rab = document.getElementById('recipe-ai-btn'); if (rab) { rab.textContent = lang==='en'?'🤖 What to cook?':'🤖 Čo uvariť?'; rab.title = lang==='en'?'AI suggestion from your ingredients':'AI návrh z vašich surovín'; }
  // Category dropdowns
  const cats = ['Hlavné jedlá','Polievky','Šaláty','Dezerty','Pečivo','Nápoje','Predjedlá','Raňajky','Prílohy','Detské'];
  ['filter-category','r-category','ingr-category'].forEach(id => {
    const sel = document.getElementById(id); if (!sel) return;
    const val = sel.value;
    const opts = sel.querySelectorAll('option:not([value=""])');
    opts.forEach((opt,i) => { if (cats[i]) opt.textContent = catLabel(cats[i]); });
    sel.value = val;
  });
  // Form placeholders
  [['shop-item-name','Názov potraviny','Food name'],['shop-item-amount','Množstvo','Quantity'],['shop-item-unit','Jednotka (g, ks, ml...)','Unit (g, pcs, ml...)'],['shop-item-note','Poznámka (voliteľné)','Note (optional)'],['task-title','Názov úlohy','Task title'],['task-note','✏️ Poznámka (voliteľné)','✏️ Note (optional)']].forEach(p => { const el=document.getElementById(p[0]); if(el) el.placeholder = lang==='en'?p[2]:p[1]; });
  [['r-kcal','🔥 kcal / porcia','🔥 kcal / serving'],['r-protein','💪 bielkoviny g','💪 protein g'],['r-fat','🧈 tuky g','🧈 fat g'],['r-carbs','🍚 sacharidy g','🍚 carbs g']].forEach(p => { const el=document.getElementById(p[0]); if(el) el.placeholder = lang==='en'?p[2]:p[1]; });
  // FAB
  const fbt = document.getElementById('fab-btn-task'); if (fbt) fbt.textContent = lang==='en'?'✅ Task':'✅ Úloha';
  const fbm = document.getElementById('fab-btn-meal'); if (fbm) fbm.textContent = lang==='en'?'🍽️ Meal':'🍽️ Jedlo';
  const fbf = document.getElementById('fab-btn-food'); if (fbf) fbf.textContent = lang==='en'?'🛒 Grocery':'🛒 Potravina';
  updateMainHeader(document.body.dataset.tab || 'dashboard');
}

function updateMainHeader(tab, count) {
  const title = document.getElementById('main-title');
  if (!title) return;
  const titles = {
    dashboard: '',
    home: lang === 'en' ? '📖 Recipes' : '📖 Recepty',
    planner: lang === 'en' ? '🍽️ Meal Planner' : '🍽️ Plánovač jedál',
    shopping: lang === 'en' ? '🛒 Shopping' : '🛒 Nákup',
    tasks: lang === 'en' ? '✅ Tasks' : '✅ Úlohy',
    board: lang === 'en' ? '📌 Board' : '📌 Nástenka'
  };
  const label = titles[tab] || titles.home;
  title.innerHTML = esc(label) + ' <span id="recipe-count" style="font-size:.75rem;opacity:.7;font-weight:400;"></span>';
  const countEl = document.getElementById('recipe-count');
  if (countEl) countEl.textContent = count != null ? '(' + count + ')' : '';
}

// Dark mode is always on — toggle was removed

function switchLang() {
  appSettings.lang = lang === 'en' ? 'sk' : 'en';
  saveSettings();
}

function setAgeFilter(age) {
  ageFilter = age;
  document.querySelectorAll('#age-filter .age-btn').forEach(b => {
    const isActive = b.dataset.age === age;
    b.classList.toggle('active', isActive);
    if (isActive) springBounce(b);
  });
  render();
}

function matchesAgeFilter(recipe) {
  if (!ageFilter) return true;
  const map = { 'baby-6m': ['deti-6m','baby-6m'], 'baby-1': ['deti-1','baby-1y'], 'baby-2': ['deti-2','baby-2y'], 'baby-3': ['deti-3','baby-3y'] };
  const targets = map[ageFilter] || []; const rtags = [...(recipe.tags||[]), ...(recipe.tagsEn||[])];
  return targets.some(t => rtags.includes(t));
}

// ======================== THEME ========================
// ======================== PEXELS IMAGE SERVICE ========================
const IMG_CACHE_KEY = 'pexels_cache_v3';
// Preloaded images fetched at build time — avoids 89 Pexels API calls on first load
const PRELOADED_IMAGES = {"1":"https://images.pexels.com/photos/5807022/pexels-photo-5807022.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","2":"https://images.pexels.com/photos/37043949/pexels-photo-37043949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","3":"https://images.pexels.com/photos/4115066/pexels-photo-4115066.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","4":"https://images.pexels.com/photos/7462819/pexels-photo-7462819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","5":"https://images.pexels.com/photos/53483/strawberries-crepe-dessert-sweet-53483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","6":"https://images.pexels.com/photos/4202387/pexels-photo-4202387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","7":"https://images.pexels.com/photos/27381566/pexels-photo-27381566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","8":"https://images.pexels.com/photos/10422365/pexels-photo-10422365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","9":"https://images.pexels.com/photos/37275056/pexels-photo-37275056.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","10":"https://images.pexels.com/photos/37043949/pexels-photo-37043949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","11":"https://images.pexels.com/photos/5639482/pexels-photo-5639482.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","12":"https://images.pexels.com/photos/17872670/pexels-photo-17872670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","13":"https://images.pexels.com/photos/11256670/pexels-photo-11256670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","14":"https://images.pexels.com/photos/34307857/pexels-photo-34307857.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","15":"https://images.pexels.com/photos/6612672/pexels-photo-6612672.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","16":"https://images.pexels.com/photos/12118045/pexels-photo-12118045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","17":"https://images.pexels.com/photos/9170501/pexels-photo-9170501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","18":"https://images.pexels.com/photos/30895291/pexels-photo-30895291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","19":"https://images.pexels.com/photos/14966000/pexels-photo-14966000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","20":"https://images.pexels.com/photos/7111387/pexels-photo-7111387.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","21":"https://images.pexels.com/photos/7936680/pexels-photo-7936680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","22":"https://images.pexels.com/photos/4099238/pexels-photo-4099238.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","23":"https://images.pexels.com/photos/12927134/pexels-photo-12927134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","24":"https://images.pexels.com/photos/11132399/pexels-photo-11132399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","25":"https://images.pexels.com/photos/273825/pexels-photo-273825.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","26":"https://images.pexels.com/photos/15058965/pexels-photo-15058965.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","27":"https://images.pexels.com/photos/31779538/pexels-photo-31779538.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","28":"https://images.pexels.com/photos/13458086/pexels-photo-13458086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","29":"https://images.pexels.com/photos/6287376/pexels-photo-6287376.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","30":"https://images.pexels.com/photos/10338434/pexels-photo-10338434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","31":"https://images.pexels.com/photos/31953510/pexels-photo-31953510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","32":"https://images.pexels.com/photos/6046493/pexels-photo-6046493.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","33":"https://images.pexels.com/photos/273825/pexels-photo-273825.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","34":"https://images.pexels.com/photos/33088383/pexels-photo-33088383.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","35":"https://images.pexels.com/photos/13458086/pexels-photo-13458086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","36":"https://images.pexels.com/photos/7469395/pexels-photo-7469395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","37":"https://images.pexels.com/photos/1277483/pexels-photo-1277483.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","38":"https://images.pexels.com/photos/5639445/pexels-photo-5639445.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","39":"https://images.pexels.com/photos/35695377/pexels-photo-35695377.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","40":"https://images.pexels.com/photos/3832348/pexels-photo-3832348.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","41":"https://images.pexels.com/photos/7282789/pexels-photo-7282789.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","42":"https://images.pexels.com/photos/18535642/pexels-photo-18535642.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","43":"https://images.pexels.com/photos/9213914/pexels-photo-9213914.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","44":"https://images.pexels.com/photos/17749740/pexels-photo-17749740.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","45":"https://images.pexels.com/photos/19051901/pexels-photo-19051901.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","46":"https://images.pexels.com/photos/36040964/pexels-photo-36040964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","47":"https://images.pexels.com/photos/10338448/pexels-photo-10338448.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","48":"https://images.pexels.com/photos/7715715/pexels-photo-7715715.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","49":"https://images.pexels.com/photos/730922/pancakes-food-eat-breakfast-730922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","50":"https://images.pexels.com/photos/11190138/pexels-photo-11190138.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","51":"https://images.pexels.com/photos/5793/food-healthy-hand-cooking.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","52":"https://images.pexels.com/photos/25946547/pexels-photo-25946547.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","53":"https://images.pexels.com/photos/248428/pexels-photo-248428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","54":"https://images.pexels.com/photos/273825/pexels-photo-273825.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","55":"https://images.pexels.com/photos/8520760/pexels-photo-8520760.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","56":"https://images.pexels.com/photos/4784025/pexels-photo-4784025.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","57":"https://images.pexels.com/photos/16725422/pexels-photo-16725422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","58":"https://images.pexels.com/photos/9673804/pexels-photo-9673804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","59":"https://images.pexels.com/photos/8880741/pexels-photo-8880741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","60":"https://images.pexels.com/photos/9089767/pexels-photo-9089767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","61":"https://images.pexels.com/photos/3768316/pexels-photo-3768316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","62":"https://images.pexels.com/photos/15813489/pexels-photo-15813489.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","63":"https://images.pexels.com/photos/35290622/pexels-photo-35290622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","64":"https://images.pexels.com/photos/3926126/pexels-photo-3926126.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","65":"https://images.pexels.com/photos/3810779/pexels-photo-3810779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","66":"https://images.pexels.com/photos/9305088/pexels-photo-9305088.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","67":"https://images.pexels.com/photos/36242488/pexels-photo-36242488.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","68":"https://images.pexels.com/photos/29172200/pexels-photo-29172200.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","69":"https://images.pexels.com/photos/9213963/pexels-photo-9213963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","70":"https://images.pexels.com/photos/4451834/pexels-photo-4451834.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","71":"https://images.pexels.com/photos/142579/pexels-photo-142579.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","72":"https://images.pexels.com/photos/31965033/pexels-photo-31965033.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","73":"https://images.pexels.com/photos/19837090/pexels-photo-19837090.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","74":"https://images.pexels.com/photos/14909203/pexels-photo-14909203.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","75":"https://images.pexels.com/photos/142579/pexels-photo-142579.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","76":"https://images.pexels.com/photos/20220708/pexels-photo-20220708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","77":"https://images.pexels.com/photos/7253549/pexels-photo-7253549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","78":"https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","79":"https://images.pexels.com/photos/5953837/pexels-photo-5953837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","80":"https://images.pexels.com/photos/18602417/pexels-photo-18602417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","81":"https://images.pexels.com/photos/5374414/pexels-photo-5374414.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","82":"https://images.pexels.com/photos/8056670/pexels-photo-8056670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","83":"https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","84":"https://images.pexels.com/photos/14966000/pexels-photo-14966000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","85":"https://images.pexels.com/photos/36897343/pexels-photo-36897343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","86":"https://images.pexels.com/photos/7352787/pexels-photo-7352787.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","87":"https://images.pexels.com/photos/1321884/pexels-photo-1321884.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","88":"https://images.pexels.com/photos/4397236/pexels-photo-4397236.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","89":"https://images.pexels.com/photos/1194369/pexels-photo-1194369.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"};

function getImageCache() {
  try { return JSON.parse(localStorage.getItem(IMG_CACHE_KEY) || '{}'); } catch(e) { return {}; }
}
function setImageCache(id, url) {
  const cache = getImageCache();
  cache[id] = url;
  try { localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(cache)); } catch(e) {}
}

function translateRecipeQuery(name) {
  const map = {
    'batatové pyré': 'sweet potato puree',
    'batatový': 'sweet potato', 'batatové': 'sweet potato', 'batatová': 'sweet potato',
    'bataty': 'sweet potato',
    'pyré': 'puree',
    'špagety': 'spaghetti pasta', 'špagiet': 'spaghetti pasta', 'cestoviny': 'pasta',
    'kuracie': 'chicken', 'kurací': 'chicken', 'kurča': 'chicken',
    'hovädzie': 'beef', 'hovädzí': 'beef', 'hovädzia': 'beef',
    'bravčové': 'pork', 'bravčový': 'pork',
    'polievka': 'soup',
    'krémová': 'creamy',
    'šalát': 'salad',
    'dezert': 'dessert', 'sladké': 'dessert', 'čokoládový': 'chocolate', 'čokoládová': 'chocolate',
    'rizoto': 'risotto',
    'losos': 'salmon', 'ryba': 'fish', 'rybie': 'fish',
    'zeleninový': 'vegetable', 'zeleninová': 'vegetable', 'zeleninové': 'vegetable', 'zelenina': 'vegetables',
    'pečený': 'roasted', 'pečené': 'roasted', 'pečená': 'roasted',
    'grilovaný': 'grilled', 'grilovaným': 'grilled',
    'plnený': 'stuffed', 'plnené': 'stuffed', 'plnená': 'stuffed',
    'fašírka': 'meatballs patties', 'fašírky': 'meatballs patties',
    'lasagne': 'lasagna',
    'burger': 'burger',
    'pizza': 'pizza',
    'palacinky': 'pancakes', 'lievance': 'pancakes',
    'halušky': 'potato dumplings',
    'bryndzové': 'sheep cheese',
    'kapustnica': 'sauerkraut soup',
    'vývar': 'broth',
    'mrkvový': 'carrot', 'mrkvová': 'carrot', 'mrkvové': 'carrot',
    'brokolicový': 'broccoli', 'brokolicová': 'broccoli',
    'tekvicový': 'pumpkin', 'tekvicová': 'pumpkin', 'tekvicové': 'pumpkin',
    'cuketový': 'zucchini', 'cuketová': 'zucchini',
    'šošovicový': 'lentil', 'šošovicová': 'lentil',
    'fazuľový': 'bean', 'fazuľová': 'bean',
    'cícerový': 'chickpea', 'cícerová': 'chickpea',
    'kukuričný': 'corn', 'kukuričná': 'corn',
    'gazpacho': 'gazpacho',
    'tuniak': 'tuna', 'tuniakový': 'tuna',
    'avokádo': 'avocado', 'avokádový': 'avocado',
    'quinoa': 'quinoa',
    'falafel': 'falafel',
    'hummus': 'hummus',
    'cézar': 'caesar',
    'špenátový': 'spinach', 'špenátové': 'spinach',
    'hubový': 'mushroom', 'hubové': 'mushroom',
    'hermelín': 'grilled cheese',
    'rezance': 'noodles pasta',
    'ryžový': 'rice', 'ryžová': 'rice',
    'zemiakový': 'potato', 'zemiaková': 'potato', 'zemiaky': 'potatoes roasted',
    'domáci': 'homemade', 'domáca': 'homemade', 'domáce': 'homemade',
    'pečené kura': 'roasted chicken',
    'sviečková': 'beef sirloin cream sauce',
    'paprikáš': 'chicken paprikash stew',
    'bábovka': 'bundt cake',
    'medovník': 'honey cake',
    'nákyp': 'rice pudding casserole',
    'lazan': 'lasagna',
    'roláda': 'rolled cake roulade',
    'rezeň': 'schnitzel breaded cutlet',
    'nátierka': 'spread',
    'ragú': 'ragu stew',
    'toast': 'toast',
    'guláš': 'goulash stew',
    'chlieb': 'bread',
    'papriky': 'stuffed peppers',
    'bataty': 'sweet potato',
    'závin': 'strudel pastry',
    'rožteky': 'cinnamon rolls',
    'granola': 'granola',
    'paradajky': 'tomatoes stuffed',
    'syr': 'cheese',
    'kompót': 'compote',
    'maslo': 'butter',
    'cvikla': 'beetroot roasted',
    'hranolky': 'french fries',
    'pena': 'mousse chocolate',
    'presnidávka': 'baby food puree',
    'kaša': 'porridge mash',
    'dusená': 'steamed',
    'mrkva': 'carrots',
    'hrášok': 'peas',
    'cestoviny': 'pasta',
    'nugetky': 'chicken nuggets',
    'brokolica': 'broccoli steamed',
    'vajíčková': 'egg spread',
    'krupicová': 'semolina porridge',
    'ovsená': 'oatmeal porridge',
    'jogurt': 'yogurt',
    'smoothie': 'smoothie',
    'zelené': 'green smoothie',
    'jahodami': 'strawberry pancakes',
    'smotane': 'cream sauce',
    'tvarohové': 'curd cheese cake', 'tvarohový': 'curd cheese',
    'koláče': 'cakes',
    'vyprážaný': 'fried breaded',
    'grécky': 'greek',
    'banánový': 'banana', 'banánové': 'banana',
    'caprese': 'caprese salad',
    'bylinkovom masle': 'herb butter salmon',
    'bylinkové': 'herb butter', 'bylinkovom': 'herb butter', 'masle': 'herb butter',
    'grile': 'grilled cheese',
    'bazová': 'elderflower lemonade', 'limonáda': 'lemonade',
    'aglio e olio': 'aglio e olio pasta',
    'aglio': 'aglio e olio pasta', 'olio': 'aglio e olio pasta',
    'čokoláda': 'chocolate cake', 'slepačí': 'chicken soup',
  };
  const lower = name.toLowerCase();
  const found = [];
  const used = new Set();
  // Collect ALL matching keys, use the longest match for overlapping
  const entries = Object.entries(map).sort((a,b) => b[0].length - a[0].length);
  for (const [sk, en] of entries) {
    if (lower.includes(sk)) {
      // Avoid adding if already covered by a longer match
      let covered = false;
      for (const u of used) { if (u.includes(sk)) { covered = true; break; } }
      if (!covered) { found.push(en); used.add(sk); }
    }
  }
  if (found.length) return found.join(' ');
  // Fallback: strip diacritics for a raw English-ish query
  return lower.replace(/[áä]/g,'a').replace(/[č]/g,'c').replace(/[ď]/g,'d')
    .replace(/[éě]/g,'e').replace(/[í]/g,'i').replace(/[ň]/g,'n')
    .replace(/[ó]/g,'o').replace(/[ř]/g,'r').replace(/[š]/g,'s')
    .replace(/[ť]/g,'t').replace(/[úů]/g,'u').replace(/[ý]/g,'y')
    .replace(/[ž]/g,'z');
}

// ======================== EXPORT/IMPORT ========================
function resetRecipes() {
  localStorage.removeItem('recipes');
  localStorage.removeItem('mealPlan');
  localStorage.removeItem('mealPlanKids');
  localStorage.removeItem('cookingHistory');
  localStorage.removeItem('shoppingItems');
  localStorage.removeItem('tasks');
  location.reload();
}
function deleteAllData() {
  localStorage.clear();
  location.reload();
}

function importRecipes(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      const data = JSON.parse(ev.target.result);
      if (!Array.isArray(data) || !data.length || !data[0].name) throw new Error('bad');
      showConfirmModal(`${t('importConfirm')} ${data.length} receptov?`, '📥', lang==='en'?'Import':'Importovať', function() {
        data.forEach(imp => {
          const idx = recipes.findIndex(r => r.id === imp.id);
          if (idx !== -1) recipes[idx] = imp;
          else recipes.push(imp);
        });
        saveToLS();
        render();
        showToast(t('importOk')+' '+data.length+'.','success');
      });
    } catch(err) { showToast(t('exportError'),'error'); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// ======================== AUTOMATED BACKUP ========================
function createBackup() {
  var data = {
    version: '1.7',
    exportedAt: new Date().toISOString(),
    app: 'Mealnest',
    recipes: recipes,
    mealPlan: mealPlan,
    mealPlanKids: mealPlanKids,
    planType: planType,
    shoppingItems: shopItems || [],
    tasks: tasks,
    cookingHistory: JSON.parse(localStorage.getItem('cookingHistory') || '[]'),
    appSettings: appSettings,
    stats: {
      recipeCount: recipes.length,
      mealPlanned: (function() {
        var c = 0;
        Object.values(mealPlan).forEach(function(w) { Object.values(w).forEach(function(d) { Object.values(d).forEach(function(v) { if (v) c++; }); }); });
        return c;
      })(),
      tasksTotal: tasks.length,
      tasksDone: tasks.filter(function(t) { return t.completed; }).length,
      shoppingItems: (shopItems||[]).length
    }
  };
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  var date = new Date().toISOString().slice(0,10);
  a.download = 'mealnest-backup-' + date + '.json';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
  showToast(lang==='en' ? 'Backup downloaded ✓' : 'Záloha stiahnutá ✓', 'success');
  // Store last backup timestamp
  localStorage.setItem('_lastBackup', Date.now().toString());
  try {
    const history = JSON.parse(localStorage.getItem('_backupHistoryLocal') || '[]');
    history.push(new Date().toISOString());
    localStorage.setItem('_backupHistoryLocal', JSON.stringify(history.slice(-5)));
  } catch(e) {}
  return data;
}

function restoreBackupFromFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json,.json';
  input.onchange = function(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data || data.app !== 'Mealnest') throw new Error('invalid-backup');
        if (Array.isArray(data.recipes)) recipes = data.recipes;
        if (data.mealPlan && typeof data.mealPlan === 'object') mealPlan = data.mealPlan;
        if (data.mealPlanKids && typeof data.mealPlanKids === 'object') mealPlanKids = data.mealPlanKids;
        if (data.planType) planType = data.planType;
        if (Array.isArray(data.shoppingItems)) shopItems = data.shoppingItems;
        if (Array.isArray(data.tasks)) tasks = data.tasks;
        if (data.appSettings && typeof data.appSettings === 'object') {
          appSettings = Object.assign({}, appSettings, data.appSettings);
          localStorage.setItem('appSettings', JSON.stringify(appSettings));
        }
        saveToLS();
        saveTasks();
        saveShop();
        localStorage.setItem('_lastBackupRestore', Date.now().toString());
        render();
        renderTasks();
        renderShopping();
        openMorePage('backup-sync');
        showToast(lang === 'en' ? 'Backup restored ✓' : 'Záloha obnovená ✓', 'success');
      } catch(err) {
        showToast(lang === 'en' ? 'Invalid backup file' : 'Neplatný súbor zálohy', 'error');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// Daily backup into IndexedDB (local fallback)
function saveLocalBackup() {
  var data = {
    date: new Date().toISOString().slice(0,10),
    recipes: recipes,
    mealPlan: mealPlan,
    shoppingItems: shopItems || [],
    tasks: tasks
  };
  dbSet('_dailyBackup', data);
  // Keep last 3 backups
  dbGet('_backupHistory').then(function(h) {
    h = h || [];
    h.push(data.date);
    if (h.length > 3) h.shift();
    dbSet('_backupHistory', h);
  });
}

// Check and run daily backup
function checkDailyBackup() {
  var last = parseInt(localStorage.getItem('_lastBackup') || '0');
  var now = Date.now();
  if (now - last > 86400000) {
    saveLocalBackup();
  }
}

// Schedule daily backup check
setTimeout(function() {
  checkDailyBackup();
  setInterval(checkDailyBackup, 3600000); // Check every hour
}, 5000);

// =================== INDEXEDDB WRAPPER ===================
var DB_VERSION = 1;
var DB_NAME = 'MealnestDB';
var dbInstance = null;

function openDB() {
  return new Promise(function(resolve, reject) {
    if (dbInstance) { resolve(dbInstance); return; }
    try {
      var req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = function(e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('data')) {
          db.createObjectStore('data', { keyPath: 'key' });
        }
      };
      req.onsuccess = function(e) {
        dbInstance = e.target.result;
        resolve(dbInstance);
      };
      req.onerror = function(e) { reject(e.target.error); };
    } catch(e) { reject(e); }
  });
}

function dbGet(key) {
  return openDB().then(function(db) {
    return new Promise(function(resolve, reject) {
      var tx = db.transaction('data', 'readonly');
      var store = tx.objectStore('data');
      var req = store.get(key);
      req.onsuccess = function(e) { resolve(e.target.result ? e.target.result.value : null); };
      req.onerror = function(e) { reject(e.target.error); };
    });
  }).catch(function() { return null; });
}

function dbSet(key, value) {
  return openDB().then(function(db) {
    return new Promise(function(resolve, reject) {
      var tx = db.transaction('data', 'readwrite');
      var store = tx.objectStore('data');
      store.put({ key: key, value: value });
      tx.oncomplete = function() { resolve(true); };
      tx.onerror = function(e) { reject(e.target.error); };
    });
  }).catch(function() { return false; });
}

function checkStorageLimit() {
  try {
    var total = 0;
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var val = localStorage.getItem(key);
      if (val) total += val.length * 2;
    }
    // Warn at ~4MB (80% of 5MB limit)
    if (total > 4000000) {
      var existing = document.querySelector('.storage-warning');
      if (!existing) {
        var warn = document.createElement('div');
        warn.className = 'storage-warning';
        warn.innerHTML = '💾 ' + (lang==='en'?'Local storage nearly full! Clean up old data.':'Úložisko je takmer plné! Vymaž staré dáta.');
        document.body.appendChild(warn);
        setTimeout(function() { warn.remove(); }, 8000);
      }
    }
  } catch(e) {}
}

function dbDelete(key) {
  return openDB().then(function(db) {
    return new Promise(function(resolve, reject) {
      var tx = db.transaction('data', 'readwrite');
      var store = tx.objectStore('data');
      store.delete(key);
      tx.oncomplete = function() { resolve(true); };
      tx.onerror = function(e) { reject(e.target.error); };
    });
  }).catch(function() { return false; });
}

// Migrate localStorage -> IndexedDB on first run
function migrateToIndexedDB() {
  if (localStorage.getItem('_idbMigrated') === '1') return;
  var keys = ['recipes','mealPlan','mealPlanKids','shoppingItems','tasks','cookingHistory','planType'];
  keys.forEach(function(key) {
    try {
      var val = localStorage.getItem(storeNs + key) || localStorage.getItem(key);
      if (val) { var parsed = JSON.parse(val); if (parsed) dbSet(key, parsed); }
    } catch(e) {}
  });
  localStorage.setItem('_idbMigrated', '1');
}
setTimeout(migrateToIndexedDB, 2000);
setTimeout(checkStorageLimit, 3000);

