// ======================== TRANSLATIONS ========================
const LANG = {
  sk: {
    appTitle: 'Plánovač jedál', appSubtitle: 'Týždenný plánovač s receptami',
    navRecipes: 'Recepty', navShopping: 'Nákup', navFavs: 'Obľúbené', navSettings: 'Nastavenia', navDashboard: 'Domov',
    searchPlaceholder: 'Hľadať...', allCategories: 'Všetky kategórie',
    btnAdd: '➕ Nový', btnMore: '⚙️ Viac', btnByIngr: '🥕 Suroviny', btnRandom: 'Náhodný',
    sortName: 'Názov', sortTime: 'Čas', sortRating: 'Hodnotenie',
    heroCta: 'Zobraziť recept',
    navFavs: 'Obľúbené',
    formTitle: 'Nový recept', formName: 'Názov', formNamePlace: 'Názov',
    formCategory: 'Kategória', formTime: 'Čas (min)', formImage: 'Obrázok',
    formImagePlace: 'URL', formUpload: 'Nahrať', formNutrition: 'Nutričné hodnoty (na porciu)',
    formIngredients: 'Suroviny (každá na nový riadok)', formIngrPlace: '200g múky',
    formSteps: 'Postup (každý krok na nový riadok)', formStepsPlace: '1. Zmiešajte...',
    formTags: 'Štítky (oddelené čiarkou)', formTagsPlace: 'rýchle, lacné',
    cancel: 'Zrušiť', save: 'Uložiť',
    btnCook: 'Variť', btnPrint: 'Tlačiť', btnShare: 'Zdieľať', btnEdit: 'Upraviť',
    btnDelete: 'Vymazať', close: 'Zavrieť',
    cookingClose: 'Zavrieť', cookingPrev: 'Predošlý', cookingNext: 'Ďalší',

    ingrTitle: '🔍 Čo máš doma?',     ingrHint: 'Označ suroviny, ktoré máš – zobrazia sa recepty, ktoré z nich uvaríš.',
    ingrFilter: 'Filtrovať suroviny...', ingrClear: 'Vyčistiť', ingrDone: 'Hotovo',
    noRecipes: 'Žiadne recepty', noRecipesHint: 'Skúste iný filter alebo pridajte nový recept.',
    noMatch: 'Žiadne recepty neobsahujú všetky vybrané suroviny. Skús označiť menej surovín.',
    matchCount: 'receptov sedí', matchPart: 'receptov sedí čiastočne',
    shareWhatsApp: 'WhatsApp', shareMessenger: 'Messenger', shareEmail: 'Email',
    cookingDone: 'Hotovo! Dobrú chuť! 🎉', cookingTimerStart: 'Spustiť', cookingTimerStop: 'Stop',
    exportError: 'Neplatný súbor. Vyber JSON exportovaný z aplikácie Mealnest.',
    importConfirm: 'Naozaj chceš importovať', importOk: 'Importovaných',
    deleteConfirm: 'Naozaj chceš vymazať tento recept?',
    recipeNutri: 'Nutričné hodnoty', kcal: 'kcal', protein: 'bielkoviny', fat: 'tuky', carbs: 'sacharidy',
    perPortion: 'na porciu',
    allAges: 'Všetky veky', age6m: '6m+', age1: '1r+', age2: '2r+', age3: '3r+',
        childAge: 'Vek dieťaťa', childAgeHint: 'rokov (nastav pre lepšie AI návrhy)',
    difficulty:'Obtiažnosť',
    diffEasy:'Ľahké', diffMedium:'Stredné', diffHard:'Ťažké',
    btnCopy:'📋 Kopírovať',
    portions: 'Porcie:',
    tipOfDay: 'Tip dňa:',
    btnHistory: '📜 História', cookingHistory: '📜 História varenia', historyClear: '🗑 Vymazať históriu', historyEmpty: 'Zatiaľ žiadna história.',
    btnImportUrl:'Import z URL', importUrlTitle:'🌐 Importovať recept z URL', importUrlHint:'Vlož odkaz na recept (varecha.pravda.sk) – aplikácia ho stiahne a predvyplní formulár.', importUrlDo:'📥 Importovať', importUrlOk:'✅ Recept načítaný! Skontroluj a ulož.', importUrlFail:'❌ Nepodarilo sa načítať recept. Skús iný odkaz.', importUrlBad:'❌ Nenašiel sa žiadny recept na tejto URL. Skús iný odkaz.', importFormTitle:'Import z URL', importFormSub:'Vlož odkaz a recept sa vyplní sám',
    moreLabelTools: 'NÁSTROJE', moreLabelData: 'DÁTA', moreLabelWeb: 'WEB',
    btnExport: 'Export', btnImport: 'Import',
    navPlanner: 'Plánovač', plannerTitle: '📅 Plánovač jedál', plannerClear: '🗑', plannerToday: 'dnes', plannerCustom: '✍️ Napíš vlastné jedlo...',
    plannerWeek: 'Celý týždeň', plannerWeekHide: 'Skryť týždeň',
    plannerShopping: '🛒 Nákupný zoznam', plannerCopy: '📋 Kopírovať',
    plannerPick: 'Vybrať recept', plannerEmpty: '+ pridať',
    plannerEmptyList: 'Zatiaľ žiadne recepty v pláne.',
    shopClearChecked: 'Vyčistiť zaškrtnuté', shopClearAll: 'Vymazať všetko',
    settingsTitle: '⚙️ Nastavenia', settingsLang: 'Jazyk',
    autoFill: 'Auto-odhadnúť zo surovín',
    unmatchedHint: 'surovín nebolo presne nájdených',
    nutritionPerPortion: 'Na porciu',
    nutritionTotal: 'Celý recept',
    nutritionPortions: 'Porcie:',
    nutritionHearty: 'Výdatné jedlo',
    nutritionCheck: 'Skontroluj počet porcií alebo množstvá surovín.',
    nutritionTotalLabel: 'celý recept',
    nutritionConfidence: 'Spoľahlivosť',
    dry: 'Suché',
    oily: 'Mastné',
    wet: 'Mokré',
    portionUnit: 'porcií',
    fabTask: '✅ Úloha', fabMeal: '🍽️ Jedlo', fabFood: '🛒 Potravina',
    navTasks: 'Úlohy', navBoard: 'Nástenka', tasksTitle: 'Úlohy', tasksToday: 'Dnes', tasksTomorrow: 'Zajtra', tasksWeek: 'Tento týždeň', tasksDone: 'Dokončené',
    tasksEmpty: 'Dnes máš voľno ✨', tasksEmptyDesc: 'Žiadne úlohy. Pridaj si nejakú!',
    tasksAdd: 'Pridať úlohu', tasksEdit: 'Upraviť úlohu', tasksSave: 'Uložiť', tasksDelete: 'Vymazať',
    tasksCatCooking: 'Varenie', tasksCatShopping: 'Nákup', tasksCatHousehold: 'Domácnosť', tasksCatKid: 'Dieťa', tasksCatCustom: 'Vlastné',
    tasksPriorityLow: 'Nízka', tasksPriorityMedium: 'Stredná', tasksPriorityHigh: 'Vysoká',
    tasksRepeatNone: 'Žiadne', tasksRepeatDaily: 'Denne', tasksRepeatWeekly: 'Týždenne',
    tasksWidgetTitle: 'Dnešné úlohy', tasksWidgetDone: 'dokončené', tasksWidgetRemaining: 'zostáva',
    tasksHomeTitle: 'Dnešné úlohy', tasksHomeEmpty: 'Dnes voľno ✨', tasksShowAll: 'Zobraziť všetky',
    tasksQuickAdd: 'Rýchlo pridať...', tasksNote: 'Poznámka', tasksDate: 'Dátum', tasksTime: 'Čas',
    tasksCategory: 'Kategória', tasksPriority: 'Priorita', tasksRepeat: 'Opakovanie',

  },
  en: {
    appTitle: 'Meal Planner', appSubtitle: 'Weekly meal planner with recipes',
    navRecipes: 'Recipes', navShopping: 'Shopping', navFavs: 'Favorites', navSettings: 'Settings', navDashboard: 'Home',
    searchPlaceholder: 'Search...', allCategories: 'All categories',
    btnAdd: '➕ New', btnMore: '⚙️ More', btnByIngr: '🥕 Ingredients', btnRandom: 'Random',
    sortName: 'Name', sortTime: 'Time', sortRating: 'Rating',
    heroCta: 'View recipe',
    navFavs: 'Favorites',
    formTitle: 'New Recipe', formName: 'Name', formNamePlace: 'Recipe name',
    formCategory: 'Category', formTime: 'Time (min)', formImage: 'Image',
    formImagePlace: 'URL', formUpload: 'Upload', formNutrition: 'Nutrition (per serving)',
    formIngredients: 'Ingredients (one per line)', formIngrPlace: '200g flour',
    formSteps: 'Steps (one per line)', formStepsPlace: '1. Mix together...',
    formTags: 'Tags (comma separated)', formTagsPlace: 'quick, cheap, vegetarian',
    cancel: 'Cancel', save: 'Save',
    btnCook: 'Cook', btnPrint: 'Print', btnShare: 'Share', btnEdit: 'Edit',
    btnDelete: 'Delete', close: 'Close',
    cookingClose: 'Close', cookingPrev: 'Previous', cookingNext: 'Next',

    ingrTitle: '🔍 What do you have?', ingrHint: 'Check ingredients you have at home – recipes you can make will show up.',
    ingrFilter: 'Filter ingredients...', ingrClear: 'Clear', ingrDone: 'Done',
    noRecipes: 'No recipes', noRecipesHint: 'Try a different filter or add a new recipe.',
    noMatch: 'No recipes match all selected ingredients. Try selecting fewer.',
    matchCount: 'recipes match', matchPart: 'recipes partially match',
    shareWhatsApp: 'WhatsApp', shareMessenger: 'Messenger', shareEmail: 'Email',
    cookingDone: 'Done! Enjoy your meal! 🎉', cookingTimerStart: 'Start', cookingTimerStop: 'Stop',
    exportError: 'Invalid file. Select a JSON exported from Recipe Book.',
    importConfirm: 'Import', importOk: 'Imported',
    deleteConfirm: 'Really delete this recipe?',
    recipeNutri: 'Nutrition', kcal: 'kcal', protein: 'protein', fat: 'fat', carbs: 'carbs',
    perPortion: 'per serving',
    allAges: 'All ages', age6m: '6m+', age1: '1y+', age2: '2y+', age3: '3y+',
        childAge: 'Child age', childAgeHint: 'years (set for better AI suggestions)',
    difficulty:'Difficulty',
    diffEasy:'Easy', diffMedium:'Medium', diffHard:'Hard',
    btnCopy:'📋 Copy',
    portions: 'Servings:',
    tipOfDay: 'Tip of the day:',
    btnHistory: '📜 History', cookingHistory: '📜 Cooking history', historyClear: '🗑 Clear history', historyEmpty: 'No history yet.',
    btnImportUrl:'Import from URL', importUrlTitle:'🌐 Import recipe from URL', importUrlHint:'Paste a recipe link (varecha.pravda.sk) – the app will fetch and prefill the form.', importUrlDo:'📥 Import', importUrlOk:'✅ Recipe loaded! Check and save.', importUrlFail:'❌ Failed to load recipe. Try a different link.', importUrlBad:'❌ No recipe found at this URL. Try another link.', importFormTitle:'Import from URL', importFormSub:'Paste a link and the recipe fills automatically',
    moreLabelTools: 'TOOLS', moreLabelData: 'DATA', moreLabelWeb: 'WEB',
    btnExport: 'Export', btnImport: 'Import',
    navPlanner: 'Planner', plannerTitle: '📅 Meal Planner', plannerClear: '🗑', plannerToday: 'today', plannerCustom: '✍️ Type custom meal...',
    plannerShopping: '🛒 Shopping List', plannerCopy: '📋 Copy',
    plannerPick: 'Pick a recipe', plannerEmpty: '+ add',
    plannerEmptyList: 'No recipes in the plan yet.',
    shopClearChecked: 'Clear checked', shopClearAll: 'Clear all',
    plannerWeek: 'Full week', plannerWeekHide: 'Hide week',
    settingsTitle: '⚙️ Settings', settingsLang: 'Language',
    autoFill: 'Auto-estimate from ingredients',
    unmatchedHint: 'ingredients not exactly matched',
    navTasks: 'Tasks', navBoard: 'Board', tasksTitle: 'Tasks', tasksToday: 'Today', tasksTomorrow: 'Tomorrow', tasksWeek: 'This Week', tasksDone: 'Completed',
    tasksEmpty: 'You have a free day ✨', tasksEmptyDesc: 'No tasks today. Add one!',
    tasksAdd: 'Add task', tasksEdit: 'Edit task', tasksSave: 'Save', tasksDelete: 'Delete',
    tasksCatCooking: 'Cooking', tasksCatShopping: 'Shopping', tasksCatHousehold: 'Household', tasksCatKid: 'Kids', tasksCatCustom: 'Custom',
    tasksPriorityLow: 'Low', tasksPriorityMedium: 'Medium', tasksPriorityHigh: 'High',
    tasksRepeatNone: 'None', tasksRepeatDaily: 'Daily', tasksRepeatWeekly: 'Weekly',
    tasksWidgetTitle: 'Today\'s Tasks', tasksWidgetDone: 'done', tasksWidgetRemaining: 'left',
    tasksHomeTitle: 'Today\'s Tasks', tasksHomeEmpty: 'Free day ✨', tasksShowAll: 'Show all',
    tasksQuickAdd: 'Quick add...', tasksNote: 'Note', tasksDate: 'Date', tasksTime: 'Time',
    tasksCategory: 'Category', tasksPriority: 'Priority', tasksRepeat: 'Repeat',
    nutritionPerPortion: 'Per portion',
    nutritionTotal: 'Whole recipe',
    nutritionPortions: 'Servings:',
    nutritionHearty: 'Hearty meal',
    nutritionCheck: 'Check serving count or ingredient amounts.',
    nutritionTotalLabel: 'entire recipe',
    nutritionConfidence: 'Confidence',
    dry: 'Dry',
    oily: 'Oily',
    wet: 'Wet',
    portionUnit: 'portions',
    fabTask: '✅ Task', fabMeal: '🍽️ Meal', fabFood: '🛒 Food',

  }
 };

// ======================== AUTH + DATA NAMESPACE ========================
let authUser = null;      // Firebase user object
let authIsGuest = false;  // true = guest mode, false = logged in
let authLoading = true;   // waiting for Firebase Auth init
let storeNs = 'guest_';   // default: guest namespace
// Restore correct namespace BEFORE data loads
try {
  const savedAuth = JSON.parse(localStorage.getItem('authUser') || 'null');
  if (savedAuth && savedAuth.uid) { storeNs = 'user_' + savedAuth.uid + '_'; }
  else if (localStorage.getItem('authGuest') === '1') { storeNs = 'guest_'; }
} catch(e) { storeNs = 'guest_'; }

// Shared keys that are NOT user-scoped
const GLOBAL_KEYS = new Set(['lang','dark','accent','appSettings','notifFired','notifFiredToday','familyCode','deviceId','tipDismissed','authUser','authGuest','authMigrateFromGuest','_appVersion','_migrated_v2','_imgcache_cleared_v4','onboardingCompleted','childAge']);

// Patch localStorage to auto-namespace data keys
(function patchLocalStorage() {
  const _get = Storage.prototype.getItem;
  const _set = Storage.prototype.setItem;
  const _remove = Storage.prototype.removeItem;
  Storage.prototype.getItem = function(key) {
    if (GLOBAL_KEYS.has(key)) return _get.call(this, key);
    return _get.call(this, storeNs + key);
  };
  Storage.prototype.setItem = function(key, val) {
    if (GLOBAL_KEYS.has(key)) return _set.call(this, key, val);
    return _set.call(this, storeNs + key, val);
  };
  Storage.prototype.removeItem = function(key) {
    if (GLOBAL_KEYS.has(key)) return _remove.call(this, key);
    return _remove.call(this, storeNs + key);
  };
  // Save raw refs for migration
  window._lsGet = _get;
  window._lsSet = _set;
})();

function setStoreNamespace(ns) { storeNs = ns; }

// Firebase Auth functions
function initFirebaseAuth() {
  if (!firebaseReady || typeof firebase.auth !== 'function') return;
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      authUser = user;
      authIsGuest = false;
      authLoading = false;
      setStoreNamespace('user_' + user.uid + '_');
      // Reload data from new namespace
      try { recipes = JSON.parse(localStorage.getItem('recipes') || 'null') || []; } catch(e) {}
      try { mealPlan = JSON.parse(localStorage.getItem('mealPlan') || '{}'); } catch(e) {}
      try { mealPlanKids = JSON.parse(localStorage.getItem('mealPlanKids') || '{}'); } catch(e) {}
      try { loadShopItems(); } catch(e) {}
      try { tasks = JSON.parse(localStorage.getItem('tasks') || '[]'); } catch(e) {}
      // If user namespace is empty, try to load from guest namespace
      if (!recipes || (Array.isArray(recipes) && recipes.length === 0)) {
        var guestRecipes = window._lsGet.call(localStorage, 'guest_recipes');
        if (guestRecipes) {
          try { var gr = JSON.parse(guestRecipes); if (gr && gr.length) { recipes = gr; saveToLS(); } } catch(e) {}
        }
      }
      localStorage.setItem('authUser', JSON.stringify({ uid: user.uid, name: user.displayName, email: user.email, photo: user.photoURL }));
      localStorage.removeItem('authGuest');
      document.getElementById('login-overlay').style.display = 'none';
      migrateGuestToUser();
      updateAuthUI();
      initNotifications();
      renderDashboard();
    } else {
      authLoading = false;
      if (localStorage.getItem('authGuest') === '1') {
        authUser = null;
        authIsGuest = true;
        setStoreNamespace('guest_');
        document.getElementById('login-overlay').style.display = 'none';
        updateAuthUI();
        renderDashboard();
      } else {
        authUser = null;
        authIsGuest = false;
        setStoreNamespace('guest_');
        document.getElementById('login-overlay').style.display = 'flex';
        updateAuthUI();
      }
    }
    // Hide splash after first auth state is resolved
    if (window._hideSplash) window._hideSplash();
  });
}

function signInWithGoogle() {
  if (!firebaseReady || !firebase.auth) { showToast('Firebase Auth nie je dostupná.','error'); return; }
  const provider = new firebase.auth.GoogleAuthProvider();
  const doSignIn = () => firebase.auth().signInWithPopup(provider).catch(err => {
    if (err.code === 'auth/popup-blocked' || err.code === 'auth/cancelled-popup-request') {
      firebase.auth().signInWithRedirect(provider);
    }
  });
  if (authIsGuest) {
    // Guest logging in — ask about migration
    showConfirmModal(lang==='en'?'Transfer your data to this account?':'Chceš preniesť aktuálne dáta do účtu?', '📦', lang==='en'?'Transfer':'Preniesť', function() {
        localStorage.setItem('authMigrateFromGuest', '1');
      });
  }
  doSignIn();
}

function signOutUser() {
  showConfirmModal(lang==='en'?'Sign out from Mealnest?':'Odhlásiť sa z Mealnestu?', '👋', lang==='en'?'Sign out':'Odhlásiť', function() {
    
  if (!firebase.auth) return;
  firebase.auth().signOut().then(() => {
    authUser = null;
    authIsGuest = false;
    setStoreNamespace('guest_');
    localStorage.removeItem('authUser');
    localStorage.removeItem('authGuest');
    document.getElementById('login-overlay').style.display = 'flex';
    updateAuthUI();
  }).catch(() => {});
  });
}

function continueAsGuest() {
  authIsGuest = true;
  authUser = null;
  setStoreNamespace('guest_');
  localStorage.setItem('authGuest', '1');
  localStorage.removeItem('authUser');
  document.getElementById('login-overlay').style.display = 'none';
  updateAuthUI();
  // onAuthStateChanged callback už prekreslí UI a načíta správny namespace
  // location.reload() nie je potrebný a spôsobuje zbytočné bliknutie
}

function migrateGuestToUser() {
  const flag = localStorage.getItem('authMigrateFromGuest');
  if (flag !== '1') return;
  localStorage.removeItem('authMigrateFromGuest');
  const userNs = 'user_' + authUser.uid + '_';
  const guestKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k.startsWith('guest_')) guestKeys.push(k);
  }
  // Bypass namespace patch: use raw getItem
  const rawGet = Storage.prototype.getItem;
  guestKeys.forEach(k => {
    const dataKey = k.replace('guest_', '');
    if (GLOBAL_KEYS.has(dataKey)) return;
    const val = rawGet.call(localStorage, k);
    if (val !== null) {
      // Write using current namespace (user_{uid}_ key)
      localStorage.setItem(dataKey, val);
    }
  });
  // Reload to pick up migrated data in JS variables
  setTimeout(() => location.reload(), 300);
}

function updateAuthUI() {
  const el = document.getElementById('header-auth-area');
  if (!el) return;
  if (authUser && authUser.photoURL) {
    el.innerHTML = `<img class="user-avatar" src="${authUser.photoURL}" alt="${authUser.displayName||''}" title="${authUser.displayName||''} — účet" onclick="openMorePageFromAnywhere('account')">`;
  } else if (authUser) {
    el.innerHTML = `<span class="topbar-btn" onclick="openMorePageFromAnywhere('account')" title="${lang==='en'?'Account':'Účet'}">👤</span>`;
  } else if (authIsGuest) {
    el.innerHTML = `<span class="guest-badge" onclick="openMorePageFromAnywhere('account')">${lang==='en'?'Guest':'Hosť'}</span>`;
  } else {
    el.innerHTML = '';
  }
}

// Wait for Firebase SDK to load (max 5s), then init with small delay to let app.js finish parsing
(function waitForFirebaseSDK(retries) {
  if (typeof firebase !== 'undefined' && firebase.initializeApp) {
    setTimeout(function() {
      initFirebase();
      initFirebaseAuth();
    }, 50);
  } else if (retries > 0) {
    setTimeout(waitForFirebaseSDK, 200, retries - 1);
  } else {
    console.warn('Firebase SDK not loaded after 5s');
    setTimeout(function() {
      initFirebase();
      initFirebaseAuth();
    }, 50);
  }
}(25)); // max ~5s wait

// ======================== ONBOARDING ========================
const ONBOARDING_SLIDES = [
  {
    icon: '🌐', title: 'Vyber si jazyk', titleEn: 'Choose language',
    sub: 'Vyber si preferovaný jazyk aplikácie.',
    subEn: 'Select your preferred language for the app.',
    langPicker: true
  },
  {
    icon: '👋', title: 'Vitaj v aplikácii Mealnest', titleEn: 'Welcome to Mealnest',
    sub: 'Tvoj moderný plánovač jedál, nákupov a úloh pre celú rodinu.',
    subEn: 'Your modern meal planner, shopping list & task manager for the whole family.',
    mockup: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">📅 Plán</div><div class="onboard-mockup-item">📖 Recepty</div><div class="onboard-mockup-item">🛒 Nákup</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">✅ Úlohy</div><div class="onboard-mockup-item">🍽️ AI</div><div class="onboard-mockup-item">🏠 Domov</div></div>
    </div>`,
    mockupEn: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">📅 Plan</div><div class="onboard-mockup-item">📖 Recipes</div><div class="onboard-mockup-item">🛒 Shop</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">✅ Tasks</div><div class="onboard-mockup-item">🍽️ AI</div><div class="onboard-mockup-item">🏠 Home</div></div>
    </div>`
  },
  {
    icon: '📅', title: 'Plánovač jedál', titleEn: 'Meal Planner',
    sub: 'Naplánuj si celý týždeň na pár kliknutí. Režim pre dospelých aj pre deti.',
    subEn: 'Plan your whole week in a few taps. Adult & kids mode.',
    mockup: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item" style="background:var(--primary-light);color:#fff;">🌅 Raňajky: Palacinky</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🍽️ Obed: Rizoto</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🌙 Večera: Losos</div></div>
    </div>`,
    mockupEn: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item" style="background:var(--primary-light);color:#fff;">🌅 Breakfast: Pancakes</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🍽️ Lunch: Risotto</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🌙 Dinner: Salmon</div></div>
    </div>`
  },
  {
    icon: '📖', title: 'Recepty', titleEn: 'Recipes',
    sub: 'Ukladaj si obľúbené recepty, prezeraj nutričné hodnoty a importuj z webu.',
    subEn: 'Save your favorite recipes, check nutrition & import from the web.',
    mockup: `<div class="onboard-mockup">
      <div class="onboard-mockup-bar" style="background:var(--primary);width:60%;"></div>
      <div style="font-size:.7rem;color:var(--text2);">🍽️ 65 receptov · 🔥 nutričné hodnoty · ❤️ obľúbené</div>
    </div>`,
    mockupEn: `<div class="onboard-mockup">
      <div class="onboard-mockup-bar" style="background:var(--primary);width:60%;"></div>
      <div style="font-size:.7rem;color:var(--text2);">🍽️ 65 recipes · 🔥 nutrition · ❤️ favorites</div>
    </div>`
  },
  {
    icon: '🌐', title: 'Import z URL', titleEn: 'Import from URL',
    sub: 'Stačí skopírovať odkaz na recept z webu a aplikácia ho spracuje za teba.',
    subEn: 'Just copy a recipe link from the web and the app imports it automatically.',
    mockup: `<div class="onboard-steps">
      <div class="onboard-step"><div class="onboard-step-num">1</div><span>Skopíruj URL receptu z webu</span></div>
      <div class="onboard-step"><div class="onboard-step-num">2</div><span>Klikni Import z URL v aplikácii</span></div>
      <div class="onboard-step"><div class="onboard-step-num">3</div><span>Recept sa automaticky spracuje ✨</span></div>
    </div>`,
    mockupEn: `<div class="onboard-steps">
      <div class="onboard-step"><div class="onboard-step-num">1</div><span>Copy a recipe URL from the web</span></div>
      <div class="onboard-step"><div class="onboard-step-num">2</div><span>Tap Import from URL in the app</span></div>
      <div class="onboard-step"><div class="onboard-step-num">3</div><span>The recipe is automatically imported ✨</span></div>
    </div>`
  },
  {
    icon: '🛒', title: 'Nákupný zoznam', titleEn: 'Shopping List',
    sub: 'Vytvor si zoznam potravín, rozdeľ ho do kategórií a odškrtávaj priamo v obchode.',
    subEn: 'Create grocery lists, organize by categories, and check off items in the store.',
    mockup: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🥦 Zelenina</div><div class="onboard-mockup-item">2/5 ✅</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🥩 Mäso</div><div class="onboard-mockup-item">0/3</div></div>
      <div class="onboard-mockup-bar"><div style="background:var(--success);width:40%;height:100%;border-radius:2px;"></div></div>
    </div>`,
    mockupEn: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🥦 Vegetables</div><div class="onboard-mockup-item">2/5 ✅</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🥩 Meat</div><div class="onboard-mockup-item">0/3</div></div>
      <div class="onboard-mockup-bar"><div style="background:var(--success);width:40%;height:100%;border-radius:2px;"></div></div>
    </div>`
  },
  {
    icon: '✅', title: 'Úlohy', titleEn: 'Tasks',
    sub: 'Maj prehľad o tom, čo treba uvariť, nakúpiť a vybaviť — každý deň.',
    subEn: 'Keep track of what to cook, buy, and organize. Every day.',
    mockup: `<div class="onboard-mockup" style="text-align:left;">
      <div style="font-size:.7rem;">📅 Dnes</div>
      <div style="background:var(--bg);border-radius:6px;padding:.3rem;margin:.2rem 0;font-size:.68rem;">☐ Tvoja úloha <span style="color:var(--primary-light);float:right;">●</span></div>
      <div style="background:var(--bg);border-radius:6px;padding:.3rem;font-size:.68rem;opacity:.5;">Žiadne demo dáta</div>
      <div style="font-size:.65rem;color:var(--text3);text-align:center;margin-top:.3rem;">Reálne úlohy po pridaní</div>
    </div>`,
    mockupEn: `<div class="onboard-mockup" style="text-align:left;">
      <div style="font-size:.7rem;">📅 Today</div>
      <div style="background:var(--bg);border-radius:6px;padding:.3rem;margin:.2rem 0;font-size:.68rem;">☐ Your task <span style="color:var(--primary-light);float:right;">●</span></div>
      <div style="background:var(--bg);border-radius:6px;padding:.3rem;font-size:.68rem;opacity:.5;">No demo data</div>
      <div style="font-size:.65rem;color:var(--text3);text-align:center;margin-top:.3rem;">Real tasks after adding</div>
    </div>`
  },
  {
    icon: '✨', title: 'Všetko pripravené!', titleEn: 'All set!',
    sub: 'Môžeš začať plánovať, variť a organizovať. Dobrú chuť!',
    subEn: 'You\'re ready to plan, cook, and organize. Enjoy your meal!',
    mockup: `<div style="font-size:4rem;margin-top:.5rem;">🍽️</div>`
  },
];

let _onboardIndex = 0;
function showOnboarding(forceShow) {
  if (!forceShow && localStorage.getItem('onboardingCompleted') === '1') return;
  const existing = document.getElementById('onboarding-overlay');
  if (existing) existing.remove();
  const ov = document.createElement('div');
  ov.id = 'onboarding-overlay';
  ov.className = 'active';
  ov.innerHTML = `<div class="onboard-slides" id="onboard-slides"></div>
    <div class="onboard-footer">
      <div class="onboard-dots" id="onboard-dots"></div>
      <button class="onboard-btn onboard-btn-primary" id="onboard-next">${lang==='en'?'Next →':'Ďalej →'}</button>
    </div>`;
  document.body.appendChild(ov);
  _onboardIndex = 0;
  renderOnboardSlide();
  document.getElementById('onboard-next').onclick = nextOnboardSlide;
  // Swipe support
  let touchStartX = 0;
  ov.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  ov.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 60) nextOnboardSlide();
    else if (diff < -60) prevOnboardSlide();
  });
}

function renderOnboardSlide() {
  const slides = document.getElementById('onboard-slides');
  const s = ONBOARDING_SLIDES[_onboardIndex];
  const l = lang === 'en' ? 'en' : 'sk';
  slides.innerHTML = ONBOARDING_SLIDES.map((s2, i) => {
    let cls = 'onboard-slide';
    if (i < _onboardIndex) cls += ' prev';
    else if (i > _onboardIndex) cls += ' next';
    const title = l === 'en' ? s2.titleEn : s2.title;
    const sub = l === 'en' ? s2.subEn : s2.sub;
    const mockup = s2.langPicker
      ? `<div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;justify-content:center;">
          <button id="onboard-lang-en" onclick="event.stopPropagation();pickOnboardLang('en')" style="padding:1rem 1.5rem;border-radius:16px;border:2px solid var(--border);background:var(--surface);color:var(--text);font-size:1rem;font-weight:700;cursor:pointer;min-width:140px;">🇬🇧 English</button>
          <button id="onboard-lang-sk" onclick="event.stopPropagation();pickOnboardLang('sk')" style="padding:1rem 1.5rem;border-radius:16px;border:2px solid var(--border);background:var(--surface);color:var(--text);font-size:1rem;font-weight:700;cursor:pointer;min-width:140px;">🇸🇰 Slovenčina</button>
        </div>`
      : l === 'en' && s2.mockupEn ? s2.mockupEn : s2.mockup || '';
    return `<div class="${cls}"><div class="onboard-illustration">${s2.icon}</div><div class="onboard-title">${title}</div><div class="onboard-sub">${sub}</div>${mockup}</div>`;
  }).join('');
  // Dots
  const dots = document.getElementById('onboard-dots');
  dots.innerHTML = ONBOARDING_SLIDES.map((_, i) => `<div class="onboard-dot${i === _onboardIndex ? ' active' : ''}"></div>`).join('');
  // Button
  const btn = document.getElementById('onboard-next');
  const isLast = _onboardIndex === ONBOARDING_SLIDES.length - 1;
  btn.textContent = isLast ? (l==='en'?'Start using Mealnest':'Začať používať') : (l==='en'?'Next →':'Ďalej →');
}

function nextOnboardSlide() {
  if (_onboardIndex < ONBOARDING_SLIDES.length - 1) { _onboardIndex++; renderOnboardSlide(); }
  else closeOnboarding();
}
function prevOnboardSlide() {
  if (_onboardIndex > 0) { _onboardIndex--; renderOnboardSlide(); }
}
function closeOnboarding() {
  document.getElementById('onboarding-overlay')?.remove();
  localStorage.setItem('onboardingCompleted', '1');
}

function pickOnboardLang(l) {
  appSettings.lang = l;
  lang = l;
  localStorage.setItem('lang', l);
  saveSettings();
  // Highlight active
  const enBtn = document.getElementById('onboard-lang-en');
  const skBtn = document.getElementById('onboard-lang-sk');
  if (enBtn) { enBtn.style.borderColor = l==='en'?'var(--primary)':'var(--border)'; enBtn.style.background = l==='en'?'rgba(220,38,38,.08)':'var(--surface)'; enBtn.style.color = l==='en'?'var(--primary)':'var(--text)'; }
  if (skBtn) { skBtn.style.borderColor = l==='sk'?'var(--primary)':'var(--border)'; skBtn.style.background = l==='sk'?'rgba(220,38,38,.08)':'var(--surface)'; skBtn.style.color = l==='sk'?'var(--primary)':'var(--text)'; }
  renderOnboardSlide();
}

// Show onboarding on first visit (after data loads)
setTimeout(() => showOnboarding(), 300);

// ======================== AI (DEEPSEEK PROXY) ========================
const APP_VERSION = '1.0.40';
const VAPID_PUBLIC_KEY = 'BI6Fga-GXSKggkNJ58R1VEYEfGE6KfWgnuDtI9sHqQLQJzGLshJuIuODmI13AVzX5D2Kd7SBxrr7Cvf-xRAowg0';
const PUSH_PROXY_URL = 'https://receptar.waldis994.workers.dev';

// ======================== PUSH NOTIFICATIONS ========================
let _pushSubscription = null;

async function registerPushSubscription() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
  if (Notification.permission !== 'granted') return;
  try {
    var reg = await navigator.serviceWorker.ready;
    var sub = await reg.pushManager.getSubscription();
    if (sub) {
      _pushSubscription = sub;
      savePushSubscription(sub);
      return sub;
    }
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });
    _pushSubscription = sub;
    savePushSubscription(sub);
    return sub;
  } catch(e) {
    console.error('Push subscription failed:', e);
    return null;
  }
}

function savePushSubscription(sub) {
  if (!sub) return;
  try {
    var data = JSON.parse(JSON.stringify(sub));
    var deviceId = getDeviceId();
    var key = 'push_subs_' + deviceId;
    localStorage.setItem(key, JSON.stringify(data));
    // Save to Firebase if family connected
    if (typeof familyDbRef !== 'undefined' && familyDbRef) {
      familyDbRef.child('pushSubscriptions/' + deviceId).set(data);
    }
  } catch(e) { /* silent */ }
}

async function sendPushToFamily(title, body, tab) {
  try {
    if (typeof familyDbRef === 'undefined' || !familyDbRef) return;
    // Get all subscriptions from Firebase
    var snap = await familyDbRef.child('pushSubscriptions').once('value');
    var subs = snap.val();
    if (!subs) return;
    var list = Object.values(subs);
    if (!list.length) return;
    // Send to Cloudflare Worker
    await fetch(PUSH_PROXY_URL + '/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscriptions: list,
        payload: JSON.stringify({ title: title, body: body, tab: tab || 'dashboard' })
      })
    }).catch(function(e) { console.error('Push send failed:', e); });
  } catch(e) { console.error('Push send error:', e); }
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  var raw = atob(base64);
  var output = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; ++i) output[i] = raw.charCodeAt(i);
  return output;
}

const AI_PROXY_URL = 'https://receptar.waldis994.workers.dev'; // Cloudflare Worker proxy pre DeepSeek

async function aiGenerate(messages, timeoutMs) {
  if (!AI_PROXY_URL || AI_PROXY_URL.includes('YOUR_CLOUDFLARE')) {
    showToast(t('AI nie je nastavená.','AI not configured.'),'error');
    return null;
  }
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeout = setTimeout(function() {
    if (controller) controller.abort();
  }, timeoutMs || 30000);
  try {
    const r = await fetch(AI_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal: controller ? controller.signal : undefined,
    });
    clearTimeout(timeout);
    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      console.error('AI proxy error', r.status, txt.slice(0,200));
      showToast(t('AI chyba: ','AI error: ')+r.status,'error');console.error('AI error:',r.status,txt);
      return null;
    }
    const data = await r.json();
    if (data.error) { showToast(t('AI chyba: ','AI error: ')+data.error,'error'); return null; }
    return data.reply || '';
  } catch(e) {
    clearTimeout(timeout);
    console.error('AI fetch failed:', e.message);
    showToast(e.name === 'AbortError' ? t('AI trvá príliš dlho.','AI is taking too long.') : t('AI nie je dostupná.','AI not available.'),'error');
    return null;
  }
}

async function aiWeeklyPlan() {
  const members = (appSettings.family && appSettings.family.householdMembers) || 2;
  const season = ['jar','jar','jar','leto','leto','leto','leto','leto','jeseň','jeseň','jeseň','zima'][new Date().getMonth()];
  const isKids = planType === 'kids';
  const childAge = isKids ? (localStorage.getItem('childAge') || '') : '';
  const ageHint = childAge ? ' Jedlá pre dieťa vo veku '+childAge+' rokov (prispôsob tomu porcie, veľkosť porcií a vhodnosť jedál).' : '';
  const style = isKids ? 'Jedlá vhodné pre deti (nie príliš korenené, jednoduché, obľúbené u detí).'+ageHint : '';
  const prompt = 'Navrhni jedálniček na 7 dní (pondelok až nedeľa) pre '+members+' člennú domácnosť. Ročné obdobie: '+season+'. '+style+' Pre každý deň navrhni: raňajky, desiatu, obed, olovrant, večeru. Formát: Pondelok: Raňajky: ... Desiata: ... Obed: ... Olovrant: ... Večera: ... (a tak 7 dní). Každé jedlo na nový riadok začína "Raňajky:", "Desiata:", "Obed:", "Olovrant:", "Večera:". Použi slovenské názvy.';
  return aiGenerate([{ role: 'user', content: prompt }]);
}

async function handleAIWeeklyPlan() {
  const reply = await aiWeeklyPlan();
  if (!reply) return;
  showAIPlanModal(reply);
}

function showAIPlanModal(text) {
  const old = document.getElementById('ai-plan-modal');
  if (old) old.remove();
  const div = document.createElement('div');
  div.id = 'ai-plan-modal';
  div.className = 'modal-overlay active';
  div.style.cssText = 'z-index:2000;';
  div.onclick = function(e) { if (e.target === this) this.remove(); };
  div.innerHTML = `<div class="modal" style="max-width:500px;max-height:85vh;overflow-y:auto;">
    <button class="modal-close" onclick="document.getElementById('ai-plan-modal').remove()">✕</button>
    <h2>🤖 AI návrh jedálnička</h2>
    <pre id="ai-plan-text" style="white-space:pre-wrap;font-size:.75rem;font-family:inherit;background:var(--bg);padding:.8rem;border-radius:8px;max-height:50vh;overflow-y:auto;">${esc(text)}</pre>
    <div style="display:flex;gap:.5rem;margin-top:.8rem;">
      <button class="btn btn-primary" onclick="parseAndFillAIPlan()" style="flex:1;">✅ Použiť</button>
      <button class="btn btn-secondary" onclick="document.getElementById('ai-plan-modal').remove()">${lang==='en'?'Cancel':'Zrušiť'}</button>
    </div>
  </div>`;
  document.body.appendChild(div);
}

function parseAndFillAIPlan() {
  const text = document.getElementById('ai-plan-text').textContent;
  document.getElementById('ai-plan-modal').remove();
  const weekKey = currentWeekKey();
  const dayMap = { 'pondelok':'pondelok','utorok':'utorok','streda':'streda','štvrtok':'štvrtok','piatok':'piatok','sobota':'sobota','nedeľa':'nedeľa','monday':'pondelok','tuesday':'utorok','wednesday':'streda','thursday':'štvrtok','friday':'piatok','saturday':'sobota','sunday':'nedeľa' };
  const mealSlots = ['raňajky','desiata','obed','olovrant','večera'];
  const slotAliases = {
    'raňajky':['raňajky','breakfast','ranajky','ranajka'],
    'desiata':['desiata','snack','dopoludnia'],
    'obed':['obed','lunch','obeda'],
    'olovrant':['olovrant','popoludní','poobede'],
    'večera':['večera','dinner','večere'],
  };
  const lines = text.split('\n');
  let currentDay = null;
  const plan = {};

  for (const line of lines) {
    const cleanLine = line.replace(/^[•\-\*\d\.\s]+/, '').trim();
    if (!cleanLine) continue;
    // Check if this is a day header
    const dayMatch = cleanLine.match(/^([A-ZÁ-Ž][a-zá-ž]+)/);
    if (dayMatch && dayMap[dayMatch[1].toLowerCase()]) {
      currentDay = dayMap[dayMatch[1].toLowerCase()];
      if (!plan[currentDay]) plan[currentDay] = {};
      continue;
    }
    if (!currentDay) continue;
    // Check if this is a meal line
    for (const [slot, aliases] of Object.entries(slotAliases)) {
      for (const alias of aliases) {
        const idx = cleanLine.toLowerCase().indexOf(alias);
        if (idx !== -1) {
          const after = cleanLine.substring(idx + alias.length).replace(/^[:：\s\-–—]+/, '').trim();
          if (after && !plan[currentDay][slot]) {
            plan[currentDay][slot] = { type: 'custom', text: after };
          }
          break;
        }
      }
    }
  }

  // Fill the planner
  const weekPlan = getWeekPlan(weekKey);
  Object.entries(plan).forEach(([day, meals]) => {
    if (!weekPlan[day]) weekPlan[day] = {};
    Object.entries(meals).forEach(([slot, entry]) => {
      weekPlan[day][slot] = entry;
    });
  });
  saveWeekPlan();
  renderPlanner();
  renderDashboard();
}

function aiIngredientSuggest() {
  openIngredientSuggestModal();
}

function openIngredientSuggestModal() {
  const old = document.getElementById('ai-ingredient-modal');
  if (old) old.remove();
  const div = document.createElement('div');
  div.id = 'ai-ingredient-modal';
  div.className = 'modal-overlay active';
  div.style.cssText = 'z-index:2000;';
  div.onclick = function(e) { if (e.target === this) this.remove(); };
  div.innerHTML = `<div class="modal ai-ingredient-modal">
    <button class="modal-close" onclick="document.getElementById('ai-ingredient-modal').remove()">✕</button>
    <h2>🤖 ${lang === 'en' ? 'What to cook?' : 'Čo uvariť?'}</h2>
    <p class="ai-ingredient-desc">${lang === 'en'
      ? 'Write what you have at home and I will suggest meals from your ingredients.'
      : 'Napíš, čo máš doma, a navrhnem jedlá zo surovín.'}</p>
    <textarea id="ai-ingredient-input" class="ai-ingredient-input" rows="4" placeholder="${lang === 'en' ? 'e.g. eggs, tomatoes, pasta, cheese' : 'napr. vajcia, paradajky, cestoviny, syr'}"></textarea>
    <div class="ai-ingredient-chips">
      ${['vajcia','cestoviny','kuracie','ryža','paradajky','syr'].map(x => `<button onclick="addIngredientChip('${x}')">${esc(x)}</button>`).join('')}
    </div>
    <div class="ai-ingredient-actions">
      <button class="btn btn-secondary" onclick="document.getElementById('ai-ingredient-modal').remove()">${lang === 'en' ? 'Cancel' : 'Zrušiť'}</button>
      <button class="btn btn-primary" id="ai-ingredient-submit" onclick="submitIngredientSuggest()">✨ ${lang === 'en' ? 'Suggest meals' : 'Navrhnúť jedlá'}</button>
    </div>
  </div>`;
  document.body.appendChild(div);
  setTimeout(function() {
    const input = document.getElementById('ai-ingredient-input');
    if (input) input.focus();
  }, 80);
}

function addIngredientChip(text) {
  const input = document.getElementById('ai-ingredient-input');
  if (!input) return;
  const current = input.value.trim();
  input.value = current ? current.replace(/\s*$/, '') + ', ' + text : text;
  input.focus();
}

async function submitIngredientSuggest() {
  const input = document.getElementById('ai-ingredient-input');
  const btn = document.getElementById('ai-ingredient-submit');
  const ingredients = input ? input.value.trim() : '';
  if (!ingredients) {
    showToast(lang === 'en' ? 'Add at least one ingredient.' : 'Pridaj aspoň jednu surovinu.', 'info');
    if (input) input.focus();
    return;
  }
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '⏳ ' + (lang === 'en' ? 'Thinking...' : 'Premýšľam...');
  }

  const prompt = lang === 'en'
    ? 'I have these ingredients: ' + ingredients + '. Suggest 3 meals I can cook. For each include: name, prep time, and 3 short steps. Reply in English.'
    : 'Mám tieto suroviny: ' + ingredients + '. Navrhni 3 recepty, ktoré z nich môžem uvariť. Pre každý uveď: názov, čas prípravy, postup v 3 bodoch. Odpovedaj v slovenčine.';
  let reply = await aiGenerate([{ role: 'user', content: prompt }], 12000);
  let source = 'ai';
  if (!reply) {
    reply = buildLocalIngredientSuggestions(ingredients);
    source = 'local';
  }
  const inputModal = document.getElementById('ai-ingredient-modal');
  if (inputModal) inputModal.remove();
  showIngredientSuggestResult(reply, source);
}

function normalizeIngredientText(text) {
  return (text || '').toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildLocalIngredientSuggestions(ingredients) {
  const terms = normalizeIngredientText(ingredients)
    .split(/[,\s]+/)
    .map(s => s.trim())
    .filter(s => s.length >= 3);
  const uniqueTerms = [...new Set(terms)];
  const scored = recipes.map(r => {
    const recipeName = lang === 'en' && r.nameEn ? r.nameEn : r.name;
    const recipeIngredients = (lang === 'en' && r.ingredientsEn ? r.ingredientsEn : r.ingredients) || [];
    const haystack = normalizeIngredientText([recipeName, r.category, recipeIngredients.join(' ')].join(' '));
    const score = uniqueTerms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
    return { r, recipeName, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score || (a.r.time || 999) - (b.r.time || 999)).slice(0, 3);

  if (!scored.length) {
    return lang === 'en'
      ? 'AI is not available right now and I did not find a clear match in saved recipes. Try broader ingredients like pasta, eggs, chicken, rice or tomato.'
      : 'AI práve nie je dostupná a v uložených receptoch som nenašiel jasnú zhodu. Skús všeobecnejšie suroviny ako cestoviny, vajcia, kuracie, ryža alebo paradajky.';
  }

  const intro = lang === 'en'
    ? 'AI is not available right now, so here are the best matches from saved recipes:'
    : 'AI práve nie je dostupná, preto vyberám najlepšie zhody z uložených receptov:';
  return intro + '\n\n' + scored.map((item, idx) => {
    const r = item.r;
    const meta = '⏱ ' + (r.time || '?') + ' min' + (r.nutrition && r.nutrition.kcal ? ' · 🔥 ' + r.nutrition.kcal + ' kcal' : '');
    const steps = ((lang === 'en' && r.stepsEn ? r.stepsEn : r.steps) || []).slice(0, 3);
    return `${idx + 1}. ${item.recipeName}\n${meta}\n${steps.length ? steps.map((s, i) => `   ${i + 1}) ${s}`).join('\n') : (lang === 'en' ? '   Open recipe detail for steps.' : '   Postup nájdeš v detaile receptu.')}`;
  }).join('\n\n');
}

function showIngredientSuggestResult(reply, source) {
  const old = document.getElementById('ai-modal');
  if (old) old.remove();
  const div = document.createElement('div');
  div.id = 'ai-modal';
  div.className = 'modal-overlay active';
  div.style.cssText = 'z-index:2000;';
  div.onclick = function(e) { if (e.target === this) this.remove(); };
  const sourceNote = source === 'local'
    ? `<div class="ai-source-note">${lang === 'en' ? 'Fallback from saved recipes' : 'Fallback z uložených receptov'}</div>`
    : '';
  div.innerHTML = `<div class="modal ai-result-modal">
    <button class="modal-close" onclick="document.getElementById('ai-modal').remove()">✕</button>
    <h2>🤖 ${lang === 'en' ? 'What to cook' : 'Čo uvariť'}</h2>
    ${sourceNote}
    <div class="ai-result-text">${formatAiSuggestionReply(reply)}</div>
    <div class="ai-ingredient-actions">
      <button class="btn btn-secondary" onclick="document.getElementById('ai-modal').remove()">${lang === 'en' ? 'Close' : 'Zavrieť'}</button>
      <button class="btn btn-primary" onclick="document.getElementById('ai-modal').remove();openIngredientSuggestModal()">↻ ${lang === 'en' ? 'Try again' : 'Skúsiť znova'}</button>
    </div>
  </div>`;
  document.body.appendChild(div);
}

function formatAiSuggestionReply(text) {
  return esc(text || '')
    .replace(/^---$/gm, '<hr>')
    .replace(/^###\s*(.+)$/gm, '<div class="ai-result-heading">$1</div>')
    .replace(/^##\s*(.+)$/gm, '<div class="ai-result-heading">$1</div>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

async function aiDailyTip() {
  var btn = document.getElementById('dash-ai-tip-btn');
  var origHTML = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<span style="display:inline-block;animation:spin .6s linear infinite">⏳</span> ' + (lang==='en'?'Thinking...':'Premýšľam...'); }
  const season = ['jar','jar','jar','leto','leto','leto','leto','leto','jeseň','jeseň','jeseň','zima'][new Date().getMonth()];
  const prompt = lang==='en'
    ? 'Give me one short cooking tip for today. Season: '+season+'. Be witty, original, max 2 sentences. Reply in English.'
    : 'Daj mi jeden krátky tip na dnešné varenie. Sezóna: '+season+'. Buď vtipný, originálny, max 2 vety. Odpovedaj v slovenčine.';
  const reply = await aiGenerate([{ role: 'user', content: prompt }]);
  if (reply) {
    document.getElementById('dash-message').textContent = reply;
    document.getElementById('dash-message-sub').textContent = t('🤖 Vygenerované AI','🤖 AI-generated');
  }
  // Restore button
  if (btn) { btn.disabled = false; btn.innerHTML = origHTML || ('🤖 <span id="dash-ai-label">' + t('AI tip dňa','AI tip of the day') + '</span>'); }
}

async function aiSuggestForSlot(dayKey, slotKey) {
  const existing = getWeekPlan(currentWeekKey());
  const dayPlan = existing[dayKey] || {};
  const slotEntry = dayPlan[slotKey];
  if (slotEntry) return;
  const mealsInDay = Object.values(dayPlan).filter(Boolean).map(e => typeof e === 'object' ? (e.text || '') : '').filter(Boolean).join(', ');
  const prompt = 'Navrhni jedno '+t(slotKey,slotKey)+' na '+t(dayKey,dayKey)+'. '+(mealsInDay?'Ostatné jedlá v tento deň: '+mealsInDay+'. ':'')+'Odpoveď len názov jedla (max 5 slov). Odpovedaj v slovenčine.';
  const reply = await aiGenerate([{ role: 'user', content: prompt }]);
  if (reply) {
    const weekPlan = getWeekPlan(currentWeekKey());
    if (!weekPlan[dayKey]) weekPlan[dayKey] = {};
    weekPlan[dayKey][slotKey] = { type: 'custom', text: reply.trim() };
    saveWeekPlan();
    renderPlanner();
    renderDashboard();
  }
}

async function aiFillEmptySlots() {
  const weekKey = currentWeekKey();
  const weekPlan = getWeekPlan(weekKey);
  const emptySlots = [];
  DAYS.forEach(d => {
    MEALS.forEach(m => {
      if (!weekPlan[d] || !weekPlan[d][m.id]) emptySlots.push({ day: d, slot: m.id });
    });
  });
  if (!emptySlots.length) { showToast(t('Všetky sloty sú vyplnené.','All slots are filled.'),'warning'); return; }
  // Fill up to 10 empty slots
  const toFill = emptySlots.slice(0, 10);
  for (const { day, slot } of toFill) {
    await aiSuggestForSlot(day, slot);
  }
}

async function aiAdjustPortions(recipeId) {
  const r = recipes.find(rec => rec.id === recipeId);
  if (!r) return;
  const current = r.portions || 4;
  const target = parseInt(prompt(t('Uprav na počet porcií (teraz: '+current+'):','Adjust to servings (current: '+current+'):'), current));
  if (!target || target < 1 || target > 50) return;
  const ingr = (lang === 'en' && r.ingredientsEn ? r.ingredientsEn : r.ingredients).join('\n');
  const reply = await aiGenerate([{ role: 'user', content: 'Uprav množstvo ingrediencií v tomto recepte z '+current+' porcií na '+target+' porcií. Ingrediencie:\n'+ingr+'\n\nOdpovedz len upravené ingrediencie, každá na nový riadok, vo formáte: množstvo názov. Odpoveď v slovenčine.' }]);
  if (reply) { const lines = reply.split('\n').filter(l => l.trim()); if (lang === 'en') r.ingredientsEn = lines; else r.ingredients = lines; r.portions = target; saveToLS(); viewRecipe(recipeId); }
}

async function aiSubstituteIngredient() {
  const ingr = prompt(t('Ktorú surovinu chceš nahradiť?','Which ingredient to substitute?'), '');
  if (!ingr) return;
  const reply = await aiGenerate([{ role: 'user', content: 'Čím môžem nahradiť "'+ingr+'" pri varení? Daj mi 2-3 alternatívy s vysvetlením. Odpovedaj v slovenčine.' }]);
  if (reply) { const old = document.getElementById('ai-modal'); if (old) old.remove(); const div = document.createElement('div'); div.id = 'ai-modal'; div.className = 'modal-overlay active'; div.style.cssText = 'z-index:2000;';
  div.onclick = function(e) { if (e.target === this) this.remove(); }; div.innerHTML = '<div class="modal" style="max-width:500px;"><button class="modal-close" onclick="document.getElementById(\'ai-modal\').remove()">✕</button><h2>🔄 '+t('Náhrada: ','Substitute: ')+esc(ingr)+'</h2><pre style="white-space:pre-wrap;font-size:.78rem;font-family:inherit;background:var(--bg);padding:.8rem;border-radius:8px;">'+esc(reply)+'</pre></div>'; document.body.appendChild(div); }
}

async function aiSimplifyRecipe(recipeId) {
  const r = recipes.find(rec => rec.id === recipeId);
  if (!r) return;
  const steps = (lang === 'en' && r.stepsEn ? r.stepsEn : r.steps).join('\n');
  const reply = await aiGenerate([{ role: 'user', content: 'Zjednoduš tento recept na 3-5 krokov. Originálny postup:\n'+steps+'\n\nOdpovedz len zjednodušené kroky, každý na nový riadok, očíslované. V slovenčine.' }]);
  if (reply) { const lines = reply.split('\n').map(l => l.replace(/^\d+[\.\)]\s*/, '').trim()).filter(Boolean); if (lines.length) { if (lang === 'en') r.stepsEn = lines; else r.steps = lines; saveToLS(); viewRecipe(recipeId); } }
}

async function aiEstimateNutrition(recipeId) {
  const r = recipes.find(rec => rec.id === recipeId);
  if (!r) return;
  const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
  const ingr = (lang === 'en' && r.ingredientsEn ? r.ingredientsEn : r.ingredients).join('\n');
  const portions = r.portions || 4;
  const reply = await aiGenerate([{ role: 'user', content: 'Odhadni nutričné hodnoty tohto receptu na JEDNU PORCIU ('+portions+' porcií celkovo). Recept: '+name+'\nIngrediencie:\n'+ingr+'\n\nOdpovedz IBA v tomto formáte (jedno číslo na riadok):\nkcal: [číslo]\nprotein: [číslo g]\nfat: [číslo g]\ncarbs: [číslo g]\n\nNič iné nepíš.' }]);
  if (reply) { const kcal = parseInt((reply.match(/kcal[:\s]*(\d+)/i)||[])[1])||0; const protein = parseInt((reply.match(/protein[:\s]*(\d+)/i)||[])[1])||0; const fat = parseInt((reply.match(/fat[:\s]*(\d+)/i)||[])[1])||0; const carbs = parseInt((reply.match(/carbs[:\s]*(\d+)/i)||[])[1])||0; if (kcal>0) { r.nutrition={kcal,protein,fat,carbs}; r.portions=portions; saveToLS(); viewRecipe(recipeId); } }
}

async function aiBatchNutrition() {
  showConfirmModal(t('Aktualizovať nutričné hodnoty pre VŠETKY recepty cez AI? Môže to chvíľu trvať.','Update nutrition for ALL recipes via AI? This may take a while.'), '🤖', 'Spustiť', function() {
    aiBatchNutritionRun();
  });
}

async function aiBatchNutritionRun() {
  const needUpdate = recipes.filter(r => !r.nutrition || !r.nutrition.kcal || r.nutrition.kcal < 10);
  if (!needUpdate.length) { showToast(t('Všetky recepty už majú nutričné hodnoty.','All recipes already have nutrition.'),'info'); return; }
  let count = 0; const total = needUpdate.length;
  for (const r of needUpdate) { const name = lang==='en'&&r.nameEn?r.nameEn:r.name; const ingr = (lang==='en'&&r.ingredientsEn?r.ingredientsEn:r.ingredients).join('\n'); const portions = r.portions||4; const reply = await aiGenerate([{role:'user',content:'Odhadni nutričné hodnoty tohto receptu na JEDNU PORCIU. Recept: '+name+'\nIngrediencie:\n'+ingr+'\n\nOdpovedz IBA:\nkcal: [číslo]\nprotein: [číslo g]\nfat: [číslo g]\ncarbs: [číslo g]'}]);
    if (reply) { const kcal = parseInt((reply.match(/kcal[:\s]*(\d+)/i)||[])[1])||0; const protein = parseInt((reply.match(/protein[:\s]*(\d+)/i)||[])[1])||0; const fat = parseInt((reply.match(/fat[:\s]*(\d+)/i)||[])[1])||0; const carbs = parseInt((reply.match(/carbs[:\s]*(\d+)/i)||[])[1])||0; if (kcal>0) { r.nutrition={kcal,protein,fat,carbs}; r.portions=portions; count++; } }
    if (count%5===0) saveToLS();
  }
  saveToLS(); render();
  showToast(t('Hotovo! ','Done! ')+count+'/'+total+' '+(lang==='en'?'recipes.':'receptov.'),'success');
}

async function aiGenerateShoppingList() {
  if (!(appSettings.shopping && appSettings.shopping.aiShoppingList)) { showToast(t('AI nákupný zoznam je vypnutý.','AI shopping is off.'),'info'); return; }

  function collectMeals(plan) {
    var meals = [];
    var wk = currentWeekKey();
    var weekPlan = plan[wk];
    if (!weekPlan) return meals;
    DAYS.forEach(function(d) {
      var day = weekPlan[d];
      if (!day) return;
      MEALS.forEach(function(m) {
        var e = day[m.id];
        if (!e) return;
        if (e.type === 'custom' && e.text) { meals.push(t(d,d)+' '+t(m.id,m.id)+': '+e.text); }
        else {
          var rid = typeof e === 'number' ? e : e.id;
          var r = recipes.find(function(rec) { return rec.id === rid; });
          if (r) {
            var rn = (lang==='en'&&r.nameEn) ? r.nameEn : r.name;
            var ingr = (r.ingredients||[]).join(', ');
            meals.push(t(d,d)+' '+t(m.id,m.id)+': '+rn+' — '+ingr);
          }
        }
      });
    });
    return meals;
  }

  var allMeals = [];
  var plan = planType === 'kids' ? mealPlanKids : mealPlan;
  allMeals = collectMeals(plan);

  // If local empty but family is connected, try Firebase
  if (!allMeals.length && familyCode && firebaseReady && familyDbRef) {
    showToast(t('Načítavam rodinné dáta...','Loading family data...'),'info');
    try {
      var snap = await new Promise(function(resolve, reject) {
        familyDbRef.child('mealPlan').once('value', resolve, reject);
      });
      if (snap.val()) { mealPlan = snap.val(); allMeals = collectMeals(mealPlan); }
      else {
        var snap2 = await new Promise(function(resolve, reject) {
          familyDbRef.child('mealPlanKids').once('value', resolve, reject);
        });
        if (snap2.val()) { mealPlanKids = snap2.val(); allMeals = collectMeals(mealPlanKids); }
      }
    } catch(e) {}
  }

  if (!allMeals.length) {
    showToast(t('V rodinnom plánovači nie sú jedlá.','No meals in family planner.'),'info');
    return;
  }

  var toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:20px;left:20px;right:20px;background:var(--primary);color:#fff;padding:10px;border-radius:10px;text-align:center;z-index:9999;font-size:.8rem;font-weight:600;';
  toast.textContent = allMeals.length + ' ' + t('jedál naplánovaných, generujem...','meals planned, generating...');
  document.body.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 4000);

  var reply = await aiGenerate([{role:'user',content:'Vytvor nákupný zoznam na tento týždeň. Jedálniček:\n'+allMeals.join('\n')+'\n\nSpoj rovnaké položky, zoraď podľa kategórií. Ku každej uveď odhadované množstvo. Odpovedz v slovenčine.'}]);
  if (reply) { var o=document.getElementById('ai-modal');if(o)o.remove();var d=document.createElement('div');d.id='ai-modal';d.className='modal-overlay active';d.style.cssText='z-index:2000;';d.innerHTML='<div class="modal" style="max-width:500px;max-height:80vh;overflow-y:auto;"><button class="modal-close" onclick="document.getElementById(\'ai-modal\').remove()">✕</button><h2>🛒 '+t('AI nákupný zoznam','AI shopping list')+'</h2><pre style="white-space:pre-wrap;font-size:.75rem;font-family:inherit;background:var(--bg);padding:.8rem;border-radius:8px;">'+esc(reply)+'</pre><button class="btn btn-primary" onclick="addAIShoppingItems()" style="width:100%;margin-top:.5rem;">📥 '+t('Pridať do nákupného zoznamu','Add to shopping list')+'</button></div>';document.body.appendChild(d);window._aiShoppingReply=reply; }
}

function addAIShoppingItems() {
  const text = window._aiShoppingReply || ''; if (!text) return;
  const lines = text.split('\n'); let c = 'other';
  loadShopItems();
  let added = 0;
  lines.forEach(l => {
    const cl = l.replace(/^[•\-\*\s\d\.\)]+\s*/,'').trim();
    if (!cl) return;
    if (cl.endsWith(':') && !cl.includes('—') && !cl.includes('–') && !cl.includes('-')) {
      c = guessFoodCategory(cl.replace(':', '')); return;
    }
    const parts = cl.split(/[—–\-]\s*/);
    if (parts.length >= 2) {
      const nm = parts[0].trim();
      const q = parts.slice(1).join(' ').trim();
      const am = (q.match(/^[\d.,\/]+/g) || [])[0] || '';
      const u = am ? q.replace(am, '').trim() : q;
      if (nm && nm.length > 1) {
        shopItems.push({ id: generateShopId(), name: nm, amount: am, unit: u || '',
          category: c === 'other' ? guessFoodCategory(nm) : c,
          checked: false, source: 'manual', note: '', recipeId: '' });
        added++;
      }
    }
  });
  try { autoMergeShopItems(); } catch(e) {}
  saveShopItems();
  try { localStorage.setItem('shoppingItems', JSON.stringify(shopItems)); } catch(e) {}
  document.getElementById('ai-modal')?.remove();
  // Fallback: if main parser found nothing, add every line as an item
  if (added === 0) {
    lines.forEach(function(l) {
      var cl2 = l.replace(/^[•\-\*\s\d\.\)]+\s*/, '').trim();
      if (cl2 && cl2.length > 2 && !cl2.match(/^[=\-—–\*]{3,}$/) && !(cl2.endsWith(':') && cl2.length < 30)) {
        shopItems.push({ id: generateShopId(), name: cl2, amount: '', unit: '',
          category: guessFoodCategory(cl2), checked: false, source: 'manual', note: '', recipeId: '' });
        added++;
      }
    });
    if (added > 0) { try { autoMergeShopItems(); } catch(e) {} saveShopItems(); try { localStorage.setItem('shoppingItems', JSON.stringify(shopItems)); } catch(e) {} }
    else { showToast(t('Nepodarilo sa pridať položky.','Failed to add items.'),'error'); return; }
  }
  renderShoppingList();
  switchTab('shopping');
}

 let lang = localStorage.getItem('lang') || 'en';
let ageFilter = '';
let voiceSearch = null, voiceSearchListening = false;

// ======================== FIREBASE FAMILY SYNC ========================
// 1. Go to https://console.firebase.google.com → Create project
// 2. Build → Realtime Database → Create Database → Start in test mode
// 3. Project settings → Add web app → Copy firebaseConfig below
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBGAgGCz6Ff_WElerrHHqZnT65N7CVTQJQ",
  authDomain: "receptar2.firebaseapp.com",
  databaseURL: "https://receptar2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "receptar2",
  storageBucket: "receptar2.firebasestorage.app",
  messagingSenderId: "852171374029",
  appId: "1:852171374029:web:749029919ce35d9eab9884"
};

let firebaseReady = false;
let familyCode = '';
let familyDbRef = null;
let firebaseListeners = []; // track active listeners for cleanup
let _syncing = {}; // Track which keys are being pushed to Firebase

function initFirebase() {
  if (firebaseReady) return;
  if (!FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'YOUR_API_KEY') {
    console.warn('Firebase not configured.');
    return;
  }
  try {
    if (firebase.apps && firebase.apps.length) {
      firebaseReady = true;
    } else {
      firebase.initializeApp(FIREBASE_CONFIG);
      firebaseReady = true;
    }
  } catch(e) {
    // Already initialized
    firebaseReady = true;
  }
}

function generateFamilyCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function createFamily() {
  initFirebase();
  if (!firebaseReady) { showToast(t('Firebase nie je nastavený.','Firebase not configured.'),'error'); return; }
  var code = '';
  var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for (var i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  familyCode = code;
  localStorage.setItem('familyCode', code);
  connectToFamily(code);
  // Only push if user confirms (creator is first, so safe to push)
  showConfirmModal(t('Vytvorená nová rodina. Synchronizovať aktuálne dáta?','New family created. Sync your current data?'), '👨‍👩‍👧‍👦', lang==='en'?'Sync':'Syncovať', function() {
    pushAllLocalData();
  });
  showToast(t('Rodinný kód: ','Family code: ') + code, 'success', 5000);
  setTimeout(function() { navigator.clipboard.writeText(code).catch(function(){}); }, 100);
  openMorePageFromAnywhere('family');
  updateSyncIndicator();
}

function joinFamily(code) {
  initFirebase();
  if (!firebaseReady) { showToast(t('Firebase nie je nastavený.','Firebase not configured.'),'error'); return; }
  code = code.toUpperCase().trim();
  if (!code) return;
  familyCode = code;
  localStorage.setItem('familyCode', code);
  connectToFamily(code);
  // Wait for remote data, then ask about merge
  setTimeout(function() {
    var hasRemote = false;
    try {
      var mp = localStorage.getItem('mealPlan');
      if (mp && mp !== '{}') hasRemote = true;
    } catch(e) {}
    if (hasRemote) {
      showConfirmModal(t('Rodina má dáta. Použiť rodinné dáta?','Family has data. Use family data?'), '👨‍👩‍👧‍👦', t('Použiť rodinné','Use family'), function() {
        showToast(t('Rodinné dáta zostali aktívne','Family data kept active'), 'success');
      });
    } else {
      pushAllLocalData();
    }
  }, 2000);
  openMorePageFromAnywhere('family');
  updateSyncIndicator();
}

function showFamilyMembers() {
  if (!familyDbRef) { showToast(t('Nie si v rodine.','Not in a family.'),'warning'); return; }
  familyDbRef.child('members').once('value', function(snap) {
    var members = snap.val();
    if (!members) { showToast(t('Žiadni členovia.','No members.'),'info'); return; }
    var list = Object.keys(members).map(function(id) {
      var m = members[id];
      var name = m.name || id.slice(0,8);
      var online = m.online ? '🟢' : '⚪';
      var seen = m.lastSeen ? new Date(m.lastSeen).toLocaleString() : '?';
      return online + ' ' + name + '\n  ' + (m.online ? t('Online','Online') : t('Naposledy: ','Last seen: ') + seen);
    }).join('\n\n');
    showToast(t('Členovia rodiny','Family members'),'info');console.log(t('Členovia:','Members:'),list);
  });
}

function leaveFamily() {
  showConfirmModal(t('Naozaj opustiť rodinu? Lokálne dáta ostanú.','Really leave family? Local data stays.'), '💪', lang==='en'?'Leave':'Opustiť', function() {
    
  // Remove all Firebase listeners
  firebaseListeners.forEach(ref => { try { ref.off(); } catch(e) {} });
  firebaseListeners = [];
  familyCode = '';
  familyDbRef = null;
  localStorage.removeItem('familyCode');
  updateSyncIndicator();
  openMorePageFromAnywhere('family');
  });
}

function connectToFamily(code) {
  if (!firebaseReady || !code) return;
  const db = firebase.database();
  familyDbRef = db.ref('families/' + code);
  // Clean up old listeners
  firebaseListeners.forEach(ref => { try { ref.off(); } catch(e) {} });
  firebaseListeners = [];

  // Listen for remote changes on each data set
  const bindPath = (path, localKey, mergeFn) => {
    const ref = familyDbRef.child(path);
    ref.on('value', snap => {
      var remoteData = snap.val();
      if (!remoteData) return;
      if (mergeFn) {
        var localRaw = localStorage.getItem(localKey);
        var localData = localRaw ? JSON.parse(localRaw) : null;
        var merged = mergeFn(localData, remoteData);
        localStorage.setItem(localKey, JSON.stringify(merged));
        reloadFromLocalStorage(localKey, merged);
      } else {
        localStorage.setItem(localKey, JSON.stringify(remoteData));
        reloadFromLocalStorage(localKey, remoteData);
      }
      showSyncToast(localKey);
      // Force re-render
      try { renderTasks(); } catch(e) {}
      try { renderPlanner(); } catch(e) {}
      try { renderShoppingList(); } catch(e) {}
      refreshActiveTab();
    });
    firebaseListeners.push(ref);
  };

  bindPath('shoppingItems', 'shoppingItems', mergeShoppingItems);
  bindPath('mealPlan', 'mealPlan');
  bindPath('mealPlanKids', 'mealPlanKids');
  bindPath('tasks', 'tasks');
  bindPath('planType', 'planType');
  bindPath('childAge', 'childAge');

  // Listen for recipe changes (merge by id, keep local-only recipes)
  bindPath('recipes', 'recipes', mergeRecipes);

  // Also push local device presence
  const presenceRef = familyDbRef.child('members').child(getDeviceId());
  presenceRef.set({ name: localStorage.getItem('deviceName') || (lang==='en'?'Device':'Zariadenie'), lastSeen: firebase.database.ServerValue.TIMESTAMP, online: true });
  presenceRef.onDisconnect().update({ online: false, lastSeen: firebase.database.ServerValue.TIMESTAMP });
}

function pushAllLocalData() { pushToFirebase('shoppingItems', 'shoppingItems'); pushToFirebase('mealPlan', 'mealPlan'); pushToFirebase('mealPlanKids', 'mealPlanKids'); pushToFirebase('tasks', 'tasks'); pushToFirebase('childAge', 'childAge'); pushToFirebase('recipes', 'recipes'); pushToFirebase('planType', 'planType'); }

function firebaseHardTest() {
  try {
    initFirebase();
    if (!firebaseReady) { showToast('FAIL: firebaseReady=false','error'); return; }
    var app = firebase.app();
    var db = firebase.database();
    var info = { appName: app.name, databaseURL: app.options.databaseURL, projectId: app.options.projectId, familyCode: familyCode||null, deviceId: getDeviceId(), timestamp: Date.now() };
    var testRef = db.ref('hardTest/' + Date.now());
    testRef.set(info, function(error) {
      if (error) { showToast('WRITE ERROR: ' + error.message,'error',6000); }
      else { showToast('WRITE OK - check Firebase console','success',4000); }
    });
  } catch(e) { showToast('EXCEPTION: ' + e.message,'error'); }
}

function debugFirebase() {
  var info = 'Firebase debug:\n';
  info += 'ready: ' + !!firebaseReady + '\n';
  info += 'familyCode: ' + (familyCode || 'none') + '\n';
  info += 'familyDbRef: ' + !!familyDbRef + '\n';
  info += 'databaseURL: ' + FIREBASE_CONFIG.databaseURL + '\n';
  info += 'apps.length: ' + (firebase.apps ? firebase.apps.length : 'N/A') + '\n';
  info += 'deviceId: ' + getDeviceId() + '\n';
  try {
    var mp = localStorage.getItem('mealPlan');
    info += 'mealPlan localStorage: ' + (mp ? mp.length + ' chars' : 'empty') + '\n';
    var sm = localStorage.getItem('shoppingItems');
    info += 'shoppingItems localStorage: ' + (sm ? sm.length + ' chars' : 'empty');
  } catch(e) { info += 'localStorage error: ' + e.message; }
  showToast('Debug info uložený v konzole','info',3000);
  console.log('DEBUG:',info);
}

function debugFirebaseWrite() {
  if (!familyDbRef) { showToast('Najprv sa pripoj k rodine','error'); return; }
  var testData = { test: true, time: Date.now(), device: getDeviceId() };
  familyDbRef.child('_debug').set(testData, function(err) {
    if (err) { showToast('Zápis zlyhal: ' + err.message,'error'); }
    else { showToast('Zápis OK ✅','success',3000); }
  });
}

function debugFirebasePull() {
  if (!familyDbRef) { showToast('familyDbRef is null','error'); return; }
  familyDbRef.once('value', function(snap) {
    var val = snap.val();
    if (!val) { showToast('No data at families/'+familyCode,'info'); return; }
    var keys = Object.keys(val);
    // Directly set JS variables
    if (val.mealPlan) { mealPlan = val.mealPlan; }
    if (val.mealPlanKids) { mealPlanKids = val.mealPlanKids; }
    if (val.shoppingItems) { shopItems = Array.isArray(val.shoppingItems) ? val.shoppingItems : []; saveShopItems(); }
    if (val.tasks) { tasks = Array.isArray(val.tasks) ? val.tasks : []; }
    if (val.recipes) { recipes = Array.isArray(val.recipes) ? val.recipes : []; saveToLS(); }
    if (val.planType) { planType = val.planType; localStorage.setItem('planType', planType); }
    // Also save to localStorage
    keys.forEach(function(k) {
      if (val[k] !== null && val[k] !== undefined) {
        try { localStorage.setItem(k, JSON.stringify(val[k])); } catch(e) {}
      }
    });
    // Force render everything
    try { renderPlanner(); } catch(e) {}
    try { renderTasks(); } catch(e) {}
    try { renderShoppingList(); } catch(e) {}
    try { renderDashboard(); } catch(e) {}
    showToast('Načítané: ' + keys.length + ' kľúčov','success',3000);
  }, function(err) { showToast('READ FAILED: ' + err.message,'error'); });
}

function testFirebaseSync() {
  try {
    var r = !!firebaseReady, f = !!familyCode, d = !!familyDbRef;
    showToast('Firebase: ready='+r+' code='+f,'info',3000);
    if (!d) return;
    var testData = { test: Date.now(), from: getDeviceId() };
    familyDbRef.child('_test').set(testData, function(err) {
      if (err) { showToast('Zápis zlyhal: '+err.message,'error'); return; }
      familyDbRef.child('_test').once('value', function(snap) {
        showToast('✅ Úspešný test!','success',3000);
      });
    });
  } catch(e) { showToast('Chyba: '+e.message,'error'); }
}

function pushToFirebase(path, localKey) {
  if (!familyDbRef) { console.log('Firebase push SKIP: no familyDbRef'); return; }
  try {
    var data = null;
    if (localKey === 'mealPlan') data = mealPlan;
    else if (localKey === 'mealPlanKids') data = mealPlanKids;
    else if (localKey === 'shoppingItems') data = shopItems;
    else if (localKey === 'tasks') data = tasks;
    else if (localKey === 'recipes') data = recipes;
    else if (localKey === 'planType') data = planType;
    else { data = JSON.parse(localStorage.getItem(localKey) || 'null'); }
    if (data !== null) {
      familyDbRef.child(path).set(data, function(err) {
        if (err) console.error('Firebase push ERROR:', localKey, err.message);
      });
    }
  } catch(e) { console.error('Firebase push EXCEPTION:', localKey, e.message); }
}

function getDeviceId() {
  let id = localStorage.getItem('deviceId');
  if (!id) { id = 'dev_' + Math.random().toString(36).slice(2,10); localStorage.setItem('deviceId', id); }
  return id;
}

// Network and sync state
var _isOnline = navigator.onLine !== false;
var _isSyncing = false;
var _justConnected = false;

function updateSyncIndicator() {
  var el = document.getElementById('sync-indicator');
  if (!el) return;
  el.classList.remove('syncing', 'offline', 'connected', 'error', 'sync-just-connected');
  
  if (_isSyncing) {
    el.textContent = '🔄';
    el.title = 'Synchronizujem...';
    el.classList.add('syncing');
    return;
  }
  
  if (!_isOnline) {
    el.textContent = '📵';
    el.title = 'Offline — zmeny sa uložia lokálne';
    el.classList.add('offline');
    return;
  }
  
  if (!familyCode) {
    el.textContent = '⚪';
    el.title = 'Nie si pripojený k rodine';
    return;
  }
  
  if (firebaseReady) {
    el.textContent = '🟢';
    el.title = 'Synchronizované — kód: ' + familyCode;
    el.classList.add('connected');
    if (_justConnected) {
      el.classList.add('sync-just-connected');
      setTimeout(function() { _justConnected = false; updateSyncIndicator(); }, 1000);
    }
  } else {
    el.textContent = '🔴';
    el.title = 'Firebase nie je pripojený';
    el.classList.add('error');
  }
}

function setSyncing(syncing) {
  _isSyncing = syncing;
  updateSyncIndicator();
}

// Online/offline listeners
window.addEventListener('online', function() {
  _isOnline = true;
  updateSyncIndicator();
  var bar = document.getElementById('network-status');
  if (bar) {
    bar.className = 'online show';
    bar.textContent = '🔗 Späť online — synchronizujem...';
    setTimeout(function() { bar.classList.remove('show'); }, 2000);
  }
  // Reconnect to Firebase
  if (familyCode && firebaseReady) {
    _isSyncing = true;
    updateSyncIndicator();
    setTimeout(function() {
      connectToFamily(familyCode);
      autoPullFromFirebase();
      setTimeout(function() { _isSyncing = false; updateSyncIndicator(); }, 1500);
    }, 500);
  }
});

window.addEventListener('offline', function() {
  _isOnline = false;
  updateSyncIndicator();
  var bar = document.getElementById('network-status');
  if (bar) {
    bar.className = 'offline show';
    bar.textContent = '📵 Offline — zmeny sa uložia lokálne';
  }
});

function setDynamicGradient() {
  var h = new Date().getHours();
  document.body.classList.remove('gradient-morning', 'gradient-afternoon', 'gradient-evening', 'gradient-night');
  if (h >= 5 && h < 11) document.body.classList.add('gradient-morning');
  else if (h >= 11 && h < 17) document.body.classList.add('gradient-afternoon');
  else if (h >= 17 && h < 21) document.body.classList.add('gradient-evening');
  else document.body.classList.add('gradient-night');
}

function refreshActiveTab() {
  const tab = document.body.dataset.tab;
  setDynamicGradient();
  // Set season in real time
  updateSeason();
  if (tab === 'shopping') renderShoppingList();
  if (tab === 'planner') renderPlanner();
  if (tab === 'tasks') renderTasks();
  if (tab === 'dashboard') { renderDashboard(); }
  // Always update task widget on dashboard
  try { renderTaskWidget(); } catch(e) {}
}

// =================== AUTO DARK MODE ===================
// Dark mode is always on — system preference not needed

// =================== SEASON UPDATE IN REAL TIME ===================
function updateSeason() {
  var seasons = ['zima','zima','jar','jar','jar','leto','leto','leto','leto','jesen','jesen','zima'];
  document.body.dataset.season = seasons[new Date().getMonth()];
}

// =================== PARALLAX HERO COLLAPSE ===================
var _plannerScrollHandler = null;
function initPlannerParallax() {
  if (_plannerScrollHandler) { document.removeEventListener('scroll', _plannerScrollHandler, { passive: true }); }
  var _pipAutoHide = null;
  _plannerScrollHandler = function() {
    var hero = document.getElementById('planner-hero');
    var pip = document.getElementById('planner-info-panel');
    if (!hero || !pip || document.getElementById('planner-container').style.display === 'none') return;
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    hero.classList.toggle('collapsed', scrollY > 20);
    pip.classList.toggle('visible', scrollY > 80);
    // Auto-hide floating panel after 2.5s of no scroll
    if (scrollY > 80) {
      if (_pipAutoHide) clearTimeout(_pipAutoHide);
      _pipAutoHide = setTimeout(function() {
        pip.classList.remove('visible');
        _pipAutoHide = null;
      }, 2500);
    }
  };
  document.addEventListener('scroll', _plannerScrollHandler, { passive: true });
}

// Call parallax init after each planner render
var _origRenderPlanner2 = renderPlanner;
renderPlanner = function() {
  _origRenderPlanner2.apply(this, arguments);
  initPlannerParallax();
};

// Load family code from localStorage on init
try { familyCode = localStorage.getItem('familyCode') || ''; } catch(e) { familyCode = ''; }
if (familyCode) { setTimeout(function() { initFirebase(); if (firebaseReady) { connectToFamily(familyCode); setTimeout(function() { autoPullFromFirebase(); }, 2500); } }, 1500); }

function autoPullFromFirebase() {
  var el = document.getElementById('boot-status');
  if (el) { el.style.display = 'block'; el.textContent = '⏳ Sťahujem dáta z Firebase...'; }
  if (!familyDbRef) {
    if (el) el.textContent = '❌ Nepripojené k Firebase';
    return;
  }
  familyDbRef.once('value', function(snap) {
    var val = snap.val();
    if (!val) {
      if (el) el.textContent = '⚪ Firebase prázdne – používam lokálne dáta';
      setTimeout(function() { if (el) el.style.display = 'none'; }, 3000);
      return;
    }
    // Merge recipes (preserve local recipes not in remote)
    if (val.recipes && Array.isArray(val.recipes)) {
      recipes = mergeRecipes(recipes, val.recipes);
    }
    // Merge shopping items
    if (val.shoppingItems && Array.isArray(val.shoppingItems)) {
      shopItems = mergeShoppingItems(shopItems, val.shoppingItems);
    }
    // Direct assignments for simple data
    if (val.mealPlan) { mealPlan = val.mealPlan; }
    if (val.mealPlanKids) { mealPlanKids = val.mealPlanKids; }
    if (val.tasks) { tasks = Array.isArray(val.tasks) ? val.tasks : []; }
    if (val.planType && !planType) { planType = val.planType; }
    if (val.childAge) { localStorage.setItem('childAge', val.childAge); }
    try { render(); } catch(e) {}
    try { renderPlanner(); } catch(e) {}
    try { renderShoppingList(); } catch(e) {}
    try { renderTasks(); } catch(e) {}
    try { renderDashboard(); } catch(e) {}
    try { renderTaskWidget(); } catch(e) {}
    if (el) { el.textContent = '✅ Načítané: ' + recipes.length + ' receptov'; el.style.background = 'rgba(0,128,0,.92)'; }
    setTimeout(function() { if (el) { el.style.display = 'none'; } }, 2500);
  }, function(err) {
    if (el) { el.textContent = '❌ Chyba: ' + err.message; }
  });
}

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
// ======================== PERSISTENCE ========================
function mergeRecipes(localArr, remoteArr) {
  if (!Array.isArray(localArr)) localArr = [];
  if (!Array.isArray(remoteArr)) remoteArr = [];
  var map = {};
  localArr.forEach(function(r) { if (r && r.id != null) map[r.id] = r; });
  remoteArr.forEach(function(r) {
    if (!r || r.id == null) return;
    var local = map[r.id];
    if (!local) { map[r.id] = r; }
    else {
      var localTs = local.updatedAt || 0;
      var remoteTs = r.updatedAt || 0;
      if (remoteTs > localTs) {
        if (local.favorite && !r.favorite) r.favorite = true;
        if (local.rating > (r.rating || 0)) r.rating = local.rating;
        map[r.id] = r;
      }
    }
  });
  return Object.values(map);
}

function saveToLS() {
  if (!Array.isArray(recipes)) recipes = [];
  recipes.forEach(function(r) {
    if (!r.updatedAt) r.updatedAt = Date.now();
    r.updatedAt = Date.now();
    r.updatedBy = getDeviceId();
  });
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

function norm(s) {
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

function escAttr(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ======================== NUTRITION ESTIMATOR ========================
const NUTRITION_DB = {
  // Mäso
  'kuracie prsia': {kcal:165, protein:31, fat:3.6, carbs:0}, 'kuracie stehno':{kcal:177, protein:25, fat:8.2, carbs:0}, 'kurací':{kcal:172, protein:27, fat:6.3, carbs:0}, 'kurča':{kcal:172, protein:27, fat:6.3, carbs:0},
  'mleté mäso':{kcal:250, protein:20, fat:18, carbs:0}, 'hovädzie':{kcal:250, protein:26, fat:15, carbs:0}, 'bravčové':{kcal:242, protein:27, fat:14, carbs:0}, 'bravčová krkovička':{kcal:250, protein:20, fat:18, carbs:0},
  'bravčová kotleta':{kcal:220, protein:28, fat:12, carbs:0}, 'bravčový bôčik':{kcal:300, protein:16, fat:26, carbs:0}, 'bravčové mäso':{kcal:242, protein:27, fat:14, carbs:0},
  'hovädzie mäso':{kcal:250, protein:26, fat:15, carbs:0}, 'hovädzia sviečková':{kcal:180, protein:30, fat:6, carbs:0},
  'morka':{kcal:135, protein:30, fat:1, carbs:0}, 'morie':{kcal:135, protein:30, fat:1, carbs:0},
  'kačka':{kcal:337, protein:18, fat:28, carbs:0}, 'kačacie':{kcal:337, protein:18, fat:28, carbs:0}, 'husacia':{kcal:370, protein:15, fat:35, carbs:0},
  'šunka':{kcal:145, protein:20, fat:7, carbs:1}, 'anglická slanina':{kcal:540, protein:12, fat:55, carbs:1}, 'slanina':{kcal:540, protein:12, fat:55, carbs:1},
  'klobása':{kcal:310, protein:18, fat:26, carbs:2}, 'saláma':{kcal:300, protein:18, fat:25, carbs:1}, 'špekáčik':{kcal:310, protein:15, fat:28, carbs:1},
  'pečeň':{kcal:135, protein:21, fat:5, carbs:2}, 'bryndza':{kcal:190, protein:14, fat:15, carbs:1},
  'paštéta':{kcal:300, protein:13, fat:27, carbs:1}, 'salam':{kcal:300, protein:18, fat:25, carbs:1},

  // Ryby
  'losos':{kcal:208, protein:20, fat:13, carbs:0}, 'tuniak':{kcal:184, protein:26, fat:8, carbs:0}, 'pstruh':{kcal:148, protein:21, fat:7, carbs:0},
  'makrela':{kcal:205, protein:19, fat:14, carbs:0}, 'sardinky':{kcal:208, protein:25, fat:11, carbs:0}, 'rybie filé':{kcal:150, protein:22, fat:6, carbs:0}, 'ryba':{kcal:150, protein:22, fat:6, carbs:0}, 'krevety':{kcal:85, protein:20, fat:0.5, carbs:0},

  // Mliečne
  'mlieko':{kcal:65, protein:3.3, fat:3.5, carbs:4.7}, 'smotana':{kcal:292, protein:2.5, fat:30, carbs:3}, 'šľahačková smotana':{kcal:340, protein:2, fat:36, carbs:3},
  'tvaroh':{kcal:103, protein:14, fat:4, carbs:3}, 'jogurt':{kcal:60, protein:5, fat:1.5, carbs:7}, 'biely jogurt':{kcal:62, protein:5, fat:1.5, carbs:7},
  'syr':{kcal:350, protein:25, fat:28, carbs:1.5}, 'mozzarella':{kcal:280, protein:22, fat:20, carbs:2}, 'parmezán':{kcal:431, protein:38, fat:29, carbs:4},
  'eidam':{kcal:356, protein:26, fat:28, carbs:0}, 'niva':{kcal:355, protein:21, fat:30, carbs:2}, 'gouda':{kcal:356, protein:26, fat:28, carbs:0},
  'maslo':{kcal:717, protein:0.9, fat:81, carbs:0.1}, 'margarín':{kcal:717, protein:0.5, fat:80, carbs:0.5},
  'vajce':{kcal:155, protein:13, fat:11, carbs:1.1}, 'vajcia':{kcal:155, protein:13, fat:11, carbs:1.1}, 'vajíčko':{kcal:155, protein:13, fat:11, carbs:1.1},

  // Obilniny a pečivo
  'múka':{kcal:364, protein:10, fat:1, carbs:76}, 'hladká múka':{kcal:364, protein:10, fat:1, carbs:76}, 'polohrubá múka':{kcal:364, protein:10, fat:1, carbs:76},
  'hrubá múka':{kcal:364, protein:10, fat:1, carbs:76}, 'celozrnná múka':{kcal:340, protein:13, fat:2, carbs:66},
  'chlieb':{kcal:265, protein:9, fat:1.5, carbs:52}, 'rožok':{kcal:286, protein:9, fat:2.5, carbs:55}, 'bageta':{kcal:280, protein:9, fat:2, carbs:55},
  'cestoviny':{kcal:350, protein:12, fat:1.5, carbs:73}, 'špagety':{kcal:350, protein:12, fat:1.5, carbs:73}, 'špagiet':{kcal:350, protein:12, fat:1.5, carbs:73}, 'rezance':{kcal:350, protein:12, fat:1.5, carbs:73},
  'ryža':{kcal:365, protein:7, fat:0.7, carbs:80}, 'ryža basmati':{kcal:360, protein:7, fat:0.6, carbs:80},
  'kuskus':{kcal:372, protein:12, fat:0.8, carbs:78}, 'bulgur':{kcal:342, protein:12, fat:1.3, carbs:68}, 'quinoa':{kcal:368, protein:14, fat:6, carbs:64},
  'ovsené vločky':{kcal:389, protein:17, fat:7, carbs:66}, 'vločky':{kcal:350, protein:12, fat:5, carbs:65},
  'strúhanka':{kcal:395, protein:10, fat:5, carbs:75}, 'palacinka':{kcal:210, protein:7, fat:8, carbs:28}, 'palacinky':{kcal:210, protein:7, fat:8, carbs:28},
  'pita':{kcal:260, protein:8, fat:1, carbs:52}, 'tortilla':{kcal:300, protein:8, fat:8, carbs:48},
  'kukurica':{kcal:365, protein:9, fat:4.7, carbs:74}, 'kukuričná':{kcal:365, protein:9, fat:4.7, carbs:74},

  // Zelenina
  'mrkva':{kcal:41, protein:0.9, fat:0.2, carbs:10}, 'petržlen':{kcal:36, protein:1.3, fat:0.5, carbs:6}, 'zeler':{kcal:16, protein:0.7, fat:0.2, carbs:3},
  'kapusta':{kcal:25, protein:1.3, fat:0.1, carbs:6}, 'kyslá kapusta':{kcal:15, protein:0.9, fat:0.1, carbs:3},
  'brokolica':{kcal:34, protein:2.8, fat:0.4, carbs:7}, 'karfiol':{kcal:25, protein:1.9, fat:0.3, carbs:5},
  'špenát':{kcal:23, protein:2.9, fat:0.4, carbs:3.6}, 'kel':{kcal:49, protein:4.3, fat:0.9, carbs:9},
  'cibuľa':{kcal:40, protein:1.1, fat:0.1, carbs:9}, 'cesnak':{kcal:149, protein:6.4, fat:0.5, carbs:33},
  'paprika':{kcal:31, protein:1, fat:0.3, carbs:6}, 'paradajka':{kcal:18, protein:0.9, fat:0.2, carbs:3.9}, 'rajčina':{kcal:18, protein:0.9, fat:0.2, carbs:3.9},
  'uhorka':{kcal:15, protein:0.7, fat:0.1, carbs:3.6}, 'cuketa':{kcal:17, protein:1.2, fat:0.3, carbs:3.1},
  'baklažán':{kcal:25, protein:1, fat:0.2, carbs:6}, 'patizón':{kcal:15, protein:1, fat:0.2, carbs:3},
  'fazuľa':{kcal:132, protein:8, fat:0.5, carbs:24}, 'šošovica':{kcal:116, protein:9, fat:0.4, carbs:20}, 'cícer':{kcal:139, protein:8, fat:2, carbs:22},
  'hrach':{kcal:81, protein:5.4, fat:0.4, carbs:14}, 'šošovica':{kcal:116, protein:9, fat:0.4, carbs:20},
  'kaleráb':{kcal:27, protein:1.7, fat:0.1, carbs:6}, 'reďkovka':{kcal:16, protein:0.7, fat:0.1, carbs:3},
  'šalát':{kcal:15, protein:1.4, fat:0.2, carbs:2.9}, 'rukola':{kcal:25, protein:2.6, fat:0.7, carbs:3.7},
  'avokádo':{kcal:160, protein:2, fat:15, carbs:9}, 'zemiak':{kcal:77, protein:2, fat:0.1, carbs:17}, 'zemiaky':{kcal:77, protein:2, fat:0.1, carbs:17},
  'batat':{kcal:86, protein:1.6, fat:0.1, carbs:20},
  'kôpor':{kcal:43, protein:3.5, fat:1.1, carbs:7}, 'pažítka':{kcal:30, protein:3, fat:0.7, carbs:4},
  'huby':{kcal:22, protein:3.1, fat:0.3, carbs:3.3}, 'šampiňóny':{kcal:22, protein:3.1, fat:0.3, carbs:3.3},

  // Ovocie
  'jablko':{kcal:52, protein:0.3, fat:0.2, carbs:14}, 'hruška':{kcal:57, protein:0.4, fat:0.1, carbs:15},
  'banán':{kcal:89, protein:1.1, fat:0.3, carbs:23}, 'pomaranč':{kcal:47, protein:0.9, fat:0.1, carbs:12},
  'citrón':{kcal:29, protein:1.1, fat:0.3, carbs:9}, 'grejf':{kcal:42, protein:0.8, fat:0.1, carbs:10},
  'hrozno':{kcal:69, protein:0.7, fat:0.2, carbs:18}, 'jahody':{kcal:33, protein:0.7, fat:0.3, carbs:8},
  'maliny':{kcal:52, protein:1.2, fat:0.7, carbs:12}, 'čučoriedky':{kcal:57, protein:0.7, fat:0.3, carbs:14},
  'čerešne':{kcal:50, protein:1, fat:0.3, carbs:12}, 'višne':{kcal:50, protein:1, fat:0.3, carbs:12},
  'marhuľa':{kcal:48, protein:1.4, fat:0.4, carbs:11}, 'broskyňa':{kcal:39, protein:0.9, fat:0.3, carbs:10},
  'slivka':{kcal:46, protein:0.7, fat:0.3, carbs:11}, 'kiwi':{kcal:61, protein:1.1, fat:0.5, carbs:15},
  'ananas':{kcal:50, protein:0.5, fat:0.1, carbs:13}, 'mango':{kcal:60, protein:0.8, fat:0.4, carbs:15},
  'vodný melón':{kcal:30, protein:0.6, fat:0.2, carbs:8}, 'melón':{kcal:34, protein:0.8, fat:0.2, carbs:8},

  // Oleje, tuky, orechy
  'olivový olej':{kcal:884, protein:0, fat:100, carbs:0}, 'olej':{kcal:884, protein:0, fat:100, carbs:0}, 'slnečnicový olej':{kcal:884, protein:0, fat:100, carbs:0},
  'masť':{kcal:902, protein:0, fat:100, carbs:0},
  'vlašské orechy':{kcal:654, protein:15, fat:65, carbs:14}, 'lieskové orechy':{kcal:628, protein:15, fat:61, carbs:17},
  'mandle':{kcal:579, protein:21, fat:50, carbs:22}, 'kešu':{kcal:553, protein:18, fat:44, carbs:30},
  'arašidy':{kcal:567, protein:26, fat:49, carbs:16}, 'sezam':{kcal:573, protein:18, fat:50, carbs:23},
  'slnečnicové semienka':{kcal:584, protein:21, fat:51, carbs:20}, 'tekvicové semienka':{kcal:446, protein:19, fat:19, carbs:54},
  'tahini':{kcal:595, protein:17, fat:53, carbs:21},
  'kokos':{kcal:354, protein:3.3, fat:33, carbs:15},
  'kešu maslo':{kcal:615, protein:18, fat:49, carbs:28}, 'arašidové maslo':{kcal:588, protein:25, fat:50, carbs:20},

  // Konzervy a omáčky
  'paradajkový pyré':{kcal:40, protein:1.8, fat:0.2, carbs:9}, 'paradajkový pretlak':{kcal:40, protein:1.8, fat:0.2, carbs:9}, 'pyré paradajkové':{kcal:40, protein:1.8, fat:0.2, carbs:9}, 'paradajková omáčka':{kcal:42, protein:1.8, fat:0.2, carbs:9},
  'kečup':{kcal:101, protein:1.3, fat:0.2, carbs:24}, 'horčica':{kcal:52, protein:3.7, fat:3.3, carbs:4},
  'majonéza':{kcal:680, protein:1, fat:75, carbs:1}, 'tatárska omáčka':{kcal:600, protein:0.8, fat:65, carbs:5},
  'sojová omáčka':{kcal:53, protein:5.3, fat:0.1, carbs:5}, 'oct':{kcal:18, protein:0, fat:0, carbs:0.6},
  'kyslá smotana':{kcal:136, protein:3.5, fat:13, carbs:3}, 'crème fraîche':{kcal:292, protein:2.5, fat:30, carbs:3},
  'kari pasta':{kcal:120, protein:3, fat:8, carbs:10},
  'bujón':{kcal:5, protein:0.5, fat:0.3, carbs:0.5}, 'vývar':{kcal:5, protein:0.5, fat:0.3, carbs:0.5},
  'konzervované paradajky':{kcal:18, protein:0.9, fat:0.2, carbs:3.9},

  // Koreniny, dochucovadlá
  'soľ':{kcal:0, protein:0, fat:0, carbs:0}, 'korenie':{kcal:20, protein:1, fat:0.5, carbs:5}, 'čierne korenie':{kcal:20, protein:1, fat:0.5, carbs:5},
  'paprika korenistá':{kcal:282, protein:14, fat:13, carbs:54}, 'mletá paprika':{kcal:282, protein:14, fat:13, carbs:54},
  'kmín':{kcal:333, protein:18, fat:15, carbs:44}, 'rasca':{kcal:333, protein:18, fat:15, carbs:44},
  'majorán':{kcal:271, protein:13, fat:7, carbs:60}, 'bobkový list':{kcal:55, protein:1.5, fat:0.5, carbs:10},
  'med':{kcal:304, protein:0.3, fat:0, carbs:82}, 'cukor':{kcal:387, protein:0, fat:0, carbs:100}, 'kryštálový cukor':{kcal:387, protein:0, fat:0, carbs:100},
  'práškový cukor':{kcal:389, protein:0, fat:0, carbs:100}, 'vanilkový cukor':{kcal:385, protein:0, fat:0, carbs:98},
  'vanilkový extrakt':{kcal:12, protein:0, fat:0, carbs:0.5},
  'droždie':{kcal:105, protein:14, fat:0.4, carbs:12}, 'kypriaci prášok':{kcal:50, protein:0, fat:0, carbs:10},
  'želatína':{kcal:335, protein:85, fat:0, carbs:0},
  'ocot':{kcal:18, protein:0, fat:0, carbs:0.6},
  'sóda bikarbóna':{kcal:0, protein:0, fat:0, carbs:0},

  // Sladkosti
  'čokoláda':{kcal:546, protein:5, fat:31, carbs:61}, 'mliečna čokoláda':{kcal:546, protein:5, fat:31, carbs:61},
  'kakao':{kcal:228, protein:19, fat:14, carbs:57}, 'nutella':{kcal:544, protein:7, fat:33, carbs:58},
  'džem':{kcal:260, protein:0.4, fat:0.1, carbs:68}, 'marmeláda':{kcal:260, protein:0.4, fat:0.1, carbs:68},
  'sušienky':{kcal:460, protein:6, fat:18, carbs:70}, 'keksy':{kcal:460, protein:6, fat:18, carbs:70},
  'medovník':{kcal:380, protein:5, fat:15, carbs:60}, 'bábovka':{kcal:350, protein:5, fat:14, carbs:52},
  'zmrzlina':{kcal:207, protein:3.5, fat:11, carbs:24},

  // Nápoje
  'pivo':{kcal:43, protein:0.5, fat:0, carbs:3.6}, 'víno':{kcal:85, protein:0.1, fat:0, carbs:2.6},
  'džús':{kcal:45, protein:0.6, fat:0, carbs:10}, 'sirup':{kcal:180, protein:0, fat:0, carbs:45},
  'káva':{kcal:2, protein:0.1, fat:0, carbs:0}, 'čaj':{kcal:1, protein:0, fat:0, carbs:0},

  // Ostatné
  'voda':{kcal:0, protein:0, fat:0, carbs:0}, 'minerálka':{kcal:0, protein:0, fat:0, carbs:0},
};
// Items that are typically counted per piece (approximate weight in g per piece)
const PIECE_WEIGHT = {
  'vajce':50, 'vajcia':50, 'vajíčko':50,
  'zemiak':150, 'zemiaky':150,
  'mrkva':80, 'cibuľa':80,
  'paradajka':100, 'rajčina':100,
  'paprika':120, 'banán':120,
  'jablko':150, 'pomaranč':150,
  'klobása':80, 'rožok':50,
  'kuracie prsia':200, 'kuracie stehno':150, 'kurací':150, 'kurča':1200,
  'strúčik':4, 'strúčiky':4, 'cesnak':4,
};
// Unit conversions
const UNIT_G = {
  'g':1, 'kg':1000, 'dkg':10, 'dag':10,
  'ml':1, 'l':1000, 'dl':100, 'cl':10,
  'pl':15, 'polievková lyžica':15, 'lyžica':15, 'lyžíc':15, 'lyžička':5, 'kl':5, 'čajová lyžička':5, 'čajové lyžičky':5,
  'šálka':240, 'hrnček':250, 'pohár':250,
};
function parseQuantity(raw) {
  let s = raw.trim();
  s = s.replace(/\b(mleté|prerastená|čerstvý|čerstvá|čerstvé|sušené|sušený|sušená|nakrájané|nakrájaný|nakrájaná|plátky|plátok|na kocky|na plátky|na mesiačiky|ošúpané|ošúpaný|vypečené|červenej|bieleho|tmavého|svetlej)\b/gi, '');
  const normed = s.toLowerCase().replace(/^\d+[\.\,]\s*/, m => m.replace(',','.')).trim();
  const fracMap = {'½':0.5,'¼':0.25,'¾':0.75,'⅓':0.333,'⅔':0.667,'⅕':0.2,'⅖':0.4,'⅗':0.6,'⅘':0.8,'⅙':0.167,'⅚':0.833,'⅛':0.125,'⅜':0.375,'⅝':0.625,'⅞':0.875};
  let val = 0, unit = null;
  for (const [f, v] of Object.entries(fracMap)) {
    if (normed.startsWith(f)) { val = v; break; }
  }
  const fracMatch = normed.match(/^(\d+)\s*\/\s*(\d+)/);
  if (fracMatch) val = parseInt(fracMatch[1]) / parseInt(fracMatch[2]);
  const numMatch = normed.match(/^(\d+[\.\,]?\d*)/);
  if (numMatch) val = parseFloat(numMatch[1].replace(',','.')) || 0;
  if (val) {
    const afterNum = normed.replace(/^[\d\.\,\s]+/, '').trim();
    for (const [u, g] of Object.entries(UNIT_G)) {
      const re = new RegExp('^' + u.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[\\s\\.]');
      if (re.test(afterNum)) { unit = u; val *= g; break; }
    }
    if (!unit) {
      const pieceMatch = afterNum.match(/^(ks|kus|kusy|strúčik|strúčiky|plátok|plátky|list|listy|balík|balenia|vajce|vajcia|kura|cibule|mrkvy|zemiaky|papriky|paradajky|stehná|prsia)\b/);
      if (pieceMatch) unit = 'ks';
      // If followed by word chars (no space-delimited unit), also treat as pieces
      else if (afterNum.match(/^[a-záčďéěíňóřšťúůýž]/)) unit = 'ks';
    }
  }
  // Comma-separated fallback: try to find quantity anywhere in string
  if (!val || val === 100) {
    const gMatch = normed.match(/(\d+[\.\,]?\d*)\s*(kg|g|dkg|dag|ml|l|dl|cl)/);
    if (gMatch) {
      val = parseFloat(gMatch[1].replace(',','.'));
      const u = gMatch[2];
      val *= (UNIT_G[u] || 1);
      unit = u;
    } else {
      const numAny = normed.match(/(\d+[\.\,]?\d*)/);
      if (numAny) {
        const afterAny = normed.replace(/^[\d\.\,\s]+/, '').trim();
        if (afterAny.match(/^(ks|kus|kusy|strúčik|strúčiky|plátok|plátky|list|listy|balík|balenia)\b/)) {
          val = parseFloat(numAny[1].replace(',','.'));
          unit = 'ks';
        } else if (!unit) {
          val = parseFloat(numAny[1].replace(',','.'));
          unit = 'ks';
        }
      }
    }
  }
  return { grams: val > 0 ? val : 100, isPiece: unit === 'ks', val: val > 0 ? val : 100 };
}
const DESCRIPTIVE_STRIP = /\b(mleté|prerastená|čerstvý|čerstvá|čerstvé|sušené|sušený|sušená|nakrájané|nakrájaný|nakrájaná|ošúpané|vypečené|červenej|bieleho|tmavého|svetlej|domáce|domáci|domáca|čerstvo|hrsť|štipka|trochu|podľa|chuti)\b/gi;

function estimateNutrition(ingredients, portions) {
  const portionsNum = portions && portions > 0 ? portions : 4;
  let total = {kcal:0, protein:0, fat:0, carbs:0};
  let matchedCount = 0, unmatchedCount = 0, estimatedCount = 0;
  const unmatched = [];
  const matched = [];
  for (const raw of ingredients) {
    const ing = raw.trim();
    if (!ing) continue;
    processIngredient(ing);
  }
  function processIngredient(ing) {
    const { grams, isPiece, val } = parseQuantity(ing);
    const ingLookup = ing.toLowerCase().replace(DESCRIPTIVE_STRIP, '').trim();
    let best = null, bestLen = 0, bestKey = '';
    for (const [key, data] of Object.entries(NUTRITION_DB)) {
      if (ingLookup.includes(key) && key.length > bestLen) {
        best = data; bestLen = key.length; bestKey = key;
      }
    }
    let usedFallback = false;
    if (!best) {
      usedFallback = true;
      if (ingLookup.includes('olej') || ingLookup.includes('masť') || ingLookup.includes('maslo')) best = {kcal:700, protein:0, fat:78, carbs:0};
      else if (ingLookup.includes('mäso') || ingLookup.includes('mäsa')) best = {kcal:220, protein:25, fat:12, carbs:0};
      else if (ingLookup.includes('syr') || ingLookup.includes('tvaroh')) best = {kcal:280, protein:20, fat:22, carbs:1};
      else if (ingLookup.includes('cukor') || ingLookup.includes('med') || ingLookup.includes('sirup')) best = {kcal:350, protein:0, fat:0, carbs:87};
      else if (ingLookup.includes('múka') || ingLookup.includes('cestoviny') || ingLookup.includes('cestovina')) best = {kcal:350, protein:10, fat:1, carbs:75};
      else if (ingLookup.includes('zelenina') || ingLookup.includes('zeleniny')) best = {kcal:30, protein:1, fat:0.2, carbs:6};
      else if (ingLookup.includes('ovocie')) best = {kcal:50, protein:0.5, fat:0.2, carbs:12};
      else if (ingLookup.includes('korenie') || ingLookup.includes('soľ') || ingLookup.includes('bylinky')) best = {kcal:10, protein:0, fat:0, carbs:0};
    }
    if (best) {
      let gramsUsed = grams;
      if (isPiece) {
        let pw = 50;
        for (const [k, w] of Object.entries(PIECE_WEIGHT)) {
          if (ingLookup.includes(k)) { pw = w; break; }
        }
        gramsUsed = val * pw;
      }
      const factor = gramsUsed / 100;
      total.kcal += best.kcal * factor;
      total.protein += best.protein * factor;
      total.fat += best.fat * factor;
      total.carbs += best.carbs * factor;
      if (usedFallback) { estimatedCount++; unmatched.push(ing); }
      else { matchedCount++; matched.push({ing, matchedKey: bestKey, grams: gramsUsed}); }
    } else {
      unmatchedCount++;
      unmatched.push(ing);
    }
  }
  // Round total
  total.kcal = Math.round(total.kcal) || 0;
  total.protein = Math.round(total.protein) || 0;
  total.fat = Math.round(total.fat) || 0;
  total.carbs = Math.round(total.carbs) || 0;
  // Compute per-portion
  const pp = {
    kcal: Math.round(total.kcal / portionsNum) || 0,
    protein: Math.round(total.protein / portionsNum) || 0,
    fat: Math.round(total.fat / portionsNum) || 0,
    carbs: Math.round(total.carbs / portionsNum) || 0,
  };
  // Confidence
  const totalItems = matchedCount + estimatedCount + unmatchedCount;
  let confidence = 'presny';
  if (unmatchedCount > 0 || estimatedCount > 0) confidence = 'odhad';
  if (unmatchedCount > totalItems * 0.3) confidence = 'hruby';
  return {
    total,
    perPortion: pp,
    portions: portionsNum,
    confidence,
    matchedCount, estimatedCount, unmatchedCount,
    matched, unmatched,
  };
}

function sanitizeNutrition(nutrition, portions) {
  const p = portions || 4;
  const warnings = [];
  if (nutrition.kcal > 1200) warnings.push('kcal');
  if (nutrition.fat > 80) warnings.push('fat');
  if (nutrition.protein > 80) warnings.push('protein');
  if (nutrition.carbs > 150) warnings.push('carbs');
  return {
    warnings,
    hasWarnings: warnings.length > 0,
    isHeartyMeal: nutrition.kcal > 800 && nutrition.fat > 40,
  };
}

function autoFillNutrition() {
  const ingredients = document.getElementById('r-ingredients').value.split('\n').map(s => s.trim()).filter(Boolean);
  if (!ingredients.length) return;
  const portions = parseInt(document.getElementById('r-portions').value) || 4;
  const result = estimateNutrition(ingredients, portions);
  // Fill per-portion values
  document.getElementById('r-kcal').value = result.perPortion.kcal;
  document.getElementById('r-protein').value = result.perPortion.protein || '';
  document.getElementById('r-fat').value = result.perPortion.fat || '';
  document.getElementById('r-carbs').value = result.perPortion.carbs || '';
  // Show confidence
  const status = document.getElementById('nutrition-status');
  if (status) {
    const labels = {presny: '✅ Presný výpočet', odhad: '📐 Odhad', hruby: '⚠️ Hrubý odhad'};
    let text = labels[result.confidence] || '';
    if (result.unmatched.length) {
      text += `<br><span style="font-size:.7rem;opacity:.7;">⚠️ ${result.unmatched.length} ${t('unmatchedHint')}</span>`;
    }
    status.innerHTML = text;
  }
  // Portion info
  const info = document.getElementById('nutrition-portion-info');
  if (info) {
    info.textContent = `Na 1 porciu z ${result.portions} (celý recept: ${result.total.kcal} kcal)`;
  }
}

function estimateAndFillImport(ingrArray, yieldNum) {
  const result = estimateNutrition(ingrArray, yieldNum || 4);
  if (result.perPortion.kcal > 0) {
    document.getElementById('r-kcal').value = result.perPortion.kcal;
    document.getElementById('r-protein').value = result.perPortion.protein || '';
    document.getElementById('r-fat').value = result.perPortion.fat || '';
    document.getElementById('r-carbs').value = result.perPortion.carbs || '';
    document.getElementById('r-portions').value = result.portions;
  }
  return result;
}

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

// ======================== AI: CELÝ TÝŽDEŇ + NÁKUP ========================
async function aiGenerateFullWeek() {
  showConfirmModal(lang==='en'?'Generate full week + shopping list? This will replace your current plan.':'Vygenerovať celý týždeň + nákupný zoznam? Prepíše sa aktuálny plán.', '🚀', lang==='en'?'Generate':'Generovať', function() {
    aiGenerateFullWeekRun();
  });
}

async function aiGenerateFullWeekRun() {
  const menuText = await aiWeeklyPlan();
  if (!menuText) return;
  // Remove any existing AI plan modal
  const old = document.getElementById('ai-plan-modal');
  if (old) old.remove();
  // Show the plan in a modal with a custom button
  const div = document.createElement('div');
  div.id = 'ai-plan-modal';
  div.className = 'modal-overlay active';
  div.style.cssText = 'z-index:2000;';
  div.onclick = function(e) { if (e.target === this) this.remove(); };
  div.innerHTML = '<div class="modal" style="max-width:500px;max-height:85vh;overflow-y:auto;">' +
    '<button class="modal-close" onclick="this.closest(\'.modal-overlay\').remove()">✕</button>' +
    '<h2>🤖 ' + t('AI návrh jedálnička','AI meal plan') + '</h2>' +
    '<pre id="ai-plan-text" style="white-space:pre-wrap;font-size:.75rem;font-family:inherit;background:var(--bg);padding:.8rem;border-radius:8px;max-height:50vh;overflow-y:auto;">' + esc(menuText) + '</pre>' +
    '<div style="display:flex;gap:.5rem;margin-top:.8rem;flex-wrap:wrap;">' +
      '<button class="btn btn-primary" onclick="parseAndFillAIPlan();showToast(\'Shopping will be generated...\',\'info\');setTimeout(function(){aiGenerateShoppingList()},3000)" style="flex:1;">' + (lang === 'en' ? 'Apply + shopping' : 'Použiť + nákup') + '</button>' +
      '<button class="btn btn-secondary" onclick="parseAndFillAIPlan();this.closest(\'.modal-overlay\').remove()">' + t('Len použiť','Just apply') + '</button>' +
    '</div></div>';
  document.body.appendChild(div);
}

async function fetchPexelsImage(query) {
  if (!query) return null;
  const url = AI_PROXY_URL + '/api/pexels?query=' + encodeURIComponent(query + ' food');
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.photos && data.photos.length > 0) {
      // Prefer food-looking images (try to avoid non-food results)
      for (const photo of data.photos) {
        if (photo.alt && /food|meal|dish|breakfast|lunch|dinner|cook/i.test(photo.alt)) {
          return photo.src.large2x || photo.src.large || photo.src.medium;
        }
      }
      return data.photos[0].src.large2x || data.photos[0].src.large || data.photos[0].src.medium;
    }
    return null;
  } catch(e) {
    return null;
  }
}

async function getRecipeImage(recipe) {
  if (recipe.imageData) return recipe.imageData;
  // Never overwrite existing real image with cached/fetched one
  if (recipe.image && !recipe.image.includes('placehold.co')) return recipe.image;
  // Fetch from Pexels only for recipes without images
  const cache = getImageCache();
  if (cache[recipe.id]) { recipe.image = imgUrl(cache[recipe.id]); saveToLS(); return cache[recipe.id]; }
  // Priority 4: Pexels fetch
  const query = translateRecipeQuery(lang === 'en' && recipe.nameEn ? recipe.nameEn : recipe.name);
  const img = await fetchPexelsImage(query);
  if (img) {
    setImageCache(recipe.id, img);
    recipe.image = imgUrl(img);
    saveToLS();
    return img;
  }
  // Priority 5: category fallback via Pexels
  const catQuery = categoryFallbackQuery(recipe.category);
  if (catQuery) {
    const fallbackImg = await fetchPexelsImage(catQuery);
    if (fallbackImg) {
      setImageCache(recipe.id, fallbackImg);
      recipe.image = imgUrl(fallbackImg);
      saveToLS();
      return fallbackImg;
    }
  }
  return null;
}

function categoryFallbackQuery(category) {
  const map = {
    'Raňajky': 'breakfast food',
    'Polievky': 'soup food',
    'Hlavné jedlá': 'main dish dinner',
    'Šaláty': 'salad food',
    'Dezerty': 'dessert',
    'Pečivo': 'bread bakery',
    'Nápoje': 'smoothie drink',
    'Predjedlá': 'appetizer',
    'Prílohy': 'side dish',
    'Detské': 'baby food healthy',
  };
  return map[category] || 'food meal';
}

function imgUrl(url) {
  if (!url || url.startsWith('data:')) return url;
  return url + (url.includes('?') ? '&' : '?') + 'v=' + APP_VERSION;
}

async function refreshRecipeImages() {
  localStorage.removeItem('pexels_cache_v3');
  recipes.forEach(r => {
    if (r.image && (r.image.includes('pexels.com') || r.image.includes('placehold.co'))) r.image = '';
  });
  saveToLS();
  await batchFetchImages();
  render();
  showToast(t('Obrázky boli obnovené','Images refreshed'),'info');
}

async function batchFetchImages() {
  const toFetch = recipes.filter(r => {
    if (r.imageData) return false;  // Never touch recipes with user-uploaded images
    if (r.image && !r.image.includes('placehold.co')) return false;  // Never overwrite real images
    return true;  // Only fetch for recipes with no image or placeholder
  });
  if (!toFetch.length) return;
  // Fetch in batches of 3 to avoid rate limiting
  for (let i = 0; i < toFetch.length; i += 3) {
    const batch = toFetch.slice(i, i + 3);
    await Promise.all(batch.map(r => getRecipeImage(r).catch(() => {})));
    // Small delay between batches
    if (i + 3 < toFetch.length) await new Promise(r => setTimeout(r, 500));
  }
}

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
    accentColor: localStorage.getItem('accent') || '#e63946',
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

// ======================== MODALS ========================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}
function toggleRecipeAiTools() {
  const tools = document.getElementById('recipe-ai-tools');
  const toggle = document.querySelector('.recipe-ai-toggle');
  if (!tools) return;
  const isOpen = tools.classList.toggle('active');
  if (toggle) toggle.classList.toggle('btn-primary', isOpen);
}

function toggleRecipeMoreTools() {
  const tools = document.getElementById('recipe-more-tools');
  const aiTools = document.getElementById('recipe-ai-tools');
  const toggle = document.querySelector('.recipe-more-toggle');
  if (!tools) return;
  const isOpen = tools.classList.toggle('active');
  if (toggle) toggle.classList.toggle('btn-primary', isOpen);
  if (!isOpen && aiTools) aiTools.classList.remove('active');
}
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => { if (e.target === el) { el.classList.remove('active'); } });
});

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
          <button class="btn btn-secondary" onclick="changePortion(-1)" style="padding:.1rem .45rem;font-size:.85rem;">−</button>
          <span id="portion-num" style="font-weight:700;font-size:.9rem;min-width:1.5rem;text-align:center;">${basePortion}</span>
          <button class="btn btn-secondary" onclick="changePortion(1)" style="padding:.1rem .45rem;font-size:.85rem;">+</button>
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

// ======================== COOKING MODE ========================
function openCookingMode() {
  cookingRecipeId = viewingId;
  cookingStep = 0;
  const r = recipes.find(rec => rec.id === cookingRecipeId);
  if (!r) return;
  closeModal('detail-modal');
  document.getElementById('cooking-mode').classList.add('active');
  renderCookingStep();
  // Async image fetch
  if (!r.image && !r.imageData) {
    getRecipeImage(r).then(url => {
      if (url) renderCookingStep();
    });
  }
}

function renderCookingStep() {
  const r = recipes.find(rec => rec.id === cookingRecipeId);
  if (!r) return;
  const total = r.steps.length;
  const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
  const stps = (lang === "en" && r.stepsEn ? r.stepsEn : r.steps) || [];
  document.getElementById('cooking-title').textContent = name;
  const imgEl = document.getElementById('cooking-img');
  if (r.image || r.imageData) {
    imgEl.innerHTML = `<img src="${escAttr(r.imageData||r.image)}" style="width:100%;height:100%;object-fit:contain;" loading="lazy" onerror="this.outerHTML='🍽️'">`;
  } else { imgEl.textContent = '🍽️'; imgEl.className = 'cooking-img img-skeleton'; }
  document.getElementById('cooking-step-indicator').textContent = `${lang==='en'?'Step':'Krok'} ${cookingStep+1}/${total}`;
  document.getElementById('cooking-step-text').textContent = stps[cookingStep];
  document.getElementById('cooking-step-count').textContent = `${cookingStep+1}/${total}`;
  document.getElementById('cooking-progress-bar').style.width = `${((cookingStep+1)/total)*100}%`;
  document.getElementById('cooking-prev').disabled = cookingStep === 0;
  document.getElementById('cooking-next').innerHTML = cookingStep === total-1 ? `✓ ${lang==='en'?'Done':'Hotovo'}` : `${lang==='en'?'Next':'Ďalší'} →`;
  const timeMatch = stps[cookingStep].match(/(\d+)\s*(minút|min|minutes|hodín|hour|hours)/i);
  const timerBtn = document.getElementById('cooking-timer-btn');
  if (timeMatch) {
    const mins = parseInt(timeMatch[1]);
    timerBtn.style.display = 'inline-flex';
    timerBtn.textContent = `⏱ ${mins} ${lang==='en'?'min':'min'}`;
    timerBtn.onclick = () => {
      cookingTimerSeconds = mins * 60;
      startTimer();
    };
  } else {
    timerBtn.style.display = 'none';
  }
}

function cookingNext() {
  const r = recipes.find(rec => rec.id === cookingRecipeId);
  if (!r) return;
  if (cookingStep < r.steps.length - 1) { cookingStep++; renderCookingStep(); }
  else { logCooking(cookingRecipeId); closeCookingMode(); showToast(t('cookingDone'),'success'); }
}
function cookingPrev() { if (cookingStep > 0) { cookingStep--; renderCookingStep(); } }

document.addEventListener('keydown', function(e) {
  if (!document.getElementById('cooking-mode').classList.contains('active')) return;
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); cookingNext(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); cookingPrev(); }
  if (e.key === 'Escape') { closeCookingMode(); }
});

function closeCookingMode() {
  document.getElementById('cooking-mode').classList.remove('active');
  stopTimer();
  stopVoice();
}

// ======================== TIMER ========================
function toggleTimer() {
  if (cookingTimerRunning) { stopTimer(); }
  else {
    const mins = prompt(lang==='en'?'Timer (minutes):' : 'Timer (minúty):', '5');
    if (mins === null) return;
    const val = parseInt(mins);
    if (isNaN(val) || val < 1 || val > 999) { showToast(lang==='en'?'Enter 1-999 minutes.':'Zadaj 1-999 minút.','warning'); return; }
    cookingTimerSeconds = val * 60;
    startTimer();
  }
}

function startTimer() {
  cookingTimerRunning = true;
  document.getElementById('cooking-timer').classList.add('running');
  updateTimerDisplay();
  cookingTimer = setInterval(() => {
    cookingTimerSeconds--;
    if (cookingTimerSeconds <= 0) { stopTimer(); showToast('⏰ '+(lang==='en'?'Time up!':'Timer dobehol!'),'warning'); }
    else updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  cookingTimerRunning = false;
  document.getElementById('cooking-timer').classList.remove('running');
  if (cookingTimer) { clearInterval(cookingTimer); cookingTimer = null; }
  document.getElementById('cooking-timer').textContent = '⏱️ 00:00';
}

function updateTimerDisplay() {
  const m = Math.floor(cookingTimerSeconds / 60);
  const s = cookingTimerSeconds % 60;
  document.getElementById('cooking-timer').textContent = `⏱️ ${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  if (cookingTimerSeconds <= 60) document.getElementById('cooking-timer').style.color = '#ef4444';
  else document.getElementById('cooking-timer').style.color = '';
}

// ======================== VOICE ========================
function toggleVoice() {
  if (voiceSearchListening) stopVoiceSearch();
  if (voiceListening) { stopVoice(); return; }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { showToast(lang==='en'?'Voice not supported.':'Hlasové ovládanie nie je podporené.','warning'); return; }
  voiceRecognition = new SpeechRecognition();
  voiceRecognition.lang = lang === 'en' ? 'en-US' : 'sk-SK';
  voiceRecognition.continuous = true;
  voiceRecognition.interimResults = false;
  voiceRecognition.onresult = function(e) {
    const txt = e.results[e.results.length-1][0].transcript.toLowerCase();
    if (txt.includes('next') || txt.includes('ďalší') || txt.includes('dalej') || txt.includes('hotovo') || txt.includes('done')) cookingNext();
    if (txt.includes('previous') || txt.includes('predošlý') || txt.includes('späť') || txt.includes('back')) cookingPrev();
    if (txt.includes('close') || txt.includes('zavrieť') || txt.includes('koniec') || txt.includes('exit')) closeCookingMode();
    if (txt.includes('timer') || txt.includes('časovač')) toggleTimer();
    if (txt.includes('stop') || txt.includes('halt')) stopTimer();
  };
  voiceRecognition.onerror = function() { stopVoice(); };
  voiceRecognition.start();
  voiceListening = true;
  document.getElementById('voice-btn').classList.add('listening');
  document.getElementById('voice-btn').textContent = '🎤';
}

function stopVoice() {
  if (voiceRecognition) { try { voiceRecognition.stop(); } catch(e) {} voiceRecognition = null; }
  voiceListening = false;
  document.getElementById('voice-btn').classList.remove('listening');
  document.getElementById('voice-btn').textContent = '🎤';
}



// ======================== VOICE SEARCH ========================
function toggleVoiceSearch() {
  if (voiceListening) stopVoice();
  if (voiceSearchListening) { stopVoiceSearch(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showToast(lang==='en'?'Voice search not supported.':'Hlasové vyhľadávanie nie je podporené.','warning'); return; }
  voiceSearch = new SR();
  voiceSearch.lang = lang === 'en' ? 'en-US' : 'sk-SK';
  voiceSearch.interimResults = false;
  voiceSearch.onresult = function(e) {
    const txt = e.results[0][0].transcript;
    document.getElementById('search').value = txt;
    document.getElementById('search-clear').style.display = txt ? 'block' : 'none';
    render();
    stopVoiceSearch();
  };
  voiceSearch.onerror = function() { stopVoiceSearch(); };
  voiceSearch.start();
  voiceSearchListening = true;
  document.getElementById('voice-search-btn').textContent = '🎤';
  document.getElementById('voice-search-btn').style.background = '#ef4444';
  document.getElementById('voice-search-btn').style.color = '#fff';
}

function stopVoiceSearch() {
  if (voiceSearch) { try { voiceSearch.stop(); } catch(e) {} voiceSearch = null; }
  voiceSearchListening = false;
  const btn = document.getElementById('voice-search-btn');
  if (btn) { btn.textContent = '🎤'; btn.style.background = ''; btn.style.color = ''; }
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

// =================== SKELETON HELPERS ===================
function renderSkeletonGrid(container, count) {
  if (!container) return;
  count = count || 6;
  let html = '<div class="skeleton-grid">';
  for (let i = 0; i < count; i++) {
    html += '<div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-body"><div class="skeleton-line"></div><div class="skeleton-line-short"></div></div></div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function renderSkeletonPlanner(container) {
  if (!container) return;
  let html = '';
  for (let i = 0; i < 3; i++) {
    html += '<div class="skeleton-planner-day"><div class="skeleton-line" style="width:40%"></div><div class="skeleton-row"></div><div class="skeleton-row"></div><div class="skeleton-row"></div></div>';
  }
  container.innerHTML = html;
}

function renderSkeletonShopping(container) {
  if (!container) return;
  container.innerHTML = '<div class="skeleton-shopping"><div class="skeleton-summary"></div><div class="skeleton-cat"></div><div class="skeleton-cat"></div><div class="skeleton-cat"></div></div>';
}

function animateSkeletonOut(container) {
  if (!container) return;
  container.querySelectorAll('.skeleton-grid, .skeleton-planner-day, .skeleton-shopping').forEach(function(el) {
    el.style.transition = 'opacity .25s ease, transform .25s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(function() { el.remove(); }, 280);
  });
}

function applyPageTransition(el, duration) {
  if (!el) return;
  duration = duration || 400;
  el.style.animation = 'none';
  void el.offsetHeight;
  el.style.animation = 'pageEnter ' + duration + 'ms cubic-bezier(.22,1,.36,1) both';
}

// =================== COUNT-UP ANIMATION ===================
function animateCountUp(el, target) {
  if (!el) return;
  target = parseInt(target) || 0;
  var current = 0;
  var step = Math.max(1, Math.floor(target / 30));
  var duration = 800;
  var interval = Math.max(10, Math.floor(duration / (target / step)));
  if (target < 1) { el.textContent = '0'; return; }
  var timer = setInterval(function() {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, interval);
}

function springBounce(el) {
  if (!el) return;
  el.classList.remove('spring-bounce');
  void el.offsetWidth;
  el.classList.add('spring-bounce');
}

function microCheckmark(el) {
  if (!el) return;
  el.classList.remove('check-pop');
  void el.offsetWidth;
  el.classList.add('check-pop');
}

function dismissTip() {
  const hero = document.getElementById('hero-card');
  hero.style.animation = 'pageExit .25s cubic-bezier(.55,0,.1,1) both';
  setTimeout(() => {
    hero.classList.remove('show');
    hero.style.animation = '';
  }, 260);
  localStorage.setItem('tipDismissed', new Date().toISOString().slice(0,10));
}

function switchTab(tab) {
  haptic(8);
  try { localStorage.setItem('lastTab', tab); } catch(e) {}
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.nav-item[data-tab="${tab}"]`);
  if (btn) { btn.classList.add('active'); springBounce(btn); }
  document.body.dataset.tab = tab;
  if (window._skipHistory) { window._skipHistory = false; }
  else { history.pushState({ tab }, '', '#tab-' + tab); }
  const dashboard = document.getElementById('dashboard');
  const recipeContainer = document.getElementById('home');
  const plannerContainer = document.getElementById('planner-container');
  const shoppingContainer = document.getElementById('shopping-container');
  const tasksContainer = document.getElementById('tasks-container');
  const boardContainer = document.getElementById('board-container');
  const mainTitle = document.getElementById('main-title');
  const appHeader = document.getElementById('app-header');
  [dashboard, recipeContainer, plannerContainer, shoppingContainer, tasksContainer, boardContainer].forEach(function(el) { if (el) el.style.display = 'none'; });
  if (mainTitle) mainTitle.style.display = tab === 'dashboard' ? 'none' : '';
  if (appHeader) appHeader.style.display = (tab === 'dashboard' || tab === 'board') ? 'none' : '';
  updateMainHeader(tab);
  try {
    document.body.classList.remove('header-collapsed');
    window.scrollTo(0, 0);
  } catch(e) {}
  if (tab === 'dashboard' && dashboard) {
    dashboard.style.display = ''; applyPageTransition(dashboard, 350);
    try { renderDashboard(); } catch(e) {}
  } else if (tab === 'home' && recipeContainer) {
    recipeContainer.style.display = ''; applyPageTransition(recipeContainer, 350);
    var grid = document.getElementById('recipe-grid');
    if (grid && grid.children.length === 0) renderSkeletonGrid(grid, 6);
    try { render(); } catch(e) {}
  } else if (tab === 'shopping' && shoppingContainer) {
    shoppingContainer.style.display = 'block'; applyPageTransition(shoppingContainer, 350);
    var shopView = document.getElementById('shopping-list-view');
    if (shopView && !shopView.children.length) renderSkeletonShopping(shopView);
    try { renderShoppingList(); } catch(e) {}
  } else if (tab === 'planner' && plannerContainer) {
    plannerContainer.style.display = 'block'; applyPageTransition(plannerContainer, 350);
    var weekGrid = document.getElementById('planner-week-grid');
    if (weekGrid && !weekGrid.children.length) renderSkeletonPlanner(weekGrid);
    try { renderPlanner(); } catch(e) {}
  } else if (tab === 'tasks' && tasksContainer) {
    tasksContainer.style.display = 'block'; applyPageTransition(tasksContainer, 350);
    try { renderTasks(); } catch(e) {}
  } else if (tab === 'board' && boardContainer) {
    boardContainer.style.display = 'block'; applyPageTransition(boardContainer, 350);
    try { renderMoreScreen(); } catch(e) {}
  }
}

function renderMoreScreen() {
  renderMoreHome();
}

function openMorePageFromAnywhere(page) {
  switchTab('board');
  openMorePage(page || 'settings');
}

function renderMoreHome() {
  const view = document.getElementById('board-container-view');
  if (!view) return;
  const openTasks = Array.isArray(tasks) ? tasks.filter(t => !t.completed).length : 0;
  const shoppingCount = Array.isArray(shopItems) ? shopItems.filter(i => i && !i.checked).length : 0;
  const familyState = familyCode ? 'Rodina pripojená' : 'Pripojiť rodinu';
  view.innerHTML = `<section class="more-screen">
    <div class="more-head">
      <div>
        <span>Mealnest</span>
        <h1>Viac</h1>
        <p>Všetko dôležité na jednom mieste</p>
      </div>
      <button class="more-avatar" onclick="openMorePage('account')">${getDashboardAvatar()}</button>
    </div>
    <div class="more-grid">
      ${renderMoreTile('tasks', '✅', 'Úlohy', `${openTasks} otvorených`, 'Dnes, nadchádzajúce a hotové úlohy')}
      ${renderMoreTile('board', '📌', 'Nástenka', 'Rodinný dashboard', 'Jedlá, nákup, aktivita a členovia')}
      ${renderMoreTile('settings', '⚙️', 'Nastavenia', 'Vzhľad, účet, súkromie', 'Moderné nastavenia aplikácie')}
      ${renderMoreTile('language', '🌐', 'Jazyk', 'Slovenčina / English', 'Rýchla zmena jazyka')}
      ${renderMoreTile('shopping', '🛒', 'Nákup', `${shoppingCount} položiek`, 'Zoznamy, história a kategórie')}
      ${renderMoreTile('ai-week', '🚀', 'AI Týždeň', 'Plán na mieru', 'Preferencie a návrhy AI')}
    </div>
    <div class="more-list">
      ${renderMoreRow('family', '👨‍👩‍👧‍👦', familyState, familyCode ? 'Členovia, zdieľanie a aktivita' : 'Pozvánky a spoločné plánovanie')}
      ${renderMoreRow('onboarding', '❓', 'Onboarding centrum', 'Funkcie, import, AI plánovač')}
      ${renderMoreRow('notifications-account', '🔔', 'Notifikácie a účet', 'Email, odhlásenie, predplatné')}
      ${renderMoreRow('backup-sync', '☁️', 'Backup a synchronizácia', 'Zálohy, obnovenie a história')}
      ${renderMoreRow('privacy-security', '🔒', 'Súkromie a bezpečnosť', 'Oprávnenia, export a vymazanie dát')}
      ${renderMoreRow('about', 'ℹ️', 'O aplikácii', 'Verzia, changelog, licencie')}
    </div>
  </section>`;
}

function renderMoreTile(page, icon, title, desc, detail) {
  return `<button class="more-tile" onclick="openMorePage('${page}')"><span>${icon}</span><strong>${title}</strong><small>${desc}</small><em>${detail}</em><b>›</b></button>`;
}

function renderMoreRow(page, icon, title, desc) {
  return `<button onclick="openMorePage('${page}')"><span>${icon}</span><div><strong>${title}</strong><small>${desc}</small></div><em>›</em></button>`;
}

function openMorePage(page) {
  const view = document.getElementById('board-container-view');
  if (!view) return;
  const renderers = {
    family: renderMoreFamilyPage,
    settings: renderMoreSettingsHub,
    appearance: renderMoreAppearancePage,
    'home-settings': renderMoreHomeSettingsPage,
    'meal-settings': renderMoreMealSettingsPage,
    'shopping-settings': renderMoreShoppingSettingsPage,
    'data-settings': renderMoreDataSettingsPage,
    notifications: renderMoreNotificationsPage,
    account: renderMoreAccountPage,
    privacy: renderMorePrivacySecurityPage,
    sync: renderMoreBackupSyncPage,
    tasks: renderMoreTasksPage,
    board: renderMoreBoardPage,
    'family-permissions': renderMoreFamilyPermissionsPage,
    language: renderMoreLanguagePage,
    shopping: renderMoreShoppingPage,
    'ai-week': renderMoreAiWeekPage,
    onboarding: renderMoreOnboardingPage,
    'notifications-account': renderMoreNotificationsAccountPage,
    'backup-sync': renderMoreBackupSyncPage,
    'privacy-security': renderMorePrivacySecurityPage,
    about: renderMoreAboutPage
  };
  view.innerHTML = (renderers[page] || renderMoreSettingsHub)();
  try { window.scrollTo(0, 0); } catch(e) {}
}

function renderMoreShell(title, subtitle, body, action) {
  return `<section class="more-screen more-subpage">
    <div class="more-subhead">
      <button class="more-back" onclick="renderMoreHome()" aria-label="Späť">‹</button>
      <div><h1>${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ''}</div>
      ${action || '<span class="more-head-spacer"></span>'}
    </div>
    ${body}
  </section>`;
}

function moreCard(title, content, cls) {
  return `<section class="more-card ${cls || ''}">${title ? `<h2>${title}</h2>` : ''}${content}</section>`;
}

function moreActionRow(icon, title, desc, action, meta) {
  return `<button class="more-action-row" onclick="${action || ''}"><span>${icon}</span><div><strong>${title}</strong>${desc ? `<small>${desc}</small>` : ''}</div>${meta ? `<em>${meta}</em>` : '<em>›</em>'}</button>`;
}

function morePill(label, active, action) {
  return `<button class="more-pill ${active ? 'active' : ''}" onclick="${action || ''}">${label}</button>`;
}

function moreEmptyState(icon, title, desc, actionLabel, action) {
  return `<div class="more-empty-state">
    <span>${icon}</span>
    <strong>${title}</strong>
    ${desc ? `<small>${desc}</small>` : ''}
    ${actionLabel && action ? `<button class="more-primary" onclick="${action}">${actionLabel}</button>` : ''}
  </div>`;
}

function renderMoreFamilyPage() {
  const ownerName = authUser && (authUser.displayName || authUser.email)
    ? (authUser.displayName || authUser.email)
    : (localStorage.getItem('deviceName') || 'Toto zariadenie');
  const members = familyCode
    ? [['👤', ownerName, 'Vlastník']]
    : [];
  const shareStatus = familyCode ? 'Zapnuté' : 'Neaktívne';
  const memberContent = members.length
    ? `<div class="more-member-list">${members.map(m => `<div class="more-member"><span>${m[0]}</span><div><strong>${esc(m[1])}</strong><small>${esc(m[2])}</small></div></div>`).join('')}</div>`
    : moreEmptyState('👨‍👩‍👧‍👦', 'Rodina zatiaľ nie je pripojená', 'Po pozvaní členov sa tu zobrazia reálne osoby.', '+ Pozvať člena', 'copyFamilyInvite()');
  const body = `
    ${moreCard('Family members', `${memberContent}${familyCode ? '<button class="more-primary" onclick="copyFamilyInvite()">+ Pozvať člena</button>' : ''}`)}
    ${moreCard('Zdieľanie', `
      ${moreActionRow('📅','Zdieľané plánovanie','Týždenný jedálniček vidí celá rodina',"showToast(familyCode ? 'Zdieľanie je aktívne' : 'Rodina nie je pripojená', 'info')",shareStatus)}
      ${moreActionRow('🛒','Zdieľané nákupy','Spoločný nákupný zoznam',"showToast(familyCode ? 'Zdieľanie je aktívne' : 'Rodina nie je pripojená', 'info')",shareStatus)}
      ${moreActionRow('📖','Zdieľané recepty','Rodinný receptár',"showToast(familyCode ? 'Zdieľanie je aktívne' : 'Rodina nie je pripojená', 'info')",shareStatus)}
    `)}
    ${moreCard('Nastavenia rodiny', `
      ${moreActionRow('🛡️','Permissions','Správa rolí a oprávnení',"openMorePage('family-permissions')")}
      ${moreActionRow('🕘','Activity log','Posledné rodinné zmeny',"openMorePage('board')",'›')}
    `)}
    ${moreCard('Pripojenie', familyCode ? `
      ${moreActionRow('🔗','Rodinný kód', esc(familyCode), 'copyFamilyInvite()', 'Kopírovať')}
      ${moreActionRow('🔄','Synchronizovať teraz','Odošle lokálne dáta do rodiny',"pushAllLocalData();showToast('Dáta odoslané.','success')")}
      ${moreInputRow('📱','Názov zariadenia','Zobrazuje sa pri rodinnom syncu', localStorage.getItem('deviceName') || '', 'setMoreDeviceName(this.value)')}
      ${moreActionRow('🚪','Opustiť rodinu','Lokálne dáta ostanú v zariadení','leaveFamily()','›')}
    ` : `
      ${moreActionRow('✨','Vytvoriť rodinu','Vygeneruje nový rodinný kód','createFamily()')}
      <label class="more-setting-row"><span>🔑</span><div><strong>Pripojiť sa k rodine</strong><small>Zadaj existujúci rodinný kód</small></div><input id="more-family-code-input" class="more-input" type="text" placeholder="Kód"></label>
      <button class="more-primary" onclick="joinFamilyFromMore()">Pripojiť rodinu</button>
    `)}
    ${moreCard('Recent activity', renderMoreActivityFeed())}
  `;
  return renderMoreShell(familyCode ? 'Rodina pripojená' : 'Rodina nie je pripojená', familyCode ? `Kód rodiny ${esc(familyCode)}` : 'Rodinné zdieľanie nie je pripojené', body, '<button class="more-top-action" onclick="copyFamilyInvite()">Pozvať</button>');
}

function renderMoreFamilyPermissionsPage() {
  const ownerName = authUser && (authUser.displayName || authUser.email)
    ? (authUser.displayName || authUser.email)
    : (localStorage.getItem('deviceName') || 'Toto zariadenie');
  const body = `
    ${moreCard('Permissions', `
      ${familyCode
        ? moreActionRow('👤', esc(ownerName), 'Vlastník · všetky práva', "showToast('Vlastník má všetky práva', 'info')", 'Owner')
        : moreEmptyState('🔒', 'Žiadne rodinné oprávnenia', 'Najprv pripoj alebo vytvor rodinu.', 'Otvoriť rodinu', "openMorePage('family')")}
    `)}
    ${moreCard('Activity log', renderMoreActivityFeed())}
  `;
  return renderMoreShell('Permissions', 'Rodinné role a oprávnenia', body, "<button class=\"more-top-action\" onclick=\"openMorePage('family')\">Rodina</button>");
}

function copyFamilyInvite() {
  if (!familyCode) {
    showToast('Najprv vytvor alebo pripoj rodinu', 'warning');
    return;
  }
  const code = familyCode;
  try { navigator.clipboard && navigator.clipboard.writeText(code); } catch(e) {}
  showToast('Pozvánka pripravená', 'success');
}

function renderMoreActivityFeed() {
  const recentCompleted = getRecentCompleted().slice(0, 3);
  if (!recentCompleted.length) {
    return moreEmptyState('🕘', 'Zatiaľ žiadna aktivita', 'Keď niekto pridá recept, dokončí úlohu alebo zmení plán, zobrazí sa to tu.');
  }
  return `<div class="more-feed">${recentCompleted.map(task => `<div><span>✅</span><strong>${esc(task.title)}</strong><small>${task.completedDate ? formatTaskDate(task.completedDate.slice(0,10)) : 'Dokončené'}</small></div>`).join('')}</div>`;
}

function renderMoreSettingsHub() {
  const cards = [
    ['appearance','🎨','Vzhľad','Téma, akcent, text a hustota'],
    ['home-settings','🏠','Domov','Widgety, počasie a dieťa'],
    ['meal-settings','📅','Jedálniček','Porcie a nutričné hodnoty'],
    ['shopping-settings','🛒','Nákup','Režim obchodu a AI zoznam'],
    ['notifications','🔔','Oznámenia','Pripomienky a push nastavenia'],
    ['account','👤','Účet','Profil, prihlásenie a odhlásenie'],
    ['language','🌐','Jazyk','Slovenčina alebo English'],
    ['family','👨‍👩‍👧‍👦','Rodina','Kód, členovia a synchronizácia'],
    ['privacy-security','🔒','Súkromie','Oprávnenia a export dát'],
    ['backup-sync','☁️','Synchronizácia','Backup, restore a rodinný sync'],
    ['data-settings','🧰','Dáta a údržba','Import, obrázky a reset dát']
  ];
  const body = `<div class="more-grid">${cards.map(c => renderMoreTile(c[0], c[1], c[2], c[3], 'Otvoriť')).join('')}</div>`;
  return renderMoreShell('Nastavenia', 'Všetky nastavenia bez starých panelov', body);
}

function renderMoreAppearancePage() {
  loadSettings();
  const s = appSettings;
  const colors = ['#22C55E','#3B82F6','#F59E0B','#EC4899','#8B5CF6','#06B6D4'];
  const body = `
    ${moreCard('Theme', `<div class="more-option-grid">${['light','dark','system'].map(v => morePill(v === 'light' ? 'Light' : v === 'dark' ? 'Dark' : 'System', s.theme === v, `setMoreTheme('${v}')`)).join('')}</div>`)}
    ${moreCard('Accent color', `<div class="more-color-grid">${colors.map(c => `<button class="more-color ${s.accentColor === c ? 'active' : ''}" style="--swatch:${c}" onclick="setMoreAccent('${c}')"><span></span></button>`).join('')}</div>`)}
    ${moreCard('Preview cards', (function() { const tp = getTodayRecipes(); return `<div class="more-preview"><div><strong>Dnešný plán</strong><small>${tp.length} / 5 jedál naplánovaných</small></div><button onclick="switchTab('planner')">Naplánovať deň</button></div>`; })())}
    ${moreCard('Text size', `<div class="more-option-grid">${['compact','normal','large'].map(v => morePill(v === 'compact' ? 'Compact' : v === 'normal' ? 'Normal' : 'Large', s.textSize === v, `setMoreTextSize('${v}')`)).join('')}</div>`)}
    ${moreCard('UI density', `<div class="more-option-grid">${['compact','normal'].map(v => morePill(v === 'compact' ? 'Compact' : 'Comfortable', (s.uiDensity === v || (v === 'normal' && s.uiDensity === 'large')), `setMoreDensity('${v}')`)).join('')}</div>`)}

  `;
  return renderMoreShell('Vzhľad', 'Téma, farby a čitateľnosť', body);
}

function setMoreTheme(value) { appSettings.theme = value; saveSettings(); applySettings(); openMorePage('appearance'); }
function setMoreAccent(value) { appSettings.accentColor = value; saveSettings(); applySettings(); openMorePage('appearance'); }
function setMoreTextSize(value) { appSettings.textSize = value; saveSettings(); applySettings(); openMorePage('appearance'); }
function setMoreDensity(value) { appSettings.uiDensity = value; saveSettings(); applySettings(); openMorePage('appearance'); }

function moreToggleRow(icon, title, desc, checked, action) {
  return `<div class="more-setting-row"><span>${icon}</span><div><strong>${title}</strong>${desc ? `<small>${desc}</small>` : ''}</div><label class="toggle-switch"><input type="checkbox" ${checked ? 'checked' : ''} onchange="${action}"><span class="toggle-slider"></span></label></div>`;
}

function moreInputRow(icon, title, desc, value, action, type) {
  return `<label class="more-setting-row"><span>${icon}</span><div><strong>${title}</strong>${desc ? `<small>${desc}</small>` : ''}</div><input class="more-input" type="${type || 'text'}" value="${escAttr(value || '')}" onchange="${action}"></label>`;
}

function setNestedSetting(path, value, page) {
  const parts = path.split('.');
  let target = appSettings;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!target[parts[i]]) target[parts[i]] = {};
    target = target[parts[i]];
  }
  target[parts[parts.length - 1]] = value;
  saveSettings();
  if (page) openMorePage(page);
}

function setMoreCheckbox(path, checked, page) {
  setNestedSetting(path, !!checked, page);
}

function setMoreNumber(path, value, min, max, page) {
  const num = parseInt(value, 10);
  if (Number.isNaN(num) || num < min || num > max) {
    showToast(`Zadaj číslo ${min}-${max}`, 'warning');
    if (page) openMorePage(page);
    return;
  }
  setNestedSetting(path, num, page);
}

function setMoreWeatherLocation(value) {
  setNestedSetting('weather.location', (value || '').trim(), 'home-settings');
}

function setMoreChildAge(value) {
  const clean = String(value || '').trim();
  if (clean && Number.isNaN(parseFloat(clean))) {
    showToast('Zadaj vek ako číslo', 'warning');
    openMorePage('home-settings');
    return;
  }
  if (clean) localStorage.setItem('childAge', clean);
  else localStorage.removeItem('childAge');
  showToast('Uložené', 'success');
  openMorePage('home-settings');
}

function setMoreDeviceName(value) {
  const clean = String(value || '').trim();
  if (!clean) return;
  localStorage.setItem('deviceName', clean);
  if (familyDbRef) {
    try { familyDbRef.child('members').child(getDeviceId()).update({ name: clean }); } catch(e) {}
  }
  showToast('Názov zariadenia uložený', 'success');
  openMorePage('family');
}

function joinFamilyFromMore() {
  const input = document.getElementById('more-family-code-input');
  const code = input ? input.value.trim() : '';
  if (!code) {
    showToast('Zadaj rodinný kód', 'warning');
    return;
  }
  joinFamily(code);
}

function renderMoreHomeSettingsPage() {
  loadSettings();
  const w = appSettings.homeWidgets || {};
  const widgets = [
    ['weather','🌤️','Počasie','Teplota a sezónna veta v hlavičke'],
    ['todayTasks','✅','Dnešné úlohy','Prehľad úloh na dashboarde'],
    ['hydration','💧','Pitný režim','Voliteľný widget'],
    ['calories','🔥','Kalórie','Nutričný súhrn'],
    ['quickRecipes','🍽️','Rýchle recepty','Rýchle návrhy jedál'],
    ['seasonal','🌿','Sezónny kalendár','Sezónne odporúčania']
  ];
  const body = `
    ${moreCard('Widgety domova', widgets.map(([key, icon, title, desc]) => moreToggleRow(icon, title, desc, !!w[key], `setMoreCheckbox('homeWidgets.${key}', this.checked, 'home-settings')`)).join(''))}
    ${moreCard('Počasie', `
      ${moreToggleRow('🌤️','Počasie aktívne','Použije sa v kompaktnej hlavičke', !!appSettings.weather.enabled, "setMoreCheckbox('weather.enabled', this.checked, 'home-settings')")}
      ${moreInputRow('📍','Mesto','Prázdne = automaticky alebo bez lokality', appSettings.weather.location || '', "setMoreWeatherLocation(this.value)")}
    `)}
    ${moreCard('Dieťa', `${moreInputRow('👶','Vek dieťaťa','Používa sa pre detské odporúčania', localStorage.getItem('childAge') || '', "setMoreChildAge(this.value)", 'number')}`)}
    ${moreCard('Reset', `<button class="more-secondary" onclick="resetWidgetsToDefaults();openMorePage('home-settings')">Obnoviť predvolené widgety</button>`)}
  `;
  return renderMoreShell('Domov', 'Widgety, počasie a detské nastavenia', body);
}

function renderMoreMealSettingsPage() {
  loadSettings();
  const m = appSettings.mealPlanner || {};
  const body = `
    ${moreCard('Jedálniček', `
      ${moreInputRow('🍽️','Predvolené porcie','Použité pri plánovaní a receptoch', m.defaultServings || 4, "setMoreNumber('mealPlanner.defaultServings', this.value, 1, 8, 'meal-settings')", 'number')}
      ${moreToggleRow('📊','Zobrazovať nutričné hodnoty','Kalórie a makrá v pláne', !!m.showNutrition, "setMoreCheckbox('mealPlanner.showNutrition', this.checked, 'meal-settings')")}
    `)}
    ${moreCard('AI plánovanie', `
      ${moreActionRow('🚀','AI Týždeň','Generovanie týždenného plánu',"openMorePage('ai-week')")}
      ${moreActionRow('📅','Týždenný plán','Otvoriť plánovač',"switchTab('planner')")}
    `)}
  `;
  return renderMoreShell('Jedálniček', 'Porcie, výživa a plánovanie', body);
}

function renderMoreShoppingSettingsPage() {
  loadSettings();
  const shopping = appSettings.shopping || {};
  const quickAdd = appSettings.quickAdd || {};
  const body = `
    ${moreCard('Nákup', `
      ${moreToggleRow('🛒','Režim obchodu','Prispôsobí nákupný zoznam pre obchod', !!shopping.storeMode, "setMoreCheckbox('shopping.storeMode', this.checked, 'shopping-settings')")}
      ${moreToggleRow('📦','Auto kategórie','Automaticky triedi položky', !!shopping.autoCategories, "setMoreCheckbox('shopping.autoCategories', this.checked, 'shopping-settings')")}
      ${moreToggleRow('🤖','AI nákupný zoznam','AI návrhy položiek z plánu', !!shopping.aiShoppingList, "setMoreCheckbox('shopping.aiShoppingList', this.checked, 'shopping-settings')")}
      ${moreToggleRow('➕','Rýchle pridanie','Plávajúce tlačidlo pre pridanie', !!quickAdd.enabled, "setMoreCheckbox('quickAdd.enabled', this.checked, 'shopping-settings')")}
    `)}
    ${moreCard('Prepojenia', `
      ${moreActionRow('🛒','Aktuálny nákup','Otvoriť nákupný zoznam',"switchTab('shopping')")}
      ${moreActionRow('👨‍👩‍👧‍👦','Zdieľané položky', familyCode ? 'Aktívne s rodinou' : 'Rodina nepripojená',"openMorePage('family')")}
    `)}
  `;
  return renderMoreShell('Nákup nastavenia', 'Režim obchodu, kategórie a AI', body);
}

function renderMoreDataSettingsPage() {
  const recipeCount = Array.isArray(recipes) ? recipes.length : 0;
  const taskCount = Array.isArray(tasks) ? tasks.length : 0;
  const shoppingCount = Array.isArray(shopItems) ? shopItems.length : 0;
  const body = `
    ${moreCard('Aktuálne dáta', `<div class="more-stat-grid"><div><strong>${recipeCount}</strong><small>recepty</small></div><div><strong>${taskCount}</strong><small>úlohy</small></div><div><strong>${shoppingCount}</strong><small>nákup</small></div></div>`)}
    ${moreCard('Import a recepty', `
      ${moreActionRow('🌐','Import receptu z URL','Otvorí import URL obrazovku','showImportUrlModal()')}
      ${moreActionRow('🖼️','Obnoviť obrázky','Znovu načíta obrázky receptov',"refreshRecipeImages();openMorePage('data-settings')")}
      ${moreActionRow('🤖','AI nutričné hodnoty','Doplniť výživu cez AI','aiBatchNutrition()')}
    `)}
    ${moreCard('Backup', `
      ${moreActionRow('📦','Export / backup','Stiahnuť zálohu dát',"createBackup();openMorePage('data-settings')")}
      ${moreActionRow('☁️','Backup a sync','Zálohy a rodinná synchronizácia',"openMorePage('backup-sync')")}
    `)}
    ${moreCard('Údržba', `
      ${moreActionRow('❓','Onboarding centrum','Návody bez modálneho okna',"openMorePage('onboarding')")}
      ${moreActionRow('🧪','Demo recepty','Obnoviť demo recepty cez potvrdenie','__confirmDemo && __confirmDemo()')}
      ${moreActionRow('🗑️','Vymazať všetky dáta','Nebezpečná akcia cez potvrdenie','__confirmDeleteAll && __confirmDeleteAll()','›')}
    `)}
  `;
  return renderMoreShell('Dáta a údržba', 'Import, export a servisné akcie', body);
}

function renderMoreTasksPage() {
  const today = getTodayTasks();
  const upcoming = getWeekTasks().slice(0, 4);
  const completed = getCompletedTasks().slice(0, 4);
  const total = Array.isArray(tasks) ? tasks.length : 0;
  const done = Array.isArray(tasks) ? tasks.filter(t => t.completed).length : 0;
  const body = `
    ${moreCard('Statistics', `<div class="more-stat-grid"><div><strong>${today.length}</strong><small>dnes</small></div><div><strong>${upcoming.length}</strong><small>nadchádza</small></div><div><strong>${done}</strong><small>hotovo</small></div><div><strong>${total}</strong><small>spolu</small></div></div>`)}
    ${moreCard('Dnešné úlohy', renderMoreTaskRows(today, 'Dnes nemáš žiadne úlohy.', 'Pridať úlohu'))}
    ${moreCard('Upcoming tasks', renderMoreTaskRows(upcoming, 'Žiadne nadchádzajúce úlohy.', 'Otvoriť úlohy'))}
    ${moreCard('Completed tasks', renderMoreTaskRows(completed, 'Zatiaľ nie sú dokončené žiadne úlohy.', 'Otvoriť úlohy'))}
    ${moreCard('Categories', `<div class="more-chip-row">${TASK_CATEGORIES.map(c => `<span>${c.icon}</span>`).join('')}</div>`)}
    ${moreCard('Actions', `<div class="more-option-grid">${[['Dnes',"switchTab('tasks')"],['Týždeň',"switchTab('tasks')"],['+ Nová úloha',"switchTab('tasks')"]].map(x => morePill(x[0], x[0] === 'Dnes', x[1])).join('')}</div>`)}
  `;
  return renderMoreShell('Úlohy', 'Dnešné, nadchádzajúce a hotové úlohy', body, "<button class=\"more-top-action\" onclick=\"switchTab('tasks')\">Správca</button>");
}

function renderMoreTaskRows(items, emptyText, actionLabel) {
  if (!items.length) {
    return moreEmptyState('✅', emptyText, 'Zobrazujú sa iba tvoje reálne úlohy.', actionLabel, "switchTab('tasks')");
  }
  return `<div class="more-feed">${items.slice(0, 4).map(t => `<div><span>${t.completed ? '☑' : '☐'}</span><strong>${esc(t.title)}</strong><small>${t.date ? formatTaskDate(t.date) : (t.completedDate ? formatTaskDate(t.completedDate.slice(0,10)) : '')}</small></div>`).join('')}</div>`;
}

function renderMoreBoardPage() {
  const todaysRecipes = getTodayRecipes();
  const shoppingCount = Array.isArray(shopItems) ? shopItems.filter(i => i && !i.checked).length : 0;
  const openTasks = Array.isArray(tasks) ? tasks.filter(t => !t.completed).length : 0;
  const body = `
    ${moreCard('Family summary', `<div class="more-family-strip"><span>👤</span><strong>${familyCode ? 'Rodina pripojená' : 'Rodina nepripojená'}</strong></div>`)}
    ${moreCard('Dnešné jedlá', todaysRecipes.length ? `<div class="more-feed">${todaysRecipes.slice(0, 3).map(r => `<div><span>🍽️</span><strong>${esc(r.name)}</strong><small>${r.time || 20} min</small></div>`).join('')}</div>` : `<div class="more-empty-line">Dnes ešte nie sú naplánované jedlá.</div>`)}
    ${moreCard('Shared shopping list', `<div class="more-board-row"><span>🛒</span><strong>${shoppingCount} položiek čaká</strong><button onclick="switchTab('shopping')">Otvoriť</button></div>`)}
    ${moreCard('Upcoming tasks', `<div class="more-board-row"><span>✅</span><strong>${openTasks} otvorených úloh</strong><button onclick="openMorePage('tasks')">Pozrieť</button></div>`)}
    ${moreCard('Recent activity', renderMoreActivityFeed())}
  `;
  return renderMoreShell('Nástenka', 'Rodinný dashboard bez starých kariet', body);
}

function renderMoreLanguagePage() {
  const current = appSettings.lang || lang || 'sk';
  const body = `
    ${moreCard('Language cards', `<div class="more-language-grid">
      <button class="${current === 'sk' ? 'active' : ''}" onclick="setMoreLanguage('sk')"><span>🇸🇰</span><strong>Slovenčina</strong><small>Okamžitý náhľad aplikácie</small></button>
      <button class="${current === 'en' ? 'active' : ''}" onclick="setMoreLanguage('en')"><span>🇬🇧</span><strong>English</strong><small>Instant app preview</small></button>
    </div>`)}
    ${moreCard('Instant preview', `<div class="more-live-preview"><span>🌐</span><div><strong>${current === 'sk' ? 'Dnešné jedlá' : "Today's meals"}</strong><small>${current === 'sk' ? 'Recepty, nákup, úlohy a plánovač v slovenčine' : 'Recipes, shopping, tasks and planner in English'}</small></div><button onclick="setMoreLanguage(current === 'sk' ? 'en' : 'sk')">↻</button></div>`)}
  `;
  return renderMoreShell('Jazyk', 'Vyber jazyk aplikácie', body);
}

function setMoreLanguage(value) {
  appSettings.lang = value;
  lang = value;
  localStorage.setItem('lang', value);
  saveSettings();
  applyLang();
  openMorePage('language');
}

function renderMoreShoppingPage() {
  try { loadShopItems(); } catch(e) {}
  const current = Array.isArray(shopItems) ? shopItems.filter(i => !i.checked) : [];
  const history = Array.isArray(shopItems) ? shopItems.filter(i => i.checked) : [];
  const body = `
    ${moreCard('Current list', current.length ? `<div class="more-feed">${current.slice(0, 5).map(i => `<div><span>🛒</span><strong>${esc(i.name)}</strong><small>${esc((i.amount || '') + ' ' + (i.unit || ''))}</small></div>`).join('')}</div>` : `<div class="more-empty-line">Nákupný zoznam je prázdny.</div>`)}
    ${moreCard('History', `<div class="more-stat-grid"><div><strong>${history.length}</strong><small>kúpené</small></div><div><strong>${current.length}</strong><small>čaká</small></div></div>`)}
    ${moreCard('Categories', `<div class="more-chip-row">${SHOP_CATEGORIES.slice(0, 6).map(c => `<span>${c.icon} ${lang === 'en' ? c.nameEn : c.nameSk}</span>`).join('')}</div>`)}
    ${moreCard('Shared items', `<div class="more-board-row"><span>👨‍👩‍👧‍👦</span><strong>${familyCode ? 'Zdieľané s rodinou' : 'Rodina nepripojená'}</strong><button onclick="openMorePage('family')">Rodina</button></div>`)}
    ${moreCard('Statistics', `<div class="more-stat-grid"><div><strong>${current.length + history.length}</strong><small>spolu</small></div><div><strong>${current.length}</strong><small>otvorené</small></div></div>`)}
  `;
  return renderMoreShell('Nákup', 'Prehľad nákupov a kategórií', body, "<button class=\"more-top-action\" onclick=\"switchTab('shopping')\">Zoznam</button>");
}

function renderMoreAiWeekPage() {
  const plannedMeals = Object.values(mealPlan || {}).reduce((sum, week) => sum + Object.values(week || {}).reduce((daySum, day) => daySum + Object.values(day || {}).filter(Boolean).length, 0), 0);
  const childAge = localStorage.getItem('childAge') || '';
  const previousPlans = plannedMeals
    ? `<div class="more-feed"><div><span>📅</span><strong>Aktuálny plán</strong><small>${plannedMeals} jedál v plánovači</small></div></div>`
    : moreEmptyState('📅', 'Zatiaľ žiadny uložený plán', 'Keď naplánuješ týždeň, zobrazí sa tu reálny stav.');
  const body = `
    ${moreCard('Generate week plan', `<div class="more-ai-panel"><span>🚀</span><strong>AI pripraví týždeň podľa aktuálnych dát</strong><small>Recepty: ${recipes.length} · naplánované jedlá: ${plannedMeals}</small><button class="more-primary" onclick="aiGenerateFullWeek()">Generovať plán</button></div>`)}
    ${moreCard('Family preferences', `<div class="more-chip-row"><span>${familyCode ? 'Rodina pripojená' : 'Lokálny režim'}</span>${childAge ? `<span>Dieťa ${esc(childAge)} rokov</span>` : '<span>Vek dieťaťa nenastavený</span>'}</div>`)}
    ${moreCard('Diet preferences', (appSettings.dietPrefs && appSettings.dietPrefs.length) ? `<div class="more-chip-row">${appSettings.dietPrefs.map(d => `<span>${d}</span>`).join('')}</div>` : moreEmptyState('🥗', 'Diétne preferencie zatiaľ nie sú nastavené', 'Po pridaní preferencií sa použijú pre AI plán.'))}
    ${moreCard('Regenerate', `<button class="more-secondary" onclick="aiGenerateFullWeek()">${lang==='en' ? 'Regenerate' : 'Znova vygenerovať'}</button>`)}
    ${moreCard('Previous plans', previousPlans)}
    ${moreCard('AI suggestions', recipes.length ? `<div class="more-feed">${recipes.slice(0, 3).map(r => `<div><span>🍽️</span><strong>${esc(r.name)}</strong><small>${r.time || 20} min</small></div>`).join('')}</div>` : moreEmptyState('🤖', 'AI nemá z čoho odporúčať', 'Pridaj recepty alebo importuj recept z URL.'))}
  `;
  return renderMoreShell('AI Týždeň', 'Plánovanie s preferenciami', body);
}

function renderMoreOnboardingPage() {
  const onboardDone = localStorage.getItem('onboardingCompleted') ? true : false;
  const hasData = recipes.length > 0 || tasks.length > 0 || Object.keys(mealPlan || {}).length > 0;
  const hasFamily = !!familyCode;
  const hasAiPlan = localStorage.getItem('_aiPlanGenerated') ? true : false;
  const steps = [
    { label: 'Introduction', desc: 'Základy aplikácie', done: onboardDone },
    { label: 'Features', desc: 'Jedlá, recepty, nákup, úlohy', done: hasData },
    { label: 'Family sync', desc: 'Zdieľanie v rodine', done: hasFamily },
    { label: 'Recipe import', desc: 'Import receptov z URL', done: recipes.length > 0 },
    { label: 'AI planner', desc: 'Týždenný plán cez AI', done: hasAiPlan }
  ];
  const completed = steps.filter(s => s.done).length;
  const progress = Math.round(completed / steps.length * 100);
  const body = `
    ${moreCard('Tutorial progress', `<div class="more-progress"><span style="width:${progress}%"></span></div><small class="more-muted">${progress}% dokončené</small>`)}
    ${moreCard('Onboarding center', `<div class="more-feed">${steps.map(i => `<div><span>${i.done ? '✅' : '❓'}</span><strong>${i.label}</strong><small>${i.desc}</small></div>`).join('')}</div>`)}
    ${moreCard('Start again', `<button class="more-secondary" onclick="showToast('Onboarding centrum ostáva v tejto obrazovke', 'info')">Prejsť tutorial</button>`)}
  `;
  return renderMoreShell('Onboarding', 'Návody bez modálneho okna', body);
}

function renderMoreNotificationsPage() {
  loadSettings();
  const notifications = appSettings.notifications || {};
  const times = appSettings.notifTimes || {};
  const rows = [
    ['breakfastReminder','breakfast','🌅','Pripomenutie raňajok'],
    ['todayCookingReminder','whatCook','🍳','Čo variť dnes'],
    ['shoppingReminder','shopping','🛒','Ísť nakúpiť'],
    ['hydrationReminder','water','💧','Pitný režim'],
    ['childMealReminder','kids','👶','Jedlo pre dieťa'],
    ['eveningPlanningReminder','evening','🌙','Večerné plánovanie']
  ];
  const body = `
    ${moreCard('Notifications', rows.map(([key, timeKey, icon, title]) => `<div class="more-setting-row"><span>${icon}</span><div><strong>${title}</strong><small>${times[timeKey] || '--:--'} · ${notifications[key] ? 'Zapnuté' : 'Vypnuté'}</small></div><input class="more-time-input" type="time" value="${escAttr(times[timeKey] || '')}" onchange="setNestedSetting('notifTimes.${timeKey}', this.value, 'notifications')"><label class="toggle-switch"><input type="checkbox" ${notifications[key] ? 'checked' : ''} onchange="setMoreCheckbox('notifications.${key}', this.checked, 'notifications')"><span class="toggle-slider"></span></label></div>`).join(''))}
    ${moreCard('Permissions', `${moreActionRow('🔔','Push povolenia', typeof Notification !== 'undefined' ? Notification.permission : 'Nedostupné', 'pushNotifSetup()')}`)}
  `;
  return renderMoreShell('Oznámenia', 'Pripomienky a povolenia', body);
}

function renderMoreAccountPage() {
  const user = authUser ? (authUser.displayName || authUser.email || 'Používateľ') : 'Hosť';
  const authAction = authUser
    ? `<button class="more-danger" onclick="signOutUser()">Odhlásiť</button>`
    : `<button class="more-primary" onclick="signInWithGoogle()">Prihlásiť cez Google</button>`;
  const body = `
    ${moreCard('Account', `<div class="more-account-card"><button class="more-avatar">${getDashboardAvatar()}</button><div><strong>${esc(user)}</strong><small>${authUser ? 'Prihlásený účet' : 'Režim hosťa'}</small></div></div>`)}
    ${moreCard('Email', `${moreActionRow('✉️','Email', authUser && authUser.email ? authUser.email : 'Nepripojený', "showToast('Email je spravovaný cez Google účet', 'info')")}`)}
    ${moreCard('Subscription', `${moreActionRow('⭐','Mealnest Premium','Aktuálne free plán', "showToast('Predplatné bude dostupné čoskoro', 'info')")}`)}
    ${moreCard(authUser ? 'Logout' : 'Login', authAction)}
  `;
  return renderMoreShell('Účet', 'Profil a prihlásenie', body);
}

function renderMoreNotificationsAccountPage() {
  const body = `
    ${moreCard('Notifications', `${moreActionRow('🔔','Push notifikácie','Raňajky, nákup a plánovanie',"openMorePage('notifications')")}`)}
    ${moreCard('Email', `${moreActionRow('✉️','Email','Nastavenia emailovej komunikácie',"openMorePage('account')")}`)}
    ${moreCard('Account', `${moreActionRow('👤','Účet','Profil a prihlásenie',"openMorePage('account')")}`)}
    ${moreCard('Subscription', `${moreActionRow('⭐','Predplatné','Free plán',"openMorePage('account')")}`)}
    ${moreCard(authUser ? 'Logout' : 'Login', authUser ? `<button class="more-danger" onclick="signOutUser()">Logout</button>` : `<button class="more-primary" onclick="signInWithGoogle()">Prihlásiť cez Google</button>`)}
  `;
  return renderMoreShell('Notifikácie a účet', 'Komunikácia, účet a predplatné', body);
}

function renderMoreBackupSyncPage() {
  const syncText = familyCode ? 'Rodinný sync aktívny' : 'Lokálny režim';
  const lastBackup = parseInt(localStorage.getItem('_lastBackup') || '0', 10);
  const lastBackupText = lastBackup ? new Date(lastBackup).toLocaleString(lang === 'en' ? 'en-GB' : 'sk-SK') : 'Zatiaľ nebola vytvorená záloha';
  let backupHistory = [];
  try { backupHistory = JSON.parse(localStorage.getItem('_backupHistoryLocal') || '[]'); } catch(e) { backupHistory = []; }
  const body = `
    ${moreCard('Last sync', `<div class="more-board-row"><span>☁️</span><strong>${syncText}</strong><small>${familyCode ? 'Aktívne' : 'Bez rodiny'}</small></div>`)}
    ${moreCard('Backup now', `<button class="more-primary" onclick="createBackup()">Backup now</button>`)}
    ${moreCard('Last backup', `<div class="more-board-row"><span>📦</span><strong>${esc(lastBackupText)}</strong><small>Lokálne zariadenie</small></div>`)}
    ${moreCard('Restore backup', `<button class="more-secondary" onclick="showToast('Vyber JSON zálohu cez import dát', 'info')">Restore backup</button>`)}
    ${moreCard('Family sync status', `${moreActionRow('👨‍👩‍👧‍👦','Family sync status', syncText, "openMorePage('family')")}`)}
    ${moreCard('History', backupHistory.length ? `<div class="more-feed">${backupHistory.slice(-3).reverse().map(item => `<div><span>📦</span><strong>Backup</strong><small>${esc(item)}</small></div>`).join('')}</div>` : moreEmptyState('📦', 'Zatiaľ žiadna história záloh', 'Keď vytvoríš backup, zobrazí sa tu reálny čas.'))}
  `;
  return renderMoreShell('Backup a sync', 'Zálohy, obnovenie a história', body);
}

function renderMorePrivacySecurityPage() {
  const body = `
    ${moreCard('Password', `${moreActionRow('🔑','Password','Správa hesla účtu',"openMorePage('account')")}`)}
    ${moreCard('Biometrics', `${moreActionRow('🟢','Biometrics','Face/fingerprint pripravené pre wrapper',"showToast('Biometrics nie sú v tejto verzii dostupné', 'info')",'Voliteľné')}`)}
    ${moreCard('Privacy controls', `${moreActionRow('🛡️','Privacy controls','Rodinné zdieľanie a viditeľnosť',"openMorePage('family')")}`)}
    ${moreCard('Permissions', `${moreActionRow('🔔','Permissions','Notifikácie a lokálne úložisko',"openMorePage('notifications')")}`)}
    ${moreCard('Export data', `<button class="more-secondary" onclick="createBackup()">Export data</button>`)}
    ${moreCard('Delete account', `<button class="more-danger" onclick="showToast('Vymazanie účtu vyžaduje potvrdenie v účte', 'warning')">Delete account</button>`)}
  `;
  return renderMoreShell('Súkromie', 'Bezpečnosť, dáta a oprávnenia', body);
}

function renderMoreAboutPage() {
  const body = `
    ${moreCard('Version', `<div class="more-board-row"><span>🍽️</span><strong>Mealnest</strong><small>v1.7 · GitHub build</small></div>`)}
    ${moreCard('Changelog', `<div class="more-feed"><div><span>✨</span><strong>Nový Dashboard a Viac</strong><small>Prémiový mobilný dizajn</small></div><div><span>🛒</span><strong>Nákup a úlohy</strong><small>Rýchle prehľady</small></div></div>`)}
    ${moreCard('Licenses', `${moreActionRow('📄','Licenses','Open-source knižnice a assety',"showToast('Licencie: MIT + CC BY 4.0', 'info')")}`)}
    ${moreCard('Contact', `${moreActionRow('✉️','Contact','Podpora aplikácie',"showToast('Kontakt: mealnest@app.com', 'info')")}`)}
    ${moreCard('Terms', `${moreActionRow('📜','Terms','Podmienky používania',"showToast('Pozri privacy policy pre viac informácií', 'info')")}`)}
    ${moreCard('Privacy policy', `${moreActionRow('🔒','Privacy policy','Ochrana súkromia',"window.open('privacy-policy.html', '_blank')")}`)}
  `;
  return renderMoreShell('O aplikácii', 'Verzia, licencie a dokumenty', body);
}

window.renderMoreScreen = renderMoreScreen;
window.renderMoreHome = renderMoreHome;
window.openMorePage = openMorePage;
window.copyFamilyInvite = copyFamilyInvite;
window.setMoreTheme = setMoreTheme;
window.setMoreAccent = setMoreAccent;
window.setMoreTextSize = setMoreTextSize;
window.setMoreDensity = setMoreDensity;
window.setMoreLanguage = setMoreLanguage;

// =================== PULL TO REFRESH ===================
var _ptrState = null;
function initPullToRefresh() {
  var ptrEl = document.createElement('div');
  ptrEl.className = 'ptr-indicator';
  ptrEl.innerHTML = '<div class="ptr-spinner"></div><span class="ptr-text">' + (lang==='en'?'Pull to refresh':'Potiahnite pre obnovenie') + '</span>';
  document.body.appendChild(ptrEl);
  
  var main = document.querySelector('.container') || document.body;
  main.addEventListener('touchstart', function(e) {
    if (window.scrollY > 5) return;
    if (e.target.closest('input') || e.target.closest('button') || e.target.closest('.bottom-nav') || e.target.closest('.modal-overlay.active') || e.target.closest('.sheet-overlay') || e.target.closest('.cooking-overlay.active')) return;
    _ptrState = { startY: e.touches[0].clientY, pulled: false, ready: false };
  }, { passive: true });
  
  main.addEventListener('touchmove', function(e) {
    if (!_ptrState || _ptrState.refreshing) return;
    var dy = e.touches[0].clientY - _ptrState.startY;
    if (dy < 0) { _ptrState = null; ptrEl.classList.remove('ptr-visible', 'ptr-ready'); return; }
    dy = Math.min(dy, 120);
    ptrEl.style.transform = 'translateY(' + (dy * 0.4) + 'px)';
    ptrEl.style.opacity = Math.min(1, dy / 80);
    _ptrState.pulled = dy > 40;
    if (dy > 80 && !_ptrState.ready) {
      _ptrState.ready = true;
      ptrEl.classList.add('ptr-ready');
      ptrEl.querySelector('.ptr-text').textContent = lang==='en' ? 'Release to refresh' : 'Pustite pre obnovenie';
    } else if (dy <= 80 && _ptrState.ready) {
      _ptrState.ready = false;
      ptrEl.classList.remove('ptr-ready');
      ptrEl.querySelector('.ptr-text').textContent = lang==='en' ? 'Pull to refresh' : 'Potiahnite pre obnovenie';
    }
  }, { passive: true });
  
  main.addEventListener('touchend', function(e) {
    if (!_ptrState) return;
    if (_ptrState.ready && _ptrState.pulled) {
      ptrEl.classList.add('ptr-visible');
      ptrEl.style.transform = '';
      ptrEl.style.opacity = '1';
      ptrEl.querySelector('.ptr-text').textContent = lang==='en' ? 'Refreshing...' : 'Obnovujem...';
      _ptrState.refreshing = true;
      doPullRefresh();
    } else {
      ptrEl.style.transform = '';
      ptrEl.style.opacity = '0';
      ptrEl.classList.remove('ptr-visible', 'ptr-ready');
    }
    _ptrState = null;
  }, { passive: true });
}

function doPullRefresh() {
  var tab = document.body.dataset.tab;
  if (tab === 'home') render();
  else if (tab === 'shopping') renderShoppingList();
  else if (tab === 'planner') renderPlanner();
  else if (tab === 'tasks') renderTasks();
  else if (tab === 'dashboard') renderDashboard();
  var ptrEl = document.querySelector('.ptr-indicator');
  setTimeout(function() {
    if (ptrEl) {
      ptrEl.classList.remove('ptr-visible', 'ptr-ready');
      ptrEl.querySelector('.ptr-text').textContent = lang==='en' ? 'Pull to refresh' : 'Potiahnite pre obnovenie';
    }
    var el = document.querySelector('.ptr-indicator');
    if (el) { el.style.opacity = '0'; setTimeout(function() { el.style.opacity = ''; }, 300); }
  }, 500);
}

// =================== PREVENT CONTEXT MENU ===================
document.addEventListener('contextmenu', function(e) {
  // Allow context menu on input/textarea
  if (e.target.closest && !e.target.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
    haptic(6);
  }
});
document.addEventListener('selectstart', function(e) {
  if (e.target.closest && !e.target.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
  }
});

// =================== HAPTIC FEEDBACK ===================
function haptic(ms) {
  try {
    if (!navigator.vibrate) return;
    if (navigator.userActivation && !navigator.userActivation.isActive) return;
    navigator.vibrate(ms || 8);
  } catch(e) {}
}

// =================== ANIMATED HEADER ON SCROLL ===================
function initScrollHeader() {
  var ticking = false;
  var body = document.body;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        var scrollY = window.scrollY || window.pageYOffset;
        body.classList.toggle('header-collapsed', scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// =================== SWIPE BETWEEN TABS ===================
var _swipeTabData = null;
function initSwipeTabs() {
  var main = document.querySelector('.container') || document.body;
  main.addEventListener('touchstart', function(e) {
    // Don't swipe on interactive elements
    if (e.target.closest('input') || e.target.closest('button') || e.target.closest('.bottom-nav') || e.target.closest('.modal-overlay.active') || e.target.closest('.sheet-overlay') || e.target.closest('.cooking-overlay.active')) return;
    _swipeTabData = { startX: e.touches[0].clientX, startY: e.touches[0].clientY };
  }, { passive: true });
  
  main.addEventListener('touchmove', function(e) {
    if (!_swipeTabData) return;
    var dx = e.touches[0].clientX - _swipeTabData.startX;
    var dy = Math.abs(e.touches[0].clientY - _swipeTabData.startY);
    if (Math.abs(dx) < 30 || dy > Math.abs(dx) * 0.5) { _swipeTabData = null; return; }
    e.preventDefault();
  }, { passive: false });
  
  main.addEventListener('touchend', function(e) {
    if (!_swipeTabData) return;
    var dx = e.changedTouches[0].clientX - _swipeTabData.startX;
    var dy = Math.abs(e.changedTouches[0].clientY - _swipeTabData.startY);
    if (Math.abs(dx) < 60 || dy > Math.abs(dx) * 0.6) { _swipeTabData = null; return; }
    var tabs = ['dashboard', 'home', 'planner', 'shopping', 'tasks', 'board'];
    var current = document.body.dataset.tab || 'dashboard';
    var idx = tabs.indexOf(current);
    if (dx > 0 && idx > 0) { switchTab(tabs[idx - 1]); }
    else if (dx < 0 && idx < tabs.length - 1) { switchTab(tabs[idx + 1]); }
    _swipeTabData = null;
  }, { passive: true });
}
// =================== LONG PRESS ON RECIPES ===================
function initLongPress() {
  document.addEventListener('touchstart', function(e) {
    var card = e.target.closest('.recipe-card');
    if (!card) return;
    _longPressTimer = setTimeout(function() {
      showLongPressMenu(card, e.touches[0].clientX, e.touches[0].clientY);
    }, 400);
  }, { passive: true });
  document.addEventListener('touchend', function() { clearTimeout(_longPressTimer); }, { passive: true });
  document.addEventListener('touchmove', function() { clearTimeout(_longPressTimer); }, { passive: true });
}

var _longPressTimer = null;
function showLongPressMenu(card, x, y) {
  var id = card.dataset.id;
  if (!id) return;
  document.querySelectorAll('.longpress-menu').forEach(function(m) { m.remove(); });
  var menu = document.createElement('div');
  menu.className = 'longpress-menu';
  var r = card.getBoundingClientRect();
  var left = Math.min(x, window.innerWidth - 170);
  var top = Math.min(y, window.innerHeight - 200);
  menu.style.left = left + 'px';
  menu.style.top = top + 'px';
  menu.innerHTML = '<button onclick="viewRecipe(' + id + ');this.closest(\'.longpress-menu\').remove()">📖 ' + (lang==='en'?'View':'Zobraziť') + '</button><button onclick="var r=recipes.find(x=>x.id==' + id + ');if(r){openFormModal(r)};this.closest(\'.longpress-menu\').remove()">✏️ ' + (lang==='en'?'Edit':'Upraviť') + '</button><button onclick="toggleFav(' + id + ');this.closest(\'.longpress-menu\').remove()">❤️ ' + (lang==='en'?'Favorite':'Obľúbené') + '</button><button class=\"danger\" onclick=\"if(confirm(\'' + (lang==='en'?'Delete this recipe?':'Zmazať tento recept?') + '\')){var ri=recipes.findIndex(x=>x.id==' + id + ');if(ri>=0){recipes.splice(ri,1);saveToLS();render()}};this.closest(\'.longpress-menu\').remove()\">🗑 ' + (lang==='en'?'Delete':'Zmazať') + '</button>';
  document.body.appendChild(menu);
  haptic(15);
  var closer = function(x) {
    if (!x.target.closest('.longpress-menu')) { menu.remove(); document.removeEventListener('click', closer); }
  };
  setTimeout(function() { document.addEventListener('click', closer); }, 100);
}

// Initialize on load
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

// ======================== DASHBOARD ========================
function renderDashboard() {
  const now = new Date();
  const hour = now.getHours();
  const greetings = {
    sk: { rano: 'Dobré ráno', obed: 'Dobrý deň', vecer: 'Dobrý večer' },
    en: { rano: 'Good morning', obed: 'Good afternoon', vecer: 'Good evening' }
  };
  let period = 'obed';
  if (hour < 10) period = 'rano';
  else if (hour >= 18) period = 'vecer';
  const greeting = { rano: 'Dobré ráno', obed: 'Dobrý deň', vecer: 'Dobrý večer' }[period];
  try { loadShopItems(); } catch(e) {}
  const todayMeals = getTodayMealCount();
  const todayTasksArr = getTodayTasks();
  const todayDone = tasks.filter(t => t.date === new Date().toISOString().slice(0,10) && t.completed).length;
  const streak = calcPlanningStreak();
  const uncheckedShop = (Array.isArray(shopItems) ? shopItems : []).filter(i => i && !i.checked).length;
  const mealPct = Math.round((todayMeals / MEALS.length) * 100);
  const weatherLine = buildDashboardWeatherLine();
  const userName = getDashboardUserName();
  const html = `<div class="mn-home-shell">
    <section class="mn-home-header">
      <div class="mn-home-greeting">
        <h1>${esc(greeting)}, ${esc(userName)} 👋</h1>
        <p>${weatherLine}</p>
      </div>
      <div class="mn-home-actions">
        <button class="mn-icon-btn" onclick="openMorePageFromAnywhere('notifications')" aria-label="Notifikácie">🔔</button>
        <button class="mn-avatar-btn" onclick="openMorePageFromAnywhere('account')" aria-label="Profil">${getDashboardAvatar()}</button>
      </div>
    </section>
    ${renderMobileHeroCard({ todayMeals, totalMeals: MEALS.length, mealPct, uncheckedShop, todayTasks: todayTasksArr.length, streak })}
    ${renderMobileWeekSelector()}
    ${renderMobileMealsCard()}
    ${renderMobileAiRecommendation()}
    ${renderMobileQuickActions()}
    ${renderMobileTaskPreview()}
    ${renderMobileShoppingPreview(uncheckedShop)}
  </div>`;

  try { document.getElementById('dash-content').innerHTML = html; } catch(e) {}
  setTimeout(function() {
    document.querySelectorAll('.mn-count-up').forEach(function(el) { animateCountUp(el, el.dataset.target); });
  }, 80);
}

function getDashboardUserName() {
  const raw = authUser && (authUser.displayName || authUser.email);
  if (!raw) return 'Vladis';
  const first = String(raw).split('@')[0].split(/\s+/)[0].trim();
  return first || 'Vladis';
}

function getDashboardAvatar() {
  if (authUser && authUser.photoURL) return `<img src="${escAttr(authUser.photoURL)}" alt="">`;
  return '<span>V</span>';
}

function buildDashboardWeatherLine() {
  return '☀️ 21°C • Jahody v sezóne';
}

function renderMobileHeroCard(stats) {
  const openMeals = Math.max(0, stats.totalMeals - stats.todayMeals);
  return `<section class="mn-hero-card mn-card">
    <div class="mn-hero-top">
      <div class="mn-progress-ring" style="--pct:${stats.mealPct}">
        <svg viewBox="0 0 44 44" aria-hidden="true"><circle class="mn-ring-bg" cx="22" cy="22" r="18"/><circle class="mn-ring-fg" cx="22" cy="22" r="18"/></svg>
        <strong>${stats.todayMeals}</strong>
      </div>
      <div class="mn-hero-copy">
        <span>Dnešný plán</span>
        <h2>${stats.todayMeals} / ${stats.totalMeals} jedál naplánovaných</h2>
        <p>${openMeals ? openMeals + ' jedál ešte chýba' : 'Jedlá sú pripravené'}</p>
      </div>
    </div>
    <div class="mn-hero-stats">
      <button onclick="switchTab('shopping')"><span>🛒</span><strong class="mn-count-up" data-target="${stats.uncheckedShop}">0</strong><small>Nákup</small></button>
      <button onclick="switchTab('tasks')"><span>✅</span><strong class="mn-count-up" data-target="${stats.todayTasks}">0</strong><small>Úlohy</small></button>
      <button onclick="switchTab('planner')"><span>🔥</span><strong class="mn-count-up" data-target="${stats.streak}">0</strong><small>Streak</small></button>
    </div>
    <button class="mn-primary-cta" onclick="switchTab('planner')">Naplánovať deň</button>
  </section>`;
}

function renderMobileWeekSelector() {
  const todayIndex = (new Date().getDay() + 6) % 7;
  const labels = ['Po','Ut','St','Št','Pi','So','Ne'];
  return `<section class="mn-day-picker" aria-label="Dni v týždni">
    ${labels.map((label, index) => `<button class="${index === todayIndex ? 'active' : ''}" onclick="switchTab('planner')"><span>${label}</span></button>`).join('')}
  </section>`;
}

function getDashboardDayPlan() {
  const weekKey = getWeekKey(new Date());
  const todayName = DAYS[(new Date().getDay() + 6) % 7];
  const plan = getWeekPlan(weekKey);
  return { weekKey, todayName, dayPlan: plan[todayName] || {} };
}

function resolveMealEntry(entry) {
  if (!entry) return null;
  let recipe = null;
  if (typeof entry === 'number') recipe = recipes.find(rec => rec.id === entry);
  else if (entry.type === 'recipe') recipe = recipes.find(rec => rec.id === entry.id);
  if (recipe) return { type: 'recipe', recipe };
  if (entry.type === 'custom') return { type: 'custom', title: entry.text || '—' };
  return null;
}

function renderMobileMealsCard() {
  const ctx = getDashboardDayPlan();
  return `<section class="mn-meals-card mn-card">
    <div class="mn-section-head">
      <h2>Dnešné jedlá</h2>
      <button onclick="switchTab('planner')">Týždeň</button>
    </div>
    <div class="mn-meal-list">
      ${MEALS.map(meal => renderMobileMealRow(meal, ctx)).join('')}
    </div>
  </section>`;
}

function renderMobileMealRow(meal, ctx) {
  const resolved = resolveMealEntry(ctx.dayPlan[meal.id]);
  const filled = !!resolved;
  const recipe = resolved && resolved.recipe;
  const title = recipe ? recipe.name : (resolved ? resolved.title : '');
  const kcal = recipe && recipe.nutrition && recipe.nutrition.kcal ? recipe.nutrition.kcal + ' kcal' : (filled ? '—' : '');
  const image = recipe && (recipe.imageData || recipe.image);
  const addAction = `pickRecipe('${ctx.todayName}','${meal.id}','${ctx.weekKey}')`;
  return `<article class="mn-meal-row ${filled ? 'filled' : 'empty'}" onclick="${filled && recipe ? `viewRecipe(${recipe.id})` : addAction}">
    <div class="mn-meal-icon">${meal.icon}</div>
      <div class="mn-meal-body">
      <span>${dashboardMealLabel(meal.id)}</span>
      ${filled ? `<strong>${esc(title)}</strong>` : `<strong class="mn-empty-meal">+ Pridať jedlo</strong>`}
      ${filled ? `<small>${esc(kcal)}</small>` : ''}
    </div>
    ${image ? `<img class="mn-meal-thumb" src="${escAttr(image)}" alt="${escAttr(title)}" loading="lazy" onerror="this.remove()">` : ''}
    <button class="mn-row-action" onclick="event.stopPropagation();${addAction}">${filled ? 'Upraviť' : '+'}</button>
  </article>`;
}

function dashboardMealLabel(id) {
  const map = { 'raňajky':'Raňajky', 'desiata':'Desiata', 'obed':'Obed', 'olovrant':'Olovrant', 'večera':'Večera' };
  return map[id] || id;
}

function pickDashboardAiRecipe() {
  const todays = new Set(getTodayRecipes().map(r => r.id));
  return recipes.find(r => !todays.has(r.id) && (r.imageData || r.image)) || recipes.find(r => !todays.has(r.id)) || recipes[0] || null;
}

function renderMobileAiRecommendation() {
  const recipe = pickDashboardAiRecipe();
  if (!recipe) {
    return `<section class="mn-ai-card mn-card">
      <div class="mn-ai-empty"><span>🤖</span><strong>AI odporúča</strong><p>Pridaj recepty a AI odporúčanie sa zobrazí tu.</p></div>
    </section>`;
  }
  const ctx = getDashboardDayPlan();
  const title = recipe.name;
  const img = getDashboardRecipeImage(recipe);
  const kcal = recipe.nutrition && recipe.nutrition.kcal ? recipe.nutrition.kcal + ' kcal' : '— kcal';
  return `<section class="mn-ai-card mn-card" onclick="viewRecipe(${recipe.id})">
    <div class="mn-section-head mn-ai-head"><h2>🤖 AI odporúča</h2></div>
    ${img ? `<img class="mn-ai-image" src="${escAttr(img)}" alt="${escAttr(title)}" loading="lazy" onerror="this.style.display='none'">` : `<div class="mn-ai-image mn-ai-fallback">🍽️</div>`}
    <div class="mn-ai-copy">
      <strong>${esc(title)}</strong>
      <span>⏱ ${recipe.time || 25} min • 🔥 ${kcal}</span>
    </div>
    <button class="mn-ai-button" onclick="event.stopPropagation();pickRecipe('${ctx.todayName}','obed','${ctx.weekKey}')">Pridať do plánu</button>
  </section>`;
}

function getDashboardRecipeImage(recipe) {
  const img = recipe && (recipe.imageData || recipe.image) || '';
  if (!img || img.indexOf('placehold.co') !== -1) return 'ai-recommendation.png';
  return img;
}

function renderMobileQuickActions() {
  const actions = [
    { icon:'📖', label: 'Recepty', action:"switchTab('home')" },
    { icon:'🛒', label: 'Nákup', action:"switchTab('shopping')" },
    { icon:'✅', label: 'Úlohy', action:"switchTab('tasks')" },
    { icon:'🚀', label: 'AI Týždeň', action:'aiGenerateFullWeek()' },
  ];
  return `<section class="mn-quick-grid">${actions.map(item => `<button onclick="${item.action}"><span>${item.icon}</span><strong>${item.label}</strong></button>`).join('')}</section>`;
}

function renderMobileTaskPreview() {
  const todayTasks = getTodayTasks().slice(0, 3);
  if (!todayTasks.length) {
    return `<section class="mn-preview-card mn-card">
      <div class="mn-section-head"><h2>Dnešné úlohy</h2><button onclick="switchTab('tasks')">Zobraziť všetky</button></div>
      <div class="mn-empty-inline"><span>✅</span><strong>Dnes nemáš žiadne úlohy</strong><small>Nové úlohy sa zobrazia hneď po pridaní.</small></div>
    </section>`;
  }
  return `<section class="mn-preview-card mn-card">
    <div class="mn-section-head"><h2>Dnešné úlohy</h2><button onclick="switchTab('tasks')">Zobraziť všetky</button></div>
    <div class="mn-task-preview">
      ${todayTasks.map(task => `<button class="${task.completed ? 'done' : ''}" onclick="toggleTask('${task.id}');renderDashboard();"><span>${task.completed ? '☑' : '☐'}</span><strong>${esc(task.title)}</strong></button>`).join('')}
    </div>
  </section>`;
}

function renderMobileShoppingPreview(uncheckedShop) {
  const label = uncheckedShop === 1
    ? '1 položka čaká'
    : uncheckedShop + ' položiek čaká';
  return `<section class="mn-shopping-card mn-card">
    <div><span>🛒</span><strong>${esc(label)}</strong><small>Nákupný zoznam</small></div>
    <button onclick="switchTab('shopping')">Otvoriť nákup</button>
  </section>`;
}

function renderDashboardCockpit(data) {
  const mealLabel = lang === 'en' ? 'meals' : 'jedál';
  const shopLabel = lang === 'en' ? 'shopping' : 'nákup';
  const favLabel = lang === 'en' ? 'favorite' : 'obľúb.';
  const recipeLabel = lang === 'en' ? 'recipes' : 'receptov';
  return `<section class="dash-cockpit">
    <div class="dash-cockpit-bg"></div>
    <div class="dash-cockpit-main">
      <div class="dash-cockpit-copy">
        <div class="dash-greeting" id="dash-greeting">${esc(data.greeting)}</div>
        <div class="dash-date" id="dash-date">${esc(data.dateText)}</div>
        <h1 class="dash-message" id="dash-message">${lang === 'en' ? 'Today in the kitchen' : 'Dnes v kuchyni'}</h1>
        <div class="dash-message-sub" id="dash-message-sub">${esc(data.message)}</div>
      </div>
      <button class="dash-plan-btn" onclick="switchTab('planner')">${lang === 'en' ? 'Plan' : 'Plánovať'} ›</button>
    </div>
    <div class="dash-progress-strip">
      <div class="dash-ring" style="--pct:${data.mealPct}">
        <span>${data.todayMeals}/${data.totalMeals}</span>
      </div>
      <div class="dash-progress-copy">
        <strong>${data.mealPct}% ${lang === 'en' ? 'planned' : 'naplánované'}</strong>
        <span>${data.totalKcal} kcal · ${Math.max(0, data.totalMeals - data.todayMeals)} ${lang === 'en' ? 'slots open' : 'miest voľných'}</span>
      </div>
    </div>
    <div class="dash-stats-row" id="dash-stats-row">
      <span class="dash-stat-pill">🛒 <strong class="count-up" data-target="${data.uncheckedShop}">0</strong> ${shopLabel}</span>
      <span class="dash-stat-pill">❤️ <strong class="count-up" data-target="${data.favCount}">0</strong> ${favLabel}</span>
      <span class="dash-stat-pill">📖 <strong class="count-up" data-target="${data.recipeCount}">0</strong> ${recipeLabel}</span>
    </div>
  </section>`;
}

function renderAiTipCard() {
  const suggestionsHtml = renderSuggestions();
  const firstSuggestionMatch = suggestionsHtml.match(/onclick="viewRecipe\((\d+)\)"[\s\S]*?<div class="sugg-icon">([^<]*)<\/div>[\s\S]*?<div class="sugg-name">([^<]*)<\/div>[\s\S]*?<div class="sugg-meta">([^<]*)<\/div>/);
  if (firstSuggestionMatch) {
    return `<div class="dash-card ai-tip-card" onclick="viewRecipe(${firstSuggestionMatch[1]})">
      <div class="ai-tip-icon">${firstSuggestionMatch[2]}</div>
      <div class="ai-tip-copy">
        <div class="ai-tip-kicker">🤖 ${lang === 'en' ? 'AI tip of the day' : 'AI tip dňa'}</div>
        <div class="ai-tip-title">${firstSuggestionMatch[3]}</div>
        <div class="ai-tip-meta">${firstSuggestionMatch[4]}</div>
      </div>
      <button class="ai-tip-btn" onclick="event.stopPropagation();viewRecipe(${firstSuggestionMatch[1]})">${lang === 'en' ? 'Open' : 'Otvoriť'} ›</button>
    </div>`;
  }
  return `<div class="dash-card ai-tip-card" onclick="aiDailyTip()">
    <div class="ai-tip-icon">🤖</div>
    <div class="ai-tip-copy">
      <div class="ai-tip-kicker">${lang === 'en' ? 'AI tip of the day' : 'AI tip dňa'}</div>
      <div class="ai-tip-title">${lang === 'en' ? 'Let AI suggest something light' : 'Nechaj AI navrhnúť niečo ľahké'}</div>
      <div class="ai-tip-meta">${lang === 'en' ? 'Based on weather and your recipes' : 'Podľa počasia a tvojich receptov'}</div>
    </div>
    <button class="ai-tip-btn" onclick="event.stopPropagation();aiDailyTip()">${lang === 'en' ? 'Suggest' : 'Navrhnúť'} ›</button>
  </div>`;
}

function getTodayMealCount() {
  const weekKey = getWeekKey(new Date());
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const plan = getWeekPlan(weekKey);
  const dayPlan = plan[todayName] || {};
  return Object.values(dayPlan).filter(Boolean).length;
}

function getTodayKcal() {
  const weekKey = getWeekKey(new Date());
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const plan = getWeekPlan(weekKey);
  const dayPlan = plan[todayName] || {};
  let total = 0;
  Object.values(dayPlan).filter(Boolean).forEach(entry => {
    let r = null;
    if (typeof entry === 'number') r = recipes.find(rec => rec.id === entry);
    else if (entry.type === 'recipe') r = recipes.find(rec => rec.id === entry.id);
    if (r && r.nutrition) total += r.nutrition.kcal || 0;
  });
  return total;
}

function renderTodayFocusPanel(stats) {
  const remainingMeals = Math.max(0, MEALS.length - stats.todayMeals);
  const taskLabel = stats.todayTasks
    ? (lang === 'en' ? stats.todayTasks + ' tasks left' : stats.todayTasks + ' úloh zostáva')
    : (lang === 'en' ? 'No tasks today' : 'Dnes bez úloh');
  const mealLabel = remainingMeals
    ? (lang === 'en' ? remainingMeals + ' meals open' : remainingMeals + ' jedál chýba')
    : (lang === 'en' ? 'Meals planned' : 'Jedlá naplánované');
  const shopLabel = stats.uncheckedShop
    ? (lang === 'en' ? stats.uncheckedShop + ' shopping items' : stats.uncheckedShop + ' položiek v nákupe')
    : (lang === 'en' ? 'Shopping clear' : 'Nákup čistý');
  return `<div class="today-focus-card dash-card">
    <div class="today-focus-head">
      <div>
        <div class="today-focus-kicker">${lang === 'en' ? 'Today' : 'Dnes'}</div>
        <div class="today-focus-title">${lang === 'en' ? 'Your day at a glance' : 'Prehľad dňa'}</div>
      </div>
    </div>
    <div class="today-focus-grid">
      <button class="today-focus-item" onclick="switchTab('planner')"><span>🍽️</span><strong>${stats.todayMeals}/${MEALS.length}</strong><small>${mealLabel}</small></button>
      <button class="today-focus-item" onclick="switchTab('tasks')"><span>✅</span><strong>${stats.todayDone}/${stats.todayDone + stats.todayTasks}</strong><small>${taskLabel}</small></button>
      <button class="today-focus-item" onclick="switchTab('shopping')"><span>🛒</span><strong>${stats.uncheckedShop}</strong><small>${shopLabel}</small></button>
      <button class="today-focus-item" onclick="aiGenerateFullWeek()"><span>✨</span><strong>${stats.streak}</strong><small>${lang === 'en' ? 'day streak' : 'dní v rade'}</small></button>
    </div>
  </div>`;
}

function renderMealTimeline() {
  const weekKey = getWeekKey(new Date());
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const plan = getWeekPlan(weekKey);
  const dayPlan = plan[todayName] || {};
  return MEALS.map(m => {
    const entry = dayPlan[m.id];
    let r = null, name = '', img = '', kcal = '', time = '';
    if (entry) {
      if (typeof entry === 'number') r = recipes.find(rec => rec.id === entry);
      else if (entry.type === 'recipe') r = recipes.find(rec => rec.id === entry.id);
      if (r) {
        const rName = lang === 'en' && r.nameEn ? r.nameEn : r.name;
        name = esc(rName); img = r.imageData || r.image || ''; kcal = r.nutrition ? '🔥' + (r.nutrition.kcal||'') : ''; time = '⏱' + r.time;
      } else if (entry.type === 'custom') {
        name = esc(entry.text || '—');
      }
    }
    const filled = !!entry;
    const defImg = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22%3E%3Crect fill=%22%23252220%22 width=%2240%22 height=%2240%22/%3E%3Ctext x=%2220%22 y=%2226%22 text-anchor=%22middle%22 font-size=%2214%22 fill=%22%2378716c%22%3E${m.icon}%3C/text%3E%3C/svg%3E';
    return `<div class="meal-timeline-item ${filled?'filled':''}${(!filled||(entry&&entry.type==='custom'))?'':''} card-enter" onclick="${filled?'':'pickRecipe(\''+todayName+'\',\''+m.id+'\',\''+weekKey+'\')'}">
      <span class="meal-dot"></span>
      <span class="meal-icon">${m.icon}</span>
      ${filled && img ? `<img class="meal-img" src="${escAttr(img)}" alt="${name}" loading="lazy" onerror="this.style.display='none'">` : ''}
      <div class="meal-info">
        <div class="meal-label">${mealLabel(m.id)}</div>
        ${filled ? `<div class="meal-name">${name}</div>` : `<div class="meal-empty-text">${lang==='en'?'+ Add meal':'+ Pridať'}</div>`}
        ${filled && time ? `<div class="meal-meta"><span>${time}</span>${kcal ? `<span>${kcal}</span>` : ''}</div>` : ''}
      </div>
      ${filled ? `<div class="meal-actions">
        <button class="meal-action-btn" onclick="event.stopPropagation();pickRecipe('${todayName}','${m.id}','${weekKey}')" title="${lang==='en'?'Replace':'Vymeniť'}">↻</button>
        <button class="meal-action-btn" onclick="event.stopPropagation();removeSlot('${todayName}','${m.id}','${weekKey}')" title="${lang==='en'?'Remove':'Odstrániť'}">✕</button>
      </div>` : ''}
    </div>`;
  }).join('');
}

function renderDailySummary() {
  const totalKcal = getTodayKcal();
  const planned = getTodayMealCount();
  const allRecipesToday = getTodayRecipes();
  const totalProtein = allRecipesToday.reduce((s,r) => s + ((r.nutrition&&r.nutrition.protein)||0), 0);
  const totalFat = allRecipesToday.reduce((s,r) => s + ((r.nutrition&&r.nutrition.fat)||0), 0);
  const totalCarbs = allRecipesToday.reduce((s,r) => s + ((r.nutrition&&r.nutrition.carbs)||0), 0);
  const avgDifficulty = allRecipesToday.length ? Math.round(allRecipesToday.reduce((s,r) => s + (r.difficulty||1), 0) / allRecipesToday.length * 10) / 10 : 0;
  const progress = Math.min(100, Math.round(planned / MEALS.length * 100));
  return `
    <div class="summary-widget highlight">
      <div class="circular-progress">
        <svg viewBox="0 0 40 40"><circle class="bg" cx="20" cy="20" r="17"/><circle class="fg" cx="20" cy="20" r="17" stroke-dasharray="106.8" stroke-dashoffset="${106.8 - (106.8 * progress / 100)}"/></svg>
        <span class="center">${progress}%</span>
      </div>
      <div class="widget-label">${lang === 'en' ? 'Planned' : 'Plán'}</div>
    </div>
    <div class="summary-widget">
      <span class="widget-icon">🔥</span>
      <span class="widget-value">${totalKcal}</span>
      <span class="widget-label">${lang === 'en' ? 'kcal' : 'kcal'}</span>
    </div>
    <div class="summary-widget">
      <span class="widget-icon">💪</span>
      <span class="widget-value">${totalProtein}g</span>
      <span class="widget-label">${lang === 'en' ? 'Protein' : 'Bielkov.'}</span>
    </div>
    <div class="summary-widget">
      <span class="widget-icon">🍚</span>
      <span class="widget-value">${totalCarbs}g</span>
      <span class="widget-label">${lang === 'en' ? 'Carbs' : 'Sachar.'}</span>
    </div>
    <div class="summary-widget">
      <span class="widget-icon">🧈</span>
      <span class="widget-value">${totalFat}g</span>
      <span class="widget-label">${lang === 'en' ? 'Fat' : 'Tuky'}</span>
    </div>
    <div class="summary-widget">
      <span class="widget-icon">${avgDifficulty <= 1.5 ? '🟢' : avgDifficulty <= 2.5 ? '🟡' : '🔴'}</span>
      <span class="widget-value">${avgDifficulty || '—'}</span>
      <span class="widget-label">${lang === 'en' ? 'Difficulty' : 'Náročnosť'}</span>
    </div>
  `;
}

function getTodayRecipes() {
  const weekKey = getWeekKey(new Date());
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const plan = getWeekPlan(weekKey);
  const dayPlan = plan[todayName] || {};
  const result = [];
  Object.values(dayPlan).filter(Boolean).forEach(entry => {
    let r = null;
    if (typeof entry === 'number') r = recipes.find(rec => rec.id === entry);
    else if (entry.type === 'recipe') r = recipes.find(rec => rec.id === entry.id);
    if (r) result.push(r);
  });
  return result;
}

function renderSuggestions() {
  const isHot = (new Date().getMonth() >= 5 && new Date().getMonth() <= 7);
  const isCold = (new Date().getMonth() <= 2 || new Date().getMonth() >= 10);

  // Quick recipes (≤20 min)
  const quick = recipes.filter(r => r.time <= 20).sort(() => Math.random() - .5).slice(0, 4);

  // Weather-inspired
  const weatherRecipes = recipes.filter(r => {
    const t = [...(r.tags||[]), ...(r.tagsEn||[])];
    if (isHot) return t.some(tag => ['šalát','salad','studené','cold','gril','grill','osviežujúce','refreshing','letné','summer'].includes(tag));
    if (isCold) return t.some(tag => ['polievka','soup','teplý','warm','sýta','hearty','pečené','baked','zima','winter'].includes(tag));
    return false;
  }).sort(() => Math.random() - .5).slice(0, 4);

  // Favorite dinners
  const dinners = recipes.filter(r => {
    const t = [...(r.tags||[]), ...(r.tagsEn||[])];
    return t.some(tag => ['večera','dinner','hlavné','main'].includes(tag)) || r.category === 'Hlavné jedlá';
  }).sort((a,b) => (b.rating||0) - (a.rating||0)).slice(0, 4);

  const suggs = weatherRecipes.length >= 2 ? weatherRecipes : quick;
  const extra = dinners.slice(0, 2);
  const all = [...suggs, ...extra].slice(0, 6);

  return all.map(r => {
    const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
    const tags = [...(r.tags||[]), ...(r.tagsEn||[])];
    let icon = '🍽️';
    if (isCold && tags.some(t => ['polievka','soup'].includes(t))) icon = '🍲';
    else if (isHot && tags.some(t => ['šalát','salad'].includes(t))) icon = '🥗';
    else if (r.category === 'Dezerty') icon = '🍰';
    else if (r.category === 'Raňajky') icon = '🌅';
    else if (r.category === 'Polievky') icon = '🥣';
    else if (r.category === 'Nápoje') icon = '🍹';
    return `<div class="suggestion-card press-scale" onclick="viewRecipe(${r.id})">
      <div class="sugg-icon">${icon}</div>
      <div class="sugg-name">${esc(name)}</div>
      <div class="sugg-meta">⏱${r.time} · ${r.category}</div>
    </div>`;
  }).join('');
}

function dismissWaterReminder() {
  const el = document.getElementById('water-reminder');
  if (el) el.style.display = 'none';
}

// ======================== MEAL PLANNER ========================
const DAYS_SK = ['pondelok','utorok','streda','štvrtok','piatok','sobota','nedeľa'];
const DAYS_EN = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
const MEALS = [
  { id: 'raňajky', icon: '🌅' },
  { id: 'desiata', icon: '🍎' },
  { id: 'obed',    icon: '🌤' },
  { id: 'olovrant',icon: '🍪' },
  { id: 'večera',  icon: '🌙' },
];

function mealLabel(id) {
  const map = { 'raňajky':{sk:'raňajky',en:'Breakfast'}, 'desiata':{sk:'desiata',en:'Snack'}, 'obed':{sk:'obed',en:'Lunch'}, 'olovrant':{sk:'olovrant',en:'Afternoon'}, 'večera':{sk:'večera',en:'Dinner'} };
  return map[id] ? map[id][lang] || map[id].sk : id;
}

function mealShortLabel(id) {
  const map = { 'raňajky':{sk:'Raň',en:'Brk'}, 'desiata':{sk:'Des',en:'Snk'}, 'obed':{sk:'Obed',en:'Lunch'}, 'olovrant':{sk:'Olov',en:'Aft'}, 'večera':{sk:'Več',en:'Din'} };
  return map[id] ? map[id][lang] || map[id].sk : id;
}

function compactPlannerSlotName(name) {
  const clean = String(name || '').trim();
  if (!clean) return '';
  const words = clean.split(/\s+/).slice(0, 2).join(' ') || clean;
  return words.length > 24 ? words.slice(0, 23) + '…' : words;
}

function catLabel(cat) {
  const map = {
    'Hlavné jedlá':'Main dishes','Polievky':'Soups','Šaláty':'Salads','Dezerty':'Desserts',
    'Pečivo':'Bakery','Nápoje':'Drinks','Predjedlá':'Appetizers','Raňajky':'Breakfast',
    'Prílohy':'Sides','Detské':'Kids'
  };
  return lang==='en' ? (map[cat]||cat) : cat;
}

function diffLabel(d) {
  const map = {1:{sk:'Ľahké',en:'Easy'},2:{sk:'Stredné',en:'Medium'},3:{sk:'Ťažké',en:'Hard'}};
  return map[d] ? map[d][lang]||map[d].sk : '';
}

function selectPlannerDay(idx) {
  _selectedPlannerDay = idx;
  renderPlanner();
}
function nextPlannerDay() { if (_selectedPlannerDay < 6) selectPlannerDay(_selectedPlannerDay+1); }
function prevPlannerDay() { if (_selectedPlannerDay > 0) selectPlannerDay(_selectedPlannerDay-1); }

function renderPlanner() {
  const todayEl = document.getElementById('planner-today');
  const weekEl = document.getElementById('planner-week-grid');
  const dayNames = lang === 'en' ? DAYS_EN : DAYS_SK;
  const weekKey = currentWeekKey();
  const weekPlan = getWeekPlan(weekKey);
  const startOfWeek = plannerWeekStart(plannerWeekOffset);
  const totalSlots = MEALS.length;
  const todayStr = new Date().toISOString().slice(0,10);
  const todayIdx = (new Date().getDay() + 6) % 7;

  const heroTitle = document.getElementById('planner-hero-title');
  if (heroTitle) heroTitle.textContent = lang === 'en' ? '📅 Meal Planner' : '📅 Plánovač jedál';
  const heroSub = document.getElementById('planner-hero-sub');
  if (heroSub) heroSub.textContent = lang === 'en' ? 'Plan the whole week in a few taps' : 'Naplánuj si celý týždeň na pár kliknutí';
  const planButtons = document.querySelectorAll('#planner-hero .hero-header-actions .btn');
  if (planButtons[0]) planButtons[0].textContent = lang === 'en' ? '🤖 AI week' : '🤖 AI týždeň';
  if (planButtons[1]) planButtons[1].textContent = lang === 'en' ? '↺ Reset' : '↺ Reset';
  const paClear = document.getElementById('pa-clear-label');
  if (paClear) paClear.textContent = lang === 'en' ? 'Clear current week' : 'Vymazať aktuálny týždeň';
  const paAi = document.getElementById('pa-ai-label');
  if (paAi) paAi.textContent = lang === 'en' ? '📝 AI Shop' : '📝 AI nákup';

  // Plan type switcher
  const pts = document.getElementById('plan-type-switch');
  if (pts) pts.className = 'plan-type-switch' + (planType === 'kids' ? ' kids' : '');
  document.querySelectorAll('.plan-type-btn').forEach(b => b.classList.toggle('active', b.dataset.pt === planType));
  const ptA = document.getElementById('pt-adults-label'); if (ptA) ptA.textContent = lang === 'en' ? 'Adults' : 'Dospelí';
  const ptK = document.getElementById('pt-kids-label'); if (ptK) ptK.textContent = lang === 'en' ? 'Kids' : 'Deti';

  // Week nav active state
  const plnThis = document.getElementById('pln-this');
  const plnNext = document.getElementById('pln-next');
  if (plnThis) {
    plnThis.classList.toggle('active', plannerWeekOffset === 0);
    plnThis.textContent = lang==='en'?'This week':'Tento týždeň';
  }
  if (plnNext) {
    plnNext.classList.toggle('active', plannerWeekOffset === 1);
    plnNext.textContent = lang==='en'?'Next week':'Budúci týždeň';
  }

  // ===== TODAY SECTION =====
  const dayNameToday = dayNames[todayIdx];
  const todayDate = new Date();
  const todayDisp = todayDate.getDate() + '. ' + (todayDate.getMonth()+1) + '. ' + todayDate.getFullYear();
  const todayWk = getWeekKey(new Date());
  const todayPlan = getWeekPlan(todayWk);
  const todayDay = todayPlan[DAYS[todayIdx]] || {};
  let todayKcal = 0;
  Object.values(todayDay).filter(Boolean).forEach(entry => {
    const r = getSlotRecipe(entry);
    if (r && r.nutrition) todayKcal += r.nutrition.kcal || 0;
  });
  let totalKcal = 0, totalMeals = 0, totalTime = 0;
  const dayStats = DAYS.map(function(d, i) {
    const day = weekPlan[d] || {};
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    let kcal = 0;
    let time = 0;
    const filled = Object.values(day).filter(Boolean).length;
    Object.values(day).filter(Boolean).forEach(function(entry) {
      const recipe = getSlotRecipe(entry);
      if (!recipe) return;
      kcal += recipe.nutrition ? (recipe.nutrition.kcal || 0) : 0;
      time += recipe.time || 0;
    });
    totalMeals += filled;
    totalKcal += kcal;
    totalTime += time;
    return { key: d, index: i, day: day, date: date, filled: filled, kcal: kcal, time: time };
  });
  // Summary with progress bar
  var maxMeals = DAYS.length * totalSlots;
  var mealPct = maxMeals > 0 ? Math.round((totalMeals / maxMeals) * 100) : 0;
  const weekRange = getWeekLabel(startOfWeek);
  todayEl.innerHTML = `<section class="planner-control-panel planner-reference-panel">
    <div class="planner-reference-title-row">
      <div class="planner-reference-title">
        <span class="planner-reference-icon">🗓️</span>
        <strong>${lang==='en'?'Planner':'Plánovač'}</strong>
      </div>
      <div class="planner-reference-actions">
        <button class="planner-main-action" onclick="aiGenerateFullWeek()">🤖 ${lang==='en'?'AI week':'AI týždeň'}</button>
        <button class="planner-danger-action" onclick="clearPlan()" title="${escAttr(lang==='en'?'Clear current week':'Vymazať aktuálny týždeň')}">🗑️ ${lang==='en'?'Clear':'Vymazať'}</button>
      </div>
    </div>
    <div class="planner-control-row">
      <div class="planner-segment" aria-label="${lang==='en'?'Week':'Týždeň'}">
        <button class="${plannerWeekOffset===0?'active':''}" onclick="goToWeek(0)">${lang==='en'?'This week':'Tento týždeň'}</button>
        <button class="${plannerWeekOffset===1?'active':''}" onclick="goToWeek(1)">${lang==='en'?'Next week':'Budúci týždeň'}</button>
      </div>
      <div class="planner-segment" aria-label="${lang==='en'?'Audience':'Režim'}">
        <button class="${planType==='adults'?'active':''}" onclick="setPlanType('adults')">👨 ${lang==='en'?'Adults':'Dospelí'}</button>
        <button class="${planType==='kids'?'active':''}" onclick="setPlanType('kids')">👶 ${lang==='en'?'Kids':'Deti'}</button>
      </div>
    </div>
  </section>`;

  const weekMealLegend = MEALS.map(function(m) {
    return `<span title="${escAttr(mealLabel(m.id))}"><i>${m.icon}</i>${esc(mealShortLabel(m.id))}</span>`;
  }).join('');
  const weekRows = dayStats.map(function(info) {
    const isToday = info.date.toISOString().slice(0,10) === todayStr;
    const pct = Math.round((info.filled / totalSlots) * 100);
    const dayShort = (dayNames[info.index] || '').slice(0,3);
    const daySlots = MEALS.map(function(m) {
      const mealClass = 'meal-' + m.id.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
      const entry = info.day[m.id];
      const recipe = getSlotRecipe(entry);
      const isCustom = entry && entry.type === 'custom';
      const name = getSlotName(entry);
      const image = recipe ? (recipe.imageData || recipe.image || '') : '';
      if (recipe || isCustom) {
        const slotAction = recipe ? `viewRecipe(${recipe.id})` : `pickRecipe('${info.key}','${m.id}','${weekKey}')`;
        const slotMeta = recipe && recipe.nutrition ? `🔥 ${recipe.nutrition.kcal || '?'}` : (recipe && recipe.time ? `⏱ ${recipe.time}m` : '');
        return `<div class="planner-week-slot filled ${mealClass}" title="${escAttr(mealLabel(m.id)+': '+name)}">
          <button class="planner-week-slot-open" onclick="${slotAction}">
            ${image ? `<span class="planner-week-slot-img" style="background-image:url('${escAttr(image)}')"><b>${esc(compactPlannerSlotName(name) || mealShortLabel(m.id))}</b></span>` : `<span class="planner-week-slot-icon">${m.icon}<b>${esc(compactPlannerSlotName(name) || mealShortLabel(m.id))}</b></span>`}
            ${slotMeta ? `<em>${slotMeta}</em>` : ''}
          </button>
          <button class="planner-week-slot-remove" onclick="event.stopPropagation();removeSlot('${info.key}','${m.id}','${weekKey}')" aria-label="${escAttr(lang==='en'?'Remove meal':'Odstrániť jedlo')}">×</button>
        </div>`;
      }
      return `<button class="planner-week-slot empty ${mealClass}" onclick="pickRecipe('${info.key}','${m.id}','${weekKey}')" title="${escAttr(mealLabel(m.id))}">
        <span class="planner-week-plus">＋</span>
      </button>`;
    }).join('');
    return `<article class="planner-week-row ${isToday?'today':''}" style="--pct:${pct}">
      <button class="planner-week-day" onclick="selectPlannerDay(${info.index})">
        <span>${esc(dayShort)}</span>
        <strong>${info.date.getDate()}.${info.date.getMonth()+1}.</strong>
        <em>${info.filled}/${totalSlots}</em>
      </button>
      <div class="planner-week-slots">${daySlots}</div>
    </article>`;
  }).join('');
  weekEl.innerHTML = `<section class="planner-week-agenda-shell">
    <div class="planner-week-legend">
      <span class="planner-week-legend-spacer"></span>
      <div class="planner-week-legend-slots">${weekMealLegend}</div>
    </div>
    <div class="planner-week-rows">${weekRows}</div>
  </section>`;
  document.getElementById('planner-summary').innerHTML = '<div class="planner-week-total"><div class="planner-week-total-ring" style="--pct:'+mealPct+'"><strong>'+totalMeals+'/'+maxMeals+'</strong><span>'+(lang==='en'?'planned':'naplánované')+'</span></div><div><strong>🔥 '+totalKcal+' kcal</strong><span>'+(lang==='en'?'week total':'týždeň spolu')+'</span></div><div><strong>🕒 '+Math.floor(totalTime/60)+'h '+(totalTime%60)+'m</strong><span>'+(lang==='en'?'active time':'aktívny čas')+'</span></div><div><strong>📖 '+recipes.length+'</strong><span>'+(lang==='en'?'recipes':'receptov')+'</span></div></div>';
  const todayRow = weekEl.querySelector('.planner-week-row.today');
  const rowList = weekEl.querySelector('.planner-week-rows');
  if (todayRow && rowList) {
    requestAnimationFrame(() => {
      const offset = Math.max(0, todayRow.offsetTop - 12);
      if (plannerWeekOffset === 0 && offset > 240) rowList.scrollTop = offset;
    });
  }

  // Floating info panel
  var pip = document.getElementById('planner-info-panel');
  if (pip) {
    document.getElementById('pip-meals').textContent = totalMeals+'/'+maxMeals;
    const pipMealsLabel = document.getElementById('pip-meals-label');
    if (pipMealsLabel) pipMealsLabel.textContent = lang === 'en' ? 'meals' : 'jedál';
    document.getElementById('pip-kcal').textContent = totalKcal;
    document.getElementById('pip-time').textContent = totalTime;
    document.getElementById('pip-fill').style.width = mealPct+'%';
  }
}

function goToWeek(offset) {
  var grid = document.getElementById('planner-week-grid');
  if (grid) {
    grid.classList.remove('morph-out', 'morph-in');
    // Force reflow
    void grid.offsetWidth;
    grid.classList.add('morph-out');
  }
  haptic(12);
  setTimeout(function() {
    plannerWeekOffset = offset;
    _selectedPlannerDay = 0;
    renderPlanner();
    var grid2 = document.getElementById('planner-week-grid');
    if (grid2) {
      grid2.classList.remove('morph-out', 'morph-in');
      void grid2.offsetWidth;
      grid2.classList.add('morph-in');
      setTimeout(function() { grid2.classList.remove('morph-in'); }, 500);
    }
  }, 300);
}

function showDayDetail(dayKey) {
  var weekPlan = getWeekPlan(currentWeekKey());
  var d = weekPlan[dayKey] || {};
  var dayNames = lang==='en'?DAYS_EN:DAYS_SK;
  var idx = DAYS.indexOf(dayKey);
  var date = plannerWeekStart(plannerWeekOffset); date.setDate(date.getDate()+idx);
  var name = dayNames[idx]+' '+date.getDate()+'.'+(date.getMonth()+1)+'.';
  var filled = Object.values(d).filter(Boolean).length;
  var html = '<div class="modal-overlay active" id="day-detail-modal" style="z-index:2000;" onclick="if(event.target===this)closeDayDetail()">'
    + '<div class="modal" style="max-width:480px;">'
    + '<button class="modal-close" onclick="closeDayDetail()">\u2715</button>'
    + '<h2>\ud83d\udcc5 '+name+' ('+filled+'/'+totalSlots+')</h2>';
  MEALS.forEach(function(m) {
    var e = d[m.id];
    var r = getSlotRecipe(e);
    var nm = getSlotName(e);
    var isC = e && e.type==='custom';
    var f = r||isC;
    var wk = currentWeekKey();
    html += '<div style="display:flex;align-items:center;gap:.6rem;padding:.5rem;border-bottom:1px solid var(--border);cursor:pointer;min-height:44px;"'
      + (r?' onclick="closeDayDetail();viewRecipe('+r.id+')"':(f?'':' onclick="closeDayDetail();pickRecipe(\''+dayKey+'\',\''+m.id+'\',\''+wk+'\')"'))+'>'
      + '<span style="font-size:1.2rem;">'+m.icon+'</span>'
      + '<span style="font-size:.6rem;text-transform:uppercase;color:var(--text3);width:65px;font-weight:600;">'+mealLabel(m.id)+'</span>'
      + '<span style="flex:1;font-weight:600;font-size:.78rem;color:var(--text);">'+(f?esc(nm):'<span style="opacity:.3">'+(lang==='en'?'Pick recipe':'Vybra\u0165 recept')+'</span>')+'</span>'
      + (r&&r.nutrition?'<span style="font-size:.55rem;color:var(--text3);">\ud83d\udd25'+(r.nutrition.kcal||'?')+'</span>':'')
      + (f?'<button class="pv-del-btn" onclick="event.stopPropagation();removeSlot(\''+dayKey+'\',\''+m.id+'\',\''+wk+'\');closeDayDetail()">\u2715</button>':'')
      + '</div>';
  });
  html += '</div></div>';
  var old = document.getElementById('day-detail-modal');
  if (old) old.remove();
  var div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div.firstChild);
}

function closeDayDetail() {
  var m = document.getElementById('day-detail-modal');
  if (m) m.remove();
  renderPlanner();
}

function setPlanType(type) {
  if (type === planType) return;
  planType = type;
  saveWeekPlan();
  applyPageTransition(document.getElementById('planner-container'), 300);
  renderPlanner();
  const activeBtn = document.querySelector('.plan-type-btn.active');
  if (activeBtn) springBounce(activeBtn);
}
function getDayIcon(dayIndex, filledCount) {
  // Thematic icons per day: pondelok🌙 utorok🔥 streda💧 stvrtok🌿 piatok🎉 sobota☀️ nedela🧘
  var icons = ['🌙', '🔥', '💧', '🌿', '🎉', '☀️', '🧘'];
  var icon = icons[dayIndex] || '📅';
  if (filledCount === 0) return icon;
  if (filledCount === 5) return icon; // all filled, stays thematic
  return icon;
}
function getSlotRecipe(entry) {
  if (!entry) return null;
  if (entry.type === 'custom') return null;
  if (typeof entry === 'number') return recipes.find(r => r.id === entry);
  return recipes.find(r => r.id === entry.id);
}
function getSlotName(entry) {
  if (!entry) return '';
  if (entry.type === 'custom') return entry.text;
  const r = typeof entry === 'number' ? recipes.find(rr => rr.id === entry) : recipes.find(rr => rr.id === entry.id);
  if (!r) return '';
  return lang === 'en' && r.nameEn ? r.nameEn : r.name;
}
function selectCustomMeal(day, slot, text, weekKey) {
  const wk = weekKey || currentWeekKey();
  const plan = getWeekPlan(wk);
  if (!plan[day]) plan[day] = {};
  plan[day][slot] = { type: 'custom', text };
  saveWeekPlan();
  localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  localStorage.setItem('mealPlanKids', JSON.stringify(mealPlanKids));
  renderPlanner();
}
function createPickerModal() {
  const div = document.createElement('div');
  div.id = 'planner-picker';
  div.className = '';
  div.onclick = function(e) { if (e.target === div) closePickerModal(); };
  div.innerHTML = `<div class="picker-sheet">
    <div class="picker-header">
      <span class="picker-title">${lang==='en'?'Pick a recipe':'Vybrať recept'}</span>
      <button class="picker-close" onclick="closePickerModal()">✕</button>
    </div>
    <div class="picker-search-wrap">
      <input id="picker-search" type="text" placeholder="🔍 ${lang==='en'?'Search recipes...':'Hľadať recept...'}" oninput="filterPickerRecipes()">
    </div>
    <div class="picker-chips" id="picker-chips">
      <span class="picker-chip active" data-cat="" onclick="setPickerFilter(this,'')">${lang==='en'?'All':'Všetky'}</span>
      <span class="picker-chip" data-cat="Raňajky" onclick="setPickerFilter(this,'Raňajky')">🌅 ${lang==='en'?'Breakfast':'Raňajky'}</span>
      <span class="picker-chip" data-cat="Polievky" onclick="setPickerFilter(this,'Polievky')">🥣 ${lang==='en'?'Soups':'Polievky'}</span>
      <span class="picker-chip" data-cat="Hlavné jedlá" onclick="setPickerFilter(this,'Hlavné jedlá')">🍽️ ${lang==='en'?'Mains':'Hlavné'}</span>
      <span class="picker-chip" data-cat="Šaláty" onclick="setPickerFilter(this,'Šaláty')">🥗 ${lang==='en'?'Salads':'Šaláty'}</span>
      <span class="picker-chip" data-cat="Dezerty" onclick="setPickerFilter(this,'Dezerty')">🍰 ${lang==='en'?'Desserts':'Dezerty'}</span>
      <span class="picker-chip" data-cat="__favs__" onclick="setPickerFilter(this,'__favs__')">❤️ ${lang==='en'?'Favorites':'Obľúbené'}</span>
    </div>
    <div class="picker-list" id="picker-recipes"></div>
    <div class="picker-custom-row" id="picker-custom-row">
      <input id="picker-custom" type="text" placeholder="✍️ ${lang==='en'?'Or type custom meal...':'Alebo napíš vlastné jedlo...'}">
      <button id="picker-custom-btn" onclick="submitCustomMeal()">${lang==='en'?'Add':'Pridať'}</button>
    </div>
  </div>`;
  document.body.appendChild(div);
  return div;
}

let _pickerDay, _pickerSlot, _pickerWk, _pickerCat = '';
function openPickerModal(day, slot, wk) {
  _pickerDay = day; _pickerSlot = slot; _pickerWk = wk || currentWeekKey(); _pickerCat = '';
  const el = document.getElementById('planner-picker') || createPickerModal();
  el.classList.add('active');
  document.getElementById('picker-chips')?.querySelectorAll('.picker-chip').forEach(c => c.classList.toggle('active', c.dataset.cat === ''));
  document.getElementById('picker-search').value = '';
  const customInput = document.getElementById('picker-custom');
  const weekPlan = getWeekPlan(wk);
  const cur = weekPlan[day] && weekPlan[day][slot];
  customInput.value = (cur && cur.type === 'custom') ? cur.text : '';
  customInput.onkeydown = function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      selectCustomMeal(day, slot, this.value.trim(), wk);
      closePickerModal();
    }
  };
  renderPickerRecipes();
  document.body.style.overflow = 'hidden';
}

function closePickerModal() {
  document.getElementById('planner-picker')?.classList.remove('active');
  document.body.style.overflow = '';
}

function submitCustomMeal() {
  const val = document.getElementById('picker-custom').value.trim();
  if (val) { selectCustomMeal(_pickerDay, _pickerSlot, val, _pickerWk); closePickerModal(); }
}

function setPickerFilter(el, cat) {
  _pickerCat = cat;
  document.querySelectorAll('#picker-chips .picker-chip').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
  renderPickerRecipes();
}

function filterPickerRecipes() {
  renderPickerRecipes();
}

function renderPickerRecipes() {
  const list = document.getElementById('picker-recipes');
  if (!list) return;
  const search = norm(document.getElementById('picker-search')?.value || '');
  let filtered = recipes;
  if (_pickerCat === '__favs__') filtered = filtered.filter(r => r.favorite);
  else if (_pickerCat) filtered = filtered.filter(r => r.category === _pickerCat);
  if (search) filtered = filtered.filter(r => {
    const name = norm(r.name + ' ' + (r.nameEn||''));
    const tags = norm([...(r.tags||[]), ...(r.tagsEn||[])].join(' '));
    return name.includes(search) || tags.includes(search);
  });

  if (!filtered.length) {
    list.innerHTML = `<div class="picker-empty"><div class="picker-empty-icon">📭</div><div>${lang==='en'?'No recipes found':'Žiadne recepty'}</div><button class="btn btn-primary" onclick="openFormModal();closePickerModal()" style="margin-top:.5rem;">${lang==='en'?'Add new recipe':'Pridať nový recept'}</button></div>`;
    return;
  }

  list.innerHTML = filtered.map(r => {
    const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
    const img = r.imageData || r.image || '';
    const kcal = r.nutrition && r.nutrition.kcal ? '🔥' + r.nutrition.kcal : '';
    const time = '⏱' + r.time + ' min';
    const tags = (lang === 'en' && r.tagsEn ? r.tagsEn : r.tags || []).slice(0, 2);
    return `<div class="picker-card" onclick="selectRecipe('${_pickerDay}','${_pickerSlot}',${r.id},'${_pickerWk}');closePickerModal()">
      <div class="picker-card-img">${img ? `<img src="${escAttr(img)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:8px" loading="lazy" onerror="this.parentElement.textContent='🍽️'">` : '🍽️'}</div>
      <div class="picker-card-info">
        <div class="picker-card-name">${esc(name)}</div>
        <div class="picker-card-meta"><span>📂 ${esc(r.category)}</span><span>${time}</span>${kcal?`<span>${kcal}</span>`:''}</div>
        ${tags.length ? `<div class="picker-card-tags">${tags.map(t => `<span class="picker-card-tag">${esc(t)}</span>`).join('')}</div>` : ''}
      </div>
      <button class="picker-card-btn" onclick="event.stopPropagation();selectRecipe('${_pickerDay}','${_pickerSlot}',${r.id},'${_pickerWk}');closePickerModal()">${lang==='en'?'Select':'Vybrať'}</button>
    </div>`;
  }).join('');
}
function plannerIsVisible() {
  return window.location.hash === '#planner' || window.location.hash === '#tab-planner' || (document.getElementById('planner-container') && document.getElementById('planner-container').style.display !== 'none');
}
function pickRecipe(day, slot, wk) {
  openPickerModal(day, slot, wk || currentWeekKey());
}

function selectRecipe(day, slot, id, wk) {
  const weekKey = wk || currentWeekKey();
  const weekPlan = getWeekPlan(weekKey);
  if (!weekPlan[day]) weekPlan[day] = {};
  weekPlan[day][slot] = { type: 'recipe', id };
  saveWeekPlan();
  // Double-save all plan data to ensure persistence
  localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  localStorage.setItem('mealPlanKids', JSON.stringify(mealPlanKids));
  renderPlanner();
  // Confetti if day is fully filled
  var filled = Object.values(weekPlan[day]).filter(Boolean).length;
  if (filled === MEALS.length) triggerConfetti();
  if (day === DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] && !plannerIsVisible()) renderDashboard();
  // Toast feedback
  showToast('✅ ' + (lang==='en'?'Added to planner':'Pridané do plánovača'), 'success', 1500);
}

function removeSlot(day, slot, wk) {
  const weekKey = wk || currentWeekKey();
  const weekPlan = getWeekPlan(weekKey);
  if (!weekPlan[day] || !weekPlan[day][slot]) return;
  const entry = weekPlan[day][slot];
  const name = getSlotName(entry) || (lang==='en'?'this meal':'toto jedlo');
  showConfirmModal((lang==='en'?'Remove ':'Odstrániť ') + name + '?', '🗑️', lang==='en'?'Remove':'Odstrániť', function() {
    delete weekPlan[day][slot];
    saveWeekPlan();
    try { localStorage.setItem('mealPlan', JSON.stringify(mealPlan)); } catch(e) {}
    try { localStorage.setItem('mealPlanKids', JSON.stringify(mealPlanKids)); } catch(e) {}
    loadTasks();
    renderPlanner();
    showToast('🗑️ ' + (lang==='en'?'Removed':'Odstránené'), 'info', 1200);
  });
}

function clearPlan() {
  showConfirmModal(lang === 'en' ? 'Clear the current week?' : 'Vymazať aktuálny týždeň?', '🗑️', lang==='en'?'Clear':'Vymazať', function() {
    const weekKey = currentWeekKey();
    const weekPlan = getWeekPlan(weekKey);
    DAYS.forEach(d => { weekPlan[d] = {}; });
    saveWeekPlan();
    renderPlanner();
    showToast('🗑️ ' + (lang==='en'?'Week cleared':'Týždeň vymazaný'), 'info', 1200);
  });
}

function copyWeekPlan() {
  const weekKey = currentWeekKey();
  const weekPlan = getWeekPlan(weekKey);
  const lines = [];
  DAYS.forEach((d, i) => {
    const day = weekPlan[d] || {};
    const dayName = lang === 'en' ? DAYS_EN[i] : DAYS_SK[i];
    const meals = MEALS.map(m => {
      const entry = day[m.id];
      return entry ? getSlotName(entry) : '';
    }).filter(Boolean);
    if (meals.length) lines.push(dayName + ': ' + meals.join(', '));
  });
  if (!lines.length) { showToast(lang==='en'?'No meals planned':'Žiadne naplánované jedlá','info'); return; }
  navigator.clipboard.writeText(lines.join('\n')).then(() => {
    const btn = event?.target?.closest?.('.pa-btn');
    if (btn) { btn.textContent = '✓ Skopírované'; setTimeout(() => renderPlanner(), 1500); }
  }).catch(() => {});
}

// Keep these helpers unchanged
function toggleWeekGrid() {}
function resetWeek() { plannerWeekOffset = 0; renderPlanner(); }

// ======================== SHOPPING LIST ========================
// ======================== SHOPPING LIST ========================
const SHOP_CATEGORIES = [
  { id: 'meat',  icon: '🥩', nameSk: 'Mäso a ryby',      nameEn: 'Meat & Fish',      keywords: ['mäso','meat','kura','chicken','kuracie','hovädzie','beef','bravčové','pork','biftek','steak','mleté','minced','salmon','losos','tuniak','tuna','ryba','fish','ryby','slanina','bacon','klobása','sausage','šunka','ham','párky','frankfurter','špek','spek','krkovička','rebro','rib'] },
  { id: 'dairy',  icon: '🥛', nameSk: 'Mliečne výrobky',  nameEn: 'Dairy',           keywords: ['mlieko','milk','smotana','cream','syr','cheese','maslo','butter','tvaroh','cottage','cottage','jogurt','yogurt','mozzarella','parmezán','parmesan','ricotta','vajce','egg','vajcia','eggs','feta','bryndza','kefír','kefir','cmar','buttermilk'] },
  { id: 'veg',    icon: '🥦', nameSk: 'Zelenina',         nameEn: 'Vegetables',       keywords: ['mrkva','carrot','zemiak','potato','zemiaky','cibuľa','onion','cesnak','garlic','kapusta','cabbage','paradajka','rajčina','tomato','paradajky','paprika','pepper','cuketa','zucchini','špenát','spinach','brokolica','broccoli','šalát','lettuce','uhorka','cucumber','tekvica','pumpkin','batat','sweet potato','cvikla','beetroot','fazuľa','bean','hrášok','peas','kukurica','corn','šošovica','lentil','zeler','celeriac','petržlen','parsley','bylinky','herbs','bazalka','basil','kôpor','dill','pažítka','chives','reďkovka','radish','kel','kale','karfiol','cauliflower','špargľa','asparagus','avokádo','avocado','portulaka','huby','mushrooms','šampiňóny'] },
  { id: 'fruit',  icon: '🍎', nameSk: 'Ovocie',           nameEn: 'Fruit',           keywords: ['jablko','apple','banán','banana','jahody','strawberry','citrón','lemon','limetka','lime','pomaranč','orange','mandarínka','mandarin','hrozienka','raisins','hrozno','grapes','ovocie','fruit','čučoriedky','blueberry','maliny','raspberry','marhuľa','apricot','broskyňa','peach','slivka','plum','melón','melon','ananas','pineapple','kiwi','mango','datle','dates','figy','figs'] },
  { id: 'grain',  icon: '🍞', nameSk: 'Pečivo a obilniny',nameEn: 'Bread & Grains',   keywords: ['múka','flour','chlieb','bread','cesto','dough','strúhanka','breadcrumb','cestoviny','pasta','špagety','spaghetti','lasagne','ryža','rice','quinoa','granola','ovsené','oats','krupica','semolina','vločky','flakes','müsli','muesli','rožok','roll','bageta','baguette','tortilla','pita','kuskus','couscous','bulgur','ražný','žitný','kváskový','sourdough'] },
  { id: 'canned', icon: '🥫', nameSk: 'Konzervy a trvanlivé', nameEn: 'Canned & Pantry', keywords: ['konzerva','can','cícer','chickpea','šošovica','lentil','fazuľa','bean','pretlak','passata','vývar','broth','olej','oil','ocot','vinegar','horčica','mustard','kečup','ketchup','med','honey','pyré','puree','omáčka','sauce','majonéza','mayonnaise','dresing','dressing','sojová','soya','pesto','kapary','capers','olivy','olives'] },
  { id: 'spice',  icon: '🧂', nameSk: 'Koreniny a dochucovadlá', nameEn: 'Spices & Seasonings', keywords: ['soľ','salt','korenie','pepper','paprika','oregano','bazalka','basil','majorán','marjoram','tymian','thyme','rozmarín','rosemary','škorica','cinnamon','vanilka','vanilla','rasca','cumin','kari','curry','bobkový','bay','muškátový','nutmeg','cesnakový','garlic powder','grilovacie','seasoning','bujón','bouillon','kvasnice','yeast','prášok do pečiva','baking'] },
  { id: 'drink',  icon: '🥤', nameSk: 'Nápoje',           nameEn: 'Drinks',          keywords: ['voda','water','džús','juice','čaj','tea','káva','coffee','sirup','syrup','limonáda','lemonade','kofola','minerálka','mineral','sódovka','soda','pivo','beer','víno','wine','koktail','cocktail'] },
  { id: 'frozen', icon: '❄️', nameSk: 'Mrazené',          nameEn: 'Frozen',          keywords: ['mrazená','frozen','zmrzlina','ice cream','mrazené','mrazený','lístkové','puff pastry','mrazená zelenina','frozen veg'] },
  { id: 'sweet',  icon: '🍪', nameSk: 'Sladkosti',        nameEn: 'Sweets',          keywords: ['čokoláda','chocolate','sušienky','cookies','biscuit','keksy','candy','cukríky','lizátko','lollipop','lízanka','koláč','cake','zákusok','dessert','marmeláda','jam','džem','nátierka','spread','nutella','poleva','icing','cukor','sugar'] },
  { id: 'drug',   icon: '🧴', nameSk: 'Drogéria',         nameEn: 'Drugstore',       keywords: ['obrúsky','napkins','jar','washing','šampón','shampoo','sprcha','gél','mydlo','soap','papier','toilet','utierka','towel','sáčok','bag','alobal','foil','fólia','cling wrap','čistič','cleaner','sóda','baking soda','tableta','dishwasher','aviváž','fabric','dezodorant','deodorant','krém','cream','zubná','toothpaste'] },
  { id: 'other',  icon: '📦', nameSk: 'Ostatné',          nameEn: 'Other',           keywords: [] },
];

function guessFoodCategory(name) {
  const n = name.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let best = null, bestLen = 0;
  for (const cat of SHOP_CATEGORIES) {
    if (!cat.keywords.length) continue;
    for (const kw of cat.keywords) {
      if (n.includes(kw) && kw.length > bestLen) {
        best = cat.id;
        bestLen = kw.length;
      }
    }
  }
  return best || 'other';
}

function shopCatLabel(catId) {
  const c = SHOP_CATEGORIES.find(x => x.id === catId);
  if (!c) return lang === 'en' ? 'Other' : 'Ostatné';
  return lang === 'en' ? c.nameEn : c.nameSk;
}

function shopCatIcon(catId) {
  const c = SHOP_CATEGORIES.find(x => x.id === catId);
  return c ? c.icon : '📦';
}

let shopItems = [];
function loadShopItems() {
  try { shopItems = JSON.parse(localStorage.getItem('shoppingItems') || '[]'); } catch(e) { shopItems = []; }
  if (!Array.isArray(shopItems)) shopItems = [];
  // Keep only manual items (recipe auto-population removed)
  shopItems = shopItems.filter(function(it) { return it && it.source === 'manual'; });
}
function saveShopItems() {
  if (!Array.isArray(shopItems)) { shopItems = []; }
  var now = Date.now(), dev = getDeviceId();
  shopItems.forEach(function(it) {
    if (!it.createdAt) it.createdAt = now;
    it.updatedAt = now;
    it.updatedBy = dev;
  });
  localStorage.setItem('shoppingItems', JSON.stringify(shopItems));
}

function autoMergeShopItems() {
  const merged = {};
  let changed = 0;
  const unitMap = { gram: 'g', grams: 'g', gramy: 'g', kilogram: 'kg', kilograms: 'kg', kilo: 'kg', liter: 'l', litre: 'l', literov: 'l', kus: 'ks', piece: 'ks', pieces: 'ks' };
  const cleanUnit = u => unitMap[norm(String(u || '').trim().toLowerCase())] || norm(String(u || '').trim().toLowerCase());
  shopItems.forEach(it => {
    const key = norm(it.name.trim().toLowerCase());
    it.unit = cleanUnit(it.unit);
    if (!it.category || it.category === 'other') it.category = guessFoodCategory(it.name || '');
    if (merged[key]) {
      const existing = merged[key];
      const a1 = parseFloat(existing.amount) || 0;
      const a2 = parseFloat(it.amount) || 0;
      existing.unit = cleanUnit(existing.unit);
      if (a1 && a2 && existing.unit === it.unit) {
        existing.amount = String(a1 + a2);
        changed++;
      } else {
        const extra = [it.amount, it.unit].filter(Boolean).join(' ');
        existing.note = [existing.note, extra, it.note].filter(Boolean).join('; ');
        changed++;
      }
      existing.checked = existing.checked && it.checked;
    } else {
      merged[key] = it;
    }
  });
  if (changed) shopItems = Object.values(merged);
}

function mergeShoppingItems(localArr, remoteArr) {
  if (!Array.isArray(localArr)) localArr = [];
  if (!Array.isArray(remoteArr)) remoteArr = [];
  var map = {};
  localArr.forEach(function(r) { if (r && r.id != null) map[r.id] = r; });
  remoteArr.forEach(function(r) {
    if (!r || r.id == null) return;
    var local = map[r.id];
    if (!local) { map[r.id] = r; }
    else if ((r.updatedAt||0) >= (local.updatedAt||0)) {
      if ((local.updatedAt||0) > (r.updatedAt||0)) r.checked = local.checked;
      map[r.id] = r;
    }
  });
  return Object.values(map);
}
function generateShopId() {
  return 'si_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
}

function renderShoppingList() {
  const container = document.getElementById('shopping-list-view');
  loadShopItems();
  // Only keep manual items (recipe auto-population removed per user request)
  shopItems = shopItems.filter(function(it) { return it && it.source === 'manual'; });

  if (!shopItems.length) {
    container.innerHTML = emptyStateHTML({
      icon: '🛒',
      title: lang === 'en' ? 'Shopping list is empty' : 'Nákupný zoznam je prázdny',
      desc: lang === 'en' ? 'Add a manual item or generate a list from the weekly meal plan.' : 'Pridaj položku ručne alebo vytvor nákup z týždenného jedálnička.',
      actions: [
        { label: '➕ ' + (lang === 'en' ? 'Add item' : 'Pridať položku'), cls: 'btn-primary', onClick: 'openAddItemSheet()' },
        { label: '📅 ' + (lang === 'en' ? 'Plan meals' : 'Naplánovať jedlá'), cls: 'btn-secondary', onClick: 'switchTab(&quot;planner&quot;)' }
      ]
    });
    return;
  }

  const openItems = shopItems.filter(i => !i.checked);
  const boughtItems = shopItems.filter(i => i.checked);
  const openGroups = buildShopGroups(openItems);
  const boughtGroups = buildShopGroups(boughtItems);

  const totalItems = shopItems.length;
  const checkedItems = shopItems.filter(i => i.checked).length;
  const remaining = totalItems - checkedItems;
  const pctAll = totalItems ? Math.round(checkedItems / totalItems * 100) : 0;
  const catCount = Object.keys(openGroups).length || Object.keys(boughtGroups).length;
  const biggestCat = Object.keys(openGroups).sort((a,b) => openGroups[b].length - openGroups[a].length)[0] || Object.keys(boughtGroups).sort((a,b) => boughtGroups[b].length - boughtGroups[a].length)[0];

  // Build HTML
  let html = '';

  // Summary
  html += `<section class="shop-hero">
    <div>
      <span class="shop-hero-kicker">${lang==='en'?'Shopping':'Nákup'}</span>
      <h2>${remaining ? (lang==='en'?'Ready for the store':'Pripravené do obchodu') : (lang==='en'?'Everything bought':'Všetko kúpené')}</h2>
      <p>${lang==='en' ? `${remaining} items left across ${catCount} categories.` : `${remaining} položiek zostáva v ${catCount} kategóriách.`}</p>
    </div>
    <button class="shop-hero-add" onclick="openAddItemSheet()">➕ ${lang==='en'?'Add':'Pridať'}</button>
  </section>`;

  html += `<div class="shop-summary">
    <div class="shop-summary-row">
      <div class="shop-summary-stats">
        <span>📦 <strong>${totalItems}</strong> ${lang==='en'?'items':'položiek'}</span>
        <span>✅ <strong>${checkedItems}</strong> ${lang==='en'?'bought':'kúpených'}</span>
        <span>📋 <strong>${remaining}</strong> ${lang==='en'?'left':'zostáva'}</span>
      </div>
      <span style="font-size:.64rem;color:var(--text3);">${catCount} ${lang==='en'?'categories':'kategórií'}${biggestCat ? ' · ' + shopCatIcon(biggestCat) + ' ' + esc(shopCatLabel(biggestCat)) : ''}</span>
    </div>
    <div class="shop-summary-progress"><div class="shop-summary-progress-bar" style="width:${pctAll}%"></div></div>
  </div>`;

  // Top actions
  html += `<div class="shop-actions">
    <button class="sa-btn primary-action" onclick="openAddItemSheet()">➕ ${lang==='en'?'Add item':'Pridať položku'}</button>
    <button class="sa-btn" onclick="copyShopList()">📋 ${lang==='en'?'Copy':'Kopírovať'}</button>
    <button class="sa-btn" onclick="mergeDuplicateShopItems()">🔄 ${lang==='en'?'Merge dupes':'Zlúčiť duplicity'}</button>
    <button class="sa-btn" onclick="clearCheckedShopItems()">✅ ${lang==='en'?'Clear checked':'Vyčistiť'}</button>
    <button class="sa-btn danger" onclick="clearAllShopItems()">🗑 ${lang==='en'?'Clear all':'Všetko'}</button>
  </div>`;

  html += renderShopCategoryCards(openGroups, { bought: false });
  if (boughtItems.length) {
    html += `<div class="shop-bought-section">
      <div class="shop-bought-head">
        <span>✅ ${lang === 'en' ? 'Bought' : 'Kúpené'}</span>
        <small>${boughtItems.length} ${lang === 'en' ? 'items' : 'položiek'}</small>
      </div>
      ${renderShopCategoryCards(boughtGroups, { bought: true })}
    </div>`;
  }

  // Add item button
  html += `<button class="shop-add-btn" onclick="openAddItemSheet();springBounce(this)">➕ ${lang==='en'?'Add food item':'Pridať potravinu'}</button>`;

  container.innerHTML = html;
  container.classList.add('shop-animate-stagger');
  initShopSwipe();
}

function buildShopGroups(items) {
  const groups = {};
  items.forEach(it => {
    const g = it.category || 'other';
    if (!groups[g]) groups[g] = [];
    groups[g].push(it);
  });
  Object.keys(groups).forEach(g => {
    groups[g].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  });
  return groups;
}

function renderShopCategoryCards(groups, opts) {
  opts = opts || {};
  const catOrder = SHOP_CATEGORIES.map(c => c.id);
  const catIds = [...new Set([...Object.keys(groups).filter(g => catOrder.includes(g)), ...catOrder])];
  let html = '';
  catIds.forEach(catId => {
    const items = groups[catId];
    if (!items || !items.length) return;
    const total = items.length;
    const checked = items.filter(i => i.checked).length;
    const pct = Math.round(checked / total * 100);
    html += `<div class="shop-cat-card${opts.bought ? ' bought' : ''}" data-cat="${catId}">
      <div class="shop-cat-header" onclick="toggleShopCategory(this)">
        <span class="shop-cat-icon">${shopCatIcon(catId)}</span>
        <span class="shop-cat-name">${shopCatLabel(catId)}</span>
        <span class="shop-cat-count">${opts.bought ? total : checked + '/' + total}</span>
        <div class="shop-cat-progress-wrap"><div class="shop-cat-progress-bar" style="width:${opts.bought ? 100 : pct}%"></div></div>
        <span class="shop-cat-arrow">▼</span>
      </div>
      <div class="shop-cat-body">${items.map(renderShopItem).join('')}</div>
    </div>`;
  });
  return html;
}

function renderShopItem(it) {
  const ch = it.checked ? 'checked' : '';
  const catLabel = shopCatLabel(it.category);
  const amount = it.amount ? (it.unit ? `${it.amount} ${it.unit}` : it.amount) : '';
  return `<div class="shop-item ${ch}" data-id="${it.id}">
    <div class="si-check ${ch}" onclick="toggleShopItem('${it.id}')">${it.checked?'✓':''}</div>
    <div class="si-info" onclick="openAddItemSheet('${it.id}')">
      <div class="si-name">${esc(it.name)}</div>
      <div class="si-meta">
        ${amount ? `<span>${esc(amount)}</span>` : ''}
        <span class="si-cat-chip">${esc(catLabel)}</span>
        ${it.note ? `<span>📝 ${esc(it.note)}</span>` : ''}
      </div>
    </div>
    <div class="si-actions">
      <button class="si-btn" onclick="event.stopPropagation();openAddItemSheet('${it.id}')" title="${lang==='en'?'Edit':'Upraviť'}">✏️</button>
      <button class="si-btn danger" onclick="event.stopPropagation();deleteShopItem('${it.id}')" title="${lang==='en'?'Delete':'Vymazať'}">🗑</button>
    </div>
    <div class="si-swipe-delete" onclick="event.stopPropagation();deleteShopItem('${it.id}')">🗑 ${lang==='en'?'Delete':'Vymazať'}</div>
  </div>`;
}

// =================== SWIPE TO DELETE ===================
var _swipeData = null;
// Close any open swipe when tapping elsewhere
document.addEventListener('touchstart', function(e) {
  if (_swipeData || !e.target.closest) return; // tracking active swipe
  if (!e.target.closest('.shop-item')) {
    document.querySelectorAll('.si-swipe-delete.revealed').forEach(function(d) {
      var item = d.closest('.shop-item');
      if (item) {
        var check = item.querySelector('.si-check');
        var info = item.querySelector('.si-info');
        var actions = item.querySelector('.si-actions');
        [check, info, actions].forEach(function(el) {
          if (el) { el.style.transition = 'transform .25s cubic-bezier(.22,1,.36,1)'; el.style.transform = ''; }
        });
      }
      d.classList.remove('revealed');
    });
  }
}, { passive: true });

function initShopSwipe() {
  document.querySelectorAll('.shop-item').forEach(function(item) {
    item.addEventListener('touchstart', onSwipeStart, { passive: true });
    item.addEventListener('touchmove', onSwipeMove, { passive: false });
    item.addEventListener('touchend', onSwipeEnd, { passive: true });
    // Reset any existing revealed state
    var del = item.querySelector('.si-swipe-delete');
    if (del) del.classList.remove('revealed');
  });
}

function onSwipeStart(e) {
  var item = e.currentTarget;
  // Close any other open swipe
  document.querySelectorAll('.si-swipe-delete.revealed').forEach(function(d) {
    d.closest('.shop-item').querySelector('.si-swipe-delete').classList.remove('revealed');
  });
  _swipeData = { item: item, startX: e.touches[0].clientX, startY: e.touches[0].clientY, moved: false };
}

function onSwipeMove(e) {
  if (!_swipeData) return;
  var dx = e.touches[0].clientX - _swipeData.startX;
  var dy = Math.abs(e.touches[0].clientY - _swipeData.startY);
  // If scrolling vertically, don't swipe
  if (dy > 20 && Math.abs(dx) < 10) {
    _swipeData = null;
    return;
  }
  if (dx > 0) { _swipeData = null; return; } // Only left swipe
  _swipeData.moved = true;
  var translateX = Math.max(dx, -80);
  _swipeData.item.querySelector('.si-check').style.transform = 'translateX(' + translateX + 'px)';
  _swipeData.item.querySelector('.si-info').style.transform = 'translateX(' + translateX + 'px)';
  _swipeData.item.querySelector('.si-actions').style.transform = 'translateX(' + translateX + 'px)';
  var del = _swipeData.item.querySelector('.si-swipe-delete');
  if (del) del.style.transition = 'none';
  e.preventDefault();
}

function onSwipeEnd(e) {
  if (!_swipeData) return;
  var del = _swipeData.item.querySelector('.si-swipe-delete');
  var dx = e.changedTouches[0].clientX - _swipeData.startX;
  var snapBack = function() {
    var check = _swipeData.item.querySelector('.si-check');
    var info = _swipeData.item.querySelector('.si-info');
    var actions = _swipeData.item.querySelector('.si-actions');
    [check, info, actions].forEach(function(el) {
      if (el) { el.style.transition = 'transform .25s cubic-bezier(.22,1,.36,1)'; el.style.transform = ''; }
    });
    if (del) { del.style.transition = ''; del.classList.remove('revealed'); }
  };
  
  if (dx < -50 && _swipeData.moved) {
    // Reveal delete button
    if (del) {
      del.classList.add('revealed');
      var check = _swipeData.item.querySelector('.si-check');
      var info = _swipeData.item.querySelector('.si-info');
      var actions = _swipeData.item.querySelector('.si-actions');
      [check, info, actions].forEach(function(el) {
        if (el) { el.style.transition = 'transform .25s cubic-bezier(.22,1,.36,1)'; el.style.transform = 'translateX(-80px)'; }
      });
    }
  } else {
    snapBack();
  }
  _swipeData = null;
}

function toggleShopItem(id) {
  const it = shopItems.find(i => i.id === id);
  if (!it) return;
  it.checked = !it.checked;
  haptic(10);
  saveShopItems();
  var checkEl = document.querySelector('.shop-item[data-id="' + id + '"] .si-check');
  if (checkEl) microCheckmark(checkEl);
  var itemEl = document.querySelector('.shop-item[data-id="' + id + '"]');
  if (itemEl) springBounce(itemEl);
  setTimeout(function() { renderShoppingList(); }, 300);
}

function clearCheckedShopItems() {
  const checked = shopItems.filter(i => i.checked);
  if (!checked.length) {
    showToast(lang==='en'?'No checked items.':'Žiadne zaškrtnuté položky.','info');
    return;
  }
  showConfirmModal(lang === 'en' ? `Remove ${checked.length} checked items?` : `Odstrániť ${checked.length} zaškrtnutých položiek?`, '🗑️', lang==='en'?'Remove':'Odstrániť', function() {
    shopItems = shopItems.filter(i => !i.checked);
    saveShopItems();
    renderShoppingList();
    showToast('✅ ' + (lang==='en'?'Cleaned':'Vyčistené'), 'success', 1200);
  });
}

function clearAllShopItems() {
  showConfirmModal(lang === 'en' ? 'Clear entire shopping list?' : 'Vymazať celý nákupný zoznam?', '🗑️', lang==='en'?'Clear all':'Všetko vymazať', function() {
    shopItems = [];
    saveShopItems();
    renderShoppingList();
    showToast('🗑️ ' + (lang==='en'?'List cleared':'Zoznam vyčistený'), 'info', 1200);
  });
}

function mergeDuplicateShopItems() {
  loadShopItems();
  const before = shopItems.length;
  autoMergeShopItems();
  const changed = before - shopItems.length;
  saveShopItems();
  renderShoppingList();
  if (changed) showToast(lang==='en'?'Merged '+changed+' items.':'Zlúčených '+changed+' položiek.','success');
  else showToast(lang==='en'?'No duplicates.':'Žiadne duplicity.','info');
}

function copyShopList() {
  const unchecked = shopItems.filter(i => !i.checked);
  if (!unchecked.length) return;
  const text = unchecked.map(i => {
    const amount = i.amount ? (i.unit ? `${i.amount} ${i.unit}` : i.amount) : '';
    return `${i.name}${amount ? ' ' + amount : ''}${i.note ? ' — ' + i.note : ''}`;
  }).join('\n');
  navigator.clipboard.writeText(text).catch(() => {});
  showToast(lang==='en'?'Copied ' + unchecked.length + ' items.':'Skopírovaných ' + unchecked.length + ' položiek.','success');
}

function openAddItemSheet(editId) {
  const sheet = document.getElementById('shop-sheet');
  const title = document.getElementById('shop-sheet-title');
  const nameEl = document.getElementById('shop-item-name');
  const amountEl = document.getElementById('shop-item-amount');
  const unitEl = document.getElementById('shop-item-unit');
  const noteEl = document.getElementById('shop-item-note');
  const editIdEl = document.getElementById('shop-edit-id');
  const saveBtn = document.getElementById('shop-save-btn');
  const chips = document.getElementById('shop-cat-chips');

  if (editId) {
    const it = shopItems.find(i => i.id === editId);
    if (!it) return;
    title.textContent = lang === 'en' ? '✏️ Edit item' : '✏️ Upraviť položku';
    nameEl.value = it.name;
    amountEl.value = it.amount || '';
    unitEl.value = it.unit || '';
    noteEl.value = it.note || '';
    editIdEl.value = editId;
    saveBtn.textContent = lang === 'en' ? '💾 Save' : '💾 Uložiť';
    renderCategoryChips(it.category);
  } else {
    title.textContent = lang === 'en' ? '✏️ Add item' : '✏️ Pridať potravinu';
    nameEl.value = '';
    amountEl.value = '';
    unitEl.value = '';
    noteEl.value = '';
    editIdEl.value = '';
    saveBtn.textContent = lang === 'en' ? '💾 Add' : '💾 Pridať';
    renderCategoryChips('other');
  }
  sheet.classList.add('active');
  nameEl.focus();
}

function renderCategoryChips(selected) {
  const chips = document.getElementById('shop-cat-chips');
  chips.innerHTML = SHOP_CATEGORIES.map(c =>
    `<button class="cat-chip${c.id === selected ? ' active' : ''}" data-cat="${c.id}" onclick="selectCatChip(this)">${c.icon} ${lang==='en'?c.nameEn:c.nameSk}</button>`
  ).join('');
}

function selectCatChip(el) {
  document.querySelectorAll('#shop-cat-chips .cat-chip').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function closeShopSheet() {
  document.getElementById('shop-sheet').classList.remove('active');
}

function saveShopItem() {
  const nameEl = document.getElementById('shop-item-name');
  const amountEl = document.getElementById('shop-item-amount');
  const unitEl = document.getElementById('shop-item-unit');
  const noteEl = document.getElementById('shop-item-note');
  const editIdEl = document.getElementById('shop-edit-id');
  const activeChip = document.querySelector('#shop-cat-chips .cat-chip.active');
  const category = activeChip ? activeChip.dataset.cat : 'other';
  const name = nameEl.value.trim();
  if (!name) {
    nameEl.focus();
    nameEl.style.borderColor = 'var(--danger)';
    setTimeout(() => nameEl.style.borderColor = '', 1500);
    return;
  }
  const editId = editIdEl.value;
  if (editId) {
    const it = shopItems.find(i => i.id === editId);
    if (it) {
      it.name = name;
      it.amount = amountEl.value.trim();
      it.unit = unitEl.value.trim();
      it.category = category;
      it.note = noteEl.value.trim();
    }
  } else {
    shopItems.push({
      id: generateShopId(),
      name: name,
      amount: amountEl.value.trim(),
      unit: unitEl.value.trim(),
      category: category,
      checked: false,
      source: 'manual',
      note: noteEl.value.trim(),
      recipeId: ''
    });
  }
  // Auto-merge duplicates after adding new item
  try { autoMergeShopItems(); } catch(e) {}
  saveShopItems();
  closeShopSheet();
  renderShoppingList();
}

function deleteShopItem(id) {
  showConfirmModal(lang === 'en' ? 'Delete this item?' : 'Vymazať túto položku?', '🗑️', lang==='en'?'Delete':'Vymazať', function() {
    const deletedItem = shopItems.find(i => i.id === id);
    const deletedIndex = shopItems.findIndex(i => i.id === id);
    shopItems = shopItems.filter(i => i.id !== id);
    saveShopItems();
    renderShoppingList();
    showUndoToast('🗑️ ' + (lang==='en'?'Item deleted':'Položka vymazaná'), function() {
      if (!deletedItem) return;
      shopItems.splice(Math.max(0, deletedIndex), 0, deletedItem);
      saveShopItems();
      renderShoppingList();
      showToast(lang === 'en' ? 'Item restored' : 'Položka obnovená', 'success', 1200);
    });
  });
}

function toggleShopCategory(headerEl) {
  const card = headerEl.closest('.shop-cat-card');
  card.classList.toggle('collapsed');
}

function guessShopCategory() {
  if (!appSettings.shopping.autoCategories) return;
  const name = document.getElementById('shop-item-name').value.trim();
  if (!name) return;
  const cat = guessFoodCategory(name);
  document.querySelectorAll('#shop-cat-chips .cat-chip').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
}

// ======================== TASKS ========================
const TASK_CATEGORIES = [
  { id: 'cooking',  icon: '🥘', color: '#dc2626' },
  { id: 'shopping', icon: '🛒', color: '#f59e0b' },
  { id: 'household',icon: '🧹', color: '#10b981' },
  { id: 'kid',     icon: '👶', color: '#8b5cf6' },
  { id: 'custom',  icon: '⭐', color: '#6b7280' },
];
let tasks = [];
function loadTasks() {
  try { tasks = JSON.parse(localStorage.getItem('tasks') || '[]'); } catch(e) { tasks = []; }
  if (!Array.isArray(tasks)) tasks = [];
  processRecurringTasks();
}
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function processRecurringTasks() {
  const today = new Date().toISOString().slice(0,10);
  let changed = false;
  tasks.forEach(t => {
    if (!t.completed || t.repeat === 'none') return;
    const lastDate = t.completedDate || t.date;
    if (!lastDate) return;
    if (t.repeat === 'daily') {
      if (lastDate < today) {
        t.completed = false;
        t.completedDate = '';
        changed = true;
      }
    } else if (t.repeat === 'weekly') {
      const last = new Date(lastDate);
      const now = new Date(today);
      const daysDiff = Math.floor((now - last) / (1000*60*60*24));
      if (daysDiff >= 7) {
        t.completed = false;
        t.completedDate = '';
        changed = true;
      }
    }
  });
  if (changed) saveTasks();
}
function generateTaskId() {
  return 't_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
}
function taskCatInfo(catId) {
  return TASK_CATEGORIES.find(c => c.id === catId) || TASK_CATEGORIES[4];
}

function getTodayTasks() {
  const today = new Date().toISOString().slice(0,10);
  return tasks.filter(t => t.date === today && !t.completed);
}
function getDateTasks(dateStr) {
  return tasks.filter(t => t.date === dateStr && !t.completed);
}
function getWeekTasks() {
  const today = new Date();
  const start = new Date(today); start.setDate(today.getDate() - today.getDay() + 1);
  const end = new Date(start); end.setDate(start.getDate() + 6);
  const dates = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().slice(0,10));
  }
  return tasks.filter(t => !t.completed && dates.includes(t.date));
}
function getCompletedTasks() {
  return tasks.filter(t => t.completed).sort((a,b) => (b.completedDate||'').localeCompare(a.completedDate||''));
}
function getRecentCompleted() {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  return tasks.filter(t => t.completed && t.completedDate && (now - new Date(t.completedDate).getTime()) < day);
}
function clearCompletedTasks() {
  showConfirmModal(lang==='en'?'Delete all completed tasks?':'Vymazať všetky dokončené úlohy?', '🗑️', lang==='en'?'Delete':'Vymazať', function() {
  
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
  renderDashboard();
  });
}
function getTodayProgress() {
  const today = new Date().toISOString().slice(0,10);
  const dayTasks = tasks.filter(t => t.date === today);
  const total = dayTasks.length;
  const done = dayTasks.filter(t => t.completed).length;
  return { total, done, remaining: total - done };
}

function formatTaskDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
  const today = new Date(); today.setHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const diff = Math.floor((d - today) / (1000*60*60*24));
  if (diff === 0) return lang === 'en' ? 'Today' : 'Dnes';
  if (diff === 1) return lang === 'en' ? 'Tomorrow' : 'Zajtra';
  if (diff > 0 && diff < 7) return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'sk-SK', { weekday: 'long' });
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'sk-SK', { day: 'numeric', month: 'short' });
}

// ===== DASHBOARD WIDGET =====
function renderTaskWidget() {
  const el = document.getElementById('dash-tasks');
  if (!el) return;
  const todayTasks = getTodayTasks();
  const { total, done, remaining } = getTodayProgress();
  const maxShow = 5;
  const showTasks = todayTasks.slice(0, maxShow);
  const circumference = 2 * Math.PI * 13;
  const offset = total > 0 ? circumference * (1 - done / total) : circumference;

  let html = `<div class="tasks-widget">
    <div class="tw-header">
      <div class="tw-title">✅ ${t('tasksHomeTitle')}</div>
      <div class="tw-progress">
        <span style="font-size:.65rem;color:var(--text3);font-weight:600;">${done}/${total}</span>
        <div class="tw-progress-circle">
          <svg viewBox="0 0 32 32"><circle class="bg" cx="16" cy="16" r="13"/><circle class="fg" cx="16" cy="16" r="13" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/></svg>
          <span class="center">${total > 0 ? Math.round(done/total*100) : 0}%</span>
        </div>
      </div>
    </div>`;

  if (!showTasks.length) {
    html += `<div style="text-align:center;padding:.3rem 0;font-size:.7rem;color:var(--text3);">✨ ${t('tasksHomeEmpty')}</div>`;
  } else {
    html += `<div class="tw-items">${showTasks.map(t => {
      const ci = taskCatInfo(t.category);
      return `<div class="tw-item${t.completed?' done':''}" onclick="toggleTask('${t.id}');renderTaskWidget();">
        <span class="tw-cat-icon">${ci.icon}</span>
        <span class="tw-check${t.completed?' done':''}" onclick="event.stopPropagation();toggleTask('${t.id}');renderTaskWidget();">${t.completed?'✓':''}</span>
        <span class="tw-text">${esc(t.title)}</span>
      </div>`;
    }).join('')}</div>`;
    if (todayTasks.length > maxShow) {
      html += `<div class="tw-more" onclick="switchTab('tasks')"><span data-lang="tasksShowAll">Zobraziť všetky</span> →</div>`;
    }
  }

  // Quick add
  html += `<div class="tw-add-quick">
    <input id="tw-quick-input" placeholder="${lang==='en'?'Quick add...':'Rýchlo pridať...'}" onkeydown="if(event.key==='Enter')quickAddTask()">
    <button onclick="quickAddTask()">+</button>
  </div></div>`;

  el.innerHTML = html;
}

function quickAddTask() {
  const input = document.getElementById('tw-quick-input');
  const title = input.value.trim();
  if (!title) return;
  const today = new Date().toISOString().slice(0,10);
  const cat = guessTaskCategory(title);
  tasks.push({ id: generateTaskId(), title, category: cat, completed: false, date: today, time: '', priority: 'medium', repeat: 'none', note: '', source: 'manual', completedDate: '' });
  saveTasks();
  input.value = '';
  renderTaskWidget();
}

function guessTaskCategory(title) {
  const n = title.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/var(en|iť|enie)|kuch|pečie|pečte|obed|večer|raňajk|desiat|koláč|recept|uvar/i.test(n)) return 'cooking';
  if (/nakup|kúpiť|kúp|obchod|mlieko|chlieb|potravin/i.test(n)) return 'shopping';
  if (/uprat|čist|kuchyn|chladničk|práčka|umy|vysáva/i.test(n)) return 'household';
  if (/dieťa|baby|deti|plienk|detsk|škol/i.test(n)) return 'kid';
  return 'custom';
}

// ===== TASKS SCREEN =====
function renderTasks() {
  const container = document.getElementById('tasks-view');
  loadTasks();
  const today = new Date().toISOString().slice(0,10);
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); const tomStr = tomorrow.toISOString().slice(0,10);
  const weekTasks = getWeekTasks();
  const todayTasks = getTodayTasks();
  const tomTasks = getDateTasks(tomStr);
  const completedList = getCompletedTasks();

  const sections = [
    { title: lang==='en'?'Today':'Dnes', icon: '📅', tasks: todayTasks },
    { title: lang==='en'?'Tomorrow':'Zajtra', icon: '🌟', tasks: tomTasks },
    { title: lang==='en'?'This Week':'Tento týždeň', icon: '📆', tasks: weekTasks.filter(t => t.date !== today && t.date !== tomStr) },
  ];

  let html = '';

  const openTasks = tasks.filter(t => !t.completed).length;
  const doneTasks = tasks.filter(t => t.completed).length;
  const restWeekTasks = weekTasks.filter(t => t.date !== today && t.date !== tomStr);
  const activeTaskFilterClass = filter => _taskFilter === filter ? ' active' : '';
  const taskHero = getTaskHeroCopy({
    filter: _taskFilter,
    openTasks,
    doneTasks,
    todayCount: todayTasks.length,
    tomorrowCount: tomTasks.length,
    weekCount: restWeekTasks.length,
    completedCount: completedList.length
  });

  html += `<section class="task-hero">
    <div>
      <span class="task-hero-kicker">${lang==='en'?'Tasks':'Úlohy'}</span>
      <h2>${taskHero.title}</h2>
      <p>${taskHero.sub}</p>
    </div>
    <button class="task-hero-add" onclick="openTaskSheet()">➕ ${lang==='en'?'Add':'Pridať'}</button>
  </section>`;

  // Filter chips
  html += `<div class="task-filters">
    <button class="task-filter-chip${activeTaskFilterClass('today')}" onclick="filterTasksTab(this,'today')">📅 ${lang==='en'?'Today':'Dnes'}</button>
    <button class="task-filter-chip${activeTaskFilterClass('tomorrow')}" onclick="filterTasksTab(this,'tomorrow')">🌟 ${lang==='en'?'Tomorrow':'Zajtra'}</button>
    <button class="task-filter-chip${activeTaskFilterClass('week')}" onclick="filterTasksTab(this,'week')">📆 ${lang==='en'?'Week':'Týždeň'}</button>
    <button class="task-filter-chip${activeTaskFilterClass('all')}" onclick="filterTasksTab(this,'all')">📋 ${lang==='en'?'All':'Všetky'}</button>
    <button class="task-filter-chip${activeTaskFilterClass('done')}" onclick="filterTasksTab(this,'done')">✅ ${lang==='en'?'Done':'Hotové'}</button>
  </div>`;

  const headerLen = html.length; // track header length for empty state check
  // Filter-aware section rendering
  if (_taskFilter === 'today') {
    if (todayTasks.length) {
      html += `<div class="task-section-title">📅 ${lang==='en'?'Today':'Dnes'} <span class="task-section-count">${todayTasks.length}</span></div>`;
      html += todayTasks.map(t => renderTaskCard(t)).join('');
    }
  } else if (_taskFilter === 'tomorrow') {
    if (tomTasks.length) {
      html += `<div class="task-section-title">🌟 ${lang==='en'?'Tomorrow':'Zajtra'} <span class="task-section-count">${tomTasks.length}</span></div>`;
      html += tomTasks.map(t => renderTaskCard(t)).join('');
    }
  } else if (_taskFilter === 'week') {
    sections.forEach(s => {
      const filtered = s.tasks.filter(t => t.date !== today && t.date !== tomStr);
      if (!filtered.length) return;
      html += `<div class="task-section-title">${s.icon} ${s.title} <span class="task-section-count">${filtered.length}</span></div>`;
      html += filtered.map(t => renderTaskCard(t)).join('');
    });
  } else if (_taskFilter === 'done') {
    const recentDone = getRecentCompleted();
    const olderDone = completedList.filter(t => !recentDone.find(r => r.id === t.id));
    if (recentDone.length) {
      html += `<div class="task-section-title">🕐 ${lang==='en'?'Last 24 hours':'Posledných 24 hodín'} <span class="task-section-count">${recentDone.length}</span></div>`;
      html += recentDone.map(t => renderTaskCard(t)).join('');
    }
    if (olderDone.length) {
      html += `<div class="task-section-title">📦 ${lang==='en'?'Older':'Staršie'} <span class="task-section-count">${olderDone.length}</span></div>`;
      html += olderDone.slice(0, 20).map(t => renderTaskCard(t)).join('');
    }
    if (completedList.length) {
      html += `<button class="shop-add-btn" onclick="clearCompletedTasks()" style="color:var(--danger);border-color:var(--danger);margin-top:.3rem;">🗑 ${lang==='en'?'Delete all completed':'Vymazať dokončené'}</button>`;
    }
  } else {
    sections.forEach(s => {
      if (!s.tasks.length) return;
      html += `<div class="task-section-title">${s.icon} ${s.title} <span class="task-section-count">${s.tasks.length}</span></div>`;
      html += s.tasks.map(t => renderTaskCard(t)).join('');
    });
    if (completedList.length) {
      const recentDone = getRecentCompleted();
      if (recentDone.length) {
        html += `<div class="task-section-title">✅ ${lang==='en'?'Recently completed':'Nedávno dokončené'} <span class="task-section-count">${recentDone.length}</span></div>`;
        html += recentDone.slice(0, 5).map(t => renderTaskCard(t)).join('');
      }
      if (completedList.length > 10) {
        html += `<button class="shop-add-btn" onclick="clearCompletedTasks()" style="color:var(--danger);border-color:var(--danger);margin-top:.3rem;">🗑 ${lang==='en'?'Delete completed':'Vymazať dokončené'}</button>`;
      }
    }
  }

  const hasRenderedTasks = html.length !== headerLen;
  if (hasRenderedTasks) {
    html = html.slice(0, headerLen) + `<button class="shop-add-btn" onclick="openTaskSheet()" style="margin-bottom:.4rem;">➕ ${lang==='en'?'Add task':'Pridať úlohu'}</button>` + html.slice(headerLen);
  }
  if (!hasRenderedTasks) {
    const emptyCopy = {
      today: [lang === 'en' ? 'Free day' : 'Dnes voľno', lang === 'en' ? 'No tasks for today. Add one if something comes up.' : 'Na dnes nemáš žiadne úlohy. Pridaj si niečo, ak treba.'],
      tomorrow: [lang === 'en' ? 'Tomorrow is clear' : 'Zajtra je čisto', lang === 'en' ? 'Nothing scheduled for tomorrow yet.' : 'Na zajtra zatiaľ nič nemáš.'],
      week: [lang === 'en' ? 'Week looks calm' : 'Týždeň vyzerá pokojne', lang === 'en' ? 'No upcoming tasks in the rest of the week.' : 'Vo zvyšku týždňa nie sú žiadne úlohy.'],
      done: [lang === 'en' ? 'No completed tasks' : 'Žiadne hotové úlohy', lang === 'en' ? 'Completed tasks will appear here.' : 'Dokončené úlohy sa zobrazia tu.'],
      all: [lang === 'en' ? 'No tasks yet' : 'Zatiaľ žiadne úlohy', lang === 'en' ? 'Create your first task and keep the day organized.' : 'Vytvor prvú úlohu a udrž deň pod kontrolou.']
    };
    const copy = emptyCopy[_taskFilter] || emptyCopy.all;
    html += emptyStateHTML({
      icon: '✅',
      title: copy[0],
      desc: copy[1],
      actions: [
        { label: '✏️ ' + (lang === 'en' ? 'Add task' : 'Pridať úlohu'), cls: 'btn-primary', onClick: 'openTaskSheet()' }
      ]
    });
  }

  if (hasRenderedTasks) {
    html += `<button class="shop-add-btn" onclick="openTaskSheet()" style="margin-top:.3rem;">➕ ${lang==='en'?'Add task':'Pridať úlohu'}</button>`;
  }

  container.innerHTML = html;
}

let _taskFilter = 'today';
function filterTasksTab(el, filter) {
  _taskFilter = filter;
  renderTasks();
}

function getTaskHeroCopy(data) {
  const totalOpenSk = data.openTasks + ' otvorené celkovo';
  const totalOpenEn = data.openTasks + ' open total';
  const doneSk = data.doneTasks + ' hotové';
  const doneEn = data.doneTasks + ' done';
  if (data.filter === 'tomorrow') {
    return {
      title: data.tomorrowCount ? (lang === 'en' ? 'Tomorrow needs attention' : 'Zajtra treba vybaviť') : (lang === 'en' ? 'Tomorrow is clear' : 'Zajtra je čisto'),
      sub: lang === 'en' ? `${data.tomorrowCount} tomorrow · ${totalOpenEn}` : `${data.tomorrowCount} na zajtra · ${totalOpenSk}`
    };
  }
  if (data.filter === 'week') {
    return {
      title: data.weekCount ? (lang === 'en' ? 'Rest of the week' : 'Zvyšok týždňa') : (lang === 'en' ? 'Week looks calm' : 'Týždeň je pokojný'),
      sub: lang === 'en' ? `${data.weekCount} later this week · ${totalOpenEn}` : `${data.weekCount} vo zvyšku týždňa · ${totalOpenSk}`
    };
  }
  if (data.filter === 'all') {
    return {
      title: data.openTasks ? (lang === 'en' ? 'All open tasks' : 'Všetky otvorené úlohy') : (lang === 'en' ? 'Everything is clear' : 'Všetko je čisté'),
      sub: lang === 'en' ? `${totalOpenEn} · ${doneEn}` : `${totalOpenSk} · ${doneSk}`
    };
  }
  if (data.filter === 'done') {
    return {
      title: data.completedCount ? (lang === 'en' ? 'Completed tasks' : 'Hotové úlohy') : (lang === 'en' ? 'Nothing completed yet' : 'Zatiaľ nič hotové'),
      sub: lang === 'en' ? `${data.completedCount} completed · ${totalOpenEn}` : `${data.completedCount} dokončené · ${totalOpenSk}`
    };
  }
  return {
    title: data.todayCount ? (lang === 'en' ? 'Today needs attention' : 'Dnes treba vybaviť') : (lang === 'en' ? 'Free day' : 'Dnes voľno'),
    sub: lang === 'en' ? `${data.todayCount} today · ${totalOpenEn}` : `${data.todayCount} na dnes · ${totalOpenSk}`
  };
}

function renderTaskCard(t) {
  const ci = taskCatInfo(t.category);
  const done = t.completed;
  const prioLabel = t.priority === 'high' ? '🔴' : t.priority === 'medium' ? '🟡' : '🟢';
  const dateLabel = formatTaskDate(t.date);
  const timeStr = t.time ? ` · 🕐 ${t.time}` : '';
  return `<div class="task-card${done?' done':''} prio-${t.priority}">
    <div class="task-card-body">
      <span class="task-cat-icon">${ci.icon}</span>
      <div class="tc-check${done?' done':''}" onclick="toggleTask('${t.id}')">${done?'✓':''}</div>
      <div class="tc-info" onclick="openTaskSheet('${t.id}')">
        <div class="tc-title">${esc(t.title)}</div>
        <div class="tc-meta">
          <span class="tc-cat">${ci.icon} ${taskCatLabel(t.category)}</span>
          <span class="tc-priority ${t.priority}">${prioLabel}</span>
          <span class="tc-time">${dateLabel}${timeStr}</span>
          ${t.note ? `<span>📝 ${esc(t.note)}</span>` : ''}
          ${t.repeat !== 'none' ? `<span>🔄 ${t.repeat === 'daily' ? (lang==='en'?'daily':'denne') : (lang==='en'?'weekly':'týždenne')}</span>` : ''}
        </div>
      </div>
      <div class="tc-actions">
        <button class="tc-btn" onclick="event.stopPropagation();openTaskSheet('${t.id}')" title="${lang==='en'?'Edit':'Upraviť'}">✏️</button>
        <button class="tc-btn danger" onclick="event.stopPropagation();deleteTask('${t.id}')" title="${lang==='en'?'Delete':'Vymazať'}">🗑</button>
      </div>
    </div>
  </div>`;
}

function taskCatLabel(catId) {
  const map = {
    cooking: lang==='en'?'Cooking':'Varenie',
    shopping: lang==='en'?'Shopping':'Nákup',
    household: lang==='en'?'Household':'Domácnosť',
    kid: lang==='en'?'Kids':'Dieťa',
    custom: lang==='en'?'Custom':'Vlastné'
  };
  return map[catId] || '—';
}

// ===== TASK CRUD =====
function toggleTask(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.completed = !t.completed;
  t.completedDate = t.completed ? new Date().toISOString().slice(0,10) : '';
  haptic(10);
  saveTasks();
  const inTasks = document.getElementById('tasks-container')?.style.display !== 'none';
  if (inTasks) renderTasks();
  else renderTaskWidget();
}

function deleteTask(id) {
  showConfirmModal(lang === 'en' ? 'Delete this task?' : 'Vymazať túto úlohu?', '🗑️', lang==='en'?'Delete':'Vymazať', function() {
    const deletedTask = tasks.find(t => t.id === id);
    const deletedIndex = tasks.findIndex(t => t.id === id);
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    const inTasks = document.getElementById('tasks-container')?.style.display !== 'none';
    if (inTasks) renderTasks();
    else { renderTaskWidget(); if (document.getElementById('dashboard')?.style.display !== 'none') renderDashboard(); }
    showUndoToast('🗑️ ' + (lang==='en'?'Task deleted':'Úloha vymazaná'), function() {
      if (!deletedTask) return;
      tasks.splice(Math.max(0, deletedIndex), 0, deletedTask);
      saveTasks();
      if (inTasks) renderTasks();
      else { renderTaskWidget(); if (document.getElementById('dashboard')?.style.display !== 'none') renderDashboard(); }
      showToast(lang === 'en' ? 'Task restored' : 'Úloha obnovená', 'success', 1200);
    });
  });
}

function toggleTaskExtra() {
  var el = document.getElementById('task-extra-fields');
  var btn = document.getElementById('task-extra-toggle');
  if (!el || !btn) return;
  var isVisible = el.style.display !== 'none';
  el.style.display = isVisible ? 'none' : '';
  btn.textContent = isVisible ? '▼ ' + (lang==='en'?'More options':'Viac možností') : '▲ ' + (lang==='en'?'Less options':'Menej možností');
}

function openTaskSheet(editId) {
  const sheet = document.getElementById('task-sheet');
  document.getElementById('task-sheet-title').textContent = editId
    ? (lang==='en'?'✏️ Edit task':'✏️ Upraviť úlohu')
    : (lang==='en'?'✅ Add task':'✅ Pridať úlohu');
  document.getElementById('task-save-btn').textContent = editId
    ? (lang==='en'?'💾 Save':'💾 Uložiť')
    : (lang==='en'?'💾 Add':'💾 Pridať');

  // Hide extra fields by default for new tasks
  if (!editId) {
    document.getElementById('task-extra-fields').style.display = 'none';
    document.getElementById('task-extra-toggle').textContent = '▼ ' + (lang==='en'?'More options':'Viac možností');
    document.getElementById('task-date').value = new Date().toISOString().slice(0,10);
    document.getElementById('task-time').value = '';
    document.getElementById('task-priority').value = 'medium';
    document.getElementById('task-repeat').value = 'none';
    document.getElementById('task-note').value = '';
    document.getElementById('task-title').value = '';
    document.getElementById('task-edit-id').value = '';
  } else {
    // Show extra fields when editing
    document.getElementById('task-extra-fields').style.display = '';
    document.getElementById('task-extra-toggle').textContent = '▲ ' + (lang==='en'?'Less options':'Menej možností');
  }

  // Render category chips
  const chips = document.getElementById('task-cat-chips');
  chips.innerHTML = TASK_CATEGORIES.map(c =>
    `<button class="cat-chip${c.id === 'custom' ? ' active' : ''}" data-cat="${c.id}" onclick="selectTaskCat(this)">${c.icon} ${taskCatLabel(c.id)}</button>`
  ).join('');

  if (editId) {
    const t = tasks.find(x => x.id === editId);
    if (!t) return;
    document.getElementById('task-title').value = t.title;
    document.getElementById('task-date').value = t.date;
    document.getElementById('task-time').value = t.time || '';
    document.getElementById('task-priority').value = t.priority || 'medium';
    document.getElementById('task-repeat').value = t.repeat || 'none';
    document.getElementById('task-note').value = t.note || '';
    document.getElementById('task-edit-id').value = editId;
    document.querySelectorAll('#task-cat-chips .cat-chip').forEach(b => b.classList.toggle('active', b.dataset.cat === t.category));
  }

  sheet.classList.add('active');
  document.getElementById('task-title').focus();
}

function selectTaskCat(el) {
  document.querySelectorAll('#task-cat-chips .cat-chip').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function closeTaskSheet() {
  document.getElementById('task-sheet').classList.remove('active');
}

function saveTask() {
  const title = document.getElementById('task-title').value.trim();
  if (!title) {
    document.getElementById('task-title').focus();
    document.getElementById('task-title').style.borderColor = 'var(--danger)';
    setTimeout(() => document.getElementById('task-title').style.borderColor = '', 1500);
    return;
  }
  const editId = document.getElementById('task-edit-id').value;
  const activeChip = document.querySelector('#task-cat-chips .cat-chip.active');
  const category = activeChip ? activeChip.dataset.cat : 'custom';
  const date = document.getElementById('task-date').value;
  const time = document.getElementById('task-time').value;
  const priority = document.getElementById('task-priority').value;
  const repeat = document.getElementById('task-repeat').value;
  const note = document.getElementById('task-note').value.trim();

  if (editId) {
    const t = tasks.find(x => x.id === editId);
    if (t) {
      t.title = title;
      t.category = category;
      t.date = date || new Date().toISOString().slice(0,10);
      t.time = time;
      t.priority = priority;
      t.repeat = repeat;
      t.note = note;
    }
  } else {
    tasks.push({ id: generateTaskId(), title, category, completed: false, date: date || new Date().toISOString().slice(0,10), time, priority, repeat, note, source: 'manual', completedDate: '' });
  }
  saveTasks();
  // Notify family
  if (typeof sendPushToFamily === 'function' && typeof taskTitle !== 'undefined' && taskTitle) {
    var pushAuthor = authUser ? (authUser.displayName || authUser.email || '👤') : t('Hosť','Guest');
    var pushText = taskTitle.length > 80 ? taskTitle.slice(0, 80) + '...' : taskTitle;
    sendPushToFamily('✅ ' + t('Nová úloha','New task'), pushAuthor + ': ' + pushText, 'tasks');
  }
  closeTaskSheet();
  renderTasks();
  renderTaskWidget();
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
      return `<div class="recipe-card" data-id="${r.id}"><button class="fav-btn ${r.favorite?'fav-active':''}" onclick="event.stopPropagation();toggleFav(${r.id})">${r.favorite?'❤️':'🤍'}</button>
        ${r.image||r.imageData?`<div class="recipe-card-img"><img src="${escAttr(r.imageData||r.image)}" alt="${san}" loading="lazy" style="width:100%;height:100%;object-fit:cover" onerror="this.outerHTML='<span style=\\'font-size:2.4rem\\'>🍽️</span>'"></div>`:`<div class="recipe-card-img">🍽️</div>`}
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

function showImportUrlModal() {
  const input = document.getElementById('import-url-input');
  if (input) input.value = '';
  setImportStatus('');
  openModal('import-url-modal');
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
    <button class="modal-close" onclick="document.getElementById('import-review-modal').remove()">✕</button>
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
  setImportStatus('⏳ Načítavam...');
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

// ======================== BACK BUTTON + HISTORY ========================
let _backPressTimer = 0;

function isAnyModalOpen() {
  return document.querySelector('.modal-overlay.active, #planner-picker.active, #login-overlay[style*="flex"], .sheet-overlay.active') !== null;
}

// =================== CUSTOM CONFIRM MODAL ===================
var _confirmCallback = null;
function showConfirmModal(msg, icon, okLabel, callback) {
  var modal = document.getElementById('confirm-modal');
  if (!modal) { if (callback) callback(); return; }
  document.getElementById('confirm-text').textContent = msg || (lang==='en'?'Are you sure?':'Naozaj chcete pokračovať?');
  document.getElementById('confirm-icon').textContent = icon || '⚠️';
  document.getElementById('confirm-ok-btn').textContent = okLabel || (lang==='en'?'Yes, delete':'Áno, vymazať');
  document.getElementById('confirm-ok-btn').style.background = okLabel === '💾 Uložiť' || okLabel === '✅ OK' ? 'var(--primary)' : 'var(--danger)';
  document.getElementById('confirm-cancel-btn').textContent = lang==='en'?'Cancel':'Zrušiť';
  _confirmCallback = callback;
  modal.style.display = 'flex';
  setTimeout(function() { modal.classList.add('active'); }, 10);
}
function closeConfirmModal() {
  var modal = document.getElementById('confirm-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(function() { modal.style.display = 'none'; _confirmCallback = null; }, 200);
}
function executeConfirm() {
  var cb = _confirmCallback;
  closeConfirmModal();
  if (cb) setTimeout(cb, 250);
}

function closeTopModal() {
  // Close any open modal/sheet/overlay
  const selectors = [
    '#ai-modal', '#ai-plan-modal',          // AI modals
    '#detail-modal.active',                  // Recipe detail
    '#cooking-overlay.active',               // Cooking mode
    '#import-url-modal.active',              // Import URL
    '#form-modal.active',                    // Recipe form
    '#planner-picker.active',                // Recipe picker
    '#shop-sheet.active',                    // Shop sheet
    '#task-sheet.active',                    // Task sheet
    '#board-form-modal',                     // Board form
    '#login-overlay'                         // Login (check inline style)
  ];
  for (const sel of selectors) {
    const el = document.getElementById(sel.replace(/\.active/, '')) || document.querySelector(sel);
    if (el) {
      const active = el.classList.contains('active') || (el.id === 'login-overlay' && el.style.display === 'flex');
      if (active) {
        if (typeof closeModal === 'function' && el.id.endsWith('-modal')) closeModal(el.id);
        else if (el.id === 'planner-picker') closePickerModal();
        else if (el.id === 'shop-sheet') closeShopSheet();
        else if (el.id === 'task-sheet') closeTaskSheet();
        else if (el.id === 'login-overlay') { el.style.display = 'none'; }
        else if (el.id === 'ai-modal' || el.id === 'ai-plan-modal') el.remove();
        else if (el.id === 'board-form-modal') el.remove();
        else el.classList.remove('active');
        return true; // Closed something
      }
    }
  }
  return false; // Nothing was open
}

window.addEventListener('popstate', function(e) {
  // First: close any open modal/detail/overlay
  if (closeTopModal()) {
    const currentTab = document.body.dataset.tab || 'dashboard';
    history.pushState({ tab: currentTab }, '', '#tab-' + currentTab);
    return;
  }

  if (e.state && e.state.tab) {
    window._skipHistory = true;
    switchTab(e.state.tab);
    // Always keep a history cushion so swipe-back doesn't exit
    if (history.length <= 2) {
      history.pushState({ tab: e.state.tab }, '', '#tab-' + e.state.tab);
    }
  } else {
    // On home — push replacement state instead of exiting immediately
    const now = Date.now();
    if (now - _backPressTimer < 2000) {
      history.go(-1);
    } else {
      _backPressTimer = now;
      showToast(t('Stlač ešte raz','Press again'),'info');
      history.pushState({ tab: 'dashboard' }, '', '#tab-dashboard');
    }
  }
});

// ======================== EDGE SWIPE BACK GESTURE ========================
(function() {
  let _edgeSwipeData = null;
  document.addEventListener('touchstart', function(e) {
    // Only edge swipe from left edge (< 40px from left)
    if (e.touches[0].clientX > 40) { _edgeSwipeData = null; return; }
    // Don't swipe on inputs or when a sheet is open
    if (e.target.closest('input, textarea, .sheet-overlay, .cooking-overlay')) { _edgeSwipeData = null; return; }
    _edgeSwipeData = { startX: e.touches[0].clientX, startY: e.touches[0].clientY };
    // Cancel tab swipe when edge swipe is active
    if (typeof _swipeTabData !== 'undefined') _swipeTabData = null;
  }, { passive: true });

  document.addEventListener('touchmove', function(e) {
    if (!_edgeSwipeData) return;
    const dx = e.touches[0].clientX - _edgeSwipeData.startX;
    const dy = Math.abs(e.touches[0].clientY - _edgeSwipeData.startY);
    // Horizontal swipe only, minimum ~20px to show indicator
    if (dx < 20 || dy > dx * 0.5) { _edgeSwipeData = null; return; }
    // Cancel tab swipe while edge swipe is active
    if (typeof _swipeTabData !== 'undefined') _swipeTabData = null;
    // Visual hint: show a subtle edge glow when swiping
    if (!document.getElementById('edge-swipe-indicator')) {
      const ind = document.createElement('div');
      ind.id = 'edge-swipe-indicator';
      ind.style.cssText = 'position:fixed;left:0;top:0;bottom:0;width:4px;background:var(--primary);z-index:99998;opacity:0;transition:opacity .15s;border-radius:0 4px 4px 0;';
      document.body.appendChild(ind);
    }
    const opacity = Math.min(1, (dx - 20) / 120);
    document.getElementById('edge-swipe-indicator').style.opacity = opacity;
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchend', function(e) {
    if (!_edgeSwipeData) return;
    const dx = e.changedTouches[0].clientX - _edgeSwipeData.startX;
    const dy = Math.abs(e.changedTouches[0].clientY - _edgeSwipeData.startY);
    const indicator = document.getElementById('edge-swipe-indicator');
    if (indicator) { indicator.style.opacity = '0'; setTimeout(function() { if (indicator.parentNode) indicator.remove(); }, 300); }
    if (dx < 80 || dy > dx * 0.6) { _edgeSwipeData = null; return; }
    _edgeSwipeData = null;
    // Cancel any tab swipe
    if (typeof _swipeTabData !== 'undefined') _swipeTabData = null;
    // Edge swipe detected — go back
    if (closeTopModal()) {
      // Modal was closed, don't also navigate
    } else {
      history.back();
    }
  }, { passive: true });
})();

// Ensure we always have at least 2 history entries on page load
if (history.length <= 1) {
  history.pushState({ tab: 'dashboard' }, '', '#tab-dashboard');
}

// Global error handler
window.addEventListener('error', function(evt) {
  var el = document.getElementById('boot-status');
  if (el) { el.style.display = 'block'; el.style.background = 'rgba(200,0,0,.92)'; el.textContent = '❌ CHYBA: ' + (evt.message || evt.error || ''); }
});

// ======================== INIT ========================
(function showBootInfo() {
  var el = document.getElementById('boot-status');
  if (!el) return;
  el.style.display = 'none';
  try {
    var r = JSON.parse(localStorage.getItem('recipes')||'null');
    var rc = (r && Array.isArray(r) && r.length) ? r.length : 0;
    var fc = localStorage.getItem('familyCode') || '';
    el.textContent = '⚡ ' + rc + ' receptov | ' + (fc?'rodina: '+fc:'bez rodiny');
  } catch(e) {
    el.textContent = '';
  }
})();

document.getElementById('recipe-grid').addEventListener('click', function(e) {
  const card = e.target.closest('.recipe-card');
  if (card) {
    const id = parseInt(card.dataset.id);
    if (!isNaN(id)) viewRecipe(id);
  }
});
try { applyLang(); } catch(e) {}
try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch(e) {}
const initialHashTab = (location.hash || '').replace(/^#tab-/, '').replace('#', '');
const validInitialTabs = new Set(['dashboard', 'planner', 'home', 'shopping', 'tasks', 'board']);
const initialTab = validInitialTabs.has(initialHashTab) ? initialHashTab : (localStorage.getItem('lastTab') || 'dashboard');
document.body.dataset.tab = initialTab;
switchTab(initialTab);
setTimeout(function() {
  try {
    document.body.classList.remove('header-collapsed');
    window.scrollTo(0, 0);
  } catch(e) {}
}, 0);

render();
showTipOfDay();

// Background image fetch for Pexels – fetches any still-missing images
batchFetchImages().then(() => { render(); renderDashboard(); showTipOfDay(); });

// Register service worker for PWA — user-controlled update handoff
let _refreshingForUpdate = false;

function showServiceWorkerUpdateBanner(worker) {
  if (!worker) return;
  const oldBanner = document.getElementById('sw-update-banner');
  if (oldBanner) oldBanner.remove();

  const banner = document.createElement('div');
  banner.id = 'sw-update-banner';
  banner.className = 'sw-update-banner';
  banner.innerHTML =
    '<div class="sw-update-copy"><strong>✨ ' + t('Nová verzia je pripravená','New version is ready') + '</strong>' +
    '<span>' + t('Aktualizuj aplikáciu bez čakania na reštart.','Refresh the app without waiting for a restart.') + '</span></div>' +
    '<button type="button" id="sw-update-btn">' + t('Aktualizovať','Update') + '</button>';
  document.body.appendChild(banner);

  const btn = document.getElementById('sw-update-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      btn.disabled = true;
      btn.textContent = t('Aktualizujem…','Updating…');
      worker.postMessage({ type: 'SKIP_WAITING' });
      worker.postMessage('skipWaiting');
    });
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (_refreshingForUpdate) return;
    _refreshingForUpdate = true;
    window.location.reload();
  });

  navigator.serviceWorker.register('sw.js?v=' + APP_VERSION).then(reg => {
    if (reg.waiting && navigator.serviceWorker.controller) showServiceWorkerUpdateBanner(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const newSW = reg.installing;
      if (newSW) newSW.addEventListener('statechange', () => {
        if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
          showServiceWorkerUpdateBanner(newSW);
        }
      });
    });
  }).catch(() => {});
}

// ======================== NOTIFICATIONS ========================
const NOTIF_MESSAGES = {
  breakfastReminder: { sk: ['Raňajky 🌅', 'Čas na raňajky! Čo si dáš dobré?'], en: ['Breakfast time 🌅', 'Time for breakfast! What\'s cooking?'] },
  todayCookingReminder: { sk: ['Čo uvariť dnes? 🍳', 'Pozri si návrhy na dnešné jedlá.'], en: ['What to cook today? 🍳', 'Check your meal suggestions.'] },
  shoppingReminder: { sk: ['Nákup 🛒', 'Nezabudni, že máš nákupný zoznam.'], en: ['Shopping 🛒', 'Don\'t forget your shopping list.'] },
  hydrationReminder: { sk: ['Pitný režim 💧', 'Nezabudni piť vodu!'], en: ['Stay hydrated 💧', 'Remember to drink water!'] },
  childMealReminder: { sk: ['Jedlo pre dieťa 👶', 'Je čas pripraviť jedlo pre malého.'], en: ['Kid\'s meal 👶', 'Time to prep a meal for the little one.'] },
  eveningPlanningReminder: { sk: ['Zajtrajší plán 🌙', 'Naplánuj si jedlá na zajtra.'], en: ['Plan tomorrow 🌙', 'Take a minute to plan tomorrow\'s meals.'] },
};

let notifInterval = null;
let notifFiredToday = {};
try { notifFiredToday = JSON.parse(localStorage.getItem('notifFired') || '{}'); } catch(e) { notifFiredToday = {}; }

function showSyncToast(key) {
  var labels = { mealPlan: (lang==='en'?'Meal plan':'Jed\u00e1lni\u010dek'), mealPlanKids: (lang==='en'?'Kids plan':'Detsk\u00fd pl\u00e1n'), shoppingItems: (lang==='en'?'Shopping list':'N\u00e1kupn\u00fd zoznam'), tasks: (lang==='en'?'Tasks':'\u00dalohy'), planType: (lang==='en'?'Plan type':'Typ pl\u00e1nu'), recipes: (lang==='en'?'Recipes':'Recepty') };
  var name = labels[key] || key;
  var d = document.createElement('div');
  d.style.cssText = 'position:fixed;bottom:80px;left:10px;background:var(--primary);color:#fff;padding:6px 14px;border-radius:10px;font-size:.7rem;font-weight:600;z-index:9999;animation:fadeInUp .3s ease;';
  d.textContent = '\u2b07\ufe0f ' + name + ' ' + (lang==='en'?'synced':'synchronizovan\u00e9');
  document.body.appendChild(d);
  setTimeout(function() { d.style.opacity = '0'; d.style.transition = 'opacity .5s'; setTimeout(function() { d.remove(); }, 500); }, 2000);
}

function reloadFromLocalStorage(key, data) {
  try {
    if (key === 'mealPlan') { mealPlan = JSON.parse(JSON.stringify(data)); renderPlanner(); }
    else if (key === 'mealPlanKids') { mealPlanKids = JSON.parse(JSON.stringify(data)); }
    else if (key === 'shoppingItems') { loadShopItems(); renderShoppingList(); }
    else if (key === 'tasks') { tasks = Array.isArray(data) ? data.slice() : []; renderTasks(); }
    else if (key === 'planType') { planType = data; renderPlanner(); }
    else if (key === 'recipes') { var rd = JSON.parse(JSON.stringify(data)); if (Array.isArray(rd) && rd.length) recipes = rd; else if (!Array.isArray(rd) || !rd.length) { /* don't overwrite */ } }
  } catch(e) {}
}

function saveNotifFired() {
  localStorage.setItem('notifFired', JSON.stringify(notifFiredToday));
}

function requestNotifPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }
}



function pushNotifSetup() {
  if (!('Notification' in window)) { showToast(t('Notifikácie nie sú podporované','Notifications not supported'),'error'); return; }
  if (Notification.permission === 'granted') {
    registerPushSubscription().then(function(sub) {
      if (sub) showToast(t('✅ Notifikácie už sú povolené','✅ Notifications already enabled'),'success');
    });
    return;
  }
  Notification.requestPermission().then(function(perm) {
    if (perm === 'granted') {
      registerPushSubscription().then(function(sub) {
        if (sub) showToast(t('✅ Notifikácie povolené','✅ Notifications enabled'),'success');
      });
    } else {
      showToast(t('❌ Notifikácie zamietnuté','❌ Notifications denied'),'error');
    }
  }).catch(function(e) {
    showToast(t('❌ Chyba: ','❌ Error: ')+e.message,'error');
  });
}

function initNotifications() {
  if (!('Notification' in window)) return;
  if (notifInterval) { clearInterval(notifInterval); notifInterval = null; }
  const anyEnabled = Object.values(appSettings.notifications).some(v => v);
  if (!anyEnabled) return;
  requestNotifPermission();
  notifInterval = setInterval(checkAndFireNotifications, 60000); // check every 60s
  checkAndFireNotifications(); // immediate first check
}

function checkAndFireNotifications() {
  if (Notification.permission !== 'granted') return;
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const hhmm = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

  const mapping = [
    { key: 'breakfastReminder', timeKey: 'breakfast' },
    { key: 'todayCookingReminder', timeKey: 'whatCook' },
    { key: 'shoppingReminder', timeKey: 'shopping' },
    { key: 'hydrationReminder', timeKey: 'water' },
    { key: 'childMealReminder', timeKey: 'kids' },
    { key: 'eveningPlanningReminder', timeKey: 'evening' },
  ];

  // Reset fired state if new day
  Object.keys(notifFiredToday).forEach(k => {
    if (notifFiredToday[k] !== today) delete notifFiredToday[k];
  });

  for (const m of mapping) {
    if (!appSettings.notifications[m.key]) continue;
    if (notifFiredToday[m.key] === today) continue;
    const target = appSettings.notifTimes[m.timeKey];
    if (target !== hhmm) continue;
    // Fire!
    const msg = NOTIF_MESSAGES[m.key];
    const l = appSettings.lang === 'en' ? 'en' : 'sk';
    try {
      new Notification(msg[l][0], { body: msg[l][1], icon: '/icon-192.png', badge: '/icon-192.png' });
    } catch(e) { /* ignore */ }
    notifFiredToday[m.key] = today;
    saveNotifFired();
  }
}

// ======================== WEATHER ========================
let weatherCache = null;
let weatherCacheTs = 0;

async function fetchWeatherCoords(city) {
  try {
    const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=${appSettings.lang}`);
    const data = await r.json();
    if (data.results && data.results.length) {
      const loc = data.results[0];
      appSettings.weather.lat = loc.latitude;
      appSettings.weather.lon = loc.longitude;
      appSettings.weather.location = loc.name + (loc.country ? ', ' + loc.country : '');
      saveSettings();
      return { lat: loc.latitude, lon: loc.longitude, name: appSettings.weather.location };
    }
  } catch(e) { /* ignore */ }
  return null;
}

async function fetchWeatherData() {
  const loc = appSettings.weather.location;
  if (!loc) return null;

  // Cache for 30 minutes
  if (weatherCache && (Date.now() - weatherCacheTs) < 30 * 60 * 1000) return weatherCache;

  try {
    let lat = appSettings.weather.lat;
    let lon = appSettings.weather.lon;
    if (!lat || !lon) {
      const coords = await fetchWeatherCoords(loc);
      if (!coords) return null;
      lat = coords.lat;
      lon = coords.lon;
    }
    const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const data = await r.json();
    if (data.current_weather) {
      weatherCache = data.current_weather;
      weatherCacheTs = Date.now();
      return weatherCache;
    }
  } catch(e) { /* ignore */ }
  return null;
}

const WEATHER_CODES = {
  0:  { icon: '☀️', labelSk: 'Jasno', labelEn: 'Clear' },
  1:  { icon: '🌤️', labelSk: 'Polooblačno', labelEn: 'Partly cloudy' },
  2:  { icon: '⛅', labelSk: 'Oblačno', labelEn: 'Cloudy' },
  3:  { icon: '☁️', labelSk: 'Zamračené', labelEn: 'Overcast' },
  45: { icon: '🌫️', labelSk: 'Hmla', labelEn: 'Fog' },
  51: { icon: '🌦️', labelSk: 'Mrholenie', labelEn: 'Drizzle' },
  61: { icon: '🌧️', labelSk: 'Dážď', labelEn: 'Rain' },
  71: { icon: '🌨️', labelSk: 'Sneženie', labelEn: 'Snow' },
  80: { icon: '🌧️', labelSk: 'Prehánky', labelEn: 'Showers' },
  95: { icon: '⛈️', labelSk: 'Búrka', labelEn: 'Thunderstorm' },
};

function getWeatherIcon(code) {
  const w = WEATHER_CODES[code] || { icon: '🌡️', labelSk: '?', labelEn: '?' };
  const l = appSettings.lang === 'en' ? 'en' : 'sk';
  return { icon: w.icon, label: l === 'en' ? w.labelEn : w.labelSk };
}

async function updateWeatherWidget() {
  const widgetEl = document.getElementById('weather-widget');
  if (!widgetEl) return;
  const w = await fetchWeatherData();
  const locLabel = appSettings.weather.location || (appSettings.lang === 'en' ? 'Unknown' : 'Neznáme');
  if (w) {
    const wi = getWeatherIcon(w.weathercode);
    widgetEl.innerHTML = `<div class="weather-orb">${wi.icon}</div>
      <div class="weather-copy">
        <span class="weather-label">${appSettings.lang==='en'?'Weather':'Počasie'}</span>
        <strong>${esc(locLabel)}</strong>
        <span class="weather-temp-main">${w.temperature}°C</span>
        <span class="weather-temp">${wi.label}</span>
      </div>
      <span class="weather-cta" onclick="event.stopPropagation();openMorePageFromAnywhere('home-settings')">${appSettings.lang==='en'?'Edit':'Upraviť'} ›</span>`;
    widgetEl.classList.remove('weather-fallback');
  } else {
    widgetEl.innerHTML = `<div class="weather-orb">🌡️</div>
      <div class="weather-copy">
        <span class="weather-label">${appSettings.lang==='en'?'Weather':'Počasie'}</span>
        <strong>${esc(locLabel)}</strong>
        <span class="weather-temp-main">—°C</span>
        <span class="weather-temp">${appSettings.lang==='en'?'Set city for forecast':'Nastav mesto pre predpoveď'}</span>
      </div>
      <span class="weather-cta" onclick="event.stopPropagation();openMorePageFromAnywhere('home-settings')">${appSettings.lang==='en'?'Set':'Nastaviť'} ›</span>`;
    widgetEl.classList.add('weather-fallback');
  }
}

// Init notifications on load
try { initNotifications(); } catch(e) {}

// Firebase sync hooks — always active, they check familyCode internally
(function hookFirebaseSync() {
  const _origSSI = saveShopItems;
  const _origSWP = saveWeekPlan;
  const _origST = saveTasks;
  const _origSLS = saveToLS;
  saveShopItems = function() { try { _origSSI(); } catch(e) {}; if (familyCode) try { pushToFirebase('shoppingItems','shoppingItems'); } catch(e) {} };
  saveWeekPlan = function() { try { _origSWP(); } catch(e) {}; if (familyCode) try { pushToFirebase('mealPlan','mealPlan'); pushToFirebase('mealPlanKids','mealPlanKids'); } catch(e) {} };
  saveTasks = function() { try { _origST(); } catch(e) {}; if (familyCode) try { pushToFirebase('tasks','tasks'); } catch(e) {} };
  saveToLS = function() { try { _origSLS(); } catch(e) {}; if (familyCode) try { pushToFirebase('recipes','recipes'); } catch(e) {} };
})();

setTimeout(() => {
  if (familyCode && firebaseReady) updateSyncIndicator();
}, 2000);

// Init weather fetch when dashboard renders with weather enabled
const _origRenderDashboard = renderDashboard;
renderDashboard = function() {
  try { _origRenderDashboard(); } catch(e) {}
  if (appSettings.homeWidgets && appSettings.homeWidgets.weather) {
    try { setTimeout(() => updateWeatherWidget(), 500); } catch(e) {}
  }
};



// ======================== CLOSE MODAL ON OUTSIDE CLICK ========================
document.addEventListener('click', function(e) {
  var modal = e.target.closest('.modal-overlay.active, #confirm-modal');
  if (modal && e.target === modal) {
    // Clicked on overlay background, close it
    var closeBtn = modal.querySelector('.modal-close, .sheet-close');
    if (closeBtn) closeBtn.click();
    else { modal.classList.remove('active'); setTimeout(function() { modal.style.display = 'none'; }, 200); }
  }
});

// ======================== TOAST NOTIFICATIONS ========================
function showToast(msg, type, duration) {
  type = type || 'info';
  duration = duration || 3000;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type + ' toast-stacked';
  toast.innerHTML = '<span class="toast-icon">' + (icons[type] || 'ℹ️') + '</span><span class="toast-text">' + msg + '</span>';
  // Stack positioning - shift existing toasts up
  var existing = container.querySelectorAll('.toast');
  existing.forEach(function(t) {
    t.style.transform = 'translateY(-' + (existing.length * 6) + 'px)';
    t.style.opacity = Math.max(0.3, 1 - existing.length * 0.12);
  });
  container.appendChild(toast);
  setTimeout(function() {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(function() {
      toast.remove();
      // Restore remaining toasts
      container.querySelectorAll('.toast').forEach(function(t, i) {
        t.style.transform = '';
        t.style.opacity = '';
      });
    }, 300);
  }, duration);
}

function showUndoToast(msg, undoFn, duration) {
  duration = duration || 5000;
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  let used = false;
  const toast = document.createElement('div');
  toast.className = 'toast toast-info toast-stacked toast-undo';
  toast.innerHTML = '<span class="toast-icon">↩️</span><span class="toast-text">' + esc(msg) + '</span><button class="toast-action">' + (lang === 'en' ? 'Undo' : 'Späť') + '</button>';
  const action = toast.querySelector('.toast-action');
  if (action) {
    action.onclick = function(e) {
      e.stopPropagation();
      if (used) return;
      used = true;
      try { undoFn && undoFn(); } catch(err) { console.error('Undo failed:', err); }
      toast.remove();
    };
  }
  container.appendChild(toast);
  setTimeout(function() {
    if (used || !toast.parentNode) return;
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(function() { toast.remove(); }, 300);
  }, duration);
}

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

// =================== GLOBAL ERROR HANDLER ===================
window.onerror = function(msg, url, line, col, err) {
  var el = document.getElementById('boot-status');
  if (el) {
    el.style.display = 'block';
    el.style.background = 'rgba(220,38,38,.9)';
    el.textContent = '⚠️ Chyba: ' + (msg || '').slice(0,80);
    setTimeout(function() { el.style.display = 'none'; }, 5000);
  }
  console.error('GLOBAL:', msg, url, line);
};
window.addEventListener('unhandledrejection', function(e) {
  console.warn('Unhandled promise rejection:', e.reason);
  e.preventDefault();
});

// =================== PREVENT CONTEXT MENU ===================
document.addEventListener('contextmenu', function(e) {
  // Allow context menu on input/textarea
  if (e.target.closest && !e.target.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
    haptic(6);
  }
});
document.addEventListener('selectstart', function(e) {
  if (e.target.closest && !e.target.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
  }
});

// =================== HAPTIC FEEDBACK ===================
function haptic(ms) {
  try {
    if (!navigator.vibrate) return;
    if (navigator.userActivation && !navigator.userActivation.isActive) return;
    navigator.vibrate(ms || 8);
  } catch(_) {}
}

// =================== CONFETTI ===================
function triggerConfetti() {
  try {
    var colors = ['#10b981','#34d399','#06b6d4','#f59e0b','#a78bfa','#f472b6','#ef4444'];
    for (var i = 0; i < 30; i++) {
      var c = document.createElement('div');
      c.style.cssText = 'position:fixed;width:6px;height:6px;border-radius:2px;z-index:99999;pointer-events:none;' +
        'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
        'left:' + (Math.random() * 100) + 'vw;' +
        'top:-10px;' +
        'opacity:' + (.6 + Math.random() * .4) + ';' +
        'transform:rotate(' + (Math.random() * 360) + 'deg);';
      document.body.appendChild(c);
      var x = parseFloat(c.style.left);
      var drift = (Math.random() - .5) * 100;
      var fall = 300 + Math.random() * 400;
      var rot = 360 + Math.random() * 720;
      c.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(' + fall + 'px) translateX(' + drift + 'px) rotate(' + rot + 'deg)', opacity: 0 }
      ], { duration: 1200 + Math.random() * 800, easing: 'cubic-bezier(.25,.46,.45,.94)', fill: 'forwards' });
      setTimeout(function() { c.remove(); }, 2500);
    }
  } catch(_) {}
}

// =================== BUTTON TOUCH RIPPLE ===================

function __confirmDemo() {
  showConfirmModal(
    (lang==='en'?'Reset to demo recipes? All existing recipes will be lost.':'Naozaj obnoviť demo recepty? Všetky existujúce sa stratia.'),
    '⚠️', lang==='en'?'Reset':'Obnoviť',
    function() { resetRecipes(); }
  );
}
function __confirmDeleteAll() {
  showConfirmModal(
    (lang==='en'?'Delete all data? This cannot be undone.':'Naozaj vymazať všetky dáta? Táto akcia je nenávratná.'),
    '☢️', lang==='en'?'Delete all':'Vymazať všetko',
    function() { deleteAllData(); }
  );
}

function addRipple(e, el) {
  try {
    var btn = el || e.currentTarget;
    if (!btn || typeof btn.getBoundingClientRect !== 'function') return;
    var rect = btn.getBoundingClientRect();
    var ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    var size = Math.max(rect.width, rect.height) * 1.5;
    var cx = (e.clientX || rect.left + rect.width/2) - rect.left;
    var cy = (e.clientY || rect.top + rect.height/2) - rect.top;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (cx - size/2) + 'px';
    ripple.style.top = (cy - size/2) + 'px';
    btn.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 500);
  } catch(_) { /* silent */ }
}
document.addEventListener('click', function(e) {
  try {
    var target = e.target;
    if (!target || !target.closest) return;
    var btn = target.closest('.btn, .nav-item, .age-btn, .pln-btn, .plan-type-btn, .pa-btn, .shop-add-btn, .fab-trigger, .hero-btn');
    if (btn && !btn.closest('.bottom-nav')) addRipple(e, btn);
  } catch(_) {}
}, { passive: true });
