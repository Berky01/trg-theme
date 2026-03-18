
/* === TRG: Handle Corrections + Page 2 Fetch === */
(function() {
  var CORRECTIONS = {"Arc'teryx": "arcteryx", "Berg & Berg": "berg-and-berg", "Bryceland's": "brycelands", "Buzz Rickson's": "buzz-ricksons", "Cad & The Dandy": "cad-and-the-dandy", "Church's": "churchs", "Colhay's": "colhays", "Crockett & Jones": "crockett-and-jones", "Ede & Ravenscroft": "ede-and-ravenscroft", "Gaziano & Girling": "gaziano-and-girling", "Hawes & Curtis": "hawes-and-curtis", "Hilditch & Key": "hilditch-and-key", "L'Estrange London": "lestrange-london", "Levi's Vintage Clothing": "levis-vintage-clothing", "Mott & Bow": "mott-and-bow", "Naked & Famous": "naked-and-famous", "Outstanding & Co.": "outstanding-and-co", "Petru & Claymoor": "petru-and-claymoor", "Rancourt & Co": "rancourt-and-co", "Saint Crispin's": "saint-crispins", "Sanders & Sanders": "sanders-and-sanders", "Spier & Mackay": "spier-and-mackay", "Studio D'Artisan": "studio-dartisan", "The Real McCoy's": "the-real-mccoys", "Toad&Co": "toad-and-co", "Tricker's": "trickers", "Turnbull & Asser": "turnbull-and-asser", "White's Boots": "whites-boots", "Warehouse & Co.": "warehouse-and-co", "Mason's": "masons", "Paul & Shark": "paul-and-shark", "A Day's March": "a-days-march", "Begg & Co": "begg-and-co", "Rodd & Gunn": "rodd-and-gunn", "Abaga": "abagavelli", "Roberto Collima": "roberto-collina", "georgecleverley": "george-cleverley", "Ascotchang": "ascot-chang", "Pringlescotland": "pringle-of-scotland"};

  function fixHandles(brandsArray) {
    var n = 0;
    brandsArray.forEach(function(b) {
      if (CORRECTIONS[b.name]) {
        b.handle = CORRECTIONS[b.name];
        b.url = '/pages/' + CORRECTIONS[b.name];
        n++;
      }
    });
    return n;
  }

  function init() {
    var el = document.querySelector('[data-brands-json]');
    if (!el) return;
    var brands;
    try { brands = JSON.parse(el.textContent); } catch(e) { return; }

    fixHandles(brands);
    el.textContent = JSON.stringify(brands);

    /* Check if more brands exist (Shopify caps metaobjects at 250/page) */
    /* Read total from script tag attribute or span */
    var total = parseInt(el.getAttribute('data-total-brands') || '0', 10);
    if (!total) {
      var totalEl = document.getElementById('trg-total-brands');
      total = totalEl ? parseInt(totalEl.getAttribute('data-total') || '0', 10) : 0;
    }
    if (total > brands.length) {
      /* Fetch page 2 via full page request (section_id doesn't paginate for metaobjects) */
      var bp = window.location.pathname;
      fetch(bp + '?page=2')
        .then(function(r) { return r.text(); })
        .then(function(html) {
          var m = html.match(/data-brands-json[^>]*>([\s\S]*?)<\/script>/);
          if (!m) return;
          try {
            var more = JSON.parse(m[1]);
            if (!more.length) return;
            fixHandles(more);
            /* Deduplicate by handle */
            var seen = {};
            brands.forEach(function(b) { if (b.handle) seen[b.handle] = true; });
            var unique = more.filter(function(b) { return b.handle && !seen[b.handle]; });
            if (unique.length) {
              brands = brands.concat(unique);
              el.textContent = JSON.stringify(brands);
              document.dispatchEvent(new CustomEvent('trg:brands-updated'));
            }
          } catch(e) {}
        }).catch(function() {});
    } else {
      document.dispatchEvent(new CustomEvent('trg:brands-updated'));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
/* === END TRG Handle Corrections + Pagination === */

(() => {
  const esc = (value) =>
    String(value == null ? '' : value).replace(/[&<>"']/g, (match) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    })[match]);

  const price = (value) =>
    ({
      budget: 1,
      'mid-range': 2,
      premium: 3,
      luxury: 4,
    }[String(value || '').toLowerCase()] || 0);

  const prio = (value) =>
    ({
      high: 3,
      medium: 2,
      low: 1,
    }[String(value || '').toLowerCase()] || 0);

  const bySel = (root, selector) => Array.from(root.querySelectorAll(selector));

  const looks = (brand, value) => {
    const term = String(value || '').toLowerCase();
    const haystack = [
      brand.primaryCategoryRaw,
      brand.category,
      brand.country,
      brand.madeIn,
      brand.description,
      ...(brand.brandPositioning || []),
      ...(brand.tags || []),
    ]
      .join(' ')
      .toLowerCase();

    if (term === 'japanese') return haystack.includes('japan');
    if (term === 'coastal') return haystack.includes('coastal') || haystack.includes('maritime');
    return haystack.includes(term);
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.trg-bdir[data-id]').forEach((section) => {
      const dataNode = section.querySelector('[data-brands-json]');
      if (!dataNode) return;

      let data = [];
      let totalBrandsCount = 0;
      try {
        data = JSON.parse(dataNode.textContent || '[]');
      } catch (error) {
        return;
      }
      /* Read total from script tag attribute or span */
      totalBrandsCount = parseInt(dataNode.getAttribute('data-total-brands') || '0', 10);
      if (!totalBrandsCount) {
        var totalSpan = document.getElementById('trg-total-brands');
        totalBrandsCount = totalSpan ? parseInt(totalSpan.getAttribute('data-total') || '0', 10) : 0;
      }
      if (!totalBrandsCount || totalBrandsCount < data.length) totalBrandsCount = data.length;

      data = data.map((brand) => ({
        ...brand,
        brandPositioning: Array.isArray(brand.brandPositioning)
          ? brand.brandPositioning.map((value) => String(value || '').trim()).filter(Boolean)
          : [],
        tags: Array.isArray(brand.tags) ? brand.tags.map((value) => String(value || '').trim()).filter(Boolean) : [],
      }));

      const PAGE = 24;

      /* Listen for handle corrections */
      document.addEventListener('trg:brands-updated', () => {
        try {
          const fresh = JSON.parse(dataNode.textContent || '[]').map((brand) => ({
            ...brand,
            brandPositioning: Array.isArray(brand.brandPositioning)
              ? brand.brandPositioning.map((v) => String(v || '').trim()).filter(Boolean) : [],
            tags: Array.isArray(brand.tags) ? brand.tags.map((v) => String(v || '').trim()).filter(Boolean) : [],
          }));
          data.length = 0;
          data.push(...fresh);
          state.page = 1;
          apply();
        } catch(e) {}
      });
      const key = 'trg_saved_brands';
      const _acct = window.TRG_ACCOUNT;
      const q = (selector) => section.querySelector(selector);
      const qa = (selector) => bySel(section, selector);
      const inp = q('[data-search]');
      const grid = q('[data-grid]');
      const chips = q('[data-chips]');
      const res = q('[data-results]');
      const tot = {textContent: ''}; // removed brand count from header
      const ttl = q('[data-title]');
      const sub = q('[data-sub]');
      const more = q('[data-more]');
      const empty = q('[data-empty]');
      const pc = q('[data-prog-copy]');
      const pp = q('[data-prog-page]');
      const fill = q('[data-fill]');
      const sort = q('[data-sort]');
      const topb = q('[data-top]');
      const scrim = q('[data-scrim]');

      const state = {
        page: 1,
        filtered: data.slice(),
        sort: 'recommended',
        browse: 'All Brands',
        tog: {ships: false, affiliate: false, direct: false},
        saved: new Set(),
      };

      try {
        /* Prefer TRG_ACCOUNT followed_brands over localStorage */
        const acctBrands = _acct ? _acct.getFollowedBrands() : null;
        if (acctBrands && acctBrands.length) {
          acctBrands.forEach((value) => state.saved.add(value));
        } else {
          JSON.parse(localStorage.getItem(key) || '[]').forEach((value) => state.saved.add(value));
        }
      } catch (error) {
        // Ignore parse failures.
      }

      const save = () => {
        try {
          localStorage.setItem(key, JSON.stringify(Array.from(state.saved)));
        } catch (error) {}
        /* Sync to TRG_ACCOUNT metafield if logged in */
        if (_acct && _acct.isLoggedIn()) {
          _acct.saveMetafield('followed_brands', Array.from(state.saved));
        }
      };

      const vals = (name) => qa(`input[name="${name}"]:checked`).map((input) => input.value);

      const tagsHtml = (brand) => {
        const out = [];
        if (brand.priceRange) out.push(`<span class="trg-bdir__tag trg-bdir__tag--o">${esc(brand.priceRange)}</span>`);
        (brand.brandPositioning || [])
          .slice(0, 1)
          .forEach((tag) => out.push(`<span class="trg-bdir__tag">${esc(tag)}</span>`));
        return out.join('');
      };

      const card = (brand) => `
        <article class="trg-bdir__card">
          <a class="trg-bdir__carda" href="${esc(brand.url || '#')}">
            <div class="trg-bdir__media">
              ${String(brand.priority || '').toLowerCase() === 'high' ? '<span class="trg-bdir__badgef">Featured</span>' : ''}
              <button type="button" class="trg-bdir__wish${state.saved.has(brand.handle) ? ' is-saved' : ''}" data-save="${esc(brand.handle)}" aria-label="Save ${esc(brand.name)}">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5l-1.05-.95C5.2 14.37 2 11.46 2 7.88 2 5.08 4.18 3 6.94 3c1.57 0 3.08.75 4.06 1.93A5.17 5.17 0 0 1 15.06 3C17.82 3 20 5.08 20 7.88c0 3.58-3.2 6.49-8.95 11.67L12 20.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
              </button>
              ${brand.logoUrl ? `<img src="${esc(brand.logoUrl)}" alt="${esc(brand.name)}" loading="lazy">` : `<span class="trg-bdir__mono">${esc((brand.name || '').slice(0, 2).toUpperCase())}</span>`}
            </div>
            <div class="trg-bdir__body2">
              <div class="trg-bdir__toprow">
                <h3>${esc(brand.name)}</h3>
              </div>
              <p class="trg-bdir__origin">${esc(brand.country || 'Global')}${brand.category ? ` · ${esc(brand.category)}` : ''}</p>
              <p class="trg-bdir__copy">${esc(brand.description || 'Brand profile coming soon.')}</p>
              <div class="trg-bdir__tags">${tagsHtml(brand)}</div>
              ${brand.buyPath === 'Reseller Only' && brand.bestRetailerNa ? `<div class="trg-bdir__ret">Available via ${esc(brand.bestRetailerNa)}</div>` : ''}
            </div>
            <div class="trg-bdir__cta"><span>View Brand Profile</span><span>→</span></div>
          </a>
        </article>
      `;

      const updBrowse = () =>
        qa('[data-browse]').forEach((button) => {
          const value = button.dataset.browse;
          const node = button.querySelector('[data-browse-count]');
          if (node) node.textContent = value === 'All Brands' ? String(data.length) : String(data.filter((brand) => brand.category === value).length);
        });

      const updCounts = () =>
        qa('[data-count]').forEach((node) => {
          const [type, value] = (node.dataset.count || '').split('::');
          let count = 0;
          if (type === 'category') count = data.filter((brand) => brand.category === value).length;
          else if (type === 'aesthetic') count = data.filter((brand) => looks(brand, value)).length;
          else if (type === 'price') count = data.filter((brand) => brand.priceRange === value).length;
          else if (type === 'made') count = data.filter((brand) => brand.madeInGroup === value).length;
          node.textContent = String(count);
        });

      const updChips = () => {
        const items = [];
        const searchValue = (inp.value || '').trim();
        if (state.browse !== 'All Brands') items.push(state.browse);
        items.push(...vals('category'), ...vals('aesthetic'), ...vals('price'), ...vals('made'));
        if (state.tog.ships) items.push('Ships to Canada');
        if (state.tog.direct) items.push('Buy Direct');
        chips.innerHTML = items.map((value) => `<span class="trg-bdir__chip">${esc(value)}</span>`).join('');
        chips.hidden = !items.length;
        qa('[data-clear]').forEach((button) => button.classList.toggle('visible', !!items.length));
      };

      const sorter = (items) => {
        const result = items.slice();
        if (state.sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
        else if (state.sort === 'price-low') result.sort((a, b) => price(a.priceRange) - price(b.priceRange) || a.name.localeCompare(b.name));
        else if (state.sort === 'price-high') result.sort((a, b) => price(b.priceRange) - price(a.priceRange) || a.name.localeCompare(b.name));
        else {
          result.sort(
            (a, b) =>
              prio(b.priority) - prio(a.priority) ||
              Number(b.affiliateProgram) - Number(a.affiliateProgram) ||
              Number(b.shipsToCanada) - Number(a.shipsToCanada) ||
              a.name.localeCompare(b.name)
          );
        }
        return result;
      };

      const render = () => {
        try {
          const total = state.filtered.length;
          const pages = Math.max(1, Math.ceil(total / PAGE));
          const visible = state.filtered.slice(0, state.page * PAGE);

          if (grid) { grid.innerHTML = visible.map(card).join(''); grid.hidden = !total; }
          if (empty) empty.hidden = !!total;
          if (res) res.textContent = String(total);
          if (ttl) ttl.textContent = state.browse === 'All Brands' ? 'All Brands' : state.browse;
          if (sub) sub.textContent = total === 1 ? '1 brand' : `${total} brands`;
          if (pc) pc.textContent = `Showing ${visible.length} of ${total} brands`;
          if (pp) pp.textContent = `Page ${Math.min(state.page, pages)} of ${pages}`;
          if (fill) fill.style.width = total ? `${(visible.length / total) * 100}%` : '0%';
          if (more) more.hidden = visible.length >= total;
          const prog = q('[data-prog]');
          if (prog) prog.hidden = !total;
        } catch (err) {
          console.error('[TRG Brand Directory] render error:', err);
        }
      };

      const apply = () => {
        const term = (inp.value || '').trim().toLowerCase();
        const cats = vals('category');
        const aesthetics = vals('aesthetic');
        const prices = vals('price');
        const made = vals('made');

        state.filtered = sorter(
          data.filter((brand) => {
            const haystack = [
              brand.name,
              brand.description,
              brand.country,
              brand.madeIn,
              brand.category,
              brand.primaryCategoryRaw,
              ...(brand.tags || []),
              ...(brand.brandPositioning || []),
            ]
              .join(' ')
              .toLowerCase();

            if (term && !haystack.includes(term)) return false;
            if (state.browse !== 'All Brands' && brand.category !== state.browse) return false;
            if (cats.length && !cats.includes(brand.category)) return false;
            if (aesthetics.length && !aesthetics.some((value) => looks(brand, value))) return false;
            if (prices.length && !prices.includes(brand.priceRange)) return false;
            if (made.length && !made.includes(brand.madeInGroup)) return false;
            if (state.tog.ships && !brand.shipsToCanada) return false;
            if (state.tog.affiliate && !brand.affiliateProgram) return false;
            if (state.tog.direct && !/^(direct|both)$/i.test(brand.buyPath || '')) return false;
            return true;
          })
        );

        state.page = 1;
        updChips();
        render();
      };

      const clear = () => {
        qa('input[type="checkbox"]').forEach((input) => {
          input.checked = false;
        });
        state.browse = 'All Brands';
        state.tog = {ships: false, affiliate: false, direct: false};
        inp.value = '';
        qa('[data-browse]').forEach((button) => button.classList.toggle('is-active', button.dataset.browse === 'All Brands'));
        qa('[data-switch]').forEach((button) => button.classList.remove('is-active'));
        apply();
      };

      const togGroup = (id) => {
        const group = q(`[data-group="${id}"]`);
        if (group) group.classList.toggle('is-collapsed');
      };

      const togSwitch = (id) => {
        if (!(id in state.tog)) return;
        state.tog[id] = !state.tog[id];
        const button = q(`[data-switch="${id}"]`);
        if (button) button.classList.toggle('is-active', state.tog[id]);
        apply();
      };

      const togFilters = () => {
        if (matchMedia('(max-width: 989px)').matches) section.classList.toggle('is-open');
        else document.body.classList.toggle('filters-hidden');
      };

      updBrowse();
      updCounts();
      updChips();
      render();

      qa('input[type="checkbox"]').forEach((input) => input.addEventListener('change', apply));
      if (inp) inp.addEventListener('input', apply);

      const form = q('[data-form]');
      if (form) form.addEventListener('submit', (event) => {
        event.preventDefault();
        apply();
      });

      qa('[data-clear]').forEach((button) => button.addEventListener('click', clear));
      qa('[data-toggle]').forEach((button) => button.addEventListener('click', togFilters));
      qa('[data-switch]').forEach((button) => button.addEventListener('click', () => togSwitch(button.dataset.switch)));
      qa('[data-group-toggle]').forEach((button) => button.addEventListener('click', () => togGroup(button.dataset.groupToggle)));
      qa('[data-pill]').forEach((button) => button.addEventListener('click', () => {
        const checkbox = q(`input[name="aesthetic"][value="${CSS.escape(button.dataset.pill || '')}"]`);
        if (checkbox) {
          checkbox.checked = true;
          apply();
        }
      }));
      qa('[data-browse]').forEach((button) => button.addEventListener('click', () => {
        state.browse = button.dataset.browse || 'All Brands';
        qa('[data-browse]').forEach((node) => node.classList.toggle('is-active', node === button));
        apply();
      }));

      if (scrim) scrim.addEventListener('click', () => section.classList.remove('is-open'));
      if (more) more.addEventListener('click', () => {
        state.page += 1;
        render();
      });
      if (sort) sort.addEventListener('change', () => {
        state.sort = sort.value;
        apply();
      });

      section.addEventListener('click', (event) => {
        const button = event.target.closest('[data-save]');
        if (!button) return;
        event.preventDefault();
        event.stopPropagation();
        const handle = button.dataset.save;
        if (!handle) return;
        if (state.saved.has(handle)) state.saved.delete(handle);
        else state.saved.add(handle);
        button.classList.toggle('is-saved', state.saved.has(handle));
        save();
        if (_acct) {
          _acct.showToast(state.saved.has(handle) ? 'Brand followed' : 'Brand unfollowed');
          _acct.updateNavCounts();
        }
      });

      if (topb) topb.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
      window.addEventListener(
        'scroll',
        () => {
          if (topb) topb.classList.toggle('visible', window.scrollY > 400);
        },
        {passive: true}
      );
    });
  });
})();
