const inputSelectGamemode = document.querySelector("#selectGamemode");
const resetButton = document.querySelector("#resetBtn");
const drawButton = document.querySelector("#drawBtn");
const gamemodeNumber = document.querySelector("#gamemodeNumber");
const drawVoice = document.querySelector("#voiceDraw");
const numbersHub = document.querySelectorAll(".numbersHub");
const resultText = document.querySelector("#resultText");

const synthesis = window.speechSynthesis;
const speakingVoice = synthesis.getVoices().filter((voice) => {
    return voice.lang === "pt-BR";
})[0];
const utterance = new SpeechSynthesisUtterance();
utterance.lang = "pt-BR";
utterance.voice = speakingVoice;

const rouletteAudio = new Audio("assets/audio/Som de Roleta.wav");

let maxNumberOfBalls = null;
let listOfDrawnNumbers = [];
let activateBallReading = true;

const gamemodes = {
    75: 75,
    80: 80,
    85: 85,
    90: 90,
    95: 95,
    100: 100,
};

function talkDrawnBalls(letter, number) {
    if (activateBallReading) {
        utterance.text = `${letter === "O" ? "Ô" : letter}, ${number}!`;
        synthesis.speak(utterance);
    }
}

function insertNumbersOnHub() {
    const numbersPerHub = maxNumberOfBalls / 5;
    const letters = {
        0: "B",
        1: "I",
        2: "N",
        3: "G",
        4: "O",
    };
    let currentNumber = 1;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < numbersPerHub; j++) {
            numbersHub[i].innerHTML += `
            <div class="numberBg" letter="${letters[i]}">
                <p class="number">${currentNumber}</p>
            </div>
            `;
            currentNumber++;
        }
    }
}

function playAudioRoulette() {
    rouletteAudio.play();
}

function drawNumber() {
    const numbers = document.querySelectorAll(".numberBg");
    if (listOfDrawnNumbers.length < maxNumberOfBalls) {
        playAudioRoulette();
        rouletteAudio.onended = () => {
            let number = null;
            do {
                number = Math.floor(Math.random() * maxNumberOfBalls) + 1;
            } while (listOfDrawnNumbers.includes(number));
            listOfDrawnNumbers.push(number);
            const numberElement = numbers[number - 1];
            const letter = numberElement.getAttribute("letter");
            resultText.textContent = `LETRA ${letter}, NÚMERO ${number}`;
            talkDrawnBalls(letter, number);
            numberElement.classList.add("numberBg--drawed");
            if (listOfDrawnNumbers.length === maxNumberOfBalls)
                drawButton.disabled = true;
        };
        return;
    }
    alert("Não existem mais números para serem sorteados!");
}

function getGamemode() {
    maxNumberOfBalls = parseInt(inputSelectGamemode.value);
    if (maxNumberOfBalls && gamemodes[maxNumberOfBalls]) {
        insertNumbersOnHub();
        gamemodeNumber.textContent = maxNumberOfBalls;
        return;
    }
    alert("O modo de jogo é inválido!");
}

function checkBallReading() {
    drawVoice.checked
        ? (activateBallReading = true)
        : (activateBallReading = false);
}

function resetBingo() {
    for (const hub of numbersHub) {
        hub.innerHTML = "";
    }
    checkBallReading();
    getGamemode();
    listOfDrawnNumbers = [];
    drawButton.disabled = false;
}

resetBingo();
resetButton.addEventListener("click", resetBingo);
drawButton.addEventListener("click", drawNumber);
drawVoice.addEventListener("change", checkBallReading);
