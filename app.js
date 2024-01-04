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
    let score = 0;
    const increaseScore = () => score ++;
    const getScore = () => score;
    return {plyName, increaseScore, getScore};
}




function createGamePlayers(player1Name, player2Name){
    const player1 = createPlayer(player1Name);
    const player2 = createPlayer(player2Name);
    console.log('Player 1: ' + player1.plyName);
    console.log('Player 2: ' + player2.plyName);
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

addingEventListenerToButtons();


