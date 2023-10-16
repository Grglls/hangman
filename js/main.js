/*------------------------- constants -------------------------*/
///Object with list of words: 
const WORDS = {
    one: [],
    two: [],
    three: [],
    four: []
};

// fetch('./assets/common.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));


fetch('https://github.com/dariusk/corpora/blob/master/data/words/common.json')
.then((response) => response.json())
.then((json) => console.log(json));


/*------------------------- state variables -------------------------*/
const state = {
    currentWord: null,
    numberOfGuesses: null,
    guessedLetters: null,
    result: null,
};


/*------------------------- cached elements  -------------------------*/
const element = {
    message: document.querySelector('h2'),
    playAgain: document.getElementById(''),

}

/*------------------------- event listeners -------------------------*/


/*------------------------- functions -------------------------*/
init();


// To-do: init function:
function init () {

}

// To-do: handleClick function:
function handleClick(event) {

}


// To-do: retrieve words from JSON file:



// To-do: Randomly select a word from the word list:


// To-do: checkWinner function:
function checkWinner(arguments) {

}


// To-do: render function:
function render() {
    renderBoard();
    renderMessage();
    renderControls();
}


// To-do: renderBoard function:
function renderBoard() {

}

// To-do: renderMessage function:
function renderMessage() {
    
}

// To-do: renderControls function:
function renderControls() {
    
}