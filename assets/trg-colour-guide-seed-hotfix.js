(function () {
  if (!window.location.pathname.includes('/pages/colour-guide')) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const garment = params.get('base_garment') || '';
  const source = (params.get('source') || '').toLowerCase();
  const rawColor = (params.get('base_colour') || '').trim();
  const aliases = {
    brown: 'Brown',
    'off white': 'Off-White',
    'off-white': 'Off-White',
    'dark navy': 'Dark Navy',
  };
  const swatches = {
    Brown: '#6f4a2d',
    'Off-White': '#eae4d8',
    'Dark Navy': '#101e40',
    'Saddle Brown': '#8b6834',
  };
  const slotMeta = {
    shirt: { handle: 'shirts', label: 'Shirts', singular: 'shirt', note: 'Start near the face.' },
    trousers: { handle: 'trousers', label: 'Trousers', singular: 'trousers', note: 'Build the base first.' },
    knitwear: { handle: 'knitwear', label: 'Knitwear', singular: 'knitwear', note: 'Layer warmth and texture.' },
    jacket: { handle: 'jackets', label: 'Jackets', singular: 'jacket', note: 'Choose the anchor piece.' },
    coat: { handle: 'outerwear', label: 'Outerwear', singular: 'coat', note: 'Top off the palette.' },
    shoes: { handle: 'footwear', label: 'Footwear', singular: 'shoes', note: 'Ground the look.' },
  };

  const color = aliases[rawColor.toLowerCase()] || rawColor;
  const meta = slotMeta[garment];
  if (!meta || !color) {
    return;
  }

  function persistIntent() {
    try {
      localStorage.setItem('trg_colour_intent', JSON.stringify({
        source: 'colour-guide-hotfix',
        updatedAt: new Date().toISOString(),
        anchor: {
          slot: garment,
          color: color,
          handle: meta.handle,
          label: meta.label,
          singular: meta.singular,
          hex: swatches[color] || '',
        },
        slots: [{
          slot: garment,
          color: color,
          handle: meta.handle,
          label: meta.label,
          singular: meta.singular,
          hex: swatches[color] || '',
        }],
      }));
    } catch (err) {
      /* localStorage can fail */
    }
  }

  function applySeed() {
    const guide = document.querySelector('.trg-colour-guide');
    const slotRoot = document.getElementById('ob-slots');
    if (!(guide instanceof HTMLElement) || !(slotRoot instanceof HTMLElement)) {
      return false;
    }

    guide.dataset.shopIndex = '/cdn/shop/t/22/assets/trg-colour-shop-index-v2.json?cv=20260411i';

    const slot = slotRoot.querySelector('.ob-slot[data-slot="' + garment + '"]');
    const colorEl = slot && slot.querySelector('.ob-slot-color');
    const dotEl = slot && slot.querySelector('.ob-slot-dot');
    if (!(slot instanceof HTMLElement) || !(colorEl instanceof HTMLElement) || !(dotEl instanceof HTMLElement)) {
      return false;
    }

    slotRoot.querySelectorAll('.ob-slot').forEach(function (candidate) {
      candidate.classList.remove('on');
      candidate.setAttribute('aria-pressed', 'false');
    });

    slot.classList.add('filled', 'on');
    slot.setAttribute('aria-pressed', 'true');
    colorEl.textContent = color;
    dotEl.style.background = swatches[color] || '';

    const gaugePct = document.getElementById('ob-gauge-pct');
    const gaugeLabel = document.getElementById('ob-gauge-label');
    const gaugeDesc = document.getElementById('ob-gauge-desc');
    if (gaugePct) gaugePct.textContent = '1/6';
    if (gaugeLabel) gaugeLabel.textContent = 'Outfit progress';
    if (gaugeDesc) gaugeDesc.textContent = '1 of 6 pieces is set. Add another piece or swap the anchor colour.';

    if (source === 'pdp') {
      const profileText = document.getElementById('ob-pl-text');
      const profileCta = document.getElementById('ob-pl-cta');
      if (profileText) {
        profileText.innerHTML = '<strong>' + color + ' ' + meta.singular + '</strong> loaded from a PDP. Keep building here or take the finder for profile-led picks.';
      }
      if (profileCta) {
        profileCta.textContent = 'Take the finder →';
      }
    }

    const summaryEl = document.getElementById('ob-shop-summary');
    const actionsEl = document.getElementById('ob-shop-actions');
    if (summaryEl && actionsEl) {
      const defaultSlots = [garment, 'shirt', 'jacket', 'trousers'].filter(function (value, index, values) {
        return values.indexOf(value) === index;
      }).slice(0, 3);

      summaryEl.innerHTML = 'Start with <strong>' + color + ' ' + meta.singular + '</strong>, then open the matching categories. No exact product bucket exists for this combination yet, so the guide is falling back to category jumps. Treat the selected colours as the shopping brief rather than a strict filter.';
      actionsEl.innerHTML = defaultSlots.map(function (slotName, index) {
        const slotData = slotMeta[slotName];
        if (!slotData) {
          return '';
        }

        const title = (slotName === garment ? 'Shop ' : 'Browse ') + slotData.label;
        const note = slotName === garment
          ? color + ' is the brief for this ' + slotData.singular + ' category.'
          : slotData.note;
        const swatch = slotName === garment
          ? (swatches[color] || 'linear-gradient(135deg,#f4efe7,#b8aa96)')
          : 'linear-gradient(135deg,#f4efe7,#b8aa96)';

        return '<a class="ob-shop-card" href="/collections/' + slotData.handle + '">' +
          '<span class="ob-shop-swatch" style="background:' + swatch + '"></span>' +
          '<span class="ob-shop-body">' +
            '<span class="ob-shop-eyebrow">' + (index === 0 ? 'Anchor piece' : 'Add next') + '</span>' +
            '<span class="ob-shop-card-title">' + title + '</span>' +
            '<span class="ob-shop-card-note">' + note + '</span>' +
          '</span>' +
          '<span class="ob-shop-arrow" aria-hidden="true">&rarr;</span>' +
        '</a>';
      }).join('');
    }

    persistIntent();
    return true;
  }

  [250, 1000, 2500, 5000, 9000, 14000, 22000, 30000].forEach(function (delay) {
    window.setTimeout(applySeed, delay);
  });

  window.addEventListener('load', function () {
    window.setTimeout(applySeed, 1200);
  }, { once: true });
})();
