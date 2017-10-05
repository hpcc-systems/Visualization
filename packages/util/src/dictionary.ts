export type StringAnyMap = { [key: string]: any };

export class Dictionary<T> {
    private store: { [key: string]: T } = {};

    constructor(attrs?: StringAnyMap) {
        if (attrs) {
            for (const key in attrs) {
                this.set(key, attrs[key]);
            }
        }
    }

    set(key: string, value: T): T {
        const retVal: T = this.store[key];
        this.store[key] = value;
        return retVal;
    }

    get(key: string): T {
        return this.store[key];
    }

    has(key: string) {
        return this.store[key] !== undefined;
    }

    remove(key: string) {
        delete this.store[key];
    }

    keys(): string[] {
        const retVal: string[] = [];
        for (const key in this.store) {
            retVal.push(key);
        }
        return retVal;
    }

    values(): T[] {
        const retVal: T[] = [];
        for (const key in this.store) {
            retVal.push(this.store[key]);
        }
        return retVal;
    }
}

export class DictionaryNoCase<T> extends Dictionary<T> {
    constructor(attrs?: StringAnyMap) {
        super(attrs);
    }

    set(key: string, value: T): T {
        return super.set(key.toLowerCase(), value);
    }

    get(key: string): T {
        return super.get(key.toLowerCase());
    }

    has(key: string) {
        return super.has(key.toLowerCase());
    }

    remove(key: string) {
        return super.remove(key.toLowerCase());
    }
}
