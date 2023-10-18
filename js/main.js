/*------------------------- constants -------------------------*/
// Set up empty array to take list of words
// const WORDS_SORTED = {};

console.log(ALL_WORDS);
console.log('All WORDS length: ' + ALL_WORDS.commonWords.length);


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

    // Remove correct and incorrect classes from the keyboard-letters when the game starts over.
    
    for (let i = 0; i < 3; i++) {
        // const keyboardRowsss = elements.keyboardContainer.childNodes;
        // let keyboardRow = keyboardRowsss[i*2 + 1];
        const keyboardRowsss = elements.keyboardContainer.children;
        let keyboardRow = [... keyboardRowsss[i].children];

        // console.log('Keyboard row: ' + keyboardRowsss[i*2 + 1]);
        console.log('Keyboard row: ' + keyboardRowsss[i]);
        console.log(keyboardRow);
        
        for (const key of keyboardRow) {
            if (key.classList.contains('correct')) {
                key.classList.remove('correct');
                console.log('Test 1');
            } else if (key.classList.contains('incorrect')) {
                key.classList.remove('incorrect');
                console.log('Test 2');
            };
        };
    };

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

        // Add the class of correct to the letters that are in the word:
        event.target.classList.add('correct');

    } else {
        // If the letter is NOT part of the word, increment the number of incorrect guesses:
        console.log('letter not part of word.');
        state.incorrectGuesses += 1;

        // Add the class of incorrect to the letters that aren't in the word:
        event.target.classList.add('incorrect');

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
        // Append the elements to the wordContainer in the DOM:
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
    // Add the class of correct to the letters that are in the word:
    

    // Add the class of incorrect to the letters that aren't in the word:

}

// To-do: renderDiagram function:
// Update the diagram by updating the image used.
function renderDiagram() {
    // Start with blank diagram:

    // If an incorrect guess is made, move to the next image:
}