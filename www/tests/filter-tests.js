/**
 * QUnit tests for /js/filter.js functions
 */

(function namespace() {
	var characterAllTen = MAIN.createCharacter({
		stats: {
			str: 10,
			dex: 10,
			con: 10,
			int: 10,
			wis: 10,
			chr: 10
		}
	});
	var characterAllSix = MAIN.createCharacter({
		stats: {
			str: 6,
			dex: 6,
			con: 6,
			int: 6,
			wis: 6,
			chr: 6
		}
	});
	var twoAdventurers = [];

	module("Filters", {
		setup: function () {
			twoAdventurers = [];
			twoAdventurers.push(characterAllTen);
			twoAdventurers.push(characterAllSix);
		}
	});

	test("Filtering doesn't change original array of Adventurers", function () {
		var originalLength = twoAdventurers.length;
		MAIN.filterAdventurers(twoAdventurers, {
			statsAtLeast: {
				str: 18
			}
		});
		ok(twoAdventurers.length === originalLength, "Original Array length didn't change.");
	});

	test("No filterOptions argument returns a copy of the original list of Adventurers.", function () {
		var shortList = MAIN.filterAdventurers(twoAdventurers);
		ok(shortList.length === 2);
		shortList.pop();
		ok(shortList.length === 1);
		ok(shortList[0].getStr() === twoAdventurers[0].getStr());
	});

	test("Can remove Adventurers who's stats don't meet requirements", function () {
		var shortList = MAIN.filterAdventurers(twoAdventurers, {
			statsAtLeast: {
				str: 9
			}
		});
		ok(shortList.length === 1);
		ok(shortList[0].getStr() >= 9);
	});

	test("Can remove Adventurers who's stats exceed requirements", function () {
		var shortList = MAIN.filterAdventurers(twoAdventurers, {
			statsNotMoreThan: {
				wis: 9
			}
		});
		ok(shortList.length === 1);
		ok(shortList[0].getWis() <= 9);
	});

	test("Very strict requirements removes all candidates.", function () {
		var shortList = MAIN.filterAdventurers(twoAdventurers, {
			statsAtLeast: {
				int: 100
			}
		});
		ok(shortList.length === 0);
	});

	test("Can remove Adventurers who's total stats fall below requirements", function () {
		var shortList = MAIN.filterAdventurers(twoAdventurers, {
			statsAtLeast: {
				total: 50
			}
		});
		ok(shortList.length === 1);
		ok(shortList[0].getTotal() >= 50);
	});

	test("Can remove Adventurers who's average stats are too high.", function () {
		var shortList = MAIN.filterAdventurers(twoAdventurers, {
			statsNotMoreThan: {
				avg: 9
			}
		});
		ok(shortList.length === 1, "ShortList.length is 1");
		ok(shortList[0].getAvg() <= 9, "First Adventurer's average stats are less than or equal to 50");
	});

	test("Invalid filter options are ignored.", function () {
		var shortList = MAIN.filterAdventurers(twoAdventurers, {
			statsNotMoreThan: {
				invalidStatCode: 9
			}
		});
		ok(shortList.length === 2, "Results after filtering has the same length.");
		deepEqual(shortList, twoAdventurers, "Original and Filtered lists are the same (deepEqual)");
	});

}());

