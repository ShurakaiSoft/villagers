/**
 * All events are attached here and called from here.
 */



var MAIN = (function (main) {
	"use strict";

	/**
	 * jQuery main function.
	 *
	 * Attach events to UI elements after page load.
	 */
	$(function () {
		$("#go").click(handleGenerateVillageEvent);
	});


	/**
	 * Sanitize and validate input to the generateVillage event.
	 *
	 */
	function handleGenerateVillageEvent(e) {
		var populationSize = Number($("#populationSize").val());
		var shortList = Number($("#shortList").val());
		if (populationSize > 0 && shortList > 0) {
			generateCandidates(populationSize, shortList);
		} else {
			alert("Population size and ShortList must be greater than 0.");
		}
	}

	/**
	 *
	 */
	function generateCandidates(candidatePoolSize, shortListSize) {
		// generate candidates
		main.candidates = main.generateCandidates(candidatePoolSize);

		// this can also be run independent
		main.showTopCandidates(shortListSize);
	}


	return main;
} (MAIN || {}));
