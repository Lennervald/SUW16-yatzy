$(document).ready(function () {
    go();
});



function go() {
    includeStartPage();
}

function includeGameArea() {
    includeHtml("templates/gamearea.html", "body");
    addWinnerPopupTemplate();
    addNewGameEventListener();
    $("#throwBtn").click(makeThrow);
    addEventDice();
    gamecardSetup();
    refreshActivePlayerColumn();
    addPlaceScore();
}

function includeStartPage() {
    includeHtml("templates/startpage.html", "body");
}

function addWinnerPopupTemplate() {
    includeHtml("templates/win-popup.html", "body");
}

function addNewGameEventListener() {
	$("body").on("click", ".new-game-button", function () {
		DICE_SET.reset();
		DICE_SET.removeLockedIcons();
	});
}

function addEventDice() {
    $(".dice-img").click(function () {
        var diceObj = $(this).data("diceObj");

        // Locking only works after first and before last throw
        if (DICE_SET.throws > 0 && DICE_SET.throws < 3) {
            $(this).toggleClass("dice-locked");
            toggleLockedIcon($(this), diceObj);
            diceObj.toggleLock();
        }
    });
}

function toggleLockedIcon(diceElem, diceObj) {
    if (diceObj.locked === false) {
        var offset = $(diceElem).offset();
        var width = $(diceElem).outerWidth(true);

        var icon = '<img class="dice-lock" src="images/locked.png" alt="locked">';
        //$(icon).css("position", "absolute");
        //$(icon).css("top", offset.top + "px");
        //$(icon).css("left", (offset.left + width) + "px");
        //diceElem.append(icon).show('slow');
        diceElem.closest('div').append(icon);

        diceObj.setLockedIcon(icon);
    } else if (diceObj.locked) {
        diceObj.removeLockedIcon();
    }
}

var inProgress = false;

function makeThrow() {
    if (inProgress) {
        return;
    }

    if (DICE_SET.allLocked()) {
        alert("All locked");
        return;
    }

    if (DICE_SET.waitForScore) {
        return;
    }

	resetAvailableScoreOptions();

    DICE_SET.throw();

    if (DICE_SET.waitForScore) {
        $("#throwBtn").removeClass("btn-success");
        $("#throwBtn").addClass("btn-danger");
    }

    var i = 0;
    var animationReady = 0;

    $(".dice-img").each(function(i) {
        inProgress = true;

        if ($(this).hasClass("dice-locked") === false) {
            $(this).animate({opacity: 0}, 200, function () {
                $(this).attr("src", "images/dice_" + DICES_ARR[i].result + ".png");
                $(this).attr("alt", "dice_" + DICES_ARR[i].result + ".png");
                $(this).data("diceObj", DICES_ARR[i]);
                $(this).delay(200).animate({opacity: 1}, 500, function () {
                    inProgress = false;
                    checkAvailableScoreOptions();
                });
            });
        }
    });
}

function resetAvailableScoreOptions() {
	var rows = $('.gamecard tbody').children('tr');
	rows.each(function(index) {
		$(this).removeClass('unavailable-option');
	});
}

function checkAvailableScoreOptions() {
	var rows = $('.gamecard tbody').children('tr');

	var index = 1;
	for (var rule in checkScore) {
		if (checkScore[rule]() == 0) {
			$(rows[index]).addClass('unavailable-option');
		}
		index++;
	}
}

function placePoint() {
	resetAvailableScoreOptions();
	setNextPlayerTurn();
}

function setNextPlayerTurn() {
    $("#throwBtn").removeClass("btn-danger");
    $("#throwBtn").addClass("btn-success");

    $(".dice-img").removeClass("dice-locked").attr('src', '');
    DICE_SET.reset();

    currentPlayerTurn++;
    if (currentPlayerTurn > players.length) {
    	currentPlayerTurn = 1;
    }

    refreshActivePlayerColumn();
    
}

function setHighlightScore(td) {

    unHighlightScore();

    /* Marker for each users latest score round */

    $(td).addClass("highlightScore");

}

function unHighlightScore() {

    /* Marker for each users latest score round */

    $('td').removeClass("highlightScore");
    

}

