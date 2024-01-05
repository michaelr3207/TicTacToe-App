console.log('test');


console.log('tetststs;'  )
const name = "Bob";
const age = 28;
const color = "red";

const thatObject = { name: name, age: age, color: color };

console.log(thatObject);


const fancyObject = {name,age,color};

console.log(fancyObject);
let currentPlayerInGame;
let currentNumberOfTurns = 0;
let gameOver = false;




// using factory to create player objects instead of a cosntuctor
function createPlayer(plyName){
    let playerMarking = "";
    let score = 0;
    const increaseScore = () => score ++;
    const getScore = () => score;
    const setPlayerMarking = (marking) => playerMarking = marking;
    const getPlayerMarking = () => playerMarking;
    return {plyName, increaseScore, getScore, setPlayerMarking, getPlayerMarking};
}


function createGameCell(){
    let currentPlayerOnCell = "";
    let currentMarking = "";
    const changeMarking = (marking) => currentMarking = marking;
    const changeCurrentPlayerOnCell = (playerName) => currentPlayerOnCell = playerName;
    const getCurrentPlayerOnCell = () => currentPlayerOnCell;
    const getCurrentMarking = () => currentMarking;
    return {getCurrentMarking, getCurrentPlayerOnCell, changeCurrentPlayerOnCell, changeMarking};
}


function createGameBoard(boardName) {
    let cells = [];
    const createCellsAndAddToGameboard = () => {
        for(let index = 0; index <= 8; index ++){
            const currentCell = createGameCell();
            cells.push(currentCell);
            console.log(index);
        }
    }
    const getAllCells = () => cells;
    return {getAllCells, createCellsAndAddToGameboard, boardName};
}

function createGamePlayers(player1Name, player2Name){
    const player1 = createPlayer(player1Name);
    player1.setPlayerMarking('X');
    const player2 = createPlayer(player2Name);
    player2.setPlayerMarking('O');
    ticTacToe(player1, player2);
}

const gatherFormData = () => {
    const player1NameData = document.getElementById('ply1Box').value;
    const player2NameData = document.getElementById('ply2Box').value;
    document.getElementById('enterForm').className = 'hide';
    document.getElementById('mainGame').className = 'gameBody';
    createGamePlayers(player1NameData, player2NameData);
}

function addingEventListenerToButtons(){
    const enterButton = document.getElementById('enter');
    enterButton.addEventListener("click", function (){
        gatherFormData();
    });
}

function createGame(gameName, player1, player2) {
    let gamePlayers = [];
    const addGamePlayers = () => {
        gamePlayers.push(player1);
        gamePlayers.push(player2);
    }
    const getGamePlayers = () => gamePlayers;
    const gameBoard = createGameBoard();
    return {gameBoard, gameName, addGamePlayers, getGamePlayers};
}
addingEventListenerToButtons();
// const game = createGameBoard();
// game.createCellsAndAddToGameboard();
// console.log(game.getAllCells());
// const allCells = game.getAllCells();
// console.log(allCells[0].getCurrentMarking());

function ticTacToe(player1, player2) {
    const gameApp = createGame('Tic Tac Toe', player1, player2);
    currentPlayerInGame = player1;
    gameApp.gameBoard.createCellsAndAddToGameboard(); gameApp.addGamePlayers();
    const allGameCells = gameApp.gameBoard.getAllCells();
    const gamePlayers = gameApp.getGamePlayers();
    addEventListenerToCellBlocks(player1, player2, allGameCells, gameOver);
    console.log(allGameCells);
    console.log(gamePlayers[1].getPlayerMarking());
    const newGameButton = document.getElementById('resetBtn');
    newGameButton.addEventListener("click", function (){
        startNewGame(allGameCells, player1, player2);
    })
}

function checkNumberOfTurns(allGameCells){
   if(currentNumberOfTurns >= 9){
       alert('Game Over');
       currentNumberOfTurns = 0;
       clearTicTacToeGameData(allGameCells);
   }
}

function checkForMatchingCells(allGameCells, player){
    console.log('game cell 0:' + allGameCells[1].getCurrentMarking());
    compareThreeCellsForAMatch(0, 1, 2, allGameCells, player);
    compareThreeCellsForAMatch(3, 4, 5, allGameCells, player);
    compareThreeCellsForAMatch(6, 7, 8, allGameCells, player);
    compareThreeCellsForAMatch(0, 3, 6, allGameCells, player);
    compareThreeCellsForAMatch(1, 4, 7, allGameCells, player);
    compareThreeCellsForAMatch(2, 5, 8, allGameCells, player);
    compareThreeCellsForAMatch(0, 4, 8, allGameCells, player);
    compareThreeCellsForAMatch(2, 4, 6, allGameCells, player);
}

function startNewGame(allGameCells, player1, player2){
    console.log('Player One Score: ' + player1.getScore());
    console.log('Player Two Score: ' + player2.getScore());
    if(gameOver){
        clearTicTacToeGameData(allGameCells);
    }
    else{
        alert('game not over');
    }
}
//comment

function addEventListenerToCellBlocks(player1, player2, allGameCells){
    for(let index = 0; index <= 8; index ++){
        document.getElementById(index.toString()).addEventListener("click", function (e){
            if(!gameOver && e.target === document.getElementById(index.toString()) && currentPlayerInGame === player1 && checkCellAvailability(allGameCells[index])){
                console.log('cell before: ' + allGameCells[index].getCurrentMarking());
                document.getElementById(index.toString()).innerHTML = 'X';
                allGameCells[index].changeMarking('X');
                console.log('cell now: ' + allGameCells[index].getCurrentMarking());
                checkForMatchingCells(allGameCells, player1)
                currentPlayerInGame = player2;
                currentNumberOfTurns ++;
                checkNumberOfTurns(allGameCells);
                console.log('CUrrne number of turns: ==================>' + currentNumberOfTurns);

            }
            else if(!gameOver && e.target === document.getElementById(index.toString()) && currentPlayerInGame === player2 && checkCellAvailability(allGameCells[index])){
                console.log('cell before: ' + allGameCells[index].getCurrentMarking());
                document.getElementById(index.toString()).innerHTML = 'O';
                allGameCells[index].changeMarking('O');
                console.log('cell now: ' + allGameCells[index].getCurrentMarking());
                checkForMatchingCells(allGameCells, player2)
                currentPlayerInGame = player1;
                currentNumberOfTurns ++;
                checkNumberOfTurns(allGameCells);
                console.log('CUrrne number of turns: ==================>' + currentNumberOfTurns);

            }
            else{
                alert('Error cannot make move');
            }
        })
    }
}

function checkCellAvailability(cellBlock){
    if(cellBlock.getCurrentMarking() !== ""){
        alert('This block has been taken!');
        return false;
    }
    return true;
}

function compareThreeCellsForAMatch(index1, index2, index3, allGameCells, player){
    if ((allGameCells[index1].getCurrentMarking() === 'X' && allGameCells[index2].getCurrentMarking() === 'X' && allGameCells[index3].getCurrentMarking() === 'X')
        || (allGameCells[index1].getCurrentMarking() === 'O' && allGameCells[index2].getCurrentMarking() === 'O' && allGameCells[index3].getCurrentMarking() === 'O')) {
        console.log('win');
        alert('win!!');
        gameOver = true;
        alert(player.plyName + ' has won');
        player.increaseScore();
        console.log(player.plyName + ' current score: ' + player.getScore());
        currentNumberOfTurns = -1;
    }
}

function clearTicTacToeGameData(allGameCells){
    gameOver = false;
    for(let index = 0; index < allGameCells.length; index ++){
        document.getElementById(index.toString()).innerHTML = "";
        allGameCells[index].changeMarking("");
    }
}
// gatherFormData();