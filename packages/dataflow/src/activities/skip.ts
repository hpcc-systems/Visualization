import { IterableActivity, Source, isSource } from "./activity";

function skipGen<T = any>(n: number): IterableActivity<T, T> {
    return function* (source: Source<T>) {
        let i = -1;
        for (const item of source) {
            if (++i >= n) {
                yield item;
            }
        }
    };
}

export function skip<T = any>(n: number): IterableActivity<T, T>;
export function skip<T>(source: Source<T>, n: number): IterableIterator<T>;
export function skip<T = any>(s_or_n: Source<T> | number, n?: number): IterableActivity<T, T> | IterableIterator<T> {
    return isSource(s_or_n) ? skipGen<T>(n!)(s_or_n) : skipGen<T>(s_or_n);
}
