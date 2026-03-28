(function(){
'use strict';

// ─── Read shared data from engine ───
var E = window.TRG_CG;
if (!E) { console.warn('TRG: colour engine not loaded'); return; }
var C=E.C, sL=E.sL, dE=E.dE, sc=E.sc, near=E.near, IC=E.IC, G=E.G, GORDER=E.GORDER, FAMILIES=E.FAMILIES, SLOT_RECS=E.SLOT_RECS;

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
let ob={slots:{},activeSlot:null,history:[],lockedSlot:'shirt'};
let obBase={garment:'shirt',colour:null,name:''};

function obDetectBaseColour(name){
  const lo=(name||'').toLowerCase().trim();
  const aliases={
    'indigo heather':'Indigo','heather grey':'Silver',
    'off white':'Off-White','off-white':'Off-White',
    'dark navy':'Dark Navy','rust brown':'Rust',
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
  return C.find(c=>c.n==='Indigo');
}

function obNextOpen(){
  return G.find(g=>g.id!==ob.lockedSlot&&!ob.slots[g.id]);
}

// ─── INIT ───
function obInit(){
  const el=document.getElementById('cg-outfit-builder');if(!el)return;
  obBase.name=(document.getElementById('ctl-colour-name')?.textContent||'Indigo').trim();
  obBase.colour=obDetectBaseColour(obBase.name);
  ob={slots:{},activeSlot:null,history:[],lockedSlot:'shirt'};
  if(obBase.colour)ob.slots[ob.lockedSlot]=obBase.colour;

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
          <p class="ob-gauge-desc" id="ob-gauge-desc">Build around the shirt, then add the rest garment by garment.</p>
        </div>
      </div>
      <button class="ob-undo" id="ob-undo" onclick="window._obUndo()"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 119 9"/><path d="M3 3v9h9"/></svg> Undo</button>
    </div>
    <div class="ob-right">
      <div class="ob-profile-link" id="ob-profile-link">
        <div class="ob-pl-swatch" style="background:${obBase.colour?obBase.colour.h:'var(--border)'}"></div>
        <div class="ob-pl-text">No profile yet. The finder simply sorts the field more tightly to you.</div>
        <a class="ob-pl-cta" href="/pages/colour-guide">Take the finder &rarr;</a>
      </div>
      <div class="ob-suggest" id="ob-suggest">
        <div class="ob-suggest-head">
          <span class="ob-suggest-label">Suggested for you</span>
          <span class="ob-suggest-hint" id="ob-suggest-hint"></span>
        </div>
        <div class="ob-suggest-chips" id="ob-suggest-chips"></div>
      </div>
      <div id="ob-families"></div>
      <div class="ob-shop" id="ob-sa"><div class="ob-shop-dots" id="ob-sad"></div><div class="ob-shop-tx"><div class="ob-shop-ti" id="ob-sat"></div><div class="ob-shop-su" id="ob-sas"></div></div><a class="ob-shop-btn" href="/pages/colour-guide">See the full system &rarr;</a></div>
      <div class="ob-links" id="ob-lks"></div>
    </div>
  `;
  obRenderSlots();obRenderFamilies();updateGauge();obUShop();
  const firstOpen=obNextOpen();
  if(firstOpen)obSetActiveSlot(firstOpen.id);
}

// ─── RENDER SLOTS (vertical list — v20) ───
function obRenderSlots(){
  const slotsEl=document.getElementById('ob-slots');
  slotsEl.innerHTML=G.map(g=>{
    const col=ob.slots[g.id];
    const isLocked=g.id===ob.lockedSlot;
    const isFilled=!!col;
    const isActive=ob.activeSlot===g.id;
    let cls='ob-slot';
    if(isActive)cls+=' on';
    if(isFilled)cls+=' filled';
    if(isLocked)cls+=' locked';
    const helper=isLocked&&isFilled?`<span class="ob-slot-badge">This item</span>`:isFilled?`<div class="ob-slot-color">${col.n}</div>`:`<div class="ob-slot-hint">+ add</div>`;
    return`<div class="${cls}" data-slot="${g.id}">
      <div class="ob-slot-main">
        <span class="ob-slot-icon">${IC[g.id]}</span>
        <span class="ob-slot-body">
          <span class="ob-slot-name">${g.l}</span>
          ${helper}
        </span>
        ${isFilled?`<span class="ob-slot-dot" style="background:${col.h}${col.n==='White'?';border-color:rgba(0,0,0,0.16)':''}"></span>`:''}
      </div>
      ${isFilled&&!isLocked?`<span class="ob-slot-rm" onclick="event.stopPropagation();window._obRemove('${g.id}')">&times;</span>`:''}
    </div>`;
  }).join('');

  // Event delegation for slot clicks
  slotsEl.onclick=function(e){
    if(e.target.closest('.ob-slot-rm'))return; // handled by inline onclick
    const slot=e.target.closest('.ob-slot');if(!slot)return;
    const sid=slot.dataset.slot;
    if(slot.classList.contains('locked'))return;
    obSetActiveSlot(sid);
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
        return`<div class="ob-chip${cls}" style="background:${c.h}" data-ci="${C.indexOf(c)}" data-color="${c.n}" title="${c.n}"><div class="ob-tt">${c.n}</div></div>`;
      }).join('')}</div>
    </div>
  `).join('');

  famsEl.querySelectorAll('.ob-chip').forEach(chip=>{
    chip.addEventListener('click',()=>{
      if(!ob.activeSlot)return;
      const cObj=C[parseInt(chip.dataset.ci)];
      if(cObj)obPickColor(cObj);
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
  obRenderSlots();obRenderFamilies();updateGauge();obUShop();
  obRenderSuggestions(ob.activeSlot);obUpdatePrompt();
  document.getElementById('ob-undo').classList.add('vis');
}

// ─── REMOVE ───
function obRemove(slotId){
  if(slotId===ob.lockedSlot)return;
  ob.history.push({slot:slotId,prevColor:ob.slots[slotId],type:'remove'});
  delete ob.slots[slotId];
  ob.activeSlot=slotId;
  obRenderSlots();obRenderFamilies();updateGauge();obUShop();
  obRenderSuggestions(slotId);obUpdatePrompt();
  document.getElementById('ob-undo').classList.add('vis');
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
  obRenderSlots();obRenderFamilies();updateGauge();obUShop();
  if(!ob.history.length)document.getElementById('ob-undo').classList.remove('vis');
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
  document.getElementById('ob-gauge-fill').style.strokeDashoffset=offset;
  const pctEl=document.getElementById('ob-gauge-pct');
  const labelEl=document.getElementById('ob-gauge-label');
  const descEl=document.getElementById('ob-gauge-desc');
  if(filled<=1){
    pctEl.innerHTML='Start<br>here';
    labelEl.textContent='Outfit progress';
    descEl.textContent='Build around the shirt, then add the rest garment by garment.';
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
  const promptEl=document.getElementById('ob-prompt');
  if(ob.activeSlot){
    const g=G.find(x=>x.id===ob.activeSlot);
    promptEl.textContent='Choose a colour for '+g.l;
  }else{
    promptEl.innerHTML='Your outfit has a <strong>working palette</strong>';
  }
}

// ─── SUGGESTIONS ───
function obRenderSuggestions(slotId){
  const suggestEl=document.getElementById('ob-suggest');
  if(!slotId||!SLOT_RECS[slotId]){suggestEl.classList.remove('show');return;}
  const rec=SLOT_RECS[slotId];
  const suggestions=rec.pool.filter(name=>C.some(c=>c.n===name)).slice(0,8);
  if(!suggestions.length){suggestEl.classList.remove('show');return;}
  document.getElementById('ob-suggest-hint').textContent=rec.hint;
  document.getElementById('ob-suggest-chips').innerHTML=suggestions.map(name=>{
    const c=C.find(x=>x.n===name);
    return`<div class="ob-sc" data-color="${name}"><div class="ob-sc-sq" style="background:${c?c.h:'#ccc'}"></div><div class="ob-sc-name">${name}</div></div>`;
  }).join('');
  suggestEl.classList.add('show');
  document.querySelectorAll('.ob-sc').forEach(sc=>{
    sc.addEventListener('click',()=>{
      if(!ob.activeSlot)return;
      const cObj=C.find(c=>c.n===sc.dataset.color);
      if(cObj)obPickColor(cObj);
    });
  });
}

// ─── SHOP AREA (PDP-specific) ───
function obUShop(){
  const entries=Object.entries(ob.slots),sa=document.getElementById('ob-sa'),lk=document.getElementById('ob-lks');
  if(entries.length<2){sa.classList.remove('vis');lk.innerHTML='';return;}
  sa.classList.add('vis');
  document.getElementById('ob-sad').innerHTML=Object.values(ob.slots).map(c=>`<div class="ob-shop-dot" style="background:${c.h}"></div>`).join('');
  document.getElementById('ob-sat').textContent='Working palette';
  document.getElementById('ob-sas').textContent=entries.map(([gid,c])=>c.n+' '+G.find(x=>x.id===gid).l).join(' \u00b7 ');
  lk.innerHTML=entries.filter(([gid])=>gid!==ob.lockedSlot).map(([gid,col])=>{
    const g=G.find(x=>x.id===gid);
    return`<a class="ob-link" href="/collections/${g.co}"><span class="ob-link-d" style="background:${col.h}"></span>${col.n} ${g.l} &rarr;</a>`;
  }).join('');
}

// ─── BOOT (Shopify PDP) ───
document.addEventListener('DOMContentLoaded',function(){
  var el = document.getElementById('cg-outfit-builder');
  if(!el) return;
  var container = el.closest('[data-colour]');
  if(container){
    obBase.name = container.getAttribute('data-colour') || 'Indigo';
    var garm = container.getAttribute('data-garment') || 'shirt';
    ob.lockedSlot = garm;
  }
  obInit();
});

// Listen for swatch changes from PDP variant picker
window.addEventListener('trg-swatch-change',function(e){
  var name = e.detail && e.detail.name;
  if(name){
    obBase.name = name;
    obInit();
  }
});

})();
