import { Class } from "./Class";

const GEN_PUB_STUBS: boolean = false;
const __meta_ = "__meta_";
const __private_ = "__private_";
const __prop_ = "__prop_";
const __default_ = "__default_";

function isMeta(key) {
    return key.indexOf(__meta_) === 0;
}

function isPrivate(obj, key) {
    return obj[__private_ + key];
}

function Meta(id, defaultValue, type, description, set, ext) {
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
                const options = typeof set === "function" ? set.call(this) : set;
                if (!options || options.indexOf(_) < 0) {
                    console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
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
                        console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
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
                    console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
                }
                return _;
            };
            break;
        case "object":
            this.checkedAssign = function (_) {
                if (!(_ instanceof Object)) {
                    console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
                }
                return _;
            };
            break;
        case "widget":
            this.checkedAssign = function (_) {
                if (!_._class || _._class.indexOf("common_PropertyExt") < 0) {
                    console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
                }
                return _;
            };
            break;
        case "widgetArray":
            this.checkedAssign = function (_) {
                if (_.some(function (row) { return (!row._class || row._class.indexOf("common_Widget") < 0); })) {
                    console.error("Invalid value for '" + id + "':  " + _ + " expected " + type);
                }
                return _;
            };
            break;
        case "propertyArray":
            this.checkedAssign = function (_) {
                if (_.some(function (row) { return !row.publishedProperties; })) {
                    console.log("Invalid value for '" + id + "':  " + _ + " expected " + type);
                }
                return _;
            };
            break;
        default:
            this.checkedAssign = function (_) {
                if ((window as any).__hpcc_debug) {
                    console.error("Unchecked property type for '" + id + "':  " + _ + " expected " + type);
                }
                return _;
            };
            break;
    }
}

function MetaProxy(id, proxy, method, defaultValue, ext?) {
    this.id = id;
    this.type = "proxy";
    this.proxy = proxy;
    this.method = method;
    this.defaultValue = defaultValue;
    this.ext = ext || {};
}

export type PublishTypes = "any" | "number" | "boolean" | "string" | "set" | "array" | "object" | "widget" | "widgetArray" | "propertyArray" | "html-color";
export interface IPublishExt {
    override?: boolean;
    disable?: (w) => boolean;
    optional?: boolean;
    tags?: string[];
    autoExpand?;
    render?: boolean;
    icons?: string[];
    editor_input?: (context, widget, cell, param) => void;
    saveButton?: string;
    saveButtonID?: string;
    number?: any;
    //  Amcharts - really needed?
    min?: number;
    max?: number;
    step?: number;
    inputType?: string;
}

let propExtID = 0;
export class PropertyExt extends Class {
    protected _id: string;
    private _watchArrIdx: number;
    private _watchArr: any;

    constructor() {
        super();

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
    publishedProperties(includePrivate = false, expandProxies = false) {
        const retVal = [];
        for (const key in this) {
            if (isMeta(key) && (includePrivate || !isPrivate(this, key))) {
                let meta: any = this[key];
                if (expandProxies && meta.type) {
                    let item = this;
                    while (meta.type === "proxy") {
                        item = item[meta.proxy];
                        meta = item.publishedProperty(meta.method);
                    }
                    const selfProp: any = this[key];
                    if (meta.id !== selfProp.id) {
                        meta = JSON.parse(JSON.stringify(meta));  //  Clone meta so we can safely replace the id.
                        meta.id = selfProp.id;
                    }
                }
                retVal.push(meta);
            }
        }
        return retVal;
    }

    propertyWalker(filter, visitor) {
        const context = this;
        this.publishedProperties(false, true).forEach(function (publishItem) {
            if (typeof (filter) !== "function" || !filter(context, publishItem)) {
                visitor(context, publishItem);
            }
        });
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
                const isPrivate = !privateArr.length || (privateArr.length && privateArr.indexOf(key) >= 0);
                const isException = exceptionsArr.indexOf(key) >= 0;
                if (isPrivate && !isException) {
                    this[__private_ + key] = true;
                }
            }
        }
    }
    static prevClassID: string = "";
    publish(id, defaultValue, type?: PublishTypes, description?: string, set?: string[] | (() => string[]) | IPublishExt, ext: IPublishExt = {}) {
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
            console.log(`${id}: {(): ${jsType};(_: ${jsType}): ${PropertyExt.prevClassID}};\n${id}_exists: () => boolean;`);
        }
        if (this[__meta_ + id] !== undefined && !ext.override) {
            throw new Error(id + " is already published.");
        }
        const meta = this[__meta_ + id] = new Meta(id, defaultValue, type, description, set, ext);
        if (meta.ext.internal) {
            this[__private_ + id] = true;
        }
        this[id] = function (_) {
            if (!arguments.length) {
                if (this[id + "_disabled"]()) return this[id + "_default"]();
                return this[__prop_ + id] !== undefined ? this[__prop_ + id] : this[id + "_default"]();
            }
            if (_ === undefined) {
                _ = null;
            } else if (_ === "" && meta.ext.optional) {
                _ = null;
            } else if (_ !== null) {
                _ = meta.checkedAssign.call(this, _);
            }
            this.broadcast(id, _, this[__prop_ + id]);
            if (_ === null) {
                delete this[__prop_ + id];
            } else {
                this[__prop_ + id] = _;
            }
            return this;
        };
        this[id + "_disabled"] = function () {
            return ext && ext.disable ? !!ext.disable(this) : false;
        };
        this[id + "_modified"] = function () {
            return this[__prop_ + id] !== undefined;
        };
        this[id + "_exists"] = function () {
            return this[__prop_ + id] !== undefined || this[id + "_default"]() !== undefined;
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
                    if (this[__prop_ + id]) {
                        this[__prop_ + id].target(null);
                    }
                    break;
                case "widgetArray":
                    if (this[__prop_ + id]) {
                        this[__prop_ + id].forEach(function (widget) {
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
            delete this[__prop_ + id];
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
                this.publishProxy(prefix + __prop_ + publishItem.id, id, publishItem.method || publishItem.id);
            }
        }
    }

    publishProxy(id, proxy, method?, defaultValue?) {
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

    monitorProperty(propID, func) {
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

    monitor(func) {
        return {
            _watches: this.publishedProperties().map(function (meta) {
                return this.monitorProperty(meta.id, func);
            }, this),
            // tslint:disable-next-line:object-literal-shorthand
            remove: function () {
                this._watches.forEach(function (watch) {
                    watch.remove();
                });
            }
        };
    }

    broadcast(key, newVal, oldVal, source) {
        source = source || this;
        if (newVal !== oldVal) {
            for (const idx in this._watchArr) {
                const monitor = this._watchArr[idx];
                if ((monitor.propertyID === undefined || monitor.propertyID === key) && monitor.callback) {
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

    copyPropsTo(other) {
        this.publishedProperties(false).forEach(function (meta) {
            if (this[meta.id + "_exists"]()) {
                other[meta.id](this[meta.id]());
            } else {
                other[meta.id + "_reset"]();
            }
        }, this);
    }
}
PropertyExt.prototype._class += " common_PropertyExt";

export function publish(defaultValue, description?, set?, ext: any = {}) {
    return function (target: any, key: string) {
        target.publish(key, defaultValue, "any", description, set, ext);
    };
}
