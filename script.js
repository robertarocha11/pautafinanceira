(function () {
  "use strict";

  // ===== Logo de reserva: se o arquivo da imagem não carregar, usa esta versão embutida =====
  var LOGO_RESERVA = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAYFBMVEUPVzT7/PvVaxwAAAAqa0v29fWLrp1ynYlXinGeZiSrxLhcXytEfGEqbEsObmq5zsQSahJ3oY2hr6mMrp1eo2VZdGhdjngtbk9ajHRyo5VsmYRDemAYXzwA/wBDfmKLsJ9sEtM4AAAAIHRSTlP+/v8A6Qz///v////6pQj/A54Wkw4VY2GWDnBrqQGQYygxRUQAAAQvSURBVHja7Zpbe6MgEIYxjoCoMU3T9LTb/f//cjGiDsyAbmH3arno06bme+fEgIqo19FMP673L8gYw+fNylzOm6pYf3u3iA8AkTtgeKnrMwVc6uYpX30eE+KnD7B+iV6UG6+rE2LRfy5jftc5J94dQcz6ZcLTtafTyRHgZSZMgOZc5+t3D3U72iXZ7488TIBrdnwWcQwQw8MFMemLXP0TGh3K9HkCNJdGZ4anxQD0+dkShJ0A+QV0YiJkxw8rLmwF6fzy4QGTC+JW/8qv0JZLweyCKOFAy6fAjtuUZCip34YtQ2RHyKvREDBYwFtJfT8FM2AoFJ7u8Xv4/yYT0Hqmt6EDAiwAioSniyxvWYAullofUCA8rUgB4G+FJw/gNwddLcNAkRAFzQ0qNKAAIOxtCgNUNoD2ZlkUwLTmkgBs/lo9aQB8s7Oh4izlAbs5KQhoo125CCAuXwSQWBVLAEL59YamDMCTn6Jjwr6QA+iIvC+XCei42FektX0X0PLbhUIAJjYFAb56UJf5gDZqfAFA5zWclltucwAdYzooN3QBAGO5IsttDqC1o/PC4q3nsvA8IADzH/AvAHopyv67AJ0CACmZPwIYpSG9fZfku4cBRsGB+4OK+HoIoEZsOfRKjrooAGsbLxMhQJkMQK9GkmqmTEEreRwg1+rz0pcCOIo8ApDOfgjUN88wwBip8XNZ2K2invbbFICv5ThAJuTddoYFzF/eICoC0Cl5FmCCS+TyJFhzABq/ivrqA2ii1iQqAoCk+VvHwwD2cjcjwfgA4FzmOh4GQPJahQGQDA+ef948iF7dL3wH0Lv6Fdvsxujl0hFmgGatUYqb4B5A7blcjTFjbKvWxGcCSHr9CIvkK06TjEfWA+yjMpG68GfGgmZCygCUX8haxgihlo7UEOmmpHY0+zUZBFtGpjEFSOqoZvpLoGSqqAMhALgrZTj/pR/qsYo7kN5VLHHvI7trGZmekNp4sVNsNdILWsT+ncc5PU8wyDgnOfLxR5NxAQwiFSQ/kXLLU6zFix0AtckL9Roh4Oqf7JME1KL+St3j4VY3Z12Sz9gm5MabBdxhj4BqSQoUiH198WQB9C0dP3Nm02FDqr34WB/F9CYQ0g+YFoNnaRX8jcuBCummFuf6g/6j52pb+jGTiXa7jOf6Mr2o4zb2ijoPjENkA+LbacVFfas/2LszeuNlcFnJXfnJgcd7tHMTedmuRz8LGgcDzV0VebZrM9BMSX6Jv+4FbZh1CxDM6OiTY1tC1/mFNZtnvJU3LizIGxshI3XqsTQ8T/rzO/1L/XboCbYJVtzkeGoeR0HmQwMHCYr24z397djD/QBBRwuexqdx0tvRkyuUA/TCHZXBgLr5hDIAsOG5NOTwzMuEGGAfkD6iAnC32jfmdI47o/M6DEPkbM/qQfz0z3C/rieJ5vEbfFIuOVhhjjAAAAAASUVORK5CYII=";

  function trocaLogoQuebrada(img) {
    if (img.getAttribute("data-reserva")) return;
    img.setAttribute("data-reserva", "1");
    img.src = LOGO_RESERVA;
  }
  var logos = document.querySelectorAll("a.logo img");
  for (var i = 0; i < logos.length; i++) {
    (function (img) {
      img.addEventListener("error", function () { trocaLogoQuebrada(img); });
      if (img.complete && img.naturalWidth === 0) trocaLogoQuebrada(img);
    })(logos[i]);
  }

  // ===== Menu mobile =====
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector("nav.principal");
  function fechaMenu() {
    if (!btn || !nav) return;
    nav.classList.remove("aberto");
    btn.setAttribute("aria-expanded", "false");
  }
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var aberto = nav.classList.toggle("aberto");
      btn.setAttribute("aria-expanded", String(aberto));
    });
    nav.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") fechaMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fechaMenu();
    });
  }

  // ===== Consentimento de cookies (guardado só no navegador) =====
  var CHAVE = "pf-consent";
  function lerEscolha() {
    try { return localStorage.getItem(CHAVE); } catch (e) { return null; }
  }
  function gravarEscolha(valor) {
    try { localStorage.setItem(CHAVE, valor); } catch (e) { /* navegador bloqueou o armazenamento */ }
  }
  function limparEscolha() {
    try { localStorage.removeItem(CHAVE); } catch (e) { /* ignorado */ }
  }
  // Outros scripts (por exemplo, anúncios no futuro) podem consultar: window.pfConsentimento()
  window.pfConsentimento = lerEscolha;

  var banner = document.getElementById("cookie-banner");
  function mostraBanner() { if (banner) banner.style.display = "block"; }
  function escondeBanner() { if (banner) banner.style.display = "none"; }

  if (banner && !lerEscolha()) mostraBanner();

  var aceitar = document.getElementById("cookie-aceitar");
  var recusar = document.getElementById("cookie-recusar");
  if (aceitar) aceitar.addEventListener("click", function () { gravarEscolha("aceito"); escondeBanner(); });
  if (recusar) recusar.addEventListener("click", function () { gravarEscolha("recusado"); escondeBanner(); });

  var reabrir = document.getElementById("pf-cookies");
  if (reabrir) {
    reabrir.addEventListener("click", function (e) {
      e.preventDefault();
      limparEscolha();
      mostraBanner();
    });
  }
})();
