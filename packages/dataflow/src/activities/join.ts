import { IterableActivity, Source, isSource } from "./activity.ts";

export type JoinCallback<T, U, V> = (rowT: T, rowU: U, index: number) => V;

function joinGen<T = any, U = any, V = any>(_sourceU: Source<U>, callbackFn: JoinCallback<T, U, V>): IterableActivity<T, V> {
    const sourceB = Array.isArray(_sourceU) ? _sourceU[Symbol.iterator]() : _sourceU;
    return function* (sourceT: Source<T>) {
        let i = -1;
        for (const item of sourceT) {
            yield callbackFn(item, sourceB.next().value, ++i);
        }
    };
}

export function join<T, U, V>(sourceU: Source<U>, callbackFn: JoinCallback<T, U, V>): IterableActivity<T, V>;
export function join<T, U, V>(sourceU: Source<U>, callbackFn: JoinCallback<T, U, V>): IterableIterator<V>;
export function join<T, U, V>(sT_or_sU: Source<T> | Source<U>, sU_or_cb: Source<U> | JoinCallback<T, U, V>, callbackFn?: JoinCallback<T, U, V>): IterableActivity<T, V> | IterableIterator<V> {
    return isSource(sU_or_cb) ? joinGen(sU_or_cb, callbackFn!)(sT_or_sU as Source<T>) : joinGen(sT_or_sU as Source<U>, sU_or_cb);
}
