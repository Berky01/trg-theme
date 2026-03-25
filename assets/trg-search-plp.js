(function () {
  if (window.__trg_search_plp_ready) return;
  window.__trg_search_plp_ready = true;

  var FILTER_STORAGE_KEY = 'trg_filters_open';
  var WISHLIST_STORAGE_KEY = 'trg_plp_saved_products';

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

  function TrgSearchPlpController(root) {
    this.root = root;
    this.syncTimeout = null;
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
    this.syncWishlistState();
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
      this.applyFilters();
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
      var cardText = normalizeText(card.getAttribute('data-trg-search-text'));
      var matchesQuery = query === '' || cardText.indexOf(query) !== -1;
      var matches = matchesQuery && this.matchesToggleFilters(card, activeToggles);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    }, this);

    this.updateVisibleState(visibleCount);
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

      nextItems.forEach(function (item) {
        grid.insertAdjacentHTML('beforeend', item.outerHTML);
      });

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
    document.querySelectorAll('.trg-search-plp').forEach(function (root) {
      new TrgSearchPlpController(root).connect();
    });
  }

  document.addEventListener('DOMContentLoaded', initializeTrgSearchPlp, { once: true });
  document.addEventListener('shopify:section:load', initializeTrgSearchPlp);
})();
