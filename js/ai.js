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

async function fetchCommonsRecipePhoto(query) {
  const words = query.replace(/[^\p{L}\p{N}\s-]/gu, ' ').trim().slice(0, 100);
  if (!words) return null;
  const params = new URLSearchParams({
    action: 'query', format: 'json', origin: '*', generator: 'search',
    gsrnamespace: '6', gsrsearch: words + ' filetype:bitmap', gsrlimit: '5',
    prop: 'imageinfo', iiprop: 'url|mime|extmetadata', iiurlwidth: '640'
  });
  try {
    const response = await fetch('https://commons.wikimedia.org/w/api.php?' + params, {
      signal: AbortSignal.timeout(8000), referrerPolicy: 'no-referrer'
    });
    if (!response.ok) return null;
    const result = await response.json();
    const pages = Object.values(result.query?.pages || {}).sort((a, b) => a.index - b.index);
    for (const page of pages) {
      const info = page.imageinfo?.[0];
      const metadata = info?.extmetadata;
      const license = metadata?.LicenseShortName?.value;
      const licenseUrl = metadata?.LicenseUrl?.value;
      const url = info?.thumburl;
      const source = info?.descriptionurl;
      if (!/^CC BY(?:-SA)? [234](?:\.\d)?$/i.test(license) ||
          !/^https?:\/\/creativecommons\.org\/licenses\/(?:by|by-sa)\/[\d.]+\/?$/i.test(licenseUrl) ||
          !/^https:\/\/(?:upload|thumb)\.wikimedia\.org\/wikipedia\/commons\//.test(url) ||
          !/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/i.test(source) ||
          !/^image\/(?:jpeg|png|webp)$/.test(info?.mime || '') ||
          /^true$/i.test(metadata?.Restrictions?.value || '')) continue;
      const author = document.createElement('template');
      author.innerHTML = metadata?.Artist?.value || '';
      const authorName = author.content.textContent.replace(/\s+/g, ' ').trim();
      if (!authorName) continue;
      return { url, source, license, licenseUrl: licenseUrl.replace(/^http:/, 'https:'), author: authorName };
    }
  } catch (error) {
    // A recipe remains usable without a photo.
  }
  return null;
}

function getRecipeImageSource(recipe) {
  const explicit = recipe.imageData || (recipe.image && !recipe.image.includes('placehold.co') ? recipe.image : '');
  const builtIn = PRELOADED_IMAGES[recipe.id];
  if (explicit || builtIn) return explicit || builtIn;
  const cached = getImageCache()[recipe.id];
  return (typeof cached === 'string' ? cached : cached?.url) || '';
}

async function getRecipeImage(recipe) {
  const existing = getRecipeImageSource(recipe);
  if (existing) return existing;

  const photo = await fetchCommonsRecipePhoto(translateRecipeQuery(recipe.nameEn || recipe.name));
  if (photo) {
    // Keep attribution alongside the downloaded photo URL on this device.
    setImageCache(recipe.id, photo);
  }
  return getRecipeImageSource(recipe);
}

function renderRecipeImageCredit(recipe, image) {
  const photo = getImageCache()[recipe.id];
  if (!photo || typeof photo !== 'object' || photo.url !== image ||
      !/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/i.test(photo.source) ||
      !/^https:\/\/creativecommons\.org\/licenses\//i.test(photo.licenseUrl)) return '';
  return `<a href="${escAttr(photo.source)}" target="_blank" rel="noopener noreferrer">${esc(photo.author)} · Wikimedia Commons</a>
    · <a href="${escAttr(photo.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(photo.license)}</a>
    <span> · ${t('Ilustračná fotka','Illustrative photo')}</span>`;
}

async function refreshRecipeImages() {
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
