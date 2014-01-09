/**
 * Location for all tests related to the sorting.js file.
 */

var adventurerAllTens = MAIN.createAdventurer({
	stats: {
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		chr: 10
	}
});
var adventurerAllSixes = MAIN.createAdventurer({
	stats: {
		str: 6,
		dex: 6,
		con: 6,
		int: 6,
		wis: 6,
		chr: 6
	}
});
var adventurerAllTwelves = MAIN.createAdventurer({
	stats: {
		str: 12,
		dex: 12,
		con: 12,
		int: 12,
		wis: 12,
		chr: 12
	}
});
var adventurerComplex = MAIN.createAdventurer({
	stats: {
		str: 10,
		dex: 10,
		con: 12,
		int: 12,
		wis: 6,
		chr: 6
	}
});


var mockAdventurersList = null;

module("Sorting", {
	setup: function () {
		mockAdventurersList = [];
		mockAdventurersList.push(adventurerAllTens);
		mockAdventurersList.push(adventurerAllSixes);
		mockAdventurersList.push(adventurerAllTwelves);
	}
});

test("Mocked List is unsorted.", function () {
	ok(mockAdventurersList[0].getStr() === 10);
	ok(mockAdventurersList[1].getStr() === 6);
	ok(mockAdventurersList[2].getStr() === 12);
});

test("Sorting doesn't change the contents of the given collection, just it's order.", function () {
	var originalLength = mockAdventurersList.length;
	MAIN.sortAdventurers(mockAdventurersList, {
		metric: "getStr",
		order: "ascending"
	});
	ok(originalLength === mockAdventurersList.length, "AdventurersList is the same lenght before and after sorting.");
});

test("No options argument returns false and doesn't change the collection.", function () {
	var successfullySorted = MAIN.sortAdventurers(mockAdventurersList);
	ok(successfullySorted === false, "Return value indicates no sorting done.");
	ok(mockAdventurersList[0].getTotal() == 60, "First adventurer has not changed.");
	ok(mockAdventurersList[1].getTotal() == 36, "Second adventurer has not changed.");
	ok(mockAdventurersList[2].getTotal() == 72, "Last adventurer has not changed.");
});

test("Options argument is missing required fields, returns false and doesn't change collection.", function () {
	var successfullySorted = MAIN.sortAdventurers(mockAdventurersList, {
		noManditoryOptions: 'manditory options are missing'
	});
	ok(successfullySorted === false, "Return value indicates no sorting done.");
	ok(mockAdventurersList[0].getTotal() == 60, "First adventurer has not changed.");
	ok(mockAdventurersList[1].getTotal() == 36, "Second adventurer has not changed.");
	ok(mockAdventurersList[2].getTotal() == 72, "Last adventurer has not changed.");
});

test("Invalid options are ignored and sorting is successful.", function () {
	var successfullySorted = MAIN.sortAdventurers(mockAdventurersList, {
		metric: 'getDex',
		invalidOptions: 'invalidValue',
		order: 'descending'

	});
	ok(successfullySorted === true, "Return value indicates sorting was successful");
	ok(mockAdventurersList[0].getDex() == 12, "First adventurer has hignest dex stat.");
	ok(mockAdventurersList[2].getDex() == 6, "Last adventurer has lowest dex stat.");
});

test("Sort collection of Adventurers by their int stat in descending order.", function () {
	var successfullySorted = MAIN.sortAdventurers(mockAdventurersList, {
		metric: 'getInt',
		order: 'descending'
	});
	ok(successfullySorted === true, "Return value indicates sorting was successful");
	ok(mockAdventurersList[0].getInt() === 12, "First adventurer has the hignest int attribute.");
	ok(mockAdventurersList[2].getInt() === 6, "Last adventurer has the lowest int attribute.");
});

test("Sort a collection of Adventurers on their total stat in ascending order.", function () {
	var successfullySorted = MAIN.sortAdventurers(mockAdventurersList, {
		metric: 'getTotal',
		order: 'ascending'
	});
	ok(successfullySorted === true, "Return value indicates sorting was successful");
	ok(mockAdventurersList[0].getTotal() == 36, "First adventurer has the lowest stats total.");
	ok(mockAdventurersList[2].getTotal() == 72, "Last adventurer has the highest stats total.");
});

test("Sort a collection of Adventures on str (descending) then total (descending)", function () {
	mockAdventurersList.push(adventurerComplex);
	successfullySorted = MAIN.sortAdventurers(mockAdventurersList, [{
		metric: 'getStr',
		order: 'descending'
	}, {
		metric: 'getTotal',
		order: 'descending'
	}]);
	ok(mockAdventurersList.length === 4, "Added another adventurer to collection.");
	ok(mockAdventurersList[1] === adventurerAllTens, "Second adventurer is the allTens one.");
	ok(mockAdventurersList[2] === adventurerComplex, "Third adventurer is the complex one.");
});

test("Sort a collection twice. Once in each direction. (chr asc, and total desc)", function () {
	mockAdventurersList.push(adventurerComplex);
	successfullySorted = MAIN.sortAdventurers(mockAdventurersList, [{
		metric: 'getChr',
		order: 'ascending'
	}, {
		metric: 'getTotal',
		order: 'descending'
	}]);
	ok(mockAdventurersList[0] === adventurerComplex, "ComplexAdventurer is first.");
});

