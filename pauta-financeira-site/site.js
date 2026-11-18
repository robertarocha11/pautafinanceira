(function(){
/* CONFIGURAÇÃO DO ADSENSE: preencha após a aprovação (ex.: "ca-pub-1234567890123456" e o ID numérico do bloco) */
var CFG={ADSENSE_CLIENT:"",ADSENSE_SLOT:""};
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function ticker(){var box=document.getElementById("ticker"),L=window.INDICADORES;if(!box||!L)return;
 var ul=el("ul");L.forEach(function(i){var li=el("li"),v=el("strong",0,i.valor),s=el("small",0,i.data+" · "+i.fonte);
  li.appendChild(el("span","n",i.nome));li.appendChild(v);li.appendChild(s);ul.appendChild(li);
  if(i.live&&window.fetch){var k=i.live.replace("-","");fetch("https://economia.awesomeapi.com.br/last/"+i.live).then(function(r){return r.json()}).then(function(d){var x=d[k],b=parseFloat(x.bid);if(!isFinite(b))return;
   v.textContent="R$ "+b.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});s.textContent=x.create_date.slice(8,10)+"/"+x.create_date.slice(5,7)+"/"+x.create_date.slice(0,4)+" · AwesomeAPI"}).catch(function(){})}});
 box.appendChild(ul)}
function ads(){if(ls("pf_consent")!=="accepted"||!CFG.ADSENSE_CLIENT)return;
 var slots=document.querySelectorAll(".ad-slot");if(!slots.length)return;document.body.classList.add("ads-on");
 var s=el("script");s.async=true;s.crossOrigin="anonymous";s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client="+CFG.ADSENSE_CLIENT;document.head.appendChild(s);
 slots.forEach(function(d){var i=el("ins","adsbygoogle");i.style.display="block";i.setAttribute("data-ad-client",CFG.ADSENSE_CLIENT);i.setAttribute("data-ad-slot",CFG.ADSENSE_SLOT);i.setAttribute("data-ad-format","auto");i.setAttribute("data-full-width-responsive","true");d.appendChild(i);(window.adsbygoogle=window.adsbygoogle||[]).push({})})}
function banner(){if(document.getElementById("pf-banner"))return;var b=el("div");b.id="pf-banner";b.setAttribute("role","dialog");b.setAttribute("aria-label","Aviso de cookies");
 b.innerHTML='<p>Usamos armazenamento local para lembrar sua escolha e, se você aceitar, cookies de terceiros para anúncios e links de afiliados. Saiba mais na <a href="/privacidade/">Política de privacidade</a>.</p><div><button type="button" class="b2" id="pf-no">Recusar</button><button type="button" id="pf-ok">Aceitar</button></div>';
 document.body.appendChild(b);function done(v){ls("pf_consent",v);b.remove();if(v==="accepted")ads()}
 document.getElementById("pf-ok").onclick=function(){done("accepted")};document.getElementById("pf-no").onclick=function(){done("refused")}}
ticker();
if(!ls("pf_consent"))banner();else ads();
var g=document.getElementById("pf-cookies");if(g)g.onclick=function(e){e.preventDefault();try{localStorage.removeItem("pf_consent")}catch(x){}banner()};
})();
