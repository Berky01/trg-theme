// TRG PLP v7 — clean slate — 2026-03-23
(function(){
  // Nuke ALL stale styles from previous iterations
  ['trg-pcf','trg-pcf-v2','trg-plp-card-fix-css','trg-plp-master','trg-plp-v7'].forEach(function(id){
    var el=document.getElementById(id);if(el)el.remove();
  });

  // ── DOM FIXES ──
  function fix(){
    var cw=document.querySelector('.trg-plp-body .collection-wrapper');
    if(!cw)return;

    // Remove facets-toggle (mobile-only, phantom grid row on desktop)
    var ft=cw.querySelector(':scope>.facets-toggle');
    if(ft)ft.remove();

    // Remove dialog-component from grid flow
    var dlg=cw.querySelector(':scope>dialog-component');
    if(dlg){dlg.style.cssText='position:absolute!important;width:0!important;height:0!important;overflow:hidden!important';}

    // Toolbar: remove duplicate h4
    var h4=cw.querySelector('.trg-collection-controls h4.facets--filters-title');
    if(h4)h4.remove();

    // Toolbar: remove active-filters div
    var af=cw.querySelector('.trg-collection-controls__active-filters');
    if(af)af.remove();

    // Toolbar: unhide sort container
    cw.querySelectorAll('.sorting-filter__container').forEach(function(c){
      c.classList.remove('hidden');
      c.removeAttribute('style');
      c.style.cssText='display:flex!important;visibility:visible!important;align-items:center';
      var sel=c.querySelector('select');
      if(sel)sel.disabled=false;
    });

    // Toolbar: hide sort label + icon + status
    cw.querySelectorAll('.sorting-filter .facets__label, .sorting-filter .icon-caret, .sorting-filter .facets__status').forEach(function(el){
      el.style.display='none';
    });
  }

  fix();
  setTimeout(fix,100);
  setTimeout(fix,500);
  setTimeout(fix,1500);

  // MutationObserver for morphdom
  var cw=document.querySelector('.trg-plp-body .collection-wrapper');
  if(cw){
    new MutationObserver(function(){fix()}).observe(cw,{childList:true,subtree:true});
  }

  // ── STYLESHEET ──
  var s=document.createElement('style');
  s.id='trg-plp-v7';
  s.textContent=[
    /* LAYOUT */
    '@media screen and (min-width:990px){',
      '.trg-plp-body .collection-wrapper{display:grid!important;grid-template-columns:var(--trg-plp-sidebar-width,220px) minmax(0,1fr)!important;column-gap:var(--trg-plp-layout-gap,26px)!important;align-items:start;padding:0 var(--page-margin)!important}',
      '.trg-plp-body .collection-wrapper>.facets-block-wrapper--vertical:not(.hidden){grid-column:1!important;grid-row:1/span 99!important;width:var(--trg-plp-sidebar-width,220px)!important;position:sticky;top:calc(var(--header-group-height,56px) + 10px);max-height:calc(100vh - var(--header-group-height,56px) - 20px);overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:var(--border,#ddd8cf) transparent}',
      '.trg-plp-body .collection-wrapper>.trg-collection-controls{grid-column:2!important;grid-row:1!important}',
      '.trg-plp-body .collection-wrapper>.main-collection-grid{grid-column:2!important;grid-row:2!important;min-width:0}',
      '.trg-plp-body .collection-wrapper>.facets-toggle{display:none!important}',
      '.trg-plp-body .collection-wrapper>dialog-component{position:absolute!important;width:0!important;height:0!important;overflow:hidden!important}',
      '.trg-plp-body .collection-wrapper>script,.trg-plp-body .collection-wrapper>style:not(#trg-plp-v7){position:absolute!important}',
    '}',
    'body.filters-hidden .trg-plp-body .collection-wrapper{grid-template-columns:minmax(0,1fr)!important}',
    'body.filters-hidden .trg-plp-body .collection-wrapper>.facets-block-wrapper--vertical:not(.hidden){width:0!important;opacity:0!important;pointer-events:none;overflow:hidden}',
    'body.filters-hidden .trg-plp-body .collection-wrapper>.trg-collection-controls,',
    'body.filters-hidden .trg-plp-body .collection-wrapper>.main-collection-grid{grid-column:1/-1!important}',

    /* GREEN BAR */
    '.trg-plp-body .card-gallery slideshow-slides{scrollbar-width:none!important;overflow-x:hidden!important}',
    '.trg-plp-body .card-gallery slideshow-slides::-webkit-scrollbar{display:none!important;width:0!important;height:0!important}',

    /* TOOLBAR */
    '.trg-plp-body .trg-collection-controls{display:flex!important;align-items:center!important;padding:.5rem 0!important;gap:.75rem!important;border:none!important;min-height:auto!important;flex-wrap:nowrap!important}',
    '.trg-plp-body .trg-plp-show-filters-btn{display:flex!important;align-items:center!important;gap:.4rem!important;font-size:.68rem!important;font-weight:500!important;letter-spacing:.08em!important;text-transform:uppercase!important;color:var(--mid,#8a8478)!important;cursor:pointer!important;padding:0!important;background:none!important;border:none!important;order:1!important;flex-shrink:0!important}',
    '.trg-plp-body .trg-plp-show-filters-btn:hover{color:var(--ink,#1a1a18)!important}',
    '.trg-plp-body .products-count-wrapper{order:2!important;flex:1!important;text-align:center!important}',
    '.trg-plp-body .products-count-wrapper span{font-size:.72rem!important;font-weight:400!important;letter-spacing:.06em!important;text-transform:uppercase!important;color:var(--mid,#8a8478)!important}',
    '.trg-plp-body .trg-collection-controls .sorting-filter{order:3!important;flex-shrink:0!important}',
    '.trg-plp-body .trg-collection-controls .sorting-filter__select{font-size:.8rem!important;color:var(--ink,#1a1a18)!important;border:1px solid var(--border,#ddd8cf)!important;background:#fff!important;padding:.35rem 1.5rem .35rem .6rem!important;border-radius:2px!important;cursor:pointer!important;-webkit-appearance:none!important;appearance:none!important}',
    '.trg-plp-body .trg-collection-controls .sorting-filter__select:disabled{opacity:1!important;cursor:pointer!important;color:var(--ink,#1a1a18)!important}',

    /* SIDEBAR */
    '.trg-plp-body .facets--vertical:not(.facets--drawer){background:transparent!important;border:none!important;box-shadow:none!important;padding:0!important}',
    '.trg-plp-body .trg-facets-sidebar-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;padding:.25rem 0 0}',
    '.trg-plp-body .trg-facets-sidebar-title{font-size:.7rem!important;font-weight:500!important;letter-spacing:.12em!important;text-transform:uppercase!important;color:var(--mid,#8a8478)!important;margin:0!important;line-height:1!important}',
    '.trg-plp-body .trg-facets-sidebar-clear-button{font-size:.75rem!important;color:var(--accent,#c4562a)!important;background:none!important;border:none!important;padding:0!important;opacity:0;transition:opacity .2s}',
    '.trg-plp-body .trg-facets-sidebar-clear--active .trg-facets-sidebar-clear-button{opacity:1}',
    '.trg-plp-body .trg-plp-sidebar-hide-btn{color:var(--mid,#8a8478)!important;padding:2px!important}',
    '.trg-plp-body .trg-plp-sidebar-hide-btn:hover{color:var(--ink,#1a1a18)!important}',
    '.trg-plp-body .facets__item::before,.trg-plp-body .sorting-filter::before{content:none!important;display:none!important}',
    '.trg-plp-body .facets__item{margin-bottom:.25rem!important;border:none!important;padding:0!important}',
    '.trg-plp-body .facets__summary{font-size:.7rem!important;font-weight:500!important;letter-spacing:.1em!important;text-transform:uppercase!important;color:var(--mid,#8a8478)!important;padding:.6rem 0!important;border:none!important}',
    '.trg-plp-body .facets__summary:hover{color:var(--ink,#1a1a18)!important}',
    '.trg-plp-body .facets__label{font-size:.7rem!important;font-weight:500!important;letter-spacing:.1em!important;text-transform:uppercase!important;color:inherit!important}',
    '.trg-plp-body .facets__summary .icon-caret svg{width:10px!important;height:10px!important;opacity:.5}',
    '.trg-plp-body .facets__inputs-list{display:flex!important;flex-direction:column!important;gap:.1rem!important;padding:0!important;margin:0!important}',
    '.trg-plp-body .facets__inputs-list-item{padding:0!important;margin:0!important;border:none!important}',
    '.trg-plp-body .facets__inputs-list-item .checkbox{padding:.3rem .4rem!important;border-radius:3px!important;gap:0!important}',
    '.trg-plp-body .facets__inputs-list-item .checkbox:hover{background:var(--subtle,#e8e3db)!important}',
    '.trg-plp-body .icon-checkmark{width:15px!important;height:15px!important;border:1.5px solid var(--border,#ddd8cf)!important;border-radius:2px!important;background:var(--warm-white,#faf8f4)!important;flex-shrink:0!important}',
    '.trg-plp-body .checkbox__input:checked+.checkbox__label .icon-checkmark{background:var(--ink,#1a1a18)!important;border-color:var(--ink,#1a1a18)!important}',
    '.trg-plp-body .checkbox__input:checked+.checkbox__label .icon-checkmark path{stroke:#fff!important;opacity:1!important}',
    '.trg-plp-body .checkbox__label-text{font-size:.85rem!important;color:var(--ink,#1a1a18)!important;padding-left:.45rem!important}',
    '.trg-plp-body .facets__inputs-list-item--disabled .checkbox__label-text{color:var(--mid,#8a8478)!important;opacity:.5}',
    '.trg-plp-body .facets__status{font-size:.65rem!important;color:var(--mid,#8a8478)!important}',
    '.trg-plp-body .facets__panel-content{padding:0 0 .5rem!important}',

    /* CARDS */
    '.trg-plp-body .card-gallery{flex:0 0 auto!important;aspect-ratio:var(--trg-plp-image-ratio,3/4)!important;--gallery-aspect-ratio:0.75!important;min-height:0!important}',
    '.trg-plp-body .card-gallery img,.trg-plp-body .card-gallery video{width:100%!important;height:100%!important;object-fit:cover!important;object-position:var(--trg-plp-image-position,top center)!important}',
    '.trg-plp-body .card-gallery .product-media{width:100%;height:100%}',
    '.trg-plp-body .card-gallery slideshow-component,.trg-plp-body .card-gallery slideshow-slide,.trg-plp-body .card-gallery .product-media-container{height:100%!important;min-height:100%!important}',
    '.trg-plp-body .group-block{flex:0 0 auto!important;display:flex!important;flex-direction:column!important;padding:0!important;position:relative;overflow:hidden;background:var(--trg-plp-caption-background,#faf8f4);border-top:1px solid var(--trg-plp-border-color,#d8d3ca)}',
    '.trg-plp-body .group-block-content{flex:1 1 auto;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;padding:var(--trg-plp-caption-padding,12px) var(--trg-plp-caption-padding,12px) 40px!important;background:var(--trg-plp-caption-background,#faf8f4);gap:0!important}',
    '.trg-plp-body .group-block__media-wrapper{display:none!important}',
    '.trg-plp-body .trg-plp-card-brand{font-size:.6rem!important;font-weight:500!important;letter-spacing:.1em!important;text-transform:uppercase!important;color:var(--trg-plp-muted-color,#8e877d)!important;margin-bottom:.2rem!important;order:1}',
    '.trg-plp-body .group-block-content>a.contents.user-select-text{order:2}',
    '.trg-plp-body .group-block-content>a.contents.user-select-text .text-block p{font-family:var(--font-heading--family)!important;font-size:.95rem!important;font-weight:600!important;line-height:1.2!important;color:var(--trg-plp-text-color,#2f2b27)!important}',
    '.trg-plp-body .trg-plp-card-material{order:3;margin-top:.2rem!important;font-size:.67rem!important;font-weight:300!important;color:var(--trg-plp-muted-color,#8e877d)!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    '.trg-plp-body .group-block-content>product-price{order:4;margin-top:auto!important;padding-top:.5rem!important}',
    '.trg-plp-body .group-block-content>product-price .price{font-size:.875rem!important;font-weight:500!important;color:var(--trg-plp-text-color,#2f2b27)!important}',
    '.trg-plp-body .trg-plp-card-cta-block{order:5;display:contents}',
    '.trg-plp-body .trg-plp-card-shop-cta{position:absolute;right:0;bottom:0;left:0;z-index:3;display:inline-flex;align-items:center;justify-content:space-between;padding:10px var(--trg-plp-caption-padding,12px);background:var(--trg-plp-cta-background,#1a1a18);color:var(--trg-plp-cta-text,#f5f1eb);font-size:11px;font-weight:600;letter-spacing:.14em;text-decoration:none;text-transform:uppercase;opacity:0;pointer-events:none;transform:translateY(4px);transition:opacity .16s,transform .16s}',
    '.trg-plp-body .product-grid__item:hover .trg-plp-card-shop-cta,.trg-plp-body .product-grid__item:focus-within .trg-plp-card-shop-cta{opacity:1;pointer-events:auto;transform:translateY(0)}',
    '.trg-plp-body .trg-plp-card-shop-cta:hover{background:transparent;color:var(--trg-plp-cta-hover,#c4562a)}',
    '.trg-plp-body .product-card__content.layout-panel-flex--column{justify-content:flex-start!important}',
    '.trg-plp-body product-card,.trg-plp-body .product-card,.trg-plp-body .product-card__content,.trg-plp-body .product-grid__card{height:100%}',
    '.trg-plp-body .product-grid{--product-grid-gap:1.25rem!important}',
    '.trg-plp-body .main-collection-grid{display:block!important;padding:0!important}'
  ].join('\n');
  document.head.appendChild(s);
})();
