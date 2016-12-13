$(document).ready(function(){
	$("body").on("click",".new-game-button",function(){
		$("#gamearea").remove();
		includeStartPage();
		players = [];
		showAddPlayerForm();
	});

	$("body").on("click", ".start-game-button", function () {
		$("#start-page").remove();
		includeGameArea();
	});

});
