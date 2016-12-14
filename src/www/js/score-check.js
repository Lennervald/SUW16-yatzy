(function() {
	checkScore.One = function() { return sumDigit(1); }
	checkScore.Two = function() { return sumDigit(2); }
	checkScore.Three = function() { return sumDigit(3); }
	checkScore.Four = function() { return sumDigit(4); }
	checkScore.Five = function() { return sumDigit(5); }
	checkScore.Six = function() { return sumDigit(6); }

	checkScore.Sum = function() { return arraySum(DICES_ARR); }
	checkScore.Bonus = function() { return (checkScore.Sum() >= 63) ? 50 : 0; }
	// BROKEN SHIT, should NOT depend on the results of current dices

	checkScore.Pair = function() { return multiples(2); }
	checkScore.TwoPair = function() { return twoPair(); }
	checkScore.Threesome = function() { return multiples(3); }
	checkScore.Foursome = function() { return multiples(4); }

	checkScore.SmallStraight = function() { return hasStraightWithout(6) ? 15 : 0; }
	checkScore.LargeStraight = function() { return hasStraightWithout(1) ? 20 : 0; }

	checkScore.FullHouse = function() { return fullHouse(); }
	checkScore.Chance = function() { return arraySum(DICES_ARR); }
	checkScore.Yahtzee = function() { return multiples(5) ? 50 : 0; }


	function sumDigit(aDigit) {
		return aDigit * countDigit(aDigit);
	}

	function hasStraightWithout(aNumber) {
		return !countDigit(aNumber) && !multiples(2);
	}

	function multiples(anAmount) {
		for (var i = 6; i >= 1 ; --i) {
			if (countDigit(i) >= anAmount) {
				return anAmount * i;
			}
		}

		return 0;
	}

	function twoPair() {
		var pairs = [];

		for (var i = 1; i <= 6; ++i) {
			if (countDigit(i) >= 2) {
				pairs.push(2 * i);
			}
		}

		return pairs.length == 2 ? arraySum(pairs) : 0;
	}

	function fullHouse() {
		var threeSum = multiples(3);

		if (threeSum) {
			for (var i = 1; i <= 6; ++i) {
				if (countDigit(i) == 2) {
					return 2 * i + threeSum;
				}
			}
		}

		return 0;
	}

	function arraySum(anArray) {
		var sum = 0;

		for (var i = 0; i < anArray.length; ++i) {
			if (typeof anArray[i] == 'number') {
				sum += anArray[i];
			} else {
				sum += anArray[i].result;
			}
		}

		return sum;
	}

	function countDigit(aDigit) {
		var sum = 0;

		DICES_ARR.forEach(function(value) {
			if (value.result == aDigit) {
				sum++;
			}
		});

		return sum;
	}
})();

// CODE BELOW IS FOR DEBUGGING PURPOSES

(function() {
	var DEBUG = false; // Edit this bool

	if (!DEBUG)
		return;

	$(function() {
		setTimeout( function() {
			$('.start-game-button').trigger('click');
		}, 100);
		setTimeout( function() {
			makeThrow(DICES_ARR);
		}, 200);

		setTimeout(function() {
		    console.log('score-check.js DEBUG enabled.');
		    console.log('One: ', checkScore.One());
		    console.log('Two: ', checkScore.Two());
		    console.log('Three: ', checkScore.Three());
		    console.log('Four: ', checkScore.Four());
		    console.log('Five: ', checkScore.Five());
		    console.log('Six: ', checkScore.Six());

		    console.log('Sum: ', checkScore.Sum());
		    console.log('Bonus: ', checkScore.Bonus());

		    console.log('Pair: ', checkScore.Pair());
		    console.log('TwoPair: ', checkScore.TwoPair());
		    console.log('Threesome: ', checkScore.Threesome());
		    console.log('Foursome: ', checkScore.Foursome());

		    console.log('SmallStraight: ', checkScore.SmallStraight());
		    console.log('LargeStraight: ', checkScore.LargeStraight());

		    console.log('FullHouse: ', checkScore.FullHouse());
		    console.log('Chance: ', checkScore.Chance());
		    console.log('Yahtzee: ', checkScore.Yahtzee());
		}, 500);
	});
})();
