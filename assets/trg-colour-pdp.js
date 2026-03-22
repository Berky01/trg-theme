/* ═══════════════════════════════════════════════════════
   TRG COLOUR GUIDE — PDP "Complete the Look" Engine
   Phase 1: collection links (no Storefront API)
   ═══════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ─── 75 MENSWEAR COLOURS ─── */
var C=[
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
{n:"Mustard",h:"#c8a030",cb:[23,41,56,79,116,134,199,232,291],g:"Sand & Khaki"},
{n:"Ochre",h:"#b89028",cb:[3,13,33,70,86,130,131,182,247],g:"Sand & Khaki"},
{n:"Amber",h:"#d09030",cb:[23,41,56,79,116,134,199,232,234,291],g:"Sand & Khaki"},
{n:"Copper",h:"#b06828",cb:[3,13,33,70,86,130,131,182,243,247],g:"Browns"},
{n:"Raw Sienna",h:"#b86000",cb:[3,13,33,70,86,130,131,182,243,247,252,255,268,269,279,293,298,319,327],g:"Browns"},
{n:"Terracotta",h:"#c06848",cb:[40,85,198,242,244,263,285,286],g:"Browns"},
{n:"Rust",h:"#a05030",cb:[40,85,198,242,244,263,285,286,297],g:"Browns"},
{n:"Burnt Orange",h:"#c85028",cb:[40,85,198,242,244,263,285,286],g:"Browns"},
{n:"Tobacco",h:"#7a5028",cb:[110,121,145,161,198,242,263,285,286],g:"Browns"},
{n:"Saddle Brown",h:"#8b6834",cb:[110,121,145,161,198,242],g:"Browns"},
{n:"Cognac",h:"#9a5a28",cb:[110,121,145,161,198,242,263,285],g:"Browns"},
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
{n:"Jade",h:"#48a078",cb:[14,30,42,102,132,140,176,211],g:"Greens"},
{n:"Turquoise",h:"#388888",cb:[14,30,42,102,132,140,144,176,211],g:"Greens"},
{n:"Sky Blue",h:"#a0c4d8",cb:[24,72,135,148,182,196,222],g:"Blues"},
{n:"Powder Blue",h:"#b0c8e0",cb:[24,72,135,148,182,196,222],g:"Blues"},
{n:"Chambray",h:"#7898b8",cb:[24,72,135,148,182,196,222,233],g:"Blues"},
{n:"Mid Blue",h:"#5a90b8",cb:[7,57,66,116,154,174,179,208,232],g:"Blues"},
{n:"Steel Blue",h:"#587890",cb:[7,57,66,116,154,174,179,208,232],g:"Blues"},
{n:"Denim",h:"#486888",cb:[7,57,66,116,154,174,179,208,232,260],g:"Blues"},
{n:"Cerulean",h:"#4880c0",cb:[17,39,69,109,155,210,272,302,325],g:"Blues"},
{n:"Blue",h:"#3464a8",cb:[7,57,66,116,154,174,179,208,232,260,291,292,303],g:"Blues"},
{n:"Cobalt",h:"#2860a0",cb:[10,55,82,94,152,198,242,252,280,298,336],g:"Blues"},
{n:"Royal Blue",h:"#2a50b0",cb:[10,55,82,94,152,198,242,252,280,298],g:"Blues"},
{n:"French Blue",h:"#4070b8",cb:[17,39,69,109,155,210,272,302],g:"Blues"},
{n:"Navy",h:"#1a3060",cb:[3,25,30,68,84,115,117,121,136,153,162,181,197,205,223,261,276,289,306,307,318,340],g:"Blues"},
{n:"Dark Navy",h:"#101e40",cb:[33,40,73,80,110,126,133,178,213,214,218,236,257,266,270,281],g:"Blues"},
{n:"Indigo",h:"#282858",cb:[33,40,73,80,110,126,133,178,213],g:"Blues"},
{n:"Cement",h:"#ccc8c0",cb:[10,47,55,69,95,113,122,129,160,175,212],g:"Greys"},
{n:"Light Grey",h:"#b8b4ac",cb:[10,47,55,69,95,113,122,129,160,175,212,219],g:"Greys"},
{n:"Silver",h:"#a8a8a0",cb:[10,47,55,69,95,113,122,129,160,175,212,219,256,265,283],g:"Greys"},
{n:"Pewter",h:"#909088",cb:[1,44,66,96,105,128,161,177,195,207],g:"Greys"},
{n:"Smoke",h:"#808078",cb:[1,44,66,96,105,128,161,177,195,207,219],g:"Greys"},
{n:"Slate",h:"#606060",cb:[1,44,66,96,105,128,161,177,195,207],g:"Greys"},
{n:"Charcoal",h:"#3a3a38",cb:[10,47,55,69,95,113,122,160,175,212,256],g:"Greys"},
{n:"Graphite",h:"#2a2a28",cb:[10,47,55,69,95,113,122,160,175,212],g:"Greys"},
{n:"Black",h:"#1a1a18",cb:[33,40,73,80,110,126,133,178,213,214,218,236,257,266,270,281,290,301,318,340],g:"Greys"},
{n:"Dusty Rose",h:"#c8a0a0",cb:[61,78,104,142,186,208,256,275,310],g:"Reds & Burgundy"},
{n:"Salmon",h:"#d88878",cb:[61,78,104,142,186,208,256,275,310],g:"Reds & Burgundy"},
{n:"Rose",h:"#c07080",cb:[61,78,104,142,186,208,275],g:"Reds & Burgundy"},
{n:"Brick",h:"#8c3828",cb:[40,85,198,242,244,263,285,286,297],g:"Reds & Burgundy"},
{n:"Carmine",h:"#7a2030",cb:[40,85,198,244,263,285,286],g:"Reds & Burgundy"},
{n:"Burgundy",h:"#5c1828",cb:[78,104,142,186,208,275,310,328],g:"Reds & Burgundy"},
{n:"Oxblood",h:"#4a1020",cb:[78,104,142,186,208,275],g:"Reds & Burgundy"},
{n:"Wine",h:"#6a1830",cb:[78,104,142,186,208,275,310],g:"Reds & Burgundy"},
{n:"Fawn",h:"#c8a898",cb:[47,55,69,95,113,122,160,175],g:"Mauves"},
{n:"Soft Pink",h:"#d8b8b8",cb:[61,78,104,142,186,256,275,310],g:"Mauves"},
{n:"Mauve",h:"#a07888",cb:[61,78,104,142,186,256,275],g:"Mauves"},
{n:"Lavender",h:"#9898c0",cb:[17,39,69,109,155,210,272],g:"Mauves"},
{n:"Lilac Grey",h:"#a098a8",cb:[47,55,69,95,113,160,175,212],g:"Mauves"},
{n:"Plum",h:"#583050",cb:[78,104,142,186,208,275,310,328],g:"Mauves"}
];

/* ─── GARMENT CONFIG ─── */
var G=[
{id:'shirt',l:'Shirt',ls:'Shirt',co:'shirts',ic:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 2l-4 4 3 2V18h10V8l3-2-4-4"/><path d="M6 2c0 2 2 3 4 3s4-1 4-3"/></svg>'},
{id:'trousers',l:'Trousers',ls:'Pants',co:'trousers',ic:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 2h10v3l-1 13H11l-1-9-1 9H6L5 5z"/><line x1="5" y1="5" x2="15" y2="5"/></svg>'},
{id:'knitwear',l:'Knitwear',ls:'Knit',co:'knitwear',ic:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 5h10v12H5z"/><path d="M5 8h10"/><path d="M2 5h3v6H2"/><path d="M15 5h3v6h-3"/><path d="M7 3h6v2H7z"/></svg>'},
{id:'jacket',l:'Jacket',ls:'Jacket',co:'jackets',ic:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M5 3h10l1.5 5V17H3.5V8z"/><path d="M8 3l2 4 2-4"/><line x1="10" y1="7" x2="10" y2="17"/></svg>'},
{id:'coat',l:'Coat',ls:'Coat',co:'outerwear',ic:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 2h8l2 6v10H4V8z"/><path d="M9 2l1 4 1-4"/><line x1="10" y1="6" x2="10" y2="18"/></svg>'},
{id:'shoes',l:'Shoes',ls:'Shoes',co:'footwear',ic:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M2 14h16v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z"/><path d="M4 14V9a3 3 0 013-3h0a3 3 0 013 3v1l8 4"/></svg>'}
];
var GORD=['Blues','Greys','Greens','Sand & Khaki','Browns','Whites & Creams','Reds & Burgundy','Mauves'];

/* ─── SCORING ─── */
function sL(hex){var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92;g=g>.04045?Math.pow((g+.055)/1.055,2.4):g/12.92;b=b>.04045?Math.pow((b+.055)/1.055,2.4):b/12.92;var x=(r*.4124564+g*.3575761+b*.1804375)/.95047,y=(r*.2126729+g*.7151522+b*.072175)/1,z=(r*.0193339+g*.119192+b*.9503041)/1.08883;var f=function(t){return t>.008856?Math.pow(t,1/3):(903.3*t+16)/116};return[116*f(y)-16,500*(f(x)-f(y)),200*(f(y)-f(z))]}
function dE(a,b){var A=sL(a),B=sL(b);return Math.sqrt(Math.pow(A[0]-B[0],2)+Math.pow(A[1]-B[1],2)+Math.pow(A[2]-B[2],2))}
function sc(a,b){var s=0;for(var i=0;i<a.cb.length;i++){if(b.cb.indexOf(a.cb[i])>=0)s++}if(s>=3)return{pct:Math.min(97,82+s*4),tier:'perfect'};if(s>=1)return{pct:62+s*10,tier:'good'};return{pct:Math.max(18,Math.round(52-(dE(a.h,b.h)/120)*30)),tier:'atg'}}
function near(hex){var b=null,bd=999;for(var i=0;i<C.length;i++){var d=dE(hex,C[i].h);if(d<bd){bd=d;b=C[i]}}return b}

/* ─── COLOUR NAME DETECTION ─── */
var ALIAS={'coal':'Charcoal','army':'Olive','army green':'Olive','army olive':'Olive',
'beech green':'Sage','dark green':'Forest','dark blue':'Navy','midnight':'Dark Navy',
'grey':'Pewter','gray':'Pewter','heather grey':'Silver','marled grey':'Pewter',
'light gray':'Light Grey','dark grey':'Charcoal','dark gray':'Charcoal',
'brown':'Saddle Brown','dark brown':'Chocolate','light brown':'Tan',
'red':'Brick','dark red':'Burgundy','wine red':'Wine',
'pink':'Dusty Rose','purple':'Plum','gold':'Amber','natural':'Cream',
'bone':'Ivory','off white':'Off-White','offwhite':'Off-White','eggshell':'Cream',
'maroon':'Burgundy','crimson':'Carmine','scarlet':'Carmine','clay':'Terracotta',
'mocha':'Tobacco','walnut':'Cognac','chestnut':'Cognac','mahogany':'Oxblood',
'marine':'Navy','midnight blue':'Dark Navy','cobalt blue':'Cobalt',
'sky':'Sky Blue','ocean':'Steel Blue','cornflower':'French Blue',
'moss':'Olive','pine':'Forest','fern':'Sage','seafoam':'Mint',
'wheat':'Sand','desert':'Sand','pebble':'Stone','fog':'Cement','ash':'Silver',
'carbon':'Graphite','jet':'Black','onyx':'Black','raven':'Black',
'oxblood':'Oxblood','burgundy':'Burgundy','cordovan':'Oxblood',
'caramel':'Camel','butterscotch':'Amber','honey':'Amber',
'heather gray':'Silver','light grey melange':'Silver','speckled grey':'Silver',
'beige':'Biscuit','light beige':'Cream','dark beige':'Tan','multi':'Navy','multicolor':'Navy','multicolour':'Navy',
'rinse':'Indigo','rinse wash':'Indigo','light wash':'Denim','dark wash':'Dark Navy','raw denim':'Indigo',
'khaki green':'Olive','military':'Olive','military green':'Olive',
'oat':'Oatmeal','linen':'Cream','flax':'Cream','chalk':'White','snow':'White','pearl':'Ivory'};

function detectColour(name){
  if(!name)return null;
  var lo=name.toLowerCase().trim();
  // Exact match
  for(var i=0;i<C.length;i++){if(C[i].n.toLowerCase()===lo)return C[i]}
  // Alias
  if(ALIAS[lo]){for(var i=0;i<C.length;i++){if(C[i].n===ALIAS[lo])return C[i]}}
  // Partial: check if a palette name is contained in the input (prefer longer matches)
  var best=null,bestLen=0;
  for(var i=0;i<C.length;i++){
    var cn=C[i].n.toLowerCase();
    if(lo.indexOf(cn)>=0 && cn.length>bestLen){best=C[i];bestLen=cn.length}
  }
  if(best)return best;
  // Reverse: check if input is contained in a palette name
  for(var i=0;i<C.length;i++){if(C[i].n.toLowerCase().indexOf(lo)>=0)return C[i]}
  return null;
}

/* ─── GARMENT TYPE DETECTION ─── */
var TMAP={
  'shirts':'shirt','shirt':'shirt','camp shirt':'shirt','t-shirt':'shirt','t-shirts':'shirt',
  'pants':'trousers','trousers':'trousers','chino':'trousers','chinos':'trousers',
  'jeans':'trousers','denim':'trousers',
  'knitwear':'knitwear','sweater':'knitwear','sweaters':'knitwear','fleece':'knitwear',
  'hoodie':'knitwear','hoodies':'knitwear','sweatshirt':'knitwear','sweatshirts':'knitwear',
  'jacket':'jacket','jackets':'jacket','blazer':'jacket','blazers':'jacket','suit':'jacket',
  'coat':'coat','coats':'coat','outerwear':'coat','parka':'coat',
  'boot':'shoes','boots':'shoes','shoe':'shoes','shoes':'shoes',
  'footwear':'shoes','sneaker':'shoes','sneakers':'shoes'
};
function detectGarment(type){if(!type)return'shirt';var lo=type.toLowerCase().trim();return TMAP[lo]||null}

/* ─── PDP CONTROLLER ─── */
var CTL={
  el:null, garment:null, base:null, outfit:{}, active:null, hist:[], tip:null,

  init:function(el){
    this.el=el;
    var colName=el.dataset.colour||'';
    var gType=el.dataset.garment||'shirt';
    this.garment=gType;
    this.base=detectColour(colName);
    if(!this.base){this.el.classList.add('hidden');return}
    this.outfit={};this.outfit[gType]=this.base;
    this.active=null;this.hist=[];
    this.render();
    this.autoAdvance();
  },

  render:function(){
    var self=this;
    var inner=this.el.querySelector('.trg-ctl__inner');
    if(!inner)return;
    // Subtitle
    var gLabel=this.garmentLabel(this.garment);
    var sub=this.el.querySelector('.trg-ctl__sub');
    if(sub)sub.innerHTML='Build an outfit around your <strong>'+this.base.n+'</strong> '+gLabel.toLowerCase()+'.';

    // Strip
    this.renderStrip();
    // Palette
    this.renderPalette();
    // Bottom
    this.updateGauge();
    this.updateShop();
    this.updateReset();
  },

  garmentLabel:function(gid){for(var i=0;i<G.length;i++){if(G[i].id===gid)return G[i].l}return''},

  renderStrip:function(){
    var self=this;
    var wrap=this.el.querySelector('.trg-ctl__strip');
    if(!wrap)return;
    var picking=!!this.active;
    wrap.className='trg-ctl__strip'+(picking?' picking':'');
    var html='';
    for(var i=0;i<G.length;i++){
      var g=G[i], col=this.outfit[g.id], isLocked=(g.id===this.garment), isActive=(g.id===this.active);
      var cls='trg-ctl__slot';
      if(isLocked)cls+=' locked filled';
      else if(col)cls+=' filled';
      if(isActive)cls+=' active';
      html+='<div class="'+cls+'" data-gid="'+g.id+'">';
      html+='<span class="trg-ctl__slot-icon">'+g.ic+'</span>';
      var mob=window.innerWidth<=749;html+='<span class="trg-ctl__slot-label">'+(mob&&g.ls?g.ls:g.l)+'</span>';
      if(col){
        html+='<span class="trg-ctl__slot-dot" style="background:'+col.h+(col.n==='White'?';border-color:rgba(0,0,0,0.15)':'')+'"></span>';
        if(!isLocked){
          var s=sc(this.base,col);
          html+='<span class="trg-ctl__slot-pct" style="color:'+(s.tier==='perfect'?'#c4562a':s.tier==='good'?'#3d8c5e':'#8a8478')+'">'+s.pct+'%</span>';
          html+='<span class="trg-ctl__slot-rm" data-rm="'+g.id+'">&times;</span>';
        } else {
          html+='<span class="trg-ctl__slot-lock">This item</span>';
        }
      }
      html+='</div>';
    }
    html+='<button class="trg-ctl__skip" id="trg-ctl-skip">Skip \u203A</button>';
    wrap.innerHTML=html;
    // Bind
    wrap.querySelectorAll('.trg-ctl__slot:not(.locked)').forEach(function(s){
      s.addEventListener('click',function(e){
        if(e.target.closest('.trg-ctl__slot-rm')){
          var rmGid=e.target.closest('.trg-ctl__slot-rm').dataset.rm;
          self.remove(rmGid);return;
        }
        self.selectGarment(s.dataset.gid);
      });
    });
    var skipBtn=wrap.querySelector('#trg-ctl-skip');
    if(skipBtn)skipBtn.addEventListener('click',function(){self.skip()});
  },

  renderPalette:function(){
    var self=this;
    var pw=this.el.querySelector('.trg-ctl__palette-wrap');
    if(!pw)return;
    if(!this.active){pw.classList.remove('vis');return}
    pw.classList.add('vis');
    // Prompt
    var prompt=pw.querySelector('.trg-ctl__palette-prompt');
    if(prompt)prompt.textContent='Choose a colour for your '+this.garmentLabel(this.active);
    // Undo
    var undo=pw.querySelector('.trg-ctl__undo');
    if(undo)undo.classList.toggle('vis',this.hist.length>0);

    // Build chips by group
    var palEl=pw.querySelector('.trg-ctl__chips-area');
    if(!palEl)return;
    var html='';var lastG='';
    for(var gi=0;gi<GORD.length;gi++){
      var grp=GORD[gi];
      html+='<div class="trg-ctl__grp-label">'+grp+'</div><div class="trg-ctl__chips">';
      for(var ci=0;ci<C.length;ci++){
        var c=C[ci];if(c.g!==grp)continue;
        var s=sc(this.base,c);
        // Also score against all already-chosen colours
        var allPcts=[s.pct],allTier=s.tier;
        for(var gid in this.outfit){
          if(gid===this.garment)continue;
          var s2=sc(this.outfit[gid],c);
          allPcts.push(s2.pct);
          if(s2.tier==='perfect'&&allTier!=='perfect')allTier='perfect';
          if(s2.tier==='good'&&allTier==='atg')allTier='good';
        }
        var avgPct=Math.round(allPcts.reduce(function(a,b){return a+b},0)/allPcts.length);
        var border='';
        if(c.n==='White')border='border:1px solid rgba(0,0,0,0.12);';
        html+='<div class="trg-ctl__chip '+allTier+'" data-ci="'+ci+'" style="background:'+c.h+';'+border+'" title="'+c.n+' ('+avgPct+'%)">';
        html+='<span class="trg-ctl__chip-score">'+avgPct+'%</span>';
        html+='</div>';
      }
      html+='</div>';
    }
    palEl.innerHTML=html;
    // Bind chips
    palEl.querySelectorAll('.trg-ctl__chip').forEach(function(ch){
      ch.addEventListener('click',function(){self.pickColour(parseInt(ch.dataset.ci))});
      ch.addEventListener('mouseenter',function(e){self.showTip(e,C[parseInt(ch.dataset.ci)])});
      ch.addEventListener('mouseleave',function(){self.hideTip()});
    });
  },

  selectGarment:function(gid){
    if(gid===this.garment)return;// can't change locked
    this.active=gid;
    this.renderStrip();
    this.renderPalette();
  },

  pickColour:function(ci){
    if(!this.active)return;
    var col=C[ci];
    this.hist.push({gid:this.active,prev:this.outfit[this.active]||null});
    this.outfit[this.active]=col;
    this.renderStrip();
    this.updateGauge();
    this.updateShop();
    this.updateReset();
    this.autoAdvance();
  },

  autoAdvance:function(){
    // Find next empty slot
    for(var i=0;i<G.length;i++){
      if(!this.outfit[G[i].id]){
        this.active=G[i].id;
        this.renderStrip();
        this.renderPalette();
        return;
      }
    }
    // All filled
    this.active=null;
    this.renderStrip();
    this.renderPalette();
  },

  skip:function(){
    if(!this.active)return;
    this.hist.push({gid:this.active,prev:this.outfit[this.active]||null,skipped:true});
    // Move to next empty
    var start=false;
    for(var i=0;i<G.length;i++){
      if(G[i].id===this.active)start=true;
      else if(start && !this.outfit[G[i].id]){
        this.active=G[i].id;
        this.renderStrip();
        this.renderPalette();
        return;
      }
    }
    // Wrap around
    for(var i=0;i<G.length;i++){
      if(!this.outfit[G[i].id] && G[i].id!==this.active){
        this.active=G[i].id;
        this.renderStrip();
        this.renderPalette();
        return;
      }
    }
    this.active=null;
    this.renderStrip();
    this.renderPalette();
  },

  remove:function(gid){
    if(gid===this.garment)return;
    this.hist.push({gid:gid,prev:this.outfit[gid]||null});
    delete this.outfit[gid];
    this.active=gid;
    this.renderStrip();
    this.renderPalette();
    this.updateGauge();
    this.updateShop();
    this.updateReset();
  },

  undo:function(){
    if(!this.hist.length)return;
    var last=this.hist.pop();
    if(last.skipped){
      this.active=last.gid;
    } else if(last.prev){
      this.outfit[last.gid]=last.prev;
      this.active=last.gid;
    } else {
      delete this.outfit[last.gid];
      this.active=last.gid;
    }
    this.renderStrip();this.renderPalette();this.updateGauge();this.updateShop();this.updateReset();
  },

  reset:function(){
    var base=this.base,gar=this.garment;
    this.outfit={};this.outfit[gar]=base;
    this.active=null;this.hist=[];
    this.render();
    this.autoAdvance();
  },

  updateGauge:function(){
    var entries=[];for(var k in this.outfit)entries.push(this.outfit[k]);
    var el=this.el.querySelector('.trg-ctl__gauge');if(!el)return;
    var bottomBar=this.el.querySelector('.trg-ctl__bottom');
    var pctEl=el.querySelector('.trg-ctl__gauge-pct');
    var fillEl=el.querySelector('.trg-ctl__gauge-fill');
    if(entries.length<2){
      if(bottomBar)bottomBar.classList.add('empty');
      if(pctEl){pctEl.className='trg-ctl__gauge-pct empty';pctEl.textContent='\u2026'}
      if(fillEl)fillEl.style.strokeDashoffset='150.8';
      return;
    }
    if(bottomBar)bottomBar.classList.remove('empty');
    // Average pairwise scores
    var total=0,count=0;
    for(var i=0;i<entries.length;i++){
      for(var j=i+1;j<entries.length;j++){
        total+=sc(entries[i],entries[j]).pct;count++;
      }
    }
    var avg=Math.round(total/count);
    if(pctEl){pctEl.className='trg-ctl__gauge-pct';pctEl.textContent=avg+'%'}
    if(fillEl){var circ=150.8;fillEl.style.strokeDashoffset=circ-(circ*avg/100)}
  },

  updateShop:function(){
    var shopEl=this.el.querySelector('.trg-ctl__shop');if(!shopEl)return;
    var allBtn=this.el.querySelector('.trg-ctl__shop-all');
    var html='';var count=0;
    for(var i=0;i<G.length;i++){
      var g=G[i],col=this.outfit[g.id];
      if(!col)continue;count++;
      var isLocked=(g.id===this.garment);
      if(isLocked)continue;// don't show link for current product
      html+='<a class="trg-ctl__shop-link" href="/collections/'+g.co+'">';
      html+='<span class="trg-ctl__shop-link-dot" style="background:'+col.h+(col.n==='White'?';border-color:rgba(0,0,0,0.12)':'')+'"></span>';
      html+=col.n+' '+g.l+' \u2192</a>';
    }
    shopEl.innerHTML=html;
    // Dots summary
    var dotsEl=this.el.querySelector('.trg-ctl__dots');
    if(dotsEl){
      var dhtml='';
      for(var k in this.outfit){
        var c=this.outfit[k];
        dhtml+='<span class="trg-ctl__dot" style="background:'+c.h+(c.n==='White'?';border-color:rgba(0,0,0,0.12)':'')+'"></span>';
      }
      dotsEl.innerHTML=dhtml;
    }
    if(allBtn)allBtn.classList.toggle('vis',count>=3);
  },

  updateReset:function(){
    var btn=this.el.querySelector('.trg-ctl__reset');
    if(!btn)return;
    var hasFills=Object.keys(this.outfit).length>1;
    btn.classList.toggle('vis',hasFills);
  },

  showTip:function(e,col){
    if(!this.tip){
      this.tip=document.createElement('div');
      this.tip.className='trg-ctl__tip';
      document.body.appendChild(this.tip);
    }
    this.tip.textContent=col.n;
    this.tip.style.display='block';
    var r=e.target.getBoundingClientRect();
    this.tip.style.left=(r.left+r.width/2-this.tip.offsetWidth/2)+'px';
    this.tip.style.top=(r.top-28)+'px';
  },
  hideTip:function(){if(this.tip)this.tip.style.display='none'},

  /* ─── Variant change listener ─── */
  onVariantChange:function(colourName){
    var newCol=detectColour(colourName);
    if(!newCol)return;
    this.base=newCol;
    this.outfit={};this.outfit[this.garment]=newCol;
    this.active=null;this.hist=[];
    this.render();
    this.autoAdvance();
  }
};

/* ─── INIT ON DOM READY ─── */
function boot(){
  var el=document.getElementById('trg-ctl');
  if(!el)return;
  CTL.init(el);
  // Undo button
  var undoBtn=el.querySelector('.trg-ctl__undo');
  if(undoBtn)undoBtn.addEventListener('click',function(){CTL.undo()});
  // Reset button
  var resetBtn=el.querySelector('.trg-ctl__reset');
  if(resetBtn)resetBtn.addEventListener('click',function(){CTL.reset()});
  // Full Colour Guide link — shop-all goes to colour guide
  var shopAll=el.querySelector('.trg-ctl__shop-all');
  if(shopAll)shopAll.addEventListener('click',function(e){
    e.preventDefault();
    window.location.href='/pages/colour-guide';
  });
  // Listen for variant changes on PDP chips
  document.addEventListener('click',function(e){
    var chip=e.target.closest('.trg-pdp__chip');
    if(!chip)return;
    var parent=chip.closest('.trg-pdp__selector');
    if(!parent)return;
    var label=parent.querySelector('.trg-pdp__selector-label');
    if(!label)return;
    var labelText=label.textContent.toLowerCase();
    if(labelText.indexOf('color')>=0||labelText.indexOf('colour')>=0){
      CTL.onVariantChange(chip.dataset.value||chip.textContent.trim());
    }
  });
}

if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',boot)}
else{boot()}

/* Expose for external use */
window.trgCTL=CTL;
})();
