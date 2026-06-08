// Cloudflare Worker — AI Proxy pre Receptár / Mealnest
// 🚀 Deploy:
//   1. npx wrangler deploy (alebo cez Cloudflare Dashboard)
//   2. Nastav secret: echo "YOUR_DEEPSEEK_KEY" | wrangler secret put DEEPSEEK_KEY
//   3. URL workeru vlož do index.html ako AI_PROXY_URL
//
// 🔒 DEEPSEEK_KEY sa NIKDY nepíše do kódu — používa Cloudflare Workers secrets
//    Nastavenie: wrangler secret put DEEPSEEK_KEY

const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions';

// Rate limiting: max 60 requestov za hodinu na IP
// Poznámka: používa in-memory Map, resetuje sa pri redeployi
// Pre produkčné nasadenie zváž Cloudflare KV
const rateMap = new Map();

export default {
  async fetch(request) {
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

      // 🔐 API kľúč sa číta z Cloudflare Workers secrets (env.DEEPSEEK_KEY),
      // nie z hardcodovanej premennej v kóde
      const DEEPSEEK_KEY = (typeof DEEPSEEK_KEY !== 'undefined') ? DEEPSEEK_KEY : globalThis.DEEPSEEK_KEY;

      if (!DEEPSEEK_KEY || DEEPSEEK_KEY === 'YOUR_D…_KEY' || DEEPSEEK_KEY.includes('YOUR_D')) {
        return new Response(JSON.stringify({ error: 'DeepSeek API kľúč nie je nastavený. Pridaj ho cez wrangler secret put DEEPSEEK_KEY' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

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
};
