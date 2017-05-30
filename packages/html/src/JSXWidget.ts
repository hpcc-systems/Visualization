import { HTMLWidget } from "@hpcc-js/common";
import { Component, h as createElement, render } from "@hpcc-js/preact-shim";

export class JSXWidget extends HTMLWidget {
    static Component = Component;
    static createElement = createElement;
    protected rootNode;

    jsxRender(jsx, domNode) {
        this.rootNode = render(jsx, domNode, this.rootNode);
    }
}
JSXWidget.prototype._class += " html_JSXWidget";
