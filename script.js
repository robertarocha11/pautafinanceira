(function () {
  "use strict";

  // Menu mobile
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector("nav.principal");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var aberto = nav.classList.toggle("aberto");
      btn.setAttribute("aria-expanded", String(aberto));
    });
  }

  // Consentimento de cookies (armazenado localmente no navegador)
  var banner = document.getElementById("cookie-banner");
  function gravaEscolha(valor) {
    localStorage.setItem("pf-consent", valor);
    if (banner) banner.style.display = "none";
  }
  if (banner && !localStorage.getItem("pf-consent")) {
    banner.style.display = "block";
  }
  var aceitar = document.getElementById("cookie-aceitar");
  var recusar = document.getElementById("cookie-recusar");
  if (aceitar) aceitar.addEventListener("click", function () { gravaEscolha("aceito"); });
  if (recusar) recusar.addEventListener("click", function () { gravaEscolha("recusado"); });
  var reabrir = document.getElementById("pf-cookies");
  if (reabrir) {
    reabrir.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("pf-consent");
      if (banner) banner.style.display = "block";
    });
  }

  // Utilitários
  function valor(id) {
    var el = document.getElementById(id);
    var v = el ? parseFloat(el.value) : NaN;
    return isNaN(v) ? 0 : v;
  }
  function brl(v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
  function mostra(id, html) {
    var r = document.getElementById(id);
    if (!r) return;
    r.innerHTML = html;
    r.style.display = "block";
  }
  function aviso(texto) {
    return "<p>" + texto + "</p>";
  }

  // 1. Juros compostos com aportes mensais
  var fJuros = document.getElementById("form-juros");
  if (fJuros) {
    fJuros.addEventListener("submit", function (e) {
      e.preventDefault();
      var pv = valor("jc-inicial");
      var pmt = valor("jc-mensal");
      var taxaAnual = valor("jc-taxa") / 100;
      var n = Math.round(valor("jc-meses"));
      if (n <= 0 || taxaAnual < 0) {
        return mostra("res-juros", aviso("Informe um prazo em meses maior que zero e uma taxa válida."));
      }
      var i = Math.pow(1 + taxaAnual, 1 / 12) - 1;
      var fvInicial = pv * Math.pow(1 + i, n);
      var fvAportes = i === 0 ? pmt * n : pmt * (Math.pow(1 + i, n) - 1) / i;
      var total = fvInicial + fvAportes;
      var investido = pv + pmt * n;
      mostra("res-juros",
        "<p>Total estimado ao final do prazo: <strong>" + brl(total) + "</strong></p>" +
        "<p>Total investido: " + brl(investido) + ". Rendimento estimado: " + brl(total - investido) + ".</p>" +
        "<p class=\"ajuda\">Cálculo aproximado. A taxa anual foi convertida para mensal de forma composta. Não considera impostos, taxas, inflação nem variações de mercado.</p>");
    });
  }

  // 2. Meta da reserva de emergência
  var fReserva = document.getElementById("form-reserva");
  if (fReserva) {
    fReserva.addEventListener("submit", function (e) {
      e.preventDefault();
      var gastos = valor("re-gastos");
      var meses = valor("re-meses");
      var aporte = valor("re-aporte");
      if (gastos <= 0 || meses <= 0) {
        return mostra("res-reserva", aviso("Informe as despesas essenciais mensais e a quantidade de meses de cobertura."));
      }
      var meta = gastos * meses;
      var html = "<p>Meta sugerida para a reserva: <strong>" + brl(meta) + "</strong></p>";
      if (aporte > 0) {
        var mesesAte = Math.ceil(meta / aporte);
        var anos = Math.floor(mesesAte / 12);
        var resto = mesesAte % 12;
        html += "<p>Com aportes de " + brl(aporte) + " por mês, sem considerar rendimento, a meta é atingida em " +
          mesesAte + " meses (" + anos + " ano(s) e " + resto + " mês(es)).</p>";
      }
      html += "<p class=\"ajuda\">A quantidade de meses de cobertura depende da sua renda, estabilidade do emprego e dependentes. Use como ponto de partida.</p>";
      mostra("res-reserva", html);
    });
  }

  // 3. Financiamento com parcelas fixas (Tabela Price)
  var fFin = document.getElementById("form-financiamento");
  if (fFin) {
    fFin.addEventListener("submit", function (e) {
      e.preventDefault();
      var p = valor("fi-valor");
      var i = valor("fi-taxa") / 100;
      var n = Math.round(valor("fi-meses"));
      if (p <= 0 || n <= 0 || i < 0) {
        return mostra("res-financiamento", aviso("Informe o valor financiado, a taxa mensal e o prazo em meses."));
      }
      var parcela = i === 0 ? p / n : p * i / (1 - Math.pow(1 + i, -n));
      var total = parcela * n;
      mostra("res-financiamento",
        "<p>Parcela fixa estimada: <strong>" + brl(parcela) + "</strong></p>" +
        "<p>Total pago ao final: " + brl(total) + ". Juros totais: " + brl(total - p) + ".</p>" +
        "<p class=\"ajuda\">Cálculo pelo sistema de parcelas fixas. Bancos podem incluir tarifas e seguros no custo efetivo total (CET), que não estão incluídos aqui.</p>");
    });
  }

  // 4. Custo de produção por unidade
  var fAgro = document.getElementById("form-custo-rural");
  if (fAgro) {
    fAgro.addEventListener("submit", function (e) {
      e.preventDefault();
      var area = valor("ag-area");
      var fixo = valor("ag-fixo");
      var variavelHa = valor("ag-variavel");
      var produtividade = valor("ag-prod");
      var preco = valor("ag-preco");
      if (area <= 0 || produtividade <= 0) {
        return mostra("res-custo-rural", aviso("Informe a área plantada e a produtividade por hectare."));
      }
      var custoTotal = fixo + variavelHa * area;
      var producaoTotal = produtividade * area;
      var custoUnidade = custoTotal / producaoTotal;
      var html =
        "<p>Custo total da lavoura: <strong>" + brl(custoTotal) + "</strong></p>" +
        "<p>Produção total estimada: " + producaoTotal.toLocaleString("pt-BR", { maximumFractionDigits: 2 }) + " unidades.</p>" +
        "<p>Custo por unidade (preço mínimo de equilíbrio): <strong>" + brl(custoUnidade) + "</strong></p>";
      if (preco > 0) {
        var receita = producaoTotal * preco;
        var resultado = receita - custoTotal;
        html += "<p>Receita estimada com preço de " + brl(preco) + " por unidade: " + brl(receita) +
          ". Resultado antes de impostos e despesas não listadas: " + brl(resultado) + ".</p>";
      }
      html += "<p class=\"ajuda\">Cálculo simplificado. Inclua todos os custos reais (mão de obra, juros, depreciação, frete e impostos) para uma análise completa.</p>";
      mostra("res-custo-rural", html);
    });
  }
})();
