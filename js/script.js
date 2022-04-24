const app = document.getElementById('app');
const title = document.getElementById('title');
const dealer = document.getElementById('dealer');
const player = document.getElementById('player');
const gameInfo = document.getElementById('gameInfo');
const hit = document.getElementById('hit');
const stand = document.getElementById('stand')
const playAgainBtn = document.getElementById('playAgainBtn');
const myWallet = document.getElementById('myWallet');
const myBet = document.getElementById('myBet');

title.innerHTML = titleStyle();

const playerData = new Player();
const dealerData = new Player();


function titleStyle(){
    return `Black
    <span class="title-icon py-auto">
    ${cardTypes.heart.icon}
    </span> 
    Jack 
    <span class="title-icon fs-2">
    ${cardTypes.diamond.icon}
    </span>`
}

function init(){
    myBet.innerHTML = playerData.bet;
    myWallet.innerHTML = playerData.wallet;
    playerData.clear();
    dealerData.clear();
    gameInfo.innerHTML = '0';
    stand.disabled = false;
    playAgainBtn.disabled = true;
    hit.disabled = false;
    const cardDeck = shuffle(createDeck(13));

    dealer.innerHTML = createCardStyle(addCard(cardDeck, dealerData));
    player.innerHTML = createCardStyle(addCard(cardDeck, playerData));
    player.innerHTML += createCardStyle(addCard(cardDeck, playerData));
    if(playerData.isBJ()) return gameOver().bj();

    hit.onclick = addCardBtn;
    stand.onclick = standBtn;
    function addCardBtn(){
        player.innerHTML += createCardStyle(addCard(cardDeck, playerData));
        gameInfo.innerHTML = `score: ${playerData.highest()} / 
        ${dealerData.highest()}`;
        if(playerData.highest()===21) hit.disabled = true;
        if(playerData.highest()>21) gameOver().lose();
    }
    function standBtn(){
        stand.disabled = true;
        dealer.innerHTML += createCardStyle(addCard(cardDeck, dealerData));
        gameInfo.innerHTML = `score: ${playerData.highest()} / 
        ${dealerData.highest()}`;
        if(gameModule().DealerTurn()){return setTimeout(standBtn, 1000)};
    }
}


function addCard(deck, turn){
    const newCard = {...deck[deck.length-1]};
    turn.update(newCard);
    deck.pop();
    gameInfo.innerHTML = `score: ${playerData.highest()} / 
    ${dealerData.highest()}`;
    return newCard;
}

function gameModule(){
    function checkWin(dlObj,plObj){
        let dl = dlObj.total+10;
        let pl = plObj.total+10;
        dlObj.isAced && dl<22? null: dl-=10;
        plObj.isAced && pl<22? null: pl-=10;
        
        if(dl>pl) return gameOver().lose();
        if(dl<pl) return gameOver().win();
        if(dl===pl) return gameOver().draw();
    }
    
    function DealerTurn (){
        if(dealerData.highest()<17)return true;
        if(dealerData.highest()>21)return  gameOver().win();
        gameModule().checkWin(dealerData, playerData);
        return false;
    }
    return {
        DealerTurn,
        checkWin
    }
}
function gameOver(){
    hit.disabled = true;
    stand.disabled = true;
    playAgainBtn.disabled = false;

    function lose(){
        gameInfo.innerHTML = `you lose (${playerData.highest()} / 
        ${dealerData.highest()})`;
        playerData.setWlt().lose();
        myWallet.innerText = playerData.wallet + '$';
    }
    function win(){
        gameInfo.innerHTML = `you win! (${playerData.highest()} / 
        ${dealerData.highest()})`;
        playerData.setWlt().win();
        myWallet.innerText = playerData.wallet + '$';
    }
    function draw(){
        gameInfo.innerHTML = `Its a draw (${playerData.highest()} / 
        ${dealerData.highest()})`
    }
    function bj(){
        gameInfo.innerHTML = `Black Jack!!!`;
        playerData.setWlt().winBJ();
        myWallet.innerText = playerData.wallet + '$';
    }
    return {lose,win, draw, bj}
}
init();