const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

export function verboseDeepEquals(a: any, b: any) {
    if (a === b) return true;

    if (a && b) {
        if (typeof a === "object" && typeof b === "object") {
            const arrA = isArray(a);
            const arrB = isArray(b);
            let i;
            let length;
            let key;

            if (arrA && arrB) {
                length = a.length;
                if (length !== b.length) {
                    console.warn(`lengths not equal: ${length} !== ${b.length}`);
                    return false;
                }
                for (i = length; i-- !== 0;)
                    if (!verboseDeepEquals(a[i], b[i])) {
                        return false;
                    }
                return true;
            }

            if (arrA !== arrB) {
                console.warn(`arrays not equal: ${arrA} !== ${arrB}`);
                return false;
            }

            const dateA = a instanceof Date;
            const dateB = b instanceof Date;
            if (dateA !== dateB) {
                console.warn(`dates not equal: ${dateA} !== ${dateB}`);
                return false;
            }
            if (dateA && dateB) {
                const retVal = a.getTime() === b.getTime();
                if (!retVal) {
                    console.warn(`dates not equal: ${a.getTime()} !== ${b.getTime()}`);
                }
                return retVal;
            }

            const regexpA = a instanceof RegExp;
            const regexpB = b instanceof RegExp;
            if (regexpA !== regexpB) {
                console.warn(`regexps not equal: ${regexpA} !== ${regexpB}`);
                return false;
            }
            if (regexpA && regexpB) {
                const retVal = a.toString() === b.toString();
                if (!retVal) {
                    console.warn(`regexps not equal: ${a.toString()} !== ${b.toString()}`);
                }
                return retVal;
            }

            const keys = keyList(a);
            length = keys.length;

            if (length !== keyList(b).length) {
                console.warn(`key lengths not equal: ${length} !== ${keyList(b).length}`);
                return false;
            }

            for (i = length; i-- !== 0;)
                if (!hasProp.call(b, keys[i])) {
                    console.warn(`${keys[i]} in a but not b`);
                    return false;
                }

            for (i = length; i-- !== 0;) {
                key = keys[i];
                if (!verboseDeepEquals(a[key], b[key])) {
                    return false;
                }
            }

            return true;
        } else if (typeof a === "function" && typeof b === "function") {
            const retVal = a.toString() === b.toString();
            if (!retVal) {
                console.warn(`functions not equal: ${a.toString()} !== ${b.toString()}`);
            }
            return retVal;
        }
    }

    const retVal = a !== a && b !== b;
    if (!retVal) {
        console.warn(`values not equal: ${a} !== ${b}`);
    }
    return retVal;
}

export function deepEquals(a: any, b: any) {
    if (a === b) return true;

    if (a && b) {
        if (typeof a === "object" && typeof b === "object") {
            const arrA = isArray(a);
            const arrB = isArray(b);
            let i;
            let length;
            let key;

            if (arrA && arrB) {
                length = a.length;
                if (length !== b.length) return false;
                for (i = length; i-- !== 0;)
                    if (!deepEquals(a[i], b[i])) return false;
                return true;
            }

            if (arrA !== arrB) return false;

            const dateA = a instanceof Date;
            const dateB = b instanceof Date;
            if (dateA !== dateB) return false;
            if (dateA && dateB) return a.getTime() === b.getTime();

            const regexpA = a instanceof RegExp;
            const regexpB = b instanceof RegExp;
            if (regexpA !== regexpB) return false;
            if (regexpA && regexpB) return a.toString() === b.toString();

            const keys = keyList(a);
            length = keys.length;

            if (length !== keyList(b).length)
                return false;

            for (i = length; i-- !== 0;)
                if (!hasProp.call(b, keys[i])) return false;

            for (i = length; i-- !== 0;) {
                key = keys[i];
                if (!deepEquals(a[key], b[key])) return false;
            }

            return true;
        } else if (typeof a === "function" && typeof b === "function") {
            return a.toString() === b.toString();
        }
    }

    return a !== a && b !== b;
}

export function update<T>(origItem: T, newItem: T): T {
    return deepEquals(origItem, newItem) ? origItem : newItem;
}
