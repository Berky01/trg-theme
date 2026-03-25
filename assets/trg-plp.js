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
      var isMobile = window.matchMedia('(max-width: 989px)').matches;
      var shouldShow = isMobile || document.body.classList.contains('filters-hidden');
      showButton.hidden = !shouldShow;
      if (shouldShow) {
        showButton.removeAttribute('aria-hidden');
      } else {
        showButton.setAttribute('aria-hidden', 'true');
      }
      showButton.setAttribute('aria-label', isMobile ? 'Filters' : 'Show filters');
    }

    controls.querySelectorAll('.facets--filters-title, .trg-collection-controls__active-filters, .facets-remove').forEach(
      function (node) {
        node.remove();
      }
    );

    syncSort(controls);
  }

  function repairSidebar(cw) {
    var sidebar = cw.querySelector(':scope > .trg-plp-sidebar-column .facets--vertical');
    if (!(sidebar instanceof HTMLElement)) {
      sidebar = cw.querySelector(':scope > .facets-block-wrapper--vertical .facets--vertical');
    }
    if (!(sidebar instanceof HTMLElement)) return;

    var availabilityItem = sidebar.querySelector(".facets__item[data-filter-param-name='filter-v-availability']");
    if (!(availabilityItem instanceof HTMLElement)) return;

    var hasActiveAvailability = !!availabilityItem.querySelector('input:checked');
    availabilityItem.style.display = hasActiveAvailability ? '' : 'none';
  }

  function fix() {
    var cw = document.querySelector('.trg-plp-body .collection-wrapper');
    if (!cw) return;

    var isMobile = window.matchMedia('(max-width: 989px)').matches;

    var facetsToggle = cw.querySelector(':scope > .facets-toggle');
    if (facetsToggle && !isMobile) facetsToggle.remove();

    var dialog = cw.querySelector(':scope > dialog-component');
    if (dialog instanceof HTMLElement) {
      dialog.style.removeProperty('display');
    }

    repairToolbar(cw);
    repairSidebar(cw);
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
