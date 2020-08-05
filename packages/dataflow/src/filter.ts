import { IterableActivity, Source, isSource } from "./activity";

export type FilterCallback<T> = (value: T, index: number) => boolean;

function filterGen<T = any>(callbackFn: FilterCallback<T>): IterableActivity<T> {
    return function* (source: Source<T>) {
        let i = -1;
        for (const item of source) {
            if (callbackFn(item, ++i)) {
                yield item;
            }
        }
    };
}

export function filter<T = any>(callbackFn: FilterCallback<T>): IterableActivity<T>;
export function filter<T>(source: Source<T>, callbackFn: FilterCallback<T>): IterableIterator<T>;
export function filter<T>(s_or_cb: Source<T> | FilterCallback<T>, callbackFn?: FilterCallback<T>): IterableActivity<T> | IterableIterator<T> {
    return isSource(s_or_cb) ? filterGen(callbackFn!)(s_or_cb) : filterGen(s_or_cb);
}
