import { Source, ScalarActivity, isSource } from "./activity";

export type MinAccessor<T> = (row: T, currentIndex: number) => number;

function minGen<T>(accessor: MinAccessor<T>): ScalarActivity<T, number | undefined> {
    return function (source: Source<T>) {
        let min: number;
        let i = -1;
        for (const row of source) {
            const testMin = accessor(row, ++i);
            if (i === 0) {
                min = testMin;
            } else if (min! > testMin) {
                min = testMin;
            }
        }
        return min!;
    };
}

export function min<T>(accessor: MinAccessor<T>): ScalarActivity<T, number | undefined>;
export function min<T>(source: Source<T>, accessor: MinAccessor<T>): (number | undefined);
export function min<T>(s_or_cb: Source<T> | MinAccessor<T>, accessor?: MinAccessor<T>): ScalarActivity<T, number | undefined> | (number | undefined) {
    return isSource(s_or_cb) ? minGen(accessor!)(s_or_cb) : minGen(s_or_cb);
}
