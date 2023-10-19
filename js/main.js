/*------------------------- version -------------------------*/
console.log('version 0.5');

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
    diagramContainer: document.getElementById('diagram-container'),
    message: document.querySelector('h2'),
    wordContainer: document.getElementById('word-container'),
    keyboardContainer: document.getElementById('keyboard-container'),
    playAgain: document.getElementById('play-again'),
};

/*------------------------- event listeners -------------------------*/
elements.playAgain.addEventListener('click', init);
elements.keyboardContainer.addEventListener('click', handleClick);


/*------------------------- functions -------------------------*/
init();


function init () {
    state.randomWord = randomWord(WORDS_SORTED);  //Consider bringing the word in already as uppercase here.
    state.randomWordArray = state.randomWord.toUpperCase().split(""); // Change the word to upper case, convert to an array.
    state.currentWord = state.randomWord.split("").map((x) => '_'); // Create a blank array, same length as word.
    state.incorrectGuesses = 0;
    state.guessedLetters = [];
    state.result = null;

    // Reset the colouring of the keyboard-letters when the game starts over:
    for (let i = 0; i < 3; i++) {
        const keyboardRows = elements.keyboardContainer.children;
        let keyboardRow = [... keyboardRows[i].children];
        
        for (const key of keyboardRow) {
            // Remove 'correct' and 'incorrect' classes:
            key.classList.remove('correct');
            key.classList.remove('incorrect');
            
            // Add the 'unguessed' class back in if it's been removed:
            if (key.classList.contains('unguessed') === false) {
                key.classList.add('unguessed');
            }
        };
    };

    render();
}


function handleClick(event) {
    // If the event.target wasn't a keyboard letter, exit the function:
    if (event.target.classList.contains('keyboard-letter') === false) return;
    
    // Add the clicked letter to the list of guessed letters:
    state.guessedLetters.push(event.target.innerText);

    // Check if the guessed letter is part of the secret word:
    if (state.randomWordArray.includes(event.target.innerText)) {
        // If the letter is part of the word, update the blank array to 'reveal' the letter:
        for (let i = 0; i < state.randomWordArray.length; i++) {
            if (state.randomWordArray[i] === event.target.innerText) {
                state.currentWord[i] = event.target.innerText;
            };
        };

        // Add the class of 'correct' to the letters that are in the word:
        event.target.classList.add('correct');

        // ...and remove the class of 'unguessed' from the letter:
        event.target.classList.remove('unguessed');
        
    } else {
        // If the letter is NOT part of the word, increment the number of incorrect guesses:
        state.incorrectGuesses += 1;
        
        // Add the class of 'incorrect' to the letters that aren't in the word:
        event.target.classList.add('incorrect');

        // ...and remove the class of 'unguessed' from the letter:
        event.target.classList.remove('unguessed');

    };

    // Check for winner:
    state.result = checkWinner();

    // Run render():
    render();
}

// Randomly select a word from an array:
function randomWord(array) {
    randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


function checkWinner(arguments) {
    // Check if all the guesses have been used up.
    if (state.incorrectGuesses === 7) {
        console.log('loser');
        return 'loss';
        // Otherwise check if the currentWord array matches the randomWord array:
    } else if (state.currentWord.every((value, index) => value === state.randomWordArray[index])) {
        console.log('winner');
        return 'win';
    } else {
        console.log('no winner');
    }   return null;
}


function render() {
    renderDiagram();
    renderWord();
    renderMessage();
    renderControls();
}


function renderDiagram() {
    // Set the image to that corresponding to the number of incorrect guesses:
    elements.diagramContainer.innerHTML = `<img src="../assets/Hangman ${ state.incorrectGuesses }.svg" alt="${ state.incorrectGuesses } incorrect guesses">`;
}


function renderWord() {
    // Clear out the current wordContainer:
    elements.wordContainer.innerHTML = '';

    // Loop through currentWord and create a new letter div for each:
    for (let i = 0; i < state.currentWord.length; i++) {
        letterElement = document.createElement('div');
        letterElement.innerText = state.currentWord[i];
        letterElement.classList.add('keyboard-letter');
        // Append the elements to the wordContainer in the DOM:
        elements.wordContainer.appendChild(letterElement);
    }
}

// To-do: renderMessage function:
function renderMessage() {
    // Either say 'guess a letter' or 'gameover' or 'winner'
    // Say whether to guess a letter or 
    
}

// To-do: renderControls function: 
// Update the colours of the keyboard keys for whether they are correct or incorrect guesses.
function renderControls() {
    // Add the class of correct to the letters that are in the word:
    

    // Add the class of incorrect to the letters that aren't in the word:

}
