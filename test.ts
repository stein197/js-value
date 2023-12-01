import assert = require("assert");
import Value = require(".");

describe("Value<T>", () => {
	const defaultValue = "John";
	const newValue = "string";
	let value: Value<string | null>;
	let noop: () => void;
	let tracker: assert.CallTracker;

	beforeEach(() => {
		value = new Value(defaultValue);
		tracker = new assert.CallTracker();
		noop = tracker.calls(() => {});
	});

	it("Listeners receive old and new values", () => {
		const obj: any = {
			old: null,
			new: null
		};
		value.on((oldValue, newValue) => {
			obj.old = oldValue;
			obj.new = newValue;
		});
		value.set(newValue);
		assert.equal(obj.old, defaultValue);
		assert.equal(obj.new, newValue);
	});

	describe("set()", () => {
		it("Same value won't fire an event", () => {
			value.on(noop);
			value.set(defaultValue);
			assert.throws(() => tracker.verify());
		});

		it("New value fires an event", () => {
			value.on(noop);
			value.set("string");
			tracker.verify();
		});
	});

	describe("get()", () => {
		it("Returns initial value after instantiation", () => {
			assert.equal(value.get(), defaultValue);
		});
	
		it("Returns set value after set()", () => {
			value.set(newValue);
			assert.equal(value.get(), newValue);
		});
	});

	describe("Array value", () => {
		const defaultValue = [1, 2, 3];
		const newValue = [1, 2, 3, 4];
		let value: Value<number[]>;

		beforeEach(() => value = new Value(defaultValue));

		it("Changing an array fires an event", () => {
			value.on(noop);
			value.set(newValue);
			tracker.verify();
		});

		it("Not changing an array won't fire an event", () => {
			value.on(noop);
			value.set(defaultValue);
			assert.throws(() => tracker.verify(), assert.AssertionError);
		});
	});
});
