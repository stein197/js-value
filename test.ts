import mocha from "mocha";
import assert from "assert";
import {Value, Container} from ".";

mocha.describe("Value<T>", () => {
	const defaultValue = "John";
	const newValue = "string";
	let value: Value<string | null>;
	let noop: () => void;
	let tracker: assert.CallTracker;

	mocha.beforeEach(() => {
		value = new Value(defaultValue);
		tracker = new assert.CallTracker();
		noop = tracker.calls(() => {});
	});

	mocha.it("Listeners receive old and new values", () => {
		const obj: any = {
			old: null,
			new: null
		};
		value.addListener((oldValue, newValue) => {
			obj.old = oldValue;
			obj.new = newValue;
		});
		value.set(newValue);
		assert.equal(obj.old, defaultValue);
		assert.equal(obj.new, newValue);
	});

	mocha.describe("set()", () => {
		mocha.it("Same value won't fire an event", () => {
			value.addListener(noop);
			value.set(defaultValue);
			assert.throws(() => tracker.verify());
		});

		mocha.it("New value fires an event", () => {
			value.addListener(noop);
			value.set("string");
			tracker.verify();
		});
	});

	mocha.describe("get()", () => {
		mocha.it("Returns initial value after instantiation", () => {
			assert.equal(value.get(), defaultValue);
		});
	
		mocha.it("Returns set value after set()", () => {
			value.set(newValue);
			assert.equal(value.get(), newValue);
		});
	});

	mocha.describe("Array value", () => {
		const defaultValue = [1, 2, 3];
		const newValue = [1, 2, 3, 4];
		let value: Value<number[]>;

		mocha.beforeEach(() => value = new Value(defaultValue));

		mocha.it("Changing an array fires an event", () => {
			value.addListener(noop);
			value.set(newValue);
			tracker.verify();
		});

		mocha.it("Not changing an array won't fire an event", () => {
			value.addListener(noop);
			value.set(defaultValue);
			assert.throws(() => tracker.verify(), assert.AssertionError);
		});
	});
});

mocha.describe("Container<T>", () => {
	const defaultStringValue = "John";
	const defaultNumberValue = 12;
	const newStringValue = "string";
	const newNumberValue = 24;
	let container: Container<{string: string; number: number}>;
	let noop: () => void;
	let tracker: assert.CallTracker;

	mocha.beforeEach(() => {
		container = new Container({
			string: defaultStringValue,
			number: defaultNumberValue,
		});
		tracker = new assert.CallTracker();
		noop = tracker.calls(() => {});
	});

	mocha.it("Listeners receive old and new values", () => {
		const obj: any = {
			old: null,
			new: null
		};
		container.addEventListener("number", (oldValue, newValue) => {
			obj.old = oldValue;
			obj.new = newValue;
		});
		container.addEventListener("string", (oldValue, newValue) => {
			obj.old = oldValue;
			obj.new = newValue;
		});
		container.set("number", newNumberValue);
		assert.equal(obj.old, defaultNumberValue);
		assert.equal(obj.new, newNumberValue);
		container.set("string", newStringValue);
		assert.equal(obj.old, defaultStringValue);
		assert.equal(obj.new, newStringValue);
	});

	mocha.describe("get()", () => {
		mocha.it("Returns specified values", () => {
			assert.equal(container.get("string"), defaultStringValue);
			assert.equal(container.get("number"), defaultNumberValue);
		});

		mocha.it("Returns all values", () => {
			assert.deepStrictEqual(container.get(), {string: defaultStringValue, number: defaultNumberValue});
		});
	});

	mocha.describe("set()", () => {
		mocha.it("Same value won't fire an event", () => {
			container.addEventListener("string", noop);
			container.set("string", defaultStringValue);
			assert.throws(() => tracker.verify());
		});

		mocha.it("New value fires an event", () => {
			container.addEventListener("string", noop);
			container.set("string", newStringValue);
			tracker.verify();
		});

		mocha.it("Setting a value won't fire listeners attached to the different values", () => {
			container.addEventListener("string", noop);
			container.set("number", newNumberValue);
			assert.throws(() => tracker.verify());
		});
	});
});
