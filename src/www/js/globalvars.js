//
var DICE_SET = new DiceSet();
var DICES_ARR = DICE_SET.dices;
//
//DICE_SET.throw(); // throw 5 dices
//DICE_SET.calcSumm(); // calc summ of 5 dices
//DICE_SET.reset(); // reset all dices
////
//DICES_ARR[0].lock(); // lock given dice
//
//==============================================================================
//==============================================================================

function DiceSet() {
    this.dices = [];
    this.thrown = false;

    this.createDices = function () {
        for (var i = 0; i < 5; i++) {
            var dice = new Dice(i);
            this.dices.push(dice);
        }
    };

    this.createDices();

    this.calcSumm = function () {
        //
        var summ;
        //
        for (var i = 0; i < this.dices.length; i++) {
            summ += this.dices[i].getResult();
        }
    };

    this.throw = function () {
        for (var i = 0; i < this.dices.length; i++) {
            if (this.dices[i].closed === false) {
                this.dices[i].throw();
            }
        }
    };
    
    this.reset = function () {
        //
        for (var i = 0; i < this.dices.length; i++) {
           this.dices[i].reset();
        }
    };

    this.printAll = function () {
        for (var i = 0; i < this.dices.length; i++) {
            console.log(this.dices[i].toString());
        }
    };

}

function Dice(nr) {
    this.nr = nr;
    this.result = 0;
    this.closed = false;

    this.throw = function () {
        this.result = Math.floor((Math.random() * 6) + 1);
        return this.result;
    };

    this.lock = function () {
        this.closed = true;
    };

    this.reset = function () {
        this.result = 0;
        this.closed = false;
    };

    this.toString = function () {
        return "nr: " + nr + " / rst: " + this.result + " / closed: " + this.closed;
    };
}