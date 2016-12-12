function DiceSet() {
    this.dices = [];
    this.throws = 0;

    this.createDices = function () {
        for (var i = 0; i < 5; i++) {
            var dice = new Dice(i);
            this.dices.push(dice);
        }
    };

    this.createDices();

    this.calcSum = function () {
        var sum;

        for (var i = 0; i < this.dices.length; i++) {
            sum += this.dices[i].result;
        }

        return sum;
    };

    this.throw = function () {

        if (this.throws === 3) {
            this.reset();
        }

        for (var i = 0; i < this.dices.length; i++) {
            if (this.dices[i].locked === false) {
                this.dices[i].throw();
            }
        }
        this.throws++;
    };

    this.allLocked = function () {
        var locked = 0;
        for (var i = 0; i < this.dices.length; i++) {
            if (this.dices[i].locked) {
                locked++;
            }
        }

        if (locked === 5) {
            return true;
        } else {
            return false;
        }

    };

    this.reset = function () {
        for (var i = 0; i < this.dices.length; i++) {
            this.dices[i].reset();
        }
        this.throws = 0;
    };

    this.printAll = function () {
        for (var i = 0; i < this.dices.length; i++) {
            console.log(this.dices[i].toString());
        }
    };

    this.isRuleOneToSix = function (oneToSix) {
        for (var i = 0; i < this.dices.length; i++) {
            if (this.dices[i].result !== oneToSix) {
                return false;
            }
        }
        return true;
    };

    this.isRuleYatzy = function () {
        var firstVal;

        for (var i = 0; i < this.dices.length; i++) {
            if (i === 0) {
                firstVal = this.dices[i].result;
            } else {
                if (this.dices[i].result !== firstVal) {
                    return false;
                }
            }
        }
        return true;
    };

    this.toString = function () {
        return "throws: " + this.throws
                + "\n isRuleOnes: " + this.isRuleOneToSix(1)
                + "\n isRuleYatzy: " + this.isRuleYatzy();
    };

}

function Dice(nr) {
    this.nr = nr;
    this.result = 0;
    this.locked = false;

    this.throw = function () {
        this.result = Math.ceil(Math.random() * 6);
        return this.result;
    };

    this.toggleLock = function () {
        if (this.locked === true) {
            this.locked = false;
        } else if (this.locked === false) {
            this.locked = true;
        }
    };

    this.lock = function () {
        this.locked = true;
    };

    this.unlock = function () {
        this.locked = false;
    };

    this.reset = function () {
        this.result = 0;
        this.locked = false;
    };

    this.toString = function () {
        return "nr: " + nr + " / result: " + this.result + " / locked: " + this.locked;
    };
}
