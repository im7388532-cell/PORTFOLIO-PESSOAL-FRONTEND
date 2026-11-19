var botao = document.getElementById("botao");
var codigo = document.getElementById("codigo");

function gerarCor() {
  var letras = "0123456789ABCDEF";
  let cor = "#";
  for (let i = 0; i < 6; i++) {
    cor += letras[Math.floor(Math.random() * 16)];
  }
  return cor;
}

botao.addEventListener("click", () => {
  var cor = gerarCor();
  document.body.style.background = cor;
  codigo.textContent = cor;
});
