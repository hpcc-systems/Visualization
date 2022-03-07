import { HPCCElement } from "./element";
import { HTMLTemplate } from "./html";

//  Web Component Meta Data  ---

export type PropertyType = "string" | "boolean" | "number";

export interface PropertyBase {
    type: PropertyType;
    name: string;
    isAttribute: boolean;
}

export interface StringProperty extends PropertyBase {
    type: "string";
}

export interface NumberProperty extends PropertyBase {
    type: "number";
}

export interface BooleanProperty extends PropertyBase {
    type: "boolean";
}

export type Property = StringProperty | NumberProperty | BooleanProperty;

export interface ClassMeta {
    tag: string;
    template?: HTMLTemplate;
    styles: string;
    properties: Property[];
    observedAttributes: string[];
    observedProperties: string[];
    observed: { [id: string]: Property };
    events: string[];
}

const _allMeta = new WeakMap<CustomElementConstructor, ClassMeta>();
const _allMetaByName: { [id: string]: ClassMeta } = {};
function initMeta(target: CustomElementConstructor): ClassMeta {
    let retVal: ClassMeta;
    if (!_allMeta.has(target)) {
        retVal = {
            tag: "",
            template: { html: "", directives: [] },
            styles: "",
            properties: [],
            observedAttributes: [],
            observedProperties: [],
            observed: {},
            events: []
        };
        _allMeta.set(target, retVal);
        _allMetaByName[target.name] = retVal;
    } else {
        retVal = _allMeta.get(target)!;
    }
    return retVal;
}

export function allMeta() {
    return _allMetaByName;
}

export function classMeta(target: CustomElementConstructor | string): Readonly<ClassMeta> {
    if (typeof target === "string") {
        return _allMetaByName[target];
    }
    return _allMeta.get(target)!;
}

export function instanceMeta(target: HPCCElement): Readonly<ClassMeta> {
    return initMeta(Object.getPrototypeOf(target).constructor);
}

//  Web Component Decarators  ---

export type CustomElementOption = { template?: HTMLTemplate, styles?: string, events?: string[] };

export function customElement(name: string, opts?: CustomElementOption): (target: CustomElementConstructor) => void {

    const { template = { html: "", directives: [] }, styles = "", events = [] }: CustomElementOption = opts || {};

    function decorator(target: CustomElementConstructor): void {
        const meta = initMeta(target);

        //  Gather inherited meta  ---
        let allProperties: PropertyBase[] = [];

        let self = target;
        while (true) {
            allProperties = allProperties.concat(initMeta(self).properties);
            if (self === HPCCElement) {
                break;
            }
            self = Object.getPrototypeOf(self);
        }
        meta.tag = name;
        meta.template = template;
        meta.styles = styles;
        meta.observedAttributes = allProperties
            .filter(prop => prop.isAttribute)
            .map(prop => prop.name)
            ;
        meta.observedProperties = allProperties
            .filter(prop => !prop.isAttribute)
            .map(prop => prop.name)
            ;
        meta.observed = {};
        meta.events = events;
        allProperties.forEach(prop => meta.observed[prop.name] = prop);
        customElements?.define(name, target);

        return;
    }

    return decorator;
}

function changedHandler(target: HPCCElement, opts: PropertyBase) {
    if (opts.name !== opts.name.toLowerCase()) {
        throw new Error(`Attributes must be lowercase: ${target.constructor.name}.${opts.name}`);
    }
    const meta = initMeta(target.constructor as CustomElementConstructor);
    meta.properties.push(opts);
    const innerID = `_${opts.name}`;
    Object.defineProperty(target, opts.name, {
        set: function (newVal) {
            const oldVal = this[innerID];
            this[innerID] = newVal;
            this._fire(opts.name, oldVal, newVal);
            if (opts.isAttribute) {
                if (this.isConnected) {
                    this.attr(opts.name, newVal);
                }
            }
        },
        get: function () { return this[innerID]; }
    });
}

export type OptionsEx = Omit<PropertyBase, "name" | "isAttribute">;
function attrProp(isAttribute: boolean, configOrTarget?: OptionsEx | HPCCElement, prop?: string): void | ((target: HPCCElement, property: string) => void) {

    const options: PropertyBase = {
        name: prop ?? "",
        type: "string",
        isAttribute: isAttribute,
        ...(prop === undefined ? configOrTarget as OptionsEx : {})
    };

    function decorator($target: HPCCElement, $prop: string): void {
        changedHandler($target, { ...options, name: $prop });
    }

    if (prop === undefined) {
        return decorator;
    }

    decorator(configOrTarget as HPCCElement, prop!);
}

export function attribute(config?: OptionsEx): (target: HPCCElement, property: string) => void;
export function attribute(target: HPCCElement, prop: string): void;
export function attribute(configOrTarget?: OptionsEx | HPCCElement, prop?: string): void | ((target: HPCCElement, property: string) => void) {
    return attrProp(true, configOrTarget, prop);
}

export function property(config?: OptionsEx): (target: HPCCElement, property: string) => void;
export function property(target: HPCCElement, prop: string): void;
export function property(configOrTarget?: OptionsEx | HPCCElement, prop?: string): void | ((target: HPCCElement, property: string) => void) {
    return attrProp(false, configOrTarget, prop);
}
