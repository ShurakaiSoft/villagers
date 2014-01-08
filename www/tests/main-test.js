/**
 * Tests for villagers.jade
 */


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


/**
 * Handy function to test values are inside a range
 *
 * @param value to test
 * @param lower lowerbound, inclusive
 * @param upper uppserbound, inclusive
 * @returns {Boolean} true if value >= lower and value <= upper.
 */
function between(value, lower, upper) {
	return (value >= lower && value <= upper);
};

test("application exists", function () {
	ok(MAIN);
});



test("generateCandidates() returns requested size", function () {
	var requestedSize = 5;
	MAIN.candidates = MAIN.generateCandidates(requestedSize);
	ok(MAIN.candidates.length === requestedSize);
});


module("character.js", {
	setup: function () {
	}
});
test("Static character Creation", function () {
	ok(characterAllTen.getStr() === 10);
	ok(characterAllSix.getDex() === 6);
	ok(characterAllTen.getCon() === 10);
	ok(characterAllSix.getInt() === 6);
	ok(characterAllTen.getWis() === 10);
	ok(characterAllSix.getChr() === 6);
});

test("Non-random characters have correct average for stats", function () {
	ok(characterAllTen.getAvg() === 10);
	ok(characterAllSix.getAvg() === 6);
});

test("Non-random Adventurers have correct totals for stats", function () {
	ok(characterAllTen.getTotal() === 60);
	ok(characterAllSix.getTotal() === 36);
});

test("An Adventurer can be randomly generated", function () {
	var randomCharacter = MAIN.createCharacter();
	function between(value, lower, upper) {
		return (value >= lower && value <= upper);
	};
	ok(between(randomCharacter.getStr(), 3,18));
	ok(between(randomCharacter.getDex(), 3,18));
	ok(between(randomCharacter.getCon(), 3,18));
	ok(between(randomCharacter.getInt(), 3,18));
	ok(between(randomCharacter.getWis(), 3,18));
	ok(between(randomCharacter.getChr(), 3,18));
});

test("Can create a semi-random Adventurer", function () {
	var semiRandomCharacter = MAIN.createCharacter( {
		stats: {
			dex: 15,
			int: 17
		}
	} );
	ok(between(semiRandomCharacter.getStr(), 3,18));
	ok(semiRandomCharacter.getDex() === 15);
	ok(between(semiRandomCharacter.getCon(), 3,18));
	ok(semiRandomCharacter.getInt() === 17);
	ok(between(semiRandomCharacter.getWis(), 3,18));
	ok(between(semiRandomCharacter.getChr(), 3,18));
});

test("toString can print a string.", function () {
	ok(typeof characterAllTen.toString() === 'string');
});


(function filtersModuleNamespace() {
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
		var shortList = MAIN.filterAdventurers(twoAdventurers, {
			statsAtLeast: {
				str: 18
			}
		});
		ok(shortList.length === 0);
		ok(twoAdventurers.length === originalLength);
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


}());


