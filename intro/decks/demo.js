/* Deck de demonstração: um exemplo de cada tipo de página genérico. Abra com index.html?deck=demo */
(function(){
var V=function(n){return {video:'media/'+n+'.mp4',poster:'media/'+n+'.jpg'}};
window.DECKS=window.DECKS||{};
window.DECKS.demo={name:'demo',title:'Tipos de página',slides:[
 {id:'d-cover',type:'cover',theme:'dark',section:'Capa',client:'NOME DO CLIENTE',date:'DD · MM · AA'},
 {id:'d-div',type:'divider',theme:'dark',section:'Divisória',num:'01',title:['Título da','*seção.*'],sub:'Subtítulo opcional da divisória.'},
 {id:'d-stmt',type:'statement',theme:'orange',section:'Frase',size:'hx',lines:['Uma frase grande,','*em destaque.*']},
 {id:'d-split-r',type:'split',theme:'dark',section:'Texto + mídia',side:'right',eyebrow:'Texto + vídeo',title:['Título da','página'],text:'Parágrafo de apoio. A mídia pode ser vídeo em loop ou imagem, à direita ou à esquerda.',media:V('hublot-2'),tag:'Legenda'},
 {id:'d-split-l',type:'split',theme:'light',section:'Texto + mídia',side:'left',eyebrow:'Texto + imagem',title:['Mídia à','esquerda'],text:'A mesma estrutura espelhada, para variar o ritmo.',media:{img:'img/web-ojo.jpg'}},
 {id:'d-triple',type:'triple',theme:'dark',section:'Três colunas',eyebrow:'Três colunas',title:['Três pontos,','*uma ideia.*'],items:[{t:'Primeiro',d:'Texto curto.'},{t:'Segundo',d:'Texto curto.'},{t:'Terceiro',d:'Texto curto.'}],foot:'Linha de fechamento opcional.'},
 {id:'d-video',type:'video',theme:'dark',section:'Vídeo',eyebrow:'Página de vídeo',title:['Vídeo em tela cheia'],media:V('front-branding')},
 {id:'d-gal',type:'gallery',theme:'dark',section:'Galeria',eyebrow:'Imagens',title:['Galeria'],items:[V('bmw-1'),V('bmw-2'),V('bmw-3')]},
 {id:'d-tbl',type:'table',theme:'dark',section:'Tabela',eyebrow:'Dados',title:['Tabela e *gráfico*'],cols:['Item','Valor','Nota'],rows:[['Alpha','120','Texto'],['Beta','85','Texto'],['Gama','140','Texto'],['Delta','60','Texto']],chart:{title:'Valor por item',labels:['A','B','C','D'],values:[120,85,140,60]}},
 {id:'d-logos',type:'logos',theme:'light',section:'Logos',eyebrow:'Logos',title:['Grade de *logos*'],sub:'Oito logos, fundo claro.',logos:['img/cl-schott.png','img/cl-siemens.png','img/cl-ferrero.png','img/cl-subway.png','img/cl-nespresso.png','img/cl-merkle.png','img/cl-dentsu.png','img/cl-plane.png']},
 {id:'d-end',type:'closing',theme:'dark',section:'Final',url:'www.ojo-studio.com',pt:'Texto legal em português.',en:'Legal text in English.'}
]};
})();
