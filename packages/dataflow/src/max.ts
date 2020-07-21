import { Source, ScalarActivity, isSource } from "./activity";

export type MaxCallback<T> = (row: T, currentIndex: number) => number;

function maxGen<T>(callbackFn: MaxCallback<T>): ScalarActivity<T, number | undefined> {
    return function (source: Source<T>) {
        let max: number;
        let i = -1;
        for (const row of source) {
            const testMax = callbackFn(row, ++i);
            if (i === 0) {
                max = testMax;
            } else if (max! < testMax) {
                max = testMax;
            }
        }
        return max!;
    }
}

export function max<T>(callbackFn: MaxCallback<T>): ScalarActivity<T, number | undefined>;
export function max<T>(source: Source<T>, callbackFn: MaxCallback<T>): (number | undefined);
export function max<T>(s_or_cb: Source<T> | MaxCallback<T>, callbackFn?: MaxCallback<T>): ScalarActivity<T, number | undefined> | (number | undefined) {
    return isSource(s_or_cb) ? maxGen(callbackFn!)(s_or_cb) : maxGen(s_or_cb);
}
