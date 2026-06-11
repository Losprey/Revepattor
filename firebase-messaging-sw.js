/**
 * Firebase Cloud Messaging Service Worker
 * Tento service worker spracúva prichádzajúce push notifikácie
 * a zobrazuje ich aj keď je appka zatvorená.
 */
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBGAgGCz6Ff_WElerrHHqZnT65N7CVTQJQ",
  authDomain: "receptar2.firebaseapp.com",
  databaseURL: "https://receptar2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "receptar2",
  storageBucket: "receptar2.firebasestorage.app",
  messagingSenderId: "852171374029",
  appId: "1:852171374029:web:749029919ce35d9eab9884"
});

const messaging = firebase.messaging();

// Firebase automaticky spracúva background push notifikácie
// a zobrazuje ich cez Notification API.
// Tento handler sa volá keď notifikácia príde na pozadí
// (appka zatvorená / minimalizovaná)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Background message:', payload);

  const data = payload.data || {};
  const notificationTitle = data.title || payload.notification?.title || 'Mealnest';
  const notificationOptions = {
    body: data.body || payload.notification?.body || '',
    icon: data.icon || '/Revepattor/icon-192.png',
    badge: '/Revepattor/icon-96.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'mealnest-default',
    data: {
      url: data.url || '/Revepattor/',
      click_action: data.click_action || 'open_app',
      ...data
    },
    requireInteraction: true,
    silent: false
  };

  // Skúsime nastaviť badge (odznak na ikonke)
  if (navigator.setAppBadge && data.badgeCount) {
    navigator.setAppBadge(parseInt(data.badgeCount) || 0);
  }

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Kliknutie na notifikáciu - otvorí appku na správnej stránke
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click:', event.notification);

  event.notification.close();

  const data = event.notification.data || {};
  const urlToOpen = data.url || '/Revepattor/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // Ak už je appka otvorená, prepni na ňu
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url.includes('/Revepattor/') && 'focus' in client) {
          return client.focus().then(function(c) {
            // Pošli správu appke o kliknutí
            c.postMessage({
              type: 'NOTIFICATION_CLICK',
              data: data
            });
            return c;
          });
        }
      }
      // Inak otvor nové okno
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
