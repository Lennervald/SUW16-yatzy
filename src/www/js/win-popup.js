

function showWinner() {

    var playersArray = [];

    var tr18 = $('.gamecard tbody tr')[18];
    var tds  = $(tr18).children('td');

    players.forEach(function(name, i){
        playersArray[i] = {'name': name, 'score': $(tds[i+1]).text()};
    });

    var highestScore = 0;
    playersArray.forEach (function(pl){
        if (pl.score > highestScore){
            highestScore = pl.score;
        }
    });

    updatePlayersAndScore(playersArray, highestScore);


    $('#win-popup').modal();
}

function updatePlayersAndScore(playersArr, highestScore) {

	console.log('updatePlayersAndScore(), playersArr = ', playersArr);

	for (var index = 0; index < playersArr.length; index++) {
		var plStr = 'p'+(index+1);
		console.log('.player.'+plStr, $('.player.'+plStr));
		$('.player.'+plStr).html(playersArr[index].name);
        $('.score.'+plStr).html(playersArr[index].score);
        if(playersArr[index].score === highestScore){
            $('.player.'+plStr).addClass('highest-score');
            $('.score.'+plStr).addClass('highest-score');
        }
	}
}

// changes column bg color for active player
function refreshActivePlayerColumn() {

    var tds = $('.gamecard tr:first-child td');
    // console.log(tds);

    for (var i = 0; i < tds.length; i++) {
        // console.log('i = ', i, tds[i]);
        if (i % (players.length + 1) == currentPlayerTurn) {
            $(tds[i]).addClass('active-player');
        } else {
            $(tds[i]).removeClass('active-player');
        }
    }
}
