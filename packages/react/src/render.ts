import { h, FunctionComponent, render as preactRender } from "preact";
import { HTMLWidget, SVGWidget } from "@hpcc-js/common";

export function render<P>(C: FunctionComponent<P>, props: Readonly<P>, parent: Element | Document | ShadowRoot | DocumentFragment, replaceNode?: Element | Text) {
    preactRender(h(C, props), parent, replaceNode);
}

export function svgRender<P>(C: FunctionComponent<P>, props: Readonly<P>, parent: Element | Document | ShadowRoot | DocumentFragment, replaceNode?: Element | Text) {
    preactRender(h("svg", null, h(C, props)), parent, replaceNode);
}

export class HTMLAdapter<P> extends HTMLWidget {

    props(): P;
    props(_: Partial<P>): this;
    props(_?: Partial<P>): P | this {
        if (!arguments.length) return this._props;
        this._props = { ...this._props, ..._ };
        return this;
    }

    prop<K extends keyof P>(_: K): P[K];
    prop<K extends keyof P>(_: K, value: P[K]): this;
    prop<K extends keyof P>(_: K, value?: P[K]): this | P[K] {
        if (arguments.length === 1) return this._props[_];
        this._props[_] = value;
        return this;
    }

    constructor(protected readonly _component: FunctionComponent<P>) {
        super();
    }

    update(domNode, element) {
        super.update(domNode, element);
        render(this._component, this._props, domNode);
    }
}
HTMLAdapter.prototype._class += " react_HTMLAdapter";

export interface HTMLAdapter<P> {
    _props: P;
}
HTMLAdapter.prototype.publish("props", {}, "object", "Properties");

export class SVGAdapter<P> extends SVGWidget {

    props(): P;
    props(_: Partial<P>): this;
    props(_?: Partial<P>): P | this {
        if (!arguments.length) return this._props;
        this._props = { ...this._props, ..._ };
        return this;
    }

    prop<K extends keyof P>(_: K): P[K];
    prop<K extends keyof P>(_: K, value: P[K]): this;
    prop<K extends keyof P>(_: K, value?: P[K]): this | P[K] {
        if (arguments.length === 1) return this._props[_];
        this._props[_] = value;
        return this;
    }

    constructor(protected readonly _component: FunctionComponent<P>) {
        super();
    }

    update(domNode, element) {
        super.update(domNode, element);
        render(this._component, this._props, domNode);
    }
}
SVGAdapter.prototype._class += " react_SVGAdapter";

export interface SVGAdapter<P> {
    _props: P;
}
SVGAdapter.prototype.publish("props", {}, "object", "Properties");
