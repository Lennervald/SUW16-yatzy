
// Add specific score to gamecard
function addPlaceScore(){
	$('body').on('click','td.place-score',function(){
		var tr = $(this).closest('tr');
		var trChildren = tr.children('td');


		// make sure click is inside current player TD
		if (trChildren[currentPlayerTurn] == this){

			// Get index for the clicked TR
			var trIndex = tr.index();

			// Get all index that are valid to place score at
			var validIndex = [];
			var i=0;
			for (var key in checkScore){
				if (checkScore[key]() > 0){
					validIndex.push(i+1);
					i++;
				}	
				else {
					i++;
				}
			}
			// Check if clicked trIndex is in array validIndex
			if (validIndex.indexOf(trIndex) != -1){
				var x = 1;
				for (var rule in checkScore){
					if (trIndex === x){
						$(this).text(checkScore[rule]());
					}
					x++;
				}
			}
			placePoint();
		}
	});
}


