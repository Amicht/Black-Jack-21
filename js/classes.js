class Card {
    number;
    type;
    id;
    value;
    constructor({num,value},type, id){
        this.id = id;
        this.number = num;
        this.type = type;
        this.value = value;
    }
}

class Player{
    cards;
    total;
    isAced;
    acedTotal;
    constructor(){
        this.cards = [];
        this.total = 0;
        this.isAced = false;
        this.acedTotal = this.total;
    }
    
    update(card){
        this.cards.push(card);
        this.total += card.number;
        this.checkAces();
        this.isAced? this.acedTotal = this.total + 10: null;
    }
    clear(){
        this.cards = [];
        this.total = 0;
        this.isAced = false;
        this.acedTotal = this.total;
    }
    checkAces(){
        if(this.isAced) return;
        this.cards[this.cards.length -1].number === 1? this.isAced = true:null;
    }
}
