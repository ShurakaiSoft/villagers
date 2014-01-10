/**
 * All events are attached here and called from here.
 */



var MAIN = (function (main) {
	"use strict";

	// UI Input elements.
	var $filterButton = null;
	var $generateButton = null;
	var $populationInput = null;
	var $shortListInput = null;
	var filterId = '#filterButton';
	var generateId = '#generateButton';
	var populationId = '#populationSize';
	var shortListId = '#shortListSize';

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
		$shortListInput = $(shortListId);
		$filterButton.click(handleFilterEvent);
		$generateButton.click(handleGeneratePopulationEvent);
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
		var mockSortOptions = [{
			metric: 'getStr',
			order: 'descending'
		}, {
			metric: 'getTotal',
			order: 'descending'
		}];
		var shortListSize = Number($shortListInput.val());
		if (shortListSize <= 0) {
			throw "WARNING: short list size too small: " + shortListSize;
		}
		filterCandidates(mockFilter, mockSortOptions, shortListSize);
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
