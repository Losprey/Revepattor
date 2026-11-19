// ======================== 📌 RODINNÁ NÁSTENKA (BOARD) ========================
// Načítava sa až po app.js — všetky globálne funkcie (t, esc, escAttr, showConfirmModal, getDeviceId, authUser, lang, familyDbRef) sú dostupné

(function() {
  let boardCards = [];
  const BOARD_REACTIONS = ['👍', '❤️', '😂', '🎉', '😢', '😡'];

  function boardStorageKey() {
    return familyCode ? 'boardCards:' + familyCode : 'boardCards';
  }

  function readBoardList(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  }

  // Associate existing local cards only with the family already saved on this device.
  if (familyCode && !localStorage.getItem('boardCardsMigrated')) {
    const key = boardStorageKey();
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(readBoardList('boardCards')));
    }
  }
  localStorage.setItem('boardCardsMigrated', '1');

  window.loadBoardCards = function() {
    boardCards = readBoardList(boardStorageKey());
  };

  window.saveBoardCards = function() {
    const key = boardStorageKey();
    const previous = new Map(readBoardList(key).filter(Boolean).map(card => [card.id, card]));
    const current = new Map(boardCards.filter(Boolean).map(card => [card.id, card]));
    const removed = [...previous.keys()].filter(id => !current.has(id));
    const changed = [...current.values()].filter(card => JSON.stringify(previous.get(card.id)) !== JSON.stringify(card));
    const now = Date.now();
    changed.forEach(card => {
      if (!card.createdAt) card.createdAt = now;
      card.updatedAt = now;
    });
    localStorage.setItem(key, JSON.stringify(boardCards));
    if (!familyDbRef || (!changed.length && !removed.length)) return;

    familyDbRef.child('boardCards').transaction(remote => {
      const list = Array.isArray(remote) ? remote : [];
      const cards = new Map(list.filter(Boolean).map(card => [card.id, card]));
      removed.forEach(id => cards.delete(id));
      changed.forEach(card => cards.set(card.id, card));
      return [...cards.values()];
    }, undefined, false).catch(error => {
      console.warn('Board sync failed:', error.message);
      showToast(t('Karta je uložená lokálne. Zdieľanie zlyhalo.', 'Card saved locally. Sharing failed.'), 'warning');
    });
  };

  window.generateBoardId = function() {
    return 'bc_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,8);
  };

  window.renderBoard = function() {
    const container = document.getElementById('family-board-cards');
    if (!container) return;
    loadBoardCards();
    
    boardCards.sort(function(a, b) {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

    if (!boardCards.length) {
      container.innerHTML = '<div class="empty-state-v2 action-empty board-empty"><div class="empty-orb">📌</div><div class="empty-title">' + t('Nástenka je prázdna','Board is empty') + '</div><div class="empty-desc">' + t('Pridaj prvú kartu — pripomienku, odkaz alebo fotku pre rodinu.','Add the first card — a note, link or photo for the family.') + '</div><div class="empty-actions"><button class="btn btn-primary" onclick="openAddBoardCard()">📌 ' + t('Pridať kartu','Add card') + '</button></div></div>';
      return;
    }

    var html = '<div class="board-header-actions"><button class="btn btn-primary board-add-card-btn" onclick="openAddBoardCard()">📌 ' + t('Pridať kartu','Add card') + '</button><span class="board-count-pill">' + boardCards.length + ' ' + t('kariet','cards') + '</span></div>';
    html += '<div class="board-grid">';

    boardCards.forEach(function(card) {
      var name = card.authorName || t('Niekto','Someone');
      var time = timeAgo(card.createdAt || Date.now());
      var text = esc(card.text || '');
      var pinned = card.pinned ? '📌 ' : '';
      var reactions = card.reactions || {};
      var reactionHtml = Object.keys(reactions).length ? '<div class="board-reactions">' + Object.entries(reactions).map(function(e) {
        return '<span class="board-reaction" onclick="toggleBoardReaction(\'' + card.id + '\',\'' + e[0] + '\')">' + e[0] + ' ' + e[1].length + '</span>';
      }).join('') + '</div>' : '';

      var color = card.color || 'var(--surface)';
      var borderColor = card.pinned ? 'var(--primary-light)' : 'transparent';
      var pinnedBadge = card.pinned ? '<span class="board-pin-badge">📌</span>' : '';

      html += '<div class="board-card" data-id="' + card.id + '" style="background:' + color + ';border-left:3px solid ' + borderColor + ';">';
      html += '<div class="board-card-header"><span class="board-card-author">' + esc(name) + '</span><span class="board-card-time">' + time + '</span>';
      html += '<div class="board-card-menu" onclick="event.stopPropagation();toggleBoardCardMenu(this)">⋮</div>';
      html += '<div class="board-card-dropdown" style="display:none;">';
      html += '<button onclick="togglePinBoardCard(\'' + card.id + '\')">' + (card.pinned ? t('Odopnúť','Unpin') : '📌 ' + t('Pripnúť','Pin')) + '</button>';
      html += '<button onclick="editBoardCardColor(\'' + card.id + '\')">🎨 ' + t('Farba','Color') + '</button>';
      html += '<button class="danger" onclick="deleteBoardCard(\'' + card.id + '\')">🗑 ' + t('Vymazať','Delete') + '</button>';
      html += '</div></div>';
      html += '<div class="board-card-body"><p>' + text + '</p></div>';
      if (card.image) {
        html += '<div class="board-card-image"><img src="' + escAttr(card.image) + '" loading="lazy" onclick="window.open(\'' + escAttr(card.image) + '\',\'_blank\')"></div>';
      }
      html += '<div class="board-card-footer">' + reactionHtml;
      html += '<button class="board-add-reaction" onclick="openReactionPicker(event, \'' + card.id + '\')">😊</button>';
      html += pinnedBadge;
      html += '</div></div>';
    });

    html += '</div>';
    container.innerHTML = html;
  };

  window.openAddBoardCard = function(editId) {
    var card = editId ? boardCards.find(function(c) { return c.id === editId; }) : null;
    var title = card ? t('✏️ Upraviť kartu','✏️ Edit card') : t('📌 Nová karta','📌 New card');
    var btnLabel = card ? t('💾 Uložiť','💾 Save') : t('📌 Pridať','📌 Add');
    var textVal = card ? esc(card.text || '') : '';
    var imageVal = card ? escAttr(card.image || '') : '';
    
    var old = document.getElementById('board-form-modal');
    if (old) old.remove();
    var div = document.createElement('div');
    div.id = 'board-form-modal';
    div.className = 'modal-overlay active';
    div.style.cssText = 'z-index:2000;';
    div.onclick = function(e) { if (e.target === this) this.remove(); };
    div.innerHTML = '<div class="modal" style="max-width:480px;">' +
      '<button class="modal-close" onclick="this.closest(\'.modal-overlay\').remove()">✕</button>' +
      '<h2>' + title + '</h2>' +
      '<div class="form-group"><label style="font-size:.78rem;color:var(--text2);margin-bottom:.2rem;display:block;">' + t('Text karty','Card text') + '</label>' +
      '<textarea id="board-form-text" rows="3" style="width:100%;padding:.55rem;border:1px solid var(--border);border-radius:8px;font-size:.85rem;background:var(--input-bg);color:var(--text);resize:vertical;">' + textVal + '</textarea></div>' +
      '<div class="form-group"><label style="font-size:.78rem;color:var(--text2);margin-bottom:.2rem;display:block;">' + t('Obrázok (URL, voliteľné)','Image (URL, optional)') + '</label>' +
      '<input id="board-form-image" value="' + imageVal + '" placeholder="https://..." style="width:100%;padding:.55rem;border:1px solid var(--border);border-radius:8px;font-size:.85rem;background:var(--input-bg);color:var(--text);"></div>' +
      '<div class="board-color-picker" id="board-color-picker">' + 
      ['var(--surface)','rgba(220,38,38,.15)','rgba(16,185,129,.15)','rgba(59,130,246,.15)','rgba(245,158,11,.15)','rgba(139,92,246,.15)'].map(function(c) {
        return '<span class="board-color-dot' + ((card && card.color === c) ? ' active' : '') + '" data-color="' + c + '" style="background:' + c + ';border:2px solid ' + (c === 'var(--surface)' ? 'var(--border)' : c) + ';" onclick="this.parentElement.querySelectorAll(\'.board-color-dot\').forEach(function(d){d.classList.remove(\'active\')});this.classList.add(\'active\');"></span>';
      }).join('') + '</div>' +
      '<label style="display:flex;align-items:center;gap:.35rem;margin:.5rem 0;font-size:.82rem;cursor:pointer;"><input type="checkbox" id="board-form-pinned" ' + (card && card.pinned ? 'checked' : '') + '> 📌 ' + t('Pripnúť','Pin') + '</label>' +
      '<div style="display:flex;gap:.5rem;margin-top:.5rem;">' +
      '<button class="btn btn-primary" onclick="saveBoardCard(\'' + (editId || '') + '\')" style="flex:1;">' + btnLabel + '</button>' +
      '<button class="btn btn-secondary" onclick="document.getElementById(\'board-form-modal\').remove()">' + t('Zrušiť','Cancel') + '</button></div></div>';
    document.body.appendChild(div);
    var te = document.getElementById('board-form-text');
    if (te) te.focus();
  };

  window.saveBoardCard = function(editId) {
    var textEl = document.getElementById('board-form-text');
    var text = textEl ? textEl.value.trim() : '';
    if (!text) { if (textEl) { textEl.focus(); textEl.style.borderColor = 'var(--danger)'; setTimeout(function() { textEl.style.borderColor = ''; }, 1500); } return; }
    var image = document.getElementById('board-form-image')?.value.trim() || '';
    var pinned = document.getElementById('board-form-pinned')?.checked || false;
    var colorEl = document.querySelector('#board-color-picker .board-color-dot.active');
    var color = colorEl ? colorEl.dataset.color : 'var(--surface)';
    
    loadBoardCards();
    if (editId) {
      var existing = boardCards.find(function(c) { return c.id === editId; });
      if (existing) { existing.text = text; existing.image = image; existing.color = color; existing.pinned = pinned; }
    } else {
      boardCards.push({
        id: generateBoardId(), text: text, image: image, color: color, pinned: pinned,
        reactions: {},
        authorName: authUser ? (authUser.displayName || authUser.email || t('👤', '👤')) : t('Hosť','Guest'),
        createdAt: Date.now(), updatedAt: Date.now()
      });
    }
    saveBoardCards();
    // Notify family
    if (typeof sendPushToFamily === 'function') {
      var pushText = text.length > 80 ? text.slice(0, 80) + '...' : text;
      var pushAuthor = authUser ? (authUser.displayName || authUser.email || '👤') : t('Hosť','Guest');
      sendPushToFamily('📌 ' + t('Nová karta','New card'), pushAuthor + ': ' + pushText, 'board');
    }
    var modal = document.getElementById('board-form-modal');
    if (modal) modal.remove();
    renderBoard();
  };

  window.deleteBoardCard = function(id) {
    const key = boardStorageKey();
    showConfirmModal(t('Vymazať túto kartu?','Delete this card?'), '🗑️', t('Vymazať','Delete'), function() {
      if (boardStorageKey() !== key) return;
      loadBoardCards();
      var deletedCard = boardCards.find(function(c) { return c.id === id; });
      var deletedIndex = boardCards.findIndex(function(c) { return c.id === id; });
      boardCards = boardCards.filter(function(c) { return c.id !== id; });
      saveBoardCards();
      renderBoard();
      if (typeof showUndoToast === 'function') {
        showUndoToast('🗑️ ' + t('Karta vymazaná','Card deleted'), function() {
          if (!deletedCard || boardStorageKey() !== key) return;
          loadBoardCards();
          boardCards.splice(Math.max(0, deletedIndex), 0, deletedCard);
          saveBoardCards();
          renderBoard();
          showToast(t('Karta obnovená','Card restored'), 'success', 1200);
        });
      }
    });
  };

  window.togglePinBoardCard = function(id) {
    loadBoardCards();
    var card = boardCards.find(function(c) { return c.id === id; });
    if (card) { card.pinned = !card.pinned; saveBoardCards(); renderBoard(); }
  };

  window.editBoardCardColor = function(id) {
    var colors = ['var(--surface)','rgba(220,38,38,.15)','rgba(16,185,129,.15)','rgba(59,130,246,.15)','rgba(245,158,11,.15)','rgba(139,92,246,.15)'];
    var card = boardCards.find(function(c) { return c.id === id; });
    if (!card) return;
    var currentIdx = colors.indexOf(card.color);
    card.color = colors[(currentIdx + 1) % colors.length];
    saveBoardCards();
    renderBoard();
  };

  window.toggleBoardReaction = function(cardId, emoji) {
    loadBoardCards();
    var card = boardCards.find(function(c) { return c.id === cardId; });
    if (!card) return;
    if (!card.reactions) card.reactions = {};
    if (!card.reactions[emoji]) card.reactions[emoji] = [];
    var deviceId = getDeviceId();
    var idx = card.reactions[emoji].indexOf(deviceId);
    if (idx > -1) { card.reactions[emoji].splice(idx, 1); if (!card.reactions[emoji].length) delete card.reactions[emoji]; }
    else { card.reactions[emoji].push(deviceId); }
    saveBoardCards();
    renderBoard();
  };

  window.openReactionPicker = function(event, cardId) {
    event.stopPropagation();
    var existing = document.getElementById('board-reaction-picker');
    if (existing) existing.remove();
    var picker = document.createElement('div');
    picker.id = 'board-reaction-picker';
    picker.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--surface);backdrop-filter:blur(20px);border:1px solid var(--border);border-radius:16px;padding:.5rem;z-index:9999;display:flex;gap:.3rem;box-shadow:0 8px 32px rgba(0,0,0,.3);';
    picker.innerHTML = BOARD_REACTIONS.map(function(r) {
      return '<button style="font-size:1.4rem;width:40px;height:40px;border:none;background:none;cursor:pointer;border-radius:8px;" onmouseover="this.style.background=\'var(--hover-bg)\'" onmouseout="this.style.background=\'none\'" onclick="toggleBoardReaction(\'' + cardId + '\',\'' + r + '\');this.parentElement.remove()">' + r + '</button>';
    }).join('');
    document.body.appendChild(picker);
    setTimeout(function() { document.addEventListener('click', function _closePicker() { var p = document.getElementById('board-reaction-picker'); if (p) p.remove(); document.removeEventListener('click', _closePicker); }, { once: true }); }, 10);
  };

  window.toggleBoardCardMenu = function(el) {
    var dropdown = el.parentElement.querySelector('.board-card-dropdown');
    if (!dropdown) return;
    var isOpen = dropdown.style.display === 'block';
    document.querySelectorAll('.board-card-dropdown').forEach(function(d) { d.style.display = 'none'; });
    dropdown.style.display = isOpen ? 'none' : 'block';
  };

  window.bindFamilyBoard = function(familyRef) {
    if (!familyRef) return;
    const ref = familyRef.child('boardCards');
    const key = boardStorageKey();
    const idsKey = key + ':shared';
    let previousIds = new Set(readBoardList(idsKey));
    ref.on('value', snapshot => {
      if (familyDbRef !== familyRef) return;
      const value = snapshot.val();
      const remote = Array.isArray(value) ? value.filter(Boolean) : [];
      const currentIds = new Set(remote.map(card => card.id));
      const localOnly = readBoardList(key).filter(card => card && !previousIds.has(card.id) && !currentIds.has(card.id));
      previousIds = currentIds;
      localStorage.setItem(idsKey, JSON.stringify([...currentIds]));
      localStorage.setItem(key, JSON.stringify([...localOnly, ...remote]));
      if (document.body.dataset.tab === 'board') renderBoard();
    });
    firebaseListeners.push(ref);
  };

  function timeAgo(ts) {
    var diff = Date.now() - ts;
    var mins = Math.floor(diff / 60000);
    if (mins < 1) return t('práve teraz','just now');
    if (mins < 60) return mins + ' ' + (mins === 1 ? t('minútou','min ago') : t('minútami','mins ago'));
    var hours = Math.floor(mins / 60);
    if (hours < 24) return hours + ' ' + (hours === 1 ? t('hodinou','hour ago') : t('hodinami','hours ago'));
    var days = Math.floor(hours / 24);
    return days + ' ' + (days === 1 ? t('dňom','day ago') : t('dňami','days ago'));
  }

  if (familyDbRef) window.bindFamilyBoard(familyDbRef);

  // Close board card dropdowns on outside click
  document.addEventListener('click', function _closeBoardMenu(e) {
    if (!e.target.closest('.board-card-menu,.board-card-dropdown')) {
      document.querySelectorAll('.board-card-dropdown').forEach(function(d) { d.style.display = 'none'; });
    }
  });
})();
