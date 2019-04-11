import { Dispatch, Message } from "./dispatch";

class PropertyChangedMessage extends Message {

    constructor(readonly property: string, public newValue: any, public oldValue: any) {
        super();
    }

    get canConflate(): boolean { return true; }
    conflate(other: PropertyChangedMessage) {
        if (this.property === other.property) {
            this.newValue = other.newValue;
            return true;
        }
        return false;
    }

    void(): boolean {
        return this.newValue === this.oldValue;
    }
}

export type TFunctor<T, C> = (w: C) => T;
export type TOrTFunctor<T, C> = T | TFunctor<T, C>;
const createTFunctor = <T, C>(_: TOrTFunctor<T, C>): TFunctor<T, C> => typeof _ === "function" ? _ as TFunctor<T, C> : () => _;

const __META__ = "__META__";
const propVal = "__prop__";
const to_META = (key: string) => __META__ + key;
const to_prop = (key: string) => propVal + key;
const from_META = (key: string) => key.substr(__META__.length);
const is_META = (key: string) => key.indexOf("__META__") === 0;

/**
 * Public property call signature
 */
export type publish<T, C> = {
    (): T,
    (_: TOrTFunctor<T, C>): C
};

// tslint:disable-next-line: class-name
export interface serializable {

    /**
     *  Class name (from Class.prototype.constructor.name)
     */
    className(): string;

    /**
     *  CSS Class:  Class name + parent class name (recursive)
     *  @param prefix: defaults to "hpcc-js"
     */
    cssClass(prefix?: string): string;

    /**
     *  Serialize published properties to JSON Object
     *  Usage:
     *      const obj = serialize(someWidgetInstance);
     */
    serialize(): SerializationObject;

    /**
     *  Deserialize JSON Object into class
     *  Usage:
     *      deserialize(someWidgetInstance, obj);
     */
    deserialize(_: SerializationObject): void;

    /**
     *  Check if a published property has a value
     *  @param prop: propery ID
     */
    exists<K extends keyof this>(prop: K): boolean;

    /**
     *  Check if a published property has had a value set by the user
     *  @param prop: propery ID
     */
    modified<K extends keyof this>(prop: K): boolean;

    /**
     *  Reset the published property back to its default value
     *  @param prop: propery ID
     */
    reset<K extends keyof this>(prop: K): void;
}

export type SerializationObject = {
    module: string,
    class: string,
    properties: { [key: string]: any }
};

/**
 *  Annotation to enable serialization and publish properties on any given class
 *  Usage:
 *      @serializable("chart_Column")
 *      class Column extends LiteWidget {
 *          ...
 *      }
 */
export function serializable(moduleName: string) {
    // tslint:disable-next-line: callable-types
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        const __proto__ = constructor.prototype;
        const className = __proto__.constructor.name;

        return class extends constructor {

            _dispatch = new Dispatch();

            className(): string {
                return className;
            }

            cssClass(prefix: string = "hpcc-js"): string {
                if (__proto__.cssClass) {
                    return __proto__.cssClass.call(this) + " " + prefix + "-" + className;
                }
                return prefix + "-" + className;
            }

            serialize(): SerializationObject {
                const retVal = {
                    module: moduleName,
                    class: className,
                    properties: {} as any
                };
                for (const key in __proto__) {
                    if (is_META(key)) {
                        const property = from_META(key);
                        if ((this as any).modified(property)) {
                            retVal.properties[property] = (this as any)[property]();
                        }
                    }
                }
                return retVal;
            }

            deserialize(_: SerializationObject) {
                if (moduleName !== _.module || className !== _.class) throw new Error("Module / Class does not match");
                for (const key in __proto__) {
                    if (is_META(key)) {
                        const property = from_META(key);
                        (this as any)[property](_.properties[property]);
                    }
                }
                return this;
            }

            exists(property: string): boolean {
                return (this as any)[property + "_exists"]();
            }

            modified(property: string): boolean {
                return (this as any)[property + "_modified"]();
            }

            reset(property: string): void {
                (this as any)[property + "_reset"]();
            }
        };
    };
}

/**
 *  Annotation to create a published property
 *  Usage:
 *      @serializable("chart_Column")
 *      class Column extends LiteWidget {
 *          ...
 *          @publish("red", "Color")
 *          color: publish<string, this>;
 *          ...
 *          @publish("white", "Some Overriden Color")
 *          overColor = function (origFunc: any, _?: TOrTFunctor<string, Derived>): string | Derived {
 *              const retVal: string | Derived = origFunc.call(this, _);
 *              if (_ !== void 0) {
 *                  console.log(_);
 *              }
 *              return retVal;
 *          } as publish<string, this>;
 *      }
 */
export function publish(defaultValue: any, description: string = "") {
    return function (__proto__: any, property: string) {
        const META = to_META(property);
        const propValue = to_prop(property);
        if (__proto__[META]) throw new Error(`Property ${property} is already published.`);
        __proto__[META] = { defaultValue, description };
        __proto__[property] = function (_?: TOrTFunctor<string, typeof __proto__>) {
            if (_ === void 0) return this[propValue] && this[propValue](this) || defaultValue;
            const oldValue = this[property]();
            this[propValue] = createTFunctor(_);
            this._dispatch.post(new PropertyChangedMessage(property, this[property](), oldValue));
            return this;
        };
        __proto__[property + "_exists"] = function (): boolean {
            return this[propValue] !== undefined || this[META].defaultValue !== undefined;
        };
        __proto__[property + "_modified"] = function (): boolean {
            return this[propValue] !== undefined;
        };
        __proto__[property + "_reset"] = function (): void {
            const oldValue = this[property]();
            delete this[propValue];
            this._dispatch.post(new PropertyChangedMessage(property, this[property](), oldValue));
        };
    };
}
