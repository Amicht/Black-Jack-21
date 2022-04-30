const app = document.getElementById('app');
const title = document.getElementById('title');
const rules_nav = document.getElementById('rules-nav');
const rules_info = document.getElementById('rules-info');
const dealer = document.getElementById('dealer');
const player = document.getElementById('player');
const gameInfo = document.getElementById('gameInfo');
const double = document.getElementById('double');
const hit = document.getElementById('hit');
const stand = document.getElementById('stand')
const playAgainBtn = document.getElementById('playAgainBtn');
const myWallet = document.getElementById('myWallet');
const myBet = document.getElementById('myBet');

title.innerHTML = titleStyle();
rules_info.innerHTML = setRules();
rules_nav.onclick = displayRules;
const playerData = new Player();
const dealerData = new Player();

function displayRules(){
    document.getElementById('footer').style.display = "none";
    rules_info.style.display = "block";
    document.getElementById('closeRules').onclick = ()=>{
        rules_info.style.display = "none";
        document.getElementById('footer').style.display = "block";
    }
}
function titleStyle(){
    return `Black
    <span class="title-icon py-auto fs-3">
    ${cardTypes.diamond.icon}
    </span> 
    Jack`
}
function onloadTitleStyle(){
    const onload_screen = document.getElementById('onload-screen');
    const onload_title = document.getElementById('onload-title');
    const startBtn = document.getElementById('startBtn');
    onload_title.innerHTML = `<span>Black</span>
    <span class="title-icon onload-icon m-2">
    ${cardTypes.heart.icon}
    </span> </br> 
    <span class="title-icon onload-icon m-2">
    ${cardTypes.diamond.icon}
    </span>
    Jack`;
    startBtn.onclick = ()=> {
        onload_screen.style.visibility = 'hidden';
        onload_screen.style.opacity = 0;
    };
}
function init(){
    playerData.clear();
    dealerData.clear();
    myBet.innerHTML = playerData.bet +'$';
    myWallet.innerHTML = playerData.wallet +'$';
    gameInfo.innerHTML = '0';
    stand.disabled = false;
    playAgainBtn.disabled = true;
    hit.disabled = false;
    double.disabled = true;
    const cardDeck = shuffle(createDeck(13));

    dealer.innerHTML = createCardStyle(addCard(cardDeck, dealerData));
    player.innerHTML = createCardStyle(addCard(cardDeck, playerData));
    player.innerHTML += createCardStyle(addCard(cardDeck, playerData));
    double.disabled = false;
    if(playerData.isBJ()) return gameOver().bj();

    hit.onclick = addCardBtn;
    stand.onclick = standBtn;
    double.onclick = doubleBtn;

    function addCardBtn(){
        double.disabled = true;
        player.innerHTML += createCardStyle(addCard(cardDeck, playerData));
        gameInfo.innerHTML = `score: ${playerData.highest()} / 
        ${dealerData.highest()}`;
        if(playerData.highest()===21) hit.disabled = true;
        if(playerData.highest()>21) gameOver().lose();
    }
    function standBtn(){
        double.disabled = true;
        stand.disabled = true;
        dealer.innerHTML += createCardStyle(addCard(cardDeck, dealerData));
        gameInfo.innerHTML = `score: ${playerData.highest()} / 
        ${dealerData.highest()}`;
        if(gameModule().DealerTurn()){return setTimeout(standBtn, 1000)};
    }
    function doubleBtn(){
        playerData.bet *= 2;
        hit.disabled = true;
        console.log(playerData.bet);
        myBet.innerHTML = playerData.bet +'$';
        addCardBtn();
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
onloadTitleStyle();
init();