/* TRG Mobile v4.1 — brand data loads from brands-overflow.json (SH-H8) */
(function(){
'use strict';
// Picks (high-priority brands): compact list replaces inline AB array
var PICKS=new Set(["100-hands","3-paradis","a-days-march","a-p-c","a-presse","acne-studios","aime-leon-dore","ambrosi-napoli","amiri","anderson-and-sheppard","anglo-italian","another-aspect","asket","aspesi","aubercy","auralee","aurelien","banana-republic","barena-venezia","baudoin-and-lange","beams-plus","bellief","bode","bonobos","bottega-veneta","carhartt-wip","christian-dior","christian-kimber","club-monaco","coherence","cos","cqp","de-bonne-facture","doppiaa","drole-de-monsieur","eleventy","evan-kinori","everlane","folk","foster-and-son","george-cleverley","haven","herno","jacquemus","jil-sander","kapital","kaptain-sunshine","kartik-research","kith","lestrange-london","l-b-m-1911","lemaire","loro-piana","mango-man","margaret-howell","marka","masons","massimo-alba","maurizio-baldassari","meccariello","monitaly","moreschi","muji","n-hoolywood","natalino","nn07","noah-nyc","nomanwalksalone","norse-projects","officine-generale","oliver-spencer","our-legacy","outclass","paul-smith","percival","peter-millar","prada","re-hash","rick-owens","roberto-collina","sage-de-cret","sandro","shibumi-firenze","sid-mashburn","soulland","still-by-hand","studio-nicholson","sefr","thom-browne","todd-snyder","visvim","wales-bonner","wax-london","wings-horns","wtaps","ymc","yves-saint-laurent"]);
// handleize helper: "Shirts & Tops" -> "shirts-tops"
function hz(s){return(s||'').toLowerCase().replace(/s*&s*/g,'-').replace(/s+/g,'-').replace(/[^a-z0-9-]/g,'').replace(/-+/g,'-').replace(/^-|-$/g,'');}
// Brand array loaded on demand
var AB=[],_bLoaded=false;
function loadBrands(){
  if(_bLoaded)return;
  var cs=document.querySelector('link[href*="trg-mega-menu"]')||document.querySelector('link[href*="/assets/"]');
  if(!cs)return;
  var base=cs.href.split('/assets/')[0]+'/assets/';
  fetch(base+'brands-overflow.json')
    .then(function(r){return r.ok?r.json():Promise.reject()})
    .then(function(data){
      if(Array.isArray(data)&&data.length>0){
        AB=data.map(function(b){return{n:b.name,s:b.handle,c:hz(b.category||''),p:PICKS.has(b.handle)?'h':'m'};});
      }
      _bLoaded=true;
      render();
    })
    .catch(function(){_bLoaded=true;});
}


var mCat='all',mQ='',booted=false,v4CountEl=null;
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
function hl(n,q){if(!q)return esc(n);var i=n.toLowerCase().indexOf(q);if(i<0)return esc(n);return esc(n.slice(0,i))+'<mark style="background:rgba(196,86,42,.25);color:rgba(245,241,235,.92);border-radius:2px;padding:0 1px">'+esc(n.slice(i,i+q.length))+'</mark>'+esc(n.slice(i+q.length))}
function render(){
  var all=AB.slice();
  if(mCat&&mCat!=='all')all=all.filter(function(b){return b.c===mCat});
  if(mQ)all=all.filter(function(b){return b.n.toLowerCase().indexOf(mQ)!==-1});
  all.sort(function(a,b){return a.n.replace(/^[^a-zA-Z0-9]+/,'').localeCompare(b.n.replace(/^[^a-zA-Z0-9]+/,''),'en',{sensitivity:'base'})});
  var picks=all.filter(function(b){return b.p==='h'});
  var rest=all.filter(function(b){return b.p!=='h'});
  var total=all.length;
  var cEl=v4CountEl||document.getElementById('trg-mob-bcount');
  if(cEl)cEl.innerHTML='<strong style="color:rgba(196,86,42,.8);font-weight:500">'+total+'</strong> brand'+(total!==1?'s':'');
  var pEl=document.getElementById('trg-mob-bpicks');
  var rEl=document.getElementById('trg-mob-brest');
  if(!total){if(pEl)pEl.innerHTML='';if(rEl)rEl.innerHTML='<div style="padding:2rem 1.25rem;text-align:center;font-size:.8rem;color:rgba(245,241,235,.3);font-style:italic">No brands found.</div>';return}
  if(pEl){
    if(picks.length){
      var ph='<div style="font-size:.52rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#b8491f;padding:.75rem 1.25rem .35rem;display:flex;align-items:center;gap:.5rem">Our picks<span style="flex:1;height:1px;background:rgba(196,86,42,.2)"></span></div><div style="padding:0 1.25rem">';
      picks.forEach(function(b){ph+='<a href="/collections/'+b.s+'" style="display:flex;align-items:center;justify-content:space-between;min-height:42px;padding:.3rem 0;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.04)"><span style="font-size:.78rem;color:rgba(245,241,235,.92)">'+hl(b.n,mQ)+'</span><span style="width:5px;height:5px;border-radius:50%;background:#b8491f;opacity:.6;flex-shrink:0"></span></a>'});
      ph+='</div>';pEl.innerHTML=ph;
    }else pEl.innerHTML='';
  }
  if(rEl){
    if(rest.length){
      var rh='<div style="font-size:.52rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,241,235,.3);padding:.6rem 1.25rem .35rem;display:flex;align-items:center;gap:.5rem">All brands<span style="flex:1;height:1px;background:rgba(245,241,235,.08)"></span></div><div style="padding:0 1.25rem 2rem">';
      var gr={};rest.forEach(function(b){var l=b.n.replace(/^[^a-zA-Z]+/,'').charAt(0).toUpperCase()||'#';if(!gr[l])gr[l]=[];gr[l].push(b)});
      Object.keys(gr).sort().forEach(function(l){rh+='<div style="font-size:.52rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#b8491f;padding:.7rem 0 .25rem;border-bottom:1px solid rgba(196,86,42,.2);margin-top:.4rem">'+l+'</div>';gr[l].forEach(function(b){rh+='<a href="/collections/'+b.s+'" style="display:flex;align-items:center;min-height:40px;padding:.25rem 0;font-size:.76rem;color:rgba(245,241,235,.55);text-decoration:none;border-bottom:1px solid rgba(255,255,255,.03)">'+hl(b.n,mQ)+'</a>'})});
      rh+='</div>';rEl.innerHTML=rh;
    }else rEl.innerHTML='';
  }
}
var rt=null;
function dr(){clearTimeout(rt);rt=setTimeout(render,50)}

function boot(){
  if(booted)return;booted=true;
  var tc=document.getElementById('trg-mob-tc-brands');
  if(!tc)return;
  /* Hide old elements */
  var oldSearch=document.getElementById('trg-mob-bsearch');
  if(oldSearch)oldSearch.style.display='none';
  var oldChips=document.getElementById('trg-mob-bchips');
  if(oldChips)oldChips.style.display='none';
  var oldCount=document.getElementById('trg-mob-bcount');
  if(oldCount)oldCount.style.display='none';
  /* Build new UI */
  var w=document.createElement('div');
  w.id='trg-v4';
  w.style.cssText='position:sticky;top:0;z-index:5;background:#1a1917';
  /* Search — type=text+inputmode=search avoids iOS/theme search-input resets */
  var searchHTML='<div style="padding:.75rem 1.25rem .25rem"><label style="display:flex;align-items:center;gap:.6rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:4px;padding:0 .75rem;cursor:text"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(245,241,235,.3)" stroke-width="2" stroke-linecap="round" style="flex-shrink:0"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/></svg><input id="trg-v4-input" type="text" inputmode="search" placeholder="Search 468 brands\u2026" autocomplete="off" style="flex:1;background:transparent !important;border:none !important;outline:none !important;font-family:DM Sans,sans-serif;font-size:16px;color:rgba(245,241,235,.92) !important;padding:.65rem 0;-webkit-appearance:none;min-height:44px;box-shadow:none !important"><button id="trg-v4-clear" type="button" style="background:none;border:none;cursor:pointer;font-size:.75rem;color:rgba(245,241,235,.4);padding:.35rem;display:none;flex-shrink:0">\u2715</button></label></div>';
  /* Chips */
  var chipData=[{l:'All',v:'all'},{l:'Shirts & Tops',v:'shirts-tops'},{l:'Outerwear',v:'outerwear'},{l:'Trousers',v:'trousers'},{l:'Footwear',v:'footwear'},{l:'Knitwear',v:'knitwear'},{l:'Denim',v:'denim'},{l:'Tailoring',v:'tailoring'},{l:'Accessories',v:'accessories'}];
  var chipsHTML='<div id="trg-v4-chips" style="display:flex;gap:.35rem;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:.6rem 1.25rem .4rem">';
  chipData.forEach(function(cd){
    var active=cd.v==='all'?'background:rgba(196,86,42,.15);border-color:rgba(196,86,42,.45);color:rgba(245,241,235,.92)':'';
    chipsHTML+='<button type="button" data-cat="'+cd.v+'" style="font-family:DM Sans,sans-serif;font-size:.62rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;padding:.3rem .7rem;border:1px solid rgba(255,255,255,.1);border-radius:20px;color:rgba(245,241,235,.55);background:none;cursor:pointer;white-space:nowrap;flex-shrink:0;-webkit-tap-highlight-color:transparent;'+active+'">'+cd.l+'</button>';
  });
  chipsHTML+='</div>';
  var countHTML='<div id="trg-v4-count" style="font-size:.62rem;color:rgba(245,241,235,.3);letter-spacing:.03em;padding:.5rem 1.25rem .6rem;border-bottom:1px solid rgba(245,241,235,.08)"></div>';
  w.innerHTML=searchHTML+chipsHTML+countHTML;
  tc.insertBefore(w,tc.firstChild);
  /* Bind search input */
  var sInput=document.getElementById('trg-v4-input');
  var sClear=document.getElementById('trg-v4-clear');
  if(sInput){
    sInput.addEventListener('input',function(){
      mQ=sInput.value.trim().toLowerCase();
      if(sClear)sClear.style.display=mQ?'block':'none';
      dr();
    });
  }
  if(sClear){
    sClear.addEventListener('click',function(e){
      e.preventDefault();
      if(sInput){sInput.value='';sInput.focus()}
      sClear.style.display='none';
      mQ='';dr();
    });
  }
  /* Bind chips */
  document.getElementById('trg-v4-chips').addEventListener('click',function(e){
    var chip=e.target.closest('button');if(!chip)return;
    e.preventDefault();
    mCat=chip.dataset.cat||'all';
    document.getElementById('trg-v4-chips').querySelectorAll('button').forEach(function(b){b.style.background='none';b.style.borderColor='rgba(255,255,255,.1)';b.style.color='rgba(245,241,235,.55)'});
    chip.style.background='rgba(196,86,42,.15)';chip.style.borderColor='rgba(196,86,42,.45)';chip.style.color='rgba(245,241,235,.92)';
    render();
    var body=document.getElementById('trg-mob-body');if(body)body.scrollTop=0;
  });
  /* Store count ref for render() */
  v4CountEl=document.getElementById('trg-v4-count');
  /* Accordion (capture phase) */
  document.addEventListener('click',function(e){
    var hdr=e.target.closest('.trg-mob-fam-hdr');if(!hdr)return;
    e.preventDefault();
    var fam=hdr.closest('.trg-mob-fam');if(!fam)return;
    var body=fam.querySelector('.trg-mob-fam-body');if(!body)return;
    var isOpen=fam.classList.contains('on');
    document.querySelectorAll('.trg-mob-fam.on').forEach(function(f){if(f!==fam){f.classList.remove('on');var b=f.querySelector('.trg-mob-fam-body');if(b)b.style.maxHeight='0'}});
    if(isOpen){fam.classList.remove('on');body.style.maxHeight='0'}
    else{fam.classList.add('on');body.style.maxHeight=body.scrollHeight+'px';setTimeout(function(){hdr.scrollIntoView({behavior:'smooth',block:'start'})},200)}
  });
  loadBrands();
  if(_bLoaded)render();
  /* Re-render on tab/drawer open */
  new MutationObserver(function(){if(tc.classList.contains('on'))dr()}).observe(tc,{attributes:true,attributeFilter:['class']});
  var mob=document.getElementById('trg-mob');
  if(mob)new MutationObserver(function(){if(mob.classList.contains('on'))setTimeout(render,150)}).observe(mob,{attributes:true,attributeFilter:['class']});
}
loadBrands();
if(document.readyState==='complete')setTimeout(boot,200);
else window.addEventListener('load',function(){setTimeout(boot,300)});
})();

