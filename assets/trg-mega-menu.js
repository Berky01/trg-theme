const SELECTOR = '[data-trg-mega-menu]';

function activatePanel(root, panelId) {
  const tabs = root.querySelectorAll('[data-trg-mega-menu-tab]');
  const panels = root.querySelectorAll('[data-trg-mega-menu-panel]');

  tabs.forEach((tab) => {
    const active = tab.dataset.trgMegaMenuTab === panelId;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  panels.forEach((panel) => {
    const active = panel.id === panelId;
    panel.classList.toggle('is-active', active);
    panel.toggleAttribute('hidden', !active);
  });
}

function buildBrandIndex(root) {
  const panels = root.querySelector('[data-trg-brand-panels]');
  if (!(panels instanceof HTMLElement)) {
    return [];
  }

  const entries = new Map();
  panels.querySelectorAll('.trg-mega-menu__brand-link[href]').forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return;

    const title = link.textContent?.trim() || '';
    const href = link.getAttribute('href') || '';
    const key = title.toLowerCase();

    if (!title || !href || entries.has(key)) return;
    entries.set(key, { title, href });
  });

  return Array.from(entries.values()).sort((left, right) =>
    left.title.localeCompare(right.title, undefined, { sensitivity: 'base' }),
  );
}

function createHighlightedLink(entry, query) {
  const link = document.createElement('a');
  link.className = 'trg-mega-menu__brand-link';
  link.href = entry.href;

  const label = entry.title;
  const start = label.toLowerCase().indexOf(query);
  if (start === -1) {
    link.textContent = label;
    return link;
  }

  const end = start + query.length;
  link.append(document.createTextNode(label.slice(0, start)));

  const highlight = document.createElement('mark');
  highlight.className = 'trg-mega-menu__brand-search-highlight';
  highlight.textContent = label.slice(start, end);
  link.append(highlight);
  link.append(document.createTextNode(label.slice(end)));

  return link;
}

function renderBrandSearch(root, query, brandIndex) {
  const panels = root.querySelector('[data-trg-brand-panels]');
  const results = root.querySelector('[data-trg-brand-search-results]');
  const grid = root.querySelector('[data-trg-brand-search-grid]');
  const empty = root.querySelector('[data-trg-brand-search-empty]');
  const term = root.querySelector('[data-trg-brand-search-term]');
  const meta = root.querySelector('[data-trg-brand-search-meta]');
  const clear = root.querySelector('[data-trg-brand-search-clear]');

  if (
    !(panels instanceof HTMLElement) ||
    !(results instanceof HTMLElement) ||
    !(grid instanceof HTMLElement) ||
    !(empty instanceof HTMLElement) ||
    !(term instanceof HTMLElement) ||
    !(meta instanceof HTMLElement) ||
    !(clear instanceof HTMLButtonElement)
  ) {
    return;
  }

  const trimmedQuery = query.trim();
  const normalizedQuery = trimmedQuery.toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  panels.toggleAttribute('hidden', isSearching);
  results.toggleAttribute('hidden', !isSearching);
  clear.toggleAttribute('hidden', !isSearching);

  if (!isSearching) {
    grid.replaceChildren();
    grid.toggleAttribute('hidden', false);
    empty.toggleAttribute('hidden', true);
    meta.replaceChildren();
    return;
  }

  const matches = brandIndex.filter((entry) => entry.title.toLowerCase().includes(normalizedQuery));
  const fragment = document.createDocumentFragment();

  matches.forEach((entry) => {
    fragment.append(createHighlightedLink(entry, normalizedQuery));
  });

  grid.replaceChildren(fragment);
  grid.toggleAttribute('hidden', matches.length === 0);
  empty.toggleAttribute('hidden', matches.length !== 0);
  term.textContent = trimmedQuery;

  meta.replaceChildren();
  if (matches.length === 0) {
    return;
  }

  const count = document.createElement('strong');
  count.textContent = String(matches.length);
  meta.append(count);
  meta.append(
    document.createTextNode(
      ` brand${matches.length === 1 ? '' : 's'} matching "${trimmedQuery}"`,
    ),
  );
}

function initBrandSearch(root) {
  if (root.dataset.trgBrandSearchReady === 'true') {
    return;
  }

  const input = root.querySelector('[data-trg-brand-search-input]');
  const clear = root.querySelector('[data-trg-brand-search-clear]');
  if (!(input instanceof HTMLInputElement) || !(clear instanceof HTMLButtonElement)) {
    return;
  }

  root.dataset.trgBrandSearchReady = 'true';
  const brandIndex = buildBrandIndex(root);

  const update = () => renderBrandSearch(root, input.value, brandIndex);
  const reset = () => {
    if (!input.value) return;
    input.value = '';
    update();
  };

  input.addEventListener('input', update);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && input.value) {
      event.stopPropagation();
      reset();
    }
  });

  clear.addEventListener('click', () => {
    reset();
    input.focus();
  });

  const menuItem = root.closest('.menu-list__list-item');
  if (menuItem instanceof HTMLElement) {
    menuItem.addEventListener('pointerleave', reset);
  }

  update();
}

function initMenu(root) {
  if (!(root instanceof HTMLElement) || root.dataset.trgMegaMenuReady === 'true') {
    return;
  }

  root.dataset.trgMegaMenuReady = 'true';

  // FIX A: Stop clicks on <a> links from bubbling to header-menu.js.
  // Dwell's header-menu.js calls event.preventDefault() on ALL clicks inside a
  // menu-list__list-item with expandable content — this kills link navigation.
  root.addEventListener('click', (event) => {
    if (event.target.closest('a[href]')) {
      event.stopPropagation();
    }
  });

  // FIX B: Prevent the focusin/click race on the parent nav trigger.
  // Dwell binds both focusin and click to activate(). focusin fires first and
  // activates the menu, then click sees it's already active and deactivates.
  // mousedown.preventDefault() blocks the focus shift without blocking click,
  // so only click reaches header-menu.js and opens the menu cleanly.
  const menuListItem = root.closest('.menu-list__list-item');
  if (menuListItem) {
    const navLink = menuListItem.querySelector(':scope > .menu-list__link');
    if (navLink) {
      navLink.addEventListener('mousedown', (event) => {
        event.preventDefault();
      });
    }
  }

  const tabs = root.querySelectorAll('[data-trg-mega-menu-tab]');
  tabs.forEach((tab) => {
    const panelId = tab.dataset.trgMegaMenuTab;
    if (!panelId) return;

    const activate = () => activatePanel(root, panelId);
    tab.addEventListener('click', activate);
    tab.addEventListener('pointerenter', activate);
    tab.addEventListener('focus', activate);
  });

  if (root.dataset.trgMegaMenuMode === 'brands') {
    initBrandSearch(root);
  }
}

function initAllMenus(target = document) {
  if (!target || typeof target.querySelectorAll !== 'function') return;
  target.querySelectorAll(SELECTOR).forEach(initMenu);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initAllMenus());
} else {
  initAllMenus();
}

document.addEventListener('shopify:section:load', (event) => {
  initAllMenus(event.target);
});
