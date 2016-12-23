$(document).ready(function(){
	$("body").on("click",".new-game-button",function(){
		$("#gamearea").remove();
		includeStartPage();
		players = [];
		currentPlayerTurn = 1;
		showAddPlayerForm();
	});

	$("body").on("click", ".start-game-button", function () {
		if (players.length == 0) {
//			alert('You need to have at least 1 player.');
                        showInfoModal("OBS!","Åtminstone en spelare måste vara med");
		} else {
			$("#start-page").remove();
			validatePlayerNames();
			includeGameArea();
		}
	});
});
