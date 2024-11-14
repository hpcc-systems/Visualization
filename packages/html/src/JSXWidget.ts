import React from "react";
import { render } from "react-dom";
import { HTMLWidget } from "@hpcc-js/common";

export class JSXWidget extends HTMLWidget {
    static Component = React.Component;
    static createElement = React.createElement;
    protected rootNode;

    jsxRender(jsx, domNode) {
        this.rootNode = render(jsx, domNode, this.rootNode);
    }
}
JSXWidget.prototype._class += " html_JSXWidget";
