import { IterableActivity, Source } from "./activity.ts";

//  Array.entries
function entriesGen<T = any>(): IterableActivity<T, [number, T]> {
    return function* (source: Source<T>) {
        let i = -1;
        for (const item of source) {
            yield [++i, item];
        }
    };
}

export function entries<T = any>(): IterableActivity<T, [number, T]>;
export function entries<T>(source: Source<T>): IterableIterator<[number, T]>;
export function entries<T>(source?: Source<T>): IterableActivity<T, [number, T]> | IterableIterator<[number, T]> {
    return source ? entriesGen<T>()(source) : entriesGen<T>();
}
