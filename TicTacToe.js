console.log("welcome To Tic Tac Toe")

//variables
let player;

//declaring array
let gameBoard = [];

//resetting board
function resetBoard() {
 gameBoard = [1,2,3,4,5,6,7,8,9];
}

/**
 * Assigning Sign To Player
 */
function assignSignToPlayer() {
    let randomValue = Math.floor(Math.random() * 2)
    if(randomValue == 1) {
        player = 'X'
    }
    else {
        player = 'O'
    }
}
resetBoard()
assignSignToPlayer()