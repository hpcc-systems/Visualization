import { IterableActivity, Source, isSource, ScalarActivity } from "../activities/activity";

const GeneratorFunction = (function* () { }).constructor;

function chainGen<T, U>(...items: (IterableActivity<unknown, unknown> | ScalarActivity<unknown, unknown>)[]): IterableActivity<T, U> {
    if (items[items.length - 1] instanceof GeneratorFunction) {
        return function* (source) {
            // @ts-ignore
            let tail: IterableIterator<U> = source;
            for (const activity of items) {
                // @ts-ignore
                tail = activity(tail);
            }
            yield* tail;
        };
    } else {
        return function (source) {
            // @ts-ignore
            let tail: IterableIterator<U> = source;
            for (const activity of items) {
                // @ts-ignore
                tail = activity(tail);
            }
            return tail;
        };
    }
}

//  TODO:  Switch to TS Variadic Types in 4.0
export function pipe<T, U>(head: IterableActivity<T, U>): IterableActivity<T, U>;
export function pipe<T, U>(head: ScalarActivity<T, U>): ScalarActivity<T, U>;
export function pipe<T, U>(source: Source<T>): IterableIterator<U>;
export function pipe<T, I1, U>(head: IterableActivity<T, I1>, tail: IterableActivity<I1, U>): IterableActivity<T, U>;
export function pipe<T, I1, U>(head: IterableActivity<T, I1>, tail: ScalarActivity<I1, U>): ScalarActivity<T, U>;
export function pipe<T, U>(source: Source<T>, head: IterableActivity<T, U>): IterableIterator<U>;
export function pipe<T, U>(source: Source<T>, head: ScalarActivity<T, U>): U;
export function pipe<T, I1, I2, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, tail: IterableActivity<I2, U>): IterableActivity<T, U>;
export function pipe<T, I1, I2, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, tail: ScalarActivity<I2, U>): ScalarActivity<T, U>;
export function pipe<T, I1, U>(source: Source<T>, head: IterableActivity<T, I1>, tail: IterableActivity<I1, U>): IterableIterator<U>;
export function pipe<T, I1, U>(source: Source<T>, head: IterableActivity<T, I1>, tail: ScalarActivity<I1, U>): U;
export function pipe<T, I1, I2, I3, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, tail: IterableActivity<I3, U>): IterableActivity<T, U>;
export function pipe<T, I1, I2, I3, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, tail: ScalarActivity<I3, U>): ScalarActivity<T, U>;
export function pipe<T, I1, I2, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, tail: IterableActivity<I1, U>): IterableIterator<U>;
export function pipe<T, I1, I2, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, tail: ScalarActivity<I1, U>): U;
export function pipe<T, I1, I2, I3, I4, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, tail: IterableActivity<I4, U>): IterableActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, tail: ScalarActivity<I4, U>): ScalarActivity<T, U>;
export function pipe<T, I1, I2, I3, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, tail: IterableActivity<I3, U>): IterableIterator<U>;
export function pipe<T, I1, I2, I3, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, tail: ScalarActivity<I3, U>): U;
export function pipe<T, I1, I2, I3, I4, I5, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, tail: IterableActivity<I5, U>): IterableActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, I5, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, tail: ScalarActivity<I5, U>): ScalarActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, tail: IterableActivity<I4, U>): IterableIterator<U>;
export function pipe<T, I1, I2, I3, I4, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, tail: ScalarActivity<I4, U>): U;
export function pipe<T, I1, I2, I3, I4, I5, I6, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, tail: IterableActivity<I6, U>): IterableActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, I5, I6, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, tail: ScalarActivity<I6, U>): ScalarActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, I5, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, tail: IterableActivity<I5, U>): IterableIterator<U>;
export function pipe<T, I1, I2, I3, I4, I5, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, tail: ScalarActivity<I5, U>): U;
export function pipe<T, I1, I2, I3, I4, I5, I6, I7, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, i6: IterableActivity<I6, I7>, tail: IterableActivity<I7, U>): IterableActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, I5, I6, I7, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, i6: IterableActivity<I6, I7>, tail: ScalarActivity<I7, U>): ScalarActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, I5, I6, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, tail: IterableActivity<I6, U>): IterableIterator<U>;
export function pipe<T, I1, I2, I3, I4, I5, I6, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, tail: ScalarActivity<I6, U>): U;
export function pipe<T, I1, I2, I3, I4, I5, I6, I7, I8, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, i6: IterableActivity<I6, I7>, i7: IterableActivity<I7, I8>, tail: IterableActivity<I8, U>): IterableActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, I5, I6, I7, I8, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, i6: IterableActivity<I6, I7>, i7: IterableActivity<I7, I8>, tail: ScalarActivity<I8, U>): ScalarActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, I5, I6, I7, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, i6: IterableActivity<I6, I7>, tail: IterableActivity<I7, U>): IterableIterator<U>;
export function pipe<T, I1, I2, I3, I4, I5, I6, I7, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, i6: IterableActivity<I6, I7>, tail: ScalarActivity<I7, U>): U;
export function pipe<T, I1, I2, I3, I4, I5, I6, I7, I8, I9, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, i6: IterableActivity<I6, I7>, i7: IterableActivity<I7, I8>, i8: IterableActivity<I8, I9>, tail: IterableActivity<I9, U>): IterableActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, I5, I6, I7, I8, I9, U>(head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, i6: IterableActivity<I6, I7>, i7: IterableActivity<I7, I8>, i8: IterableActivity<I8, I9>, tail: ScalarActivity<I9, U>): ScalarActivity<T, U>;
export function pipe<T, I1, I2, I3, I4, I5, I6, I7, I8, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, i6: IterableActivity<I6, I7>, i7: IterableActivity<I7, I8>, tail: IterableActivity<I8, U>): IterableIterator<U>;
export function pipe<T, I1, I2, I3, I4, I5, I6, I7, I8, U>(source: Source<T>, head: IterableActivity<T, I1>, i1: IterableActivity<I1, I2>, i2: IterableActivity<I2, I3>, i3: IterableActivity<I3, I4>, i4: IterableActivity<I4, I5>, i5: IterableActivity<I5, I6>, i6: IterableActivity<I6, I7>, i7: IterableActivity<I7, I8>, tail: ScalarActivity<I8, U>): U;
export function pipe<T, U = any>(s_or_ia: Source<T> | IterableActivity<T, U>, ...items: (IterableActivity<unknown, unknown> | ScalarActivity<unknown, unknown>)[]): IterableActivity<T, U> | ScalarActivity<T, U> | IterableIterator<U> {
    return isSource(s_or_ia) ? chainGen<T, U>(...items)(s_or_ia) : chainGen(s_or_ia, ...items);
}

//  Maintain backward compatibility
export const chain = pipe;
