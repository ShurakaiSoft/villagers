/**
 * Message subsystem functions.
 */

var MAIN = (function (main) {
	"use strict";

	var messageId = "#messageArea";
	var $messageList = null;
	var logToConsole = false;


	/**
	 * Initialize jQuery objects for messages.
	 */
	function init() {
		$messageList = $('<ul class="message-list"></ul>');
		$(messageId).html($messageList);
		$messageList.delegate('button', 'click', function (event) {
			deleteMessage($(event.target).parent());
		});
	}


	/**
	 * Animate the deletion of a message.
	 */
	function deleteMessage($message) {
		$message.clearQueue().fadeOut(1000, function () {
			$message.remove();
		});
	}


	/**
	 * Log message to console if it exists.
	 */
	function consoleLog(message) {
		if (logToConsole && console && console.log) {
			console.log(message);
		}
	}


	/**
	 * Log to UI Message list.
	 *
	 * Messages of type OK will automatically fade away after 10 second.
	 * Other message types are permanent.
	 */
	function uiLog(message, options) {
		var $message = $('<li>')
			.html(message)
			.append('<button >X</button>');

		options = options || {};
		if (options.cssClass) {
			$message.addClass(options.cssClass);
		}
		$messageList.append($message);
		if (options.type === 'OK') {
			$message.delay(10000).fadeOut(5000, function () {
				$message.remove();
			});
		}
	}


	/**
	 * Message subsustem public API.
	 */
	main.message = {
		error: function (message) {
			consoleLog("ERROR: " + message);
			uiLog(message, {
				cssClass: "message-error",
				type: 'ERROR'
			});
		},
		warning: function (message) {
			consoleLog("WARNING: " + message);
			uiLog(message, {
				cssClass: "message-warning",
				type: 'WARNING'
			});
		},
		ok: function (message) {
			consoleLog("OK: " + message);
			uiLog(message, {
				cssClass: "message-ok",
				type: 'OK'
			});
		}
	};


	/**
	 * Auto initialise message subsystem after the DOM is ready.
	 */
	$(function () {
		init();
	});


	return main;
}(MAIN || {}));
