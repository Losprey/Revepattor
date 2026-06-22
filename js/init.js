// Mealnest — App initialization + routing
// ==========================================

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
const validInitialTabs = new Set(['dashboard', 'planner', 'home', 'shopping', 'tasks', 'board', 'family']);
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

