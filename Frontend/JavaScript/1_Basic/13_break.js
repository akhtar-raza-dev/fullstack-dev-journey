//! Break statement is mostly used in while loops to exit the loop when a certain condition is met.

const favMovies = "avatar";
let guess = prompt("Guess my Favorite Movie(Hint: Creatures are blue): ");
guess = guess.toLowerCase();

while (guess !== favMovies){
    if( guess === "quit") {
        console.log("You quit the game, better luck next time!");
        break;
    }
    guess = prompt("Try again if not please enter 'quit' to exit: ");
    guess = guess.toLowerCase();
}
if (guess === favMovies) {
    console.log("You guessed it right, Congrats!");
}