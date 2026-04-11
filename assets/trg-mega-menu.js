/* Legacy surface hotfix carrier for stale public HTML.
   The desktop cache still references this asset, so use it to repair
   cookie consent and 404 surfaces while storefront HTML catches up.
*/
(() => {
  if (window.__trgLegacySurfaceHotfixes) return;
  window.__trgLegacySurfaceHotfixes = true;

  function injectStyle(id, css) {
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }

  function fixCookieBanner() {
    const banner = document.getElementById('trg-cc-banner');
    if (!banner) return;

    const text = (banner.textContent || '').replace(/s+/g, ' ').trim();
    const needsRewrite = /similar technologies/i.test(text) || text.indexOf('Only necessary') === -1 || text.indexOf('Accept all') === -1;
    if (!needsRewrite) return;

    injectStyle('trg-cc-legacy-hotfix-style', [
      '#trg-cc-banner{position:fixed;right:max(18px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom));left:auto;z-index:9999;width:min(420px,calc(100vw - 36px));background:rgba(26,26,24,0.94);color:var(--paper,#f5f1eb);border:1px solid rgba(245,241,235,0.12);border-radius:10px;padding:14px 16px;box-shadow:0 14px 34px rgba(0,0,0,0.28);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}',
      '#trg-cc-banner .trg-cc__inner{display:grid;gap:12px;}',
      '#trg-cc-banner .trg-cc__eyebrow{margin:0 0 4px;color:rgba(245,241,235,0.62);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;}',
      '#trg-cc-banner .trg-cc__text p{font-size:12px;line-height:1.45;margin:0;color:rgba(245,241,235,0.82);}',
      '#trg-cc-banner .trg-cc__text a{color:rgba(245,241,235,0.98);text-decoration:underline;text-underline-offset:2px;}',
      '#trg-cc-banner .trg-cc__actions{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap;}',
      '#trg-cc-banner .trg-cc__btn{font-family:"DM Sans",sans-serif;font-size:11px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;padding:9px 15px;border-radius:999px;cursor:pointer;border:1px solid transparent;white-space:nowrap;}',
      '#trg-cc-banner .trg-cc__btn--accept{background:var(--accent,#c4562a);color:#fff;}',
      '#trg-cc-banner .trg-cc__btn--decline{background:rgba(245,241,235,0.04);color:rgba(245,241,235,0.76);border-color:rgba(245,241,235,0.14);}',
      '@media (max-width: 749px){#trg-cc-banner{left:max(12px,env(safe-area-inset-left));right:max(12px,env(safe-area-inset-right));bottom:max(12px,env(safe-area-inset-bottom));width:auto;padding:14px;}#trg-cc-banner .trg-cc__actions{width:100%;justify-content:stretch;}#trg-cc-banner .trg-cc__btn{flex:1 1 0;min-height:44px;font-size:11px;padding:11px 13px;}}'
    ].join(''));

    banner.innerHTML = '' +
      '<div class="trg-cc__inner">' +
        '<div class="trg-cc__text">' +
          '<p class="trg-cc__eyebrow">Cookie preferences</p>' +
          '<p>We use cookies to understand site use and improve the experience. <a href="/pages/privacy-policy">Privacy Policy</a>.</p>' +
        '</div>' +
        '<div class="trg-cc__actions">' +
          '<button id="trg-cc-decline" class="trg-cc__btn trg-cc__btn--decline" type="button">Only necessary</button>' +
          '<button id="trg-cc-accept" class="trg-cc__btn trg-cc__btn--accept" type="button">Accept all</button>' +
        '</div>' +
      '</div>';
  }

  function fix404Page() {
    if (document.querySelector('.trg-404-page, .trg-404-runtime')) return;

    const pageText = document.body ? document.body.textContent || '' : '';
    if (pageText.indexOf('Page not found') === -1 || pageText.indexOf('Continue shopping') === -1) return;

    const headings = Array.from(document.querySelectorAll('h1'));
    const title = headings.find((node) => node.textContent && node.textContent.trim() === 'Page not found');
    if (!title) return;

    const host = title.closest('.shopify-section');
    if (!host) return;

    injectStyle('trg-404-legacy-hotfix-style', [
      '.trg-404-runtime-wrap{padding-block:clamp(24px,5vw,56px);border-top:1px solid #ddd8cf;}',
      '.trg-404-runtime{display:grid;gap:20px;}',
      '.trg-404-runtime__main,.trg-404-runtime__aside{border:1px solid #ddd8cf;background:#faf8f4;padding:18px;}',
      '.trg-404-runtime__title{margin:0;font-family:var(--font-heading--family);font-size:clamp(2.1rem,5vw,4rem);font-weight:400;line-height:0.96;letter-spacing:-0.02em;color:#1a1a18;max-width:9ch;}',
      '.trg-404-runtime__lead{margin:16px 0 0;max-width:36rem;color:#332f2a;font-size:0.98rem;line-height:1.7;}',
      '.trg-404-runtime__actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:20px;}',
      '.trg-404-runtime__button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:12px 17px;border:1px solid transparent;border-radius:3px;font-size:12px;font-weight:600;letter-spacing:0.12em;text-decoration:none;text-transform:uppercase;}',
      '.trg-404-runtime__button--primary{background:#1a1a18;border-color:#1a1a18;color:#f5f1eb;}',
      '.trg-404-runtime__button--secondary{background:transparent;border-color:#ddd8cf;color:#1a1a18;}',
      '.trg-404-runtime__search{margin-top:22px;padding-top:16px;border-top:1px solid #ddd8cf;}',
      '.trg-404-runtime__search-label{display:block;margin-bottom:8px;color:#1a1a18;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;}',
      '.trg-404-runtime__search-row{display:grid;gap:10px;}',
      '.trg-404-runtime__search-input{width:100%;min-width:0;border:1px solid #ddd8cf;background:#fff;color:#1a1a18;font:inherit;padding:14px;}',
      '.trg-404-runtime__search-submit{min-height:46px;border:1px solid #ddd8cf;background:#fff;color:#1a1a18;font:inherit;font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;padding:12px 16px;cursor:pointer;}',
      '.trg-404-runtime__aside{display:grid;gap:18px;}',
      '.trg-404-runtime__group h2{margin:0 0 10px;font-family:var(--font-heading--family);font-size:1rem;font-weight:400;color:#1a1a18;}',
      '.trg-404-runtime__group p{margin:0;color:#6f695f;font-size:0.9rem;line-height:1.65;}',
      '.trg-404-runtime__chips{display:flex;flex-wrap:wrap;gap:9px;}',
      '.trg-404-runtime__chip{display:inline-flex;align-items:center;min-height:35px;padding:8px 12px;border:1px solid #ddd8cf;background:#fff;color:#1a1a18;font-size:11px;letter-spacing:0.06em;text-decoration:none;text-transform:uppercase;}',
      '@media screen and (min-width:990px){.trg-404-runtime{grid-template-columns:minmax(0,1.2fr) minmax(320px,0.8fr);align-items:start;}.trg-404-runtime__search-row{grid-template-columns:minmax(0,1fr) auto;}}',
      '@media screen and (max-width:749px){.trg-404-runtime-wrap{padding-block:18px 30px;}.trg-404-runtime__main,.trg-404-runtime__aside{padding:14px;}.trg-404-runtime__lead,.trg-404-runtime__group p{font-size:0.88rem;line-height:1.6;}.trg-404-runtime__actions{flex-direction:column;}.trg-404-runtime__button,.trg-404-runtime__search-submit{width:100%;}}'
    ].join(''));

    host.innerHTML = '' +
      '<div class="section-background color-scheme-1"></div>' +
      '<section class="section section--page-width color-scheme-1 trg-404-runtime-wrap">' +
        '<div class="trg-404-runtime">' +
          '<div class="trg-404-runtime__main">' +
            '<h1 class="trg-404-runtime__title">Page not found</h1>' +
            '<p class="trg-404-runtime__lead">The link may be wrong, expired, or no longer in the directory. Start from a reliable route below.</p>' +
            '<div class="trg-404-runtime__actions">' +
              '<a href="/pages/brands" class="trg-404-runtime__button trg-404-runtime__button--primary">Browse brands</a>' +
              '<a href="/collections/all" class="trg-404-runtime__button trg-404-runtime__button--secondary">Browse live products</a>' +
            '</div>' +
            '<form action="/search" method="get" class="trg-404-runtime__search">' +
              '<label class="trg-404-runtime__search-label" for="Trg404RuntimeSearch">Search instead</label>' +
              '<div class="trg-404-runtime__search-row">' +
                '<input id="Trg404RuntimeSearch" type="search" name="q" value="" placeholder="Brands, styles, categories" class="trg-404-runtime__search-input">' +
                '<input type="hidden" name="options[prefix]" value="last">' +
                '<button type="submit" class="trg-404-runtime__search-submit">Search</button>' +
              '</div>' +
            '</form>' +
          '</div>' +
          '<aside class="trg-404-runtime__aside">' +
            '<section class="trg-404-runtime__group">' +
              '<h2>Common routes</h2>' +
              '<div class="trg-404-runtime__chips">' +
                '<a href="/collections/outerwear" class="trg-404-runtime__chip">Outerwear</a>' +
                '<a href="/collections/casualwear" class="trg-404-runtime__chip">Casualwear</a>' +
                '<a href="/collections/footwear" class="trg-404-runtime__chip">Footwear</a>' +
                '<a href="/collections/knitwear" class="trg-404-runtime__chip">Knitwear</a>' +
                '<a href="/pages/colour-guide" class="trg-404-runtime__chip">Colour guide</a>' +
                '<a href="/blogs/news" class="trg-404-runtime__chip">Journal</a>' +
              '</div>' +
            '</section>' +
            '<section class="trg-404-runtime__group">' +
              '<h2>Need a specific page?</h2>' +
              '<p>If you were looking for a brand page, the brand directory is usually the fastest way back in.</p>' +
            '</section>' +
          '</aside>' +
        '</div>' +
      '</section>';
  }

  function fixHomepageCategoryGrid() {
    var section = document.querySelector('.trg-category-grid-schema');
    if (!section) return;

    var feature = section.querySelector('.trg-catv2-feature');
    var tiles = Array.prototype.slice.call(section.querySelectorAll('.trg-catv2-tile'));
    if (!feature || tiles.length < 7) return;

    var featureName = feature.querySelector('.trg-catv2-feature__name');
    var tileNames = tiles.map(function (tile) {
      return tile.querySelector('.trg-catv2-tile__name');
    });
    var isBroken = feature.getAttribute('href') === '#' &&
      featureName &&
      featureName.textContent &&
      featureName.textContent.trim() === 'Outerwear' &&
      tileNames.every(function (node) {
        return node && node.textContent && node.textContent.trim() === 'Outerwear';
      });

    if (!isBroken) return;

    var categories = [
      { href: '/collections/outerwear', name: 'Outerwear & Jackets', count: 'Catalog building' },
      { href: '/collections/shirts', name: 'Shirts & Tops', count: 'Catalog building' },
      { href: '/collections/bottoms', name: 'Trousers & Bottoms', count: 'Catalog building' },
      { href: '/collections/footwear', name: 'Footwear', count: 'Catalog building' },
      { href: '/collections/knitwear', name: 'Knitwear', count: '1 live product' },
      { href: '/collections/denim', name: 'Denim', count: 'Catalog building' },
      { href: '/collections/tailoring', name: 'Suits & Tailoring', count: 'Catalog building' },
      { href: '/collections/accessories', name: 'Accessories', count: 'Catalog building' }
    ];

    feature.setAttribute('href', categories[0].href);
    var featureCount = feature.querySelector('.trg-catv2-feature__count');
    if (featureName) featureName.textContent = categories[0].name;
    if (featureCount) featureCount.textContent = categories[0].count;

    tiles.slice(0, 7).forEach(function (tile, index) {
      var category = categories[index + 1];
      if (!category) return;
      tile.setAttribute('href', category.href);
      var nameNode = tile.querySelector('.trg-catv2-tile__name');
      var countNode = tile.querySelector('.trg-catv2-tile__count');
      if (nameNode) nameNode.textContent = category.name;
      if (countNode) countNode.textContent = category.count;
    });
  }

  function runLegacySurfaceHotfixes() {
    fixCookieBanner();
    fix404Page();
    fixHomepageCategoryGrid();
  }

  function scheduleLegacySurfaceHotfixes() {
    runLegacySurfaceHotfixes();
    var attempts = 0;
    var timer = window.setInterval(function () {
      attempts += 1;
      runLegacySurfaceHotfixes();
      if (attempts >= 12) window.clearInterval(timer);
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleLegacySurfaceHotfixes, { once: true });
  } else {
    scheduleLegacySurfaceHotfixes();
  }
})();
