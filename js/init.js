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
const sharedRecipeStorageKey = 'pendingSharedRecipe';
let pendingSharedRecipe = null;

function getSharedRecipeUrl(params) {
  for (const field of ['shared_url', 'shared_text', 'shared_title']) {
    const value = params.get(field) || '';
    const candidate = value.trim().match(/^https?:\/\/\S+$/i)?.[0] ||
      value.match(/https?:\/\/[^\s<>"']+/i)?.[0]?.replace(/[.,;!?]+$/, '');
    if (!candidate || candidate.length > 4096) continue;
    try {
      const url = new URL(candidate);
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) continue;
      if (url.origin === location.origin || /^(?:localhost|127\.|\[::1\])/i.test(url.hostname)) continue;
      return url.href;
    } catch (error) {}
  }
  return '';
}

function captureSharedRecipe() {
  const locationUrl = new URL(location.href);
  const shareFields = ['shared_url', 'shared_text', 'shared_title'];
  if (!shareFields.some(field => locationUrl.searchParams.has(field))) {
    try { pendingSharedRecipe = JSON.parse(sessionStorage.getItem(sharedRecipeStorageKey) || 'null'); } catch (error) {}
    return;
  }

  pendingSharedRecipe = { url: getSharedRecipeUrl(locationUrl.searchParams) };
  try { sessionStorage.setItem(sharedRecipeStorageKey, JSON.stringify(pendingSharedRecipe)); } catch (error) {}
  for (const key of shareFields) locationUrl.searchParams.delete(key);
  history.replaceState(history.state, '', locationUrl);
}

function openPendingSharedRecipe() {
  if (!pendingSharedRecipe) return;
  if (authLoading && typeof firebase !== 'undefined') return;
  if (document.getElementById('login-overlay').style.display === 'flex' ||
      document.getElementById('onboarding-overlay')) return;

  const { url } = pendingSharedRecipe;
  pendingSharedRecipe = null;
  try { sessionStorage.removeItem(sharedRecipeStorageKey); } catch (error) {}
  if (!url) {
    showToast(t('V zdieľaní sa nenašiel odkaz na recept.', 'No recipe link was found in the share.'), 'warning');
    return;
  }

  switchTab('home');
  showImportUrlModal(false);
  document.getElementById('import-url-input').value = url;
  validateImportUrl();
  importFromUrl();
}

captureSharedRecipe();
try { applyLang(); } catch(e) {}
try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch(e) {}
const initialHashTab = (location.hash || '').replace(/^#tab-/, '').replace('#', '');
const validInitialTabs = new Set(['dashboard', 'planner', 'home', 'shopping', 'tasks', 'board', 'family']);
const initialTab = validInitialTabs.has(initialHashTab) ? initialHashTab : (localStorage.getItem('lastTab') || 'dashboard');
document.body.dataset.tab = initialTab;
switchTab(initialTab);
render();
showTipOfDay();
setTimeout(openPendingSharedRecipe, 350);

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

