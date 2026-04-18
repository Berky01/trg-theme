/* TRG Colour Guide v21 */
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

const VALID_SIGNALS=['cool','neutral','warm'];
const SIGNAL_LABELS={cool:'Cool',neutral:'Neutral',warm:'Warm'};

let selDepth=null,selDepthGroup=null,answers={vein:null,metal:null,sun:null},undertone=null,activeProfile=null,shopIndexPayload=null,shopIndexLoaded=false;

function normalizeSignal(value){
  return VALID_SIGNALS.includes(value)?value:null;
}

function setStepError(id,message){
  const errorEl=document.getElementById(id);
  if(!errorEl)return;
  errorEl.textContent=message||'';
  errorEl.classList.toggle('show',Boolean(message));
}

function syncDepthSelection(){
  document.querySelectorAll('.depth-tile').forEach(tile=>{
    const depthData=DEPTHS.find(d=>d.id===tile.dataset.id);
    const selected=tile.dataset.id===selDepth;
    tile.classList.toggle('sel',selected);
    tile.setAttribute('role','radio');
    tile.setAttribute('tabindex','0');
    tile.setAttribute('aria-checked',selected?'true':'false');
    if(depthData){
      tile.setAttribute('aria-label',`${depthData.name}. ${depthData.desc}.`);
    }
  });
  document.getElementById('step1-next')?.classList.toggle('on',Boolean(selDepth));
}

function selectDepth(depthId){
  const depthData=DEPTHS.find(d=>d.id===depthId);
  if(!depthData)return;
  selDepth=depthData.id;
  selDepthGroup=depthData.group;
  setStepError('step1-error','');
  syncDepthSelection();
  persistGuideIntentState();
}

function syncQuizOptionA11y(){
  document.querySelectorAll('.quiz-opt').forEach(opt=>{
    const selected=answers[opt.dataset.q]===opt.dataset.signal;
    opt.setAttribute('role','radio');
    opt.setAttribute('tabindex','0');
    opt.setAttribute('aria-checked',selected?'true':'false');
  });
}

function selectQuizOption(opt){
  const q=opt?.dataset?.q;
  if(!q)return;
  document.querySelectorAll(`.quiz-opt[data-q="${q}"]`).forEach(o=>o.classList.remove('sel'));
  opt.classList.add('sel');
  answers[q]=normalizeSignal(opt.dataset.signal);
  setStepError('step2-error','');
  syncQuizOptionA11y();
  updateTally();
}

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
  // Step 1: skin tones -> horizontal palette chips
  const v1 = document.getElementById('hiw-v1');
  const chipColors = ['Teal','Burgundy','Camel','Navy','Rust','Sage'];
  v1.innerHTML = `
    <span class="hiw-visual-title">Skin tone to palette</span>
    <div class="hiw-v1-flow">
      <div class="hiw-v1-tones">
        <div class="hiw-v1-skin" style="background:${DEPTHS[1].color};width:32px;height:32px;z-index:3"></div>
        <div class="hiw-v1-skin active" style="background:${DEPTHS[3].color};width:44px;height:44px;z-index:4"></div>
        <div class="hiw-v1-skin" style="background:${DEPTHS[5].color};width:36px;height:36px;z-index:2"></div>
      </div>
      <div class="hiw-v1-arrow"><svg width="24" height="12" viewBox="0 0 24 12" fill="none"><path d="M0 6h20m0 0l-4-4m4 4l-4 4" stroke="rgba(245,241,235,.48)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="hiw-v1-chips">
        ${chipColors.map(name => `<div class="hiw-v1-chip" style="background:${C[name]}"></div>`).join('')}
      </div>
    </div>
  `;

  // Step 2: garment silhouettes with colour assignment (icons from outfit builder)
  const outfitVis = document.getElementById('hiw-outfit-vis');
  const obIcons = {
    shirt: '<svg viewBox="0 0 512 512"><path d="M290.293,256.534h-0.086c-4.427,0-7.974,3.589-7.974,8.017s3.632,8.017,8.06,8.017s8.017-3.589,8.017-8.017S294.72,256.534,290.293,256.534z"/><path d="M290.378,376.251h-0.086c-4.427,0-7.974,3.589-7.974,8.017c0,4.427,3.632,8.017,8.06,8.017c4.427,0,8.017-3.589,8.017-8.017C298.395,379.84,294.806,376.251,290.378,376.251z"/><path d="M290.293,196.676h-0.086c-4.427,0-7.974,3.589-7.974,8.017s3.632,8.017,8.06,8.017s8.017-3.589,8.017-8.017S294.72,196.676,290.293,196.676z"/><path d="M290.293,316.393h-0.086c-4.427,0-7.974,3.589-7.974,8.017s3.632,8.017,8.059,8.017s8.017-3.589,8.017-8.017S294.72,316.393,290.293,316.393z"/><path d="M477.626,386.505l-7.437-275.179c-0.656-24.286-16.47-46.094-39.349-54.266L346.71,27.014L331.082,3.57c-1.281-1.921-3.326-3.196-5.615-3.5c-0.352-0.047-0.703-0.062-1.055-0.062V0H187.593v0.008c-0.351,0-0.702,0.015-1.055,0.062c-2.289,0.304-4.335,1.58-5.615,3.5l-15.628,23.443L81.161,57.061c-22.879,8.172-38.692,29.979-39.348,54.265l-7.437,275.179c-0.186,6.894,3.927,13.158,10.275,15.764l-1.52,26.598c-0.415,7.243,3.862,13.844,10.641,16.428l48.875,18.625c0.309,7.195,5.258,13.429,12.269,15.298l121.92,32.513c0.681,0.181,1.375,0.27,2.065,0.27c1.57,0,3.122-0.462,4.453-1.35c1.917-1.281,3.19-3.323,3.494-5.607l9.156-68.669l9.155,68.669c0.305,2.284,1.578,4.327,3.494,5.607c1.917,1.279,4.291,1.673,6.518,1.08l121.926-32.514c7.01-1.869,11.96-8.104,12.269-15.3l48.866-18.621c6.779-2.583,11.056-9.185,10.641-16.427l-1.52-26.598C473.699,399.664,477.813,393.4,477.626,386.505z M331.972,33.81L297.05,89.683c-0.034,0.056-0.127,0.203-0.362,0.244c-0.237,0.042-0.372-0.068-0.423-0.109l-27.773-22.219l54.32-47.53L331.972,33.81z M189.194,20.068l54.32,47.53l-27.773,22.219c-0.051,0.041-0.186,0.151-0.423,0.109c-0.236-0.041-0.328-0.187-0.363-0.244L180.033,33.81L189.194,20.068z M102.616,446.75l-43.135-16.437c-0.219-0.083-0.357-0.296-0.343-0.53l1.233-21.594l42.245,15.846V446.75z M247.987,375.192h-0.001l-15.827,118.696l-113.111-30.163c-0.234-0.062-0.398-0.275-0.398-0.516V153.386c0-4.427-3.589-8.017-8.017-8.017c-4.427,0-8.017,3.589-8.017,8.017v253.524l-51.867-19.457c-0.214-0.08-0.353-0.286-0.346-0.515l7.437-275.179c0.479-17.722,12.019-33.636,28.714-39.599l80.558-28.771l34.245,54.793c2.503,4.006,6.61,6.759,11.267,7.552c0.924,0.157,1.852,0.235,2.778,0.235c3.736,0,7.398-1.265,10.354-3.63l22.23-17.784V375.192z M256.003,57.222L208.93,16.033h94.146L256.003,57.222z M452.521,430.312l-43.11,16.428l0.022-22.724l42.197-15.829l1.234,21.595C452.878,430.016,452.739,430.229,452.521,430.312z M461.253,387.454l-51.803,19.432l0.248-253.492c0.004-4.427-3.582-8.02-8.009-8.024c-0.002,0-0.005,0-0.007,0c-4.424,0-8.012,3.584-8.017,8.009l-0.302,309.829c0,0.242-0.164,0.454-0.397,0.515l-113.119,30.165l-15.827-118.711V84.554l22.23,17.784c2.957,2.365,6.619,3.63,10.354,3.63c0.925,0,1.853-0.078,2.778-0.235c4.657-0.793,8.764-3.545,11.267-7.551l34.245-54.793l80.555,28.77c16.696,5.963,28.235,21.877,28.714,39.599l7.437,275.179C461.605,387.167,461.466,387.373,461.253,387.454z"/><path d="M213.247,145.37h-68.409c-4.427,0-8.017,3.589-8.017,8.017v59.858c0,13.851,11.268,25.119,25.119,25.119h34.205c13.851,0,25.119-11.268,25.119-25.119v-59.858C221.264,148.959,217.674,145.37,213.247,145.37z M205.23,213.244c0,5.01-4.076,9.086-9.086,9.086H161.94c-5.01,0-9.086-4.076-9.086-9.086v-19.345c2.82,1.099,5.882,1.708,9.086,1.708h34.205c3.203,0,6.266-0.609,9.086-1.708V213.244z M205.23,170.489c0,5.01-4.076,9.086-9.086,9.086H161.94c-5.01,0-9.086-4.076-9.086-9.086v-9.086h52.376V170.489z"/><circle cx="290.205" cy="144.835" r="8.017"/></svg>',
    trousers: '<svg viewBox="0 0 512 512"><path d="M300.27,0h-16.165h-57.751H211.73H94.318v48.511v20.014V512h147.952L256,352.018L269.729,512h147.953V68.525V48.511V0H300.27z M227.128,15.398h57.744v37.729h-57.744V15.398z M109.716,15.398h101.239v37.729H109.716V15.398z M109.716,63.909h52.262c-0.443,23.015-7.676,44.202-18.632,59.518c-5.654,7.917-12.262,14.262-19.3,18.563c-4.639,2.835-9.443,4.706-14.33,5.714V63.909z M228.135,496.602H109.716V158.727c7.007-1.127,13.737-3.729,19.955-7.541c12.721-7.804,23.435-20.458,31.06-35.992c7.308-14.917,11.638-32.564,11.984-51.285h58.646v164.103h19.827L228.135,496.602z M242.143,217.23V63.909h27.714V217.23H242.143z M402.283,496.602h-118.42l-23.052-268.59h19.827V63.909h58.6c0.474,25.24,8.286,48.458,20.646,65.782c6.376,8.924,13.962,16.3,22.444,21.495c6.218,3.812,12.947,6.414,19.955,7.541V496.602z M402.283,147.705c-4.888-1.008-9.7-2.88-14.33-5.714c-10.556-6.443-20.143-17.518-27-31.533c-6.572-13.406-10.556-29.488-10.894-46.548h52.225V147.705z M402.283,53.127h-102.78V15.398h102.78V53.127z"/></svg>',
    knitwear: '<svg viewBox="-56.4 -56.4 512 512"><path d="M354.334,118.897c-11.729-51.721-25.311-75.372-25.311-75.372C301.385,18.658,256.984,1.211,254.81,0.351c-1.539-0.609-3.279-0.417-4.65,0.515c-0.379,0.258-11.037,10.668-50.561,10.668h-0.002l0,0c-39.627,0-50.223-10.439-50.561-10.668c-1.371-0.932-3.113-1.124-4.65-0.515C142.213,1.21,94.488,18.658,70.17,43.522c-0.762,0.779-13.578,23.654-25.307,75.375c-10.734,47.333-22.34,129.157-16.695,250.19v25.111c0,2.76,2.238,5,5,5h45.336c2.416,0,4.486-1.729,4.918-4.105l4.568-25.082l9.141-38.57c1.355,5.461,2.895,10.711,4.635,15.709l4.525,25.914c0.418,2.393,2.496,4.141,4.926,4.141H287.98c2.43,0,4.508-1.748,4.926-4.141l4.525-25.914c1.74-4.998,3.279-10.248,4.635-15.711l9.139,38.572l4.568,25.082c0.434,2.377,2.504,4.105,4.92,4.105h45.338c2.762,0,5-2.24,5-5v-25.111C376.676,248.054,365.068,166.23,354.334,118.897z M199.597,21.533L199.597,21.533h0.002c23.824,0,38.176-3.4,46.559-6.779c-5.727,15.147-24.424,26.286-46.559,26.286h-0.002l0,0c-22.135,0-40.832-11.139-46.557-26.286C161.424,18.133,175.773,21.533,199.597,21.533z M210.361,50.254l-10.764,11.517l-10.762-11.517c3.488,0.515,7.086,0.786,10.762,0.786l0,0h0.002C203.275,51.04,206.871,50.769,210.361,50.254z M74.332,389.199H38.168v-15.215h38.934L74.332,389.199z M94.793,126.687c-4.342,47.976-11.029,121.925-2.295,180.933L79.14,363.984H37.947c-5.066-116.893,6.127-196.08,16.498-242.118c8.771-38.941,18.416-61.26,22.438-69.556c6.85,3.216,20.727,12.565,20.727,35.573C97.609,95.57,96.367,109.302,94.793,126.687z M115.418,367.204l-2.842-16.287h174.045l-2.844,16.287H115.418z M296.705,306.87c-0.018,0.086-4.371,23.752-7.721,34.047H110.213c-3.35-10.291-7.703-33.963-7.723-34.06c-8.717-57.789-2.057-131.547,2.262-179.268c1.596-17.636,2.857-31.567,2.857-39.706c0-25.794-14.723-38.092-24.143-43.32c16.563-13.689,45.807-26.953,58.471-32.365c2.756,13.782,13.293,25.549,27.938,32.412l26.07,27.899c0.984,1.054,2.318,1.586,3.654,1.586c1.223,0,2.449-0.446,3.414-1.347c0.084-0.079,26.307-28.139,26.307-28.139c14.646-6.862,25.184-18.631,27.939-32.413c12.662,5.41,41.9,18.667,58.471,32.365c-9.42,5.228-24.141,17.527-24.141,43.321c0,8.139,1.26,22.068,2.855,39.704C298.765,175.311,305.426,249.077,296.705,306.87z M361.031,389.199h-36.166l-2.771-15.215h38.938V389.199z M361.25,363.984h-41.195l-13.355-56.367c8.736-59.006,2.047-132.956-2.295-180.93c-1.572-17.385-2.814-31.116-2.814-38.803c0-23.015,13.885-32.363,20.721-35.573C331.474,71.278,369.935,163.781,361.25,363.984z"/><path d="M70.082596,149.478455 C69.702080,146.744278 70.606667,145.171326 73.116547,145.016449 C74.548576,144.928085 75.705559,145.684616 76.240196,147.064331 C76.767677,148.425568 76.565308,149.798859 75.361557,150.673050 C73.449287,152.061798 71.639252,151.891800 70.082596,149.478455z"/><path d="M74.438972,120.043884 C71.822495,120.845673 70.183540,120.166626 69.575279,117.764030 C69.221466,116.366470 69.616684,115.086166 70.913124,114.330185 C72.327194,113.505615 73.842659,113.546974 75.032280,114.702530 C76.829582,116.448364 76.431229,118.224228 74.438972,120.043884z"/><path d="M106.211517,85.581131 C105.453415,83.033997 105.785034,81.219208 108.295639,80.586449 C109.666359,80.240990 110.987068,80.583397 111.808769,81.820763 C112.726364,83.202522 112.701675,84.740417 111.575928,85.943169 C109.940804,87.690102 108.129105,87.684341 106.211517,85.581131z"/></svg>',
    jacket: '<svg viewBox="0 0 512 512"><path d="M461.495,110.789c-0.564-24.267-15.596-45.503-38.297-54.099l-56.714-21.478c-10.13-17.101-25.558-26.183-35.546-30.54C324.031,1.659,315.639,0,307.307,0H204.694c-8.33,0-16.721,1.659-23.627,4.672c-9.938,4.335-25.263,13.345-35.394,30.281L88.696,56.658C66.061,65.281,51.071,86.5,50.508,110.716l-7.615,327.443c-0.158,6.802,3.781,12.931,10.035,15.612l49.667,21.293l-0.002,28.919c0,2.126,0.844,4.165,2.347,5.669c1.504,1.504,3.542,2.348,5.669,2.348h119.737c3.733,0,6.971-2.577,7.811-6.213L256,428.472l17.841,77.315c0.84,3.637,4.078,6.213,7.811,6.213h120.005c4.427,0,8.017-3.588,8.017-8.017l0.002-29.038l49.396-21.175c6.255-2.681,10.195-8.81,10.036-15.612L461.495,110.789z M313.181,16.591c-0.055-0.072-0.114-0.138-0.17-0.209c4.155,0.493,8.118,1.503,11.514,2.984c11.793,5.146,26.397,15.147,32.816,34.15l-26.321,6.58c-2.803,0.701-5.011,2.854-5.782,5.637c-0.771,2.783,0.015,5.767,2.058,7.809l21.495,21.492l-70.178,134.505l41.785-176.348C323.834,40.432,321.206,27.1,313.181,16.591z M211.56,26.325c4.997-6.539,12.583-10.291,20.813-10.291h47.254c8.23,0,15.815,3.752,20.811,10.291c1.849,2.421,3.232,5.084,4.137,7.88h-97.152C208.328,31.408,209.711,28.746,211.56,26.325z M187.479,19.367c3.395-1.482,7.358-2.492,11.511-2.984c-0.056,0.072-0.114,0.138-0.17,0.209c-8.025,10.507-10.653,23.84-7.217,36.599l41.78,176.336l-70.17-134.491l21.495-21.492c2.043-2.043,2.828-5.025,2.058-7.809c-0.771-2.783-2.98-4.937-5.782-5.637l-26.322-6.58C161.082,34.513,175.686,24.512,187.479,19.367z M247.984,391.91L223.97,495.967H118.627l0.02-325.478c0-4.427-3.588-8.017-8.017-8.017c-4.427,0-8.017,3.588-8.017,8.017l-0.018,287.133l-43.35-18.585c-0.202-0.087-0.329-0.284-0.324-0.504l7.615-327.443c0.41-17.671,11.349-33.156,27.867-39.448l43.131-16.431c-0.197,0.837-0.388,1.68-0.56,2.542c-0.839,4.196,1.765,8.312,5.917,9.35l20.467,5.117L147.716,87.86c-2.477,2.476-3.059,6.272-1.44,9.377l101.707,194.939V391.91z M255.999,255.441L207.38,50.238h97.243L255.999,255.441z M452.755,439.035l-43.077,18.466l0.018-287.013c0-4.427-3.588-8.017-8.017-8.017c-4.427,0-8.017,3.588-8.017,8.017l-0.02,325.478H288.031L264.017,391.9v-99.721L365.728,97.237c1.62-3.105,1.037-6.902-1.44-9.377l-15.643-15.641l20.467-5.117c4.152-1.038,6.757-5.153,5.917-9.35c-0.159-0.798-0.338-1.578-0.518-2.355l43.008,16.287c16.566,6.273,27.536,21.769,27.947,39.479l7.614,327.37C453.084,438.751,452.957,438.949,452.755,439.035z"/><path d="M369.98,385.313l-68.409-25.653c-4.146-1.555-8.767,0.546-10.321,4.691c-1.555,4.145,0.546,8.767,4.691,10.321l68.409,25.653c0.928,0.347,1.878,0.512,2.813,0.512c3.246,0,6.301-1.985,7.507-5.204C376.226,391.488,374.126,386.867,369.98,385.313z"/><path d="M220.751,364.352c-1.554-4.147-6.178-6.247-10.32-4.692l-68.409,25.653c-4.145,1.554-6.247,6.175-4.691,10.321c1.207,3.218,4.262,5.204,7.507,5.204c0.935,0,1.887-0.165,2.813-0.512l68.409-25.653C220.204,373.119,222.306,368.498,220.751,364.352z"/><path d="M273.096,68.409h-34.198c-4.427,0-8.017,3.589-8.017,8.017s3.589,8.017,8.017,8.017h34.198c4.427,0,8.017-3.589,8.017-8.017S277.524,68.409,273.096,68.409z"/></svg>',
    shoes: '<svg viewBox="10 -80 412 412"><path d="M433.000000,158.531586 C431.035950,161.295563 428.775726,163.085602 425.952271,164.370819 C396.323669,177.857346 365.295074,186.334625 333.016144,190.149307 C313.594788,192.444489 294.141022,191.508896 274.710938,189.730255 C257.657257,188.169144 240.596161,186.674057 223.523438,185.340378 C201.474960,183.617996 179.413055,182.065582 157.353531,180.487488 C153.036972,180.178696 148.690323,180.243423 144.384781,179.843002 C141.176544,179.544632 140.410187,180.927536 140.313568,183.840210 C140.095215,190.423386 139.094086,191.338470 132.635834,191.343460 C98.815620,191.369629 64.995361,191.373215 31.175156,191.344193 C24.898457,191.338806 23.533651,190.065292 23.661030,183.630798 C23.887873,172.171936 22.602448,160.673111 24.656534,149.251740 C25.233097,146.045868 23.741598,143.014038 22.695303,140.069656 C19.057573,129.832657 18.986727,119.510651 21.747341,109.135124 C25.762659,94.043915 28.682236,78.615524 35.467838,64.363998 C38.867626,57.223564 40.741627,56.452984 47.742649,60.262291 C67.371788,70.942642 87.932777,77.682747 110.670349,76.932274 C127.817635,76.366302 142.890701,70.749115 156.304092,60.333675 C165.398178,53.272156 173.615097,45.201962 181.831848,37.177990 C186.346664,32.769100 190.753113,31.794483 196.701950,33.976471 C222.415649,43.408047 245.809937,56.962593 267.795776,73.118736 C269.943024,74.696617 272.100983,76.259888 274.250061,77.835281 C276.026459,79.137459 278.135010,80.675873 278.227539,82.775635 C278.548615,90.060577 284.290375,92.066895 289.278076,94.774483 C302.501190,101.952698 316.050476,108.711792 331.196198,110.235840 C343.920319,111.516205 356.791473,111.371590 369.600372,111.764107 C383.481964,112.189507 397.109375,113.696922 410.148438,119.046692 C416.459290,121.635956 421.693481,125.217682 424.355072,131.543045 C425.985443,135.417633 429.823914,136.190048 432.713501,138.814331 C433.000000,145.354401 433.000000,151.708786 433.000000,158.531586 M204.012543,51.795750 C204.335022,51.026627 204.761993,50.204796 204.205246,49.431545 C201.025665,45.015575 191.242783,44.000225 187.177032,47.703651 C182.129318,52.301556 177.178329,57.005676 172.129944,61.602848 C147.276093,84.235344 118.474487,92.581810 85.374405,85.745987 C72.738159,83.136360 60.831299,78.453346 48.998020,73.553871 C44.935692,71.871887 43.132870,72.745613 41.843182,76.974113 C38.494438,87.953682 34.384071,98.705368 32.530563,110.107788 C30.804329,120.727257 30.023449,131.254974 34.171860,141.595322 C35.844242,145.763901 38.323856,148.138535 43.117180,147.963196 C49.435394,147.732025 55.758595,148.394745 62.066010,148.529877 C87.371300,149.071991 112.681229,149.383209 137.965424,150.641464 C141.518967,150.818283 143.909592,149.678711 145.610031,146.376053 C150.700378,136.489441 158.933456,129.994324 168.829117,125.278053 C186.713760,116.754219 205.735321,114.349205 225.242157,114.652847 C237.222595,114.839333 249.201035,115.283669 261.173248,115.782852 C264.408569,115.917755 265.616638,114.799690 265.731781,111.569359 C265.921051,106.257812 266.366150,100.945015 266.951599,95.660233 C268.005341,86.148384 266.375641,83.415588 257.032166,79.779907 C255.724213,80.470985 255.404938,81.827850 254.933899,83.041855 C253.510727,86.709801 251.032150,88.639328 247.171860,86.964867 C243.365997,85.314018 243.903412,82.047684 244.947235,78.829552 C247.191650,71.910004 247.192566,71.895370 240.782867,67.959663 C239.537292,67.194855 238.513809,65.957825 236.556473,65.938042 C235.391479,67.969032 234.207016,70.134026 232.926575,72.240662 C231.354599,74.826935 229.090546,76.128464 226.188889,74.721779 C223.264191,73.303925 222.328384,70.954468 223.430725,67.650177 C224.303635,65.033623 226.336349,62.778992 226.140686,59.628719 C222.693436,57.698723 219.524673,55.286999 215.393951,54.643940 C214.647705,55.806026 213.981155,56.746834 213.413483,57.743938 C209.944351,63.837357 207.344376,65.568047 204.159531,63.439148 C199.161621,60.098289 202.099411,56.189079 204.012543,51.795750 M285.223877,163.018448 C287.710205,163.243500 290.192169,163.574844 292.683533,163.677155 C317.133911,164.681213 341.226929,162.152313 364.996094,156.358643 C380.390564,152.606262 395.483124,147.875763 410.372833,142.489487 C415.963379,140.467148 416.461975,138.465591 412.800201,133.802002 C411.548737,132.208160 410.016479,130.909409 408.177979,130.054047 C403.950745,128.087341 399.723785,125.991638 395.071960,125.314148 C379.068085,122.983368 362.922272,122.659363 346.795471,121.981377 C338.174500,121.618942 329.515198,121.615692 320.993591,119.649673 C307.515411,116.540123 295.460785,110.137939 283.275787,103.980637 C281.573486,103.120430 280.037628,101.572289 277.774292,102.176636 C276.067780,108.389786 276.683075,114.794495 275.761963,121.026596 C274.915955,126.750755 272.613953,128.362122 267.029358,128.066330 C247.120804,127.011887 227.287216,124.191010 207.251175,126.221313 C192.793045,127.686386 179.054672,131.140594 166.695435,138.964371 C162.246078,141.780945 158.418243,145.396606 155.953674,151.198563 C161.283661,151.785950 165.846054,152.342148 170.419571,152.783157 C186.653427,154.348572 202.878372,156.027191 219.130371,157.378250 C240.854614,159.184280 262.491913,162.004196 285.223877,163.018448 M261.356476,177.930237 C273.932892,179.373077 286.565826,180.422409 299.203339,180.507645 C326.147827,180.689438 352.618896,176.861435 378.679840,170.009109 C391.748688,166.572845 404.640045,162.658539 417.058014,157.299179 C419.805786,156.113297 422.568176,154.754120 421.251801,150.870300 C420.631805,150.807236 420.269989,150.664612 419.986084,150.758240 C417.616058,151.539871 415.225830,152.277115 412.905426,153.189896 C363.207153,172.739563 311.826843,178.189514 258.918427,172.253265 C231.330994,169.158020 203.663101,166.701080 175.990128,164.469452 C148.614853,162.261856 121.206566,160.463791 93.716232,160.108582 C75.901962,159.878403 58.092030,159.112885 40.288609,158.381424 C35.853535,158.199203 33.752041,159.342834 34.292549,164.187286 C34.678188,167.643723 34.663631,171.209000 34.296894,174.669449 C33.806011,179.301254 35.537006,180.707153 40.125622,180.679367 C68.286415,180.508835 96.448990,180.527374 124.610207,180.653854 C128.418671,180.670959 130.092697,179.677963 129.959274,175.630005 C129.831970,171.767593 131.260529,168.697418 135.964340,168.773590 C143.793564,168.900375 151.658661,168.574142 159.446152,169.207413 C193.121445,171.945831 226.774048,174.963181 261.356476,177.930237 z"/></svg>'
  };
  const garments = [
    {key:'shirt', fill:'rgba(245,241,235,.7)'},
    {key:'knitwear', fill:'rgba(245,241,235,.7)'},
    {key:'trousers', fill:'rgba(245,241,235,.7)'},
    {key:'shoes', fill:'rgba(245,241,235,.7)'}
  ];
  const swatchColors = [
    {name:'Navy', color:C['Navy']},
    {name:'Camel', color:C['Camel']},
    {name:'Burgundy', color:C['Burgundy']},
    {name:'Sage', color:C['Sage']}
  ];
  outfitVis.innerHTML = `
    <span class="hiw-visual-title">Colour to garment</span>
    <div class="hiw-v2-scene">
      <div class="hiw-v2-swatches">
        ${swatchColors.map(s => `<div class="hiw-v2-swatch" style="background:${s.color}"></div>`).join('')}
      </div>
      <div class="hiw-v2-arrow"><svg width="28" height="14" viewBox="0 0 28 14" fill="none"><path d="M0 7h24m0 0l-4-4m4 4l-4 4" stroke="rgba(245,241,235,.48)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div class="hiw-v2-garments">
        ${garments.map(g => {
          const svg = obIcons[g.key];
          return `<div class="hiw-v2-item hiw-v2-${g.key}" style="color:${g.fill};fill:${g.fill}">${svg}</div>`;
        }).join('')}
      </div>
    </div>
  `;

  // Step 3: colour grid with palette highlights
  const gridVis = document.getElementById('hiw-grid-vis');
  const gridEl = document.createElement('div');
  gridEl.className = 'hiw-mini-grid';
  const highlightProfile = PROFILES['medium-warm'];
  const highlightSet = new Set([...highlightProfile.core.slice(0, 4), ...highlightProfile.best.slice(0, 4)]);
  const grouped = [
    ...highlightProfile.core.slice(0, 6),
    ...highlightProfile.best.slice(0, 16),
    ...highlightProfile.caution.slice(0, 8),
    ...ALL_COLORS.filter(name => !highlightProfile.core.includes(name) && !highlightProfile.best.includes(name) && !highlightProfile.caution.includes(name)).slice(0, 18)
  ].slice(0, 48);

  // Title + sort icon
  const titleEl = document.createElement('span');
  titleEl.className = 'hiw-visual-title';
  titleEl.textContent = 'Browse all colours';
  gridVis.appendChild(titleEl);

  const sortIcon = document.createElement('div');
  sortIcon.className = 'hiw-v3-sort-icon';
  sortIcon.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M4 7h6M6 10h2" stroke="rgba(245,241,235,.5)" stroke-width="1.2" stroke-linecap="round"/></svg>';
  gridVis.appendChild(sortIcon);

  grouped.forEach(name => {
    const cell = document.createElement('div');
    cell.className = 'hiw-mini-cell' + (highlightSet.has(name) ? ' hiw-mini-highlight' : '');
    cell.style.background = C[name];
    gridEl.appendChild(cell);
  });
  gridVis.appendChild(gridEl);
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
    return `<div class="depth-tile" data-id="${d.id}" data-group="${d.group}" style="--depth-bg:${d.color}" role="radio" tabindex="0" aria-checked="false">
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

  const tiles=[...grid.querySelectorAll('.depth-tile')];
  tiles.forEach((tile,index)=>{
    const choose=()=>selectDepth(tile.dataset.id);
    tile.addEventListener('click',choose);
    tile.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        choose();
        return;
      }
      if(e.key==='ArrowRight'||e.key==='ArrowDown'){
        e.preventDefault();
        const next=tiles[(index+1)%tiles.length];
        next.focus();
        selectDepth(next.dataset.id);
      }
      if(e.key==='ArrowLeft'||e.key==='ArrowUp'){
        e.preventDefault();
        const prev=tiles[(index-1+tiles.length)%tiles.length];
        prev.focus();
        selectDepth(prev.dataset.id);
      }
    });
  });
  syncDepthSelection();
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

// ── MATCH INDICATORS ───────────────��─────────────────────────────────────────

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
  if(answered<3){
    status.innerHTML=`Answer the remaining ${3-answered} test${3-answered>1?'s':''} and the dominant undertone will appear here.`;
    nextBtn.classList.remove('on');
    undertone=null;
    persistGuideIntentState();
    return;
  }
  if(counts.cool>=2)undertone='cool';else if(counts.warm>=2)undertone='warm';else undertone='neutral';
  status.innerHTML=`Most signals point to <strong>${SIGNAL_LABELS[undertone]}</strong> undertones <span class="ut-tag ${undertone}">${SIGNAL_LABELS[undertone]}</span>`;
  nextBtn.classList.add('on');
  persistGuideIntentState();
}

// ── NAV ──────────────────────────────────────────────────────────────────────

function goStep(n,options={}) {
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
    const signalColors = { cool: '#8090d0', neutral: '#7aaa9a', warm: '#78b068' };
    document.getElementById('s2-dots').innerHTML = Object.entries(answers)
      .filter(([, v]) => v)
      .map(([, v]) => `<div class="step-summary-dot" style="background:${signalColors[v]}"></div>`)
      .join('');
    document.getElementById('s2-text').innerHTML = `Your undertone: <strong>${SIGNAL_LABELS[undertone]}</strong> <span class="step-summary-tag ${undertone}">${SIGNAL_LABELS[undertone]}</span>`;
    s2.classList.add('show');
  } else {
    s2.classList.remove('show');
  }

  if(!options.skipScroll){
    document.getElementById('st-wrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
  setStepError('step1-error','');
  setStepError('step2-error','');
  syncDepthSelection();
  syncQuizOptionA11y();
  persistGuideIntentState();
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

document.getElementById('step1-next').addEventListener('click',()=>{
  if(!selDepth){
    setStepError('step1-error','Choose the closest skin-tone depth to continue.');
    return;
  }
  setStepError('step1-error','');
  goStep(2);
});
document.getElementById('step2-back').addEventListener('click',()=>{
  setStepError('step2-error','');
  goStep(1);
});
document.getElementById('step2-next').addEventListener('click',()=>{
  if(!undertone){
    setStepError('step2-error','Answer all three tests before viewing your palette.');
    return;
  }
  setStepError('step2-error','');
  renderResult();
  goStep(3);
});
document.getElementById('step3-reset').addEventListener('click',resetAll);
document.getElementById('step3-scroll').addEventListener('click',scrollToGrid);
document.getElementById('step3-builder').addEventListener('click',()=>document.getElementById('builder-workspace').scrollIntoView({behavior:'smooth',block:'start'}));
document.getElementById('skip-to-builder').addEventListener('click',()=>document.getElementById('builder-workspace').scrollIntoView({behavior:'smooth',block:'start'}));
document.getElementById('skip-to-grid').addEventListener('click',scrollToGrid);
document.getElementById('s1-change').addEventListener('click',()=>goStep(1));
document.getElementById('s2-change').addEventListener('click',()=>goStep(2));

document.querySelectorAll('.quiz-opt').forEach(opt=>{
  const choose=()=>selectQuizOption(opt);
  opt.addEventListener('click',choose);
  opt.addEventListener('keydown',e=>{
    const group=[...document.querySelectorAll(`.quiz-opt[data-q="${opt.dataset.q}"]`)];
    const index=group.indexOf(opt);
    if(e.key==='Enter'||e.key===' '){
      e.preventDefault();
      choose();
      return;
    }
    if(e.key==='ArrowRight'||e.key==='ArrowDown'){
      e.preventDefault();
      const next=group[(index+1)%group.length];
      next.focus();
      selectQuizOption(next);
    }
    if(e.key==='ArrowLeft'||e.key==='ArrowUp'){
      e.preventDefault();
      const prev=group[(index-1+group.length)%group.length];
      prev.focus();
      selectQuizOption(prev);
    }
  });
});
syncQuizOptionA11y();

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
const GUIDE_STATE_STORAGE_KEY='trg_colour_guide_state_v2';
const GUIDE_HANDOFF_STORAGE_KEY='trg_colour_intent';

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
  const hasQuizState=Boolean(selDepth||undertone||activeProfile||Object.values(answers).some(Boolean));

  try{
    if(!filledSlots.length&&!hasQuizState){
      localStorage.removeItem(GUIDE_STATE_STORAGE_KEY);
      localStorage.removeItem(GUIDE_HANDOFF_STORAGE_KEY);
      return;
    }

    const payload={
      source:'colour-guide',
      updatedAt:new Date().toISOString(),
      step:activeProfile?3:Object.values(answers).some(Boolean)?2:selDepth?1:0,
      depth_id:selDepth||'',
      depth_group:selDepthGroup||'',
      undertone:undertone||'',
      answers:{
        vein:answers.vein||'',
        metal:answers.metal||'',
        sun:answers.sun||''
      },
      profile_key:activeProfile&&selDepthGroup&&undertone?`${selDepthGroup}-${undertone}`:'',
      profile_name:activeProfile?activeProfile.name:'',
      profile_archetype:activeProfile?stripArchetypeLabel(activeProfile.archetype):'',
      profile_swatch:activeProfile?activeProfile.swatch:'',
      anchor:filledSlots[0]||null,
      slots:filledSlots
    };

    localStorage.setItem(GUIDE_STATE_STORAGE_KEY,JSON.stringify(payload));

    if(filledSlots.length){
      localStorage.setItem(GUIDE_HANDOFF_STORAGE_KEY,JSON.stringify({
        source:'guide',
        savedAt:new Date().toISOString(),
        profile_key:payload.profile_key||null,
        slots:filledSlots.map(slotState=>({
          slot:slotState.slot,
          singular:slotState.singular,
          handle:slotState.handle,
          color:slotState.color,
          hex:slotState.hex
        })),
        anchor:filledSlots[0]
          ? {
              slot:filledSlots[0].slot,
              singular:filledSlots[0].singular,
              handle:filledSlots[0].handle,
              color:filledSlots[0].color,
              hex:filledSlots[0].hex
            }
          : null
      }));
    }else{
      localStorage.removeItem(GUIDE_HANDOFF_STORAGE_KEY);
    }
  }catch(err){
    /* storage can fail in private mode */
  }
}

function restoreGuideIntentState(){
  let raw='';
  try{
    raw=localStorage.getItem(GUIDE_STATE_STORAGE_KEY)||'';
  }catch(err){
    return false;
  }
  if(!raw)return false;

  let payload;
  try{
    payload=JSON.parse(raw);
  }catch(err){
    return false;
  }
  if(!payload||typeof payload!=='object')return false;

  const restoredAnswers=payload.answers&&typeof payload.answers==='object'
    ? {
        vein:normalizeSignal(payload.answers.vein),
        metal:normalizeSignal(payload.answers.metal),
        sun:normalizeSignal(payload.answers.sun)
      }
    : {vein:null,metal:null,sun:null};

  const depthFromId=payload.depth_id&&DEPTHS.find(d=>d.id===payload.depth_id);
  if(depthFromId){
    selDepth=depthFromId.id;
    selDepthGroup=depthFromId.group;
  }else if(payload.depth_group){
    const depthFromGroup=DEPTHS.find(d=>d.group===payload.depth_group);
    if(depthFromGroup){
      selDepth=depthFromGroup.id;
      selDepthGroup=depthFromGroup.group;
    }
  }

  answers=restoredAnswers;
  document.querySelectorAll('.quiz-opt').forEach(opt=>opt.classList.remove('sel'));
  Object.entries(restoredAnswers).forEach(([q,signal])=>{
    if(!signal)return;
    document.querySelector(`.quiz-opt[data-q="${q}"][data-signal="${signal}"]`)?.classList.add('sel');
  });
  syncDepthSelection();
  syncQuizOptionA11y();
  updateTally();

  const restoredUndertone=normalizeSignal(payload.undertone);
  if(restoredUndertone){
    undertone=restoredUndertone;
  }

  const profileKey=typeof payload.profile_key==='string'?payload.profile_key.trim():'';
  if(profileKey&&PROFILES[profileKey]){
    const [savedDepthGroup,savedUndertone]=profileKey.split('-');
    if(!selDepthGroup&&savedDepthGroup){
      const fallbackDepth=DEPTHS.find(d=>d.group===savedDepthGroup);
      if(fallbackDepth){
        selDepth=fallbackDepth.id;
        selDepthGroup=fallbackDepth.group;
      }
    }
    if(!undertone){
      undertone=normalizeSignal(savedUndertone);
    }
    syncDepthSelection();
    renderResult();
  }

  const restoredSlots=Array.isArray(payload.slots)?payload.slots:[];
  if(restoredSlots.length){
    document.querySelectorAll('.preset-card').forEach(card=>card.classList.remove('sel'));
    document.querySelectorAll('.ob-slot').forEach(clearSlot);
    restoredSlots.forEach(slotState=>{
      if(!slotState||!SLOT_ORDER.includes(slotState.slot))return;
      const colorName=findCanonicalGuideColour(slotState.color);
      if(!colorName)return;
      const slot=document.querySelector(`.ob-slot[data-slot="${slotState.slot}"]`);
      if(slot)setSlotColor(slot,colorName);
    });
  }

  const anchorSlotName=payload.anchor&&SLOT_ORDER.includes(payload.anchor.slot)?payload.anchor.slot:'';
  const activeSlot=document.querySelector(anchorSlotName?`.ob-slot[data-slot="${anchorSlotName}"]`:'.ob-slot.filled')
    || [...document.querySelectorAll('.ob-slot')].find(slot=>!slot.classList.contains('filled'))
    || document.querySelector('.ob-slot');
  setActiveSlot(activeSlot);
  updateGauge();

  if(activeProfile){
    goStep(3,{skipScroll:true});
  }else if(Object.values(answers).some(Boolean)){
    goStep(2,{skipScroll:true});
  }else{
    goStep(1,{skipScroll:true});
  }

  return true;
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
const ENGINE_COLOURS = window.TRG_CG && Array.isArray(window.TRG_CG.C) ? window.TRG_CG.C : [];
const ENGINE_SCORE = window.TRG_CG && typeof window.TRG_CG.sc === 'function' ? window.TRG_CG.sc : null;

function getEngineColour(name){
  const safeName=findCanonicalGuideColour(name);
  if(!safeName)return null;
  return ENGINE_COLOURS.find(entry=>entry.n===safeName) || null;
}

function getHarmonySummary(score){
  if(score>=86){
    return {
      state:'strong',
      heading:'Strong',
      summary:'Most pairings sit comfortably in the same register.'
    };
  }
  if(score>=74){
    return {
      state:'sound',
      heading:'Sound',
      summary:'The combination holds together well without feeling flat.'
    };
  }
  if(score>=62){
    return {
      state:'workable',
      heading:'Workable',
      summary:'There is enough overlap to make the mix coherent, but one piece is starting to pull away.'
    };
  }
  return {
    state:'tense',
    heading:'Tense',
    summary:'The outfit is fighting itself. Reset the anchor piece or swap the loudest colour.'
  };
}

function calculateHarmonyScore(){
  const filledSlots=getFilledGuideSlots();
  if(filledSlots.length<2||!ENGINE_SCORE)return null;
  const pairs=[];
  for(let i=0;i<filledSlots.length;i++){
    for(let j=i+1;j<filledSlots.length;j++){
      const left=getEngineColour(filledSlots[i].color);
      const right=getEngineColour(filledSlots[j].color);
      if(!left||!right)continue;
      pairs.push(ENGINE_SCORE(left,right));
    }
  }
  if(!pairs.length)return null;
  const avg=Math.round(pairs.reduce((sum,pair)=>sum+pair.pct,0)/pairs.length);
  const summary=getHarmonySummary(avg);
  const completionNote=filledSlots.length===2
    ? 'Add a third piece to stress-test the mix.'
    : filledSlots.length<6
      ? `${filledSlots.length} pieces are in play.`
      : 'All 6 slots are in play.';
  return {
    score:avg,
    state:summary.state,
    heading:summary.heading,
    description:`${summary.heading} mix. ${summary.summary} ${completionNote}`
  };
}

function renderOBSuggestions(slotName) {
  const suggestEl = document.getElementById('ob-suggest');
  const labelEl = suggestEl.querySelector('.ob-suggest-label');
  if (!slotName) { suggestEl.classList.remove('show'); suggestEl.classList.remove('generic'); return; }
  const rec = SLOT_RECS[slotName];
  if (!rec) { suggestEl.classList.remove('show'); suggestEl.classList.remove('generic'); return; }
  let suggestions = [];
  if (activeProfile) {
    const paletteSet = new Set([...(activeProfile.core || []), ...(activeProfile.best || [])]);
    const cautionSet = new Set(activeProfile.caution || []);
    const paletteMatches = rec.pool.filter(c => paletteSet.has(c));
    const neutrals = rec.pool.filter(c => !paletteSet.has(c) && !cautionSet.has(c));
    suggestions = [...paletteMatches, ...neutrals].slice(0, 8);
    suggestEl.classList.remove('generic');
    if (labelEl) labelEl.textContent = 'Suggested for you';
    document.getElementById('ob-suggest-hint').textContent = rec.hint;
  } else {
    suggestions = (rec.pool || []).slice(0, 8);
    suggestEl.classList.add('generic');
    if (labelEl) labelEl.textContent = 'Suggested combinations';
    document.getElementById('ob-suggest-hint').textContent = 'Useful starting colours before you personalise.';
  }
  if (suggestions.length === 0) { suggestEl.classList.remove('show'); return; }
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
    const slotLabel=SLOT_SHORT[slot.dataset.slot]||slot.querySelector('.ob-slot-name')?.textContent?.trim()||'Garment';
    const currentColor=(slot.querySelector('.ob-slot-color')?.textContent||'').trim();
    const isFilled=slot.classList.contains('filled');
    slot.setAttribute('role','button');
    slot.setAttribute('tabindex','0');
    slot.setAttribute('aria-pressed',slot.classList.contains('on')?'true':'false');
    slot.setAttribute('aria-label',isFilled?`Change colour for ${slotLabel}. Current colour ${currentColor}.`:`Add colour to ${slotLabel}.`);
  });
  document.querySelectorAll('.ob-slot-rm').forEach(remove=>{
    const slot=remove.closest('.ob-slot');
    const slotLabel=SLOT_SHORT[slot?.dataset?.slot]||slot?.querySelector('.ob-slot-name')?.textContent?.trim()||'garment';
    const currentColor=(slot?.querySelector('.ob-slot-color')?.textContent||'').trim();
    const isFilled=slot?.classList.contains('filled');
    remove.setAttribute('role','button');
    remove.setAttribute('tabindex',isFilled?'0':'-1');
    remove.setAttribute('aria-hidden',isFilled?'false':'true');
    remove.setAttribute('aria-label',currentColor?`Remove ${currentColor} from ${slotLabel}.`:`Remove colour from ${slotLabel}.`);
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
  const gaugeEl = document.querySelector('.ob-gauge');
  const harmony = calculateHarmonyScore();
  const circumference = 2 * Math.PI * 26;
  const pct = harmony ? harmony.score : 0;
  const offset = circumference - (circumference * pct / 100);
  document.getElementById('ob-gauge-fill').style.strokeDashoffset = offset;
  const pctEl = document.getElementById('ob-gauge-pct');
  gaugeEl.classList.remove('score-strong','score-sound','score-workable','score-tense');
  document.getElementById('ob-gauge-label').textContent = 'Colour harmony';
  if (filled === 0) {
    pctEl.innerHTML = 'Start<br>here';
    document.getElementById('ob-gauge-desc').textContent = 'Load a preset or start with the shirt, jacket, or coat.';
  } else if (filled === 1 || !harmony) {
    pctEl.innerHTML = 'Pick<br>2';
    document.getElementById('ob-gauge-desc').textContent = 'Add a second colour to score the combination. The reading gets more useful as the outfit fills out.';
  } else {
    gaugeEl.classList.add(`score-${harmony.state}`);
    pctEl.innerHTML = `${harmony.score}`;
    document.getElementById('ob-gauge-desc').textContent = harmony.description;
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
const restoredGuideState=restoreGuideIntentState();
if(!restoredGuideState){
  updateOBProfileLink();
  updateGauge();
}
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
  { id: 'builder-workspace', key: 'builder-workspace' },
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
