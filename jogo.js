var timerId = null; //variável q armazena a chamada da função timeout

function iniciaJogo(){

    var url = window.location.search;

    var nivel_jogo = url.replace("?", "");

    var tempo_segundos = 0;

    if(nivel_jogo == 1){ //nivel 1 facil -> 120 segundos     
        tempo_segundos = 120;
    } 

    if(nivel_jogo == 2){ //nivel 2 normal -> 60 segundos
        tempo_segundos = 60;
    }

    if(nivel_jogo == 3){ //nivel 3 dificil -> 30 segundos
        tempo_segundos = 30;
    }

    //inserindo segundos span
    document.getElementById('cronometro').innerHTML = tempo_segundos;


    //var qtd balões
    var qtd_baloes = 70;
    criaBaloes(qtd_baloes);

    //imprimir qtd baloes inteiros
    document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;
    
    contagem_tempo(tempo_segundos + 1)
}

function contagem_tempo(segundos){

    segundos = segundos - 1;
    if(segundos == -1){
        clearTimeout(timerId); //para a execução da função do setTimeOut
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagem_tempo("+segundos+")", 1000)
}

function game_over(){
    remove_eventos_baloes();
    alert('FIm do jogo, você perdeu')
}situacao_jogo

function criaBaloes(qtd_baloes){

    for(var i = 1; i <= qtd_baloes; i++){
        
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b'+i;
        balao.onclick = function(){estourar(this); }

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){

    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick","")
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
    pontuacao(-1);
}

function pontuacao(acao){

    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert('Parabéns, você venceu');
        parar_jogo();
    }
}

function parar_jogo(){
    clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}