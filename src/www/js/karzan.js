var players = [];

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
		var playerName = 'player ' + (players.length+1);

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
	}
}

function removePlayer(){

  var holder = $(this).parents('.player-input-holder');
  var index = $('.player-input-holder').index(holder);

  holder.remove();
  players.splice(index,1);

  // console.log(players);
}

function changePlayerName(){

  var holder = $(this).parents('.player-input-holder');
  var index = $('.player-input-holder').index(holder);

  players[index] = $(this).val();

  // console.log(players);

}