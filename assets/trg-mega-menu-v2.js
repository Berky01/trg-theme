/* TRG Mega Menu v4.7 — route-map + chip-selection + breadcrumb-fix */
(function(){
'use strict';
var P={shop:'trg-mm-p-shop',brands:'trg-mm-p-brands'},BK='trg-mm-bk',DK=990;
var SHOP_ROUTE_FIX={
'/collections/shirts-tops':'/collections/shirts',
'/collections/outerwear-jackets':'/collections/outerwear',
'/collections/trousers-bottoms':'/collections/bottoms',
'/collections/suits-tailoring':'/collections/tailoring'
};
var SHOP_SUBCATEGORY_ROUTE_FIX={
'casual-shirts':'/collections/casualwear',
'dress-shirts':'/collections/mens-dress-shirts',
't-shirts':'/collections/t-shirts',
'polos':'/collections/polos',
'overshirts':'/collections/mens-overshirts',
'camp-collar':'/collections/shirting',
'henleys':'/collections/basics',
'linen-summer':'/collections/linen-clothing',
'field-barn-jacket':'/collections/mens-field-jackets',
'waxed-cotton':'/collections/waxed-jackets',
'down-insulated':'/collections/mens-down-jackets',
'raincoat-mac':'/collections/mens-rainwear',
'harrington-bomber':'/collections/mens-harrington-jackets',
'parka':'/collections/parkas',
'leather-jacket':'/collections/leather-jackets',
'overcoat-topcoat':'/collections/mens-overcoats',
'chinos':'/collections/mens-chinos',
'dress-trousers':'/collections/formalwear',
'shorts':'/collections/shorts',
'sweatpants-joggers':'/collections/sweatpants',
'corduroy':'/collections/corduroy-trousers',
'cargo-utility':'/collections/workwear-inspired',
'boots':'/collections/boots',
'oxford-derby':'/collections/mens-dress-shoes',
'loafers':'/collections/mens-loafers',
'sneakers':'/collections/mens-sneakers',
'moccasins':'/collections/moccasins',
'sandals':'/collections/sandals',
'bespoke-mto':'/collections/handwelted-shoes',
'crewneck':'/collections/crewneck-sweaters',
'cardigan':'/collections/cardigans',
'turtleneck':'/collections/turtlenecks',
'fisherman-cable':'/collections/wool-clothing',
'cashmere':'/collections/cashmere-clothing',
'merino':'/collections/merino-wool-clothing',
'jeans':'/collections/jeans',
'denim-jacket':'/collections/denim-jackets',
'raw-selvedge':'/collections/selvedge-denim',
'slim-tapered':'/collections/slim-tapered-jeans',
'straight-relaxed':'/collections/straight-relaxed-jeans',
'suits':'/collections/suits',
'sport-coats-blazers':'/collections/blazers',
'tuxedo-black-tie':'/collections/formalwear',
'bespoke-mtm':'/collections/bespoke-menswear',
'waistcoats':'/collections/formalwear',
'ties-pocket-squares':'/collections/mens-ties',
'belts':'/collections/belts',
'bags-leather-goods':'/collections/bags',
'scarves-hats':'/collections/mens-hats-and-caps',
'socks-underwear':'/collections/mens-underwear'
};
var FB=[
{n:"3sixteen",s:"3sixteen",c:"denim"},{n:"A Day's March",s:"a-days-march",c:"casualwear"},{n:"A Kind of Guise",s:"a-kind-of-guise",c:"casualwear"},{n:"A.P.C.",s:"a-p-c",c:"casualwear"},{n:"Ace Marks",s:"ace-marks",c:"footwear"},{n:"Aime Leon Dore",s:"aime-leon-dore",c:"streetwear"},{n:"Allen Edmonds",s:"allen-edmonds",c:"footwear"},{n:"Anglo-Italian",s:"anglo-italian",c:"smart-casual"},{n:"Aran Sweater Market",s:"aran-sweater-market",c:"knitwear"},{n:"Arc'teryx",s:"arcteryx",c:"outerwear"},{n:"Arpenteur",s:"arpenteur",c:"workwear"},{n:"Asket",s:"asket",c:"basics"},{n:"Aspesi",s:"aspesi",c:"casualwear"},{n:"Astorflex",s:"astorflex",c:"footwear"},{n:"Auralee",s:"auralee",c:"casualwear"},{n:"Baracuta",s:"baracuta",c:"outerwear"},{n:"Barbour",s:"barbour",c:"outerwear"},{n:"Barena Venezia",s:"barena-venezia",c:"smart-casual"},{n:"Beckett Simonon",s:"beckett-simonon",c:"footwear"},{n:"Belstaff",s:"belstaff",c:"outerwear"},{n:"Billy Reid",s:"billy-reid",c:"casualwear"},{n:"Blundstone",s:"blundstone",c:"footwear"},{n:"Bode",s:"bode",c:"casualwear"},{n:"Boglioli",s:"boglioli",c:"formalwear"},{n:"Bonobos",s:"bonobos",c:"smart-casual"},{n:"Brooks Brothers",s:"brooks-brothers",c:"formalwear"},{n:"Buck Mason",s:"buck-mason",c:"basics"},{n:"Canada Goose",s:"canada-goose",c:"outerwear"},{n:"Carhartt WIP",s:"carhartt-wip",c:"workwear"},{n:"Carlos Santos",s:"carlos-santos",c:"footwear"},{n:"Carmina",s:"carmina",c:"footwear"},{n:"Charles Tyrwhitt",s:"charles-tyrwhitt",c:"formalwear"},{n:"Church's",s:"churchs",c:"footwear"},{n:"Clarks",s:"clarks",c:"footwear"},{n:"Closed",s:"closed",c:"denim"},{n:"Club Monaco",s:"club-monaco",c:"smart-casual"},{n:"Cobbler Union",s:"cobbler-union",c:"footwear"},{n:"Colhay's",s:"colhays",c:"knitwear"},{n:"Corridor",s:"corridor",c:"casualwear"},{n:"CP Company",s:"cp-company",c:"outerwear"},{n:"Crockett & Jones",s:"crockett-and-jones",c:"footwear"},{n:"Crown Northampton",s:"crown-northampton",c:"footwear"},{n:"Dale of Norway",s:"dale-of-norway",c:"knitwear"},{n:"Danner",s:"danner",c:"footwear"},{n:"Dehen 1920",s:"dehen-1920",c:"outerwear"},{n:"Dime",s:"dime",c:"streetwear"},{n:"Drakes",s:"drakes",c:"formalwear"},{n:"Duckworth",s:"duckworth",c:"knitwear"},{n:"Edwin",s:"edwin",c:"denim"},{n:"Eleventy",s:"eleventy",c:"smart-casual"},{n:"Engineered Garments",s:"engineered-garments",c:"workwear"},{n:"Eton Shirts",s:"eton-shirts",c:"formalwear"},{n:"Evan Kinori",s:"evan-kinori",c:"casualwear"},{n:"Everlane",s:"everlane",c:"basics"},{n:"Faherty Brand",s:"faherty-brand",c:"casualwear"},{n:"Filson",s:"filson",c:"outerwear"},{n:"Folk",s:"folk",c:"casualwear"},{n:"Frank And Oak",s:"frank-and-oak",c:"casualwear"},{n:"Goldwin",s:"goldwin",c:"outerwear"},{n:"Grant Stone",s:"grant-stone",c:"footwear"},{n:"Grenson",s:"grenson",c:"footwear"},{n:"HAVEN",s:"haven",c:"streetwear"},{n:"Inis Meáin",s:"inis-meain",c:"knitwear"},{n:"Iron Heart",s:"iron-heart",c:"denim"},{n:"J.Crew",s:"j-crew",c:"casualwear"},{n:"John Smedley",s:"john-smedley",c:"knitwear"},{n:"Johnstons of Elgin",s:"johnstons-of-elgin",c:"knitwear"},{n:"Kanata",s:"kanata",c:"knitwear"},{n:"Kapital",s:"kapital",c:"casualwear"},{n:"Kardo",s:"kardo",c:"casualwear"},{n:"KESTIN",s:"kestin",c:"casualwear"},{n:"Kith",s:"kith",c:"streetwear"},{n:"Kotn",s:"kotn",c:"basics"},{n:"L.B.M. 1911",s:"l-b-m-1911",c:"smart-casual"},{n:"Lady White Co.",s:"lady-white-co",c:"basics"},{n:"Lemaire",s:"lemaire",c:"casualwear"},{n:"Levi's Vintage Clothing",s:"levis-vintage-clothing",c:"denim"},{n:"LL Bean",s:"ll-bean",c:"outerwear"},{n:"Loake",s:"loake",c:"footwear"},{n:"Mackintosh",s:"mackintosh",c:"outerwear"},{n:"Magee 1866",s:"magee-1866",c:"outerwear"},{n:"Margaret Howell",s:"margaret-howell",c:"casualwear"},{n:"Meermin",s:"meermin",c:"footwear"},{n:"Merz b. Schwanen",s:"merz-b-schwanen",c:"basics"},{n:"Momotaro",s:"momotaro",c:"denim"},{n:"Monitaly",s:"monitaly",c:"casualwear"},{n:"Naked & Famous",s:"naked-and-famous",c:"denim"},{n:"Nanamica",s:"nanamica",c:"outerwear"},{n:"New Balance",s:"new-balance",c:"footwear"},{n:"Nigel Cabourn",s:"nigel-cabourn",c:"outerwear"},{n:"NN07",s:"nn07",c:"casualwear"},{n:"Noah NYC",s:"noah-nyc",c:"streetwear"},{n:"Norse Projects",s:"norse-projects",c:"casualwear"},{n:"Officine Générale",s:"officine-generale",c:"smart-casual"},{n:"Oliver Spencer",s:"oliver-spencer",c:"smart-casual"},{n:"Oni Denim",s:"oni-denim",c:"denim"},{n:"Orslow",s:"orslow",c:"casualwear"},{n:"Our Legacy",s:"our-legacy",c:"casualwear"},{n:"Outerknown",s:"outerknown",c:"casualwear"},{n:"Paraboot",s:"paraboot",c:"footwear"},{n:"Patagonia",s:"patagonia",c:"outerwear"},{n:"Paul Smith",s:"paul-smith",c:"smart-casual"},{n:"Pendleton",s:"pendleton",c:"outerwear"},{n:"Peter Millar",s:"peter-millar",c:"smart-casual"},{n:"Portuguese Flannel",s:"portuguese-flannel",c:"casualwear"},{n:"Private White V.C.",s:"private-white-vc",c:"outerwear"},{n:"Proper Cloth",s:"proper-cloth",c:"formalwear"},{n:"Pure Blue Japan",s:"pure-blue-japan",c:"denim"},{n:"Rancourt & Co",s:"rancourt-and-co",c:"footwear"},{n:"Red Wing",s:"red-wing",c:"footwear"},{n:"Reigning Champ",s:"reigning-champ",c:"casualwear"},{n:"Ring Jacket",s:"ring-jacket",c:"formalwear"},{n:"Rogue Territory",s:"rogue-territory",c:"denim"},{n:"Roots",s:"roots",c:"casualwear"},{n:"Saman Amel",s:"saman-amel",c:"formalwear"},{n:"Schott NYC",s:"schott-nyc",c:"outerwear"},{n:"Sid Mashburn",s:"sid-mashburn",c:"smart-casual"},{n:"Spier & Mackay",s:"spier-and-mackay",c:"formalwear"},{n:"Stan Ray",s:"stan-ray",c:"workwear"},{n:"Stone Island",s:"stone-island",c:"outerwear"},{n:"Story Mfg.",s:"story-mfg",c:"casualwear"},{n:"Studio Donegal",s:"studio-donegal",c:"knitwear"},{n:"Studio Nicholson",s:"studio-nicholson",c:"casualwear"},{n:"Stüssy",s:"stussy",c:"streetwear"},{n:"Suitsupply",s:"suitsupply",c:"formalwear"},{n:"Sunspel",s:"sunspel",c:"basics"},{n:"Taylor Stitch",s:"taylor-stitch",c:"casualwear"},{n:"Tellason",s:"tellason",c:"denim"},{n:"The Armoury",s:"the-armoury",c:"formalwear"},{n:"Thom Browne",s:"thom-browne",c:"formalwear"},{n:"Thursday Boot Co.",s:"thursday-boot-co",c:"footwear"},{n:"Todd Snyder",s:"todd-snyder",c:"casualwear"},{n:"Tricker's",s:"trickers",c:"footwear"},{n:"Universal Works",s:"universal-works",c:"workwear"},{n:"Velasca",s:"velasca",c:"footwear"},{n:"Vetra",s:"vetra",c:"workwear"},{n:"Viberg",s:"viberg",c:"footwear"},{n:"Visvim",s:"visvim",c:"casualwear"},{n:"Warehouse & Co.",s:"warehouse-and-co",c:"denim"},{n:"Wax London",s:"wax-london",c:"casualwear"},{n:"Wings+Horns",s:"wings-horns",c:"streetwear"},{n:"Woolrich",s:"woolrich",c:"outerwear"}

].map(function(b){return{name:b.n,slug:b.s,category:b.c}});



var op=null,br=[],ac='all',mo=null;

function dk(){return window.innerWidth>=DK}

function $(id){return document.getElementById(id)}

function $$(s,r){return(r||document).querySelectorAll(s)}



function init(){
  loadBrands();
  normalizeBreadcrumbSeparators();
  normalizeShopLinks();
  normalizeShopChips();
  fixEditorialIcons(document);
  bindShopChips();
  if(dk())bindNav();
  bindTabs();bindSearch();bindBk();bindKb();bindX();bindCC();
  render('all','');
  if(dk())watchChv();
}

function normalizeBreadcrumbSeparators(){
  ['.trg-pdp-bc__sep','.trg-breadcrumb__sep'].forEach(function(selector){
    $$(selector).forEach(function(node){
      var text=(node.textContent||'').trim();
      if(text==='â€º'||text==='›'||text==='â€¹')node.textContent='›';
    });
  });
}

function fixEditorialIcons(root){
  var scope=root&&root.querySelectorAll?root:document;
  var iconMap={
    '\u2316':'<svg class="trg-pillar__icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="6"></circle><path d="M12 3v3"></path><path d="M12 18v3"></path><path d="M3 12h3"></path><path d="M18 12h3"></path></svg>',
    '\u00e2\u0152\u2013':'<svg class="trg-pillar__icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="6"></circle><path d="M12 3v3"></path><path d="M12 18v3"></path><path d="M3 12h3"></path><path d="M18 12h3"></path></svg>',
    '\u25ef':'<svg class="trg-pillar__icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="7"></circle></svg>',
    '\u00e2\u2014\u00af':'<svg class="trg-pillar__icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="7"></circle></svg>',
    '\u2691':'<svg class="trg-pillar__icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16"></path><path d="M8 5h8l-2.6 3 2.6 3H8"></path></svg>',
    '\u00e2\u0161\u2018':'<svg class="trg-pillar__icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4v16"></path><path d="M8 5h8l-2.6 3 2.6 3H8"></path></svg>'
  };
  scope.querySelectorAll('.trg-pillar__icon').forEach(function(icon){
    if(icon.querySelector('svg'))return;
    var glyph=(icon.textContent||'').trim();
    var markup=iconMap[glyph];
    if(!markup)return;
    icon.innerHTML=markup;
    icon.setAttribute('aria-hidden','true');
  });
}

function normShopHref(href){
  return SHOP_ROUTE_FIX[href]||href;
}

function slug(s){
  return String(s||'')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g,'')
    .replace(/&/g,' ')
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'');
}

function resolveShopHref(label,fallback){
  var key=slug(label);
  if(SHOP_SUBCATEGORY_ROUTE_FIX[key])return SHOP_SUBCATEGORY_ROUTE_FIX[key];
  if(key)return '/collections/'+key;
  var fixedFallback=normShopHref(fallback||'');
  if(fixedFallback)return fixedFallback;
  return '';
}

function normalizeShopLinks(){
  $$('#trg-mm-p-shop .trg-mm-pn').forEach(function(panel){
    var fallback=panel.querySelector('.trg-mm-val');
    var fallbackHref=fallback&&fallback.getAttribute('href');
    panel.querySelectorAll('.trg-mm-sg > a.trg-mm-st, .trg-mm-sg > span.trg-mm-st, .trg-mm-sg > .trg-mm-st--static').forEach(function(node){
      var name=node.querySelector('.trg-mm-sn');
      var label=name?(name.textContent||'').trim():(node.textContent||'').replace(/staged/ig,'').trim();
      var href=resolveShopHref(label,node.getAttribute('href')||fallbackHref);
      if(!label)return;
      if(!href)return;
      if(node.tagName==='A'){
        node.setAttribute('href',href);
        var count=node.querySelector('.trg-mm-sc');
        if(count&&/staged/i.test(count.textContent||''))count.remove();
        return;
      }
      var link=document.createElement('a');
      link.href=href;
      link.className='trg-mm-st';
      link.innerHTML='<span class="trg-mm-sn">'+esc(label)+'</span>';
      node.replaceWith(link);
    });
  });
  $$('#trg-mob-tc-shop .trg-mob-fam').forEach(function(fam){
    var fallback=fam.querySelector('.trg-mob-va');
    var fallbackHref=fallback&&fallback.getAttribute('href');
    fam.querySelectorAll('.trg-mob-subs > a.trg-mob-sub, .trg-mob-subs > div.trg-mob-sub, .trg-mob-subs > .trg-mob-sub--static').forEach(function(node){
      var name=node.querySelector('.trg-mob-sub-name');
      var label=name?(name.textContent||'').trim():(node.textContent||'').replace(/staged/ig,'').trim();
      var href=resolveShopHref(label,node.getAttribute('href')||fallbackHref);
      if(!label)return;
      if(!href)return;
      if(node.tagName==='A'){
        node.setAttribute('href',href);
        var count=node.querySelector('.trg-mob-sub-count');
        if(count&&/staged/i.test(count.textContent||''))count.remove();
        return;
      }
      var link=document.createElement('a');
      link.href=href;
      link.className='trg-mob-sub';
      link.innerHTML='<span class="trg-mob-sub-name">'+esc(label)+'</span>';
      node.replaceWith(link);
    });
  });
}

function normalizeShopChips(){
  $$('#trg-mm-p-shop .trg-mm-acs').forEach(function(row){
    var chips=Array.from(row.querySelectorAll('.trg-mm-ac'));
    if(!chips.length)return;
    chips.forEach(function(node){
      var button=node;
      if(node.tagName!=='BUTTON'){
        button=document.createElement('button');
        button.type='button';
        button.className=(node.className||'').replace(/\btrg-mm-ac--static\b/g,'').trim()||'trg-mm-ac';
        button.textContent=(node.textContent||'').trim();
        if(node.classList.contains('on'))button.classList.add('on');
        node.replaceWith(button);
      }
      button.type='button';
      button.classList.remove('trg-mm-ac--static');
    });
    var normalized=Array.from(row.querySelectorAll('.trg-mm-ac'));
    if(normalized.length&&!normalized.some(function(chip){return chip.classList.contains('on')}))normalized[0].classList.add('on');
    normalized.forEach(function(chip){chip.setAttribute('aria-pressed',chip.classList.contains('on')?'true':'false')});
  });
  $$('#trg-mob-tc-shop .trg-mob-chips').forEach(function(row){
    var chips=Array.from(row.querySelectorAll('.trg-mob-chip'));
    if(!chips.length)return;
    chips.forEach(function(node){
      var button=node;
      if(node.tagName!=='BUTTON'){
        button=document.createElement('button');
        button.type='button';
        button.className=(node.className||'').replace(/\btrg-mob-chip--static\b/g,'').trim()||'trg-mob-chip';
        button.textContent=(node.textContent||'').trim();
        if(node.classList.contains('on'))button.classList.add('on');
        node.replaceWith(button);
      }
      button.type='button';
      button.classList.remove('trg-mob-chip--static');
    });
    var normalized=Array.from(row.querySelectorAll('.trg-mob-chip'));
    if(normalized.length&&!normalized.some(function(chip){return chip.classList.contains('on')}))normalized[0].classList.add('on');
    normalized.forEach(function(chip){chip.setAttribute('aria-pressed',chip.classList.contains('on')?'true':'false')});
  });
}

function setChipState(chip){
  var row=chip&&chip.parentElement;
  if(!row)return;
  var selector=chip.classList.contains('trg-mm-ac')?'.trg-mm-ac':'.trg-mob-chip';
  row.querySelectorAll(selector).forEach(function(node){
    var active=node===chip;
    node.classList.toggle('on',active);
    node.setAttribute('aria-pressed',active?'true':'false');
  });
}

function bindShopChips(){
  if(window.__trgMegaMenuShopChipsBound)return;
  window.__trgMegaMenuShopChipsBound=true;
  [
    { root: '#trg-mm-p-shop', selector: '.trg-mm-acs .trg-mm-ac' },
    { root: '#trg-mob-tc-shop', selector: '.trg-mob-chips .trg-mob-chip' }
  ].forEach(function(binding){
    var root=document.querySelector(binding.root);
    if(!root)return;
    root.addEventListener('click',function(e){
      var chip=e.target.closest(binding.selector);
      if(!chip)return;
      e.preventDefault();
      setChipState(chip);
    });
  });
}


function loadBrands(){

  br=FB;

  var el=$('trg-mm-bd');

  if(el){try{var d=JSON.parse(el.textContent);if(Array.isArray(d)&&d.length>100){br=d;return}}catch(e){}}

  var cs=document.querySelector('link[href*="trg-mega-menu"]');

  if(cs){var base=cs.href.split('/assets/')[0]+'/assets/brands-menu.json';

    fetch(base).then(function(r){return r.json()}).then(function(d){if(Array.isArray(d)&&d.length>0){br=d;render(ac,'')}}).catch(function(){})}

}



function bindNav(){

  $$('header-menu .menu-list__list-item, .header-menu .menu-list__list-item').forEach(function(li){

    var lk=li.querySelector('.menu-list__link');

    if(!lk)return;

    var t=(lk.textContent||'').replace(/\s+/g,' ').trim().toLowerCase(),k=null;

    if(t==='brands')k='brands';else if(t==='products')k='shop';

    if(!k)return;

    li.removeAttribute('on:click');li.removeAttribute('on:focus');

    lk.addEventListener('mousedown',function(e){e.preventDefault()});

    lk.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();toggle(k)});

    lk.setAttribute('data-trg-mm',k);lk.setAttribute('aria-haspopup','true');lk.setAttribute('aria-expanded','false');

    lk.style.position='relative';

    addChv(lk);

  });

}



function addChv(lk){}



function watchChv(){}



function toggle(k){

  if(op===k){close();return}

  /* Swap: hide old panel, show new — keep backdrop stable */

  if(op){var old=$(P[op]);if(old)old.classList.remove('on')}

  op=k;

  var p=$(P[k]),b=$(BK);

  if(p)p.classList.add('on');if(b)b.classList.add('on');

  $$('[data-trg-mm]').forEach(function(el){el.setAttribute('aria-expanded',el.getAttribute('data-trg-mm')===k?'true':'false')});

  if(k==='brands'){var i=$('trg-mm-bi');if(i)setTimeout(function(){i.focus()},120)}

}



function close(){

  Object.keys(P).forEach(function(k){var e=$(P[k]);if(e)e.classList.remove('on')});

  var b=$(BK);if(b)b.classList.remove('on');

  $$('[data-trg-mm]').forEach(function(el){el.setAttribute('aria-expanded','false')});

  op=null;var i=$('trg-mm-bi');if(i&&i.value){i.value='';render(ac,'');upUI('')}

}



function bindCC(){

  Object.keys(P).forEach(function(k){

    var p=$(P[k]);if(!p)return;

    p.addEventListener('click',function(e){

      e.stopPropagation();

      var a=e.target.closest('a[href]');

      if(a&&a.href&&!a.href.endsWith('#'))close();

    });

  });

}



function bindX(){$$('.trg-mm-x').forEach(function(b){if(b._trgXBound)return;b._trgXBound=true;b.addEventListener('click',function(){close()})})}



function bindTabs(){

  $$('.trg-mm-t').forEach(function(btn){

    btn.addEventListener('click',function(){

      var tid=btn.dataset.tab;if(!tid)return;

      var sb=btn.closest('.trg-mm-sb');

      if(sb)sb.querySelectorAll('.trg-mm-t').forEach(function(t){t.classList.remove('on')});

      btn.classList.add('on');

      var pn=btn.closest('.trg-mm-p');

      if(pn){pn.querySelectorAll('.trg-mm-pn').forEach(function(p){p.classList.remove('on')});

        var pp=$('trg-mm-pn-'+tid);if(pp)pp.classList.add('on')}

      var bc=btn.dataset.bc;

      if(bc!==undefined||tid==='brands-all'){

        ac=bc||'all';

        var i=$('trg-mm-bi');render(ac,i?i.value.trim():'');

      }

    });

  });

}



function render(cat,q){

  var g=$('trg-mm-bg');if(!g)return;

  var ql=q.toLowerCase(),f=br.slice();

  if(cat&&cat!=='all')f=f.filter(function(b){return b.category===cat});

  if(ql)f=f.filter(function(b){return b.name.toLowerCase().indexOf(ql)!==-1});

  f.sort(function(a,b){return a.name.replace(/^[^a-zA-Z]+/,'').localeCompare(b.name.replace(/^[^a-zA-Z]+/,''),'en',{sensitivity:'base'})});

  g.classList.remove('sr','ct');

  if(!f.length){g.innerHTML='<div class="trg-mm-empty">No brands found'+(ql?' for \u201c'+esc(q)+'\u201d':'')+'</div>';return}

  if(ql){g.classList.add('sr');g.innerHTML=f.map(function(b){var i=b.name.toLowerCase().indexOf(ql);return'<a href="/collections/'+b.slug+'" class="trg-mm-bl">'+b.name.slice(0,i)+'<mark>'+b.name.slice(i,i+ql.length)+'</mark>'+b.name.slice(i+ql.length)+'</a>'}).join('');return}

  if(cat&&cat!=='all'){g.classList.add('ct');g.innerHTML=f.map(function(b){return'<a href="/collections/'+b.slug+'" class="trg-mm-bl">'+esc(b.name)+'</a>'}).join('');return}

  var gr={};f.forEach(function(b){var l=b.name.replace(/^[^a-zA-Z]+/,'').charAt(0).toUpperCase()||'#';if(!gr[l])gr[l]=[];gr[l].push(b)});

  var ls=Object.keys(gr).sort();

  var items=ls.map(function(l){return{l:l,b:gr[l],n:gr[l].length+1}});

  var tot=items.reduce(function(s,i){return s+i.n},0);

  var nc=window.innerWidth<=1199?3:4;

  var cols=[[]],cc=0,ci=0;

  items.forEach(function(it){var bp=Math.round(tot*(ci+1)/nc);if(cc>0&&cc+it.n>bp&&cols.length<nc){cols.push([]);ci++}cols[cols.length-1].push(it);cc+=it.n});

  while(cols.length<nc)cols.push([]);

  g.innerHTML=cols.map(function(col){return'<div class="trg-mm-col">'+col.map(function(it){return'<div class="trg-mm-lt">'+it.l+'</div>'+it.b.map(function(b){return'<a href="/collections/'+b.slug+'" class="trg-mm-bl">'+esc(b.name)+'</a>'}).join('')}).join('')+'</div>'}).join('');

}



function bindSearch(){

  var i=$('trg-mm-bi'),x=$('trg-mm-sx');if(!i)return;

  i.addEventListener('input',function(){var q=i.value.trim();render(ac,q);upUI(q)});

  if(x)x.addEventListener('click',function(){i.value='';i.focus();render(ac,'');upUI('')});

}



function upUI(q){

  var m=$('trg-mm-sm'),x=$('trg-mm-sx');

  if(x)x.classList.toggle('on',q.length>0);

  if(!m)return;if(!q){m.innerHTML='';return}

  var ql=q.toLowerCase(),f=br;

  if(ac!=='all')f=f.filter(function(b){return b.category===ac});

  var c=f.filter(function(b){return b.name.toLowerCase().indexOf(ql)!==-1}).length;

  m.innerHTML='<strong>'+c+'</strong> brand'+(c!==1?'s':'')+' matching \u201c'+esc(q)+'\u201d';

}



function bindBk(){

  var b=$(BK);if(b)b.addEventListener('click',function(){close()});

  /* Click-outside: close when clicking anything outside panels & nav triggers */

  document.addEventListener('click',function(e){

    if(!op||!dk())return;

    /* Ignore clicks inside panels or on nav triggers */

    if(e.target.closest('.trg-mm-p')||e.target.closest('[data-trg-mm]'))return;

    /* Ignore clicks on backdrop (handled separately) */

    if(e.target.closest('.trg-mm-bk'))return;

    close();

  })

}

function bindKb(){if(window.__trgMegaMenuKbBound)return;window.__trgMegaMenuKbBound=true;document.addEventListener('keydown',function(e){if(e.key==='Escape'&&op)close()})}

function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}



if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();

window.addEventListener('resize',function(){if(!dk()&&op)close()});

document.addEventListener('shopify:section:load',function(e){if(e.target&&e.target.querySelector&&(e.target.querySelector('header-menu')||e.target.querySelector('.trg-mm-p')))setTimeout(init,150)});
})();






/* ═══ TRG MOBILE MEGA MENU v4.0 ═══ */

(function(){

'use strict';

var MK=990;

function isMob(){return window.innerWidth<MK}



/* ─── DRAWER OPEN/CLOSE ─── */

var mobOpen=false;

function openMob(){

  var el=document.getElementById('trg-mob');

  if(!el)return;

  /* Remove Dwell's focus trap without closing its drawer.

     trapFocus() adds a capture-phase focusin listener that blocks focus

     outside the trapped container. We nuke ALL capture-phase focusin

     listeners by cloning document and replacing — but that's nuclear.

     Instead: add our own higher-priority focusin that stops propagation

     for elements inside #trg-mob. */

  el.classList.add('on');el.setAttribute('aria-hidden','false');

  document.body.style.overflow='hidden';

  mobOpen=true;

  initMobBrands();

}

function closeMob(){

  var el=document.getElementById('trg-mob');

  if(!el)return;

  el.classList.remove('on');el.setAttribute('aria-hidden','true');

  document.body.style.overflow='';

  mobOpen=false;



}



/* Intercept Dwell hamburger on mobile */

function hookHamburger(){

  if(!isMob())return;

  /* Dwell puts the hamburger in header-drawer or .header__icon--menu */

  var btns=document.querySelectorAll('header-drawer button, .header__icon--menu, [aria-controls="menu-drawer"]');

  btns.forEach(function(btn){

    if(btn._trgHooked)return;

    btn._trgHooked=true;

    btn.addEventListener('click',function(e){

      if(!isMob())return;

      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();

      if(mobOpen)closeMob();else openMob();

    },true);/* capture phase to beat Dwell */

  });

}



/* Close button */

function bindMobClose(){

  var c=document.getElementById('trg-mob-close');

  if(c)c.addEventListener('click',closeMob);

  var bk=document.getElementById('trg-mob-bk');

  if(bk)bk.addEventListener('click',closeMob);

  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&mobOpen)closeMob()});

}



/* ─── TAB SWITCHER ─── */

function bindMobTabs(){

  document.querySelectorAll('.trg-mob-tab').forEach(function(tab){

    tab.addEventListener('click',function(){

      document.querySelectorAll('.trg-mob-tab').forEach(function(t){t.classList.remove('on')});

      document.querySelectorAll('.trg-mob-tc').forEach(function(c){c.classList.remove('on')});

      tab.classList.add('on');

      var tc=document.getElementById('trg-mob-tc-'+tab.dataset.mobTab);

      if(tc)tc.classList.add('on');

      var body=document.getElementById('trg-mob-body');

      if(body)body.scrollTop=0;

      if(tab.dataset.mobTab==='brands')initMobBrands();

    });

  });

}



/* ─── ACCORDION ─── */

function bindMobAccordion(){

  document.querySelectorAll('.trg-mob-fam-hdr').forEach(function(hdr){

    hdr.addEventListener('click',function(){

      var fam=hdr.closest('.trg-mob-fam');

      var body=fam.querySelector('.trg-mob-fam-body');

      var isOpen=fam.classList.contains('on');

      /* Close others */

      document.querySelectorAll('.trg-mob-fam.on').forEach(function(f){

        if(f!==fam){f.classList.remove('on');f.querySelector('.trg-mob-fam-body').style.maxHeight='0'}

      });

      if(isOpen){fam.classList.remove('on');body.style.maxHeight='0'}

      else{fam.classList.add('on');body.style.maxHeight=body.scrollHeight+'px';

        setTimeout(function(){hdr.scrollIntoView({behavior:'smooth',block:'start'})},200);

      }

    });

  });

}



/* ─── SWIPEABLE CHIPS ─── */

function bindSwipeChips(){

  document.querySelectorAll('[data-swipe]:not(#trg-mob-bchips)').forEach(function(el){

    var startX,scrollL,isDrag=false;

    el.addEventListener('touchstart',function(e){startX=e.touches[0].pageX;scrollL=el.scrollLeft},{passive:true});

    el.addEventListener('touchmove',function(e){if(startX===undefined)return;el.scrollLeft=scrollL-(e.touches[0].pageX-startX)},{passive:true});

    el.addEventListener('touchend',function(){startX=undefined},{passive:true});

    /* Mouse drag for testing */

    el.addEventListener('mousedown',function(e){isDrag=true;startX=e.pageX;scrollL=el.scrollLeft;el.classList.add('grabbing');e.preventDefault()});

    window.addEventListener('mousemove',function(e){if(!isDrag)return;el.scrollLeft=scrollL-(e.pageX-startX)});

    window.addEventListener('mouseup',function(){if(isDrag){isDrag=false;el.classList.remove('grabbing')}});

  });

}



/* ─── BRANDS TAB (HYBRID) ─── */

var mobBCat='all',mobBQ='',mobBrandsInited=false;



function initMobBrands(){/* disabled — trg-mob-v2.js handles brands */}



function getMobBrands(){

  /* Reuse desktop brand data */

  var el=document.getElementById('trg-mm-bd');

  if(el){try{var d=JSON.parse(el.textContent);if(Array.isArray(d)&&d.length>0)return d}catch(e){}}

  /* Fallback 1: use desktop brand array (already mapped from FB or JSON) */

  if(typeof br!=='undefined'&&br.length>0)return br;

  /* Fallback 2: use the FB hardcoded array */

  if(typeof FB!=='undefined'&&FB.length>0)return FB;

  /* Fallback 3: reconstruct from DOM */

  var links=document.querySelectorAll('#trg-mm-bg .trg-mm-bl');

  if(links.length>0){

    return Array.from(links).map(function(a){

      var h=a.getAttribute('href')||'';

      var slug=h.replace('/collections/','');

      return{name:a.textContent,slug:slug,category:''};

    });

  }

  return[];

}



var _mobBrands=null;

function mobBrands(){

  if(!_mobBrands)_mobBrands=getMobBrands();

  return _mobBrands;

}



/* Rough priority: brands with shorter names in top categories tend to be higher priority.

   For a real implementation, add a "priority" field to the brand metaobject.

   For now, use a hardcoded set of "picks" slugs. */

var PICKS=new Set(['a-p-c','allen-edmonds','arcteryx','asket','auralee','barbour','belstaff','brooks-brothers',

'buck-mason','canada-goose','carhartt-wip','carmina','churchs','corridor','crockett-and-jones','drakes',

'edward-green','engineered-garments','filson','folk','grant-stone','inis-meain','iron-heart','isaia',

'j-crew','john-lobb','john-smedley','johnstons-of-elgin','kiton','lady-white-co','lemaire',

'mackintosh','margaret-howell','meermin','momotaro','naked-and-famous','nigel-cabourn','norse-projects',

'our-legacy','paraboot','patagonia','private-white-vc','pure-blue-japan','red-wing-heritage',

'ring-jacket','rogue-territory','schott-nyc','sefr','spier-and-mackay','stone-island',

'studio-nicholson','suitsupply','sunspel','taylor-stitch','the-armoury','todd-snyder',

'trickers','viberg','william-lockie']);



function isPick(b){return PICKS.has(b.slug)}



function renderMobBrands(){

  var all=mobBrands().slice();

  var cat=mobBCat,q=mobBQ;

  if(cat&&cat!=='all')all=all.filter(function(b){return b.category===cat});

  if(q)all=all.filter(function(b){return b.name.toLowerCase().indexOf(q)!==-1});

  all.sort(function(a,b){return a.name.replace(/^[^a-zA-Z]+/,'').localeCompare(b.name.replace(/^[^a-zA-Z]+/,''),'en',{sensitivity:'base'})});



  var picks=all.filter(isPick);

  var rest=all.filter(function(b){return!isPick(b)});

  var total=picks.length+rest.length;



  var countEl=document.getElementById('trg-mob-bcount');

  if(countEl)countEl.innerHTML='<strong>'+total+'</strong> brand'+(total!==1?'s':'');



  var clearEl=document.getElementById('trg-mob-bsx');

  if(clearEl)clearEl.classList.toggle('on',!!q);



  var picksEl=document.getElementById('trg-mob-bpicks');

  var restEl=document.getElementById('trg-mob-brest');



  if(!total){

    if(picksEl)picksEl.innerHTML='';

    if(restEl)restEl.innerHTML='<div class="trg-mob-bempty">No brands found.</div>';

    return;

  }



  /* Picks */

  if(picksEl){

    if(picks.length){

      var ph='<div class="trg-mob-bpicks-lbl">Our Picks</div>';

      ph+=picks.map(function(b){

        var d=hl(b.name,q);

        return'<a href="/collections/'+b.slug+'" class="trg-mob-bpick"><span class="trg-mob-bpick-name">'+d+'</span><span class="trg-mob-bpick-dot"></span></a>';

      }).join('');

      picksEl.innerHTML=ph;

    }else{picksEl.innerHTML=''}

  }



  /* Rest A-Z */

  if(restEl){

    if(rest.length){

      var rh='<div class="trg-mob-brest-lbl">All Brands</div><div class="trg-mob-brest-list">';

      var gr={};

      rest.forEach(function(b){var l=b.name.replace(/^[^a-zA-Z]+/,'').charAt(0).toUpperCase()||'#';if(!gr[l])gr[l]=[];gr[l].push(b)});

      Object.keys(gr).sort().forEach(function(l){

        rh+='<div class="trg-mob-lt">'+l+'</div>';

        gr[l].forEach(function(b){rh+='<a href="/collections/'+b.slug+'" class="trg-mob-bl">'+hl(b.name,q)+'</a>'});

      });

      rh+='</div>';

      restEl.innerHTML=rh;

    }else{restEl.innerHTML=''}

  }

}



function hl(name,q){

  if(!q)return esc(name);

  var i=name.toLowerCase().indexOf(q);

  if(i<0)return esc(name);

  return esc(name.slice(0,i))+'<mark>'+esc(name.slice(i,i+q.length))+'</mark>'+esc(name.slice(i+q.length));

}


function bindMobBrandChips(){

  document.querySelectorAll('#trg-mob-bchips .trg-mob-chip').forEach(function(chip){

    chip.addEventListener('click',function(){

      document.querySelectorAll('#trg-mob-bchips .trg-mob-chip').forEach(function(c){c.classList.remove('on')});

      chip.classList.add('on');

      mobBCat=chip.dataset.bcat||'all';

      renderMobBrands();

      /* Reset scroll */

      var body=document.getElementById('trg-mob-body');

      if(body){

        var tc=document.getElementById('trg-mob-tc-brands');

        if(tc)tc.scrollTop=0;

      }

    });

  });

}



function bindMobBrandSearch(){

  var i=document.getElementById('trg-mob-bi');

  var x=document.getElementById('trg-mob-bsx');

  if(i){

    i.addEventListener('input',function(){mobBQ=i.value.trim().toLowerCase();renderMobBrands()});

  }

  if(x){

    x.addEventListener('click',function(){if(i){i.value='';i.focus()};mobBQ='';renderMobBrands()});

  }

}



/* ─── INIT ─── */

function initMob(){

  hookHamburger();

  bindMobClose();

  bindMobTabs();

  bindMobAccordion();

  bindSwipeChips();

}



if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initMob);else initMob();

/* Re-hook on section load */

document.addEventListener('shopify:section:load',function(){setTimeout(function(){hookHamburger();bindMobAccordion();bindSwipeChips()},200)});

/* Re-hook on resize */

window.addEventListener('resize',function(){hookHamburger();if(!isMob()&&mobOpen)closeMob()});

})();




