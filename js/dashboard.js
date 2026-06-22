// Mealnest — Dashboard home screen
// ==========================================

// ======================== DASHBOARD ========================
function renderDashboard() {
  const now = new Date();
  try { loadShopItems(); } catch(e) {}
  try { loadTasks(); } catch(e) {}
  const todayMeals = getTodayMealCount();
  const todayTasksArr = getTodayTasks();
  const uncheckedShop = (Array.isArray(shopItems) ? shopItems : []).filter(i => i && !i.checked).length;
  const mealPct = Math.round((todayMeals / MEALS.length) * 100);
  const userName = getDashboardUserName();
  const greetingText = userName ? `Ahoj, ${userName} 👋` : 'Ahoj 👋';
  const currentDate = formatDashboardDate(now);
  const aiRecipe = pickDashboardAiRecipe();
  const html = `<div class="mn-home-shell">
    <section class="mn-home-header">
      <div class="mn-home-greeting">
        <h1>${esc(greetingText)}</h1>
        <p>${esc(currentDate)}</p>
      </div>
      <div class="mn-home-actions">
        <button class="mn-avatar-btn" onclick="openMorePageFromAnywhere('account')" aria-label="Profil">${getDashboardAvatar()}</button>
      </div>
    </section>
    ${renderFamilyHubHero({ todayMeals, totalMeals: MEALS.length, uncheckedShop, todayTasks: todayTasksArr.filter(t => !t.completed).length, aiRecipe })}
    ${renderFamilyOverviewCards({ todayMeals, totalMeals: MEALS.length, uncheckedShop, todayTasks: todayTasksArr.filter(t => !t.completed).length, aiRecipe })}
    ${renderMobileMealsCard()}
    ${renderMobileAiRecommendation()}
    ${renderFamilyActivityCard()}
  </div>`;

  try { document.getElementById('dash-content').innerHTML = html; } catch(e) {}
  setTimeout(function() {
    document.querySelectorAll('.mn-count-up').forEach(function(el) { animateCountUp(el, el.dataset.target); });
  }, 80);
}

function getDashboardUserName() {
  const raw = authUser && (authUser.displayName || authUser.email);
  if (!raw) return '';
  const first = String(raw).split('@')[0].split(/\s+/)[0].trim();
  return first || '';
}

function getDashboardAvatar() {
  if (authUser && authUser.photoURL) return `<img src="${escAttr(authUser.photoURL)}" alt="">`;
  const initial = getDashboardUserName().slice(0, 1).toUpperCase() || '👤';
  return `<span>${esc(initial)}</span>`;
}

function formatDashboardDate(date) {
  try {
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'sk-SK', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  } catch(e) {
    return date.toISOString().slice(0, 10);
  }
}

function renderDashboardFamilyAvatars() {
  const members = getRealFamilyMembers();
  const visibleMembers = members.length ? members.slice(0, 3) : [{ name: 'Profil', initial: '👤', photo: '' }];
  return `<div class="mn-family-avatars">${visibleMembers.map(member => `<span title="${escAttr(member.name)}">${member.photo ? `<img src="${escAttr(member.photo)}" alt="">` : esc(member.initial)}</span>`).join('')}<button onclick="toggleQuickAddSheet()" aria-label="Pridať">+</button></div>`;
}

function getRealFamilyMembers() {
  const members = [];
  if (authUser) {
    const name = authUser.displayName || authUser.email || '';
    members.push({
      name: name || (lang === 'en' ? 'Account' : 'Účet'),
      initial: (name || 'U').slice(0, 1).toUpperCase(),
      photo: authUser.photoURL || ''
    });
  }
  try {
    const configured = appSettings && appSettings.family && Array.isArray(appSettings.family.members) ? appSettings.family.members : [];
    configured.forEach(function(member) {
      const name = member && (member.name || member.email);
      if (!name || members.find(m => m.name === name)) return;
      members.push({ name: String(name), initial: String(name).slice(0, 1).toUpperCase(), photo: member.photoURL || member.photo || '' });
    });
  } catch(e) {}
  return members;
}

function renderFamilyHubHero(stats) {
  const dinner = getDashboardDinnerEntry();
  let title = 'Dnes večera ešte nie je naplánovaná';
  let desc = '';
  let cta = 'Naplánovať večeru';
  let action = "switchTab('planner')";
  let image = dinner && dinner.recipe ? getDashboardRecipeImage(dinner.recipe) : 'family-dinner-hero.png';
  if (dinner && dinner.title) {
    title = dinner.title;
    desc = 'Dnešná večera';
    cta = 'Otvoriť plán';
  }
  // Use inline style for background-image to avoid CSS variable URL resolution issues
  // Must use !important to override styles.css background shorthand
  const bgStyle = image ? `background-image:linear-gradient(180deg, rgba(8,16,20,.03) 0%, rgba(8,16,20,.35) 100%),url('${escAttr(image)}') !important;background-size:cover !important;background-position:center !important;` : '';
  return `<section class="mn-family-hero mn-card" style="${bgStyle}">
    <div class="mn-family-hero-overlay">
      <h2>${esc(title)}</h2>
      ${desc ? `<p>${esc(desc)}</p>` : ''}
      <button onclick="${action}">${esc(cta)}</button>
    </div>
  </section>`;
}

function getDashboardDinnerEntry() {
  const ctx = getDashboardDayPlan();
  const resolved = resolveMealEntry(ctx.dayPlan['večera']);
  if (!resolved) return null;
  if (resolved.recipe) return { title: resolved.recipe.name, recipe: resolved.recipe };
  return { title: resolved.title || '' };
}

function renderFamilyOverviewCards(stats) {
  const streak = calcPlanningStreak();
  const aiText = stats.aiRecipe ? '1' : '0';
  return `<section class="mn-hub-section">
    <div class="mn-mini-label">DNES RÝCHLO</div>
    <div class="mn-overview-grid">
    <button class="shop" onclick="switchTab('shopping')"><span>🛒</span><strong>Nákup</strong><em>${stats.uncheckedShop}</em><small>položky</small></button>
    <button class="tasks" onclick="switchTab('tasks')"><span>✓</span><strong>Úlohy</strong><em>${stats.todayTasks}</em><small>čakajú</small></button>
    <button class="streak" onclick="${stats.aiRecipe ? `viewRecipe(${stats.aiRecipe.id})` : 'aiGenerateFullWeek()'}"><span>🔥</span><strong>AI</strong><em>${aiText}</em><small>návrh</small></button>
    <button class="meals" onclick="switchTab('planner')"><span>📊</span><strong>Šnúra</strong><em>${streak}</em><small>dní</small></button>
    </div>
  </section>`;
}

function renderFamilyActivityCard() {
  const activity = getRealFamilyActivity();
  return `<section class="mn-activity-card mn-card">
    <div class="mn-section-head compact"><h2>AKTIVITA RODINY</h2><button onclick="openMorePageFromAnywhere('family')">Rodina</button></div>
    ${activity.length ? `<div class="mn-activity-feed">${activity.slice(0, 4).map(item => `<div><span>${esc(item.icon || '•')}</span><strong>${esc(item.title || '')}</strong>${item.time ? `<small>${esc(item.time)}</small>` : ''}</div>`).join('')}</div>` : `<div class="mn-empty-inline"><span>👨‍👩‍👧‍👦</span><strong>Zatiaľ žiadna aktivita rodiny.</strong><small>Pozvi členov rodiny a začnite plánovať spoločne.</small><button class="btn btn-primary" onclick="openMorePageFromAnywhere('family')" style="margin-top:.5rem;font-size:.75rem;padding:.3rem .7rem;">➕ Pozvať rodinu</button></div>`}
  </section>`;
}

function getRealFamilyActivity() {
  try {
    const stored = JSON.parse(localStorage.getItem('familyActivity') || '[]');
    if (Array.isArray(stored)) {
      return stored.filter(item => item && item.title).map(item => ({
        icon: item.icon || '•',
        title: item.title,
        time: item.time || item.date || ''
      }));
    }
  } catch(e) {}
  return [];
}

function renderMobileHeroCard(stats) {
  const openMeals = Math.max(0, stats.totalMeals - stats.todayMeals);
  return `<section class="mn-hero-card mn-card">
    <div class="mn-hero-top">
      <div class="mn-progress-ring" style="--pct:${stats.mealPct}">
        <svg viewBox="0 0 44 44" aria-hidden="true"><circle class="mn-ring-bg" cx="22" cy="22" r="18"/><circle class="mn-ring-fg" cx="22" cy="22" r="18"/></svg>
        <strong>${stats.todayMeals}</strong>
      </div>
      <div class="mn-hero-copy">
        <span>Dnešný plán</span>
        <h2>${stats.todayMeals} / ${stats.totalMeals} jedál naplánovaných</h2>
        <p>${openMeals ? openMeals + ' jedál ešte chýba' : 'Jedlá sú pripravené'}</p>
      </div>
    </div>
    <div class="mn-hero-stats">
      <button onclick="switchTab('shopping')"><span>🛒</span><strong class="mn-count-up" data-target="${stats.uncheckedShop}">0</strong><small>Nákup</small></button>
      <button onclick="switchTab('tasks')"><span>✅</span><strong class="mn-count-up" data-target="${stats.todayTasks}">0</strong><small>Úlohy</small></button>
      <button onclick="switchTab('planner')"><span>🔥</span><strong class="mn-count-up" data-target="${stats.streak}">0</strong><small>Streak</small></button>
    </div>
    <button class="mn-primary-cta" onclick="switchTab('planner')">Naplánovať deň</button>
  </section>`;
}

function renderMobileWeekSelector() {
  const todayIndex = (new Date().getDay() + 6) % 7;
  const labels = ['Po','Ut','St','Št','Pi','So','Ne'];
  return `<section class="mn-day-picker" aria-label="Dni v týždni">
    ${labels.map((label, index) => `<button class="${index === todayIndex ? 'active' : ''}" onclick="switchTab('planner')"><span>${label}</span></button>`).join('')}
  </section>`;
}

function getDashboardDayPlan() {
  const weekKey = getWeekKey(new Date());
  const todayName = DAYS[(new Date().getDay() + 6) % 7];
  const plan = getWeekPlan(weekKey);
  return { weekKey, todayName, dayPlan: plan[todayName] || {} };
}

function resolveMealEntry(entry) {
  if (!entry) return null;
  let recipe = null;
  if (typeof entry === 'number') recipe = recipes.find(rec => rec.id === entry);
  else if (entry.type === 'recipe') recipe = recipes.find(rec => rec.id === entry.id);
  if (recipe) return { type: 'recipe', recipe };
  if (entry.type === 'custom') return { type: 'custom', title: entry.text || '—' };
  return null;
}

function renderMobileMealsCard() {
  const ctx = getDashboardDayPlan();
  return `<section class="mn-meals-card mn-card">
    <div class="mn-section-head compact">
      <h2>DNEŠNÉ JEDLÁ</h2>
      <button onclick="switchTab('planner')">Upraviť</button>
    </div>
    <div class="mn-meal-list">
      ${MEALS.map(meal => renderMobileMealRow(meal, ctx)).join('')}
    </div>
  </section>`;
}

function renderMobileMealRow(meal, ctx) {
  const resolved = resolveMealEntry(ctx.dayPlan[meal.id]);
  const filled = !!resolved;
  const recipe = resolved && resolved.recipe;
  const title = recipe ? recipe.name : (resolved ? resolved.title : '');
  const kcal = recipe && recipe.nutrition && recipe.nutrition.kcal ? recipe.nutrition.kcal + ' kcal' : (filled ? '—' : '');
  const image = recipe && (recipe.imageData || recipe.image);
  const addAction = `pickRecipe('${ctx.todayName}','${meal.id}','${ctx.weekKey}')`;
  return `<article class="mn-meal-row ${filled ? 'filled' : 'empty'}" onclick="${filled && recipe ? `viewRecipe(${recipe.id})` : addAction}">
    <div class="mn-meal-icon">${meal.icon}</div>
      <div class="mn-meal-body">
      <span>${dashboardMealLabel(meal.id)}</span>
      ${filled ? `<strong>${esc(title)}</strong>` : `<strong class="mn-empty-meal">Pridať jedlo</strong>`}
      ${filled ? `<small>${esc(kcal)}</small>` : ''}
    </div>
    ${image ? `<img class="mn-meal-thumb" src="${escAttr(image)}" alt="${escAttr(title)}" loading="lazy" onerror="this.remove()">` : ''}
    <button class="mn-row-action" onclick="event.stopPropagation();${addAction}">${filled ? 'Upraviť' : '+'}</button>
  </article>`;
}

function dashboardMealLabel(id) {
  const map = { 'raňajky':'Raňajky', 'desiata':'Desiata', 'obed':'Obed', 'olovrant':'Olovrant', 'večera':'Večera' };
  return map[id] || id;
}

function pickDashboardAiRecipe() {
  const todays = new Set(getTodayRecipes().map(r => r.id));
  const candidates = (Array.isArray(recipes) ? recipes : []).filter(recipe => recipe && !todays.has(recipe.id));
  if (!candidates.length) return recipes[0] || null;
  const withImages = candidates.filter(recipe => recipe.imageData || recipe.image);
  const pool = withImages.length >= 3 ? withImages : candidates;
  const dayKey = new Date().toISOString().slice(0, 10);
  const seed = dayKey.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const preferenceSeed = (appSettings.dietPrefs || []).join('|').split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return pool[(seed + preferenceSeed) % pool.length] || candidates[0] || null;
}

function renderMobileAiRecommendation() {
  const recipe = pickDashboardAiRecipe();
  if (!recipe) {
    return `<section class="mn-ai-card mn-card">
      <div class="mn-ai-empty"><span>🤖</span><strong>AI odporúča</strong><p>Pridaj recepty a AI odporúčanie sa zobrazí tu.</p></div>
    </section>`;
  }
  const ctx = getDashboardDayPlan();
  const title = recipe.name;
  const img = getDashboardRecipeImage(recipe);
  const kcal = recipe.nutrition && recipe.nutrition.kcal ? recipe.nutrition.kcal + ' kcal' : '— kcal';
  return `<section class="mn-ai-card mn-card">
    <div class="mn-section-head compact mn-ai-head"><h2>AI ODPORÚČA PRE VÁS</h2><button onclick="event.stopPropagation();cycleAiSuggestion()" title="Ďalší návrh">▶</button></div>
    <div onclick="viewRecipe(${recipe.id})">
    ${img ? `<img class="mn-ai-image" src="${escAttr(img)}" alt="${escAttr(title)}" loading="lazy" onerror="this.style.display='none'">` : `<div class="mn-ai-image mn-ai-fallback">🍽️</div>`}
    <div class="mn-ai-copy">
      <strong>${esc(title)}</strong>
      <span>⏱ ${recipe.time || 25} min • 🔥 ${kcal} • Denný návrh</span>
    </div>
    </div>
    <div class="mn-ai-actions">
      <button class="mn-ai-button" onclick="event.stopPropagation();addDashboardRecommendationToPlan(${recipe.id})">Pridať do plánu</button>
      <button class="mn-ai-next" onclick="event.stopPropagation();cycleAiSuggestion()" title="Ďalší návrh">Ďalší →</button>
    </div>
  </section>`;
}

let _aiSuggestionIndex = 0;

function cycleAiSuggestion() {
  const todays = new Set(getTodayRecipes().map(r => r.id));
  const candidates = (Array.isArray(recipes) ? recipes : []).filter(recipe => recipe && !todays.has(recipe.id));
  if (candidates.length < 2) return;
  _aiSuggestionIndex = (_aiSuggestionIndex + 1) % candidates.length;
  // Override pickDashboardAiRecipe temporarily via data attr
  const dash = document.getElementById('dash-content');
  if (dash) {
    // Re-render with next recipe
    pickDashboardAiRecipe._override = candidates[_aiSuggestionIndex];
    renderDashboard();
    pickDashboardAiRecipe._override = null;
  }
}

// Patch pickDashboardAiRecipe to support override
const _origPick = pickDashboardAiRecipe;
pickDashboardAiRecipe = function() {
  if (pickDashboardAiRecipe._override) return pickDashboardAiRecipe._override;
  return _origPick.call(this);
};

function addDashboardRecommendationToPlan(recipeId) {
  const ctx = getDashboardDayPlan();
  const preferred = ['večera', 'obed', 'raňajky', 'desiata', 'olovrant'];
  const slot = preferred.find(id => !ctx.dayPlan[id]) || 'večera';
  selectRecipe(ctx.todayName, slot, recipeId, ctx.weekKey);
  renderDashboard();
}

function getDashboardRecipeImage(recipe) {
  const img = recipe && (recipe.imageData || recipe.image) || '';
  if (!img || img.indexOf('placehold.co') !== -1) return 'ai-recommendation.png';
  return img;
}

function renderMobileQuickActions() {
  const actions = [
    { icon:'📖', label: 'Recepty', action:"switchTab('home')" },
    { icon:'🛒', label: 'Nákup', action:"switchTab('shopping')" },
    { icon:'✅', label: 'Úlohy', action:"switchTab('tasks')" },
    { icon:'🚀', label: 'AI Týždeň', action:'aiGenerateFullWeek()' },
    { icon:'🌐', label: 'Import receptu', action:'openImportUrlModal()' },
  ];
  return `<section class="mn-quick-grid">${actions.map(item => `<button onclick="${item.action}"><span>${item.icon}</span><strong>${item.label}</strong></button>`).join('')}</section>`;
}

function renderMobileTaskPreview() {
  const todayTasks = getTodayTasks().slice(0, 3);
  if (!todayTasks.length) {
    return `<section class="mn-preview-card mn-card">
      <div class="mn-section-head"><h2>Dnešné úlohy</h2><button onclick="switchTab('tasks')">Zobraziť všetky</button></div>
      <div class="mn-empty-inline"><span>✅</span><strong>Dnes nemáš žiadne úlohy</strong><small>Nové úlohy sa zobrazia hneď po pridaní.</small></div>
    </section>`;
  }
  return `<section class="mn-preview-card mn-card">
    <div class="mn-section-head"><h2>Dnešné úlohy</h2><button onclick="switchTab('tasks')">Zobraziť všetky</button></div>
    <div class="mn-task-preview">
      ${todayTasks.map(task => `<button class="${task.completed ? 'done' : ''}" onclick="toggleTask('${task.id}');renderDashboard();"><span>${task.completed ? '☑' : '☐'}</span><strong>${esc(task.title)}</strong></button>`).join('')}
    </div>
  </section>`;
}

function renderMobileShoppingPreview(uncheckedShop) {
  const label = uncheckedShop === 1
    ? '1 položka čaká'
    : uncheckedShop + ' položiek čaká';
  return `<section class="mn-shopping-card mn-card">
    <div><span>🛒</span><strong>${esc(label)}</strong><small>Nákupný zoznam</small></div>
    <button onclick="switchTab('shopping')">Otvoriť nákup</button>
  </section>`;
}

function renderDashboardCockpit(data) {
  const mealLabel = lang === 'en' ? 'meals' : 'jedál';
  const shopLabel = lang === 'en' ? 'shopping' : 'nákup';
  const favLabel = lang === 'en' ? 'favorite' : 'obľúb.';
  const recipeLabel = lang === 'en' ? 'recipes' : 'receptov';
  return `<section class="dash-cockpit">
    <div class="dash-cockpit-bg"></div>
    <div class="dash-cockpit-main">
      <div class="dash-cockpit-copy">
        <div class="dash-greeting" id="dash-greeting">${esc(data.greeting)}</div>
        <div class="dash-date" id="dash-date">${esc(data.dateText)}</div>
        <h1 class="dash-message" id="dash-message">${lang === 'en' ? 'Today in the kitchen' : 'Dnes v kuchyni'}</h1>
        <div class="dash-message-sub" id="dash-message-sub">${esc(data.message)}</div>
      </div>
      <button class="dash-plan-btn" onclick="switchTab('planner')">${lang === 'en' ? 'Plan' : 'Plánovať'} ›</button>
    </div>
    <div class="dash-progress-strip">
      <div class="dash-ring" style="--pct:${data.mealPct}">
        <span>${data.todayMeals}/${data.totalMeals}</span>
      </div>
      <div class="dash-progress-copy">
        <strong>${data.mealPct}% ${lang === 'en' ? 'planned' : 'naplánované'}</strong>
        <span>${data.totalKcal} kcal · ${Math.max(0, data.totalMeals - data.todayMeals)} ${lang === 'en' ? 'slots open' : 'miest voľných'}</span>
      </div>
    </div>
    <div class="dash-stats-row" id="dash-stats-row">
      <span class="dash-stat-pill">🛒 <strong class="count-up" data-target="${data.uncheckedShop}">0</strong> ${shopLabel}</span>
      <span class="dash-stat-pill">❤️ <strong class="count-up" data-target="${data.favCount}">0</strong> ${favLabel}</span>
      <span class="dash-stat-pill">📖 <strong class="count-up" data-target="${data.recipeCount}">0</strong> ${recipeLabel}</span>
    </div>
  </section>`;
}

function renderAiTipCard() {
  const suggestionsHtml = renderSuggestions();
  const firstSuggestionMatch = suggestionsHtml.match(/onclick="viewRecipe\((\d+)\)"[\s\S]*?<div class="sugg-icon">([^<]*)<\/div>[\s\S]*?<div class="sugg-name">([^<]*)<\/div>[\s\S]*?<div class="sugg-meta">([^<]*)<\/div>/);
  if (firstSuggestionMatch) {
    return `<div class="dash-card ai-tip-card" onclick="viewRecipe(${firstSuggestionMatch[1]})">
      <div class="ai-tip-icon">${firstSuggestionMatch[2]}</div>
      <div class="ai-tip-copy">
        <div class="ai-tip-kicker">🤖 ${lang === 'en' ? 'AI tip of the day' : 'AI tip dňa'}</div>
        <div class="ai-tip-title">${firstSuggestionMatch[3]}</div>
        <div class="ai-tip-meta">${firstSuggestionMatch[4]}</div>
      </div>
      <button class="ai-tip-btn" onclick="event.stopPropagation();viewRecipe(${firstSuggestionMatch[1]})">${lang === 'en' ? 'Open' : 'Otvoriť'} ›</button>
    </div>`;
  }
  return `<div class="dash-card ai-tip-card" onclick="aiDailyTip()">
    <div class="ai-tip-icon">🤖</div>
    <div class="ai-tip-copy">
      <div class="ai-tip-kicker">${lang === 'en' ? 'AI tip of the day' : 'AI tip dňa'}</div>
      <div class="ai-tip-title">${lang === 'en' ? 'Let AI suggest something light' : 'Nechaj AI navrhnúť niečo ľahké'}</div>
      <div class="ai-tip-meta">${lang === 'en' ? 'Based on weather and your recipes' : 'Podľa počasia a tvojich receptov'}</div>
    </div>
    <button class="ai-tip-btn" onclick="event.stopPropagation();aiDailyTip()">${lang === 'en' ? 'Suggest' : 'Navrhnúť'} ›</button>
  </div>`;
}

function getTodayMealCount() {
  const weekKey = getWeekKey(new Date());
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const plan = getWeekPlan(weekKey);
  const dayPlan = plan[todayName] || {};
  return Object.values(dayPlan).filter(Boolean).length;
}

function getTodayKcal() {
  const weekKey = getWeekKey(new Date());
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const plan = getWeekPlan(weekKey);
  const dayPlan = plan[todayName] || {};
  let total = 0;
  Object.values(dayPlan).filter(Boolean).forEach(entry => {
    let r = null;
    if (typeof entry === 'number') r = recipes.find(rec => rec.id === entry);
    else if (entry.type === 'recipe') r = recipes.find(rec => rec.id === entry.id);
    if (r && r.nutrition) total += r.nutrition.kcal || 0;
  });
  return total;
}

function renderTodayFocusPanel(stats) {
  const remainingMeals = Math.max(0, MEALS.length - stats.todayMeals);
  const taskLabel = stats.todayTasks
    ? (lang === 'en' ? stats.todayTasks + ' tasks left' : stats.todayTasks + ' úloh zostáva')
    : (lang === 'en' ? 'No tasks today' : 'Dnes bez úloh');
  const mealLabel = remainingMeals
    ? (lang === 'en' ? remainingMeals + ' meals open' : remainingMeals + ' jedál chýba')
    : (lang === 'en' ? 'Meals planned' : 'Jedlá naplánované');
  const shopLabel = stats.uncheckedShop
    ? (lang === 'en' ? stats.uncheckedShop + ' shopping items' : stats.uncheckedShop + ' položiek v nákupe')
    : (lang === 'en' ? 'Shopping clear' : 'Nákup čistý');
  return `<div class="today-focus-card dash-card">
    <div class="today-focus-head">
      <div>
        <div class="today-focus-kicker">${lang === 'en' ? 'Today' : 'Dnes'}</div>
        <div class="today-focus-title">${lang === 'en' ? 'Your day at a glance' : 'Prehľad dňa'}</div>
      </div>
    </div>
    <div class="today-focus-grid">
      <button class="today-focus-item" onclick="switchTab('planner')"><span>🍽️</span><strong>${stats.todayMeals}/${MEALS.length}</strong><small>${mealLabel}</small></button>
      <button class="today-focus-item" onclick="switchTab('tasks')"><span>✅</span><strong>${stats.todayDone}/${stats.todayDone + stats.todayTasks}</strong><small>${taskLabel}</small></button>
      <button class="today-focus-item" onclick="switchTab('shopping')"><span>🛒</span><strong>${stats.uncheckedShop}</strong><small>${shopLabel}</small></button>
      <button class="today-focus-item" onclick="aiGenerateFullWeek()"><span>✨</span><strong>${stats.streak}</strong><small>${lang === 'en' ? 'day streak' : 'dní v rade'}</small></button>
    </div>
  </div>`;
}

function renderMealTimeline() {
  const weekKey = getWeekKey(new Date());
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const plan = getWeekPlan(weekKey);
  const dayPlan = plan[todayName] || {};
  return MEALS.map(m => {
    const entry = dayPlan[m.id];
    let r = null, name = '', img = '', kcal = '', time = '';
    if (entry) {
      if (typeof entry === 'number') r = recipes.find(rec => rec.id === entry);
      else if (entry.type === 'recipe') r = recipes.find(rec => rec.id === entry.id);
      if (r) {
        const rName = lang === 'en' && r.nameEn ? r.nameEn : r.name;
        name = esc(rName); img = r.imageData || r.image || ''; kcal = r.nutrition ? '🔥' + (r.nutrition.kcal||'') : ''; time = '⏱' + r.time;
      } else if (entry.type === 'custom') {
        name = esc(entry.text || '—');
      }
    }
    const filled = !!entry;
    const defImg = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 40 40%22%3E%3Crect fill=%22%23252220%22 width=%2240%22 height=%2240%22/%3E%3Ctext x=%2220%22 y=%2226%22 text-anchor=%22middle%22 font-size=%2214%22 fill=%22%2378716c%22%3E${m.icon}%3C/text%3E%3C/svg%3E';
    return `<div class="meal-timeline-item ${filled?'filled':''}${(!filled||(entry&&entry.type==='custom'))?'':''} card-enter" onclick="${filled?'':'pickRecipe(\''+todayName+'\',\''+m.id+'\',\''+weekKey+'\')'}">
      <span class="meal-dot"></span>
      <span class="meal-icon">${m.icon}</span>
      ${filled && img ? `<img class="meal-img" src="${escAttr(img)}" alt="${name}" loading="lazy" onerror="this.style.display='none'">` : ''}
      <div class="meal-info">
        <div class="meal-label">${mealLabel(m.id)}</div>
        ${filled ? `<div class="meal-name">${name}</div>` : `<div class="meal-empty-text">${lang==='en'?'+ Add meal':'+ Pridať'}</div>`}
        ${filled && time ? `<div class="meal-meta"><span>${time}</span>${kcal ? `<span>${kcal}</span>` : ''}</div>` : ''}
      </div>
      ${filled ? `<div class="meal-actions">
        <button class="meal-action-btn" onclick="event.stopPropagation();pickRecipe('${todayName}','${m.id}','${weekKey}')" title="${lang==='en'?'Replace':'Vymeniť'}" aria-label="${lang==='en'?'Replace meal':'Vymeniť jedlo'}">↻</button>
        <button class="meal-action-btn" onclick="event.stopPropagation();removeSlot('${todayName}','${m.id}','${weekKey}')" title="${lang==='en'?'Remove':'Odstrániť'}" aria-label="${lang==='en'?'Remove meal':'Odstrániť jedlo'}">✕</button>
      </div>` : ''}
    </div>`;
  }).join('');
}

function renderDailySummary() {
  const totalKcal = getTodayKcal();
  const planned = getTodayMealCount();
  const allRecipesToday = getTodayRecipes();
  const totalProtein = allRecipesToday.reduce((s,r) => s + ((r.nutrition&&r.nutrition.protein)||0), 0);
  const totalFat = allRecipesToday.reduce((s,r) => s + ((r.nutrition&&r.nutrition.fat)||0), 0);
  const totalCarbs = allRecipesToday.reduce((s,r) => s + ((r.nutrition&&r.nutrition.carbs)||0), 0);
  const avgDifficulty = allRecipesToday.length ? Math.round(allRecipesToday.reduce((s,r) => s + (r.difficulty||1), 0) / allRecipesToday.length * 10) / 10 : 0;
  const progress = Math.min(100, Math.round(planned / MEALS.length * 100));
  return `
    <div class="summary-widget highlight">
      <div class="circular-progress">
        <svg viewBox="0 0 40 40"><circle class="bg" cx="20" cy="20" r="17"/><circle class="fg" cx="20" cy="20" r="17" stroke-dasharray="106.8" stroke-dashoffset="${106.8 - (106.8 * progress / 100)}"/></svg>
        <span class="center">${progress}%</span>
      </div>
      <div class="widget-label">${lang === 'en' ? 'Planned' : 'Plán'}</div>
    </div>
    <div class="summary-widget">
      <span class="widget-icon">🔥</span>
      <span class="widget-value">${totalKcal}</span>
      <span class="widget-label">${lang === 'en' ? 'kcal' : 'kcal'}</span>
    </div>
    <div class="summary-widget">
      <span class="widget-icon">💪</span>
      <span class="widget-value">${totalProtein}g</span>
      <span class="widget-label">${lang === 'en' ? 'Protein' : 'Bielkov.'}</span>
    </div>
    <div class="summary-widget">
      <span class="widget-icon">🍚</span>
      <span class="widget-value">${totalCarbs}g</span>
      <span class="widget-label">${lang === 'en' ? 'Carbs' : 'Sachar.'}</span>
    </div>
    <div class="summary-widget">
      <span class="widget-icon">🧈</span>
      <span class="widget-value">${totalFat}g</span>
      <span class="widget-label">${lang === 'en' ? 'Fat' : 'Tuky'}</span>
    </div>
    <div class="summary-widget">
      <span class="widget-icon">${avgDifficulty <= 1.5 ? '🟢' : avgDifficulty <= 2.5 ? '🟡' : '🔴'}</span>
      <span class="widget-value">${avgDifficulty || '—'}</span>
      <span class="widget-label">${lang === 'en' ? 'Difficulty' : 'Náročnosť'}</span>
    </div>
  `;
}

function getTodayRecipes() {
  const weekKey = getWeekKey(new Date());
  const todayName = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const plan = getWeekPlan(weekKey);
  const dayPlan = plan[todayName] || {};
  const result = [];
  Object.values(dayPlan).filter(Boolean).forEach(entry => {
    let r = null;
    if (typeof entry === 'number') r = recipes.find(rec => rec.id === entry);
    else if (entry.type === 'recipe') r = recipes.find(rec => rec.id === entry.id);
    if (r) result.push(r);
  });
  return result;
}

function renderSuggestions() {
  const isHot = (new Date().getMonth() >= 5 && new Date().getMonth() <= 7);
  const isCold = (new Date().getMonth() <= 2 || new Date().getMonth() >= 10);

  // Quick recipes (≤20 min)
  const quick = recipes.filter(r => r.time <= 20).sort(() => Math.random() - .5).slice(0, 4);

  // Weather-inspired
  const weatherRecipes = recipes.filter(r => {
    const t = [...(r.tags||[]), ...(r.tagsEn||[])];
    if (isHot) return t.some(tag => ['šalát','salad','studené','cold','gril','grill','osviežujúce','refreshing','letné','summer'].includes(tag));
    if (isCold) return t.some(tag => ['polievka','soup','teplý','warm','sýta','hearty','pečené','baked','zima','winter'].includes(tag));
    return false;
  }).sort(() => Math.random() - .5).slice(0, 4);

  // Favorite dinners
  const dinners = recipes.filter(r => {
    const t = [...(r.tags||[]), ...(r.tagsEn||[])];
    return t.some(tag => ['večera','dinner','hlavné','main'].includes(tag)) || r.category === 'Hlavné jedlá';
  }).sort((a,b) => (b.rating||0) - (a.rating||0)).slice(0, 4);

  const suggs = weatherRecipes.length >= 2 ? weatherRecipes : quick;
  const extra = dinners.slice(0, 2);
  const all = [...suggs, ...extra].slice(0, 6);

  return all.map(r => {
    const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
    const tags = [...(r.tags||[]), ...(r.tagsEn||[])];
    let icon = '🍽️';
    if (isCold && tags.some(t => ['polievka','soup'].includes(t))) icon = '🍲';
    else if (isHot && tags.some(t => ['šalát','salad'].includes(t))) icon = '🥗';
    else if (r.category === 'Dezerty') icon = '🍰';
    else if (r.category === 'Raňajky') icon = '🌅';
    else if (r.category === 'Polievky') icon = '🥣';
    else if (r.category === 'Nápoje') icon = '🍹';
    return `<div class="suggestion-card press-scale" onclick="viewRecipe(${r.id})">
      <div class="sugg-icon">${icon}</div>
      <div class="sugg-name">${esc(name)}</div>
      <div class="sugg-meta">⏱${r.time} · ${r.category}</div>
    </div>`;
  }).join('');
}

function dismissWaterReminder() {
  const el = document.getElementById('water-reminder');
  if (el) el.style.display = 'none';
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

