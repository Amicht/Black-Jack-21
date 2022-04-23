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
    wallet;
    bet;
    constructor(){
        this.cards = [];
        this.total = 0;
        this.isAced = false;
        this.wallet = 1000;
        this.bet = 5;
    }
    update(card){
        this.cards.push(card);
        this.total += card.number;
        this.checkAces();
    }
    clear(){
        this.cards = [];
        this.total = 0;
        this.isAced = false;
    }
    checkAces(){
        if(this.isAced) return;
        if(this.cards[this.cards.length -1].number === 1) this.isAced = true;
    }
    highest(){
        if(this.isAced && this.total+10<22)return this.total+10;
        return  this.total;
    }
    isBJ(){
        if(this.cards.length === 2 && this.highest()===21) return true;
        return false;
    }
    setWlt(){
        return {
            win: () => this.wallet += this.bet,
            lose: ()=> this.wallet -= this.bet
        }
    }
}
