(function(){
'use strict';

// ─── Read shared data from engine ───
var E = window.TRG_CG;
if (!E) { console.warn('TRG: colour engine not loaded'); return; }
var C=E.C, sL=E.sL, dE=E.dE, sc=E.sc, near=E.near, IC=E.IC, G=E.G, GORDER=E.GORDER, FAMILIES=E.FAMILIES, SLOT_RECS=E.SLOT_RECS;

function byId(id){
  return document.getElementById(id);
}

// ─── COLOUR STORIES ───
const STORIES={
  'Navy':{t:'You already own three navy things. <em>Good. Buy a fourth.</em>',b:'The most versatile dark in menswear. Navy anchors everything from a chore coat to a suit — and in the Wada palette, it connects to more documented combinations than almost any other colour. It\'s not boring. It\'s correct.'},
  'Olive':{t:'The colour that says <em>I\'ve read a menswear forum but I\'m not weird about it.</em>',b:'Quietly confident. Olive sits between utility and sophistication — workwear roots with enough nuance to pair with tailoring. Documented alongside creams, rust tones, and deep blues.'},
  'Charcoal':{t:'Navy\'s quieter brother <em>who actually got the inheritance.</em>',b:'Less expected than black, more grounded than grey. Charcoal works as a foundation or a statement. 20 documented Wada combinations — it\'s the workhorse people overlook.'},
  'Sand':{t:'Beige <em>but with a passport.</em>',b:'Neutral without being boring. Sand bridges cream and khaki — warm enough to feel intentional, muted enough to pair with almost anything in the palette.'},
  'Rust':{t:'Autumn in textile form. <em>Pairs with everything except your ex\'s opinion.</em>',b:'The colour of well-worn leather and October light. Rust appears across 9 documented Wada combinations — every single one of them excellent.'},
  'Cream':{t:'White for people <em>who\'ve ruined enough white shirts.</em>',b:'Warmer, kinder, and more forgiving than pure white. Cream is the neutral that actually looks like you chose it on purpose.'},
  'Black':{t:'An ending. <em>Use it deliberately.</em>',b:'100+ documented combinations, but in menswear, restraint matters. Best as a grounding accent — boots, a belt, a coat. Not head to toe unless you\'re in a band.'},
  'Forest':{t:'The colour of people <em>who own cast iron.</em>',b:'Deep, serious green. Forest works as a trouser, a jacket, a coat — it\'s the alternative to navy that people who think about clothes eventually arrive at.'},
  'Camel':{t:'The coat colour <em>that makes strangers ask where you got it.</em>',b:'Camel reads expensive even when it isn\'t. In the Wada palette, it connects to 14 documented combinations — almost all of them with dark anchors like navy and charcoal.'},
  'Burgundy':{t:'Red for adults. <em>Your burgundy phase starts now.</em>',b:'Burgundy is the red that doesn\'t need to shout. It works in knitwear, in a scarf, in a sock. In the Wada palette, it pairs beautifully with navy, cream, and forest.'},
  'Stone':{t:'The colour of a building <em>that\'s been there longer than you.</em>',b:'Mid-tone neutral that reads neither warm nor cool. Stone is the go-anywhere trouser colour, the jacket that matches everything, the safe choice that doesn\'t look safe.'},
  'Denim':{t:'You know this one. <em>You\'re wearing it right now.</em>',b:'Medium blue washed to within an inch of its life. Denim is technically a blue, but it behaves like a neutral — it goes with everything because everyone already owns it.'},
  'Sage':{t:'Olive went to therapy <em>and came back lighter.</em>',b:'The softer, more approachable green. Sage works in spring and summer where olive would feel too heavy. Documented alongside creams, blues, and warm browns.'},
  'Tobacco':{t:'Brown but make it <em>interesting.</em>',b:'Tobacco has the depth of chocolate without the seriousness. It\'s the colour of a jacket you\'d actually reach for, not one that stays on the hanger.'},
  'Indigo':{t:'Navy at night. <em>Darker than you think.</em>',b:'The colour between navy and black that most people can\'t name but instinctively reach for. Indigo works in denim, in knitwear, in a blazer that reads formal without trying.'},
};

// ═══════════════════════════════════════
// OUTFIT BUILDER (v21-aligned)
// ═══════════════════════════════════════
let ob={slots:{},activeSlot:null,history:[],lockedSlot:null};
let obBase={garment:null,colour:null,name:''};

function normalizeGarment(slot){
  if(!slot)return null;
  return G.some(g=>g.id===slot)?slot:null;
}

function garmentLabel(slot){
  const garment=G.find(g=>g.id===slot);
  return garment?garment.l.toLowerCase():'piece';
}

function buildGuideUrl(colourName,garment){
  const params=['source=pdp'];
  if(colourName)params.push('base_colour='+encodeURIComponent(colourName));
  const safeGarment=normalizeGarment(garment);
  if(safeGarment)params.push('base_garment='+encodeURIComponent(safeGarment));
  return '/pages/colour-guide?'+params.join('&');
}

function buildCollectionSearchUrl(garmentId,colourName){
  const garment=G.find(g=>g.id===garmentId);
  if(!garment)return '/search?options%5Bprefix%5D=last&type=product';
  const params=['options%5Bprefix%5D=last'];
  if(colourName)params.unshift('q='+encodeURIComponent(colourName));
  return '/collections/'+garment.co+'?'+params.join('&');
}

function obSyncA11y(){
  document.querySelectorAll('.ob-slot').forEach(function(slot){
    slot.setAttribute('role','button');
    slot.setAttribute('tabindex',slot.classList.contains('locked')?'-1':'0');
    slot.setAttribute('aria-pressed',slot.classList.contains('on')?'true':'false');
  });
  document.querySelectorAll('.ob-slot-rm').forEach(function(remove){
    remove.setAttribute('role','button');
    remove.setAttribute('tabindex','0');
  });
}

function syncGuideLinks(colourName,garment){
  const guideUrl=buildGuideUrl(colourName,garment);
  document.querySelectorAll('.pdp-guide-link, .pdp-guide-footnote a').forEach(function(link){
    link.setAttribute('href',guideUrl);
  });
  return guideUrl;
}

function readBuilderContext(overrideName){
  const el=document.getElementById('cg-outfit-builder');
  const container=el?el.closest('[data-colour]'):null;
  const hiddenName=document.getElementById('ctl-colour-name');
  const name=typeof overrideName==='string'
    ? overrideName
    : (container&&container.getAttribute('data-colour')) || (hiddenName&&hiddenName.textContent) || '';
  const garment=normalizeGarment(container&&container.getAttribute('data-garment'));
  return {name:(name||'').trim(),garment:garment};
}

function obDetectBaseColour(name){
  const lo=(name||'').toLowerCase().trim();
  if(!lo)return null;
  const aliases={
    'indigo heather':'Indigo','heather grey':'Silver',
    'off white':'Off-White','off-white':'Off-White',
    'dark navy':'Dark Navy','rust brown':'Rust','beige':'Biscuit',
    'forest':'Forest','stone grey':'Pewter','sand':'Sand'
  };
  const exact=C.find(c=>c.n.toLowerCase()===lo);
  if(exact)return exact;
  if(aliases[lo])return C.find(c=>c.n===aliases[lo]);
  const contained=C.find(c=>lo.includes(c.n.toLowerCase()));
  if(contained)return contained;
  if(lo.includes('indigo'))return C.find(c=>c.n==='Indigo');
  if(lo.includes('navy'))return C.find(c=>c.n==='Navy');
  if(lo.includes('ecru'))return C.find(c=>c.n==='Ecru');
  if(lo.includes('cream'))return C.find(c=>c.n==='Cream');
  return null;
}

const SLOT_PRIORITY={
  jacket:['trousers','shirt','knitwear','coat','shoes'],
  coat:['trousers','shirt','knitwear','jacket','shoes'],
  shirt:['trousers','jacket','knitwear','coat','shoes'],
  knitwear:['trousers','jacket','shirt','coat','shoes'],
  trousers:['shirt','jacket','knitwear','coat','shoes'],
  shoes:['trousers','shirt','knitwear','jacket','coat']
};

const FAMILY_NOTES={
  'Whites & Creams':'Keeps the outfit light and lets the base colour stay in front.',
  'Sand & Khaki':'Builds a quieter tonal route without flattening the outfit.',
  'Browns':'Best in leather, knitwear, or a heavier outer layer once the base is set.',
  'Greens':'Useful as a secondary note after the main line already feels stable.',
  'Blues':'The easiest way to ground most menswear colours without overthinking it.',
  'Greys':'Cleans up the palette and keeps the contrast measured.',
  'Reds & Burgundy':'Works better as a smaller note than a first move.',
  'Mauves':'Best used late and in small doses.'
};

function obSlotIds(){
  return G.map(function(garment){ return garment.id; });
}

function obSlotOrder(){
  const preferred=(SLOT_PRIORITY[ob.lockedSlot]||obSlotIds()).filter(function(id){
    return id!==ob.lockedSlot;
  });
  const fallback=obSlotIds().filter(function(id){
    return id!==ob.lockedSlot&&preferred.indexOf(id)===-1;
  });
  return (ob.lockedSlot?[ob.lockedSlot]:[]).concat(preferred,fallback);
}

function obRenderableSlots(){
  return obSlotOrder().map(function(id){
    return G.find(function(garment){ return garment.id===id; });
  }).filter(Boolean);
}

function obNextOpen(){
  return obRenderableSlots().find(function(garment){
    return garment.id!==ob.lockedSlot&&!ob.slots[garment.id];
  })||null;
}

function activateGuidePanel(panelId){
  const tabs=Array.prototype.slice.call(document.querySelectorAll('.guide-tab[data-guide-panel]'));
  const panels=Array.prototype.slice.call(document.querySelectorAll('.guide-panel[data-guide-panel-id]'));
  tabs.forEach(function(tab){
    const isActive=tab.getAttribute('data-guide-panel')===panelId;
    tab.classList.toggle('active',isActive);
    tab.setAttribute('aria-selected',isActive?'true':'false');
  });
  panels.forEach(function(panel){
    const isActive=panel.getAttribute('data-guide-panel-id')===panelId;
    panel.classList.toggle('active',isActive);
    panel.hidden=!isActive;
  });
}

function bindGuideTabs(){
  document.querySelectorAll('.guide-tab[data-guide-panel]').forEach(function(tab){
    if(tab.dataset.bound==='true')return;
    tab.dataset.bound='true';
    tab.addEventListener('click',function(){
      activateGuidePanel(tab.getAttribute('data-guide-panel'));
    });
  });
}

function pairingTierLabel(score){
  return score.tier==='perfect'?'Strong match':'Good match';
}

function pairingNote(baseColour,candidate){
  const familyNote=FAMILY_NOTES[candidate.g]||'Works best once the main line already feels stable.';
  return candidate.n+' with '+baseColour.n.toLowerCase()+' '+familyNote.charAt(0).toLowerCase()+familyNote.slice(1);
}

function guidePairingsFor(baseColour){
  if(!baseColour)return[];
  const ranked=C.filter(function(colour){
    return colour.n!==baseColour.n;
  }).map(function(colour){
    return{colour:colour,score:sc(baseColour,colour)};
  }).filter(function(entry){
    return entry.score.tier!=='care';
  }).sort(function(a,b){
    const tierA=a.score.tier==='perfect'?2:1;
    const tierB=b.score.tier==='perfect'?2:1;
    if(tierB!==tierA)return tierB-tierA;
    return b.score.pct-a.score.pct;
  });
  const picks=[];
  const usedFamilies=Object.create(null);
  ranked.forEach(function(entry){
    if(picks.length>=6)return;
    if(usedFamilies[entry.colour.g])return;
    picks.push(entry);
    usedFamilies[entry.colour.g]=true;
  });
  ranked.forEach(function(entry){
    if(picks.length>=6)return;
    if(picks.some(function(pick){ return pick.colour.n===entry.colour.n; }))return;
    picks.push(entry);
  });
  return picks.slice(0,6);
}

function buildUsageCards(baseColour,pairings){
  const nextSlot=obNextOpen();
  const nextLabel=nextSlot?garmentLabel(nextSlot.id):'next piece';
  const firstPair=pairings[0];
  const firstPairText=firstPair?firstPair.colour.n+' is the easiest anchor.':'Start with a grounding neutral.';
  return[
    {label:'Start here',copy:'If you want the cleanest route, set the '+nextLabel+' first. '+firstPairText},
    {label:'Keep it quiet',copy:'Once the base is set, keep the middle of the outfit calmer than '+baseColour.n.toLowerCase()+' rather than adding another loud colour.'},
    {label:'Use accents late',copy:'Greens, burgundy, and brighter blues work best after the main line already feels stable.'}
  ];
}

function renderGuidePanels(){
  const pairingsGrid=byId('pdp-guide-pairings-grid');
  const usageGrid=byId('pdp-guide-usage-grid');
  if(!pairingsGrid||!usageGrid)return;
  if(!obBase.colour){
    pairingsGrid.innerHTML='<div class="guide-empty">We could not map this product colour cleanly yet. The builder still works, but use the full guide when you need the wider system.</div>';
    usageGrid.innerHTML='';
    return;
  }
  const pairings=guidePairingsFor(obBase.colour);
  pairingsGrid.innerHTML=pairings.map(function(entry){
    const tierClass=entry.score.tier==='good'?' is-good':'';
    return`<article class="pair-card">
      <div class="pair-swatches">
        <div style="background:${obBase.colour.h}"></div>
        <div style="background:${entry.colour.h}"></div>
      </div>
      <div class="pair-body">
        <div class="pair-name">${obBase.colour.n} + ${entry.colour.n}</div>
        <div class="pair-tier${tierClass}">${pairingTierLabel(entry.score)}</div>
        <div class="pair-note">${pairingNote(obBase.colour,entry.colour)}</div>
      </div>
    </article>`;
  }).join('');
  usageGrid.innerHTML=buildUsageCards(obBase.colour,pairings).map(function(card){
    return`<div class="guide-usage-card">
      <div class="guide-usage-label">${card.label}</div>
      <div class="guide-usage-copy">${card.copy}</div>
    </div>`;
  }).join('');
}

// ─── INIT ───
function obInit(config){
  const el=byId('cg-outfit-builder');if(!el)return;
  const context=config||readBuilderContext();
  const initialGarment=normalizeGarment(context.garment);
  const initialColour=obDetectBaseColour(context.name);
  const guideUrl=syncGuideLinks(context.name,initialGarment);
  const profileState=(initialColour&&initialGarment)?{
    shellClass:' active',
    text:'No profile yet. The finder simply sorts the field more tightly to you.',
    cta:'Take the finder &rarr;'
  }:(initialGarment?{
    shellClass:' is-warning',
    text:'We could not map this product colour cleanly yet. The builder stays available, but the locked item is not colour-rated.',
    cta:'Open the guide &rarr;'
  }:{
    shellClass:' is-warning',
    text:'We could not confirm this product category or colour cleanly yet. Use the full guide as the source of truth.',
    cta:'Open the guide &rarr;'
  });
  obBase.name=context.name;
  obBase.garment=initialGarment;
  obBase.colour=initialColour;
  ob={slots:{},activeSlot:null,history:[],lockedSlot:initialGarment};
  if(obBase.colour&&ob.lockedSlot)ob.slots[ob.lockedSlot]=obBase.colour;

  el.innerHTML=`
    <div class="ob-left">
      <div class="ob-sec-label">Outfit Builder</div>
      <div class="ob-slots" id="ob-slots"></div>
      <div class="ob-gauge">
        <div class="ob-gauge-ring">
          <svg viewBox="0 0 60 60"><circle class="ob-gauge-bg" cx="30" cy="30" r="26"/><circle class="ob-gauge-fill" id="ob-gauge-fill" cx="30" cy="30" r="26"/></svg>
          <div class="ob-gauge-pct" id="ob-gauge-pct">Start<br>here</div>
        </div>
        <div class="ob-gauge-meta">
          <p class="ob-gauge-label" id="ob-gauge-label">Outfit progress</p>
          <p class="ob-gauge-desc" id="ob-gauge-desc">Build around the current item, then add the rest garment by garment.</p>
        </div>
      </div>
      <button class="ob-undo" id="ob-undo" onclick="window._obUndo()"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 119 9"/><path d="M3 3v9h9"/></svg> Undo</button>
    </div>
    <div class="ob-right">
      <div class="ob-profile-link${profileState.shellClass}" id="ob-profile-link">
        <div class="ob-pl-swatch" style="background:${obBase.colour?obBase.colour.h:'var(--border)'}"></div>
        <div class="ob-pl-text">${profileState.text}</div>
        <a class="ob-pl-cta" href="${guideUrl}">${profileState.cta}</a>
      </div>
      <div class="ob-prompt" id="ob-prompt">Your outfit has a <strong>working palette</strong></div>
      <div class="ob-suggest" id="ob-suggest">
        <div class="ob-suggest-head">
          <span class="ob-suggest-label">Suggested for you</span>
          <span class="ob-suggest-hint" id="ob-suggest-hint"></span>
        </div>
        <div class="ob-suggest-chips" id="ob-suggest-chips"></div>
      </div>
      <div id="ob-families"></div>
      <div class="ob-shop" id="ob-sa"><div class="ob-shop-dots" id="ob-sad"></div><div class="ob-shop-tx"><div class="ob-shop-ti" id="ob-sat"></div><div class="ob-shop-su" id="ob-sas"></div></div><a class="ob-shop-btn" href="${guideUrl}">See the full system &rarr;</a></div>
      <div class="ob-links" id="ob-lks"></div>
    </div>
  `;
  bindGuideTabs();
  renderGuidePanels();
  obRenderSlots();obRenderFamilies();updateGauge();obUShop();
  const firstOpen=obNextOpen();
  if(firstOpen)obSetActiveSlot(firstOpen.id);
}

// ─── RENDER SLOTS (vertical list — v20) ───
function obRenderSlots(){
  const slotsEl=byId('ob-slots');
  if(!slotsEl)return;
  slotsEl.innerHTML=obRenderableSlots().map(g=>{
    const col=ob.slots[g.id];
    const isLocked=!!ob.lockedSlot&&g.id===ob.lockedSlot;
    const isFilled=!!col;
    const isActive=ob.activeSlot===g.id;
    let cls='ob-slot';
    if(isActive)cls+=' on';
    if(isFilled)cls+=' filled';
    if(isLocked)cls+=' locked';
    let helper='';
    if(isLocked&&isFilled){
      helper=`<span class="ob-slot-badge">This item</span><div class="ob-slot-color">${col.n}</div>`;
    }else if(isLocked){
      helper=`<span class="ob-slot-badge">This item</span><div class="ob-slot-color ob-slot-color--pending">Colour not mapped yet</div>`;
    }else if(isFilled){
      helper=`<div class="ob-slot-color">${col.n}</div>`;
    }else{
      helper=`<div class="ob-slot-hint">+ add</div>`;
    }
    return`<div class="${cls}" data-slot="${g.id}">
      <div class="ob-slot-main">
        <span class="ob-slot-icon">${IC[g.id]}</span>
        <span class="ob-slot-body">
          <span class="ob-slot-name">${g.l}</span>
          ${helper}
        </span>
        ${isFilled?`<span class="ob-slot-dot" style="background:${col.h}${col.n==='White'?';border-color:rgba(0,0,0,0.16)':''}"></span>`:''}
      </div>
      ${isFilled&&!isLocked?`<span class="ob-slot-rm" data-remove-slot="${g.id}">&times;</span>`:''}
    </div>`;
  }).join('');
  obSyncA11y();

  // Event delegation for slot clicks
  slotsEl.onclick=function(e){
    const remove=e.target.closest('.ob-slot-rm');
    if(remove){
      const removeId=remove.getAttribute('data-remove-slot');
      if(removeId)obRemove(removeId);
      return;
    }
    const slot=e.target.closest('.ob-slot');if(!slot)return;
    const sid=slot.dataset.slot;
    if(slot.classList.contains('locked'))return;
    obSetActiveSlot(sid);
    if(window.innerWidth<=900){
      const fams=document.getElementById('ob-families');
      if(fams)fams.scrollIntoView({behavior:'smooth',block:'start'});
    }
  };
  slotsEl.onkeydown=function(e){
    if(e.key!=='Enter'&&e.key!==' ')return;
    const remove=e.target.closest('.ob-slot-rm');
    const slot=e.target.closest('.ob-slot');
    if(!remove&&!slot)return;
    e.preventDefault();
    if(remove){
      const removeId=remove.getAttribute('data-remove-slot');
      if(removeId)obRemove(removeId);
      return;
    }
    if(slot.classList.contains('locked'))return;
    obSetActiveSlot(slot.dataset.slot);
    if(window.innerWidth<=900){
      const fams=document.getElementById('ob-families');
      if(fams)fams.scrollIntoView({behavior:'smooth',block:'start'});
    }
  };
}
window._obRemove=function(id){obRemove(id);};

// ─── SET ACTIVE SLOT ───
function obSetActiveSlot(slotId){
  if(slotId===ob.lockedSlot)return;
  ob.activeSlot=slotId;
  obRenderSlots();
  obRenderFamilies();
  obRenderSuggestions(slotId);
  obUpdatePrompt();
}

// ─── RENDER FAMILIES (Playfair italic labels, v20 scoring) ───
function obFamilyLabel(name){
  const parts=name.split(' & ');
  if(parts.length===2)return`The <em>${parts[0]}</em> & ${parts[1]}`;
  return`The <em>${name}</em>`;
}
function obRenderFamilies(){
  const placedColors=Object.values(ob.slots);
  const famsEl=document.getElementById('ob-families');
  famsEl.innerHTML=FAMILIES.map(fam=>`
    <div class="ob-fam">
      <div class="ob-fam-head">
        <span class="ob-fam-name">${obFamilyLabel(fam.name)}</span>
        <span class="ob-fam-count">${fam.colors.length} colours</span>
      </div>
      <div class="ob-fam-chips">${fam.colors.map(c=>{
        let cls='';
        if(placedColors.length>0&&ob.activeSlot){
          const scores=placedColors.map(placed=>sc(c,placed));
          const best=scores.reduce((a,b)=>a.pct>b.pct?a:b);
          cls=best.tier==='perfect'||best.tier==='good'?' in-palette':' is-caution';
        }
        return`<div class="ob-chip${cls}" style="background:${c.h}" data-ci="${C.indexOf(c)}" data-color="${c.n}" title="${c.n}" role="button" tabindex="0"><div class="ob-tt">${c.n}</div></div>`;
      }).join('')}</div>
    </div>
  `).join('');

  famsEl.querySelectorAll('.ob-chip').forEach(chip=>{
    const choose=()=>{
      if(!ob.activeSlot)return;
      const cObj=C[parseInt(chip.dataset.ci)];
      if(cObj)obPickColor(cObj);
    };
    chip.addEventListener('click',choose);
    chip.addEventListener('keydown',function(e){
      if(e.key!=='Enter'&&e.key!==' ')return;
      e.preventDefault();
      choose();
    });
  });
}

// ─── PICK COLOUR ───
function obPickColor(colorObj){
  if(!ob.activeSlot)return;
  ob.history.push({slot:ob.activeSlot,prevColor:ob.slots[ob.activeSlot]||null,type:'pick'});
  ob.slots[ob.activeSlot]=colorObj;
  const next=obNextOpen();
  ob.activeSlot=next?next.id:null;
  obRenderSlots();obRenderFamilies();updateGauge();obUShop();renderGuidePanels();
  obRenderSuggestions(ob.activeSlot);obUpdatePrompt();
  const undoEl=byId('ob-undo');
  if(undoEl)undoEl.classList.add('vis');
}

// ─── REMOVE ───
function obRemove(slotId){
  if(slotId===ob.lockedSlot)return;
  ob.history.push({slot:slotId,prevColor:ob.slots[slotId],type:'remove'});
  delete ob.slots[slotId];
  ob.activeSlot=slotId;
  obRenderSlots();obRenderFamilies();updateGauge();obUShop();renderGuidePanels();
  obRenderSuggestions(slotId);obUpdatePrompt();
  const undoEl=byId('ob-undo');
  if(undoEl)undoEl.classList.add('vis');
}

// ─── UNDO ───
function obUndo(){
  if(!ob.history.length)return;
  const last=ob.history.pop();
  if(last.type==='remove'||last.type==='pick'){
    if(last.prevColor)ob.slots[last.slot]=last.prevColor;
    else delete ob.slots[last.slot];
  }
  ob.activeSlot=null;
  obRenderSlots();obRenderFamilies();updateGauge();obUShop();renderGuidePanels();
  if(!ob.history.length){
    const undoEl=byId('ob-undo');
    if(undoEl)undoEl.classList.remove('vis');
  }
  const next=obNextOpen();
  if(next)obSetActiveSlot(next.id);
  else obUpdatePrompt();
}
window._obUndo=obUndo;

// ─── GAUGE (dark theme — v20) ───
function updateGauge(){
  const filled=Object.keys(ob.slots).length;
  const pct=Math.round((filled/6)*100);
  const offset=164-(164*pct/100);
  const gaugeFill=byId('ob-gauge-fill');
  const pctEl=byId('ob-gauge-pct');
  const labelEl=byId('ob-gauge-label');
  const descEl=byId('ob-gauge-desc');
  if(!gaugeFill||!pctEl||!labelEl||!descEl)return;
  gaugeFill.style.strokeDashoffset=offset;
  if(filled<=1){
    const next=obNextOpen();
    const nextLabel=next?garmentLabel(next.id):'next piece';
    pctEl.innerHTML='Start<br>here';
    labelEl.textContent='Outfit progress';
    descEl.textContent=ob.lockedSlot
      ? 'Build around the '+garmentLabel(ob.lockedSlot)+'. Start with the '+nextLabel+'.'
      : 'Pick a starting piece, then add the rest garment by garment.';
  }else if(filled<6){
    pctEl.textContent=filled+'/6';
    labelEl.textContent='Outfit progress';
    descEl.textContent=filled+' of 6 pieces are set. Add another piece or swap any filled slot.';
  }else{
    pctEl.textContent='6/6';
    labelEl.textContent='Outfit complete';
    descEl.textContent='All slots filled. Swap any colour to refine the mix.';
  }
}

// ─── PROMPT ───
function obUpdatePrompt(){
  const promptEl=byId('ob-prompt');
  if(!promptEl)return;
  if(ob.activeSlot){
    const g=G.find(x=>x.id===ob.activeSlot);
    promptEl.textContent='Choose a colour for '+(g?g.l:'this piece');
  }else{
    promptEl.innerHTML='Your outfit has a <strong>working palette</strong>';
  }
}

// ─── SUGGESTIONS ───
function obRenderSuggestions(slotId){
  const suggestEl=byId('ob-suggest');
  const hintEl=byId('ob-suggest-hint');
  const chipsEl=byId('ob-suggest-chips');
  if(!suggestEl||!hintEl||!chipsEl)return;
  if(!slotId||!SLOT_RECS[slotId]){suggestEl.classList.remove('show');return;}
  const rec=SLOT_RECS[slotId];
  const suggestions=rec.pool.filter(name=>C.some(c=>c.n===name)).slice(0,8);
  if(!suggestions.length){suggestEl.classList.remove('show');return;}
  hintEl.textContent=rec.hint;
  chipsEl.innerHTML=suggestions.map(name=>{
    const c=C.find(x=>x.n===name);
    return`<div class="ob-sc" data-color="${name}" role="button" tabindex="0"><div class="ob-sc-sq" style="background:${c?c.h:'#ccc'}"></div><div class="ob-sc-name">${name}</div></div>`;
  }).join('');
  suggestEl.classList.add('show');
  document.querySelectorAll('.ob-sc').forEach(sc=>{
    const choose=()=>{
      if(!ob.activeSlot)return;
      const cObj=C.find(c=>c.n===sc.dataset.color);
      if(cObj)obPickColor(cObj);
    };
    sc.addEventListener('click',choose);
    sc.addEventListener('keydown',function(e){
      if(e.key!=='Enter'&&e.key!==' ')return;
      e.preventDefault();
      choose();
    });
  });
}

// ─── SHOP AREA (PDP-specific) ───
function obUShop(){
  const entries=obSlotOrder().filter(function(slotId){
    return !!ob.slots[slotId];
  }).map(function(slotId){
    return[slotId,ob.slots[slotId]];
  }),sa=byId('ob-sa'),lk=byId('ob-lks');
  if(!sa||!lk)return;
  if(entries.length<2){sa.classList.remove('vis');lk.innerHTML='';return;}
  sa.classList.add('vis');
  const dotsEl=byId('ob-sad');
  const titleEl=byId('ob-sat');
  const summaryEl=byId('ob-sas');
  if(!dotsEl||!titleEl||!summaryEl)return;
  dotsEl.innerHTML=Object.values(ob.slots).map(c=>`<div class="ob-shop-dot" style="background:${c.h}"></div>`).join('');
  titleEl.textContent='Working palette';
  summaryEl.textContent=entries.map(([gid,c])=>c.n+' '+G.find(x=>x.id===gid).l).join(' \u00b7 ')+' \u00b7 Search the catalogue with these colours as the brief.';
  lk.innerHTML=entries.filter(([gid])=>gid!==ob.lockedSlot).map(([gid,col])=>{
    return`<a class="ob-link" href="${buildCollectionSearchUrl(gid,col.n)}"><span class="ob-link-d" style="background:${col.h}"></span>Search ${col.n} ${G.find(x=>x.id===gid).l} &rarr;</a>`;
  }).join('');
}

// ─── BOOT (Shopify PDP) ───
document.addEventListener('DOMContentLoaded',function(){
  var el = byId('cg-outfit-builder');
  if(!el) return;
  bindGuideTabs();
  activateGuidePanel('builder');
  obInit(readBuilderContext());
});

// Listen for swatch changes from PDP variant picker
window.addEventListener('trg-swatch-change',function(e){
  var name = e.detail && e.detail.name;
  obInit(readBuilderContext(name||''));
});

})();
