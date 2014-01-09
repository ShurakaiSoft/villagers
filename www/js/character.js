/**
 * New node file
 */
var MAIN = (function (main) {
	"use strict";

	/**
	 * Dice roller
	 */
	function roll(quantity, dieSize, modifier) {
		quantity = quantity || 1;
		dieSize = dieSize || 6;
		modifier = modifier || 0;
		var i = 0;
		var total = 0;

		for (i = 0; i < quantity; i++) {
			total += Math.floor(Math.random() * dieSize) + 1;
		}

		return total + modifier;
	}

	/**
	 * A wrapper for createCharacter.
	 *
	 * NOTE: The Future API will call characters as Adventurers.
	 */
	main.createAdventurer = function (options) {
		return main.createCharacter(options);
	};


	/**
	 * Create a character.
	 *
	 * Options are the stats to use. Any options missing will be randomly
	 * generated.
	 *
	 * @return object, representing the created character.
	 */
	main.createCharacter = function (options) {
		var character = {};

		options = options || {};
		// create stats
		options.stats = options.stats || {};
		character.stats = {};
		character.stats.str = options.stats.str || roll(3,6);
		character.stats.dex = options.stats.dex || roll(3,6);
		character.stats.con = options.stats.con || roll(3,6);
		character.stats.int = options.stats.int || roll(3,6);
		character.stats.wis = options.stats.wis || roll(3,6);
		character.stats.chr = options.stats.chr || roll(3,6);
		character.stats.total = character.stats.str + character.stats.dex + character.stats.con + character.stats.int + character.stats.wis + character.stats.chr;
		character.stats.avg = character.stats.total / 6;
		character.stats.toString = function () {
			return ["str:", this.str,
			        "dex:", this.dex,
			        "con:", this.con,
			        "int:", this.int,
			        "wis:", this.wis,
			        "chr:", this.chr,
			        "total:", this.total,
			        "avg:", this.avg.toPrecision(3)
			        ].join(" ");
		};
		character.getStr = function () {
			return this.stats.str;
		};
		character.getDex = function () {
			return this.stats.dex;
		};
		character.getCon = function () {
			return this.stats.con;
		};
		character.getInt = function () {
			return this.stats.int;
		};
		character.getWis = function () {
			return this.stats.wis;
		};
		character.getChr = function () {
			return this.stats.chr;
		};
		character.getAvg = function () {
			return this.stats.avg;
		};
		character.getTotal = function () {
			return this.stats.total;
		};


		// other parts added to object.


		character.toString = function () {
			return this.stats.toString();
		};
		return character;
	};

	/**
	 * returns an array of adventurers of populationSize
	 */
	main.generateCandidates = function (populationSize) {
		var population = [];
		var i;

		for (i = 0; i < populationSize; i++) {
			population.push(main.createCharacter());
		}

		return population;
	};




	return main;
}(MAIN || {}));

