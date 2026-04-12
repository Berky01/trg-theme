/**
 * TRG PDP Enhancements -- v2
 * 1. Thumbnail + chip handlers with color group awareness
 * 2. Gallery arrows + touch swipe
 * 3. Universal description parser
 * 4. Color group switching: gallery filter, buy URL swap, price update
 */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     1. THUMBNAIL + CHIP HANDLERS
     ═══════════════════════════════════════════ */
  var thumbs = document.querySelectorAll('.trg-pdp__thumb[data-src]');
  var galleryImg = document.getElementById('trg-gallery-img');
  var currentIndex = 0;
  var images = [];

  thumbs.forEach(function (thumb, i) {
    images.push({ src: thumb.dataset.src, alt: thumb.dataset.alt || '' });
    thumb.addEventListener('click', function () {
      goToImage(i);
    });
  });

  var allImages = images.slice();
  var allThumbs = Array.prototype.slice.call(thumbs);
  var activeColorFilter = null;
  var priceEl = document.querySelector('.trg-pdp__price');
  var priceCaEl = document.querySelector('.trg-pdp__price-ca');
  var productData = parseProductData();
  var colorGroups = (productData && Array.isArray(productData.colorGroups)) ? productData.colorGroups : [];
  var variantMediaMode = (productData && productData.variantMediaMode) ? productData.variantMediaMode : '';
  var baseBuyUrl = (productData && productData.buyUrl) ? productData.buyUrl : null;
  var optionNames = productData && Array.isArray(productData.options) ? productData.options : [];
  var colourOptionIndex = optionNames.findIndex(function (name) { return /colou?r/i.test(name || ''); });
  var chips = Array.prototype.slice.call(document.querySelectorAll('.trg-pdp__chip[data-option-index], .trg-pdp__chip[data-trg-grouped-colour="true"]'));
  var chipsByOption = {};
  var groupedColourChips = [];
  var selectedOptions = [];
  var currentVariant = null;
  var lastDispatchedColour = null;

  chips.forEach(function (chip) {
    if (chip.dataset.trgGroupedColour === 'true') {
      groupedColourChips.push(chip);
      chip.addEventListener('click', function () {
        handleChipClick(chip);
      });
      return;
    }
    var optionIndex = parseInt(chip.dataset.optionIndex, 10);
    if (!chipsByOption[optionIndex]) chipsByOption[optionIndex] = [];
    chipsByOption[optionIndex].push(chip);
    chip.addEventListener('click', function () {
      handleChipClick(chip);
    });
  });

  initializeVariantState();

  function parseProductData() {
    var node = document.getElementById('trg-pdp-product-data');
    if (!node) return null;
    try {
      return JSON.parse(node.textContent);
    } catch (err) {
      console.warn('[TRG] Could not parse product data:', err);
      return null;
    }
  }

  /* ── Color group lookup ── */

  function findColorGroup(colorName) {
    if (!colorName || !colorGroups.length) return null;
    var lower = colorName.toLowerCase();
    for (var i = 0; i < colorGroups.length; i++) {
      var g = colorGroups[i];
      var raw = (g.color_raw || '').toLowerCase();
      var norm = (g.color_normalized || '').toLowerCase();
      if (raw === lower || norm === lower) return g;
    }
    return null;
  }

  /* ── Initialization ── */

  function initializeVariantState() {
    var hasVariants = productData && Array.isArray(productData.variants) && productData.variants.length > 0;

    if (!hasVariants && colorGroups.length > 1) {
      initColorGroupOnly();
      return;
    }

    if (!hasVariants) {
      applyRequestedColourFallback();
      return;
    }

    var baseVariant = getRequestedVariant() || findVariantById(productData.selectedVariantId) || firstAvailableVariant();
    if (!baseVariant) {
      applyRequestedColourFallback();
      return;
    }

    selectedOptions = variantToOptions(baseVariant);

    var requestedColor = getRequestedColor();
    if (requestedColor && colourOptionIndex >= 0) {
      selectedOptions[colourOptionIndex] = requestedColor;
    }

    var resolvedVariant = resolveVariant(null) || baseVariant;
    applyVariantState(resolvedVariant, { syncUrl: false, dispatchColour: true });
  }

  function initColorGroupOnly() {
    var requestedColor = getRequestedColor();
    var targetGroup = null;

    if (requestedColor) {
      targetGroup = findColorGroup(requestedColor);
    }
    if (!targetGroup) {
      targetGroup = colorGroups[0];
    }

    applyColorGroupState(targetGroup, { syncUrl: !!requestedColor, dispatchColour: true });
  }

  function applyRequestedColourFallback() {
    try {
      var requestedColor = getRequestedColor();
      if (!requestedColor) return;
      var preferredChip = groupedColourChips.find(function (chip) {
        var colorVal = chip.dataset.trgShopifyOptionValue || chip.dataset.value || chip.textContent.trim();
        return colorVal && colorVal.toLowerCase() === requestedColor.toLowerCase();
      });
      if (!preferredChip && colourOptionIndex >= 0) {
        preferredChip = Array.prototype.slice.call(document.querySelectorAll('.trg-pdp__chip[data-option-index="' + colourOptionIndex + '"]')).find(function (chip) {
          var colorVal = chip.dataset.value || chip.textContent.trim();
          return colorVal && colorVal.toLowerCase() === requestedColor.toLowerCase();
        });
      }
      if (!preferredChip) {
        preferredChip = Array.prototype.slice.call(document.querySelectorAll('.trg-pdp__chip[data-option-index="0"]')).find(function (chip) {
          var colorVal = chip.dataset.value || chip.textContent.trim();
          return colorVal && colorVal.toLowerCase() === requestedColor.toLowerCase();
        });
      }
      if (preferredChip) handleChipClick(preferredChip);
    } catch (err) {
      console.warn('[TRG] Could not apply trg_color preselect:', err);
    }
  }

  function getRequestedVariant() {
    try {
      var variantParam = new URLSearchParams(window.location.search).get('variant');
      return variantParam ? findVariantById(variantParam) : null;
    } catch (err) {
      return null;
    }
  }

  function getRequestedColor() {
    try {
      return new URLSearchParams(window.location.search).get('trg_color');
    } catch (err) {
      return null;
    }
  }

  /* ── Chip click ── */

  function handleChipClick(chip) {
    if (!chip) return;
    if (chip.disabled || chip.classList.contains('is-unavailable')) return;

    if (chip.dataset.trgGroupedColour === 'true') {
      handleGroupedColourChip(chip);
      return;
    }

    var optionIndex = parseInt(chip.dataset.optionIndex, 10);
    var optionValue = chip.dataset.value || chip.textContent.trim();
    var hasVariants = productData && Array.isArray(productData.variants) && productData.variants.length > 0;

    /* Color chip on a color-group-only product (no native variants) */
    if (!hasVariants && optionIndex === 0 && colorGroups.length > 1) {
      var group = findColorGroup(optionValue);
      if (group) {
        applyColorGroupState(group, { syncUrl: true, dispatchColour: true });
        return;
      }
    }

    /* Fallback: no product data at all */
    if (!hasVariants) {
      var parent = chip.closest('.trg-pdp__chips');
      if (parent) {
        parent.querySelectorAll('.trg-pdp__chip').forEach(function (sibling) {
          sibling.classList.remove('active');
        });
      }
      chip.classList.add('active');
      if (optionIndex === 0) filterGalleryByColor(optionValue);
      return;
    }

    /* Normal variant-aware path */
    selectedOptions[optionIndex] = optionValue;
    var resolvedVariant = resolveVariant(optionIndex);
    if (!resolvedVariant) return;
    applyVariantState(resolvedVariant, { syncUrl: true, dispatchColour: true });
  }

  function handleGroupedColourChip(chip) {
    var hasVariants = productData && Array.isArray(productData.variants) && productData.variants.length > 0;
    var colorValue = chip.dataset.trgShopifyOptionValue || chip.dataset.value || chip.textContent.trim();
    var localVariantId = chip.dataset.trgShopifyVariantId || '';

    if (!hasVariants) {
      var group = findColorGroup(colorValue);
      if (group) {
        applyColorGroupState(group, { syncUrl: true, dispatchColour: true });
      }
      return;
    }

    var resolvedVariant = resolveGroupedColourVariant(colorValue, localVariantId);
    if (resolvedVariant) {
      if (colourOptionIndex >= 0 && colorValue) {
        selectedOptions[colourOptionIndex] = colorValue;
      }
      applyVariantState(resolvedVariant, { syncUrl: true, dispatchColour: true });
      return;
    }

    var fallbackGroup = findColorGroup(colorValue);
    if (fallbackGroup) {
      applyColorGroupState(fallbackGroup, { syncUrl: true, dispatchColour: true });
    }
  }

  /* ── Color-group-only state (no native Color variants) ── */

  function applyColorGroupState(group, options) {
    if (!group) return;

    var colorName = group.color_raw || group.color_normalized || '';

    /* Sync active chip */
    var colorChips = chipsByOption[0] || [];
    colorChips.forEach(function (chip) {
      var chipVal = chip.dataset.value || chip.textContent.trim();
      chip.classList.toggle('active', chipVal.toLowerCase() === colorName.toLowerCase());
    });

    /* Gallery */
    filterGalleryByColor(colorName);

    /* Price */
    syncColorGroupPrice(group);

    /* Buy URL */
    syncBuyUrl(group);

    /* URL param */
    if (options && options.syncUrl) {
      syncColorUrlParam(colorName);
    }

    /* Colour guide module */
    if (options && options.dispatchColour) {
      if (colorName !== lastDispatchedColour) {
        lastDispatchedColour = colorName;
        syncGuideModule(colorName);
        window.dispatchEvent(new CustomEvent('trg-swatch-change', {
          detail: { name: colorName, variantId: group.first_variant_id || null }
        }));
      }
    }
  }

  /* ── Variant resolution ── */

  function resolveVariant(changedOptionIndex) {
    if (!productData || !Array.isArray(productData.variants) || productData.variants.length === 0) return null;

    var requiredIndices = [];
    if (colourOptionIndex >= 0 && selectedOptions[colourOptionIndex]) requiredIndices.push(colourOptionIndex);
    if (
      changedOptionIndex !== null &&
      changedOptionIndex !== undefined &&
      selectedOptions[changedOptionIndex] &&
      requiredIndices.indexOf(changedOptionIndex) === -1
    ) {
      requiredIndices.push(changedOptionIndex);
    }

    var scopedMatch = pickBestVariant(productData.variants.filter(function (variant) {
      return requiredIndices.every(function (index) {
        return variantOptionValue(variant, index) === selectedOptions[index];
      });
    }));

    return scopedMatch || pickBestVariant(productData.variants);
  }

  function pickBestVariant(candidates) {
    if (!candidates || candidates.length === 0) return null;

    var ranked = candidates
      .slice()
      .sort(function (a, b) {
        return scoreVariant(b) - scoreVariant(a);
      });

    return ranked[0] || null;
  }

  function scoreVariant(variant) {
    var score = variant.available ? 1000 : 0;

    selectedOptions.forEach(function (value, index) {
      if (!value) return;
      if (variantOptionValue(variant, index) === value) {
        score += 25;
      }
    });

    return score;
  }

  /* ── Apply variant state (products with native variants) ── */

  function applyVariantState(variant, options) {
    if (!variant) return;

    currentVariant = variant;
    selectedOptions = variantToOptions(variant);

    syncActiveChips();
    syncChipAvailability();
    syncColourPresentation();

    /* Price: prefer color group price, fall back to variant price */
    var selectedColour = colourOptionIndex >= 0 ? selectedOptions[colourOptionIndex] : null;
    var group = selectedColour ? findColorGroup(selectedColour) : null;
    if (group) {
      syncColorGroupPrice(group);
      syncBuyUrl(group);
    } else {
      syncPrice(variant);
    }

    if (options && options.syncUrl) {
      syncUrlState(variant);
    }

    if (options && options.dispatchColour) {
      dispatchColourChange();
    }
  }

  function syncActiveChips() {
    Object.keys(chipsByOption).forEach(function (key) {
      var optionIndex = parseInt(key, 10);
      (chipsByOption[key] || []).forEach(function (chip) {
        var chipValue = chip.dataset.value || chip.textContent.trim();
        chip.classList.toggle('active', selectedOptions[optionIndex] === chipValue);
      });
    });

    groupedColourChips.forEach(function (chip) {
      var chipValue = chip.dataset.trgShopifyOptionValue || chip.dataset.value || chip.textContent.trim();
      var chipVariantId = chip.dataset.trgShopifyVariantId || '';
      var isActive = false;
      if (colourOptionIndex >= 0 && selectedOptions[colourOptionIndex]) {
        isActive = selectedOptions[colourOptionIndex] === chipValue;
      }
      if (!isActive && chipVariantId && currentVariant && String(currentVariant.id) === String(chipVariantId)) {
        isActive = true;
      }
      chip.classList.toggle('active', isActive);
    });
  }

  function syncChipAvailability() {
    Object.keys(chipsByOption).forEach(function (key) {
      var optionIndex = parseInt(key, 10);
      (chipsByOption[key] || []).forEach(function (chip) {
        var nextSelections = selectedOptions.slice();
        nextSelections[optionIndex] = chip.dataset.value || chip.textContent.trim();
        var available = productData.variants.some(function (variant) {
          if (!variant.available) return false;
          return nextSelections.every(function (value, index) {
            return !value || variantOptionValue(variant, index) === value;
          });
        });

        chip.disabled = !available;
        chip.setAttribute('aria-disabled', available ? 'false' : 'true');
        chip.classList.toggle('is-unavailable', !available);
      });
    });

    groupedColourChips.forEach(function (chip) {
      var chipValue = chip.dataset.trgShopifyOptionValue || chip.dataset.value || chip.textContent.trim();
      var available = true;

      if (colourOptionIndex >= 0 && productData && Array.isArray(productData.variants)) {
        var nextSelections = selectedOptions.slice();
        nextSelections[colourOptionIndex] = chipValue;
        available = productData.variants.some(function (variant) {
          if (!variant.available) return false;
          return nextSelections.every(function (value, index) {
            return !value || index === colourOptionIndex || variantOptionValue(variant, index) === value;
          }) && variantOptionValue(variant, colourOptionIndex) === chipValue;
        });
      }

      chip.disabled = !available;
      chip.setAttribute('aria-disabled', available ? 'false' : 'true');
      chip.classList.toggle('is-unavailable', !available);
    });
  }

  /* ── Price sync ── */

  function syncPrice(variant) {
    if (priceEl && typeof variant.price === 'number') {
      var formattedPrice = formatMoney(variant.price);
      if (formattedPrice) priceEl.textContent = formattedPrice;
    }

    if (priceCaEl && typeof variant.price === 'number') {
      var estimatedCad = Math.floor((variant.price / 100) * 1.37);
      priceCaEl.textContent = '~CA$' + estimatedCad;
    }
  }

  function syncColorGroupPrice(group) {
    if (!group || group.price === null || group.price === undefined) return;
    var cents = parseFloat(group.price);
    if (isNaN(cents) || cents <= 0) return;
    /* Color group prices from FM are in dollars (not cents) */
    var dollars = cents;
    if (priceEl) priceEl.textContent = '$' + Math.floor(dollars);
    if (priceCaEl) priceCaEl.textContent = '~CA$' + Math.floor(dollars * 1.37);
  }

  /* ── Buy URL sync ── */

  function syncBuyUrl(group) {
    if (!group) return;
    var url = group.url || baseBuyUrl;
    if (!url) return;

    var primaryLinks = document.querySelectorAll('.trg-pdp__market--us .trg-pdp__btn-primary');
    primaryLinks.forEach(function (link) {
      link.href = url;
    });
  }

  /* ── Gallery + colour presentation ── */

  function syncColourPresentation() {
    var selectedColour = colourOptionIndex >= 0 ? selectedOptions[colourOptionIndex] : null;
    if (!selectedColour && currentVariant && groupedColourChips.length) {
      var matchedChip = groupedColourChips.find(function (chip) {
        return chip.dataset.trgShopifyVariantId && String(chip.dataset.trgShopifyVariantId) === String(currentVariant.id);
      });
      if (matchedChip) {
        selectedColour = matchedChip.dataset.trgShopifyOptionValue || matchedChip.dataset.value || matchedChip.textContent.trim();
      }
    }

    if (selectedColour) {
      filterGalleryByColor(selectedColour);
    } else {
      resetGallery();
    }
  }

  /* ── URL state ── */

  function syncUrlState(variant) {
    if (!window.history || !window.history.replaceState) return;

    try {
      var url = new URL(window.location.href);
      if (variant && variant.id) {
        url.searchParams.set('variant', String(variant.id));
      }

      if (colourOptionIndex >= 0 && selectedOptions[colourOptionIndex]) {
        url.searchParams.set('trg_color', selectedOptions[colourOptionIndex]);
      } else {
        url.searchParams.delete('trg_color');
      }

      window.history.replaceState({}, '', url.toString());
    } catch (err) {
      console.warn('[TRG] Could not sync PDP URL state:', err);
    }
  }

  function syncColorUrlParam(colorName) {
    if (!window.history || !window.history.replaceState) return;
    try {
      var url = new URL(window.location.href);
      if (colorName) {
        url.searchParams.set('trg_color', colorName);
      } else {
        url.searchParams.delete('trg_color');
      }
      window.history.replaceState({}, '', url.toString());
    } catch (err) {}
  }

  /* ── Colour change dispatch ── */

  function dispatchColourChange() {
    var selectedColour = colourOptionIndex >= 0 ? selectedOptions[colourOptionIndex] : null;
    if (!selectedColour && currentVariant && groupedColourChips.length) {
      var matchedChip = groupedColourChips.find(function (chip) {
        return chip.dataset.trgShopifyVariantId && String(chip.dataset.trgShopifyVariantId) === String(currentVariant.id);
      });
      if (matchedChip) {
        selectedColour = matchedChip.dataset.trgShopifyOptionValue || matchedChip.dataset.value || matchedChip.textContent.trim();
      }
    }
    if (!selectedColour) return;
    if (selectedColour === lastDispatchedColour) return;

    lastDispatchedColour = selectedColour;

    syncGuideModule(selectedColour);
    window.dispatchEvent(new CustomEvent('trg-swatch-change', {
      detail: { name: selectedColour, variantId: currentVariant && currentVariant.id ? currentVariant.id : null }
    }));
  }

  function syncGuideModule(colourName) {
    var guideModule = document.querySelector('.pdp-guide-module');
    if (!guideModule || !colourName) return;

    guideModule.setAttribute('data-colour', colourName);

    var hiddenColour = document.getElementById('ctl-colour-name');
    if (hiddenColour) hiddenColour.textContent = colourName;

    var guideTitleEm = guideModule.querySelector('.pdp-guide-title em');
    if (guideTitleEm) guideTitleEm.textContent = colourName;

    var guideSubStrong = guideModule.querySelector('.pdp-guide-sub strong');
    if (guideSubStrong) guideSubStrong.textContent = colourName;
  }

  /* ── Variant helpers ── */

  function findVariantById(id) {
    if (!id || !productData || !Array.isArray(productData.variants)) return null;
    var idString = String(id);
    return productData.variants.find(function (variant) {
      return String(variant.id) === idString;
    }) || null;
  }

  function firstAvailableVariant() {
    return productData.variants.find(function (variant) { return !!variant.available; }) || productData.variants[0] || null;
  }

  function resolveGroupedColourVariant(colorValue, localVariantId) {
    var preferredVariant = localVariantId ? findVariantById(localVariantId) : null;
    if (colourOptionIndex < 0) {
      return preferredVariant || firstAvailableVariant();
    }

    var requestedSelections = selectedOptions.slice();
    requestedSelections[colourOptionIndex] = colorValue;
    var colorMatches = productData.variants.filter(function (variant) {
      return variantOptionValue(variant, colourOptionIndex) === colorValue;
    });
    var retainedMatch = pickBestVariant(colorMatches.filter(function (variant) {
      return requestedSelections.every(function (value, index) {
        return !value || index === colourOptionIndex || variantOptionValue(variant, index) === value;
      });
    }));

    return retainedMatch || preferredVariant || pickBestVariant(colorMatches) || null;
  }

  function variantToOptions(variant) {
    return [
      variant.option1 || '',
      variant.option2 || '',
      variant.option3 || ''
    ];
  }

  function variantOptionValue(variant, index) {
    return variant['option' + String(index + 1)] || '';
  }

  function formatMoney(cents) {
    if (typeof cents !== 'number') return '';
    var dollars = Math.floor(cents / 100);
    var remainder = cents % 100;
    return '$' + dollars + (remainder ? '.' + String(remainder).padStart(2, '0') : '');
  }

  /**
   * Filter gallery thumbnails + images array by color alt text.
   */
  function filterGalleryByColor(color) {
    if (variantMediaMode === 'shared_gallery') {
      resetGallery();
      return;
    }
    if (!color || allImages.length <= 1) return;

    var hasColorTags = allImages.some(function (img) { return img.alt && img.alt !== ''; });
    if (!hasColorTags) return;

    activeColorFilter = color;
    var filtered = [];
    var filteredThumbEls = [];

    allThumbs.forEach(function (thumb, i) {
      var imgAlt = (allImages[i] && allImages[i].alt) || '';
      var match = imgAlt.toLowerCase() === color.toLowerCase();
      thumb.style.display = match ? '' : 'none';
      if (match) {
        filtered.push(allImages[i]);
        filteredThumbEls.push(thumb);
      }
    });

    if (filtered.length === 0) {
      allThumbs.forEach(function (t) { t.style.display = ''; });
      images = allImages.slice();
      thumbs = allThumbs.slice();
      goToImage(0);
      return;
    }

    images = filtered;
    thumbs = filteredThumbEls;
    goToImage(0);
  }

  function resetGallery() {
    activeColorFilter = null;
    allThumbs.forEach(function (thumb) {
      thumb.style.display = '';
    });
    images = allImages.slice();
    thumbs = allThumbs.slice();
    goToImage(0);
  }

  function goToImage(idx) {
    if (!images.length) return;
    currentIndex = ((idx % images.length) + images.length) % images.length;
    if (galleryImg && galleryImg.tagName === 'IMG') {
      galleryImg.removeAttribute('srcset');
      galleryImg.src = images[currentIndex].src;
      galleryImg.alt = images[currentIndex].alt;
    }
    thumbs.forEach(function (t, i) {
      t.classList.toggle('active', i === currentIndex);
    });
    allThumbs.forEach(function (t) {
      if (t.style.display === 'none') t.classList.remove('active');
    });
  }

  /* ═══════════════════════════════════════════
     2. GALLERY ARROWS + SWIPE
     ═══════════════════════════════════════════ */
  var galleryMain = document.getElementById('trg-gallery-main');

  if (galleryMain && images.length > 1) {
    var prevBtn = document.createElement('button');
    prevBtn.className = 'trg-pdp__gallery-arrow trg-pdp__gallery-arrow--prev';
    prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>';

    var nextBtn = document.createElement('button');
    nextBtn.className = 'trg-pdp__gallery-arrow trg-pdp__gallery-arrow--next';
    nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>';

    galleryMain.appendChild(prevBtn);
    galleryMain.appendChild(nextBtn);

    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); goToImage(currentIndex - 1); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); goToImage(currentIndex + 1); });

    var counter = document.createElement('span');
    counter.className = 'trg-pdp__gallery-counter';
    counter.textContent = '1 / ' + images.length;
    galleryMain.appendChild(counter);

    var _orig = goToImage;
    goToImage = function (idx) {
      _orig(idx);
      counter.textContent = (currentIndex + 1) + ' / ' + images.length;
    };

    var startX = 0, startY = 0;
    galleryMain.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    galleryMain.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) goToImage(currentIndex + 1);
        else goToImage(currentIndex - 1);
      }
    }, { passive: true });

    galleryMain.setAttribute('tabindex', '0');
    galleryMain.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { goToImage(currentIndex - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { goToImage(currentIndex + 1); e.preventDefault(); }
    });
  }

  /* ═══════════════════════════════════════════
     3. UNIVERSAL DESCRIPTION PARSER
     ═══════════════════════════════════════════ */
  var descEl = document.querySelector('.trg-pdp__acc-desc');
  var matBody = document.getElementById('trg-acc-materials');
  var shipBody = document.getElementById('trg-acc-shipping');
  var metaMatItem = document.getElementById('trg-meta-material');
  var metaMatVal = document.getElementById('trg-meta-material-val');

  var matPlaceholder = 'Care instructions vary by product';
  var shipPlaceholder = 'Shipping policies vary by brand';
  var matAlreadySet = matBody && matBody.textContent.indexOf(matPlaceholder) === -1;
  var shipAlreadySet = shipBody && shipBody.textContent.indexOf(shipPlaceholder) === -1;

  if (descEl && !(matAlreadySet && shipAlreadySet)) {
    parseAndDistribute(matAlreadySet, shipAlreadySet);
  }

  function parseAndDistribute(skipMat, skipShip) {
    var raw = descEl.textContent.trim();
    if (!raw || raw.length < 20) return;

    var tokens = tokenize(raw);
    if (tokens.length < 2) return;

    var sections = { details: [], material: [], care: [], sizeChart: '', shipping: '' };
    var inSizeChart = false;
    var sizeShipBlob = '';

    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];

      if (!inSizeChart) {
        var sizeOnset = findSizeChartOnset(t);
        if (sizeOnset >= 0) {
          var before = t.substring(0, sizeOnset).trim();
          if (before) classifyToken(before, sections);
          inSizeChart = true;
          sizeShipBlob = t.substring(sizeOnset).trim();
          continue;
        }
      }

      if (inSizeChart) {
        sizeShipBlob += ' ' + t;
        continue;
      }

      classifyToken(t, sections);
    }

    if (sizeShipBlob) {
      var shipOnset = sizeShipBlob.search(
        /\b(All orders|Free shipping|Ships in|This item ships|Complimentary|Standard shipping|We offer|Shipping and|Please note|Estimated delivery|International shipping|Domestic shipping|Express shipping|Returns|Return policy|Exchange)/i
      );
      if (shipOnset > 0) {
        sections.sizeChart = sizeShipBlob.substring(0, shipOnset).trim();
        sections.shipping = sizeShipBlob.substring(shipOnset).trim();
      } else {
        sections.sizeChart = sizeShipBlob;
      }
    }

    if (sections.details.length > 0) {
      var ul = document.createElement('ul');
      sections.details.forEach(function (d) {
        var li = document.createElement('li');
        li.textContent = d;
        ul.appendChild(li);
      });
      descEl.innerHTML = '';
      descEl.appendChild(ul);
    }

    if (!skipMat && matBody && (sections.material.length || sections.care.length)) {
      var html = '';
      if (sections.material.length) {
        html += '<p style="margin:0 0 0.4rem;font-weight:500;color:#1a1a18;">' + escHtml(sections.material.join(' \u00B7 ')) + '</p>';
      }
      if (sections.care.length) {
        html += '<p style="margin:0;">' + escHtml(sections.care.join('. ')) + '</p>';
      }
      matBody.innerHTML = html;
    }

    if (!skipShip && shipBody && sections.shipping) {
      shipBody.textContent = sections.shipping;
    }

    if (metaMatItem && metaMatVal && !metaMatVal.textContent.trim() && sections.material.length) {
      metaMatVal.textContent = sections.material.join(', ');
      metaMatItem.classList.remove('trg-pdp__meta-item--hidden');
    }
  }

  function tokenize(raw) {
    if (/[•·●]/.test(raw)) {
      return raw.split(/\s*[•·●]\s*/).map(function (s) { return s.trim(); }).filter(Boolean);
    }
    if (raw.indexOf('\n') >= 0) {
      var lines = raw.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
      if (lines.length > 2) return lines;
    }
    if (/\s[-\u2013]\s/.test(raw) && (raw.match(/\s[-\u2013]\s/g) || []).length >= 3) {
      return raw.split(/\s[-\u2013]\s/).map(function (s) { return s.trim(); }).filter(Boolean);
    }
    return [raw];
  }

  function findSizeChartOnset(t) {
    var m = t.match(/\bSIZE\s+(?:WAIST|CHEST|SHOULDER|INSEAM|LENGTH|BODY|NECK|SLEEVE|HIP|FRONT|RISE|LEG|S\s+M\s+L\s+XL)/i);
    if (m) return t.indexOf(m[0]);

    var h = t.match(/\b(SIZE CHART|SIZE GUIDE|SIZING|Measurements)\s*[:|\-]/i);
    if (h) return t.indexOf(h[0]);

    return -1;
  }

  function classifyToken(text, sections) {
    var t = text.trim();
    if (!t) return;

    if (/\d+%/.test(t) && hasFiber(t) && t.length < 80) {
      sections.material.push(t);
      return;
    }
    if (/^\d+%\s+\w+(\s+\w+)?$/.test(t)) {
      sections.material.push(t);
      return;
    }
    if (/^\w+\/\w+$/.test(t) && hasFiber(t)) {
      sections.material.push(t);
      return;
    }

    if (isCareInstruction(t)) {
      sections.care.push(t);
      return;
    }

    if (/\b(free shipping|ships within|delivery|business days|tracking number)\b/i.test(t) && t.length < 100) {
      sections.shipping = sections.shipping ? sections.shipping + ' ' + t : t;
      return;
    }

    sections.details.push(t);
  }

  function hasFiber(t) {
    return /\b(cotton|wool|silk|linen|polyester|nylon|cashmere|viscose|elastane|spandex|leather|suede|hemp|rayon|modal|tencel|acrylic|alpaca|mohair|lyocell|polartec|gore-tex|cordura|canvas|denim|tweed|flannel|chambray|satin|organza|merino|cupro|recycled)\b/i.test(t);
  }

  function isCareInstruction(t) {
    if (t.length > 60) return false;
    return /\b(machine wash|hand wash|dry clean|do not bleach|tumble dry|line dry|lay flat|wash cold|wash warm|gentle cycle|drip dry|iron low|do not iron|do not tumble|cold water|warm water|delicate cycle)\b/i.test(t);
  }

  function escHtml(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }


  /* ── Also Available At (dedup surfacing) ── */
  (function renderAlsoAvailable() {
    var container = document.querySelector('.trg-pdp__also-at');
    if (!container) return;
    var raw = container.getAttribute('data-alts');
    if (!raw) return;
    try {
      var alts = JSON.parse(raw);
      if (!Array.isArray(alts) || alts.length === 0) return;
      var linksEl = container.querySelector('.trg-pdp__also-at__links');
      if (!linksEl) return;
      var extIcon = '<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
      for (var i = 0; i < alts.length; i++) {
        var alt = alts[i];
        if (!alt.url || !alt.name) continue;
        var a = document.createElement('a');
        a.href = alt.url;
        a.target = '_blank';
        a.rel = 'noopener sponsored';
        a.className = 'trg-pdp__also-at__link';
        a.innerHTML = alt.name + ' ' + extIcon;
        linksEl.appendChild(a);
      }
    } catch (e) {
      console.warn('[TRG] Also-available parse error:', e);
    }
  })();

})();
