let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(time) {
    let hrs = Math.floor(time / 3600000);
    let mins = Math.floor((time % 3600000) / 60000);
    let secs = Math.floor((time % 60000) / 1000);
    let ms = Math.floor((time % 1000) / 10);

    return (
        (hrs < 10 ? "0" : "") + hrs + ":" +
        (mins < 10 ? "0" : "") + mins + ":" +
        (secs < 10 ? "0" : "") + secs + "." +
        (ms < 10 ? "0" : "") + ms
    );
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startPauseBtn.addEventListener('click', () => {
    if (!isRunning) {
        // Start system
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.className = 'btn pause';
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        // Pause system
        clearInterval(timerInterval);
        
        startPauseBtn.textContent = 'Start';
        startPauseBtn.className = 'btn start';
        lapBtn.disabled = true;
        isRunning = false;
    }
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        lapCount++;
        const li = document.createElement('li');
        li.innerHTML = `<span>Lap ${lapCount}</span> <span>${formatTime(elapsedTime)}</span>`;
        lapsList.prepend(li); // Adds newest lap to top
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCount = 0;
    
    display.textContent = "00:00:00.00";
    startPauseBtn.textContent = 'Start';
    startPauseBtn.className = 'btn start';
    lapBtn.disabled = true;
    lapsList.innerHTML = '';
});