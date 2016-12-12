$(document).ready(function () {
    go();
});

function go() {
    TESTING();
    addEventThrowBtn();
    addEventDice();
}

/**
 * Temporary function for testing only
 * @returns {undefined}
 */
function TESTING() {
    includeHtml("templates/dices.html", "body");
}

function addEventDice() {
    $(".dice-img").click(function () {
        
        var diceObj = $(this).data("diceObj");
        
        //Locking must only work when ammount of throws <= 2
        if (DICE_SET.throws <= 2) {
            $(this).toggleClass("dice-locked");
            diceObj.toggleLock();
        }
        console.log(""+diceObj.toString());
    });
}

function addEventThrowBtn() {
    $("#throwBtn").click(function (event) {
        event.preventDefault();
        makeThrow(DICES_ARR);
        console.log(""+DICE_SET.toString());
    });
}

function makeThrow(arr) {
    //
    DICE_SET.throw();
    //
    var i = 0;
    //
    if(DICE_SET.allLocked()){
        alert("All locked");
        return;
    }
    //
    $(".dice-img").each(function () {
        
        // All dices must be unlocked on the first throw
        if (DICE_SET.throws === 1) {
            $(this).removeClass("dice-locked");
        }

        if ($(this).hasClass("dice-locked") === false) {
            $(this).animate({ opacity: 0 },200, function () {
                $(this).attr("src", "images/dice_" + arr[i].result + ".png");
                $(this).attr("alt", "dice_" + arr[i].result + ".png");
                $(this).data("diceObj", arr[i]);
                $(this).delay(400 * i).animate({ opacity: 1 },500);
                i++;
            });
        }
    });
    //
}