var players = [];
var currentPlayerTurn = 1;
var DICE_SET = new DiceSet();
var DICES_ARR = DICE_SET.dices;
var checkScore = {
	One: null,
	Two: null,
	Three: null,
	Four: null,
	Five: null,
	Six: null,

	Sum: null,
	Bonus: null,

	Pair: null,
	TwoPair: null,
	Threesome: null,
	Foursome: null,

	SmallStraight: null,
	LargeStraight: null,

	FullHouse: null,
	Chance: null,
	Yahtzee: null,
};

// The checkScore functions will return either 0 or x (where x = the score counted for that option)

/*
	DICE_SET.throw(); // throw 5 dices
	DICE_SET.calcSum(); // calc sum of 5 dices
	DICE_SET.reset(); // reset all dices

	DICES_ARR[0].lock(); // lock given dice
	DICES_ARR[0].unlock(); // Unlock given dice
	DICES_ARR[0].result; // get result of dice 0
	DICES_ARR[0].closed; // get if locked for dice 0

*/
