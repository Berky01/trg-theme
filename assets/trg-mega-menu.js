(function () {
  'use strict';

  var PANELS = { shop: 'trg-mm-panel-shop', brands: 'trg-mm-panel-brands' };
  var BACKDROP_ID = 'trg-mm-backdrop';
  var DESKTOP_MIN = 990;

  var FALLBACK_BRANDS = [
    {n:"3sixteen",s:"3sixteen",c:"denim"},{n:"A Day's March",s:"a-days-march",c:"casualwear"},{n:"A Kind of Guise",s:"a-kind-of-guise",c:"casualwear"},{n:"A.P.C.",s:"a-p-c",c:"casualwear"},{n:"Ace Marks",s:"ace-marks",c:"footwear"},{n:"Aime Leon Dore",s:"aime-leon-dore",c:"streetwear"},{n:"Allen Edmonds",s:"allen-edmonds",c:"footwear"},{n:"AMI Paris",s:"ami-paris",c:"smart-casual"},{n:"Anglo-Italian",s:"anglo-italian",c:"smart-casual"},{n:"Aran Sweater Market",s:"aran-sweater-market",c:"knitwear"},{n:"Arc'teryx",s:"arcteryx",c:"outerwear"},{n:"Arpenteur",s:"arpenteur",c:"workwear"},{n:"Asket",s:"asket",c:"basics"},{n:"Aspesi",s:"aspesi",c:"casualwear"},{n:"Astorflex",s:"astorflex",c:"footwear"},{n:"Auralee",s:"auralee",c:"casualwear"},{n:"Baracuta",s:"baracuta",c:"outerwear"},{n:"Barbour",s:"barbour",c:"outerwear"},{n:"Barena Venezia",s:"barena-venezia",c:"smart-casual"},{n:"Beckett Simonon",s:"beckett-simonon",c:"footwear"},{n:"Belstaff",s:"belstaff",c:"outerwear"},{n:"Billy Reid",s:"billy-reid",c:"casualwear"},{n:"Blundstone",s:"blundstone",c:"footwear"},{n:"Bode",s:"bode",c:"casualwear"},{n:"Boglioli",s:"boglioli",c:"formalwear"},{n:"Bonobos",s:"bonobos",c:"smart-casual"},{n:"Brooks Brothers",s:"brooks-brothers",c:"formalwear"},{n:"Buck Mason",s:"buck-mason",c:"basics"},{n:"Canada Goose",s:"canada-goose",c:"outerwear"},{n:"Carhartt WIP",s:"carhartt-wip",c:"workwear"},{n:"Carlos Santos",s:"carlos-santos",c:"footwear"},{n:"Carmina",s:"carmina",c:"footwear"},{n:"Charles Tyrwhitt",s:"charles-tyrwhitt",c:"formalwear"},{n:"Church's",s:"churchs",c:"footwear"},{n:"Clarks",s:"clarks",c:"footwear"},{n:"Closed",s:"closed",c:"denim"},{n:"Club Monaco",s:"club-monaco",c:"smart-casual"},{n:"Cobbler Union",s:"cobbler-union",c:"footwear"},{n:"Colhay's",s:"colhays",c:"knitwear"},{n:"Corridor",s:"corridor",c:"casualwear"},{n:"CP Company",s:"cp-company",c:"outerwear"},{n:"Crockett & Jones",s:"crockett-and-jones",c:"footwear"},{n:"Crown Northampton",s:"crown-northampton",c:"footwear"},{n:"Dale of Norway",s:"dale-of-norway",c:"knitwear"},{n:"Danner",s:"danner",c:"footwear"},{n:"Dehen 1920",s:"dehen-1920",c:"outerwear"},{n:"Dime",s:"dime",c:"streetwear"},{n:"Drakes",s:"drakes",c:"formalwear"},{n:"Duckworth",s:"duckworth",c:"knitwear"},{n:"Edwin",s:"edwin",c:"denim"},{n:"Eleventy",s:"eleventy",c:"smart-casual"},{n:"Engineered Garments",s:"engineered-garments",c:"workwear"},{n:"Eton Shirts",s:"eton-shirts",c:"formalwear"},{n:"Evan Kinori",s:"evan-kinori",c:"casualwear"},{n:"Everlane",s:"everlane",c:"basics"},{n:"Faherty Brand",s:"faherty-brand",c:"casualwear"},{n:"Filson",s:"filson",c:"outerwear"},{n:"Folk",s:"folk",c:"casualwear"},{n:"Frank And Oak",s:"frank-and-oak",c:"casualwear"},{n:"Goldwin",s:"goldwin",c:"outerwear"},{n:"Grant Stone",s:"grant-stone",c:"footwear"},{n:"Grenson",s:"grenson",c:"footwear"},{n:"HAVEN",s:"haven",c:"streetwear"},{n:"Inis Meáin",s:"inis-meain",c:"knitwear"},{n:"Iron Heart",s:"iron-heart",c:"denim"},{n:"J.Crew",s:"j-crew",c:"casualwear"},{n:"John Smedley",s:"john-smedley",c:"knitwear"},{n:"Johnstons of Elgin",s:"johnstons-of-elgin",c:"knitwear"},{n:"Kanata",s:"kanata",c:"knitwear"},{n:"Kapital",s:"kapital",c:"casualwear"},{n:"Kardo",s:"kardo",c:"casualwear"},{n:"KESTIN",s:"kestin",c:"casualwear"},{n:"Kith",s:"kith",c:"streetwear"},{n:"Kotn",s:"kotn",c:"basics"},{n:"L.B.M. 1911",s:"l-b-m-1911",c:"smart-casual"},{n:"Lady White Co.",s:"lady-white-co",c:"basics"},{n:"Lemaire",s:"lemaire",c:"casualwear"},{n:"Levi's Vintage Clothing",s:"levis-vintage-clothing",c:"denim"},{n:"LL Bean",s:"ll-bean",c:"outerwear"},{n:"Loake",s:"loake",c:"footwear"},{n:"Mackintosh",s:"mackintosh",c:"outerwear"},{n:"Magee 1866",s:"magee-1866",c:"outerwear"},{n:"Margaret Howell",s:"margaret-howell",c:"casualwear"},{n:"Meermin",s:"meermin",c:"footwear"},{n:"Merz b. Schwanen",s:"merz-b-schwanen",c:"basics"},{n:"Momotaro",s:"momotaro",c:"denim"},{n:"Monitaly",s:"monitaly",c:"casualwear"},{n:"Naked & Famous",s:"naked-and-famous",c:"denim"},{n:"Nanamica",s:"nanamica",c:"outerwear"},{n:"New Balance",s:"new-balance",c:"footwear"},{n:"Nigel Cabourn",s:"nigel-cabourn",c:"outerwear"},{n:"NN07",s:"nn07",c:"casualwear"},{n:"Noah NYC",s:"noah-nyc",c:"streetwear"},{n:"Norse Projects",s:"norse-projects",c:"casualwear"},{n:"Officine Générale",s:"officine-generale",c:"smart-casual"},{n:"Oliver Spencer",s:"oliver-spencer",c:"smart-casual"},{n:"Oni Denim",s:"oni-denim",c:"denim"},{n:"Orslow",s:"orslow",c:"casualwear"},{n:"Our Legacy",s:"our-legacy",c:"casualwear"},{n:"Outerknown",s:"outerknown",c:"casualwear"},{n:"Paraboot",s:"paraboot",c:"footwear"},{n:"Patagonia",s:"patagonia",c:"outerwear"},{n:"Paul Smith",s:"paul-smith",c:"smart-casual"},{n:"Pendleton",s:"pendleton",c:"outerwear"},{n:"Peter Millar",s:"peter-millar",c:"smart-casual"},{n:"Portuguese Flannel",s:"portuguese-flannel",c:"casualwear"},{n:"Private White V.C.",s:"private-white-vc",c:"outerwear"},{n:"Proper Cloth",s:"proper-cloth",c:"formalwear"},{n:"Pure Blue Japan",s:"pure-blue-japan",c:"denim"},{n:"Rancourt & Co",s:"rancourt-and-co",c:"footwear"},{n:"Red Wing",s:"red-wing",c:"footwear"},{n:"Reigning Champ",s:"reigning-champ",c:"casualwear"},{n:"Ring Jacket",s:"ring-jacket",c:"formalwear"},{n:"Rogue Territory",s:"rogue-territory",c:"denim"},{n:"Roots",s:"roots",c:"casualwear"},{n:"Saman Amel",s:"saman-amel",c:"formalwear"},{n:"Schott NYC",s:"schott-nyc",c:"outerwear"},{n:"Sid Mashburn",s:"sid-mashburn",c:"smart-casual"},{n:"Spier & Mackay",s:"spier-and-mackay",c:"formalwear"},{n:"Stan Ray",s:"stan-ray",c:"workwear"},{n:"Stone Island",s:"stone-island",c:"outerwear"},{n:"Story Mfg.",s:"story-mfg",c:"casualwear"},{n:"Studio Donegal",s:"studio-donegal",c:"knitwear"},{n:"Studio Nicholson",s:"studio-nicholson",c:"casualwear"},{n:"Stüssy",s:"stussy",c:"streetwear"},{n:"Suitsupply",s:"suitsupply",c:"formalwear"},{n:"Sunspel",s:"sunspel",c:"basics"},{n:"Taylor Stitch",s:"taylor-stitch",c:"casualwear"},{n:"Tellason",s:"tellason",c:"denim"},{n:"The Armoury",s:"the-armoury",c:"formalwear"},{n:"Thom Browne",s:"thom-browne",c:"formalwear"},{n:"Thursday Boot Co.",s:"thursday-boot-co",c:"footwear"},{n:"Todd Snyder",s:"todd-snyder",c:"casualwear"},{n:"Tricker's",s:"trickers",c:"footwear"},{n:"Universal Works",s:"universal-works",c:"workwear"},{n:"Velasca",s:"velasca",c:"footwear"},{n:"Vetra",s:"vetra",c:"workwear"},{n:"Viberg",s:"viberg",c:"footwear"},{n:"Visvim",s:"visvim",c:"casualwear"},{n:"Warehouse & Co.",s:"warehouse-and-co",c:"denim"},{n:"Wax London",s:"wax-london",c:"casualwear"},{n:"Wings+Horns",s:"wings-horns",c:"streetwear"},{n:"Woolrich",s:"woolrich",c:"outerwear"}
  ].map(function(b){ return {name:b.n, slug:b.s, category:b.c}; });

  var openPanel = null;
  var brands = [];
  var activeBrandCat = 'all';
  var chevronObserver = null;

  function isDesktop() { return window.innerWidth >= DESKTOP_MIN; }

  function init() {
    loadBrandData();
    if (isDesktop()) {
      bindNavTriggers();
      watchChevrons();
    }
    bindTabs();
    bindSearch();
    bindBackdrop();
    bindKeyboard();
    bindContentClicks();
    bindCloseButtons();
    renderBrands('all', '');
  }

  function loadBrandData() {
    var el = document.getElementById('trg-mm-brand-data');
    if (el) {
      try {
        var data = JSON.parse(el.textContent);
        if (Array.isArray(data) && data.length > 0) { brands = data; return; }
      } catch (e) {}
    }
    brands = FALLBACK_BRANDS;
  }

  function bindNavTriggers() {
    var menuItems = document.querySelectorAll('header-menu .menu-list__list-item, .header-menu .menu-list__list-item');
    menuItems.forEach(function (li) {
      var link = li.querySelector('.menu-list__link');
      if (!link) return;
      var text = (link.textContent || '').replace(/\s+/g,' ').trim().toLowerCase();
      var panelKey = null;
      if (text === 'brands') panelKey = 'brands';
      else if (text === 'products') panelKey = 'shop';
      if (!panelKey) return;

      li.removeAttribute('on:click');
      li.removeAttribute('on:focus');

      link.addEventListener('mousedown', function (e) { e.preventDefault(); });
      link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        togglePanel(panelKey);
      });

      link.setAttribute('data-trg-panel', panelKey);
      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');
      link.style.position = 'relative';
      injectChevron(link);
    });
  }

  function injectChevron(link) {
    if (link.querySelector('.trg-mm-chevron')) return;
    var chv = document.createElement('span');
    chv.className = 'trg-mm-chevron';
    chv.setAttribute('aria-hidden', 'true');
    link.appendChild(chv);
  }

  function watchChevrons() {
    if (chevronObserver) chevronObserver.disconnect();
    var headerMenu = document.querySelector('header-menu');
    if (!headerMenu) return;
    chevronObserver = new MutationObserver(function () {
      document.querySelectorAll('[data-trg-panel]').forEach(function (link) {
        injectChevron(link);
      });
    });
    chevronObserver.observe(headerMenu, { childList: true, subtree: true });
  }

  function togglePanel(key) {
    if (openPanel === key) { closeAll(); return; }
    closeAll(false);
    openPanel = key;
    var panel = document.getElementById(PANELS[key]);
    var backdrop = document.getElementById(BACKDROP_ID);
    if (panel) panel.classList.add('is-visible');
    if (backdrop) backdrop.classList.add('is-visible');
    document.querySelectorAll('[data-trg-panel]').forEach(function (el) {
      el.setAttribute('aria-expanded', el.dataset.trgPanel === key ? 'true' : 'false');
    });
    if (key === 'brands') {
      var input = document.getElementById('trg-mm-brand-input');
      if (input) setTimeout(function () { input.focus(); }, 120);
    }
  }

  function closeAll(resetState) {
    if (resetState === undefined) resetState = true;
    Object.keys(PANELS).forEach(function (k) {
      var el = document.getElementById(PANELS[k]);
      if (el) el.classList.remove('is-visible');
    });
    var backdrop = document.getElementById(BACKDROP_ID);
    if (backdrop) backdrop.classList.remove('is-visible');
    document.querySelectorAll('[data-trg-panel]').forEach(function (el) {
      el.setAttribute('aria-expanded', 'false');
    });
    if (resetState) {
      openPanel = null;
      var input = document.getElementById('trg-mm-brand-input');
      if (input && input.value) {
        input.value = '';
        renderBrands(activeBrandCat, '');
        updateSearchUI('');
      }
    }
  }

  function bindContentClicks() {
    Object.keys(PANELS).forEach(function (k) {
      var panel = document.getElementById(PANELS[k]);
      if (!panel) return;
      panel.addEventListener('click', function (e) {
        e.stopPropagation();
        var link = e.target.closest('a[href]');
        if (link && link.href && !link.href.endsWith('#')) { closeAll(); }
      });
    });
  }

  function bindCloseButtons() {
    document.querySelectorAll('.trg-mm-close').forEach(function (btn) {
      btn.addEventListener('click', function () { closeAll(); });
    });
  }

  function bindTabs() {
    document.querySelectorAll('.trg-mm-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tabId = btn.dataset.tab;
        if (!tabId) return;
        var sidebar = btn.closest('.trg-mm-sidebar');
        if (sidebar) sidebar.querySelectorAll('.trg-mm-tab').forEach(function (t) { t.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var panel = btn.closest('.trg-mm-panel');
        if (panel) {
          panel.querySelectorAll('.trg-mm-pane').forEach(function (p) { p.classList.remove('is-active'); });
          var pane = document.getElementById('trg-mm-pane-' + tabId);
          if (pane) pane.classList.add('is-active');
        }
        var brandCat = btn.dataset.brandCat;
        if (brandCat !== undefined || tabId === 'brands-all') {
          activeBrandCat = brandCat || 'all';
          var input = document.getElementById('trg-mm-brand-input');
          renderBrands(activeBrandCat, input ? input.value.trim() : '');
        }
      });
    });
  }

  function renderBrands(category, searchQuery) {
    var grid = document.getElementById('trg-mm-brand-grid');
    if (!grid) return;
    var q = searchQuery.toLowerCase();
    var filtered = brands.slice();
    if (category && category !== 'all') filtered = filtered.filter(function (b) { return b.category === category; });
    if (q) filtered = filtered.filter(function (b) { return b.name.toLowerCase().indexOf(q) !== -1; });
    filtered.sort(function (a, b) {
      return a.name.replace(/^[^a-zA-Z]+/,'').localeCompare(b.name.replace(/^[^a-zA-Z]+/,''), 'en', {sensitivity:'base'});
    });
    grid.classList.remove('is-search-results', 'is-category');
    if (filtered.length === 0) {
      grid.innerHTML = '<div class="trg-mm-no-results">No brands found' + (q ? ' for \u201c' + esc(searchQuery) + '\u201d' : '') + '</div>';
      return;
    }
    if (q) {
      grid.classList.add('is-search-results');
      grid.innerHTML = filtered.map(function (b) {
        var idx = b.name.toLowerCase().indexOf(q);
        return '<a href="/pages/brands/' + b.slug + '" class="trg-mm-brand-link">' +
          b.name.slice(0, idx) + '<mark>' + b.name.slice(idx, idx + q.length) + '</mark>' + b.name.slice(idx + q.length) + '</a>';
      }).join('');
      return;
    }
    if (category && category !== 'all') {
      grid.classList.add('is-category');
      grid.innerHTML = filtered.map(function (b) {
        return '<a href="/pages/brands/' + b.slug + '" class="trg-mm-brand-link">' + esc(b.name) + '</a>';
      }).join('');
      return;
    }
    var grouped = {};
    filtered.forEach(function (b) {
      var letter = b.name.replace(/^[^a-zA-Z]+/,'').charAt(0).toUpperCase() || '#';
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(b);
    });
    var letters = Object.keys(grouped).sort();
    var perCol = Math.ceil(letters.length / 5);
    var cols = [];
    for (var i = 0; i < 5; i++) cols.push(letters.slice(i * perCol, (i + 1) * perCol));
    grid.innerHTML = cols.map(function (colLetters) {
      if (!colLetters.length) return '';
      return '<div class="trg-mm-col">' + colLetters.map(function (l) {
        return '<div class="trg-mm-letter">' + l + '</div>' +
          grouped[l].map(function (b) {
            return '<a href="/pages/brands/' + b.slug + '" class="trg-mm-brand-link">' + esc(b.name) + '</a>';
          }).join('');
      }).join('') + '</div>';
    }).join('');
  }

  function bindSearch() {
    var input = document.getElementById('trg-mm-brand-input');
    var clearBtn = document.getElementById('trg-mm-search-clear');
    if (!input) return;
    input.addEventListener('input', function () {
      var q = input.value.trim();
      renderBrands(activeBrandCat, q);
      updateSearchUI(q);
    });
    if (clearBtn) clearBtn.addEventListener('click', function () {
      input.value = ''; input.focus();
      renderBrands(activeBrandCat, '');
      updateSearchUI('');
    });
  }

  function updateSearchUI(query) {
    var meta = document.getElementById('trg-mm-search-meta');
    var clearBtn = document.getElementById('trg-mm-search-clear');
    if (clearBtn) clearBtn.classList.toggle('is-visible', query.length > 0);
    if (!meta) return;
    if (!query) { meta.innerHTML = ''; return; }
    var q = query.toLowerCase();
    var filtered = brands;
    if (activeBrandCat !== 'all') filtered = filtered.filter(function (b) { return b.category === activeBrandCat; });
    var count = filtered.filter(function (b) { return b.name.toLowerCase().indexOf(q) !== -1; }).length;
    meta.innerHTML = '<strong>' + count + '</strong> brand' + (count !== 1 ? 's' : '') + ' matching \u201c' + esc(query) + '\u201d';
  }

  function bindBackdrop() {
    var bd = document.getElementById(BACKDROP_ID);
    if (bd) bd.addEventListener('click', function () { closeAll(); });
  }

  function bindKeyboard() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openPanel) closeAll();
    });
  }

  function esc(str) { var d = document.createElement('div'); d.textContent = str; return d.innerHTML; }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.addEventListener('resize', function () {
    if (!isDesktop() && openPanel) closeAll();
  });

  document.addEventListener('shopify:section:load', function (e) {
    if (
      e.target &&
      e.target.querySelector &&
      (e.target.querySelector('header-menu') || e.target.querySelector('#trg-mm-brand-data'))
    ) {
      setTimeout(init, 150);
    }
  });
})();
