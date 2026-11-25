(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var q=new URLSearchParams(location.search),deckName=q.get('deck')||'ojo',DECK=window.DECKS[deckName]||window.DECKS.ojo;
var KEY='pres.'+DECK.name+'.';
var store={get:function(k,d){try{var v=localStorage.getItem(KEY+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set:function(k,v){try{localStorage.setItem(KEY+k,JSON.stringify(v))}catch(e){}}};
var stage=$('#stage'),host=$('#slides'),ring=$('#ring');
var all=DECK.slides.slice(),byId={};all.forEach(function(s){byId[s.id]=s});
if(store.get('ver',null)!==(DECK.ver||1)){store.set('order',null);store.set('ver',DECK.ver||1)}
var order=store.get('order',null),hidden=store.get('hidden',[]),client=store.get('client',null),lang=q.get('lang')||store.get('lang','pt'),edits={};
window.LANG=lang;function ek(){return lang==='pt'?'edits':'edits.en'}edits=store.get(ek(),{});
function merge(t,p){Object.keys(p).forEach(function(k){if(p[k]&&typeof p[k]==='object'&&t[k]&&typeof t[k]==='object')merge(t[k],p[k]);else t[k]=p[k]});return t}
function base(s){var d=JSON.parse(JSON.stringify(s));if(lang==='en'&&DECK.en&&DECK.en[s.id])merge(d,DECK.en[s.id]);return d}
var SKIP=['type','theme','id','section','bg','size','side','img','video','poster','logo','logos','media','top','rx','ry','rs','label','client','tag'];
function setPath(o,path,v){var k=path.split('.'),c=o;for(var i=0;i<k.length-1;i++)c=c[k[i]];c[k[k.length-1]]=v}
function eff(s){var d=base(s),e=edits[s.id];if(e)Object.keys(e).forEach(function(p){try{setPath(d,p,e[p])}catch(x){}});return d}
function leaves(o,pre,out){if(typeof o==='string'){out.push([pre,o]);return out}
  if(o&&typeof o==='object')Object.keys(o).forEach(function(k){if(!pre&&SKIP.indexOf(k)>=0)return;if(pre&&SKIP.indexOf(k)>=0&&isNaN(+k))return;leaves(o[k],pre?pre+'.'+k:k,out)});return out}
function getOrder(){var ids=all.map(function(s){return s.id});if(!order)return ids;var o=order.filter(function(i){return byId[i]});ids.forEach(function(i){if(o.indexOf(i)<0)o.push(i)});return o}
var list=[],els=[],cur=-1,busy=false;

/* escala do palco */
function fit(){var s=Math.min(innerWidth/1920,innerHeight/1080);stage.style.transform='translate('+(-960*s)+'px,'+(-540*s)+'px) scale('+s+')';stage.dataset.s=s}
addEventListener('resize',fit);fit();

/* montagem */
function build(){
  host.innerHTML='';list=getOrder().filter(function(i){return hidden.indexOf(i)<0}).map(function(i){return byId[i]});
  els=list.map(function(s,i){
    var el=document.createElement('section');el.className='slide '+(s.theme||'dark');el.dataset.id=s.id;
    var d=eff(s);if(s.type==='cover'&&client)d.client=client;
    var html=(s.bg&&s.type!=='statement'?'<div class="bg dim" data-par="24" style="background-image:url(img/nebula.jpg)"></div>':'')+window.LAYOUTS[s.type](d);
    el.innerHTML=html;host.appendChild(el);return el});
  $('#hudTot').textContent=pad(list.length);
  $$('.cname').forEach(function(n){n.addEventListener('input',function(){client=n.textContent.trim();store.set('client',client)});n.addEventListener('keydown',function(e){e.stopPropagation();if(e.key==='Enter'){e.preventDefault();n.blur()}});n.addEventListener('click',function(e){e.stopPropagation()})});
}
function pad(n){return (n<10?'0':'')+n}

/* vídeos: carrega vizinhos, toca só o ativo */
function media(i){
  els.forEach(function(el,k){var near=Math.abs(k-i)<=1;$$('video',el).forEach(function(v){
    if(near&&!v.src&&v.dataset.src){v.src=v.dataset.src;v.preload='auto'}
    if(k===i){var p=v.play();if(p&&p.catch)p.catch(function(){})}else{try{v.pause()}catch(e){}}})});
}

/* transições: ring | wipe | push | split | diagonal | zoom | curtain. Por página: campo "transition". Tecla T alterna o modo */
var TRS=['ring','wipe','push','curtain','diagonal','split','zoom'],tmode=store.get('tmode','auto');
function pickT(s,n){return s.transition||(tmode==='auto'?TRS[(n-1+TRS.length)%TRS.length]:tmode)}
function toast(t){var e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(function(){e.classList.remove('on')},1600)}
/* transição */
function go(n,instant){
  n=Math.max(0,Math.min(list.length-1,n));if(n===cur||busy)return;
  var prev=cur,dir=n>prev?1:-1,nu=els[n],old=els[prev];
  location.hash=n+1;
  $('#hudNum').textContent=pad(n+1);$('#hudSec').textContent=eff(list[n]).section||'';
  $('#barFill').style.width=((n+1)/list.length*100)+'%';
  if(instant||prev<0||!nu.animate){els.forEach(function(e){e.classList.remove('show','in')});nu.classList.add('show');cur=n;media(n);requestAnimationFrame(function(){requestAnimationFrame(function(){nu.classList.add('in')})});return}
  busy=true;nu.style.zIndex=2;old.style.zIndex=1;nu.classList.add('show');media(n);
  var E='cubic-bezier(.77,0,.18,1)',tn=pickT(list[n],n),f=dir>0,D=1100,a,o,w=1920;
  var anim=function(el,kf,d,e){return el.animate(kf,{duration:d||D,easing:e||E,fill:'both'})};
  if(tn==='ring'){
    if(f){a=anim(nu,[{clipPath:'circle(0px at 50% 50%)'},{clipPath:'circle(1260px at 50% 50%)'}],1150);
      ring.animate([{opacity:1,transform:'scale(0)'},{opacity:1,transform:'scale(12.6)',offset:.85},{opacity:0,transform:'scale(13.5)'}],{duration:1150,easing:E});
      o=anim(old,[{transform:'scale(1)',filter:'brightness(1)'},{transform:'scale(.94)',filter:'brightness(.5)'}],1150)}
    else{a=anim(nu,[{clipPath:'circle(1260px at 50% 50%)'},{clipPath:'circle(1260px at 50% 50%)'}],1);
      o=anim(old,[{clipPath:'circle(1260px at 50% 50%)'},{clipPath:'circle(0px at 50% 50%)'}],1000);nu.style.zIndex=1;old.style.zIndex=2}
  }else if(tn==='wipe'){
    a=anim(nu,[{clipPath:f?'inset(100% 0 0 0)':'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0 0)'}]);
    o=anim(old,[{transform:'translateY(0)',filter:'brightness(1)'},{transform:'translateY('+(f?-9:9)+'%)',filter:'brightness(.45)'}]);
  }else if(tn==='push'){
    a=anim(nu,[{transform:'translateX('+(f?100:-100)+'%)'},{transform:'translateX(0)'}],1000);
    o=anim(old,[{transform:'translateX(0)',filter:'brightness(1)'},{transform:'translateX('+(f?-30:30)+'%)',filter:'brightness(.4)'}],1000);
  }else if(tn==='split'){
    a=anim(nu,[{clipPath:'inset(50% 0 50% 0)'},{clipPath:'inset(0 0 0 0)'}],1100);
    o=anim(old,[{transform:'scale(1)',filter:'brightness(1)'},{transform:'scale(1.06)',filter:'brightness(.4)'}],1100);
  }else if(tn==='diagonal'){
    var s0=f?'polygon(-30% 0,-30% 0,-60% 100%,-60% 100%)':'polygon(130% 0,130% 0,160% 100%,160% 100%)',s1=f?'polygon(-30% 0,130% 0,130% 100%,-60% 100%)':'polygon(130% 0,-30% 0,-30% 100%,160% 100%)';
    a=anim(nu,[{clipPath:s0},{clipPath:s1}],1100);
    o=anim(old,[{transform:'scale(1)',filter:'brightness(1)'},{transform:'scale(.95)',filter:'brightness(.45)'}],1100);
  }else if(tn==='zoom'){
    a=anim(nu,[{opacity:0,transform:'scale(1.35)',filter:'blur(14px)'},{opacity:1,transform:'scale(1)',filter:'blur(0)'}],1100);
    o=anim(old,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.78)'}],1100);nu.style.zIndex=2;
  }else{ // curtain: abre do centro para as laterais
    a=anim(nu,[{clipPath:'inset(0 50% 0 50%)'},{clipPath:'inset(0 0 0 0)'}],1200);
    o=anim(old,[{transform:'scale(1)',filter:'brightness(1)'},{transform:'scale(.92)',filter:'brightness(.4)'}],1200);
  }
  setTimeout(function(){nu.classList.add('in')},tn==='zoom'?250:(tn==='push'?300:380));
  a.onfinish=function(){
    a.cancel();old.getAnimations().forEach(function(x){x.cancel()});nu.getAnimations().forEach(function(x){x.cancel()});
    old.classList.remove('show','in');nu.style.zIndex='';old.style.zIndex='';cur=n;busy=false;
  };
  cur=n;
}
function next(){go(cur+1)}function prev(){go(cur-1)}

/* teclado, roda, toque, clique */
addEventListener('keydown',function(e){
  if(e.target.closest&&e.target.closest('input,textarea')){if(e.key==='Escape')closeEd();return}
  if($('#editor').hidden===false)return;
  if($('#overview').hidden===false){if(e.key==='Escape'||e.key==='g'||e.key==='G')closeOv();return}
  if(!$('#help').hidden){$('#help').hidden=true;return}
  var k=e.key;
  if(k==='ArrowRight'||k==='PageDown'||k===' '||k==='ArrowDown'){e.preventDefault();next()}
  else if(k==='ArrowLeft'||k==='PageUp'||k==='ArrowUp'){e.preventDefault();prev()}
  else if(k==='Home')go(0);else if(k==='End')go(list.length-1);
  else if(k==='g'||k==='G'||k==='Escape')openOv();
  else if(k==='f'||k==='F'){if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()}
  else if(k==='t'||k==='T'){var m=['auto'].concat(TRS);tmode=m[(m.indexOf(tmode)+1)%m.length];store.set('tmode',tmode);toast('Transição: '+(tmode==='auto'?'variada (auto)':tmode))}
  else if(k==='h'||k==='H'||k==='?')$('#help').hidden=false;
  else if(/^[1-9]$/.test(k))go(+k-1);
});
$('#help').addEventListener('click',function(){this.hidden=true});
var wl=0;addEventListener('wheel',function(e){if($('#overview').hidden===false)return;var t=Date.now();if(t-wl<1400||Math.abs(e.deltaY)<24)return;wl=t;e.deltaY>0?next():prev()},{passive:true});
var tx0=null;addEventListener('touchstart',function(e){tx0=e.touches[0].clientX},{passive:true});
addEventListener('touchend',function(e){if(tx0==null)return;var dx=e.changedTouches[0].clientX-tx0;if(Math.abs(dx)>50)dx<0?next():prev();tx0=null},{passive:true});
$('#viewport').addEventListener('click',function(e){if(e.target.closest('.cname'))return;e.clientX<innerWidth*.28?prev():next()});

/* cursor + parallax */
var cx=0,cy=0,tx=0,ty=0,cu=$('#cur');
addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;
  var nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5;
  if(els[cur])$$('.bg',els[cur]).forEach(function(b){var m=+b.dataset.par||20;b.style.transform='translate('+(-nx*m)+'px,'+(-ny*m)+'px)'});
  var on=e.target.closest&&e.target.closest('.media,.cname,.ov,button,#startPlay');cu.classList.toggle('big',!!on&&!e.target.closest('button'));
});
(function loop(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cu.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
var idle;addEventListener('mousemove',function(){$('#hud').classList.remove('off');clearTimeout(idle);idle=setTimeout(function(){$('#hud').classList.add('off')},3500)});

/* editor de texto da página */
var edId=null;
function openEd(id){edId=id;var s=byId[id],d=eff(s),f=$('#edFields');f.innerHTML='';$('#edTitle').textContent='Editar ('+lang.toUpperCase()+'): '+(s.label||s.name||s.id);
  leaves(base(s),'',[]).forEach(function(l){var v=(function(){var c=d;l[0].split('.').forEach(function(k){c=c&&c[k]});return c})();
    var w=document.createElement('label');w.innerHTML='<span>'+l[0].replace(/\./g,' › ')+'</span>';
    var i=document.createElement(v.length>60?'textarea':'input');i.value=v;i.dataset.path=l[0];i.dataset.orig=l[1];if(i.tagName==='TEXTAREA')i.rows=Math.min(6,Math.ceil(v.length/60));w.appendChild(i);f.appendChild(w)});
  $('#editor').hidden=false}
function closeEd(){$('#editor').hidden=true;edId=null}
$('#edSave').onclick=function(){var e={};$$('#edFields [data-path]').forEach(function(i){if(i.value!==i.dataset.orig)e[i.dataset.path]=i.value});
  if(Object.keys(e).length)edits[edId]=e;else delete edits[edId];store.set(ek(),edits);closeEd();commit()};
$('#edReset').onclick=function(){delete edits[edId];store.set(ek(),edits);closeEd();commit()};
$('#edCancel').onclick=closeEd;
/* visão geral: reordenar e ocultar */
function openOv(){renderOv();$('#overview').hidden=false}
function closeOv(){$('#overview').hidden=true}
function renderOv(){
  var g=$('#ovGrid');g.innerHTML='';var ids=getOrder(),dragId=null;
  ids.forEach(function(id,i){var s=byId[id],d=document.createElement('div');d.className='ov'+(hidden.indexOf(id)>=0?' off':'')+(list[cur]&&list[cur].id===id?' cur':'');d.draggable=true;d.dataset.id=id;
    var m=null;(function f(o){if(m)return;if(o&&o.poster)m=o.poster;else if(o&&o.img)m=o.img;else if(o&&typeof o==='object')Object.keys(o).forEach(function(k){f(o[k])})})(s);
    d.innerHTML=(m?'<img src="'+m+'" alt="">':'')+'<span class="n">'+pad(i+1)+'</span><div class="acts"><button class="eye" title="Ocultar ou mostrar">'+(hidden.indexOf(id)>=0?'Habilitar':'Desabilitar')+'</button><button class="ed" title="Editar textos">Editar</button></div><div class="ty">'+s.type+'</div><div class="t">'+(function(e){return e.label||e.name||(e.title&&e.title.join?e.title.join(' ').replace(/\*/g,''):e.id)})(eff(s))+'</div>';
    d.addEventListener('click',function(e){if(e.target.classList.contains('ed')){openEd(id);return}if(e.target.classList.contains('eye')){var h=hidden.indexOf(id);h>=0?hidden.splice(h,1):hidden.push(id);store.set('hidden',hidden);renderOv();return}
      closeOv();if(hidden.indexOf(id)>=0)return;var at=list.findIndex(function(x){return x.id===id});go(at,true)});
    d.addEventListener('dragstart',function(e){dragId=id;d.classList.add('dragging');e.dataTransfer.setData('text/plain',id)});
    d.addEventListener('dragend',function(){d.classList.remove('dragging')});
    d.addEventListener('dragover',function(e){e.preventDefault();d.classList.add('over')});d.addEventListener('dragleave',function(){d.classList.remove('over')});
    d.addEventListener('drop',function(e){e.preventDefault();var from=getOrder(),a=from.indexOf(dragId),b=from.indexOf(id);if(a<0||a===b)return;from.splice(b,0,from.splice(a,1)[0]);order=from;store.set('order',order);commit()});
    g.appendChild(d)});
}
function commit(){var id=list[cur]&&list[cur].id;build();cur=-1;var at=list.findIndex(function(x){return x.id===id});go(at<0?0:at,true);renderOv()}
$('#ovClose').onclick=closeOv;$('#ovReset').onclick=function(){order=null;hidden=[];edits={};store.set('order',null);store.set('hidden',[]);store.set('edits',{});store.set('edits.en',{});commit()};

/* motivo visual: waves | dots | rings (tecla M alterna) */
var MOTIFS=['waves','dots','rings'],motif=store.get('motif','waves'),mx=.5,my=.5;
addEventListener('mousemove',function(e){mx=e.clientX/innerWidth;my=e.clientY/innerHeight});
addEventListener('keydown',function(e){if(e.target.closest&&e.target.closest('input,textarea'))return;if(e.key==='m'||e.key==='M'){motif=MOTIFS[(MOTIFS.indexOf(motif)+1)%MOTIFS.length];store.set('motif',motif)}});
var T0=performance.now();
function draw(c,t){
  var S=+c.dataset.s,sc=Math.min(2,(+stage.dataset.s||1)*(devicePixelRatio||1)),W=Math.round(S*sc);
  if(c.width!==W){c.width=W;c.height=W}
  var g=c.getContext('2d');g.setTransform(sc,0,0,sc,0,0);g.clearRect(0,0,S,S);
  g.strokeStyle=g.fillStyle=getComputedStyle(c).color;var cx=S/2,cy=S/2;
  if(motif==='waves'){
    var N=54,gap=S/N*.9,y0=S*.05;g.lineWidth=2;
    for(var i=0;i<N;i++){g.beginPath();
      for(var x=0;x<=S;x+=10){
        var env=.55+.45*Math.sin(x*.0042+t*.35+(mx-.5)*1.5);
        var y=y0+i*gap+(Math.sin(x*.0065+t*.55+i*.11)*S*.085+Math.sin(x*.0135-t*.4+i*.07)*S*.025)*env+Math.sin(i*.2+t*.3)*S*.02;
        x?g.lineTo(x,y):g.moveTo(x,y)}
      g.globalAlpha=.55+.45*Math.abs(Math.sin(i*.31+t*.2));g.stroke()}
  }else if(motif==='dots'){
    var step=S/32;
    for(var a=0;a<32;a++)for(var b=0;b<32;b++){var px=a*step+step/2,py=b*step+step/2,d=Math.hypot(px-cx,py-cy);
      var r=(.5+.5*Math.sin(d*.022-t*1.1+Math.sin(px*.01+t*.4)*1.4))*step*.2+.4;
      g.globalAlpha=.8;g.beginPath();g.arc(px,py,r,0,6.2832);g.fill()}
  }else{
    g.lineWidth=2;for(var k=0;k<5;k++){g.beginPath();g.globalAlpha=.9-k*.1;g.arc(cx,cy,S*(.48-k*.075)*(1+.012*Math.sin(t*.8+k)),0,6.2832);g.stroke()}
  }
  g.globalAlpha=1;
}
(function fl(){var t=(performance.now()-T0)/1000;$$('.slide.show .flow').forEach(function(c){draw(c,t)});requestAnimationFrame(fl)})();

/* idioma e tela inicial */
function setLang(l){lang=l;window.LANG=l;store.set('lang',l);edits=store.get(ek(),{});document.documentElement.lang=l==='en'?'en':'pt-BR';var b=$('#ovLang');if(b)b.textContent=l==='en'?'Idioma: EN':'Idioma: PT-BR'}
function switchLang(l){setLang(l);commit();toast(l==='en'?'Language: English':'Idioma: Português (BR)')}
var st=$('#start');
function begin(l){if(l&&l!==lang)setLang(l);build();cur=-1;var h=parseInt(location.hash.slice(1),10);go(isNaN(h)?0:h-1,true);st.classList.add('out');setTimeout(function(){st.hidden=true},1000)}
$$('#start [data-lang]').forEach(function(b){b.addEventListener('click',function(e){e.stopPropagation();begin(b.dataset.lang)})});
$('#startPlay').addEventListener('click',function(){begin(lang)});
$('#startPlay').addEventListener('mouseenter',function(){var v=$('#startPlay video');if(v&&!v.src){v.src=v.dataset.src}if(v){var p=v.play();if(p&&p.catch)p.catch(function(){})}});
$('#startPlay').addEventListener('mouseleave',function(){var v=$('#startPlay video');if(v)try{v.pause()}catch(e){}});
setLang(lang);
$('#ovLang').onclick=function(){switchLang(lang==='en'?'pt':'en')};
addEventListener('keydown',function(e){if(st.hidden||st.classList.contains('out'))return;e.stopImmediatePropagation();var k=e.key;if(k==='Enter'||k===' ')begin(lang);else if(k==='p'||k==='P')begin('pt');else if(k==='e'||k==='E')begin('en')},true);
addEventListener('keydown',function(e){if(e.target.closest&&e.target.closest('input,textarea'))return;if(e.key==='l'||e.key==='L')switchLang(lang==='en'?'pt':'en')});
build();
var h=parseInt(location.hash.slice(1),10);go(isNaN(h)?0:h-1,true);
if(q.get('play')!==null)begin(q.get('play')==='en'?'en':(q.get('play')==='pt'?'pt':lang));
window.__pres={go:go,list:function(){return list},count:function(){return list.length}};
})();
