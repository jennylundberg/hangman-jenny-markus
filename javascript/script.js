var words = [
	"map",
	"javascript",
	"lighter",
	"brick",
	"lava",
	"html",
	"css",
	"computer",
	"phone",
	"keyboard",
	"fruit",
	"bread",
	"sun",
	"ocean"
]

let answer = '';
let maxWrong = 4;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
function randomWord() {
  answer = words[Math.floor(Math.random() * words.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  if (mistakes == 1) {
    let head = document.getElementById('head').style.display = "block";
    return head
   } else if (mistakes == 2) {
    let body = document.getElementById('body').style.display = "block";
    return body
   } else if (mistakes == 3) {
    let arms = document.getElementById('arms').style.display = "block";
    return arms
   } else if (mistakes == 4) {
    let legs = document.getElementById('legs').style.display = "block";
    return legs
   } 
  
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

document.getElementById('resetBtn').addEventListener('click', function(){
  reset();
})

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('head').style.display = 'none';
  document.getElementById('body').style.display = 'none';
  document.getElementById('legs').style.display = 'none';
  document.getElementById('arms').style.display = 'none';
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
