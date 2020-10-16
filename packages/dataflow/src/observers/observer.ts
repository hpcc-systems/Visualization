import { Source } from "../activities/activity";
import { each } from "../activities/each";

export type AccessorT<T, U> = (row: T, currentIndex: number) => U;

export interface ObserverFactory<T, U> {
    (): Observer<T, U>;
}

export interface Observer<T, U> {
    observe(r: T, idx: number): void;
    peek(): U;
}

export function Accessor<T = any, U = any, V = any>(fof: ObserverFactory<V, U>, accesor: AccessorT<T, V>): Observer<T, U> {
    const s = fof();

    return {
        observe: (_: T, i: number) => {
            s.observe(accesor(_, i), i);
        },
        peek: s.peek
    };
}

//  This is an pass through activity so a FlowObserver can be inserted into a pipeline ---
export function sensor<T, U = any>(s: Observer<T, U>) {
    return each((r, i) => s.observe(r, i));
}

//  This converts a FlowObserver to an Activity ---
export function activity<T, U>(s: Observer<T, U>) {
    return function* (source: Source<T>) {
        let i = -1;
        for (const row of source) {
            s.observe(row, ++i);
        }
        yield s.peek();
    };
}

//  This converts a FlowObserver to an ScalarActivity ---
export function scalar<T = any, U = any>(s: Observer<T, U>) {
    return function (source: Source<T>) {
        let i = -1;
        for (const row of source) {
            s.observe(row, ++i);
        }
        return s.peek();
    };
}

