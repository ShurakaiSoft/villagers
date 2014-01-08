/**
 * New node file
 */
var MAIN = (function (main) {
	"use strict";


	/**
	 * returns false if specified minimums are not met.
	 * Unspecified values are not failures.
	 */
	function filterStats(candidate, filter) {
		var statsGetterFunc = {
			str: "getStr",
			dex: "getDex",
			con: "getCon",
			int: "getInt",
			wis: "getWis",
			chr: "getChr",
			total: "getTotal",
			avg: "getAvg"
		};

		filter.statsAtLeast = filter.statsAtLeast || {};
		for (var stat in filter.statsAtLeast) {
			if (candidate[statsGetterFunc[stat]]() < filter.statsAtLeast[stat]) {
				return false;
			}
		}
		filter.statsNotMoreThan = filter.statsNotMoreThan || {};
		for (var stat in filter.statsNotMoreThan) {
			if (candidate[statsGetterFunc[stat]]() > filter.statsNotMoreThan[stat]) {
				return false;
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
			if (filterOptions.statsAtLeast || filterOptions.statsNotMoreThan) {
				if (filterStats(candidate, filterOptions) === false) {
					continue;
				}
			}
			filteredList.push(candidate);
		}
		return filteredList;
	};

	return main;
} (MAIN || {}));