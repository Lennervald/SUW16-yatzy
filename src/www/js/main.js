$(document).ready(function () {
    go();
});

function go() {
    TESTING();
    addEventThrowBtn();
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