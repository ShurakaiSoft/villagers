/**
 * QUint tests for adventurer.js functions.
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

	/**
	 * Handy function to test values are inside a range
	 *
	 * @param value to test
	 * @param lower lowerbound, inclusive
	 * @param upper upperbound, inclusive
	 * @returns {Boolean} true if value >= lower and value <= upper.
	 */
	function between(value, lower, upper) {
		return (value >= lower && value <= upper);
	};


	module("character.js", {
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

	test("generateAdventurers returns an array of adventurers of the requested size.", function () {
		var requestedSize = 5;
		var adventurerCollection = MAIN.generateAdventurers(requestedSize);
		ok(adventurerCollection.length === requestedSize);
	});



}());

