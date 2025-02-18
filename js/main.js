/*------------------------- version -------------------------*/
console.log('version 1.0');

/*------------------------- constants -------------------------*/
// Word list sourced from:
// https://github.com/dariusk/corpora/blob/master/data/words/common.json

// Save the words longer than 7 letters into an array:
const WORDS_SORTED = [];
for (let i = 0; i < ALL_WORDS.commonWords.length; i++) {
  if (ALL_WORDS.commonWords[i].length > 7) {
    WORDS_SORTED.push(ALL_WORDS.commonWords[i]);
  };
};

/*------------------------- state variables -------------------------*/
const state = {
  randomWord: null,
  randomWordArray: null,
  currentWord: null,
  incorrectGuesses: null,
  guessedLetters: null,
  result: null,
};

/*------------------------- cached elements  -------------------------*/
const elements = {
  diagram: document.getElementById('diagram'),
  messageContainer: document.getElementById('message-container'),
  wordContainer: document.getElementById('word-container'),
  keyboardContainer: document.getElementById('keyboard-container'),
  playAgainButton: document.getElementById('play-again'),
};

/*------------------------- event listeners -------------------------*/
elements.playAgainButton.addEventListener('click', init);
elements.keyboardContainer.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeypress);

/*------------------------- functions -------------------------*/
init();

function init () {
  state.randomWord = randomWord(WORDS_SORTED);
  state.randomWordArray = state.randomWord.toUpperCase().split(""); // Change the word to upper case, convert to an array.
  state.currentWord = state.randomWord.split("").map((x) => '_'); // Create a blank array, same length as word.
  state.incorrectGuesses = 0;
  state.guessedLetters = [];
  state.result = null;

  // Reset the colouring of the keyboard-letters when the game starts over:
  for (let i = 0; i < 3; i++) {
    const keyboardRows = elements.keyboardContainer.children;
    let keyboardRow = keyboardRows[i].children;

    for (const key of keyboardRow) {
      // Remove and red and green backgrounds for letters guessed:
      key.classList.remove('bg-red-500');
      key.classList.remove('bg-green-500');
      // Re-add the white background class back in:
      key.classList.add('bg-white');
    };
  };

  render();
}

function handleClick(event) {
  // If the event.target wasn't a keyboard letter, exit the function:
  if (event.target.classList.contains('keyboard-letter') === false) return;

  // If the game has already been won or lost, exit the function:
  if (state.result !== null) return;

  // Check if the letter was in the word:
  checkLetter(event.target.innerText);
}

function handleKeypress(event) {
  // If the keys are Shift+Enter, start a new game:
  if (event.key === 'Enter' && event.shiftKey === true) {
    init();
  }

  // If the game has already been won or lost, exit the function:
  if (state.result !== null) return;

  // Only run for keys that are a letter:
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    // Check if the letter was in the word:
    checkLetter(event.key.toUpperCase());
  };
}

function checkLetter(letter) {
  // If the letter has already been guessed, exit the function:
  if (state.guessedLetters.includes(letter)) return;

  // Add the clicked letter to the list of guessed letters:
  state.guessedLetters.push(letter);

  // Check if the guessed letter is part of the secret word:
  if (state.randomWordArray.includes(letter)) {
    // If the letter is part of the word, update the blank array to 'reveal' the letter:
    for (let i = 0; i < state.randomWordArray.length; i++) {
      if (state.randomWordArray[i] === letter) {
        state.currentWord[i] = letter;
      };
    };
  } else {
    // If the letter is NOT part of the word, increment the number of incorrect guesses:
    state.incorrectGuesses += 1;
  };

  // Check for winner:
  state.result = checkWinner();

  // Run render():
  render();
}

function randomWord(array) {
  randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function checkWinner() {
  // Check if all the guesses have been used up.
  if (state.incorrectGuesses === 7) {
    return 'loss';
  // Otherwise check if the currentWord array matches the randomWord array:
  } else if (state.currentWord.every((value, index) => value === state.randomWordArray[index])) {
    return 'win';
  }

  return null;
}

function render() {
  renderDiagram();
  renderMessage();
  renderWord();
  renderKeyboard();
}

function renderDiagram() {
  // Set the image to that corresponding to the number of incorrect guesses:
  elements.diagram.setAttribute('src', `assets/images/hangman-${ state.incorrectGuesses }.svg`);
  elements.diagram.setAttribute('alt', `${ state.incorrectGuesses } incorrect guesses`);
}

function renderMessage() {
  // Either say 'guess a letter' or 'gameover' or 'winner'
  if (state.result === null) {
    elements.messageContainer.innerText = 'Guess a letter:';
  } else if (state.result === 'win') {
    elements.messageContainer.innerText = 'You win!';
  } else if (state.result === 'loss') {
    elements.messageContainer.innerText = 'Game Over!';
  }
}

function renderWord() {
  // Clear out the current wordContainer:
  elements.wordContainer.innerHTML = '';

  // Loop through currentWord and create a new letter div for each:
  for (let i = 0; i < state.currentWord.length; i++) {
    letterElement = document.createElement('div');
    letterElement.innerText = state.currentWord[i];
    letterElement.classList.add('p-3', 'shadow', 'rounded-lg', 'bg-yellow-500', 'ease-in-out');
    // Append the elements to the wordContainer in the DOM:
    elements.wordContainer.appendChild(letterElement);
    // Do animation for the most recent guessed letter:
    if (letterElement.innerText === state.guessedLetters[state.guessedLetters.length-1]) {
      animateRevealLetter(letterElement);
    }
  }
  
  // If the game has been won, run the winning animation:
  if (state.result === 'win') {
    animateWinGame(elements.wordContainer);
  }
}

function renderKeyboard() {
  for (let i = 0; i < 3; i++) {
    const keyboardRows = elements.keyboardContainer.children;
    let keyboardRow = keyboardRows[i].children;

    for (const key of keyboardRow) {
      if (state.currentWord.includes(key.innerText) && state.guessedLetters.includes(key.innerText)) {
        // Change background colour to green for letters in the word:
        key.classList.remove('bg-white');
        key.classList.add('bg-green-500');
      } else if (state.guessedLetters.includes(key.innerText)) {
        // Change background colour to red for letters not in the word:
        key.classList.remove('bg-white');
        key.classList.add('bg-red-500');
      };
      // Do animation for the most recent guessed letter:
      if (key.innerText === state.guessedLetters[state.guessedLetters.length-1]) {
        animateKeypress(key);
      }
    };
  };
}

function animateKeypress(letterEl) {
  letterEl.classList.add('-translate-y-4', 'scale-150', 'ease-in-out');
  // letterEl.classList.add('-translate-y-4', 'scale-150');
  setTimeout(() => {
    letterEl.classList.remove('-translate-y-4', 'scale-150', 'ease-in-out');
    // letterEl.classList.remove('-translate-y-4', 'scale-150');
  }, 300)
}

function animateRevealLetter(letterEl) {
  letterEl.classList.add('animate-ping');
  setTimeout(() => {
    letterEl.classList.remove('animate-ping');
  }, 300)
}

function animateWinGame(wordEl) {
  for (let i = 0; i < wordEl.children.length; i++) {
    setTimeout(() => {
      wordEl.children[i].classList.add('-translate-y-4');
    }, 100 * i);
    setTimeout(() => {
      wordEl.children[i].classList.remove('-translate-y-4');
    }, 100 * i + 200);
  }
  for (let i = 0; i < wordEl.children.length; i++) {
    setTimeout(() => {
      wordEl.children[i].classList.add('scale-115');
    }, 100 * wordEl.children.length + 500);
    setTimeout(() => {
      wordEl.children[i].classList.remove('scale-115');
    }, 100 * wordEl.children.length + 1000);
  }
}
