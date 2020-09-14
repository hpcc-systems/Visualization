import { IterableActivity, Source, isSource } from "./activity";

export type EachCallback<T> = (value: T, index: number) => void;

function eachGen<T = any>(callbackFn: EachCallback<T>): IterableActivity<T> {
    return function* (source: Source<T>) {
        let i = -1;
        for (const item of source) {
            callbackFn(item, ++i);
            yield item;
        }
    };
}

export function each<T = any>(callbackFn: EachCallback<T>): IterableActivity<T>;
export function each<T>(source: Source<T>, callbackFn: EachCallback<T>): IterableIterator<T>;
export function each<T>(s_or_cb: Source<T> | EachCallback<T>, callbackFn?: EachCallback<T>): IterableActivity<T> | IterableIterator<T> {
    return isSource(s_or_cb) ? eachGen(callbackFn!)(s_or_cb) : eachGen(s_or_cb);
}
