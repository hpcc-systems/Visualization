import { hashSum } from "@hpcc-js/util";
import { event as d3Event } from "d3-selection";
import { Class } from "./Class";

const GEN_PUB_STUBS: boolean = false;

function deepEqual(a, b) {
    if (a === b) return true;

    const arrA = Array.isArray(a);
    const arrB = Array.isArray(b);
    let i;

    if (arrA && arrB) {
        if (a.length !== b.length) return false;
        for (i = 0; i < a.length; i++)
            if (!deepEqual(a[i], b[i])) return false;
        return true;
    }

    // tslint:disable-next-line:triple-equals
    if (arrA != arrB) return false;

    if (a && b && typeof a === "object" && typeof b === "object") {
        const keys = Object.keys(a);
        if (keys.length !== Object.keys(b).length) return false;

        const dateA = a instanceof Date;
        const dateB = b instanceof Date;
        if (dateA && dateB) return a.getTime() === b.getTime();
        // tslint:disable-next-line:triple-equals
        if (dateA != dateB) return false;

        const regexpA = a instanceof RegExp;
        const regexpB = b instanceof RegExp;
        if (regexpA && regexpB) return a.toString() === b.toString();
        // tslint:disable-next-line:triple-equals
        if (regexpA != regexpB) return false;

        for (i = 0; i < keys.length; i++)
            if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

        for (i = 0; i < keys.length; i++)
            if (!deepEqual(a[keys[i]], b[keys[i]])) return false;

        return true;
    }

    return false;
}

const __meta_ = "__meta_";
const __private_ = "__private_";
const __prop_ = "_";
const __prop_data_ = "__prop_";
const __default_ = "__default_";

function isMeta(key) {
    return key.indexOf(__meta_) === 0;
}

function isPrivate(obj, key) {
    return obj[__private_ + key] || obj[__private_ + __meta_ + key];
}

export interface IAutoExpand extends PropertyExt {
    //  AutoExpand items may have "incomplete" instances while the user is editing them in the PropertyEditor
    owner(): PropertyExt;
    owner(_: PropertyExt): this;
    valid(): boolean;
}

export type TagTypes = "Private" | "Shared" | "Basic" | "Intermediate" | "Advanced" | "Theme" | "Serial";
export type PublishTypes = "any" | "number" | "boolean" | "string" | "set" | "array" | "object" | "widget" | "widgetArray" | "propertyArray" | "html-color" | "proxy";
export interface IPublishExt {
    override?: boolean;
    disable?: (w) => boolean;
    validate?: (w) => boolean;
    optional?: boolean;
    tags?: TagTypes[];
    autoExpand?: { new(): IAutoExpand };
    render?: boolean;
    icons?: string[];
    editor_input?: (context, widget, cell, param) => void;
    saveButton?: string;
    saveButtonID?: string;
    number?: any;
    reset?: boolean;
    //  Amcharts - really needed?
    min?: number;
    max?: number;
    step?: number;
    inputType?: string;
    internal?: boolean;
    range?: { min: number, max: number, step: number };
    multiline?: boolean;
}

export class Meta {
    id;
    type: PublishTypes;
    origDefaultValue;
    defaultValue;
    description;
    set;
    ext: IPublishExt;
    checkedAssign;

    constructor(id, defaultValue, type, description, set, ext?: IPublishExt) {
        ext = ext || {};
        this.id = id;
        this.type = type;
        this.origDefaultValue = defaultValue;
        this.defaultValue = ext.optional && defaultValue === null ? undefined : defaultValue;
        this.description = description;
        this.set = set;
        this.ext = ext;

        switch (type) {
            case "any":
                this.checkedAssign = _ => _;
                break;
            case "set":
                this.checkedAssign = function (_) {
                    if ((window as any).__hpcc_debug) {
                        const options = typeof set === "function" ? set.call(this) : set;
                        if (options && options.length && options.indexOf(_) < 0) {
                            console.error("Invalid value for '" + this.classID() + "." + id + "':  " + _ + " expected " + JSON.stringify(options));
                        }
                    }
                    return _;
                };
                break;
            case "html-color":
                this.checkedAssign = function (_) {
                    if ((window as any).__hpcc_debug && _ && _ !== "red") {
                        const litmus = "red";
                        const d = document.createElement("div");
                        d.style.color = litmus;
                        d.style.color = _;
                        // Element's style.color will be reverted to litmus or set to "" if an invalid color is given
                        if (d.style.color === litmus || d.style.color === "") {
                            console.error("Invalid value for '" + this.classID() + "." + id + "':  " + _ + " expected " + type);
                        }
                    }
                    return _;
                };
                break;
            case "boolean":
                this.checkedAssign = function (_) {
                    return typeof (_) === "string" && ["false", "off", "0"].indexOf(_.toLowerCase()) >= 0 ? false : Boolean(_);
                };
                break;
            case "number":
                this.checkedAssign = function (_) {
                    return Number(_);
                };
                break;
            case "string":
                this.checkedAssign = function (_) {
                    return String(_);
                };
                break;
            case "array":
                this.checkedAssign = function (_) {
                    if (!(_ instanceof Array)) {
                        console.error("Invalid value for '" + this.classID() + "." + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "object":
                this.checkedAssign = function (_) {
                    if (!(_ instanceof Object)) {
                        console.error("Invalid value for '" + this.classID() + "." + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "widget":
                this.checkedAssign = function (_) {
                    if (!_._class || _._class.indexOf("common_PropertyExt") < 0) {
                        console.error("Invalid value for '" + this.classID() + "." + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "widgetArray":
                this.checkedAssign = function (_) {
                    if (_.some(function (row) { return (!row._class || row._class.indexOf("common_Widget") < 0); })) {
                        console.error("Invalid value for '" + this.classID() + "." + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            case "propertyArray":
                this.checkedAssign = function (_) {
                    if (_.some(function (row) { return !row.publishedProperties; })) {
                        console.log("Invalid value for '" + this.classID() + "." + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
            default:
                this.checkedAssign = function (_) {
                    if ((window as any).__hpcc_debug) {
                        console.error("Unchecked property type for '" + this.classID() + "." + id + "':  " + _ + " expected " + type);
                    }
                    return _;
                };
                break;
        }
    }
}

class MetaProxy {
    id: string;
    type;
    proxy;
    method;
    defaultValue;
    ext: IPublishExt;

    constructor(id: string, proxy, method, defaultValue, ext?: IPublishExt) {
        this.id = id;
        this.type = "proxy";
        this.proxy = proxy;
        this.method = method;
        this.defaultValue = defaultValue;
        this.ext = ext || {};
    }
}

function isMetaProxy(meta: Meta | MetaProxy): meta is MetaProxy {
    return meta.type === "proxy";
}

export interface IMonitorHandle {
    remove(): void;
}

let propExtID = 0;
export class PropertyExt extends Class {
    protected _id: string;
    private _watchArrIdx: number;
    private _watchArr: any;
    private _publishedProperties: Meta[] = [];

    constructor() {
        super();
        this.calcPublishedProperties();

        this._id = "_pe" + (++propExtID);
        this._watchArrIdx = 0;
        this._watchArr = {};

        this.publishedProperties(true).forEach(function (meta) {
            switch (meta.type) {
                case "array":
                case "widgetArray":
                case "propertyArray":
                    this[meta.id + "_reset"]();
                    break;
            }
        }, this);
    }

    id(): string;
    id(_: string): this;
    id(_?): string | this {
        if (!arguments.length) return this._id;
        this._id = _;
        return this;
    }

    // Publish Properties  ---
    calcPublishedProperties(includePrivate = false, expandProxies = false): void {
        this._publishedProperties = [];
        const protoStack = [];
        let __proto__ = Object.getPrototypeOf(this);
        while (__proto__) {
            if (__proto__ === PropertyExt.prototype) {
                break;
            }
            protoStack.unshift(__proto__);
            __proto__ = Object.getPrototypeOf(__proto__);
        }
        for (__proto__ of protoStack) {
            for (const key in __proto__) {
                if (__proto__.hasOwnProperty(key)) {
                    if (isMeta(key)) {
                        this._publishedProperties.push(this[key]);
                    }
                }
            }
        }
    }

    publishedProperties(includePrivate = false, expandProxies = false): Meta[] {
        return this._publishedProperties.filter(meta => includePrivate || !isPrivate(this, meta.id)).map(meta => {
            if (expandProxies && isMetaProxy(meta)) {
                const selfProp = meta;
                let item = this;
                while (meta.type === "proxy") {
                    item = item[(meta as any).proxy];
                    meta = item.publishedProperty((meta as any).method);
                }
                if (meta.id !== selfProp.id) {
                    meta = JSON.parse(JSON.stringify(meta));  //  Clone meta so we can safely replace the id.
                    meta.id = selfProp.id;
                }
            }
            return meta;
        });
    }

    widgetWalker(visitor: (item: PropertyExt) => void) {
        visitor(this);
        this.publishedProperties(false, true).forEach(publishItem => {
            switch (publishItem.type) {
                case "widget":
                    const widget: PropertyExt = this[publishItem.id]();
                    if (widget) {
                        widget.widgetWalker(visitor);
                    }
                    break;
                case "widgetArray":
                case "propertyArray":
                    const widgets: PropertyExt[] = this[publishItem.id]();
                    if (widgets) {
                        widgets.forEach((widget) => {
                            widget.widgetWalker(visitor);
                        });
                    }
                    break;
            }
        });
    }

    propertyWalker(visitor: (context: this, publishItem: Meta) => void, filter?: (context: this, publishItem: Meta) => boolean) {
        const context = this;
        this.publishedProperties(false, true).forEach(function (publishItem) {
            if (typeof (filter) !== "function" || filter(context, publishItem)) {
                visitor(context, publishItem);
            }
        });
    }

    serialize(): {} | undefined {
        const retVal = {
            __class: this.classID()
        };
        for (const prop of this.publishedProperties()) {
            if (prop.id === "fields") continue;
            const val = (this as any)[prop.id]();
            switch (prop.type) {
                case "propertyArray":
                    if ((this as any)[`${prop.id}_modified`]()) {
                    }
                    const serialization = val.filter(item => item.valid()).map(item => item.serialize()).filter(item => item !== undefined);
                    if (serialization) {
                        retVal[prop.id] = serialization;
                    }
                    break;
                case "widget":
                    retVal[prop.id] = val.serialize();
                    break;
                default:
                    if ((this as any)[`${prop.id}_modified`]()) {
                        if (!(val instanceof Object)) {
                            retVal[prop.id] = val;
                        }
                    }
            }
        }
        return retVal;
    }

    deserialize(props): this {
        if (!props) return this;
        for (const prop of this.publishedProperties()) {
            const val = props[prop.id];
            if (val !== undefined) {
                switch (prop.type) {
                    case "propertyArray":
                        if (prop.ext && prop.ext.autoExpand) {
                            this[`${prop.id}`](val.map(item => new prop.ext.autoExpand().deserialize(item)));
                        }
                        break;
                    case "widget":
                        const currVal = this[`${prop.id}`]();
                        if (currVal.classID() === val.__class) {
                            currVal.deserialize(val);
                        } else {
                            console.log("Dynamic class initialization not supported.");
                        }
                        break;
                    default:
                        this[`${prop.id}`](val);
                }
            }
        }
        return this;
    }

    publishedProperty(id) {
        return this[__meta_ + id];
    }

    publishedModified() {
        return this.publishedProperties().some(function (prop) {
            return this[prop.id + "_modified"]();
        }, this);
    }

    publishReset(privateArr?, exceptionsArr?) {
        privateArr = (privateArr || []).map(function (id) { return __meta_ + id; });
        exceptionsArr = (exceptionsArr || []).map(function (id) { return __meta_ + id; });
        for (const key in this) {
            if (isMeta(key)) {
                const isPrivateItem = !privateArr.length || (privateArr.length && privateArr.indexOf(key) >= 0);
                const isException = exceptionsArr.indexOf(key) >= 0;
                if (isPrivateItem && !isException) {
                    this[__private_ + key] = true;
                }
            }
        }
    }
    static prevClassID: string = "";
    publish(id: string, defaultValue, type?: PublishTypes, description?: string, set?: string[] | (() => string[] | Array<{ value: string, text: string }>) | IPublishExt, ext: IPublishExt = {}): void {
        if (GEN_PUB_STUBS) {
            if (PropertyExt.prevClassID !== (this as any).constructor.name) {
                PropertyExt.prevClassID = (this as any).constructor.name;
                console.log(`//  ${PropertyExt.prevClassID}  ---`);
            }
            let jsType: string = type;
            switch (type) {
                case "set":
                case "html-color":
                    jsType = "string";
                    break;
                case "array":
                case "widgetArray":
                case "propertyArray":
                    jsType = "any[]";
                    break;
            }
            console.log(`    ${id}(): ${jsType};
    ${id}(_: ${jsType}): this;
    ${id}_exists(): boolean;`);
        }
        if (id.indexOf("_") === 0) {
            id = id.slice(1);
        }
        if (this[__meta_ + id] !== undefined && !ext.override) {
            throw new Error(id + " is already published.");
        }
        const meta = this[__meta_ + id] = new Meta(id, defaultValue, type, description, set, ext);
        if (meta.ext.internal) {
            this[__private_ + id] = true;
        }
        Object.defineProperty(this, __prop_ + id, {
            // tslint:disable-next-line:object-literal-shorthand
            set: function (_) {
                if (_ === undefined) {
                    _ = null;
                } else if (_ === "" && meta.ext.optional) {
                    _ = null;
                } else if (_ !== null) {
                    _ = meta.checkedAssign.call(this, _);
                }
                this.broadcast(id, _, this[__prop_data_ + id]);
                if (_ === null) {
                    delete this[__prop_data_ + id];
                } else {
                    this[__prop_data_ + id] = _;
                }
            },
            // tslint:disable-next-line:object-literal-shorthand
            get: function () {
                if (this[id + "_disabled"]()) return this[id + "_default"]();
                return this[__prop_data_ + id] !== undefined ? this[__prop_data_ + id] : this[id + "_default"]();
            },
            configurable: true
        });
        if (this[id]) {
        } else {
            if (type === "propertyArray") {
                this[id] = function (_) {
                    if (!arguments.length) return this[__prop_ + id];
                    _.forEach(item => item.owner(this));
                    this[__prop_ + id] = _;
                    return this;
                };
            } else {
                this[id] = function (_) {
                    if (!arguments.length) return this[__prop_ + id];
                    this[__prop_ + id] = _;
                    return this;
                };
            }
        }
        this[id + "_disabled"] = function () {
            return ext && ext.disable ? !!ext.disable(this) : false;
        };
        this[id + "_valid"] = function () {
            return ext && ext.validate ? this[id + "_disabled"]() || (ext.optional && !this[id + "_exists"]()) || (ext.autoExpand && !this.valid()) || !!ext.validate(this) : true;
        };
        this[id + "_modified"] = function () {
            if (type === "propertyArray") {
                return this[__prop_data_ + id] && (this[__prop_data_ + id].some(item => item.valid()));
            }
            return this[__prop_data_ + id] !== undefined;
        };
        this[id + "_exists"] = function () {
            if (this[__prop_data_ + id] != null && !(this[__prop_data_ + id] === "" && ext.optional === true)) return true;
            if (this[id + "_default"]() != null && !(this[id + "_default"]() === "" && ext.optional === true)) return true;
            return false;
        };
        this[id + "_default"] = function (_) {
            if (!arguments.length) return this[__default_ + id] !== undefined ? this[__default_ + id] : meta.defaultValue;
            if (_ === "") {
                _ = null;
            }
            if (_ === null) {
                delete this[__default_ + id];
            } else {
                this[__default_ + id] = _;
            }
            return this;
        };
        this[id + "_reset"] = function () {
            switch (type) {
                case "widget":
                    if (this[__prop_data_ + id]) {
                        this[__prop_data_ + id].target(null);
                    }
                    break;
                case "widgetArray":
                    if (this[__prop_data_ + id]) {
                        this[__prop_data_ + id].forEach(function (widget) {
                            widget.target(null);
                        });
                    }
                    break;
            }

            switch (type) {
                case "array":
                case "widgetArray":
                case "propertyArray":
                    this[__default_ + id] = this[id + "_default"]().map(function (row) { return row; });
                    break;
            }
            delete this[__prop_data_ + id];
            return this;
        };
        this[id + "_options"] = function () {
            if (typeof set === "function") {
                const retVal = meta.ext.optional ? [null] : [];
                return retVal.concat(set.apply(this, arguments));
            }
            return set;
        };
    }

    publishWidget(prefix, WidgetType, id) {
        for (const key in WidgetType.prototype) {
            if (key.indexOf("__meta") === 0) {
                const publishItem = WidgetType.prototype[key];
                this.publishProxy(prefix + __prop_data_ + publishItem.id, id, publishItem.method || publishItem.id);
            }
        }
    }

    publishProxy(id: string, proxy, method?, defaultValue?) {
        method = method || id;
        if (this[__meta_ + id] !== undefined) {
            throw new Error(id + " is already published.");
        }
        this[__meta_ + id] = new MetaProxy(id, proxy, method, defaultValue);
        this[id] = function (_) {
            if (!arguments.length) return defaultValue === undefined || this[id + "_modified"]() ? this[proxy][method]() : defaultValue;
            if (defaultValue !== undefined && _ === defaultValue) {
                this[proxy][method + "_reset"]();
            } else {
                this[proxy][method](_);
            }
            return this;
        };
        this[id + "_disabled"] = function () {
            return this[proxy][method + "_disabled"]();
        };
        this[id + "_modified"] = function () {
            return this[proxy][method + "_modified"]() && (defaultValue === undefined || this[proxy][method]() !== defaultValue);
        };
        this[id + "_exists"] = function () {
            return this[proxy][method + "_exists"]();
        };
        this[id + "_default"] = function (_) {
            if (!arguments.length) return this[proxy][method + "_default"]();
            this[proxy][method + "_default"](_);
            return this;
        };
        this[id + "_reset"] = function () {
            this[proxy][method + "_reset"]();
            return this;
        };
        this[id + "_options"] = function () {
            return this[proxy][method + "_options"]();
        };
    }

    monitorProperty(propID: string, func: (id: string, newVal: any, oldVal: any) => void): IMonitorHandle {
        const meta = this.publishedProperty(propID);
        switch (meta.type) {
            case "proxy":
                if (this[meta.proxy]) {
                    return this[meta.proxy].monitorProperty(meta.method, function (_key, newVal, oldVal) {
                        func(meta.id, newVal, oldVal);
                    });
                } else {
                    return {
                        remove: () => { }
                    };
                }
            default:
                const idx = this._watchArrIdx++;
                this._watchArr[idx] = { propertyID: propID, callback: func };
                const context = this;
                return {
                    remove: () => {
                        delete context._watchArr[idx];
                    }
                };
        }
    }

    monitor(func: (id: string, newVal: any, oldVal: any, source: PropertyExt) => void): { remove: () => void } {
        const idx = this._watchArrIdx++;
        this._watchArr[idx] = { propertyID: undefined, callback: func };
        return {
            remove: () => {
                delete this._watchArr[idx];
            }
        };
    }

    broadcast(key, newVal, oldVal, source?) {
        source = source || this;
        if (!deepEqual(newVal, oldVal)) {
            for (const idx in this._watchArr) {
                const monitor = this._watchArr[idx];
                if ((monitor.propertyID === undefined || monitor.propertyID === key) && monitor.callback) {
                    // console.log(`${this.classID()}->broadcast(${key}, ${newVal}, ${oldVal})`);
                    setTimeout(function (monitor2) {
                        monitor2.callback(key, newVal, oldVal, source);
                    }, 0, monitor);
                }
            }
        }
    }

    applyTheme(theme) {
        if (!theme) {
            return;
        }
        const clsArr = this._class.split(" ");
        for (const i in clsArr) {
            if (theme[clsArr[i]]) {
                for (const paramName in theme[clsArr[i]]) {
                    if (paramName === "overrideTags" && theme[clsArr[i]][paramName] instanceof Object) {
                        for (const param in theme[clsArr[i]][paramName]) {
                            if (this.publishedProperty(paramName).ext) {
                                this.publishedProperty(paramName).ext.tags = theme[clsArr[i]][paramName][param];
                            }
                        }
                        continue;
                    }
                    if (this.publishedProperty(paramName)) {
                        this.publishedProperty(paramName).defaultValue = theme[clsArr[i]][paramName];
                    }
                }
            }
        }
    }

    copyPropsTo(other: PropertyExt, ignore: string[] = []): this {
        this.publishedProperties(false).filter(meta => ignore.indexOf(meta.id) < 0).forEach(meta => {
            if (this[meta.id + "_exists"]()) {
                other[meta.id](this[meta.id]());
            } else {
                other[meta.id + "_reset"]();
            }
        });
        return this;
    }

    hashSum(ignore: string[] = [], more = {}): string {
        ignore = [...ignore, "classed"];
        const props: { [key: string]: any } = more;
        this.publishedProperties(false).filter(meta => ignore.indexOf(meta.id) < 0).forEach(meta => {
            if (this[meta.id + "_exists"]()) {
                let value = this[meta.id]();
                switch (meta.type) {
                    case "widget":
                        value = value.hashSum();
                        break;
                    case "widgetArray":
                    case "propertyArray":
                        value = hashSum(value.map(v => v.hashSum()));
                        break;
                    default:
                }
                props[meta.id] = value;
            }
        });
        return hashSum(props);
    }

    //  Events  ---
    on(eventID, func, stopPropagation = false): this {
        const context = this;
        this.overrideMethod(eventID, function (...args: any[]) {
            const origFunc = args[args.length - 1];
            let retVal;
            if (stopPropagation) {
                if (d3Event) {
                    d3Event.stopPropagation();
                }
                [].push.call(args, origFunc);
            } else {
                retVal = origFunc.apply(context, args);
            }
            const retVal2 = func.apply(context, args);
            return retVal2 !== undefined ? retVal2 : retVal;
        });
        return this;
    }
}
PropertyExt.prototype._class += " common_PropertyExt";

export function publish(defaultValue, type?: PublishTypes, description?: string, set?: string[] | (() => string[] | Array<{ value: string, text: string }>) | IPublishExt, ext: IPublishExt = {}) {
    return function (target: any, key: string) {
        if (!key) throw new Error("???");
        if (ext.reset) {
            target.publishReset();
        }
        target.publish(key, defaultValue, type, description, set, ext);
    };
}
export type publish<T, U> = {
    (_: U): T;
    (): U;
};

export function publishProxy(proxy: string, method?: string, defaultValue?, ext: { reset?: boolean } = {}) {
    return function (target: any, key: string) {
        if (ext.reset) {
            target.publishReset();
        }
        target.publishProxy(key, proxy, method, defaultValue);
    };
}
