addingEventListenerToButtons();
const gameApp = createGame('Tic Tac Toe');
gameApp.gameBoard.createCellsAndAddToGameboard();
addEventListenerToCellBlocks(gameApp);
console.log('ois it off: ' + gameApp.getGameOver());


// using factory to create player objects instead of a cosntuctor
function createPlayer(plyName){
    let score = 0;
    const increaseScore = () => score ++;
    const getScore = () => score;
    return {plyName, increaseScore, getScore};
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
        }
    }

    const getSpecificCell = (indexOfCell) => cells[indexOfCell];
    const removeCells = () => cells = [];
    const getAllCells = () => cells;
    const getAccessToSpecificCell = (index) => cells[index];
    return {getAllCells, createCellsAndAddToGameboard, boardName, getSpecificCell, removeCells};
}

function createGamePlayers(player1Name, player2Name){
    const player1 = createPlayer(player1Name);
    const player2 = createPlayer(player2Name);
    console.log('player name: ' + player1.plyName);
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
    const newGameButton = document.getElementById('resetBtn');
    newGameButton.addEventListener("click", function (){
        startNewGame(gameApp);
    })
}

function createGame(gameName) {
    let gameOver = false;
    let gamePlayers = [];
    let currentRound = 0;
    let currentPlayerInGame;

    const addPlayer = (player) => gamePlayers.push(player);

    const getGamePlayers = () => gamePlayers;
    const getCurrentRound = () => currentRound;
    const getCurrentPlayerInGame = () => currentPlayerInGame;
    const setCurrentPlayerInGame = (player) => currentPlayerInGame = player;
    const increaseRound = () => currentRound ++;
    const gameBoard = createGameBoard();
    const getGameOver = () => gameOver;
    const setGameOver = (option) => gameOver = option;
    const setNumberOfTurns = (number) => currentRound = number;
    const resetRound = () => currentRound = 0;
    const clearPlayers = () => gamePlayers = [];
    const getSpecificPlayer = (index) => gamePlayers[index];

    const newGameBtn = document.getElementById('newGame');
    newGameBtn.addEventListener("click",  () => {
        document.getElementById('enterForm').className = 'mainBody';
        document.getElementById('mainGame').className = 'hide';
        for(let index = 0; index < gameBoard.getAllCells().length; index ++){
            document.getElementById(index.toString()).innerHTML = "";
            gameBoard.getSpecificCell(index).changeMarking("");
        }
        // gameBoard.removeCells();
        setGameOver(false);
    });
    return {gameBoard,
        gameName, getGamePlayers,
        getCurrentRound, increaseRound, getCurrentPlayerInGame, newGameBtn, clearPlayers, getSpecificPlayer,
        setCurrentPlayerInGame, setGameOver, getGameOver, gamePlayers, resetRound, setNumberOfTurns, addPlayer
    };

}


function ticTacToe(player1, player2) {
    gameApp.clearPlayers();
    document.getElementById('display').innerHTML = `Good Luck!`;
    gameApp.addPlayer(player1); gameApp.addPlayer(player2);
    console.log('current player 1: ' + gameApp.getSpecificPlayer(0).plyName);
    gameApp.setCurrentPlayerInGame(player1);
    updateScoreUi(gameApp);
}

function checkNumberOfTurns(gameApp){
   if(gameApp.getCurrentRound() >= 9){
       gameApp.resetRound();
       gameApp.setGameOver(true);
       document.getElementById('display').innerHTML = `DRAW!!`;
       gameApp.setNumberOfTurns(-1);
   }
}

function checkForMatchingCells(gameApp){
    compareThreeCellsForAMatch(0, 1, 2, gameApp);
    compareThreeCellsForAMatch(3, 4, 5, gameApp);
    compareThreeCellsForAMatch(6, 7, 8, gameApp);
    compareThreeCellsForAMatch(0, 3, 6, gameApp);
    compareThreeCellsForAMatch(1, 4, 7, gameApp);
    compareThreeCellsForAMatch(2, 5, 8, gameApp);
    compareThreeCellsForAMatch(0, 4, 8, gameApp);
    compareThreeCellsForAMatch(2, 4, 6, gameApp);
}

function startNewGame(gameApp){
    if(gameApp.getGameOver()){
        clearTicTacToeGameData(gameApp);
    }
    else{
        alert('Game not over yet!');
    }
}

function addEventListenerToCellBlocks(gameApp){

    for(let index = 0; index <= 8; index ++){
        document.getElementById(index.toString()).addEventListener("click", function (e){
            if(!gameApp.getGameOver() && e.target === document.getElementById(index.toString()) && gameApp.getCurrentPlayerInGame() === gameApp.getSpecificPlayer(0) && checkCellAvailability(gameApp.gameBoard.getSpecificCell(index))){
                console.log('bruhhhhh1');
                document.getElementById('display').innerHTML = `${gameApp.getSpecificPlayer(1).plyName}'s turn!`;
                document.getElementById(index.toString()).innerHTML = 'X';
                gameApp.gameBoard.getSpecificCell(index).changeMarking('X');
                checkForMatchingCells(gameApp)
                gameApp.setCurrentPlayerInGame(gameApp.getSpecificPlayer(1));
                gameApp.increaseRound();
                checkNumberOfTurns(gameApp);
            }
            else if(!gameApp.getGameOver() && e.target === document.getElementById(index.toString()) && gameApp.getCurrentPlayerInGame() === gameApp.getSpecificPlayer(1) && checkCellAvailability(gameApp.gameBoard.getSpecificCell(index))){
                document.getElementById('display').innerHTML = `${gameApp.getSpecificPlayer(0).plyName}'s turn!`;
                console.log('bruhhhhh2');
                document.getElementById(index.toString()).innerHTML = 'O';
                gameApp.gameBoard.getSpecificCell(index).changeMarking('O');
                checkForMatchingCells(gameApp);
                gameApp.setCurrentPlayerInGame(gameApp.getSpecificPlayer(0));
                gameApp.increaseRound();
                checkNumberOfTurns(gameApp);
            }
            else{
                document.getElementById('display').innerHTML = `ERROR: Cannot make move!`;
            }

        })
    }
}


function checkCellAvailability(cellBlock){
    if(cellBlock.getCurrentMarking() !== ""){
        document.getElementById('display').innerHTML = 'Block has been taken!';
        return false;
    }
    return true;
}

function compareThreeCellsForAMatch(index1, index2, index3, gameApp){
    if ((gameApp.gameBoard.getSpecificCell(index1).getCurrentMarking() === 'X' && gameApp.gameBoard.getSpecificCell(index2).getCurrentMarking() === 'X' && gameApp.gameBoard.getSpecificCell(index3).getCurrentMarking() === 'X')
        || (gameApp.gameBoard.getSpecificCell(index1).getCurrentMarking() === 'O' && gameApp.gameBoard.getSpecificCell(index2).getCurrentMarking() === 'O' && gameApp.gameBoard.getSpecificCell(index3).getCurrentMarking() === 'O')) {
        gameApp.setGameOver(true);
        document.getElementById('display').innerHTML = `${gameApp.getCurrentPlayerInGame().plyName} has won!`;
        gameApp.getCurrentPlayerInGame().increaseScore();
        gameApp.setNumberOfTurns(-1);
        updateScoreUi(gameApp);
    }
}

function clearTicTacToeGameData(gameApp){
    document.getElementById('display').innerHTML = `Good Luck!`;
    gameApp.setGameOver(false);
    for(let index = 0; index < gameApp.gameBoard.getAllCells().length; index ++){
        document.getElementById(index.toString()).innerHTML = "";
        gameApp.gameBoard.getSpecificCell(index).changeMarking("");
    }
}

function updateScoreUi(gameApp){
    console.log('players UI: ' + gameApp.gamePlayers[0]);
    document.getElementById('p1Score').innerHTML = `${gameApp.getSpecificPlayer(0).plyName}:
     ${gameApp.getSpecificPlayer(0).getScore()}`;
    document.getElementById('p2Score').innerHTML = `${gameApp.getSpecificPlayer(1).plyName}:
     ${gameApp.getSpecificPlayer(1).getScore()}`;
}

// gatherFormData();