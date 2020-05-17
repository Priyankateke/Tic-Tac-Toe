console.log("welcome To Tic Tac Toe")
var read = require('readline-sync')
const Process =require('process')

//constants
let TOTAL_MOVES = 9;

//variables
let player;
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
    }
    else {
        player = 'O'
    }
    console.log("Player sign "+player)
}

/**
 * Switch Player Sign
 */
function switchPlayerSign() {
    //Checking condition using Ternary operators
    if( player == 'X' ) {
        player = 'O'
    }
    else {
        player = 'X'
    }
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
 * checking position is already filled or blank
 * @param {*} position 
 */
function isCellEmpty(position) {
    let index = position-1
    if( gameBoard[index] != 'X' && gameBoard[index] != 'O' ) {
        gameBoard[index] = player
        playerMoves++
    }
    else {
        console.log("Position is Occupied")
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
        checkWinningCells()
        switchPlayerSign()
    }
    console.log("Game Tie")
}

/**
 * Checking column, rows and diagonals
 */
function checkWinningCells() {
    let col = 0
    for( let row = 0; row < 7; row += 3 ) {
        checkWinner(gameBoard[row], gameBoard[(row+1)], gameBoard[(row+2)])
        checkWinner(gameBoard[col], gameBoard[(col+3)], gameBoard[(col+6)])
        col++
    }
    checkWinner(gameBoard[0], gameBoard[4], gameBoard[8])
    checkWinner(gameBoard[2], gameBoard[4], gameBoard[6])
}

/**
 * 
 * @param {*} cell1 
 * @param {*} cell2 
 * @param {*} cell3 
 */
function checkWinner(cell1, cell2, cell3) {
    if( cell1 == cell2 && cell2 == cell3 ) {
        console.log("Player Win and have sign " + player)
        Process.exit()
    }
}

resetBoard()
tossForPlay()
playTillGameEnd()