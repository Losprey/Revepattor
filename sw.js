importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

const CACHE = 'mealnest-v5';

firebase.initializeApp({
  apiKey: "AIzaSyBGAgGCz6Ff_WElerrHHqZnT65N7CVTQJQ",
  authDomain: "receptar2.firebaseapp.com",
  databaseURL: "https://receptar2-default-rtdb.firebaseio.com",
  projectId: "receptar2",
  storageBucket: "receptar2.firebasestorage.app",
  messagingSenderId: "852171374029",
  appId: "1:852171374029:web:749029919ce35d9eab9884"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { title, body, icon } = payload.notification || payload.data || {};
  self.registration.showNotification(title || 'Mealnest', {
    body: body || '',
    icon: icon || 'icon-192.png',
    badge: 'icon-192.png',
  });
});

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
  );
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  if (e.request.destination === 'image' || /\.(png|jpg|jpeg|gif|webp|svg|ico)/i.test(url.pathname)) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).catch(() => caches.match(e.request))
    );
    return;
  }

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
