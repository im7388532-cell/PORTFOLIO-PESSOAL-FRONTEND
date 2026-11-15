document.addEventListener('DOMContentLoaded', () => {
    iniciarCarrossel();
    iniciarSkills();
    iniciarFormulario();
});


function iniciarCarrossel() {
    var trilho = document.getElementById('trilho-projetos');
    var btnAnterior = document.getElementById('btn-anterior');
    var btnProximo = document.getElementById('btn-proximo');
    if (!trilho || !btnAnterior || !btnProximo) return;

    var cards = trilho.querySelectorAll('.projeto');
    let indice = 0;

   
    function medidas() {
        var gap = parseFloat(getComputedStyle(trilho).columnGap) || 0;
        var larguraCard = cards[0].getBoundingClientRect().width;
        var passo = larguraCard + gap;
        var visiveis = Math.max(1, Math.floor((trilho.clientWidth + gap) / passo + 0.01));
        var maximo = Math.max(0, cards.length - visiveis);
        return { passo, maximo };
    }

    function atualizar() {
        var { passo, maximo } = medidas();
        indice = Math.min(Math.max(indice, 0), maximo);
        trilho.style.transform = `translateX(${-indice * passo}px)`;

        btnAnterior.disabled = indice === 0;
        btnProximo.disabled = indice === maximo;
        btnAnterior.style.opacity = btnAnterior.disabled ? '0.4' : '1';
        btnProximo.style.opacity = btnProximo.disabled ? '0.4' : '1';
        btnAnterior.style.cursor = btnAnterior.disabled ? 'not-allowed' : 'pointer';
        btnProximo.style.cursor = btnProximo.disabled ? 'not-allowed' : 'pointer';
    }

    btnAnterior.addEventListener('click', () => {
        indice--;
        atualizar();
    });

    btnProximo.addEventListener('click', () => {
        indice++;
        atualizar();
    });

    window.addEventListener('resize', atualizar);
    atualizar();
}


function iniciarSkills() {
    const niveis = document.querySelectorAll('.nivel');
    if (!niveis.length) return;

    
    niveis.forEach((nivel) => {
        var valor = Number(nivel.dataset.nivel) || 0;
        var spans = nivel.closest('.skill').querySelectorAll('.skill-cabecalho span');
        if (spans[1]) spans[1].textContent = `${valor}%`;
    });

    function preencher(nivel) {
        nivel.style.width = `${nivel.dataset.nivel}%`;
    }

    
    if ('IntersectionObserver' in window) {
        var observador = new IntersectionObserver((entradas, obs) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    preencher(entrada.target);
                    obs.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.3 });

        niveis.forEach((nivel) => observador.observe(nivel));
    } else {
        niveis.forEach(preencher);
    }
}


function iniciarFormulario() {
    var form = document.getElementById('form-contato');
    var retorno = document.getElementById('retorno-formulario');
    if (!form || !retorno) return;

    var campoNome = document.getElementById('nome');
    var campoEmail = document.getElementById('email');
    var campoMensagem = document.getElementById('mensagem');
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function mostrar(texto, tipo) {
        retorno.textContent = texto;
        retorno.classList.remove('sucesso', 'erro');
        retorno.classList.add(tipo);
    }

    form.addEventListener('submit', (evento) => {
        evento.preventDefault();

        var nome = campoNome.value.trim();
        var email = campoEmail.value.trim();
        var mensagem = campoMensagem.value.trim();

        if (nome.length < 3) {
            mostrar('Digite seu nome (mínimo 3 caracteres).', 'erro');
            campoNome.focus();
            return;
        }

        if (!regexEmail.test(email)) {
            mostrar('Digite um e-mail válido.', 'erro');
            campoEmail.focus();
            return;
        }

        if (mensagem.length < 10) {
            mostrar('A mensagem deve ter pelo menos 10 caracteres.', 'erro');
            campoMensagem.focus();
            return;
        }

        mostrar(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`, 'sucesso');
        form.reset();
    });

    form.addEventListener('input', () => {
        if (retorno.classList.contains('erro')) {
            retorno.textContent = '';
            retorno.classList.remove('erro');
        }
    });
}
