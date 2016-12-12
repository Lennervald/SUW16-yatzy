$(document).ready(function () {
    go();
});

function go() {
    TESTING();
    addEventThrowBtn();

    addWinnerPopupTemplate();
}

/**
 * Temporary function for testing only
 * @returns {undefined}
 */
function TESTING(){
    includeHtml("templates/dices.html","body");
}

function addEventThrowBtn() {
    $("#throwBtn").click(function (event) {
        event.preventDefault();
        makeThrow(DICES_ARR);
        console.log(DICE_SET.toString());
    });
}

function makeThrow(arr) {
    //
    DICE_SET.throw();
    //
    var i = 0;
    //
    $(".dice-img").each(function () {

        $(this).fadeOut(100, function () {
            $(this).attr("src", "images/dice_" + arr[i].result + ".png");
            $(this).attr("alt", "dice_" + arr[i].result + ".png");
            $(this).data("result", arr[i].result);
            $(this).data("closed", arr[i].closed);
            $(this).delay(400 * i).fadeIn(500);
            i++;
        });
    });
    //
}

function addWinnerPopupTemplate(){
    includeHtml("templates/win-popup.html", "body");
}


function setCurrentPlayer(playerNo) {
	// changes column bg color for active player

	var ths = $('.gamecard th');
	var tds = $('.gamecard td');
	console.log(ths);
	console.log(tds);

	for (var i = 0; i < ths.length; i++) {
		// console.log('i = ', i, ths[i]);
		if ( i%5 == playerNo) {
			$(ths[i]).addClass('active-player');
		} else {
			$(ths[i]).removeClass('active-player');
		}
	}
	for (var i = 0; i < tds.length; i++) {
		// console.log('i = ', i, tds[i]);
		if ( i%5 == playerNo) {
			$(tds[i]).addClass('active-player');
		} else {
			$(tds[i]).removeClass('active-player');
		}
	}
	// var allCols = ths.concat(tds);
	// console.log(allCols);

}

function showWinner(players) {

	if (!players){

		var dummyPlayersArr = [
			{ name: 'Michael', score: 358 },
			{ name: 'Nisse', score: 321 },
			{ name: 'Olov', score: 255 },
			{ name: 'Jonathan', score: 249 }
		];

		updatePlayersAndScore(dummyPlayersArr);
	} else {
		updatePlayersAndScore(players);
	}

    $('#win-popup').modal();
}