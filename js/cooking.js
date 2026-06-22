// Mealnest — Cooking mode, timer, voice
// ==========================================

// ======================== COOKING MODE ========================
function openCookingMode() {
  cookingRecipeId = viewingId;
  cookingStep = 0;
  const r = recipes.find(rec => rec.id === cookingRecipeId);
  if (!r) return;
  closeModal('detail-modal');
  document.getElementById('cooking-mode').classList.add('active');
  renderCookingStep();
  // Async image fetch
  if (!r.image && !r.imageData) {
    getRecipeImage(r).then(url => {
      if (url) renderCookingStep();
    });
  }
}

function renderCookingStep() {
  const r = recipes.find(rec => rec.id === cookingRecipeId);
  if (!r) return;
  const total = r.steps.length;
  const name = lang === 'en' && r.nameEn ? r.nameEn : r.name;
  const stps = (lang === "en" && r.stepsEn ? r.stepsEn : r.steps) || [];
  document.getElementById('cooking-title').textContent = name;
  const imgEl = document.getElementById('cooking-img');
  if (r.image || r.imageData) {
    imgEl.innerHTML = `<img src="${escAttr(r.imageData||r.image)}" style="width:100%;height:100%;object-fit:contain;" loading="lazy" onerror="this.outerHTML='🍽️'">`;
  } else { imgEl.textContent = '🍽️'; imgEl.className = 'cooking-img img-skeleton'; }
  document.getElementById('cooking-step-indicator').textContent = `${lang==='en'?'Step':'Krok'} ${cookingStep+1}/${total}`;
  document.getElementById('cooking-step-text').textContent = stps[cookingStep];
  document.getElementById('cooking-step-count').textContent = `${cookingStep+1}/${total}`;
  document.getElementById('cooking-progress-bar').style.width = `${((cookingStep+1)/total)*100}%`;
  document.getElementById('cooking-prev').disabled = cookingStep === 0;
  document.getElementById('cooking-next').innerHTML = cookingStep === total-1 ? `✓ ${lang==='en'?'Done':'Hotovo'}` : `${lang==='en'?'Next':'Ďalší'} →`;
  const timeMatch = stps[cookingStep].match(/(\d+)\s*(minút|min|minutes|hodín|hour|hours)/i);
  const timerBtn = document.getElementById('cooking-timer-btn');
  if (timeMatch) {
    const mins = parseInt(timeMatch[1]);
    timerBtn.style.display = 'inline-flex';
    timerBtn.textContent = `⏱ ${mins} ${lang==='en'?'min':'min'}`;
    timerBtn.onclick = () => {
      cookingTimerSeconds = mins * 60;
      startTimer();
    };
  } else {
    timerBtn.style.display = 'none';
  }
}

function cookingNext() {
  const r = recipes.find(rec => rec.id === cookingRecipeId);
  if (!r) return;
  if (cookingStep < r.steps.length - 1) { cookingStep++; renderCookingStep(); }
  else { logCooking(cookingRecipeId); closeCookingMode(); showToast(t('cookingDone'),'success'); }
}
function cookingPrev() { if (cookingStep > 0) { cookingStep--; renderCookingStep(); } }

document.addEventListener('keydown', function(e) {
  if (!document.getElementById('cooking-mode').classList.contains('active')) return;
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') { e.preventDefault(); cookingNext(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); cookingPrev(); }
  if (e.key === 'Escape') { closeCookingMode(); }
});

function closeCookingMode() {
  document.getElementById('cooking-mode').classList.remove('active');
  stopTimer();
  stopVoice();
}

// ======================== TIMER ========================
function toggleTimer() {
  if (cookingTimerRunning) { stopTimer(); }
  else {
    const mins = prompt(lang==='en'?'Timer (minutes):' : 'Timer (minúty):', '5');
    if (mins === null) return;
    const val = parseInt(mins);
    if (isNaN(val) || val < 1 || val > 999) { showToast(lang==='en'?'Enter 1-999 minutes.':'Zadaj 1-999 minút.','warning'); return; }
    cookingTimerSeconds = val * 60;
    startTimer();
  }
}

function startTimer() {
  cookingTimerRunning = true;
  document.getElementById('cooking-timer').classList.add('running');
  updateTimerDisplay();
  cookingTimer = setInterval(() => {
    cookingTimerSeconds--;
    if (cookingTimerSeconds <= 0) { stopTimer(); showToast('⏰ '+(lang==='en'?'Time up!':'Timer dobehol!'),'warning'); }
    else updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  cookingTimerRunning = false;
  document.getElementById('cooking-timer').classList.remove('running');
  if (cookingTimer) { clearInterval(cookingTimer); cookingTimer = null; }
  document.getElementById('cooking-timer').textContent = '⏱️ 00:00';
}

function updateTimerDisplay() {
  const m = Math.floor(cookingTimerSeconds / 60);
  const s = cookingTimerSeconds % 60;
  document.getElementById('cooking-timer').textContent = `⏱️ ${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  if (cookingTimerSeconds <= 60) document.getElementById('cooking-timer').style.color = '#ef4444';
  else document.getElementById('cooking-timer').style.color = '';
}

// ======================== VOICE ========================
function toggleVoice() {
  if (voiceSearchListening) stopVoiceSearch();
  if (voiceListening) { stopVoice(); return; }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { showToast(lang==='en'?'Voice not supported.':'Hlasové ovládanie nie je podporené.','warning'); return; }
  voiceRecognition = new SpeechRecognition();
  voiceRecognition.lang = lang === 'en' ? 'en-US' : 'sk-SK';
  voiceRecognition.continuous = true;
  voiceRecognition.interimResults = false;
  voiceRecognition.onresult = function(e) {
    const txt = e.results[e.results.length-1][0].transcript.toLowerCase();
    if (txt.includes('next') || txt.includes('ďalší') || txt.includes('dalej') || txt.includes('hotovo') || txt.includes('done')) cookingNext();
    if (txt.includes('previous') || txt.includes('predošlý') || txt.includes('späť') || txt.includes('back')) cookingPrev();
    if (txt.includes('close') || txt.includes('zavrieť') || txt.includes('koniec') || txt.includes('exit')) closeCookingMode();
    if (txt.includes('timer') || txt.includes('časovač')) toggleTimer();
    if (txt.includes('stop') || txt.includes('halt')) stopTimer();
  };
  voiceRecognition.onerror = function() { stopVoice(); };
  voiceRecognition.start();
  voiceListening = true;
  document.getElementById('voice-btn').classList.add('listening');
  document.getElementById('voice-btn').textContent = '🎤';
}

function stopVoice() {
  if (voiceRecognition) { try { voiceRecognition.stop(); } catch(e) {} voiceRecognition = null; }
  voiceListening = false;
  document.getElementById('voice-btn').classList.remove('listening');
  document.getElementById('voice-btn').textContent = '🎤';
}



// ======================== VOICE SEARCH ========================
function toggleVoiceSearch() {
  if (voiceListening) stopVoice();
  if (voiceSearchListening) { stopVoiceSearch(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showToast(lang==='en'?'Voice search not supported.':'Hlasové vyhľadávanie nie je podporené.','warning'); return; }
  voiceSearch = new SR();
  voiceSearch.lang = lang === 'en' ? 'en-US' : 'sk-SK';
  voiceSearch.interimResults = false;
  voiceSearch.onresult = function(e) {
    const txt = e.results[0][0].transcript;
    document.getElementById('search').value = txt;
    document.getElementById('search-clear').style.display = txt ? 'block' : 'none';
    render();
    stopVoiceSearch();
  };
  voiceSearch.onerror = function() { stopVoiceSearch(); };
  voiceSearch.start();
  voiceSearchListening = true;
  document.getElementById('voice-search-btn').textContent = '🎤';
  document.getElementById('voice-search-btn').style.background = '#ef4444';
  document.getElementById('voice-search-btn').style.color = '#fff';
}

function stopVoiceSearch() {
  if (voiceSearch) { try { voiceSearch.stop(); } catch(e) {} voiceSearch = null; }
  voiceSearchListening = false;
  const btn = document.getElementById('voice-search-btn');
  if (btn) { btn.textContent = '🎤'; btn.style.background = ''; btn.style.color = ''; }
}

