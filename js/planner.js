// Mealnest — Weekly meal planner
// ==========================================

// ======================== MEAL PLANNER ========================
const DAYS_SK = ['pondelok','utorok','streda','štvrtok','piatok','sobota','nedeľa'];
const DAYS_EN = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
const MEALS = [
  { id: 'raňajky', icon: '🌅' },
  { id: 'desiata', icon: '🍎' },
  { id: 'obed',    icon: '🌤' },
  { id: 'olovrant',icon: '🍪' },
  { id: 'večera',  icon: '🌙' },
];

function mealLabel(id) {
  const map = { 'raňajky':{sk:'raňajky',en:'Breakfast'}, 'desiata':{sk:'desiata',en:'Snack'}, 'obed':{sk:'obed',en:'Lunch'}, 'olovrant':{sk:'olovrant',en:'Afternoon'}, 'večera':{sk:'večera',en:'Dinner'} };
  return map[id] ? map[id][lang] || map[id].sk : id;
}

function mealShortLabel(id) {
  const map = { 'raňajky':{sk:'Raň',en:'Brk'}, 'desiata':{sk:'Des',en:'Snk'}, 'obed':{sk:'Obed',en:'Lunch'}, 'olovrant':{sk:'Olov',en:'Aft'}, 'večera':{sk:'Več',en:'Din'} };
  return map[id] ? map[id][lang] || map[id].sk : id;
}

function compactPlannerSlotName(name) {
  const clean = String(name || '').trim();
  if (!clean) return '';
  const words = clean.split(/\s+/).slice(0, 2).join(' ') || clean;
  return words.length > 24 ? words.slice(0, 23) + '…' : words;
}

function catLabel(cat) {
  const map = {
    'Hlavné jedlá':'Main dishes','Polievky':'Soups','Šaláty':'Salads','Dezerty':'Desserts',
    'Pečivo':'Bakery','Nápoje':'Drinks','Predjedlá':'Appetizers','Raňajky':'Breakfast',
    'Prílohy':'Sides','Detské':'Kids'
  };
  return lang==='en' ? (map[cat]||cat) : cat;
}

function diffLabel(d) {
  const map = {1:{sk:'Ľahké',en:'Easy'},2:{sk:'Stredné',en:'Medium'},3:{sk:'Ťažké',en:'Hard'}};
  return map[d] ? map[d][lang]||map[d].sk : '';
}

function selectPlannerDay(idx) {
  _selectedPlannerDay = idx;
  renderPlanner();
}
function nextPlannerDay() { if (_selectedPlannerDay < 6) selectPlannerDay(_selectedPlannerDay+1); }
function prevPlannerDay() { if (_selectedPlannerDay > 0) selectPlannerDay(_selectedPlannerDay-1); }

function renderPlanner() {
  const todayEl = document.getElementById('planner-today');
  const weekEl = document.getElementById('planner-week-grid');
  const dayNames = lang === 'en' ? DAYS_EN : DAYS_SK;
  const weekKey = currentWeekKey();
  const weekPlan = getWeekPlan(weekKey);
  const startOfWeek = plannerWeekStart(plannerWeekOffset);
  const totalSlots = MEALS.length;
  const todayStr = new Date().toISOString().slice(0,10);
  const todayIdx = (new Date().getDay() + 6) % 7;

  const heroTitle = document.getElementById('planner-hero-title');
  if (heroTitle) heroTitle.textContent = lang === 'en' ? '📅 Meal Planner' : '📅 Plánovač jedál';
  const heroSub = document.getElementById('planner-hero-sub');
  if (heroSub) heroSub.textContent = lang === 'en' ? 'Plan the whole week in a few taps' : 'Naplánuj si celý týždeň na pár kliknutí';
  const planButtons = document.querySelectorAll('#planner-hero .hero-header-actions .btn');
  if (planButtons[0]) planButtons[0].textContent = lang === 'en' ? '🤖 AI week' : '🤖 AI týždeň';
  if (planButtons[1]) planButtons[1].textContent = lang === 'en' ? '↺ Reset' : '↺ Reset';
  const paClear = document.getElementById('pa-clear-label');
  if (paClear) paClear.textContent = lang === 'en' ? 'Clear current week' : 'Vymazať aktuálny týždeň';
  const paAi = document.getElementById('pa-ai-label');
  if (paAi) paAi.textContent = lang === 'en' ? '📝 AI Shop' : '📝 AI nákup';

  // Plan type switcher
  const pts = document.getElementById('plan-type-switch');
  if (pts) pts.className = 'plan-type-switch' + (planType === 'kids' ? ' kids' : '');
  document.querySelectorAll('.plan-type-btn').forEach(b => b.classList.toggle('active', b.dataset.pt === planType));
  const ptA = document.getElementById('pt-adults-label'); if (ptA) ptA.textContent = lang === 'en' ? 'Adults' : 'Dospelí';
  const ptK = document.getElementById('pt-kids-label'); if (ptK) ptK.textContent = lang === 'en' ? 'Kids' : 'Deti';

  // Week nav active state
  const plnThis = document.getElementById('pln-this');
  const plnNext = document.getElementById('pln-next');
  if (plnThis) {
    plnThis.classList.toggle('active', plannerWeekOffset === 0);
    plnThis.textContent = lang==='en'?'This week':'Tento týždeň';
  }
  if (plnNext) {
    plnNext.classList.toggle('active', plannerWeekOffset === 1);
    plnNext.textContent = lang==='en'?'Next week':'Budúci týždeň';
  }

  // ===== TODAY SECTION =====
  const dayNameToday = dayNames[todayIdx];
  const todayDate = new Date();
  const todayDisp = todayDate.getDate() + '. ' + (todayDate.getMonth()+1) + '. ' + todayDate.getFullYear();
  const todayWk = getWeekKey(new Date());
  const todayPlan = getWeekPlan(todayWk);
  const todayDay = todayPlan[DAYS[todayIdx]] || {};
  let todayKcal = 0;
  Object.values(todayDay).filter(Boolean).forEach(entry => {
    const r = getSlotRecipe(entry);
    if (r && r.nutrition) todayKcal += r.nutrition.kcal || 0;
  });
  let totalKcal = 0, totalMeals = 0, totalTime = 0;
  const dayStats = DAYS.map(function(d, i) {
    const day = weekPlan[d] || {};
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    let kcal = 0;
    let time = 0;
    const filled = Object.values(day).filter(Boolean).length;
    Object.values(day).filter(Boolean).forEach(function(entry) {
      const recipe = getSlotRecipe(entry);
      if (!recipe) return;
      kcal += recipe.nutrition ? (recipe.nutrition.kcal || 0) : 0;
      time += recipe.time || 0;
    });
    totalMeals += filled;
    totalKcal += kcal;
    totalTime += time;
    return { key: d, index: i, day: day, date: date, filled: filled, kcal: kcal, time: time };
  });
  // Summary with progress bar
  var maxMeals = DAYS.length * totalSlots;
  var mealPct = maxMeals > 0 ? Math.round((totalMeals / maxMeals) * 100) : 0;
  const weekRange = getWeekLabel(startOfWeek);
  if (todayEl) todayEl.innerHTML = '';

  const weekMealLegend = MEALS.map(function(m) {
    return `<span title="${escAttr(mealLabel(m.id))}"><i>${m.icon}</i>${esc(mealShortLabel(m.id))}</span>`;
  }).join('');
  const weekRows = dayStats.map(function(info) {
    const isToday = info.date.toISOString().slice(0,10) === todayStr;
    const pct = Math.round((info.filled / totalSlots) * 100);
    const dayShort = (dayNames[info.index] || '').slice(0,3);
    const daySlots = MEALS.map(function(m) {
      const mealClass = 'meal-' + m.id.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
      const entry = info.day[m.id];
      const recipe = getSlotRecipe(entry);
      const isCustom = entry && entry.type === 'custom';
      const name = getSlotName(entry);
      const image = recipe ? (recipe.imageData || recipe.image || '') : '';
      if (recipe || isCustom) {
        const slotAction = recipe ? `viewRecipe(${recipe.id})` : `pickRecipe('${info.key}','${m.id}','${weekKey}')`;
        const slotMeta = recipe && recipe.nutrition ? `🔥 ${recipe.nutrition.kcal || '?'}` : (recipe && recipe.time ? `⏱ ${recipe.time}m` : '');
        return `<div class="planner-week-slot filled ${mealClass}" title="${escAttr(mealLabel(m.id)+': '+name)}">
          <button class="planner-week-slot-open" onclick="${slotAction}">
            ${image ? `<span class="planner-week-slot-img" style="background-image:url('${escAttr(image)}')"><b>${esc(compactPlannerSlotName(name) || mealShortLabel(m.id))}</b></span>` : `<span class="planner-week-slot-icon">${m.icon}<b>${esc(compactPlannerSlotName(name) || mealShortLabel(m.id))}</b></span>`}
            ${slotMeta ? `<em>${slotMeta}</em>` : ''}
          </button>
          <button class="planner-week-slot-remove" onclick="event.stopPropagation();removeSlot('${info.key}','${m.id}','${weekKey}')" aria-label="${escAttr(lang==='en'?'Remove meal':'Odstrániť jedlo')}">×</button>
        </div>`;
      }
      return `<button class="planner-week-slot empty ${mealClass}" onclick="pickRecipe('${info.key}','${m.id}','${weekKey}')" title="${escAttr(mealLabel(m.id))}">
        <span class="planner-week-plus">＋</span>
      </button>`;
    }).join('');
    return `<article class="planner-week-row ${isToday?'today':''}" style="--pct:${pct}">
      <button class="planner-week-day" onclick="selectPlannerDay(${info.index})">
        <span>${esc(dayShort)}</span>
        <strong>${info.date.getDate()}.${info.date.getMonth()+1}.</strong>
        <em>${info.filled}/${totalSlots}</em>
      </button>
      <div class="planner-week-slots">${daySlots}</div>
    </article>`;
  }).join('');
  weekEl.innerHTML = `<section class="planner-week-agenda-shell">
    <div class="planner-week-legend">
      <span class="planner-week-legend-spacer"></span>
      <div class="planner-week-legend-slots">${weekMealLegend}</div>
    </div>
    <div class="planner-week-rows">${weekRows}</div>
  </section>`;
  document.getElementById('planner-summary').innerHTML = '<div class="planner-week-total"><div class="planner-week-total-ring" style="--pct:'+mealPct+'"><strong>'+totalMeals+'/'+maxMeals+'</strong><span>'+(lang==='en'?'planned':'naplánované')+'</span></div><div><strong>🔥 '+totalKcal+' kcal</strong><span>'+(lang==='en'?'week total':'týždeň spolu')+'</span></div><div><strong>🕒 '+Math.floor(totalTime/60)+'h '+(totalTime%60)+'m</strong><span>'+(lang==='en'?'active time':'aktívny čas')+'</span></div><div><strong>📖 '+recipes.length+'</strong><span>'+(lang==='en'?'recipes':'receptov')+'</span></div></div>';
  const todayRow = weekEl.querySelector('.planner-week-row.today');
  const rowList = weekEl.querySelector('.planner-week-rows');
  if (todayRow && rowList) {
    requestAnimationFrame(() => {
      const offset = Math.max(0, todayRow.offsetTop - 12);
      if (plannerWeekOffset === 0 && offset > 240) rowList.scrollTop = offset;
    });
  }

  // Floating info panel
  var pip = document.getElementById('planner-info-panel');
  if (pip) {
    document.getElementById('pip-meals').textContent = totalMeals+'/'+maxMeals;
    const pipMealsLabel = document.getElementById('pip-meals-label');
    if (pipMealsLabel) pipMealsLabel.textContent = lang === 'en' ? 'meals' : 'jedál';
    document.getElementById('pip-kcal').textContent = totalKcal;
    document.getElementById('pip-time').textContent = totalTime;
    document.getElementById('pip-fill').style.width = mealPct+'%';
  }
}

function renderPlannerDayView(info, weekKey, totalSlots) {
  if (!info) return '';
  const dayTitle = (lang === 'en' ? DAYS_EN : DAYS_SK)[info.index] || '';
  const rows = MEALS.map(function(meal) {
    const entry = info.day[meal.id];
    const recipe = getSlotRecipe(entry);
    const name = getSlotName(entry);
    const status = recipe ? `${recipe.time || 20} min${recipe.nutrition && recipe.nutrition.kcal ? ' · ' + recipe.nutrition.kcal + ' kcal' : ''}` : (entry ? 'Vlastné jedlo' : 'Nenaplánované');
    return `<article class="planner-day-card ${entry ? 'filled' : 'empty'}">
      <span>${meal.icon}</span>
      <div>
        <strong>${esc(mealLabel(meal.id))}</strong>
        <small>${entry ? esc(name) : (lang === 'en' ? 'No meal selected' : 'Jedlo zatiaľ nie je vybrané')}</small>
        <em>${esc(status)}</em>
      </div>
      <button onclick="${recipe ? `viewRecipe(${recipe.id})` : `pickRecipe('${info.key}','${meal.id}','${weekKey}')`}">${entry ? (lang === 'en' ? 'Edit' : 'Upraviť') : '+'}</button>
    </article>`;
  }).join('');
  return `<section class="planner-day-view">
    <div class="planner-day-view-head">
      <div><h2>${esc(dayTitle)}</h2><p>${info.date.getDate()}. ${info.date.getMonth()+1}. · ${info.filled}/${totalSlots} ${lang==='en'?'meals':'jedál'}</p></div>
      <button onclick="clearDay('${info.key}','${weekKey}')">Vymazať</button>
    </div>
    <div class="planner-day-cards">${rows}</div>
  </section>`;
}

function clearDay(dayKey, weekKey) {
  const plan = getWeekPlan(weekKey || currentWeekKey());
  if (!plan[dayKey]) return;
  showConfirmModal(lang === 'en' ? 'Clear this day?' : 'Vymazať tento deň?', '🗑️', lang === 'en' ? 'Clear' : 'Vymazať', function() {
    plan[dayKey] = {};
    saveWeekPlan();
    try { localStorage.setItem('mealPlan', JSON.stringify(mealPlan)); } catch(e) {}
    try { localStorage.setItem('mealPlanKids', JSON.stringify(mealPlanKids)); } catch(e) {}
    renderPlanner();
    renderDashboard();
  });
}

function goToWeek(offset) {
  var grid = document.getElementById('planner-week-grid');
  if (grid) {
    grid.classList.remove('morph-out', 'morph-in');
    // Force reflow
    void grid.offsetWidth;
    grid.classList.add('morph-out');
  }
  haptic(12);
  setTimeout(function() {
    plannerWeekOffset = offset;
    _selectedPlannerDay = 0;
    renderPlanner();
    var grid2 = document.getElementById('planner-week-grid');
    if (grid2) {
      grid2.classList.remove('morph-out', 'morph-in');
      void grid2.offsetWidth;
      grid2.classList.add('morph-in');
      setTimeout(function() { grid2.classList.remove('morph-in'); }, 500);
    }
  }, 300);
}

function showDayDetail(dayKey) {
  var weekPlan = getWeekPlan(currentWeekKey());
  var d = weekPlan[dayKey] || {};
  var dayNames = lang==='en'?DAYS_EN:DAYS_SK;
  var idx = DAYS.indexOf(dayKey);
  var date = plannerWeekStart(plannerWeekOffset); date.setDate(date.getDate()+idx);
  var name = dayNames[idx]+' '+date.getDate()+'.'+(date.getMonth()+1)+'.';
  var filled = Object.values(d).filter(Boolean).length;
  var html = '<div class="modal-overlay active" id="day-detail-modal" style="z-index:2000;" onclick="if(event.target===this)closeDayDetail()">'
    + '<div class="modal" style="max-width:480px;">'
    + '<button class="modal-close" onclick="closeDayDetail()" aria-label="Zavrieť">\u2715</button>'
    + '<h2>\ud83d\udcc5 '+name+' ('+filled+'/'+totalSlots+')</h2>';
  MEALS.forEach(function(m) {
    var e = d[m.id];
    var r = getSlotRecipe(e);
    var nm = getSlotName(e);
    var isC = e && e.type==='custom';
    var f = r||isC;
    var wk = currentWeekKey();
    html += '<div style="display:flex;align-items:center;gap:.6rem;padding:.5rem;border-bottom:1px solid var(--border);cursor:pointer;min-height:44px;"'
      + (r?' onclick="closeDayDetail();viewRecipe('+r.id+')"':(f?'':' onclick="closeDayDetail();pickRecipe(\''+dayKey+'\',\''+m.id+'\',\''+wk+'\')"'))+'>'
      + '<span style="font-size:1.2rem;">'+m.icon+'</span>'
      + '<span style="font-size:.6rem;text-transform:uppercase;color:var(--text3);width:65px;font-weight:600;">'+mealLabel(m.id)+'</span>'
      + '<span style="flex:1;font-weight:600;font-size:.78rem;color:var(--text);">'+(f?esc(nm):'<span style="opacity:.3">'+(lang==='en'?'Pick recipe':'Vybra\u0165 recept')+'</span>')+'</span>'
      + (r&&r.nutrition?'<span style="font-size:.55rem;color:var(--text3);">\ud83d\udd25'+(r.nutrition.kcal||'?')+'</span>':'')
      + (f?'<button class="pv-del-btn" onclick="event.stopPropagation();removeSlot(\''+dayKey+'\',\''+m.id+'\',\''+wk+'\');closeDayDetail()" aria-label="Odstrániť jedlo">\u2715</button>':'')
      + '</div>';
  });
  html += '</div></div>';
  var old = document.getElementById('day-detail-modal');
  if (old) old.remove();
  var div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div.firstChild);
}

function closeDayDetail() {
  var m = document.getElementById('day-detail-modal');
  if (m) m.remove();
  renderPlanner();
}

function setPlanType(type) {
  if (type === planType) return;
  planType = type;
  saveWeekPlan();
  applyPageTransition(document.getElementById('planner-container'), 300);
  renderPlanner();
  const activeBtn = document.querySelector('.plan-type-btn.active');
  if (activeBtn) springBounce(activeBtn);
}
function getDayIcon(dayIndex, filledCount) {
  // Thematic icons per day: pondelok🌙 utorok🔥 streda💧 stvrtok🌿 piatok🎉 sobota☀️ nedela🧘
  var icons = ['🌙', '🔥', '💧', '🌿', '🎉', '☀️', '🧘'];
  var icon = icons[dayIndex] || '📅';
  if (filledCount === 0) return icon;
  if (filledCount === 5) return icon; // all filled, stays thematic
  return icon;
}
function getSlotRecipe(entry) {
  if (!entry) return null;
  if (entry.type === 'custom') return null;
  if (typeof entry === 'number') return recipes.find(r => r.id === entry);
  return recipes.find(r => r.id === entry.id);
}
function getSlotName(entry) {
  if (!entry) return '';
  if (entry.type === 'custom') return entry.text;
  const r = typeof entry === 'number' ? recipes.find(rr => rr.id === entry) : recipes.find(rr => rr.id === entry.id);
  if (!r) return '';
  return lang === 'en' && r.nameEn ? r.nameEn : r.name;
}
function selectCustomMeal(day, slot, text, weekKey) {
  const wk = weekKey || currentWeekKey();
  const plan = getWeekPlan(wk);
  if (!plan[day]) plan[day] = {};
  plan[day][slot] = { type: 'custom', text };
  saveWeekPlan();
  localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  localStorage.setItem('mealPlanKids', JSON.stringify(mealPlanKids));
  renderPlanner();
}
function createPickerModal() {
  const div = document.createElement('div');
  div.id = 'planner-picker';
  div.className = '';
  div.onclick = function(e) { if (e.target === div) closePickerModal(); };
  div.innerHTML = `<div class="picker-sheet">
    <div class="picker-header">
      <span class="picker-title">${lang==='en'?'Pick a recipe':'Vybrať recept'}</span>
      <button class="picker-close" onclick="closePickerModal()" aria-label="Zavrieť">✕</button>
    </div>
    <div class="picker-search-wrap">
      <input id="picker-search" type="text" placeholder="🔍 ${lang==='en'?'Search recipes...':'Hľadať recept...'}" aria-label="${lang==='en'?'Search recipes':'Hľadať recepty'}" oninput="filterPickerRecipes()">
    </div>
    <div class="picker-chips" id="picker-chips">
      <span class="picker-chip active" data-cat="" onclick="setPickerFilter(this,'')">${lang==='en'?'All':'Všetky'}</span>
      <span class="picker-chip" data-cat="Raňajky" onclick="setPickerFilter(this,'Raňajky')">🌅 ${lang==='en'?'Breakfast':'Raňajky'}</span>
      <span class="picker-chip" data-cat="Polievky" onclick="setPickerFilter(this,'Polievky')">🥣 ${lang==='en'?'Soups':'Polievky'}</span>
      <span class="picker-chip" data-cat="Hlavné jedlá" onclick="setPickerFilter(this,'Hlavné jedlá')">🍽️ ${lang==='en'?'Mains':'Hlavné'}</span>
      <span class="picker-chip" data-cat="Šaláty" onclick="setPickerFilter(this,'Šaláty')">🥗 ${lang==='en'?'Salads':'Šaláty'}</span>
      <span class="picker-chip" data-cat="Dezerty" onclick="setPickerFilter(this,'Dezerty')">🍰 ${lang==='en'?'Desserts':'Dezerty'}</span>
      <span class="picker-chip" data-cat="__favs__" onclick="setPickerFilter(this,'__favs__')">❤️ ${lang==='en'?'Favorites':'Obľúbené'}</span>
    </div>
    <div class="picker-list" id="picker-recipes"></div>
    <div class="picker-custom-row" id="picker-custom-row">
      <input id="picker-custom" type="text" placeholder="✍️ ${lang==='en'?'Or type custom meal...':'Alebo napíš vlastné jedlo...'}" aria-label="${lang==='en'?'Custom meal':'Vlastné jedlo'}">
      <button id="picker-custom-btn" onclick="submitCustomMeal()">${lang==='en'?'Add':'Pridať'}</button>
    </div>
  </div>`;
  document.body.appendChild(div);
  return div;
}

let _pickerDay, _pickerSlot, _pickerWk, _pickerCat = '';
function openPickerModal(day, slot, wk) {
  _pickerDay = day; _pickerSlot = slot; _pickerWk = wk || currentWeekKey(); _pickerCat = '';
  const el = document.getElementById('planner-picker') || createPickerModal();
  el.classList.add('active');
  document.getElementById('picker-chips')?.querySelectorAll('.picker-chip').forEach(c => c.classList.toggle('active', c.dataset.cat === ''));
  document.getElementById('picker-search').value = '';
  const customInput = document.getElementById('picker-custom');
  const weekPlan = getWeekPlan(wk);
  const cur = weekPlan[day] && weekPlan[day][slot];
  customInput.value = (cur && cur.type === 'custom') ? cur.text : '';
  customInput.onkeydown = function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      selectCustomMeal(day, slot, this.value.trim(), wk);
      closePickerModal();
    }
  };
  renderPickerRecipes();
  document.body.style.overflow = 'hidden';
}

function closePickerModal() {
  document.getElementById('planner-picker')?.classList.remove('active');
  document.body.style.overflow = '';
}

function submitCustomMeal() {
  const val = document.getElementById('picker-custom').value.trim();
  if (val) { selectCustomMeal(_pickerDay, _pickerSlot, val, _pickerWk); closePickerModal(); }
}

function setPickerFilter(el, cat) {
  _pickerCat = cat;
  document.querySelectorAll('#picker-chips .picker-chip').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
  renderPickerRecipes();
}

function filterPickerRecipes() {
  renderPickerRecipes();
}

function renderPickerRecipes() {
  const list = document.getElementById('picker-recipes');
  if (!list) return;
  const search = norm(document.getElementById('picker-search')?.value || '');
  let filtered = recipes;
  if (_pickerCat === '__favs__') filtered = filtered.filter(r => r.favorite);
  else if (_pickerCat) filtered = filtered.filter(r => r.category === _pickerCat);
  if (search) filtered = filtered.filter(r => {
    const name = norm(r.name + ' ' + (r.nameEn||''));
    const tags = norm([...(r.tags||[]), ...(r.tagsEn||[])].join(' '));
    return name.includes(search) || tags.includes(search);
  });

  if (!filtered.length) {
    list.innerHTML = `<div class="picker-empty"><div class="picker-empty-icon">📭</div><div>${lang==='en'?'No recipes found':'Žiadne recepty'}</div><button class="btn btn-primary" onclick="openFormModal();closePickerModal()" style="margin-top:.5rem;">${lang==='en'?'Add new recipe':'Pridať nový recept'}</button></div>`;
    return;
  }

  list.innerHTML = filtered.map(r => {
    const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
    const img = r.imageData || r.image || '';
    const kcal = r.nutrition && r.nutrition.kcal ? '🔥' + r.nutrition.kcal : '';
    const time = '⏱' + r.time + ' min';
    const tags = (lang === 'en' && r.tagsEn ? r.tagsEn : r.tags || []).slice(0, 2);
    return `<div class="picker-card" onclick="selectRecipe('${_pickerDay}','${_pickerSlot}',${r.id},'${_pickerWk}');closePickerModal()">
      <div class="picker-card-img">${img ? `<img src="${escAttr(img)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:8px" loading="lazy" onerror="this.parentElement.textContent='🍽️'">` : '🍽️'}</div>
      <div class="picker-card-info">
        <div class="picker-card-name">${esc(name)}</div>
        <div class="picker-card-meta"><span>📂 ${esc(r.category)}</span><span>${time}</span>${kcal?`<span>${kcal}</span>`:''}</div>
        ${tags.length ? `<div class="picker-card-tags">${tags.map(t => `<span class="picker-card-tag">${esc(t)}</span>`).join('')}</div>` : ''}
      </div>
      <button class="picker-card-btn" onclick="event.stopPropagation();selectRecipe('${_pickerDay}','${_pickerSlot}',${r.id},'${_pickerWk}');closePickerModal()">${lang==='en'?'Select':'Vybrať'}</button>
    </div>`;
  }).join('');
}
function plannerIsVisible() {
  return window.location.hash === '#planner' || window.location.hash === '#tab-planner' || (document.getElementById('planner-container') && document.getElementById('planner-container').style.display !== 'none');
}
function pickRecipe(day, slot, wk) {
  openPickerModal(day, slot, wk || currentWeekKey());
}

function selectRecipe(day, slot, id, wk) {
  const weekKey = wk || currentWeekKey();
  const weekPlan = getWeekPlan(weekKey);
  if (!weekPlan[day]) weekPlan[day] = {};
  weekPlan[day][slot] = { type: 'recipe', id };
  saveWeekPlan();
  // Double-save all plan data to ensure persistence
  localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  localStorage.setItem('mealPlanKids', JSON.stringify(mealPlanKids));
  renderPlanner();
  // Confetti if day is fully filled
  var filled = Object.values(weekPlan[day]).filter(Boolean).length;
  if (filled === MEALS.length) triggerConfetti();
  if (day === DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1] && !plannerIsVisible()) renderDashboard();
  // Toast feedback
  showToast('✅ ' + (lang==='en'?'Added to planner':'Pridané do plánovača'), 'success', 1500);
}

function removeSlot(day, slot, wk) {
  const weekKey = wk || currentWeekKey();
  const weekPlan = getWeekPlan(weekKey);
  if (!weekPlan[day] || !weekPlan[day][slot]) return;
  const entry = weekPlan[day][slot];
  const name = getSlotName(entry) || (lang==='en'?'this meal':'toto jedlo');
  showConfirmModal((lang==='en'?'Remove ':'Odstrániť ') + name + '?', '🗑️', lang==='en'?'Remove':'Odstrániť', function() {
    delete weekPlan[day][slot];
    saveWeekPlan();
    try { localStorage.setItem('mealPlan', JSON.stringify(mealPlan)); } catch(e) {}
    try { localStorage.setItem('mealPlanKids', JSON.stringify(mealPlanKids)); } catch(e) {}
    loadTasks();
    renderPlanner();
    showToast('🗑️ ' + (lang==='en'?'Removed':'Odstránené'), 'info', 1200);
  });
}

function clearPlan() {
  showConfirmModal(lang === 'en' ? 'Clear the current week?' : 'Vymazať aktuálny týždeň?', '🗑️', lang==='en'?'Clear':'Vymazať', function() {
    const weekKey = currentWeekKey();
    const weekPlan = getWeekPlan(weekKey);
    DAYS.forEach(d => { weekPlan[d] = {}; });
    saveWeekPlan();
    renderPlanner();
    showToast('🗑️ ' + (lang==='en'?'Week cleared':'Týždeň vymazaný'), 'info', 1200);
  });
}

function copyWeekPlan() {
  const weekKey = currentWeekKey();
  const weekPlan = getWeekPlan(weekKey);
  const lines = [];
  DAYS.forEach((d, i) => {
    const day = weekPlan[d] || {};
    const dayName = lang === 'en' ? DAYS_EN[i] : DAYS_SK[i];
    const meals = MEALS.map(m => {
      const entry = day[m.id];
      return entry ? getSlotName(entry) : '';
    }).filter(Boolean);
    if (meals.length) lines.push(dayName + ': ' + meals.join(', '));
  });
  if (!lines.length) { showToast(lang==='en'?'No meals planned':'Žiadne naplánované jedlá','info'); return; }
  navigator.clipboard.writeText(lines.join('\n')).then(() => {
    const btn = event?.target?.closest?.('.pa-btn');
    if (btn) { btn.textContent = '✓ Skopírované'; setTimeout(() => renderPlanner(), 1500); }
  }).catch(() => {});
}

// Keep these helpers unchanged
function toggleWeekGrid() {}
function resetWeek() { plannerWeekOffset = 0; renderPlanner(); }

