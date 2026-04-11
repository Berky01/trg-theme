import { debounce, onDocumentReady } from '@theme/utilities';

const DROPDOWN_OPEN_CLASS = 'is-open';
const SEARCH_REVEALED_CLASS = 'is-revealed';
const FILTER_DELAY_MS = 180;
const SCROLL_FOCUS_DELAY_MS = 220;
const PREDICTIVE_SEARCH_MIN_LENGTH = 2;
const PREDICTIVE_SEARCH_SECTION_ID = 'predictive-search';
const PREDICTIVE_CLOSE_DELAY_MS = 140;
const COLOUR_GUIDE_INTENT_KEY = 'trg_colour_intent';
const COLOUR_GUIDE_PROFILE_KEY = 'trg_colour_profile';
const COLOUR_GUIDE_SEED_COLOR_ALIASES = {
  brown: 'Brown',
  'off white': 'Off-White',
  'off-white': 'Off-White',
  'dark navy': 'Dark Navy',
};
const COLOUR_GUIDE_SEED_SWATCHES = {
  Brown: '#6f4a2d',
  'Off-White': '#eae4d8',
  'Dark Navy': '#101e40',
  'Saddle Brown': '#8b6834',
};
const COLOUR_GUIDE_SLOT_META = {
  shirt: { handle: 'shirts', label: 'Shirts', singular: 'shirt', note: 'Start near the face.' },
  trousers: { handle: 'trousers', label: 'Trousers', singular: 'trousers', note: 'Build the base first.' },
  knitwear: { handle: 'knitwear', label: 'Knitwear', singular: 'knitwear', note: 'Layer warmth and texture.' },
  jacket: { handle: 'jackets', label: 'Jackets', singular: 'jacket', note: 'Choose the anchor piece.' },
  coat: { handle: 'outerwear', label: 'Outerwear', singular: 'coat', note: 'Top off the palette.' },
  shoes: { handle: 'footwear', label: 'Footwear', singular: 'shoes', note: 'Ground the look.' },
};

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

    guide.dataset.shopIndex = '/cdn/shop/t/21/assets/trg-colour-shop-index-v2.json?cv=20260411h';
}

function initColourGuideIntentShim() {
  if (Theme?.template?.name !== 'page.colour-guide') {
    return;
  }

  const slotRoot = document.getElementById('ob-slots');
  if (!(slotRoot instanceof HTMLElement)) {
    return;
  }

  let persistTimer = null;

  const readSlots = () =>
    Array.from(slotRoot.querySelectorAll('.ob-slot.filled'))
      .map((slot) => {
        if (!(slot instanceof HTMLElement)) {
          return null;
        }

        const slotName = slot.dataset.slot || '';
        const meta = COLOUR_GUIDE_SLOT_META[slotName];
        const color = slot.querySelector('.ob-slot-color')?.textContent?.trim() || '';
        const hex = slot.querySelector('.ob-slot-dot') instanceof HTMLElement
          ? slot.querySelector('.ob-slot-dot').style.background || ''
          : '';

        if (!meta || !color) {
          return null;
        }

        return {
          slot: slotName,
          singular: meta.singular,
          handle: meta.handle,
          color,
          hex,
        };
      })
      .filter(Boolean);

  const persistIntent = () => {
    persistTimer = null;

    try {
      const slots = readSlots();
      if (!slots.length) {
        localStorage.removeItem(COLOUR_GUIDE_INTENT_KEY);
        return;
      }

      const profileKey = localStorage.getItem(COLOUR_GUIDE_PROFILE_KEY) || '';
      const payload = {
        source: 'guide',
        savedAt: new Date().toISOString(),
        profile_key: profileKey || null,
        slots,
        anchor: slots[0],
      };

      localStorage.setItem(COLOUR_GUIDE_INTENT_KEY, JSON.stringify(payload));
    } catch (err) {
      /* storage can fail in private mode */
    }
  };

  const schedulePersist = () => {
    if (persistTimer) {
      window.clearTimeout(persistTimer);
    }

    persistTimer = window.setTimeout(persistIntent, 40);
  };

  const observer = new MutationObserver(schedulePersist);
  observer.observe(slotRoot, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
    attributeFilter: ['class', 'style'],
  });

  document.getElementById('presets-row')?.addEventListener('click', schedulePersist, true);
  document.getElementById('ob-families')?.addEventListener('click', schedulePersist, true);
  document.getElementById('ob-suggest')?.addEventListener('click', schedulePersist, true);
  slotRoot.addEventListener('click', schedulePersist, true);

  schedulePersist();
}

function normalizeColourGuideSeedColor(rawColor) {
  const trimmed = `${rawColor ?? ''}`.trim();
  if (!trimmed) {
    return '';
  }

  const alias = COLOUR_GUIDE_SEED_COLOR_ALIASES[trimmed.toLowerCase()];
  return alias || trimmed;
}

function initColourGuideSeedRescueShim() {
  if (Theme?.template?.name !== 'page.colour-guide') {
    return;
  }

  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch (err) {
    return;
  }

  const garment = params.get('base_garment') || '';
  const color = normalizeColourGuideSeedColor(params.get('base_colour'));
  const source = (params.get('source') || '').toLowerCase();
  const slotMeta = COLOUR_GUIDE_SLOT_META[garment];

  if (!slotMeta || !color) {
    return;
  }

  const applySeed = () => {
    const slotRoot = document.getElementById('ob-slots');
    if (!(slotRoot instanceof HTMLElement)) {
      return false;
    }

    if (slotRoot.querySelector('.ob-slot.filled')) {
      return true;
    }

    const slot = slotRoot.querySelector(`.ob-slot[data-slot="${garment}"]`);
    const colorEl = slot?.querySelector('.ob-slot-color');
    const dotEl = slot?.querySelector('.ob-slot-dot');
    if (!(slot instanceof HTMLElement) || !(colorEl instanceof HTMLElement) || !(dotEl instanceof HTMLElement)) {
      return false;
    }

    slotRoot.querySelectorAll('.ob-slot').forEach((candidate) => {
      candidate.classList.remove('on');
      candidate.setAttribute('aria-pressed', 'false');
    });

    slot.classList.add('filled', 'on');
    slot.setAttribute('aria-pressed', 'true');
    colorEl.textContent = color;
    dotEl.style.background = COLOUR_GUIDE_SEED_SWATCHES[color] || '';

    const gaugePct = document.getElementById('ob-gauge-pct');
    const gaugeLabel = document.getElementById('ob-gauge-label');
    const gaugeDesc = document.getElementById('ob-gauge-desc');
    if (gaugePct instanceof HTMLElement) {
      gaugePct.textContent = '1/6';
    }
    if (gaugeLabel instanceof HTMLElement) {
      gaugeLabel.textContent = 'Outfit progress';
    }
    if (gaugeDesc instanceof HTMLElement) {
      gaugeDesc.textContent = '1 of 6 pieces is set. Add another piece or swap the anchor colour.';
    }

    if (source === 'pdp') {
      const profileText = document.getElementById('ob-pl-text');
      const profileCta = document.getElementById('ob-pl-cta');
      if (profileText instanceof HTMLElement) {
        profileText.innerHTML = `<strong>${color} ${slotMeta.singular}</strong> loaded from a PDP. Keep building here or take the finder for profile-led picks.`;
      }
      if (profileCta instanceof HTMLElement) {
        profileCta.textContent = 'Take the finder →';
      }
    }

    const summaryEl = document.getElementById('ob-shop-summary');
    const actionsEl = document.getElementById('ob-shop-actions');
    if (summaryEl instanceof HTMLElement && actionsEl instanceof HTMLElement) {
      const defaultSlots = [garment, 'shirt', 'jacket', 'trousers']
        .filter((value, index, values) => values.indexOf(value) === index)
        .slice(0, 3);

      summaryEl.innerHTML = `Start with <strong>${color} ${slotMeta.singular}</strong>, then open the matching categories. No exact product bucket exists for this combination yet, so the guide is falling back to category jumps. Treat the selected colours as the shopping brief rather than a strict filter.`;
      actionsEl.innerHTML = defaultSlots
        .map((slotName, index) => {
          const meta = COLOUR_GUIDE_SLOT_META[slotName];
          if (!meta) {
            return '';
          }

          const title = slotName === garment ? `Shop ${meta.label}` : `Browse ${meta.label}`;
          const note = slotName === garment
            ? `${color} is the brief for this ${meta.singular} category.`
            : meta.note;

          return `<a class="ob-shop-card" href="/collections/${meta.handle}">
            <span class="ob-shop-swatch" style="background:${slotName === garment ? (COLOUR_GUIDE_SEED_SWATCHES[color] || 'linear-gradient(135deg,#f4efe7,#b8aa96)') : 'linear-gradient(135deg,#f4efe7,#b8aa96)'}"></span>
            <span class="ob-shop-body">
              <span class="ob-shop-eyebrow">${index === 0 ? 'Anchor piece' : 'Add next'}</span>
              <span class="ob-shop-card-title">${title}</span>
              <span class="ob-shop-card-note">${note}</span>
            </span>
            <span class="ob-shop-arrow" aria-hidden="true">&rarr;</span>
          </a>`;
        })
        .join('');
    }

    return true;
  };

  [60, 220, 700, 1500, 3000, 5000, 8000, 12000].forEach((delay) => {
    window.setTimeout(() => {
      applySeed();
    }, delay);
  });

  window.addEventListener('load', () => {
    window.setTimeout(() => {
      applySeed();
    }, 1800);
  }, { once: true });
}

onDocumentReady(() => {
  ensureColourGuideShopIndexShim();
  initColourGuideIntentShim();
  initColourGuideSeedRescueShim();
  initSearchDropdown();
  initSharedSearchBar();
});
