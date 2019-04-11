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

    exists<K extends keyof this>(prop: K): boolean;
    modified<K extends keyof this>(prop: K): boolean;
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
                if (moduleName !== _.module || className !== _.class)
                    for (const key in _) {
                        if ((this as any)[to_META(key)]) {
                            (this as any)[key](_.properties[key]);
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
            this[propValue] = createTFunctor(_);
            return this;
        };
        __proto__[property + "_exists"] = function (): boolean {
            return this[propValue] !== undefined || this[META].defaultValue !== undefined;
        };
        __proto__[property + "_modified"] = function (): boolean {
            return this[propValue] !== undefined;
        };
        __proto__[property + "_reset"] = function (): void {
            delete this[propValue];
        };
    };
}
