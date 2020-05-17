console.log("welcome To Tic Tac Toe")
var read = require('readline-sync')

//constants
let TOTAL_MOVES = 9;

//variables
let player;
let playerTurn;
let playerMoves = 0;
//let position

//declaring array
let gameBoard = [];

//resetting board
function resetBoard() {
    gameBoard = [1,2,3,4,5,6,7,8,9];
    displayBoard()
}

/**
 * displaying Board
 */
function displayBoard() {
    console.log("-------------")
    for(let i = 0; i < 9; i += 3) {
        console.log("| "+ gameBoard[i] + " | "+ gameBoard[(i+1)] + " | "+ gameBoard[(i+2)] +" | ")
        console.log("-------------")
    }
}

/**
 * Assiging letter X or O to player and decide who play first
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
    console.log("Player sign "+player)
}

/**
 * Function For User Play
 */
function userPlay() {
    let position = read.question("Enter Position Between 1 to 9 : " )
    if( position >= 1 && position <= 9 ) {
        isCellEmpty(position)
    }
    else {
        console.log("Invalid Position")
        userPlay()
    }
}

/**
 * Running game untill game ends
 */
function playTillGameEnd() {
    while( playerMoves < TOTAL_MOVES ) {
        userPlay()
        displayBoard()
    }
}

/**
 * checking position is already filled or blank
 * @param {*} position 
 */
function isCellEmpty(position) {
    let index = position-1
    if( gameBoard[index] != player ) {
        gameBoard[index] = player
        playerMoves++
    }
    else {
        console.log("Position is Occupied")
    }
}
resetBoard()
tossForPlay()
playTillGameEnd()