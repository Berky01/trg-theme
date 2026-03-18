/* ═══════════════════════════════════════ */
/* TRG COLOUR GUIDE ENGINE                */
/* ═══════════════════════════════════════ */
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
  return{pct:Math.max(18,Math.round(52-(dE(a.h,b.h)/120)*30)),tier:'works'};
}
function near(hex){let b=null,bd=Infinity;C.forEach(c=>{const d=dE(hex,c.h);if(d<bd){bd=d;b=c}});return b}

// ─── GARMENT CONFIG ───
const IC={
  shirt:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 2l-4 4 3 2V18h10V8l3-2-4-4"/><path d="M6 2c0 2 2 3 4 3s4-1 4-3"/></svg>',
  trousers:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 2h10v3l-1 13H11l-1-9-1 9H6L5 5z"/><line x1="5" y1="5" x2="15" y2="5"/></svg>',
  knitwear:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 5h10v12H5z"/><path d="M5 8h10"/><path d="M2 5h3v6H2"/><path d="M15 5h3v6h-3"/><path d="M7 3h6v2H7z"/></svg>',
  jacket:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 3h10l1.5 5V17H3.5V8z"/><path d="M8 3l2 4 2-4"/><line x1="10" y1="7" x2="10" y2="17"/></svg>',
  coat:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 2h8l2 6v10H4V8z"/><path d="M8 2v4"/><path d="M12 2v4"/><line x1="4" y1="8" x2="16" y2="8"/></svg>',
  shoes:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 14c0-1 1-4 4-5V5h4v4c3 0 6 1 8 2v2c0 1-1 2-2 2H4c-1 0-2-1-2-2z"/><line x1="6" y1="5" x2="10" y2="5"/></svg>'
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
// OUTFIT BUILDER
// ═══════════════════════════════════════
let ob={o:{},act:null,hist:[],skipped:{}};

function obInit(){
  const el=document.getElementById('cg-outfit-builder');if(!el)return;
  ob={o:{},act:null,hist:[],skipped:{}};
  el.innerHTML=`
    <div class="ob-harm empty" id="ob-harm">
      <div class="ob-gauge"><svg viewBox="0 0 88 88"><circle class="ob-gauge-bg" cx="44" cy="44" r="40"/><circle class="ob-gauge-fill" id="ob-gf" cx="44" cy="44" r="40"/></svg><div class="ob-gauge-text empty-st" id="ob-gt">Build<br>to score</div></div>
      <div class="ob-harm-meta"><div class="ob-harm-title" id="ob-ht">Pick your first piece</div><div class="ob-harm-desc" id="ob-hd">Tap a garment in the strip below, then pick a colour. The harmony score updates as you build.</div></div>
    </div>
    <div class="ob-strip" id="ob-strip"></div>
    <button class="ob-undo" id="ob-undo" onclick="window._obUndo()"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 119 9"/><path d="M3 3v9h9"/></svg> Undo</button>
    <div class="ob-prompt" id="ob-pr"></div>
    <div class="ob-pal" id="ob-pal"></div>
    <div class="ob-shop" id="ob-sa"><div class="ob-shop-dots" id="ob-sad"></div><div class="ob-shop-tx"><div class="ob-shop-ti" id="ob-sat"></div><div class="ob-shop-su" id="ob-sas"></div></div><a class="ob-shop-btn" href="#">Shop entire look →</a></div>
    <div class="ob-links" id="ob-lks"></div>
  `;
  obRStrip();obRPal();
}

function obRStrip(){
  document.getElementById('ob-strip').innerHTML=G.map(g=>{
    const col=ob.o[g.id],isFilled=!!col,isAct=ob.act===g.id,isSk=ob.skipped[g.id];
    const cls='ob-s'+(isFilled?' filled':'')+(isAct?' active':'')+(isSk?' skipped':'');
    const bg=col?`background:${col.h};`:'';
    let click='';
    if(!isFilled&&!isSk)click=` onclick="window._obPG('${g.id}')"`;
    if(isFilled)click=` onclick="window._obRm('${g.id}')"`;
    return`<div class="${cls}" style="${bg}"${click}>
      <span class="ob-s-ic">${IC[g.id]}</span><span class="ob-s-lb">${g.l}</span>
      ${isFilled?`<span class="ob-s-rm" onclick="event.stopPropagation();window._obRm('${g.id}')">×</span>`:''}
      ${!isFilled&&!isSk?`<span class="ob-s-skip" onclick="event.stopPropagation();window._obSkip('${g.id}')">skip</span>`:''}
    </div>`;
  }).join('');
}

function obPG(id){
  if(ob.o[id]||ob.skipped[id])return;
  ob.act=id;obRStrip();
  const g=G.find(x=>x.id===id);
  const pr=document.getElementById('ob-pr');pr.style.display='block';
  const locked=Object.values(ob.o);
  if(locked.length>0){
    pr.innerHTML=`Pick a colour for <strong>${g.l}</strong>:`;
    const ref=locked[locked.length-1];
    document.querySelectorAll('#ob-pal .ob-cc').forEach(ch=>{
      ch.classList.remove('perfect','good');ch.querySelector('.ob-sc').style.display='none';
      const cObj=C[parseInt(ch.dataset.ci)];if(!cObj)return;
      const s=sc(ref,cObj);
      if(s.tier==='perfect'){ch.classList.add('perfect');ch.querySelector('.ob-sc').textContent=s.pct+'%';ch.querySelector('.ob-sc').style.display='block'}
      else if(s.tier==='good'){ch.classList.add('good');ch.querySelector('.ob-sc').textContent=s.pct+'%';ch.querySelector('.ob-sc').style.display='block'}
    });
  }else{
    pr.innerHTML=`Pick a colour for <strong>${g.l}</strong>:`;
    document.querySelectorAll('#ob-pal .ob-cc').forEach(ch=>{ch.classList.remove('perfect','good');ch.querySelector('.ob-sc').style.display='none'});
  }
}

function obPCol(col){
  if(!ob.act)return;
  ob.hist.push({g:ob.act,col:ob.o[ob.act]||null,type:'pick'});
  ob.o[ob.act]=col;ob.act=null;
  document.getElementById('ob-pr').style.display='none';
  document.querySelectorAll('#ob-pal .ob-cc').forEach(ch=>{ch.classList.remove('perfect','good');ch.querySelector('.ob-sc').style.display='none'});
  obRStrip();obUHarm();obUShop();
  document.getElementById('ob-undo').classList.add('vis');
}

function obSkip(id){
  ob.hist.push({g:id,col:null,type:'skip'});
  ob.skipped[id]=true;
  if(ob.act===id){ob.act=null;document.getElementById('ob-pr').style.display='none';document.querySelectorAll('#ob-pal .ob-cc').forEach(ch=>{ch.classList.remove('perfect','good');ch.querySelector('.ob-sc').style.display='none'})}
  obRStrip();document.getElementById('ob-undo').classList.add('vis');
}

function obRm(id){
  delete ob.o[id];delete ob.skipped[id];ob.act=null;
  obRStrip();obUHarm();obUShop();obPG(id);
}

function obUndo(){
  if(!ob.hist.length)return;
  const last=ob.hist.pop();
  if(last.type==='skip')delete ob.skipped[last.g];
  else{if(last.col)ob.o[last.g]=last.col;else delete ob.o[last.g]}
  ob.act=null;
  document.getElementById('ob-pr').style.display='none';
  document.querySelectorAll('#ob-pal .ob-cc').forEach(ch=>{ch.classList.remove('perfect','good');ch.querySelector('.ob-sc').style.display='none'});
  obRStrip();obUHarm();obUShop();
  if(!ob.hist.length)document.getElementById('ob-undo').classList.remove('vis');
}

function obRPal(){
  const groups={};C.forEach((c,ci)=>{(groups[c.g]=groups[c.g]||[]).push({...c,ci})});
  const el=document.getElementById('ob-pal');el.innerHTML='';
  GORDER.forEach(gn=>{if(!groups[gn])return;const d=document.createElement('div');d.className='ob-pal-g';
    d.innerHTML=`<div class="ob-pal-gn">${gn}</div><div class="ob-pal-r">${groups[gn].map(c=>`<div class="ob-cc" style="background:${c.h}" data-ci="${c.ci}"><span class="ob-tip">${c.n}</span><span class="ob-sc"></span></div>`).join('')}</div>`;
    el.appendChild(d);
  });
  el.querySelectorAll('.ob-cc').forEach(ch=>{ch.addEventListener('click',()=>{
    if(!ob.act)return;
    const cObj=C[parseInt(ch.dataset.ci)];if(cObj)obPCol(cObj);
  })});
}

function obUHarm(){
  const cols=Object.values(ob.o),hero=document.getElementById('ob-harm');
  if(cols.length<2){
    hero.classList.add('empty');
    document.getElementById('ob-gt').className='ob-gauge-text empty-st';
    document.getElementById('ob-gt').innerHTML=cols.length===1?'Add<br>more':'Build<br>to score';
    document.getElementById('ob-gf').style.strokeDashoffset=251.3;
    document.getElementById('ob-ht').textContent=cols.length===1?'One piece selected':'Pick your first piece';
    document.getElementById('ob-hd').textContent='Tap a garment in the strip, then pick a colour.';
    return;
  }
  hero.classList.remove('empty');
  let t=0,p=0;for(let a=0;a<cols.length;a++)for(let b=a+1;b<cols.length;b++){t+=sc(cols[a],cols[b]).pct;p++}
  const avg=Math.round(t/p);
  document.getElementById('ob-gf').style.strokeDashoffset=251.3-(251.3*avg/100);
  document.getElementById('ob-gt').className='ob-gauge-text';
  document.getElementById('ob-gt').textContent=avg+'%';
  document.getElementById('ob-ht').textContent=avg>=85?'Excellent harmony':avg>=65?'Good harmony':'Bold contrast';
  document.getElementById('ob-hd').textContent=avg>=85?'These colours appear together across multiple documented Wada palettes. A considered, editorial combination.':avg>=65?'A cohesive combination with documented pairings. Confident without being safe.':'An unconventional pairing that creates visual tension. Deliberate, not accidental.';
}

function obUShop(){
  const entries=Object.entries(ob.o),sa=document.getElementById('ob-sa'),lk=document.getElementById('ob-lks');
  if(entries.length<1){sa.classList.remove('vis');lk.innerHTML='';return}
  sa.classList.add('vis');
  const all=Object.values(ob.o);
  document.getElementById('ob-sad').innerHTML=all.map(c=>`<div class="ob-shop-dot" style="background:${c.h}"></div>`).join('');
  document.getElementById('ob-sat').textContent=all.length+' pieces';
  document.getElementById('ob-sas').textContent=entries.map(([gid,c])=>c.n+' '+G.find(x=>x.id===gid).l).join(' · ');
  lk.innerHTML=entries.map(([gid,col])=>{const g=G.find(x=>x.id===gid);return`<a class="ob-link" href="/collections/${g.co}"><span class="ob-link-d" style="background:${col.h}"></span>${col.n} ${g.l} →</a>`}).join('');
}

// Expose to onclick handlers
window._obPG=obPG;window._obRm=obRm;window._obSkip=obSkip;window._obUndo=obUndo;

// ═══════════════════════════════════════
// EDITORIAL COLOUR MATCHER
// ═══════════════════════════════════════
function emInit(){
  const el=document.getElementById('cg-editorial-matcher');if(!el)return;
  el.innerHTML=`
    <div class="em-picker"><div class="em-swatch" id="em-sw" style="background:#1a3060;"><div class="em-sw-name" id="em-swn">Navy</div><div class="em-sw-hex" id="em-swh">#1A3060</div></div>
    <div class="em-story"><div class="em-story-ey">Colour Story</div><div class="em-story-t" id="em-st"></div><div class="em-story-body" id="em-sb"></div></div></div>
    <div class="em-pair-label">Documented pairings</div>
    <div class="em-pair-grid" id="em-pg"></div>
    <div class="em-browse" id="em-br"><div class="em-browse-label">Browse all colours</div></div>
  `;
  const browse=document.getElementById('em-br');
  C.forEach(c=>{
    const d=document.createElement('div');d.className='em-mini'+(c.n==='Navy'?' active':'');
    d.style.background=c.h;d.title=c.n;
    d.addEventListener('click',()=>emSelect(c));
    browse.appendChild(d);
  });
  emSelect(C.find(c=>c.n==='Navy'));
}

function emSelect(col){
  document.getElementById('em-sw').style.background=col.h;
  document.getElementById('em-swn').textContent=col.n;
  document.getElementById('em-swh').textContent=col.h.toUpperCase();
  const[L]=sL(col.h);
  document.getElementById('em-swn').style.color=L>55?'#1a1a18':'#fff';
  document.getElementById('em-swh').style.color=L>55?'rgba(26,26,24,0.5)':'rgba(255,255,255,0.7)';
  const story=STORIES[col.n]||{t:`${col.n} <em>in the wardrobe</em>`,b:`A colour with ${col.cb.length} documented combination${col.cb.length!==1?'s':''}. Click any pairing below to explore.`};
  document.getElementById('em-st').innerHTML=story.t;
  document.getElementById('em-sb').textContent=story.b;
  const scored=C.filter(c=>c.n!==col.n).map(c=>({...c,...sc(col,c)})).sort((a,b)=>b.pct-a.pct).slice(0,6);
  const notes=['A natural jacket-over-shirt pairing.','Try this as a trouser-shirt combination.','Best as a knitwear accent.','Strong as outerwear contrast.','Works in accessories — scarf, pocket square.','A subtle complement in tailoring.'];
  document.getElementById('em-pg').innerHTML=scored.map((m,i)=>`<div class="em-pair-card" onclick="window._emSel(${C.indexOf(C.find(x=>x.n===m.n))})"><div class="em-pair-swatches"><div class="em-pair-sw-l" style="background:${col.h}"></div><div class="em-pair-sw-r" style="background:${m.h}"></div></div><div class="em-pair-body"><div class="em-pair-name">${m.n}</div><div class="em-pair-tier ${m.tier}">${m.tier==='perfect'?'Perfect match':'Good match'} · ${m.pct}%</div><div class="em-pair-note">${notes[i]||''}</div></div></div>`).join('');
  document.querySelectorAll('.em-mini').forEach(m=>m.classList.remove('active'));
  const mini=[...document.querySelectorAll('.em-mini')].find(m=>m.title===col.n);if(mini)mini.classList.add('active');
}
window._emSel=function(ci){emSelect(C[ci])};

// ─── TAB SWITCHING ───
function initTabs(){
  document.querySelectorAll('.cg-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.cg-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.cg-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.panel).classList.add('active');
    });
  });
}

// ─── BOOT ───
document.addEventListener('DOMContentLoaded',()=>{
  initTabs();obInit();emInit();
});

})();
