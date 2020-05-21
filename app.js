//display welcome message
console.log("welcome To Tic Tac Toe")

//access TicTacToe file
const TicTacToe = require('./TicTacToe')

//create object
const ticTacToe = new TicTacToe()

//start game
ticTacToe.playTillGameEnd()