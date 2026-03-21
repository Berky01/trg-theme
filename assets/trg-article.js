/* ═══════════════════════════════════════
   TRG Article — trg-article.js
   ═══════════════════════════════════════ */
(function(){
  'use strict';

  var bar = document.getElementById('trgArtProgress');
  var main = document.querySelector('.trg-art-main');
  var pill = document.getElementById('trgArtPill');
  var pillLabel = pill ? pill.querySelector('.trg-art-toc-pill-label') : null;
  var drawer = document.getElementById('trgArtDrawer');
  var overlay = document.getElementById('trgArtOverlay');

  /* Collect section anchors from the article body */
  var headings = main ? main.querySelectorAll('h2[id]') : [];
  var sectionIds = [];
  var sectionLabels = [];
  headings.forEach(function(h){ sectionIds.push(h.id); sectionLabels.push(h.textContent.trim()); });

  var allTocItems = document.querySelectorAll('[data-trg-toc]');

  /* ── Reading progress ── */
  function updateProgress(){
    if(!main || !bar) return;
    var rect = main.getBoundingClientRect();
    var total = main.scrollHeight - window.innerHeight;
    if(total <= 0) return;
    var pct = Math.min(100, Math.max(0, (-rect.top / total) * 100));
    bar.style.width = pct + '%';
  }

  /* ── TOC highlight ── */
  function updateTOC(){
    if(!sectionIds.length) return;
    var current = 0;
    for(var i = sectionIds.length - 1; i >= 0; i--){
      var el = document.getElementById(sectionIds[i]);
      if(el && el.getBoundingClientRect().top <= 120){ current = i; break; }
    }
    allTocItems.forEach(function(item){
      item.classList.toggle('active', parseInt(item.getAttribute('data-trg-toc'),10) === current);
    });
    if(pillLabel && sectionLabels[current]) pillLabel.textContent = sectionLabels[current];
  }

  /* ── Pill visibility ── */
  function updatePill(){
    if(!pill) return;
    var hero = document.querySelector('.trg-art-hero');
    var edit = document.querySelector('.trg-art-edit');
    if(!hero) return;
    var hb = hero.getBoundingClientRect().bottom;
    var show = hb < 0 && (edit ? edit.getBoundingClientRect().top > window.innerHeight : true);
    pill.classList.toggle('hidden', !show);
  }

  /* ── Drawer ── */
  function openDrawer(){ if(drawer) drawer.classList.add('open'); if(overlay) overlay.classList.add('open'); }
  function closeDrawer(){ if(drawer) drawer.classList.remove('open'); if(overlay) overlay.classList.remove('open'); }
  if(pill) pill.addEventListener('click', openDrawer);
  if(overlay) overlay.addEventListener('click', closeDrawer);
  if(drawer) drawer.querySelectorAll('.trg-art-toc-item').forEach(function(item){
    item.addEventListener('click', function(){ closeDrawer(); });
  });

  /* ── Estimate reading time ── */
  var readEl = document.querySelector('.trg-art-read-time');
  if(readEl && main){
    var text = main.textContent || '';
    var words = text.trim().split(/\s+/).length;
    var mins = Math.max(1, Math.round(words / 230));
    readEl.textContent = mins + ' min read';
  }

  /* ── Scroll listeners ── */
  function onScroll(){ updateProgress(); updateTOC(); updatePill(); }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

})();
