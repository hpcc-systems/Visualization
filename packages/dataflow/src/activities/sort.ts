import { IterableActivity, Source, isSource } from "./activity";

export type SortCallback<T> = (a: T, b: T) => number;

function sortGen<T = any>(compareFn?: SortCallback<T>): IterableActivity<T> {
    return function* (source: Source<T>) {
        yield* (Array.isArray(source) ? source : [...source]).sort(compareFn);
    };
}

export function sort<T = any>(callbackFn: SortCallback<T>): IterableActivity<T>;
export function sort<T = any>(source: Source<T>, callbackFn: SortCallback<T>): IterableIterator<T>;
export function sort<T = any>(s_or_cb: Source<T> | SortCallback<T>, callbackFn?: SortCallback<T>): IterableActivity<T> | IterableIterator<T> {
    return isSource(s_or_cb) ? sortGen(callbackFn!)(s_or_cb) : sortGen(s_or_cb);
}

