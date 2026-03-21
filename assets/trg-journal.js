/* TRG Journal - pill filter + read time */
(function(){
  const wrap = document.querySelector('.trg-jrn-wrap');
  if (!wrap) return;

  /* Pill filtering */
  wrap.querySelectorAll('.trg-jrn-pill').forEach(function(pill) {
    pill.addEventListener('click', function() {
      wrap.querySelectorAll('.trg-jrn-pill').forEach(function(p) { p.classList.remove('on'); });
      pill.classList.add('on');
      var tag = pill.getAttribute('data-tag') || '';
      filterArticles(tag);
    });
  });

  function filterArticles(tag) {
    var lead = wrap.querySelector('.trg-jrn-lead');
    var items = wrap.querySelectorAll('.trg-jrn-list-item');
    var recentItems = wrap.querySelectorAll('.trg-jrn-recent-item');

    if (!tag) {
      /* Show all */
      if (lead) lead.style.display = '';
      items.forEach(function(el) { el.style.display = ''; });
      recentItems.forEach(function(el) { el.style.display = ''; });
      updateNumbers(items);
      return;
    }

    /* Filter lead */
    if (lead) {
      var leadTag = (lead.getAttribute('data-tags') || '').toLowerCase();
      lead.style.display = leadTag.indexOf(tag.toLowerCase()) !== -1 ? '' : 'none';
    }

    /* Filter list items */
    var visible = 0;
    items.forEach(function(el) {
      var elTags = (el.getAttribute('data-tags') || '').toLowerCase();
      if (elTags.indexOf(tag.toLowerCase()) !== -1) {
        el.style.display = '';
        visible++;
      } else {
        el.style.display = 'none';
      }
    });

    updateNumbers(items);
  }

  function updateNumbers(items) {
    var n = 1;
    items.forEach(function(el) {
      if (el.style.display !== 'none') {
        var numEl = el.querySelector('.trg-jrn-li-num');
        if (numEl) numEl.textContent = String(n).padStart(2, '0');
        n++;
      }
    });
  }
})();
