import mocha from "mocha";
import assert from "assert";
import {Value, Container} from ".";

function getNoop(): {noop(): void; tracker: assert.CallTracker} {
	const tracker = new assert.CallTracker();
	return {
		noop: tracker.calls(() => {}),
		tracker
	};
}

mocha.describe("Value<T>", () => {
	let value: Value<string | null>;
	mocha.beforeEach(() => value = new Value("John"));

	mocha.it("Not changing value won't fire an event", () => {
		const noop = getNoop();
		value.addListener(noop.noop);
		value.set("John");
		assert.throws(() => noop.tracker.verify());
	});

	mocha.it("Changing value fires an event", () => {
		const noop = getNoop();
		value.addListener(noop.noop);
		value.set("string");
		noop.tracker.verify();
	});

	mocha.it("Listeners receive old and new values", () => {
		const obj: {old: string | null; new: string | null} = {
			old: null,
			new: null
		};
		value.addListener((oldValue, newValue) => {
			obj.old = oldValue;
			obj.new = newValue;
		});
		value.set("string");
		assert.equal(obj.old, "John");
		assert.equal(obj.new, "string");
	});

	mocha.it("Setting value to null fires an event", () => {
		const noop = getNoop();
		value.addListener(noop.noop);
		value.set(null);
		noop.tracker.verify();
	});

	mocha.it("Setting value from null fires an event", () => {
		const noop = getNoop();
		value.set(null);
		value.addListener(noop.noop);
		value.set("string");
		noop.tracker.verify();
	});

	mocha.it("Value<T>.get() returns initial value", () => {
		assert.equal(value.get(), "John");
	});

	mocha.it("Value<T>.get() returns set value", () => {
		value.set("string");
		assert.equal(value.get(), "string");
	});

	mocha.describe("Array value", () => {
		let value: Value<number[]>;
		mocha.beforeEach(() => value = new Value([1, 2, 3]));

		mocha.it("Changing an array fires an event", () => {
			const noop = getNoop();
			value.addListener(noop.noop);
			value.set([1, 2, 3, 4]);
			noop.tracker.verify();
		});

		mocha.it("Not changing an array won't fire an event", () => {
			const noop = getNoop();
			value.addListener(noop.noop);
			value.set([1, 2, 3]);
			assert.throws(() => noop.tracker.verify());
		});
	});

	mocha.describe("Object value", () => {
		let value: Value<{name: string; age: number}>;
		mocha.beforeEach(() => value = new Value({name: "John", age: 12}));
		mocha.it.skip("Setting single field fires an event");
		mocha.it.skip("Setting single field with the same value won't fire an event");
		mocha.it.skip("Setting partial object value won't erase omitted fields");
		mocha.it.skip("Setting empty object won't erase all fields");
	});
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