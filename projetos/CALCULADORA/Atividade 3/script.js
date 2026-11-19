

 
var display = document.getElementById('display');
 

var COR_NORMAL = 'linear-gradient(gray, black)';
var COR_DESTAQUE = 'linear-gradient(gray, red)';
 
let expressao = '';
 

function atualizarDisplay() {
    display.textContent = expressao;
}
 

function pressed(valor) {
    expressao += valor;
    atualizarDisplay();
}
 
function clearAll() {
    expressao = '';
    atualizarDisplay();
}
 
function backspace() {
    expressao = expressao.slice(0, -1);
    atualizarDisplay();
}
 
function calculate() {
    if (expressao === '') return;
 
    try {
       
        if (expressao.includes('//') || expressao.includes('/*')) {
            throw new Error('Expressão inválida');
        }
 
        
        var limpa = expressao.replace(/(^|[^\d.])0+(?=\d)/g, '$1');
 
        let resultado = eval(limpa);
 
        if (typeof resultado !== 'number' || !isFinite(resultado)) {
            throw new Error('Resultado inválido');
        }
 
     
        resultado = Number(resultado.toPrecision(12));
 
        
        expressao = String(resultado);
        atualizarDisplay();
    } catch (e) {
        expressao = '';
        display.textContent = 'Erro';
    }
}
 

function acender(botao) {
    if (botao) botao.style.backgroundImage = COR_DESTAQUE;
}
 
function apagar(botao) {
    if (botao) botao.style.backgroundImage = COR_NORMAL;
}
 
var botoes = document.querySelectorAll('.btn');
 

var mapaBotoes = {};
botoes.forEach(function (botao) {
    mapaBotoes[botao.textContent.trim()] = botao;
});
 

botoes.forEach(function (botao) {
    botao.addEventListener('pointerdown', function () { acender(botao); });
    botao.addEventListener('pointerup', function () { apagar(botao); });
    botao.addEventListener('pointerleave', function () { apagar(botao); });
    botao.addEventListener('pointercancel', function () { apagar(botao); });
 
    
    botao.addEventListener('click', function () { botao.blur(); });
});
 

function botaoDaTecla(tecla) {
    if ('0123456789.+-*/'.includes(tecla) && tecla.length === 1) return tecla;
    if (tecla === 'Backspace') return '<';
    if (tecla === 'Enter') return '=';
    if (tecla === 'Escape') return 'C'; 
    return null;
}
 

var teclasAtivas = new Set();
 
document.addEventListener('keydown', function (e) {
    const texto = botaoDaTecla(e.key);
    if (texto === null) return;
 

    e.preventDefault();
 
    
    if (e.repeat) return;
 
    teclasAtivas.add(e.key);
    acender(mapaBotoes[texto]);
 
    if (e.key === 'Enter') calculate();
    else if (e.key === 'Backspace') backspace();
    else if (e.key === 'Escape') clearAll();
    else pressed(e.key);
});
 
document.addEventListener('keyup', function (e) {
    var texto = botaoDaTecla(e.key);
    if (texto === null) return;
    teclasAtivas.delete(e.key);
    apagar(mapaBotoes[texto]);
});
 

window.addEventListener('blur', function () {
    teclasAtivas.clear();
    botoes.forEach(apagar);
});
 