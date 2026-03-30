(function () {
  if (!Shopify || !Shopify.designMode) return;

  /* ── Editor-only styles ── */
  const style = document.createElement('style');
  style.textContent = `
    .trg-mosaic__item[data-block-id] { cursor: grab; user-select: none; }
    .trg-mosaic__item[data-block-id].trg-dragging { cursor: grabbing; }

    .trg-mosaic-drag__crosshair {
      position: absolute;
      width: 22px; height: 22px;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(0,0,0,0.2);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 10;
    }
    .trg-mosaic-drag__crosshair::before,
    .trg-mosaic-drag__crosshair::after {
      content: '';
      position: absolute;
      background: rgba(255,255,255,0.9);
      left: 50%; top: 50%;
      transform: translate(-50%, -50%);
    }
    .trg-mosaic-drag__crosshair::before { width: 1px; height: 10px; }
    .trg-mosaic-drag__crosshair::after  { width: 10px; height: 1px; }

    .trg-mosaic-drag__toast {
      position: absolute;
      bottom: 8px; right: 8px;
      background: rgba(26,26,24,0.9);
      color: #f5f1eb;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.68rem;
      line-height: 1.5;
      padding: 5px 9px;
      border-radius: 4px;
      z-index: 20;
      pointer-events: none;
      animation: trg-drag-fadein 0.15s ease;
    }
    @keyframes trg-drag-fadein {
      from { opacity: 0; transform: translateY(3px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

  /* ── State ── */
  let activeCard  = null;   // card currently being dragged
  let hoveredCard = null;   // card under cursor right now

  /* ── Helpers ── */
  function applyFocal(card, x, y) {
    card.style.setProperty('--card-focal-x', x + '%');
    card.style.setProperty('--card-focal-y', y + '%');
    const ch = card.querySelector('.trg-mosaic-drag__crosshair');
    if (ch) { ch.style.left = x + '%'; ch.style.top = y + '%'; }
  }

  function getFocal(card) {
    return {
      x: parseFloat(card.style.getPropertyValue('--card-focal-x')) || 50,
      y: parseFloat(card.style.getPropertyValue('--card-focal-y')) || 50
    };
  }

  function storageKey(id) { return 'trg-mosaic-focal-' + id; }

  function save(blockId, x, y) {
    try { localStorage.setItem(storageKey(blockId), JSON.stringify({ x, y })); } catch (e) {}
  }

  function load(blockId) {
    try {
      const raw = localStorage.getItem(storageKey(blockId));
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function showToast(card, x, y) {
    const old = card.querySelector('.trg-mosaic-drag__toast');
    if (old) old.remove();
    const toast = document.createElement('div');
    toast.className = 'trg-mosaic-drag__toast';
    toast.textContent = 'X: ' + x + ' · Y: ' + y + ' — saved';
    card.appendChild(toast);
    setTimeout(function () { if (toast.parentNode) toast.remove(); }, 2500);
  }

  function finishDrag() {
    if (!activeCard) return;
    const card = activeCard;
    activeCard = null;
    card.classList.remove('trg-dragging');
    const { x, y } = getFocal(card);
    const blockId = card.dataset.blockId;
    if (blockId) save(blockId, x, y);
    showToast(card, x, y);
  }

  /* ── Per-card init ── */
  function initCard(card) {
    if (card.dataset.dragInit) return;
    card.dataset.dragInit = '1';

    const blockId = card.dataset.blockId;
    const saved = blockId ? load(blockId) : null;
    if (saved) applyFocal(card, saved.x, saved.y);

    const ch = document.createElement('div');
    ch.className = 'trg-mosaic-drag__crosshair';
    const { x, y } = getFocal(card);
    ch.style.left = x + '%';
    ch.style.top = y + '%';
    card.appendChild(ch);
  }

  /* ── Global tracking — no mousedown needed ── */

  // Track which card the cursor is over
  document.addEventListener('mouseover', function (e) {
    hoveredCard = e.target.closest('.trg-mosaic__item[data-block-id]') || null;
  });

  document.addEventListener('mousemove', function (e) {
    // Left button not held — end any drag in progress
    if (e.buttons !== 1) {
      if (activeCard) finishDrag();
      return;
    }

    // Button held but no active drag yet — start one from hovered card
    if (!activeCard) {
      if (!hoveredCard) return;
      activeCard = hoveredCard;
      activeCard.classList.add('trg-dragging');
    }

    // Update focal point
    const rect = activeCard.getBoundingClientRect();
    const x = Math.round(Math.max(0, Math.min(100, (e.clientX - rect.left)  / rect.width  * 100)));
    const y = Math.round(Math.max(0, Math.min(100, (e.clientY - rect.top)   / rect.height * 100)));
    applyFocal(activeCard, x, y);
  });

  // Belt-and-suspenders: also finish on mouseup
  document.addEventListener('mouseup', function () {
    if (activeCard) finishDrag();
  });

  /* ── Init on load + editor re-renders ── */
  function initAll() {
    document.querySelectorAll('.trg-mosaic__item[data-block-id]').forEach(initCard);
  }

  document.addEventListener('DOMContentLoaded', initAll);
  document.addEventListener('shopify:section:load', initAll);
  document.addEventListener('shopify:block:select', initAll);
})();
