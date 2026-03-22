/**
 * TRG PDP Enhancements — v1
 * 1. Universal description parser (splits raw blob → Details / Materials+Care / Shipping)
 * 2. Gallery arrows + touch swipe
 * 3. Thumbnail & chip click handlers (replaces inline script)
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

  /* All images (unfiltered) — used by color gallery filter */
  var allImages = images.slice();
  var allThumbs = Array.prototype.slice.call(thumbs);
  var activeColorFilter = null; /* null = show all */

  document.querySelectorAll('.trg-pdp__chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var parent = chip.closest('.trg-pdp__chips');
      parent.querySelectorAll('.trg-pdp__chip').forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');

      /* ── Color gallery filter ──
         When a Color chip is clicked, filter gallery to that color's images.
         Images are tagged with alt = color name by the push pipeline. */
      var optIdx = parseInt(chip.dataset.optionIndex, 10);
      if (optIdx === 0 && allImages.length > 1) {
        var colorVal = chip.dataset.value || chip.textContent.trim();
        filterGalleryByColor(colorVal);
      }
    });
  });

  /**
   * Filter gallery thumbnails + images array by color alt text.
   * Hides non-matching thumbs, rebuilds `images` array, jumps to first match.
   */
  function filterGalleryByColor(color) {
    if (!color || allImages.length <= 1) return;

    var hasColorTags = allImages.some(function (img) { return img.alt && img.alt !== ''; });
    if (!hasColorTags) return; /* No alt tags set — skip filtering */

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

    /* If no images match this color (no alt tags for it), show all */
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

  function goToImage(idx) {
    if (!images.length) return;
    currentIndex = ((idx % images.length) + images.length) % images.length;
    if (galleryImg && galleryImg.tagName === 'IMG') {
      galleryImg.removeAttribute('srcset');
      galleryImg.src = images[currentIndex].src;
      galleryImg.alt = images[currentIndex].alt;
    }
    /* Highlight active thumb among visible thumbs only */
    thumbs.forEach(function (t, i) {
      t.classList.toggle('active', i === currentIndex);
    });
    /* De-activate hidden thumbs too */
    allThumbs.forEach(function (t) {
      if (t.style.display === 'none') t.classList.remove('active');
    });
  }

  /* ═══════════════════════════════════════════
     2. GALLERY ARROWS + SWIPE
     ═══════════════════════════════════════════ */
  var galleryMain = document.getElementById('trg-gallery-main');

  if (galleryMain && images.length > 1) {
    // — Arrows —
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

    // — Counter pill —
    var counter = document.createElement('span');
    counter.className = 'trg-pdp__gallery-counter';
    counter.textContent = '1 / ' + images.length;
    galleryMain.appendChild(counter);

    // Update counter on navigation
    var _orig = goToImage;
    goToImage = function (idx) {
      _orig(idx);
      counter.textContent = (currentIndex + 1) + ' / ' + images.length;
    };

    // — Touch swipe —
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

    // — Keyboard —
    galleryMain.setAttribute('tabindex', '0');
    galleryMain.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { goToImage(currentIndex - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { goToImage(currentIndex + 1); e.preventDefault(); }
    });
  }

  /* ═══════════════════════════════════════════
     3. UNIVERSAL DESCRIPTION PARSER
     ═══════════════════════════════════════════
     Works across sources:
     - Shopify fetch: bullet-separated (•) with size chart + shipping appended
     - Affiliate feeds: typically cleaner, but may still dump everything in one field
     - HTML descriptions: strips tags first, then parses tokens
     
     Populates:
     - Details accordion (clean product bullets only)
     - Materials + Care accordion (composition + care instructions)
     - Shipping accordion (shipping/returns text)
     - Meta grid material value (if metafield was empty)
  */
  var descEl = document.querySelector('.trg-pdp__acc-desc');
  var matBody = document.getElementById('trg-acc-materials');
  var shipBody = document.getElementById('trg-acc-shipping');
  var metaMatItem = document.getElementById('trg-meta-material');
  var metaMatVal = document.getElementById('trg-meta-material-val');

  // Skip parsing if metafields already populated the accordions server-side.
  // Detect by checking if Materials accordion does NOT contain the placeholder text.
  var matPlaceholder = 'Care instructions vary by product';
  var shipPlaceholder = 'Shipping policies vary by brand';
  var matAlreadySet = matBody && matBody.textContent.indexOf(matPlaceholder) === -1;
  var shipAlreadySet = shipBody && shipBody.textContent.indexOf(shipPlaceholder) === -1;

  if (descEl && !(matAlreadySet && shipAlreadySet)) {
    parseAndDistribute(matAlreadySet, shipAlreadySet);
  }

  function parseAndDistribute(skipMat, skipShip) {
    // Get text, strip any HTML tags
    var raw = descEl.textContent.trim();
    if (!raw || raw.length < 20) return;

    var tokens = tokenize(raw);
    if (tokens.length < 2) return; // Can't reliably parse single-blob text

    var sections = { details: [], material: [], care: [], sizeChart: '', shipping: '' };
    var inSizeChart = false;
    var sizeShipBlob = '';

    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i];

      // — Size chart onset detection —
      // Look for "SIZE" followed by measurement headers (all-caps words)
      // or common size labels like S, M, L, XL, XXL as column headers
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

    // Split size chart blob from shipping text
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

    // — Render Details —
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

    // — Render Materials + Care (skip if metafields already set server-side) —
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

    // — Render Shipping (skip if metafields already set server-side) —
    if (!skipShip && shipBody && sections.shipping) {
      shipBody.textContent = sections.shipping;
    }

    // — Populate meta grid material if empty —
    if (metaMatItem && metaMatVal && !metaMatVal.textContent.trim() && sections.material.length) {
      metaMatVal.textContent = sections.material.join(', ');
      metaMatItem.classList.remove('trg-pdp__meta-item--hidden');
    }
  }

  /**
   * Tokenize raw description text.
   * Strategy: try bullet split first (•·), then <br>/newline, then sentence split.
   */
  function tokenize(raw) {
    // Bullet characters: •, ·, ●
    if (/[•·●]/.test(raw)) {
      return raw.split(/\s*[•·●]\s*/).map(function (s) { return s.trim(); }).filter(Boolean);
    }
    // Line breaks (might come from HTML <br> that got converted to \n)
    if (raw.indexOf('\n') >= 0) {
      var lines = raw.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
      if (lines.length > 2) return lines;
    }
    // Dash-separated lists (common in some feeds): " - " or " – "
    if (/\s[-–]\s/.test(raw) && (raw.match(/\s[-–]\s/g) || []).length >= 3) {
      return raw.split(/\s[-–]\s/).map(function (s) { return s.trim(); }).filter(Boolean);
    }
    // Fallback: return as single blob (parser won't modify it)
    return [raw];
  }

  /**
   * Detect where a size chart begins inside a token.
   * Returns character index of onset, or -1.
   */
  function findSizeChartOnset(t) {
    // Pattern: "SIZE" followed by all-caps measurement word(s) and numbers
    var m = t.match(/\bSIZE\s+(?:WAIST|CHEST|SHOULDER|INSEAM|LENGTH|BODY|NECK|SLEEVE|HIP|FRONT|RISE|LEG|S\s+M\s+L\s+XL)/i);
    if (m) return t.indexOf(m[0]);

    // Pattern: explicit size chart header
    var h = t.match(/\b(SIZE CHART|SIZE GUIDE|SIZING|Measurements)\s*[:|\-]/i);
    if (h) return t.indexOf(h[0]);

    return -1;
  }

  /**
   * Classify a single token into details, material, or care.
   */
  function classifyToken(text, sections) {
    var t = text.trim();
    if (!t) return;

    // Composition: "100% Cotton", "60% Wool, 40% Cashmere", "Cotton/Linen blend"
    if (/\d+%/.test(t) && hasFiber(t) && t.length < 80) {
      sections.material.push(t);
      return;
    }
    // Short composition: "100% Cotton" standalone
    if (/^\d+%\s+\w+(\s+\w+)?$/.test(t)) {
      sections.material.push(t);
      return;
    }
    // Slash-composition: "Cotton/Polyester" but only short ones
    if (/^\w+\/\w+$/.test(t) && hasFiber(t)) {
      sections.material.push(t);
      return;
    }

    // Care instructions
    if (isCareInstruction(t)) {
      sections.care.push(t);
      return;
    }

    // Shipping snuck into regular bullets
    if (/\b(free shipping|ships within|delivery|business days|tracking number)\b/i.test(t) && t.length < 100) {
      sections.shipping = sections.shipping ? sections.shipping + ' ' + t : t;
      return;
    }

    // Default: product detail
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

})();

