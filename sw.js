/**
 * Mealnest Service Worker - Caching + Push notifikácie
 */
const CACHE = 'mealnest-v8';

// === INSTALL ===
self.addEventListener('install', e => {
  self.skipWaiting();
});

// === ACTIVATE ===
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  e.waitUntil(clients.claim());
});

// === FETCH ===
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Network-first for HTML
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Network-first for ALL images
  if (e.request.destination === 'image' || /\.(png|jpg|jpeg|gif|webp|svg|ico)/i.test(url.pathname)) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Stale-while-revalidate for local assets
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(cached => {
        const fetched = fetch(e.request).then(response => {
          cache.put(e.request, response.clone());
          return response;
        }).catch(() => cached);
        return cached || fetched;
      })
    )
  );
});

// === PUSH (fallback pre priame push notifikácie) ===
self.addEventListener('push', function(e) {
  let data = {};
  try {
    data = e.data ? e.data.json() : {};
  } catch(err) {
    console.warn('[sw.js] Invalid push data:', err);
    return;
  }

  const title = data.title || 'Mealnest';
  const options = {
    body: data.body || '',
    icon: data.icon || '/Revepattor/icon-192.png',
    badge: '/Revepattor/icon-96.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'mealnest-push',
    data: data.data || { url: '/Revepattor/' },
    requireInteraction: true,
    silent: false
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

// === NOTIFICATION CLICK ===
self.addEventListener('notificationclick', function(e) {
  e.notification.close();

  const data = e.notification.data || {};
  const url = data.url || '/Revepattor/';

  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      for (let client of clients) {
        if (client.url.includes('/Revepattor/') && 'focus' in client) {
          client.postMessage({ type: 'NOTIFICATION_CLICK', data });
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});

// === MESSAGE FROM APP (napr. nastavenie badge) ===
self.addEventListener('message', function(e) {
  if (!e.data) return;

  const d = e.data;

  // Nastavenie badge (odznak na ikonke)
  if (d.type === 'SET_BADGE' && navigator.setAppBadge) {
    navigator.setAppBadge(d.count || 0);
  }

  // Aktualizácia badge počtu (inkrement)
  if (d.type === 'INC_BADGE' && navigator.setAppBadge) {
    navigator.setAppBadge(d.count || 1);
  }

  // Vyčistenie badge
  if (d.type === 'CLEAR_BADGE') {
    if (navigator.clearAppBadge) {
      navigator.clearAppBadge();
    } else if (navigator.setAppBadge) {
      navigator.setAppBadge(0);
    }
  }
});

// === BACKGROUND SYNC ===
self.addEventListener('sync', function(e) {
  console.log('[sw.js] Background sync event:', e.tag);

  if (e.tag === 'sync-tasks') {
    e.waitUntil(syncPendingTasks());
  }

  if (e.tag === 'sync-shopping') {
    e.waitUntil(syncPendingShopping());
  }
});

async function syncPendingTasks() {
  // Notifikovať appku že môže dobehnúť dáta z Firebase
  const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const client of allClients) {
    client.postMessage({ type: 'SYNC_TASKS' });
  }
}

async function syncPendingShopping() {
  const allClients = await clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const client of allClients) {
    client.postMessage({ type: 'SYNC_SHOPPING' });
  }
}
