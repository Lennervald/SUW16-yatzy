
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

function calculateExtraPoints() {
	var trs = $('.gamecard tbody tr');

	var trSum = $(trs[7]);
	var trBonus = $(trs[8]);
	var trTotal = $(trs[18]);

	var sum = getSumOfCurrentPlayer(1,7);
	var bonus = sum >= 63 ? 50 : 0;

	getTdOfPlayer(trSum).text(sum);
	getTdOfPlayer(trBonus).text(bonus);

	var total = getSumOfCurrentPlayer(7,18);
	getTdOfPlayer(trTotal).text(total);


}

function getSumOfCurrentPlayer(start, end) {
	var trs = $('.gamecard tbody tr').slice(start, end);

	var sum = 0;

	trs.each(
		function(i, tr) {
			var trChildren = $(tr).children('td');
			var points = $(trChildren[currentPlayerTurn]);

			sum += points.text() / 1;
		}
	);

	return sum;
}

function getTdOfPlayer(tr){
	var trChildren = tr.children('td');
	return $(trChildren[currentPlayerTurn]);
}
