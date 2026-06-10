var CACHE = 'mealnest-v11';
var PRECACHE = [
  'recipes-default.json',
  'manifest.json',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
  'icon-180.png',
  'icon-48.png'
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
