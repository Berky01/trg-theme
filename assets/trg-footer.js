(function(){
  var mql = window.matchMedia("(max-width: 749px)");
  function initAccordions(){
    var cols = document.querySelectorAll(".trg-footer__col");
    cols.forEach(function(col){
      var title = col.querySelector(".trg-footer__col-title");
      if(!title || title.dataset.trfAccordion) return;
      title.dataset.trfAccordion = "1";
      title.addEventListener("click", function(){
        if(!mql.matches) return;
        var isOpen = col.classList.contains("is-open");
        col.parentElement.querySelectorAll(".trg-footer__col.is-open").forEach(function(c){
          c.classList.remove("is-open");
        });
        if(!isOpen) col.classList.add("is-open");
      });
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", initAccordions);
  } else {
    initAccordions();
  }
  document.addEventListener("shopify:section:load", initAccordions);
})();