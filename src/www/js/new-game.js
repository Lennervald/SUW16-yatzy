$(document).ready(function(){
	$("body").on("click",".new-game-button",function(){
		$("#gamearea").remove();
		includeStartPage();
		players = [];
		showAddPlayerForm();
	});

	$("body").on("click", ".start-game-button", function () {
		if (players.length == 0) {
			alert('You need to have at least 1 player.');
		} else {
			$("#start-page").remove();
			validatePlayerNames();
			includeGameArea();
		}
	});

});
