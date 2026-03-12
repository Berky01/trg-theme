const REVEAL_SELECTOR = '[data-trg-reveal]';

function shouldAnimate() {
  return document.body.classList.contains('trg-reveal-enabled-true');
}

function revealElement(element) {
  element.classList.add('is-visible');
}

function createObserver() {
  if (!('IntersectionObserver' in window) || !shouldAnimate()) {
    return null;
  }

  return new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        revealElement(entry.target);
        observer.unobserve(entry.target);
      }
    },
    {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.06,
    }
  );
}

function initReveal(scope = document) {
  const elements = scope.querySelectorAll(REVEAL_SELECTOR);
  if (!elements.length) return;

  if (!shouldAnimate()) {
    for (const element of elements) {
      revealElement(element);
    }
    return;
  }

  const observer = createObserver();
  if (!observer) {
    for (const element of elements) {
      revealElement(element);
    }
    return;
  }

  for (const element of elements) {
    if (element.classList.contains('is-visible')) continue;
    observer.observe(element);
  }
}

function initCollectionSearch(scope = document) {
  const widgets = scope.querySelectorAll('[data-trg-collection-search]:not([data-trg-ready])');
  if (!widgets.length) return;

  for (const widget of widgets) {
    const input = widget.querySelector('[data-trg-search-input]');
    const clearButton = widget.querySelector('[data-trg-clear-search]');
    const section = widget.closest('.shopify-section');
    const countLabel = section?.querySelector('[data-trg-result-count]') || document.querySelector('[data-trg-result-count]');
    const grid = document.querySelector('.product-grid');

    if (!input || !grid) continue;

    const getItems = () => [...grid.querySelectorAll('.product-grid__item')];

    const applyFilter = () => {
      const query = input.value.trim().toLowerCase();
      const items = getItems();
      let visibleCount = 0;

      for (const item of items) {
        const titleNode = item.querySelector('.visually-hidden');
        const haystack = (titleNode?.textContent || '').toLowerCase();
        const isVisible = query === '' || haystack.includes(query);

        item.hidden = !isVisible;
        item.style.display = isVisible ? '' : 'none';

        if (isVisible) visibleCount += 1;
      }

      if (countLabel) {
        countLabel.textContent = `${visibleCount} products`;
      }
    };

    input.addEventListener('input', applyFilter);
    clearButton?.addEventListener('click', () => {
      input.value = '';
      applyFilter();
      input.focus();
    });

    const observer = new MutationObserver(() => applyFilter());
    observer.observe(grid, { childList: true, subtree: true });

    widget.dataset.trgReady = 'true';
    applyFilter();
  }
}

function run() {
  initReveal(document);
  initCollectionSearch(document);

  document.addEventListener('shopify:section:load', (event) => {
    if (event.target instanceof HTMLElement) {
      initReveal(event.target);
      initCollectionSearch(event.target);
    }
  });

  document.addEventListener('shopify:section:select', (event) => {
    if (event.target instanceof HTMLElement) {
      initReveal(event.target);
      initCollectionSearch(event.target);
    }
  });
}

if (!window.__trgThemeRevealInit) {
  window.__trgThemeRevealInit = true;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
}
