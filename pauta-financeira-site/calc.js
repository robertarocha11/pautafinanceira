(function(){
var f=function(n){return n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})};
var p=function(n){return n.toLocaleString("pt-BR",{maximumFractionDigits:1})+"%"};
function juros(ini,apo,tx,anos){var m=Math.pow(1+tx/100,1/12)-1,n=Math.round(anos*12),s=ini;for(var k=0;k<n;k++)s=s*(1+m)+apo;var inv=ini+apo*n;return{total:s,inv:inv,jur:s-inv}}
function rural(a,prod,preco,cv,cf){var rec=a*prod*preco,cust=a*cv+cf,un=a*prod;return{rec:rec,cust:cust,luc:rec-cust,mar:rec?(rec-cust)/rec*100:0,cu:un?cust/un:0,eq:a*preco?cust/(a*preco):0}}
window.PF={juros:juros,rural:rural};
if(typeof document==="undefined")return;
function fld(id,l,v){return '<label for="'+id+'">'+l+'</label><input id="'+id+'" type="number" inputmode="decimal" min="0" step="any" value="'+v+'">'}
function setup(box,title,fields,note,run){
 box.innerHTML='<h3>'+title+'</h3><div class="cg">'+fields.map(function(x){return fld(x[0],x[1],x[2])}).join("")+'</div><button type="button" class="calc-go">Calcular</button><button type="button" class="calc-clr b2">Limpar</button><div class="calc-out" aria-live="polite"></div><p class="calc-note">'+note+'</p>';
 var out=box.querySelector(".calc-out");
 box.querySelector(".calc-go").onclick=function(){var v=[];for(var i=0;i<fields.length;i++){var n=parseFloat(String(box.querySelector("#"+fields[i][0]).value).replace(",","."));
  if(!isFinite(n)||n<0){out.innerHTML='<p class="err">Preencha "'+fields[i][1]+'" com um número válido, zero ou maior.</p>';return}v.push(n)}
  out.innerHTML=run(v)};
 box.querySelector(".calc-clr").onclick=function(){box.querySelectorAll("input").forEach(function(i){i.value=""});out.innerHTML=""}}
document.querySelectorAll("[data-calc]").forEach(function(box){
 if(box.dataset.calc==="juros")setup(box,"Calculadora de juros compostos e aportes mensais",[["ini","Valor inicial (R$)",1000],["apo","Aporte mensal (R$)",300],["tx","Taxa de juros ao ano (%)",10],["an","Prazo (anos)",10]],
  "Valores de exemplo. Hipóteses: taxa anual convertida em taxa mensal equivalente, aportes no fim de cada mês, sem impostos, taxas ou inflação. Simulação educativa, sem garantia de rentabilidade.",
  function(v){var r=juros(v[0],v[1],v[2],v[3]),w=r.total?r.inv/r.total*100:0;
   return '<p class="big">'+f(r.total)+'</p><p>Total acumulado ao final do prazo.</p><div class="bar" role="img" aria-label="Investido '+w.toFixed(0)+'% e juros '+(100-w).toFixed(0)+'% do total"><span style="width:'+w+'%"></span></div><p class="leg"><i class="d1"></i>Total investido: '+f(r.inv)+' &nbsp; <i class="d2"></i>Juros acumulados: '+f(r.jur)+'</p>'});
 if(box.dataset.calc==="rural")setup(box,"Calculadora de custo de produção e margem rural",[["ha","Área plantada (hectares)",100],["pr","Produtividade (unidades por hectare, ex.: sacas/ha)",60],["pv","Preço de venda por unidade (R$)",120],["cv","Custo variável por hectare (R$)",4500],["cf","Custos fixos totais do período (R$)",50000]],
  "Valores de exemplo, não são referência de mercado. Use a mesma unidade na produtividade e no preço. Hipóteses: não considera impostos, contribuições, juros de financiamento nem variação de preço.",
  function(v){var r=rural(v[0],v[1],v[2],v[3],v[4]);
   return '<p class="big">'+(r.luc>=0?"Resultado: ":"Prejuízo: ")+f(Math.abs(r.luc))+'</p><ul><li>Receita total: '+f(r.rec)+'</li><li>Custo total: '+f(r.cust)+'</li><li>Margem sobre a receita: '+p(r.mar)+'</li><li>Custo por unidade produzida: '+f(r.cu)+'</li><li>Produtividade de equilíbrio: '+r.eq.toLocaleString("pt-BR",{maximumFractionDigits:1})+' unidades por hectare</li></ul>'})});
})();
