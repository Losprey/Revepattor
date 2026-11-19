// Mealnest — DeepSeek AI calls
// ==========================================

// ======================== AI (DEEPSEEK PROXY) ========================
const APP_VERSION = '1.0.54';
const VAPID_PUBLIC_KEY = 'BI6Fga-GXSKggkNJ58R1VEYEfGE6KfWgnuDtI9sHqQLQJzGLshJuIuODmI13AVzX5D2Kd7SBxrr7Cvf-xRAowg0';
const PUSH_PROXY_URL = 'https://receptar.waldis994.workers.dev';

// ======================== AI: CELÝ TÝŽDEŇ + NÁKUP ========================
async function aiGenerateFullWeek() {
  showConfirmModal(lang==='en'?'Generate full week + shopping list? This will replace your current plan.':'Vygenerovať celý týždeň + nákupný zoznam? Prepíše sa aktuálny plán.', '🚀', lang==='en'?'Generate':'Generovať', function() {
    aiGenerateFullWeekRun();
  });
}

async function aiGenerateFullWeekRun() {
  const menuText = await aiWeeklyPlan();
  if (!menuText) return;
  // Remove any existing AI plan modal
  const old = document.getElementById('ai-plan-modal');
  if (old) old.remove();
  // Show the plan in a modal with a custom button
  const div = document.createElement('div');
  div.id = 'ai-plan-modal';
  div.className = 'modal-overlay active';
  div.style.cssText = 'z-index:2000;';
  div.onclick = function(e) { if (e.target === this) this.remove(); };
  div.innerHTML = '<div class="modal" style="max-width:500px;max-height:85vh;overflow-y:auto;">' +
    '<button class="modal-close" onclick="this.closest(\'.modal-overlay\').remove()" aria-label="Zavrieť">✕</button>' +
    '<h2>🤖 ' + t('AI návrh jedálnička','AI meal plan') + '</h2>' +
    '<pre id="ai-plan-text" style="white-space:pre-wrap;font-size:.75rem;font-family:inherit;background:var(--bg);padding:.8rem;border-radius:8px;max-height:50vh;overflow-y:auto;">' + esc(menuText) + '</pre>' +
    '<div style="display:flex;gap:.5rem;margin-top:.8rem;flex-wrap:wrap;">' +
      '<button class="btn btn-primary" onclick="parseAndFillAIPlan();showToast(\'Shopping will be generated...\',\'info\');setTimeout(function(){aiGenerateShoppingList()},3000)" style="flex:1;">' + (lang === 'en' ? 'Apply + shopping' : 'Použiť + nákup') + '</button>' +
      '<button class="btn btn-secondary" onclick="parseAndFillAIPlan();this.closest(\'.modal-overlay\').remove()">' + t('Len použiť','Just apply') + '</button>' +
    '</div></div>';
  document.body.appendChild(div);
}

async function fetchPexelsImage(query) {
  if (!query) return null;
  const url = AI_PROXY_URL + '/api/pexels?query=' + encodeURIComponent(query);
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.photos && data.photos.length > 0) {
      // Prefer food-looking images (try to avoid non-food results)
      for (const photo of data.photos) {
        if (photo.alt && /food|meal|dish|breakfast|lunch|dinner|cook/i.test(photo.alt)) {
          return photo.src.large2x || photo.src.large || photo.src.medium;
        }
      }
      return data.photos[0].src.large2x || data.photos[0].src.large || data.photos[0].src.medium;
    }
    return null;
  } catch(e) {
    return null;
  }
}

function getRecipeImageSource(recipe) {
  const source = recipe.image;
  return recipe.imageData ||
    (source && !source.includes('placehold.co') ? source : '') ||
    PRELOADED_IMAGES[recipe.id] || getImageCache()[recipe.id] || '';
}

async function getRecipeImage(recipe) {
  const existing = getRecipeImageSource(recipe);
  if (existing) return existing;

  const query = translateRecipeQuery(lang === 'en' && recipe.nameEn ? recipe.nameEn : recipe.name);
  const image = await fetchPexelsImage(query) || await fetchPexelsImage(categoryFallbackQuery(recipe.category));
  if (image) setImageCache(recipe.id, image);
  return getRecipeImageSource(recipe);
}

function categoryFallbackQuery(category) {
  const map = {
    'Raňajky': 'breakfast food',
    'Polievky': 'soup food',
    'Hlavné jedlá': 'main dish dinner',
    'Šaláty': 'salad food',
    'Dezerty': 'dessert',
    'Pečivo': 'bread bakery',
    'Nápoje': 'smoothie drink',
    'Predjedlá': 'appetizer',
    'Prílohy': 'side dish',
    'Detské': 'baby food healthy',
  };
  return map[category] || 'food meal';
}

async function refreshRecipeImages() {
  localStorage.removeItem('pexels_cache_v3');
  await batchFetchImages();
  render();
  if (recipes.some(recipe => !getRecipeImageSource(recipe))) {
    showToast(t('Niektoré fotky sa nepodarilo načítať.', 'Some photos could not be loaded.'), 'warning');
  } else {
    showToast(t('Obrázky boli obnovené', 'Images refreshed'), 'success');
  }
}

async function batchFetchImages() {
  const toFetch = recipes.filter(recipe => !getRecipeImageSource(recipe));
  if (!toFetch.length) return;
  // Fetch in batches of 3 to avoid rate limiting
  for (let i = 0; i < toFetch.length; i += 3) {
    const batch = toFetch.slice(i, i + 3);
    await Promise.all(batch.map(r => getRecipeImage(r).catch(() => {})));
    // Small delay between batches
    if (i + 3 < toFetch.length) await new Promise(r => setTimeout(r, 500));
  }
}
