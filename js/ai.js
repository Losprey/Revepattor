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

async function getRecipeImage(recipe) {
  if (recipe.imageData) return recipe.imageData;
  // Never overwrite existing real image with cached/fetched one
  if (recipe.image && !recipe.image.includes('placehold.co')) return recipe.image;
  // Fetch from Pexels only for recipes without images
  const cache = getImageCache();
  if (cache[recipe.id]) { recipe.image = imgUrl(cache[recipe.id]); saveToLS(); return cache[recipe.id]; }
  // Priority 4: Pexels fetch
  const query = translateRecipeQuery(lang === 'en' && recipe.nameEn ? recipe.nameEn : recipe.name);
  const img = await fetchPexelsImage(query);
  if (img) {
    setImageCache(recipe.id, img);
    recipe.image = imgUrl(img);
    saveToLS();
    return img;
  }
  // Priority 5: category fallback via Pexels
  const catQuery = categoryFallbackQuery(recipe.category);
  if (catQuery) {
    const fallbackImg = await fetchPexelsImage(catQuery);
    if (fallbackImg) {
      setImageCache(recipe.id, fallbackImg);
      recipe.image = imgUrl(fallbackImg);
      saveToLS();
      return fallbackImg;
    }
  }
  return null;
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

function imgUrl(url) {
  if (!url || url.startsWith('data:')) return url;
  return url + (url.includes('?') ? '&' : '?') + 'v=' + APP_VERSION;
}

async function refreshRecipeImages() {
  localStorage.removeItem('pexels_cache_v3');
  recipes.forEach(r => {
    if (r.image && (r.image.includes('pexels.com') || r.image.includes('placehold.co'))) r.image = '';
  });
  saveToLS();
  await batchFetchImages();
  render();
  showToast(t('Obrázky boli obnovené','Images refreshed'),'info');
}

async function batchFetchImages() {
  const toFetch = recipes.filter(r => {
    if (r.imageData) return false;  // Never touch recipes with user-uploaded images
    if (r.image && !r.image.includes('placehold.co')) return false;  // Never overwrite real images
    return true;  // Only fetch for recipes with no image or placeholder
  });
  if (!toFetch.length) return;
  // Fetch in batches of 3 to avoid rate limiting
  for (let i = 0; i < toFetch.length; i += 3) {
    const batch = toFetch.slice(i, i + 3);
    await Promise.all(batch.map(r => getRecipeImage(r).catch(() => {})));
    // Small delay between batches
    if (i + 3 < toFetch.length) await new Promise(r => setTimeout(r, 500));
  }
}
