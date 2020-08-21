import { Source, ScalarActivity, isSource } from "./activity";
import { sort } from "./sort";
import { map } from "./map";

export type MedianAccessor<T> = (row: T, currentIndex: number) => number;

function medianGen<T>(callbackFn: MedianAccessor<T>): ScalarActivity<T, number | undefined> {
    return function (source: Source<T>) {
        const mapped = map(source, callbackFn);
        const sorted: number[] = [...sort(mapped, (l, r) => l - r)];
        const mid = sorted.length / 2;
        if (sorted.length === 0) {
            return undefined;
        } else if (sorted.length % 2 === 0) {
            return (sorted[mid - 1] + sorted[mid]) / 2;
        } else {
            return sorted[Math.floor(mid)];
        }
    };
}

export function median<T>(callbackFn: MedianAccessor<T>): ScalarActivity<T, number | undefined>;
export function median<T>(source: Source<T>, callbackFn: MedianAccessor<T>): (number | undefined);
export function median<T>(s_or_cb: Source<T> | MedianAccessor<T>, callbackFn?: MedianAccessor<T>): ScalarActivity<T, number | undefined> | (number | undefined) {
    return isSource(s_or_cb) ? medianGen(callbackFn!)(s_or_cb) : medianGen(s_or_cb);
}
