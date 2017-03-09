import { Component, h as createElement, render } from "preact";
// import { Component, createElement } from "react";
// import { render } from "react-dom";

import { HTMLWidget } from "../common/HTMLWidget";

export class JSXWidget extends HTMLWidget {
    static Component = Component;
    static createElement = createElement;
    protected rootNode;

    jsxRender(jsx, domNode) {
        this.rootNode = render(jsx, domNode, this.rootNode);
    }
}
