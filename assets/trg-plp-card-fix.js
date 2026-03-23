// TRG PLP Card Fix — CSS injection
(function(){
  if(document.getElementById('trg-pcf'))return;
  var s=document.createElement('style');
  s.id='trg-pcf';
  s.textContent=
  '.trg-plp-body .card-gallery{flex:0 0 auto!important;aspect-ratio:var(--trg-plp-image-ratio,3/4)!important;--gallery-aspect-ratio:.75!important;min-height:0!important}'+
  '.trg-plp-body .card-gallery img,.trg-plp-body .card-gallery video{width:100%!important;height:100%!important;object-fit:cover!important;object-position:var(--trg-plp-image-position,top center)!important}'+
  '.trg-plp-body .card-gallery .product-media{width:100%;height:100%}'+
  '.trg-plp-body .group-block{flex:1 0 auto!important;display:flex!important;flex-direction:column!important;padding:0!important;position:relative;overflow:hidden;background:var(--trg-plp-caption-background,#faf8f4);border-top:1px solid var(--trg-plp-border-color,#d8d3ca)}'+
  '.trg-plp-body .group-block-content{flex:1 1 auto;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;padding:var(--trg-plp-caption-padding,12px) var(--trg-plp-caption-padding,12px) 40px!important;background:var(--trg-plp-caption-background,#faf8f4);gap:0!important}'+
  '.trg-plp-body .group-block__media-wrapper{display:none!important}'+
  '.trg-plp-body .trg-plp-card-brand{font-size:.6rem!important;font-weight:500!important;letter-spacing:.1em!important;text-transform:uppercase!important;color:var(--trg-plp-muted-color,#8e877d)!important;margin-bottom:.2rem!important;order:1}'+
  '.trg-plp-body .group-block-content>a.contents.user-select-text{order:2}'+
  '.trg-plp-body .group-block-content>a.contents.user-select-text .text-block p{font-family:var(--font-heading--family)!important;font-size:.95rem!important;font-weight:600!important;line-height:1.2!important;color:var(--trg-plp-text-color,#2f2b27)!important}'+
  '.trg-plp-body .trg-plp-card-material{order:3;margin-top:.2rem!important;font-size:.67rem!important;font-weight:300!important;color:var(--trg-plp-muted-color,#8e877d)!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
  '.trg-plp-body .group-block-content>product-price{order:4;margin-top:auto!important;padding-top:.5rem!important}'+
  '.trg-plp-body .group-block-content>product-price .price{font-size:.875rem!important;font-weight:500!important;color:var(--trg-plp-text-color,#2f2b27)!important}'+
  '.trg-plp-body .trg-plp-card-cta-block{order:5;display:contents}'+
  '.trg-plp-body .trg-plp-card-shop-cta{position:absolute;right:0;bottom:0;left:0;z-index:3;display:inline-flex;align-items:center;justify-content:space-between;padding:10px var(--trg-plp-caption-padding,12px);background:var(--trg-plp-cta-background,#1a1a18);color:var(--trg-plp-cta-text,#f5f1eb);font-size:11px;font-weight:600;letter-spacing:.14em;text-decoration:none;text-transform:uppercase;opacity:0;pointer-events:none;transform:translateY(4px);transition:opacity .16s,transform .16s}'+
  '.trg-plp-body .product-grid__item:hover .trg-plp-card-shop-cta,.trg-plp-body .product-grid__item:focus-within .trg-plp-card-shop-cta{opacity:1;pointer-events:auto;transform:translateY(0)}'+
  '.trg-plp-body .trg-plp-card-shop-cta:hover{background:transparent;color:var(--trg-plp-cta-hover,#c4562a)}'+
  '.trg-plp-body .product-card__content.layout-panel-flex--column{justify-content:flex-start!important}'+
  '.trg-plp-body product-card,.trg-plp-body .product-card,.trg-plp-body .product-card__content,.trg-plp-body .product-grid__card{height:100%}';
  document.head.appendChild(s);
})();
