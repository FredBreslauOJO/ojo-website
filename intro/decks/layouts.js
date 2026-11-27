/* Tipos de página (layouts). Cada um recebe um objeto de dados e devolve HTML.
   Posições fixas em um palco 1920x1080. Para criar uma página nova: escolha o tipo e preencha os dados. */
(function(){
var esc=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')};
// *palavra* -> destaque laranja; [texto] -> placeholder
var tx=function(s){return esc(s).replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/\[([^\]]+)\]/g,'<span class="ph">[$1]</span>')};
var lines=function(arr,d0,st){d0=d0||0;st=st==null?.1:st;return arr.map(function(t,i){return '<span class="ln"><span style="--d:'+(d0+i*st).toFixed(2)+'">'+tx(t)+'</span></span>'}).join('')};
var rv=function(cls,d,inner,style,tag){return '<'+(tag||'div')+' class="rv '+cls+'" style="--d:'+d+';'+(style||'')+'">'+inner+'</'+(tag||'div')+'>'};
var pos=function(x,y,w,h){return 'position:absolute;left:'+x+'px;top:'+y+'px;'+(w!=null?'width:'+w+'px;':'')+(h!=null?'height:'+h+'px;':'')};
var media=function(m,x,y,w,h,d,cls,tag){
  if(!m)return '';var s='<div class="media '+(cls||'mask')+'" style="'+pos(x,y,w,h)+'--d:'+(d||0)+'">';
  if(m.video)s+='<video muted loop playsinline preload="none" poster="'+m.poster+'" data-src="'+m.video+'"></video>';
  else s+='<img src="'+m.img+'" alt="">';
  if(tag)s+='<span class="tag">'+esc(tag)+'</span>';
  return s+'</div>';
};
var rings=function(x,y,s,o){s=Math.round(s*1.15);x=Math.round(x-(s-0)*.075);y=Math.round(y-(s)*.075);return '<canvas class="flow" data-s="'+s+'" style="left:'+x+'px;top:'+y+'px;width:'+s+'px;height:'+s+'px;--o:'+(o||.5)+'"></canvas>'};
var bg=function(src,dim){return '<div class="bg'+(dim?' dim':'')+'" data-par="24" style="background-image:url('+src+')"></div>'};
var title=function(cls,arr,d0,st){return '<div class="'+cls+'">'+lines(arr,d0,st)+'</div>'};

var UI={pt:{cover:'Apresentação comercial',prep:'PREPARADO PARA',yes:'FAZ SENTIDO SE',no:'NÃO FAZ SENTIDO SE',ch:'O desafio',did:'O que fizemos',res:'O resultado',client:'Nome do cliente'},
 en:{cover:'Commercial presentation',prep:'PREPARED FOR',yes:'MAKES SENSE IF',no:'DOES NOT MAKE SENSE IF',ch:'The challenge',did:'What we did',res:'The result',client:'Client name'}};
var U=function(){return UI[window.LANG||'pt']};
var L={};

L.cover=function(d){return bg('img/cover-bg.webp')
 +rings(1010,-120,1180,.55)
 +'<div class="grain"></div><div class="pad">'
 +rv('fade',.2,'<div class="eyebrow">'+esc(d.kicker||U().cover)+'</div>','position:absolute;left:140px;top:140px')
 +'<div style="position:absolute;left:140px;top:300px">'+title('h1',d.title||['OJO','Studio'],.25,.12)+'</div>'
 +'<div class="meta">'+rv('',.8,'<div class="mut" style="font:500 18px var(--sans);letter-spacing:.28em;margin-bottom:14px">'+esc(d.prep||U().prep)+'</div><div class="cname" contenteditable="true" spellcheck="false" data-key="client">'+esc(d.client||U().client)+'</div>')
 +rv('fade',.9,'<div class="date" contenteditable="true" spellcheck="false" data-key="date" title="Clique para editar a data">'+esc(d.date||'')+'</div>')+'</div></div>'};

L.divider=function(d){return bg('img/nebula.webp',1)+rings(1180,140,900,.35)+'<div class="grain"></div><div class="pad">'
 +rv('fade',.1,'<div class="num" style="font-size:26px">'+esc(d.num||'')+'</div>','position:absolute;left:140px;top:140px')
 +'<div style="position:absolute;left:140px;top:380px">'+title('h1',d.title,.2,.12)+'</div>'
 +(d.sub?rv('',.7,'<p class="p lg">'+tx(d.sub)+'</p>','position:absolute;left:140px;top:830px;width:900px'):'')+'</div>'};

L.statement=function(d){return (d.bg?bg(d.bg,1):'')+rings(d.rx||1130,d.ry||60,d.rs||1000,.35)+'<div class="pad">'
 +(d.eyebrow?rv('fade',0,esc(d.eyebrow),'position:absolute;left:140px;top:130px','div').replace('class="rv fade"','class="rv fade eyebrow"'):'')
 +'<div style="position:absolute;left:140px;top:'+(d.top||280)+'px;width:1500px">'+title(d.size||'h1',d.lines,.15,.12)+'</div>'
 +(d.sub?rv('',.7,'<p class="p lg">'+tx(d.sub)+'</p>','position:absolute;left:140px;bottom:110px;width:1000px'):'')+'</div>'};

// texto + mídia (media à direita ou à esquerda)
L.split=function(d){var left=d.side==='left',tx0=left?960:140,mx=left?0:960;
 return '<div class="pad" style="padding:0">'
 +media(d.media,mx,0,960,1080,0,left?'maskr':'mask',d.tag).replace('border-radius:6px','border-radius:0')
 +rv('fade',.1,esc(d.eyebrow||''),'position:absolute;left:'+(tx0+(left?100:0))+'px;top:140px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:'+(tx0+(left?100:0))+'px;top:230px;width:'+(left?780:700)+'px">'+title('h2',d.title,.2,.1).replace('h2','h3')+'</div>'
 +rv('',.6,'<p class="p lg">'+tx(d.text)+'</p>','position:absolute;left:'+(tx0+(left?100:0))+'px;top:'+(d.ty||560)+'px;width:'+(left?740:680)+'px')+'</div>'};

L.triple=function(d){var o='<div class="pad">'+rv('fade',0,esc(d.eyebrow||''),'position:absolute;left:140px;top:130px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:140px;top:220px;width:1500px">'+title('h2',d.title,.1,.1)+'</div>';
 d.items.forEach(function(it,i){var x=140+i*580;
  o+=rv('rowline',.5+i*.14,'<div class="num" style="margin-bottom:26px">0'+(i+1)+'</div><div class="h4" style="margin-bottom:22px">'+tx(it.t)+'</div><p class="p" style="font-size:26px">'+tx(it.d)+'</p>',pos(x,520,500));});
 return o+(d.foot?rv('',1.1,'<p class="p lg" style="color:inherit">'+tx(d.foot)+'</p>','position:absolute;left:140px;bottom:100px;width:1400px'):'')+'</div>'};

L.video=function(d){return '<div class="media maskr" style="inset:0;position:absolute;border-radius:0;--d:0"><video muted loop playsinline preload="none" poster="'+d.media.poster+'" data-src="'+d.media.video+'"></video></div>'
 +'<div class="bg dim" style="opacity:.55;background:none"></div><div class="pad" style="background:linear-gradient(0deg,rgba(0,0,0,.7),transparent 45%)">'
 +rv('fade',.5,esc(d.eyebrow||''),'position:absolute;left:140px;bottom:230px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:140px;bottom:100px">'+title('h3',d.title,.6,.1)+'</div></div>'};

L.gallery=function(d){var o='<div class="pad">'+rv('fade',0,esc(d.eyebrow||''),'position:absolute;left:140px;top:110px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:140px;top:170px">'+title('h3',d.title,.1,.1)+'</div>';
 var n=d.items.length,w=Math.floor((1640-(n-1)*30)/n);
 d.items.forEach(function(m,i){o+=media(m,140+i*(w+30),400,w,560,.3+i*.15,'mask',m.tag)});return o+'</div>'};

L.table=function(d){var o='<div class="pad">'+rv('fade',0,esc(d.eyebrow||''),'position:absolute;left:140px;top:110px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:140px;top:170px">'+title('h3',d.title,.1,.1)+'</div>';
 var t='<table class="tbl"><thead><tr>'+d.cols.map(function(c){return '<th>'+esc(c)+'</th>'}).join('')+'</tr></thead><tbody>'
  +d.rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+tx(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table>';
 o+=rv('',.5,t,pos(140,380,980));
 var mx=Math.max.apply(null,d.chart.values),bars='';
 d.chart.values.forEach(function(v,i){bars+='<div class="bar" style="--h:'+Math.round(v/mx*100)+'%"><b style="--d:'+(.7+i*.12)+'"></b><i>'+esc(d.chart.labels[i])+'</i><u>'+v+'</u></div>'});
 return o+rv('fade',.6,'<div class="mut" style="font:600 16px var(--sans);letter-spacing:.22em;text-transform:uppercase;margin-bottom:30px">'+esc(d.chart.title)+'</div><div class="bars">'+bars+'</div>',pos(1240,380,540))+'</div>'};

L.logos=function(d){var n=d.logos.length,cols=n>8?5:4,rh=n>8?162:204;var o='<div class="pad">'+rv('fade',0,esc(d.eyebrow||''),'position:absolute;left:140px;top:130px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:140px;top:210px">'+title('h2',d.title,.1,.1)+'</div>'
 +rv('',.5,'<p class="p lg">'+tx(d.sub)+'</p>','position:absolute;left:140px;top:340px;width:1200px')
 +'<div class="logos" style="top:'+(n>8?410:420)+'px;grid-template-columns:repeat('+cols+',1fr)">'+d.logos.map(function(l,i){return '<div class="'+((i+1)%cols===0?'lc':'')+'" style="height:'+rh+'px"><img src="'+l+'" alt="" width="204" height="77" style="--d:'+(.5+i*.06).toFixed(2)+'"></div>'}).join('')+'</div></div>';return o};

L.awards=function(d){var o='<div class="pad">'+rv('fade',0,esc(d.eyebrow||''),'position:absolute;left:140px;top:130px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:140px;top:210px">'+title('h2',d.title,.1,.1)+'</div>'
 +rv('',.5,'<p class="p lg">'+tx(d.sub)+'</p>','position:absolute;left:140px;top:345px;width:1300px')
 +'<div class="awards">';
 d.items.forEach(function(a,i){o+=rv('aw',.5+i*.12,'<div class="im"><img src="'+a.img+'" alt=""></div><b>'+esc(a.t)+'</b><span>'+tx(a.s)+'</span>')});
 return o+'</div></div>'};

// grade de 4 cards com mídia (O que entregamos)
L.cards4=function(d){var o='<div class="pad">'+rv('fade',0,esc(d.eyebrow||''),'position:absolute;left:140px;top:110px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:140px;top:170px">'+title('h2',d.title,.1,.1)+'</div>';
 d.items.forEach(function(it,i){var w=387,x=140+i*(w+30);
  o+=media(it.media,x,350,w,380,.3+i*.12,'mask',null)
   +rv('',.7+i*.12,'<div class="num" style="margin-bottom:16px">0'+(i+1)+'</div><div class="h4" style="margin-bottom:14px">'+esc(it.t)+'</div><p class="p" style="font-size:22px;line-height:1.45">'+tx(it.d)+'</p>',pos(x,770,w));});
 return o+'</div>'};

// case: 3 mídias + texto
L.case=function(d){var o='<div class="pad" style="padding:0">'
 +rv('fade',0,'<img class="logo-i" src="'+d.logo+'" alt="" style="height:'+(d.logoH||36)+'px">'+(d.badge?'<img class="badge-img" src="'+d.badge+'" alt="Red Dot Winner">':'')+(d.badges?d.badges.map(function(b){return '<img class="badge-img round" src="'+b+'" alt="">'}).join(''):''),'position:absolute;left:140px;top:110px;height:64px;display:flex;align-items:center;gap:22px')
 +(d.stat?rv('',.4,'<div class="h2" style="color:var(--or);text-align:right;line-height:1">'+esc(d.stat.n)+'</div><div class="mut" style="font:600 16px var(--sans);letter-spacing:.16em;text-transform:uppercase;text-align:right;margin-top:8px">'+esc(d.stat.l)+'</div>','position:absolute;left:520px;width:240px;top:104px'):'')
 +rv('fade',.05,esc(d.num),'position:absolute;left:140px;top:210px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:140px;top:250px">'+title('h2',[d.name],.15,.1)+'</div>'
 +rv('fade',.3,'<span class="mut" style="font:500 18px var(--sans);letter-spacing:.14em;text-transform:uppercase">'+esc(d.tags)+'</span>','position:absolute;left:140px;top:395px');
 [[U().ch,d.a],[U().did,d.b],[U().res,d.c]].forEach(function(r,i){
  o+=rv('rowline',.5+i*.12,'<div class="num" style="font-size:16px;margin-bottom:12px;color:var(--or)">'+r[0].toUpperCase()+'</div><p class="p" style="font-size:22px;line-height:1.42">'+tx(r[1])+'</p>',pos(140,470+i*172,620))});
 o+=media(d.media[0],830,110,950,535,.1,'mask',d.tag)+media(d.media[1],830,670,465,300,.35,'mask')+media(d.media[2],1315,670,465,300,.5,'mask');
 return o+'</div>'};

L.audience=function(d){var o='<div class="pad">'
 +'<div style="position:absolute;left:140px;top:120px">'+title('h2',d.title,0,.1)+'</div>'
 +rv('fade',.4,U().yes,'position:absolute;left:140px;top:420px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +rv('fade',.5,U().no,'position:absolute;left:1060px;top:420px','div').replace('class="rv fade"','class="rv fade eyebrow mutc"');
 d.yes.forEach(function(t,i){o+=rv('rowline',.6+i*.12,'<div class="num" style="margin-bottom:12px">0'+(i+1)+'</div><p class="p" style="font-size:26px;color:var(--paper)">'+tx(t)+'</p>',pos(140,480+i*160,760))});
 d.no.forEach(function(t,i){o+=rv('rowline',.7+i*.12,'<p class="p mut" style="font-size:26px;padding-top:28px">'+tx(t)+'</p>',pos(1060,480+i*160,720))});
 o+=rings(1330,-120,560,.5)
 +rv('',.9,'<div class="h4" style="text-align:right;color:var(--or)">'+d.quote.map(esc).join('<br>')+'</div>','position:absolute;right:230px;top:130px')
 return o+'</div>'};

L.twocol=function(d){var o='<div class="pad">';
 d.cols.forEach(function(c,i){var x=140+i*830;
  o+=rv('fade',.1+i*.15,esc(c.eyebrow||''),'position:absolute;left:'+x+'px;top:130px','div').replace('class="rv fade"','class="rv fade eyebrow"')
   +'<div style="position:absolute;left:'+x+'px;top:210px;width:760px">'+title('h2',c.title,.2+i*.15,.1)+'</div>'
   +rv('',.6+i*.15,'<p class="p lg">'+tx(c.lead)+'</p>',pos(x,470,740));
  c.points.forEach(function(p,j){o+=rv('rowline',.85+i*.15+j*.1,'<p class="p" style="font-size:26px;color:inherit">'+tx(p)+'</p>',pos(x,640+j*104,740))});});
 return o+'</div>'};

L.europe=function(d){var o='<div class="pad">'+rv('fade',0,esc(d.eyebrow||''),'position:absolute;left:140px;top:120px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:140px;top:190px">'+title('h2',d.title,.1,.1)+'</div>';
 d.items.forEach(function(it,i){o+=rv('rowline',.5+i*.14,'<div class="h4" style="margin-bottom:20px">'+esc(it.t)+'</div><p class="p" style="font-size:26px;color:inherit">'+tx(it.d)+'</p>',pos(140+i*580,460,500))});
 return o+rv('',1.1,'<div class="h3">'+d.quote.map(function(q,i){return i?'<em>'+esc(q)+'</em>':esc(q)}).join('<br>')+'</div>','position:absolute;left:140px;bottom:100px')+'</div>'};

L.process=function(d){var o='<div class="pad">'+rv('fade',0,esc(d.eyebrow||''),'position:absolute;left:140px;top:120px','div').replace('class="rv fade"','class="rv fade eyebrow"')
 +'<div style="position:absolute;left:140px;top:190px">'+title('h2',d.title,.1,.1)+'</div>'
 +rv('',.4,'<p class="p lg">'+tx(d.sub)+'</p>','position:absolute;left:140px;top:320px;width:1200px')
 +'<div class="hl" style="left:140px;top:470px;width:1640px;--d:.6"></div>';
 d.items.forEach(function(it,i){var x=140+i*420;
  o+='<div class="dot rv fade" style="left:'+x+'px;top:460px;--d:'+(.7+i*.15)+'"></div>'
   +rv('',.75+i*.15,'<div class="num" style="margin-bottom:18px">0'+(i+1)+'</div><div class="h4" style="margin-bottom:18px">'+esc(it.t)+'</div><p class="p" style="font-size:22px;line-height:1.45;margin-bottom:18px">'+tx(it.d)+'</p><p style="font:600 22px/1.4 var(--sans);color:var(--or)">'+tx(it.o)+'</p>',pos(x,520,370))});
 return o+rv('fade',1.4,'<span class="mut" style="font-size:22px">'+tx(d.foot)+'</span>','position:absolute;left:140px;bottom:90px')+'</div>'};

L.cta=function(d){return bg('img/nebula.webp',1)+'<div class="grain"></div><div class="pad">'
 +'<div style="position:absolute;left:140px;top:130px">'+title('h1',d.title,.1,.12).replace('h1','h2')+'</div>'
 +rv('',.4,'<p class="p lg">'+tx(d.sub)+'</p>','position:absolute;left:140px;top:360px')
 +d.items.map(function(it,i){return rv('rowline',.6+i*.14,'<div class="h4" style="margin-bottom:12px">'+esc(it.t)+'</div><p class="p" style="font-size:22px;margin-bottom:14px">'+tx(it.d)+'</p><p style="font:600 18px var(--sans);color:var(--or)">'+tx(it.o)+'</p>',pos(140+i*580,500,500))}).join('')
 +rv('',1.1,'<p class="p" style="font-size:22px;color:var(--paper)">'+tx(d.when)+'</p><p class="p" style="font-size:22px;color:var(--paper);margin-top:6px">'+tx(d.invest)+'</p>','position:absolute;left:140px;top:850px;width:1500px')
 +rv('fade',1.3,'<span class="eyebrow" style="letter-spacing:.2em">'+esc(d.contact)+'</span>','position:absolute;left:140px;bottom:70px')+'</div>'};

L.closing=function(d){return bg('img/cover-bg.webp')+rings(560,-80,1300,.35)+'<div class="grain"></div><div class="pad">'
 +'<img class="rv sc" style="--d:.2;position:absolute;left:838px;top:370px;width:245px" src="img/logo-ojo.webp" alt="OJO">'
 +rv('fade',.9,'<span class="eyebrow" style="letter-spacing:.3em;font-size:11px">'+esc(d.url)+'</span>','position:absolute;left:0;right:0;top:500px;text-align:center')
 +rv('fade',1.1,'<p class="legal">'+esc(d.pt)+'</p><p class="legal">'+esc(d.en)+'</p>','position:absolute;left:0;right:0;bottom:56px;display:flex;flex-direction:column;align-items:center')+'</div>'};

window.LAYOUTS=L;window.LX={tx:tx};
})();
