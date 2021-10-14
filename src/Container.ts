import {EventEmitter} from "@stein197/observer";
import Value from "./Value";

export default class Container<T extends {[K: string]: any}> implements EventEmitter<{[K in keyof T]: (value: T[K]) => void}> {

	private readonly values: {[K in keyof T]: Value<T[K]>} = {} as {[K in keyof T]: Value<T[K]>};

	public constructor(values: T) {
		for (const [key, value] of Object.entries(values))
			this.values[key as keyof T] = new Value(value);
	}

	public get<K extends keyof T>(key: K): T[K] {
		return this.values[key].get();
	}

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
