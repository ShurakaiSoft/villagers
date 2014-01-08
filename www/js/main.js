

var MAIN = (function (main) {
	"use strict";

	main.candidates = [];	// an array of characters


	function sortAvg(a, b) {
		return b.stats.avg - a.stats.avg;
	}

	function sortTotal(a, b) {
		return b.stats.total - a.stats.total;
	}


	/**
	 * Filter the master list of candidates
	 * Sorts the list
	 * Displays the top `shortListSize` candidates from the short list.
	 *
	 * candidatePool Array of Character objects.
	 * shortListSize Number, size of short list to show.
	 */
	main.showTopCandidates = function (shortListSize) {
		var html = '';	// ??? put second error string here ???
		var i = 0;
		var shortList = [];	// a copy of the population
		var actualShortListSize = shortListSize;

		if (main.candidates.length <= 0) {
			html = "No Candidates";
			return;
		}
		shortList = main.filterAdventurers(main.candidates, {});


		if (shortList.length <= 0) {
			html = "No one made the short list.";
			return;
		}
		shortList.sort(sortTotal);

		actualShortListSize = Math.min(shortListSize, shortList.length);

		html = "showing " + actualShortListSize + " candidates of " + shortList.length + "<br>";
		for (i = 0; i < actualShortListSize; i++) {
			html += shortList[i].toString() + "<br>";
		}
		$("#candidates").html(html);
	};

	return main;
} (MAIN || {}));