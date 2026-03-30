(function () {
  /* Script only loaded when request.design_mode is true (Liquid gate) */

  /* ── Styles ── */
  var css = document.createElement('style');
  css.textContent = [
    '.trg-focal-panel{',
    '  position:fixed;bottom:16px;left:16px;z-index:999999;',
    '  width:220px;background:#1a1a18;color:#f5f1eb;border-radius:8px;',
    '  font-family:"DM Sans",sans-serif;font-size:.72rem;',
    '  box-shadow:0 4px 24px rgba(0,0,0,.4);padding:12px 14px;',
    '  display:none;',
    '}',
    '.trg-focal-panel__head{',
    '  display:flex;justify-content:space-between;align-items:center;',
    '  margin-bottom:10px;',
    '}',
    '.trg-focal-panel__title{font-weight:600;font-size:.78rem;}',
    '.trg-focal-panel__close{',
    '  background:none;border:none;color:#8a8478;font-size:1rem;',
    '  cursor:pointer;padding:0 2px;line-height:1;',
    '}',
    '.trg-focal-panel__preview{',
    '  position:relative;width:100%;aspect-ratio:16/10;border-radius:4px;',
    '  overflow:hidden;cursor:crosshair;margin-bottom:10px;',
    '  background:#2a2a28;',
    '}',
    '.trg-focal-panel__preview-img{',
    '  width:100%;height:100%;object-fit:cover;pointer-events:none;',
    '}',
    '.trg-focal-panel__dot{',
    '  position:absolute;width:16px;height:16px;border-radius:50%;',
    '  border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.5);',
    '  transform:translate(-50%,-50%);pointer-events:none;z-index:2;',
    '}',
    '.trg-focal-panel__dot::before,.trg-focal-panel__dot::after{',
    '  content:"";position:absolute;background:rgba(255,255,255,.8);',
    '  left:50%;top:50%;transform:translate(-50%,-50%);',
    '}',
    '.trg-focal-panel__dot::before{width:1px;height:8px;}',
    '.trg-focal-panel__dot::after{width:8px;height:1px;}',
    '.trg-focal-panel__row{',
    '  display:flex;align-items:center;gap:6px;margin-bottom:6px;',
    '}',
    '.trg-focal-panel__row label{width:34px;color:#8a8478;font-size:.68rem;text-transform:uppercase;letter-spacing:.06em;}',
    '.trg-focal-panel__row input[type=range]{flex:1;height:3px;accent-color:#c4562a;}',
    '.trg-focal-panel__row .trg-fp-val{width:28px;text-align:right;font-variant-numeric:tabular-nums;}',
    '.trg-focal-panel__hint{',
    '  margin-top:8px;color:#8a8478;font-size:.62rem;text-align:center;',
    '  border-top:1px solid #2a2a28;padding-top:8px;',
    '}',
    /* Crosshair on actual card */
    '.trg-mosaic-drag__crosshair{',
    '  position:absolute;width:22px;height:22px;border-radius:50%;',
    '  border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.5),inset 0 0 0 1px rgba(0,0,0,.2);',
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
  var panel = null;

  /* ── Helpers ── */
  function storageKey(id) { return 'trg-mosaic-focal-' + id; }

  function save(blockId, x, y, zoom) {
    try { localStorage.setItem(storageKey(blockId), JSON.stringify({ x: x, y: y, zoom: zoom })); } catch (e) {}
  }

  function load(blockId) {
    try {
      var raw = localStorage.getItem(storageKey(blockId));
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function applyToCard(card, x, y, zoom) {
    card.style.setProperty('--card-focal-x', x + '%');
    card.style.setProperty('--card-focal-y', y + '%');
    if (zoom !== undefined) {
      card.style.setProperty('--card-zoom', (zoom / 100));
    }
    var ch = card.querySelector('.trg-mosaic-drag__crosshair');
    if (ch) { ch.style.left = x + '%'; ch.style.top = y + '%'; }
  }

  function getFocal(card) {
    var x = parseFloat(card.style.getPropertyValue('--card-focal-x')) || 50;
    var y = parseFloat(card.style.getPropertyValue('--card-focal-y')) || 50;
    var z = parseFloat(card.style.getPropertyValue('--card-zoom'));
    return { x: x, y: y, zoom: Math.round((isNaN(z) ? 1 : z) * 100) };
  }

  /* ── Build panel once ── */
  function getPanel() {
    if (panel) return panel;
    var el = document.createElement('div');
    el.className = 'trg-focal-panel';
    el.innerHTML = [
      '<div class="trg-focal-panel__head">',
      '  <span class="trg-focal-panel__title">Focal Point</span>',
      '  <button class="trg-focal-panel__close" data-action="close">&times;</button>',
      '</div>',
      '<div class="trg-focal-panel__preview">',
      '  <img class="trg-focal-panel__preview-img" src="" alt="">',
      '  <div class="trg-focal-panel__dot"></div>',
      '</div>',
      '<div class="trg-focal-panel__row"><label>X</label><input type="range" data-axis="x" min="0" max="100" value="50" step="1"><span class="trg-fp-val" data-val="x">50</span></div>',
      '<div class="trg-focal-panel__row"><label>Y</label><input type="range" data-axis="y" min="0" max="100" value="50" step="1"><span class="trg-fp-val" data-val="y">50</span></div>',
      '<div class="trg-focal-panel__row"><label>Zoom</label><input type="range" data-axis="zoom" min="100" max="200" value="100" step="5"><span class="trg-fp-val" data-val="zoom">100</span></div>',
      '<div class="trg-focal-panel__hint">Copy values to block sliders to persist</div>'
    ].join('');
    document.body.appendChild(el);
    panel = el;

    /* Slider input events */
    el.addEventListener('input', function (e) {
      if (!e.target.dataset.axis || !activeCard) return;
      var axis = e.target.dataset.axis;
      var val = parseInt(e.target.value, 10);
      el.querySelector('[data-val="' + axis + '"]').textContent = val;
      var f = getFocal(activeCard);
      if (axis === 'x') f.x = val;
      if (axis === 'y') f.y = val;
      if (axis === 'zoom') f.zoom = val;
      applyToCard(activeCard, f.x, f.y, f.zoom);
      updateDot(f.x, f.y);
      updatePreviewPos(f.x, f.y, f.zoom);
      var bid = activeCard.dataset.blockId;
      if (bid) save(bid, f.x, f.y, f.zoom);
    });

    /* Close button */
    el.querySelector('[data-action="close"]').addEventListener('click', function () {
      hidePanel();
    });

    /* Drag on preview thumbnail */
    var preview = el.querySelector('.trg-focal-panel__preview');
    var dragging = false;

    function previewDrag(e) {
      var rect = preview.getBoundingClientRect();
      var x = Math.round(Math.max(0, Math.min(100, (e.clientX - rect.left) / rect.width * 100)));
      var y = Math.round(Math.max(0, Math.min(100, (e.clientY - rect.top) / rect.height * 100)));
      setSliders(x, y);
      var f = getFocal(activeCard);
      applyToCard(activeCard, x, y, f.zoom);
      updateDot(x, y);
      updatePreviewPos(x, y, f.zoom);
      var bid = activeCard.dataset.blockId;
      if (bid) save(bid, x, y, f.zoom);
    }

    preview.addEventListener('mousedown', function (e) {
      if (e.button !== 0 || !activeCard) return;
      e.preventDefault();
      dragging = true;
      previewDrag(e);
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      previewDrag(e);
    });
    document.addEventListener('mouseup', function () {
      dragging = false;
    });

    return el;
  }

  function setSliders(x, y) {
    if (!panel) return;
    var sx = panel.querySelector('[data-axis="x"]');
    var sy = panel.querySelector('[data-axis="y"]');
    if (sx) { sx.value = x; }
    if (sy) { sy.value = y; }
    var vx = panel.querySelector('[data-val="x"]');
    var vy = panel.querySelector('[data-val="y"]');
    if (vx) vx.textContent = x;
    if (vy) vy.textContent = y;
  }

  function updateDot(x, y) {
    if (!panel) return;
    var dot = panel.querySelector('.trg-focal-panel__dot');
    if (dot) { dot.style.left = x + '%'; dot.style.top = y + '%'; }
  }

  function updatePreviewPos(x, y, zoom) {
    if (!panel) return;
    var img = panel.querySelector('.trg-focal-panel__preview-img');
    if (img) {
      img.style.objectPosition = x + '% ' + y + '%';
      img.style.transform = 'scale(' + (zoom / 100) + ')';
      img.style.transformOrigin = x + '% ' + y + '%';
    }
  }

  /* ── Show / hide ── */
  function showPanel(card) {
    activeCard = card;
    var p = getPanel();
    var f = getFocal(card);

    /* Set preview image from card background */
    var bgImg = card.style.backgroundImage;
    var match = bgImg && bgImg.match(/url\(['"]?([^'")\s]+)['"]?\)/);
    var img = p.querySelector('.trg-focal-panel__preview-img');
    if (match && img) {
      img.src = match[1];
      img.style.objectPosition = f.x + '% ' + f.y + '%';
    }

    /* Sync sliders */
    setSliders(f.x, f.y);
    var sz = p.querySelector('[data-axis="zoom"]');
    var vz = p.querySelector('[data-val="zoom"]');
    if (sz) sz.value = f.zoom;
    if (vz) vz.textContent = f.zoom;

    updateDot(f.x, f.y);
    updatePreviewPos(f.x, f.y, f.zoom);
    p.style.display = 'block';
  }

  function hidePanel() {
    if (panel) panel.style.display = 'none';
    activeCard = null;
  }

  /* ── Per-card init (crosshair + localStorage restore) ── */
  function initCard(card) {
    if (card.dataset.dragInit) return;
    card.dataset.dragInit = '1';

    var blockId = card.dataset.blockId;
    var saved = blockId ? load(blockId) : null;
    if (saved) applyToCard(card, saved.x, saved.y, saved.zoom);

    /* Crosshair on the actual card */
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
    /* Find the card matching the selected block */
    var blockId = e.detail ? e.detail.blockId : null;
    if (!blockId) return;
    var card = document.querySelector('.trg-mosaic__item[data-block-id="' + blockId + '"]');
    if (card) {
      initCard(card);
      showPanel(card);
    }
  });

  document.addEventListener('shopify:block:deselect', function () {
    hidePanel();
  });

  document.addEventListener('shopify:section:load', function () {
    hidePanel();
    initAll();
  });

  /* ── Boot ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
