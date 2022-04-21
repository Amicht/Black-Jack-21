const cardTypes = {
    diamond:{
        icon: '♦',
        color: 'red'
    },
    spades:{
        icon: '♠',
        color: 'black'
    },
    heart:{
        icon: '♥',
        color: 'red'
    },
    clubs:{
        icon: '♣',
        color: 'black'
    }
}
function createDeck(maxNum){
    const cardDeck = [];
    for(let i=0;i<maxNum;i++){
        Object.keys(cardTypes).forEach(t=>{
            cardDeck.push(new Card(
                isRoyalCard(i+1),t, cardDeck.length+1
                ))
        })
    };
    return cardDeck;
}
function isRoyalCard(num){
    if(num>10 || num===1){
        switch (num){
            case 1: return {value:'A',num:1};
                break;
            case 11: return {value:'J',num:10};
                break;
            case 12: return {value:'Q',num:10};
                break;
            case 13: return {value:'K',num:10};
                break;
        }
    }else{
        return {
            num: num,
            value: num
        };
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function createCardStyle(card){
    const cardType = cardTypes[card.type];
    const num = card.value;
    return `<div data-id=${card.id} class="cards col-1" style="color: ${cardType.color};">
    <section>
        <div>${num}</div>
    </section>
    <div class="fs-3 text-center">${cardType.icon}</div>
    <section class="card-bottom">
        <div>${num}</div>
    </section>
    </div>`;
}