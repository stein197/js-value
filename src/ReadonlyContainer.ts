import {EventEmitter} from "@stein197/observer";

/**
 * Represents a read-only value container that can be observed. Could be used as a signature of a function argument or
 * as an interface that any container-based class could implement to provide only read-only abilities to the outer
 * world. For example:
 * ```ts
 * function setupListeners(values: ReadonlyContainer<{age: number}>): void {
 *     values.addEventListener("age", console.log);
 *     values.get("age"); // OK
 *     values.set("age", 1); // Compile-time error
 * }
 * // or
 * class SomeContainer implements ReadonlyContainer<{age: number}> {
 *     // ...
 * }
 * const container = new SomeContainer();
 * container.get("age"); // OK
 * container.set("age", 1); // Compile-time error
 * ```
 * @typeParam T - Type of value.
 */
export interface ReadonlyContainer<T extends {[K: string]: any}> extends EventEmitter<{[K in keyof T]: (value: T[K]) => void}> {

	/**
	 * Return value by its key.
	 * @param key Key by which value is returned.
	 * @returns Value.
	 */
	get<K extends keyof T>(key: K): T[K];
}
