import { IterableActivity, Source, isSource } from "./activity";

export type EachCallback<T> = (value: Readonly<T>, index: number) => void;

function eachGen<T = Readonly<any>>(callbackFn: EachCallback<T>): IterableActivity<T> {
    return function* (source: Source<T>) {
        let i = -1;
        for (const item of source) {
            callbackFn(item, ++i);
            yield item;
        }
    };
}

export function each<T = Readonly<any>>(callbackFn: EachCallback<T>): IterableActivity<T>;
export function each<T = Readonly<any>>(source: Source<T>, callbackFn: EachCallback<T>): IterableIterator<T>;
export function each<T = Readonly<any>>(s_or_cb: Source<T> | EachCallback<T>, callbackFn?: EachCallback<T>): IterableActivity<T> | IterableIterator<T> {
    return isSource(s_or_cb) ? eachGen(callbackFn!)(s_or_cb) : eachGen(s_or_cb);
}
