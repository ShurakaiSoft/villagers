/**
 * UI for sorting.
 */

var MAIN = (function (main) {
"use strict";

var defaultShortListSize = 6;	// Adventurers

var $shortListInput = null;     // jQuery object to short list input box.
var $optionsList = null;
var metricSelectOptionList = null;


/**
 * Converts a metricList object into an object that's used to create the
 * html UI <select> element for listing the sortable metrics available.
 */
function createMetricSelectOptionList(metricList) {
	var i = 0;
	var optionList = [{
		value: 'none',
		text: 'none',
		selected: 'selected'
	}];
	for (i = 0; i < metricList.length; i++) {
		optionList.push({
			value: metricList[i].func,
			text: metricList[i].name
		});
	}
	return optionList;
}

/**
 * Sorting-Panel UI constructor.
 */
function init($sortingPanelContainer, sortableList) {
	metricSelectOptionList = createMetricSelectOptionList(sortableList);

	// createUI elements.
	if ($sortingPanelContainer) {
		createUIPanel($sortingPanelContainer);
	}
}


/**
 * return a jQuery <li> element containing a set of UI sort options.
 */
function createSortOptionSet(index) {
	var $optionSet = $('<li>');

	$optionSet.append(createMetricSelector(index));
	$optionSet.append(createOrderSelector(index));
//	$optionSet.append($('<button>').html('-'));  // TODO delete button
	return $optionSet;
}




/**
 * Create a generic html <select> node with data from given options.
 */
function createSelect(options) {
	var $select = $('<select>').attr('name', options.name);
	var $option = null;
	var i = 0;

	for (i = 0; i < options.optionList.length; i++) {
		$option = $('<option>').attr('value', options.optionList[i].value);
		$option.html(options.optionList[i].text);
		if (options.optionList[i].selected) {
			$option.attr('selected', 'selected');
		}
		$select.append($option);
	}
	return $select;
}


/**
 *  Creates an html <select> list populated with sortable metrics.
 */
function createMetricSelector(index) {
	var options = {
		name: 'metric' + index,
		optionList: metricSelectOptionList
	};

	return createSelect(options);
}

/**
 * Creates an html <select> list with ascending and descending options.
 */
function createOrderSelector(index) {
	var options = {
		name: 'order' + index,
		optionList: [{
			value: 'descending',
			selected: true,
			text: 'descending'
		}, {
			value: 'ascending',
			text: 'ascending'
		}]
	};

	return createSelect(options);
}






/**
 * Create the sorting-panel UI elements within the given jQuery container.
 *
 * NOTE: the given container is emptied before use.
 */
function createUIPanel($container) {
	$container.empty();
	// heading
	$container.append($('<h2>').html('Sort Options Panel'));

	// short list size
	$container.append('Short List Size:');
	$shortListInput = $('<input>').attr({
			type: 'text',
			value: defaultShortListSize
		});
	$container.append($shortListInput);

	// sort options stuff
	$optionsList = $('<ul>').
			append(createSortOptionSet(1)).
			append(createSortOptionSet(2)).
			append(createSortOptionSet(3));
	$container.append($optionsList);

}


/**
 * Collect sorting details from the UI, package them up into an object and
 * return them.
 */
function getSortOptions() {
	var sortOptions = {};

	function getShortListSize() {
		return Number($shortListInput.val());
	}

	function addMetric(metricList, index) {
		var metric = null;
		var order = null;

		metric = $optionsList.children(':nth-child(' + index + ')')
			.children("[name='metric" + index + "']").val();
		if (!metric || metric === 'none') {
			return false;
		}
		order = $optionsList.children(':nth-child(' + index + ')')
			.children("[name='order" + index + "']").val();
		if (!order) {
			throw "WARNING: ignoring invalid order ";
		}
		metricList.push({
			metric: metric,
			order: order
		});
		addMetric(metricList, index + 1);
	}

	function getMetricOptionsList() {
		var options = [];

		addMetric(options, 1);
		return options;
	}

	sortOptions.size = getShortListSize();
	sortOptions.options = getMetricOptionsList();
	return sortOptions;
}


if (main.sortingPanel) {
	throw "sortingPanel already exists";
}
main.sortingPanel = {
	init: init,
	getSortOptions: getSortOptions
};

return main;
}(MAIN || {}));
