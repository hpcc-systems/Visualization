import { Source, ScalarActivity, IScalar, isSource } from "./activity";

export class Max implements IScalar<number, number | undefined> {

    private max: number;

    next(value: number, i: number): void {
        if (i === 0) {
            this.max = value;
        } else if (this.max! < value) {
            this.max = value;
        }
    }

    result(): number | undefined {
        return this.max;
    }
}

export type MaxCallback<T> = (row: T, currentIndex: number) => number;

function maxGen<T>(callbackFn: MaxCallback<T>): ScalarActivity<T, number | undefined> {
    const max = new Max();
    return function (source: Source<T>) {
        let i = -1;
        for (const row of source) {
            max.next(callbackFn(row, ++i), i);
        }
        return max.result();
    };
}

export function max<T>(callbackFn: MaxCallback<T>): ScalarActivity<T, number | undefined>;
export function max<T>(source: Source<T>, callbackFn: MaxCallback<T>): (number | undefined);
export function max<T>(s_or_cb: Source<T> | MaxCallback<T>, callbackFn?: MaxCallback<T>): ScalarActivity<T, number | undefined> | (number | undefined) {
    return isSource(s_or_cb) ? maxGen(callbackFn!)(s_or_cb) : maxGen(s_or_cb);
}
