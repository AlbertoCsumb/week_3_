const maxAttempts = 7;
let correctNumber = Math.floor(Math.random() * 99) + 1;
let attemptsLeft = maxAttempts;
let wins = 0, losses = 0;

const guessInput  = document.querySelector('#guessInput');
const guessButton = document.querySelector('#guessButton');
const resetButton = document.querySelector('#playAgain');
const message     = document.querySelector('#message');
const guessesEl   = document.querySelector('#guesses');
const attemptsEl  = document.querySelector('#attempts');
const winsEl      = document.querySelector('#wins');
const lossesEl    = document.querySelector('#losses');

function turnGreen(){ guessInput.style.backgroundColor = 'lightgreen'; }
function turnRed(){   guessInput.style.backgroundColor = 'lightcoral'; }
function resetColor(){ guessInput.style.backgroundColor = ''; }

function updateAttempts(){
  attemptsEl.textContent = `Attempts left: ${attemptsLeft}`;
}

function endGame(didWin, finalMsg, isDanger=false){
  message.className = '';
  if (isDanger) message.classList.add('danger'); else message.classList.add('success');
  message.textContent = finalMsg;

  if (didWin) { wins++; winsEl.textContent = wins; }
  else { losses++; lossesEl.textContent = losses; }

  guessButton.style.display = 'none';
  guessButton.disabled = true;
  resetButton.style.display = 'inline-block';
  guessInput.disabled = true;
}

function resetGame(){
  correctNumber = Math.floor(Math.random() * 99) + 1;
  attemptsLeft = maxAttempts;
  updateAttempts();
  message.textContent = '';
  message.className = '';
  guessesEl.innerHTML = '<strong>Previous guesses:</strong> ';
  guessInput.value = '';
  resetColor();
  guessInput.disabled = false;
  guessButton.disabled = false;
  guessButton.style.display = 'inline-block';
  resetButton.style.display = 'none';
  guessInput.focus();
}

guessButton.addEventListener('click', () => {
  resetColor();
  const val = Number(guessInput.value.trim());

  if (Number.isNaN(val) || val < 1 || val > 99){
    message.className = 'danger';
    message.textContent = 'Error: please enter a number from 1 to 99.';
    turnRed();
    guessInput.value = '';
    guessInput.focus();
    return;
  }

  guessesEl.innerHTML += `${val} `;
  attemptsLeft--;
  updateAttempts();

  if (val === correctNumber){
    turnGreen();
    const used = maxAttempts - attemptsLeft;
    const remain = attemptsLeft;
    endGame(true, `Congratulations! You guessed it in ${used} ${used===1 ? 'try' : 'tries'} with ${remain} left.`);
    return;
  }

  if (val < correctNumber){
    message.className = '';
    message.textContent = `Too low! Try again. ${attemptsLeft} left.`;
    turnRed();
  } else {
    message.className = '';
    message.textContent = `Too high! Try again. ${attemptsLeft} left.`;
    turnRed();
  }

  if (attemptsLeft <= 0){
    endGame(false, `You Lost — the number was ${correctNumber}.`, true);
  }

  guessInput.value = '';
  guessInput.focus();
});

resetButton.addEventListener('click', resetGame);

updateAttempts();
guessInput.focus();