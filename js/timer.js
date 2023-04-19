const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const alarmSound = document.getElementById('alarm');

let totalSeconds;
let timerInterval;

function startTimer() {
  const minutes = parseInt(minutesInput.value);
  const seconds = parseInt(secondsInput.value);

  if (isNaN(minutes) || isNaN(seconds)) {
    alert('Please enter valid values for minutes and seconds');
    return;
  }

  totalSeconds = minutes * 60 + seconds;
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;

  timerInterval = setInterval(() => {
    totalSeconds--;

    const minutesLeft = Math.floor(totalSeconds / 60);
    const secondsLeft = totalSeconds % 60;

    minutesInput.value = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
    secondsInput.value = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;

    if (totalSeconds === 0) {
      clearInterval(timerInterval);
      startButton.disabled = false;
      stopButton.disabled = true;
      resetButton.disabled = false;
      alarmSound.play();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  minutesInput.value = '0';
  secondsInput.value = '0';
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
stopButton.disabled = true;
resetButton.disabled = true;



