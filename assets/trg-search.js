import { debounce, onDocumentReady } from '@theme/utilities';

const DROPDOWN_OPEN_CLASS = 'is-open';
const INLINE_SEARCH_FOCUS_CLASS = 'is-focused';
const FILTER_DELAY_MS = 180;
const FOCUS_FLASH_MS = 800;
const SCROLL_FOCUS_DELAY_MS = 220;

function normalize(value = '') {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();
}

function getInlineSearchShell() {
  return document.querySelector('[data-trg-inline-search-shell]');
}

function getInlineSearchInput() {
  return document.querySelector('[data-trg-inline-search-input]');
}

function focusInlineSearch() {
  const shell = getInlineSearchShell();
  const input = getInlineSearchInput();

  if (!(shell instanceof HTMLElement) || !(input instanceof HTMLInputElement)) {
    return false;
  }

  shell.scrollIntoView({ behavior: 'smooth', block: 'center' });

  window.setTimeout(() => {
    input.focus();
    shell.classList.add(INLINE_SEARCH_FOCUS_CLASS);

    window.setTimeout(() => {
      shell.classList.remove(INLINE_SEARCH_FOCUS_CLASS);
    }, FOCUS_FLASH_MS);
  }, SCROLL_FOCUS_DELAY_MS);

  return true;
}

function initSearchDropdown() {
  const trigger = document.querySelector('[data-trg-nav-search-trigger]');
  const dropdown = document.querySelector('[data-trg-search-dropdown]');

  if (!(trigger instanceof HTMLButtonElement) || !(dropdown instanceof HTMLElement)) {
    return;
  }

  const input = dropdown.querySelector('[data-trg-search-dropdown-input]');
  const closeButton = dropdown.querySelector('[data-trg-search-dropdown-close]');
  const pillButtons = dropdown.querySelectorAll('[data-trg-search-dropdown-pill]');

  const setExpandedState = (isOpen) => {
    trigger.classList.toggle(DROPDOWN_OPEN_CLASS, isOpen);
    trigger.setAttribute('aria-expanded', String(isOpen));
    dropdown.classList.toggle(DROPDOWN_OPEN_CLASS, isOpen);
  };

  const openDropdown = () => {
    if (focusInlineSearch()) {
      setExpandedState(false);
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

  trigger.addEventListener('click', () => {
    if (getInlineSearchInput()) {
      focusInlineSearch();
      closeDropdown();
      return;
    }

    if (dropdown.classList.contains(DROPDOWN_OPEN_CLASS)) {
      closeDropdown();
    } else {
      openDropdown();
    }
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

function initInlineCollectionSearch() {
  const form = document.querySelector('[data-trg-inline-search-form]');
  const input = document.querySelector('[data-trg-inline-search-input]');

  if (!(form instanceof HTMLFormElement) || !(input instanceof HTMLInputElement)) {
    return;
  }

  const count = document.querySelector('[data-trg-result-count]');
  const emptyState = document.querySelector('[data-trg-inline-search-empty]');
  const resultsRoot = document.querySelector('#ResultsList');
  const pillButtons = document.querySelectorAll('[data-trg-inline-search-pill]');
  const submitButton = document.querySelector('[data-trg-inline-search-submit]');
  const totalCount = count instanceof HTMLElement ? Number(count.dataset.trgTotalCount || '0') : 0;

  const getItems = () => Array.from(document.querySelectorAll('[data-trg-search-item]'));

  const applyFilter = () => {
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
    }
  };

  const debouncedApplyFilter = debounce(applyFilter, FILTER_DELAY_MS);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilter();
    input.focus();
  });

  input.addEventListener('input', debouncedApplyFilter);
  input.addEventListener('search', applyFilter);

  if (submitButton instanceof HTMLButtonElement) {
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      applyFilter();
      input.focus();
    });
  }

  pillButtons.forEach((pill) => {
    pill.addEventListener('click', () => {
      if (!(pill instanceof HTMLElement)) {
        return;
      }

      input.value = pill.dataset.trgInlineSearchPill ?? pill.textContent?.trim() ?? '';
      applyFilter();
      input.focus();
    });
  });

  if (resultsRoot instanceof HTMLElement) {
    const observer = new MutationObserver(() => {
      applyFilter();
    });

    observer.observe(resultsRoot, { childList: true, subtree: true });
  }

  applyFilter();
}

onDocumentReady(() => {
  initSearchDropdown();
  initInlineCollectionSearch();
});
