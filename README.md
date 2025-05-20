# Hangman
This project is a browser version of the game _Hangman_.

The game adopts the Model-View-Controller (MVC) design pattern for the code's architecture.

[Try it out.](https://grglls.github.io/hangman/)

## Screenshots:
<img src="assets/screenshots/1_start.png" alt="new game" style="width: 24%;">
<img src="assets/screenshots/2_playing.png" alt="playing the game" style="width: 24%;">
<img src="assets/screenshots/3_lose.png" alt="losing game" style="width: 24%;">
<img src="assets/screenshots/4_win.png" alt="winning game" style="width: 24%;">

## Technologies Used:
* HTML: A single index page that sets up the wireframe of the game.
* CSS: The Tailwind CSS framework.
* JavaScript: Vanilla JS to handle the game's logic and manipulate the DOM.

## How to Play:
* Guess the randomly selected word letter by letter.
* Guess a letter by clicking on the virtual keyboard, or typing on the physical keyboard.
* Complete the word before getting seven incorrect guesses to win.
* Start a new game by clicking the play again button, or pressing Shift + Enter on the physical keyboard.

## Future Development Plans:
* Add sounds for incorrect guess, correct guess, win & game over.
* Keep track of wins/losses on consecutive games, count streak of consecutive wins.
* Points tracker.
* Daily mode.

## Known Bugs:
No known bugs at this time.

## Acknowledgements:
Word list sourced from [here](https://github.com/dariusk/corpora/blob/master/data/words/common.json).

SVG files created using https://picsvg.com/.