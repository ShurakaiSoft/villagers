(function () {
	"use strict";


	/**
	 * jQuery main function.
	 *
	 * Attach events to UI elements after page load.
	 */
	$(function () {
		$("#go").click(handleGenerateVillageEvent);
	});


	/**
	 * Handle "Generate Village" click event.
	 *
	 */
	function handleGenerateVillageEvent(e) {
		showTopCandidates(generateVillage(10), 2); // XXX: magic numbers should come from event
	}


	/**
	 * returns an array of adventurers of populationSize
	 */
	function generateVillage(populationSize) {
		var population = [];
		var i;

		for (i = 0; i < populationSize; i++) {
			population.push(generateAdventurer());
		}

		return population;
	}


	/**
	 * Displays shortListSize of candidates from given population.
	 *
	 * population Object[], an array of adventurer objects.
	 * shortListSize number, size of short list to show.
	 */
	function showTopCandidates(population, shortListSize) {
		// TODO: no filtering of candidates yet
		var html = '';	// ??? put second error string here ???
		var i = 0;

		if (population.length === 0) {
			html = "No one lives here.";
		} else if (shortListSize <= 0) {
			html = "shortListSize should be greater than 0 to see results.";
		} else {
			for (i = 0; i < Math.min(shortListSize, population.length); i++) {
				html += population[i].show() + "<br>";
			}
		}
		$("#candidates").html(html);

	}

	/**
	 * Dice roller
	 *
	 *
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
	 * Will return an object that represents a character.
	 */
	function generateAdventurer() {
		var stats = {};
		stats.str = roll(3,6);
		stats.dex = roll(3,6);
		stats.con = roll(3,6);
		stats.int = roll(3,6);
		stats.wis = roll(3,6);
		stats.chr = roll(3,6);
		stats.total = stats.str + stats.dex + stats.con + stats.int + stats.wis + stats.chr;
		stats.avg = stats.total / 6;


		return {
			stats: stats,
			show: function () {
				return ["str:", this.stats.str,
				        "dex:", this.stats.dex,
				        "con:", this.stats.con,
				        "int:", this.stats.int,
				        "wis:", this.stats.wis,
				        "chr:", this.stats.chr,
				        "tot:", this.stats.total,
				        "avg:", this.stats.avg.toPrecision(3)
				        ].join(" ");
			}
		};
	}




























}());