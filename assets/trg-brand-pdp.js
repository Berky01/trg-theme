/* TRG Brand PDP v3 */
(function(){
'use strict';
var CLS='bp-ca-only',KEY='trg_geo',TTL=864e5;

function show(isCA){
  if(!isCA)return;
  var els=document.querySelectorAll('.'+CLS);
  for(var i=0;i<els.length;i++) els[i].style.display='';
}

var p=new URLSearchParams(window.location.search);
if(p.get('geo')==='ca'){show(true);return;}
if(p.get('geo')==='us'){show(false);return;}

try{
  var c=JSON.parse(localStorage.getItem(KEY));
  if(c&&Date.now()-c.ts<TTL){show(c.isCA);return;}
}catch(e){}

fetch('https://ipapi.co/json/')
  .then(function(r){return r.json()})
  .then(function(d){
    var isCA=d.country_code==='CA';
    try{localStorage.setItem(KEY,JSON.stringify({isCA:isCA,ts:Date.now()}));}catch(e){}
    show(isCA);
  })
  .catch(function(){show(false);});
})();
