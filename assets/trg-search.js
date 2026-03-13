import { debounce, onDocumentReady } from '@theme/utilities';

const DROPDOWN_OPEN_CLASS = 'is-open';
const SEARCH_REVEALED_CLASS = 'is-revealed';
const SEARCH_FOCUS_CLASS = 'is-focused';
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

function getSharedSearchShell() {
  const shell = document.querySelector('[data-trg-search-bar]');
  return shell instanceof HTMLElement ? shell : null;
}

function getSharedSearchInput() {
  const input = document.querySelector('[data-trg-search-input]');
  return input instanceof HTMLInputElement ? input : null;
}

function revealSharedSearch(shell) {
  if (!(shell instanceof HTMLElement)) {
    return false;
  }

  if (!shell.hasAttribute('data-trg-search-collapsible')) {
    return false;
  }

  shell.classList.add(SEARCH_REVEALED_CLASS);
  shell.setAttribute('aria-hidden', 'false');
  return true;
}

function flashSharedSearch(shell) {
  if (!(shell instanceof HTMLElement)) {
    return;
  }

  shell.classList.add(SEARCH_FOCUS_CLASS);
  window.setTimeout(() => {
    shell.classList.remove(SEARCH_FOCUS_CLASS);
  }, FOCUS_FLASH_MS);
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
      flashSharedSearch(shell);
    },
    scroll ? SCROLL_FOCUS_DELAY_MS : 50
  );

  return true;
}

function initSearchDropdown() {
  const trigger = document.querySelector('[data-trg-nav-search-trigger]');
  const dropdown = document.querySelector('[data-trg-search-dropdown]');

  if (!(trigger instanceof HTMLButtonElement)) {
    return;
  }

  if (!(dropdown instanceof HTMLElement)) {
    trigger.addEventListener('click', () => {
      const sharedShell = getSharedSearchShell();
      const revealed = focusSharedSearch();

      if (revealed && sharedShell?.hasAttribute('data-trg-search-collapsible')) {
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
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
    const sharedShell = getSharedSearchShell();

    if (focusSharedSearch()) {
      trigger.classList.toggle(DROPDOWN_OPEN_CLASS, Boolean(sharedShell?.hasAttribute('data-trg-search-collapsible')));
      trigger.setAttribute('aria-expanded', String(Boolean(sharedShell?.hasAttribute('data-trg-search-collapsible'))));
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
  const resultsRoot = document.querySelector('#ResultsList');
  const pillButtons = shell.querySelectorAll('[data-trg-search-pill]');
  const submitButton = shell.querySelector('[data-trg-search-submit]');
  const totalCount = count instanceof HTMLElement ? Number(count.dataset.trgTotalCount || '0') : 0;

  const getItems = () => Array.from(document.querySelectorAll('[data-trg-search-item]'));
  const hasCollectionSearch = count instanceof HTMLElement && getItems().length > 0;

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
    }
  };

  const debouncedApplyFilter = debounce(applyCollectionFilter, FILTER_DELAY_MS);

  form.addEventListener('submit', (event) => {
    if (!hasCollectionSearch) {
      return;
    }

    event.preventDefault();
    applyCollectionFilter();
    input.focus();
  });

  if (hasCollectionSearch) {
    input.addEventListener('input', debouncedApplyFilter);
    input.addEventListener('search', applyCollectionFilter);
  }

  if (submitButton instanceof HTMLButtonElement && hasCollectionSearch) {
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      applyCollectionFilter();
      input.focus();
    });
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

      if (hasCollectionSearch) {
        applyCollectionFilter();
      }

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
}

onDocumentReady(() => {
  initSearchDropdown();
  initSharedSearchBar();
});
