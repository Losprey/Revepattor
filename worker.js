// Cloudflare Worker — AI Proxy pre Receptár / Mealnest
// 🔒 DeepSeek API kľúč sa číta z Cloudflare Workers secrets
// Nastavenie: wrangler secret put DEEPSEEK_KEY
// (alebo cez Cloudflare Dashboard → Workers → receptar → Settings → Variables)

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions';

// Rate limiting: max 60 requestov za hodinu na IP (in-memory, resetuje sa pri redeployi)
const rateMap = new Map();

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // CORS prehliadač
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

  if (request.method !== 'POST') {
    return new Response('POST only', { status: 405 });
  }

  // Rate limit check
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const now = Date.now();
  const window = 60 * 60 * 1000; // 1 hodina
  const entry = rateMap.get(ip) || { count: 0, reset: now + window };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + window; }
  entry.count++;
  rateMap.set(ip, entry);
  if (entry.count > 60) {
    return new Response(JSON.stringify({ error: 'Príliš veľa requestov. Skús neskôr.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  // DeepSeek API kľúč z env secrets (Cloudflare automaticky mapuje secrets na globálne premenné)
  if (!DEEPSEEK_KEY || DEEPSEEK_KEY === 'YOUR_D…_KEY') {
    return new Response(JSON.stringify({ error: 'DeepSeek API kľúč nie je nastavený. Pridaj ho cez Cloudflare Dashboard → Workers → receptar → Settings → Variables → Add secret variable → DEEPSEEK_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  try {
    const body = await request.json();
    const { messages, model } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Chýbajúce messages pole' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const deepseekBody = {
      model: model || 'deepseek-chat',
      messages: [
        { role: 'system', content: 'Si pomocník plánovača jedál. Odpovedaj v slovenčine. Odpovedaj stručne, len to čo treba. Formátuj zrozumiteľne. Nepoužívaj markdown.' },
        ...messages
      ],
      max_tokens: 1500,
      temperature: 0.7,
    };

    const resp = await fetch(DEEPSEEK_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_KEY}`,
      },
      body: JSON.stringify(deepseekBody),
    });

    const data = await resp.json();

    if (!resp.ok) {
      return new Response(JSON.stringify({ error: data.error?.message || 'Chyba API' }), {
        status: resp.status,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const reply = data.choices?.[0]?.message?.content || '';

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: 'Chyba servera: ' + e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
