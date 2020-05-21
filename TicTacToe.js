//For accepting user input
var read = require('readline-sync')

//process
const Process = require('process')

//variables
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let choice;
flag = 0;
let moveCompleted = 0;
const TOTAL_MOVES = 9;

class TicTacToe {
    /**
     * Start Game
     */
    playTillGameEnd() {
        console.log("Player:X and Computer:O\n");
        let isCompTurn = false;
        let random = Math.floor(Math.random() * 2)
        if (random == 0) {
            isCompTurn = true;
            console.log("Computer Play first \n");
        }
        else {
            console.log("Player Play first \n");
        }

        this.displayBoard();

        do {
            if (isCompTurn) {
                isCompTurn = true;
                console.log("Computer chance");
            }
            else {
                isCompTurn = false;
                console.log("Player chance");
                choice = read.question("Enter Position Between 1 to 9 : ");
            }
            if (isCompTurn || (arr[choice] != 'X' && arr[choice] != 'O')) {
                if (isCompTurn) {
                    this.computerMove('X', 'O');
                    moveCompleted++;
                    this.displayBoard();
                    isCompTurn = false;
                }
                else {
                    arr[choice] = 'X';
                    moveCompleted++;
                    this.displayBoard();
                    isCompTurn = true;
                }
            }
            else {
                console.log("The position is already marked with " + arr[choice]);
                console.log("\n");
                console.log("Enter again");
            }
            flag = this.checkWin();

        } while (flag != 1 && flag != -1 && moveCompleted != TOTAL_MOVES)

        this.displayBoard();

        if (flag == 1) {
            let winner = isCompTurn ? "Player" : "Computer";
            console.log(winner + " has won");
        }
        else {
            console.log("Draw");
        }
    }

    /**
     * check player winning condition
     */
    checkWin() {
        //Check row wise win
        for (let i = 1; i <= 9;) {
            if (arr[i] == arr[i + 1] && arr[i + 1] == arr[i + 2]) {
                return 1;
                break;
            }
            i = i + 3;
        }
        //Check column wise win
        for (let i = 1; i <= 3; i++) {
            if (arr[i] == arr[i + 3] && arr[i + 3] == arr[i + 6]) {
                return 1;
                break;
            }
        }
        //Check diagonal win
        if (arr[1] == arr[5] && arr[5] == arr[9]) {
            return 1;
        }
        else if (arr[3] == arr[5] && arr[5] == arr[7]) {
            return 1;
        }
        return 0; //play continue
    }
    /**
     * computer move turn
     * @param {*} playerChar
     * @param {*} compChar
     */
    computerMove(playerChar, compChar) {

        //Start Check Win Cells
        if (this.checkWinAndBlock(1, 2, 3, compChar, compChar)) { }
        else if (this.checkWinAndBlock(4, 5, 6, compChar, compChar)) { }
        else if (this.checkWinAndBlock(7, 8, 9, compChar, compChar)) { }
        else if (this.checkWinAndBlock(1, 4, 7, compChar, compChar)) { }
        else if (this.checkWinAndBlock(2, 5, 8, compChar, compChar)) { }
        else if (this.checkWinAndBlock(3, 6, 9, compChar, compChar)) { }
        else if (this.checkWinAndBlock(1, 5, 9, compChar, compChar)) { }
        else if (this.checkWinAndBlock(3, 5, 7, compChar, compChar)) { }
        //End Check Win Cells

         //Start block Win Cells
         if (this.checkWinAndBlock(1, 2, 3, playerChar, compChar)) { }
         else if (this.checkWinAndBlock(4, 5, 6, playerChar, compChar)) { }
         else if (this.checkWinAndBlock(7, 8, 9, playerChar, compChar)) { }
         else if (this.checkWinAndBlock(1, 4, 7, playerChar, compChar)) { }
         else if (this.checkWinAndBlock(2, 5, 8, playerChar, compChar)) { }
         else if (this.checkWinAndBlock(3, 6, 9, playerChar, compChar)) { }
         else if (this.checkWinAndBlock(1, 5, 9, playerChar, compChar)) { }
         else if (this.checkWinAndBlock(3, 5, 7, playerChar, compChar)) { }
         //End block Win Cells

         //start diagonal and side cells
        else {
            this.checkCornersCenterSidesCell(compChar);
        }
        //end diagonal and side cells
    }

   /**
    * computer will check for win and block opponent
    * @param {*} cell1
    * @param {*} cell2
    * @param {*} cell3
    * @param {*} checkChar
    * @param {*} compChar
    */
    checkWinAndBlock(cell1, cell2, cell3, checkChar, compChar) {
        let allocated = false;
        for (let i = 0; i < 3; i++) {
            if (arr[cell1] == checkChar && arr[cell2] == checkChar && this.isEmpty(arr[cell3])) {
                arr[cell3] = compChar;
                allocated = true;
                break;
            }
            else {
                let temp = cell1;
                cell1 = cell2;
                cell2 = cell3;
                cell3 = temp;
            }
        }
        return allocated;
    }

    /**
     * check Valid Cell
     * @param {*} val
     */
    isEmpty(val) {
        let isBlank = false;
        if (val != 'X' && val != 'O') {
            isBlank = true;
        }
        return isBlank;
    }

    /**
     * check corners, sides, center are available or not
     * @param {*} compChar 
     */
    checkCornersCenterSidesCell(compChar) {
        let allocated = false;

        let cells = [1, 3, 7, 9, 5, 2, 4, 6, 8];
        
        for (let i = 0; i < cells.length; i++) {
            if (this.isEmpty(arr[cells[i]])) {
                arr[cells[i]] = compChar;
                allocated = true;
                break;
            }
        }
        return allocated;
    }

    /**
     * display board
     */
    displayBoard() {
        console.log("__________");
        console.log(arr[1] + " | " + arr[2] + " | " + arr[3]);
        console.log("__|___|___");
        console.log(arr[4] + " | " + arr[5] + " | " + arr[6]);
        console.log("__|___|___");
        console.log(arr[7] + " | " + arr[8] + " | " + arr[9]);
        console.log("__________");

    }
}
module.exports = TicTacToe