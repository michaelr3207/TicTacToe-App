console.log('test');

const name = "Bob";
const age = 28;
const color = "red";

const thatObject = { name: name, age: age, color: color };

console.log(thatObject);


const fancyObject = {name,age,color};

console.log(fancyObject);


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
    return {getAllCells, createCellsAndAddToGameboard};
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
    createGamePlayers(player1NameData, player2NameData);
}

function addingEventListenerToButtons(){
    const enterButton = document.getElementById('enter');
    enterButton.addEventListener("click", function (){
        gatherFormData();
    })
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
    gameApp.gameBoard.createCellsAndAddToGameboard(); gameApp.addGamePlayers();
    const allGameCells = gameApp.gameBoard.getAllCells();
    const gamePlayers = gameApp.getGamePlayers();
    console.log(allGameCells);
    console.log(gamePlayers[1].getPlayerMarking());

    console.log('CELL: ' + allGameCells[0].getCurrentMarking());
}




