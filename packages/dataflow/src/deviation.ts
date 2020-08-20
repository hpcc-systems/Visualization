import { Source, ScalarActivity, isSource } from "./activity";
import { variance } from "./variance";

export type DeviationCallback<T> = (row: T, currentIndex: number) => number;

function deviationGen<T>(callbackFn: DeviationCallback<T>): ScalarActivity<T, number | undefined> {
    const varianceFunc = variance(callbackFn);
    return function (source: Source<T>) {
        const v = varianceFunc(source);
        return v !== undefined ? Math.sqrt(v) : v;
    };
}

export function deviation<T>(callbackFn: DeviationCallback<T>): ScalarActivity<T, number | undefined>;
export function deviation<T>(source: Source<T>, callbackFn: DeviationCallback<T>): (number | undefined);
export function deviation<T>(s_or_cb: Source<T> | DeviationCallback<T>, callbackFn?: DeviationCallback<T>): ScalarActivity<T, number | undefined> | (number | undefined) {
    return isSource(s_or_cb) ? deviationGen(callbackFn!)(s_or_cb) : deviationGen(s_or_cb);
}
