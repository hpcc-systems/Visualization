import { HTMLWidget } from "@hpcc-js/common";
import { React } from "@hpcc-js/react";

export class JSXWidget extends HTMLWidget {
    static Component = React.Component;
    static createElement = React.createElement;
    protected rootNode;

    jsxRender(jsx, domNode) {
        this.rootNode = React.render(jsx, domNode, this.rootNode);
    }
}
JSXWidget.prototype._class += " html_JSXWidget";
