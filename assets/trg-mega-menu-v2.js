/* TRG Mega Menu v4.3 — nav-audit fixes 2026-03-27 â€” click-swap â€” desktop + mobile */
(function(){
'use strict';
var P={shop:'trg-mm-p-shop',brands:'trg-mm-p-brands'},BK='trg-mm-bk',DK=990;
var FB=[];

var op=null,br=[],ac='all',mo=null;
function dk(){return window.innerWidth>=DK}
function $(id){return document.getElementById(id)}
function $$(s,r){return(r||document).querySelectorAll(s)}

function init(){
  loadBrands();
  if(dk())bindNav();
  bindTabs();bindSearch();bindBk();bindKb();bindX();bindCC();
  render('all','');
  if(dk())watchChv();
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
    /* Prevent focus from desynchronising aria-expanded — Dwell's capture-phase
       listeners may flip it on focus without opening our panel */
    lk.addEventListener('focus',function(){
      var expected=op===k?'true':'false';
      if(lk.getAttribute('aria-expanded')!==expected)lk.setAttribute('aria-expanded',expected);
    });
    /* Re-sync after any external attribute mutation (morphdom, Dwell idle hydration) */
    var obs=new MutationObserver(function(){
      obs.disconnect();
      var expected=op===k?'true':'false';
      if(lk.getAttribute('aria-expanded')!==expected)lk.setAttribute('aria-expanded',expected);
      obs.observe(lk,{attributes:true,attributeFilter:['aria-expanded']});
    });
    obs.observe(lk,{attributes:true,attributeFilter:['aria-expanded']});
    lk.setAttribute('data-trg-mm',k);lk.setAttribute('aria-haspopup','true');lk.setAttribute('aria-expanded','false');
    lk.style.position='relative';
    addChv(lk);
  });
}

function addChv(lk){}

function watchChv(){}

function toggle(k){
  if(op===k){close();return}
  /* Swap: hide old panel, show new â€” keep backdrop stable */
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

function bindX(){$$('.trg-mm-x').forEach(function(b){b.addEventListener('click',function(){close()})})}

function bindTabs(){
  /* Delegated binding in capture phase — survives morphdom re-renders on homepage,
     and fires before bindCC's bubble-phase stopPropagation on .trg-mm-p panels */
  document.addEventListener('click',function(e){
    var btn=e.target.closest('.trg-mm-t');
    if(!btn)return;
    var tid=btn.dataset.tab;if(!tid)return;
    var sb=btn.closest('.trg-mm-sb');
    if(sb)sb.querySelectorAll('.trg-mm-t').forEach(function(t){t.classList.remove('on')});
    btn.classList.add('on');
    var href=btn.dataset.href;if(href){window.location.href=href;return;}
    var pn=btn.closest('.trg-mm-p');
    if(pn){pn.querySelectorAll('.trg-mm-pn').forEach(function(p){p.classList.remove('on')});
      var pp=$('trg-mm-pn-'+tid);if(pp)pp.classList.add('on')}
    var bc=btn.dataset.bc;
    if(bc!==undefined||tid==='brands-all'){
      ac=bc||'all';
      var i=$('trg-mm-bi');render(ac,i?i.value.trim():'');
    }
  },true);
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
function bindKb(){document.addEventListener('keydown',function(e){if(e.key==='Escape'&&op)close()})}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.addEventListener('resize',function(){if(!dk()&&op)close()});
document.addEventListener('shopify:section:load',function(e){if(e.target&&e.target.querySelector&&(e.target.querySelector('header-menu')||e.target.querySelector('.trg-mm-p')))setTimeout(init,150)});
})();



/* â•�â•�â•� TRG MOBILE MEGA MENU v4.0 â•�â•�â•� */
(function(){
'use strict';
var MK=990;
function isMob(){return window.innerWidth<MK}

/* â”€â”€â”€ DRAWER OPEN/CLOSE â”€â”€â”€ */
var mobOpen=false;
function openMob(){
  var el=document.getElementById('trg-mob');
  if(!el)return;
  /* Remove Dwell's focus trap without closing its drawer.
     trapFocus() adds a capture-phase focusin listener that blocks focus
     outside the trapped container. We nuke ALL capture-phase focusin
     listeners by cloning document and replacing â€” but that's nuclear.
     Instead: add our own higher-priority focusin that stops propagation
     for elements inside #trg-mob. */
  document.querySelectorAll('header-drawer details[open]').forEach(function(d){d.removeAttribute('open')});
  document.querySelectorAll('.menu-drawer-container, header-drawer').forEach(function(c){c.classList.remove('menu-open','menu-opening')});
  el.classList.add('on');el.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  mobOpen=true;
}
function closeMob(){
  var el=document.getElementById('trg-mob');
  if(!el)return;
  el.classList.remove('on');el.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  mobOpen=false;
  /* Ensure Dwell header-drawer state is fully clean */
  document.querySelectorAll('header-drawer details').forEach(function(d){d.removeAttribute('open')});
  document.querySelectorAll('.menu-drawer-container, header-drawer').forEach(function(c){c.classList.remove('menu-open','menu-opening')});
  var hd=document.querySelector('header-drawer');if(hd&&typeof hd.close==='function')try{hd.close()}catch(e){}
}

/* Intercept Dwell hamburger on mobile */
function hookHamburger(){
  if(!isMob())return;
  var btns=document.querySelectorAll('header-drawer summary, header-drawer button, .header__icon--menu, [aria-controls="menu-drawer"]');
  btns.forEach(function(btn){
    if(btn._trgHooked)return;
    btn._trgHooked=true;
    btn.addEventListener('click',function(e){
      if(!isMob())return;
      e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
      var det=btn.closest('details');if(det&&det.open)det.removeAttribute('open');
      if(mobOpen)closeMob();else openMob();
    },true);
  });
  document.querySelectorAll('header-drawer details').forEach(function(det){
    if(det._trgObs)return;det._trgObs=true;
    var mobObs=new MutationObserver(function(){mobObs.disconnect();if(isMob()&&det.open)det.removeAttribute('open');mobObs.observe(det,{attributes:true,attributeFilter:['open']});});
    mobObs.observe(det,{attributes:true,attributeFilter:['open']});
  });
}

/* Nuke legacy /pages/brands/ links in Dwell's hidden fallback drawer.
   These are display:none but still in the DOM — bad for crawlers & screen readers. */
function nukeLegacyBrandLinks(){
  document.querySelectorAll('header-drawer a[href*="/pages/brands/"]').forEach(function(a){
    var slug=a.getAttribute('href').replace('/pages/brands/','');
    a.setAttribute('href','/collections/'+slug);
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

/* â”€â”€â”€ TAB SWITCHER â”€â”€â”€ */
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
    });
  });
}

/* â”€â”€â”€ ACCORDION â”€â”€â”€ */
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

/* â”€â”€â”€ SWIPEABLE CHIPS â”€â”€â”€ */
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

/* â”€â”€â”€ INIT â”€â”€â”€ */
function initMob(){
  hookHamburger();
  bindMobClose();
  bindMobTabs();
  bindMobAccordion();
  bindSwipeChips();
  nukeLegacyBrandLinks();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initMob);else initMob();
/* Re-hook on section load */
document.addEventListener('shopify:section:load',function(){setTimeout(function(){hookHamburger();bindMobAccordion();bindSwipeChips()},200)});
/* Re-hook on resize */
window.addEventListener('resize',function(){hookHamburger();if(!isMob()&&mobOpen)closeMob()});
})();

