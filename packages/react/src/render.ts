import { HTMLWidget, SVGWidget } from "@hpcc-js/common";
import * as React from "@hpcc-js/preact-shim";

export function render<P>(C: React.FunctionComponent<P>, props: Readonly<P>, parent: Element | Document | ShadowRoot | DocumentFragment, replaceNode?: Element | Text) {
    React.render(React.h(C, props), parent, replaceNode);
}

export interface FunctionComponent<T> extends React.FunctionComponent<T> {
}

export function svgRender<P>(C: React.FunctionComponent<P>, props: Readonly<P>, parent: Element | Document | ShadowRoot | DocumentFragment, replaceNode?: Element | Text) {
    React.render(React.h("svg", null, React.h(C, props)), parent, replaceNode);
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

    constructor(protected readonly _component: React.FunctionComponent<P>) {
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

    constructor(protected readonly _component: React.FunctionComponent<P>) {
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
