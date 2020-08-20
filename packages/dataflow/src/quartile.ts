import { Source, ScalarActivity, isSource } from "./activity";
import { sort } from "./sort";
import { map } from "./map";
import { median } from "./median";

export type QuartileAccessor<T> = (row: T, currentIndex: number) => number;

type QuartileT = [number, number, number, number, number] | undefined;

function quartileGen<T>(callbackFn: QuartileAccessor<T>): ScalarActivity<T, QuartileT> {
    return function (source: Source<T>) {
        const mapped = map(source, callbackFn);
        const sorted: number[] = [...sort(mapped, (l, r) => l - r)];
        const mid = sorted.length / 2;
        let medianVal: number;
        let lower: number[];
        let upper: number[];
        if (sorted.length < 2) {
            return undefined;
        } else if (sorted.length % 2 === 0) {
            medianVal = (sorted[mid - 1] + sorted[mid]) / 2;
            lower = sorted.slice(0, mid);
            upper = sorted.slice(mid);
        } else {
            medianVal = sorted[Math.floor(mid)];
            lower = sorted.slice(0, Math.floor(mid));
            upper = sorted.slice(Math.ceil(mid));
        }
        return [sorted[0], median(lower, n => n)!, medianVal, median(upper, n => n)!, sorted[sorted.length - 1]];
    };
}

export function quartile<T>(callbackFn: QuartileAccessor<T>): ScalarActivity<T, QuartileT>;
export function quartile<T>(source: Source<T>, callbackFn: QuartileAccessor<T>): (QuartileT);
export function quartile<T>(s_or_cb: Source<T> | QuartileAccessor<T>, callbackFn?: QuartileAccessor<T>): ScalarActivity<T, QuartileT> | (QuartileT) {
    return isSource(s_or_cb) ? quartileGen(callbackFn!)(s_or_cb) : quartileGen(s_or_cb);
}
