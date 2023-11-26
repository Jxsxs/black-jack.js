let playerSum = 0;
let dealerSum = 0;
let dealerCards = [];
let playerCards = [];
let canHit = true;


let deck = [];

window.onload = function(){
    generateDeck();
    shuffleDeck();
};

let startButton = null;
let playerScore = null;
let dealerScore = null;
let hidden = null;
let hitButton = null;
let stayButton = null;
let result = null;
let playerDeck = null;
let dealerDeck = null;

document.addEventListener("DOMContentLoaded", (event) => {
    startButton = document.getElementById('start-button')
    playerScore = document.getElementById('player-sum');
    dealerScore = document.getElementById('dealer-sum');
    hidden = document.getElementById('hidden');
    hitButton = document.getElementById("hit");
    stayButton = document.getElementById("stay");
    result = document.getElementById("result");
    playerDeck = document.getElementById("player-deck");
    dealerDeck = document.getElementById("dealer-deck");
    startButton.addEventListener('click', startGame);
    hitButton.addEventListener('click', hit);
    stayButton.addEventListener('click', stay);
});

function generateDeck () {
    let cardsUnit = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
    let cardsSuit = ["C", "D", "H", "S"]
    for(let i = 0; i < cardsUnit.length; i++){
        for(let j = 0; j < cardsSuit.length; j++){
            deck.push(cardsUnit[i] + "-" + cardsSuit[j])
        }
    }
};

function shuffleDeck(){
    deck.sort(() => Math.random() - 0.5);
};

function startGame(){
hitButton.disabled = false;
hidden.src = "https://cs8.pikabu.ru/images/big_size_comm/2016-01_5/1453493607126438736.jpg";
resetGame();
plusCard(dealerCards);
plusCard(playerCards);
plusCard(dealerCards);
dealerDeck.insertAdjacentHTML('beforeend', `<img id="added-img" src="/cards/${dealerCards[1]}.png">`);
playerDeck.insertAdjacentHTML('beforeend', `<img id="added-img" src="/cards/${playerCards[0]}.png">`);
dealerSum = getSum(dealerCards);
playerSum = getSum(playerCards);
startButton.style.visibility = "hidden";
hitButton.style.visibility = "visible";
stayButton.style.visibility = "visible";
};

function plusCard(people){
    people.push(deck.pop())
};

function getValue(array, id) {
    let obj = array[id].split("-");
    let value = obj[0]
    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
};

function getSum(arr){
    let result = 0
    for (let i = 0; i < arr.length; i++) {
        result += getValue(arr, i);
    }
    return result
};

function hit(){
    plusCard(playerCards);
    playerDeck.insertAdjacentHTML('beforeend', `<img id="added-img" src="/cards/${playerCards[playerCards.length-1]}.png">`);
    playerSum+=getValue(playerCards, playerCards.length-1)
    if(playerSum>21){
        result.textContent = 'YOU LOSE...'
        hitButton.disabled = true;
        stay()
    }if(playerSum == 21){
        result.textContent = 'CONGRATULATIONS!!! YOU ARE WIN!!!'
        hitButton.disabled = true;
        stay()
    }
};

function stay(){
hidden.src = `/cards/${dealerCards[0]}.png`;
playerScore.textContent = playerSum;
dealerScore.textContent = dealerSum;
hitButton.disabled = true;
if(playerSum > dealerSum && playerSum<=21 || dealerSum>21){
    result.textContent = 'CONGRATULATIONS!!! YOU ARE WIN!!!'
}if(playerSum < dealerSum && dealerSum<=21){
    result.textContent = 'UNLUCK...'
}if(playerSum == dealerSum){
    result.textContent = 'TIE'
}
startButton.style.visibility = "visible";
hitButton.style.visibility = "hidden"
stayButton.style.visibility = "hidden"
};

function resetGame(){
    let addedImg = document.querySelectorAll('#added-img')
addedImg.forEach(function (element) {
    element.remove();
});
dealerCards = [];
playerCards = [];
playerSum = 0;
dealerSum = 0;
playerScore.textContent = '';
dealerScore.textContent = '';
result.textContent='';
startButton.textContent = 'New game';
};