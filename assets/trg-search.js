import { debounce, onDocumentReady } from '@theme/utilities';

const DROPDOWN_OPEN_CLASS = 'is-open';
const SEARCH_REVEALED_CLASS = 'is-revealed';
const FILTER_DELAY_MS = 180;
const SCROLL_FOCUS_DELAY_MS = 220;
const PREDICTIVE_SEARCH_MIN_LENGTH = 2;
const PREDICTIVE_SEARCH_SECTION_ID = 'predictive-search';
const PREDICTIVE_CLOSE_DELAY_MS = 140;

function normalize(value = '') {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

function buildFormSearchUrl(form, query) {
  const action = form.getAttribute('action') || Theme?.routes?.search_url || '/search';
  const url = new URL(action, window.location.origin);
  const formData = new FormData(form);

  formData.set('q', query);

  for (const [key, value] of formData.entries()) {
    const normalizedValue = `${value}`.trim();
    if (normalizedValue === '') {
      continue;
    }

    url.searchParams.set(key, normalizedValue);
  }

  return url;
}

function getSharedSearchShell() {
  const shell = document.querySelector('[data-trg-search-bar]');
  return shell instanceof HTMLElement ? shell : null;
}

function getSharedSearchInput() {
  const input = document.querySelector('[data-trg-search-input]');
  return input instanceof HTMLInputElement ? input : null;
}

function isSharedSearchCollapsible(shell) {
  return shell instanceof HTMLElement && shell.hasAttribute('data-trg-search-collapsible');
}

function isSharedSearchRevealed(shell) {
  return isSharedSearchCollapsible(shell) && !shell.hidden && shell.classList.contains(SEARCH_REVEALED_CLASS);
}

function revealSharedSearch(shell) {
  if (!(shell instanceof HTMLElement)) {
    return false;
  }

  if (!isSharedSearchCollapsible(shell)) {
    return false;
  }

  shell.hidden = false;
  shell.classList.add(SEARCH_REVEALED_CLASS);
  shell.setAttribute('aria-hidden', 'false');
  return true;
}

function hideSharedSearch(shell) {
  if (!(shell instanceof HTMLElement)) {
    return false;
  }

  if (!isSharedSearchCollapsible(shell)) {
    return false;
  }

  shell.classList.remove(SEARCH_REVEALED_CLASS);
  shell.setAttribute('aria-hidden', 'true');
  shell.hidden = true;
  return true;
}

function focusSharedSearch({ scroll = true } = {}) {
  const shell = getSharedSearchShell();
  const input = getSharedSearchInput();

  if (!(shell instanceof HTMLElement) || !(input instanceof HTMLInputElement)) {
    return false;
  }

  revealSharedSearch(shell);

  if (scroll) {
    shell.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  window.setTimeout(
    () => {
      input.focus();
    },
    scroll ? SCROLL_FOCUS_DELAY_MS : 50
  );

  return true;
}

function initSearchDropdown() {
  const triggers = Array.from(document.querySelectorAll('[data-trg-nav-search-trigger]')).filter(
    (element) => element instanceof HTMLButtonElement
  );
  const dropdown = document.querySelector('[data-trg-search-dropdown]');

  if (triggers.length === 0) {
    return;
  }

  if (!(dropdown instanceof HTMLElement)) {
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const sharedShell = getSharedSearchShell();

        if (isSharedSearchRevealed(sharedShell)) {
          hideSharedSearch(sharedShell);
          triggers.forEach((button) => {
            button.classList.remove(DROPDOWN_OPEN_CLASS);
            button.setAttribute('aria-expanded', 'false');
          });
          return;
        }

        const revealed = focusSharedSearch();

        if (revealed && isSharedSearchCollapsible(sharedShell)) {
          triggers.forEach((button) => {
            button.classList.add(DROPDOWN_OPEN_CLASS);
            button.setAttribute('aria-expanded', 'true');
          });
        }
      });
    });
    return;
  }

  const input = dropdown.querySelector('[data-trg-search-dropdown-input]');
  const closeButton = dropdown.querySelector('[data-trg-search-dropdown-close]');
  const pillButtons = dropdown.querySelectorAll('[data-trg-search-dropdown-pill]');

  const setExpandedState = (isOpen) => {
    triggers.forEach((trigger) => {
      trigger.classList.toggle(DROPDOWN_OPEN_CLASS, isOpen);
      trigger.setAttribute('aria-expanded', String(isOpen));
    });
    dropdown.classList.toggle(DROPDOWN_OPEN_CLASS, isOpen);
  };

  const openDropdown = () => {
    const sharedShell = getSharedSearchShell();
    const hasCollapsibleSearch = isSharedSearchCollapsible(sharedShell);

    if (isSharedSearchRevealed(sharedShell)) {
      hideSharedSearch(sharedShell);
      triggers.forEach((trigger) => {
        trigger.classList.remove(DROPDOWN_OPEN_CLASS);
        trigger.setAttribute('aria-expanded', 'false');
      });
      dropdown.classList.remove(DROPDOWN_OPEN_CLASS);
      return;
    }

    if (focusSharedSearch()) {
      triggers.forEach((trigger) => {
        trigger.classList.toggle(DROPDOWN_OPEN_CLASS, hasCollapsibleSearch);
        trigger.setAttribute('aria-expanded', String(hasCollapsibleSearch));
      });
      dropdown.classList.remove(DROPDOWN_OPEN_CLASS);
      return;
    }

    setExpandedState(true);

    if (input instanceof HTMLInputElement) {
      window.setTimeout(() => input.focus(), 50);
    }
  };

  const closeDropdown = () => {
    setExpandedState(false);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (getSharedSearchInput()) {
        openDropdown();
        return;
      }

      if (dropdown.classList.contains(DROPDOWN_OPEN_CLASS)) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });
  });

  if (closeButton instanceof HTMLButtonElement) {
    closeButton.addEventListener('click', closeDropdown);
  }

  pillButtons.forEach((pill) => {
    pill.addEventListener('click', () => {
      if (!(input instanceof HTMLInputElement) || !(pill instanceof HTMLElement)) {
        return;
      }

      input.value = pill.dataset.trgSearchDropdownPill ?? pill.textContent?.trim() ?? '';
      input.focus();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dropdown.classList.contains(DROPDOWN_OPEN_CLASS)) {
      closeDropdown();
    }
  });
}

function initSharedSearchBar() {
  const shell = getSharedSearchShell();
  const form = document.querySelector('[data-trg-search-form]');
  const input = getSharedSearchInput();

  if (!(shell instanceof HTMLElement) || !(form instanceof HTMLFormElement) || !(input instanceof HTMLInputElement)) {
    return;
  }

  const count = document.querySelector('[data-trg-result-count]');
  const emptyState = shell.querySelector('[data-trg-search-empty]');
  const predictiveRoot = shell.querySelector('[data-trg-search-predictive]');
  const resultsRoot = document.querySelector('#ResultsList');
  const pillButtons = shell.querySelectorAll('[data-trg-search-pill]');
  const field = form.querySelector('.trg-search-bar__field');
  const totalCount = count instanceof HTMLElement ? Number(count.dataset.trgTotalCount || '0') : 0;
  const hasPredictiveSearch = predictiveRoot instanceof HTMLElement;

  const getItems = () => Array.from(document.querySelectorAll('[data-trg-search-item]'));
  const hasCollectionSearch = count instanceof HTMLElement && getItems().length > 0;
  let predictiveAbortController = null;
  let predictiveCloseTimer = 0;

  const applyCollectionFilter = () => {
    if (!hasCollectionSearch) {
      return;
    }

    const query = normalize(input.value);
    const tokens = query === '' ? [] : query.split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    getItems().forEach((item) => {
      if (!(item instanceof HTMLElement)) {
        return;
      }

      const haystack = normalize(item.dataset.trgSearchText || item.textContent || '');
      const isMatch = tokens.every((token) => haystack.includes(token));

      item.hidden = !isMatch;
      if (isMatch) {
        visibleCount += 1;
      }
    });

    if (count instanceof HTMLElement) {
      const displayCount = tokens.length === 0 && totalCount > 0 ? totalCount : visibleCount;
      count.textContent = String(displayCount);
    }

    if (emptyState instanceof HTMLElement) {
      emptyState.hidden = visibleCount !== 0;
      const emptyText = emptyState.querySelector('[data-trg-search-empty-text]');
      if (emptyText) {
        const q = input.value.trim();
        emptyText.textContent = q ? `No results for \u201c${q}\u201d` : 'No results';
      }
    }
  };

  const debouncedApplyFilter = debounce(applyCollectionFilter, FILTER_DELAY_MS);

  const clearPredictiveCloseTimer = () => {
    window.clearTimeout(predictiveCloseTimer);
  };

  const setPredictiveOpen = (isOpen) => {
    if (!hasPredictiveSearch) {
      return;
    }

    predictiveRoot.hidden = !isOpen;
    shell.classList.toggle(DROPDOWN_OPEN_CLASS, isOpen);
    input.setAttribute('aria-expanded', String(isOpen));
  };

  const closePredictiveSearch = () => {
    if (!hasPredictiveSearch) {
      return;
    }

    clearPredictiveCloseTimer();

    if (predictiveAbortController) {
      predictiveAbortController.abort();
      predictiveAbortController = null;
    }

    predictiveRoot.innerHTML = '';
    setPredictiveOpen(false);
  };

  const schedulePredictiveClose = () => {
    if (!hasPredictiveSearch) {
      return;
    }

    clearPredictiveCloseTimer();
    predictiveCloseTimer = window.setTimeout(() => {
      closePredictiveSearch();
    }, PREDICTIVE_CLOSE_DELAY_MS);
  };

  const renderPredictiveSearch = (markup) => {
    if (!hasPredictiveSearch) {
      return;
    }

    const parsedMarkup = new DOMParser().parseFromString(markup, 'text/html');
    const dropdown = parsedMarkup.querySelector('#predictive-search-results');

    if (!(dropdown instanceof HTMLElement)) {
      closePredictiveSearch();
      return;
    }

    predictiveRoot.innerHTML = dropdown.outerHTML;

    const liveDropdown = predictiveRoot.querySelector('.predictive-search-dropdown');
    if (liveDropdown instanceof HTMLElement) {
      const controlsId = `${input.id || 'TrgSearchBar'}-predictive-results`;
      liveDropdown.id = controlsId;
      input.setAttribute('aria-controls', controlsId);
    }

    setPredictiveOpen(true);
  };

  const debouncedFetchPredictiveSearch = debounce(async () => {
    if (!hasPredictiveSearch) {
      return;
    }

    const searchTerm = input.value.trim();

    if (searchTerm.length < PREDICTIVE_SEARCH_MIN_LENGTH) {
      closePredictiveSearch();
      return;
    }

    const url = new URL(Theme?.routes?.predictive_search_url || '/search/suggest', window.location.origin);
    url.searchParams.set('section_id', PREDICTIVE_SEARCH_SECTION_ID);
    url.searchParams.set('q', searchTerm);
    url.searchParams.set('resources[limit_scope]', 'each');
    url.searchParams.set('resources[limit]', '4');

    const controller = new AbortController();
    if (predictiveAbortController) {
      predictiveAbortController.abort();
    }
    predictiveAbortController = controller;

    try {
      const response = await fetch(url.toString(), {
        signal: controller.signal,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (!response.ok) {
        throw new Error(`Predictive search failed with status ${response.status}`);
      }

      const markup = await response.text();
      if (controller.signal.aborted) {
        return;
      }

      renderPredictiveSearch(markup);
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }

      closePredictiveSearch();
      // Predictive results are supplemental; fail quietly if the endpoint errors.
      console.warn('TRG predictive search failed', error);
    }
  }, FILTER_DELAY_MS);

  form.addEventListener('submit', (event) => {
    const query = input.value.trim();

    if (query === '') {
      event.preventDefault();
      closePredictiveSearch();

      if (hasCollectionSearch) {
        applyCollectionFilter();
        input.focus();
      }

      return;
    }

    event.preventDefault();

    closePredictiveSearch();
    window.location.assign(buildFormSearchUrl(form, query).toString());
  });

  if (hasCollectionSearch) {
    input.addEventListener('input', debouncedApplyFilter);
    input.addEventListener('search', applyCollectionFilter);
  }

  if (hasPredictiveSearch) {
    input.addEventListener('input', debouncedFetchPredictiveSearch);
    input.addEventListener('focus', () => {
      if (input.value.trim().length >= PREDICTIVE_SEARCH_MIN_LENGTH) {
        debouncedFetchPredictiveSearch();
      }
    });
    input.addEventListener('search', () => {
      if (input.value.trim().length < PREDICTIVE_SEARCH_MIN_LENGTH) {
        closePredictiveSearch();
      }
    });

    shell.addEventListener('focusin', () => {
      clearPredictiveCloseTimer();
    });

    shell.addEventListener('focusout', (event) => {
      const nextTarget = event.relatedTarget;

      if (nextTarget instanceof Node && shell.contains(nextTarget)) {
        return;
      }

      schedulePredictiveClose();
    });

    predictiveRoot.addEventListener('pointerdown', () => {
      clearPredictiveCloseTimer();
    });

    document.addEventListener('pointerdown', (event) => {
      if (!(event.target instanceof Node) || shell.contains(event.target)) {
        return;
      }

      closePredictiveSearch();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closePredictiveSearch();
      }
    });
  }

  if (field instanceof HTMLElement) {
    const focusInputFromField = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (target?.closest('[data-trg-active-tags], [data-trg-search-submit], [data-trg-search-predictive]')) {
        return;
      }

      if (document.activeElement !== input) {
        window.requestAnimationFrame(() => input.focus());
      }
    };

    field.addEventListener('pointerup', focusInputFromField);
    field.addEventListener('click', focusInputFromField);
  }

  pillButtons.forEach((pill) => {
    pill.addEventListener('click', (event) => {
      if (!(pill instanceof HTMLElement)) {
        return;
      }

      if (pill instanceof HTMLAnchorElement && !hasCollectionSearch) {
        return;
      }

      event.preventDefault();

      input.value = pill.dataset.trgSearchPill ?? pill.textContent?.trim() ?? '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    });
  });

  if (resultsRoot instanceof HTMLElement && hasCollectionSearch) {
    const observer = new MutationObserver(() => {
      applyCollectionFilter();
    });

    observer.observe(resultsRoot, { childList: true, subtree: true });
  }

  if (hasCollectionSearch) {
    applyCollectionFilter();
  }

  if (hasPredictiveSearch) {
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');
  }
}

function ensureColourGuideShopIndexShim() {
  if (Theme?.template?.name !== 'page.colour-guide') {
    return;
  }

  const guide = document.querySelector('.trg-colour-guide');
  if (!(guide instanceof HTMLElement) || guide.dataset.shopIndex) {
    return;
  }

  guide.dataset.shopIndex = '/cdn/shop/t/21/assets/trg-colour-shop-index-v2.json?cv=20260411f';
}

onDocumentReady(() => {
  ensureColourGuideShopIndexShim();
  initSearchDropdown();
  initSharedSearchBar();
});
