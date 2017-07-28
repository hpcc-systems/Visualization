// Based on:  https://tc39.github.io/ecma262/#sec-array.prototype.find
export function find<T>(o: T[], predicate: (value: T, index: number) => boolean) {
    // 1. Let O be ? ToObject(this value).
    if (o == null) {
        throw new TypeError('"o" is null or not defined');
    }

    // 2. Let len be ? ToLength(? Get(O, "length")).
    // tslint:disable-next-line:no-bitwise
    const len = o.length >>> 0;

    // 3. If IsCallable(predicate) is false, throw a TypeError exception.
    if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
    }

    // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
    const thisArg = arguments[1];

    // 5. Let k be 0.
    let k = 0;

    // 6. Repeat, while k < len
    while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        const kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
        }
        // e. Increase k by 1.
        k++;
    }

    // 7. Return undefined.
    return undefined;
}
