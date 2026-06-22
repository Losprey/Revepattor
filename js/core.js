// Mealnest — Auth, Firebase, Sync, Theme
// ==========================================

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

