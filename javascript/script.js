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
    hint: "Every computer has it"
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
let points = 0;

let keyboard = document.getElementById('keyboard');


//Funktion som ger oss ett random ord med tillhörande ledtråd.

function randomWord() {
  let randNumb = Math.floor(Math.random() * words.length);
  let hintButton = document.getElementById('hint');
  answer = words[randNumb];
  hintButton.innerHTML = 'Hint: ' + answer.hint;
}

// funktionen genererar knapparna med alfabetets bokstäver och ger dem id:n 
//och när man klickar på dem så kallar man på funktionen handleguess
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  keyboard.innerHTML = buttonsHTML;
}

//chosenLetter är ett samlingsnamn för alla bokstäver i funktionen generatebuttons
//Funktionen kollar ifall bokstaven (handleguess) du valt finns i det aktuella ordet
//Om den passar in så läggs den till i ordet samt knappen får attribut disabled.
//Om ordet är fel så uppdateras antalet misstag samt knappen blir grå.
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);
  if (answer.word.indexOf(chosenLetter) >= 0) { //kollar om bokstaven finns i ordet som är det rätta svaret om det stämmer kör den funktionerna efter
    guessedWord();
    checkIfGameWon();
  } else if (answer.word.indexOf(chosenLetter) === -1) { //kollar om bokstaven finns i ordet som är det rätta svaret om det inte stämmer kör den funktionerna efter
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

// Kollar om vi vunnit och skriver ut att vi vunnit och hur många poäng vi fick beroende på hur felfritt vi svarat
function checkIfGameWon() {
  if (wordStatus === answer.word) {
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
    points = 50 - mistakes * 10;
    document.getElementById('points').innerHTML = 'Your points are: ' + points + 'p/50p max';
  }
}
// Kollar om vi förlorat och skriver ut det rätta svaret att vi förlora och att vi inte fick poäng
function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer.word;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
    points = 0;
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
  points = 0;

  document.getElementById('points').innerHTML = '';
//Loopar igenom alla delar av hangman och döljer dom genom deras gemensamma class
  let hangman = document.querySelectorAll('.figure')
  hangman.forEach(bodyPart => {
    bodyPart.style.display = 'none'
  });
  
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

// kallar på funktionerna vid spelets början
document.getElementById('maxWrong').innerHTML = maxWrong;
randomWord();
generateButtons();
guessedWord();

//animationer på första sidan
//variabler för animation
const hero = document.querySelector(".hero");
const slider = document.querySelector(".slider");
const logo = document.querySelector("#logo");
const headline = document.querySelector(".headline");

const tl = new TimelineMax();

tl.fromTo(hero, 1, { height: "0%" }, { height: "80%", ease: Power2.easeInOut }) //gör att hangman bilden dyker upp genom att gå ifrån en storlek t en annan istället för o alltid vara där
  .fromTo(
    hero,
    1.2,
    { width: "100%" },
    { width: "80%", ease: Power2.easeInOut } // bilden är lite större när den "landat" o blir mindre sen 
  ) .fromTo(
    slider, // gör att bakgrunden fylls på med olika färg eftersom när man startar sidan 
    1.2,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5"); //texten dyker upp efter ett tag 
