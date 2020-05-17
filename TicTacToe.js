console.log("welcome To Tic Tac Toe")
var read = require('readline-sync')
const Process =require('process')

//constants
let TOTAL_MOVES = 9;

//variables
let player;
let computer;
let playerMoves = 0;
let currentPlayer = 0;
let flag
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
        computer = 'X'
        player = 'O'
    }
    else {
        player = 'X'
        computer = 'O'
    }
    if( player == 'X' ) {
        console.log("Player play first with X sign ")
        playerTurn()
    }
    else {
        console.log("Computer play first with X sign")
        computerTurn()
    }
}

/**
 * Switch Player Sign
 */
function switchPlayer() {
   if( currentPlayer == 1 ) {
       computerTurn(0)
   } 
   else {
       playerTurn(0)
   }
}

/**
 * Function For User Play
 */
function playerTurn(flag) {
    if(flag == 0 ) {
        console.log("Player Turn Sign : "+player)
    }
    let position = read.question("Enter Position Between 1 to 9 : " )
    if( position >= 1 && position <= 9 ) {
        isCellEmpty(position, player)
        currentPlayer=1
    }
    else {
        console.log("Invalid Position")
        playerTurn()
    }
}

function computerTurn(flag) {
    if(flag == 0 ) {
        console.log("computer Turn Sign " + computer)
    }
    let randomPosition = Math.floor(Math.random() * 9 + 1)
    isCellEmpty(randomPosition, computer)
    currentPlayer = 0
}

/**
 * 
 * @param {*} position 
 * @param {*} sign 
 */
function isCellEmpty(position, sign, flag) {
    let index = position-1
    if( gameBoard[index] != 'X' && gameBoard[index] != 'O' ) {
        gameBoard[index] = sign
        playerMoves++
    }
    else {
        if(currentPlayer == 0) {
            console.log("Position is occupied : ")
            playerTurn(1)
        } 
        else {
            computerTurn(1)
        }
    }
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
 * Checking Winner
 * @param {*} cell1 
 * @param {*} cell2 
 * @param {*} cell3 
 */
function checkWinner(cell1, cell2, cell3) {
    let winner;
    if( cell1 == cell2 && cell2 == cell3 ) {
        if( cell1 == player ) {
            winner = "Player"
        }
        else {
            winner = "Computer"
        }
        console.log(winner+" Win and have sign " + cell1)
        Process.exit()
    }
}

/**
 * Running game untill game ends
 */
function playTillGameEnd() {
    resetBoard()
    tossForPlay()
    while( playerMoves < TOTAL_MOVES ) {
        displayBoard()
        checkWinningCells()
        switchPlayer()
    }
    displayBoard()
    console.log("Game Tie")
}

playTillGameEnd()