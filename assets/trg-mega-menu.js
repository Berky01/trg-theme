/* TRG Mega Menu v3.1.1773717858 */
(function(){
'use strict';
var P={shop:'trg-mm-p-shop',brands:'trg-mm-p-brands'},BK='trg-mm-bk',DK=990;
var FB=[
{n:"3sixteen",s:"3sixteen",c:"denim"},{n:"A Day's March",s:"a-days-march",c:"casualwear"},{n:"A Kind of Guise",s:"a-kind-of-guise",c:"casualwear"},{n:"A.P.C.",s:"a-p-c",c:"casualwear"},{n:"Ace Marks",s:"ace-marks",c:"footwear"},{n:"Aime Leon Dore",s:"aime-leon-dore",c:"streetwear"},{n:"Allen Edmonds",s:"allen-edmonds",c:"footwear"},{n:"AMI Paris",s:"ami-paris",c:"smart-casual"},{n:"Anglo-Italian",s:"anglo-italian",c:"smart-casual"},{n:"Aran Sweater Market",s:"aran-sweater-market",c:"knitwear"},{n:"Arc'teryx",s:"arcteryx",c:"outerwear"},{n:"Arpenteur",s:"arpenteur",c:"workwear"},{n:"Asket",s:"asket",c:"basics"},{n:"Aspesi",s:"aspesi",c:"casualwear"},{n:"Astorflex",s:"astorflex",c:"footwear"},{n:"Auralee",s:"auralee",c:"casualwear"},{n:"Baracuta",s:"baracuta",c:"outerwear"},{n:"Barbour",s:"barbour",c:"outerwear"},{n:"Barena Venezia",s:"barena-venezia",c:"smart-casual"},{n:"Beckett Simonon",s:"beckett-simonon",c:"footwear"},{n:"Belstaff",s:"belstaff",c:"outerwear"},{n:"Billy Reid",s:"billy-reid",c:"casualwear"},{n:"Blundstone",s:"blundstone",c:"footwear"},{n:"Bode",s:"bode",c:"casualwear"},{n:"Boglioli",s:"boglioli",c:"formalwear"},{n:"Bonobos",s:"bonobos",c:"smart-casual"},{n:"Brooks Brothers",s:"brooks-brothers",c:"formalwear"},{n:"Buck Mason",s:"buck-mason",c:"basics"},{n:"Canada Goose",s:"canada-goose",c:"outerwear"},{n:"Carhartt WIP",s:"carhartt-wip",c:"workwear"},{n:"Carlos Santos",s:"carlos-santos",c:"footwear"},{n:"Carmina",s:"carmina",c:"footwear"},{n:"Charles Tyrwhitt",s:"charles-tyrwhitt",c:"formalwear"},{n:"Church's",s:"churchs",c:"footwear"},{n:"Clarks",s:"clarks",c:"footwear"},{n:"Closed",s:"closed",c:"denim"},{n:"Club Monaco",s:"club-monaco",c:"smart-casual"},{n:"Cobbler Union",s:"cobbler-union",c:"footwear"},{n:"Colhay's",s:"colhays",c:"knitwear"},{n:"Corridor",s:"corridor",c:"casualwear"},{n:"CP Company",s:"cp-company",c:"outerwear"},{n:"Crockett & Jones",s:"crockett-and-jones",c:"footwear"},{n:"Crown Northampton",s:"crown-northampton",c:"footwear"},{n:"Dale of Norway",s:"dale-of-norway",c:"knitwear"},{n:"Danner",s:"danner",c:"footwear"},{n:"Dehen 1920",s:"dehen-1920",c:"outerwear"},{n:"Dime",s:"dime",c:"streetwear"},{n:"Drakes",s:"drakes",c:"formalwear"},{n:"Duckworth",s:"duckworth",c:"knitwear"},{n:"Edwin",s:"edwin",c:"denim"},{n:"Eleventy",s:"eleventy",c:"smart-casual"},{n:"Engineered Garments",s:"engineered-garments",c:"workwear"},{n:"Eton Shirts",s:"eton-shirts",c:"formalwear"},{n:"Evan Kinori",s:"evan-kinori",c:"casualwear"},{n:"Everlane",s:"everlane",c:"basics"},{n:"Faherty Brand",s:"faherty-brand",c:"casualwear"},{n:"Filson",s:"filson",c:"outerwear"},{n:"Folk",s:"folk",c:"casualwear"},{n:"Frank And Oak",s:"frank-and-oak",c:"casualwear"},{n:"Goldwin",s:"goldwin",c:"outerwear"},{n:"Grant Stone",s:"grant-stone",c:"footwear"},{n:"Grenson",s:"grenson",c:"footwear"},{n:"HAVEN",s:"haven",c:"streetwear"},{n:"Inis Meáin",s:"inis-meain",c:"knitwear"},{n:"Iron Heart",s:"iron-heart",c:"denim"},{n:"J.Crew",s:"j-crew",c:"casualwear"},{n:"John Smedley",s:"john-smedley",c:"knitwear"},{n:"Johnstons of Elgin",s:"johnstons-of-elgin",c:"knitwear"},{n:"Kanata",s:"kanata",c:"knitwear"},{n:"Kapital",s:"kapital",c:"casualwear"},{n:"Kardo",s:"kardo",c:"casualwear"},{n:"KESTIN",s:"kestin",c:"casualwear"},{n:"Kith",s:"kith",c:"streetwear"},{n:"Kotn",s:"kotn",c:"basics"},{n:"L.B.M. 1911",s:"l-b-m-1911",c:"smart-casual"},{n:"Lady White Co.",s:"lady-white-co",c:"basics"},{n:"Lemaire",s:"lemaire",c:"casualwear"},{n:"Levi's Vintage Clothing",s:"levis-vintage-clothing",c:"denim"},{n:"LL Bean",s:"ll-bean",c:"outerwear"},{n:"Loake",s:"loake",c:"footwear"},{n:"Mackintosh",s:"mackintosh",c:"outerwear"},{n:"Magee 1866",s:"magee-1866",c:"outerwear"},{n:"Margaret Howell",s:"margaret-howell",c:"casualwear"},{n:"Meermin",s:"meermin",c:"footwear"},{n:"Merz b. Schwanen",s:"merz-b-schwanen",c:"basics"},{n:"Momotaro",s:"momotaro",c:"denim"},{n:"Monitaly",s:"monitaly",c:"casualwear"},{n:"Naked & Famous",s:"naked-and-famous",c:"denim"},{n:"Nanamica",s:"nanamica",c:"outerwear"},{n:"New Balance",s:"new-balance",c:"footwear"},{n:"Nigel Cabourn",s:"nigel-cabourn",c:"outerwear"},{n:"NN07",s:"nn07",c:"casualwear"},{n:"Noah NYC",s:"noah-nyc",c:"streetwear"},{n:"Norse Projects",s:"norse-projects",c:"casualwear"},{n:"Officine Générale",s:"officine-generale",c:"smart-casual"},{n:"Oliver Spencer",s:"oliver-spencer",c:"smart-casual"},{n:"Oni Denim",s:"oni-denim",c:"denim"},{n:"Orslow",s:"orslow",c:"casualwear"},{n:"Our Legacy",s:"our-legacy",c:"casualwear"},{n:"Outerknown",s:"outerknown",c:"casualwear"},{n:"Paraboot",s:"paraboot",c:"footwear"},{n:"Patagonia",s:"patagonia",c:"outerwear"},{n:"Paul Smith",s:"paul-smith",c:"smart-casual"},{n:"Pendleton",s:"pendleton",c:"outerwear"},{n:"Peter Millar",s:"peter-millar",c:"smart-casual"},{n:"Portuguese Flannel",s:"portuguese-flannel",c:"casualwear"},{n:"Private White V.C.",s:"private-white-vc",c:"outerwear"},{n:"Proper Cloth",s:"proper-cloth",c:"formalwear"},{n:"Pure Blue Japan",s:"pure-blue-japan",c:"denim"},{n:"Rancourt & Co",s:"rancourt-and-co",c:"footwear"},{n:"Red Wing",s:"red-wing",c:"footwear"},{n:"Reigning Champ",s:"reigning-champ",c:"casualwear"},{n:"Ring Jacket",s:"ring-jacket",c:"formalwear"},{n:"Rogue Territory",s:"rogue-territory",c:"denim"},{n:"Roots",s:"roots",c:"casualwear"},{n:"Saman Amel",s:"saman-amel",c:"formalwear"},{n:"Schott NYC",s:"schott-nyc",c:"outerwear"},{n:"Sid Mashburn",s:"sid-mashburn",c:"smart-casual"},{n:"Spier & Mackay",s:"spier-and-mackay",c:"formalwear"},{n:"Stan Ray",s:"stan-ray",c:"workwear"},{n:"Stone Island",s:"stone-island",c:"outerwear"},{n:"Story Mfg.",s:"story-mfg",c:"casualwear"},{n:"Studio Donegal",s:"studio-donegal",c:"knitwear"},{n:"Studio Nicholson",s:"studio-nicholson",c:"casualwear"},{n:"Stüssy",s:"stussy",c:"streetwear"},{n:"Suitsupply",s:"suitsupply",c:"formalwear"},{n:"Sunspel",s:"sunspel",c:"basics"},{n:"Taylor Stitch",s:"taylor-stitch",c:"casualwear"},{n:"Tellason",s:"tellason",c:"denim"},{n:"The Armoury",s:"the-armoury",c:"formalwear"},{n:"Thom Browne",s:"thom-browne",c:"formalwear"},{n:"Thursday Boot Co.",s:"thursday-boot-co",c:"footwear"},{n:"Todd Snyder",s:"todd-snyder",c:"casualwear"},{n:"Tricker's",s:"trickers",c:"footwear"},{n:"Universal Works",s:"universal-works",c:"workwear"},{n:"Velasca",s:"velasca",c:"footwear"},{n:"Vetra",s:"vetra",c:"workwear"},{n:"Viberg",s:"viberg",c:"footwear"},{n:"Visvim",s:"visvim",c:"casualwear"},{n:"Warehouse & Co.",s:"warehouse-and-co",c:"denim"},{n:"Wax London",s:"wax-london",c:"casualwear"},{n:"Wings+Horns",s:"wings-horns",c:"streetwear"},{n:"Woolrich",s:"woolrich",c:"outerwear"}
].map(function(b){return{name:b.n,slug:b.s,category:b.c}});

var op=null,br=[],ac='all',mo=null;
function dk(){return window.innerWidth>=DK}
function $(id){return document.getElementById(id)}
function $$(s,r){return(r||document).querySelectorAll(s)}

function init(){
  loadBrands();
  if(dk())bindNav();
  bindTabs();bindSearch();bindBk();bindKb();bindX();bindCC();
  render('all','');
  if(dk())watchChv();
}

function loadBrands(){
  var el=$('trg-mm-bd');
  if(el){try{var d=JSON.parse(el.textContent);if(Array.isArray(d)&&d.length>0){br=d;return}}catch(e){}}
  br=FB;
}

function bindNav(){
  $$('header-menu .menu-list__list-item, .header-menu .menu-list__list-item').forEach(function(li){
    var lk=li.querySelector('.menu-list__link');
    if(!lk)return;
    var t=(lk.textContent||'').replace(/\s+/g,' ').trim().toLowerCase(),k=null;
    if(t==='brands')k='brands';else if(t==='products')k='shop';
    if(!k)return;
    li.removeAttribute('on:click');li.removeAttribute('on:focus');
    lk.addEventListener('mousedown',function(e){e.preventDefault()});
    lk.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();toggle(k)});
    lk.setAttribute('data-trg-mm',k);lk.setAttribute('aria-haspopup','true');lk.setAttribute('aria-expanded','false');
    lk.style.position='relative';
    addChv(lk);
  });
}

function addChv(lk){}

function watchChv(){}

function toggle(k){
  if(op===k){close();return}
  close(false);op=k;
  var p=$(P[k]),b=$(BK);
  if(p)p.classList.add('on');if(b)b.classList.add('on');
  $$('[data-trg-mm]').forEach(function(el){el.setAttribute('aria-expanded',el.getAttribute('data-trg-mm')===k?'true':'false')});
  if(k==='brands'){var i=$('trg-mm-bi');if(i)setTimeout(function(){i.focus()},120)}
}

function close(rs){
  if(rs===undefined)rs=true;
  Object.keys(P).forEach(function(k){var e=$(P[k]);if(e)e.classList.remove('on')});
  var b=$(BK);if(b)b.classList.remove('on');
  $$('[data-trg-mm]').forEach(function(el){el.setAttribute('aria-expanded','false')});
  if(rs){op=null;var i=$('trg-mm-bi');if(i&&i.value){i.value='';render(ac,'');upUI('')}}
}

function bindCC(){
  Object.keys(P).forEach(function(k){
    var p=$(P[k]);if(!p)return;
    p.addEventListener('click',function(e){
      e.stopPropagation();
      var a=e.target.closest('a[href]');
      if(a&&a.href&&!a.href.endsWith('#'))close();
    });
  });
}

function bindX(){$$('.trg-mm-x').forEach(function(b){b.addEventListener('click',function(){close()})})}

function bindTabs(){
  $$('.trg-mm-t').forEach(function(btn){
    btn.addEventListener('click',function(){
      var tid=btn.dataset.tab;if(!tid)return;
      var sb=btn.closest('.trg-mm-sb');
      if(sb)sb.querySelectorAll('.trg-mm-t').forEach(function(t){t.classList.remove('on')});
      btn.classList.add('on');
      var pn=btn.closest('.trg-mm-p');
      if(pn){pn.querySelectorAll('.trg-mm-pn').forEach(function(p){p.classList.remove('on')});
        var pp=$('trg-mm-pn-'+tid);if(pp)pp.classList.add('on')}
      var bc=btn.dataset.bc;
      if(bc!==undefined||tid==='brands-all'){
        ac=bc||'all';
        var i=$('trg-mm-bi');render(ac,i?i.value.trim():'');
      }
    });
  });
}

function render(cat,q){
  var g=$('trg-mm-bg');if(!g)return;
  var ql=q.toLowerCase(),f=br.slice();
  if(cat&&cat!=='all')f=f.filter(function(b){return b.category===cat});
  if(ql)f=f.filter(function(b){return b.name.toLowerCase().indexOf(ql)!==-1});
  f.sort(function(a,b){return a.name.replace(/^[^a-zA-Z]+/,'').localeCompare(b.name.replace(/^[^a-zA-Z]+/,''),'en',{sensitivity:'base'})});
  g.classList.remove('sr','ct');
  if(!f.length){g.innerHTML='<div class="trg-mm-empty">No brands found'+(ql?' for \u201c'+esc(q)+'\u201d':'')+'</div>';return}
  if(ql){g.classList.add('sr');g.innerHTML=f.map(function(b){var i=b.name.toLowerCase().indexOf(ql);return'<a href="/pages/'+b.slug+'" class="trg-mm-bl">'+b.name.slice(0,i)+'<mark>'+b.name.slice(i,i+ql.length)+'</mark>'+b.name.slice(i+ql.length)+'</a>'}).join('');return}
  if(cat&&cat!=='all'){g.classList.add('ct');g.innerHTML=f.map(function(b){return'<a href="/pages/'+b.slug+'" class="trg-mm-bl">'+esc(b.name)+'</a>'}).join('');return}
  var gr={};f.forEach(function(b){var l=b.name.replace(/^[^a-zA-Z]+/,'').charAt(0).toUpperCase()||'#';if(!gr[l])gr[l]=[];gr[l].push(b)});
  var ls=Object.keys(gr).sort(),pc=Math.ceil(ls.length/5),cs=[];
  for(var i=0;i<5;i++)cs.push(ls.slice(i*pc,(i+1)*pc));
  g.innerHTML=cs.map(function(cl){if(!cl.length)return'';return'<div class="trg-mm-col">'+cl.map(function(l){return'<div class="trg-mm-lt">'+l+'</div>'+gr[l].map(function(b){return'<a href="/pages/'+b.slug+'" class="trg-mm-bl">'+esc(b.name)+'</a>'}).join('')}).join('')+'</div>'}).join('');
}

function bindSearch(){
  var i=$('trg-mm-bi'),x=$('trg-mm-sx');if(!i)return;
  i.addEventListener('input',function(){var q=i.value.trim();render(ac,q);upUI(q)});
  if(x)x.addEventListener('click',function(){i.value='';i.focus();render(ac,'');upUI('')});
}

function upUI(q){
  var m=$('trg-mm-sm'),x=$('trg-mm-sx');
  if(x)x.classList.toggle('on',q.length>0);
  if(!m)return;if(!q){m.innerHTML='';return}
  var ql=q.toLowerCase(),f=br;
  if(ac!=='all')f=f.filter(function(b){return b.category===ac});
  var c=f.filter(function(b){return b.name.toLowerCase().indexOf(ql)!==-1}).length;
  m.innerHTML='<strong>'+c+'</strong> brand'+(c!==1?'s':'')+' matching \u201c'+esc(q)+'\u201d';
}

function bindBk(){var b=$(BK);if(b)b.addEventListener('click',function(){close()})}
function bindKb(){document.addEventListener('keydown',function(e){if(e.key==='Escape'&&op)close()})}
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.addEventListener('resize',function(){if(!dk()&&op)close()});
document.addEventListener('shopify:section:load',function(e){if(e.target&&e.target.querySelector&&(e.target.querySelector('header-menu')||e.target.querySelector('.trg-mm-p')))setTimeout(init,150)});
})();
