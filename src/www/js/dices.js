function DiceSet() {
    this.dices = [];

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
        for (var i = 0; i < this.dices.length; i++) {
            if (this.dices[i].locked === false) {
                this.dices[i].throw();
            }
        }
    };

    this.reset = function () {
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
    this.locked = false;

    this.throw = function () {
        this.result = Math.ceil(Math.random() * 6);
        return this.result;
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
