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
    addInfoBtnListener();
    $("#throwBtn").click(makeThrow);
    addEventDice();
    gamecardSetup();
    refreshActivePlayerColumn();
    addPlaceScore();
}

function addInfoBtnListener(){
    $("body").on('click',".info-icon", function (){
        showRulesModal('Regler','lg');
    });
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

    if (window.diceLockEventsBound) {
        return;
    }

    $("body").on("click", ".dice-img, .dice-lock", function () {

        if (DICE_SET.throws === 3) {
            return;
        }

        var me = $(this);
        if (me.hasClass('dice-lock')) {
            // change me from the dice-lock to the dice img
            me = me.prev('.dice-img');
        }

        var diceObj = me.data("diceObj");

        // Locking only works after first
        if (DICE_SET.throws > 0) {
            me.toggleClass("dice-locked");
            toggleLockedIcon(me, diceObj);
            diceObj.toggleLock();
        }
    });

    window.diceLockEventsBound = true;
}

function toggleLockedIcon(diceElem, diceObj) {
    if (diceObj.locked === false) {
        var icon = $('<img class="dice-lock" src="images/locked.png" alt="locked">');
        diceElem.closest('div').append(icon);
        diceObj.setLockedIcon(icon);
    } else if (diceObj.locked) {
        diceObj.removeLockedIcon();
    }
}

var inProgress = false;

function makeThrow() {
    if (inProgress || DICE_SET.throws === 3) {
        return;
    }

    if (DICE_SET.allLocked()) {
        alert("All locked");
        return;
    }

    resetAvailableScoreOptions();

    DICE_SET.throw();

    if (DICE_SET.throws === 3) {
        $("#throwBtn").removeClass("btn-success");
        $("#throwBtn").addClass("btn-danger");
    }

    var animationReady = 0;

    $(".dice-img").each(function (i) {
        inProgress = true;

        if ($(this).hasClass("dice-locked") === false) { // dice-unlocked
            $(this).animate({opacity: 0}, 200, function () {
                $(this).attr("src", "images/dice_" + DICES_ARR[i].result + ".png");
                $(this).attr("alt", "dice_" + DICES_ARR[i].result + ".png");
                $(this).data("diceObj", DICES_ARR[i]);
                $(this).delay(300 * i).animate({opacity: 1}, 500, function () {
                    animationReady++;
                    if (animationReady === DICE_SET.toThrow()) {
                        //
                        inProgress = false;
                        //
                        checkAvailableScoreOptions();
                        //
                        if (DICE_SET.throws === 3) {
                            DICE_SET.removeLockedIcons();
                        }
                    }
                });
            });
        }

    });

}

function resetAvailableScoreOptions() {
    var rows = $('.gamecard tbody').children('tr');
    rows.each(function (index) {
        $(this).removeClass('unavailable-option');
    });
}

function checkAvailableScoreOptions() {
    var rows = $('.gamecard tbody').children('tr');

    var index = 1;
    for (var rule in checkScore) {
        if (checkScore[rule]() === 0) {
            $(rows[index]).addClass('unavailable-option');
            $(rows[0]).addClass('unavailable-option');
        } else if ($($(rows[index]).children('td')[currentPlayerTurn]).text() !== '') {
            $(rows[index]).addClass('unavailable-option');
        }

        index++;
    }
}

function placePoint() {
    calculateExtraPoints();
    showWinnerAtGameEnd();
    resetAvailableScoreOptions();
    setNextPlayerTurn();
}

function setNextPlayerTurn() {
    $("#throwBtn").removeClass("btn-danger");
    $("#throwBtn").addClass("btn-success");

    $(".dice-img").removeClass("dice-locked").attr('src', '');
    $(".dice-lock").remove();
    DICE_SET.reset();
    DICE_SET.removeLockedIcons();

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

