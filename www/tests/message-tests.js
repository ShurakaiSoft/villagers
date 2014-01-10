/**
 * Tests for the message subsystem.
 */

module("message");

test("message subsystem exists", function () {
	ok(typeof MAIN.message === 'object', "The message subsystem exists.");
});

test("Can create an error message", function () {
	ok(typeof MAIN.message.error === 'function', "Can create an error message.");
});

test("Can create a warning message", function () {
	ok(typeof MAIN.message.warning === 'function', "Can create a warning message.");
});

test("Can create an OK message", function () {
	ok(typeof MAIN.message.ok === 'function', "Can create an ok message");
});

