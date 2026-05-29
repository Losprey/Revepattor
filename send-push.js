/**
 * Send push notification to all registered devices via Firebase Cloud Messaging
 * 
 * Usage:
 *   1. npm install firebase-admin
 *   2. Download service account key from Firebase Console → Project Settings → Service Accounts
 *   3. Save as service-account.json
 *   4. Run: node send-push.js "Title" "Body text"
 */
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://receptar2-default-rtdb.firebaseio.com',
});

async function sendPush(title, body) {
  const db = admin.database();
  const snapshot = await db.ref('pushTokens').once('value');
  const tokens = snapshot.val();
  
  if (!tokens) { console.log('No tokens found'); return; }
  
  const allTokens = [];
  Object.values(tokens).forEach(user => {
    Object.values(user).forEach(device => {
      if (device.token) allTokens.push(device.token);
    });
  });
  
  console.log(`Sending to ${allTokens.length} devices...`);
  
  for (const token of allTokens) {
    try {
      await admin.messaging().send({
        token,
        notification: { title, body },
        webpush: {
          fcmOptions: { link: 'https://losprey.github.io/Revepattor/' }
        }
      });
      console.log('Sent to', token.slice(0, 20) + '...');
    } catch(e) {
      console.error('Failed:', e.message);
    }
  }
}

const [title, body] = process.argv.slice(2);
if (!title || !body) { console.log('Usage: node send-push.js "Title" "Body"'); process.exit(1); }
sendPush(title, body);
