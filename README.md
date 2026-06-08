# Mealnest 🍽️

**Family meal planner, shopping list & task manager**

Moderná PWA aplikácia na plánovanie jedál, nákupov a úloh pre celú rodinu. Podporuje AI asistenta, offline režim a rodinné zdieľanie v reálnom čase.

## ✨ Funkcie

- 📅 **Plánovač jedál** — raňajky, obed, večera na celý týždeň, režim pre dospelých aj deti
- 🤖 **AI asistent** — generovanie jedálnička, návrhy receptov, nutričné hodnoty (DeepSeek API)
- 📖 **Receptár** — ukladanie receptov, import z URL, nutričné hodnoty
- 🛒 **Nákupný zoznam** — rozdelený do kategórií, režim obchodu
- ✅ **Úlohy** — s prioritami, termínmi a opakovaním
- 👨👩👧👦 **Rodinné zdieľanie** — v reálnom čase cez Firebase
- 🌐 **Offline mód** — funguje aj bez internetu (PWA + service worker)
- 🌙 **Tmavý režim**

## 🚀 Technológie

- **Frontend:** HTML + CSS + JS (vanilla, jedna stránka)
- **Backend:** Cloudflare Workers (AI proxy, scraper)
- **Databáza:** Firebase Realtime Database (rodinná synchronizácia)
- **AI:** DeepSeek API
- **Hosting:** Google Play (WebView app), GitHub Pages / vlastný web

## 📦 Inštalácia

```
git clone https://github.com/Losprey/Revepattor.git
```

Otvoriť `index.html` v prehliadači alebo hostiť na ľubovoľnom statickom hostingu.

### Cloudflare Workers

```bash
# AI proxy
npm install -g wrangler
cd worker
npx wrangler secret put DEEPSEEK_KEY
npx wrangler deploy
```

## 🔒 Bezpečnosť

- Firebase API kľúč je určený pre web SDK (obmedzený pravidlami databázy)
- DeepSeek API kľúč je uložený ako Cloudflare Workers secret
- Push notifikačné tokeny vyžadujú Firebase Auth

## 📱 Google Play

Aplikácia je dostupná v uzavretom testovaní na Google Play.

---

Vytvorené s ❤️ na Slovensku
