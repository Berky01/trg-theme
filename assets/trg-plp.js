// TRG PLP DOM Controller â€” split-layout, gallery, and swatch runtime
// CSS is in trg-plp.css. This file owns shared collection/search PLP behavior.
(function () {
  if (window.__trg_plp_ready) return;
  window.__trg_plp_ready = true;

  var CARD_IMAGE_WIDTHS = [200, 300, 400, 500, 600, 700, 800];
  var GALLERY_SELECTOR = '.trg-plp-body .card-gallery';
  var VARIANT_SLIDE_SELECTOR = 'slideshow-slide[variant-image]';
  var PRODUCT_CROP_CONFIG = {
    '10280187527447': { scale: '1.28', origin: '48% 57%' },
    '10280187330839': { scale: '1.46', origin: '52% 63%' },
    '10280088535319': { scale: '1.36', origin: '51% 59%' }
  };
  var observedGalleries = new WeakSet();

  ['trg-pcf', 'trg-pcf-v2', 'trg-plp-card-fix-css', 'trg-plp-master', 'trg-plp-v7', 'trg-plp-v8'].forEach(
    function (id) {
      var el = document.getElementById(id);
      if (el) el.remove();
    }
  );

  function ensureRuntimeStyles() {
    if (document.getElementById('trg-plp-runtime-hotfix')) return;
    var target = document.head || document.documentElement;
    if (!target) return;

    var style = document.createElement('style');
    style.id = 'trg-plp-runtime-hotfix';
    style.textContent =
      '.trg-plp-body .card-gallery{display:block!important;width:100%!important;background:#fff!important;}' +
      '.trg-plp-body .card-gallery.trg-plp-gallery--static slideshow-arrows,' +
      '.trg-plp-body .card-gallery.trg-plp-gallery--static slideshow-thumbnails,' +
      '.trg-plp-body .card-gallery.trg-plp-gallery--static slideshow-bullets{display:none!important;}' +
      '.trg-plp-body .card-gallery a.contents,' +
      '.trg-plp-body .card-gallery slideshow-component,' +
      '.trg-plp-body .card-gallery slideshow-container,' +
      '.trg-plp-body .card-gallery slideshow-slides,' +
      '.trg-plp-body .card-gallery slideshow-slide,' +
      '.trg-plp-body .card-gallery .product-media-container,' +
      '.trg-plp-body .card-gallery .product-media{display:block!important;width:100%!important;max-width:100%!important;min-width:100%!important;}' +
      '.trg-plp-body .card-gallery slideshow-component,' +
      '.trg-plp-body .card-gallery slideshow-container,' +
      '.trg-plp-body .card-gallery slideshow-slides,' +
      '.trg-plp-body .card-gallery slideshow-slide,' +
      '.trg-plp-body .card-gallery .product-media-container{display:block!important;flex:0 0 100%!important;min-width:100%!important;height:100%!important;min-height:100%!important;aspect-ratio:unset!important;}' +
      '.trg-plp-body .card-gallery .product-media{background:#fff!important;box-sizing:border-box!important;width:100%!important;height:100%!important;aspect-ratio:unset!important;overflow:hidden!important;}' +
      '.trg-plp-body .card-gallery.trg-plp-gallery--static slideshow-slides{overflow:hidden!important;scroll-snap-type:none!important;scroll-behavior:auto!important;scrollbar-width:none!important;}' +
      '.trg-plp-body .card-gallery.trg-plp-gallery--static slideshow-slides::-webkit-scrollbar{display:none!important;}' +
      '.trg-plp-body .card-gallery.trg-plp-gallery--static slideshow-component{display:block!important;width:100%!important;}' +
      '.trg-plp-body .card-gallery.trg-plp-gallery--static slideshow-component[infinite]{pointer-events:none!important;}' +
      '.trg-plp-body .card-gallery.trg-plp-gallery--static slideshow-slide:first-child{display:block!important;width:100%!important;}' +
      '.trg-plp-body .card-gallery.trg-plp-gallery--static slideshow-slide:not(:first-child){display:none!important;}';
    target.appendChild(style);
  }

  ensureRuntimeStyles();

  function toResponsiveAssetUrl(url, width) {
    if (!url) return '';

    try {
      var parsed = new URL(url, window.location.origin);
      if (width) {
        parsed.searchParams.set('width', String(width));
      } else {
        parsed.searchParams.delete('width');
      }
      return parsed.toString();
    } catch (_) {
      var clean = String(url).replace(/([?&])width=\d+(&|$)/, '$1').replace(/[?&]$/, '');
      if (!width) return clean;
      return clean + (clean.indexOf('?') === -1 ? '?' : '&') + 'width=' + width;
    }
  }

  function buildResponsiveSrcset(url) {
    if (!url) return '';
    return CARD_IMAGE_WIDTHS.map(function (width) {
      return toResponsiveAssetUrl(url, width) + ' ' + width + 'w';
    }).join(', ');
  }

  function escapeInlineUrl(url) {
    return String(url || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }

  function collectGalleries(root) {
    var galleries = [];
    if (root instanceof HTMLElement && root.matches(GALLERY_SELECTOR)) {
      galleries.push(root);
    }
    if (root && typeof root.querySelectorAll === 'function') {
      galleries = galleries.concat(Array.from(root.querySelectorAll(GALLERY_SELECTOR)));
    }
    return galleries;
  }

  function unhideVariantSlides(root) {
    if (!root || typeof root.querySelectorAll !== 'function') return;
    Array.from(root.querySelectorAll(VARIANT_SLIDE_SELECTOR + '[hidden]')).forEach(function (slide) {
      slide.removeAttribute('hidden');
    });
  }

  function freezeStaticGallery(gallery) {
    if (!(gallery instanceof HTMLElement)) return;

    gallery.classList.add('trg-plp-gallery--static');
    gallery.setAttribute('data-skip-subtree-update', '');

    var slideshow = gallery.querySelector('slideshow-component');
    var scroller = gallery.querySelector('slideshow-slides');
    var arrows = gallery.querySelector('slideshow-arrows');

    if (slideshow instanceof HTMLElement) {
      slideshow.setAttribute('disabled', 'true');
      slideshow.setAttribute('initial-slide', '0');
    }

    if (scroller instanceof HTMLElement) {
      scroller.scrollLeft = 0;
    }

    if (arrows instanceof HTMLElement) {
      arrows.setAttribute('hidden', 'hidden');
    }

    Array.from(gallery.querySelectorAll('slideshow-slide')).forEach(function (slide, index) {
      if (!(slide instanceof HTMLElement)) return;
      if (index === 0) {
        slide.removeAttribute('hidden');
        slide.setAttribute('aria-hidden', 'false');
        return;
      }
      slide.setAttribute('hidden', 'hidden');
      slide.setAttribute('aria-hidden', 'true');
    });
  }

  function applyGalleryCrop(gallery) {
    if (!(gallery instanceof HTMLElement)) return;

    var img = gallery.querySelector('img');
    if (!(img instanceof HTMLImageElement)) return;

    var crop = PRODUCT_CROP_CONFIG[gallery.getAttribute('data-product-id') || ''];
    if (!crop) {
      img.style.removeProperty('transform');
      img.style.removeProperty('transform-origin');
      return;
    }

    img.style.setProperty('transform', 'scale(' + crop.scale + ')', 'important');
    img.style.setProperty('transform-origin', crop.origin, 'important');
  }

  var galleryMorphGuard = { active: false, fixCount: 0, lastFixTime: 0 };
  document.addEventListener('shopify:section:load', function () {
    galleryMorphGuard.active = true;
    requestAnimationFrame(function () { galleryMorphGuard.active = false; });
  });

  var galleryMutationObserver = new MutationObserver(function (mutations) {
    if (galleryMorphGuard.active) return;
    var now = Date.now();
    if (now - galleryMorphGuard.lastFixTime < 1000) {
      galleryMorphGuard.fixCount++;
      if (galleryMorphGuard.fixCount > 3) return;
    } else {
      galleryMorphGuard.fixCount = 0;
    }
    galleryMorphGuard.lastFixTime = now;

    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'hidden') {
        var target = mutation.target;
        if (target instanceof Element && target.matches(VARIANT_SLIDE_SELECTOR) && target.hasAttribute('hidden')) {
          target.removeAttribute('hidden');
        }
        return;
      }

      Array.from(mutation.addedNodes || []).forEach(function (node) {
        if (!(node instanceof Element)) return;
        unhideVariantSlides(node);
        collectGalleries(node).forEach(function (gallery) {
          setupGallery(gallery);
        });
      });
    });
  });

  function setupGallery(gallery) {
    if (!(gallery instanceof HTMLElement)) return;

    freezeStaticGallery(gallery);
    unhideVariantSlides(gallery);
    applyGalleryCrop(gallery);

    if (!observedGalleries.has(gallery)) {
      observedGalleries.add(gallery);
      galleryMutationObserver.observe(gallery, {
        attributes: true,
        attributeFilter: ['hidden'],
        childList: true,
        subtree: true
      });
    }

  }

  function prepareCardMedia(root) {
    collectGalleries(root || document).forEach(setupGallery);
  }

  function syncCardLinks(card, pdpUrl) {
    if (!(card instanceof HTMLElement) || !pdpUrl) return;

    var clickDiv = card.querySelector('[onclick*="location.href"]');
    if (clickDiv instanceof HTMLElement) {
      clickDiv.setAttribute('onclick', "location.href='" + escapeInlineUrl(pdpUrl) + "'");
      clickDiv.dataset.url = pdpUrl;
    }

    Array.from(card.querySelectorAll('a[href*="/products/"]')).forEach(function (anchor) {
      anchor.href = pdpUrl;
    });
  }

  function syncCardImage(card, imageUrl) {
    if (!(card instanceof HTMLElement) || !imageUrl) return;

    var gallery = card.querySelector('.card-gallery');
    if (!(gallery instanceof HTMLElement)) return;

    var img = gallery.querySelector('img');
    if (!(img instanceof HTMLImageElement)) return;

    var srcset = buildResponsiveSrcset(imageUrl);
    var src = toResponsiveAssetUrl(imageUrl, 600);
    var picture = img.closest ? img.closest('picture') : null;

    if (picture instanceof HTMLElement) {
      Array.from(picture.querySelectorAll('source')).forEach(function (source) {
        source.setAttribute('srcset', srcset);
      });
    }

    if (srcset) img.srcset = srcset;
    if (src) img.src = src;
    img.removeAttribute('loading');

    freezeStaticGallery(gallery);
    prepareCardMedia(gallery);
  }

  function handleColourSwatchClick(swatch) {
    var card = swatch.closest('.product-grid__item');
    if (!(card instanceof HTMLElement)) return;

    var imageUrl = (swatch.dataset.trgColourImage || '').trim();
    var pdpUrl = (swatch.dataset.trgColourUrl || '').trim();

    Array.from(card.querySelectorAll('.trg-plp-card-colour')).forEach(function (button) {
      button.classList.remove('is-active');
    });
    swatch.classList.add('is-active');

    if (imageUrl) syncCardImage(card, imageUrl);
    if (pdpUrl) syncCardLinks(card, pdpUrl);
  }

  function handleSwatchClick(event) {
    var target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    var swatch = target.closest('.trg-plp-card-colour');
    if (!(swatch instanceof HTMLElement)) return;
    if (!(swatch.closest('.trg-plp-body') instanceof HTMLElement)) return;

    event.preventDefault();
    handleColourSwatchClick(swatch);
  }

  function syncSort(controls) {
    if (!(controls instanceof HTMLElement)) return;

    var legacySort = controls.querySelector(':scope > sorting-filter-component.sorting-filter');
    var sortShell = controls.querySelector(':scope > .trg-plp-sort-shell');
    var sortSelect = sortShell ? sortShell.querySelector('[data-trg-plp-sort]') : null;
    var sourceSelect = legacySort
      ? legacySort.querySelector('select[name="sort_by"]')
      : controls.querySelector('select[name="sort_by"]');

    if (!(sortSelect instanceof HTMLSelectElement)) {
      if (!(sourceSelect instanceof HTMLSelectElement)) return;

      sortShell = document.createElement('div');
      sortShell.className = 'trg-plp-sort-shell';

      var label = document.createElement('label');
      label.className = 'visually-hidden';
      label.setAttribute('for', 'TrgPlpSortLegacyBridge');
      label.textContent = 'Sort';

      sortSelect = document.createElement('select');
      sortSelect.id = 'TrgPlpSortLegacyBridge';
      sortSelect.className = 'trg-plp-sort-select';
      sortSelect.setAttribute('data-trg-plp-sort', '');
      sortSelect.setAttribute('aria-label', 'Sort');

      sortShell.appendChild(label);
      sortShell.appendChild(sortSelect);
      controls.appendChild(sortShell);
    }

    if (sourceSelect instanceof HTMLSelectElement) {
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
    }

    if (legacySort instanceof HTMLElement) {
      legacySort.style.display = 'none';
      legacySort.hidden = true;
      legacySort.setAttribute('aria-hidden', 'true');
    }
  }

  function repairToolbar(cw) {
    var main = cw.querySelector(':scope > .trg-plp-main-column');
    if (!(main instanceof HTMLElement)) return;

    var controls = main.querySelector(':scope > .trg-collection-controls');
    if (!(controls instanceof HTMLElement)) return;

    Array.from(controls.children).forEach(function (child) {
      if (!(child instanceof HTMLElement)) return;
      if (child.matches('style[data-shopify], .main-collection-grid')) {
        child.setAttribute('data-skip-node-update', '');
        child.setAttribute('data-skip-subtree-update', '');
      }
    });

    var showButton = controls.querySelector(':scope > .trg-plp-show-filters-btn');
    if (showButton instanceof HTMLButtonElement) {
      var isMobile = window.matchMedia('(max-width: 989px)').matches;
      var shouldShow = isMobile || document.body.classList.contains('filters-hidden');
      showButton.hidden = !shouldShow;
      if (shouldShow) {
        showButton.removeAttribute('aria-hidden');
      } else {
        showButton.setAttribute('aria-hidden', 'true');
      }
      showButton.setAttribute('aria-label', isMobile ? 'Filters' : 'Show filters');
    }

    controls.querySelectorAll('.facets--filters-title, .trg-collection-controls__active-filters, .facets-remove').forEach(
      function (node) {
        if (!(node instanceof HTMLElement)) return;
        node.style.display = 'none';
        node.setAttribute('aria-hidden', 'true');
        node.setAttribute('data-skip-node-update', '');
      }
    );

    syncSort(controls);
  }

  function repairSidebar(cw) {
    var sidebar = cw.querySelector(':scope > .trg-plp-sidebar-column .facets--vertical');
    if (!(sidebar instanceof HTMLElement)) {
      sidebar = cw.querySelector(':scope > .facets-block-wrapper--vertical .facets--vertical');
    }
    if (!(sidebar instanceof HTMLElement)) return;

    var availabilityItem = sidebar.querySelector(".facets__item[data-filter-param-name='filter-v-availability']");
    if (!(availabilityItem instanceof HTMLElement)) return;

    var hasActiveAvailability = !!availabilityItem.querySelector('input:checked');
    availabilityItem.style.display = hasActiveAvailability ? '' : 'none';
  }

  function fix() {
    var cw = document.querySelector('.trg-plp-body .collection-wrapper');
    if (cw) {
      var isMobile = window.matchMedia('(max-width: 989px)').matches;
      var facetsToggle = cw.querySelector(':scope > .facets-toggle');
      if (facetsToggle && !isMobile) {
        facetsToggle.style.display = 'none';
        facetsToggle.setAttribute('aria-hidden', 'true');
        facetsToggle.setAttribute('data-skip-node-update', '');
      }

      var dialog = cw.querySelector(':scope > dialog-component');
      if (dialog instanceof HTMLElement) {
        dialog.style.removeProperty('display');
      }

      repairToolbar(cw);
      repairSidebar(cw);
      prepareCardMedia(cw);
      return;
    }

    prepareCardMedia(document);
  }

  /* Phase 10: single fix() + debounced MutationObserver replaces 5x setTimeout cascade */
  fix();

  var cw = document.querySelector('.trg-plp-body .collection-wrapper');
  if (cw) {
    var fixTimer = null;
    var fixRunCount = 0;
    var fixRunWindow = 0;
    new MutationObserver(function () {
      if (fixTimer) clearTimeout(fixTimer);
      var now = Date.now();
      if (now - fixRunWindow < 1000) {
        fixRunCount++;
        if (fixRunCount > 3) return;
      } else {
        fixRunCount = 0;
        fixRunWindow = now;
      }
      fixTimer = setTimeout(fix, 200);
    }).observe(cw, { childList: true, subtree: true });
  }

  document.addEventListener('shopify:section:load', function (event) {
    setTimeout(function () {
      fix();
      prepareCardMedia((event && event.target) || document);
    }, 100);
  });
  document.addEventListener(
    'click',
    function (event) {
      if (event.target instanceof Element && event.target.closest('[data-trg-plp-filter-toggle]')) {
        setTimeout(fix, 0);
        setTimeout(fix, 100);
      }
    },
    true
  );
  document.addEventListener('click', handleSwatchClick);
})();
