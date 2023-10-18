//Elemento HTML para mudar contexto
const html = document.querySelector('html');

//Botões
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const buttons = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const startPauseBtText = document.querySelector('#start-pause span');
const startPauseBtImg = document.querySelector('#start-pause img');

//Mostrador do Timer
const printTimer = document.querySelector('#timer');

//Imagem de fundo
const banner = document.querySelector('.app__image');

//Título da página
const titulo = document.querySelector('.app__title');

//Arquivos de áudio
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const timerAlarme = new Audio('sons/beep.mp3');
const timerPlayAudio = new Audio('sons/play.wav');
const timerStopAudio = new Audio('sons/pause.mp3');

musica.loop = true;

//Variáveis para o Timer
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

//Funções para mudança de contexto
function mudaContexto(contexto){
    
    mostraTimer();
    buttons.forEach ((contexto) => {
        
        contexto.classList.remove('active');
        
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`)
    switch(contexto){

        case 'foco':
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case 'descanso-curto':
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
            case 'descanso-longo':
            titulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
            default:
                break;

    };

};

focoBt.addEventListener('click', () => {

    tempoDecorridoEmSegundos = 1500;
    mudaContexto('foco');
    focoBt.classList.add('active');

});

curtoBt.addEventListener('click', () => {

    tempoDecorridoEmSegundos = 300;
    mudaContexto('descanso-curto');
    curtoBt.classList.add('active');

});

longoBt.addEventListener('click', () => {
    
    tempoDecorridoEmSegundos = 900;
    mudaContexto('descanso-longo');
    longoBt.classList.add('active');
    
});

//Função para música de fundo
musicaFocoInput.addEventListener('change', () => {

    if (musica.paused){

        musica.play();

    }
    else {
        
        musica.pause();

    };

});

//Funções para o timer
const contagemRegressiva = () => {

    if (tempoDecorridoEmSegundos <= 0){

        timerAlarme.play();
        alert('Tempo finalizado!');
        zerar();
        tempoDecorridoEmSegundos = 5;
        return;

    };
    tempoDecorridoEmSegundos -= 1;
    mostraTimer();
    console.log('Temporizador:' + tempoDecorridoEmSegundos);
    
};

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {

    if (intervaloId){

        timerStopAudio.play();
        zerar();
        return;

    }
    timerPlayAudio.play();
    startPauseBtText.textContent = 'Pausar';
    startPauseBtImg.src = ('imagens/pause.png');
    intervaloId = setInterval(contagemRegressiva, 1000);

};

function zerar() {

    startPauseBtText.textContent = 'Começar';
    startPauseBtImg.src = ('imagens/play_arrow.png');
    clearInterval(intervaloId);
    intervaloId = null;

};

function mostraTimer() {

    const timer = new Date(tempoDecorridoEmSegundos * 1000);
    const timerFormatado = timer.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    printTimer.innerHTML = `${timerFormatado}`; 

}

mostraTimer();