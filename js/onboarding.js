// Mealnest — Onboarding flow
// ==========================================

// ======================== ONBOARDING ========================
const ONBOARDING_SLIDES = [
  {
    icon: '🌐', title: 'Vyber si jazyk', titleEn: 'Choose language',
    sub: 'Vyber si preferovaný jazyk aplikácie.',
    subEn: 'Select your preferred language for the app.',
    langPicker: true
  },
  {
    icon: '👋', title: 'Vitaj v aplikácii Mealnest', titleEn: 'Welcome to Mealnest',
    sub: 'Tvoj moderný plánovač jedál, nákupov a úloh pre celú rodinu.',
    subEn: 'Your modern meal planner, shopping list & task manager for the whole family.',
    mockup: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">📅 Plán</div><div class="onboard-mockup-item">📖 Recepty</div><div class="onboard-mockup-item">🛒 Nákup</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">✅ Úlohy</div><div class="onboard-mockup-item">🍽️ AI</div><div class="onboard-mockup-item">🏠 Domov</div></div>
    </div>`,
    mockupEn: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">📅 Plan</div><div class="onboard-mockup-item">📖 Recipes</div><div class="onboard-mockup-item">🛒 Shop</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">✅ Tasks</div><div class="onboard-mockup-item">🍽️ AI</div><div class="onboard-mockup-item">🏠 Home</div></div>
    </div>`
  },
  {
    icon: '📅', title: 'Plánovač jedál', titleEn: 'Meal Planner',
    sub: 'Naplánuj si celý týždeň na pár kliknutí. Režim pre dospelých aj pre deti.',
    subEn: 'Plan your whole week in a few taps. Adult & kids mode.',
    mockup: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item" style="background:var(--primary-light);color:#fff;">🌅 Raňajky: Palacinky</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🍽️ Obed: Rizoto</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🌙 Večera: Losos</div></div>
    </div>`,
    mockupEn: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item" style="background:var(--primary-light);color:#fff;">🌅 Breakfast: Pancakes</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🍽️ Lunch: Risotto</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🌙 Dinner: Salmon</div></div>
    </div>`
  },
  {
    icon: '📖', title: 'Recepty', titleEn: 'Recipes',
    sub: 'Ukladaj si obľúbené recepty, prezeraj nutričné hodnoty a importuj z webu.',
    subEn: 'Save your favorite recipes, check nutrition & import from the web.',
    mockup: `<div class="onboard-mockup">
      <div class="onboard-mockup-bar" style="background:var(--primary);width:60%;"></div>
      <div style="font-size:.7rem;color:var(--text2);">🍽️ 65 receptov · 🔥 nutričné hodnoty · ❤️ obľúbené</div>
    </div>`,
    mockupEn: `<div class="onboard-mockup">
      <div class="onboard-mockup-bar" style="background:var(--primary);width:60%;"></div>
      <div style="font-size:.7rem;color:var(--text2);">🍽️ 65 recipes · 🔥 nutrition · ❤️ favorites</div>
    </div>`
  },
  {
    icon: '🌐', title: 'Import z URL', titleEn: 'Import from URL',
    sub: 'Stačí skopírovať odkaz na recept z webu a aplikácia ho spracuje za teba.',
    subEn: 'Just copy a recipe link from the web and the app imports it automatically.',
    mockup: `<div class="onboard-steps">
      <div class="onboard-step"><div class="onboard-step-num">1</div><span>Skopíruj URL receptu z webu</span></div>
      <div class="onboard-step"><div class="onboard-step-num">2</div><span>Klikni Import z URL v aplikácii</span></div>
      <div class="onboard-step"><div class="onboard-step-num">3</div><span>Recept sa automaticky spracuje ✨</span></div>
    </div>`,
    mockupEn: `<div class="onboard-steps">
      <div class="onboard-step"><div class="onboard-step-num">1</div><span>Copy a recipe URL from the web</span></div>
      <div class="onboard-step"><div class="onboard-step-num">2</div><span>Tap Import from URL in the app</span></div>
      <div class="onboard-step"><div class="onboard-step-num">3</div><span>The recipe is automatically imported ✨</span></div>
    </div>`
  },
  {
    icon: '🛒', title: 'Nákupný zoznam', titleEn: 'Shopping List',
    sub: 'Vytvor si zoznam potravín, rozdeľ ho do kategórií a odškrtávaj priamo v obchode.',
    subEn: 'Create grocery lists, organize by categories, and check off items in the store.',
    mockup: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🥦 Zelenina</div><div class="onboard-mockup-item">2/5 ✅</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🥩 Mäso</div><div class="onboard-mockup-item">0/3</div></div>
      <div class="onboard-mockup-bar"><div style="background:var(--success);width:40%;height:100%;border-radius:2px;"></div></div>
    </div>`,
    mockupEn: `<div class="onboard-mockup">
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🥦 Vegetables</div><div class="onboard-mockup-item">2/5 ✅</div></div>
      <div class="onboard-mockup-row"><div class="onboard-mockup-item">🥩 Meat</div><div class="onboard-mockup-item">0/3</div></div>
      <div class="onboard-mockup-bar"><div style="background:var(--success);width:40%;height:100%;border-radius:2px;"></div></div>
    </div>`
  },
  {
    icon: '✅', title: 'Úlohy', titleEn: 'Tasks',
    sub: 'Maj prehľad o tom, čo treba uvariť, nakúpiť a vybaviť — každý deň.',
    subEn: 'Keep track of what to cook, buy, and organize. Every day.',
    mockup: `<div class="onboard-mockup" style="text-align:left;">
      <div style="font-size:.7rem;">📅 Dnes</div>
      <div style="background:var(--bg);border-radius:6px;padding:.3rem;margin:.2rem 0;font-size:.68rem;">☐ Tvoja úloha <span style="color:var(--primary-light);float:right;">●</span></div>
      <div style="background:var(--bg);border-radius:6px;padding:.3rem;font-size:.68rem;opacity:.5;">Žiadne demo dáta</div>
      <div style="font-size:.65rem;color:var(--text3);text-align:center;margin-top:.3rem;">Reálne úlohy po pridaní</div>
    </div>`,
    mockupEn: `<div class="onboard-mockup" style="text-align:left;">
      <div style="font-size:.7rem;">📅 Today</div>
      <div style="background:var(--bg);border-radius:6px;padding:.3rem;margin:.2rem 0;font-size:.68rem;">☐ Your task <span style="color:var(--primary-light);float:right;">●</span></div>
      <div style="background:var(--bg);border-radius:6px;padding:.3rem;font-size:.68rem;opacity:.5;">No demo data</div>
      <div style="font-size:.65rem;color:var(--text3);text-align:center;margin-top:.3rem;">Real tasks after adding</div>
    </div>`
  },
  {
    icon: '✨', title: 'Všetko pripravené!', titleEn: 'All set!',
    sub: 'Môžeš začať plánovať, variť a organizovať. Dobrú chuť!',
    subEn: 'You\'re ready to plan, cook, and organize. Enjoy your meal!',
    mockup: `<div style="font-size:4rem;margin-top:.5rem;">🍽️</div>`
  },
];

let _onboardIndex = 0;
function showOnboarding(forceShow) {
  if (!forceShow && localStorage.getItem('onboardingCompleted') === '1') return;
  const existing = document.getElementById('onboarding-overlay');
  if (existing) existing.remove();
  const ov = document.createElement('div');
  ov.id = 'onboarding-overlay';
  ov.className = 'active';
  ov.innerHTML = `<div class="onboard-slides" id="onboard-slides"></div>
    <div class="onboard-footer">
      <div class="onboard-dots" id="onboard-dots"></div>
      <button class="onboard-btn onboard-btn-primary" id="onboard-next">${lang==='en'?'Next →':'Ďalej →'}</button>
    </div>`;
  document.body.appendChild(ov);
  _onboardIndex = 0;
  renderOnboardSlide();
  document.getElementById('onboard-next').onclick = nextOnboardSlide;
  // Swipe support
  let touchStartX = 0;
  ov.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  ov.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 60) nextOnboardSlide();
    else if (diff < -60) prevOnboardSlide();
  });
}

function renderOnboardSlide() {
  const slides = document.getElementById('onboard-slides');
  const s = ONBOARDING_SLIDES[_onboardIndex];
  const l = lang === 'en' ? 'en' : 'sk';
  slides.innerHTML = ONBOARDING_SLIDES.map((s2, i) => {
    let cls = 'onboard-slide';
    if (i < _onboardIndex) cls += ' prev';
    else if (i > _onboardIndex) cls += ' next';
    const title = l === 'en' ? s2.titleEn : s2.title;
    const sub = l === 'en' ? s2.subEn : s2.sub;
    const mockup = s2.langPicker
      ? `<div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;justify-content:center;">
          <button id="onboard-lang-en" onclick="event.stopPropagation();pickOnboardLang('en')" style="padding:1rem 1.5rem;border-radius:16px;border:2px solid var(--border);background:var(--surface);color:var(--text);font-size:1rem;font-weight:700;cursor:pointer;min-width:140px;">🇬🇧 English</button>
          <button id="onboard-lang-sk" onclick="event.stopPropagation();pickOnboardLang('sk')" style="padding:1rem 1.5rem;border-radius:16px;border:2px solid var(--border);background:var(--surface);color:var(--text);font-size:1rem;font-weight:700;cursor:pointer;min-width:140px;">🇸🇰 Slovenčina</button>
        </div>`
      : l === 'en' && s2.mockupEn ? s2.mockupEn : s2.mockup || '';
    return `<div class="${cls}"><div class="onboard-illustration">${s2.icon}</div><div class="onboard-title">${title}</div><div class="onboard-sub">${sub}</div>${mockup}</div>`;
  }).join('');
  // Dots
  const dots = document.getElementById('onboard-dots');
  dots.innerHTML = ONBOARDING_SLIDES.map((_, i) => `<div class="onboard-dot${i === _onboardIndex ? ' active' : ''}"></div>`).join('');
  // Button
  const btn = document.getElementById('onboard-next');
  const isLast = _onboardIndex === ONBOARDING_SLIDES.length - 1;
  btn.textContent = isLast ? (l==='en'?'Start using Mealnest':'Začať používať') : (l==='en'?'Next →':'Ďalej →');
}

function nextOnboardSlide() {
  if (_onboardIndex < ONBOARDING_SLIDES.length - 1) { _onboardIndex++; renderOnboardSlide(); }
  else closeOnboarding();
}
function prevOnboardSlide() {
  if (_onboardIndex > 0) { _onboardIndex--; renderOnboardSlide(); }
}
function closeOnboarding() {
  document.getElementById('onboarding-overlay')?.remove();
  localStorage.setItem('onboardingCompleted', '1');
}

function pickOnboardLang(l) {
  appSettings.lang = l;
  lang = l;
  localStorage.setItem('lang', l);
  saveSettings();
  // Highlight active
  const enBtn = document.getElementById('onboard-lang-en');
  const skBtn = document.getElementById('onboard-lang-sk');
  if (enBtn) { enBtn.style.borderColor = l==='en'?'var(--primary)':'var(--border)'; enBtn.style.background = l==='en'?'rgba(220,38,38,.08)':'var(--surface)'; enBtn.style.color = l==='en'?'var(--primary)':'var(--text)'; }
  if (skBtn) { skBtn.style.borderColor = l==='sk'?'var(--primary)':'var(--border)'; skBtn.style.background = l==='sk'?'rgba(220,38,38,.08)':'var(--surface)'; skBtn.style.color = l==='sk'?'var(--primary)':'var(--text)'; }
  renderOnboardSlide();
}

// Show onboarding on first visit (after data loads)
setTimeout(() => showOnboarding(), 300);

