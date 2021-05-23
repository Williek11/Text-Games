function getId(id){return doc.getElementById(id);}
function getClass(c){return doc.getElementsByClass(c);}

const log = console.log;
const rnd = Math.random;
const floor = Math.floor;

const doc = document;
const body = doc.body;
const head = doc.head;

const TicTacToe = (function(){
    const boardIndexes = ["🔳", "❌", "🔴"];
    const winArrayMap = [
        0, 3, 6,
        1, 4, 7,
        2, 5, 8,
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        0, 4, 8,
        2, 4, 6,
    ]
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let strBoard = ["?", "?", "?", "?", "?", "?", "?", "?", "?"];
    let playerIndex = 1, robotIndex = 2, startingPlayer = 1; // 1 is robot, 2 is player

    function stringifyBoard () {
        for (var i = 0; i < 9; i++) {strBoard[i] = boardIndexes[board[i]]}
    }

    function logBoard () {
        log("%c" + strBoard[0] + strBoard[1] + strBoard[2] + "\n" + strBoard[3] + strBoard[4] + strBoard[5] + "\n" + strBoard[6] + strBoard[7] + strBoard[8], "margin-bottom:5px;margin-right:5px");
    }

    function isLegalMove (move) {
        return board[move] === 0 ? true : false
    }

    function isGameWon () {
        let isIt = false;
        for(var k = 0; k < 24; k+=3) {
            const b = board[winArrayMap[k+1]] 
            if (b !== 0 && board[winArrayMap[k]] === b && b === board[winArrayMap[k+2]]) {
                isIt = true;
            }
        }
        return isIt;
    }

    function logBoardStringfied () {
        stringifyBoard();
        logBoard();
    }

    function isGameDrawn () {
        return board.includes(0) ? false : true;
    }

    function robotMove () {
        let v1 = floor(rnd() * 3), v2 = floor(rnd() * 3);
        function repeatUntilLegal() {
            if(isLegalMove(v1 + v2 * 3) === false) {v1 = floor(rnd() * 3), v2 = floor(rnd() * 3);repeatUntilLegal()}
        }
        repeatUntilLegal();
        board[v1 + v2 * 3] = robotIndex;
    }

    function resetBoard () {
        for (var i = 0; i < 9; i++) {board[i] = 0}
    }

    return {
        start: function () {
            resetBoard();
            if (startingPlayer === 1) {
                log("I'll go first.");
                robotMove();
                logBoardStringfied();
                startingPlayer = 2;
            } else {
                log("You go first.");
                startingPlayer = 1;
            }
        },
        set: function (x, y) {
            x--; y--;
            if(isLegalMove(x+y*3) !== true) {log("Sorry, but that is an illegal move.")}
            else {
                board[x+y*3] = playerIndex;
                logBoardStringfied();
            
                if(isGameWon()) {log("Good job!")}
                else if(isGameDrawn()) {log("Good game!")}
                else {
                    log("Alright, my turn now.")
                    robotMove();
                    logBoardStringfied();
                    if(isGameWon()) {log("Haha, yes!")}
                    else if(isGameDrawn()) {log("Welp, good game!")}
                }
            }
        },
        logBoard: logBoardStringfied,
    }
})()

TicTacToe.logBoard();
log("Type out TicTacToe.start() to start the game. Once you start, you can move using TicTacToe.set(x, y). You can restart just by typing TicTacToe.start() again. If you want to see the board again, type TicTacToe.logBoard().")
