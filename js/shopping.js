// Mealnest — Shopping list
// ==========================================

// ======================== SHOPPING LIST ========================
// ======================== SHOPPING LIST ========================
const SHOP_CATEGORIES = [
  { id: 'meat',  icon: '🥩', nameSk: 'Mäso a ryby',      nameEn: 'Meat & Fish',      keywords: ['mäso','meat','kura','chicken','kuracie','hovädzie','beef','bravčové','pork','biftek','steak','mleté','minced','salmon','losos','tuniak','tuna','ryba','fish','ryby','slanina','bacon','klobása','sausage','šunka','ham','párky','frankfurter','špek','spek','krkovička','rebro','rib'] },
  { id: 'dairy',  icon: '🥛', nameSk: 'Mliečne výrobky',  nameEn: 'Dairy',           keywords: ['mlieko','milk','smotana','cream','syr','cheese','maslo','butter','tvaroh','cottage','cottage','jogurt','yogurt','mozzarella','parmezán','parmesan','ricotta','vajce','egg','vajcia','eggs','feta','bryndza','kefír','kefir','cmar','buttermilk'] },
  { id: 'veg',    icon: '🥦', nameSk: 'Zelenina',         nameEn: 'Vegetables',       keywords: ['mrkva','carrot','zemiak','potato','zemiaky','cibuľa','onion','cesnak','garlic','kapusta','cabbage','paradajka','rajčina','tomato','paradajky','paprika','pepper','cuketa','zucchini','špenát','spinach','brokolica','broccoli','šalát','lettuce','uhorka','cucumber','tekvica','pumpkin','batat','sweet potato','cvikla','beetroot','fazuľa','bean','hrášok','peas','kukurica','corn','šošovica','lentil','zeler','celeriac','petržlen','parsley','bylinky','herbs','bazalka','basil','kôpor','dill','pažítka','chives','reďkovka','radish','kel','kale','karfiol','cauliflower','špargľa','asparagus','avokádo','avocado','portulaka','huby','mushrooms','šampiňóny'] },
  { id: 'fruit',  icon: '🍎', nameSk: 'Ovocie',           nameEn: 'Fruit',           keywords: ['jablko','apple','banán','banana','jahody','strawberry','citrón','lemon','limetka','lime','pomaranč','orange','mandarínka','mandarin','hrozienka','raisins','hrozno','grapes','ovocie','fruit','čučoriedky','blueberry','maliny','raspberry','marhuľa','apricot','broskyňa','peach','slivka','plum','melón','melon','ananas','pineapple','kiwi','mango','datle','dates','figy','figs'] },
  { id: 'grain',  icon: '🍞', nameSk: 'Pečivo a obilniny',nameEn: 'Bread & Grains',   keywords: ['múka','flour','chlieb','bread','cesto','dough','strúhanka','breadcrumb','cestoviny','pasta','špagety','spaghetti','lasagne','ryža','rice','quinoa','granola','ovsené','oats','krupica','semolina','vločky','flakes','müsli','muesli','rožok','roll','bageta','baguette','tortilla','pita','kuskus','couscous','bulgur','ražný','žitný','kváskový','sourdough'] },
  { id: 'canned', icon: '🥫', nameSk: 'Konzervy a trvanlivé', nameEn: 'Canned & Pantry', keywords: ['konzerva','can','cícer','chickpea','šošovica','lentil','fazuľa','bean','pretlak','passata','vývar','broth','olej','oil','ocot','vinegar','horčica','mustard','kečup','ketchup','med','honey','pyré','puree','omáčka','sauce','majonéza','mayonnaise','dresing','dressing','sojová','soya','pesto','kapary','capers','olivy','olives'] },
  { id: 'spice',  icon: '🧂', nameSk: 'Koreniny a dochucovadlá', nameEn: 'Spices & Seasonings', keywords: ['soľ','salt','korenie','pepper','paprika','oregano','bazalka','basil','majorán','marjoram','tymian','thyme','rozmarín','rosemary','škorica','cinnamon','vanilka','vanilla','rasca','cumin','kari','curry','bobkový','bay','muškátový','nutmeg','cesnakový','garlic powder','grilovacie','seasoning','bujón','bouillon','kvasnice','yeast','prášok do pečiva','baking'] },
  { id: 'drink',  icon: '🥤', nameSk: 'Nápoje',           nameEn: 'Drinks',          keywords: ['voda','water','džús','juice','čaj','tea','káva','coffee','sirup','syrup','limonáda','lemonade','kofola','minerálka','mineral','sódovka','soda','pivo','beer','víno','wine','koktail','cocktail'] },
  { id: 'frozen', icon: '❄️', nameSk: 'Mrazené',          nameEn: 'Frozen',          keywords: ['mrazená','frozen','zmrzlina','ice cream','mrazené','mrazený','lístkové','puff pastry','mrazená zelenina','frozen veg'] },
  { id: 'sweet',  icon: '🍪', nameSk: 'Sladkosti',        nameEn: 'Sweets',          keywords: ['čokoláda','chocolate','sušienky','cookies','biscuit','keksy','candy','cukríky','lizátko','lollipop','lízanka','koláč','cake','zákusok','dessert','marmeláda','jam','džem','nátierka','spread','nutella','poleva','icing','cukor','sugar'] },
  { id: 'drug',   icon: '🧴', nameSk: 'Drogéria',         nameEn: 'Drugstore',       keywords: ['obrúsky','napkins','jar','washing','šampón','shampoo','sprcha','gél','mydlo','soap','papier','toilet','utierka','towel','sáčok','bag','alobal','foil','fólia','cling wrap','čistič','cleaner','sóda','baking soda','tableta','dishwasher','aviváž','fabric','dezodorant','deodorant','krém','cream','zubná','toothpaste'] },
  { id: 'other',  icon: '📦', nameSk: 'Ostatné',          nameEn: 'Other',           keywords: [] },
];

function guessFoodCategory(name) {
  const n = name.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let best = null, bestLen = 0;
  for (const cat of SHOP_CATEGORIES) {
    if (!cat.keywords.length) continue;
    for (const kw of cat.keywords) {
      if (n.includes(kw) && kw.length > bestLen) {
        best = cat.id;
        bestLen = kw.length;
      }
    }
  }
  return best || 'other';
}

function shopCatLabel(catId) {
  const c = SHOP_CATEGORIES.find(x => x.id === catId);
  if (!c) return lang === 'en' ? 'Other' : 'Ostatné';
  return lang === 'en' ? c.nameEn : c.nameSk;
}

function shopCatIcon(catId) {
  const c = SHOP_CATEGORIES.find(x => x.id === catId);
  return c ? c.icon : '📦';
}

let shopItems = [];
function loadShopItems() {
  try { shopItems = JSON.parse(localStorage.getItem('shoppingItems') || '[]'); } catch(e) { shopItems = []; }
  if (!Array.isArray(shopItems)) shopItems = [];
  // Keep only manual items (recipe auto-population removed)
  shopItems = shopItems.filter(function(it) { return it && it.source === 'manual'; });
}
function saveShopItems() {
  if (!Array.isArray(shopItems)) { shopItems = []; }
  var now = Date.now(), dev = getDeviceId();
  shopItems.forEach(function(it) {
    if (!it.createdAt) it.createdAt = now;
    it.updatedAt = now;
    it.updatedBy = dev;
  });
  localStorage.setItem('shoppingItems', JSON.stringify(shopItems));
}

function autoMergeShopItems() {
  const merged = {};
  let changed = 0;
  const unitMap = { gram: 'g', grams: 'g', gramy: 'g', kilogram: 'kg', kilograms: 'kg', kilo: 'kg', liter: 'l', litre: 'l', literov: 'l', kus: 'ks', piece: 'ks', pieces: 'ks' };
  const cleanUnit = u => unitMap[norm(String(u || '').trim().toLowerCase())] || norm(String(u || '').trim().toLowerCase());
  shopItems.forEach(it => {
    const key = norm(it.name.trim().toLowerCase());
    it.unit = cleanUnit(it.unit);
    if (!it.category || it.category === 'other') it.category = guessFoodCategory(it.name || '');
    if (merged[key]) {
      const existing = merged[key];
      const a1 = parseFloat(existing.amount) || 0;
      const a2 = parseFloat(it.amount) || 0;
      existing.unit = cleanUnit(existing.unit);
      if (a1 && a2 && existing.unit === it.unit) {
        existing.amount = String(a1 + a2);
        changed++;
      } else {
        const extra = [it.amount, it.unit].filter(Boolean).join(' ');
        existing.note = [existing.note, extra, it.note].filter(Boolean).join('; ');
        changed++;
      }
      existing.checked = existing.checked && it.checked;
    } else {
      merged[key] = it;
    }
  });
  if (changed) shopItems = Object.values(merged);
}

function mergeShoppingItems(localArr, remoteArr) {
  if (!Array.isArray(localArr)) localArr = [];
  if (!Array.isArray(remoteArr)) remoteArr = [];
  var map = {};
  localArr.forEach(function(r) { if (r && r.id != null) map[r.id] = r; });
  remoteArr.forEach(function(r) {
    if (!r || r.id == null) return;
    var local = map[r.id];
    if (!local) { map[r.id] = r; }
    else if ((r.updatedAt||0) >= (local.updatedAt||0)) {
      if ((local.updatedAt||0) > (r.updatedAt||0)) r.checked = local.checked;
      map[r.id] = r;
    }
  });
  return Object.values(map);
}
function generateShopId() {
  return 'si_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
}

function renderShoppingList() {
  const container = document.getElementById('shopping-list-view');
  loadShopItems();
  // Only keep manual items (recipe auto-population removed per user request)
  shopItems = shopItems.filter(function(it) { return it && it.source === 'manual'; });

  if (!shopItems.length) {
    container.innerHTML = emptyStateHTML({
      icon: '🛒',
      title: lang === 'en' ? 'Shopping list is empty' : 'Nákupný zoznam je prázdny',
      desc: lang === 'en' ? 'Add a manual item or generate a list from the weekly meal plan.' : 'Pridaj položku ručne alebo vytvor nákup z týždenného jedálnička.',
      actions: [
        { label: '➕ ' + (lang === 'en' ? 'Add item' : 'Pridať položku'), cls: 'btn-primary', onClick: 'openAddItemSheet()' },
        { label: '📅 ' + (lang === 'en' ? 'Plan meals' : 'Naplánovať jedlá'), cls: 'btn-secondary', onClick: 'switchTab(&quot;planner&quot;)' }
      ]
    });
    return;
  }

  const openItems = shopItems.filter(i => !i.checked);
  const boughtItems = shopItems.filter(i => i.checked);
  const openGroups = buildShopGroups(openItems);
  const boughtGroups = buildShopGroups(boughtItems);

  const totalItems = shopItems.length;
  const checkedItems = shopItems.filter(i => i.checked).length;
  const remaining = totalItems - checkedItems;
  const pctAll = totalItems ? Math.round(checkedItems / totalItems * 100) : 0;
  const catCount = Object.keys(openGroups).length || Object.keys(boughtGroups).length;
  const biggestCat = Object.keys(openGroups).sort((a,b) => openGroups[b].length - openGroups[a].length)[0] || Object.keys(boughtGroups).sort((a,b) => boughtGroups[b].length - boughtGroups[a].length)[0];

  // Build HTML
  let html = '';

  // Summary
  html += `<section class="shop-hero">
    <div>
      <span class="shop-hero-kicker">${lang==='en'?'Shopping':'Nákup'}</span>
      <h2>${remaining ? (lang==='en'?'Ready for the store':'Pripravené do obchodu') : (lang==='en'?'Everything bought':'Všetko kúpené')}</h2>
      <p>${lang==='en' ? `${remaining} items left across ${catCount} categories.` : `${remaining} položiek zostáva v ${catCount} kategóriách.`}</p>
    </div>
    <button class="shop-hero-add" onclick="openAddItemSheet()">➕ ${lang==='en'?'Add':'Pridať'}</button>
  </section>`;

  html += `<div class="shop-summary">
    <div class="shop-summary-row">
      <div class="shop-summary-stats">
        <span>📦 <strong>${totalItems}</strong> ${lang==='en'?'items':'položiek'}</span>
        <span>✅ <strong>${checkedItems}</strong> ${lang==='en'?'bought':'kúpených'}</span>
        <span>📋 <strong>${remaining}</strong> ${lang==='en'?'left':'zostáva'}</span>
      </div>
      <span style="font-size:.64rem;color:var(--text3);">${catCount} ${lang==='en'?'categories':'kategórií'}${biggestCat ? ' · ' + shopCatIcon(biggestCat) + ' ' + esc(shopCatLabel(biggestCat)) : ''}</span>
    </div>
    <div class="shop-summary-progress"><div class="shop-summary-progress-bar" style="width:${pctAll}%"></div></div>
  </div>`;

  // Top actions
  html += `<div class="shop-actions">
    <button class="sa-btn primary-action" onclick="openAddItemSheet()">➕ ${lang==='en'?'Add item':'Pridať položku'}</button>
    <button class="sa-btn" onclick="copyShopList()">📋 ${lang==='en'?'Copy':'Kopírovať'}</button>
    <button class="sa-btn" onclick="mergeDuplicateShopItems()">🔄 ${lang==='en'?'Merge dupes':'Zlúčiť duplicity'}</button>
    <button class="sa-btn" onclick="clearCheckedShopItems()">✅ ${lang==='en'?'Clear checked':'Vyčistiť'}</button>
    <button class="sa-btn danger" onclick="clearAllShopItems()" aria-label="${lang==='en'?'Clear all items':'Vymazať všetky položky'}">🗑 ${lang==='en'?'Clear all':'Všetko'}</button>
  </div>`;

  html += renderShopCategoryCards(openGroups, { bought: false });
  if (boughtItems.length) {
    html += `<div class="shop-bought-section">
      <div class="shop-bought-head">
        <span>✅ ${lang === 'en' ? 'Bought' : 'Kúpené'}</span>
        <small>${boughtItems.length} ${lang === 'en' ? 'items' : 'položiek'}</small>
      </div>
      ${renderShopCategoryCards(boughtGroups, { bought: true })}
    </div>`;
  }

  // Add item button
  html += `<button class="shop-add-btn" onclick="openAddItemSheet();springBounce(this)">➕ ${lang==='en'?'Add food item':'Pridať potravinu'}</button>`;

  container.innerHTML = html;
  container.classList.add('shop-animate-stagger');
  initShopSwipe();
}

function buildShopGroups(items) {
  const groups = {};
  items.forEach(it => {
    const g = it.category || 'other';
    if (!groups[g]) groups[g] = [];
    groups[g].push(it);
  });
  Object.keys(groups).forEach(g => {
    groups[g].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  });
  return groups;
}

function renderShopCategoryCards(groups, opts) {
  opts = opts || {};
  const catOrder = SHOP_CATEGORIES.map(c => c.id);
  const catIds = [...new Set([...Object.keys(groups).filter(g => catOrder.includes(g)), ...catOrder])];
  let html = '';
  catIds.forEach(catId => {
    const items = groups[catId];
    if (!items || !items.length) return;
    const total = items.length;
    const checked = items.filter(i => i.checked).length;
    const pct = Math.round(checked / total * 100);
    html += `<div class="shop-cat-card${opts.bought ? ' bought' : ''}" data-cat="${catId}">
      <div class="shop-cat-header" onclick="toggleShopCategory(this)">
        <span class="shop-cat-icon">${shopCatIcon(catId)}</span>
        <span class="shop-cat-name">${shopCatLabel(catId)}</span>
        <span class="shop-cat-count">${opts.bought ? total : checked + '/' + total}</span>
        <div class="shop-cat-progress-wrap"><div class="shop-cat-progress-bar" style="width:${opts.bought ? 100 : pct}%"></div></div>
        <span class="shop-cat-arrow">▼</span>
      </div>
      <div class="shop-cat-body">${items.map(renderShopItem).join('')}</div>
    </div>`;
  });
  return html;
}

function renderShopItem(it) {
  const ch = it.checked ? 'checked' : '';
  const catLabel = shopCatLabel(it.category);
  const amount = it.amount ? (it.unit ? `${it.amount} ${it.unit}` : it.amount) : '';
  return `<div class="shop-item ${ch}" data-id="${it.id}">
    <div class="si-check ${ch}" onclick="toggleShopItem('${it.id}')">${it.checked?'✓':''}</div>
    <div class="si-info" onclick="openAddItemSheet('${it.id}')">
      <div class="si-name">${esc(it.name)}</div>
      <div class="si-meta">
        ${amount ? `<span>${esc(amount)}</span>` : ''}
        <span class="si-cat-chip">${esc(catLabel)}</span>
        ${it.note ? `<span>📝 ${esc(it.note)}</span>` : ''}
      </div>
    </div>
    <div class="si-actions">
      <button class="si-btn" onclick="event.stopPropagation();openAddItemSheet('${it.id}')" title="${lang==='en'?'Edit':'Upraviť'}" aria-label="${lang==='en'?'Edit item':'Upraviť položku'}">✏️</button>
      <button class="si-btn danger" onclick="event.stopPropagation();deleteShopItem('${it.id}')" title="${lang==='en'?'Delete':'Vymazať'}" aria-label="${lang==='en'?'Delete item':'Vymazať položku'}">🗑</button>
    </div>
    <div class="si-swipe-delete" onclick="event.stopPropagation();deleteShopItem('${it.id}')">🗑 ${lang==='en'?'Delete':'Vymazať'}</div>
  </div>`;
}

// =================== SWIPE TO DELETE ===================
var _swipeData = null;
// Close any open swipe when tapping elsewhere
document.addEventListener('touchstart', function(e) {
  if (_swipeData || !e.target.closest) return; // tracking active swipe
  if (!e.target.closest('.shop-item')) {
    document.querySelectorAll('.si-swipe-delete.revealed').forEach(function(d) {
      var item = d.closest('.shop-item');
      if (item) {
        var check = item.querySelector('.si-check');
        var info = item.querySelector('.si-info');
        var actions = item.querySelector('.si-actions');
        [check, info, actions].forEach(function(el) {
          if (el) { el.style.transition = 'transform .25s cubic-bezier(.22,1,.36,1)'; el.style.transform = ''; }
        });
      }
      d.classList.remove('revealed');
    });
  }
}, { passive: true });

function initShopSwipe() {
  document.querySelectorAll('.shop-item').forEach(function(item) {
    item.addEventListener('touchstart', onSwipeStart, { passive: true });
    item.addEventListener('touchmove', onSwipeMove, { passive: false });
    item.addEventListener('touchend', onSwipeEnd, { passive: true });
    // Reset any existing revealed state
    var del = item.querySelector('.si-swipe-delete');
    if (del) del.classList.remove('revealed');
  });
}

function onSwipeStart(e) {
  var item = e.currentTarget;
  // Close any other open swipe
  document.querySelectorAll('.si-swipe-delete.revealed').forEach(function(d) {
    d.closest('.shop-item').querySelector('.si-swipe-delete').classList.remove('revealed');
  });
  _swipeData = { item: item, startX: e.touches[0].clientX, startY: e.touches[0].clientY, moved: false };
}

function onSwipeMove(e) {
  if (!_swipeData) return;
  var dx = e.touches[0].clientX - _swipeData.startX;
  var dy = Math.abs(e.touches[0].clientY - _swipeData.startY);
  // If scrolling vertically, don't swipe
  if (dy > 20 && Math.abs(dx) < 10) {
    _swipeData = null;
    return;
  }
  if (dx > 0) { _swipeData = null; return; } // Only left swipe
  _swipeData.moved = true;
  var translateX = Math.max(dx, -80);
  _swipeData.item.querySelector('.si-check').style.transform = 'translateX(' + translateX + 'px)';
  _swipeData.item.querySelector('.si-info').style.transform = 'translateX(' + translateX + 'px)';
  _swipeData.item.querySelector('.si-actions').style.transform = 'translateX(' + translateX + 'px)';
  var del = _swipeData.item.querySelector('.si-swipe-delete');
  if (del) del.style.transition = 'none';
  e.preventDefault();
}

function onSwipeEnd(e) {
  if (!_swipeData) return;
  var del = _swipeData.item.querySelector('.si-swipe-delete');
  var dx = e.changedTouches[0].clientX - _swipeData.startX;
  var snapBack = function() {
    var check = _swipeData.item.querySelector('.si-check');
    var info = _swipeData.item.querySelector('.si-info');
    var actions = _swipeData.item.querySelector('.si-actions');
    [check, info, actions].forEach(function(el) {
      if (el) { el.style.transition = 'transform .25s cubic-bezier(.22,1,.36,1)'; el.style.transform = ''; }
    });
    if (del) { del.style.transition = ''; del.classList.remove('revealed'); }
  };
  
  if (dx < -50 && _swipeData.moved) {
    // Reveal delete button
    if (del) {
      del.classList.add('revealed');
      var check = _swipeData.item.querySelector('.si-check');
      var info = _swipeData.item.querySelector('.si-info');
      var actions = _swipeData.item.querySelector('.si-actions');
      [check, info, actions].forEach(function(el) {
        if (el) { el.style.transition = 'transform .25s cubic-bezier(.22,1,.36,1)'; el.style.transform = 'translateX(-80px)'; }
      });
    }
  } else {
    snapBack();
  }
  _swipeData = null;
}

function toggleShopItem(id) {
  const it = shopItems.find(i => i.id === id);
  if (!it) return;
  it.checked = !it.checked;
  haptic(10);
  saveShopItems();
  var checkEl = document.querySelector('.shop-item[data-id="' + id + '"] .si-check');
  if (checkEl) microCheckmark(checkEl);
  var itemEl = document.querySelector('.shop-item[data-id="' + id + '"]');
  if (itemEl) springBounce(itemEl);
  setTimeout(function() { renderShoppingList(); }, 300);
}

function clearCheckedShopItems() {
  const checked = shopItems.filter(i => i.checked);
  if (!checked.length) {
    showToast(lang==='en'?'No checked items.':'Žiadne zaškrtnuté položky.','info');
    return;
  }
  showConfirmModal(lang === 'en' ? `Remove ${checked.length} checked items?` : `Odstrániť ${checked.length} zaškrtnutých položiek?`, '🗑️', lang==='en'?'Remove':'Odstrániť', function() {
    shopItems = shopItems.filter(i => !i.checked);
    saveShopItems();
    renderShoppingList();
    showToast('✅ ' + (lang==='en'?'Cleaned':'Vyčistené'), 'success', 1200);
  });
}

function clearAllShopItems() {
  showConfirmModal(lang === 'en' ? 'Clear entire shopping list?' : 'Vymazať celý nákupný zoznam?', '🗑️', lang==='en'?'Clear all':'Všetko vymazať', function() {
    shopItems = [];
    saveShopItems();
    renderShoppingList();
    showToast('🗑️ ' + (lang==='en'?'List cleared':'Zoznam vyčistený'), 'info', 1200);
  });
}

function mergeDuplicateShopItems() {
  loadShopItems();
  const before = shopItems.length;
  autoMergeShopItems();
  const changed = before - shopItems.length;
  saveShopItems();
  renderShoppingList();
  if (changed) showToast(lang==='en'?'Merged '+changed+' items.':'Zlúčených '+changed+' položiek.','success');
  else showToast(lang==='en'?'No duplicates.':'Žiadne duplicity.','info');
}

function copyShopList() {
  const unchecked = shopItems.filter(i => !i.checked);
  if (!unchecked.length) return;
  const text = unchecked.map(i => {
    const amount = i.amount ? (i.unit ? `${i.amount} ${i.unit}` : i.amount) : '';
    return `${i.name}${amount ? ' ' + amount : ''}${i.note ? ' — ' + i.note : ''}`;
  }).join('\n');
  navigator.clipboard.writeText(text).catch(() => {});
  showToast(lang==='en'?'Copied ' + unchecked.length + ' items.':'Skopírovaných ' + unchecked.length + ' položiek.','success');
}

function openAddItemSheet(editId) {
  const sheet = document.getElementById('shop-sheet');
  const title = document.getElementById('shop-sheet-title');
  const nameEl = document.getElementById('shop-item-name');
  const amountEl = document.getElementById('shop-item-amount');
  const unitEl = document.getElementById('shop-item-unit');
  const noteEl = document.getElementById('shop-item-note');
  const editIdEl = document.getElementById('shop-edit-id');
  const saveBtn = document.getElementById('shop-save-btn');
  const chips = document.getElementById('shop-cat-chips');

  if (editId) {
    const it = shopItems.find(i => i.id === editId);
    if (!it) return;
    title.textContent = lang === 'en' ? '✏️ Edit item' : '✏️ Upraviť položku';
    nameEl.value = it.name;
    amountEl.value = it.amount || '';
    unitEl.value = it.unit || '';
    noteEl.value = it.note || '';
    editIdEl.value = editId;
    saveBtn.textContent = lang === 'en' ? '💾 Save' : '💾 Uložiť';
    renderCategoryChips(it.category);
  } else {
    title.textContent = lang === 'en' ? '✏️ Add item' : '✏️ Pridať potravinu';
    nameEl.value = '';
    amountEl.value = '';
    unitEl.value = '';
    noteEl.value = '';
    editIdEl.value = '';
    saveBtn.textContent = lang === 'en' ? '💾 Add' : '💾 Pridať';
    renderCategoryChips('other');
  }
  sheet.classList.add('active');
  nameEl.focus();
}

function renderCategoryChips(selected) {
  const chips = document.getElementById('shop-cat-chips');
  chips.innerHTML = SHOP_CATEGORIES.map(c =>
    `<button class="cat-chip${c.id === selected ? ' active' : ''}" data-cat="${c.id}" onclick="selectCatChip(this)">${c.icon} ${lang==='en'?c.nameEn:c.nameSk}</button>`
  ).join('');
}

function selectCatChip(el) {
  document.querySelectorAll('#shop-cat-chips .cat-chip').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function closeShopSheet() {
  document.getElementById('shop-sheet').classList.remove('active');
}

function saveShopItem() {
  const nameEl = document.getElementById('shop-item-name');
  const amountEl = document.getElementById('shop-item-amount');
  const unitEl = document.getElementById('shop-item-unit');
  const noteEl = document.getElementById('shop-item-note');
  const editIdEl = document.getElementById('shop-edit-id');
  const activeChip = document.querySelector('#shop-cat-chips .cat-chip.active');
  const category = activeChip ? activeChip.dataset.cat : 'other';
  const name = nameEl.value.trim();
  if (!name) {
    nameEl.focus();
    nameEl.style.borderColor = 'var(--danger)';
    setTimeout(() => nameEl.style.borderColor = '', 1500);
    return;
  }
  const editId = editIdEl.value;
  if (editId) {
    const it = shopItems.find(i => i.id === editId);
    if (it) {
      it.name = name;
      it.amount = amountEl.value.trim();
      it.unit = unitEl.value.trim();
      it.category = category;
      it.note = noteEl.value.trim();
    }
  } else {
    shopItems.push({
      id: generateShopId(),
      name: name,
      amount: amountEl.value.trim(),
      unit: unitEl.value.trim(),
      category: category,
      checked: false,
      source: 'manual',
      note: noteEl.value.trim(),
      recipeId: ''
    });
  }
  // Auto-merge duplicates after adding new item
  try { autoMergeShopItems(); } catch(e) {}
  saveShopItems();
  closeShopSheet();
  renderShoppingList();
}

function deleteShopItem(id) {
  showConfirmModal(lang === 'en' ? 'Delete this item?' : 'Vymazať túto položku?', '🗑️', lang==='en'?'Delete':'Vymazať', function() {
    const deletedItem = shopItems.find(i => i.id === id);
    const deletedIndex = shopItems.findIndex(i => i.id === id);
    shopItems = shopItems.filter(i => i.id !== id);
    saveShopItems();
    renderShoppingList();
    showUndoToast('🗑️ ' + (lang==='en'?'Item deleted':'Položka vymazaná'), function() {
      if (!deletedItem) return;
      shopItems.splice(Math.max(0, deletedIndex), 0, deletedItem);
      saveShopItems();
      renderShoppingList();
      showToast(lang === 'en' ? 'Item restored' : 'Položka obnovená', 'success', 1200);
    });
  });
}

function toggleShopCategory(headerEl) {
  const card = headerEl.closest('.shop-cat-card');
  card.classList.toggle('collapsed');
}

function guessShopCategory() {
  if (!appSettings.shopping.autoCategories) return;
  const name = document.getElementById('shop-item-name').value.trim();
  if (!name) return;
  const cat = guessFoodCategory(name);
  document.querySelectorAll('#shop-cat-chips .cat-chip').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
}

