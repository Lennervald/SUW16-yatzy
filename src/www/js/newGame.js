$(document).ready(function(){
	$("body").on("click",".new-game-button",function(){
		$("#gamearea").remove();
		includeHtml("templates/startpage.html","body");
		
		




	});

});w

$(document).ready(function(){
	$("body").on("click", ".start-game-button", function(){
           $("#start-page").remove();
           includeGameArea();


	});

});

