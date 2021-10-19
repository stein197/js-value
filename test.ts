import "should";
import mocha from "mocha";
import {Value, Container} from ".";

mocha.describe("Value<T>", () => {
	let primitiveValue: Value<string>;
	let arrayValue: Value<number[]>;
	let objectValue: Value<{name: string; age: number}>;
	let complexValue: Value<{name: string; age: number; array: number[]; object: {param1: string; param2: number}}>;
	let arrayOfObjectsValue: Value<{name: string; age: number}[]>;
	let objectOfArraysValue: Value<{array: {name: string; age: number}[]}>;

	mocha.beforeEach(() => {
		primitiveValue = new Value("John");
		arrayValue = new Value([1, 2, 3]);
		objectValue = new Value({name: "John", age: 12});
	});

	mocha.it.skip("Not changing primitive value won't fire an event");
	mocha.it("Changing primitive value fires an event", () => {
		let tmp = "";
		primitiveValue.addListener(value => tmp = value);
		primitiveValue.set("string");
		tmp.should.be.equal("string");
	});

	mocha.it.skip("Setting value to null changes the value fires an event");
	mocha.it.skip("Unsetting value from null changes the value fires an event");

	mocha.it.skip("Changing an array fires an event");
	mocha.it.skip("Not changing an array won't fire an event");

	mocha.it.skip("Changing inner array fires an event");
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