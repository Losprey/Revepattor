// Mealnest — Modals, toasts, animations, gestures
// ==========================================

// ======================== MODALS ========================
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}
function toggleRecipeAiTools() {
  const tools = document.getElementById('recipe-ai-tools');
  const toggle = document.querySelector('.recipe-ai-toggle');
  if (!tools) return;
  const isOpen = tools.classList.toggle('active');
  if (toggle) toggle.classList.toggle('btn-primary', isOpen);
}

function toggleRecipeMoreTools() {
  const tools = document.getElementById('recipe-more-tools');
  const aiTools = document.getElementById('recipe-ai-tools');
  const toggle = document.querySelector('.recipe-more-toggle');
  if (!tools) return;
  const isOpen = tools.classList.toggle('active');
  if (toggle) toggle.classList.toggle('btn-primary', isOpen);
  if (!isOpen && aiTools) aiTools.classList.remove('active');
}
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => { if (e.target === el) { el.classList.remove('active'); } });
});

// =================== SKELETON HELPERS ===================
function renderSkeletonGrid(container, count) {
  if (!container) return;
  count = count || 6;
  let html = '<div class="skeleton-grid">';
  for (let i = 0; i < count; i++) {
    html += '<div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-body"><div class="skeleton-line"></div><div class="skeleton-line-short"></div></div></div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function renderSkeletonPlanner(container) {
  if (!container) return;
  let html = '';
  for (let i = 0; i < 3; i++) {
    html += '<div class="skeleton-planner-day"><div class="skeleton-line" style="width:40%"></div><div class="skeleton-row"></div><div class="skeleton-row"></div><div class="skeleton-row"></div></div>';
  }
  container.innerHTML = html;
}

function renderSkeletonShopping(container) {
  if (!container) return;
  container.innerHTML = '<div class="skeleton-shopping"><div class="skeleton-summary"></div><div class="skeleton-cat"></div><div class="skeleton-cat"></div><div class="skeleton-cat"></div></div>';
}

function animateSkeletonOut(container) {
  if (!container) return;
  container.querySelectorAll('.skeleton-grid, .skeleton-planner-day, .skeleton-shopping').forEach(function(el) {
    el.style.transition = 'opacity .25s ease, transform .25s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(function() { el.remove(); }, 280);
  });
}

function applyPageTransition(el, duration) {
  if (!el) return;
  duration = duration || 400;
  el.style.animation = 'none';
  void el.offsetHeight;
  el.style.animation = 'pageEnter ' + duration + 'ms cubic-bezier(.22,1,.36,1) both';
}

// =================== COUNT-UP ANIMATION ===================
function animateCountUp(el, target) {
  if (!el) return;
  target = parseInt(target) || 0;
  var current = 0;
  var step = Math.max(1, Math.floor(target / 30));
  var duration = 800;
  var interval = Math.max(10, Math.floor(duration / (target / step)));
  if (target < 1) { el.textContent = '0'; return; }
  var timer = setInterval(function() {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, interval);
}

function springBounce(el) {
  if (!el) return;
  el.classList.remove('spring-bounce');
  void el.offsetWidth;
  el.classList.add('spring-bounce');
}

function microCheckmark(el) {
  if (!el) return;
  el.classList.remove('check-pop');
  void el.offsetWidth;
  el.classList.add('check-pop');
}

function dismissTip() {
  const hero = document.getElementById('hero-card');
  hero.style.animation = 'pageExit .25s cubic-bezier(.55,0,.1,1) both';
  setTimeout(() => {
    hero.classList.remove('show');
    hero.style.animation = '';
  }, 260);
  localStorage.setItem('tipDismissed', new Date().toISOString().slice(0,10));
}

function switchTab(tab) {
  const requestedTab = tab;
  if (tab === 'family') tab = 'board';
  haptic(8);
  try { localStorage.setItem('lastTab', requestedTab); } catch(e) {}
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.nav-item[data-tab="${requestedTab}"]`) || document.querySelector(`.nav-item[data-tab="${tab}"]`);
  if (btn) { btn.classList.add('active'); springBounce(btn); }
  document.body.dataset.tab = tab;
  if (window._skipHistory) { window._skipHistory = false; }
  else { history.pushState({ tab: requestedTab }, '', '#tab-' + requestedTab); }
  const dashboard = document.getElementById('dashboard');
  const recipeContainer = document.getElementById('home');
  const plannerContainer = document.getElementById('planner-container');
  const shoppingContainer = document.getElementById('shopping-container');
  const tasksContainer = document.getElementById('tasks-container');
  const boardContainer = document.getElementById('board-container');
  const mainTitle = document.getElementById('main-title');
  const appHeader = document.getElementById('app-header');
  [dashboard, recipeContainer, plannerContainer, shoppingContainer, tasksContainer, boardContainer].forEach(function(el) { if (el) el.style.display = 'none'; });
  if (mainTitle) mainTitle.style.display = tab === 'dashboard' ? 'none' : '';
  if (appHeader) appHeader.style.display = (tab === 'dashboard' || tab === 'board') ? 'none' : '';
  updateMainHeader(tab);
  try {
    document.body.classList.remove('header-collapsed');
    window.scrollTo(0, 0);
  } catch(e) {}
  if (tab === 'dashboard' && dashboard) {
    dashboard.style.display = ''; applyPageTransition(dashboard, 350);
    try { renderDashboard(); } catch(e) {}
  } else if (tab === 'home' && recipeContainer) {
    recipeContainer.style.display = ''; applyPageTransition(recipeContainer, 350);
    var grid = document.getElementById('recipe-grid');
    if (grid && grid.children.length === 0) renderSkeletonGrid(grid, 6);
    try { render(); } catch(e) {}
  } else if (tab === 'shopping' && shoppingContainer) {
    shoppingContainer.style.display = 'block'; applyPageTransition(shoppingContainer, 350);
    var shopView = document.getElementById('shopping-list-view');
    if (shopView && !shopView.children.length) renderSkeletonShopping(shopView);
    try { renderShoppingList(); } catch(e) {}
  } else if (tab === 'planner' && plannerContainer) {
    plannerContainer.style.display = 'block'; applyPageTransition(plannerContainer, 350);
    var weekGrid = document.getElementById('planner-week-grid');
    if (weekGrid && !weekGrid.children.length) renderSkeletonPlanner(weekGrid);
    try { renderPlanner(); } catch(e) {}
  } else if (tab === 'tasks' && tasksContainer) {
    tasksContainer.style.display = 'block'; applyPageTransition(tasksContainer, 350);
    try { renderTasks(); } catch(e) {}
  } else if (tab === 'board' && boardContainer) {
    boardContainer.style.display = 'block'; applyPageTransition(boardContainer, 350);
    const boardView = document.getElementById('board-container-view');
    if (boardView) boardView.innerHTML = '';
    try { requestedTab === 'family' ? openMorePage('family') : renderMoreScreen(); } catch(e) {}
  }
}

function toggleQuickAddSheet() {
  const sheet = document.getElementById('fab-quick-add');
  if (!sheet) return;
  if (sheet.classList.contains('open')) {
    sheet.classList.remove('open');
    sheet.style.display = 'none';
  } else {
    sheet.style.display = 'block';
    void sheet.offsetHeight;
    sheet.classList.add('open');
  }
}

// Close FAB menu when tapping outside
document.addEventListener('click', function(e) {
  const sheet = document.getElementById('fab-quick-add');
  if (!sheet || !sheet.classList.contains('open')) return;
  if (!e.target.closest('.fab-menu') && !e.target.closest('#floating-fab')) {
    closeQuickAddSheet();
  }
});

// Event delegation — clicks on FAB menu items
document.addEventListener('click', function(e) {
  try {
    const item = e.target.closest('.fab-item');
    if (!item) return;
    const sheet = document.getElementById('fab-quick-add');
    if (!sheet || !sheet.classList.contains('open')) return;
    const action = item.dataset.action;
    if (!action) return;
    closeQuickAddSheet();
    setTimeout(function() {
      try {
        switch(action) {
          case 'meal': switchTab('planner'); break;
          case 'task': switchTab('tasks'); setTimeout(function() { try { openTaskSheet(); } catch(e) {} }, 80); break;
          case 'food': switchTab('shopping'); setTimeout(function() { try { openAddItemSheet(); } catch(e) {} }, 80); break;
          case 'import': openImportUrlModal(); break;
          case 'ai': aiDailyTip(true); break;
        }
      } catch(e) { console.warn('FAB action error:', e); }
    }, 50);
  } catch(e) { console.warn('FAB click error:', e); }
});

function closeQuickAddSheet() {
  const sheet = document.getElementById('fab-quick-add');
  if (!sheet) return;
  sheet.classList.remove('open');
  sheet.style.display = 'none';
}

function renderMoreScreen() {
  renderMoreHome();
}

function openMorePageFromAnywhere(page) {
  switchTab(page === 'family' ? 'family' : 'board');
  openMorePage(page || 'settings');
}

function renderMoreHome() {
  try { loadTasks(); } catch(e) {}
  const view = document.getElementById('board-container-view');
  if (!view) return;
  const openTasks = Array.isArray(tasks) ? tasks.filter(t => !t.completed).length : 0;
  const shoppingCount = Array.isArray(shopItems) ? shopItems.filter(i => i && !i.checked).length : 0;
  const familyState = familyCode ? 'Rodina pripojená' : 'Pripojiť rodinu';
  view.innerHTML = `<section class="more-screen">
    <div class="more-head">
      <div>
        <span>Mealnest</span>
        <h1>Viac</h1>
        <p>Všetko dôležité na jednom mieste</p>
      </div>
      <button class="more-avatar" onclick="openMorePage('account')">${getDashboardAvatar()}</button>
    </div>
    <div class="more-grid">
      ${renderMoreTile('recipes-shortcut', '📖', 'Recepty', `${recipes.length} receptov`, 'Receptár a import')}
      ${renderMoreTile('shopping', '🛒', 'Nákup', `${shoppingCount} položiek`, 'Aktuálny zoznam', "switchTab('shopping')")}
      ${renderMoreTile('tasks', '✅', 'Úlohy', `${openTasks} otvorených`, 'Pôvodná sekcia úloh', "switchTab('tasks')")}
      ${renderMoreTile('family-board', '📌', 'Nástenka', 'Dnešný prehľad', 'Jedlá, nákup a úlohy')}
      ${renderMoreTile('ai-week', '🚀', 'AI Týždeň', 'Plán na mieru', 'Preferencie a návrhy AI')}
      ${renderMoreTile('settings', '⚙️', 'Nastavenia', 'Účet, jazyk, dáta', 'Moderné nastavenia')}
    </div>
    <div class="more-list">
      ${renderMoreRow('family', '👨‍👩‍👧‍👦', familyState, familyCode ? 'Členovia, zdieľanie a aktivita' : 'Pozvánky a spoločné plánovanie')}
      ${renderMoreRow('language', '🌐', 'Jazyk', 'Slovenčina / English')}
      ${renderMoreRow('notifications', '🔔', 'Oznámenia', 'Pripomienky a push povolenia')}
      ${renderMoreRow('backup-sync', '☁️', 'Backup a synchronizácia', 'Zálohy, obnovenie a história')}
      ${renderMoreRow('privacy-security', '🔒', 'Súkromie a bezpečnosť', 'Oprávnenia, export a vymazanie dát')}
      ${renderMoreRow('about', 'ℹ️', 'O aplikácii', 'Verzia, changelog, licencie')}
    </div>
  </section>`;
}

function renderMoreTile(page, icon, title, desc, detail, action) {
  const clickAction = action || `openMorePage('${page}')`;
  return `<button class="more-tile" onclick="${clickAction}"><span>${icon}</span><strong>${esc(title)}</strong><small>${esc(desc)}</small><em>${esc(detail)}</em><b>›</b></button>`;
}

function renderMoreRow(page, icon, title, desc) {
  return `<button onclick="openMorePage('${page}')"><span>${icon}</span><div><strong>${esc(title)}</strong><small>${esc(desc)}</small></div><em>›</em></button>`;
}

function openMorePage(page) {
  const view = document.getElementById('board-container-view');
  if (!view) return;
  const renderers = {
    family: renderMoreFamilyPage,
    settings: renderMoreSettingsHub,
    appearance: renderMoreAppearancePage,
    'home-settings': renderMoreHomeSettingsPage,
    'meal-settings': renderMoreMealSettingsPage,
    'shopping-settings': renderMoreShoppingSettingsPage,
    'data-settings': renderMoreDataSettingsPage,
    notifications: renderMoreNotificationsPage,
    account: renderMoreAccountPage,
    privacy: renderMorePrivacySecurityPage,
    sync: renderMoreBackupSyncPage,
    board: renderMoreBoardPage,
    'family-board': renderMoreBoardPage,
    'recipes-shortcut': renderMoreRecipesShortcutPage,
    'family-permissions': renderMoreFamilyPermissionsPage,
    language: renderMoreLanguagePage,
    'ai-week': renderMoreAiWeekPage,
    onboarding: renderMoreOnboardingPage,
    'notifications-account': renderMoreNotificationsAccountPage,
    'backup-sync': renderMoreBackupSyncPage,
    'privacy-security': renderMorePrivacySecurityPage,
    about: renderMoreAboutPage
  };
  view.innerHTML = (renderers[page] || renderMoreSettingsHub)();
  try { window.scrollTo(0, 0); } catch(e) {}
}

function renderMoreShell(title, subtitle, body, action) {
  return `<section class="more-screen more-subpage">
    <div class="more-subhead">
      <button class="more-back" onclick="renderMoreHome()" aria-label="Späť">‹</button>
      <div><h1>${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ''}</div>
      ${action || '<span class="more-head-spacer"></span>'}
    </div>
    ${body}
  </section>`;
}

function moreCard(title, content, cls) {
  return `<section class="more-card ${cls || ''}">${title ? `<h2>${title}</h2>` : ''}${content}</section>`;
}

function moreActionRow(icon, title, desc, action, meta) {
  return `<button class="more-action-row" onclick="${action || ''}"><span>${icon}</span><div><strong>${esc(title)}</strong>${desc ? `<small>${esc(desc)}</small>` : ''}</div>${meta ? `<em>${meta}</em>` : '<em>›</em>'}</button>`;
}

function moreInfoRow(icon, title, desc, meta) {
  return `<div class="more-action-row is-static"><span>${icon}</span><div><strong>${esc(title)}</strong>${desc ? `<small>${esc(desc)}</small>` : ''}</div>${meta ? `<em>${esc(meta)}</em>` : ''}</div>`;
}

function morePill(label, active, action) {
  return `<button class="more-pill ${active ? 'active' : ''}" onclick="${action || ''}">${label}</button>`;
}

function moreEmptyState(icon, title, desc, actionLabel, action) {
  return `<div class="more-empty-state">
    <span>${icon}</span>
    <strong>${title}</strong>
    ${desc ? `<small>${desc}</small>` : ''}
    ${actionLabel && action ? `<button class="more-primary" onclick="${action}">${actionLabel}</button>` : ''}
  </div>`;
}

function renderMoreFamilyPage() {
  const ownerName = authUser && (authUser.displayName || authUser.email)
    ? (authUser.displayName || authUser.email)
    : (localStorage.getItem('deviceName') || 'Toto zariadenie');
  const members = familyCode
    ? getRealFamilyMembers().map((member, index) => [member.photo || member.initial || '👤', member.name || ownerName, index === 0 ? 'Ty' : 'Člen'])
    : [];
  if (familyCode && !members.length) members.push(['👤', ownerName, 'Ty']);
  const shareStatus = familyCode ? 'Zapnuté' : 'Neaktívne';
  const memberContent = members.length
    ? `<div class="more-member-list hub-family-members">${members.map((m, index) => `<div class="more-member"><span>${String(m[0]).startsWith('http') ? `<img src="${escAttr(m[0])}" alt="">` : esc(m[0])}</span><div><strong>${esc(m[1])}</strong><small>${esc(m[2])}</small></div><em>${index === 0 ? 'Ty' : ''}</em></div>`).join('')}</div>`
    : moreEmptyState('👨‍👩‍👧‍👦', 'Rodina zatiaľ nie je pripojená', 'Vytvor rodinu alebo sa pripoj k existujúcemu kódu.', 'Vytvoriť rodinu', 'createFamily()');
  const body = `
    ${moreCard('', `${memberContent}${familyCode ? '<button class="more-primary family-invite" onclick="copyFamilyInvite()">＋ Pridať člena</button>' : ''}`)}
    ${moreCard('Zdieľané', `<div class="family-shared-grid">
      <button onclick="switchTab('planner')"><span>🗓️</span><strong>Plány</strong></button>
      <button onclick="switchTab('shopping')"><span>🛒</span><strong>Nákup</strong></button>
      <button onclick="switchTab('home')"><span>📖</span><strong>Recepty</strong></button>
      <button onclick="switchTab('tasks')"><span>✓</span><strong>Úlohy</strong></button>
    </div>`)}
    ${moreCard('Nedávna aktivita', renderMoreActivityFeed())}
    ${moreCard('Pripojenie', familyCode ? `
      ${moreActionRow('🔗','Rodinný kód', esc(familyCode), 'copyFamilyInvite()', 'Kopírovať')}
      ${moreActionRow('🔄','Synchronizovať teraz','Odošle lokálne dáta do rodiny',"pushAllLocalData();showToast('Dáta odoslané.','success')")}
      ${moreInputRow('📱','Názov zariadenia','Zobrazuje sa pri rodinnom syncu', localStorage.getItem('deviceName') || '', 'setMoreDeviceName(this.value)')}
      ${moreActionRow('🚪','Opustiť rodinu','Lokálne dáta ostanú v zariadení','leaveFamily()','›')}
    ` : `
      ${moreActionRow('✨','Vytvoriť rodinu','Vygeneruje nový rodinný kód','createFamily()')}
      <label class="more-setting-row"><span>🔑</span><div><strong>Pripojiť sa k rodine</strong><small>Zadaj existujúci rodinný kód</small></div><input id="more-family-code-input" class="more-input" type="text" placeholder="Kód" aria-label="Rodinný kód"></label>
      <button class="more-primary" onclick="joinFamilyFromMore()">Pripojiť rodinu</button>
    `)}
  `;
  const topAction = familyCode
    ? '<button class="more-top-action" onclick="copyFamilyInvite()">＋ Pridať člena</button>'
    : '<button class="more-top-action" onclick="createFamily()">Vytvoriť</button>';
  return renderMoreShell('Rodina', familyCode ? `Kód rodiny ${esc(familyCode)}` : 'Rodinné zdieľanie nie je pripojené', body, topAction);
}

function renderMoreFamilyPermissionsPage() {
  const ownerName = authUser && (authUser.displayName || authUser.email)
    ? (authUser.displayName || authUser.email)
    : (localStorage.getItem('deviceName') || 'Toto zariadenie');
  const body = `
    ${moreCard('Permissions', `
      ${familyCode
        ? moreInfoRow('👤', esc(ownerName), 'Vlastník · všetky práva', 'Owner')
        : moreEmptyState('🔒', 'Žiadne rodinné oprávnenia', 'Najprv pripoj alebo vytvor rodinu.', 'Otvoriť rodinu', "openMorePage('family')")}
    `)}
    ${moreCard('Activity log', renderMoreActivityFeed())}
  `;
  return renderMoreShell('Permissions', 'Rodinné role a oprávnenia', body, "<button class=\"more-top-action\" onclick=\"openMorePage('family')\">Rodina</button>");
}

function copyFamilyInvite() {
  if (!familyCode) {
    showToast('Najprv vytvor alebo pripoj rodinu', 'warning');
    return;
  }
  const code = familyCode;
  try { navigator.clipboard && navigator.clipboard.writeText(code); } catch(e) {}
  showToast('Pozvánka pripravená', 'success');
}

function renderMoreActivityFeed() {
  const recentCompleted = getRecentCompleted().slice(0, 3);
  if (!recentCompleted.length) {
    return moreEmptyState('🕘', 'Zatiaľ žiadna aktivita', 'Keď niekto pridá recept, dokončí úlohu alebo zmení plán, zobrazí sa to tu.');
  }
  return `<div class="more-feed">${recentCompleted.map(task => `<div><span>✅</span><strong>${esc(task.title)}</strong><small>${task.completedDate ? formatTaskDate(task.completedDate.slice(0,10)) : 'Dokončené'}</small></div>`).join('')}</div>`;
}

function renderMoreSettingsHub() {
  const cards = [
    ['appearance','🎨','Vzhľad','Téma, akcent, text a hustota'],
    ['notifications','🔔','Oznámenia','Pripomienky a push nastavenia'],
    ['account','👤','Účet','Profil, prihlásenie a odhlásenie'],
    ['language','🌐','Jazyk','Slovenčina alebo English'],
    ['family','👨‍👩‍👧‍👦','Rodina','Kód, členovia a synchronizácia'],
    ['privacy-security','🔒','Súkromie','Oprávnenia a export dát'],
    ['backup-sync','☁️','Synchronizácia','Backup, restore a rodinný sync'],
    ['data-settings','🧰','Dáta','Import, export a údržba']
  ];
  const body = `<div class="more-grid">${cards.map(c => renderMoreTile(c[0], c[1], c[2], c[3], 'Otvoriť')).join('')}</div>`;
  return renderMoreShell('Nastavenia', 'Len dôležité nastavenia aplikácie', body);
}

function renderMoreAppearancePage() {
  loadSettings();
  const s = appSettings;
  const colors = ['#22C55E','#3B82F6','#F59E0B','#EC4899','#8B5CF6','#06B6D4'];
  const body = `
    ${moreCard('Accent color', `<div class="more-color-grid">${colors.map(c => `<button class="more-color ${s.accentColor === c ? 'active' : ''}" style="--swatch:${c}" onclick="setMoreAccent('${c}')"><span></span></button>`).join('')}</div>`)}
    ${moreCard('Preview cards', (function() { const tp = getTodayRecipes(); return `<div class="more-preview"><div><strong>Dnešný plán</strong><small>${tp.length} / 5 jedál naplánovaných</small></div><button onclick="switchTab('planner')">Naplánovať deň</button></div>`; })())}
    ${moreCard('Text size', `<div class="more-option-grid">${['compact','normal','large'].map(v => morePill(v === 'compact' ? 'Compact' : v === 'normal' ? 'Normal' : 'Large', s.textSize === v, `setMoreTextSize('${v}')`)).join('')}</div>`)}
    ${moreCard('UI density', `<div class="more-option-grid">${['compact','normal'].map(v => morePill(v === 'compact' ? 'Compact' : 'Comfortable', (s.uiDensity === v || (v === 'normal' && s.uiDensity === 'large')), `setMoreDensity('${v}')`)).join('')}</div>`)}

  `;
  return renderMoreShell('Vzhľad', 'Téma, farby a čitateľnosť', body);
}

function setMoreTheme(value) { appSettings.theme = value; saveSettings(); applySettings(); openMorePage('appearance'); }
function setMoreAccent(value) { appSettings.accentColor = value; saveSettings(); applySettings(); openMorePage('appearance'); }
function setMoreTextSize(value) { appSettings.textSize = value; saveSettings(); applySettings(); openMorePage('appearance'); }
function setMoreDensity(value) { appSettings.uiDensity = value; saveSettings(); applySettings(); openMorePage('appearance'); }

function moreToggleRow(icon, title, desc, checked, action) {
  return `<div class="more-setting-row"><span>${icon}</span><div><strong>${title}</strong>${desc ? `<small>${desc}</small>` : ''}</div><label class="toggle-switch"><input type="checkbox" ${checked ? 'checked' : ''} onchange="${action}"><span class="toggle-slider"></span></label></div>`;
}

function moreInputRow(icon, title, desc, value, action, type) {
  return `<label class="more-setting-row"><span>${icon}</span><div><strong>${title}</strong>${desc ? `<small>${desc}</small>` : ''}</div><input class="more-input" type="${type || 'text'}" value="${escAttr(value || '')}" onchange="${action}"></label>`;
}

function setNestedSetting(path, value, page) {
  const parts = path.split('.');
  let target = appSettings;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!target[parts[i]]) target[parts[i]] = {};
    target = target[parts[i]];
  }
  target[parts[parts.length - 1]] = value;
  saveSettings();
  if (page) openMorePage(page);
}

function setMoreCheckbox(path, checked, page) {
  setNestedSetting(path, !!checked, page);
}

function setMoreNumber(path, value, min, max, page) {
  const num = parseInt(value, 10);
  if (Number.isNaN(num) || num < min || num > max) {
    showToast(`Zadaj číslo ${min}-${max}`, 'warning');
    if (page) openMorePage(page);
    return;
  }
  setNestedSetting(path, num, page);
}

function setMoreWeatherLocation(value) {
  setNestedSetting('weather.location', (value || '').trim(), 'home-settings');
}

function setMoreChildAge(value) {
  const clean = String(value || '').trim();
  if (clean && Number.isNaN(parseFloat(clean))) {
    showToast('Zadaj vek ako číslo', 'warning');
    openMorePage('home-settings');
    return;
  }
  if (clean) localStorage.setItem('childAge', clean);
  else localStorage.removeItem('childAge');
  showToast('Uložené', 'success');
  openMorePage('home-settings');
}

function setMoreDeviceName(value) {
  const clean = String(value || '').trim();
  if (!clean) return;
  localStorage.setItem('deviceName', clean);
  if (familyDbRef) {
    try { familyDbRef.child('members').child(getDeviceId()).update({ name: clean }); } catch(e) {}
  }
  showToast('Názov zariadenia uložený', 'success');
  openMorePage('family');
}

function joinFamilyFromMore() {
  const input = document.getElementById('more-family-code-input');
  const code = input ? input.value.trim() : '';
  if (!code) {
    showToast('Zadaj rodinný kód', 'warning');
    return;
  }
  joinFamily(code);
}

function renderMoreHomeSettingsPage() {
  loadSettings();
  const w = appSettings.homeWidgets || {};
  const widgets = [
    ['weather','🌤️','Počasie','Teplota a sezónna veta v hlavičke'],
    ['todayTasks','✅','Dnešné úlohy','Prehľad úloh na dashboarde'],
    ['hydration','💧','Pitný režim','Voliteľný widget'],
    ['calories','🔥','Kalórie','Nutričný súhrn'],
    ['quickRecipes','🍽️','Rýchle recepty','Rýchle návrhy jedál'],
    ['seasonal','🌿','Sezónny kalendár','Sezónne odporúčania']
  ];
  const body = `
    ${moreCard('Widgety domova', widgets.map(([key, icon, title, desc]) => moreToggleRow(icon, title, desc, !!w[key], `setMoreCheckbox('homeWidgets.${key}', this.checked, 'home-settings')`)).join(''))}
    ${moreCard('Počasie', `
      ${moreToggleRow('🌤️','Počasie aktívne','Použije sa v kompaktnej hlavičke', !!appSettings.weather.enabled, "setMoreCheckbox('weather.enabled', this.checked, 'home-settings')")}
      ${moreInputRow('📍','Mesto','Prázdne = automaticky alebo bez lokality', appSettings.weather.location || '', "setMoreWeatherLocation(this.value)")}
    `)}
    ${moreCard('Dieťa', `${moreInputRow('👶','Vek dieťaťa','Používa sa pre detské odporúčania', localStorage.getItem('childAge') || '', "setMoreChildAge(this.value)", 'number')}`)}
    ${moreCard('Reset', `<button class="more-secondary" onclick="resetWidgetsToDefaults();openMorePage('home-settings')">Obnoviť predvolené widgety</button>`)}
  `;
  return renderMoreShell('Domov', 'Widgety, počasie a detské nastavenia', body);
}

function renderMoreMealSettingsPage() {
  loadSettings();
  const m = appSettings.mealPlanner || {};
  const body = `
    ${moreCard('Jedálniček', `
      ${moreInputRow('🍽️','Predvolené porcie','Použité pri plánovaní a receptoch', m.defaultServings || 4, "setMoreNumber('mealPlanner.defaultServings', this.value, 1, 8, 'meal-settings')", 'number')}
      ${moreToggleRow('📊','Zobrazovať nutričné hodnoty','Kalórie a makrá v pláne', !!m.showNutrition, "setMoreCheckbox('mealPlanner.showNutrition', this.checked, 'meal-settings')")}
    `)}
    ${moreCard('AI plánovanie', `
      ${moreActionRow('🚀','AI Týždeň','Generovanie týždenného plánu',"openMorePage('ai-week')")}
      ${moreActionRow('📅','Týždenný plán','Otvoriť plánovač',"switchTab('planner')")}
    `)}
  `;
  return renderMoreShell('Jedálniček', 'Porcie, výživa a plánovanie', body);
}

function renderMoreShoppingSettingsPage() {
  loadSettings();
  const shopping = appSettings.shopping || {};
  const quickAdd = appSettings.quickAdd || {};
  const body = `
    ${moreCard('Nákup', `
      ${moreToggleRow('🛒','Režim obchodu','Prispôsobí nákupný zoznam pre obchod', !!shopping.storeMode, "setMoreCheckbox('shopping.storeMode', this.checked, 'shopping-settings')")}
      ${moreToggleRow('📦','Auto kategórie','Automaticky triedi položky', !!shopping.autoCategories, "setMoreCheckbox('shopping.autoCategories', this.checked, 'shopping-settings')")}
      ${moreToggleRow('🤖','AI nákupný zoznam','AI návrhy položiek z plánu', !!shopping.aiShoppingList, "setMoreCheckbox('shopping.aiShoppingList', this.checked, 'shopping-settings')")}
      ${moreToggleRow('➕','Rýchle pridanie','Plávajúce tlačidlo pre pridanie', !!quickAdd.enabled, "setMoreCheckbox('quickAdd.enabled', this.checked, 'shopping-settings')")}
    `)}
    ${moreCard('Prepojenia', `
      ${moreActionRow('🛒','Aktuálny nákup','Otvoriť nákupný zoznam',"switchTab('shopping')")}
      ${moreActionRow('👨‍👩‍👧‍👦','Zdieľané položky', familyCode ? 'Aktívne s rodinou' : 'Rodina nepripojená',"openMorePage('family')")}
    `)}
  `;
  return renderMoreShell('Nákup nastavenia', 'Režim obchodu, kategórie a AI', body);
}

function renderMoreDataSettingsPage() {
  const recipeCount = Array.isArray(recipes) ? recipes.length : 0;
  const taskCount = Array.isArray(tasks) ? tasks.length : 0;
  const shoppingCount = Array.isArray(shopItems) ? shopItems.length : 0;
  const body = `
    ${moreCard('Aktuálne dáta', `<div class="more-stat-grid"><div><strong>${recipeCount}</strong><small>recepty</small></div><div><strong>${taskCount}</strong><small>úlohy</small></div><div><strong>${shoppingCount}</strong><small>nákup</small></div></div>`)}
    ${moreCard('Import a recepty', `
      ${moreActionRow('🌐','Import receptu z URL','Otvorí import URL obrazovku','showImportUrlModal()')}
      ${moreActionRow('🖼️','Obnoviť obrázky','Znovu načíta obrázky receptov',"refreshRecipeImages();openMorePage('data-settings')")}
      ${moreActionRow('🤖','AI nutričné hodnoty','Doplniť výživu cez AI','aiBatchNutrition()')}
    `)}
    ${moreCard('Backup', `
      ${moreActionRow('📦','Export / backup','Stiahnuť zálohu dát',"createBackup();openMorePage('data-settings')")}
      ${moreActionRow('☁️','Backup a sync','Zálohy a rodinná synchronizácia',"openMorePage('backup-sync')")}
    `)}
    ${moreCard('Údržba', `
      ${moreActionRow('❓','Onboarding centrum','Návody bez modálneho okna',"openMorePage('onboarding')")}
      ${moreActionRow('🧪','Demo recepty','Obnoviť demo recepty cez potvrdenie','__confirmDemo && __confirmDemo()')}
      ${moreActionRow('🗑️','Vymazať všetky dáta','Nebezpečná akcia cez potvrdenie','__confirmDeleteAll && __confirmDeleteAll()','›')}
    `)}
  `;
  return renderMoreShell('Dáta a údržba', 'Import, export a servisné akcie', body);
}

function renderMoreTaskRows(items, emptyText, actionLabel) {
  if (!items.length) {
    return moreEmptyState('✅', emptyText, 'Zobrazujú sa iba tvoje reálne úlohy.', actionLabel, "switchTab('tasks')");
  }
  return `<div class="more-feed">${items.slice(0, 4).map(t => `<div><span>${t.completed ? '☑' : '☐'}</span><strong>${esc(t.title)}</strong><small>${t.date ? formatTaskDate(t.date) : (t.completedDate ? formatTaskDate(t.completedDate.slice(0,10)) : '')}</small></div>`).join('')}</div>`;
}

function renderMoreRecipesShortcutPage() {
  const recent = Array.isArray(recipes) ? recipes.slice(-5).reverse() : [];
  const favorites = Array.isArray(recipes) ? recipes.filter(r => r.favorite).slice(0, 4) : [];
  const body = `
    ${moreCard('Receptár', `<div class="more-stat-grid"><div><strong>${recipes.length}</strong><small>receptov</small></div><div><strong>${favorites.length}</strong><small>obľúbené</small></div></div>`)}
    ${moreCard('Nedávne recepty', recent.length ? `<div class="more-feed">${recent.map(r => `<div onclick="viewRecipe(${r.id})" style="cursor:pointer"><span>🍽️</span><strong>${esc(r.name)}</strong><small>${r.time || 20} min</small></div>`).join('')}</div>` : moreEmptyState('📖', 'Zatiaľ žiadne recepty', 'Importuj alebo vytvor prvý recept.', 'Otvoriť recepty', "switchTab('home')"))}
    ${moreCard('Akcie', `<div class="more-option-grid">${[
      ['Otvoriť recepty',"switchTab('home')"],
      ['Importovať URL',"showImportUrlModal()"],
      ['AI odporúčanie',"aiDailyTip()"]
    ].map(x => morePill(x[0], false, x[1])).join('')}</div>`)}
  `;
  return renderMoreShell('Recepty', 'Receptár, import a odporúčania', body, "<button class=\"more-top-action\" onclick=\"switchTab('home')\">Receptár</button>");
}

function renderMoreBoardPage() {
  const todaysRecipes = getTodayRecipes();
  const shoppingCount = Array.isArray(shopItems) ? shopItems.filter(i => i && !i.checked).length : 0;
  const todayTasks = getTodayTasks();
  const openTasks = Array.isArray(tasks) ? tasks.filter(t => !t.completed).length : 0;
  const aiRecipe = pickDashboardAiRecipe();
  const body = `
    ${moreCard('Dnešné jedlá', todaysRecipes.length ? `<div class="more-feed">${todaysRecipes.slice(0, 3).map(r => `<div><span>🍽️</span><strong>${esc(r.name)}</strong><small>${r.time || 20} min</small></div>`).join('')}</div>` : `<div class="more-empty-line">Dnes ešte nie sú naplánované jedlá.</div>`)}
    ${moreCard('Nákup', `<div class="more-board-row"><span>🛒</span><strong>${shoppingCount} položiek čaká</strong><button onclick="switchTab('shopping')">Otvoriť</button></div>`)}
    ${moreCard('Úlohy', todayTasks.length ? renderMoreTaskRows(todayTasks, '', 'Otvoriť úlohy') : `<div class="more-board-row"><span>✅</span><strong>${openTasks} otvorených úloh spolu</strong><button onclick="switchTab('tasks')">Otvoriť</button></div>`)}
    ${moreCard('AI odporúčanie', aiRecipe ? `<div class="more-board-row"><span>🤖</span><strong>${esc(aiRecipe.name)}</strong><button onclick="viewRecipe(${aiRecipe.id})">Pozrieť</button></div>` : moreEmptyState('🤖', 'AI nemá návrh', 'Pridaj recepty pre odporúčanie.'))}
  `;
  return renderMoreShell('Nástenka', 'Dnešný prehľad jedál, nákupu a úloh', body);
}

function renderMoreLanguagePage() {
  const current = appSettings.lang || lang || 'sk';
  const body = `
    ${moreCard('Language cards', `<div class="more-language-grid">
      <button class="${current === 'sk' ? 'active' : ''}" onclick="setMoreLanguage('sk')"><span>🇸🇰</span><strong>Slovenčina</strong><small>Okamžitý náhľad aplikácie</small></button>
      <button class="${current === 'en' ? 'active' : ''}" onclick="setMoreLanguage('en')"><span>🇬🇧</span><strong>English</strong><small>Instant app preview</small></button>
    </div>`)}
    ${moreCard('Instant preview', `<div class="more-live-preview"><span>🌐</span><div><strong>${current === 'sk' ? 'Dnešné jedlá' : "Today's meals"}</strong><small>${current === 'sk' ? 'Recepty, nákup, úlohy a plánovač v slovenčine' : 'Recipes, shopping, tasks and planner in English'}</small></div><button onclick="setMoreLanguage(current === 'sk' ? 'en' : 'sk')">↻</button></div>`)}
  `;
  return renderMoreShell('Jazyk', 'Vyber jazyk aplikácie', body);
}

function setMoreLanguage(value) {
  appSettings.lang = value;
  lang = value;
  localStorage.setItem('lang', value);
  saveSettings();
  applyLang();
  openMorePage('language');
}

function renderMoreAiWeekPage() {
  const plannedMeals = Object.values(mealPlan || {}).reduce((sum, week) => sum + Object.values(week || {}).reduce((daySum, day) => daySum + Object.values(day || {}).filter(Boolean).length, 0), 0);
  const childAge = localStorage.getItem('childAge') || '';
  const previousPlans = plannedMeals
    ? `<div class="more-feed"><div><span>📅</span><strong>Aktuálny plán</strong><small>${plannedMeals} jedál v plánovači</small></div></div>`
    : moreEmptyState('📅', 'Zatiaľ žiadny uložený plán', 'Keď naplánuješ týždeň, zobrazí sa tu reálny stav.');
  const body = `
    ${moreCard('Generate week plan', `<div class="more-ai-panel"><span>🚀</span><strong>AI pripraví týždeň podľa aktuálnych dát</strong><small>Recepty: ${recipes.length} · naplánované jedlá: ${plannedMeals}</small><button class="more-primary" onclick="aiGenerateFullWeek()">Generovať plán</button></div>`)}
    ${moreCard('Rodina a dieťa', `<div class="more-chip-row"><span>${familyCode ? '👨👩👧👦 Rodina pripojená' : '👤 Lokálny režim'}</span>${childAge ? `<span>👶 Dieťa ${esc(childAge)} rokov</span>` : '<span>👶 Vek dieťaťa nenastavený</span>'}<button class="more-pill" onclick="openMorePage('home-settings')" style="border-color:var(--primary);color:var(--primary)">✏️ Upraviť</button></div>`)}
    ${moreCard('Diet preferences', (appSettings.dietPrefs && appSettings.dietPrefs.length) ? `<div class="more-chip-row">${appSettings.dietPrefs.map(d => `<span>${d}</span>`).join('')}</div>` : moreEmptyState('🥗', 'Diétne preferencie nie sú nastavené', 'Nastav ich v Nastavenia → Jedálniček pre lepšie AI návrhy.', 'Nastaviť', "openMorePage('meal-settings')"))}
    ${moreCard('Aktuálny plán', previousPlans + `<button class="more-secondary" onclick="switchTab('planner')" style="margin-top:.5rem">📅 ${lang==='en' ? 'Open planner' : 'Otvoriť plánovač'}</button>`)}
    ${moreCard('AI suggestions', recipes.length ? `<div class="more-feed">${recipes.slice(0, 5).map(r => `<div onclick="viewRecipe(${r.id})" style="cursor:pointer"><span>🍽️</span><strong>${esc(r.name)}</strong><small>${r.time || 20} min</small></div>`).join('')}</div><small class="more-muted" style="display:block;margin-top:.3rem;color:var(--text3);font-size:.7rem">${lang==='en' ? 'Click a recipe to view details' : 'Klikni na recept pre zobrazenie detailu'}</small>` : moreEmptyState('🤖', 'AI nemá z čoho odporúčať', 'Pridaj recepty alebo importuj recept z URL.'))}
  `;
  return renderMoreShell('AI Týždeň', 'Plánovanie s preferenciami', body);
}

function renderMoreOnboardingPage() {
  const onboardDone = localStorage.getItem('onboardingCompleted') ? true : false;
  const hasData = recipes.length > 0 || tasks.length > 0 || Object.keys(mealPlan || {}).length > 0;
  const hasFamily = !!familyCode;
  const hasAiPlan = localStorage.getItem('_aiPlanGenerated') ? true : false;
  const steps = [
    { label: 'Introduction', desc: 'Základy aplikácie', done: onboardDone },
    { label: 'Features', desc: 'Jedlá, recepty, nákup, úlohy', done: hasData },
    { label: 'Family sync', desc: 'Zdieľanie v rodine', done: hasFamily },
    { label: 'Recipe import', desc: 'Import receptov z URL', done: recipes.length > 0 },
    { label: 'AI planner', desc: 'Týždenný plán cez AI', done: hasAiPlan }
  ];
  const completed = steps.filter(s => s.done).length;
  const progress = Math.round(completed / steps.length * 100);
  const body = `
    ${moreCard('Tutorial progress', `<div class="more-progress"><span style="width:${progress}%"></span></div><small class="more-muted">${progress}% dokončené</small>`)}
    ${moreCard('Onboarding center', `<div class="more-feed">${steps.map(i => `<div><span>${i.done ? '✅' : '❓'}</span><strong>${i.label}</strong><small>${i.desc}</small></div>`).join('')}</div>`)}
    ${moreCard('Ďalší krok', `<div class="more-option-grid">${[
      ['Importovať recept',"showImportUrlModal()"],
      ['Nastaviť rodinu',"openMorePage('family')"],
      ['AI plánovač',"openMorePage('ai-week')"]
    ].map(x => morePill(x[0], false, x[1])).join('')}</div>`)}
  `;
  return renderMoreShell('Onboarding', 'Návody bez modálneho okna', body);
}

function renderMoreNotificationsPage() {
  loadSettings();
  const notifications = appSettings.notifications || {};
  const times = appSettings.notifTimes || {};
  const rows = [
    ['breakfastReminder','breakfast','🌅','Pripomenutie raňajok'],
    ['todayCookingReminder','whatCook','🍳','Čo variť dnes'],
    ['shoppingReminder','shopping','🛒','Ísť nakúpiť'],
    ['hydrationReminder','water','💧','Pitný režim'],
    ['childMealReminder','kids','👶','Jedlo pre dieťa'],
    ['eveningPlanningReminder','evening','🌙','Večerné plánovanie']
  ];
  const body = `
    ${moreCard('Notifications', rows.map(([key, timeKey, icon, title]) => `<div class="more-setting-row"><span>${icon}</span><div><strong>${title}</strong><small>${times[timeKey] || '--:--'} · ${notifications[key] ? 'Zapnuté' : 'Vypnuté'}</small></div><input class="more-time-input" type="time" value="${escAttr(times[timeKey] || '')}" onchange="setNestedSetting('notifTimes.${timeKey}', this.value, 'notifications')"><label class="toggle-switch"><input type="checkbox" ${notifications[key] ? 'checked' : ''} onchange="setMoreCheckbox('notifications.${key}', this.checked, 'notifications')"><span class="toggle-slider"></span></label></div>`).join(''))}
    ${moreCard('Permissions', `${moreActionRow('🔔','Push povolenia', typeof Notification !== 'undefined' ? Notification.permission : 'Nedostupné', 'pushNotifSetup()')}`)}
  `;
  return renderMoreShell('Oznámenia', 'Pripomienky a povolenia', body);
}

function renderMoreAccountPage() {
  const user = authUser ? (authUser.displayName || authUser.email || 'Používateľ') : 'Hosť';
  const authAction = authUser
    ? `<button class="more-danger" onclick="signOutUser()">Odhlásiť</button>`
    : `<button class="more-primary" onclick="signInWithGoogle()">Prihlásiť cez Google</button>`;
  const body = `
    ${moreCard('Account', `<div class="more-account-card"><button class="more-avatar">${getDashboardAvatar()}</button><div><strong>${esc(user)}</strong><small>${authUser ? 'Prihlásený účet' : 'Režim hosťa'}</small></div></div>`)}
    ${moreCard('Email', `${moreInfoRow('✉️','Email', authUser && authUser.email ? authUser.email : 'Nepripojený', authUser ? 'Google' : '')}`)}
    ${moreCard('Plán', `${moreInfoRow('⭐','Mealnest','Aktuálne free plán', 'Free')}`)}
    ${moreCard(authUser ? 'Logout' : 'Login', authAction)}
  `;
  return renderMoreShell('Účet', 'Profil a prihlásenie', body);
}

function renderMoreNotificationsAccountPage() {
  const body = `
    ${moreCard('Notifications', `${moreActionRow('🔔','Push notifikácie','Raňajky, nákup a plánovanie',"openMorePage('notifications')")}`)}
    ${moreCard('Email', `${moreActionRow('✉️','Email','Nastavenia emailovej komunikácie',"openMorePage('account')")}`)}
    ${moreCard('Account', `${moreActionRow('👤','Účet','Profil a prihlásenie',"openMorePage('account')")}`)}
    ${moreCard('Subscription', `${moreActionRow('⭐','Predplatné','Free plán',"openMorePage('account')")}`)}
    ${moreCard(authUser ? 'Logout' : 'Login', authUser ? `<button class="more-danger" onclick="signOutUser()">Logout</button>` : `<button class="more-primary" onclick="signInWithGoogle()">Prihlásiť cez Google</button>`)}
  `;
  return renderMoreShell('Notifikácie a účet', 'Komunikácia, účet a predplatné', body);
}

function renderMoreBackupSyncPage() {
  const syncText = familyCode ? 'Rodinný sync aktívny' : 'Lokálny režim';
  const lastBackup = parseInt(localStorage.getItem('_lastBackup') || '0', 10);
  const lastBackupText = lastBackup ? new Date(lastBackup).toLocaleString(lang === 'en' ? 'en-GB' : 'sk-SK') : 'Zatiaľ nebola vytvorená záloha';
  let backupHistory = [];
  try { backupHistory = JSON.parse(localStorage.getItem('_backupHistoryLocal') || '[]'); } catch(e) { backupHistory = []; }
  const body = `
    ${moreCard('Last sync', `<div class="more-board-row"><span>☁️</span><strong>${syncText}</strong><small>${familyCode ? 'Aktívne' : 'Bez rodiny'}</small></div>`)}
    ${moreCard('Backup now', `<button class="more-primary" onclick="createBackup()">${lang==='en' ? 'Backup now' : 'Zálohovať teraz'}</button>`)}
    ${moreCard('Last backup', `<div class="more-board-row"><span>📦</span><strong>${esc(lastBackupText)}</strong><small>${lang==='en' ? 'This device' : 'Lokálne zariadenie'}</small></div>`)}
    ${moreCard('Restore backup', `<button class="more-secondary" onclick="restoreBackupFromFile()">${lang==='en' ? 'Restore backup' : 'Obnoviť zálohu'}</button>`)}
    ${moreCard('Family sync status', `${moreActionRow('👨‍👩‍👧‍👦','Family sync status', syncText, "openMorePage('family')")}`)}
    ${moreCard('History', backupHistory.length ? `<div class="more-feed">${backupHistory.slice(-3).reverse().map(item => `<div><span>📦</span><strong>Backup</strong><small>${esc(item)}</small></div>`).join('')}</div>` : moreEmptyState('📦', 'Zatiaľ žiadna história záloh', 'Keď vytvoríš backup, zobrazí sa tu reálny čas.'))}
  `;
  return renderMoreShell('Backup a sync', 'Zálohy, obnovenie a história', body);
}

function renderMorePrivacySecurityPage() {
  const body = `
    ${moreCard('Password', `${moreActionRow('🔑','Password','Správa hesla účtu',"openMorePage('account')")}`)}
    ${moreCard('Privacy controls', `${moreActionRow('🛡️','Privacy controls','Rodinné zdieľanie a viditeľnosť',"openMorePage('family')")}`)}
    ${moreCard('Permissions', `${moreActionRow('🔔','Permissions','Notifikácie a lokálne úložisko',"openMorePage('notifications')")}`)}
    ${moreCard('Export data', `<button class="more-secondary" onclick="createBackup()">Export data</button>`)}
    ${moreCard('Delete local data', `<button class="more-danger" onclick="__confirmDeleteAll && __confirmDeleteAll()">Vymazať lokálne dáta</button>`)}
  `;
  return renderMoreShell('Súkromie', 'Bezpečnosť, dáta a oprávnenia', body);
}

function renderMoreAboutPage() {
  const body = `
    ${moreCard('Version', `<div class="more-board-row"><span>🍽️</span><strong>Mealnest</strong><small>v${APP_VERSION} · ${lang==='en' ? 'GitHub build' : 'GitHub build'}</small></div>`)}
    ${moreCard('Changelog', `<div class="more-feed"><div><span>✨</span><strong>${lang==='en' ? 'Dashboard & More section' : 'Nový Dashboard a Viac'}</strong><small>${lang==='en' ? 'Premium mobile design' : 'Prémiový mobilný dizajn'}</small></div><div><span>🛒</span><strong>${lang==='en' ? 'Shopping & Tasks' : 'Nákup a úlohy'}</strong><small>${lang==='en' ? 'Quick overviews' : 'Rýchle prehľady'}</small></div></div>`)}
    ${moreCard('Licenses', `${moreInfoRow('📄','Licenses','Open-source knižnice a assety','Info')}`)}
    ${moreCard('Contact', `${moreInfoRow('✉️','Contact','Podpora aplikácie','mealnest@app.com')}`)}
    ${moreCard('Terms', `${moreInfoRow('📜','Terms','Podmienky používania','Privacy')}`)}
    ${moreCard('Privacy policy', `${moreActionRow('🔒','Privacy policy','Ochrana súkromia',"window.open('privacy-policy.html', '_blank')")}`)}
  `;
  return renderMoreShell('O aplikácii', 'Verzia, licencie a dokumenty', body);
}

window.renderMoreScreen = renderMoreScreen;
window.renderMoreHome = renderMoreHome;
window.openMorePage = openMorePage;
window.switchTab = switchTab;
window.renderTasks = renderTasks;
window.copyFamilyInvite = copyFamilyInvite;
window.setMoreTheme = setMoreTheme;
window.setMoreAccent = setMoreAccent;
window.setMoreTextSize = setMoreTextSize;
window.setMoreDensity = setMoreDensity;
window.setMoreLanguage = setMoreLanguage;

// =================== PULL TO REFRESH ===================
var _ptrState = null;
function initPullToRefresh() {
  var ptrEl = document.createElement('div');
  ptrEl.className = 'ptr-indicator';
  ptrEl.innerHTML = '<div class="ptr-spinner"></div><span class="ptr-text">' + (lang==='en'?'Pull to refresh':'Potiahnite pre obnovenie') + '</span>';
  document.body.appendChild(ptrEl);
  
  var main = document.querySelector('.container') || document.body;
  main.addEventListener('touchstart', function(e) {
    if (window.scrollY > 5) return;
    if (e.target.closest('input') || e.target.closest('button') || e.target.closest('.bottom-nav') || e.target.closest('.modal-overlay.active') || e.target.closest('.sheet-overlay') || e.target.closest('.cooking-overlay.active')) return;
    _ptrState = { startY: e.touches[0].clientY, pulled: false, ready: false };
  }, { passive: true });
  
  main.addEventListener('touchmove', function(e) {
    if (!_ptrState || _ptrState.refreshing) return;
    var dy = e.touches[0].clientY - _ptrState.startY;
    if (dy < 0) { _ptrState = null; ptrEl.classList.remove('ptr-visible', 'ptr-ready'); return; }
    dy = Math.min(dy, 120);
    ptrEl.style.transform = 'translateY(' + (dy * 0.4) + 'px)';
    ptrEl.style.opacity = Math.min(1, dy / 80);
    _ptrState.pulled = dy > 40;
    if (dy > 80 && !_ptrState.ready) {
      _ptrState.ready = true;
      ptrEl.classList.add('ptr-ready');
      ptrEl.querySelector('.ptr-text').textContent = lang==='en' ? 'Release to refresh' : 'Pustite pre obnovenie';
    } else if (dy <= 80 && _ptrState.ready) {
      _ptrState.ready = false;
      ptrEl.classList.remove('ptr-ready');
      ptrEl.querySelector('.ptr-text').textContent = lang==='en' ? 'Pull to refresh' : 'Potiahnite pre obnovenie';
    }
  }, { passive: true });
  
  main.addEventListener('touchend', function(e) {
    if (!_ptrState) return;
    if (_ptrState.ready && _ptrState.pulled) {
      ptrEl.classList.add('ptr-visible');
      ptrEl.style.transform = '';
      ptrEl.style.opacity = '1';
      ptrEl.querySelector('.ptr-text').textContent = lang==='en' ? 'Refreshing...' : 'Obnovujem...';
      _ptrState.refreshing = true;
      doPullRefresh();
    } else {
      ptrEl.style.transform = '';
      ptrEl.style.opacity = '0';
      ptrEl.classList.remove('ptr-visible', 'ptr-ready');
    }
    _ptrState = null;
  }, { passive: true });
}

function doPullRefresh() {
  var tab = document.body.dataset.tab;
  if (tab === 'home') render();
  else if (tab === 'shopping') renderShoppingList();
  else if (tab === 'planner') renderPlanner();
  else if (tab === 'tasks') renderTasks();
  else if (tab === 'dashboard') renderDashboard();
  var ptrEl = document.querySelector('.ptr-indicator');
  setTimeout(function() {
    if (ptrEl) {
      ptrEl.classList.remove('ptr-visible', 'ptr-ready');
      ptrEl.querySelector('.ptr-text').textContent = lang==='en' ? 'Pull to refresh' : 'Potiahnite pre obnovenie';
    }
    var el = document.querySelector('.ptr-indicator');
    if (el) { el.style.opacity = '0'; setTimeout(function() { el.style.opacity = ''; }, 300); }
  }, 500);
}

// =================== PREVENT CONTEXT MENU ===================
document.addEventListener('contextmenu', function(e) {
  // Allow context menu on input/textarea
  if (e.target.closest && !e.target.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
    haptic(6);
  }
});
document.addEventListener('selectstart', function(e) {
  if (e.target.closest && !e.target.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
  }
});

// =================== HAPTIC FEEDBACK ===================
function haptic(ms) {
  try {
    if (!navigator.vibrate) return;
    if (navigator.userActivation && !navigator.userActivation.isActive) return;
    navigator.vibrate(ms || 8);
  } catch(e) {}
}

// =================== ANIMATED HEADER ON SCROLL ===================
function initScrollHeader() {
  var ticking = false;
  var body = document.body;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        var scrollY = window.scrollY || window.pageYOffset;
        body.classList.toggle('header-collapsed', scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// =================== SWIPE BETWEEN TABS ===================
var _swipeTabData = null;
function initSwipeTabs() {
  var main = document.querySelector('.container') || document.body;
  main.addEventListener('touchstart', function(e) {
    // Don't swipe on interactive elements
    if (e.target.closest('input') || e.target.closest('button') || e.target.closest('.bottom-nav') || e.target.closest('.modal-overlay.active') || e.target.closest('.sheet-overlay') || e.target.closest('.cooking-overlay.active')) return;
    _swipeTabData = { startX: e.touches[0].clientX, startY: e.touches[0].clientY };
  }, { passive: true });
  
  main.addEventListener('touchmove', function(e) {
    if (!_swipeTabData) return;
    var dx = e.touches[0].clientX - _swipeTabData.startX;
    var dy = Math.abs(e.touches[0].clientY - _swipeTabData.startY);
    if (Math.abs(dx) < 30 || dy > Math.abs(dx) * 0.5) { _swipeTabData = null; return; }
    e.preventDefault();
  }, { passive: false });
  
  main.addEventListener('touchend', function(e) {
    if (!_swipeTabData) return;
    var dx = e.changedTouches[0].clientX - _swipeTabData.startX;
    var dy = Math.abs(e.changedTouches[0].clientY - _swipeTabData.startY);
    if (Math.abs(dx) < 60 || dy > Math.abs(dx) * 0.6) { _swipeTabData = null; return; }
    var tabs = ['dashboard', 'home', 'planner', 'shopping', 'tasks', 'board'];
    var current = document.body.dataset.tab || 'dashboard';
    var idx = tabs.indexOf(current);
    if (dx > 0 && idx > 0) { switchTab(tabs[idx - 1]); }
    else if (dx < 0 && idx < tabs.length - 1) { switchTab(tabs[idx + 1]); }
    _swipeTabData = null;
  }, { passive: true });
}
// =================== LONG PRESS ON RECIPES ===================
function initLongPress() {
  document.addEventListener('touchstart', function(e) {
    var card = e.target.closest('.recipe-card');
    if (!card) return;
    _longPressTimer = setTimeout(function() {
      showLongPressMenu(card, e.touches[0].clientX, e.touches[0].clientY);
    }, 400);
  }, { passive: true });
  document.addEventListener('touchend', function() { clearTimeout(_longPressTimer); }, { passive: true });
  document.addEventListener('touchmove', function() { clearTimeout(_longPressTimer); }, { passive: true });
}

var _longPressTimer = null;
function showLongPressMenu(card, x, y) {
  var id = card.dataset.id;
  if (!id) return;
  document.querySelectorAll('.longpress-menu').forEach(function(m) { m.remove(); });
  var menu = document.createElement('div');
  menu.className = 'longpress-menu';
  var r = card.getBoundingClientRect();
  var left = Math.min(x, window.innerWidth - 170);
  var top = Math.min(y, window.innerHeight - 200);
  menu.style.left = left + 'px';
  menu.style.top = top + 'px';
  menu.innerHTML = '<button onclick="viewRecipe(' + id + ');this.closest(\'.longpress-menu\').remove()">📖 ' + (lang==='en'?'View':'Zobraziť') + '</button><button onclick="var r=recipes.find(x=>x.id==' + id + ');if(r){openFormModal(r)};this.closest(\'.longpress-menu\').remove()">✏️ ' + (lang==='en'?'Edit':'Upraviť') + '</button><button onclick="toggleFav(' + id + ');this.closest(\'.longpress-menu\').remove()">❤️ ' + (lang==='en'?'Favorite':'Obľúbené') + '</button><button class=\"danger\" onclick=\"if(confirm(\'' + (lang==='en'?'Delete this recipe?':'Zmazať tento recept?') + '\')){var ri=recipes.findIndex(x=>x.id==' + id + ');if(ri>=0){recipes.splice(ri,1);saveToLS();render()}};this.closest(\'.longpress-menu\').remove()\">🗑 ' + (lang==='en'?'Delete':'Zmazať') + '</button>';
  document.body.appendChild(menu);
  haptic(15);
  var closer = function(x) {
    if (!x.target.closest('.longpress-menu')) { menu.remove(); document.removeEventListener('click', closer); }
  };
  setTimeout(function() { document.addEventListener('click', closer); }, 100);
}

// Initialize on load
// ======================== CLOSE MODAL ON OUTSIDE CLICK ========================
document.addEventListener('click', function(e) {
  var modal = e.target.closest('.modal-overlay.active, #confirm-modal');
  if (modal && e.target === modal) {
    // Clicked on overlay background, close it
    var closeBtn = modal.querySelector('.modal-close, .sheet-close');
    if (closeBtn) closeBtn.click();
    else { modal.classList.remove('active'); setTimeout(function() { modal.style.display = 'none'; }, 200); }
  }
});

// ======================== SWIPE TO CLOSE MODAL ========================
function setupDetailSwipeClose() {
  var overlay = document.getElementById('detail-modal');
  if (!overlay || overlay.dataset.swipeInit) return;
  overlay.dataset.swipeInit = '1';
  var startX = 0, startY = 0, swiping = false;
  overlay.addEventListener('touchstart', function(e) {
    if (overlay.style.display === 'none') return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    swiping = false;
  }, { passive: true });
  overlay.addEventListener('touchmove', function(e) {
    if (!startX) return;
    var dx = e.touches[0].clientX - startX;
    var dy = e.touches[0].clientY - startY;
    // Only trigger for horizontal right swipe from left edge
    if (Math.abs(dy) > Math.abs(dx) * 0.8) { swiping = false; return; }
    if (dx > 30 && startX < 40) {
      swiping = true;
      overlay.style.transform = 'translateX(' + (dx * 0.5) + 'px)';
      overlay.style.transition = 'none';
    }
  }, { passive: true });
  overlay.addEventListener('touchend', function(e) {
    if (!startX) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (swiping && dx > 80 && startX < 40) {
      closeModal('detail-modal');
    }
    overlay.style.transform = '';
    overlay.style.transition = '';
    startX = 0; startY = 0; swiping = false;
  }, { passive: true });
}

// ======================== TOAST NOTIFICATIONS ========================
function showToast(msg, type, duration) {
  type = type || 'info';
  duration = duration || 3000;
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type + ' toast-stacked';
  toast.innerHTML = '<span class="toast-icon">' + (icons[type] || 'ℹ️') + '</span><span class="toast-text">' + esc(msg) + '</span>';
  // Stack positioning - shift existing toasts up
  var existing = container.querySelectorAll('.toast');
  existing.forEach(function(t) {
    t.style.transform = 'translateY(-' + (existing.length * 6) + 'px)';
    t.style.opacity = Math.max(0.3, 1 - existing.length * 0.12);
  });
  container.appendChild(toast);
  setTimeout(function() {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(function() {
      toast.remove();
      // Restore remaining toasts
      container.querySelectorAll('.toast').forEach(function(t, i) {
        t.style.transform = '';
        t.style.opacity = '';
      });
    }, 300);
  }, duration);
}

function showUndoToast(msg, undoFn, duration) {
  duration = duration || 5000;
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  let used = false;
  const toast = document.createElement('div');
  toast.className = 'toast toast-info toast-stacked toast-undo';
  toast.innerHTML = '<span class="toast-icon">↩️</span><span class="toast-text">' + esc(msg) + '</span><button class="toast-action">' + (lang === 'en' ? 'Undo' : 'Späť') + '</button>';
  const action = toast.querySelector('.toast-action');
  if (action) {
    action.onclick = function(e) {
      e.stopPropagation();
      if (used) return;
      used = true;
      try { undoFn && undoFn(); } catch(err) { console.error('Undo failed:', err); }
      toast.remove();
    };
  }
  container.appendChild(toast);
  setTimeout(function() {
    if (used || !toast.parentNode) return;
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(function() { toast.remove(); }, 300);
  }, duration);
}

// =================== GLOBAL ERROR HANDLER ===================
window.onerror = function(msg, url, line, col, err) {
  var el = document.getElementById('boot-status');
  if (el) {
    el.style.display = 'block';
    el.style.background = 'rgba(220,38,38,.9)';
    el.textContent = '⚠️ Chyba: ' + (msg || '').slice(0,80);
    setTimeout(function() { el.style.display = 'none'; }, 5000);
  }
  console.error('GLOBAL:', msg, url, line);
};
window.addEventListener('unhandledrejection', function(e) {
  console.warn('Unhandled promise rejection:', e.reason);
  e.preventDefault();
});

// =================== PREVENT CONTEXT MENU ===================
document.addEventListener('contextmenu', function(e) {
  // Allow context menu on input/textarea
  if (e.target.closest && !e.target.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
    haptic(6);
  }
});
document.addEventListener('selectstart', function(e) {
  if (e.target.closest && !e.target.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
  }
});

// =================== HAPTIC FEEDBACK ===================
function haptic(ms) {
  try {
    if (!navigator.vibrate) return;
    if (navigator.userActivation && !navigator.userActivation.isActive) return;
    navigator.vibrate(ms || 8);
  } catch(_) {}
}

// =================== CONFETTI ===================
function triggerConfetti() {
  try {
    var colors = ['#10b981','#34d399','#06b6d4','#f59e0b','#a78bfa','#f472b6','#ef4444'];
    for (var i = 0; i < 30; i++) {
      var c = document.createElement('div');
      c.style.cssText = 'position:fixed;width:6px;height:6px;border-radius:2px;z-index:99999;pointer-events:none;' +
        'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
        'left:' + (Math.random() * 100) + 'vw;' +
        'top:-10px;' +
        'opacity:' + (.6 + Math.random() * .4) + ';' +
        'transform:rotate(' + (Math.random() * 360) + 'deg);';
      document.body.appendChild(c);
      var x = parseFloat(c.style.left);
      var drift = (Math.random() - .5) * 100;
      var fall = 300 + Math.random() * 400;
      var rot = 360 + Math.random() * 720;
      c.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(' + fall + 'px) translateX(' + drift + 'px) rotate(' + rot + 'deg)', opacity: 0 }
      ], { duration: 1200 + Math.random() * 800, easing: 'cubic-bezier(.25,.46,.45,.94)', fill: 'forwards' });
      setTimeout(function() { c.remove(); }, 2500);
    }
  } catch(_) {}
}

// =================== BUTTON TOUCH RIPPLE ===================

function __confirmDemo() {
  showConfirmModal(
    (lang==='en'?'Reset to demo recipes? All existing recipes will be lost.':'Naozaj obnoviť demo recepty? Všetky existujúce sa stratia.'),
    '⚠️', lang==='en'?'Reset':'Obnoviť',
    function() { resetRecipes(); }
  );
}
function __confirmDeleteAll() {
  showConfirmModal(
    (lang==='en'?'Delete all data? This cannot be undone.':'Naozaj vymazať všetky dáta? Táto akcia je nenávratná.'),
    '☢️', lang==='en'?'Delete all':'Vymazať všetko',
    function() { deleteAllData(); }
  );
}

function addRipple(e, el) {
  try {
    var btn = el || e.currentTarget;
    if (!btn || typeof btn.getBoundingClientRect !== 'function') return;
    var rect = btn.getBoundingClientRect();
    var ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    var size = Math.max(rect.width, rect.height) * 1.5;
    var cx = (e.clientX || rect.left + rect.width/2) - rect.left;
    var cy = (e.clientY || rect.top + rect.height/2) - rect.top;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (cx - size/2) + 'px';
    ripple.style.top = (cy - size/2) + 'px';
    btn.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 500);
  } catch(_) { /* silent */ }
}
document.addEventListener('click', function(e) {
  try {
    var target = e.target;
    if (!target || !target.closest) return;
    var btn = target.closest('.btn, .nav-item, .age-btn, .pln-btn, .plan-type-btn, .pa-btn, .shop-add-btn, .fab-trigger, .hero-btn');
    if (btn && !btn.closest('.bottom-nav')) addRipple(e, btn);
  } catch(_) {}
}, { passive: true });

// =================== LONG PRESS ON BOTTOM NAV ===================
(function initNavLongPress() {
  var longPressTimer = null;
  var longPressTarget = null;

  document.addEventListener('touchstart', function(e) {
    var navItem = e.target.closest('.bottom-nav .nav-item');
    if (!navItem || navItem.dataset.tab === 'tasks') { longPressTarget = null; return; }
    longPressTarget = navItem;
    longPressTimer = setTimeout(function() {
      if (!longPressTarget) return;
      haptic(12);
      var tab = longPressTarget.dataset.tab;
      var actions = {
        dashboard: [
          { icon: '🌙', label: 'Tmavý režim', action: 'toggleDark' },
          { icon: '🌐', label: 'Jazyk', action: 'toggleLang' },
          { icon: '🤖', label: 'AI tip', action: 'aiTip' }
        ],
        planner: [
          { icon: '🤖', label: 'AI týždeň', action: 'aiWeek' },
          { icon: '↺', label: 'Reset', action: 'resetWeek' }
        ],
        shopping: [
          { icon: '🏪', label: 'Režim obchodu', action: 'storeMode' },
          { icon: '🧹', label: 'Vyčistiť hotové', action: 'clearShop' }
        ],
        home: [
          { icon: '🌐', label: 'Import URL', action: 'importUrl' },
          { icon: '🥕', label: 'Čo mám doma', action: 'ingredientSearch' },
          { icon: '🎲', label: 'Náhodný recept', action: 'randomRecipe' }
        ]
      };
      var menu = actions[tab];
      if (!menu) { longPressTarget = null; return; }
      showNavContextMenu(longPressTarget, menu);
      longPressTarget = null;
    }, 400);
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    clearTimeout(longPressTimer);
    longPressTarget = null;
  }, { passive: true });
  document.addEventListener('touchmove', function() {
    clearTimeout(longPressTimer);
    longPressTarget = null;
  }, { passive: true });

  // Also block contextmenu on nav items explicitly
  document.querySelector('.bottom-nav')?.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    e.stopPropagation();
  }, true);

  function showNavContextMenu(anchor, items) {
    var existing = document.getElementById('nav-context-menu');
    if (existing) existing.remove();
    var el = document.createElement('div');
    el.id = 'nav-context-menu';
    el.style.cssText = 'position:fixed;bottom:calc(92px + env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);z-index:10001;background:rgba(18,18,18,.96);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:6px;backdrop-filter:blur(20px);box-shadow:0 8px 32px rgba(0,0,0,.5);min-width:200px;animation:ctxUp .22s cubic-bezier(.22,1,.36,1) both;';
    el.innerHTML = items.map(function(item, i) {
      return '<div class="nav-ctx-item" data-idx="' + i + '" style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;cursor:pointer;font-size:.85rem;color:#fff;transition:background .15s;" onmouseover="this.style.background=\'rgba(255,255,255,.06)\'" onmouseout="this.style.background=\'\'">' +
        '<span style="font-size:1.1rem;">' + item.icon + '</span><span>' + item.label + '</span></div>';
    }).join('');
    el.addEventListener('click', function(ev) {
      var ctxItem = ev.target.closest('.nav-ctx-item');
      if (!ctxItem) return;
      var idx = parseInt(ctxItem.dataset.idx);
      var action = items[idx].action;
      el.remove();
      executeNavAction(action);
    });
    document.body.appendChild(el);
    // Add keyframe
    if (!document.getElementById('ctx-up-style')) {
      var s = document.createElement('style');
      s.id = 'ctx-up-style';
      s.textContent = '@keyframes ctxUp {from{opacity:0;transform:translateX(-50%) translateY(12px) scale(.96)}to{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}}';
      document.head.appendChild(s);
    }
    // Tap outside to close
    setTimeout(function() {
      document.addEventListener('click', function closeCtx(ce) {
        if (!ce.target.closest('#nav-context-menu')) {
          var m = document.getElementById('nav-context-menu');
          if (m) m.remove();
          document.removeEventListener('click', closeCtx);
        }
      }, { once: false });
    }, 10);
  }

  function executeNavAction(action) {
    switch(action) {
      case 'toggleDark':
        try { toggleDarkMode(); } catch(e) {}
        break;
      case 'toggleLang':
        try { openMorePageFromAnywhere('language'); } catch(e) {}
        break;
      case 'aiTip':
        try { aiDailyTip(true); } catch(e) {}
        break;
      case 'aiWeek':
        try { switchTab('planner'); setTimeout(function() { try { aiGenerateFullWeek(); } catch(e) {} }, 200); } catch(e) {}
        break;
      case 'resetWeek':
        try { switchTab('planner'); setTimeout(function() { try { resetWeek(); } catch(e) {} }, 200); } catch(e) {}
        break;
      case 'storeMode':
        try { switchTab('shopping'); setTimeout(function() { try { toggleStoreMode(); } catch(e) {} }, 200); } catch(e) {}
        break;
      case 'clearShop':
        try { switchTab('shopping'); setTimeout(function() { try { clearCheckedItems(); } catch(e) {} }, 200); } catch(e) {}
        break;
      case 'importUrl':
        try { switchTab('home'); setTimeout(function() { try { showImportUrlModal(); } catch(e) {} }, 200); } catch(e) {}
        break;
      case 'ingredientSearch':
        try { document.querySelector('.recipe-tools-toggle')?.click(); setTimeout(function() { try { document.querySelector('[onclick*=\"ingredientSearch\"]')?.click(); } catch(e) {} }, 150); } catch(e) {}
        break;
      case 'randomRecipe':
        try { switchTab('home'); setTimeout(function() { try { randomRecipe(); } catch(e) {} }, 200); } catch(e) {}
        break;
    }
  }
})();
