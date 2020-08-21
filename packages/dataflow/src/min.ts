import { Source, ScalarActivity, IScalar, isSource } from "./activity";

export class Min implements IScalar<number, number | undefined> {

    private min: number;

    next(value: number, i: number): void {
        if (i === 0) {
            this.min = value;
        } else if (this.min! > value) {
            this.min = value;
        }
    }

    result(): number | undefined {
        return this.min;
    }
}

export type MinAccessor<T> = (row: T, currentIndex: number) => number;

function minGen<T>(callbackFn: MinAccessor<T>): ScalarActivity<T, number | undefined> {
    const min = new Min();
    return function (source: Source<T>) {
        let i = -1;
        for (const row of source) {
            min.next(callbackFn(row, ++i), i);
        }
        return min.result();
    };
}

export function min<T>(callbackFn: MinAccessor<T>): ScalarActivity<T, number | undefined>;
export function min<T>(source: Source<T>, callbackFn: MinAccessor<T>): (number | undefined);
export function min<T>(s_or_cb: Source<T> | MinAccessor<T>, callbackFn?: MinAccessor<T>): ScalarActivity<T, number | undefined> | (number | undefined) {
    return isSource(s_or_cb) ? minGen(callbackFn!)(s_or_cb) : minGen(s_or_cb);
}
