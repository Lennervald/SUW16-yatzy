function gamecardSetup() {
	var ruleNames = [
		'Ettor',
		'Tvåor',
		'Treor',
		'Fyror',
		'Femmor',
		'Sexor',
		'Summa',
		'Bonus',
		'Ett Par',
		'Två Par',
		'Triss',
		'Fyrtal',
		'Liten Stege',
		'Stor Stege',
		'Kåk',
		'Chans',
		'Yatzy',
		'Totalt'
	];

	var shadedRulesRowIndices = [
		0,
		7,
		8,
		18
	];

	addPlayers();
	addRuleNames();
	addShades();

	function addRuleNames() {
		for(var i = 0; i < ruleNames.length; i++){
			var tr = $('<tr>');

			tr.append('<td>' + ruleNames[i] +'</td>');

			for(var playerIndex = 0; playerIndex < players.length; playerIndex++){
				//added class for pushing result to td
				tr.append('<td class="place-score"></td>');
			}

			$('.gamecard tbody').append(tr);
		}
	}


	function addShades() {
		for(i = 0; i < shadedRulesRowIndices.length; i++){
			var shadedTr = $($('.gamecard tbody tr')[shadedRulesRowIndices[i]]);

			shadedTr.addClass('gamecard-shade');

			shadedTr.children(":first").addClass('gamecard-shade-darker');
		}
	}

	function addPlayers() {
		var tr = $('<tr >');

		tr.append('<td>Deltagare</td>');

		for(var playerIndex = 0; playerIndex < players.length; playerIndex++){

			tr.append(
				'<td>' + shortenedPlayerName(playerIndex) + '</td>'
			);
		}

		$('.gamecard tbody').append(tr);
	}

	function shortenedPlayerName(playerIndex) {
		var playerName = players[playerIndex];

		if (playerName.length > 3) {
			playerName = playerName[0] + playerName[1] + playerName[playerName.length-1];
		}

		return playerName.toUpperCase();
	}
}

