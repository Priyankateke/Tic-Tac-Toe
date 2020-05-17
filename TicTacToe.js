console.log("welcome To Tic Tac Toe")

//variables
let player;
let playerTurn

//declaring array
let gameBoard = [];

//resetting board
function resetBoard() {
 gameBoard = [1,2,3,4,5,6,7,8,9];
}

/**
 * Assigning Sign To Player
 */
function tossForPlay() {
    let randomValue = Math.floor(Math.random() * 2)
    if(randomValue == 1) {
        player = 'X'
        playerTurn = true
    }
    else {
        player = 'O'
        playerTurn = true
    }
}
resetBoard()
tossForPlay()