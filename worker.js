// Cloudflare Worker — AI Proxy pre Receptár
// 1. Vlož svoj DeepSeek API kľúč nižšie
// 2. Deployni na Cloudflare Workers
// 3. URL workeru vlož do index.html ako AI_PROXY_URL

const DEEPSEEK_KEY = 'YOUR_DEEPSEEK_API_KEY'; // ← sem vlož kľúč
const DEEPSEEK_API = 'https://api.deepseek.com/v1/chat/completions';

// Rate limiting: max 60 requestov za hodinu na IP
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
