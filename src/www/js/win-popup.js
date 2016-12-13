function showWinner(playersArr) {

    if (!playersArr) {

        var dummyPlayersArr = [
            {name: 'Michael', score: 358},
            {name: 'Nisse', score: 321},
            {name: 'Olov', score: 255},
            {name: 'Jonathan', score: 249}
        ];

        updatePlayersAndScore(dummyPlayersArr);
    } else {
        updatePlayersAndScore(playersArr);
    }

    $('#win-popup').modal();
}

function updatePlayersAndScore(playersArr) {

	console.log('updatePlayersAndScore(), playersArr = ', playersArr);

	for (var index = 0; index < playersArr.length; index++) {
		var plStr = 'p'+(index+1);
		console.log('.player.'+plStr, $('.player.'+plStr));
		$('.player.'+plStr).html(playersArr[index].name);
		$('.score.'+plStr).html(playersArr[index].score);
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
