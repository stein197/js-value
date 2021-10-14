import lodash from "lodash";
import {Observable, Observer} from "@stein197/observer";

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
export default class Value<T> implements Observable<(value: T) => void> {

	private readonly observer = new Observer<(value: T) => void>();

	/**
	 * Instantiates wrapper with passed value.
	 * @param value Initial value.
	 */
	public constructor(private value: T) {}

	/**
	 * Return value.
	 * @returns Value.
	 */
	public get(): T {
		return this.value;
	}

	/**
	 * Set the value and fires listeners on change.
	 * @param value New value
	 */
	public set(value: T): void {
		if (lodash.isEqual(this.value, value))
			return;
		this.value = value;
		this.observer.notify(value);
	}

	public addListener(listener: (value: T) => void): void {
		this.observer.addListener(listener);
	}

	public removeListener(listener: (value: T) => void): void {
		this.observer.removeListener(listener);
	}
}
