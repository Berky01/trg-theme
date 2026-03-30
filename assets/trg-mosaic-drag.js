(function () {
  /* Loaded only in editor via {% if request.design_mode %} */

  /* ── Styles ── */
  var css = document.createElement('style');
  css.textContent = [
    /* Drag overlay — sits on top of the card */
    '.trg-drag-overlay{',
    '  position:fixed;z-index:2147483647;cursor:crosshair;',
    '  background:rgba(26,26,24,.08);',
    '  border:2px dashed rgba(255,255,255,.4);',
    '  box-sizing:border-box;',
    '  transition:opacity .15s;',
    '}',
    '.trg-drag-overlay::after{',
    '  content:"Drag to reposition";',
    '  position:absolute;top:8px;left:50%;transform:translateX(-50%);',
    '  background:rgba(26,26,24,.85);color:#f5f1eb;',
    '  font-family:"DM Sans",sans-serif;font-size:.65rem;',
    '  padding:3px 10px;border-radius:3px;white-space:nowrap;',
    '  pointer-events:none;letter-spacing:.03em;',
    '}',
    '.trg-drag-overlay.trg-dragging{',
    '  cursor:grabbing;background:rgba(26,26,24,.03);',
    '  border-color:rgba(196,86,42,.6);',
    '}',
    '.trg-drag-overlay.trg-dragging::after{content:"" ;display:none;}',
    /* Toast on card */
    '.trg-drag-toast{',
    '  position:absolute;bottom:8px;right:8px;z-index:20;',
    '  background:rgba(26,26,24,.9);color:#f5f1eb;',
    '  font-family:"DM Sans",sans-serif;font-size:.68rem;',
    '  padding:5px 9px;border-radius:4px;pointer-events:none;',
    '  animation:trg-fi .15s ease;',
    '}',
    '@keyframes trg-fi{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}',
    /* Crosshair on card */
    '.trg-mosaic-drag__crosshair{',
    '  position:absolute;width:22px;height:22px;border-radius:50%;',
    '  border:2px solid #fff;',
    '  box-shadow:0 0 0 1px rgba(0,0,0,.5),inset 0 0 0 1px rgba(0,0,0,.2);',
    '  transform:translate(-50%,-50%);pointer-events:none;z-index:10;',
    '}',
    '.trg-mosaic-drag__crosshair::before,.trg-mosaic-drag__crosshair::after{',
    '  content:"";position:absolute;background:rgba(255,255,255,.9);',
    '  left:50%;top:50%;transform:translate(-50%,-50%);',
    '}',
    '.trg-mosaic-drag__crosshair::before{width:1px;height:10px;}',
    '.trg-mosaic-drag__crosshair::after{width:10px;height:1px;}'
  ].join('\n');
  document.head.appendChild(css);

  /* ── State ── */
  var activeCard = null;
  var overlay = null;
  var dragging = false;
  var rafId = null;

  /* ── Storage ── */
  function save(id, x, y) {
    try { localStorage.setItem('trg-mf-' + id, JSON.stringify({ x: x, y: y })); } catch (e) {}
  }
  function load(id) {
    try { var r = localStorage.getItem('trg-mf-' + id); return r ? JSON.parse(r) : null; } catch (e) { return null; }
  }

  /* ── Card helpers ── */
  function applyFocal(card, x, y) {
    card.style.setProperty('--card-focal-x', x + '%');
    card.style.setProperty('--card-focal-y', y + '%');
    var ch = card.querySelector('.trg-mosaic-drag__crosshair');
    if (ch) { ch.style.left = x + '%'; ch.style.top = y + '%'; }
  }

  function getFocal(card) {
    return {
      x: Math.round(parseFloat(card.style.getPropertyValue('--card-focal-x')) || 50),
      y: Math.round(parseFloat(card.style.getPropertyValue('--card-focal-y')) || 50)
    };
  }

  function showToast(card, x, y) {
    var old = card.querySelector('.trg-drag-toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className = 'trg-drag-toast';
    t.textContent = 'X: ' + x + '  Y: ' + y + '  — set sliders to lock in';
    card.appendChild(t);
    setTimeout(function () { if (t.parentNode) t.remove(); }, 3000);
  }

  /* ── Overlay: positioned on top of the card ── */
  function positionOverlay() {
    if (!overlay || !activeCard) return;
    var r = activeCard.getBoundingClientRect();
    overlay.style.top = r.top + 'px';
    overlay.style.left = r.left + 'px';
    overlay.style.width = r.width + 'px';
    overlay.style.height = r.height + 'px';
  }

  function trackPosition() {
    positionOverlay();
    rafId = requestAnimationFrame(trackPosition);
  }

  function createOverlay(card) {
    removeOverlay();
    activeCard = card;
    overlay = document.createElement('div');
    overlay.className = 'trg-drag-overlay';
    document.body.appendChild(overlay);
    positionOverlay();
    rafId = requestAnimationFrame(trackPosition);

    /* ── Drag events on overlay ── */
    overlay.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      dragging = true;
      overlay.classList.add('trg-dragging');
      updateFocalFromMouse(e);
    });

    overlay.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      e.preventDefault();
      e.stopPropagation();
      updateFocalFromMouse(e);
    });

    overlay.addEventListener('mouseup', function (e) {
      if (!dragging) return;
      e.stopPropagation();
      dragging = false;
      overlay.classList.remove('trg-dragging');
      var f = getFocal(activeCard);
      var bid = activeCard.dataset.blockId;
      if (bid) save(bid, f.x, f.y);
      showToast(activeCard, f.x, f.y);
    });

    /* Also handle mouse leaving the overlay while dragging */
    document.addEventListener('mousemove', docMove);
    document.addEventListener('mouseup', docUp);
  }

  function docMove(e) {
    if (!dragging || !activeCard) return;
    updateFocalFromMouse(e);
  }

  function docUp() {
    if (!dragging || !activeCard) return;
    dragging = false;
    if (overlay) overlay.classList.remove('trg-dragging');
    var f = getFocal(activeCard);
    var bid = activeCard.dataset.blockId;
    if (bid) save(bid, f.x, f.y);
    showToast(activeCard, f.x, f.y);
  }

  function updateFocalFromMouse(e) {
    if (!activeCard) return;
    var r = activeCard.getBoundingClientRect();
    var x = Math.round(Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100)));
    var y = Math.round(Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100)));
    applyFocal(activeCard, x, y);
  }

  function removeOverlay() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    if (overlay) { overlay.remove(); overlay = null; }
    document.removeEventListener('mousemove', docMove);
    document.removeEventListener('mouseup', docUp);
    dragging = false;
    activeCard = null;
  }

  /* ── Per-card init ── */
  function initCard(card) {
    if (card.dataset.dragInit) return;
    card.dataset.dragInit = '1';

    var bid = card.dataset.blockId;
    var saved = bid ? load(bid) : null;
    if (saved) applyFocal(card, saved.x, saved.y);

    var ch = document.createElement('div');
    ch.className = 'trg-mosaic-drag__crosshair';
    var f = getFocal(card);
    ch.style.left = f.x + '%';
    ch.style.top = f.y + '%';
    card.appendChild(ch);
  }

  function initAll() {
    document.querySelectorAll('.trg-mosaic__item[data-block-id]').forEach(initCard);
  }

  /* ── Shopify editor events ── */
  document.addEventListener('shopify:block:select', function (e) {
    var bid = e.detail ? e.detail.blockId : null;
    if (!bid) return;
    var card = document.querySelector('.trg-mosaic__item[data-block-id="' + bid + '"]');
    if (card) {
      initCard(card);
      createOverlay(card);
    }
  });

  document.addEventListener('shopify:block:deselect', function () {
    removeOverlay();
  });

  document.addEventListener('shopify:section:unload', function () {
    removeOverlay();
  });

  document.addEventListener('shopify:section:load', function () {
    removeOverlay();
    initAll();
  });

  /* ── Boot ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
