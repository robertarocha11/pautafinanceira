(function(){
/* Chave gratuita do Web3Forms (web3forms.com). Com a chave, o envio é direto; sem ela, abre o e-mail do visitante com a mensagem pronta. */
var KEY="",TO="contato@pautafinanceira.com.br";
var f=document.getElementById("cf");if(!f)return;
var st=document.getElementById("cs"),g=function(i){return document.getElementById(i)};
f.addEventListener("submit",function(e){e.preventDefault();
 var n=g("cn").value.trim(),m=g("ce").value.trim(),t=g("cm").value.trim();
 if(g("cb").value)return;
 if(n.length<2){st.textContent="Informe o seu nome.";return}
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(m)){st.textContent="Informe um e-mail válido.";return}
 if(t.length<10){st.textContent="Escreva uma mensagem com pelo menos 10 caracteres.";return}
 if(KEY&&window.fetch){st.textContent="Enviando...";
  fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({access_key:KEY,subject:"Contato pelo site Pauta Financeira",name:n,email:m,message:t,botcheck:""})})
  .then(function(r){return r.json()}).then(function(d){if(d.success){st.textContent="Mensagem enviada. Obrigado! Responderemos em até 5 dias úteis.";f.reset()}else throw 0})
  .catch(function(){st.textContent="Não foi possível enviar agora. Escreva para "+TO+"."})}
 else{st.textContent="Abrimos o seu aplicativo de e-mail com a mensagem pronta. Se nada abrir, escreva para "+TO+".";
  location.href="mailto:"+TO+"?subject="+encodeURIComponent("Contato pelo site: "+n)+"&body="+encodeURIComponent(t+"\n\n"+n+" ("+m+")")}
});
})();
