(function () {
  if (window.__trg_search_plp_ready) return;
  window.__trg_search_plp_ready = true;

  var FILTER_STORAGE_KEY = 'trg_filters_open';
  var WISHLIST_STORAGE_KEY = 'trg_plp_saved_products';
  var COLOUR_INTENT_STORAGE_KEY = 'trg_colour_intent';
  var LOCAL_SEARCH_INPUT_DEBOUNCE_MS = 160;
  var LOAD_MORE_MAX_PAGES = 8;
  var LOAD_MORE_MAX_CARDS = 192;
  var CONTROLLER_REGISTRY_KEY = '__trgSearchPlpControllers';

  function normalizeText(value) {
    return (value || '').toString().trim().toLowerCase();
  }

  function escapeHtml(value) {
    return (value || '')
      .toString()
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
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

  function TrgSearchPlpController(root) {
    this.root = root;
    this.syncTimeout = null;
    this.searchInputTimeout = null;
    this.cardSearchIndex = new WeakMap();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
  }

  TrgSearchPlpController.prototype.connect = function () {
    if (this.root.dataset.trgPlpReady === 'true') return;

    this.root.dataset.trgPlpReady = 'true';
    this.installHistoryHooks();
    this.restoreFilterState();

    document.addEventListener('click', this.handleClick);
    document.addEventListener('change', this.handleChange, true);
    document.addEventListener('input', this.handleInput, true);
    window.addEventListener('trg:url-changed', this.handleUrlChange);
    document.addEventListener('shopify:section:load', this.handleUrlChange);

    this.syncSortSelect();
    this.syncDesktopFilterToggle();
    this.renderActiveTags();
    this.applyFilters();
    this.syncColourIntentBanner();
    this.syncWishlistState();
  };

  TrgSearchPlpController.prototype.disconnect = function () {
    if (this.root.dataset.trgPlpReady !== 'true') return;

    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('change', this.handleChange, true);
    document.removeEventListener('input', this.handleInput, true);
    window.removeEventListener('trg:url-changed', this.handleUrlChange);
    document.removeEventListener('shopify:section:load', this.handleUrlChange);

    window.clearTimeout(this.syncTimeout);
    window.clearTimeout(this.searchInputTimeout);
    this.root.dataset.trgPlpReady = 'false';
  };

  TrgSearchPlpController.prototype.installHistoryHooks = function () {
    if (window.__trgPlpHistoryPatched) return;

    window.__trgPlpHistoryPatched = true;
    var dispatch = function () {
      window.dispatchEvent(new Event('trg:url-changed'));
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

  TrgSearchPlpController.prototype.restoreFilterState = function () {
    var storedState = window.localStorage.getItem(FILTER_STORAGE_KEY);
    document.body.classList.toggle('filters-hidden', storedState === '0');
    this.syncDesktopFilterToggle();
  };

  TrgSearchPlpController.prototype.handleUrlChange = function () {
    this.scheduleSync();
  };

  TrgSearchPlpController.prototype.handleInput = function (event) {
    if (this.root.dataset.trgLocalSearch === 'false') return;
    if (event.target instanceof HTMLInputElement && event.target.matches('[data-trg-search-input]')) {
      this.scheduleApplyFilters();
    }
  };

  TrgSearchPlpController.prototype.handleChange = function (event) {
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

  TrgSearchPlpController.prototype.handleClick = function (event) {
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
          document.querySelector('.facets-toggle__button')?.click();
        }
        return;
      }

      var shouldHide = !document.body.classList.contains('filters-hidden');
      document.body.classList.toggle('filters-hidden', shouldHide);
      window.localStorage.setItem(FILTER_STORAGE_KEY, shouldHide ? '0' : '1');
      this.syncDesktopFilterToggle();
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
      event.stopPropagation();
      this.toggleWishlist(wishlistButton);
    }
  };

  TrgSearchPlpController.prototype.scheduleSync = function () {
    var self = this;
    window.clearTimeout(this.syncTimeout);
    this.syncTimeout = window.setTimeout(function () {
      self.syncSortSelect();
      self.syncDesktopFilterToggle();
      self.renderActiveTags();
      self.applyFilters();
    }, 90);
  };

  TrgSearchPlpController.prototype.scheduleApplyFilters = function () {
    var self = this;
    window.clearTimeout(this.searchInputTimeout);
    this.searchInputTimeout = window.setTimeout(function () {
      self.applyFilters();
    }, LOCAL_SEARCH_INPUT_DEBOUNCE_MS);
  };

  TrgSearchPlpController.prototype.syncSortSelect = function () {
    var sortSelect = this.root.querySelector('[data-trg-plp-sort]');
    if (!(sortSelect instanceof HTMLSelectElement)) return;

    var sourceSelect =
      Array.from(document.querySelectorAll('select[name="sort_by"]')).find(function (select) {
        return !select.disabled;
      }) || document.querySelector('select[name="sort_by"]');
    if (!(sourceSelect instanceof HTMLSelectElement)) return;

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
  };

  TrgSearchPlpController.prototype.syncDesktopFilterToggle = function () {
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

  TrgSearchPlpController.prototype.getSearchCards = function () {
    return Array.from(this.root.querySelectorAll('[data-trg-search-item]'));
  };

  TrgSearchPlpController.prototype.getCardSearchText = function (card) {
    if (!(card instanceof HTMLElement)) return '';
    if (this.cardSearchIndex.has(card)) return this.cardSearchIndex.get(card);
    var normalized = normalizeText(card.getAttribute('data-trg-search-text'));
    this.cardSearchIndex.set(card, normalized);
    return normalized;
  };

  TrgSearchPlpController.prototype.getLoadMoreLimits = function (loadMoreZone) {
    var currentPage = Number(
      (loadMoreZone && loadMoreZone.dataset.currentPage) || new URL(window.location.href).searchParams.get('page') || '1'
    );
    var visibleCount = Number((loadMoreZone && loadMoreZone.dataset.visibleCount) || this.getSearchCards().length || 0);
    var pageSize = Number((loadMoreZone && loadMoreZone.dataset.pageSize) || 24);
    var maxPages = Number(this.root.dataset.trgMaxAppendedPages || LOAD_MORE_MAX_PAGES);
    var maxCards = Number(this.root.dataset.trgMaxAppendedCards || pageSize * maxPages || LOAD_MORE_MAX_CARDS);

    return {
      currentPage: currentPage,
      visibleCount: visibleCount,
      maxPages: maxPages,
      maxCards: maxCards
    };
  };

  TrgSearchPlpController.prototype.getExistingParentKeys = function (grid) {
    var seen = new Set();
    if (!(grid instanceof HTMLElement)) return seen;

    grid.querySelectorAll('.product-grid__item').forEach(function (card) {
      if (!(card instanceof HTMLElement)) return;
      var mode = (card.dataset.trgPlpDisplayMode || '').trim();
      var parentKey = (card.dataset.trgSourceParentId || '').trim();
      if (mode === 'parent_card' && parentKey) {
        seen.add(parentKey);
      }
    });

    return seen;
  };

  TrgSearchPlpController.prototype.getActiveToggles = function () {
    var active = new Set();
    document.querySelectorAll('[data-trg-toggle]').forEach(function (button) {
      if (!(button instanceof HTMLButtonElement)) return;
      if (button.getAttribute('aria-pressed') === 'true' && button.dataset.trgToggle) {
        active.add(button.dataset.trgToggle);
      }
    });
    return active;
  };

  TrgSearchPlpController.prototype.getToggleLabel = function (toggleName) {
    var label = document.querySelector('[data-trg-toggle="' + toggleName + '"] .trg-plp-toggle-label');
    return label ? (label.textContent || '').trim() : '';
  };

  TrgSearchPlpController.prototype.matchesToggleFilters = function (card, activeToggles) {
    if (activeToggles.size === 0) return true;
    if (activeToggles.has('ships-ca') && card.dataset.trgShipsCa !== 'true') return false;
    if (activeToggles.has('on-sale') && card.dataset.trgOnSale !== 'true') return false;
    if (activeToggles.has('new-arrivals') && card.dataset.trgNewArrivals !== 'true') return false;
    return true;
  };

  TrgSearchPlpController.prototype.updateVisibleState = function (visibleCount) {
    this.root.dataset.trgVisibleCount = String(visibleCount);

    var grid = this.root.querySelector('.product-grid');
    if (grid instanceof HTMLElement) {
      grid.dataset.trgVisibleCount = String(visibleCount);
    }

    this.root.querySelectorAll('.products-count-wrapper span').forEach(function (node) {
      if (!(node instanceof HTMLElement)) return;
      node.textContent = visibleCount + ' item' + (visibleCount === 1 ? '' : 's');
    });

    var sparseNote = this.root.querySelector('[data-trg-sparse-note]');
    if (sparseNote instanceof HTMLElement) {
      sparseNote.hidden = visibleCount === 0 || visibleCount >= 4;
    }

    var localEmpty = this.root.querySelector('[data-trg-search-empty]');
    if (localEmpty instanceof HTMLElement) {
      localEmpty.hidden = visibleCount !== 0;
    }
  };

  TrgSearchPlpController.prototype.applyFilters = function () {
    var searchInput = document.querySelector('[data-trg-search-input]');
    var query =
      this.root.dataset.trgLocalSearch === 'false'
        ? ''
        : normalizeText(searchInput instanceof HTMLInputElement ? searchInput.value : '');
    var cards = this.getSearchCards();
    var activeToggles = this.getActiveToggles();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var cardText = this.getCardSearchText(card);
      var matchesQuery = query === '' || cardText.indexOf(query) !== -1;
      var matches = matchesQuery && this.matchesToggleFilters(card, activeToggles);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    }, this);

    this.updateVisibleState(visibleCount);
    this.syncColourIntentBanner(visibleCount);
  };

  TrgSearchPlpController.prototype.syncColourIntentBanner = function (visibleCount) {
    var mainColumn = this.root.querySelector('.trg-plp-main-column');
    if (!(mainColumn instanceof HTMLElement)) return;

    var intent = readColourIntent();
    var banner = mainColumn.querySelector('.trg-colour-intent-banner');
    if (!intent) {
      banner?.remove();
      return;
    }

    var activeSlot = intent.anchor || intent.slots[0] || null;
    var cards = this.getSearchCards();
    var visibleCards = cards.filter(function (card) {
      return !card.hidden;
    });
    var colourNeedle = normalizeText(activeSlot && activeSlot.color);
    var colourMatchCount = colourNeedle
      ? visibleCards.filter(function (card) {
          return this.getCardSearchText(card).indexOf(colourNeedle) !== -1;
        }, this).length
      : 0;
    var totalVisible = Number.isFinite(visibleCount) ? visibleCount : visibleCards.length;
    var profileLabel = intent.profile_archetype || intent.profile_name || '';
    var title = activeSlot
      ? activeSlot.color + ' ' + (activeSlot.singular || activeSlot.slot)
      : profileLabel
        ? profileLabel + ' profile active'
        : 'Saved colour brief';
    var note = activeSlot
      ? colourMatchCount + ' of ' + totalVisible + ' visible cards mention ' + activeSlot.color + '. This is a text match, not a strict colour filter.'
      : profileLabel
        ? 'Your saved profile is ' + profileLabel + '. Return to the guide to assign colours to garment slots.'
        : 'Return to the guide to set an outfit brief.';
    var query = activeSlot
      ? '?source=search&base_colour=' + encodeURIComponent(activeSlot.color) + '&base_garment=' + encodeURIComponent(activeSlot.slot)
      : '';
    var chips = intent.slots
      .slice(0, 4)
      .map(function (slot) {
        return (
          '<span class="trg-colour-intent-chip">' +
          '<span class="trg-colour-intent-chip__swatch" style="background:' + escapeHtml(slot.hex || '#ddd8cf') + '"></span>' +
          escapeHtml(slot.color) +
          ' ' +
          escapeHtml(slot.singular || slot.slot) +
          '</span>'
        );
      })
      .join('');

    if (!(banner instanceof HTMLElement)) {
      banner = document.createElement('div');
      banner.className = 'trg-colour-intent-banner';
      var controls = mainColumn.querySelector('.trg-collection-controls');
      if (controls instanceof HTMLElement) {
        mainColumn.insertBefore(banner, controls);
      } else {
        mainColumn.insertBefore(banner, mainColumn.firstChild);
      }
    }

    banner.innerHTML =
      '<div class="trg-colour-intent-banner__head">' +
      '<div>' +
      '<p class="trg-colour-intent-banner__kicker">Saved colour brief</p>' +
      '<h3 class="trg-colour-intent-banner__title">' + escapeHtml(title) + '</h3>' +
      '<p class="trg-colour-intent-banner__note">' + escapeHtml(note) + '</p>' +
      '</div>' +
      '<div class="trg-colour-intent-banner__actions">' +
      '<a class="trg-colour-intent-banner__link" href="/pages/colour-guide' + query + '">Open guide</a>' +
      '<button type="button" class="trg-colour-intent-banner__clear" data-trg-colour-intent-clear>Clear</button>' +
      '</div>' +
      '</div>' +
      (chips ? '<div class="trg-colour-intent-banner__chips">' + chips + '</div>' : '');
  };

  TrgSearchPlpController.prototype.resolveInputLabel = function (input) {
    if (input instanceof HTMLInputElement && input.dataset.label) return input.dataset.label;
    if (!(input instanceof HTMLInputElement)) return '';

    if (input.id) {
      var parentLabel = document.querySelector('label[for="' + input.id + '"]');
      var textTarget =
        parentLabel?.querySelector('.checkbox__label-text, .facets__pill-label, .facets__swatch-label') ||
        parentLabel;
      return textTarget ? (textTarget.textContent || '').trim() : '';
    }

    return '';
  };

  TrgSearchPlpController.prototype.renderActiveTags = function () {
    var container = document.querySelector('[data-trg-active-tags]');
    if (!(container instanceof HTMLElement)) return;

    var chips = [];
    document
      .querySelectorAll('.facets--vertical input[type="checkbox"]:checked, .facets--vertical input[type="radio"]:checked')
      .forEach(function (input) {
        var label = this.resolveInputLabel(input);
        if (!label) return;
        chips.push({
          kind: 'input',
          label: label,
          name: input.name,
          value: input.value
        });
      }, this);

    var minPriceInput = document.querySelector('input[name="filter.v.price.gte"]');
    var maxPriceInput = document.querySelector('input[name="filter.v.price.lte"]');
    if (minPriceInput instanceof HTMLInputElement && minPriceInput.value.trim() !== '') {
      chips.push({ kind: 'price-min', label: 'Min $' + minPriceInput.value.trim() });
    }
    if (maxPriceInput instanceof HTMLInputElement && maxPriceInput.value.trim() !== '') {
      chips.push({ kind: 'price-max', label: 'Max $' + maxPriceInput.value.trim() });
    }

    this.getActiveToggles().forEach(function (toggle) {
      var label = this.getToggleLabel(toggle);
      if (!label) return;
      chips.push({ kind: 'toggle', label: label, toggle: toggle });
    }, this);

    container.innerHTML = chips
      .map(function (chip) {
        var attrs = Object.entries(chip)
          .map(function (entry) {
            var key = entry[0];
            var value = entry[1];
            return 'data-' + (key === 'kind' ? 'kind' : key) + '="' + escapeHtml(value) + '"';
          })
          .join(' ');
        return (
          '<button type="button" class="button-unstyled trg-search-bar__active-tag" data-trg-active-tag ' +
          attrs +
          '>' +
          escapeHtml(chip.label) +
          '<span>✕</span></button>'
        );
      })
      .join('');
  };

  TrgSearchPlpController.prototype.removeActiveTag = function (data) {
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

    var matchingInput = Array.from(document.querySelectorAll('input')).find(function (input) {
      return input instanceof HTMLInputElement && input.name === name && input.value === value;
    });

    if (matchingInput instanceof HTMLInputElement) {
      matchingInput.checked = false;
      matchingInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  TrgSearchPlpController.prototype.loadMore = async function (button) {
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

      nextItems.forEach(function (item) {
        if (!(item instanceof HTMLElement)) return;
        var mode = (item.dataset.trgPlpDisplayMode || '').trim();
        var parentKey = (item.dataset.trgSourceParentId || '').trim();
        if (mode === 'parent_card' && parentKey) {
          if (seenParentKeys.has(parentKey)) return;
          seenParentKeys.add(parentKey);
        }

        fragment.appendChild(item.cloneNode(true));
      });

      if (fragment.childNodes.length > 0) {
        grid.appendChild(fragment);
      }

      var nextZone = nextDocument.querySelector('[data-trg-load-more-zone]');
      var currentZone = this.root.querySelector('[data-trg-load-more-zone]');
      if (nextZone && currentZone) {
        currentZone.replaceWith(nextZone);
      }

      var pushedUrl = new URL(nextUrl, window.location.href);
      history.replaceState({}, '', pushedUrl.pathname + pushedUrl.search + pushedUrl.hash);
      this.syncWishlistState();
      this.scheduleSync();
    } catch (error) {
      console.error('Failed to load more search results.', error);
      button.textContent = originalLabel || 'Load more';
    } finally {
      button.dataset.loading = 'false';
      button.removeAttribute('aria-busy');
    }
  };

  TrgSearchPlpController.prototype.getWishlistIds = function () {
    try {
      return JSON.parse(window.localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
    } catch (error) {
      return [];
    }
  };

  TrgSearchPlpController.prototype.syncWishlistState = function () {
    var savedIds = new Set(this.getWishlistIds().map(String));
    document.querySelectorAll('[data-trg-wishlist]').forEach(function (button) {
      if (!(button instanceof HTMLButtonElement)) return;
      var productId = button.dataset.productId || '';
      var isSaved = savedIds.has(productId);
      button.classList.toggle('saved', isSaved);
      button.setAttribute('aria-pressed', String(isSaved));
    });
  };

  TrgSearchPlpController.prototype.toggleWishlist = function (button) {
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

  function initializeTrgSearchPlp() {
    var existingControllers = window[CONTROLLER_REGISTRY_KEY];
    if (existingControllers instanceof Set) {
      existingControllers.forEach(function (controller) {
        controller.disconnect();
      });
      existingControllers.clear();
    }

    var nextControllers = existingControllers instanceof Set ? existingControllers : new Set();
    document.querySelectorAll('.trg-search-plp').forEach(function (root) {
      var controller = new TrgSearchPlpController(root);
      controller.connect();
      nextControllers.add(controller);
    });
    window[CONTROLLER_REGISTRY_KEY] = nextControllers;
  }

  document.addEventListener('DOMContentLoaded', initializeTrgSearchPlp, { once: true });
  document.addEventListener('shopify:section:load', initializeTrgSearchPlp);
})();
