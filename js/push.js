// Mealnest — Push notifications
// ==========================================

// ======================== PUSH NOTIFICATIONS ========================
let _pushSubscription = null;

async function registerPushSubscription() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
  if (Notification.permission !== 'granted') return;
  try {
    var reg = await navigator.serviceWorker.ready;
    var sub = await reg.pushManager.getSubscription();
    if (sub) {
      _pushSubscription = sub;
      savePushSubscription(sub);
      return sub;
    }
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });
    _pushSubscription = sub;
    savePushSubscription(sub);
    return sub;
  } catch(e) {
    console.error('Push subscription failed:', e);
    return null;
  }
}

function savePushSubscription(sub) {
  if (!sub) return;
  try {
    var data = JSON.parse(JSON.stringify(sub));
    var deviceId = getDeviceId();
    var key = 'push_subs_' + deviceId;
    localStorage.setItem(key, JSON.stringify(data));
    // Save to Firebase if family connected
    if (typeof familyDbRef !== 'undefined' && familyDbRef) {
      familyDbRef.child('pushSubscriptions/' + deviceId).set(data);
    }
  } catch(e) { /* silent */ }
}

async function sendPushToFamily(title, body, tab) {
  try {
    if (typeof familyDbRef === 'undefined' || !familyDbRef) return;
    // Get all subscriptions from Firebase
    var snap = await familyDbRef.child('pushSubscriptions').once('value');
    var subs = snap.val();
    if (!subs) return;
    var list = Object.values(subs);
    if (!list.length) return;
    // Send to Cloudflare Worker
    await fetch(PUSH_PROXY_URL + '/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscriptions: list,
        payload: JSON.stringify({ title: title, body: body, tab: tab || 'dashboard' })
      })
    }).catch(function(e) { console.error('Push send failed:', e); });
  } catch(e) { console.error('Push send error:', e); }
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  var raw = atob(base64);
  var output = new Uint8Array(raw.length);
  for (var i = 0; i < raw.length; ++i) output[i] = raw.charCodeAt(i);
  return output;
}

const AI_PROXY_URL = 'https://receptar.waldis994.workers.dev'; // Cloudflare Worker proxy pre DeepSeek

async function aiGenerate(messages, timeoutMs) {
  if (!AI_PROXY_URL || AI_PROXY_URL.includes('YOUR_CLOUDFLARE')) {
    showToast(t('AI nie je nastavená.','AI not configured.'),'error');
    return null;
  }
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeout = setTimeout(function() {
    if (controller) controller.abort();
  }, timeoutMs || 30000);
  try {
    const r = await fetch(AI_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal: controller ? controller.signal : undefined,
    });
    clearTimeout(timeout);
    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      console.error('AI proxy error', r.status, txt.slice(0,200));
      showToast(t('AI chyba: ','AI error: ')+r.status,'error');console.error('AI error:',r.status,txt);
      return null;
    }
    const data = await r.json();
    if (data.error) { showToast(t('AI chyba: ','AI error: ')+data.error,'error'); return null; }
    return data.reply || '';
  } catch(e) {
    clearTimeout(timeout);
    console.error('AI fetch failed:', e.message);
    showToast(e.name === 'AbortError' ? t('AI trvá príliš dlho.','AI is taking too long.') : t('AI nie je dostupná.','AI not available.'),'error');
    return null;
  }
}

async function aiWeeklyPlan() {
  const members = (appSettings.family && appSettings.family.householdMembers) || 2;
  const season = ['jar','jar','jar','leto','leto','leto','leto','leto','jeseň','jeseň','jeseň','zima'][new Date().getMonth()];
  const isKids = planType === 'kids';
  const childAge = isKids ? (localStorage.getItem('childAge') || '') : '';
  const ageHint = childAge ? ' Jedlá pre dieťa vo veku '+childAge+' rokov (prispôsob tomu porcie, veľkosť porcií a vhodnosť jedál).' : '';
  const style = isKids ? 'Jedlá vhodné pre deti (nie príliš korenené, jednoduché, obľúbené u detí).'+ageHint : '';
  const prompt = 'Navrhni jedálniček na 7 dní (pondelok až nedeľa) pre '+members+' člennú domácnosť. Ročné obdobie: '+season+'. '+style+' Pre každý deň navrhni: raňajky, desiatu, obed, olovrant, večeru. Formát: Pondelok: Raňajky: ... Desiata: ... Obed: ... Olovrant: ... Večera: ... (a tak 7 dní). Každé jedlo na nový riadok začína "Raňajky:", "Desiata:", "Obed:", "Olovrant:", "Večera:". Použi slovenské názvy.';
  return aiGenerate([{ role: 'user', content: prompt }]);
}

async function handleAIWeeklyPlan() {
  const reply = await aiWeeklyPlan();
  if (!reply) return;
  showAIPlanModal(reply);
}

function showAIPlanModal(text) {
  const old = document.getElementById('ai-plan-modal');
  if (old) old.remove();
  const div = document.createElement('div');
  div.id = 'ai-plan-modal';
  div.className = 'modal-overlay active';
  div.style.cssText = 'z-index:2000;';
  div.onclick = function(e) { if (e.target === this) this.remove(); };
  div.innerHTML = `<div class="modal" style="max-width:500px;max-height:85vh;overflow-y:auto;">
    <button class="modal-close" onclick="document.getElementById('ai-plan-modal').remove()" aria-label="Zavrieť">✕</button>
    <h2>🤖 AI návrh jedálnička</h2>
    <pre id="ai-plan-text" style="white-space:pre-wrap;font-size:.75rem;font-family:inherit;background:var(--bg);padding:.8rem;border-radius:8px;max-height:50vh;overflow-y:auto;">${esc(text)}</pre>
    <div style="display:flex;gap:.5rem;margin-top:.8rem;">
      <button class="btn btn-primary" onclick="parseAndFillAIPlan()" style="flex:1;">✅ Použiť</button>
      <button class="btn btn-secondary" onclick="document.getElementById('ai-plan-modal').remove()">${lang==='en'?'Cancel':'Zrušiť'}</button>
    </div>
  </div>`;
  document.body.appendChild(div);
}

function parseAndFillAIPlan() {
  const text = document.getElementById('ai-plan-text').textContent;
  document.getElementById('ai-plan-modal').remove();
  const weekKey = currentWeekKey();
  const dayMap = { 'pondelok':'pondelok','utorok':'utorok','streda':'streda','štvrtok':'štvrtok','piatok':'piatok','sobota':'sobota','nedeľa':'nedeľa','monday':'pondelok','tuesday':'utorok','wednesday':'streda','thursday':'štvrtok','friday':'piatok','saturday':'sobota','sunday':'nedeľa' };
  const mealSlots = ['raňajky','desiata','obed','olovrant','večera'];
  const slotAliases = {
    'raňajky':['raňajky','breakfast','ranajky','ranajka'],
    'desiata':['desiata','snack','dopoludnia'],
    'obed':['obed','lunch','obeda'],
    'olovrant':['olovrant','popoludní','poobede'],
    'večera':['večera','dinner','večere'],
  };
  const lines = text.split('\n');
  let currentDay = null;
  const plan = {};

  for (const line of lines) {
    const cleanLine = line.replace(/^[•\-\*\d\.\s]+/, '').trim();
    if (!cleanLine) continue;
    // Check if this is a day header
    const dayMatch = cleanLine.match(/^([A-ZÁ-Ž][a-zá-ž]+)/);
    if (dayMatch && dayMap[dayMatch[1].toLowerCase()]) {
      currentDay = dayMap[dayMatch[1].toLowerCase()];
      if (!plan[currentDay]) plan[currentDay] = {};
      continue;
    }
    if (!currentDay) continue;
    // Check if this is a meal line
    for (const [slot, aliases] of Object.entries(slotAliases)) {
      for (const alias of aliases) {
        const idx = cleanLine.toLowerCase().indexOf(alias);
        if (idx !== -1) {
          const after = cleanLine.substring(idx + alias.length).replace(/^[:：\s\-–—]+/, '').trim();
          if (after && !plan[currentDay][slot]) {
            plan[currentDay][slot] = { type: 'custom', text: after };
          }
          break;
        }
      }
    }
  }

  // Fill the planner
  const weekPlan = getWeekPlan(weekKey);
  Object.entries(plan).forEach(([day, meals]) => {
    if (!weekPlan[day]) weekPlan[day] = {};
    Object.entries(meals).forEach(([slot, entry]) => {
      weekPlan[day][slot] = entry;
    });
  });
  saveWeekPlan();
  renderPlanner();
  renderDashboard();
}

function aiIngredientSuggest() {
  openIngredientSuggestModal();
}

function openIngredientSuggestModal() {
  const old = document.getElementById('ai-ingredient-modal');
  if (old) old.remove();
  const div = document.createElement('div');
  div.id = 'ai-ingredient-modal';
  div.className = 'modal-overlay active';
  div.style.cssText = 'z-index:2000;';
  div.onclick = function(e) { if (e.target === this) this.remove(); };
  div.innerHTML = `<div class="modal ai-ingredient-modal">
    <button class="modal-close" onclick="document.getElementById('ai-ingredient-modal').remove()" aria-label="Zavrieť">✕</button>
    <h2>🤖 ${lang === 'en' ? 'What to cook?' : 'Čo uvariť?'}</h2>
    <p class="ai-ingredient-desc">${lang === 'en'
      ? 'Write what you have at home and I will suggest meals from your ingredients.'
      : 'Napíš, čo máš doma, a navrhnem jedlá zo surovín.'}</p>
    <textarea id="ai-ingredient-input" class="ai-ingredient-input" rows="4" placeholder="${lang === 'en' ? 'e.g. eggs, tomatoes, pasta, cheese' : 'napr. vajcia, paradajky, cestoviny, syr'}"></textarea>
    <div class="ai-ingredient-chips">
      ${['vajcia','cestoviny','kuracie','ryža','paradajky','syr'].map(x => `<button onclick="addIngredientChip('${x}')">${esc(x)}</button>`).join('')}
    </div>
    <div class="ai-ingredient-actions">
      <button class="btn btn-secondary" onclick="document.getElementById('ai-ingredient-modal').remove()">${lang === 'en' ? 'Cancel' : 'Zrušiť'}</button>
      <button class="btn btn-primary" id="ai-ingredient-submit" onclick="submitIngredientSuggest()">✨ ${lang === 'en' ? 'Suggest meals' : 'Navrhnúť jedlá'}</button>
    </div>
  </div>`;
  document.body.appendChild(div);
  setTimeout(function() {
    const input = document.getElementById('ai-ingredient-input');
    if (input) input.focus();
  }, 80);
}

function addIngredientChip(text) {
  const input = document.getElementById('ai-ingredient-input');
  if (!input) return;
  const current = input.value.trim();
  input.value = current ? current.replace(/\s*$/, '') + ', ' + text : text;
  input.focus();
}

async function submitIngredientSuggest() {
  const input = document.getElementById('ai-ingredient-input');
  const btn = document.getElementById('ai-ingredient-submit');
  const ingredients = input ? input.value.trim() : '';
  if (!ingredients) {
    showToast(lang === 'en' ? 'Add at least one ingredient.' : 'Pridaj aspoň jednu surovinu.', 'info');
    if (input) input.focus();
    return;
  }
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '⏳ ' + (lang === 'en' ? 'Thinking...' : 'Premýšľam...');
  }

  const prompt = lang === 'en'
    ? 'I have these ingredients: ' + ingredients + '. Suggest 3 meals I can cook. For each include: name, prep time, and 3 short steps. Reply in English.'
    : 'Mám tieto suroviny: ' + ingredients + '. Navrhni 3 recepty, ktoré z nich môžem uvariť. Pre každý uveď: názov, čas prípravy, postup v 3 bodoch. Odpovedaj v slovenčine.';
  let reply = await aiGenerate([{ role: 'user', content: prompt }], 12000);
  let source = 'ai';
  if (!reply) {
    reply = buildLocalIngredientSuggestions(ingredients);
    source = 'local';
  }
  const inputModal = document.getElementById('ai-ingredient-modal');
  if (inputModal) inputModal.remove();
  showIngredientSuggestResult(reply, source);
}

function normalizeIngredientText(text) {
  return (text || '').toString().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildLocalIngredientSuggestions(ingredients) {
  const terms = normalizeIngredientText(ingredients)
    .split(/[,\s]+/)
    .map(s => s.trim())
    .filter(s => s.length >= 3);
  const uniqueTerms = [...new Set(terms)];
  const scored = recipes.map(r => {
    const recipeName = lang === 'en' && r.nameEn ? r.nameEn : r.name;
    const recipeIngredients = (lang === 'en' && r.ingredientsEn ? r.ingredientsEn : r.ingredients) || [];
    const haystack = normalizeIngredientText([recipeName, r.category, recipeIngredients.join(' ')].join(' '));
    const score = uniqueTerms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0);
    return { r, recipeName, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score || (a.r.time || 999) - (b.r.time || 999)).slice(0, 3);

  if (!scored.length) {
    return lang === 'en'
      ? 'AI is not available right now and I did not find a clear match in saved recipes. Try broader ingredients like pasta, eggs, chicken, rice or tomato.'
      : 'AI práve nie je dostupná a v uložených receptoch som nenašiel jasnú zhodu. Skús všeobecnejšie suroviny ako cestoviny, vajcia, kuracie, ryža alebo paradajky.';
  }

  const intro = lang === 'en'
    ? 'AI is not available right now, so here are the best matches from saved recipes:'
    : 'AI práve nie je dostupná, preto vyberám najlepšie zhody z uložených receptov:';
  return intro + '\n\n' + scored.map((item, idx) => {
    const r = item.r;
    const meta = '⏱ ' + (r.time || '?') + ' min' + (r.nutrition && r.nutrition.kcal ? ' · 🔥 ' + r.nutrition.kcal + ' kcal' : '');
    const steps = ((lang === 'en' && r.stepsEn ? r.stepsEn : r.steps) || []).slice(0, 3);
    return `${idx + 1}. ${item.recipeName}\n${meta}\n${steps.length ? steps.map((s, i) => `   ${i + 1}) ${s}`).join('\n') : (lang === 'en' ? '   Open recipe detail for steps.' : '   Postup nájdeš v detaile receptu.')}`;
  }).join('\n\n');
}

function showIngredientSuggestResult(reply, source) {
  const old = document.getElementById('ai-modal');
  if (old) old.remove();
  const div = document.createElement('div');
  div.id = 'ai-modal';
  div.className = 'modal-overlay active';
  div.style.cssText = 'z-index:2000;';
  div.onclick = function(e) { if (e.target === this) this.remove(); };
  const sourceNote = source === 'local'
    ? `<div class="ai-source-note">${lang === 'en' ? 'Fallback from saved recipes' : 'Fallback z uložených receptov'}</div>`
    : '';
  div.innerHTML = `<div class="modal ai-result-modal">
    <button class="modal-close" onclick="document.getElementById('ai-modal').remove()" aria-label="Zavrieť">✕</button>
    <h2>🤖 ${lang === 'en' ? 'What to cook' : 'Čo uvariť'}</h2>
    ${sourceNote}
    <div class="ai-result-text">${formatAiSuggestionReply(reply)}</div>
    <div class="ai-ingredient-actions">
      <button class="btn btn-secondary" onclick="document.getElementById('ai-modal').remove()">${lang === 'en' ? 'Close' : 'Zavrieť'}</button>
      <button class="btn btn-primary" onclick="document.getElementById('ai-modal').remove();openIngredientSuggestModal()">↻ ${lang === 'en' ? 'Try again' : 'Skúsiť znova'}</button>
    </div>
  </div>`;
  document.body.appendChild(div);
}

function formatAiSuggestionReply(text) {
  return esc(text || '')
    .replace(/^---$/gm, '<hr>')
    .replace(/^###\s*(.+)$/gm, '<div class="ai-result-heading">$1</div>')
    .replace(/^##\s*(.+)$/gm, '<div class="ai-result-heading">$1</div>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

async function aiDailyTip(fromFab) {
  var btn = fromFab ? null : document.getElementById('dash-ai-tip-btn');
  var origHTML = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '<span style="display:inline-block;animation:spin .6s linear infinite">⏳</span> ' + (lang==='en'?'Thinking...':'Premýšľam...'); }
  const season = ['jar','jar','jar','leto','leto','leto','leto','leto','jeseň','jeseň','jeseň','zima'][new Date().getMonth()];
  const prompt = lang==='en'
    ? 'Give me one short cooking tip for today. Season: '+season+'. Be witty, original, max 2 sentences. Reply in English.'
    : 'Daj mi jeden krátky tip na dnešné varenie. Sezóna: '+season+'. Buď vtipný, originálny, max 2 vety. Odpovedaj v slovenčine.';
  const reply = await aiGenerate([{ role: 'user', content: prompt }]);
  if (reply) {
    if (fromFab) {
      showToast(reply, 'info', 6000);
    } else {
      document.getElementById('dash-message').textContent = reply;
      document.getElementById('dash-message-sub').textContent = t('🤖 Vygenerované AI','🤖 AI-generated');
    }
  } else if (fromFab) {
    showToast(t('AI nie je k dispozícii. Skontroluj nastavenia.','AI is not available. Check settings.'), 'error');
  }
  // Restore button
  if (btn) { btn.disabled = false; btn.innerHTML = origHTML || ('🤖 <span id="dash-ai-label">' + t('AI tip dňa','AI tip of the day') + '</span>'); }
}

async function aiSuggestForSlot(dayKey, slotKey) {
  const existing = getWeekPlan(currentWeekKey());
  const dayPlan = existing[dayKey] || {};
  const slotEntry = dayPlan[slotKey];
  if (slotEntry) return;
  const mealsInDay = Object.values(dayPlan).filter(Boolean).map(e => typeof e === 'object' ? (e.text || '') : '').filter(Boolean).join(', ');
  const prompt = 'Navrhni jedno '+t(slotKey,slotKey)+' na '+t(dayKey,dayKey)+'. '+(mealsInDay?'Ostatné jedlá v tento deň: '+mealsInDay+'. ':'')+'Odpoveď len názov jedla (max 5 slov). Odpovedaj v slovenčine.';
  const reply = await aiGenerate([{ role: 'user', content: prompt }]);
  if (reply) {
    const weekPlan = getWeekPlan(currentWeekKey());
    if (!weekPlan[dayKey]) weekPlan[dayKey] = {};
    weekPlan[dayKey][slotKey] = { type: 'custom', text: reply.trim() };
    saveWeekPlan();
    renderPlanner();
    renderDashboard();
  }
}

async function aiFillEmptySlots() {
  const weekKey = currentWeekKey();
  const weekPlan = getWeekPlan(weekKey);
  const emptySlots = [];
  DAYS.forEach(d => {
    MEALS.forEach(m => {
      if (!weekPlan[d] || !weekPlan[d][m.id]) emptySlots.push({ day: d, slot: m.id });
    });
  });
  if (!emptySlots.length) { showToast(t('Všetky sloty sú vyplnené.','All slots are filled.'),'warning'); return; }
  // Fill up to 10 empty slots
  const toFill = emptySlots.slice(0, 10);
  for (const { day, slot } of toFill) {
    await aiSuggestForSlot(day, slot);
  }
}

async function aiAdjustPortions(recipeId) {
  const r = recipes.find(rec => rec.id === recipeId);
  if (!r) return;
  const current = r.portions || 4;
  const target = parseInt(prompt(t('Uprav na počet porcií (teraz: '+current+'):','Adjust to servings (current: '+current+'):'), current));
  if (!target || target < 1 || target > 50) return;
  const ingr = (lang === 'en' && r.ingredientsEn ? r.ingredientsEn : r.ingredients).join('\n');
  const reply = await aiGenerate([{ role: 'user', content: 'Uprav množstvo ingrediencií v tomto recepte z '+current+' porcií na '+target+' porcií. Ingrediencie:\n'+ingr+'\n\nOdpovedz len upravené ingrediencie, každá na nový riadok, vo formáte: množstvo názov. Odpoveď v slovenčine.' }]);
  if (reply) { const lines = reply.split('\n').filter(l => l.trim()); if (lang === 'en') r.ingredientsEn = lines; else r.ingredients = lines; r.portions = target; saveToLS(); viewRecipe(recipeId); }
}

async function aiSubstituteIngredient() {
  const ingr = prompt(t('Ktorú surovinu chceš nahradiť?','Which ingredient to substitute?'), '');
  if (!ingr) return;
  const reply = await aiGenerate([{ role: 'user', content: 'Čím môžem nahradiť "'+ingr+'" pri varení? Daj mi 2-3 alternatívy s vysvetlením. Odpovedaj v slovenčine.' }]);
  if (reply) { const old = document.getElementById('ai-modal'); if (old) old.remove(); const div = document.createElement('div'); div.id = 'ai-modal'; div.className = 'modal-overlay active'; div.style.cssText = 'z-index:2000;';
  div.onclick = function(e) { if (e.target === this) this.remove(); }; div.innerHTML = '<div class="modal" style="max-width:500px;"><button class="modal-close" onclick="document.getElementById(\'ai-modal\').remove()" aria-label="Zavrieť">✕</button><h2>🔄 '+t('Náhrada: ','Substitute: ')+esc(ingr)+'</h2><pre style="white-space:pre-wrap;font-size:.78rem;font-family:inherit;background:var(--bg);padding:.8rem;border-radius:8px;">'+esc(reply)+'</pre></div>'; document.body.appendChild(div); }
}

async function aiSimplifyRecipe(recipeId) {
  const r = recipes.find(rec => rec.id === recipeId);
  if (!r) return;
  const steps = (lang === 'en' && r.stepsEn ? r.stepsEn : r.steps).join('\n');
  const reply = await aiGenerate([{ role: 'user', content: 'Zjednoduš tento recept na 3-5 krokov. Originálny postup:\n'+steps+'\n\nOdpovedz len zjednodušené kroky, každý na nový riadok, očíslované. V slovenčine.' }]);
  if (reply) { const lines = reply.split('\n').map(l => l.replace(/^\d+[\.\)]\s*/, '').trim()).filter(Boolean); if (lines.length) { if (lang === 'en') r.stepsEn = lines; else r.steps = lines; saveToLS(); viewRecipe(recipeId); } }
}

async function aiEstimateNutrition(recipeId) {
  const r = recipes.find(rec => rec.id === recipeId);
  if (!r) return;
  const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
  const ingr = (lang === 'en' && r.ingredientsEn ? r.ingredientsEn : r.ingredients).join('\n');
  const portions = r.portions || 4;
  const reply = await aiGenerate([{ role: 'user', content: 'Odhadni nutričné hodnoty tohto receptu na JEDNU PORCIU ('+portions+' porcií celkovo). Recept: '+name+'\nIngrediencie:\n'+ingr+'\n\nOdpovedz IBA v tomto formáte (jedno číslo na riadok):\nkcal: [číslo]\nprotein: [číslo g]\nfat: [číslo g]\ncarbs: [číslo g]\n\nNič iné nepíš.' }]);
  if (reply) { const kcal = parseInt((reply.match(/kcal[:\s]*(\d+)/i)||[])[1])||0; const protein = parseInt((reply.match(/protein[:\s]*(\d+)/i)||[])[1])||0; const fat = parseInt((reply.match(/fat[:\s]*(\d+)/i)||[])[1])||0; const carbs = parseInt((reply.match(/carbs[:\s]*(\d+)/i)||[])[1])||0; if (kcal>0) { r.nutrition={kcal,protein,fat,carbs}; r.portions=portions; saveToLS(); viewRecipe(recipeId); } }
}

async function aiBatchNutrition() {
  showConfirmModal(t('Aktualizovať nutričné hodnoty pre VŠETKY recepty cez AI? Môže to chvíľu trvať.','Update nutrition for ALL recipes via AI? This may take a while.'), '🤖', 'Spustiť', function() {
    aiBatchNutritionRun();
  });
}

async function aiBatchNutritionRun() {
  const needUpdate = recipes.filter(r => !r.nutrition || !r.nutrition.kcal || r.nutrition.kcal < 10);
  if (!needUpdate.length) { showToast(t('Všetky recepty už majú nutričné hodnoty.','All recipes already have nutrition.'),'info'); return; }
  let count = 0; const total = needUpdate.length;
  for (const r of needUpdate) { const name = lang==='en'&&r.nameEn?r.nameEn:r.name; const ingr = (lang==='en'&&r.ingredientsEn?r.ingredientsEn:r.ingredients).join('\n'); const portions = r.portions||4; const reply = await aiGenerate([{role:'user',content:'Odhadni nutričné hodnoty tohto receptu na JEDNU PORCIU. Recept: '+name+'\nIngrediencie:\n'+ingr+'\n\nOdpovedz IBA:\nkcal: [číslo]\nprotein: [číslo g]\nfat: [číslo g]\ncarbs: [číslo g]'}]);
    if (reply) { const kcal = parseInt((reply.match(/kcal[:\s]*(\d+)/i)||[])[1])||0; const protein = parseInt((reply.match(/protein[:\s]*(\d+)/i)||[])[1])||0; const fat = parseInt((reply.match(/fat[:\s]*(\d+)/i)||[])[1])||0; const carbs = parseInt((reply.match(/carbs[:\s]*(\d+)/i)||[])[1])||0; if (kcal>0) { r.nutrition={kcal,protein,fat,carbs}; r.portions=portions; count++; } }
    if (count%5===0) saveToLS();
  }
  saveToLS(); render();
  showToast(t('Hotovo! ','Done! ')+count+'/'+total+' '+(lang==='en'?'recipes.':'receptov.'),'success');
}

async function aiGenerateShoppingList() {
  if (!(appSettings.shopping && appSettings.shopping.aiShoppingList)) { showToast(t('AI nákupný zoznam je vypnutý.','AI shopping is off.'),'info'); return; }

  function collectMeals(plan) {
    var meals = [];
    var wk = currentWeekKey();
    var weekPlan = plan[wk];
    if (!weekPlan) return meals;
    DAYS.forEach(function(d) {
      var day = weekPlan[d];
      if (!day) return;
      MEALS.forEach(function(m) {
        var e = day[m.id];
        if (!e) return;
        if (e.type === 'custom' && e.text) { meals.push(t(d,d)+' '+t(m.id,m.id)+': '+e.text); }
        else {
          var rid = typeof e === 'number' ? e : e.id;
          var r = recipes.find(function(rec) { return rec.id === rid; });
          if (r) {
            var rn = (lang==='en'&&r.nameEn) ? r.nameEn : r.name;
            var ingr = (r.ingredients||[]).join(', ');
            meals.push(t(d,d)+' '+t(m.id,m.id)+': '+rn+' — '+ingr);
          }
        }
      });
    });
    return meals;
  }

  var allMeals = [];
  var plan = planType === 'kids' ? mealPlanKids : mealPlan;
  allMeals = collectMeals(plan);

  // If local empty but family is connected, try Firebase
  if (!allMeals.length && familyCode && firebaseReady && familyDbRef) {
    showToast(t('Načítavam rodinné dáta...','Loading family data...'),'info');
    try {
      var snap = await new Promise(function(resolve, reject) {
        familyDbRef.child('mealPlan').once('value', resolve, reject);
      });
      if (snap.val()) { mealPlan = snap.val(); allMeals = collectMeals(mealPlan); }
      else {
        var snap2 = await new Promise(function(resolve, reject) {
          familyDbRef.child('mealPlanKids').once('value', resolve, reject);
        });
        if (snap2.val()) { mealPlanKids = snap2.val(); allMeals = collectMeals(mealPlanKids); }
      }
    } catch(e) {}
  }

  if (!allMeals.length) {
    showToast(t('V rodinnom plánovači nie sú jedlá.','No meals in family planner.'),'info');
    return;
  }

  var toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:20px;left:20px;right:20px;background:var(--primary);color:#fff;padding:10px;border-radius:10px;text-align:center;z-index:9999;font-size:.8rem;font-weight:600;';
  toast.textContent = allMeals.length + ' ' + t('jedál naplánovaných, generujem...','meals planned, generating...');
  document.body.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 4000);

  var reply = await aiGenerate([{role:'user',content:'Vytvor nákupný zoznam na tento týždeň. Jedálniček:\n'+allMeals.join('\n')+'\n\nSpoj rovnaké položky, zoraď podľa kategórií. Ku každej uveď odhadované množstvo. Odpovedz v slovenčine.'}]);
  if (reply) { var o=document.getElementById('ai-modal');if(o)o.remove();var d=document.createElement('div');d.id='ai-modal';d.className='modal-overlay active';d.style.cssText='z-index:2000;';d.innerHTML='<div class="modal" style="max-width:500px;max-height:80vh;overflow-y:auto;"><button class="modal-close" onclick="document.getElementById(\'ai-modal\').remove()">✕</button><h2>🛒 '+t('AI nákupný zoznam','AI shopping list')+'</h2><pre style="white-space:pre-wrap;font-size:.75rem;font-family:inherit;background:var(--bg);padding:.8rem;border-radius:8px;">'+esc(reply)+'</pre><button class="btn btn-primary" onclick="addAIShoppingItems()" style="width:100%;margin-top:.5rem;">📥 '+t('Pridať do nákupného zoznamu','Add to shopping list')+'</button></div>';document.body.appendChild(d);window._aiShoppingReply=reply; }
}

function addAIShoppingItems() {
  const text = window._aiShoppingReply || ''; if (!text) return;
  const lines = text.split('\n'); let c = 'other';
  loadShopItems();
  let added = 0;
  lines.forEach(l => {
    const cl = l.replace(/^[•\-\*\s\d\.\)]+\s*/,'').trim();
    if (!cl) return;
    if (cl.endsWith(':') && !cl.includes('—') && !cl.includes('–') && !cl.includes('-')) {
      c = guessFoodCategory(cl.replace(':', '')); return;
    }
    const parts = cl.split(/[—–\-]\s*/);
    if (parts.length >= 2) {
      const nm = parts[0].trim();
      const q = parts.slice(1).join(' ').trim();
      const am = (q.match(/^[\d.,\/]+/g) || [])[0] || '';
      const u = am ? q.replace(am, '').trim() : q;
      if (nm && nm.length > 1) {
        shopItems.push({ id: generateShopId(), name: nm, amount: am, unit: u || '',
          category: c === 'other' ? guessFoodCategory(nm) : c,
          checked: false, source: 'manual', note: '', recipeId: '' });
        added++;
      }
    }
  });
  try { autoMergeShopItems(); } catch(e) {}
  saveShopItems();
  try { localStorage.setItem('shoppingItems', JSON.stringify(shopItems)); } catch(e) {}
  document.getElementById('ai-modal')?.remove();
  // Fallback: if main parser found nothing, add every line as an item
  if (added === 0) {
    lines.forEach(function(l) {
      var cl2 = l.replace(/^[•\-\*\s\d\.\)]+\s*/, '').trim();
      if (cl2 && cl2.length > 2 && !cl2.match(/^[=\-—–\*]{3,}$/) && !(cl2.endsWith(':') && cl2.length < 30)) {
        shopItems.push({ id: generateShopId(), name: cl2, amount: '', unit: '',
          category: guessFoodCategory(cl2), checked: false, source: 'manual', note: '', recipeId: '' });
        added++;
      }
    });
    if (added > 0) { try { autoMergeShopItems(); } catch(e) {} saveShopItems(); try { localStorage.setItem('shoppingItems', JSON.stringify(shopItems)); } catch(e) {} }
    else { showToast(t('Nepodarilo sa pridať položky.','Failed to add items.'),'error'); return; }
  }
  renderShoppingList();
  switchTab('shopping');
}

 let lang = localStorage.getItem('lang') || 'en';
let ageFilter = '';
let voiceSearch = null, voiceSearchListening = false;

