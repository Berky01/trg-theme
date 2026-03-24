// TRG PLP Ghost Killer + DOM Fix — 2026-03-23
(function(){
  if(window.__trg_plp_ready)return;
  window.__trg_plp_ready=true;

  // Kill ALL stale style blocks from previous iterations
  ['trg-pcf','trg-pcf-v2','trg-plp-card-fix-css','trg-plp-master','trg-plp-v7','trg-plp-v8'].forEach(function(id){
    var el=document.getElementById(id); if(el)el.remove();
  });

  function fix(){
    var cw=document.querySelector('.trg-plp-body .collection-wrapper');
    if(!cw)return;

    // Remove .facets-toggle (Dwell mobile btn, phantom grid row on desktop)
    var ft=cw.querySelector(':scope > .facets-toggle');
    if(ft) ft.remove();

    // Remove dialog-component from grid flow
    var dlg=cw.querySelector(':scope > dialog-component');
    if(dlg) dlg.style.cssText='display:none!important';

    // Toolbar: remove duplicate elements
    var h4=cw.querySelector('.trg-collection-controls h4.facets--filters-title');
    if(h4) h4.remove();
    var af=cw.querySelector('.trg-collection-controls__active-filters');
    if(af) af.remove();

    // Unhide sort container
    cw.querySelectorAll('.sorting-filter__container').forEach(function(c){
      c.classList.remove('hidden');
      c.style.cssText='display:flex;align-items:center';
      var sel=c.querySelector('select');
      if(sel) sel.disabled=false;
    });

    // Hide sort label/icon/status
    cw.querySelectorAll('.sorting-filter .facets__label,.sorting-filter .icon-caret,.sorting-filter .facets__status').forEach(function(el){
      el.style.display='none';
    });
  }

  // Run immediately + staggered retries for Dwell hydration
  fix();
  [50,200,600,1500,3000].forEach(function(ms){setTimeout(fix,ms)});

  // MutationObserver catches morphdom re-adds
  var cw=document.querySelector('.trg-plp-body .collection-wrapper');
  if(cw) new MutationObserver(function(){fix()}).observe(cw,{childList:true,subtree:true});

  document.addEventListener('shopify:section:load',function(){setTimeout(fix,100)});
})();
