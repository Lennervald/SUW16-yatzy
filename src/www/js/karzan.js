var players = [];	

$(document).ready(function() {

	addPlayer();
	addPlayer();

	$('.addPlayer').on('click', function () {
		addPlayer();
	});

	$('.player-list').on('change', 'input', function () {
		var id = $(this).attr('player-id');
		var name = $(this).val();

		players[id] = name;
	});
});

function addPlayer() {
	if (players.length < 4) {
		var playerName = 'player ' + (players.length+1);

		$('.player-list').append(
			'<div class="col-xs-10">' +
				'<input player-id="' + players.length + '" value="' + playerName + '"></input>' +
			'</div>' +
		  	'<div class="col-xs-2">' +
		  		'<button class="glyphicon glyphicon-envelope"></button>' +
		  	'</div>'
		);



		players.push(playerName);
	}
}