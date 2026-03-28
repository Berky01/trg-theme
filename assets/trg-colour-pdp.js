(function(){
'use strict';

// ─── 65 VERIFIED MENSWEAR COLOURS ───
const C=[
  {n:"White",h:"#f8f6f3",cb:[6,11,27,31,37,43,45,46,52,59,63,70,71,86,90],g:"Whites & Creams"},
  {n:"Cream",h:"#f2ead8",cb:[50,94,102,126,178,184,190,209,214,243],g:"Whites & Creams"},
  {n:"Ecru",h:"#e8dcc8",cb:[50,94,102,126,178,184,190,209,214,235,243],g:"Whites & Creams"},
  {n:"Off-White",h:"#eae4d8",cb:[11,50,94,126,184,190,235,243],g:"Whites & Creams"},
  {n:"Oatmeal",h:"#d4c8b0",cb:[50,94,102,178,190,214,235],g:"Whites & Creams"},
  {n:"Ivory",h:"#f0e8d0",cb:[11,50,94,102,126,178,184,190,209,214,235,243,262,266,301,343],g:"Whites & Creams"},
  {n:"Sand",h:"#c8b88a",cb:[11,50,94,102,126,178,190,209,214,235,243,262,301],g:"Sand & Khaki"},
  {n:"Tan",h:"#c4a878",cb:[23,41,56,79,116,129,134,199,210,232,234,291],g:"Sand & Khaki"},
  {n:"Khaki",h:"#b0a07a",cb:[50,94,102,178,190,214,235,262,301],g:"Sand & Khaki"},
  {n:"Camel",h:"#c49a5c",cb:[23,41,56,79,116,129,134,199,210,232,234,291,295,318],g:"Sand & Khaki"},
  {n:"Biscuit",h:"#d0c0a0",cb:[50,94,126,184,190,235,243,262],g:"Sand & Khaki"},
  {n:"Stone",h:"#a09080",cb:[47,55,69,95,113,122,129,160,175,212],g:"Sand & Khaki"},
  {n:"Mushroom",h:"#a89888",cb:[47,55,69,95,113,122,129,160,175],g:"Sand & Khaki"},
  {n:"Taupe",h:"#8a7e70",cb:[47,55,69,95,113,160,175,212,219],g:"Sand & Khaki"},
  {n:"Copper",h:"#b06828",cb:[3,13,33,70,86,130,131,182,243,247],g:"Browns"},
  {n:"Raw Sienna",h:"#b86000",cb:[3,13,33,70,86,130,131,182,243,247,252,255,268,269,279,293,298,319,327],g:"Browns"},
  {n:"Terracotta",h:"#c06848",cb:[40,85,198,242,244,263,285,286],g:"Browns"},
  {n:"Rust",h:"#a05030",cb:[40,85,198,242,244,263,285,286,297],g:"Browns"},
  {n:"Tobacco",h:"#7a5028",cb:[110,121,145,161,198,242,263,285,286],g:"Browns"},
  {n:"Saddle Brown",h:"#8b6834",cb:[110,121,145,161,198,242],g:"Browns"},
  {n:"Chocolate",h:"#5c2c10",cb:[110,121,145,161],g:"Browns"},
  {n:"Espresso",h:"#3c2010",cb:[110,121,145,161,198,242],g:"Browns"},
  {n:"Mint",h:"#a0c8a0",cb:[4,36,46,87,106,137,173,194,220,253,264,274],g:"Greens"},
  {n:"Sage",h:"#88a880",cb:[4,36,46,87,106,137,173,194,220,253,264,274,300,321,332],g:"Greens"},
  {n:"Teal",h:"#287070",cb:[14,30,42,102,132,140,144,176,211],g:"Greens"},
  {n:"Olive",h:"#606838",cb:[8,35,64,79,88,150,175,200,228,249,258,269,287,304,319],g:"Greens"},
  {n:"Olive Drab",h:"#4a5828",cb:[8,35,64,79,88,150,175,200,228,249],g:"Greens"},
  {n:"Hunter",h:"#305838",cb:[14,30,42,102,132,140,144,176,211,240,262,309],g:"Greens"},
  {n:"Forest",h:"#1c4028",cb:[23,50,56,77,91,104,190,206,234,255,293,294,303,315,340],g:"Greens"},
  {n:"Bottle Green",h:"#1a3828",cb:[23,50,56,77,91,104,190,206,234],g:"Greens"},
  {n:"Emerald",h:"#40a860",cb:[2,60,85,114,136,188,209,225,248,290,313],g:"Greens"},
  {n:"Powder Blue",h:"#b0c8e0",cb:[24,72,135,148,182,196,222],g:"Blues"},
  {n:"Chambray",h:"#7898b8",cb:[24,72,135,148,182,196,222,233],g:"Blues"},
  {n:"Steel Blue",h:"#587890",cb:[7,57,66,116,154,174,179,208,232],g:"Blues"},
  {n:"Denim",h:"#486888",cb:[7,57,66,116,154,174,179,208,232,260],g:"Blues"},
  {n:"Cerulean",h:"#4880c0",cb:[17,39,69,109,155,210,272,302,325],g:"Blues"},
  {n:"Blue",h:"#3464a8",cb:[7,57,66,116,154,174,179,208,232,260,291,292,303],g:"Blues"},
  {n:"Cobalt",h:"#2860a0",cb:[10,55,82,94,152,198,242,252,280,298,336],g:"Blues"},
  {n:"Navy",h:"#1a3060",cb:[3,25,30,68,84,115,117,121,136,153,162,181,197,205,223,261,276,289,306,307,318,340],g:"Blues"},
  {n:"Dark Navy",h:"#101e40",cb:[33,40,73,80,110,126,133,178,213,214,218,236,257,266,270,281],g:"Blues"},
  {n:"Indigo",h:"#282858",cb:[33,40,73,80,110,126,133,178,213],g:"Blues"},
  {n:"Cement",h:"#ccc8c0",cb:[10,47,55,69,95,113,122,129,160,175,212],g:"Greys"},
  {n:"Light Grey",h:"#b8b4ac",cb:[10,47,55,69,95,113,122,129,160,175,212,219],g:"Greys"},
  {n:"Silver",h:"#a8a8a0",cb:[10,47,55,69,95,113,122,129,160,175,212,219,256,265,283],g:"Greys"},
  {n:"Pewter",h:"#909088",cb:[1,44,66,96,105,128,161,177,195,207],g:"Greys"},
  {n:"Smoke",h:"#808078",cb:[1,44,66,96,105,128,161,177,195,207,239,271,299,317,328],g:"Greys"},
  {n:"Slate",h:"#585850",cb:[9,21,58,76,99,111,145,164,183,204,216,233],g:"Greys"},
  {n:"Charcoal",h:"#404038",cb:[9,21,58,76,99,111,145,164,183,204,216,233,241,250,263,284,312,324,329,342],g:"Greys"},
  {n:"Graphite",h:"#303028",cb:[6,11,27,31,37,43,45,46,52,59,63,70,71,86],g:"Greys"},
  {n:"Black",h:"#181818",cb:[6,11,27,31,37,43,45,46,52,59,63,70,71,86,90,100,103,108,112,120,123,124,127,131,138,139,141,142],g:"Greys"},
  {n:"Dusty Rose",h:"#c09080",cb:[35,68,185,191,223,239,244,268,285],g:"Reds & Burgundy"},
  {n:"Brick",h:"#8b3828",cb:[37,108,198,242,246,263,285,322,328],g:"Reds & Burgundy"},
  {n:"Carmine",h:"#a01028",cb:[35,51,104,130,181,200,221,228,233,237,245],g:"Reds & Burgundy"},
  {n:"Burgundy",h:"#6c1020",cb:[124,171,177,205,217,258,269,283],g:"Reds & Burgundy"},
  {n:"Oxblood",h:"#601018",cb:[58,82,95,152,186,231,249,304,314,336,345],g:"Reds & Burgundy"},
  {n:"Wine",h:"#501828",cb:[124,171,177,205,217,258,269],g:"Reds & Burgundy"},
  {n:"Fawn",h:"#c8a8a8",cb:[18,125,308],g:"Mauves"},
  {n:"Mauve",h:"#a08090",cb:[35,68,185,191,223,239,244,268,285,321],g:"Mauves"},
  {n:"Lilac Grey",h:"#9890a0",cb:[35,68,185,191,223,239,244],g:"Mauves"},
  {n:"Plum",h:"#502840",cb:[63,91,165,226,290,337],g:"Mauves"},
];

// ─── CIELAB / SCORING ───
function sL(hex){
  let r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;
  r=r>.04045?((r+.055)/1.055)**2.4:r/12.92;g=g>.04045?((g+.055)/1.055)**2.4:g/12.92;b=b>.04045?((b+.055)/1.055)**2.4:b/12.92;
  let x=(r*.4124564+g*.3575761+b*.1804375)/.95047,y=(r*.2126729+g*.7151522+b*.072175)/1,z=(r*.0193339+g*.119192+b*.9503041)/1.08883;
  const f=t=>t>.008856?t**(1/3):(903.3*t+16)/116;
  return[116*f(y)-16,500*(f(x)-f(y)),200*(f(y)-f(z))];
}
function dE(a,b){const[L1,a1,b1]=sL(a),[L2,a2,b2]=sL(b);return Math.sqrt((L1-L2)**2+(a1-a2)**2+(b1-b2)**2)}
function sc(a,b){
  const s=a.cb.filter(c=>b.cb.includes(c)).length;
  if(s>=3)return{pct:Math.min(97,82+s*4),tier:'perfect'};
  if(s>=1)return{pct:62+s*10,tier:'good'};
  return{pct:Math.max(18,Math.round(52-(dE(a.h,b.h)/120)*30)),tier:'care'};
}
function near(hex){let b=null,bd=Infinity;C.forEach(c=>{const d=dE(hex,c.h);if(d<bd){bd=d;b=c}});return b}

// ─── GARMENT CONFIG ───
const IC={
  shirt:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3l3-1 3 1 3 4-2 2v11H8V9L6 7l3-4z"/></svg>',
  trousers:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8l-1 6 2 12h-4l-1-7-1 7H7l2-12-1-6z"/></svg>',
  knitwear:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l2-2h4l2 2 3 4-2 2v10H7V10L5 8l3-4z"/></svg>',
  jacket:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3l4-1 4 1 2 4-2 2v11h-3v-7h-2v7H8V9L6 7l2-4z"/></svg>',
  coat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 2h6l3 4-1 15h-4v-8h-2v8H7L6 6l3-4z"/></svg>',
  shoes:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16c2 0 4-1 5-3l2 1c2 1 4 2 7 2 1 0 2 1 2 2v2H4z"/></svg>'
};
const G=[
  {id:'shirt',l:'Shirt',co:'shirts'},
  {id:'trousers',l:'Trousers',co:'trousers'},
  {id:'knitwear',l:'Knitwear',co:'knitwear'},
  {id:'jacket',l:'Jacket',co:'jackets'},
  {id:'coat',l:'Coat',co:'outerwear'},
  {id:'shoes',l:'Shoes',co:'footwear'}
];
const GORDER=['Whites & Creams','Sand & Khaki','Browns','Greens','Blues','Greys','Reds & Burgundy','Mauves'];

// ─── FAMILIES (grouped from C[]) ───
const FAMILIES=GORDER.map(gn=>({name:gn,colors:C.filter(c=>c.g===gn)}));

// ─── SLOT RECOMMENDATIONS (from v21) ───
const SLOT_RECS={
  shirt:{pool:['White','Off-White','Cream','Ivory','Powder Blue','Chambray','Oatmeal','Ecru','Light Grey','Cement'],hint:'Lighter tones near the face'},
  trousers:{pool:['Charcoal','Navy','Slate','Khaki','Olive','Stone','Smoke','Denim','Graphite','Dark Navy','Taupe','Sand'],hint:'Grounding neutrals and mid-tones'},
  knitwear:{pool:['Burgundy','Rust','Teal','Forest','Cobalt','Terracotta','Plum','Emerald','Copper','Wine','Carmine','Cerulean'],hint:'Rich tones that add depth'},
  jacket:{pool:['Navy','Charcoal','Camel','Olive','Slate','Dark Navy','Hunter','Graphite','Chocolate','Saddle Brown','Denim'],hint:'The anchor piece'},
  coat:{pool:['Camel','Charcoal','Navy','Black','Chocolate','Dark Navy','Espresso','Graphite','Olive'],hint:'Broad strokes, outermost layer'},
  shoes:{pool:['Saddle Brown','Chocolate','Black','Espresso','Tobacco','Tan','Oxblood'],hint:'Leathers and darks'},
};

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
