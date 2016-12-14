
// Add specific score to gamecard
function addPlaceScore(){
	$('body').on('click','tr:not(.unavailable-option) td.place-score',function(){
		var tr = $(this).closest('tr');
		var trChildren = tr.children('td');


		// make sure click is inside current player TD
		if (trChildren[currentPlayerTurn] == this){

			// Get index for the clicked TR
			var trIndex = tr.index();

			// Check which rule has the same index as our TR
			var x = 1;
			for (var rule in checkScore){
				if (trIndex === x){
					$(this).text(checkScore[rule]());
				}
				x++;
			}

			placePoint();
			setHighlightScore(this);
		}
	});
}


