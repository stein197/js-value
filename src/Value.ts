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

	private readonly observer = new Observer<(oldValue: T, newValue: T) => void>();

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
	public set(value: Partial<T>): void {
		const isObj = isObject(value);
		if (isObj && isEqualable(this.value) && this.value.equals(value))
			return;
		else if (isObj && partiallyEqual(this.value as unknown as object, value as unknown as object) || lodash.isEqual(this.value, value))
			return;
		const oldValue = this.value;
		if (isObj && this.value != null)
			Object.assign(this.value, value);
		else
			this.value = value as T;
		this.observer.notify(oldValue, this.value);
	}

	public addListener(listener: (oldValue: T, newValue: T) => void): void {
		this.observer.addListener(listener);
	}

	public removeListener(listener: (oldValue: T, newValue: T) => void): void {
		this.observer.removeListener(listener);
	}

	public onceListener(listener: (oldValue: T, newValue: T) => void): void {
		this.observer.onceListener(listener);
	}
}

function isObject(obj: any): obj is object {
	return lodash.isObject(obj) && !lodash.isArray(obj);
}

function isEqualable(obj: any): obj is {equals(obj: any): boolean} {
	return obj?.equals && typeof obj.equals === "function";
}

function partiallyEqual(obj1: {[key: string]: any}, obj2: {[key: string]: any}): boolean {
	if (obj1 == null || obj2 == null)
		return obj1 == obj2;
	const intersection = lodash.intersection(Object.keys(obj1), Object.keys(obj2));
	for (const key of intersection) {
		const isObj = isObject(obj1[key]);
		if (isObj && !partiallyEqual(obj1[key], obj2[key]) || !lodash.isEqual(obj1[key], obj2[key]))
			return false;
	}
	return true;
}
