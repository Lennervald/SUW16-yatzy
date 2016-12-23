
// Add specific score to gamecard
function addPlaceScore() {
    $('body').on('click', 'tr:not(.unavailable-option) td.place-score', function () {

        if (inProgress || DICE_SET.throws === 0) {
            return;
        }

        var tr = $(this).closest('tr');
        var trChildren = tr.children('td');


        // make sure click is inside current player TD
        if (trChildren[currentPlayerTurn] == this) {

            // Get index for the clicked TR
            var trIndex = tr.index();

            // Check which rule has the same index as our TR
            var x = 1;
            for (var rule in checkScore) {
                if (trIndex === x) {

                    // add points to game card
                    if ($(this).text() === "") {
                        $(this).text(checkScore[rule]());
                    } else {
                        return;
                    }

                }
                x++;
            }

            placePoint();
            setHighlightScore(this);
        }
    });


    // crossing (adds 0 in an empty field)
    $('body').on('click', 'tr.unavailable-option td.place-score', function () {

        if ($(this).text() !== "") {
            return;
        }

        if (inProgress || DICE_SET.throws === 0) {
            return;
        }

        var tr = $(this).closest('tr');
        var trChildren = tr.children('td');


        // make sure click is inside current player TD
        if (trChildren[currentPlayerTurn] == this) {

            // Get index for the clicked TR
            var trIndex = tr.index();

            // Check which rule has the same index as our TR
            var x = 1;
            for (var rule in checkScore) {
                if (trIndex === x) {

                    // player have clicked an empty option and will be asked to cross it or not
                    if ($(this).text() === "") {
                        showConfirmModal("OBS!", "Är du säker på att du vill stryka resultatet?",'sm',$(this));
                        return;
                    }
                }
                x++;
            }
        }
    });
}

//Backup
//if (trChildren[currentPlayerTurn] == this) {
//
//    // Get index for the clicked TR
//    var trIndex = tr.index();
//
//    // Check which rule has the same index as our TR
//    var x = 1;
//    for (var rule in checkScore) {
//        if (trIndex === x) {
//
//            // player have clicked an empty option and will be asked to cross it or not
//            if ($(this).text() === "") {
//                var answer = confirm('Är du säker på att du vill stryka resultatet?');
//                if (answer) {
//                    $(this).text(0);
//                } else
//                        return
//                    ;
//            }
//        }
//        x++;
//    }
//
//    placePoint();
//    setHighlightScore(this);
//}


function calculateExtraPoints() {
    var trs = $('.gamecard tbody tr');

    var trSum = $(trs[7]);
    var trBonus = $(trs[8]);
    var trTotal = $(trs[18]);

    var sum = getSumOfCurrentPlayer(1, 7);
    var bonus = sum >= 63 ? 50 : 0;

    getTdOfPlayer(trSum).text(sum);
    getTdOfPlayer(trBonus).text(bonus);

    var total = getSumOfCurrentPlayer(7, 18);
    getTdOfPlayer(trTotal).text(total);
}

function getSumOfCurrentPlayer(start, end) {
    var trs = $('.gamecard tbody tr').slice(start, end);

    var sum = 0;

    trs.each(
            function (i, tr) {
                var trChildren = $(tr).children('td');
                var points = $(trChildren[currentPlayerTurn]);

                sum += points.text() / 1;
            }
    );

    return sum;
}

function getTdOfPlayer(tr) {
    var trChildren = tr.children('td');
    return $(trChildren[currentPlayerTurn]);
}

function showWinnerAtGameEnd() {
    if (players.length === currentPlayerTurn) {
        var trs = $('.gamecard tbody tr').slice(1, 7);
        var trs2 = $('.gamecard tbody tr').slice(9, 18);
        trs = $.merge(trs, trs2);

        var isAnyTdEmpty = false;

        trs.each(
                function (i, tr) {
                    var trChildren = $(tr).children('td');
                    var empty = $(trChildren[currentPlayerTurn]).text() === "";

                    if (empty) {
                        isAnyTdEmpty = true;
                    }
                }
        );

        if (isAnyTdEmpty === false) {
            showWinner();
        }

    }
}






