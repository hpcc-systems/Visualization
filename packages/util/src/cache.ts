import { hashSum } from "./hashSum";

export class Cache<I, C> {
    private _cache: { [id: string]: C } = {};
    private _calcID: (espObj: I | C) => string;

    static hash(...args: any[]) {
        return hashSum({ ...args });
    }

    constructor(calcID: (espObj: I | C) => string) {
        this._calcID = calcID;
    }

    has(espObj: I): boolean {
        return this._calcID(espObj) in this._cache;
    }

    set(obj: C): C {
        this._cache[this._calcID(obj)] = obj;
        return obj;
    }

    get(espObj: I): C | null;
    get(espObj: I, factory: () => C): C;
    get(espObj: I, factory?: () => C): C | null {
        const retVal = this._cache[this._calcID(espObj)];
        if (!retVal) {
            return factory ? this.set(factory()) : null;
        }
        return retVal;
    }
}

export class AsyncCache<I, C> {
    private _cache: { [id: string]: Promise<C> } = {};
    private _calcID: (espObj: I | C) => string;

    static hash(...args: any[]) {
        return hashSum({ ...args });
    }

    constructor(calcID: (espObj: I | C) => string) {
        this._calcID = calcID;
    }

    has(espObj: I): boolean {
        return this._calcID(espObj) in this._cache;
    }

    set(espObj: I, obj: Promise<C>): Promise<C> {
        this._cache[this._calcID(espObj)] = obj;
        return obj;
    }

    get(espObj: I): Promise<C | null>;
    get(espObj: I, factory: () => Promise<C>): Promise<C>;
    get(espObj: I, factory?: () => Promise<C>): Promise<C | null> {
        const retVal = this._cache[this._calcID(espObj)];
        if (!retVal) {
            return factory ? this.set(espObj, factory()) : Promise.resolve(null);
        }
        return retVal;
    }
}
