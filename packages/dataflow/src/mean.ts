import { Source, ScalarActivity, IScalar, isSource } from "./activity";

export class Mean implements IScalar<number, number | undefined> {

    private total;
    private count;

    next(value: number, i: number): void {
        if (i === 0) {
            this.total = value;
        } else {
            this.total += value;
        }
        this.count = i;
    }

    result(): number | undefined {
        return this.total / (this.count + 1);
    }
}

export type MeanAccessor<T> = (row: T, currentIndex: number) => number;

function meanGen<T>(callbackFn: MeanAccessor<T>): ScalarActivity<T, number | undefined> {
    const mean = new Mean();
    return function (source: Source<T>) {
        let i = -1;
        for (const row of source) {
            mean.next(callbackFn(row, ++i), i);
        }
        return mean.result();
    };
}

export function mean<T>(callbackFn: MeanAccessor<T>): ScalarActivity<T, number | undefined>;
export function mean<T>(source: Source<T>, callbackFn: MeanAccessor<T>): (number | undefined);
export function mean<T>(s_or_cb: Source<T> | MeanAccessor<T>, callbackFn?: MeanAccessor<T>): ScalarActivity<T, number | undefined> | (number | undefined) {
    return isSource(s_or_cb) ? meanGen(callbackFn!)(s_or_cb) : meanGen(s_or_cb);
}
