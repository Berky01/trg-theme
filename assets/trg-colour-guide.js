/* TRG Colour Guide v20 */
document.addEventListener('DOMContentLoaded', function () {

// ── DATA ─────────────────────────────────────────────────────────────────────

const DEPTHS=[{id:'very-fair',group:'light',name:'Very Fair',color:'#f2d4be',desc:'Burns quickly, rarely tans'},{id:'fair',group:'light',name:'Fair',color:'#e8c09c',desc:'Burns easily, tans slowly'},{id:'light-medium',group:'medium',name:'Light\u2013Medium',color:'#d4a878',desc:'Burns moderately, tans'},{id:'medium',group:'medium',name:'Medium',color:'#b87c50',desc:'Burns minimally, tans well'},{id:'medium-deep',group:'deep',name:'Medium\u2013Deep',color:'#8b5a3c',desc:'Rarely burns, tans deeply'},{id:'deep',group:'deep',name:'Deep',color:'#4a2c1a',desc:'Never burns, deepest pigment'}];

const C={
  'White':'#f8f6f3','Cream':'#f2ead8','Ecru':'#e8dcc8','Off-White':'#eae4d8','Oatmeal':'#d4c8b0','Ivory':'#f0e8d0',
  'Sand':'#c8b88a','Tan':'#c4a878','Khaki':'#b0a07a','Camel':'#c49a5c','Biscuit':'#d0c0a0','Stone':'#a09080','Mushroom':'#a89888','Taupe':'#8a7e70','Mustard':'#c8a030','Ochre':'#b89028','Amber':'#d09030',
  'Copper':'#b06828','Raw Sienna':'#b86000','Terracotta':'#c06848','Rust':'#a05030','Burnt Orange':'#c85028','Tobacco':'#7a5028','Brown':'#6f4a2d','Saddle Brown':'#8b6834','Cognac':'#9a5a28','Chocolate':'#5c2c10','Espresso':'#3c2010','Fawn':'#c8a8a8',
  'Mint':'#a0c8a0','Sage':'#88a880','Teal':'#287070','Olive':'#606838','Olive Drab':'#4a5828','Hunter':'#305838','Forest':'#1c4028','Bottle Green':'#1a3828','Emerald':'#40a860','Jade':'#48a078','Turquoise':'#388888','Moss':'#6b7f4a',
  'Sky Blue':'#a0c4d8','Powder Blue':'#b0c8e0','Chambray':'#7898b8','Mid Blue':'#5a90b8','Steel Blue':'#587890','Denim':'#486888','Cerulean':'#4880c0','Blue':'#3464a8','Cobalt':'#2860a0','Royal Blue':'#2a50b0','French Blue':'#4070b8','Navy':'#1a3060','Dark Navy':'#101e40','Indigo':'#282858',
  'Cement':'#ccc8c0','Light Grey':'#b8b4ac','Silver':'#a8a8a0','Pewter':'#909088','Smoke':'#808078','Slate':'#585850','Charcoal':'#404038','Graphite':'#303028','Black':'#181818',
  'Salmon':'#d48870','Rose':'#c07878','Brick':'#8b3828','Carmine':'#a01028','Burgundy':'#6c1020','Oxblood':'#601018','Wine':'#501828','Dusty Rose':'#c09080',
  'Soft Pink':'#d4a8a0','Mauve':'#a08090','Lavender':'#9898b8','Lilac Grey':'#9890a0','Plum':'#502840',
};

let ALL_COLORS = Object.keys(C);

let FAMILIES=[
  {name:'Whites & Creams',colors:['White','Cream','Ecru','Off-White','Oatmeal','Ivory']},
  {name:'Sand & Khaki',colors:['Sand','Tan','Khaki','Camel','Biscuit','Stone','Mushroom','Taupe','Mustard','Ochre','Amber']},
  {name:'Browns',colors:['Copper','Raw Sienna','Terracotta','Rust','Burnt Orange','Tobacco','Brown','Saddle Brown','Cognac','Chocolate','Espresso','Fawn']},
  {name:'Greens',colors:['Mint','Sage','Teal','Olive','Olive Drab','Hunter','Forest','Bottle Green','Emerald','Jade','Turquoise','Moss']},
  {name:'Blues & Navies',colors:['Sky Blue','Powder Blue','Chambray','Mid Blue','Steel Blue','Denim','Cerulean','Blue','Cobalt','Royal Blue','French Blue','Navy','Dark Navy','Indigo']},
  {name:'Greys',colors:['Cement','Light Grey','Silver','Pewter','Smoke','Slate','Charcoal','Graphite','Black']},
  {name:'Reds & Burgundy',colors:['Salmon','Rose','Brick','Carmine','Burgundy','Oxblood','Wine','Dusty Rose']},
  {name:'Pinks & Mauves',colors:['Soft Pink','Mauve','Lavender','Lilac Grey','Plum']},
];

const PROFILES={
  'light-cool':{name:'Light + Cool',archetype:'Summer archetype',swatch:'#c8c0d0',note:'Cool undertones mean warm earth tones pull sallow on you. The goal is harmony within the cool register \u2014 navy, charcoal, and muted jewel tones over camel and terracotta.',
    core:['Light Grey','Slate','Charcoal','Navy','Pewter','Stone','Silver'],
    best:['Dusty Rose','Mauve','Steel Blue','Cobalt','Plum','Burgundy','Carmine','Jade','Powder Blue','Lavender','Chambray','Denim','Wine'],
    caution:['Camel','Sand','Terracotta','Rust','Amber','Mustard','Salmon','Copper','Ochre']},
  'light-warm':{name:'Light + Warm',archetype:'Spring archetype',swatch:'#e8c898',note:'Cool, icy tones will wash you out. Your range is warm and clear \u2014 enough brightness to match your light colouring without overwhelming it.',
    core:['Ivory','Cream','Sand','Camel','Smoke','Navy','Oatmeal','Biscuit'],
    best:['Salmon','Rust','Burnt Orange','Olive','Teal','Moss','Forest','Amber','Mustard','Copper','Terracotta','Cognac','Emerald'],
    caution:['White','Black','Plum','Steel Blue','Slate','Light Grey','Dusty Rose','Lavender','Indigo']},
  'light-neutral':{name:'Light + Neutral',archetype:'Neutral light',swatch:'#d8c8b8',note:'Neutral undertones give you flexibility. The risk is extremes. Stick to muted, mid-range tones and let saturation do the work.',
    core:['Stone','Smoke','Sand','Light Grey','Navy','Cream','Taupe','Oatmeal'],
    best:['Teal','Sage','Dusty Rose','Steel Blue','Camel','Jade','Olive','Mauve','Chambray','Moss','Denim'],
    caution:['Black','Salmon','Royal Blue','Burgundy','Mustard','Emerald']},
  'medium-cool':{name:'Medium + Cool',archetype:'Summer\u2013Winter blend',swatch:'#b0a0c0',note:'Medium depth with cool undertones means jewel tones hit hardest. Warm earth tones read muddy rather than rich against your colouring.',
    core:['Charcoal','Slate','Navy','Pewter','Stone','Graphite','Dark Navy'],
    best:['Steel Blue','Cobalt','Royal Blue','Burgundy','Carmine','Plum','Forest','Jade','Wine','Indigo','Cerulean','Oxblood','Emerald'],
    caution:['Camel','Terracotta','Mustard','Amber','Khaki','Sand','Ochre','Copper','Tan']},
  'medium-warm':{name:'Medium + Warm',archetype:'Autumn archetype',swatch:'#b07840',note:'Autumn colouring is among the richest in the spectrum. Earth tones are your home territory. Cool pastels and muted greys flatten your natural warmth.',
    core:['Chocolate','Saddle Brown','Olive','Camel','Khaki','Smoke','Cognac','Tobacco'],
    best:['Rust','Terracotta','Burnt Orange','Amber','Mustard','Olive Drab','Forest','Burgundy','Copper','Ochre','Moss','Hunter','Teal'],
    caution:['Dusty Rose','Mauve','Powder Blue','Slate','Stone','Light Grey','Soft Pink','Lavender','Cement','Sky Blue']},
  'medium-neutral':{name:'Medium + Neutral',archetype:'Olive neutral',swatch:'#9c8850',note:'Olive skin with neutral undertones reads warm at a distance but holds cool tones well close up. Push saturation, not lightness.',
    core:['Khaki','Smoke','Navy','Chocolate','Sand','Taupe','Denim'],
    best:['Teal','Cobalt','Burnt Orange','Hunter','Burgundy','Rust','Jade','Amber','Copper','Terracotta','Moss','Cerulean'],
    caution:['Soft Pink','Dusty Rose','Stone','Powder Blue','Cream','Sage','Lavender','Mint','Fawn']},
  'deep-cool':{name:'Deep + Cool',archetype:'Winter archetype',swatch:'#3a2848',note:'Deep cool colouring is high-contrast and high-impact. Bold, saturated colours are your territory. Low-saturation neutrals create a muddy effect.',
    core:['Black','Charcoal','Navy','White','Graphite','Dark Navy'],
    best:['Royal Blue','Cobalt','Burgundy','Carmine','Forest','Jade','Plum','Wine','Emerald','Cerulean','Indigo','Oxblood'],
    caution:['Camel','Sand','Ivory','Cream','Dusty Rose','Amber','Soft Pink','Oatmeal','Biscuit','Fawn']},
  'deep-warm':{name:'Deep + Warm',archetype:'Deep autumn',swatch:'#583420',note:'Deep warm colouring carries rich earth tones beautifully. Pale, cool tones look disconnected against your depth.',
    core:['Chocolate','Saddle Brown','Hunter','Olive','Navy','Espresso','Cognac','Tobacco'],
    best:['Burnt Orange','Terracotta','Rust','Mustard','Amber','Burgundy','Forest','Moss','Copper','Ochre','Teal','Olive Drab'],
    caution:['Soft Pink','Stone','Cream','Powder Blue','Dusty Rose','Sage','White','Cement','Lavender','Mint']},
  'deep-neutral':{name:'Deep + Neutral',archetype:'Deep neutral',swatch:'#443028',note:'Deep neutral is the most versatile in the deep range. Both warm and cool work \u2014 what matters is saturation and contrast.',
    core:['Charcoal','Black','Navy','Chocolate','Forest','Graphite','Dark Navy'],
    best:['Teal','Burgundy','Cobalt','Rust','Hunter','Burnt Orange','Carmine','Jade','Wine','Emerald','Copper','Terracotta'],
    caution:['Stone','Cream','Light Grey','Soft Pink','Sand','Cement','Oatmeal']},
};

// Depth-specific preview colours (best colours for each depth group)
const DEPTH_PREVIEWS = {
  'light': ['Navy','Dusty Rose','Sage','Chambray','Ivory'],
  'medium': ['Teal','Burgundy','Olive','Cobalt','Camel'],
  'deep': ['Emerald','Royal Blue','Rust','Forest','Black'],
};

// ── STATE ────────────────────────────────────────────────────────────────────

let selDepth=null,selDepthGroup=null,answers={vein:null,metal:null,sun:null},undertone=null,activeProfile=null,shopIndexPayload=null,shopIndexLoaded=false;

// ── v16 HERO RIBBON ─────────────────────────────────────────────────────────

function renderHeroRibbon() {
  const ribbon = document.getElementById('hero-ribbon');
  ALL_COLORS.forEach(name => {
    const bar = document.createElement('div');
    bar.className = 'hero-ribbon-bar';
    bar.style.background = C[name];
    bar.title = name;
    ribbon.appendChild(bar);
  });
}

// ── v16 HIW VISUALS ─────────────────────────────────────────────────────────

function renderHIWVisuals() {
  // Step 1: diagnosis flow -> palette result
  const v1 = document.getElementById('hiw-v1');
  const fanColors = ['Teal','Burgundy','Mustard','Forest','Slate','Cobalt'];
  v1.innerHTML = `
    <div class="hiw-visual-shell">
      <span class="hiw-visual-label">Match skin tone to palette</span>
      <div class="hiw-v1-flow">
        <div class="hiw-v1-stage">
          <div class="hiw-v1-depth">
            <div class="hiw-v1-tone-row">
              <div class="hiw-v1-skin sm" style="background:${DEPTHS[0].color}"></div>
              <div class="hiw-v1-skin md active" style="background:${DEPTHS[3].color}"></div>
              <div class="hiw-v1-skin lg" style="background:${DEPTHS[5].color}"></div>
            </div>
          </div>
        </div>
        <div class="hiw-v1-divider"></div>
        <div class="hiw-v1-output">
          <div class="hiw-v1-palette-ill">
            ${fanColors.map(name => `<div class="hiw-v1-palette-card" style="background:${C[name]}" title="${name}"></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  // Step 2: mini builder with garment slots
  const outfitVis = document.getElementById('hiw-outfit-vis');
  const slotIcons = window.TRG_CG ? window.TRG_CG.IC : {};
  const outfitSlots = [
    {slot:'shirt',color:'White'},
    {slot:'trousers',color:'Charcoal'},
    {slot:'knit',color:'Burgundy'},
    {slot:'jacket',color:'Navy'},
    {slot:'coat',color:'Camel'},
    {slot:'shoes',color:'Cognac'}
  ];
  outfitVis.innerHTML = `
    <div class="hiw-visual-shell">
      <span class="hiw-visual-label">Assign colour to garment slots</span>
      <div class="hiw-builder-mini">
        ${outfitSlots.map(({slot,color},idx)=>`
          <div class="hiw-slot-card${idx===0?' active':''}">
            <div class="hiw-slot-icon">${slotIcons[slot]}</div>
            <span class="hiw-slot-name">${slot}</span>
            <div class="hiw-slot-swatch" style="background:${C[color]}"></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Step 3: sorted mini colour field
  const gridVis = document.getElementById('hiw-grid-vis');
  gridVis.innerHTML = '';
  const gridShell = document.createElement('div');
  gridShell.className = 'hiw-visual-shell';
  const gridLabel = document.createElement('span');
  gridLabel.className = 'hiw-visual-label';
  gridLabel.textContent = 'Browse full colour field';
  gridShell.appendChild(gridLabel);
  const gridEl = document.createElement('div');
  gridEl.className = 'hiw-mini-grid';
  const sortedPreviewProfile = PROFILES['medium-warm'];
  const grouped = [
    ...sortedPreviewProfile.core.slice(0, 6),
    ...sortedPreviewProfile.best.slice(0, 16),
    ...sortedPreviewProfile.caution.slice(0, 8),
    ...ALL_COLORS.filter(name => !sortedPreviewProfile.core.includes(name) && !sortedPreviewProfile.best.includes(name) && !sortedPreviewProfile.caution.includes(name)).slice(0, 18)
  ].slice(0, 48);
  grouped.forEach(name => {
    const cell = document.createElement('div');
    cell.className = 'hiw-mini-cell';
    cell.style.background = C[name];
    gridEl.appendChild(cell);
  });
  gridShell.appendChild(gridEl);
  gridVis.appendChild(gridShell);
}

// ── v16 PALETTE TEASER ──────────────────────────────────────────────────────

function renderPaletteTeaser() {
  const el = document.getElementById('palette-teaser-swatches');
  const teaserColors = ['Navy','Dusty Rose','Sage','Cobalt','Burgundy','Olive','Camel','Charcoal'];
  teaserColors.forEach(name => {
    const s = document.createElement('div');
    s.className = 'palette-teaser-swatch';
    s.style.background = C[name];
    s.title = name;
    el.appendChild(s);
  });
}

function initHIWCards() {
  document.querySelectorAll('.hiw-card[data-target]').forEach(card => {
    const go = () => {
      const target = document.getElementById(card.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    card.addEventListener('click', go);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        go();
      }
    });
  });
}

// ── RENDER ───────────────────────────────────────────────────────────────────

function renderDepths(){
  const grid=document.getElementById('depth-grid');
  grid.innerHTML=DEPTHS.map(d=>{
    const previewColors = DEPTH_PREVIEWS[d.group] || [];
    const previewHtml = previewColors.map(name =>
      `<div class="depth-preview-dot" style="background:${C[name]||'#ccc'}"></div>`
    ).join('');
    return `<div class="depth-tile" data-id="${d.id}" data-group="${d.group}" style="--depth-bg:${d.color}">
      <div class="depth-tile-check"></div>
      <div class="depth-circle" style="background:${d.color}"></div>
      <div class="depth-tile-name">${d.name}</div>
      <div class="depth-tile-desc">${d.desc}</div>
      <div class="depth-preview">${previewHtml}</div>
    </div>`;
  }).join('');

  // Apply subtle warm tint matching each skin tone
  grid.querySelectorAll('.depth-tile').forEach(t => {
    const bgColor = DEPTHS.find(d=>d.id===t.dataset.id)?.color || '#ccc';
    t.style.background = `linear-gradient(to bottom, ${bgColor}0a, var(--card) 45%)`;
  });

  grid.querySelectorAll('.depth-tile').forEach(t=>{t.addEventListener('click',()=>{grid.querySelectorAll('.depth-tile').forEach(x=>x.classList.remove('sel'));t.classList.add('sel');selDepth=t.dataset.id;selDepthGroup=t.dataset.group;document.getElementById('step1-next').classList.add('on');});});
}

function renderFamilies(){
  document.getElementById('guide-wrap').innerHTML=FAMILIES.map(fam=>`<div class="family"><div class="family-head"><h2 class="family-name">${fam.name}</h2><span class="family-count">${fam.colors.length} colours</span></div><div class="family-chips">${fam.colors.map(name=>`<div class="g-chip" data-name="${name}"><div class="g-chip-sq" style="background:${C[name]||'#ccc'}"><div class="g-chip-badge"></div></div><span class="g-chip-name">${name}</span></div>`).join('')}</div></div>`).join('');
}

function rChips(names){return names.map(n=>{const hex=C[n];if(!hex)return '';return `<div class="r-chip"><div class="r-chip-sq" style="background:${hex}"></div><span class="r-chip-name">${n}</span></div>`;}).join('');}
function stripArchetypeLabel(label){return (label||'').replace(/\s*archetype$/i,'');}
function profileDeck(profile){
  const [depthRaw,undertoneRaw]=profile.name.split('+').map(part=>part.trim().toLowerCase());
  const depthMap={light:'lighter colouring',medium:'mid-depth colouring',deep:'deeper colouring'};
  const toneMap={cool:'cooler undertones',warm:'warmer undertones',neutral:'balanced undertones'};
  return `You sit in the ${depthMap[depthRaw]||depthRaw} with ${toneMap[undertoneRaw]||undertoneRaw}. The best colours stay in that register rather than fighting it.`;
}

function renderResult(){
  const key=`${selDepthGroup}-${undertone}`;const p=PROFILES[key];if(!p)return;
  activeProfile=p;
  const preview=[...(p.core||[]).slice(0,3),...(p.best||[]).slice(0,5)];
  const archetype=stripArchetypeLabel(p.archetype);
  document.getElementById('result-wrap').innerHTML=`
    <div class="result-shell">
      <div class="result-hero">
        <div class="result-main">
          <div class="result-brow">
            <div class="result-swatch" style="background:${p.swatch}"></div>
            <p class="result-eyebrow">Your colour profile</p>
          </div>
          <div class="result-tech">${p.name}</div>
          <h2 class="result-name">${archetype}</h2>
          <p class="result-sub">${profileDeck(p)}</p>
          <div class="result-acts">
            <button class="btn-ghost" id="btn-scroll-grid">See rated colours &#8595;</button>
            <button class="btn-ghost" id="btn-save-palette">Save my palette</button>
            <button class="btn-ghost-sm" onclick="window._cgResetAll()">Reset</button>
          </div>
        </div>
        <div class="result-side">
          <div class="result-preview">${preview.map(name=>`<div class="result-preview-chip" style="background:${C[name]||'#ccc'}" title="${name}"></div>`).join('')}</div>
          <p class="result-preview-note">Your strongest starting colours</p>
        </div>
      </div>
      <div class="result-note">${p.note}</div>
      <div class="result-body">
        <div class="result-grid">
          <div class="result-sec core-sec">
            <div class="result-sec-head">
              <span class="result-sec-lbl">Core neutrals</span>
              <span class="result-sec-count">${p.core.length} colours</span>
            </div>
            <p class="result-sec-desc">The dependable foundation: the shades you can lean on for shirts, trousers, outerwear, and daily rotation.</p>
            <div class="chip-row">${rChips(p.core)}</div>
          </div>
          <div class="result-sec best-sec">
            <div class="result-sec-head">
              <span class="result-sec-lbl">Best colours</span>
              <span class="result-sec-count">${p.best.length} colours</span>
            </div>
            <p class="result-sec-desc">The colours that bring your complexion to life. Reach for these first in knitwear, jackets, and anywhere you want intent.</p>
            <div class="chip-row">${rChips(p.best)}</div>
          </div>
          <div class="result-sec caution-sec">
            <div class="result-sec-head">
              <span class="result-sec-lbl">Approach with care</span>
              <span class="result-sec-count">${p.caution.length} colours</span>
            </div>
            <p class="result-sec-desc">Not forbidden, just less natural. If you use them, wear them in smaller doses or further from the face.</p>
            <div class="chip-row">${rChips(p.caution)}</div>
          </div>
        </div>
      </div>
    </div>`;
  document.getElementById('btn-scroll-grid')?.addEventListener('click',scrollToGrid);
  // Save palette button
  var saveBtn = document.getElementById('btn-save-palette');
  if (saveBtn) {
    var savedKey = localStorage.getItem('trg_colour_profile');
    if (savedKey === key) {
      saveBtn.classList.add('saved');
      saveBtn.innerHTML = '&#10003; Palette saved';
    }
    saveBtn.addEventListener('click', function() {
      localStorage.setItem('trg_colour_profile', key);
      saveBtn.classList.add('saved');
      saveBtn.innerHTML = '&#10003; Palette saved';
    });
  }
  applyMatchIndicators(p);
}

// ── MATCH INDICATORS ─────────────────────────────────────────────────────────

function applyMatchIndicators(profile){
  renderSortedGrid(profile);
  renderOBFamilies();
  updateOBProfileLink();
  const activeSlot = document.querySelector('.ob-slot.on');
  if (activeSlot) renderOBSuggestions(activeSlot.dataset.slot);
  const bar=document.getElementById('profile-bar');
  const matchCount=(profile.core||[]).length+(profile.best||[]).length;
  const cautionCount=(profile.caution||[]).length;
  document.getElementById('pb-swatch').style.background=profile.swatch;
  document.getElementById('pb-name').textContent=stripArchetypeLabel(profile.archetype);
  document.getElementById('pb-summary').textContent=`${matchCount} colours in your palette, ${cautionCount} to handle carefully.`;
  const previewColors=[...(profile.core||[]).slice(0,3),...(profile.best||[]).slice(0,3)];
  document.getElementById('pb-dots').innerHTML=previewColors.map(n=>`<div class="pb-dot" style="background:${C[n]||'#ccc'}" title="${n}"></div>`).join('');
  bar.classList.add('show');
}

function clearMatchIndicators(){
  renderFamilies();
  document.getElementById('profile-bar').classList.remove('show');
  document.getElementById('pb-name').textContent='';
  document.getElementById('pb-summary').textContent='';
  document.getElementById('pb-dots').innerHTML='';
  activeProfile=null;
  renderOBFamilies();
  updateOBProfileLink();
  document.getElementById('ob-suggest').classList.remove('show');
}

// ── TALLY ────────────────────────────────────────────────────────────────────

function updateTally(){
  const counts={cool:0,neutral:0,warm:0};
  Object.values(answers).forEach(a=>{if(a)counts[a]++;});
  const answered=Object.values(answers).filter(Boolean).length;
  const max=Math.max(...Object.values(counts));
  ['cool','neutral','warm'].forEach(k=>{const el=document.getElementById('tally-'+k);el.textContent=counts[k];el.className='ut-tally-count'+(counts[k]>0?' live':'')+(counts[k]===max&&max>0?' lead':'');});
  const status=document.getElementById('ut-status');
  const nextBtn=document.getElementById('step2-next');
  if(answered<3){status.innerHTML=`Answer the remaining ${3-answered} test${3-answered>1?'s':''} and the dominant undertone will appear here.`;nextBtn.classList.remove('on');undertone=null;return;}
  if(counts.cool>=2)undertone='cool';else if(counts.warm>=2)undertone='warm';else undertone='neutral';
  const labels={cool:'Cool',warm:'Warm',neutral:'Neutral'};
  status.innerHTML=`Most signals point to <strong>${labels[undertone]}</strong> undertones <span class="ut-tag ${undertone}">${labels[undertone]}</span>`;
  nextBtn.classList.add('on');
}

// ── NAV ──────────────────────────────────────────────────────────────────────

function goStep(n) {
  document.querySelectorAll('.step-section').forEach((s, i) => s.classList.toggle('active', i + 1 === n));
  document.querySelectorAll('.step-item').forEach((item, i) => {
    const sn = i + 1;
    item.className = 'step-item' + (sn === n ? ' active' : sn < n ? ' done' : '');
  });

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
  document.getElementById('ut-status').innerHTML='Answer the remaining 3 tests and the dominant undertone will appear here.';
  document.getElementById('step2-next').classList.remove('on');
  clearMatchIndicators();
  document.getElementById('step1-summary').classList.remove('show');
  document.getElementById('step2-summary').classList.remove('show');
  goStep(1);
}

// ── SORTED GRID ──────────────────────────────────────────────────────────────

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
    `<div class="sorted-chip"><div class="sorted-chip-sq" style="background:${C[n]||'#ccc'}"></div><span class="sorted-chip-name">${n}</span></div>`
  ).join('');

  document.getElementById('guide-wrap').innerHTML = `
    <div class="sorted-section match-sec">
      <div class="sorted-head">
        <div>
          <span class="sorted-label match-label">In your palette</span>
          <p class="sorted-note">These are the colours to reach for first. Safest near the face, easiest to build around, and most naturally flattering.</p>
        </div>
        <span class="sorted-count">${matchColors.length} colours</span>
      </div>
      <div class="sorted-chips">${chipHtml(matchColors)}</div>
    </div>
    <div class="sorted-section caution-sec">
      <div class="sorted-head">
        <div>
          <span class="sorted-label caution-label">Approach with care</span>
          <p class="sorted-note">Not wrong, just less instinctive. Better in smaller doses, as accents, or further from the face.</p>
        </div>
        <span class="sorted-count">${cautionColors.length} colours</span>
      </div>
      <div class="sorted-chips">${chipHtml(cautionColors)}</div>
    </div>
    <div class="sorted-section other-sec">
      <div class="sorted-head">
        <div>
          <span class="sorted-label other-label">Other colours</span>
          <p class="sorted-note">The rest of the field. Useful as reference, edge cases, and future additions once the core palette is doing its job.</p>
        </div>
        <span class="sorted-count">${otherColors.length} colours</span>
      </div>
      <div class="sorted-chips">${chipHtml(otherColors)}</div>
    </div>
  `;
}

// ── EVENTS ───────────────────────────────────────────────────────────────────

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

document.querySelectorAll('.quiz-opt').forEach(opt=>{opt.addEventListener('click',()=>{const q=opt.dataset.q;document.querySelectorAll(`.quiz-opt[data-q="${q}"]`).forEach(o=>o.classList.remove('sel'));opt.classList.add('sel');answers[q]=opt.dataset.signal;updateTally();});});

// ── PRESETS ───────────────────────────────────────────────────────────────────

const SLOT_ORDER = window.TRG_CG ? window.TRG_CG.SLOT_ORDER : ['shirt','trousers','knitwear','jacket','coat','shoes'];
const SLOT_SHORT = window.TRG_CG ? window.TRG_CG.SLOT_SHORT : {shirt:'Shirt',trousers:'Trousers',knitwear:'Knit',jacket:'Jacket',coat:'Coat',shoes:'Shoes'};
const GUIDE_CONTEXT_ALIASES={
  'brown':'Brown',
  'off white':'Off-White',
  'off-white':'Off-White',
  'dark navy':'Dark Navy',
  'heather grey':'Silver',
  'stone grey':'Pewter'
};
const SHOP_SLOT_META={
  shirt:{label:'Shirts',singular:'shirt',handle:'shirts',note:'Start near the face'},
  trousers:{label:'Trousers',singular:'trousers',handle:'trousers',note:'Build the base first'},
  knitwear:{label:'Knitwear',singular:'knitwear',handle:'knitwear',note:'Add colour and texture'},
  jacket:{label:'Jackets',singular:'jacket',handle:'jackets',note:'Choose the anchor piece'},
  coat:{label:'Outerwear',singular:'coat',handle:'outerwear',note:'Work from the outer layer'},
  shoes:{label:'Footwear',singular:'shoes',handle:'footwear',note:'Finish with leather and darks'}
};
const DEFAULT_SHOP_SLOTS=['shirt','trousers','jacket'];
const GUIDE_INTENT_STORAGE_KEY='trg_colour_intent';

const PRESETS = [
  { name:'The Business Classic', desc:'Navy tailoring, white shirting, cognac leather. Boardroom-safe without feeling corporate.', slots:{shirt:'White',trousers:'Charcoal',knitwear:'Powder Blue',jacket:'Navy',coat:'Camel',shoes:'Cognac'} },
  { name:'The Weekend', desc:'Olive outerwear, cream base, rust knitwear, and denim underneath.', slots:{shirt:'Cream',trousers:'Denim',knitwear:'Rust',jacket:'Olive',coat:'Stone',shoes:'Saddle Brown'} },
  { name:'The Italianate', desc:'Cream, tan, burgundy, and warm leather. Easy confidence with a little flourish.', slots:{shirt:'Cream',trousers:'Tan',knitwear:'Burgundy',jacket:'Camel',coat:'Chocolate',shoes:'Cognac'} },
  { name:'Tonal Grey', desc:'A study in restraint: grey layered on grey, sharpened with black.', slots:{shirt:'Light Grey',trousers:'Pewter',knitwear:'Smoke',jacket:'Charcoal',coat:'Graphite',shoes:'Black'} },
  { name:'Country Walk', desc:'Forest, mustard, stone, and dark brown leather. Rural, grounded, properly autumnal.', slots:{shirt:'Oatmeal',trousers:'Stone',knitwear:'Mustard',jacket:'Forest',coat:'Olive',shoes:'Espresso'} },
  { name:'The Riviera', desc:'Airy blues, sun-washed neutrals, and tan leather. Summer without resort cliche.', slots:{shirt:'White',trousers:'Stone',knitwear:'Chambray',jacket:'Sky Blue',coat:'Sand',shoes:'Tan'} },
  { name:'Nordic Minimal', desc:'Black, graphite, and cold greys. Severe, clean, and intentionally quiet.', slots:{shirt:'Cement',trousers:'Charcoal',knitwear:'Light Grey',jacket:'Graphite',coat:'Black',shoes:'Black'} },
  { name:'Rust Belt', desc:'Workwear warmth: tobacco, rust, indigo, and heavy brown leather.', slots:{shirt:'Ecru',trousers:'Denim',knitwear:'Tobacco',jacket:'Rust',coat:'Chocolate',shoes:'Espresso'} },
  { name:'The Academic', desc:'Navy tailoring, burgundy knitwear, and oxblood shoes. Ivy done with more depth.', slots:{shirt:'Cream',trousers:'Pewter',knitwear:'Burgundy',jacket:'Navy',coat:'Charcoal',shoes:'Oxblood'} },
  { name:'Desert Palette', desc:'Sand, terracotta, olive, and camel layered end to end.', slots:{shirt:'Ivory',trousers:'Sand',knitwear:'Terracotta',jacket:'Olive',coat:'Camel',shoes:'Saddle Brown'} },
];

function findCanonicalGuideColour(raw){
  const key=(raw||'').trim().toLowerCase();
  if(!key)return '';
  if(GUIDE_CONTEXT_ALIASES[key])return GUIDE_CONTEXT_ALIASES[key];
  return Object.keys(C).find(name=>name.toLowerCase()===key) || '';
}

function escapeGuideHtml(value){
  return String(value===null||value===undefined?'':value)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function getGuideShopIndexBucket(slotName,colorName){
  if(!shopIndexPayload||!shopIndexPayload.index||!slotName||!colorName)return [];
  const bucket=shopIndexPayload.index[slotName] && shopIndexPayload.index[slotName][colorName];
  return Array.isArray(bucket)?bucket:[];
}

function getGuideProductRecommendations(filledSlots,limit){
  if(!filledSlots.length||!shopIndexPayload)return [];
  const cap=Math.max(1,limit||4);
  const cards=[];
  const seen=new Set();

  filledSlots.forEach((slotState,index)=>{
    if(cards.length>=cap)return;
    const bucket=getGuideShopIndexBucket(slotState.slot,slotState.color);
    const perBucket=index===0?2:1;
    bucket.slice(0,perBucket).forEach(entry=>{
      const key=[entry.handle||entry.shopify_product_id||entry.title,entry.url].join('::');
      if(seen.has(key)||cards.length>=cap)return;
      seen.add(key);
      cards.push({
        slot:slotState.slot,
        color:slotState.color,
        meta:slotState.meta,
        entry:entry
      });
    });
  });

  if(cards.length>=cap)return cards;

  filledSlots.forEach(slotState=>{
    if(cards.length>=cap)return;
    const bucket=getGuideShopIndexBucket(slotState.slot,slotState.color);
    bucket.forEach(entry=>{
      const key=[entry.handle||entry.shopify_product_id||entry.title,entry.url].join('::');
      if(seen.has(key)||cards.length>=cap)return;
      seen.add(key);
      cards.push({
        slot:slotState.slot,
        color:slotState.color,
        meta:slotState.meta,
        entry:entry
      });
    });
  });

  return cards;
}

function persistGuideIntentState(){
  const filledSlots=getFilledGuideSlots().map(slotState=>({
    slot:slotState.slot,
    color:slotState.color,
    handle:slotState.meta.handle,
    label:slotState.meta.label,
    singular:slotState.meta.singular,
    hex:slotState.hex
  }));

  try{
    if(!filledSlots.length&&!activeProfile){
      localStorage.removeItem(GUIDE_INTENT_STORAGE_KEY);
      return;
    }

    const payload={
      source:'colour-guide',
      updatedAt:new Date().toISOString(),
      profile_key:activeProfile&&selDepthGroup&&undertone?`${selDepthGroup}-${undertone}`:'',
      profile_name:activeProfile?activeProfile.name:'',
      profile_archetype:activeProfile?stripArchetypeLabel(activeProfile.archetype):'',
      profile_swatch:activeProfile?activeProfile.swatch:'',
      anchor:filledSlots[0]||null,
      slots:filledSlots
    };

    localStorage.setItem(GUIDE_INTENT_STORAGE_KEY,JSON.stringify(payload));
  }catch(err){
    /* storage can fail in private mode */
  }
}

function applyGuideContextFromUrl(){
  let params;
  try{
    params=new URLSearchParams(window.location.search);
  }catch(err){
    return false;
  }

  const source=(params.get('source')||'').toLowerCase();
  const garment=params.get('base_garment')||'';
  const safeGarment=SLOT_ORDER.includes(garment)?garment:'';
  const colour=findCanonicalGuideColour(params.get('base_colour'));
  if(!safeGarment&&!colour)return false;

  document.querySelectorAll('.preset-card').forEach(card=>card.classList.remove('sel'));
  document.querySelectorAll('.ob-slot').forEach(clearSlot);

  let activeSlot=document.querySelector(`.ob-slot[data-slot="${safeGarment||'shirt'}"]`) || document.querySelector('.ob-slot');
  if(safeGarment&&colour){
    const anchorSlot=document.querySelector(`.ob-slot[data-slot="${safeGarment}"]`);
    if(anchorSlot){
      setSlotColor(anchorSlot, colour);
      activeSlot=[...document.querySelectorAll('.ob-slot')].find(slot=>!slot.classList.contains('filled')) || anchorSlot;
    }
  }

  setActiveSlot(activeSlot);
  updateGauge();

  if(source==='pdp'&&safeGarment&&colour){
    document.getElementById('ob-pl-text').innerHTML=`<strong>${colour} ${SLOT_SHORT[safeGarment].toLowerCase()}</strong> loaded from a PDP. Keep building here or take the finder for profile-led picks.`;
    document.getElementById('ob-pl-cta').textContent='Take the finder →';
  }

  renderGuideShopRail();

  return true;
}

function renderPresets() {
  document.getElementById('presets-row').innerHTML = PRESETS.map((p, i) => `
    <div class="preset-card" data-preset="${i}" role="button" tabindex="0">
      <div class="preset-strips">${SLOT_ORDER.map(slot => `<div class="preset-strip" style="background:${C[p.slots[slot]]||'#ccc'}"></div>`).join('')}</div>
      <div class="preset-meta">${SLOT_ORDER.map(slot => `<span class="preset-slot">${SLOT_SHORT[slot]}</span>`).join('')}</div>
      <p class="preset-name">${p.name}</p>
      <p class="preset-desc">${p.desc}</p>
      <p class="preset-cta">Load this outfit &rarr;</p>
    </div>
  `).join('');

  document.querySelectorAll('.preset-card').forEach(card => {
    const load=()=>loadPreset(Number(card.dataset.preset));
    card.addEventListener('click', load);
    card.addEventListener('keydown', e => {
      if(e.key==='Enter' || e.key===' '){
        e.preventDefault();
        load();
      }
    });
  });
}

// ── SLOT SUGGESTIONS ─────────────────────────────────────────────────────────

const SLOT_RECS = window.TRG_CG ? window.TRG_CG.SLOT_RECS : {};

function renderOBSuggestions(slotName) {
  const suggestEl = document.getElementById('ob-suggest');
  if (!activeProfile || !slotName) { suggestEl.classList.remove('show'); return; }
  const rec = SLOT_RECS[slotName];
  if (!rec) { suggestEl.classList.remove('show'); return; }
  const paletteSet = new Set([...(activeProfile.core || []), ...(activeProfile.best || [])]);
  const cautionSet = new Set(activeProfile.caution || []);
  const paletteMatches = rec.pool.filter(c => paletteSet.has(c));
  const neutrals = rec.pool.filter(c => !paletteSet.has(c) && !cautionSet.has(c));
  const suggestions = [...paletteMatches, ...neutrals].slice(0, 8);
  if (suggestions.length === 0) { suggestEl.classList.remove('show'); return; }
  document.getElementById('ob-suggest-hint').textContent = rec.hint;
  document.getElementById('ob-suggest-chips').innerHTML = suggestions.map(name =>
    `<div class="ob-sc" data-color="${name}" role="button" tabindex="0"><div class="ob-sc-sq" style="background:${C[name]||'#ccc'}"></div><span class="ob-sc-name">${name}</span></div>`
  ).join('');
  suggestEl.classList.add('show');
  document.querySelectorAll('.ob-sc').forEach(sc => {
    const choose=() => {
      const activeSlot = document.querySelector('.ob-slot.on');
      if (!activeSlot) return;
      assignColourToSlot(activeSlot, sc.dataset.color);
    };
    sc.addEventListener('click', choose);
    sc.addEventListener('keydown', e => {
      if(e.key==='Enter' || e.key===' '){
        e.preventDefault();
        choose();
      }
    });
  });
}

function getFilledGuideSlots(){
  return SLOT_ORDER.map(slotName=>{
    const slot=document.querySelector(`.ob-slot[data-slot="${slotName}"]`);
    const meta=SHOP_SLOT_META[slotName];
    if(!slot||!meta||!slot.classList.contains('filled'))return null;
    const colorName=(slot.querySelector('.ob-slot-color')?.textContent||'').trim();
    if(!colorName)return null;
    return {
      slot:slotName,
      color:colorName,
      hex:C[colorName]||'#ccc',
      meta:meta
    };
  }).filter(Boolean);
}

function filledShopCardMarkup(slotState,eyebrow){
  return `<a class="ob-shop-card" href="/collections/${slotState.meta.handle}">
    <span class="ob-shop-swatch" style="background:${slotState.hex}"></span>
    <span class="ob-shop-body">
      <span class="ob-shop-eyebrow">${eyebrow}</span>
      <span class="ob-shop-card-title">Shop ${slotState.meta.label}</span>
      <span class="ob-shop-card-note">${slotState.color} is the brief for this ${slotState.meta.singular} category.</span>
    </span>
    <span class="ob-shop-arrow" aria-hidden="true">&rarr;</span>
  </a>`;
}

function productShopCardMarkup(match,index){
  const entry=match.entry||{};
  const title=escapeGuideHtml(entry.title||`${match.color} ${match.meta.singular}`);
  const brand=escapeGuideHtml(entry.brand||'The Right Garment');
  const price=escapeGuideHtml(entry.price_display||'');
  const color=escapeGuideHtml(match.color);
  const slotLabel=escapeGuideHtml(match.meta.singular);
  const href=escapeGuideHtml(entry.url||`/collections/${match.meta.handle}`);
  const img=entry.image?`<img class="ob-shop-product-image" src="${escapeGuideHtml(entry.image)}" alt="${title}" loading="lazy">`:`<span class="ob-shop-product-fallback" style="background:${entry.colour_hex||match.hex}"></span>`;
  const eyebrow=index===0?'Best match':'Also works';
  const note=`${color} ${slotLabel}`;

  return `<a class="ob-shop-card ob-shop-card-product" href="${href}">
    <span class="ob-shop-product-media">${img}</span>
    <span class="ob-shop-body">
      <span class="ob-shop-eyebrow">${eyebrow}</span>
      <span class="ob-shop-card-title">${title}</span>
      <span class="ob-shop-card-note">${brand}${price?` · ${price}`:''}</span>
      <span class="ob-shop-card-chip">${note}</span>
    </span>
    <span class="ob-shop-arrow" aria-hidden="true">&rarr;</span>
  </a>`;
}

function browseShopCardMarkup(slotName,eyebrow){
  const meta=SHOP_SLOT_META[slotName];
  if(!meta)return '';
  return `<a class="ob-shop-card" href="/collections/${meta.handle}">
    <span class="ob-shop-swatch" style="background:linear-gradient(135deg,#f4efe7,#b8aa96)"></span>
    <span class="ob-shop-body">
      <span class="ob-shop-eyebrow">${eyebrow}</span>
      <span class="ob-shop-card-title">Browse ${meta.label}</span>
      <span class="ob-shop-card-note">${meta.note}.</span>
    </span>
    <span class="ob-shop-arrow" aria-hidden="true">&rarr;</span>
  </a>`;
}

function renderGuideShopRail(){
  const summaryEl=document.getElementById('ob-shop-summary');
  const actionsEl=document.getElementById('ob-shop-actions');
  if(!summaryEl||!actionsEl)return;

  const filledSlots=getFilledGuideSlots();
  if(!filledSlots.length){
    const loadingCopy=shopIndexLoaded?'Choose a piece to unlock exact product matches here. If a colour bucket is empty, the guide falls back to category jumps.':'Choose a piece to unlock category jumps here. Exact product matching is still loading.';
    summaryEl.innerHTML=loadingCopy;
    actionsEl.innerHTML=DEFAULT_SHOP_SLOTS.map(slotName=>browseShopCardMarkup(slotName,'Start here')).join('');
    persistGuideIntentState();
    return;
  }

  const productMatches=getGuideProductRecommendations(filledSlots,4);
  if(productMatches.length){
    const leadSlot=filledSlots[0];
    const exactCount=productMatches.length;
    const profileNote=activeProfile?` <strong>${stripArchetypeLabel(activeProfile.archetype)}</strong> is active, so the rail still favours colours that sit in your stronger register.`:'';
    summaryEl.innerHTML=`Showing <strong>${exactCount} product match${exactCount===1?'':'es'}</strong> for the colours currently in play, starting with <strong>${leadSlot.color} ${SLOT_SHORT[leadSlot.slot].toLowerCase()}</strong>.${profileNote}`;
    actionsEl.innerHTML=productMatches.map((match,index)=>productShopCardMarkup(match,index)).join('');
    persistGuideIntentState();
    return;
  }

  const leadSlot=filledSlots[0];
  const cards=filledSlots.slice(0,4).map((slotState,index)=>filledShopCardMarkup(slotState,index===0?'Anchor piece':'Current piece'));
  const usedSlots=new Set(filledSlots.map(slotState=>slotState.slot));
  DEFAULT_SHOP_SLOTS.forEach(slotName=>{
    if(cards.length>=4||usedSlots.has(slotName))return;
    cards.push(browseShopCardMarkup(slotName,'Add next'));
  });

  const loadingNote=!shopIndexLoaded?' The exact product index is still loading.':' No exact product bucket exists for this combination yet, so the guide is falling back to category jumps.';
  const profileNote=activeProfile?` <strong>${stripArchetypeLabel(activeProfile.archetype)}</strong> is active, so these jumps are biased toward your better register.`:'';
  summaryEl.innerHTML=`Start with <strong>${leadSlot.color} ${SLOT_SHORT[leadSlot.slot].toLowerCase()}</strong>, then open the matching categories.${loadingNote} Treat the selected colours as the shopping brief rather than a strict filter.${profileNote}`;
  actionsEl.innerHTML=cards.join('');
  persistGuideIntentState();
}

function syncOBSlotA11y(){
  document.querySelectorAll('.ob-slot').forEach(slot=>{
    slot.setAttribute('role','button');
    slot.setAttribute('tabindex','0');
    slot.setAttribute('aria-pressed',slot.classList.contains('on')?'true':'false');
  });
  document.querySelectorAll('.ob-slot-rm').forEach(remove=>{
    remove.setAttribute('role','button');
    remove.setAttribute('tabindex','0');
  });
}

function updateOBProfileLink() {
  const linkEl = document.getElementById('ob-profile-link');
  if (activeProfile) {
    linkEl.classList.add('active');
    document.getElementById('ob-pl-swatch').style.background = activeProfile.swatch;
    document.getElementById('ob-pl-text').innerHTML = `<strong>${stripArchetypeLabel(activeProfile.archetype)}</strong> active. Shirt, knitwear, and outerwear picks now lean toward what flatters you first.`;
    document.getElementById('ob-pl-cta').textContent = 'Change';
  } else {
    linkEl.classList.remove('active');
    document.getElementById('ob-pl-swatch').style.background = 'var(--border)';
    document.getElementById('ob-pl-text').innerHTML = 'No profile yet. The builder still works; the finder simply highlights the colours most likely to suit you.';
    document.getElementById('ob-pl-cta').textContent = 'Take the finder \u2192';
  }
  renderGuideShopRail();
}

function clearSlot(slot){
  slot.classList.remove('filled');
  slot.querySelector('.ob-slot-color').textContent = '';
  slot.querySelector('.ob-slot-dot').style.background = '';
}

function setSlotColor(slot, colorName){
  const hex = C[colorName];
  slot.classList.add('filled');
  slot.querySelector('.ob-slot-color').textContent = colorName;
  slot.querySelector('.ob-slot-dot').style.background = hex;
}

function setActiveSlot(slot){
  document.querySelectorAll('.ob-slot').forEach(s => s.classList.remove('on'));
  if (slot) {
    slot.classList.add('on');
    renderOBSuggestions(slot.dataset.slot);
  } else {
    document.getElementById('ob-suggest').classList.remove('show');
  }
  syncOBSlotA11y();
}

function assignColourToSlot(slot, colorName) {
  document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('sel'));
  setSlotColor(slot, colorName);
  const allSlots = [...document.querySelectorAll('.ob-slot')];
  const nextEmpty = allSlots.find(s => !s.classList.contains('filled'));
  setActiveSlot(nextEmpty || slot);
  updateGauge();
}

function loadPreset(index){
  const preset = PRESETS[index];
  if (!preset) return;
  document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('sel'));
  document.querySelector(`.preset-card[data-preset="${index}"]`)?.classList.add('sel');
  document.querySelectorAll('.ob-slot').forEach(clearSlot);
  SLOT_ORDER.forEach(slotName => {
    const slot = document.querySelector(`.ob-slot[data-slot="${slotName}"]`);
    const color = preset.slots[slotName];
    if (slot && color) setSlotColor(slot, color);
  });
  setActiveSlot(document.querySelector('.ob-slot[data-slot="shirt"]'));
  updateGauge();
}

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

  document.querySelectorAll('.ob-chip').forEach(chip => {
    const choose=() => {
      const activeSlot = document.querySelector('.ob-slot.on');
      if (!activeSlot) return;
      assignColourToSlot(activeSlot, chip.dataset.color);
    };
    chip.addEventListener('click', choose);
    chip.addEventListener('keydown', e => {
      if(e.key==='Enter' || e.key===' '){
        e.preventDefault();
        choose();
      }
    });
  });
}

// Slot click
document.getElementById('ob-slots').addEventListener('click', (e) => {
  const slot = e.target.closest('.ob-slot');
  if (!slot) return;
  if (e.target.closest('.ob-slot-rm') && slot.classList.contains('filled')) {
    clearSlot(slot);
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('sel'));
    setActiveSlot(slot);
    updateGauge();
    return;
  }
  document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('sel'));
  setActiveSlot(slot);
});

document.getElementById('ob-slots').addEventListener('keydown', (e) => {
  if(e.key!=='Enter' && e.key!==' ') return;
  const remove = e.target.closest('.ob-slot-rm');
  const slot = e.target.closest('.ob-slot');
  if(!slot) return;
  e.preventDefault();
  if(remove && slot.classList.contains('filled')){
    clearSlot(slot);
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('sel'));
    setActiveSlot(slot);
    updateGauge();
    return;
  }
  document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('sel'));
  setActiveSlot(slot);
});

function updateGauge() {
  const filled = document.querySelectorAll('.ob-slot.filled').length;
  const total = 6;
  const pct = Math.round((filled / total) * 100);
  const circumference = 2 * Math.PI * 26;
  const offset = circumference - (circumference * pct / 100);
  document.getElementById('ob-gauge-fill').style.strokeDashoffset = offset;
  const pctEl = document.getElementById('ob-gauge-pct');
  document.getElementById('ob-gauge-label').textContent = 'Outfit progress';
  if (filled === 0) {
    pctEl.innerHTML = 'Start<br>here';
    document.getElementById('ob-gauge-desc').textContent = 'Load a preset or start with the shirt, jacket, or coat.';
  } else if (filled < total) {
    pctEl.innerHTML = `${filled}/${total}`;
    document.getElementById('ob-gauge-desc').textContent = `${filled} of 6 pieces are set. Add another piece or swap any filled slot.`;
  } else {
    pctEl.innerHTML = '6/6';
    document.getElementById('ob-gauge-desc').textContent = 'Base outfit loaded. Refine the pieces until the mix feels right.';
  }
  renderGuideShopRail();
}

// ── INIT ─────────────────────────────────────────────────────────────────────

document.getElementById('ob-pl-cta').addEventListener('click', () => {
  document.getElementById('st-wrap').scrollIntoView({ behavior: 'smooth' });
});

renderHeroRibbon();
renderHIWVisuals();
renderPaletteTeaser();
initHIWCards();
renderDepths();
renderFamilies();
renderPresets();
renderOBFamilies();
syncOBSlotA11y();
updateOBProfileLink();
updateGauge();
applyGuideContextFromUrl();

// ── DYNAMIC COLOUR DATA ──────────────────────────────────────────────────────

(function loadColourData() {
  var dataUrl = document.querySelector('.trg-colour-guide')?.dataset.colourData;
  if (!dataUrl) return;
  fetch(dataUrl).then(function(r) { return r.json(); }).then(function(data) {
    if (!data || !data.families || !data.lookup) return;
    // Merge fetched hex values into C (FM is source of truth for hex)
    Object.keys(data.lookup).forEach(function(name) { C[name] = data.lookup[name]; });
    // Replace families with FM data
    FAMILIES = data.families.map(function(fam) {
      return { name: fam.name, colors: fam.colors.map(function(c) { return c.name; }) };
    });
    ALL_COLORS = Object.keys(C);
    // Update hero colour count
    var countEl = document.querySelector('.hero-stat-num');
    if (countEl) countEl.textContent = String(ALL_COLORS.length);
    // Re-render the grid and builder families
    if (activeProfile) { renderSortedGrid(activeProfile); } else { renderFamilies(); }
    renderOBFamilies();
    renderHeroRibbon();
    applyGuideContextFromUrl();
  }).catch(function() { /* graceful fallback to hardcoded data */ });
})();

(function loadGuideShopIndex() {
  var dataUrl = document.querySelector('.trg-colour-guide')?.dataset.shopIndex;
  if (!dataUrl) {
    shopIndexLoaded = true;
    renderGuideShopRail();
    return;
  }
  fetch(dataUrl).then(function(r) {
    if (!r.ok) throw new Error('shop index unavailable');
    return r.json();
  }).then(function(data) {
    if (!data || !data.index) throw new Error('invalid shop index payload');
    shopIndexPayload = data;
    shopIndexLoaded = true;
    renderGuideShopRail();
  }).catch(function() {
    shopIndexLoaded = true;
    renderGuideShopRail();
  });
})();

// ── STICKY NAV ───────────────────────────────────────────────────────────────

const stickyNav = document.getElementById('sticky-nav');
const hiw = document.getElementById('hiw');
const sections = [
  { id: 'st-wrap', key: 'st-wrap' },
  { id: 'builder-anchor', key: 'builder-anchor' },
  { id: 'grid-anchor', key: 'grid-anchor' },
];

function updateStickyNav() {
  if (!hiw || !stickyNav) return;
  const hiwBottom = hiw.getBoundingClientRect().bottom;
  stickyNav.classList.toggle('vis', hiwBottom < 0);
  let activeKey = sections[0].key;
  for (const s of sections) {
    const el = document.getElementById(s.id);
    if (el && el.getBoundingClientRect().top <= 80) activeKey = s.key;
  }
  stickyNav.querySelectorAll('.sticky-nav-link').forEach(link => {
    link.classList.toggle('on', link.dataset.target === activeKey);
  });
}

window.addEventListener('scroll', updateStickyNav, { passive: true });

stickyNav.querySelectorAll('.sticky-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const el = document.getElementById(link.dataset.target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.getElementById('transition-to-grid')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('grid-anchor').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
document.getElementById('transition-to-quiz')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('st-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

window._cgResetAll = resetAll;

}); // end DOMContentLoaded
