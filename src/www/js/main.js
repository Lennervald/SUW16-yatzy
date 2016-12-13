$(document).ready(function () {
    go();
});



function go() {
    includeStartPage();
}

function includeGameArea() {
    includeHtml("templates/gamearea.html", "body");
    addWinnerPopupTemplate();
    addEventThrowBtn();
    addEventDice();
    gamecardSetup();
}

function includeStartPage() {
    includeHtml("templates/startpage.html", "body");
}

function addWinnerPopupTemplate() {
    includeHtml("templates/win-popup.html", "body");
}

function addEventDice() {
    $(".dice-img").click(function () {

        var diceObj = $(this).data("diceObj");

        //Locking must only work when ammount of throws <= 2
        if (DICE_SET.throws <= 2) {
            $(this).toggleClass("dice-locked");
            toggleLockedIcon($(this), diceObj);
            diceObj.toggleLock();
        }
        console.log("" + diceObj.toString());
    });
}

function toggleLockedIcon(diceElem, diceObj) {
    if (diceObj.locked === false) {
        var offset = $(diceElem).offset();
        var width = $(diceElem).outerWidth(true);
        //
        var icon = $.parseHTML("<img src='images/locked.png' alt='locked'>");
        $(icon).css("position", "absolute");
        $(icon).css("top", offset.top + "px");
        $(icon).css("left", (offset.left + width) + "px");
        $("body").append(icon).show('slow');
        //
        diceObj.setLockedIcon(icon);
    } else if (diceObj.locked) {
        diceObj.removeLockedIcon();
    }

    $("body").on("click", ".new-game-button", function () {
        DICE_SET.reset();
        DICE_SET.removeLockedIcons();
    });

}

function addEventThrowBtn() {
    $("#throwBtn").click(function (event) {
        event.preventDefault();
        makeThrow(DICES_ARR);
        console.log("" + DICE_SET.toString());
    });
}

var inProgress = false;

function makeThrow(arr) {
    //
    if (inProgress) {
        return;
    }
    //
    if (DICE_SET.allLocked()) {
        alert("All locked");
        return;
    }
    //
    if (DICE_SET.waitForScore) {
        return;
    }
    //
    DICE_SET.throw();
    //
    if (DICE_SET.waitForScore) {
        $("#throwBtn").removeClass("btn-success");
        $("#throwBtn").addClass("btn-danger");
    }
    //
    var i = 0;
    var animationReady = 0;
    //
    $(".dice-img").each(function () {
        inProgress = true;
        // All dices must be unlocked on the first throw
        if (DICE_SET.throws === 1) {
            $(this).removeClass("dice-locked");
        }
        //
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
    //
}

function readyForNewRound() {
    $("#throwBtn").removeClass("btn-danger");
    $("#throwBtn").addClass("btn-success");
    DICE_SET.reset();
}



function setCurrentPlayer(playerNo) {
    // changes column bg color for active player

    var ths = $('.gamecard th');
    var tds = $('.gamecard td');
    console.log(ths);
    console.log(tds);

    for (var i = 0; i < ths.length; i++) {
        // console.log('i = ', i, ths[i]);
        if (i % 5 == playerNo) {
            $(ths[i]).addClass('active-player');
        } else {
            $(ths[i]).removeClass('active-player');
        }
    }
    for (var i = 0; i < tds.length; i++) {
        // console.log('i = ', i, tds[i]);
        if (i % 5 == playerNo) {
            $(tds[i]).addClass('active-player');
        } else {
            $(tds[i]).removeClass('active-player');
        }
    }
    // var allCols = ths.concat(tds);
    console.log(allCols);

}

function showWinner(players) {

    if (!players) {

        var dummyPlayersArr = [
            {name: 'Michael', score: 358},
            {name: 'Nisse', score: 321},
            {name: 'Olov', score: 255},
            {name: 'Jonathan', score: 249}
        ];

        updatePlayersAndScore(dummyPlayersArr);
    } else {
        updatePlayersAndScore(players);
    }

    $('#win-popup').modal();
}
