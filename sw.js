const CACHE = 'mealnest-v1';
const STATIC = ['manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Delete ALL old caches (including previous receptar-v*)
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Network-first for HTML — always get latest
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  // Network-first for images — never serve stale recipe photos
  if (e.request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg)/i)) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for other static assets (CSS, JS, fonts)
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// Notify clients when an update is available
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});
