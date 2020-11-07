//Lista med objekt

var words = [
  {
    word: 'map',
    hint: 'Something you can use to find treasures'
  },
  {
    word: "javascript",
    hint: "programming language"
  },
  {
    word: "lighter",
    hint: "You need this in order to smoke your cigarette"
  },
  {
    word: "lava",
    hint: "Something really really hot..."
  },
  {
    word: "html",
    hint: "programming language"
  },
  {
    word: "css",
    hint: "programming language"
  },
  {
    word: "computer",
    hint: "A laptop is a.."
  },
  {
    word: "phone",
    hint: "You need this to make a call"
  },
  {
    word: "keyboard",
    hint: "Every laptop has it"
  },
  {
    word: "fruit",
    hint: "A banana is a .."
  },
  {
    word: "bread",
    hint: "Is very common to eat as breakfast"
  },
  {
    word: "sun",
    hint: "Gives you alot of D-vitamines and hopefully a great tan"
  }
]
// olika variablar

let answer = '';
let maxWrong = 4;
let mistakes = 0;
let guessed = [];
let wordStatus = null;


//Funktion som ger oss ett random ord med tillhörande ledtråd.

function randomWord() {
  let randNumb = Math.floor(Math.random()* words.length);
  let hintButton = document.getElementById('hint');
  answer = words[randNumb];
  hintButton.innerHTML = 'Hint: ' + answer.hint;
}

// funktion
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
  if (answer.word.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.word.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

// Denna funktionen målar upp hänga gubben steg för steg
// om man gissat fel.
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

// Kollar om vi vunnit
function checkIfGameWon() {
  if (wordStatus === answer.word) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}
// Kollar om vi förlorat
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer.word;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

//Gör det aktuella ordet till "_ _ _ _ "
function guessedWord() {
  wordStatus = answer.word.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

//uppdaterar antalet fel gissningar.
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}
document.getElementById('resetBtn').addEventListener('click', function () {
  reset();
})

//Nollställer spelet.
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


//animations first page of game
const hero = document.querySelector(".hero");
const slider = document.querySelector(".slider");
const logo = document.querySelector("#logo");
const headline = document.querySelector(".headline");
const tl = new TimelineMax();
tl.fromTo(hero, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "100%" },
    { width: "80%", ease: Power2.easeInOut }
  ) .fromTo(
    slider,
    1.2,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5");