import { IterableActivity, Source, isSource } from "./activity.ts";

export type MapCallback<T, U> = (row: T, index: number) => U;

function mapGen<T = any, U = any>(callbackFn: MapCallback<T, U>): IterableActivity<T, U> {
    return function* (source: Source<T>) {
        let i = -1;
        for (const item of source) {
            yield callbackFn(item, ++i);
        }
    };
}

export function map<T, U>(callbackFn: MapCallback<T, U>): IterableActivity<T, U>;
export function map<T, U>(source: Source<T>, callbackFn: MapCallback<T, U>): IterableIterator<U>;
export function map<T, U>(s_or_cb: Source<T> | MapCallback<T, U>, callbackFn?: MapCallback<T, U>): IterableActivity<T, U> | IterableIterator<U> {
    return isSource(s_or_cb) ? mapGen(callbackFn!)(s_or_cb) : mapGen(s_or_cb);
}
