import { HTMLWidget, SVGWidget, Widget } from "@hpcc-js/common";
import { DockPanel as PDockPanel, Widget as PWidget } from "@hpcc-js/phosphor-shim";

import { WidgetAdapter } from "./WidgetAdapter";

import "../src/DockPanel.css";

/*

interface Differences<T> {
    match: T[];
    removed: T[];
    added: T[];
}

function diff<T>(source: algorithm.IterableOrArrayLike<T>, other: algorithm.IterableOrArrayLike<T>): Differences<T> {
    const retVal: Differences<T> = {
        match: [],
        removed: [],
        added: []
    };
    retVal.added = algorithm.toArray(other);
    algorithm.each(source, (item) => {
        const idx = retVal.added.indexOf(item);
        if (idx >= 0) {
            retVal.match.push(item);
            retVal.added.splice(idx, 1);
        } else {
            retVal.removed.push(item);
        }
    });
    return retVal;
}

*/

export class DockPanel extends HTMLWidget {
    private _dock = new PDockPanel({ mode: "multiple-document" });
    protected content: WidgetAdapter[] = [];

    constructor() {
        super();
        this._tag = "div";
        this._dock.id = "p" + this.id();
    }

    protected getWidgetAdapter(widget: Widget): WidgetAdapter | null {
        let retVal = null;
        this.content.some(wa => {
            if (wa.widget === widget) {
                retVal = wa;
                return true;
            }
            return false;
        });
        return retVal;
    }

    addWidget(title: string, widget: SVGWidget | HTMLWidget, location: PDockPanel.InsertMode = "split-right", refWidget?: Widget) {
        const addMode: PDockPanel.IAddOptions = { mode: location, ref: this.getWidgetAdapter(refWidget) };
        const wa = new WidgetAdapter(title, widget);
        this._dock.addWidget(wa, addMode);
        this.content.push(wa);
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        PWidget.attach(this._dock, domNode);
    }

    update(domNode, element) {
        super.update(domNode, element);
        element.select(".p-Widget")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
            ;
        this._dock.update();
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }
}
DockPanel.prototype._class += " phosphor_DockPanel";
