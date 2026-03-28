/* TRG Palette Filter v1 — "Suits me" toggle for PLPs/PDPs */
(function() {
  'use strict';

  var PROFILES = null;
  var profileKey = null;
  var profileData = null;
  var productData = null; // JSON island: handle → {color, fa}
  var toggleOn = false;
  var profilesUrl = null;

  // ── Read profile ────────────────────────────────────────────
  function readProfileKey() {
    var metaEl = document.querySelector('[data-trg-meta-colour_profile]');
    if (metaEl) return metaEl.getAttribute('data-trg-meta-colour_profile');
    return localStorage.getItem('trg_colour_profile');
  }

  // ── Load profiles JSON ──────────────────────────────────────
  function loadProfiles(cb) {
    if (PROFILES) return cb(PROFILES);
    if (!profilesUrl) return cb(null);
    fetch(profilesUrl)
      .then(function(r) { return r.json(); })
      .then(function(data) { PROFILES = data; cb(data); })
      .catch(function() { cb(null); });
  }

  // ── Read product data from JSON island ──────────────────────
  function readProductData() {
    var el = document.getElementById('trg-palette-data');
    if (!el) return null;
    try { return JSON.parse(el.textContent); } catch(e) { return null; }
  }

  // ── Extract product handle from a card's link ───────────────
  function getHandleFromCard(card) {
    var link = card.querySelector('a[href*="/products/"]');
    if (!link) return null;
    var match = link.getAttribute('href').match(/\/products\/([^?#/]+)/);
    return match ? match[1] : null;
  }

  // ── Classify a colour against a profile ─────────────────────
  function classifyColour(colour, profile) {
    if (!colour || !profile) return null;
    if (profile.core.indexOf(colour) !== -1) return 'match';
    if (profile.best.indexOf(colour) !== -1) return 'match';
    if (profile.caution.indexOf(colour) !== -1) return 'caution';
    return null;
  }

  // ── Apply badges to product cards ───────────────────────────
  function applyBadges() {
    if (!profileData || !toggleOn || !productData) { clearBadges(); return; }
    // Find all product cards — Dwell theme uses .product-card or li with product links
    var cards = document.querySelectorAll('.product-card, .card-wrapper, [class*="product-card"], li[class*="grid__item"]');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      // Remove existing badge first
      var existing = card.querySelector('.trg-palette-badge');
      if (existing) existing.remove();

      var handle = getHandleFromCard(card);
      if (!handle || !productData[handle]) continue;
      var pd = productData[handle];
      if (!pd.fa || !pd.color) continue; // Not face-adjacent or no colour data

      var cls = classifyColour(pd.color, profileData);
      if (!cls) continue;

      var badge = document.createElement('span');
      badge.className = 'trg-palette-badge trg-palette-badge--' + cls;
      badge.title = cls === 'match' ? 'Suits your palette' : 'Approach with care';

      // Position inside the image area
      var imgWrap = card.querySelector('[class*="gallery"], [class*="media"], [class*="image"]');
      if (imgWrap) {
        imgWrap.style.position = 'relative';
        imgWrap.appendChild(badge);
      } else {
        card.style.position = 'relative';
        card.appendChild(badge);
      }
    }
  }

  function clearBadges() {
    var badges = document.querySelectorAll('.trg-palette-badge');
    for (var i = 0; i < badges.length; i++) badges[i].remove();
  }

  // ── Toggle handler ──────────────────────────────────────────
  function onToggle() {
    toggleOn = !toggleOn;
    var sw = document.getElementById('trg-palette-switch');
    if (sw) sw.classList.toggle('active', toggleOn);
    applyBadges();
  }

  // ── Inject toggle into sidebar ──────────────────────────────
  function injectToggle() {
    // Find the toggle area in the Dwell sidebar
    var toggleArea = document.querySelector('.trg-plp-toggle-filters');
    if (!toggleArea) return;

    var option = document.createElement('div');
    option.className = 'trg-plp-toggle-option trg-palette-toggle';
    option.id = 'trg-palette-toggle';
    option.innerHTML =
      '<span class="trg-plp-toggle-label">' +
        '<span class="trg-palette-dot" style="background:' + (profileData.swatch || 'var(--accent)') + '"></span>' +
        'Suits me' +
      '</span>' +
      '<div class="trg-palette-switch" id="trg-palette-switch"></div>';

    toggleArea.appendChild(option);
    option.addEventListener('click', onToggle);
  }

  // ── PDP indicator ───────────────────────────────────────────
  function initPDP() {
    var el = document.getElementById('trg-palette-pdp');
    if (!el) return;
    var colour = el.getAttribute('data-color');
    if (!colour || !profileData) return;
    var cls = classifyColour(colour, profileData);
    if (!cls) return;
    if (cls === 'match') {
      el.innerHTML = '<span class="trg-palette-pdp__dot" style="background:' + (profileData.swatch || 'var(--accent)') + '"></span>'
        + '<span class="trg-palette-pdp__text">This colour suits your <strong>' + profileData.archetype + '</strong> palette</span>';
    } else {
      el.innerHTML = '<span class="trg-palette-pdp__dot trg-palette-pdp__dot--caution"></span>'
        + '<span class="trg-palette-pdp__text">This colour sits outside your core range. Works best further from the face.</span>';
    }
    el.style.display = '';
  }

  // ── MutationObserver for morphdom/infinite scroll ───────────
  function observeGrid() {
    var grid = document.querySelector('.collection-product-list, .product-grid, .main-collection-grid, [class*="product-grid"]');
    if (!grid) return;
    var debounce = null;
    var observer = new MutationObserver(function() {
      if (!toggleOn) return;
      clearTimeout(debounce);
      debounce = setTimeout(applyBadges, 100);
    });
    observer.observe(grid, { childList: true, subtree: true });
  }

  // ── Init ────────────────────────────────────────────────────
  function init() {
    var script = document.querySelector('script[data-palette-profiles]');
    profilesUrl = script ? script.getAttribute('data-palette-profiles') : null;

    profileKey = readProfileKey();
    if (!profileKey) return;

    productData = readProductData();

    loadProfiles(function(data) {
      if (!data || !data[profileKey]) return;
      profileData = data[profileKey];

      // PLP: inject toggle into sidebar
      if (productData) {
        injectToggle();
        observeGrid();
      }

      // PDP: palette indicator
      initPDP();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
