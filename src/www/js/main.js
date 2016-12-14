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
    addEventThrowBtn();
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

        var icon = $.parseHTML("<img src='images/locked.png' alt='locked'>");
        $(icon).css("position", "absolute");
        $(icon).css("top", offset.top + "px");
        $(icon).css("left", (offset.left + width) + "px");
        $("body").append(icon).show('slow');

        diceObj.setLockedIcon(icon);
    } else if (diceObj.locked) {
        diceObj.removeLockedIcon();
    }
}

function addEventThrowBtn() {
    $("#throwBtn").click(function (event) {
        event.preventDefault();
        makeThrow(DICES_ARR);
    });
}

var inProgress = false;

function makeThrow(arr) {
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

    DICE_SET.throw();

    if (DICE_SET.waitForScore) {
        $("#throwBtn").removeClass("btn-success");
        $("#throwBtn").addClass("btn-danger");
    }

    var i = 0;
    var animationReady = 0;

    $(".dice-img").each(function () {
        inProgress = true;

        // All dices must be unlocked on the first throw
        if (DICE_SET.throws === 1) {
            $(this).removeClass("dice-locked");
        }

        if ($(this).hasClass("dice-locked") === false) {
            $(this).animate({opacity: 0}, 200, function () {
                $(this).attr("src", "images/dice_" + arr[i].result + ".png");
                $(this).attr("alt", "dice_" + arr[i].result + ".png");
                $(this).data("diceObj", arr[i]);
                $(this).delay(400 * i).animate({opacity: 1}, 500, function () {
                    animationReady++;
                    if (animationReady === DICE_SET.toThrow()) {
                        inProgress = false;
                    }
                });
                i++;
            });
        } else {
            i++;
        }
    });
}

function placePoint(td) {
	// placePointsInColumn(td);
	setNextPlayerTurn();
}

function setNextPlayerTurn() {
    $("#throwBtn").removeClass("btn-danger");
    $("#throwBtn").addClass("btn-success");
    DICE_SET.reset();

    currentPlayerTurn++;
    if (currentPlayerTurn > players.length) {
    	currentPlayerTurn = 1;
    }
    refreshActivePlayerColumn();
    setHighlightScore();
}

function setHighlightScore() {

    /* Marker for each users latest score round */
    unHighlightScore();
    
    // PS. Replace placesScore when Martins - "AddScore" is ready

    var placedScore = $("td");
    var highlight = placedScore.addClass("highlightScore");

}

function unHighlightScore() {

    $('td').removeClass("highlightScore");

}
