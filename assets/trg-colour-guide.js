/* TRG Colour Guide — extracted from colour-guide-v9.html */
document.addEventListener('DOMContentLoaded', function () {

// -- DATA --

const DEPTHS=[{id:'very-fair',group:'light',name:'Very Fair',color:'#f2d4be',desc:'Burns quickly, rarely tans'},{id:'fair',group:'light',name:'Fair',color:'#e8c09c',desc:'Burns easily, tans slowly'},{id:'light-medium',group:'medium',name:'Light\u2013Medium',color:'#d4a878',desc:'Burns moderately, tans'},{id:'medium',group:'medium',name:'Medium',color:'#b87c50',desc:'Burns minimally, tans well'},{id:'medium-deep',group:'deep',name:'Medium\u2013Deep',color:'#8b5a3c',desc:'Rarely burns, tans deeply'},{id:'deep',group:'deep',name:'Deep',color:'#4a2c1a',desc:'Never burns, deepest pigment'}];

const C={
  // Whites & Creams (6)
  'White':'#f8f6f3','Cream':'#f2ead8','Ecru':'#e8dcc8','Off-White':'#eae4d8','Oatmeal':'#d4c8b0','Ivory':'#f0e8d0',
  // Sand & Khaki (11)
  'Sand':'#c8b88a','Tan':'#c4a878','Khaki':'#b0a07a','Camel':'#c49a5c','Biscuit':'#d0c0a0','Stone':'#a09080','Mushroom':'#a89888','Taupe':'#8a7e70','Mustard':'#c8a030','Ochre':'#b89028','Amber':'#d09030',
  // Browns (11)
  'Copper':'#b06828','Raw Sienna':'#b86000','Terracotta':'#c06848','Rust':'#a05030','Burnt Orange':'#c85028','Tobacco':'#7a5028','Saddle Brown':'#8b6834','Cognac':'#9a5a28','Chocolate':'#5c2c10','Espresso':'#3c2010','Fawn':'#c8a8a8',
  // Greens (12)
  'Mint':'#a0c8a0','Sage':'#88a880','Teal':'#287070','Olive':'#606838','Olive Drab':'#4a5828','Hunter':'#305838','Forest':'#1c4028','Bottle Green':'#1a3828','Emerald':'#40a860','Jade':'#48a078','Turquoise':'#388888','Moss':'#6b7f4a',
  // Blues (14)
  'Sky Blue':'#a0c4d8','Powder Blue':'#b0c8e0','Chambray':'#7898b8','Mid Blue':'#5a90b8','Steel Blue':'#587890','Denim':'#486888','Cerulean':'#4880c0','Blue':'#3464a8','Cobalt':'#2860a0','Royal Blue':'#2a50b0','French Blue':'#4070b8','Navy':'#1a3060','Dark Navy':'#101e40','Indigo':'#282858',
  // Greys (9)
  'Cement':'#ccc8c0','Light Grey':'#b8b4ac','Silver':'#a8a8a0','Pewter':'#909088','Smoke':'#808078','Slate':'#585850','Charcoal':'#404038','Graphite':'#303028','Black':'#181818',
  // Reds & Burgundy (8)
  'Salmon':'#d48870','Rose':'#c07878','Brick':'#8b3828','Carmine':'#a01028','Burgundy':'#6c1020','Oxblood':'#601018','Wine':'#501828','Dusty Rose':'#c09080',
  // Pinks & Mauves (5)
  'Soft Pink':'#d4a8a0','Mauve':'#a08090','Lavender':'#9898b8','Lilac Grey':'#9890a0','Plum':'#502840',
};

const FAMILIES=[
  {name:'Whites & Creams',colors:['White','Cream','Ecru','Off-White','Oatmeal','Ivory']},
  {name:'Sand & Khaki',colors:['Sand','Tan','Khaki','Camel','Biscuit','Stone','Mushroom','Taupe','Mustard','Ochre','Amber']},
  {name:'Browns',colors:['Copper','Raw Sienna','Terracotta','Rust','Burnt Orange','Tobacco','Saddle Brown','Cognac','Chocolate','Espresso','Fawn']},
  {name:'Greens',colors:['Mint','Sage','Teal','Olive','Olive Drab','Hunter','Forest','Bottle Green','Emerald','Jade','Turquoise','Moss']},
  {name:'Blues & Navies',colors:['Sky Blue','Powder Blue','Chambray','Mid Blue','Steel Blue','Denim','Cerulean','Blue','Cobalt','Royal Blue','French Blue','Navy','Dark Navy','Indigo']},
  {name:'Greys',colors:['Cement','Light Grey','Silver','Pewter','Smoke','Slate','Charcoal','Graphite','Black']},
  {name:'Reds & Burgundy',colors:['Salmon','Rose','Brick','Carmine','Burgundy','Oxblood','Wine','Dusty Rose']},
  {name:'Pinks & Mauves',colors:['Soft Pink','Mauve','Lavender','Lilac Grey','Plum']},
];

const PROFILES={
  'light-cool':{name:'Light + Cool',archetype:'Summer',swatch:'#c8c0d0',note:'Cool undertones mean warm earth tones pull sallow on you. The goal is harmony within the cool register \u2014 navy, charcoal, and muted jewel tones over camel and terracotta.',
    core:['Light Grey','Slate','Charcoal','Navy','Pewter','Stone','Silver'],
    best:['Dusty Rose','Mauve','Steel Blue','Cobalt','Plum','Burgundy','Carmine','Jade','Powder Blue','Lavender','Chambray','Denim','Wine'],
    caution:['Camel','Sand','Terracotta','Rust','Amber','Mustard','Salmon','Copper','Ochre']},
  'light-warm':{name:'Light + Warm',archetype:'Spring',swatch:'#e8c898',note:'Cool, icy tones will wash you out. Your range is warm and clear \u2014 enough brightness to match your light colouring without overwhelming it.',
    core:['Ivory','Cream','Sand','Camel','Smoke','Navy','Oatmeal','Biscuit'],
    best:['Salmon','Rust','Burnt Orange','Olive','Teal','Moss','Forest','Amber','Mustard','Copper','Terracotta','Cognac','Emerald'],
    caution:['White','Black','Plum','Steel Blue','Slate','Light Grey','Dusty Rose','Lavender','Indigo']},
  'light-neutral':{name:'Light + Neutral',archetype:'Soft Season',swatch:'#d8c8b8',note:'Neutral undertones give you flexibility. The risk is extremes. Stick to muted, mid-range tones and let saturation do the work.',
    core:['Stone','Smoke','Sand','Light Grey','Navy','Cream','Taupe','Oatmeal'],
    best:['Teal','Sage','Dusty Rose','Steel Blue','Camel','Jade','Olive','Mauve','Chambray','Moss','Denim'],
    caution:['Black','Salmon','Royal Blue','Burgundy','Mustard','Emerald']},
  'medium-cool':{name:'Medium + Cool',archetype:'Cool Classic',swatch:'#b0a0c0',note:'Medium depth with cool undertones means jewel tones hit hardest. Warm earth tones read muddy rather than rich against your colouring.',
    core:['Charcoal','Slate','Navy','Pewter','Stone','Graphite','Dark Navy'],
    best:['Steel Blue','Cobalt','Royal Blue','Burgundy','Carmine','Plum','Forest','Jade','Wine','Indigo','Cerulean','Oxblood','Emerald'],
    caution:['Camel','Terracotta','Mustard','Amber','Khaki','Sand','Ochre','Copper','Tan']},
  'medium-warm':{name:'Medium + Warm',archetype:'Autumn',swatch:'#b07840',note:'Autumn colouring is among the richest in the spectrum. Earth tones are your home territory. Cool pastels and muted greys flatten your natural warmth.',
    core:['Chocolate','Saddle Brown','Olive','Camel','Khaki','Smoke','Cognac','Tobacco'],
    best:['Rust','Terracotta','Burnt Orange','Amber','Mustard','Olive Drab','Forest','Burgundy','Copper','Ochre','Moss','Hunter','Teal'],
    caution:['Dusty Rose','Mauve','Powder Blue','Slate','Stone','Light Grey','Soft Pink','Lavender','Cement','Sky Blue']},
  'medium-neutral':{name:'Medium + Neutral',archetype:'Olive',swatch:'#9c8850',note:'Olive skin with neutral undertones reads warm at a distance but holds cool tones well close up. Push saturation, not lightness.',
    core:['Khaki','Smoke','Navy','Chocolate','Sand','Taupe','Denim'],
    best:['Teal','Cobalt','Burnt Orange','Hunter','Burgundy','Rust','Jade','Amber','Copper','Terracotta','Moss','Cerulean'],
    caution:['Soft Pink','Dusty Rose','Stone','Powder Blue','Cream','Sage','Lavender','Mint','Fawn']},
  'deep-cool':{name:'Deep + Cool',archetype:'Winter',swatch:'#3a2848',note:'Deep cool colouring is high-contrast and high-impact. Bold, saturated colours are your territory. Low-saturation neutrals create a muddy effect.',
    core:['Black','Charcoal','Navy','White','Graphite','Dark Navy'],
    best:['Royal Blue','Cobalt','Burgundy','Carmine','Forest','Jade','Plum','Wine','Emerald','Cerulean','Indigo','Oxblood'],
    caution:['Camel','Sand','Ivory','Cream','Dusty Rose','Amber','Soft Pink','Oatmeal','Biscuit','Fawn']},
  'deep-warm':{name:'Deep + Warm',archetype:'Deep Autumn',swatch:'#583420',note:'Deep warm colouring carries rich earth tones beautifully. Pale, cool tones look disconnected against your depth.',
    core:['Chocolate','Saddle Brown','Hunter','Olive','Navy','Espresso','Cognac','Tobacco'],
    best:['Burnt Orange','Terracotta','Rust','Mustard','Amber','Burgundy','Forest','Moss','Copper','Ochre','Teal','Olive Drab'],
    caution:['Soft Pink','Stone','Cream','Powder Blue','Dusty Rose','Sage','White','Cement','Lavender','Mint']},
  'deep-neutral':{name:'Deep + Neutral',archetype:'Deep Anchor',swatch:'#443028',note:'Deep neutral is the most versatile in the deep range. Both warm and cool work \u2014 what matters is saturation and contrast.',
    core:['Charcoal','Black','Navy','Chocolate','Forest','Graphite','Dark Navy'],
    best:['Teal','Burgundy','Cobalt','Rust','Hunter','Burnt Orange','Carmine','Jade','Wine','Emerald','Copper','Terracotta'],
    caution:['Stone','Cream','Light Grey','Soft Pink','Sand','Cement','Oatmeal']},
};

// -- STATE --

let selDepth=null,selDepthGroup=null,answers={vein:null,metal:null,sun:null},undertone=null,activeProfile=null;

// -- RENDER --

function renderDepths(){
  const grid=document.getElementById('depth-grid');
  grid.innerHTML=DEPTHS.map(d=>`<div class="depth-tile" data-id="${d.id}" data-group="${d.group}"><div class="depth-tile-check"></div><div class="depth-circle" style="background:${d.color}"></div><div class="depth-tile-name">${d.name}</div><div class="depth-tile-desc">${d.desc}</div></div>`).join('');
  grid.querySelectorAll('.depth-tile').forEach(t=>{t.setAttribute('role','button');t.setAttribute('tabindex','0');t.setAttribute('aria-label',t.querySelector('.depth-tile-name').textContent);t.addEventListener('click',()=>{grid.querySelectorAll('.depth-tile').forEach(x=>x.classList.remove('sel'));t.classList.add('sel');selDepth=t.dataset.id;selDepthGroup=t.dataset.group;document.getElementById('step1-next').classList.add('on');});t.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t.click();}});});
}

function renderFamilies(){
  document.getElementById('guide-wrap').innerHTML=FAMILIES.map(fam=>`<div class="family"><div class="family-head"><h2 class="family-name">${fam.name}</h2><span class="family-count">${fam.colors.length} colours</span></div><div class="family-chips">${fam.colors.map(name=>`<div class="g-chip" data-name="${name}"><div class="g-chip-sq" style="background:${C[name]||'#ccc'}"><div class="g-chip-badge"></div></div><span class="g-chip-name">${name}</span></div>`).join('')}</div></div>`).join('');
}

function rChips(names){return names.map(n=>{const hex=C[n];if(!hex)return '';return `<div class="r-chip"><div class="r-chip-sq" style="background:${hex}"></div><span class="r-chip-name">${n}</span></div>`;}).join('');}

function renderResult(){
  const key=`${selDepthGroup}-${undertone}`;const p=PROFILES[key];if(!p)return;
  activeProfile=p;
  const archetypeClean = p.archetype.replace(' archetype','');
  document.getElementById('result-wrap').innerHTML=`<div class="result-header"><div class="result-swatch" style="background:${p.swatch}"></div><div><p class="result-eyebrow">Your colour profile</p><h2 class="result-name">${archetypeClean}</h2><p class="result-sub">${p.name}</p></div><div class="result-acts"><button class="btn-ghost" id="btn-scroll-grid">See rated colours &#8595;</button><button class="btn-ghost-sm" onclick="window._cgResetAll()">Reset</button></div></div><div class="result-note">${p.note}</div><div class="result-body"><div class="result-sec"><div class="result-sec-head"><span class="result-sec-lbl">Core neutrals \u2014 always safe</span></div><div class="chip-row">${rChips(p.core)}</div></div><div class="result-sec"><div class="result-sec-head"><span class="result-sec-lbl">Best colours \u2014 your strongest plays</span></div><div class="chip-row">${rChips(p.best)}</div></div><div class="result-sec caution-sec"><div class="result-sec-head"><span class="result-sec-lbl">Approach with care</span></div><div class="chip-row">${rChips(p.caution)}</div></div></div>`;
  document.getElementById('btn-scroll-grid')?.addEventListener('click',scrollToGrid);
  applyMatchIndicators(p);
}

// -- MATCH INDICATORS ON GRID --

function applyMatchIndicators(profile){
  // Switch to sorted view
  renderSortedGrid(profile);
  // Refresh builder with profile data
  renderOBFamilies();
  updateOBProfileLink();
  const activeSlot = document.querySelector('.ob-slot.on');
  if (activeSlot) renderOBSuggestions(activeSlot.dataset.slot);
  // Show profile bar
  const bar=document.getElementById('profile-bar');
  document.getElementById('pb-swatch').style.background=profile.swatch;
  document.getElementById('pb-name').textContent=profile.name;
  const previewColors=[...(profile.core||[]).slice(0,3),...(profile.best||[]).slice(0,3)];
  document.getElementById('pb-dots').innerHTML=previewColors.map(n=>`<div class="pb-dot" style="background:${C[n]||'#ccc'}" title="${n}"></div>`).join('');
  bar.classList.add('show');
}

function clearMatchIndicators(){
  renderFamilies();
  document.getElementById('profile-bar').classList.remove('show');
  activeProfile=null;
  renderOBFamilies();
  updateOBProfileLink();
  document.getElementById('ob-suggest').classList.remove('show');
}

// -- TALLY --

function updateTally(){
  const counts={cool:0,neutral:0,warm:0};
  Object.values(answers).forEach(a=>{if(a)counts[a]++;});
  const answered=Object.values(answers).filter(Boolean).length;
  const max=Math.max(...Object.values(counts));
  ['cool','neutral','warm'].forEach(k=>{const el=document.getElementById('tally-'+k);el.textContent=counts[k];el.className='ut-tally-count'+(counts[k]>0?' live':'')+(counts[k]===max&&max>0?' lead':'');});
  const status=document.getElementById('ut-status');
  const nextBtn=document.getElementById('step2-next');
  if(answered<3){status.innerHTML=`${3-answered} test${3-answered>1?'s':''} remaining`;nextBtn.classList.remove('on');undertone=null;return;}
  if(counts.cool>=2)undertone='cool';else if(counts.warm>=2)undertone='warm';else undertone='neutral';
  const labels={cool:'Cool',warm:'Warm',neutral:'Neutral'};
  status.innerHTML=`Your undertone is most likely <strong>${labels[undertone]}</strong> <span class="ut-tag ${undertone}">${labels[undertone]}</span>`;
  nextBtn.classList.add('on');
}

// -- NAV --

function goStep(n) {
  document.querySelectorAll('.step-section').forEach((s, i) => s.classList.toggle('active', i + 1 === n));
  document.querySelectorAll('.step-item').forEach((item, i) => {
    const sn = i + 1;
    item.className = 'step-item' + (sn === n ? ' active' : sn < n ? ' done' : '');
  });

  // Step 1 summary
  const s1 = document.getElementById('step1-summary');
  if (n > 1 && selDepth) {
    const depthData = DEPTHS.find(d => d.id === selDepth);
    if (depthData) {
      document.getElementById('s1-circle').style.background = depthData.color;
      document.getElementById('s1-text').innerHTML = `Your depth: <strong>${depthData.name}</strong>`;
    }
    s1.classList.add('show');
  } else {
    s1.classList.remove('show');
  }

  // Step 2 summary
  const s2 = document.getElementById('step2-summary');
  if (n > 2 && undertone) {
    const labels = { cool: 'Cool', warm: 'Warm', neutral: 'Neutral' };
    const signalColors = { cool: '#8090d0', neutral: '#7aaa9a', warm: '#78b068' };
    document.getElementById('s2-dots').innerHTML = Object.entries(answers)
      .filter(([, v]) => v)
      .map(([, v]) => `<div class="step-summary-dot" style="background:${signalColors[v]}"></div>`)
      .join('');
    document.getElementById('s2-text').innerHTML = `Your undertone: <strong>${labels[undertone]}</strong> <span class="step-summary-tag ${undertone}">${labels[undertone]}</span>`;
    s2.classList.add('show');
  } else {
    s2.classList.remove('show');
  }

  document.getElementById('st-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToGrid(){
  document.getElementById('grid-anchor').scrollIntoView({behavior:'smooth',block:'start'});
}

function resetAll(){
  selDepth=null;selDepthGroup=null;answers={vein:null,metal:null,sun:null};undertone=null;
  document.querySelectorAll('.depth-tile').forEach(t=>t.classList.remove('sel'));
  document.getElementById('step1-next').classList.remove('on');
  document.querySelectorAll('.quiz-opt').forEach(o=>o.classList.remove('sel'));
  ['cool','neutral','warm'].forEach(k=>{const el=document.getElementById('tally-'+k);if(el){el.textContent='0';el.className='ut-tally-count';}});
  document.getElementById('ut-status').innerHTML='Answer all three tests to see your undertone';
  document.getElementById('step2-next').classList.remove('on');
  clearMatchIndicators();
  document.getElementById('step1-summary').classList.remove('show');
  document.getElementById('step2-summary').classList.remove('show');
  goStep(1);
}

// Expose resetAll globally for inline onclick in rendered HTML
window._cgResetAll = resetAll;

// -- SORTED GRID --

function renderSortedGrid(profile) {
  const allMatch = new Set([...(profile.core || []), ...(profile.best || [])]);
  const allCaution = new Set(profile.caution || []);
  const matchColors = [], cautionColors = [], otherColors = [];

  FAMILIES.forEach(fam => {
    fam.colors.forEach(name => {
      if (allMatch.has(name)) matchColors.push(name);
      else if (allCaution.has(name)) cautionColors.push(name);
      else otherColors.push(name);
    });
  });

  const chipHtml = (names) => names.map(n =>
    `<div class="sorted-chip" role="button" tabindex="0"><div class="sorted-chip-sq" style="background:${C[n]||'#ccc'}"></div><span class="sorted-chip-name">${n}</span></div>`
  ).join('');

  document.getElementById('guide-wrap').innerHTML = `
    <div class="sorted-section match-sec">
      <div class="sorted-head"><span class="sorted-label match-label">In your palette &mdash; ${matchColors.length} colours</span></div>
      <div class="sorted-chips">${chipHtml(matchColors)}</div>
    </div>
    <div class="sorted-section caution-sec">
      <div class="sorted-head"><span class="sorted-label caution-label">Approach with care &mdash; ${cautionColors.length} colours</span></div>
      <div class="sorted-chips">${chipHtml(cautionColors)}</div>
    </div>
    <div class="sorted-section other-sec">
      <div class="sorted-head"><span class="sorted-label other-label">Other colours &mdash; ${otherColors.length} colours</span></div>
      <div class="sorted-chips">${chipHtml(otherColors)}</div>
    </div>
  `;
}

// -- EVENTS --

document.getElementById('step1-next').addEventListener('click',()=>selDepth&&goStep(2));
document.getElementById('step2-back').addEventListener('click',()=>goStep(1));
document.getElementById('step2-next').addEventListener('click',()=>{if(!undertone)return;renderResult();goStep(3);});
document.getElementById('step3-reset').addEventListener('click',resetAll);
document.getElementById('step3-scroll').addEventListener('click',scrollToGrid);
document.getElementById('step3-builder').addEventListener('click',()=>document.getElementById('builder-anchor').scrollIntoView({behavior:'smooth',block:'start'}));
document.getElementById('skip-to-builder').addEventListener('click',()=>document.getElementById('builder-anchor').scrollIntoView({behavior:'smooth',block:'start'}));
document.getElementById('skip-to-grid').addEventListener('click',scrollToGrid);
document.getElementById('s1-change').addEventListener('click',()=>goStep(1));
document.getElementById('s2-change').addEventListener('click',()=>goStep(2));

document.querySelectorAll('.quiz-opt').forEach(opt=>{opt.setAttribute('role','button');opt.setAttribute('tabindex','0');opt.setAttribute('aria-label',opt.querySelector('.quiz-opt-label').textContent);opt.addEventListener('click',()=>{const q=opt.dataset.q;document.querySelectorAll(`.quiz-opt[data-q="${q}"]`).forEach(o=>o.classList.remove('sel'));opt.classList.add('sel');answers[q]=opt.dataset.signal;updateTally();});opt.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();opt.click();}});});

// -- PRESETS --

const PRESETS = [
  { name:'The Business Classic', desc:'Navy blazer, white shirt, charcoal trousers, cognac shoes.', colors:['Navy','White','Charcoal','Cobalt','Cognac'], slots:{shirt:'White',trousers:'Charcoal',jacket:'Navy',shoes:'Cognac',knitwear:'Cobalt'} },
  { name:'The Weekend', desc:'Olive over cream, rust knitwear, denim below.', colors:['Olive','Cream','Rust','Denim','Saddle Brown'], slots:{shirt:'Cream',trousers:'Denim',knitwear:'Rust',jacket:'Olive',shoes:'Saddle Brown'} },
  { name:'The Italianate', desc:'Camel coat, burgundy knit, cream base, chocolate leather.', colors:['Camel','Burgundy','Cream','Chocolate','Tan'], slots:{shirt:'Cream',trousers:'Tan',knitwear:'Burgundy',coat:'Camel',shoes:'Chocolate'} },
  { name:'Tonal Grey', desc:'Four shades of grey, head to toe. Monochrome done right.', colors:['Light Grey','Pewter','Charcoal','Slate','Smoke'], slots:{shirt:'Light Grey',trousers:'Charcoal',knitwear:'Pewter',jacket:'Slate',shoes:'Smoke'} },
  { name:'Country Walk', desc:'Forest green, mustard knit, stone chinos, espresso boots.', colors:['Forest','Mustard','Stone','Espresso','Olive'], slots:{shirt:'Stone',trousers:'Olive',knitwear:'Mustard',jacket:'Forest',shoes:'Espresso'} },
  { name:'The Riviera', desc:'Sky blue linen, white tee, stone chinos, tan loafers.', colors:['Sky Blue','White','Stone','Tan','Chambray'], slots:{shirt:'White',trousers:'Stone',knitwear:'Chambray',jacket:'Sky Blue',shoes:'Tan'} },
  { name:'Nordic Minimal', desc:'Black, charcoal, cement. Stripped to nothing. Sharp.', colors:['Black','Charcoal','Cement','Graphite','Silver'], slots:{shirt:'Cement',trousers:'Charcoal',knitwear:'Graphite',coat:'Black',shoes:'Black'} },
  { name:'Rust Belt', desc:'Rust jacket, tobacco knit, raw denim, espresso leather.', colors:['Rust','Tobacco','Denim','Espresso','Copper'], slots:{shirt:'Copper',trousers:'Denim',knitwear:'Tobacco',jacket:'Rust',shoes:'Espresso'} },
  { name:'The Academic', desc:'Burgundy knit, grey flannels, navy blazer, oxblood shoes.', colors:['Burgundy','Pewter','Navy','Oxblood','Cream'], slots:{shirt:'Cream',trousers:'Pewter',knitwear:'Burgundy',jacket:'Navy',shoes:'Oxblood'} },
  { name:'Desert Palette', desc:'Sand, terracotta, olive. Earthy warmth, end to end.', colors:['Sand','Terracotta','Olive','Camel','Saddle Brown'], slots:{shirt:'Sand',trousers:'Olive',knitwear:'Terracotta',jacket:'Camel',shoes:'Saddle Brown'} },
];

function renderPresets() {
  document.getElementById('presets-row').innerHTML = PRESETS.map((p, i) => `
    <div class="preset-card" data-preset="${i}">
      <div class="preset-strips">${p.colors.map(c => `<div class="preset-strip" style="background:${C[c]||'#ccc'}"></div>`).join('')}</div>
      <p class="preset-name">${p.name}</p>
      <p class="preset-desc">${p.desc}</p>
      <p class="preset-cta">Start with this &rarr;</p>
    </div>
  `).join('');

  document.querySelectorAll('.preset-card').forEach(card => {
    card.setAttribute('role','button');
    card.setAttribute('tabindex','0');
    card.setAttribute('aria-label',card.querySelector('.preset-name').textContent);
    card.addEventListener('click', () => {
      document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('sel'));
      card.classList.add('sel');
      populateBuilder(PRESETS[parseInt(card.dataset.preset)]);
    });
    card.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click();}});
  });
}

// -- SLOT SUGGESTIONS --

const SLOT_RECS = {
  shirt:    { pool:['White','Off-White','Cream','Ivory','Powder Blue','Sky Blue','Chambray','Oatmeal','Ecru','Light Grey','Cement','Salmon','Rose','Soft Pink'], hint:'Lighter tones near the face' },
  trousers: { pool:['Charcoal','Navy','Slate','Khaki','Olive','Stone','Smoke','Denim','Graphite','Dark Navy','Taupe','Sand'], hint:'Grounding neutrals and mid-tones' },
  knitwear: { pool:['Burgundy','Rust','Teal','Forest','Cobalt','Mustard','Terracotta','Plum','Emerald','Copper','Jade','Wine','Ochre','Moss','Carmine','Cerulean'], hint:'Rich tones that add depth' },
  jacket:   { pool:['Navy','Charcoal','Camel','Olive','Slate','Dark Navy','Hunter','Graphite','Chocolate','Saddle Brown','Denim'], hint:'The anchor piece' },
  coat:     { pool:['Camel','Charcoal','Navy','Black','Chocolate','Dark Navy','Espresso','Graphite','Olive'], hint:'Broad strokes, outermost layer' },
  shoes:    { pool:['Saddle Brown','Cognac','Chocolate','Black','Espresso','Tobacco','Tan','Oxblood'], hint:'Leathers and darks' },
};

function renderOBSuggestions(slotName) {
  const suggestEl = document.getElementById('ob-suggest');
  if (!activeProfile || !slotName) { suggestEl.classList.remove('show'); return; }

  const rec = SLOT_RECS[slotName];
  if (!rec) { suggestEl.classList.remove('show'); return; }

  const paletteSet = new Set([...(activeProfile.core || []), ...(activeProfile.best || [])]);
  const cautionSet = new Set(activeProfile.caution || []);
  // Priority: palette matches first, then non-caution from pool
  const paletteMatches = rec.pool.filter(c => paletteSet.has(c));
  const neutrals = rec.pool.filter(c => !paletteSet.has(c) && !cautionSet.has(c));
  const suggestions = [...paletteMatches, ...neutrals].slice(0, 8);
  if (suggestions.length === 0) { suggestEl.classList.remove('show'); return; }

  document.getElementById('ob-suggest-hint').textContent = rec.hint;
  document.getElementById('ob-suggest-chips').innerHTML = suggestions.map(name =>
    `<div class="ob-sc" data-color="${name}" role="button" tabindex="0"><div class="ob-sc-sq" style="background:${C[name]||'#ccc'}"></div><span class="ob-sc-name">${name}</span></div>`
  ).join('');

  suggestEl.classList.add('show');

  // Click suggestion to assign
  document.querySelectorAll('.ob-sc').forEach(sc => {
    sc.addEventListener('click', () => {
      const activeSlot = document.querySelector('.ob-slot.on');
      if (!activeSlot) return;
      assignColourToSlot(activeSlot, sc.dataset.color);
    });
    sc.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();sc.click();}});
  });
}

function updateOBProfileLink() {
  const linkEl = document.getElementById('ob-profile-link');
  if (activeProfile) {
    linkEl.classList.add('active');
    document.getElementById('ob-pl-swatch').style.background = activeProfile.swatch;
    document.getElementById('ob-pl-text').innerHTML = `<strong>${activeProfile.name}</strong> profile active &mdash; colour picks personalised for your skin tone.`;
    document.getElementById('ob-pl-cta').textContent = 'Change';
  } else {
    linkEl.classList.remove('active');
    document.getElementById('ob-pl-swatch').style.background = 'var(--border)';
    document.getElementById('ob-pl-text').innerHTML = 'Your skin tone shapes which colours land. One depth pick, three quick tests, and the builder does the rest.';
    document.getElementById('ob-pl-cta').textContent = 'Personalise \u2192';
  }
}

function assignColourToSlot(slot, colorName) {
  const hex = C[colorName];
  slot.classList.add('filled');
  slot.classList.remove('on');
  slot.querySelector('.ob-slot-color').textContent = colorName;
  slot.querySelector('.ob-slot-dot').style.background = hex;
  const allSlots = [...document.querySelectorAll('.ob-slot')];
  const nextEmpty = allSlots.find(s => !s.classList.contains('filled'));
  if (nextEmpty) {
    nextEmpty.classList.add('on');
    renderOBSuggestions(nextEmpty.dataset.slot);
  } else {
    document.getElementById('ob-suggest').classList.remove('show');
  }
  updateGauge();
}

function populateBuilder(preset) {
  if (!preset || !preset.slots) return;
  // Clear all slots first
  document.querySelectorAll('.ob-slot').forEach(s => {
    s.classList.remove('filled','on');
    s.querySelector('.ob-slot-color').textContent = '';
    s.querySelector('.ob-slot-dot').style.background = '';
  });
  // Fill mapped slots
  Object.entries(preset.slots).forEach(([slotName, colorName]) => {
    const slot = document.querySelector(`.ob-slot[data-slot="${slotName}"]`);
    if (!slot || !C[colorName]) return;
    slot.classList.add('filled');
    slot.querySelector('.ob-slot-color').textContent = colorName;
    slot.querySelector('.ob-slot-dot').style.background = C[colorName];
  });
  // Activate first empty slot, or none
  const empty = document.querySelector('.ob-slot:not(.filled)');
  if (empty) { empty.classList.add('on'); renderOBSuggestions(empty.dataset.slot); }
  else { document.getElementById('ob-suggest').classList.remove('show'); }
  updateGauge();
}

// -- OUTFIT BUILDER FAMILIES --

function renderOBFamilies() {
  const paletteSet = activeProfile ? new Set([...(activeProfile.core || []), ...(activeProfile.best || [])]) : null;
  const cautionSet = activeProfile ? new Set(activeProfile.caution || []) : null;

  document.getElementById('ob-families').innerHTML = FAMILIES.map(fam => `
    <div class="ob-fam">
      <div class="ob-fam-head">
        <span class="ob-fam-name">The <em>${fam.name.split(' & ')[0]}</em>${fam.name.includes('&') ? ' & ' + fam.name.split(' & ')[1] : ''}</span>
        <span class="ob-fam-count">${fam.colors.length} colours</span>
      </div>
      <div class="ob-fam-chips">${fam.colors.map(name => {
        const cls = paletteSet && paletteSet.has(name) ? ' in-palette' : cautionSet && cautionSet.has(name) ? ' is-caution' : '';
        return `<div class="ob-chip${cls}" style="background:${C[name]||'#ccc'}" data-color="${name}" title="${name}" role="button" tabindex="0"><div class="ob-tt">${name}</div></div>`;
      }).join('')}</div>
    </div>
  `).join('');

  // Click to assign colour to active slot
  document.querySelectorAll('.ob-chip').forEach(chip => {
    chip.setAttribute('role','button');
    chip.addEventListener('click', () => {
      const activeSlot = document.querySelector('.ob-slot.on');
      if (!activeSlot) return;
      assignColourToSlot(activeSlot, chip.dataset.color);
    });
    chip.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();chip.click();}});
  });
}

// Slot click
document.getElementById('ob-slots').addEventListener('click', (e) => {
  const slot = e.target.closest('.ob-slot');
  if (!slot) return;
  if (e.target.closest('.ob-slot-rm') && slot.classList.contains('filled')) {
    slot.classList.remove('filled');
    slot.querySelector('.ob-slot-color').textContent = '';
    slot.querySelector('.ob-slot-dot').style.background = '';
    updateGauge();
    renderOBSuggestions(slot.dataset.slot);
    return;
  }
  document.querySelectorAll('.ob-slot').forEach(s => s.classList.remove('on'));
  slot.classList.add('on');
  renderOBSuggestions(slot.dataset.slot);
});

function updateGauge() {
  const filledSlots = document.querySelectorAll('.ob-slot.filled');
  const filled = filledSlots.length;
  const total = 6;
  const pct = Math.round((filled / total) * 100);
  const circumference = 2 * Math.PI * 26;
  const offset = circumference - (circumference * pct / 100);
  document.getElementById('ob-gauge-fill').style.strokeDashoffset = offset;
  const pctEl = document.getElementById('ob-gauge-pct');
  if (filled === 0) { pctEl.innerHTML = 'Pick your<br>first piece'; }
  else { pctEl.innerHTML = `${filled}/${total}`; }

  // Shop bar — show when 3+ slots filled
  const shopBar = document.getElementById('ob-shop-bar');
  if (filled >= 3) {
    const colours = [...filledSlots].map(s => s.querySelector('.ob-slot-color').textContent).filter(Boolean);
    document.getElementById('ob-shop-dots').innerHTML = colours.map(name =>
      `<div class="ob-shop-dot" style="background:${C[name]||'#ccc'}" title="${name}"></div>`
    ).join('');
    // Build search URL from colour names
    const searchQ = colours.join(' ');
    document.getElementById('ob-shop-cta').href = `/search?q=${encodeURIComponent(searchQ)}&type=product`;
    shopBar.classList.add('vis');
  } else {
    shopBar.classList.remove('vis');
  }
}

// -- INIT --

// Profile link in builder — scroll up to quiz
document.getElementById('ob-pl-cta').addEventListener('click', () => {
  document.getElementById('st-wrap').scrollIntoView({ behavior: 'smooth' });
});

renderDepths();
renderFamilies();
renderPresets();
renderOBFamilies();
updateOBProfileLink();

}); // end DOMContentLoaded
