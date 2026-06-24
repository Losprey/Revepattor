// Cloudflare Worker — Scraper proxy pre import receptov z URL
// 🚀 Deploy: wrangler deploy (alebo Cloudflare Dashboard → Create Worker)
// Po deployi vlož URL workeru do index.html (alebo použijeme rovnakú doménu)

const ALLOWED_DOMAINS = [
  'varecha.pravda.sk',
  'mnamky.sk',
  'recepty.sk',
  'dobruchut.sk',
  'kucharka.sk',
  'foodnetwork.com',
  'allrecipes.com',
  'bbcgoodfood.com',
  'simple-recepty.sk',
  'ceska-recept.cz',
  'slovenske-recepty.sk'
];


// Povolené domény pre CORS (namiesto wildcard *)
const ALLOWED_ORIGINS = [
  'https://losprey.github.io',
  'https://www.mealnest.app',
  'https://mealnest.app'
];
function getCorsOrigin(request) {
  const origin = request.headers.get('Origin') || '';
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  // Pre vývoj lokálne povolíme file:// a localhost
  if (origin.startsWith('http://localhost') || origin.startsWith('file://')) return origin;
  return 'https://losprey.github.io'; // fallback
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // CORS prehliadač
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': getCorsOrigin(request),
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      }
    });
  }

  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response('GET or POST only', { status: 405 });
  }

  let targetUrl;

  if (request.method === 'GET') {
    const url = new URL(request.url);
    targetUrl = url.searchParams.get('url');
  } else {
    const body = await request.json();
    targetUrl = body.url;
  }

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Chýba URL parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': getCorsOrigin(request) }
    });
  }

  // URL validácia
  try {
    const parsed = new URL(targetUrl);
    if (!parsed.protocol.startsWith('http')) {
      throw new Error('Only HTTP(S) URLs allowed');
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Neplatná URL: ' + e.message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': getCorsOrigin(request) }
    });
  }

  try {
    // Stiahneme HTML s realistickým user-agent
    const resp = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'sk-SK,sk;q=0.9,en;q=0.8',
      }
    });

    const text = await resp.text();

    return new Response(text, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': getCorsOrigin(request),
        'X-Scraper-Status': resp.ok ? 'ok' : 'error',
        'X-Scraper-Code': resp.status,
      }
    });

  } catch (e) {
    return new Response(JSON.stringify({ 
      error: 'Nepodarilo sa stiahnuť stránku: ' + e.message,
      url: targetUrl
    }), {
      status: 502,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': getCorsOrigin(request) }
    });
  }
}
