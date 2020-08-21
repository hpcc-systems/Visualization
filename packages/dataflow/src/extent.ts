import { Source, ScalarActivity, isSource } from "./activity";
import { Max } from "./max";
import { Min } from "./min";

export type ExtentCallback<T> = (row: T, currentIndex: number) => number;

type ExtentT = [number, number] | undefined;

function extentGen<T>(callbackFn: ExtentCallback<T>): ScalarActivity<T, ExtentT> {
    const min = new Min();
    const max = new Max();
    return function (source: Source<T>) {
        let i = -1;
        for (const row of source) {
            const value = callbackFn(row, ++i);
            min.next(value, i);
            max.next(value, i);
        }
        if (i < 0) {
            return undefined;
        }
        return [min.result()!, max.result()!];
    };
}

export function extent<T>(callbackFn: ExtentCallback<T>): ScalarActivity<T, ExtentT>;
export function extent<T>(source: Source<T>, callbackFn: ExtentCallback<T>): ExtentT;
export function extent<T>(s_or_cb: Source<T> | ExtentCallback<T>, callbackFn?: ExtentCallback<T>): ScalarActivity<T, ExtentT> | (ExtentT) {
    return isSource(s_or_cb) ? extentGen(callbackFn!)(s_or_cb) : extentGen(s_or_cb);
}
