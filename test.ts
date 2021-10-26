import mocha from "mocha";
import assert from "assert";
import {Value, Container} from ".";

function getNoop(count: number): {noop(): void; tracker: assert.CallTracker} {
	const tracker = new assert.CallTracker();
	return {
		noop: tracker.calls(() => {}, count),
		tracker
	};
}

mocha.describe("Value<T>", () => {
	let primitiveValue: Value<string>;
	let arrayValue: Value<number[]>;
	let objectValue: Value<{name: string; age: number}>;
	let complexValue: Value<{name: string; age: number; array: number[]; object: {param1: string; param2: number}}>;
	let arrayOfObjectsValue: Value<{name: string; age: number}[]>;
	let objectOfArraysValue: Value<{array: string[]}>;

	mocha.beforeEach(() => {
		primitiveValue = new Value("John");
		arrayValue = new Value([1, 2, 3]);
		objectValue = new Value({name: "John", age: 12});
		complexValue = new Value({name: "John", age: 12, array: [1, 2, 3], object: {param1: "A", param2: 1}});
		arrayOfObjectsValue = new Value([
			{name: "John", age: 12},
			{name: "Jack", age: 32}
		]);
		objectOfArraysValue = new Value({
			array: [
				"A", "B", "C"
			]
		});
	});

	mocha.it("Not changing primitive value won't fire an event", () => {
		const noop = getNoop(0);
		primitiveValue.addListener(noop.noop);
		primitiveValue.set("John");
		noop.tracker.verify();
	});

	mocha.it("Changing primitive value fires an event", () => {
		const noop = getNoop(1);
		primitiveValue.addListener(noop.noop);
		primitiveValue.set("string");
		noop.tracker.verify();
	});

	mocha.it.skip("Listeners receive old and new values");
	mocha.it.skip("Value<T>.set(null) changes fires an event");
	mocha.it.skip("Unsetting value from null changes the value fires an event");

	mocha.it.skip("Changing an array fires an event");
	mocha.it.skip("Not changing an array won't fire an event");

	mocha.it.skip("Changing inner array in object fires an event");
	mocha.it.skip("Setting partial object value does not erase omitted fields");
});

mocha.describe("Container<T>", () => {
	let container: Container<{name: string; age: number; obj: {param1: string}; arr: number[]}>;

	mocha.beforeEach(() => {
		container = new Container({
			name: "John",
			age: 12,
			obj: {
				param1: "string"
			},
			arr: [
				1, 2, 3
			]
		});
	});
});