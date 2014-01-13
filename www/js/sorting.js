/**
 * Contains functions for sorting a collection of adventurers.
 */
var MAIN = (function (main) {
	"use strict";

	/**
	 * Sort the collection on a single set of options.<br>
	 * <br>
	 * Options mush have a metric and order attributes.<br>
	 * * metric: String, the name of the getter function for the metric to sort
	 * on.
	 * * order: String, 'ascending' | 'descending' to indicate the sort order.
	 *
	 *
	 *
	 * @param collection Array, collection of adventurer objects.
	 * @param options Object, set of sorting parameters.
	 */
	function singleSort(collection, options) {
		var metric = null;

		if (!options || !options.metric || !options.order) {
			return false;	// do nothing with invalid options.
		}
		metric = options.metric;
		collection.sort(function (a, b) {
			switch (options.order) {
			case 'ascending':
				return a[metric]() - b[metric]();
				break;
			case 'descending':
				return b[metric]() - a[metric]();
				break;
			default:
				throw "ERROR, sortAdventures: unknown order option!";
			}
		});
		return true;
	}


	/**
	 * Sort the collection with the given options. Options can be a single set
	 * of options or an array, indicating secondary level of sorting.<br>
	 * <br>
	 * The first set of sort options are used first, the second set if given
	 * are used to to sort ties and the third set if given used to break
	 * remaining ties and so on.<br>
	 * <br>
	 * Note: there is no limit to the number of levels of sorting, more likely
	 * performance will be the limiting factor.
	 *
	 * @param collection the collection of adventurers
	 * @param options object | object[], set of sort options
	 * @return true if sorting was successful, even if partially.
	 */
	main.sortAdventurers = function (collection, options) {
		if (options && options.length && options.pop && typeof options.pop === 'function') {
			while (options.length > 0) {
				singleSort(collection, options.pop());
			}
		} else {
			return singleSort(collection, options);
		}
	};

	/**
	 * Returns an array of field names along with their getter
	 * function names.
	 */
	main.getSortableList = function () {
		var sortableList = [{
			func: 'getStr',
			name: 'Strength Attribute'
		}, {
			func: 'getDex',
			name: 'Dexterity Attribute'
		}, {
			func: 'getCon',
			name: 'Constitution Attribute'
		}, {
			func: 'getInt',
			name: 'Intelligence Attribute'
		}, {
			func: 'getWis',
			name: 'Wisdom Attribute'
		}, {
			func: 'getChr',
			name: 'Charisma Attribute'
		}, {
			func: 'getTotal',
			name: 'Attribute Total'
		}, {
			func: 'getAvg',
			name: 'Attribute Average'
		}];
		return sortableList;
	};

	return main;
}(MAIN || {}));
