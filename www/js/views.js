/**
 * Contains functions relating to the view.
 */

var MAIN = (function (main) {
	"use strict";

	// jQuery UI elements.
	var $candidates = null;
	var candidatesId = "#results";


	/**
	 * Given a list of Adventurers it will display them in the short list
	 * area.
	 */
	MAIN.showShortList = function (shortList, shortListSize) {
		var html = '';
		var i = 0;
		var actualShortListSize;

		actualShortListSize = Math.min(shortListSize, shortList.length);
		if (actualShortListSize <= 0) {
			html = "<h3>Short List is empty.</h3>";
		} else {
			html = "<h3>Showing " + actualShortListSize + " candidates of " + shortList.length + "</h3>";
			for (i = 0; i < actualShortListSize; i++) {
				html += shortList[i].toString() + "<br>";
			}
		}
		$candidates.html(html);
	};


	/**
	 * Initialize JQuery objects once DOM has loaded.
	 */
	$(function () {
		$candidates = $(candidatesId);
		main.showShortList([], 0);
	});


	return main;
} (MAIN || {}));