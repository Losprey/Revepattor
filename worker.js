// Cloudflare Worker — AI Proxy + Push notifikácie pre Mealnest
// 🔒 DeepSeek API kľúč sa číta z Cloudflare Workers secrets (DEEPSEEK_KEY)

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions';
const rateMap = new Map();

// VAPID kľúče pre Web Push (vygenerované pre Mealnest)
const VAPID_PRIVATE_KEY = 'REMOVED_VAPID_PRIVATE_KEY';
const VAPID_PUBLIC_KEY = 'BI6Fga-GXSKggkNJ58R1VEYEfGE6KfWgnuDtI9sHqQLQJzGLshJuIuODmI13AVzX5D2Kd7SBxrr7Cvf-xRAowg0';
const VAPID_SUBJECT = 'mailto:receptar@waldis994.workers.dev';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      }
    });
  }

  // ===== PUSH NOTIFIKÁCIE =====
  if (url.pathname === '/api/notify') {
    return handlePushNotify(request);
  }

  // ===== AI CHAT (pôvodný endpoint) =====
  if (request.method !== 'POST') {
    return new Response('POST only', { status: 405 });
  }

  try {
    // Rate limiting
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    const windowStart = now - 3600000; // 1 hour window
    if (rateMap.has(ip)) {
      const timestamps = rateMap.get(ip).filter(t => t > windowStart);
      if (timestamps.length >= 60) {
        return new Response(JSON.stringify({ error: 'Príliš veľa requestov. Skús neskôr.' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
      timestamps.push(now);
      rateMap.set(ip, timestamps);
    } else {
      rateMap.set(ip, [now]);
    }

    const { messages } = await request.json();
    if (!messages || !messages.length) {
      return new Response(JSON.stringify({ error: 'Missing messages' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const deepseekKey = DEEPSEEK_KEY;
    if (!deepseekKey) {
      return new Response(JSON.stringify({ error: 'AI nie je nakonfigurované.' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const response = await fetch(DEEPSEEK_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + deepseekKey,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.error('DeepSeek error:', response.status, errText.slice(0, 200));
      return new Response(JSON.stringify({ error: 'AI chyba: ' + response.status }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const data = await response.json();
    const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;

    return new Response(JSON.stringify({ reply: reply || '' }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (e) {
    console.error('Worker error:', e.message);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

// ===================== PUSH NOTIFIKÁCIE =====================
async function handlePushNotify(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST required' }), { status: 405 });
  }

  try {
    const data = await request.json();
    const subscriptions = data.subscriptions || [];
    const payloadString = data.payload || '{}';

    if (!subscriptions.length) {
      return new Response(JSON.stringify({ error: 'No subscriptions' }), { status: 400 });
    }

    let sent = 0, failed = 0;

    await Promise.all(subscriptions.map(async (sub) => {
      try {
        const ok = await sendWebPush(sub, payloadString);
        if (ok) sent++; else failed++;
      } catch(e) {
        failed++;
      }
    }));

    return new Response(JSON.stringify({ sent, failed }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch(e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// === Web Push implementation ===
function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Uint8Array.from(atob(str), c => c.charCodeAt(0));
}

function base64UrlEncode(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

async function sendWebPush(subscription, payload) {
  if (!subscription.endpoint || !subscription.keys) return false;

  const endpoint = new URL(subscription.endpoint);
  const audience = endpoint.protocol + '//' + endpoint.host;
  const p256dh = base64UrlDecode(subscription.keys.p256dh);
  const auth = base64UrlDecode(subscription.keys.auth);

  // VAPID JWT
  const header = base64UrlEncode(new TextEncoder().encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const now = Math.floor(Date.now() / 1000);
  const payloadJWT = base64UrlEncode(new TextEncoder().encode(JSON.stringify({ aud: audience, exp: now + 86400, sub: VAPID_SUBJECT })));
  const signingInput = header + '.' + payloadJWT;

  const privateKey = await crypto.subtle.importKey(
    'pkcs8', base64UrlDecode(VAPID_PRIVATE_KEY).buffer,
    { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, privateKey, new TextEncoder().encode(signingInput));
  const vapidJWT = signingInput + '.' + base64UrlEncode(new Uint8Array(sig));

  // Generate ECDH keys
  const serverKeys = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
  const peerKey = await crypto.subtle.importKey('spki', p256dh.buffer, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const sharedSecret = await crypto.subtle.deriveBits({ name: 'ECDH', public: peerKey }, serverKeys.privateKey, 256);

  // HKDF for content encryption
  const encPayload = new TextEncoder().encode(payload);
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Use simplified encryption for empty payload (no payload)
  // Actually for non-empty payload, we need proper encryption
  // For simplicity, send notification without payload (show from data)
  
  const publicKeyRaw = await crypto.subtle.exportKey('spki', serverKeys.publicKey);

  const response = await fetch(subscription.endpoint, {
    method: 'POST',
    headers: {
      'Content-Encoding': 'aes128gcm',
      'Content-Type': 'application/octet-stream',
      'TTL': '86400',
      'Authorization': 'WebPush ' + vapidJWT,
      'Crypto-Key': 'p256ecdsa=' + base64UrlEncode(new Uint8Array(publicKeyRaw))
    },
    body: await encryptPayload(encPayload, salt, auth, sharedSecret, p256dh, publicKeyRaw)
  });

  if (response.status === 410) return true; // Subscription expired, ignore
  if (!response.ok) {
    console.error('Push failed:', response.status, await response.text().catch(() => ''));
    return false;
  }
  return true;
}

async function encryptPayload(plaintext, salt, authSecret, sharedSecret, peerPublicKey, serverPublicKey) {
  // HKDF to derive Content Encryption Key and nonce
  const prk = await hkdf(authSecret, new Uint8Array([0x01, ...new Uint8Array(sharedSecret), ...new TextEncoder().encode('Content-Encoding: auth ')]), 32);
  const cek = await hkdf(prk, new Uint8Array([0x00, ...new TextEncoder().encode('Content-Encoding: aes128gcm'), 0x01]), 16);
  const nonce = await hkdf(prk, new Uint8Array([0x02, ...new TextEncoder().encode('Content-Encoding: aes128gcm'), 0x01]), 12);

  // AES-GCM encrypt
  const key = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: nonce, additionalData: new Uint8Array([...new Uint8Array(serverPublicKey), ...salt]) },
    key, plaintext
  );

  // Build output: salt (16) + record size (4 BE) + public key + ciphertext + tag
  const recordSize = new Uint8Array([0x00, 0x00, (encrypted.byteLength + 16) >> 8 & 0xFF, (encrypted.byteLength + 16) & 0xFF]);
  return new Uint8Array([...salt, ...recordSize, ...new Uint8Array(serverPublicKey), ...new Uint8Array(encrypted)]);
}

async function hkdf(salt, ikm, length) {
  const extractKey = await crypto.subtle.importKey('raw', salt, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const prk = await crypto.subtle.sign('HMAC', extractKey, ikm);
  return new Uint8Array(prk).slice(0, length);
}
