
var dummyPlayersArr = [
	{ name: 'Michael', score: 358 },
	{ name: 'Nisse', score: 321 },
	{ name: 'Olov', score: 255 },
	{ name: 'Jonathan', score: 249 }
];

function updatePlayersAndScore(playersArr) {

	console.log('updatePlayersAndScore(), playersArr = ', playersArr);

	for (var index = 0; index < playersArr.length; index++) {
		var plStr = 'p'+(index+1);
		console.log('.player.'+plStr, $('.player.'+plStr));
		$('.player.'+plStr).html(playersArr[index].name);
		$('.score.'+plStr).html(playersArr[index].score);
	}
}

