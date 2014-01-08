/**
 * New node file
 */
var MAIN = (function (main) {
	"use strict";

	// mocked filterOptions
	var mockedFilterOptions = {
			statsAtLeast: {
				dex: 16,
				int: 17,
				str: 9,
				wis: 9,
				con: 13,
				chr: 12
			},
			statsNotMoreThan: {
				str: 16
			}
	};


	/**
	 * returns false if specified minimums are not met.
	 * Unspecified values are not failures.
	 */
	function filterStats(candidate, statsAtLeast) {
		var statCodes = ["str", "dex", "con", "int", "wis", "chr"];
		var statFunc = { str: "getStr", dex: "getDex", con: "getCon",
				int: "getInt", wis: "getWis", chr: "getChr"};
		var i = 0;
		var code = statCodes[0];

		for (i = 0; i < statCodes.length; i++) {
			code = statCodes[i];
			if (statsAtLeast[code]) {
				if (candidate[statFunc[code]]() < statsAtLeast[code]) {
					return false;
				}
			}
		}
		return true;
	}

	function statsNotMoreThanFilter(candidate, filter) {
		var statCodes = ["str", "dex", "con", "int", "wis", "chr"];
		var statFunc = { str: "getStr", dex: "getDex", con: "getCon",
				int: "getInt", wis: "getWis", chr: "getChr"};
		var i = 0;
		var code = statCodes[0];

		for (i = 0; i < statCodes.length; i++) {
			code = statCodes[i];
			if (filter[code]) {
				if (candidate[statFunc[code]]() > filter[code]) {
					return false;
				}
			}
		}
		return true;
	}


	/**
	 * Returns a new list of Adventurers that pass the given requirements.<br>
	 * <br>
	 *
	 * @param adventurers Array, original list of Adventurers
	 * @param filterOptions Object, requirements
	 */
	main.filterAdventurers = function (adventurers, filterOptions) {
		var filteredList = [];
		var i = 0;
		var candidate = null;

		filterOptions = filterOptions || {};
		for (i = 0; i < adventurers.length; i++) {
			candidate = adventurers[i];
			if (filterOptions.statsAtLeast) {
				if (filterStats(candidate, filterOptions.statsAtLeast) === false) {
					continue;
				}
			}
			if (filterOptions.statsNotMoreThan) {
				if (statsNotMoreThanFilter(candidate, filterOptions.statsNotMoreThan) === false) {
					continue;
				}
			}
			filteredList.push(candidate);
		}
		return filteredList;
	};


	return main;
} (MAIN || {}));