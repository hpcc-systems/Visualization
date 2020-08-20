import { Source, ScalarActivity, IScalar, isSource } from "./activity";

export class Variance implements IScalar<number, number | undefined> {

    private count;
    private mean;
    private sum;

    next(value: number, i: number): void {
        if (i === 0) {
            this.count = 0;
            this.mean = 0;
            this.sum = 0;
        }
        const delta = value - this.mean;
        this.mean += delta / ++this.count;
        this.sum += delta * (value - this.mean);
    }

    result(): number | undefined {
        if (this.count > 1) {
            return this.sum / (this.count - 1);
        }
    }
}

export type VarianceCallback<T> = (row: T, currentIndex: number) => number;

function varianceGen<T>(callbackFn: VarianceCallback<T>): ScalarActivity<T, number | undefined> {
    const variance = new Variance();
    return function (source: Source<T>) {
        let i = -1;
        for (const row of source) {
            variance.next(callbackFn(row, ++i), i);
        }
        return variance.result();
    };
}

export function variance<T>(callbackFn: VarianceCallback<T>): ScalarActivity<T, number | undefined>;
export function variance<T>(source: Source<T>, callbackFn: VarianceCallback<T>): (number | undefined);
export function variance<T>(s_or_cb: Source<T> | VarianceCallback<T>, callbackFn?: VarianceCallback<T>): ScalarActivity<T, number | undefined> | (number | undefined) {
    return isSource(s_or_cb) ? varianceGen(callbackFn!)(s_or_cb) : varianceGen(s_or_cb);
}
