
function showAddPlayerForm() {

	addPlayer();
	addPlayer();

	$('.player-list').on('change', 'input', changePlayerName);
}

$(function(){

	showAddPlayerForm();

	$('body').on('click', '.addPlayer', addPlayer);

	$('body').on('click', '.deletePlayer', removePlayer);
});

function addPlayer() {

	if (players.length < 4) {
		var playerName = 'Player ' + (players.length + 1);

		$('.player-list').append(
			'<div class="player-input-holder">' +
				'<div class="col-xs-8">' +
					'<input value="' + playerName + '"></input>' +
				'</div>' +

				'<div class="col-xs-2">' +
					'<button class="glyphicon glyphicon-remove-circle deletePlayer"></button>' +
				'</div>' +
			'</div>'

		);

		players.push(playerName);
		hideAddPlayerButton();
	}
}

function removePlayer(){

	var holder = $(this).parents('.player-input-holder');
	var index = $('.player-input-holder').index(holder);

	holder.remove();
	players.splice(index,1);
	hideAddPlayerButton();
}

function changePlayerName(){

	var holder = $(this).parents('.player-input-holder');
	var index = $('.player-input-holder').index(holder);

	players[index] = $(this).val();
}

function validatePlayerNames(){
	players.forEach(function(name, index) {
		if (name.length == 0) {
			players[index] = 'Player ' + (index + 1);
		}
	});
}

function hideAddPlayerButton() {
	if (players.length >= 4) {
		$('.addPlayer').hide();
	} else {
		$('.addPlayer').show();
	}
}
