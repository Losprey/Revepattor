// Mealnest — Notifications + weather
// ==========================================

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



