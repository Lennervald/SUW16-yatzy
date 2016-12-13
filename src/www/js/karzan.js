var players = [];

function showAddPlayerForm() {

	addPlayer();
	addPlayer();

	$('.player-list').on('change', 'input', function () {
		var id = $(this).attr('player-id');
		var name = $(this).val();

		players[id] = name;
	});
}

$(function(){
	showAddPlayerForm();
	$('body').on('click', '.addPincllayer', function () {
		addPlayer();
	});
});

function addPlayer() {
	if (players.length < 4) {
		var playerName = 'player ' + (players.length+1);

		$('.player-list').append(
			'<div class="col-xs-8">' +
				'<input player-id="' + players.length + '" value="' + playerName + '"></input>' +
			'</div>' +

			'<div class="col-xs-2">' +
				'<button class="glyphicon glyphicon-remove-circle"></button>' +
			'</div>'
		);



		players.push(playerName);
	}
}