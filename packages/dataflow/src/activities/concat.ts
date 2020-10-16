import { Source, IterableActivity } from "./activity";

function concatGen<T = any>(concatSource: Source<T>): IterableActivity<T> {
    return function* (source: Source<T>) {
        yield* source;
        yield* concatSource;
    };
}

export function concat<T = any>(concatSource: Source<T>): IterableActivity<T, T>;
export function concat<T>(source: Source<T>, concatSource: Source<T>): IterableIterator<T>;
export function concat<T = any>(s_or_n: Source<T>, concatSource?: Source<T>): IterableActivity<T, T> | IterableIterator<T> {
    return concatSource !== undefined ? concatGen<T>(concatSource!)(s_or_n) : concatGen<T>(s_or_n);
}
