import "should";
import mocha from "mocha";
// @ts-ignore
import {Value, Container as ValueContainer} from ".";

mocha.describe("Value<T>", () => {
	let primitiveValue: Value<string>;
	// let objectValue: Value<{name: string; age: number}>;
	// let arrayValue: Value<number[]>;

	mocha.beforeEach(() => {
		primitiveValue = new Value("John");
		// objectValue = new Value({name: "John", age: 12});
		// arrayValue = new Value([1, 2, 3]);
	});

	mocha.it("Changing primitive value fires event", () => {
		let tmp = "";
		primitiveValue.addListener(value => tmp = value);
		primitiveValue.set("string");
		tmp.should.be.equal("string");
	})
	
	mocha.it.skip("Setting complex object fires event");
});