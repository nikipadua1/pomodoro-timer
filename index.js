const setConfig = document.querySelector('.config');
const configBtn = document.querySelector('#config-button');
const modal = document.querySelector('.config-modal');
const confirmBtn = document.querySelector('#config-button');
const startBtn = document.querySelector('#start-button');
const pauseBtn = document.querySelector('#pause-button');
let minEl = document.querySelector('#minutes');
let minInput = document.querySelector('#time-set');
let secondEl = document.querySelector('#seconds');
let min;
let timer;
let darkBtn = document.querySelector('#change-theme');
let soundBtn = document.querySelector('#sound');
const audio = new Audio('/assets/alarmsound.mp3');

//Sound
soundBtn.addEventListener("change", function() {
    document.body.classList.toggle("mute");
    if(soundBtn.checked) {
        audio.volume = 0;
    } else {
        audio.volume = 0.2;
    }
})


function getMinutes() {
    let min = Number(minInput.value);
    if(minInput.value < 1 || minInput.value % 1 !== 0) {
        alert('Tempo inválido! Digite apenas os minutos (exemplo: 25)');
        modal.style.display = 'flex';
        minInput.value = '';
    }
    minEl.innerHTML = min.toString().padStart(2, '0');
    secondEl.innerHTML = "00";
}

function decreaseTime() {
    const minFix = minInput.value;
    min = Number(minEl.innerHTML); 
    seconds = Number(secondEl.innerHTML); 

    if (min === 0 && seconds === 0) {
        audio.play();
        minEl.innerHTML = minFix.padStart(2, '0'); 
        secondEl.innerHTML = seconds.toString().padStart(2, '0'); 
        return;
    }
    if (seconds === 0) {
        min--;
        seconds = 59;
    } else {
        seconds--;
    }

    minEl.innerHTML = min.toString().padStart(2, '0'); 
    secondEl.innerHTML = seconds.toString().padStart(2, '0'); 

    timer = setTimeout(decreaseTime, 1000); 
}


setConfig.addEventListener('click', () => {
    modal.style.display = 'flex';
    startBtn.style.display = 'inline-block';
})

configBtn.addEventListener('click', () => {
    if(minInput.value === '') {
        alert('Insira os minutos que deseja focar.')
        modal.style.display = 'flex';
    } else {
    modal.style.display = 'none';
    }
})

pauseBtn.addEventListener('click', () => {
    clearTimeout(timer);
    startBtn.style.display = 'inline-block';
});
startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    decreaseTime();
});
confirmBtn.addEventListener('click', getMinutes);


darkBtn.addEventListener("change", function() {
    document.body.classList.toggle("dark");
})


