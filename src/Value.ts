import lodash from "lodash";
import {Observer} from "@stein197/observer";
import {ReadonlyValue} from "./ReadonlyValue";

/**
 * Observable class which wraps passed values and observes them to change.
 * Usage:
 * ```ts
 * const value = new Value("string");
 * value.addListener(string => console.log(string));
 * value.set("new string");
 * > "string"
 * ```
 * Complex values can also be observed.
 * @typaParam T - Type of passed value.
 */
export class Value<T> implements ReadonlyValue<T> {

	private readonly observer = new Observer<(value: T) => void>();

	/**
	 * Instantiates wrapper with passed value.
	 * @param value Initial value.
	 */
	public constructor(private value: T) {}

	public get(): T {
		return this.value;
	}

	/**
	 * Set the value and fires listeners on change.
	 * @param value New value
	 */
	public set(value: T): void {
		const isObject = lodash.isObject(value) && !lodash.isArray(value)
		if (isObject && Value.partiallyEqual(this.value as unknown as object, value as unknown as object) || lodash.isEqual(this.value, value))
				return;
		if (isObject)
			Object.assign(this.value, value);
		else
			this.value = value;
		this.observer.notify(this.value);
	}

	public addListener(listener: (value: T) => void): void {
		this.observer.addListener(listener);
	}

	public removeListener(listener: (value: T) => void): void {
		this.observer.removeListener(listener);
	}

	private static partiallyEqual(obj1: {[key: string]: any}, obj2: {[key: string]: any}): boolean {
		const intersection = lodash.intersection(Object.keys(obj1), Object.keys(obj2));
		for (const key of intersection) {
			const isObject = lodash.isObject(obj1[key]) && !lodash.isArray(obj1[key]);
			if (isObject && !Value.partiallyEqual(obj1[key], obj2[key]) || !lodash.isEqual(obj1[key], obj2[key]))
				return false;
		}
		return true;
	}
}
