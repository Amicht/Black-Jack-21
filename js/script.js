const app = document.getElementById('app');
const dealer = document.getElementById('dealer');
const player = document.getElementById('player');
const gameInfo = document.getElementById('gameInfo');
const hit = document.getElementById('hit');
const endBtn = document.getElementById('endBtn');
const playAgainBtn = document.getElementById('playAgainBtn');


const playerData = new Player();
const dealerData = new Player();

function init(){
    playAgainBtn.disabled = true;
    hit.disabled = false;
    playerData.clear();
    dealerData.clear();
    const cardDeck = shuffle(createDeck(13));

    dealer.innerHTML = createCardStyle(addCard(cardDeck, dealerData));
    player.innerHTML = createCardStyle(addCard(cardDeck, playerData));
    player.innerHTML += createCardStyle(addCard(cardDeck, playerData));

    hit.onclick = addCardBtn;
    function addCardBtn(){
        player.innerHTML += createCardStyle(addCard(cardDeck, playerData));
    }
}

function addCard(deck, turn){
    const newCard = {...deck[deck.length-1]};
    turn.update(newCard);
    deck.pop();
    if(playerData.total>21){
        hit.disabled = true;
        playAgainBtn.disabled = false;
        gameInfo.innerHTML = `Dealer wins </br> 
        player total: ${playerData.total}`;
    }
    else{
        gameInfo.innerHTML = `dealer total: ${dealerData.total} 
        ${dealerData.isAced? ' or '+ dealerData.acedTotal: ''}</br> 
        player total: ${playerData.total} 
        ${playerData.isAced? ' or '+ playerData.acedTotal: ''}`;
    }
    return newCard;
}
init();