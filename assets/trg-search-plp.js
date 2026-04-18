/* TRG Unified PLP/Search Controller — v2 2026-04-12
   Merged from main-collection.liquid (ES6) + trg-search-plp.js (ES5).
   Loaded on collection + search pages via theme.liquid. */
(function () {
  if (window.__trg_search_plp_ready) return;
  window.__trg_search_plp_ready = true;

  var FILTER_STORAGE_KEY = 'trg_filters_open';
  var WISHLIST_STORAGE_KEY = 'trg_plp_saved_products';
  var COLOUR_INTENT_STORAGE_KEY = 'trg_colour_intent';
  var LOCAL_SEARCH_INPUT_DEBOUNCE_MS = 160;
  var LOAD_MORE_MAX_PAGES = 8;
  var LOAD_MORE_MAX_CARDS = 192;
  var CONTROLLER_REGISTRY_KEY = '__trgPlpControllers';
  var COLOUR_INTENT_SLOT_HANDLES = {
    shirt: 'shirts',
    trousers: 'trousers',
    knitwear: 'knitwear',
    jacket: 'jackets',
    coat: 'outerwear',
    shoes: 'footwear'
  };

  function normalizeText(value) {
    return (value || '').toString().trim().toLowerCase();
  }

  function escapeHtml(value) {
    return (value || '')
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function readColourIntent() {
    try {
      var parsed = JSON.parse(window.localStorage.getItem(COLOUR_INTENT_STORAGE_KEY) || 'null');
      if (!parsed || typeof parsed !== 'object') return null;
      if (!Array.isArray(parsed.slots)) parsed.slots = [];
      return parsed;
    } catch (_) {
      return null;
    }
  }

  function resolveColourIntentSlot(intent, collectionHandle) {
    if (!intent) return null;
    var safeHandle = normalizeText(collectionHandle);
    if (safeHandle) {
      var matchedSlot = null;
      intent.slots.forEach(function (slot) {
        if (!matchedSlot && normalizeText(slot.handle) === safeHandle) matchedSlot = slot;
      });
      if (matchedSlot) return matchedSlot;
      var matchedGarment = null;
      Object.keys(COLOUR_INTENT_SLOT_HANDLES).forEach(function (key) {
        if (COLOUR_INTENT_SLOT_HANDLES[key] === safeHandle) matchedGarment = key;
      });
      if (matchedGarment) {
        var garmentSlot = null;
        intent.slots.forEach(function (slot) {
          if (!garmentSlot && normalizeText(slot.slot) === matchedGarment) garmentSlot = slot;
        });
        return garmentSlot || null;
      }
    }
    return intent.anchor || intent.slots[0] || null;
  }

  /* ── Constructor ── */

  function TrgPlpController(root) {
    this.root = root;
    this.syncTimeout = null;
    this.searchInputTimeout = null;
    this.cardSearchIndex = new WeakMap();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
  }

  /* ── Lifecycle ── */

  TrgPlpController.prototype.connect = function () {
    if (this.root.dataset.trgPlpReady === 'true') return;

    this.root.dataset.trgPlpReady = 'true';
    this.installHistoryHooks();
    this.restoreFilterState();

    document.addEventListener('click', this.handleClick);
    document.addEventListener('change', this.handleChange);
    document.addEventListener('input', this.handleInput);
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('trg:url-changed', this.handleUrlChange);
    document.addEventListener('shopify:section:load', this.handleUrlChange);

    this.normalizeBrandBanner();
    this.syncSortSelect();
    this.syncDesktopFilterToggle();
    this.renderActiveTags();
    this.applyFilters();
    this.syncColourIntentBanner();
    this.syncWishlistState();
    this.updateBackToTop();
  };

  TrgPlpController.prototype.disconnect = function () {
    if (this.root.dataset.trgPlpReady !== 'true') return;

    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('change', this.handleChange);
    document.removeEventListener('input', this.handleInput);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('trg:url-changed', this.handleUrlChange);
    document.removeEventListener('shopify:section:load', this.handleUrlChange);

    window.clearTimeout(this.syncTimeout);
    window.clearTimeout(this.searchInputTimeout);
    this.root.dataset.trgPlpReady = 'false';
  };

  /* ── History hooks ── */

  TrgPlpController.prototype.installHistoryHooks = function () {
    if (window.__trgPlpHistoryPatched) return;
    window.__trgPlpHistoryPatched = true;

    /* Phase 8: dispatch both TRG and Dwell filter events */
    var dispatch = function () {
      window.dispatchEvent(new Event('trg:url-changed'));
      try {
        document.dispatchEvent(new CustomEvent('filter:update', { bubbles: true }));
      } catch (_) {}
    };

    ['pushState', 'replaceState'].forEach(function (method) {
      var original = history[method];
      history[method] = function patchedHistoryState() {
        var result = original.apply(this, arguments);
        dispatch();
        return result;
      };
    });

    window.addEventListener('popstate', dispatch);
  };

  /* ── Filter state ── */

  TrgPlpController.prototype.restoreFilterState = function () {
    var storedState = window.localStorage.getItem(FILTER_STORAGE_KEY);
    document.body.classList.toggle('filters-hidden', storedState === '0');
    this.syncDesktopFilterToggle();
  };

  /* ── Event handlers ── */

  TrgPlpController.prototype.handleUrlChange = function () {
    this.scheduleSync();
  };

  TrgPlpController.prototype.handleInput = function (event) {
    if (this.root.dataset.trgLocalSearch === 'false') return;
    if (event.target instanceof HTMLInputElement && event.target.matches('[data-trg-search-input]')) {
      this.scheduleApplyFilters();
    }
  };

  TrgPlpController.prototype.handleChange = function (event) {
    var target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('[data-trg-plp-sort]')) {
      var sortValue = target.value;
      var nextUrl = new URL(window.location.href);
      nextUrl.searchParams.delete('page');
      if (sortValue) {
        nextUrl.searchParams.set('sort_by', sortValue);
      } else {
        nextUrl.searchParams.delete('sort_by');
      }
      window.location.assign(nextUrl.toString());
      return;
    }

    if (
      target.matches(
        '.facets input, .facets select, .sorting-filter input, .sorting-filter select, .price-facet input'
      )
    ) {
      this.scheduleSync();
    }
  };

  TrgPlpController.prototype.handleClick = function (event) {
    var target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    var clearColourIntent = target.closest('[data-trg-colour-intent-clear]');
    if (clearColourIntent instanceof HTMLButtonElement) {
      event.preventDefault();
      window.localStorage.removeItem(COLOUR_INTENT_STORAGE_KEY);
      this.syncColourIntentBanner();
      return;
    }

    var filterToggle = target.closest('[data-trg-plp-filter-toggle]');
    if (filterToggle) {
      event.preventDefault();
      if (window.matchMedia('(max-width: 989px)').matches) {
        var dialog = document.querySelector('dialog-component#filters-drawer');
        if (dialog && typeof dialog.showDialog === 'function') {
          dialog.showDialog();
        } else {
          var fallback = document.querySelector('.facets-toggle__button');
          if (fallback) fallback.click();
        }
        return;
      }
      var shouldHide = !document.body.classList.contains('filters-hidden');
      document.body.classList.toggle('filters-hidden', shouldHide);
      window.localStorage.setItem(FILTER_STORAGE_KEY, shouldHide ? '0' : '1');
      this.syncDesktopFilterToggle();
      return;
    }

    var mobileFilterButton = target.closest('[data-trg-plp-mobile-filter-button]');
    if (mobileFilterButton) {
      event.preventDefault();
      var mDialog = document.querySelector('dialog-component#filters-drawer');
      if (mDialog && typeof mDialog.showDialog === 'function') {
        mDialog.showDialog();
      } else {
        var mFallback = document.querySelector('.facets-toggle__button');
        if (mFallback) mFallback.click();
      }
      return;
    }

    var searchPill = target.closest('[data-trg-search-pill]');
    if (searchPill instanceof HTMLElement) {
      event.preventDefault();
      var searchInput = document.querySelector('[data-trg-search-input]');
      if (searchInput instanceof HTMLInputElement) {
        searchInput.value = searchPill.dataset.trgSearchPill || '';
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        searchInput.focus();
      }
      return;
    }

    var activeTag = target.closest('[data-trg-active-tag]');
    if (activeTag instanceof HTMLElement) {
      event.preventDefault();
      this.removeActiveTag(activeTag.dataset);
      return;
    }

    var toggleFilter = target.closest('[data-trg-toggle]');
    if (toggleFilter instanceof HTMLButtonElement) {
      event.preventDefault();
      var isPressed = toggleFilter.getAttribute('aria-pressed') === 'true';
      toggleFilter.setAttribute('aria-pressed', String(!isPressed));
      this.renderActiveTags();
      this.applyFilters();
      return;
    }

    var loadMoreButton = target.closest('[data-trg-load-more-btn]');
    if (loadMoreButton instanceof HTMLAnchorElement) {
      event.preventDefault();
      this.loadMore(loadMoreButton);
      return;
    }

    var wishlistButton = target.closest('[data-trg-wishlist]');
    if (wishlistButton instanceof HTMLButtonElement) {
      event.preventDefault();
      this.toggleWishlist(wishlistButton);
      return;
    }

    var colourSwatch = target.closest('.trg-plp-card-colour');
    if (colourSwatch instanceof HTMLButtonElement) {
      event.preventDefault();
      this.handleColourSwatchClick(colourSwatch);
      return;
    }

    var backToTop = target.closest('[data-trg-back-to-top]');
    if (backToTop instanceof HTMLButtonElement) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /* ── Brand banner normalization (collection pages) ── */

  TrgPlpController.prototype.normalizeBrandBanner = function () {
    var mainColumn = this.root.querySelector('.trg-plp-main-column');
    if (!(mainColumn instanceof HTMLElement)) return;

    var currentBanner = mainColumn.querySelector('.trg-bch');
    if (currentBanner instanceof HTMLElement) {
      currentBanner.classList.add('trg-bch--inline');
    }

    var externalBanner = null;
    var allBanners = document.querySelectorAll('.trg-bch');
    for (var i = 0; i < allBanners.length; i++) {
      if (!mainColumn.contains(allBanners[i])) {
        externalBanner = allBanners[i];
        break;
      }
    }
    if (!(externalBanner instanceof HTMLElement)) return;

    var externalSection = externalBanner.closest('.trg-bch-section, [id^="shopify-section-"]');
    var controls = mainColumn.querySelector('.trg-collection-controls');

    var preserveStyles = function () {
      if (!(externalSection instanceof HTMLElement)) return;
      externalSection.querySelectorAll('link[rel="stylesheet"], style').forEach(function (node) {
        if (!(node instanceof HTMLElement)) return;
        if (node.tagName === 'LINK') {
          var href = node.getAttribute('href');
          if (!href) return;
          var already = false;
          document.querySelectorAll('link[rel="stylesheet"]').forEach(function (existing) {
            if (existing !== node && existing.getAttribute('href') === href) already = true;
          });
          if (!already) document.head.appendChild(node.cloneNode(true));
          return;
        }
        var cssText = (node.textContent || '').trim();
        if (!cssText) return;
        var alreadyStyle = false;
        document.querySelectorAll('style').forEach(function (existing) {
          if (existing !== node && (existing.textContent || '').trim() === cssText) alreadyStyle = true;
        });
        if (!alreadyStyle) document.head.appendChild(node.cloneNode(true));
      });
    };

    if (!(currentBanner instanceof HTMLElement)) {
      preserveStyles();
      externalBanner.classList.add('trg-bch--inline');
      if (controls instanceof HTMLElement) {
        mainColumn.insertBefore(externalBanner, controls);
      } else {
        mainColumn.insertBefore(externalBanner, mainColumn.firstChild);
      }
    } else {
      preserveStyles();
      if (externalSection instanceof HTMLElement) {
        externalSection.style.display = 'none';
      externalSection.setAttribute('aria-hidden', 'true');
      externalSection.setAttribute('data-skip-subtree-update', '');
      externalSection.setAttribute('data-skip-node-update', '');
      }
      return;
    }

    if (externalSection instanceof HTMLElement) {
      externalSection.style.display = 'none';
      externalSection.setAttribute('aria-hidden', 'true');
      externalSection.setAttribute('data-skip-subtree-update', '');
      externalSection.setAttribute('data-skip-node-update', '');
    }
  };

  /* ── Colour swatch click ── */

  TrgPlpController.prototype.handleColourSwatchClick = function (button) {
    var li = button.closest('.product-grid__item');
    if (!li) return;
    var imageUrl = (button.dataset.trgColourImage || '').trim();
    var pdpUrl = (button.dataset.trgColourUrl || '').trim();

    li.querySelectorAll('.trg-plp-card-colour').forEach(function (b) {
      b.classList.remove('is-active');
    });
    button.classList.add('is-active');

    if (imageUrl) {
      var img = li.querySelector('.card-gallery img');
      if (img) {
        var base = imageUrl.replace(/\?.*$/, '');
        var srcset = [200, 300, 400, 500, 600, 700, 800].map(function (w) {
          return base + '?width=' + w + ' ' + w + 'w';
        }).join(', ');
        img.srcset = srcset;
        img.src = base + '?width=600';
        img.removeAttribute('loading');
      }
    }

    if (pdpUrl) {
      var clickDiv = li.querySelector('[onclick*="location.href"]');
      if (clickDiv) {
        clickDiv.setAttribute('onclick', "location.href='" + pdpUrl.replace(/'/g, "\\'") + "'");
        clickDiv.dataset.url = pdpUrl;
      }
      li.querySelectorAll('a[href*="/products/"]').forEach(function (a) {
        a.href = pdpUrl;
      });
    }
  };

  /* ── Scheduling ── */

  TrgPlpController.prototype.scheduleSync = function () {
    var self = this;
    window.clearTimeout(this.syncTimeout);
    this.syncTimeout = window.setTimeout(function () {
      self.normalizeBrandBanner();
      self.syncSortSelect();
      self.syncDesktopFilterToggle();
      self.renderActiveTags();
      self.applyFilters();
    }, 200);
  };

  TrgPlpController.prototype.scheduleApplyFilters = function () {
    var self = this;
    window.clearTimeout(this.searchInputTimeout);
    this.searchInputTimeout = window.setTimeout(function () {
      self.applyFilters();
    }, LOCAL_SEARCH_INPUT_DEBOUNCE_MS);
  };

  /* ── Sort select sync ── */

  TrgPlpController.prototype.syncSortSelect = function () {
    var sortSelect = this.root.querySelector('[data-trg-plp-sort]');
    if (!(sortSelect instanceof HTMLSelectElement)) return;

    var sourceSelect = null;
    var allSorts = document.querySelectorAll('select[name="sort_by"]');
    for (var i = 0; i < allSorts.length; i++) {
      if (!allSorts[i].disabled) { sourceSelect = allSorts[i]; break; }
    }
    if (!sourceSelect) sourceSelect = document.querySelector('select[name="sort_by"]');
    if (!(sourceSelect instanceof HTMLSelectElement)) return;

    var signature = Array.from(sourceSelect.options)
      .map(function (option) {
        return option.value + ':' + (option.textContent || '').trim();
      })
      .join('|');

    if (sortSelect.dataset.sourceSignature !== signature) {
      while (sortSelect.firstChild) sortSelect.removeChild(sortSelect.firstChild);
      Array.from(sourceSelect.options).forEach(function (option) {
        sortSelect.appendChild(new Option((option.textContent || '').trim(), option.value, option.selected, option.selected));
      });
      sortSelect.dataset.sourceSignature = signature;
    }

    sortSelect.value = new URL(window.location.href).searchParams.get('sort_by') || sourceSelect.value;
  };

  /* ── Desktop filter toggle ── */

  TrgPlpController.prototype.syncDesktopFilterToggle = function () {
    var isMobile = window.matchMedia('(max-width: 989px)').matches;
    var shouldShow = isMobile || document.body.classList.contains('filters-hidden');

    this.root.querySelectorAll('.trg-plp-show-filters-btn').forEach(function (button) {
      if (!(button instanceof HTMLButtonElement)) return;
      button.hidden = !shouldShow;
      if (shouldShow) {
        button.removeAttribute('aria-hidden');
      } else {
        button.setAttribute('aria-hidden', 'true');
      }
      button.setAttribute('aria-label', isMobile ? 'Filters' : 'Show filters');
    });
  };

  /* ── Card search ── */

  TrgPlpController.prototype.getSearchCards = function () {
    return Array.from(this.root.querySelectorAll('[data-trg-search-item]'));
  };

  TrgPlpController.prototype.getCardSearchText = function (card) {
    if (!(card instanceof HTMLElement)) return '';
    if (this.cardSearchIndex.has(card)) return this.cardSearchIndex.get(card);
    var normalized = normalizeText(card.getAttribute('data-trg-search-text'));
    this.cardSearchIndex.set(card, normalized);
    return normalized;
  };

  /* ── Numeric helpers ── */

  TrgPlpController.prototype.parsePositiveNumber = function (value, fallback) {
    var parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  };

  TrgPlpController.prototype.getLoadMoreLimits = function (loadMoreZone) {
    var pageFromUrl = new URL(window.location.href).searchParams.get('page');
    var currentPage = this.parsePositiveNumber(
      (loadMoreZone && loadMoreZone.dataset.currentPage) || pageFromUrl || '1', 1
    );
    var visibleCount = this.parsePositiveNumber(
      (loadMoreZone && loadMoreZone.dataset.visibleCount) || this.getSearchCards().length || 0, 0
    );
    var pageSize = this.parsePositiveNumber((loadMoreZone && loadMoreZone.dataset.pageSize) || 24, 24);
    var maxPages = this.parsePositiveNumber(
      this.root.dataset.trgMaxAppendedPages || LOAD_MORE_MAX_PAGES, LOAD_MORE_MAX_PAGES
    );
    var maxCards = this.parsePositiveNumber(
      this.root.dataset.trgMaxAppendedCards || pageSize * maxPages || LOAD_MORE_MAX_CARDS, LOAD_MORE_MAX_CARDS
    );
    return { currentPage: currentPage, visibleCount: visibleCount, maxPages: maxPages, maxCards: maxCards };
  };

  TrgPlpController.prototype.getExistingParentKeys = function (grid) {
    var seen = new Set();
    if (!(grid instanceof HTMLElement)) return seen;
    grid.querySelectorAll('.product-grid__item').forEach(function (card) {
      if (!(card instanceof HTMLElement)) return;
      var mode = (card.dataset.trgPlpDisplayMode || '').trim();
      var parentKey = (card.dataset.trgSourceParentId || '').trim();
      if (mode === 'parent_card' && parentKey) seen.add(parentKey);
    });
    return seen;
  };

  /* ── Toggle filters ── */

  TrgPlpController.prototype.getActiveToggles = function () {
    var active = new Set();
    document.querySelectorAll('[data-trg-toggle]').forEach(function (button) {
      if (!(button instanceof HTMLButtonElement)) return;
      if (button.getAttribute('aria-pressed') === 'true' && button.dataset.trgToggle) {
        active.add(button.dataset.trgToggle);
      }
    });
    return active;
  };

  TrgPlpController.prototype.getToggleLabel = function (toggleName) {
    var label = document.querySelector('[data-trg-toggle="' + toggleName + '"] .trg-plp-toggle-label');
    return label ? (label.textContent || '').trim() : '';
  };

  TrgPlpController.prototype.matchesToggleFilters = function (card, activeToggles) {
    if (activeToggles.size === 0) return true;
    if (activeToggles.has('ships-ca') && card.dataset.trgShipsCa !== 'true') return false;
    if (activeToggles.has('on-sale') && card.dataset.trgOnSale !== 'true') return false;
    if (activeToggles.has('new-arrivals') && card.dataset.trgNewArrivals !== 'true') return false;
    return true;
  };

  /* ── Visible state ── */

  TrgPlpController.prototype.updateVisibleState = function (visibleCount) {
    this.root.dataset.trgVisibleCount = String(visibleCount);
    var grid = this.root.querySelector('.product-grid');
    if (grid instanceof HTMLElement) grid.dataset.trgVisibleCount = String(visibleCount);

    this.root.querySelectorAll('.products-count-wrapper span').forEach(function (node) {
      if (!(node instanceof HTMLElement)) return;
      node.textContent = visibleCount + ' item' + (visibleCount === 1 ? '' : 's');
    });

    var sparseNote = this.root.querySelector('[data-trg-sparse-note]');
    if (sparseNote instanceof HTMLElement) sparseNote.hidden = visibleCount === 0 || visibleCount >= 4;

    var localEmpty = this.root.querySelector('[data-trg-search-empty]');
    if (localEmpty instanceof HTMLElement) localEmpty.hidden = visibleCount !== 0;
  };

  /* ── Apply filters ── */

  TrgPlpController.prototype.applyFilters = function () {
    var searchInput = document.querySelector('[data-trg-search-input]');
    var query =
      this.root.dataset.trgLocalSearch === 'false'
        ? ''
        : normalizeText(searchInput instanceof HTMLInputElement ? searchInput.value : '');
    var cards = this.getSearchCards();
    var activeToggles = this.getActiveToggles();
    var visibleCount = 0;

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var cardText = this.getCardSearchText(card);
      var matchesQuery = query === '' || cardText.indexOf(query) !== -1;
      var matches = matchesQuery && this.matchesToggleFilters(card, activeToggles);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    }

    this.updateVisibleState(visibleCount);
    this.syncColourIntentBanner(visibleCount);
  };

  /* ── Colour intent banner ── */

  TrgPlpController.prototype.syncColourIntentBanner = function (visibleCount) {
    var mainColumn = this.root.querySelector('.trg-plp-main-column');
    if (!(mainColumn instanceof HTMLElement)) return;

    var banner = mainColumn.querySelector('.trg-colour-intent-banner');
    if (banner) banner.remove();
    return;
  };

  /* ── Input label resolution ── */

  TrgPlpController.prototype.resolveInputLabel = function (input) {
    if (input instanceof HTMLInputElement && input.dataset.label) return input.dataset.label;
    if (!(input instanceof HTMLInputElement)) return '';
    if (input.id) {
      var parentLabel = document.querySelector('label[for="' + input.id + '"]');
      var textTarget = parentLabel
        ? (parentLabel.querySelector('.checkbox__label-text, .facets__pill-label, .facets__swatch-label') || parentLabel)
        : null;
      return textTarget ? (textTarget.textContent || '').trim() : '';
    }
    return '';
  };

  /* ── Active tags ── */

  TrgPlpController.prototype.renderActiveTags = function () {
    var containers = document.querySelectorAll('[data-trg-active-tags]');
    if (!containers.length) return;

    var chips = [];
    var self = this;
    document
      .querySelectorAll('.facets--vertical input[type="checkbox"]:checked, .facets--vertical input[type="radio"]:checked')
      .forEach(function (input) {
        var label = self.resolveInputLabel(input);
        if (!label) return;
        chips.push({ kind: 'input', label: label, name: input.name, value: input.value });
      });

    var minPriceInput = document.querySelector('input[name="filter.v.price.gte"]');
    var maxPriceInput = document.querySelector('input[name="filter.v.price.lte"]');
    if (minPriceInput instanceof HTMLInputElement && minPriceInput.value.trim() !== '') {
      chips.push({ kind: 'price-min', label: 'Min $' + minPriceInput.value.trim() });
    }
    if (maxPriceInput instanceof HTMLInputElement && maxPriceInput.value.trim() !== '') {
      chips.push({ kind: 'price-max', label: 'Max $' + maxPriceInput.value.trim() });
    }

    self.getActiveToggles().forEach(function (toggle) {
      var label = self.getToggleLabel(toggle);
      if (!label) return;
      chips.push({ kind: 'toggle', label: label, toggle: toggle });
    });

    var html = chips
      .map(function (chip) {
        var attrs = Object.keys(chip)
          .map(function (key) {
            return 'data-' + (key === 'kind' ? 'kind' : key) + '="' + escapeHtml(chip[key]) + '"';
          })
          .join(' ');
        return (
          '<button type="button" class="button-unstyled trg-search-bar__active-tag" data-trg-active-tag ' +
          attrs + '>' + escapeHtml(chip.label) + '<span>\u2715</span></button>'
        );
      })
      .join('');
    containers.forEach(function (container) { container.innerHTML = html; });
  };

  /* ── Remove active tag ── */

  TrgPlpController.prototype.removeActiveTag = function (data) {
    var kind = data.kind || '';
    if (kind === 'toggle') {
      var toggleName = data.toggle || '';
      var toggleButton = document.querySelector('[data-trg-toggle="' + toggleName + '"]');
      if (toggleButton instanceof HTMLButtonElement) {
        toggleButton.setAttribute('aria-pressed', 'false');
        this.renderActiveTags();
        this.applyFilters();
      }
      return;
    }

    if (kind === 'price-min' || kind === 'price-max') {
      var selector = kind === 'price-min' ? 'input[name="filter.v.price.gte"]' : 'input[name="filter.v.price.lte"]';
      var priceInput = document.querySelector(selector);
      if (priceInput instanceof HTMLInputElement) {
        priceInput.value = '';
        priceInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
      return;
    }

    var name = data.name || '';
    var value = data.value || '';
    if (!name) return;

    var matchingInput = null;
    var allInputs = document.querySelectorAll('input');
    for (var i = 0; i < allInputs.length; i++) {
      var inp = allInputs[i];
      if (inp instanceof HTMLInputElement && inp.name === name && inp.value === value) {
        matchingInput = inp;
        break;
      }
    }

    if (matchingInput instanceof HTMLInputElement) {
      matchingInput.checked = false;
      matchingInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  /* ── Load more ── */

  TrgPlpController.prototype.loadMore = async function (button) {
    if (button.dataset.loading === 'true') return;

    var nextUrl = button.href;
    if (!nextUrl) return;

    var loadMoreZone = this.root.querySelector('[data-trg-load-more-zone]');
    var limits = this.getLoadMoreLimits(loadMoreZone);
    var reachedPageLimit = Number.isFinite(limits.maxPages) && limits.currentPage >= limits.maxPages;
    var reachedCardLimit = Number.isFinite(limits.maxCards) && limits.visibleCount >= limits.maxCards;
    if (reachedPageLimit || reachedCardLimit) {
      window.location.assign(nextUrl);
      return;
    }

    button.dataset.loading = 'true';
    button.setAttribute('aria-busy', 'true');
    var originalLabel = button.textContent;
    button.textContent = 'Loading...';

    try {
      var response = await fetch(nextUrl, { credentials: 'same-origin' });
      if (!response.ok) return;

      var html = await response.text();
      var nextDocument = new DOMParser().parseFromString(html, 'text/html');
      var nextItems = nextDocument.querySelectorAll('#ResultsList .product-grid__item');
      var grid = this.root.querySelector('.product-grid');
      if (!(grid instanceof HTMLElement)) return;

      var seenParentKeys = this.getExistingParentKeys(grid);
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < nextItems.length; i++) {
        var item = nextItems[i];
        if (!(item instanceof HTMLElement)) continue;
        var mode = (item.dataset.trgPlpDisplayMode || '').trim();
        var parentKey = (item.dataset.trgSourceParentId || '').trim();
        if (mode === 'parent_card' && parentKey) {
          if (seenParentKeys.has(parentKey)) continue;
          seenParentKeys.add(parentKey);
        }
        fragment.appendChild(item.cloneNode(true));
      }

      if (fragment.childNodes.length > 0) {
        grid.setAttribute('data-skip-subtree-update', '');
        grid.appendChild(fragment);
      }

      /* Disable Dwell paginated-list observer to prevent duplicate appends */
      var paginatedList = grid.closest('paginated-list');
      if (paginatedList instanceof HTMLElement) {
        paginatedList.setAttribute('data-trg-load-more-active', 'true');
      }

      /* Phase 5: preserve container element for Dwell morph compatibility */
      var nextZone = nextDocument.querySelector('[data-trg-load-more-zone]');
      var currentZone = this.root.querySelector('[data-trg-load-more-zone]');
      if (nextZone && currentZone) {
        currentZone.setAttribute('data-skip-subtree-update', '');
        currentZone.innerHTML = nextZone.innerHTML;
        for (var ai = 0; ai < nextZone.attributes.length; ai++) {
          var attr = nextZone.attributes[ai];
          if (attr.name.indexOf('data-') === 0) currentZone.setAttribute(attr.name, attr.value);
        }
      }

      var pushedUrl = new URL(nextUrl, window.location.href);
      history.replaceState({}, '', pushedUrl.pathname + pushedUrl.search + pushedUrl.hash);
      try {
        document.dispatchEvent(new CustomEvent('filter:update', { bubbles: true }));
        window.dispatchEvent(new Event('trg:url-changed'));
      } catch (_) {}
      this.syncWishlistState();
      this.scheduleSync();
    } catch (error) {
      console.error('Failed to load more products.', error);
    } finally {
      if (button.isConnected) {
        button.textContent = originalLabel || 'Load more';
      }
      button.dataset.loading = 'false';
      button.removeAttribute('aria-busy');
    }
  };

  /* ── Wishlist ── */

  TrgPlpController.prototype.getWishlistIds = function () {
    try {
      return JSON.parse(window.localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
    } catch (_) {
      return [];
    }
  };

  TrgPlpController.prototype.syncWishlistState = function () {
    var savedIds = new Set(this.getWishlistIds().map(String));
    document.querySelectorAll('[data-trg-wishlist]').forEach(function (button) {
      if (!(button instanceof HTMLButtonElement)) return;
      var productId = button.dataset.productId || '';
      var isSaved = savedIds.has(productId);
      button.classList.toggle('saved', isSaved);
      button.setAttribute('aria-pressed', String(isSaved));
    });
  };

  TrgPlpController.prototype.toggleWishlist = function (button) {
    var productId = button.dataset.productId;
    if (!productId) return;

    var savedIds = new Set(this.getWishlistIds().map(String));
    if (savedIds.has(productId)) {
      savedIds.delete(productId);
    } else {
      savedIds.add(productId);
    }

    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(Array.from(savedIds)));
    this.syncWishlistState();
  };

  /* ── Back to top ── */

  TrgPlpController.prototype.updateBackToTop = function () {
    var button = document.querySelector('[data-trg-back-to-top]');
    if (!(button instanceof HTMLButtonElement)) return;
    button.classList.toggle('visible', window.scrollY > window.innerHeight * 1.5);
  };

  TrgPlpController.prototype.handleScroll = function () {
    this.updateBackToTop();
  };

  /* ── Initialization ── */

  function initializeTrgPlp() {
    var existingControllers = window[CONTROLLER_REGISTRY_KEY];
    if (existingControllers instanceof Set) {
      existingControllers.forEach(function (controller) {
        controller.disconnect();
      });
      existingControllers.clear();
    }

    var nextControllers = existingControllers instanceof Set ? existingControllers : new Set();
    document.querySelectorAll('.trg-plp-body, .trg-search-plp').forEach(function (root) {
      if (root.dataset.trgPlpReady === 'true') return;
      var controller = new TrgPlpController(root);
      controller.connect();
      nextControllers.add(controller);
    });
    window[CONTROLLER_REGISTRY_KEY] = nextControllers;
  }

  document.addEventListener('DOMContentLoaded', initializeTrgPlp, { once: true });
  document.addEventListener('shopify:section:load', initializeTrgPlp);
})();
