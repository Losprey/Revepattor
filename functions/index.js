/**
 * Mealnest — Firebase Cloud Function pre push notifikácie
 * 
 * Táto funkcia sleduje Firebase Realtime Database a keď sa objaví
 * nový záznam v pushNotifications/ (napr. z app.js notify* funkcií),
 * pošle push notifikáciu všetkým členom rodiny.
 * 
 * DEPLOY:
 * 1. nainštaluj firebase-tools: npm install -g firebase-tools
 * 2. prihlás sa: firebase login
 * 3. inicializuj: firebase init functions (vyber JavaScript)
 * 4. skopíruj tento súbor do functions/index.js
 * 5. deploy: firebase deploy --only functions
 * 
 * POZN: Pre funkčnosť musí mať Firebase projekt aktivovaný
 * Blaze (platený) plán, alebo využiť Spark (free) kvóty.
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * Sleduje nové záznamy v /families/{familyCode}/pushNotifications/
 * Keď sa objaví nový, pošle push všetkým členom rodiny okrem odosielateľa.
 */
exports.sendPushOnDatabaseChange = functions.database
  .ref('/families/{familyCode}/pushNotifications/{pushId}')
  .onCreate(async (snapshot, context) => {
    const { familyCode, pushId } = context.params;
    const notificationData = snapshot.val();

    if (!notificationData) {
      console.log('No notification data - skipping');
      return null;
    }

    console.log(`Nová push notifikácia pre rodinu ${familyCode}:`, notificationData.type);

    // Získať všetkých členov rodiny
    const membersRef = admin.database().ref(`/families/${familyCode}/members`);
    const membersSnapshot = await membersRef.once('value');
    const members = membersSnapshot.val();

    if (!members) {
      console.log('Žiadni členovia rodiny');
      // Vyčistíme notifikáciu (po 1 hodine)
      setTimeout(() => snapshot.ref.remove(), 3600000);
      return null;
    }

    // Zozbierať FCM tokeny všetkých členov (okrem odosielateľa)
    const deviceId = notificationData.deviceName || '';
    const tokens = [];

    Object.keys(members).forEach(memberId => {
      const member = members[memberId];
      // Necháme toto isté zariadenie (ale pošleme všetkým — aj tomu istému, lebo notifikácia príde na pozadí)
      if (member.fcmToken) {
        tokens.push(member.fcmToken);
      }
    });

    if (tokens.length === 0) {
      console.log('Žiadne FCM tokeny na odoslanie');
      return null;
    }

    // Zostaviť správu
    const title = notificationData.title || 'Mealnest';
    const body = notificationData.body || '';
    const action = notificationData.action || '';

    const message = {
      data: {
        title: title,
        body: body,
        click_action: action,
        taskId: notificationData.taskId || '',
        taskTitle: notificationData.taskTitle || '',
        icon: '/Revepattor/icon-192.png',
        badge: '/Revepattor/icon-96.png',
        tag: `mealnest-${notificationData.type}-${notificationData.taskId || Date.now()}`,
        url: '/Revepattor/',
        timestamp: String(notificationData.timestamp || Date.now()),
        deviceName: notificationData.deviceName || ''
      },
      notification: {
        title: title,
        body: body,
        icon: '/Revepattor/icon-192.png',
      },
      tokens: tokens
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log('Push notifikácie odoslané:', response.successCount, 'success,', response.failureCount, 'failures');

      if (response.failureCount > 0) {
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            console.error(`Chyba pre token ${idx}:`, resp.error);
            // Ak je token neplatný, odstrániť ho z DB
            if (resp.error.code === 'messaging/invalid-registration-token' ||
                resp.error.code === 'messaging/registration-token-not-registered') {
              // Nájsť ktorý member má tento token a odstrániť ho
              Object.keys(members).forEach(memberId => {
                const member = members[memberId];
                if (member.fcmToken === tokens[idx]) {
                  admin.database().ref(`/families/${familyCode}/members/${memberId}/fcmToken`).remove();
                }
              });
            }
          }
        });
      }
    } catch (err) {
      console.error('Chyba pri odosielaní push:', err);
    }

    // Vyčistiť notifikáciu po 1 hodine (aby sa nehromadila)
    setTimeout(() => {
      snapshot.ref.remove().catch(err => console.error('Chyba pri čistení:', err));
    }, 3600000);

    return null;
  });

/**
 * Pravidelná notifikácia — napr. pripomenutie raňajok o 8:00.
 * Dá sa spustiť cez Firebase Scheduled Functions (cron).
 */
exports.scheduledReminder = functions.pubsub
  .schedule('0 8 * * *')
  .timeZone('Europe/Bratislava')
  .onRun(async (context) => {
    console.log('Ranná notifikácia o 8:00 - mohla by ísť všetkým rodinám');
    // Toto je ukážka — v budúcnosti by sa dali posielať daily tipy
    return null;
  });
