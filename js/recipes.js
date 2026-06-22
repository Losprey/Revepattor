// Mealnest — Recipes CRUD, form, search, seasonal
// ==========================================

// ======================== RECIPES TAB ========================
function render() {
  try {
  if (!Array.isArray(recipes)) recipes = [];
  recipes = recipes.filter(function(r) { return r != null && typeof r === 'object'; });
  const grid = document.getElementById('recipe-grid');
  if (grid && appSettings.masonry) grid.classList.add('masonry');
  const search = document.getElementById('search').value.toLowerCase();
  const normalizedSearch = norm(search);
  const cat = document.getElementById('filter-category').value;
  const showFav = document.getElementById('filter-fav')?.checked;
  let filtered = recipes.filter(r => {
    const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
    const tags = ((lang === 'en' && r.tagsEn ? r.tagsEn : r.tags) || []).slice(0, 2);
    const tagMatch = tags.some(t => norm(t).includes(normalizedSearch));
    const matchSearch = norm(name).includes(normalizedSearch) || tagMatch;
    const matchCat = !cat || r.category === cat;
    const matchFav = !showFav || r.favorite;
    const matchAge = matchesAgeFilter(r);
    return matchSearch && matchCat && matchFav && matchAge;
  });
  if (!filtered.length) {
    document.getElementById('recipe-grid').innerHTML = emptyStateHTML({
      icon: search || cat || showFav ? '🔍' : '📖',
      title: t('noRecipes'),
      desc: t('noRecipesHint'),
      actions: [
        { label: '➕ ' + (lang === 'en' ? 'Add recipe' : 'Pridať recept'), cls: 'btn-primary', onClick: 'openFormModal()' },
        { label: '🧹 ' + (lang === 'en' ? 'Clear filters' : 'Vyčistiť filtre'), cls: 'btn-secondary', onClick: 'clearRecipeFilters()' }
      ]
    });
    document.getElementById('recipe-count').textContent = '(0)';
    updateMainHeader('home', 0);
    return;
  }
  const sortBy = document.getElementById('sort-by')?.value || 'name';
  filtered.sort((a, b) => {
    if (sortBy === 'name') {
      const na = lang === 'en' && a.nameEn ? a.nameEn : a.name;
      const nb = lang === 'en' && b.nameEn ? b.nameEn : b.name;
      return na.localeCompare(nb);
    }
    if (sortBy === 'time') return (a.time||999) - (b.time||999);
    if (sortBy === 'rating') return (b.rating||0) - (a.rating||0);
    return 0;
  });
  document.getElementById('recipe-count').textContent = `(${filtered.length})`;
  updateMainHeader('home', filtered.length);
  grid.innerHTML = filtered.map((r, idx) => {
    const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
    const tags = ((lang === 'en' && r.tagsEn ? r.tagsEn : r.tags) || []).slice(0, 2);
    const diff = r.difficulty || 1;
    const san = esc(name), sanCat = esc(r.category), sanTime = esc(r.time);
    return `<div class="recipe-card" style="animation-delay:${Math.min(idx, 8) * .035}s" data-id="${r.id}">
      <button class="fav-btn ${r.favorite?'fav-active':''}" onclick="event.stopPropagation();toggleFav(${r.id})">${r.favorite ? '❤️' : '🤍'}</button>
      <div class="recipe-card-img${r.image||r.imageData?'':' img-skeleton'}" id="rcimg-${r.id}">${r.image||r.imageData
        ? `<img src="${escAttr(imgUrl(r.imageData||r.image))}" alt="${san}" loading="lazy" onerror="this.outerHTML='<span style=\\'font-size:2.4rem\\'>🍽️</span>'" onload="this.classList.add('loaded');this.parentElement.classList.remove('img-skeleton')">`
        : `<span style="font-size:2.4rem">🍽️</span>`}</div>
      <div class="rc-info">
        <div class="rc-name">${san}</div>
        <div class="rc-meta">
          <span class="rc-time">⏱ ${sanTime}</span>
          ${r.nutrition && appSettings.mealPlanner.showNutrition ? `<span>🔥 ${esc(r.nutrition.kcal||'?')}</span>` : ''}
          <span>${diffLabel(diff)}</span>
        </div>
        ${r.rating > 0 ? `<div class="stars" style="margin-top:.2rem;">${'★'.repeat(Math.round(r.rating))}${'☆'.repeat(5-Math.round(r.rating))}</div>` : ''}
        ${tags.length ? `<div class="tags" style="margin-top:.25rem;">${tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
      </div>
    </div>`;
  }).join('');
  updateFavFilter();
  } catch(e) { var el = document.getElementById('boot-status'); if (el) { el.style.display = 'block'; el.style.background = 'rgba(200,0,0,.92)'; el.textContent = '❌ render: ' + (e.message || ''); } }
}

let searchTimer;
let searchValue = '';
document.getElementById('search').addEventListener('input', function() {
  document.getElementById('search-clear').style.display = this.value ? 'block' : 'none';
  searchValue = this.value;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(function() {
    render();
  }, 220);
});
document.getElementById('filter-category').addEventListener('change', render);

function clearSearch() {
  document.getElementById('search').value = '';
  document.getElementById('search-clear').style.display = 'none';
  render();
}

// ======================== SETTINGS STATE ========================
let settings = {};
// ======================== SETTINGS ========================
let appSettings = {};
function loadSettings() {
  try { appSettings = JSON.parse(localStorage.getItem('appSettings') || '{}'); } catch(e) { appSettings = {}; }
  const D = {
    theme: 'system',
    lang: localStorage.getItem('lang') || 'en',
    accentColor: localStorage.getItem('accent') || '#22C55E',
    textSize: 'normal', uiDensity: 'normal',
    homeWidgets: { weather: true, todayTasks: true, hydration: true, calories: true, quickRecipes: true, seasonal: true },
    mealPlanner: { defaultServings: 4, showNutrition: true },
    notifications: { breakfastReminder: false, todayCookingReminder: false, shoppingReminder: false, hydrationReminder: false, childMealReminder: false, eveningPlanningReminder: false },
    shopping: { storeMode: false, autoCategories: true, aiShoppingList: false },
    quickAdd: { enabled: false },
    notifTimes: { breakfast: '08:00', whatCook: '10:00', shopping: '16:00', water: '12:00', kids: '07:30', evening: '20:00' },
    weather: { enabled: true, location: '', lat: null, lon: null },
  };
  // Deep merge defaults
  function deepMerge(obj, def) {
    Object.keys(def).forEach(k => {
      if (obj[k] === undefined) obj[k] = def[k];
      else if (typeof def[k] === 'object' && !Array.isArray(def[k]) && def[k] !== null) deepMerge(obj[k], def[k]);
    });
  }
  deepMerge(appSettings, D);
  // Global alias for onclick handlers in settings
  window.s = appSettings;
}
function saveSettings() {
  localStorage.setItem('appSettings', JSON.stringify(appSettings));
  applySettings();
}
function getResolvedTheme() {
  if (appSettings.theme === 'light' || appSettings.theme === 'dark') return appSettings.theme;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
function applyTheme() {
  const resolvedTheme = getResolvedTheme();
  document.documentElement.classList.toggle('light', resolvedTheme === 'light');
  document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  document.documentElement.classList.toggle('dark-only', resolvedTheme === 'dark');
  if (document.body) {
    document.body.classList.toggle('dark', resolvedTheme === 'dark');
    document.body.classList.toggle('light', resolvedTheme === 'light');
  }
  const themeMeta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (themeMeta) themeMeta.setAttribute('content', resolvedTheme === 'dark' ? '#0B0B0B' : '#FAF7F5');
}
if (window.matchMedia) {
  try {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function() {
      if (!appSettings.theme || appSettings.theme === 'system') applyTheme();
    });
  } catch(e) {}
}
function applySettings() {
  try {
    applyTheme();
    updateSeason();
  } catch(e) {}
  let langChanged = false;
  if (appSettings.lang !== lang) { lang = appSettings.lang; localStorage.setItem('lang', lang); try { applyLang(); } catch(e) {} langChanged = true; }
  try { applyAccentColor(appSettings.accentColor); } catch(e) {}
  document.documentElement.dataset.textSize = appSettings.textSize;
  document.documentElement.dataset.uiDensity = appSettings.uiDensity;
  document.body.classList.toggle('store-mode', appSettings.shopping.storeMode);
  const fab = document.getElementById('fab-quick-add');
  if (fab) fab.style.display = appSettings.quickAdd.enabled ? '' : 'none';
  // Re-check after DOM fully loads (FAB element is after the script tag)
  setTimeout(() => { const f = document.getElementById('fab-quick-add'); if (f) f.style.display = appSettings.quickAdd.enabled ? '' : 'none'; }, 100);
  if (langChanged) { try { render(); } catch(e) {} try {   // Init Lucide icons
  if (typeof lucide !== "undefined") { try { lucide.createIcons(); } catch(e) {} }
  showTipOfDay(); } catch(e) {} }
  try { initNotifications(); } catch(e) {}
}

function resetWidgetsToDefaults() {
  appSettings.homeWidgets = { weather: true, todayTasks: true, hydration: true, calories: true, quickRecipes: true };
  saveSettings();
  renderDashboard();
}
loadSettings();
applySettings();

function openSettings() {
  openMorePageFromAnywhere('settings');
}

function cycleSetting(path, values) {
  const parts = path.split('.');
  let obj = appSettings;
  for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
  const key = parts[parts.length - 1];
  const idx = values.indexOf(obj[key]);
  obj[key] = values[(idx + 1) % values.length];
  saveSettings();
  openSettings();
}
function promptNumber(path, min, max) {
  const parts = path.split('.');
  let obj = appSettings;
  for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
  const key = parts[parts.length - 1];
  const val = prompt(`${t('Zadaj hodnotu','Enter value')} (${min}-${max}):`, obj[key]);
  if (val === null) return;
  const num = parseInt(val);
  if (!isNaN(num) && num >= min && num <= max) { obj[key] = num; saveSettings(); openSettings(); }
}
function editText(path, label) {
  const parts = path.split('.');
  let obj = appSettings;
  for (let i = 0; i < parts.length - 1; i++) obj = obj[parts[i]];
  const key = parts[parts.length - 1];
  const val = prompt(label + ':', obj[key] || '');
  if (val === null) return;
  obj[key] = val.trim();
  // Reset weather cache & coords when location changes
  if (path === 'weather.location') { weatherCache = null; weatherCacheTs = 0; appSettings.weather.lat = null; appSettings.weather.lon = null; }
  saveSettings();
  openSettings();
}
function cycleLang() {
  appSettings.lang = appSettings.lang === 'en' ? 'sk' : 'en';
  saveSettings();
  openSettings();
}
function applyAccentColor(color) {
  document.documentElement.style.setProperty('--primary', color);
  const r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
  document.documentElement.style.setProperty('--primary-rgb', r + ', ' + g + ', ' + b);
  document.documentElement.style.setProperty('--primary-light', `rgba(${r},${g},${b},.8)`);
  document.documentElement.style.setProperty('--primary-light-rgb', r + ', ' + g + ', ' + b);
  localStorage.setItem('accent', color);
}
function calcPlanningStreak() {
  let streak = 0;
  const today = new Date();
  const plan = planType === 'kids' ? mealPlanKids : mealPlan; // read-only, don't mutate
  for (let i = 0; i < 365; i++) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const key = getWeekKey(d);
    const week = plan[key];
    if (!week) break;
    const dayName = DAYS[d.getDay() === 0 ? 6 : d.getDay() - 1];
    const day = week[dayName];
    if (day && Object.values(day).filter(Boolean).length > 0) streak++;
    else break;
  }
  return streak;
}
function closeSettings() {
  openMorePageFromAnywhere('settings');
}

function toggleFav(id) {
  const r = recipes.find(rec => rec.id === id);
  if (!r) return;
  r.favorite = !r.favorite;
  haptic(8);
  saveToLS();
  const card = document.querySelector(`.recipe-card[data-id="${id}"]`);
  if (card) {
    const btn = card.querySelector('.fav-btn');
    if (btn) {
      btn.classList.toggle('fav-active', r.favorite);
      btn.textContent = r.favorite ? '❤️' : '🤍';
      springBounce(btn);
    }
  }
  const grid = document.getElementById('recipe-grid');
  const ff = document.getElementById('filter-fav');
  if (ff && ff.checked) {
    if (!r.favorite) {
      if (card) card.remove();
      const remaining = grid.querySelectorAll('.recipe-card');
      document.getElementById('recipe-count').textContent = remaining.length ? `(${remaining.length})` : '';
      if (!remaining.length) grid.innerHTML = `<div class="empty-state"><h3>😕 ${t('noRecipes')}</h3><p>${t('noRecipesHint')}</p></div>`;
    }
  }
}

function updateFavFilter() { /* renders fav filter badge */ }

function setTextSafe(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value == null ? '' : String(value);
}
function setHtmlSafe(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = value == null ? '' : String(value);
}
function setValueSafe(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value == null ? '' : value;
}

// ======================== RANDOM ========================
function randomRecipe() {
  if (!recipes.length) return;
  const r = recipes[Math.floor(Math.random() * recipes.length)];
  viewRecipe(r.id);
}

function toggleRecipeToolsPanel() {
  const panel = document.getElementById('recipe-tools-panel');
  const toggle = document.querySelector('.recipe-tools-toggle');
  if (!panel) return;
  const isOpen = panel.classList.toggle('active');
  if (toggle) toggle.classList.toggle('btn-primary', isOpen);
}

// ======================== FORM ========================
function openFormModal(recipe) {
  editingId = recipe ? recipe.id : null;
  // Inject import card dynamically (sure way to handle translations)
  var importCard = document.getElementById('form-import-card');
  if (importCard) {
    importCard.innerHTML = '<div onclick="closeModal(\'form-modal\');setTimeout(showImportUrlModal,300)" style="display:flex;align-items:center;gap:.5rem;padding:.5rem .6rem;margin-bottom:.6rem;background:linear-gradient(135deg,rgba(255,77,109,.08),rgba(255,77,109,.02));border:1px dashed rgba(255,77,109,.25);border-radius:var(--radius-md);cursor:pointer;transition:all .2s ease;" onmouseover="this.style.borderColor=\'rgba(255,77,109,.5)\';this.style.background=\'linear-gradient(135deg,rgba(255,77,109,.12),rgba(255,77,109,.04))\'" onmouseout="this.style.borderColor=\'rgba(255,77,109,.25)\';this.style.background=\'linear-gradient(135deg,rgba(255,77,109,.08),rgba(255,77,109,.02))\'"><span style="font-size:1.3rem;">🌐</span><div style="flex:1;"><div style="font-size:.82rem;font-weight:600;color:var(--text);">' + t('btnImportUrl') + '</div><div style="font-size:.65rem;color:var(--text3);">' + t('importUrlHint') + '</div></div><span style="font-size:1.1rem;color:var(--primary);">›</span></div>';
  }
  setTextSafe('form-title', recipe ? t('formTitle') + ' (edit)' : t('formTitle'));
  setTextSafe('form-submit-btn', recipe ? t('save') : t('btnAdd'));
  setValueSafe('r-name', recipe ? recipe.name : '');
  setValueSafe('r-nameEn', recipe && recipe.nameEn ? recipe.nameEn : '');
  setValueSafe('r-category', recipe ? recipe.category : 'Hlavné jedlá');
  setValueSafe('r-difficulty', recipe ? (recipe.difficulty || 1) : 1);
  setValueSafe('r-time', recipe ? recipe.time : '');
  setValueSafe('r-image', recipe && recipe.image && !recipe.imageData ? recipe.image : '');
  setValueSafe('r-ingredients', recipe ? recipe.ingredients.join('\n') : '');
  setValueSafe('r-steps', recipe ? recipe.steps.join('\n') : '');
  setValueSafe('r-tags', recipe ? recipe.tags.join(', ') : '');
  setValueSafe('r-kcal', recipe && recipe.nutrition ? recipe.nutrition.kcal || '' : '');
  setValueSafe('r-protein', recipe && recipe.nutrition ? recipe.nutrition.protein || '' : '');
  setValueSafe('r-fat', recipe && recipe.nutrition ? recipe.nutrition.fat || '' : '');
  setValueSafe('r-carbs', recipe && recipe.nutrition ? recipe.nutrition.carbs || '' : '');
  setValueSafe('r-portions', recipe && recipe.portions ? recipe.portions : (appSettings.mealPlanner.defaultServings || 4));
  setHtmlSafe('nutrition-status', '');
  setTextSafe('nutrition-portion-info', '');
  const imagePreview = document.getElementById('r-image-preview');
  if (imagePreview) imagePreview.style.display = 'none';
  if (recipe && recipe.imageData) {
    if (imagePreview) {
      imagePreview.src = recipe.imageData;
      imagePreview.style.display = 'block';
    }
  }
  openModal('form-modal');
}

document.getElementById('r-image-file').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    const preview = document.getElementById('r-image-preview');
    preview.src = ev.target.result;
    preview.style.display = 'block';
    document.getElementById('r-image').value = '';
  };
  reader.readAsDataURL(file);
});

function saveRecipe() {
  const name = document.getElementById('r-name').value.trim();
  const nameEn = document.getElementById('r-nameEn').value.trim() || '';
  const category = document.getElementById('r-category').value;
  const time = parseInt(document.getElementById('r-time').value) || 0;
  const image = document.getElementById('r-image').value.trim();
  const imageData = document.getElementById('r-image-preview').src && document.getElementById('r-image-preview').style.display !== 'none'
    ? (document.getElementById('r-image-preview').src.startsWith('data:') ? document.getElementById('r-image-preview').src : '') : '';
  const ingredients = document.getElementById('r-ingredients').value.split('\n').map(s => s.trim()).filter(Boolean);
  const steps = document.getElementById('r-steps').value.split('\n').map(s => s.trim()).filter(Boolean);
  const tags = document.getElementById('r-tags').value.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  const difficulty = parseInt(document.getElementById('r-difficulty').value) || 1;
  const kcal = parseInt(document.getElementById('r-kcal').value) || 0;
  const protein = parseInt(document.getElementById('r-protein').value) || 0;
  const fat = parseInt(document.getElementById('r-fat').value) || 0;
  const carbs = parseInt(document.getElementById('r-carbs').value) || 0;
  const portions = parseInt(document.getElementById('r-portions').value) || 4;
  // Auto-detect season from ingredients
  var autoSeason = autoSeasonTag(ingredients, name);
  autoSeason.tags.forEach(function(t) { if (tags.indexOf(t) < 0) tags.push(t); });
  // Show a small indicator on save
  if (autoSeason.tags.length) {
    document.getElementById('season-status').textContent = (lang==='en'?'Detected season: ':'Detekovaná sezóna: ') + autoSeason.tags.map(function(t) { return {jar:'🌸',leto:'🌞',jesen:'🍂',zima:'❄️'}[t]||t; }).join(' ');
  }
  if (!name) return showToast(t('formName')+(lang==='en'?' is required.':' je povinný.'),'error');
  if (!ingredients.length) return showToast(t('formIngredients')+(lang==='en'?' are required.':' sú povinné.'),'error');
  const nutrition = {kcal,protein,fat,carbs};
  // Sanity check
  const check = sanitizeNutrition(nutrition, portions);
  if (check.hasWarnings) {
    showConfirmModal(
      (lang === 'en' ? 'Per-portion values seem high:\n' : 'Hodnoty na porciu sú vysoké:\n') +
      check.warnings.map(w => {
        const labels = {kcal: '🔥 kcal > 1200', fat: '🧈 tuky > 80g', protein: '💪 bielkoviny > 80g', carbs: '🍚 sacharidy > 150g'};
        return labels[w];
      }).join('\n') + '\n\n' +
      (lang === 'en' ? 'Save anyway?' : 'Aj tak uložiť?'),
      '⚠️', lang==='en'?'Save anyway':'Aj tak uložiť', function() {
        // continue saving
      }
    );
    if (!check._proceed) return;
  }
  if (editingId) {
    const idx = recipes.findIndex(r => r.id === editingId);
    if (idx !== -1) recipes[idx] = {...recipes[idx], name, nameEn, category, time, image, imageData, ingredients, steps, tags, nutrition, difficulty, portions, allergens: recipes[idx].allergens || []};
    editingId = null;
  } else {
          recipes.push({id:Date.now()*1000+Math.floor(Math.random()*1000), name, nameEn, category, time, image, imageData, ingredients, steps, tags, rating:0, notes:'', notesEn:'', favorite:false, nutrition, difficulty, portions, allergens: []});
  }
  saveToLS();
  closeModal('form-modal');
  render();
}



// ======================== PREPOČET PORCIÍ ========================
function scaleAmount(text, factor) {
  if (factor === 1) return text;
  const m = text.match(/^(\d+(?:\.\d+)?(?:\/\d+)?)\s*/);
  if (!m) return text;
  const val = parseFloat(m[1]);
  if (isNaN(val)) return text;
  const scaled = val * factor;
  const rounded = Math.abs(scaled - Math.round(scaled)) < 0.05 
    ? Math.round(scaled) 
    : Math.round(scaled * 10) / 10;
  return text.replace(m[1], String(rounded));
}

function scaleIngredients(ingredients, oldPortions, newPortions) {
  if (!ingredients || !ingredients.length) return ingredients;
  if (oldPortions === newPortions) return ingredients;
  const displayFactor = newPortions / oldPortions;
  return ingredients.map(ing => scaleAmount(ing, displayFactor));
}

// ======================== ZMENA POČTU PORCIÍ ========================
function changePortions(delta) {
  const r = getCurrentRecipe();
  if (!r) return;
  const newP = Math.max(1, Math.min(50, (r.portions || 4) + delta));
  if (newP === (r.portions || 4)) return;
  r.portions = newP;
  saveToLS();
  viewRecipe(r.id);
}

function resetPortions() {
  const r = getCurrentRecipe();
  if (!r) return;
  r.portions = 4;
  saveToLS();
  viewRecipe(r.id);
}

function getCurrentRecipe() {
  const el = document.getElementById('recipe-detail');
  if (!el || !el.dataset.rid) return null;
  return recipes.find(r => r.id === parseInt(el.dataset.rid));
}

function emptyStateHTML(opts) {
  opts = opts || {};
  const actions = (opts.actions || []).map(a => `<button class="btn ${a.cls || 'btn-secondary'}" onclick="${a.onClick || ''}">${a.label || ''}</button>`).join('');
  return `<div class="empty-state-v2 action-empty">
    <div class="empty-orb">${opts.icon || '✨'}</div>
    <div class="empty-title">${esc(opts.title || (lang === 'en' ? 'Nothing here yet' : 'Zatiaľ tu nič nie je'))}</div>
    <div class="empty-desc">${esc(opts.desc || (lang === 'en' ? 'Start by adding the first item.' : 'Začni pridaním prvej položky.'))}</div>
    ${actions ? `<div class="empty-actions">${actions}</div>` : ''}
  </div>`;
}

function clearRecipeFilters() {
  const searchEl = document.getElementById('search');
  const catEl = document.getElementById('filter-category');
  const favEl = document.getElementById('filter-fav');
  if (searchEl) searchEl.value = '';
  if (catEl) catEl.value = '';
  if (favEl) favEl.checked = false;
  const clearEl = document.getElementById('search-clear');
  if (clearEl) clearEl.style.display = 'none';
  ingredientSearchSelected.clear();
  render();
}

function viewRecipe(id) {
  const pageScrollY = window.scrollY || window.pageYOffset || 0;
  const detailWasOpen = !!document.querySelector('#detail-modal.active');
  const sameRecipeOpen = detailWasOpen && viewingId === id;
  viewingId = id;
  basePortion = 2;
  currentPortion = basePortion;
  const r = recipes.find(rec => rec.id === id);
  if (!r) return;
  const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
  const ingr = (lang === 'en' && r.ingredientsEn ? r.ingredientsEn : r.ingredients) || [];
  const stps = (lang === 'en' && r.stepsEn ? r.stepsEn : r.steps) || [];
  const tgs = (lang === 'en' && r.tagsEn ? r.tagsEn : r.tags) || [];
  const n = r.nutrition;
  const el = document.getElementById('recipe-detail'); el.dataset.rid = id;
  const san = esc(name), sanCat = esc(r.category), sanTime = esc(r.time);
  el.innerHTML = `
    <div class="recipe-detail-shell">
    <div id="detail-img-wrap" class="detail-img recipe-detail-hero ${r.image||r.imageData?'':'img-skeleton'}">${r.image || r.imageData
      ? `<img src="${escAttr(r.imageData||r.image)}" alt="${san}" loading="eager" decoding="async" onerror="this.outerHTML='<span style=\\'font-size:3.4rem\\'>🍽️</span>'" onload="this.classList.add('loaded');this.parentElement.classList.remove('img-skeleton')">`
      : `<span style="font-size:3.4rem">🍽️</span>`}</div>
    <div class="recipe-detail-head">
      <div class="recipe-detail-title">
        <span>${sanCat}</span>
        <h2>${san}</h2>
      </div>
      <div class="recipe-detail-controls">
        <span class="portion-stepper">
          <button onclick="changePortions(-1)" aria-label="${escAttr(lang==='en'?'Less portions':'Menej porcií')}">−</button>
          <strong id="portion-display">${r.portions||4}</strong>
          <button onclick="changePortions(1)" aria-label="${escAttr(lang==='en'?'More portions':'Viac porcií')}">+</button>
          <small>${t('portionUnit')}</small>
        </span>
      </div>
    </div>
    <div class="detail-meta recipe-detail-meta">
      <span>⏱ ${sanTime} min</span>
      <span>${'●'.repeat(r.difficulty||1)}${Math.max(0,3-(r.difficulty||1)) > 0 ? '○'.repeat(Math.max(0,3-(r.difficulty||1))) : ''}</span>
      ${tgs.length ? `<span>🏷 ${tgs.slice(0, 3).map(esc).join(', ')}</span>` : ''}
      ${(r.allergens||[]).length ? `<span>⚠️ ${r.allergens.map(esc).join(', ')}</span>` : ''}
    </div>
    <div class="recipe-detail-quick-actions">
      <button class="btn btn-secondary" onclick="editCurrent()">✏️ <span data-lang="btnEdit">Upraviť</span></button>
      <button class="btn btn-danger" onclick="deleteCurrent()">🗑️ <span data-lang="btnDelete">Zmazať</span></button>
    </div>
    <div class="detail-section">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <h3>⭐ ${t('formTitle') === 'New Recipe' ? 'Rating' : 'Hodnotenie'}</h3>
        <div class="star-rating">${[1,2,3,4,5].map(i => `<span class="star ${i<=Math.round(r.rating)?'active':''}" tabindex="0" role="button" onclick="setRating(${id},${i})" onkeydown="if(event.key==='Enter'||event.key===' ')event.preventDefault(),setRating(${id},${i})">★</span>`).join('')}</div>
      </div>
    </div>
    ${appSettings.mealPlanner.showNutrition && n && (n.kcal||n.protein||n.fat||n.carbs) ? `<div class="detail-section">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:.3rem;flex-wrap:wrap;">
        <h3>🥗 ${t('recipeNutri')}</h3>
        <div style="display:flex;align-items:center;gap:.25rem;">
          <button class="btn btn-sm ${!(window._showTotalNutri || false) ? 'btn-primary' : 'btn-secondary'}" onclick="window._showTotalNutri=false;viewRecipe(${id})" style="padding:.1rem .4rem;font-size:.65rem;" data-lang="nutritionPerPortion">Na porciu</button>
          <button class="btn btn-sm ${window._showTotalNutri ? 'btn-primary' : 'btn-secondary'}" onclick="window._showTotalNutri=true;viewRecipe(${id})" style="padding:.1rem .4rem;font-size:.65rem;" data-lang="nutritionTotal">Celý recept</button>
        </div>
      </div>
      ${window._showTotalNutri ? '' : `<div style="font-size:.7rem;color:var(--text2);margin-bottom:.3rem;">${t('nutritionPerPortion')} — ${r.portions||4} ${t('portionUnit')}</div>`}
      <div class="nutrition-grid">
        <div class="nutrition-item"><div class="val">🔥 ${esc(window._showTotalNutri ? Math.round((n.kcal||0)*(r.portions||4)) : n.kcal||'?')}</div><div class="lbl">${t('kcal')}</div></div>
        <div class="nutrition-item"><div class="val">💪 ${esc(window._showTotalNutri ? Math.round((n.protein||0)*(r.portions||4)) : n.protein||'?')}g</div><div class="lbl">${t('protein')}</div></div>
        <div class="nutrition-item"><div class="val">🧈 ${esc(window._showTotalNutri ? Math.round((n.fat||0)*(r.portions||4)) : n.fat||'?')}g</div><div class="lbl">${t('fat')}</div></div>
        <div class="nutrition-item"><div class="val">🍚 ${esc(window._showTotalNutri ? Math.round((n.carbs||0)*(r.portions||4)) : n.carbs||'?')}g</div><div class="lbl">${t('carbs')}</div></div>
      </div>
      ${!window._showTotalNutri && n.kcal > 800 && n.fat > 40 ? `<div style="font-size:.7rem;color:var(--gold);margin-top:.2rem;">🍖 ${t('nutritionHearty')}</div>` : ''}
      ${window._showTotalNutri ? `<div style="font-size:.7rem;color:var(--text3);margin-top:.2rem;">${t('nutritionTotalLabel')} — ${r.portions||4} ${t('portionUnit')}</div>` : ''}
      ${!window._showTotalNutri && (n.kcal > 1200 || n.fat > 80 || n.protein > 80 || n.carbs > 150) ? `<div style="font-size:.7rem;color:var(--danger);margin-top:.2rem;">⚠️ ${t('nutritionCheck')}</div>` : ''}
    </div>` : ''}
    <div class="detail-section">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.3rem;">
        <h3>🥕 ${lang === 'en' ? 'Ingredients' : 'Suroviny'}</h3>
        <div style="display:flex;align-items:center;gap:.35rem;">
          <button class="btn btn-secondary" onclick="changePortion(-1)" style="padding:.1rem .45rem;font-size:.85rem;" aria-label="${lang==='en'?'Less portions':'Menej porcií'}">−</button>
          <span id="portion-num" style="font-weight:700;font-size:.9rem;min-width:1.5rem;text-align:center;">${basePortion}</span>
          <button class="btn btn-secondary" onclick="changePortion(1)" style="padding:.1rem .45rem;font-size:.85rem;" aria-label="${lang==='en'?'More portions':'Viac porcií'}">+</button>
        </div>
      </div>
      <ul id="ingredient-list" style="margin-top:.3rem;">${scaleIngredients(ingr, 4, r.portions||4).map(i=>`<li>${esc(i)}</li>`).join('')}</ul>
    </div>
    <div class="detail-section recipe-steps"><h3>📝 ${lang === 'en' ? 'Steps' : 'Postup'}</h3><ol>${stps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div>
    <div class="detail-section"><h3>📓 ${lang === 'en' ? 'Notes' : 'Poznámky'}</h3>
      <textarea id="recipe-notes" style="width:100%;padding:.45rem;border:1px solid var(--border);border-radius:6px;min-height:45px;font-family:inherit;font-size:.82rem;background:var(--input-bg);color:var(--text);" onchange="saveNotes(${id},this.value)">${esc((lang==='en'&&r.notesEn?r.notesEn:r.notes)||'')}</textarea></div>
    </div>
  `;
  if (sameRecipeOpen) history.replaceState({ modal: 'detail', id: id }, '', '#recipe-' + id);
  else history.pushState({ modal: 'detail', id: id }, '', '#recipe-' + id);
  openModal('detail-modal');
  const detailModal = document.querySelector('#detail-modal .modal');
  if (detailModal) detailModal.scrollTop = 0;
  // Add swipe-to-close gesture on detail modal
  setupDetailSwipeClose();
  requestAnimationFrame(function() {
    try { window.scrollTo(0, pageScrollY); } catch(e) {}
  });
  // Async image fetch in background
  if (!r.image && !r.imageData) {
    getRecipeImage(r).then(url => {
      if (url) {
        const wrap = document.getElementById('detail-img-wrap');
        if (wrap) {
          wrap.innerHTML = `<img src="${escAttr(url)}" alt="${san}" onerror="this.outerHTML='<span style=\\'font-size:3.4rem\\'>🍽️</span>'">`;
          wrap.classList.remove('img-skeleton');
        }
      }
    });
  }
}

// ======================== SHARE ========================

function setRating(id, val) {
  const r = recipes.find(rec => rec.id === id);
  if (!r) return;
  r.rating = r.rating === val ? 0 : val;
  saveToLS();
  viewRecipe(id);
  render();
}

function saveNotes(id, val) {
  const r = recipes.find(rec => rec.id === id);
  if (!r) return;
  if (lang === 'en') r.notesEn = val;
  else r.notes = val;
  saveToLS();
}

function editCurrent() {
  const r = recipes.find(rec => rec.id === viewingId);
  if (!r) return;
  closeModal('detail-modal');
  openFormModal(r);
}

function deleteCurrent() {
  showConfirmModal(t('Naozaj chceš vymazať tento recept?','Delete this recipe?'), '🗑️', t('Áno, vymazať','Yes, delete'), function() {
    const deletedRecipe = recipes.find(r => r.id === viewingId);
    const deletedIndex = recipes.findIndex(r => r.id === viewingId);
    recipes = recipes.filter(r => r.id !== viewingId);
    saveToLS();
    closeModal('detail-modal');
    render();
    showUndoToast('🗑️ ' + (lang==='en'?'Recipe deleted':'Recept vymazaný'), function() {
      if (!deletedRecipe) return;
      recipes.splice(Math.max(0, deletedIndex), 0, deletedRecipe);
      saveToLS();
      render();
      showToast(lang === 'en' ? 'Recipe restored' : 'Recept obnovený', 'success', 1200);
    });
  });
}

// ======================== PRINT ========================
function printRecipe() {
  const r = recipes.find(rec => rec.id === viewingId);
  if (!r) return;
  const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
  const ingr = (lang === "en" && r.ingredientsEn ? r.ingredientsEn : r.ingredients) || [];
  const stps = (lang === "en" && r.stepsEn ? r.stepsEn : r.steps) || [];
  const san = esc(name), sanCat = esc(r.category), sanTime = esc(r.time);
  const kcalHtml = r.nutrition && r.nutrition.kcal ? ` | 🔥 ${esc(r.nutrition.kcal)} kcal` : '';
  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head><title>${san}</title><style>
    body{font-family:system-ui,sans-serif;padding:2rem;max-width:700px;margin:0 auto;color:#1e293b;}
    h1{font-size:1.8rem;} .meta{color:#64748b;} h2{border-bottom:2px solid #fef3c7;padding-bottom:.3rem;margin-top:1.5rem;}
    ul,ol{padding-left:1.25rem;} li{margin-bottom:.3rem;}
    @media print{body{padding:0;}}
  
/* ===== TOAST NOTIFICATIONS ===== */
.toast-container { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); z-index: 9999; display: flex; flex-direction: column; gap: .5rem; pointer-events: none; width: calc(100% - 2rem); max-width: 400px; }
.toast { background: var(--surface-solid); color: var(--text); padding: .7rem 1rem; border-radius: var(--radius-md); font-size: .82rem; box-shadow: 0 8px 32px rgba(0,0,0,.4); border: 1px solid var(--border); animation: toastIn .35s var(--ease-smooth); display: flex; align-items: center; gap: .5rem; pointer-events: auto; backdrop-filter: blur(12px); }
.toast.toast-success { border-color: var(--success); box-shadow: 0 4px 16px var(--success-glow); }
.toast.toast-error { border-color: var(--danger); }
.toast.toast-info { border-color: var(--primary-light); }
.toast .toast-icon { font-size: 1.1rem; flex-shrink: 0; }
.toast .toast-text { flex: 1; line-height: 1.4; }
@keyframes toastIn { from { opacity: 0; transform: translateY(20px) scale(.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes toastOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(-10px) scale(.95); } }
</style></head><body>
    <h1>🍽️ ${san}</h1>
    <p class="meta">⏱ ${sanTime} min | 📂 ${sanCat}${kcalHtml}</p>
    <h2>🥕 Ingredients / Suroviny</h2><ul>${ingr.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>
    <h2>📝 Steps / Postup</h2><ol>${stps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>
    <script>window.print();window.close();<\/script>
  </body></html>`);
  win.document.close();
}

// ======================== SHARE ========================
function shareRecipe() {
  const r = recipes.find(rec => rec.id === viewingId);
  if (!r) return;
  const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
  const ingr = (lang === "en" && r.ingredientsEn ? r.ingredientsEn : r.ingredients) || [];
  const stps = (lang === "en" && r.stepsEn ? r.stepsEn : r.steps) || [];
  const tgs = (lang === "en" && r.tagsEn ? r.tagsEn : r.tags) || [];
  const text = `🍽️ ${name}\n⏱ ${r.time} min | 📂 ${r.category}\n\n🥕 ${t('formIngredients')}:\n${ingr.map(i=>`• ${i}`).join('\n')}\n\n📝 ${t('formSteps')}:\n${stps.map((s,j)=>`${j+1}. ${s}`).join('\n')}\n\n🏷 ${tgs.join(', ')}`;
  if (navigator.share) {
    navigator.share({title: name, text: text}).catch(() => {});
  } else {
    const a = document.createElement('div');
    a.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--surface);padding:1rem;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.2);z-index:3000;display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center;border:1px solid var(--border);';
    a.className = 'share-popup';
    const btns = [
      {label:'📋 Copy', fn:()=>{copyText(text)}},
      {label:`📱 ${t('shareWhatsApp')}`, fn:()=>{window.open('https://api.whatsapp.com/send?text='+encodeURIComponent(text),'_blank')}},
      {label:`💬 ${t('shareMessenger')}`, fn:()=>{window.open('https://www.facebook.com/sharer/sharer.php?quote='+encodeURIComponent(text),'_blank')}},
      {label:`✉️ ${t('shareEmail')}`, fn:()=>{window.location.href='mailto:?subject='+encodeURIComponent(name)+'&body='+encodeURIComponent(text)}},
      {label:'✕', fn:()=>{a.remove()}, cls:'btn-primary'}
    ];
    btns.forEach(b => {
      const btn = document.createElement('button');
      btn.className = 'btn ' + (b.cls || 'btn-secondary');
      btn.textContent = b.label;
      btn.onclick = b.fn;
      a.appendChild(btn);
    });
    document.body.appendChild(a);
  }
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => showToast(lang==='en'?'Copied!':'Skopírované!','success')).catch(() => prompt('Copy:', text));
}

// ======================== COPY RECIPE ========================
function copyRecipe(e) {
  const r = recipes.find(rec => rec.id === viewingId);
  if (!r) return;
  const name = lang==='en'&&r.nameEn?r.nameEn:r.name;
  const ingr = (lang==="en"&&r.ingredientsEn?r.ingredientsEn:r.ingredients)||[];
  const stps = (lang==="en"&&r.stepsEn?r.stepsEn:r.steps)||[];
  const tgs = (lang==="en"&&r.tagsEn?r.tagsEn:r.tags)||[];
  const text = `🍽️ ${name}\n⏱ ${r.time} min\n\nSuroviny:\n${ingr.map(i=>`• ${i}`).join('\n')}\n\nPostup:\n${stps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n🏷 ${tgs.join(', ')}`;
  navigator.clipboard.writeText(text).then(() => {
    const btn = (e && e.target) ? e.target.closest('.btn') : document.querySelector('.modal-footer .btn:last-child');
    if (btn) { const orig = btn.textContent; btn.textContent = '✓ OK!'; setTimeout(() => btn.textContent = orig, 1500); }
  }).catch(() => prompt('Copy:', text));
}

// ======================== INGREDIENT SEARCH ========================
function openIngredientSearch() {
  const allIngrs = [...new Set(recipes.flatMap(r => {
    const ingr = (lang === "en" && r.ingredientsEn ? r.ingredientsEn : r.ingredients) || [];
    return ingr;
  }))].sort();
  document.getElementById('ingredient-modal').dataset.all = JSON.stringify(allIngrs);
  renderIngredientSearch();
  openModal('ingredient-modal');
}

function renderIngredientSearch() {
  const all = JSON.parse(document.getElementById('ingredient-modal').dataset.all || '[]');
  const filter = norm(document.getElementById('ingr-search').value);
  const visible = filter ? all.filter(i => norm(i).includes(filter)) : all;
  const list = document.getElementById('ingr-list');
  list.innerHTML = visible.map(i =>
    `<span class="ingr-tag ${ingredientSearchSelected.has(i)?'selected':''}" data-ingr="${escAttr(i)}">${esc(i)}</span>`
  ).join('');
  const matchEl = document.getElementById('ingr-match');
  if (ingredientSearchSelected.size === 0) { matchEl.innerHTML = ''; return; }
  const sel = [...ingredientSearchSelected];
  const cat = document.getElementById('ingr-category').value;
  const fullMatch = recipes.filter(r => {
    const ingr = (lang === "en" && r.ingredientsEn ? r.ingredientsEn : r.ingredients) || [];
    return (!cat || r.category === cat) && sel.every(s => ingr.some(i => norm(i).includes(norm(s))));
  });
  const partialMatch = recipes.filter(r => {
    const ingr = (lang === "en" && r.ingredientsEn ? r.ingredientsEn : r.ingredients) || [];
    return (!cat || r.category === cat) && !fullMatch.includes(r) && sel.some(s => ingr.some(i => norm(i).includes(norm(s))));
  });
  let html = '';
  if (fullMatch.length) html += `<div style="color:var(--success);">✅ ${fullMatch.length} ${t('matchCount')}</div>`;
  else html += `<div style="color:var(--danger);">❌ ${t('noMatch')}</div>`;
  if (partialMatch.length) html += `<div style="color:var(--text2);">⚠️ ${partialMatch.length} ${t('matchPart')}</div>`;
  matchEl.innerHTML = html;
}

function toggleIngrSearch(ingr) {
  if (ingredientSearchSelected.has(ingr)) ingredientSearchSelected.delete(ingr);
  else ingredientSearchSelected.add(ingr);
  renderIngredientSearch();
}

function clearIngredientSearch() { ingredientSearchSelected.clear(); renderIngredientSearch(); }

// Close ingredient modal -> update recipe grid
document.getElementById('ingredient-modal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal('ingredient-modal');
    applyIngredientSearch();
  }
});
document.getElementById('ingr-list').addEventListener('click', function(e) {
  const tag = e.target.closest('.ingr-tag');
  if (tag) toggleIngrSearch(tag.dataset.ingr);
});

// ======================== PORTION SCALING ========================
function changePortion(delta) {
  currentPortion = Math.max(1, currentPortion + delta);
  document.getElementById('portion-num').textContent = currentPortion;
  const r = recipes.find(rec => rec.id === viewingId);
  if (!r) return;
  const ingr = (lang === 'en' && r.ingredientsEn ? r.ingredientsEn : r.ingredients);
  const ratio = currentPortion / basePortion;
  const list = document.getElementById('ingredient-list');
  if (list) {
    list.innerHTML = ingr.map(i => `<li>${esc(scaleIngredient(i, ratio))}</li>`).join('');
  }
}

function scaleIngredient(text, ratio) {
  return text.replace(/^(\d+)([gmlkGLM]|[gG]ramov|[mM]l)?\s*/g, (match, num, unit) => {
    const scaled = Math.round(parseInt(num) * ratio);
    if (scaled === 0) return '';
    return `${scaled}${unit || ''} `;
  });
}

// ======================== COLLECTIONS ========================
// ======================== TIP OF THE DAY ========================
function showTipOfDay() {
  if (localStorage.getItem('tipDismissed') === new Date().toISOString().slice(0,10)) return;
  if (!recipes.length) return;
  const daySeed = new Date().toISOString().slice(0,10).split('-').reduce((a,b) => a + parseInt(b), 0);
  const r = recipes[daySeed % recipes.length];
  const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
  const card = document.getElementById('hero-card');
  const bg = document.getElementById('hero-bg');
  document.getElementById('hero-title').textContent = name;
  document.getElementById('hero-time').textContent = r.time + ' min';
  document.getElementById('hero-kcal').textContent = (r.nutrition&&r.nutrition.kcal)||'?';
  if (r.imageData || r.image) {
    bg.style.backgroundImage = 'url("' + escAttr(r.imageData || r.image).replace(/[()\\]/g, c => '\\' + c) + '")';
  } else {
    bg.style.background = 'linear-gradient(135deg, var(--primary), #1e1e1e)';
  }
  card.dataset.id = r.id;
  card.classList.add('show');
}

setTimeout(function() {
  setDynamicGradient();
  initSwipeTabs();
  initPullToRefresh();
  initScrollHeader();
  initLongPress();
  // Toggle masonry grid if setting enabled
  var grid = document.getElementById('recipe-grid');
  if (grid && appSettings.masonry) grid.classList.add('masonry');
  // Add staggered animation class to shopping
  var shopView = document.getElementById('shopping-list-view');
  if (shopView) shopView.classList.add('shop-animate-stagger');
}, 500);

// =================== SEASONAL CALENDAR ===================
var SEASONAL_PROD = [
  {m:0,produce:[],emoji:'❄️',label:'Zima',labelEn:'Winter',desc:'Koreňová zelenina, kapusta, citrusy',descEn:'Root veg, cabbage, citrus'},
  {m:1,produce:[],emoji:'❄️',label:'Zima',labelEn:'Winter',desc:'Pór, zeler, petržlen, pomaranče',descEn:'Leek, celery, parsley, oranges'},
  {m:2,produce:[],emoji:'🌸',label:'Jar',labelEn:'Spring',desc:'Rebarbora, špargľa, špenát, hlávkový šalát',descEn:'Rhubarb, asparagus, spinach, lettuce'},
  {m:3,produce:[],emoji:'🌸',label:'Jar',labelEn:'Spring',desc:'Špargľa, reďkovka, jarná cibuľka, žerucha',descEn:'Asparagus, radish, spring onion, cress'},
  {m:4,produce:[],emoji:'🌸',label:'Jar',labelEn:'Spring',desc:'Jahody, reďkovka, špenát, mladé zemiaky',descEn:'Strawberries, radish, spinach, new potatoes'},
  {m:5,produce:[],emoji:'🌞',label:'Leto',labelEn:'Summer',desc:'Čerešne, jahody, hrach, cuketa, uhorky',descEn:'Cherries, strawberries, peas, zucchini'},
  {m:6,produce:[],emoji:'🌞',label:'Leto',labelEn:'Summer',desc:'Maliny, ríbezle, broskyne, paradajky, paprika',descEn:'Raspberries, currants, peaches, tomatoes'},
  {m:7,produce:[],emoji:'🌞',label:'Leto',labelEn:'Summer',desc:'Slivky, marhule, kukurica, baklažán, fazuľa',descEn:'Plums, apricots, corn, eggplant, beans'},
  {m:8,produce:[],emoji:'🌞',label:'Leto',labelEn:'Summer',desc:'Hrozno, jablká, hrušky, tekvica, cesnak',descEn:'Grapes, apples, pears, pumpkin, garlic'},
  {m:9,produce:[],emoji:'🍂',label:'Jeseň',labelEn:'Autumn',desc:'Hrozno, jablká, orechy, kapusta, mrkva',descEn:'Grapes, apples, nuts, cabbage, carrots'},
  {m:10,produce:[],emoji:'🍂',label:'Jeseň',labelEn:'Autumn',desc:'Tekvica, gaštany, hrušky, cvikla, zemiaky',descEn:'Pumpkin, chestnuts, pears, beetroot'},
  {m:11,produce:[],emoji:'❄️',label:'Zima',labelEn:'Winter',desc:'Kapusta, kel, citrusy, datle, orechy',descEn:'Cabbage, kale, citrus, dates, nuts'},
];

function getSeasonalMonth() {
  var now = new Date();
  var m = now.getMonth();
  return SEASONAL_PROD[m] || SEASONAL_PROD[0];
}

function getSeasonalRecipes() {
  // Find recipes with tags matching the current season
  var seasonMap = {0:'zima',1:'zima',2:'jar',3:'jar',4:'jar',5:'leto',6:'leto',7:'leto',8:'leto',9:'jesen',10:'jesen',11:'zima'};
  var season = seasonMap[new Date().getMonth()] || 'leto';
  var seasonEn = {zima:'winter',jar:'spring',leto:'summer',jesen:'autumn'}[season];
  return recipes.filter(function(r) {
    var tags = (lang==='en' && r.tagsEn ? r.tagsEn : r.tags) || [];
    return tags.some(function(t) { return t === season || t === seasonEn; });
  }).slice(0, 3);
}

function renderSeasonalWidget(compact) {
  var sm = getSeasonalMonth();
  var sr = getSeasonalRecipes();
  var label = lang === 'en' ? sm.labelEn : sm.label;
  var desc = lang === 'en' ? sm.descEn : sm.desc;
  var html = '<div class="dash-card seasonal-card' + (compact ? ' seasonal-card-compact' : '') + '"><div class="seasonal-header"><span class="seasonal-icon">' + sm.emoji + '</span><div><div class="seasonal-title">' + (lang==='en'?'In season: ':'Sezóna: ') + label + '</div><div class="seasonal-desc">' + desc + '</div></div></div>';
  if (sr.length) {
    html += '<div class="seasonal-recipes">' + sr.map(function(r) {
      var name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
      return '<div class="seasonal-recipe" onclick="viewRecipe(' + r.id + ')">🍽️ ' + esc(name) + '</div>';
    }).join('') + '</div>';
  }
  html += '<div style="font-size:.62rem;color:var(--text3);margin-top:.25rem;">' + (lang==='en'?'Based on seasonal produce':'Podľa sezónnych surovín') + '</div></div>';
  return html;
}

// =================== AUTO SEASON TAGGING ===================
var SEASONAL_KEYS = {
  jar: { en: 'spring', keywords: ['spargla','asparagus','rebarbora','rhubarb','mlady','mlada','mlade','redkovka','radish','jarna','jahoda','strawberry','jahody','strawberries','spenat','spinach','hrach','pea','pazitka','chives','bylinky','herbs','mata','mint','kopor','dill','zerucha','cress'] },
  leto: { en: 'summer', keywords: ['paradajka','tomato','paradajky','tomatoes','uhorka','cucumber','paprika','pepper','cuketa','zucchini','baklazan','eggplant','kukurica','corn','fazula','bean','ceresne','cherries','bros kyna','peach','bros kyne','peaches','marhula','apricot','slivka','plum','malina','raspberry','maliny','raspberries','ribezle','currants','melon','gril','grill','salat','salad','cvikla','beetroot','sosovica','lentil','osviezujuci'] },
  jesen: { en: 'autumn', keywords: ['tekvica','pumpkin','gastan','chestnut','gastany','chestnuts','hrozno','grapes','jablko','apple','jablka','apples','hruska','pear','hrusky','pears','orech','nut','orechy','nuts','huby','mushrooms','hrfb','hrfby','kapusta','cabbage','kel','kale','batat','sweet potato','pastrnak','parsnip','peeeny','peena','peene'] },
  zima: { en: 'winter', keywords: ['pomaranc','orange','mandarinka','mandarin','citron','lemon','limetka','lime','datle','dates','figy','figs','zemiak','potato','zemiaky','potatoes','vyvar','broth','teply','klobasa','sausage','kapustnica','korenova','cibula','onion','cesnak','garlic'] }
};

function autoSeasonTag(ingredients, name) {
  if (!ingredients || !ingredients.length) return { tags: [], tagsEn: [] };
  var text = ingredients.join(' ').toLowerCase();
  if (name) text += ' ' + name.toLowerCase();
  // Normalize
  text = text.replace(/\u010d/g,'c').replace(/\u010f/g,'d').replace(/\u013e/g,'l').replace(/\u0148/g,'n').replace(/\u0155/g,'r').replace(/\u0161/g,'s').replace(/\u0165/g,'t').replace(/\u017e/g,'z').replace(/\u00e1/g,'a').replace(/\u00e4/g,'a').replace(/\u00e9/g,'e').replace(/\u00ed/g,'i').replace(/\u00f3/g,'o').replace(/\u00f4/g,'o').replace(/\u00fa/g,'u').replace(/\u00fd/g,'y');
  var result = [], resultEn = [];
  for (var season in SEASONAL_KEYS) {
    var data = SEASONAL_KEYS[season];
    var score = 0;
    for (var k = 0; k < data.keywords.length; k++) {
      if (text.indexOf(data.keywords[k]) >= 0) score += data.keywords[k].length;
    }
    if (score >= 5) {
      result.push(season);
      resultEn.push(data.en);
    }
  }
  if (result.length === 0) {
    // Guess based on category if available
    return { tags: [], tagsEn: [] };
  }
  return { tags: result, tagsEn: resultEn };
}

function previewSeasonTags() {
  var text = document.getElementById('r-ingredients').value;
  var name = document.getElementById('r-name').value;
  var result = autoSeasonTag(text.split('\n').map(function(s) { return s.trim(); }).filter(Boolean), name);
  var el = document.getElementById('season-status');
  if (el) {
    if (result.tags.length) {
      el.textContent = (lang==='en'?'Season: ':'Sezóna: ') + result.tags.map(function(t) { return {jar:'🌸 jar',leto:'🌞 leto',jesen:'🍂 jeseň',zima:'❄️ zima'}[t]||t; }).join(', ');
    } else {
      el.textContent = '';
    }
  }
}

// ======================== COOKING HISTORY ========================
function logCooking(recipeId) {
  const existing = cookingHistory.find(h => h.recipeId === recipeId && h.date === new Date().toISOString().slice(0,10));
  if (existing) {
    existing.count = (existing.count || 1) + 1;
  } else {
    cookingHistory.push({ recipeId, date: new Date().toISOString().slice(0,10), notes: '', count: 1 });
  }
  localStorage.setItem('cookingHistory', JSON.stringify(cookingHistory));
}

function openHistory() {
  const el = document.getElementById('history-list');
  const sorted = [...cookingHistory].sort((a,b) => b.date.localeCompare(a.date));
  if (!sorted.length) {
    el.innerHTML = `<p style="color:var(--text2);padding:.5rem 0;" data-lang="historyEmpty">Zatiaľ žiadna história.</p>`;
  } else {
    el.innerHTML = sorted.slice(0, 50).map(h => {
      const r = recipes.find(rec => rec.id === h.recipeId);
      const name = r ? (lang==='en'&&r.nameEn?r.nameEn:r.name) : '?';
      return `<div style="display:flex;align-items:center;gap:.4rem;padding:.3rem .4rem;border-bottom:1px solid var(--border);font-size:.85rem;">
        <span style="flex:1;">${esc(name)}${h.count > 1 ? ` <span style="color:var(--text2);font-size:.75rem;">×${h.count}</span>` : ''}</span>
        <span style="color:var(--text2);font-size:.75rem;">${esc(h.date)}</span>
      </div>`;
    }).join('');
  }
  openModal('history-modal');
}

function clearHistory() {
  showConfirmModal(lang==='en'?'Clear cooking history?':'Vymazať celú históriu?', '🗑️', lang==='en'?'Clear':'Vymazať', function() {
  
  cookingHistory = [];
  localStorage.setItem('cookingHistory', JSON.stringify(cookingHistory));
  openHistory();
  });
}

// ======================== DEEP SEARCH ========================
function applyIngredientSearch() {
  if (ingredientSearchSelected.size > 0) {
    const sel = [...ingredientSearchSelected];
    const cat = document.getElementById('ingr-category').value;
    const matching = recipes.filter(r => {
      const ingr = (lang === "en" && r.ingredientsEn ? r.ingredientsEn : r.ingredients) || [];
      return sel.some(s => ingr.some(i => norm(i).includes(norm(s)))) && (!cat || r.category === cat);
    });
    const grid = document.getElementById('recipe-grid');
    if (!matching.length) { grid.innerHTML = `<div class="empty-state"><h3>😕 ${t('noRecipes')}</h3></div>`; return; }
    grid.innerHTML = matching.map(r => {
      const name = lang==='en'&&r.nameEn?r.nameEn:r.name;
      const tags = ((lang==="en"&&r.tagsEn?r.tagsEn:r.tags)||[]).slice(0, 2);
      const diff = r.difficulty||1;
      const san = esc(name), sanCat = esc(r.category), sanTime = esc(r.time);
      return `<div class="recipe-card" data-id="${r.id}"><button class="fav-btn ${r.favorite?'fav-active':''}" onclick="event.stopPropagation();toggleFav(${r.id})" aria-label="${r.favorite ? (lang==='en'?'Remove from favorites':'Odstrániť z obľúbených') : (lang==='en'?'Add to favorites':'Pridať do obľúbených')}">${r.favorite?'❤️':'🤍'}</button>
        <div class="recipe-card-img">${r.image||r.imageData?`<img src="${escAttr(r.imageData||r.image)}" alt="${san}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.outerHTML='<span style=\\'font-size:2.4rem\\'>🍽️</span>'">`:`🍽️`}</div>
        <div class="recipe-card-body">
        <h3>${san}</h3>
        <div class="meta-line"><span>📂 ${sanCat}</span><span>⏱ ${sanTime}</span>
        ${r.nutrition && appSettings.mealPlanner.showNutrition?`<span class="kcal-badge">🔥 ${esc(r.nutrition.kcal||'?')}</span>`:''}</div>
        <div style="display:flex;align-items:center;gap:.15rem;margin-top:.1rem;">
          ${[1,2,3].map(i=>`<span class="difficulty-dot ${i<=diff?'filled':'empty'}"></span>`).join('')}
        </div>
        <div class="tags">${tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div></div></div>`;
    }).join('');
  } else {
    render();
  }
}

// ======================== IMPORT FROM URL ========================
function cleanHtml(text) {
  if (!text || typeof text !== 'string') return '';
  let t = text;
  // Decode HTML entities (run twice for double-encoded entities)
  for (let pass = 0; pass < 2; pass++) {
    t = t.replace(/&aacute;/gi, '\u00e1').replace(/&eacute;/gi, '\u00e9').replace(/&iacute;/gi, '\u00ed')
      .replace(/&oacute;/gi, '\u00f3').replace(/&uacute;/gi, '\u00fa').replace(/&yacute;/gi, '\u00fd')
      .replace(/&Aacute;/gi, '\u00c1').replace(/&Eacute;/gi, '\u00c9').replace(/&Iacute;/gi, '\u00cd')
      .replace(/&Oacute;/gi, '\u00d3').replace(/&Uacute;/gi, '\u00da')
      .replace(/&scaron;/gi, '\u0161').replace(/&Scaron;/gi, '\u0160')
      .replace(/&ccaron;/gi, '\u010d').replace(/&Ccaron;/gi, '\u010c')
      .replace(/&zcaron;/gi, '\u017e').replace(/&Zcaron;/gi, '\u017d')
      .replace(/&ncaron;/gi, '\u0148').replace(/&dcaron;/gi, '\u010f').replace(/&tcaron;/gi, '\u0165')
      .replace(/&lcaron;/gi, '\u013e').replace(/&rcaron;/gi, '\u0159')
      .replace(/&auml;/gi, '\u00e4').replace(/&ouml;/gi, '\u00f6').replace(/&uuml;/gi, '\u00fc')
      .replace(/&ocirc;/gi, '\u00f4')
      .replace(/&amp;/gi, '&').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"').replace(/&apos;/gi, "'")
      .replace(/&nbsp;/gi, ' ').replace(/&#160;/gi, ' ')
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
      .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
  }
  // Convert HTML breaks to newlines
  t = t.replace(/<br\s*\/?>/gi, '\n').replace(/<p[^>]*>/gi, '\n').replace(/<\/p>/gi, '\n');
  t = t.replace(/<\/li>/gi, '\n').replace(/<li[^>]*>/gi, '');
  t = t.replace(/<\/div>/gi, '\n').replace(/<div[^>]*>/gi, '');
  t = t.replace(/<ol[^>]*>/gi, '').replace(/<\/ol>/gi, '\n');
  t = t.replace(/<ul[^>]*>/gi, '').replace(/<\/ul>/gi, '\n');
  // Strip all remaining HTML tags
  t = t.replace(/<[^>]+>/g, '');
  // Normalize
  t = t.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  t = t.split('\n').map(l => l.trim()).filter(Boolean).join('\n');
  t = t.replace(/[ \t]{2,}/g, ' ').replace(/^\d+\.\s*/, ''); // Remove leading step numbers
  return t.trim();
}

const IMPORT_URL_HISTORY_KEY = 'importUrlHistory';
const SUPPORTED_SITES = ['varecha.pravda.sk', 'mnamky.sk', 'recepty.sk', 'allrecipes.com', 'bbcgoodfood.com', 'foodnetwork.com'];

function showImportUrlModal() {
  const input = document.getElementById('import-url-input');
  if (input) { input.value = ''; input.className = ''; }
  setImportStatus('');
  setImportBusy(false);
  // Show supported site chips
  const chips = document.getElementById('import-url-chips');
  if (chips) {
    chips.innerHTML = SUPPORTED_SITES.map(site =>
      `<span class="site-chip" onclick="document.getElementById('import-url-input').value='https://${site}/';document.getElementById('import-url-input').focus();validateImportUrl()">${esc(site)}</span>`
    ).join('');
  }
  // Hide any old history
  const hist = document.getElementById('import-url-history');
  if (hist) hist.style.display = 'none';
  openModal('import-url-modal');
  setTimeout(function() { if (input) input.focus(); }, 300);
}

function validateImportUrl() {
  const input = document.getElementById('import-url-input');
  const btn = document.getElementById('import-url-btn');
  if (!input) return;
  const url = input.value.trim();
  if (!url) { input.className = ''; if (btn) btn.disabled = true; setImportStatus(''); return; }
  try {
    const parsed = new URL(url);
    if (!parsed.protocol.startsWith('http')) throw new Error();
    input.className = 'valid';
    if (btn) btn.disabled = false;
    setImportStatus('✅ ' + (lang === 'en' ? 'Valid URL' : 'Platná URL'));
  } catch(e) {
    input.className = 'invalid';
    if (btn) btn.disabled = true;
    setImportStatus('⚠️ ' + (lang === 'en' ? 'Invalid URL' : 'Neplatná URL'));
  }
}

function pasteImportUrl() {
  navigator.clipboard.readText().then(text => {
    const input = document.getElementById('import-url-input');
    if (input && text) { input.value = text; validateImportUrl(); }
  }).catch(function() {
    showToast(lang === 'en' ? 'Cannot access clipboard' : 'Nedá sa pristúpiť ku schránke');
  });
}

function openImportUrlModal() {
  showImportUrlModal();
}

function setImportStatus(message) {
  const status = document.getElementById('import-url-status');
  if (status) status.textContent = message || '';
}

function setImportBusy(isBusy) {
  const btn = document.getElementById('import-url-btn');
  if (btn) btn.disabled = !!isBusy;
}

function fillImportedRecipe(data) {
  openFormModal();
  setValueSafe('r-name', data.name || '');
  setValueSafe('r-image', data.image || '');
  setValueSafe('r-ingredients', data.ingredients || '');
  setValueSafe('r-steps', data.steps || '');
  setValueSafe('r-time', data.time || 30);
  if (data.category) setValueSafe('r-category', data.category);
  setValueSafe('r-tags', (data.tags || []).join(', '));
  if (data.calories) setValueSafe('r-kcal', data.calories);
  setValueSafe('r-portions', data.portions || 4);
  const imageInput = document.getElementById('r-image');
  if (imageInput) imageInput.dispatchEvent(new Event('input'));
  if (!data.calories && data.rawIngredients) estimateAndFillImport(data.rawIngredients, data.portions || 4);
}

function showImportReview(data) {
  const old = document.getElementById('import-review-modal');
  if (old) old.remove();
  const ingredientsCount = data.ingredients ? data.ingredients.split('\n').filter(Boolean).length : 0;
  const stepsCount = data.steps ? data.steps.split('\n').filter(Boolean).length : 0;
  const div = document.createElement('div');
  div.id = 'import-review-modal';
  div.className = 'modal-overlay active';
  div.innerHTML = `<div class="modal import-review-modal">
    <button class="modal-close" onclick="document.getElementById('import-review-modal').remove()" aria-label="Zavrieť">✕</button>
    <h2>🌐 ${lang === 'en' ? 'Review import' : 'Skontrolovať import'}</h2>
    <div class="import-review-card">
      ${data.image ? `<img class="import-review-img" src="${escAttr(data.image)}" alt="">` : '<div class="import-review-img placeholder">🍽️</div>'}
      <div class="import-review-info">
        <div class="import-review-title">${esc(data.name || (lang === 'en' ? 'Untitled recipe' : 'Recept bez názvu'))}</div>
        <div class="import-review-meta">
          <span>⏱ ${esc(String(data.time || 30))} min</span>
          <span>🍽️ ${esc(String(data.portions || 4))}</span>
          <span>🥣 ${ingredientsCount}</span>
          <span>📝 ${stepsCount}</span>
        </div>
        <div class="import-review-source">${esc(data.source || '')}</div>
      </div>
    </div>
    <div class="import-review-columns">
      <div><strong>${lang === 'en' ? 'Ingredients' : 'Suroviny'}</strong><pre>${esc((data.ingredients || '').slice(0, 700))}</pre></div>
      <div><strong>${lang === 'en' ? 'Steps' : 'Postup'}</strong><pre>${esc((data.steps || '').slice(0, 700))}</pre></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="document.getElementById('import-review-modal').remove()">${lang === 'en' ? 'Cancel' : 'Zrušiť'}</button>
      <button class="btn btn-primary" onclick="acceptImportedRecipe()">${lang === 'en' ? 'Use this recipe' : 'Použiť recept'}</button>
    </div>
  </div>`;
  window._pendingImportRecipe = data;
  document.body.appendChild(div);
}

function acceptImportedRecipe() {
  try {
    if (window._pendingImportRecipe) fillImportedRecipe(window._pendingImportRecipe);
    const review = document.getElementById('import-review-modal');
    if (review) review.remove();
    closeModal('import-url-modal');
  } catch(e) {
    console.error('Import accept error:', e);
    showToast(lang === 'en' ? 'Import could not open the form.' : 'Import sa nepodarilo otvoriť vo formulári.', 'warning');
  }
}

function importFromUrl() {
  const input = document.getElementById('import-url-input');
  const url = input ? input.value.trim() : '';
  if (!url) return;
  // Validate URL
  try { new URL(url); } catch(e) { setImportStatus('❌ ' + (lang === 'en' ? 'Invalid URL format' : 'Neplatný formát URL')); return; }
  const loader = document.getElementById('import-url-loader');
  if (loader) loader.style.display = 'block';
  setImportStatus('⏳ ' + (lang === 'en' ? 'Fetching recipe...' : 'Sťahujem recept...'));
  setImportBusy(true);
  const SCRAPER_URL = 'https://mealnest-scraper.waldis994.workers.dev';
  let maxRetries = 2;
  function tryFetch(retriesLeft) {
    if (retriesLeft === undefined) retriesLeft = maxRetries;
    const proxyUrl = SCRAPER_URL + '?url=' + encodeURIComponent(url);
    let fetchUrl = proxyUrl;
    try {
      const parsedUrl = new URL(url, window.location.href);
      if (parsedUrl.origin === window.location.origin || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(parsedUrl.hostname)) {
        fetchUrl = parsedUrl.href;
      }
    } catch(e) {}
    setImportStatus(retriesLeft < maxRetries ? '⏳ Opakujem...' : '⏳ Načítavam...');
    fetch(fetchUrl, { cache: 'no-store' })
      .then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .catch(err => {
        if (retriesLeft > 0) { setTimeout(() => tryFetch(retriesLeft - 1), 1500); return; }
        throw err;
      })
      .then(raw => {
        if (!raw) return;
        let html = raw;
        try {
          const parsed = JSON.parse(raw);
          if (parsed.contents) html = parsed.contents;
        } catch(e) {}
        const jsonlds = [];
        const re = /<script\s+type=["']application\/ld\+json(?:;[\s\S]*?)?["'][^>]*>([\s\S]*?)<\/script>/gi;
        let m;
        while ((m = re.exec(html)) !== null) {
          try { jsonlds.push(JSON.parse(m[1])); } catch(e) {}
        }
        let recipe = null;
        for (const item of jsonlds) {
          const types = Array.isArray(item['@type']) ? item['@type'] : [item['@type']];
          if (types.some(t => t === 'Recipe' || t.endsWith(':Recipe'))) {
            recipe = item; break;
          }
          if (item['@graph']) {
            for (const g of item['@graph']) {
              const gTypes = Array.isArray(g['@type']) ? g['@type'] : [g['@type']];
              if (gTypes.some(t => t === 'Recipe' || t.endsWith(':Recipe'))) {
                recipe = g; break;
              }
            }
          }
          if (recipe) break;
        }
        if (!recipe) {
          setImportStatus(html.length < 200
            ? t('importUrlFail') + ' (prázdna odpoveď)'
            : t('importUrlBad'));
          setImportBusy(false);
          return;
        }
        const name = cleanHtml(recipe.name || '');
        const ingr = recipe.recipeIngredient || [];
        const steps = recipe.recipeInstructions || [];
        const time = recipe.totalTime || recipe.cookTime || '';
        const image = recipe.image ? (typeof recipe.image === 'string' ? recipe.image : recipe.image.url || (Array.isArray(recipe.image) ? recipe.image[0] : '') || '') : '';
        const yield_ = recipe.recipeYield || '';
        const cuisine = recipe.recipeCuisine || '';
        const category = recipe.recipeCategory || '';
        const calories = recipe.nutrition && recipe.nutrition.calories ? String(recipe.nutrition.calories).replace(/[^0-9]/g,'') : '';
        const ingrText = (Array.isArray(ingr) ? ingr : []).map(i => cleanHtml(typeof i === 'string' ? i : '')).join('\n');
        const stepsArr = Array.isArray(steps) ? steps.map(s => cleanHtml(typeof s === 'string' ? s : s.text || s.name || '')) :
          typeof steps === 'string' ? cleanHtml(steps).split('\n').filter(Boolean) : [];
        // Ak nedostaneme vela krokov, skusime delit podla <p> alebo <br>
        if (stepsArr.length <= 2 && typeof steps === 'string' && steps.match(/<p|<br|<li/i)) {
          const htmlSteps = steps.split(/<\/p>|<br\s*\/?|<\/li>/i).map(s => cleanHtml(s)).filter(s => s.length > 3);
          if (htmlSteps.length > stepsArr.length) stepsArr.length = 0, stepsArr.push.apply(stepsArr, htmlSteps);
        }
        const stepText = stepsArr.join('\n');
        let timeNum = 30;
        if (time) {
          timeNum = 0;
          const hMatch = time.match(/(\d+)\s*H/i);
          const mMatch = time.match(/(\d+)\s*M/i);
          if (hMatch) timeNum += parseInt(hMatch[1]) * 60;
          if (mMatch) timeNum += parseInt(mMatch[1]);
          if (!timeNum) timeNum = parseInt(time.replace(/[^0-9]/g,'')) || 30;
        }
        const cats = ['Hlavné jedlá','Polievky','Šaláty','Dezerty','Pečivo','Nápoje','Predjedlá','Raňajky','Prílohy','Detské'];
        const catMatch = cats.find(c => norm(category).includes(norm(c)) || norm(c).includes(norm(category)));
        let yieldNum = parseInt(yield_) || 4;
        const tags = [];
        if (cuisine) { const t = cuisine.split(',').map(s => s.trim().toLowerCase()); tags.push(...t); }
        if (recipe.keywords) { const t = (typeof recipe.keywords === 'string' ? recipe.keywords : (Array.isArray(recipe.keywords) ? recipe.keywords.join(',') : '')).split(',').map(s => s.trim().toLowerCase()); tags.push(...t); }
        let perPortionCalories = '';
        if (calories) {
          // Source provided total calories - divide by yield for per-portion
          const calTotal = parseInt(calories);
          perPortionCalories = Math.round(calTotal / yieldNum) || calTotal;
        }
        const importData = {
          name: name,
          image: image,
          ingredients: ingrText,
          rawIngredients: Array.isArray(ingr) ? ingr : [],
          steps: stepText,
          time: timeNum,
          category: catMatch || '',
          tags: [...new Set(tags)],
          calories: perPortionCalories,
          portions: yieldNum,
          source: url
        };
        setImportStatus(t('importUrlOk'));
        setImportBusy(false);
        showImportReview(importData);
      })
      .catch(err => {
        // Chyba už je ošetrená v .catch() pred .then()
        // Ak by sa dostala sem, skúsime ešte raz
        setImportStatus(t('importUrlFail'));
        setImportBusy(false);
        console.error('Scraper error:', err);
      });
  }
  tryFetch(maxRetries);
}

