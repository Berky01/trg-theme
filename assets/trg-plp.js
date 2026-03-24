// TRG PLP DOM Controller — current split-layout repair
// CSS is in trg-plp.css. This file normalizes stale storefront DOM paths.
(function () {
  if (window.__trg_plp_ready) return;
  window.__trg_plp_ready = true;

  ['trg-pcf', 'trg-pcf-v2', 'trg-plp-card-fix-css', 'trg-plp-master', 'trg-plp-v7', 'trg-plp-v8'].forEach(
    function (id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    }
  );

  function syncSort(controls) {
    if (!(controls instanceof HTMLElement)) return;

    var legacySort = controls.querySelector(':scope > sorting-filter-component.sorting-filter');
    var sortShell = controls.querySelector(':scope > .trg-plp-sort-shell');
    var sortSelect = sortShell ? sortShell.querySelector('[data-trg-plp-sort]') : null;
    var sourceSelect = legacySort
      ? legacySort.querySelector('select[name="sort_by"]')
      : controls.querySelector('select[name="sort_by"]');

    if (!(sortSelect instanceof HTMLSelectElement)) {
      if (!(sourceSelect instanceof HTMLSelectElement)) return;

      sortShell = document.createElement('div');
      sortShell.className = 'trg-plp-sort-shell';

      var label = document.createElement('label');
      label.className = 'visually-hidden';
      label.setAttribute('for', 'TrgPlpSortLegacyBridge');
      label.textContent = 'Sort';

      sortSelect = document.createElement('select');
      sortSelect.id = 'TrgPlpSortLegacyBridge';
      sortSelect.className = 'trg-plp-sort-select';
      sortSelect.setAttribute('data-trg-plp-sort', '');
      sortSelect.setAttribute('aria-label', 'Sort');

      sortShell.appendChild(label);
      sortShell.appendChild(sortSelect);
      controls.appendChild(sortShell);
    }

    if (sourceSelect instanceof HTMLSelectElement) {
      var signature = Array.from(sourceSelect.options)
        .map(function (option) {
          return option.value + ':' + (option.textContent || '').trim();
        })
        .join('|');

      if (sortSelect.dataset.sourceSignature !== signature) {
        sortSelect.innerHTML = '';
        Array.from(sourceSelect.options).forEach(function (option) {
          sortSelect.appendChild(new Option((option.textContent || '').trim(), option.value, option.selected, option.selected));
        });
        sortSelect.dataset.sourceSignature = signature;
      }

      sortSelect.value = new URL(window.location.href).searchParams.get('sort_by') || sourceSelect.value;
    }

    if (legacySort instanceof HTMLElement) {
      legacySort.style.display = 'none';
      legacySort.hidden = true;
      legacySort.setAttribute('aria-hidden', 'true');
    }
  }

  function repairToolbar(cw) {
    var main = cw.querySelector(':scope > .trg-plp-main-column');
    if (!(main instanceof HTMLElement)) return;

    var controls = main.querySelector(':scope > .trg-collection-controls');
    if (!(controls instanceof HTMLElement)) return;

    Array.from(controls.children).forEach(function (child) {
      if (!(child instanceof HTMLElement)) return;
      if (child.matches('style[data-shopify], .main-collection-grid')) {
        main.insertBefore(child, controls.nextSibling);
      }
    });

    var showButton = controls.querySelector(':scope > .trg-plp-show-filters-btn');
    if (showButton instanceof HTMLButtonElement) {
      showButton.hidden = !document.body.classList.contains('filters-hidden');
      showButton.setAttribute('aria-hidden', String(showButton.hidden));
    }

    controls.querySelectorAll('.facets--filters-title, .trg-collection-controls__active-filters, .facets-remove').forEach(
      function (node) {
        node.remove();
      }
    );

    syncSort(controls);
  }

  function fix() {
    var cw = document.querySelector('.trg-plp-body .collection-wrapper');
    if (!cw) return;

    var facetsToggle = cw.querySelector(':scope > .facets-toggle');
    if (facetsToggle) facetsToggle.remove();

    var dialog = cw.querySelector(':scope > dialog-component');
    if (dialog) dialog.style.cssText = 'display:none!important';

    repairToolbar(cw);
  }

  fix();
  [50, 200, 600, 1500, 3000].forEach(function (ms) {
    setTimeout(fix, ms);
  });

  var cw = document.querySelector('.trg-plp-body .collection-wrapper');
  if (cw) {
    new MutationObserver(function () {
      fix();
    }).observe(cw, { childList: true, subtree: true });
  }

  document.addEventListener('shopify:section:load', function () {
    setTimeout(fix, 100);
  });
  document.addEventListener(
    'click',
    function (event) {
      if (event.target instanceof Element && event.target.closest('[data-trg-plp-filter-toggle]')) {
        setTimeout(fix, 0);
        setTimeout(fix, 100);
      }
    },
    true
  );
})();

// TRG PLP Currency Fix — rewrite price display for non-USD products
(function(){
  var SYMBOLS = {
    USD:'$', CAD:'CA$', GBP:'£', EUR:'€', JPY:'¥',
    KRW:'₩', AUD:'A$', SEK:'kr ', DKK:'kr ', NOK:'kr ',
    CHF:'CHF ', INR:'₹', COP:'COP '
  };
  var NO_DECIMALS = {JPY:1, KRW:1};

  function fixCardPrices(root){
    var brands = (root||document).querySelectorAll('.trg-plp-card-brand[data-trg-currency]');
    for(var i=0;i<brands.length;i++){
      var b = brands[i];
      var cur = (b.getAttribute('data-trg-currency')||'USD').toUpperCase();
      if(cur==='USD' || b.hasAttribute('data-trg-cfixed')) continue;

      var priceCents = parseInt(b.getAttribute('data-trg-price')||'0',10);
      if(!priceCents) continue;

      var card = b.closest('.group-block-content') || b.parentElement;
      if(!card) continue;
      var priceEl = card.querySelector('product-price .price, .price');
      if(!priceEl) continue;

      var sym = SYMBOLS[cur] || (cur+' ');
      var amount = priceCents / 100;
      var formatted;
      if(NO_DECIMALS[cur]){
        formatted = sym + Math.round(amount).toLocaleString();
      } else {
        var dec = amount % 1;
        formatted = dec > 0.001
          ? sym + amount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})
          : sym + Math.round(amount).toLocaleString();
      }
      if(cur!=='USD'){
        formatted += ' <span style="font-size:0.75em;font-weight:400;color:#8a8478;letter-spacing:0.02em;">'+cur+'</span>';
      }
      priceEl.innerHTML = formatted;
      b.setAttribute('data-trg-cfixed','1');
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){fixCardPrices();});
  } else {
    fixCardPrices();
  }

  var obs = new MutationObserver(function(muts){
    for(var m=0;m<muts.length;m++){
      if(muts[m].addedNodes.length>0) { fixCardPrices(); return; }
    }
  });
  var target = document.querySelector('.product-grid, .main-collection-grid, .trg-card-grid, #SearchResultsProductGrid');
  if(target) obs.observe(target, {childList:true, subtree:true});

  document.addEventListener('shopify:section:load', function(){ setTimeout(fixCardPrices, 200); });
})();
