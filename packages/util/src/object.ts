/**
 * inner - return inner property of Object
 * Usage:  inner("some.prop.to.locate", obj);
 *
 * @param prop - property to locate
 * @param obj - object to locate property in
 */
export function inner(prop: string, obj: any): any {
    if (prop === void 0 || obj === void 0) return void 0;
    for (const item of prop.split(".")) {
        if (!obj.hasOwnProperty(item)) {
            return undefined;
        }
        obj = obj[item];
    }
    return obj;
}

/**
 * exists - return true if inner property of Object exists
 * Usage:  exists("some.prop.to.locate", obj);
 *
 * @param prop - property to locate
 * @param obj - object to locate property in
 */
export function exists(prop: string, obj: any): boolean {
    return inner(prop, obj) !== undefined;
}

function _mixin(dest: any, source: any): any {
    const empty: any = {};
    for (const key in source) {
        let s: any = source[key];
        if (s instanceof Array) {
            //  TODO:  Do we need to support arrays?
        } else if (typeof s === "object") {
            s = deepMixin(dest[key], s);
        }
        if (!(key in dest) || (dest[key] !== s && (!(key in empty) || empty[key] !== s))) {
            dest[key] = s;
        }
    }
    return dest;
}

/**
 * deepMixin - combine several objects from right to left
 * Usage:  deepMixin({a: "a"}, {b: "b"});
 *
 * @param dest - target object to mix into.
 * @param sources - objects to mix in
 */
export function deepMixin(dest: any = {}, ...sources: any[]): any {
    if (typeof dest !== "object") throw new Error(`Destination "${dest}" must be an object.`);
    for (const source of sources) {
        _mixin(dest, source);
    }
    return dest;
}

/**
 * deepMixinT - combine several objects of Partial<T> from right to left
 * Usage:  deepMixinT<MyInterface>({a: "a"}, {b: "b"});
 *
 * Note:  Only provided as a convenience, so user gets auto completion based on destination type.
 *
 * @param dest - target object to mix into.
 * @param sources - objects to mix in
 */
export function deepMixinT<T>(dest: Partial<T> = {}, ...sources: Array<Partial<T>>): T {
    return deepMixin(dest, ...sources);
}

/**
 * safeStingify - JSONsimilar to .stringify, except ignores circular references.
 * Usage:  safeStingify(object);
 *
 * @param obj - any object.
 */
export function safeStringify(obj: object) {
    const cache: any[] = [];
    return JSON.stringify(obj, function (key, value) {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }

            cache.push(value);
        }
        return value;
    });
}

export function isArray(arg: any): arg is any[] {
    if (Array.isArray !== undefined) {
        return Array.isArray(arg);
    }
    return Object.prototype.toString.call(arg) === "[object Array]";
}

export interface ClassMeta {
    module: string;
    file: string;
    class: string;
}

export function classID2Meta(classID: string): ClassMeta {
    const info = classID.split("_");
    const classInfo = info[1].split(".");
    return {
        module: `@hpcc-js/${info[0]}`,
        file: classInfo[0],
        class: classInfo[1] || classInfo[0]
    };
}
