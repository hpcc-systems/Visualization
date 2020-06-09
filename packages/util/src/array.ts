// Based on:  https://tc39.github.io/ecma262/#sec-array.prototype.find
export function find<T>(o: ReadonlyArray<T>, predicate: (value: T, index: number) => boolean) {
    // 1. Let O be ? ToObject(this value).
    if (o == null) {
        throw new TypeError('"o" is null or not defined');
    }

    // 2. Let len be ? ToLength(? Get(O, "length")).
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

export interface IDifferences2<T> {
    update: T[];
    exit: T[];
    enter: T[];
}

export function compare<T>(before: readonly T[], after: readonly T[]): IDifferences2<T> {
    const retVal: IDifferences2<T> = {
        update: [],
        exit: [],
        enter: [...after]
    };
    for (const row of before) {
        const otherIdx = retVal.enter.indexOf(row);
        if (otherIdx >= 0) {
            retVal.update.push(row);
            retVal.enter.splice(otherIdx, 1);
        } else {
            retVal.exit.push(row);
        }
    }
    return retVal;
}

export interface IDifferences2<T> {
    enter: T[];
    update: T[];
    exit: T[];
}

export function compare2<T>(before: readonly T[], after: readonly T[], idFunc: (itme: T) => string | number, updateFunc: (before: T, after: T) => T = (before, after) => after): IDifferences2<T> {
    const retVal: IDifferences2<T> = {
        update: [],
        exit: [],
        enter: []
    };
    if (before === after) {
        retVal.update = before as T[];
        return retVal;
    }
    const unknownMap: { [key: string]: T } = {};
    after.forEach(item => {
        unknownMap[idFunc(item)] = item;
    });
    for (const row of before) {
        const id = idFunc(row);
        const item = unknownMap[id];
        if (item !== undefined) {
            delete unknownMap[id];
            retVal.update.push(updateFunc(row, item));
        } else {
            retVal.exit.push(row);
        }
    }
    for (const key in unknownMap) {
        retVal.enter.push(unknownMap[key]);
    }
    return retVal;
}
