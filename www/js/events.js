/**
 * All events are attached here and called from here.
 */



var MAIN = (function (main) {
	"use strict";

	// UI Input elements.
	var $filterButton = null;
	var $generateButton = null;
	var $populationInput = null;
	var filterId = '#filterButton';
	var generateId = '#generateButton';
	var populationId = '#populationSize';

	var candidates = [];

	/**
	 * jQuery main function.
	 *
	 * Attach events to UI elements after page load.
	 */
	$(function () {
		$filterButton = $(filterId);
		$generateButton = $(generateId);
		$populationInput = $(populationId);
		$filterButton.click(handleFilterEvent);
		$generateButton.click(handleGeneratePopulationEvent);
		main.sortingPanel.init($('#sortingPanel'), main.getSortableList());
	});


	/**
	 * Sanitize and validate input to the generateVillage event.
	 *
	 */
	function handleGeneratePopulationEvent(e) {
		var populationSize = Number($populationInput.val());

		if (populationSize <=0) {
			throw "WARNING: requested population size too small";
		}
		candidates = main.generateAdventurers(populationSize);
		handleFilterEvent(e);
		main.message.ok("Created " + populationSize + " Adventurers.");
	}

	/**
	 * Collects filter, sorting and shortListSize from UI elements and
	 * passes that information to filterCandidates function.
	 */
	function handleFilterEvent(e) {
		var mockFilter = {
			statsAtLeast: {
				str: 12,
				con: 9,
				wis: 13,
				chr: 17
			}
		};
		var sortOptions = main.sortingPanel.getSortOptions();

		if (sortOptions && sortOptions.size <= 0) {
			throw "WARNING: short list size too small: " + shortListSize;
		}
		filterCandidates(mockFilter, sortOptions.options, sortOptions.size);
	}


	/**
	 * Updates UI with new Adventurer results from the given filter, sorting
	 * and size details.
	 */
	function filterCandidates(filterOptions, sortOptions, shortListSize) {
		var shortList = [];

		if (candidates.length <= 0) {
			throw "WARNING: No adventurers in candidate pool yet.";
		}
		shortList = main.filterAdventurers(candidates, filterOptions);
		main.sortAdventurers(shortList, sortOptions);
		main.showShortList(shortList, shortListSize);
	}


	return main;
} (MAIN || {}));
