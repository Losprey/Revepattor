// Mealnest — Tasks and to-dos
// ==========================================

// ======================== TASKS ========================
const TASK_CATEGORIES = [
  { id: 'cooking',  icon: '🥘', color: '#dc2626' },
  { id: 'shopping', icon: '🛒', color: '#f59e0b' },
  { id: 'household',icon: '🧹', color: '#10b981' },
  { id: 'kid',     icon: '👶', color: '#8b5cf6' },
  { id: 'custom',  icon: '⭐', color: '#6b7280' },
];
let tasks = [];
function loadTasks() {
  try { tasks = JSON.parse(localStorage.getItem('tasks') || '[]'); } catch(e) { tasks = []; }
  if (!Array.isArray(tasks)) tasks = [];
  processRecurringTasks();
}
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function processRecurringTasks() {
  const today = new Date().toISOString().slice(0,10);
  let changed = false;
  tasks.forEach(t => {
    if (!t.completed || t.repeat === 'none') return;
    const lastDate = t.completedDate || t.date;
    if (!lastDate) return;
    if (t.repeat === 'daily') {
      if (lastDate < today) {
        t.completed = false;
        t.completedDate = '';
        changed = true;
      }
    } else if (t.repeat === 'weekly') {
      const last = new Date(lastDate);
      const now = new Date(today);
      const daysDiff = Math.floor((now - last) / (1000*60*60*24));
      if (daysDiff >= 7) {
        t.completed = false;
        t.completedDate = '';
        changed = true;
      }
    }
  });
  if (changed) saveTasks();
}
function generateTaskId() {
  return 't_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
}
function taskCatInfo(catId) {
  return TASK_CATEGORIES.find(c => c.id === catId) || TASK_CATEGORIES[4];
}

function getTodayTasks() {
  const today = new Date().toISOString().slice(0,10);
  return tasks.filter(t => t.date === today && !t.completed);
}
function getDateTasks(dateStr) {
  return tasks.filter(t => t.date === dateStr && !t.completed);
}
function getWeekTasks() {
  const today = new Date();
  const start = new Date(today); start.setDate(today.getDate() - today.getDay() + 1);
  const end = new Date(start); end.setDate(start.getDate() + 6);
  const dates = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().slice(0,10));
  }
  return tasks.filter(t => !t.completed && dates.includes(t.date));
}
function getCompletedTasks() {
  return tasks.filter(t => t.completed).sort((a,b) => (b.completedDate||'').localeCompare(a.completedDate||''));
}
function getRecentCompleted() {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  return tasks.filter(t => t.completed && t.completedDate && (now - new Date(t.completedDate).getTime()) < day);
}
function clearCompletedTasks() {
  showConfirmModal(lang==='en'?'Delete all completed tasks?':'Vymazať všetky dokončené úlohy?', '🗑️', lang==='en'?'Delete':'Vymazať', function() {
  
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
  renderDashboard();
  });
}
function getTodayProgress() {
  const today = new Date().toISOString().slice(0,10);
  const dayTasks = tasks.filter(t => t.date === today);
  const total = dayTasks.length;
  const done = dayTasks.filter(t => t.completed).length;
  return { total, done, remaining: total - done };
}

function formatTaskDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
  const today = new Date(); today.setHours(0,0,0,0);
  const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
  const diff = Math.floor((d - today) / (1000*60*60*24));
  if (diff === 0) return lang === 'en' ? 'Today' : 'Dnes';
  if (diff === 1) return lang === 'en' ? 'Tomorrow' : 'Zajtra';
  if (diff > 0 && diff < 7) return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'sk-SK', { weekday: 'long' });
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'sk-SK', { day: 'numeric', month: 'short' });
}

// ===== DASHBOARD WIDGET =====
function renderTaskWidget() {
  const el = document.getElementById('dash-tasks');
  if (!el) return;
  const todayTasks = getTodayTasks();
  const { total, done, remaining } = getTodayProgress();
  const maxShow = 5;
  const showTasks = todayTasks.slice(0, maxShow);
  const circumference = 2 * Math.PI * 13;
  const offset = total > 0 ? circumference * (1 - done / total) : circumference;

  let html = `<div class="tasks-widget">
    <div class="tw-header">
      <div class="tw-title">✅ ${t('tasksHomeTitle')}</div>
      <div class="tw-progress">
        <span style="font-size:.65rem;color:var(--text3);font-weight:600;">${done}/${total}</span>
        <div class="tw-progress-circle">
          <svg viewBox="0 0 32 32"><circle class="bg" cx="16" cy="16" r="13"/><circle class="fg" cx="16" cy="16" r="13" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"/></svg>
          <span class="center">${total > 0 ? Math.round(done/total*100) : 0}%</span>
        </div>
      </div>
    </div>`;

  if (!showTasks.length) {
    html += `<div style="text-align:center;padding:.3rem 0;font-size:.7rem;color:var(--text3);">✨ ${t('tasksHomeEmpty')}</div>`;
  } else {
    html += `<div class="tw-items">${showTasks.map(t => {
      const ci = taskCatInfo(t.category);
      return `<div class="tw-item${t.completed?' done':''}" onclick="toggleTask('${t.id}');renderTaskWidget();">
        <span class="tw-cat-icon">${ci.icon}</span>
        <span class="tw-check${t.completed?' done':''}" onclick="event.stopPropagation();toggleTask('${t.id}');renderTaskWidget();">${t.completed?'✓':''}</span>
        <span class="tw-text">${esc(t.title)}</span>
      </div>`;
    }).join('')}</div>`;
    if (todayTasks.length > maxShow) {
      html += `<div class="tw-more" onclick="switchTab('tasks')"><span data-lang="tasksShowAll">Zobraziť všetky</span> →</div>`;
    }
  }

  // Quick add
  html += `<div class="tw-add-quick">
    <input id="tw-quick-input" placeholder="${lang==='en'?'Quick add...':'Rýchlo pridať...'}" aria-label="${lang==='en'?'Quick add task':'Rýchlo pridať úlohu'}" onkeydown="if(event.key==='Enter')quickAddTask()">
    <button onclick="quickAddTask()" aria-label="Pridať úlohu" title="Pridať úlohu">+</button>
  </div></div>`;

  el.innerHTML = html;
}

function quickAddTask() {
  const input = document.getElementById('tw-quick-input');
  const title = input.value.trim();
  if (!title) return;
  const today = new Date().toISOString().slice(0,10);
  const cat = guessTaskCategory(title);
  tasks.push({ id: generateTaskId(), title, category: cat, completed: false, date: today, time: '', priority: 'medium', repeat: 'none', note: '', source: 'manual', completedDate: '' });
  saveTasks();
  input.value = '';
  renderTaskWidget();
}

function guessTaskCategory(title) {
  const n = title.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/var(en|iť|enie)|kuch|pečie|pečte|obed|večer|raňajk|desiat|koláč|recept|uvar/i.test(n)) return 'cooking';
  if (/nakup|kúpiť|kúp|obchod|mlieko|chlieb|potravin/i.test(n)) return 'shopping';
  if (/uprat|čist|kuchyn|chladničk|práčka|umy|vysáva/i.test(n)) return 'household';
  if (/dieťa|baby|deti|plienk|detsk|škol/i.test(n)) return 'kid';
  return 'custom';
}

// ===== TASKS SCREEN =====
function renderTasks() {
  const container = document.getElementById('tasks-view');
  loadTasks();
  const today = new Date().toISOString().slice(0,10);
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); const tomStr = tomorrow.toISOString().slice(0,10);
  const weekTasks = getWeekTasks();
  const todayTasks = getTodayTasks();
  const tomTasks = getDateTasks(tomStr);
  const completedList = getCompletedTasks();

  const sections = [
    { title: lang==='en'?'Today':'Dnes', icon: '📅', tasks: todayTasks },
    { title: lang==='en'?'Tomorrow':'Zajtra', icon: '🌟', tasks: tomTasks },
    { title: lang==='en'?'This Week':'Tento týždeň', icon: '📆', tasks: weekTasks.filter(t => t.date !== today && t.date !== tomStr) },
  ];

  let html = '';

  const openTasks = tasks.filter(t => !t.completed).length;
  const doneTasks = tasks.filter(t => t.completed).length;
  const restWeekTasks = weekTasks.filter(t => t.date !== today && t.date !== tomStr);
  const activeTaskFilterClass = filter => _taskFilter === filter ? ' active' : '';

  html += `<section class="task-screen-head">
    <h1>${lang==='en'?'Tasks':'Úlohy'}</h1>
    <div>
      <button onclick="filterTasksTab(this,'today')" aria-label="${lang==='en'?'Filter today':'Filter dnes'}">≡</button>
      <button onclick="filterTasksTab(this,'all')" aria-label="${lang==='en'?'All filters':'Všetky filtre'}">☰</button>
    </div>
  </section>`;

  // Filter chips
  html += `<div class="task-filters">
    <button class="task-filter-chip${activeTaskFilterClass('today')}" onclick="filterTasksTab(this,'today')">📅 ${lang==='en'?'Today':'Dnes'}</button>
    <button class="task-filter-chip${activeTaskFilterClass('tomorrow')}" onclick="filterTasksTab(this,'tomorrow')">🌟 ${lang==='en'?'Tomorrow':'Zajtra'}</button>
    <button class="task-filter-chip${activeTaskFilterClass('week')}" onclick="filterTasksTab(this,'week')">📆 ${lang==='en'?'Week':'Týždeň'}</button>
    <button class="task-filter-chip${activeTaskFilterClass('done')}" onclick="filterTasksTab(this,'done')">✅ ${lang==='en'?'Done':'Hotové'}</button>
  </div>`;

  const headerLen = html.length; // track header length for empty state check
  const renderPriorityGroups = function(list) {
    const groups = [
      { key: 'high', title: lang === 'en' ? 'High priority' : 'Vysoká priorita' },
      { key: 'medium', title: lang === 'en' ? 'Medium priority' : 'Stredná priorita' },
      { key: 'low', title: lang === 'en' ? 'Low priority' : 'Nízka priorita' }
    ];
    let out = '';
    groups.forEach(group => {
      const items = list.filter(t => (t.priority || 'medium') === group.key);
      if (!items.length) return;
      out += `<div class="task-section-title">${group.title}</div>`;
      out += `<div class="task-priority-group">${items.map(t => renderTaskCard(t)).join('')}</div>`;
    });
    return out;
  };
  // Filter-aware section rendering
  if (_taskFilter === 'today') {
    html += renderPriorityGroups(todayTasks);
  } else if (_taskFilter === 'tomorrow') {
    html += renderPriorityGroups(tomTasks);
  } else if (_taskFilter === 'week') {
    html += renderPriorityGroups(weekTasks);
  } else if (_taskFilter === 'done') {
    const recentDone = getRecentCompleted();
    const olderDone = completedList.filter(t => !recentDone.find(r => r.id === t.id));
    if (recentDone.length) {
      html += `<div class="task-section-title">🕐 ${lang==='en'?'Last 24 hours':'Posledných 24 hodín'} <span class="task-section-count">${recentDone.length}</span></div>`;
      html += recentDone.map(t => renderTaskCard(t)).join('');
    }
    if (olderDone.length) {
      html += `<div class="task-section-title">📦 ${lang==='en'?'Older':'Staršie'} <span class="task-section-count">${olderDone.length}</span></div>`;
      html += olderDone.slice(0, 20).map(t => renderTaskCard(t)).join('');
    }
    if (completedList.length) {
      html += `<button class="shop-add-btn" onclick="clearCompletedTasks()" style="color:var(--danger);border-color:var(--danger);margin-top:.3rem;">🗑 ${lang==='en'?'Delete all completed':'Vymazať dokončené'}</button>`;
    }
  } else {
    html += renderPriorityGroups(tasks.filter(t => !t.completed));
    if (completedList.length) {
      const recentDone = getRecentCompleted();
      if (recentDone.length) {
        html += `<div class="task-section-title">✅ ${lang==='en'?'Recently completed':'Nedávno dokončené'} <span class="task-section-count">${recentDone.length}</span></div>`;
        html += recentDone.slice(0, 5).map(t => renderTaskCard(t)).join('');
      }
      if (completedList.length > 10) {
        html += `<button class="shop-add-btn" onclick="clearCompletedTasks()" style="color:var(--danger);border-color:var(--danger);margin-top:.3rem;">🗑 ${lang==='en'?'Delete completed':'Vymazať dokončené'}</button>`;
      }
    }
  }

  const hasRenderedTasks = html.length !== headerLen;
  if (hasRenderedTasks) {
    html = html.slice(0, headerLen) + html.slice(headerLen);
  }
  if (!hasRenderedTasks) {
    const emptyCopy = {
      today: [lang === 'en' ? 'Free day' : 'Dnes voľno', lang === 'en' ? 'No tasks for today. Add one if something comes up.' : 'Na dnes nemáš žiadne úlohy. Pridaj si niečo, ak treba.'],
      tomorrow: [lang === 'en' ? 'Tomorrow is clear' : 'Zajtra je čisto', lang === 'en' ? 'Nothing scheduled for tomorrow yet.' : 'Na zajtra zatiaľ nič nemáš.'],
      week: [lang === 'en' ? 'Week looks calm' : 'Týždeň vyzerá pokojne', lang === 'en' ? 'No upcoming tasks in the rest of the week.' : 'Vo zvyšku týždňa nie sú žiadne úlohy.'],
      done: [lang === 'en' ? 'No completed tasks' : 'Žiadne hotové úlohy', lang === 'en' ? 'Completed tasks will appear here.' : 'Dokončené úlohy sa zobrazia tu.'],
      all: [lang === 'en' ? 'No tasks yet' : 'Zatiaľ žiadne úlohy', lang === 'en' ? 'Create your first task and keep the day organized.' : 'Vytvor prvú úlohu a udrž deň pod kontrolou.']
    };
    const copy = emptyCopy[_taskFilter] || emptyCopy.all;
    html += emptyStateHTML({
      icon: '✅',
      title: copy[0],
      desc: copy[1],
      actions: [
        { label: '✏️ ' + (lang === 'en' ? 'Add task' : 'Pridať úlohu'), cls: 'btn-primary', onClick: 'openTaskSheet()' }
      ]
    });
  }

  if (hasRenderedTasks) {
    html += `<button class="task-primary-add" onclick="openTaskSheet()">＋ ${lang==='en'?'Add task':'Pridať úlohu'}</button>`;
    html += renderTaskProductivityCard();
  }

  container.innerHTML = html;
}

function renderTaskProductivityCard() {
  const labels = ['Po','Ut','St','Št','Pi','So','Ne'];
  const start = new Date();
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const counts = labels.map((_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = date.toISOString().slice(0, 10);
    return tasks.filter(t => t.completed && (t.completedDate || '').slice(0, 10) === key).length;
  });
  const max = Math.max(1, ...counts);
  const total = counts.reduce((sum, count) => sum + count, 0);
  return `<section class="task-productivity">
    <h2>Tvoja produktivita</h2>
    <div class="task-productivity-grid">
      <div><strong>${total}</strong><small>dokončené úlohy tento týždeň</small></div>
      <div class="task-bars">${counts.map((count, index) => `<span><b style="height:${Math.max(12, Math.round((count / max) * 64))}px"></b><em>${labels[index]}</em></span>`).join('')}</div>
    </div>
  </section>`;
}

let _taskFilter = 'today';
function filterTasksTab(el, filter) {
  _taskFilter = filter;
  renderTasks();
}

function getTaskHeroCopy(data) {
  const totalOpenSk = data.openTasks + ' otvorené celkovo';
  const totalOpenEn = data.openTasks + ' open total';
  const doneSk = data.doneTasks + ' hotové';
  const doneEn = data.doneTasks + ' done';
  if (data.filter === 'tomorrow') {
    return {
      title: data.tomorrowCount ? (lang === 'en' ? 'Tomorrow needs attention' : 'Zajtra treba vybaviť') : (lang === 'en' ? 'Tomorrow is clear' : 'Zajtra je čisto'),
      sub: lang === 'en' ? `${data.tomorrowCount} tomorrow · ${totalOpenEn}` : `${data.tomorrowCount} na zajtra · ${totalOpenSk}`
    };
  }
  if (data.filter === 'week') {
    return {
      title: data.weekCount ? (lang === 'en' ? 'Rest of the week' : 'Zvyšok týždňa') : (lang === 'en' ? 'Week looks calm' : 'Týždeň je pokojný'),
      sub: lang === 'en' ? `${data.weekCount} later this week · ${totalOpenEn}` : `${data.weekCount} vo zvyšku týždňa · ${totalOpenSk}`
    };
  }
  if (data.filter === 'all') {
    return {
      title: data.openTasks ? (lang === 'en' ? 'All open tasks' : 'Všetky otvorené úlohy') : (lang === 'en' ? 'Everything is clear' : 'Všetko je čisté'),
      sub: lang === 'en' ? `${totalOpenEn} · ${doneEn}` : `${totalOpenSk} · ${doneSk}`
    };
  }
  if (data.filter === 'done') {
    return {
      title: data.completedCount ? (lang === 'en' ? 'Completed tasks' : 'Hotové úlohy') : (lang === 'en' ? 'Nothing completed yet' : 'Zatiaľ nič hotové'),
      sub: lang === 'en' ? `${data.completedCount} completed · ${totalOpenEn}` : `${data.completedCount} dokončené · ${totalOpenSk}`
    };
  }
  return {
    title: data.todayCount ? (lang === 'en' ? 'Today needs attention' : 'Dnes treba vybaviť') : (lang === 'en' ? 'Free day' : 'Dnes voľno'),
    sub: lang === 'en' ? `${data.todayCount} today · ${totalOpenEn}` : `${data.todayCount} na dnes · ${totalOpenSk}`
  };
}

function renderTaskCard(t) {
  const ci = taskCatInfo(t.category);
  const done = t.completed;
  const prioLabel = t.priority === 'high' ? '🔴' : t.priority === 'medium' ? '🟡' : '🟢';
  const dateLabel = formatTaskDate(t.date);
  const timeStr = t.time ? ` · 🕐 ${t.time}` : '';
  return `<div class="task-card${done?' done':''} prio-${t.priority}">
    <div class="task-card-body">
      <div class="tc-check${done?' done':''}" onclick="toggleTask('${t.id}')">${done?'✓':''}</div>
      <div class="tc-info" onclick="openTaskSheet('${t.id}')">
        <div class="tc-title">${esc(t.title)}</div>
        <div class="tc-meta">
          <span class="tc-time">${t.time ? esc(t.time) : esc(dateLabel)}${timeStr && !t.time ? timeStr : ''}</span>
          ${t.note ? `<span>📝 ${esc(t.note)}</span>` : ''}
          ${t.repeat !== 'none' ? `<span>🔄 ${t.repeat === 'daily' ? (lang==='en'?'daily':'denne') : (lang==='en'?'weekly':'týždenne')}</span>` : ''}
        </div>
      </div>
      <div class="tc-actions">
        ${t.priority === 'high' ? '<span class="tc-flag">⚑</span>' : ''}
      </div>
    </div>
  </div>`;
}

function taskCatLabel(catId) {
  const map = {
    cooking: lang==='en'?'Cooking':'Varenie',
    shopping: lang==='en'?'Shopping':'Nákup',
    household: lang==='en'?'Household':'Domácnosť',
    kid: lang==='en'?'Kids':'Dieťa',
    custom: lang==='en'?'Custom':'Vlastné'
  };
  return map[catId] || '—';
}

// ===== TASK CRUD =====
function toggleTask(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.completed = !t.completed;
  t.completedDate = t.completed ? new Date().toISOString().slice(0,10) : '';
  haptic(10);
  saveTasks();
  const inTasks = document.getElementById('tasks-container')?.style.display !== 'none';
  if (inTasks) renderTasks();
  else renderTaskWidget();
}

function deleteTask(id) {
  showConfirmModal(lang === 'en' ? 'Delete this task?' : 'Vymazať túto úlohu?', '🗑️', lang==='en'?'Delete':'Vymazať', function() {
    const deletedTask = tasks.find(t => t.id === id);
    const deletedIndex = tasks.findIndex(t => t.id === id);
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    const inTasks = document.getElementById('tasks-container')?.style.display !== 'none';
    if (inTasks) renderTasks();
    else { renderTaskWidget(); if (document.getElementById('dashboard')?.style.display !== 'none') renderDashboard(); }
    showUndoToast('🗑️ ' + (lang==='en'?'Task deleted':'Úloha vymazaná'), function() {
      if (!deletedTask) return;
      tasks.splice(Math.max(0, deletedIndex), 0, deletedTask);
      saveTasks();
      if (inTasks) renderTasks();
      else { renderTaskWidget(); if (document.getElementById('dashboard')?.style.display !== 'none') renderDashboard(); }
      showToast(lang === 'en' ? 'Task restored' : 'Úloha obnovená', 'success', 1200);
    });
  });
}

function toggleTaskExtra() {
  var el = document.getElementById('task-extra-fields');
  var btn = document.getElementById('task-extra-toggle');
  if (!el || !btn) return;
  var isVisible = el.style.display !== 'none';
  el.style.display = isVisible ? 'none' : '';
  btn.textContent = isVisible ? '▼ ' + (lang==='en'?'More options':'Viac možností') : '▲ ' + (lang==='en'?'Less options':'Menej možností');
}

function openTaskSheet(editId) {
  const sheet = document.getElementById('task-sheet');
  document.getElementById('task-sheet-title').textContent = editId
    ? (lang==='en'?'✏️ Edit task':'✏️ Upraviť úlohu')
    : (lang==='en'?'✅ Add task':'✅ Pridať úlohu');
  document.getElementById('task-save-btn').textContent = editId
    ? (lang==='en'?'💾 Save':'💾 Uložiť')
    : (lang==='en'?'💾 Add':'💾 Pridať');

  // Hide extra fields by default for new tasks
  if (!editId) {
    document.getElementById('task-extra-fields').style.display = 'none';
    document.getElementById('task-extra-toggle').textContent = '▼ ' + (lang==='en'?'More options':'Viac možností');
    document.getElementById('task-date').value = new Date().toISOString().slice(0,10);
    document.getElementById('task-time').value = '';
    document.getElementById('task-priority').value = 'medium';
    document.getElementById('task-repeat').value = 'none';
    document.getElementById('task-note').value = '';
    document.getElementById('task-title').value = '';
    document.getElementById('task-edit-id').value = '';
  } else {
    // Show extra fields when editing
    document.getElementById('task-extra-fields').style.display = '';
    document.getElementById('task-extra-toggle').textContent = '▲ ' + (lang==='en'?'Less options':'Menej možností');
  }

  // Render category chips
  const chips = document.getElementById('task-cat-chips');
  chips.innerHTML = TASK_CATEGORIES.map(c =>
    `<button class="cat-chip${c.id === 'custom' ? ' active' : ''}" data-cat="${c.id}" onclick="selectTaskCat(this)">${c.icon} ${taskCatLabel(c.id)}</button>`
  ).join('');

  if (editId) {
    const t = tasks.find(x => x.id === editId);
    if (!t) return;
    document.getElementById('task-title').value = t.title;
    document.getElementById('task-date').value = t.date;
    document.getElementById('task-time').value = t.time || '';
    document.getElementById('task-priority').value = t.priority || 'medium';
    document.getElementById('task-repeat').value = t.repeat || 'none';
    document.getElementById('task-note').value = t.note || '';
    document.getElementById('task-edit-id').value = editId;
    document.querySelectorAll('#task-cat-chips .cat-chip').forEach(b => b.classList.toggle('active', b.dataset.cat === t.category));
  }

  sheet.classList.add('active');
  document.getElementById('task-title').focus();
}

function selectTaskCat(el) {
  document.querySelectorAll('#task-cat-chips .cat-chip').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

function closeTaskSheet() {
  document.getElementById('task-sheet').classList.remove('active');
}

function saveTask() {
  const title = document.getElementById('task-title').value.trim();
  if (!title) {
    document.getElementById('task-title').focus();
    document.getElementById('task-title').style.borderColor = 'var(--danger)';
    setTimeout(() => document.getElementById('task-title').style.borderColor = '', 1500);
    return;
  }
  const editId = document.getElementById('task-edit-id').value;
  const activeChip = document.querySelector('#task-cat-chips .cat-chip.active');
  const category = activeChip ? activeChip.dataset.cat : 'custom';
  const date = document.getElementById('task-date').value;
  const time = document.getElementById('task-time').value;
  const priority = document.getElementById('task-priority').value;
  const repeat = document.getElementById('task-repeat').value;
  const note = document.getElementById('task-note').value.trim();

  if (editId) {
    const t = tasks.find(x => x.id === editId);
    if (t) {
      t.title = title;
      t.category = category;
      t.date = date || new Date().toISOString().slice(0,10);
      t.time = time;
      t.priority = priority;
      t.repeat = repeat;
      t.note = note;
    }
  } else {
    tasks.push({ id: generateTaskId(), title, category, completed: false, date: date || new Date().toISOString().slice(0,10), time, priority, repeat, note, source: 'manual', completedDate: '' });
  }
  saveTasks();
  // Notify family
  if (typeof sendPushToFamily === 'function' && typeof taskTitle !== 'undefined' && taskTitle) {
    var pushAuthor = authUser ? (authUser.displayName || authUser.email || '👤') : t('Hosť','Guest');
    var pushText = taskTitle.length > 80 ? taskTitle.slice(0, 80) + '...' : taskTitle;
    sendPushToFamily('✅ ' + t('Nová úloha','New task'), pushAuthor + ': ' + pushText, 'tasks');
  }
  closeTaskSheet();
  renderTasks();
  renderTaskWidget();
}

