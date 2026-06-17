// ======================== PUSH NOTIFICATIONS ========================
self.addEventListener('push', function(e) {
  if (!e.data) return;
  var data;
  try { data = JSON.parse(e.data.text()); } catch(ex) { data = { title: 'Mealnest', body: e.data.text() }; }
  var opts = {
    title: data.title || 'Mealnest',
    body: data.body || '',
    icon: '/icon-192.png',
    badge: '/icon-48.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/', tab: data.tab || 'dashboard' },
    tag: data.tag || 'mealnest-default',
    renotify: true,
    requireInteraction: true
  };
  e.waitUntil(self.registration.showNotification(opts.title, opts));
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  var target = e.notification.data && e.notification.data.url ? e.notification.data.url : '/';
  var tab = e.notification.data && e.notification.data.tab ? e.notification.data.tab : 'dashboard';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.indexOf(self.location.origin) === 0 && 'focus' in client) {
          client.postMessage({ action: 'switchTab', tab: tab });
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(target + '#' + tab);
    })
  );
});

// Handle message from client to switch tab / activate update
self.addEventListener('message', function(e) {
  if (e.data === 'skipWaiting' || (e.data && e.data.type === 'SKIP_WAITING')) {
    self.skipWaiting();
    return;
  }

  if (e.data && e.data.action === 'switchTab' && e.data.tab) {
    clients.matchAll({ type: 'window' }).then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({ action: 'switchTab', tab: e.data.tab });
      });
    });
  }
});

var CACHE = 'mealnest-v58';
var PRECACHE = [
  'recipes-default.json',
  'manifest.json',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
  'icon-180.png',
  'icon-48.png',
  'family-dinner-hero.png'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(PRECACHE);
    }).catch(function(err) {
      // Non-critical: skip if offline during first install
      console.log('SW precache partial:', err.message);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    })
  );
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Network-first for HTML
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Network-first for ALL images (pexels, placehold.co, remote recipe images)
  if (e.request.destination === 'image' || /\.(png|jpg|jpeg|gif|webp|svg|ico)/i.test(url.pathname)) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Stale-while-revalidate for local assets (icons, manifest)
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
