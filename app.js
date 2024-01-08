addingEventListenerToButtons();

// using factory to create player objects instead of a cosntuctor
function createPlayer(plyName){
    let playerMarking = "";
    let score = 0;
    const increaseScore = () => score ++;
    const getScore = () => score;
    return {plyName, increaseScore, getScore
    };
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
    let gameOver = false;
    let gamePlayers = [player1, player2];
    let currentRound = 0;
    let currentPlayerInGame;

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
        getCurrentRound, increaseRound, getCurrentPlayerInGame, newGameBtn,
        setCurrentPlayerInGame, setGameOver, getGameOver, gamePlayers, resetRound, setNumberOfTurns
    };

}



function ticTacToe(player1, player2) {
    document.getElementById('display').innerHTML = `Good Luck!`;
    const gameApp = createGame('Tic Tac Toe', player1, player2);
    gameApp.setCurrentPlayerInGame(player1);
    gameApp.gameBoard.createCellsAndAddToGameboard();
    updateScoreUi(gameApp);
    addEventListenerToCellBlocks(gameApp);
    const newGameButton = document.getElementById('resetBtn');
    newGameButton.addEventListener("click", function (){
        startNewGame(gameApp);
    })
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
        document.getElementById('display').innerHTML = 'Game Not Over yet';
    }
}

function addEventListenerToCellBlocks(gameApp){

    for(let index = 0; index <= 8; index ++){
        document.getElementById(index.toString()).addEventListener("click", function (e){
            console.log('game over: ' + gameApp.getGameOver());
            if(!gameApp.getGameOver() && e.target === document.getElementById(index.toString()) && gameApp.getCurrentPlayerInGame() === gameApp.gamePlayers[0] && checkCellAvailability(gameApp.gameBoard.getSpecificCell(index))){
                document.getElementById(index.toString()).innerHTML = 'X';
                gameApp.gameBoard.getSpecificCell(index).changeMarking('X');
                checkForMatchingCells(gameApp)
                gameApp.setCurrentPlayerInGame(gameApp.gamePlayers[1]);
                gameApp.increaseRound();
                checkNumberOfTurns(gameApp);

            }
            else if(!gameApp.getGameOver() && e.target === document.getElementById(index.toString()) && gameApp.getCurrentPlayerInGame() === gameApp.gamePlayers[1] && checkCellAvailability(gameApp.gameBoard.getSpecificCell(index))){
                document.getElementById(index.toString()).innerHTML = 'O';
                gameApp.gameBoard.getSpecificCell(index).changeMarking('O');
                checkForMatchingCells(gameApp);
                gameApp.setCurrentPlayerInGame(gameApp.gamePlayers[0]);
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
    console.log('tester: ' + gameApp.gameBoard.getSpecificCell(index1).getCurrentMarking());
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
    document.getElementById('p1Score').innerHTML = `${gameApp.gamePlayers[0].plyName}:
     ${gameApp.gamePlayers[0].getScore()}`;
    document.getElementById('p2Score').innerHTML = `${gameApp.gamePlayers[1].plyName}:
     ${gameApp.gamePlayers[1].getScore()}`;
}

// gatherFormData();