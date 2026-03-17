(function () {
  'use strict';

  var PANELS = {
    shop: 'trg-mm-panel-shop',
    brands: 'trg-mm-panel-brands'
  };
  var BACKDROP_ID = 'trg-mm-backdrop';

  var FALLBACK_BRANDS = [
    { name: "3sixteen", slug: "3sixteen", category: "denim" },
    { name: "A Day's March", slug: "a-days-march", category: "casualwear" },
    { name: "A Kind of Guise", slug: "a-kind-of-guise", category: "casualwear" },
    { name: "A.P.C.", slug: "a-p-c", category: "casualwear" },
    { name: "Ace Marks", slug: "ace-marks", category: "footwear" },
    { name: "Aime Leon Dore", slug: "aime-leon-dore", category: "streetwear" },
    { name: "Allen Edmonds", slug: "allen-edmonds", category: "footwear" },
    { name: "AMI Paris", slug: "ami-paris", category: "smart-casual" },
    { name: "Anglo-Italian", slug: "anglo-italian", category: "smart-casual" },
    { name: "Aran Sweater Market", slug: "aran-sweater-market", category: "knitwear" },
    { name: "Arc'teryx", slug: "arcteryx", category: "outerwear" },
    { name: "Arpenteur", slug: "arpenteur", category: "workwear" },
    { name: "Asket", slug: "asket", category: "basics" },
    { name: "Aspesi", slug: "aspesi", category: "casualwear" },
    { name: "Astorflex", slug: "astorflex", category: "footwear" },
    { name: "Auralee", slug: "auralee", category: "casualwear" },
    { name: "Baracuta", slug: "baracuta", category: "outerwear" },
    { name: "Barbour", slug: "barbour", category: "outerwear" },
    { name: "Barena Venezia", slug: "barena-venezia", category: "smart-casual" },
    { name: "Beckett Simonon", slug: "beckett-simonon", category: "footwear" },
    { name: "Belstaff", slug: "belstaff", category: "outerwear" },
    { name: "Billy Reid", slug: "billy-reid", category: "casualwear" },
    { name: "Blundstone", slug: "blundstone", category: "footwear" },
    { name: "Bode", slug: "bode", category: "casualwear" },
    { name: "Boglioli", slug: "boglioli", category: "formalwear" },
    { name: "Bonobos", slug: "bonobos", category: "smart-casual" },
    { name: "Brooks Brothers", slug: "brooks-brothers", category: "formalwear" },
    { name: "Buck Mason", slug: "buck-mason", category: "basics" },
    { name: "Canada Goose", slug: "canada-goose", category: "outerwear" },
    { name: "Carhartt WIP", slug: "carhartt-wip", category: "workwear" },
    { name: "Carlos Santos", slug: "carlos-santos", category: "footwear" },
    { name: "Carmina", slug: "carmina", category: "footwear" },
    { name: "Charles Tyrwhitt", slug: "charles-tyrwhitt", category: "formalwear" },
    { name: "Church's", slug: "churchs", category: "footwear" },
    { name: "Clarks", slug: "clarks", category: "footwear" },
    { name: "Closed", slug: "closed", category: "denim" },
    { name: "Club Monaco", slug: "club-monaco", category: "smart-casual" },
    { name: "Cobbler Union", slug: "cobbler-union", category: "footwear" },
    { name: "Colhay's", slug: "colhays", category: "knitwear" },
    { name: "Corridor", slug: "corridor", category: "casualwear" },
    { name: "CP Company", slug: "cp-company", category: "outerwear" },
    { name: "Crockett & Jones", slug: "crockett-and-jones", category: "footwear" },
    { name: "Crown Northampton", slug: "crown-northampton", category: "footwear" },
    { name: "Dale of Norway", slug: "dale-of-norway", category: "knitwear" },
    { name: "Danner", slug: "danner", category: "footwear" },
    { name: "Dehen 1920", slug: "dehen-1920", category: "outerwear" },
    { name: "Dime", slug: "dime", category: "streetwear" },
    { name: "Drakes", slug: "drakes", category: "formalwear" },
    { name: "Duckworth", slug: "duckworth", category: "knitwear" },
    { name: "Edwin", slug: "edwin", category: "denim" },
    { name: "Eleventy", slug: "eleventy", category: "smart-casual" },
    { name: "Engineered Garments", slug: "engineered-garments", category: "workwear" },
    { name: "Eton Shirts", slug: "eton-shirts", category: "formalwear" },
    { name: "Evan Kinori", slug: "evan-kinori", category: "casualwear" },
    { name: "Everlane", slug: "everlane", category: "basics" },
    { name: "Faherty Brand", slug: "faherty-brand", category: "casualwear" },
    { name: "Filson", slug: "filson", category: "outerwear" },
    { name: "Folk", slug: "folk", category: "casualwear" },
    { name: "Frank And Oak", slug: "frank-and-oak", category: "casualwear" },
    { name: "Goldwin", slug: "goldwin", category: "outerwear" },
    { name: "Grant Stone", slug: "grant-stone", category: "footwear" },
    { name: "Grenson", slug: "grenson", category: "footwear" },
    { name: "HAVEN", slug: "haven", category: "streetwear" },
    { name: "Inis Meáin", slug: "inis-meain", category: "knitwear" },
    { name: "Iron Heart", slug: "iron-heart", category: "denim" },
    { name: "J.Crew", slug: "j-crew", category: "casualwear" },
    { name: "John Smedley", slug: "john-smedley", category: "knitwear" },
    { name: "Johnstons of Elgin", slug: "johnstons-of-elgin", category: "knitwear" },
    { name: "Kanata", slug: "kanata", category: "knitwear" },
    { name: "Kapital", slug: "kapital", category: "casualwear" },
    { name: "Kardo", slug: "kardo", category: "casualwear" },
    { name: "KESTIN", slug: "kestin", category: "casualwear" },
    { name: "Kith", slug: "kith", category: "streetwear" },
    { name: "Kotn", slug: "kotn", category: "basics" },
    { name: "L.B.M. 1911", slug: "l-b-m-1911", category: "smart-casual" },
    { name: "Lady White Co.", slug: "lady-white-co", category: "basics" },
    { name: "Lemaire", slug: "lemaire", category: "casualwear" },
    { name: "Levi's Vintage Clothing", slug: "levis-vintage-clothing", category: "denim" },
    { name: "LL Bean", slug: "ll-bean", category: "outerwear" },
    { name: "Loake", slug: "loake", category: "footwear" },
    { name: "Mackintosh", slug: "mackintosh", category: "outerwear" },
    { name: "Magee 1866", slug: "magee-1866", category: "outerwear" },
    { name: "Margaret Howell", slug: "margaret-howell", category: "casualwear" },
    { name: "Meermin", slug: "meermin", category: "footwear" },
    { name: "Merz b. Schwanen", slug: "merz-b-schwanen", category: "basics" },
    { name: "Momotaro", slug: "momotaro", category: "denim" },
    { name: "Monitaly", slug: "monitaly", category: "casualwear" },
    { name: "Naked & Famous", slug: "naked-and-famous", category: "denim" },
    { name: "Nanamica", slug: "nanamica", category: "outerwear" },
    { name: "New Balance", slug: "new-balance", category: "footwear" },
    { name: "Nigel Cabourn", slug: "nigel-cabourn", category: "outerwear" },
    { name: "NN07", slug: "nn07", category: "casualwear" },
    { name: "Noah NYC", slug: "noah-nyc", category: "streetwear" },
    { name: "Norse Projects", slug: "norse-projects", category: "casualwear" },
    { name: "Officine Générale", slug: "officine-generale", category: "smart-casual" },
    { name: "Oliver Spencer", slug: "oliver-spencer", category: "smart-casual" },
    { name: "Oni Denim", slug: "oni-denim", category: "denim" },
    { name: "Orslow", slug: "orslow", category: "casualwear" },
    { name: "Our Legacy", slug: "our-legacy", category: "casualwear" },
    { name: "Outerknown", slug: "outerknown", category: "casualwear" },
    { name: "Paraboot", slug: "paraboot", category: "footwear" },
    { name: "Patagonia", slug: "patagonia", category: "outerwear" },
    { name: "Paul Smith", slug: "paul-smith", category: "smart-casual" },
    { name: "Pendleton", slug: "pendleton", category: "outerwear" },
    { name: "Peter Millar", slug: "peter-millar", category: "smart-casual" },
    { name: "Portuguese Flannel", slug: "portuguese-flannel", category: "casualwear" },
    { name: "Private White V.C.", slug: "private-white-vc", category: "outerwear" },
    { name: "Proper Cloth", slug: "proper-cloth", category: "formalwear" },
    { name: "Pure Blue Japan", slug: "pure-blue-japan", category: "denim" },
    { name: "Rancourt & Co", slug: "rancourt-and-co", category: "footwear" },
    { name: "Red Wing", slug: "red-wing", category: "footwear" },
    { name: "Reigning Champ", slug: "reigning-champ", category: "casualwear" },
    { name: "Ring Jacket", slug: "ring-jacket", category: "formalwear" },
    { name: "Rogue Territory", slug: "rogue-territory", category: "denim" },
    { name: "Roots", slug: "roots", category: "casualwear" },
    { name: "Saman Amel", slug: "saman-amel", category: "formalwear" },
    { name: "Schott NYC", slug: "schott-nyc", category: "outerwear" },
    { name: "Sid Mashburn", slug: "sid-mashburn", category: "smart-casual" },
    { name: "Spier & Mackay", slug: "spier-and-mackay", category: "formalwear" },
    { name: "Stan Ray", slug: "stan-ray", category: "workwear" },
    { name: "Stone Island", slug: "stone-island", category: "outerwear" },
    { name: "Story Mfg.", slug: "story-mfg", category: "casualwear" },
    { name: "Studio Donegal", slug: "studio-donegal", category: "knitwear" },
    { name: "Studio Nicholson", slug: "studio-nicholson", category: "casualwear" },
    { name: "Stüssy", slug: "stussy", category: "streetwear" },
    { name: "Suitsupply", slug: "suitsupply", category: "formalwear" },
    { name: "Sunspel", slug: "sunspel", category: "basics" },
    { name: "Taylor Stitch", slug: "taylor-stitch", category: "casualwear" },
    { name: "Tellason", slug: "tellason", category: "denim" },
    { name: "The Armoury", slug: "the-armoury", category: "formalwear" },
    { name: "Thom Browne", slug: "thom-browne", category: "formalwear" },
    { name: "Thursday Boot Co.", slug: "thursday-boot-co", category: "footwear" },
    { name: "Todd Snyder", slug: "todd-snyder", category: "casualwear" },
    { name: "Tricker's", slug: "trickers", category: "footwear" },
    { name: "Universal Works", slug: "universal-works", category: "workwear" },
    { name: "Velasca", slug: "velasca", category: "footwear" },
    { name: "Vetra", slug: "vetra", category: "workwear" },
    { name: "Viberg", slug: "viberg", category: "footwear" },
    { name: "Visvim", slug: "visvim", category: "casualwear" },
    { name: "Warehouse & Co.", slug: "warehouse-and-co", category: "denim" },
    { name: "Wax London", slug: "wax-london", category: "casualwear" },
    { name: "Wings+Horns", slug: "wings-horns", category: "streetwear" },
    { name: "Woolrich", slug: "woolrich", category: "outerwear" }
  ];

  var openPanel = null;
  var brands = [];
  var activeBrandCat = 'all';

  function init() {
    loadBrandData();
    bindNavTriggers();
    bindTabs();
    bindSearch();
    bindBackdrop();
    bindKeyboard();
    bindContentClicks();
    renderBrands('all', '');
  }

  function loadBrandData() {
    var el = document.getElementById('trg-mm-brand-data');
    if (el) {
      try {
        var data = JSON.parse(el.textContent);
        if (Array.isArray(data) && data.length > 0) {
          brands = data;
          return;
        }
      } catch (e) {}
    }
    brands = FALLBACK_BRANDS;
  }

  function bindNavTriggers() {
    var menuItems = document.querySelectorAll('header-menu .menu-list__list-item, .header-menu .menu-list__list-item');

    menuItems.forEach(function (li) {
      var link = li.querySelector('.menu-list__link');
      if (!link) return;

      var text = (link.textContent || '').trim().toLowerCase();
      var panelKey = null;

      if (text === 'brands') panelKey = 'brands';
      else if (text === 'products') panelKey = 'shop';

      if (!panelKey) return;

      if (link.dataset.trgMmBound === 'true') {
        return;
      }

      li.removeAttribute('on:click');
      li.removeAttribute('on:focus');

      link.addEventListener('mousedown', function (e) {
        e.preventDefault();
      });

      link.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        togglePanel(panelKey);
      });

      link.setAttribute('data-trg-panel', panelKey);
      link.setAttribute('aria-haspopup', 'true');
      link.setAttribute('aria-expanded', 'false');
      link.style.position = 'relative';

      if (!link.querySelector('.trg-mm-chevron')) {
        var chevron = document.createElement('span');
        chevron.className = 'trg-mm-chevron';
        chevron.setAttribute('aria-hidden', 'true');
        link.appendChild(chevron);
      }

      link.dataset.trgMmBound = 'true';
    });
  }

  function togglePanel(key) {
    if (openPanel === key) {
      closeAll();
      return;
    }
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
      if (input) setTimeout(function () { input.focus(); }, 100);
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
      if (panel.dataset.trgMmPanelClicksBound === 'true') return;
      panel.addEventListener('click', function (e) {
        e.stopPropagation();
        var link = e.target.closest('a[href]');
        if (link && link.href && !link.href.endsWith('#')) {
          closeAll();
        }
      });
      panel.dataset.trgMmPanelClicksBound = 'true';
    });
  }

  function bindTabs() {
    document.querySelectorAll('.trg-mm-tab').forEach(function (btn) {
      if (btn.dataset.trgMmBound === 'true') return;
      btn.addEventListener('click', function () {
        var tabId = btn.dataset.tab;
        if (!tabId) return;

        var sidebar = btn.closest('.trg-mm-sidebar');
        if (sidebar) {
          sidebar.querySelectorAll('.trg-mm-tab').forEach(function (t) { t.classList.remove('is-active'); });
        }
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
          var query = input ? input.value.trim() : '';
          renderBrands(activeBrandCat, query);
        }
      });
      btn.dataset.trgMmBound = 'true';
    });
  }

  function renderBrands(category, searchQuery) {
    var grid = document.getElementById('trg-mm-brand-grid');
    if (!grid) return;

    var q = searchQuery.toLowerCase();
    var filtered = brands.slice();

    if (category && category !== 'all') {
      filtered = filtered.filter(function (b) { return b.category === category; });
    }
    if (q) {
      filtered = filtered.filter(function (b) { return b.name.toLowerCase().indexOf(q) !== -1; });
    }

    filtered.sort(function (a, b) {
      var aClean = a.name.replace(/^[^a-zA-Z]+/, '');
      var bClean = b.name.replace(/^[^a-zA-Z]+/, '');
      return aClean.localeCompare(bClean, 'en', { sensitivity: 'base' });
    });

    grid.classList.remove('is-search-results', 'is-category');

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="trg-mm-no-results">No brands found' + (q ? ' for \u201c' + escapeHtml(searchQuery) + '\u201d' : '') + '</div>';
      return;
    }

    if (q) {
      grid.classList.add('is-search-results');
      grid.innerHTML = filtered.map(function (b) {
        var idx = b.name.toLowerCase().indexOf(q);
        var highlighted = b.name.slice(0, idx)
          + '<mark>' + b.name.slice(idx, idx + q.length) + '</mark>'
          + b.name.slice(idx + q.length);
        return '<a href="/pages/brands/' + b.slug + '" class="trg-mm-brand-link">' + highlighted + '</a>';
      }).join('');
      return;
    }

    if (category && category !== 'all') {
      grid.classList.add('is-category');
      grid.innerHTML = filtered.map(function (b) {
        return '<a href="/pages/brands/' + b.slug + '" class="trg-mm-brand-link">' + escapeHtml(b.name) + '</a>';
      }).join('');
      return;
    }

    var grouped = {};
    filtered.forEach(function (b) {
      var letter = b.name.replace(/^[^a-zA-Z]+/, '').charAt(0).toUpperCase() || '#';
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(b);
    });

    var letters = Object.keys(grouped).sort();
    var perCol = Math.ceil(letters.length / 5);
    var cols = [];
    for (var i = 0; i < 5; i++) {
      cols.push(letters.slice(i * perCol, (i + 1) * perCol));
    }

    grid.innerHTML = cols.map(function (colLetters) {
      if (colLetters.length === 0) return '';
      return '<div class="trg-mm-col">' + colLetters.map(function (letter) {
        return '<div class="trg-mm-letter">' + letter + '</div>' +
          grouped[letter].map(function (b) {
            return '<a href="/pages/brands/' + b.slug + '" class="trg-mm-brand-link">' + escapeHtml(b.name) + '</a>';
          }).join('');
      }).join('') + '</div>';
    }).join('');
  }

  function bindSearch() {
    var input = document.getElementById('trg-mm-brand-input');
    var clearBtn = document.getElementById('trg-mm-search-clear');
    if (!input) return;
    if (input.dataset.trgMmBound === 'true') return;

    input.addEventListener('input', function () {
      var q = input.value.trim();
      renderBrands(activeBrandCat, q);
      updateSearchUI(q);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        input.focus();
        renderBrands(activeBrandCat, '');
        updateSearchUI('');
      });
    }

    input.dataset.trgMmBound = 'true';
  }

  function updateSearchUI(query) {
    var meta = document.getElementById('trg-mm-search-meta');
    var clearBtn = document.getElementById('trg-mm-search-clear');

    if (clearBtn) {
      clearBtn.classList.toggle('is-visible', query.length > 0);
    }

    if (meta) {
      if (!query) { meta.innerHTML = ''; return; }
      var q = query.toLowerCase();
      var filtered = brands;
      if (activeBrandCat !== 'all') {
        filtered = filtered.filter(function (b) { return b.category === activeBrandCat; });
      }
      var count = filtered.filter(function (b) { return b.name.toLowerCase().indexOf(q) !== -1; }).length;
      meta.innerHTML = '<strong>' + count + '</strong> brand' + (count !== 1 ? 's' : '') + ' matching \u201c' + escapeHtml(query) + '\u201d';
    }
  }

  function bindBackdrop() {
    var backdrop = document.getElementById(BACKDROP_ID);
    if (backdrop) {
      if (backdrop.dataset.trgMmBound === 'true') return;
      backdrop.addEventListener('click', function () { closeAll(); });
      backdrop.dataset.trgMmBound = 'true';
    }
  }

  function bindKeyboard() {
    if (document.documentElement.dataset.trgMmKeyboardBound === 'true') return;
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openPanel) { closeAll(); }
    });
    document.documentElement.dataset.trgMmKeyboardBound = 'true';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', function (e) {
    if (
      e.target &&
      e.target.querySelector &&
      (e.target.querySelector('header-menu') || e.target.querySelector('#trg-mm-brand-data'))
    ) {
      setTimeout(init, 100);
    }
  });
})();
