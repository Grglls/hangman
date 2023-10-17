/*------------------------- constants -------------------------*/
// Set up empty array to take list of words:
let ALL_WORDS = [];

// Retrieve words from JSON file, save to array created above:
fetch('./assets/common.json')
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        ALL_WORDS = json.commonWords;
    });

const WORDS_SORTED = {};

setTimeout(console.log, 3000, ALL_WORDS[200]);

// fetch('https://github.com/dariusk/corpora/blob/master/data/words/common.json')
// .then((response) => response.json())
// .then((json) => console.log(json));


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
    message: document.querySelector('h2'),
    playAgain: document.getElementById('play-again'),
    keyboardContainer: document.getElementById('keyboard-container'),
    wordContainer: document.getElementById('word-container'),
}

/*------------------------- event listeners -------------------------*/


/*------------------------- functions -------------------------*/
init();
elements.playAgain.addEventListener('click', init);
elements.keyboardContainer.addEventListener('click', handleClick);

// To-do: init function:
function init () {
    state.randomWord = "testing";  //Consider bringing the word in already as uppercase here.
    state.randomWordArray = state.randomWord.toUpperCase().split(""); // Change the word to upper case, convert to an array.
    state.currentWord = state.randomWord.split("").map((x) => '_'); // Create a blank array, same length as word.
    state.incorrectGuesses = 0;
    state.guessedLetters = [];
    state.result = null;
    render();
}

// To-do: handleClick function:
function handleClick(event) {
    console.log(event.target);
    console.log(event.target.innerHTML);
    console.log(event.target.innerText);
    console.log('click registered'); 
    
    // Add the clicked letter to the list of guessed letters:
    state.guessedLetters.push(event.target.innerText);

    // Check if the guessed letter is part of the secret word:
    if (state.randomWordArray.includes(event.target.innerText)) {
        // If the letter is part of the word, update the blank array to 'reveal' the letter:
        console.log('Letter part of word.');
        for (let i = 0; i < state.randomWordArray.length; i++) {
            if (state.randomWordArray[i] === event.target.innerText) {
                state.currentWord[i] = event.target.innerText;
            };
        };
    } else {
        // If the letter is NOT part of the word, increment the number of incorrect guesses:
        console.log('letter not part of word.');
        state.incorrectGuesses += 1;
    };

    // Check for winner:
    state.winner = checkWinner();

    // Run render():
    render();
}





// To-do: Randomly select a word from the word list:


// To-do: checkWinner function:
function checkWinner(arguments) {

}


// To-do: render function:
function render() {
    renderWord();
    renderMessage();
    renderControls();
    renderDiagram();
}


// To-do: renderWord function: 
// Build-out the word section by appending children. Children must be blank or show the correct letter.
function renderWord() {
    // Clear out the current wordContainer:
    while (elements.wordContainer.firstChild != null)  {
        elements.wordContainer.removeChild(elements.wordContainer.lastChild);
    }
    console.log('First child: ' + elements.wordContainer.firstChild);

    console.log('renderboard test');
    // Loop through currentWord and create a new letter div for each:
    for (let i = 0; i < state.currentWord.length; i++) {
        letterElement = document.createElement('div');
        letterElement.innerText = state.currentWord[i];
        letterElement.classList.add('keyboard-letter');
        elements.wordContainer.appendChild(letterElement);
    }
}

// To-do: renderMessage function:
// Either say 'guess a letter' or 'gameover' or 'winner'
function renderMessage() {
    // Say whether to guess a letter or 
}

// To-do: renderControls function: 
// Update the colours of the keyboard keys for whether they are correct or incorrect guesses.
function renderControls() {
    //
}

// To-do: renderDiagram function:
// Update the diagram by updating the image used.
function renderDiagram() {
    // Start with blank diagram:

    // If an incorrect guess is made, move to the next image:
}