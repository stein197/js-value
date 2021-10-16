import {ReadonlyContainer} from "./ReadonlyContainer";
import {Value} from "./Value";

/**
 * Observable class which wraps map of values and observes on them.
 * Usage:
 * ```ts
 * const container = new Container({
 *     created: new Date(),
 *     id: 1,
 *     params: {
 *         arg1: 12,
 *         // ...
 *     }
 * });
 * container.addEventListener("params", params => console.log(params.arg1));
 * container.set("params", {arg1: 20});
 * > 20
 * ```
 * @typaParam T - Type of passed value.
 */
export class Container<T extends {[K: string]: any}> implements ReadonlyContainer<T> {

	private readonly values: {[K in keyof T]: Value<T[K]>} = {} as {[K in keyof T]: Value<T[K]>};

	/**
	 * Create observable wrapper around map of values.
	 * @param values Initial map values.
	 */
	public constructor(values: T) {
		for (const [key, value] of Object.entries(values))
			this.values[key as keyof T] = new Value(value);
	}

	public get<K extends keyof T>(key: K): T[K] {
		return this.values[key].get();
	}

	/**
	 * Set value by its key
	 * @param key Key by which value is set.
	 * @param value New value.
	 */
	public set<K extends keyof T>(key: K, value: T[K]): void {
		this.values[key].set(value);
	}

	public addEventListener<K extends keyof T>(key: K, listener: (value: T[K]) => void): void {
		this.values[key].addListener(listener);
	}

	public removeEventListener<K extends keyof T>(key: K, listener: (value: T[K]) => void): void {
		this.values[key].removeListener(listener)
	}
}
