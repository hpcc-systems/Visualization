import { Source, ScalarActivity, isSource } from "./activity";

export type VarianceCallback<T> = (row: T, currentIndex: number) => number;

function varianceGen<T>(callbackFn: VarianceCallback<T>): ScalarActivity<T, number | undefined> {
    return function (source: Source<T>) {
        let count = 0;
        let mean = 0;
        let sum = 0;
        let i = -1;
        for (const row of source) {
            const value = callbackFn(row, ++i);
            const delta = value - mean;
            mean += delta / ++count;
            sum += delta * (value - mean);
        }
        if (count > 1) {
            return sum / (count - 1);
        }
    };
}

export function variance<T>(callbackFn: VarianceCallback<T>): ScalarActivity<T, number | undefined>;
export function variance<T>(source: Source<T>, callbackFn: VarianceCallback<T>): (number | undefined);
export function variance<T>(s_or_cb: Source<T> | VarianceCallback<T>, callbackFn?: VarianceCallback<T>): ScalarActivity<T, number | undefined> | (number | undefined) {
    return isSource(s_or_cb) ? varianceGen(callbackFn!)(s_or_cb) : varianceGen(s_or_cb);
}
