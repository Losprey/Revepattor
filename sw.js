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

var CACHE = 'mealnest-v76';
const appShell = new URL('index.html', self.registration.scope).href;
const PRECACHE = [
  appShell,
  'dist/app.min.js?v=14',
  'dist/styles.min.css?v=14',
  'recipes-default.json',
  'images/recipes/93.jpg',
  'images/recipes/95.jpg',
  'images/recipes/99.jpg',
  'images/recipes/puree-illustration.jpg',
  'manifest.json',
  'icon.svg',
  'family-dinner-hero.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(PRECACHE)));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith('mealnest-v') && key !== CACHE)
      .map(key => caches.delete(key))
  )).then(() => clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || !request.url.startsWith(self.registration.scope)) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(async () => {
      const cache = await caches.open(CACHE);
      return await cache.match(appShell) || Response.error();
    }));
    return;
  }

  if (!PRECACHE.some(path => new URL(path, self.registration.scope).href === request.url)) return;
  event.respondWith(caches.open(CACHE).then(async cache =>
    await cache.match(request) || fetch(request)
  ));
});
