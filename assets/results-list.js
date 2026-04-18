import { mediaQueryLarge, requestIdleCallback, startViewTransition } from '@theme/utilities';
import PaginatedList from '@theme/paginated-list';

const STAGED_EMPTY_CATEGORY_STYLE_ID = 'trg-staged-empty-category-runtime';
const SMALL_LIVE_CATEGORY_THRESHOLD = 2;

function ensureStagedEmptyCategoryStyles() {
  if (document.getElementById(STAGED_EMPTY_CATEGORY_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STAGED_EMPTY_CATEGORY_STYLE_ID;
  style.textContent = `
    results-list.trg-plp-body--runtime-staged-empty-category .collection-wrapper {
      grid-template-columns: minmax(0, 1fr) !important;
      margin-top: 0 !important;
    }

    results-list.trg-plp-body--runtime-staged-empty-category .trg-plp-main-column {
      grid-column: 1 / -1 !important;
    }

    results-list.trg-plp-body--runtime-small-live-category .collection-wrapper {
      grid-template-columns: minmax(0, 1fr) !important;
      margin-top: 0 !important;
    }

    results-list.trg-plp-body--runtime-small-live-category .trg-plp-main-column {
      grid-column: 1 / -1 !important;
    }

    .trg-plp-body--runtime-staged-empty-category .trg-plp-sidebar-column,
    .trg-plp-body--runtime-staged-empty-category .trg-collection-controls,
    .trg-plp-body--runtime-staged-empty-category .collection-wrapper > dialog-component#filters-drawer,
    .trg-plp-body--runtime-staged-empty-category .collection-wrapper > .facets-toggle {
      display: none !important;
    }

    .trg-plp-body--runtime-small-live-category .trg-plp-sidebar-column,
    .trg-plp-body--runtime-small-live-category .trg-collection-controls,
    .trg-plp-body--runtime-small-live-category .collection-wrapper > dialog-component#filters-drawer,
    .trg-plp-body--runtime-small-live-category .collection-wrapper > .facets-toggle {
      display: none !important;
    }

    .trg-plp-body--runtime-staged-empty-category .main-collection-grid {
      padding-top: 0 !important;
    }

    .trg-plp-body--runtime-small-live-category .main-collection-grid {
      padding-top: 0 !important;
    }

    .trg-collection-intro--runtime-staged .trg-collection-intro__bar {
      min-height: auto;
      padding-block: 1rem;
    }

    .trg-collection-intro--runtime-staged .trg-collection-intro__inner {
      align-items: flex-start;
    }

    .trg-collection-intro--runtime-staged .trg-collection-intro__support {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.4rem 0.9rem;
    }

    .trg-collection-intro__count--runtime-hidden {
      display: none !important;
    }

    .trg-collection-intro__body--runtime {
      max-width: 44rem;
      margin: 0;
      color: rgb(245 241 235 / 0.78);
      font-family: var(--font-body--family);
      font-size: 0.88rem;
      line-height: 1.45;
    }
  `;
  document.head.append(style);
}

function humanizeCollectionHandle(handle) {
  return (handle || '')
    .split('-')
    .filter(Boolean)
    .map((segment) => (segment.toLowerCase() === 'ca' ? 'CA' : `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`))
    .join(' ');
}

/**
 * A custom element that renders a pagniated results list
 */
export default class ResultsList extends PaginatedList {
  connectedCallback() {
    super.connectedCallback();

    mediaQueryLarge.addEventListener('change', this.#handleMediaQueryChange);
    this.#normalizeCategoryIntro();
    this.#normalizeStagedEmptyCategory();
    this.#normalizeSmallLiveCategory();
    this.setAttribute('initialized', '');
  }

  disconnectedCallback() {
    mediaQueryLarge.removeEventListener('change', this.#handleMediaQueryChange);
  }

  /**
   * Updates the layout.
   *
   * @param {Event} event
   */
  updateLayout({ target }) {
    if (!(target instanceof HTMLInputElement)) return;

    this.#animateLayoutChange(target.value);
  }

  /**
   * Sets the layout.
   *
   * @param {string} value
   */
  #animateLayoutChange = async (value) => {
    const { grid } = this.refs;

    if (!grid) return;

    await startViewTransition(() => this.#setLayout(value), ['product-grid']);

    requestIdleCallback(() => {
      const viewport = mediaQueryLarge.matches ? 'desktop' : 'mobile';
      sessionStorage.setItem(`product-grid-view-${viewport}`, value);
    });
  };

  /**
   * Animates the layout change.
   *
   * @param {string} value
   */
  #setLayout(value) {
    const { grid } = this.refs;
    if (!grid) return;
    grid.setAttribute('product-grid-view', value);
  }

  /**
   * Handles the media query change event.
   *
   * @param {MediaQueryListEvent} event
   */
  #handleMediaQueryChange = (event) => {
    const targetElement = event.matches
      ? this.querySelector('[data-grid-layout="desktop-default-option"]')
      : this.querySelector('[data-grid-layout="mobile-option"]');

    if (!(targetElement instanceof HTMLInputElement)) return;

    targetElement.checked = true;
    this.#setLayout('default');
  };

  #normalizeCategoryIntro() {
    const pathname = window.location.pathname || '';
    const collectionMatch = pathname.match(/^\/collections\/([^/?#]+)/);
    if (!collectionMatch) return;
    if (collectionMatch[1] === 'all') return;

    const intro = document.querySelector('.trg-collection-intro');
    if (!(intro instanceof HTMLElement)) return;

    const title = intro.querySelector('.trg-collection-intro__title');
    if (title instanceof HTMLElement && /find the right piece/i.test(title.textContent || '')) {
      const titleParagraph = document.createElement('p');
      titleParagraph.textContent = humanizeCollectionHandle(collectionMatch[1]);
      title.replaceChildren(titleParagraph);
    }

    const count = intro.querySelector('.trg-collection-intro__count');
    if (count instanceof HTMLElement) {
      const normalizedCount = (count.textContent || '').replace(/\s+/g, ' ').trim();
      if (/^1 products$/i.test(normalizedCount)) {
        count.textContent = '1 product';
      }
    }
  }

  #normalizeStagedEmptyCategory() {
    const pathname = window.location.pathname || '';
    const collectionMatch = pathname.match(/^\/collections\/([^/?#]+)/);
    if (!collectionMatch) return;
    if (collectionMatch[1] === 'all') return;
    if (this.dataset.trgEmptyBrandCollection === 'true') return;

    const emptyState = this.querySelector('.main-collection-grid__empty');
    const countLabel = this.querySelector('.products-count-wrapper span');
    if (!(emptyState instanceof HTMLElement) || !(countLabel instanceof HTMLElement)) return;

    const renderedCount = Number.parseInt(countLabel.textContent || '', 10);
    if (!Number.isFinite(renderedCount) || renderedCount !== 0) return;

    const liveCatalogCount = this.#extractLiveCatalogCount(emptyState);
    if (!Number.isFinite(liveCatalogCount) || liveCatalogCount < 1 || liveCatalogCount > 12) return;

    ensureStagedEmptyCategoryStyles();
    this.classList.add('trg-plp-body--runtime-staged-empty-category');
    this.dataset.trgStagedEmptyCategoryCollection = 'true';

    const searchSection = document.querySelector('[data-trg-search-bar]')?.closest('.shopify-section');
    if (searchSection instanceof HTMLElement) {
      searchSection.hidden = true;
    }

    const intro = document.querySelector('.trg-collection-intro');
    if (intro instanceof HTMLElement) {
      intro.classList.add('trg-collection-intro--runtime-staged');

      const title = intro.querySelector('.trg-collection-intro__title');
      if (title instanceof HTMLElement && /find the right piece/i.test(title.textContent || '')) {
        const titleParagraph = document.createElement('p');
        titleParagraph.textContent = humanizeCollectionHandle(collectionMatch[1]);
        title.replaceChildren(titleParagraph);
      }

      const count = intro.querySelector('.trg-collection-intro__count');
      if (count instanceof HTMLElement) {
        count.classList.add('trg-collection-intro__count--runtime-hidden');
      }

      let support = intro.querySelector('.trg-collection-intro__support');
      if (!(support instanceof HTMLElement)) {
        const copy = intro.querySelector('.trg-collection-intro__copy');
        if (copy instanceof HTMLElement) {
          support = document.createElement('div');
          support.className = 'trg-collection-intro__support';
          copy.append(support);
        }
      }

      if (support instanceof HTMLElement) {
        let body = support.querySelector('.trg-collection-intro__body');
        if (!(body instanceof HTMLElement)) {
          body = document.createElement('p');
          body.className = 'trg-collection-intro__body trg-collection-intro__body--runtime';
          support.append(body);
        } else {
          body.classList.add('trg-collection-intro__body--runtime');
        }
        body.textContent = `This category is staged for the wider catalog. Browse ${liveCatalogCount} live product${liveCatalogCount === 1 ? '' : 's'} or use the brand directory while products are still being published.`;
      }
    }

    const emptyStateParagraph = emptyState.querySelector('p');
    if (emptyStateParagraph instanceof HTMLElement) {
      emptyStateParagraph.textContent = `Only ${liveCatalogCount} live product${liveCatalogCount === 1 ? '' : 's'} are currently available while the broader catalog is being loaded.`;
    }
  }

  #normalizeSmallLiveCategory() {
    const pathname = window.location.pathname || '';
    const collectionMatch = pathname.match(/^\/collections\/([^/?#]+)/);
    if (!collectionMatch) return;
    if (collectionMatch[1] === 'all') return;
    if (this.dataset.trgEmptyBrandCollection === 'true') return;
    if (this.dataset.trgStagedEmptyCategoryCollection === 'true') return;
    if (document.querySelector('.trg-bch, .brand-banner')) return;

    const renderedCount = this.#extractRenderedProductCount();
    if (!Number.isFinite(renderedCount) || renderedCount < 1 || renderedCount > SMALL_LIVE_CATEGORY_THRESHOLD) return;

    ensureStagedEmptyCategoryStyles();
    this.classList.add('trg-plp-body--runtime-small-live-category');
    this.dataset.trgSmallLiveCategoryCollection = 'true';

    const searchSection = document.querySelector('[data-trg-search-bar]')?.closest('.shopify-section');
    if (searchSection instanceof HTMLElement) {
      searchSection.hidden = true;
    }

    const intro = document.querySelector('.trg-collection-intro');
    if (!(intro instanceof HTMLElement)) return;

    intro.classList.add('trg-collection-intro--runtime-staged');

    const title = intro.querySelector('.trg-collection-intro__title');
    if (title instanceof HTMLElement && /find the right piece/i.test(title.textContent || '')) {
      const titleParagraph = document.createElement('p');
      titleParagraph.textContent = humanizeCollectionHandle(collectionMatch[1]);
      title.replaceChildren(titleParagraph);
    }

    let support = intro.querySelector('.trg-collection-intro__support');
    if (!(support instanceof HTMLElement)) {
      const copy = intro.querySelector('.trg-collection-intro__copy');
      if (copy instanceof HTMLElement) {
        support = document.createElement('div');
        support.className = 'trg-collection-intro__support';
        copy.append(support);
      }
    }

    if (!(support instanceof HTMLElement)) return;

    let body = support.querySelector('.trg-collection-intro__body');
    if (!(body instanceof HTMLElement)) {
      body = document.createElement('p');
      body.className = 'trg-collection-intro__body trg-collection-intro__body--runtime';
      support.append(body);
    } else {
      body.classList.add('trg-collection-intro__body--runtime');
    }

    if ((body.textContent || '').trim() === '') {
      body.textContent = `This category currently has ${renderedCount} live product${renderedCount === 1 ? '' : 's'} while the broader assortment is still being staged.`;
    }
  }

  #extractRenderedProductCount() {
    const countSources = [
      this.querySelector('.products-count-wrapper span'),
      document.querySelector('.trg-collection-intro__count')
    ];

    for (const source of countSources) {
      if (!(source instanceof HTMLElement)) continue;
      const match = (source.textContent || '').match(/(\d+)/);
      if (match) {
        return Number.parseInt(match[1], 10);
      }
    }

    return Number.NaN;
  }

  #extractLiveCatalogCount(emptyState) {
    const ctaText = emptyState.querySelector('.main-collection-grid__empty-button')?.textContent || '';
    const ctaMatch = ctaText.match(/(\d+)/);
    if (ctaMatch) {
      return Number.parseInt(ctaMatch[1], 10);
    }

    const bodyMatch = (emptyState.textContent || '').match(/only\s+(\d+)\s+live/i);
    if (bodyMatch) {
      return Number.parseInt(bodyMatch[1], 10);
    }

    return Number.NaN;
  }
}

if (!customElements.get('results-list')) {
  customElements.define('results-list', ResultsList);
}
