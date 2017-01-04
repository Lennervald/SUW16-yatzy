
function showAddPlayerForm() {

	addPlayer();
	addPlayer();

	$('.player-list').on('change', 'input', changePlayerName);
}

$(function(){

	showAddPlayerForm();

	$('body').on('click', '.addPlayer', addPlayer);

	$('body').on('click', '.deletePlayer', removePlayer);

	$('body').on('click', '.toggleBotPlayer', swapPlayer);
});

function addPlayer() {

	if (players.length < 4) {
		var playerName = 'Spelare ' + (players.length + 1);

	$('.player-list').append(
		'<form class="form-inline">' + 
		'<div class="form-group player-input-holder">' +
		'<input value="' + playerName + '" class="form-control form-content player-field">' +
		'<button class="btn btn-default form-content glyphicon glyphicon-user toggleBotPlayer" type="button"></button>' +
		'<button class="btn btn-default form-content glyphicon glyphicon-remove-circle deletePlayer" type="button"></button>' +
		'</div>' + 
		'</form>'
	);

		players.push(playerName);
		hideAddPlayerButton();
		noEnterKey();
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
		//$('.addPlayer').hide();
		$('.addPlayer').prop('disabled', true);
	} else {
		//$('.addPlayer').show();
		$('.addPlayer').prop('disabled', false);
	}
}

function swapPlayer() {
	$(this).toggleClass('glyphicon-knight').toggleClass('glyphicon-user');
}

function noEnterKey() {
    $('.player-field').keypress(function(event) {

        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

    
}

