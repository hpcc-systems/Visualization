import React from "react";
import { render as reactRender } from "react-dom";
import { createRoot, Root } from "react-dom/client";
import { HTMLWidget, SVGWidget } from "@hpcc-js/common";

export function render<P>(C: React.FunctionComponent<P>, props: Readonly<P>, parent: Element | Document | ShadowRoot | DocumentFragment) {
    const re = React.createElement(C, props);
    reactRender(re, parent);
}

export class HTMLAdapter<P> extends HTMLWidget {

    protected _root: Root;

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

    enter(domNode, element) {
        super.enter(domNode, element);
        this._root = createRoot(domNode);
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._root.render(React.createElement(this._component, this.props()));
    }

    exit(domNode, element) {
        this._root.unmount();
        super.exit(domNode, element);
    }
}
HTMLAdapter.prototype._class += " react_HTMLAdapter";

export interface HTMLAdapter<P> {
    _props: P;
}
HTMLAdapter.prototype.publish("props", {}, "object", "Properties");

export class SVGAdapter<P> extends SVGWidget {

    protected _root: Root;

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

    _c2: React.ReactElement;
    enter(domNode, element) {
        super.enter(domNode, element);
        this._root = createRoot(domNode);
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._root.render(React.createElement(this._component, this.props()));
    }

    exit(domNode, element) {
        this._root.unmount();
        super.exit(domNode, element);
    }
}
SVGAdapter.prototype._class += " react_SVGAdapter";

export interface SVGAdapter<P> {
    _props: P;
}
SVGAdapter.prototype.publish("props", {}, "object", "Properties");
