/* ═══════════════════════════════════════════════════════
   TRG COLOUR ENGINE — Shared data for colour guide + PDP
   Single source of truth: change here, both pages update.
   ═══════════════════════════════════════════════════════ */
(function(){
'use strict';

// ─── GARMENT ICONS (v20 filled-path SVGs) ───
var IC={
  shirt:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3l3-1 3 1 3 4-2 2v11H8V9L6 7l3-4z"/></svg>',
  trousers:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8l-1 6 2 12h-4l-1-7-1 7H7l2-12-1-6z"/></svg>',
  knitwear:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l2-2h4l2 2 3 4-2 2v10H7V10L5 8l3-4z"/></svg>',
  knit:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4l2-2h4l2 2 3 4-2 2v10H7V10L5 8l3-4z"/></svg>',
  jacket:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3l4-1 4 1 2 4-2 2v11h-3v-7h-2v7H8V9L6 7l2-4z"/></svg>',
  coat:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 2h6l3 4-1 15h-4v-8h-2v8H7L6 6l3-4z"/></svg>',
  shoes:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 16c2 0 4-1 5-3l2 1c2 1 4 2 7 2 1 0 2 1 2 2v2H4z"/></svg>'
};

// ─── SLOT CONFIG ───
var SLOT_ORDER=['shirt','trousers','knitwear','jacket','coat','shoes'];
var SLOT_SHORT={shirt:'Shirt',trousers:'Trousers',knitwear:'Knit',jacket:'Jacket',coat:'Coat',shoes:'Shoes'};

// ─── GARMENT CONFIG (id, display label, collection handle) ───
var G=[
  {id:'shirt',l:'Shirt',co:'shirts'},
  {id:'trousers',l:'Trousers',co:'trousers'},
  {id:'knitwear',l:'Knit',co:'knitwear'},
  {id:'jacket',l:'Jacket',co:'jackets'},
  {id:'coat',l:'Coat',co:'outerwear'},
  {id:'shoes',l:'Shoes',co:'footwear'}
];

// ─── SLOT RECOMMENDATIONS ───
var SLOT_RECS={
  shirt:{pool:['White','Off-White','Cream','Ivory','Powder Blue','Sky Blue','Chambray','Oatmeal','Ecru','Light Grey','Cement','Salmon','Rose','Soft Pink'],hint:'Lighter tones near the face'},
  trousers:{pool:['Charcoal','Navy','Slate','Khaki','Olive','Stone','Smoke','Denim','Graphite','Dark Navy','Taupe','Sand'],hint:'Grounding neutrals and mid-tones'},
  knitwear:{pool:['Burgundy','Rust','Teal','Forest','Cobalt','Mustard','Terracotta','Plum','Emerald','Copper','Jade','Wine','Ochre','Moss','Carmine','Cerulean'],hint:'Rich tones that add depth'},
  jacket:{pool:['Navy','Charcoal','Camel','Olive','Slate','Dark Navy','Hunter','Graphite','Chocolate','Saddle Brown','Denim'],hint:'The anchor piece'},
  coat:{pool:['Camel','Charcoal','Navy','Black','Chocolate','Dark Navy','Espresso','Graphite','Olive'],hint:'Broad strokes, outermost layer'},
  shoes:{pool:['Saddle Brown','Cognac','Chocolate','Black','Espresso','Tobacco','Tan','Oxblood'],hint:'Leathers and darks'},
};

// ─── COLOUR FAMILIES (display order) ───
var GORDER=['Whites & Creams','Sand & Khaki','Browns','Greens','Blues','Greys','Reds & Burgundy','Mauves'];

// ─── 65 SCORED MENSWEAR COLOURS ───
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
  var r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;
  r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92;g=g>.04045?Math.pow((g+.055)/1.055,2.4):g/12.92;b=b>.04045?Math.pow((b+.055)/1.055,2.4):b/12.92;
  var x=(r*.4124564+g*.3575761+b*.1804375)/.95047,y=(r*.2126729+g*.7151522+b*.072175)/1,z=(r*.0193339+g*.119192+b*.9503041)/1.08883;
  var f=function(t){return t>.008856?Math.pow(t,1/3):(903.3*t+16)/116;};
  return[116*f(y)-16,500*(f(x)-f(y)),200*(f(y)-f(z))];
}
function dE(a,b){var A=sL(a),B=sL(b);return Math.sqrt(Math.pow(A[0]-B[0],2)+Math.pow(A[1]-B[1],2)+Math.pow(A[2]-B[2],2));}
function sc(a,b){
  var s=0;for(var i=0;i<a.cb.length;i++){if(b.cb.indexOf(a.cb[i])>=0)s++;}
  if(s>=3)return{pct:Math.min(97,82+s*4),tier:'perfect'};
  if(s>=1)return{pct:62+s*10,tier:'good'};
  return{pct:Math.max(18,Math.round(52-(dE(a.h,b.h)/120)*30)),tier:'care'};
}
function near(hex){var b=null,bd=Infinity;C.forEach(function(c){var d=dE(hex,c.h);if(d<bd){bd=d;b=c;}});return b;}

// ─── FAMILIES (computed from C) ───
var FAMILIES=GORDER.map(function(gn){return{name:gn,colors:C.filter(function(c){return c.g===gn;})};});

// ─── Name-to-Hex lookup (for colour guide backwards compat) ───
var CH={};
C.forEach(function(c){CH[c.n]=c.h;});

// ─── Export ───
window.TRG_CG={C:C,CH:CH,sL:sL,dE:dE,sc:sc,near:near,IC:IC,G:G,GORDER:GORDER,FAMILIES:FAMILIES,SLOT_ORDER:SLOT_ORDER,SLOT_SHORT:SLOT_SHORT,SLOT_RECS:SLOT_RECS};

})();
