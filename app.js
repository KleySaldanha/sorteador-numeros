function sortear() {
    let quantidade = parseInt(document.getElementById('quantidade').value);
    let de = parseInt(document.getElementById('de').value);
    let ate = parseInt(document.getElementById('ate').value);
    let intervalo = ate - de + 1; 

    let sorteados = [];

    let numero;

    if(validaCampos(quantidade, de, ate, intervalo)){
        return;
    }

    for (let i = 0; i < quantidade; i++){
        numero = obterNumeroAleatorio(de, ate);

        while (sorteados.includes(numero)){
            numero = obterNumeroAleatorio(de, ate);
        }

        sorteados.push(numero);
    }

    let resultado = document.getElementById('resultado');
    resultado.innerHTML = `<label class="texto__paragrafo">Números sorteados: ${sorteados}</label>`
    alterarStatusBotaoSortear()
    alterarStatusBotaoReiniciar();
}

function obterNumeroAleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function alterarStatusBotaoReiniciar(){
    let botaoReiniciar = document.getElementById('btn-reiniciar');

    if(botaoReiniciar.classList.contains('container__botao-desabilitado')){
        botaoReiniciar.classList.remove('container__botao-desabilitado');
        botaoReiniciar.classList.add('container__botao');
    } else{
        botaoReiniciar.classList.remove('container__botao');
        botaoReiniciar.classList.add('container__botao-desabilitado');
    }
}

function alterarStatusBotaoSortear(){
    let botaoSortear = document.getElementById('btn-sortear');

    if(botaoSortear.classList.contains('container__botao')){
        botaoSortear.classList.remove('container__botao');
        botaoSortear.classList.add('container__botao-desabilitado');
    } else{
        botaoSortear.classList.remove('container__botao-desabilitado');
        botaoSortear.classList.add('container__botao');        
    }
    return;
}

function reiniciar(){
    document.getElementById('quantidade').value = '';
    document.getElementById('de').value = '';
    document.getElementById('ate').value = '';
    document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Números sorteados: nenhum até agora</label>';
    alterarStatusBotaoSortear();
    alterarStatusBotaoReiniciar();
}

function validaCampos(quantidade, de, ate, intervalo){
    if(quantidade == '' || quantidade == null || isNaN(quantidade) == true || de == '' || de == null || isNaN(de) == true || ate == '' || ate == null || isNaN(ate) == true){
        Swal.fire({
            position: "center",
            title: "Atenção!",
            html: 'Nenhum dos campos podem ficar <b>Vazios</b> ou receber valores <b>Zeros</b>. Por favor, revise os números e refaça o sorteio.',
            icon: "warning",
            confirmButtonColor: "#4169E1", 
            iconColor: "#FFA500"
          });
          return true;
    }
    if(de >= ate){
        Swal.fire({
            position: "center",
            title: "Atenção!",
            html: 'O valor inserido no campo <b>Do número</b> não pode ser maior ou igual que o valor do campo <b>Até o número</b>. Por favor, revise os números inseridos e refaça o sorteio.',
            icon: "warning",
            confirmButtonColor: "#4169E1",
            iconColor: "#FFA500" 
          });
          return true;
    }
    if(intervalo < quantidade){
        Swal.fire({
            position: "center",
            title: "Atenção!",
            html: 'O valor inserido no campo <b>Quantidade de números</b> não pode ser maior que o intervalo entre os campos <b>Do número</b> e <b>Até o número</b>. Por favor, revise os números inseridos e refaça o sorteio.',
            icon: "warning",
            confirmButtonColor: "#4169E1",
            iconColor: "#FFA500"
          });
          return true;
    }
    return false;
}