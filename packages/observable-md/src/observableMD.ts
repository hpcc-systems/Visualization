import { HTMLWidget, publish } from "@hpcc-js/common";
import { Document } from "./document";
import { OJSSyntaxError } from "./util";

import "@observablehq/inspector/dist/inspector.css";
import "../src/observable.css";

export class ObservableMD extends HTMLWidget {

    private _document = new Document().watch(() => {
        this.runtimeUpdated();
    });

    constructor() {
        super();
    }

    @publish("", "string", "Markdown Text")
    markdown: publish<this, string>;

    @publish({}, "object", "Plugins")
    plugins: publish<this, { [key: string]: object }>;

    @publish(false, "boolean", "Show Observable Values")
    showValues: publish<this, boolean>;

    errors(): OJSSyntaxError[] {
        return this._document.errors();
    }

    protected _prevHash: string | undefined;
    update(domNode, element) {
        super.update(domNode, element);
        this._placeholderElement
            .style("width", null)
            .style("height", null)
            ;
        element
            .style("width", null)
            .style("height", null)
            ;
        element.classed("hide-values", !this.showValues() ? true : null);

        const hash = this.propertyHash(["markdown", "showValues"]);
        if (this._prevHash !== hash) {
            this._prevHash = hash;
            this._document.update(this.markdown(), domNode);
        }
    }

    //  Events  ---
    runtimeUpdated() {
    }
}
ObservableMD.prototype._class += " observable-md_ObservableMD";
