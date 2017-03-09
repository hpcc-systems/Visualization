import { IterableOrArrayLike } from "@phosphor/algorithm";
import { SplitPanel as PSplitPanel, Widget as PWidget } from "@phosphor/widgets";
import { Column } from "../chart/Column";
import { DDLEditor } from "../codemirror/DDLEditor";
import { HTMLWidget } from "../common/HTMLWidget";
import { Widget } from "../common/Widget";
import { WidgetAdapter } from "./WidgetAdapter";

import "@phosphor/widgets/style/index.css";
import "./DockPanel.css";

interface Differences<T> {
    matches: T[];
    missing: T[];
    orphans: T[];
}
function diff<T>(source: IterableOrArrayLike<T>, other: IterableOrArrayLike<T>): Differences<T> {
    const retVal = {
        matches: [],
        missing: [],
        orphans: []
    };
    return retVal;
}

export class SplitPanel extends HTMLWidget {
    protected _split = new PSplitPanel({ orientation: "vertical" });

    constructor() {
        super();
        this._split.id = "p" + this.id();
        this._tag = "div";
        this.content([]);
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        const w1 = new WidgetAdapter("DDL", DDLEditor);
        w1.viz.ddl([{}]);
        const w2 = new WidgetAdapter("Column A", Column);
        const w3 = new WidgetAdapter("Column B", Column);
        const w4 = new WidgetAdapter("Column C", Column);
        const w5 = new WidgetAdapter("Column D", Column);
        const test = [w1, w3, w5];
        this._split.addWidget(w1);
        this._split.addWidget(w2);
        this._split.addWidget(w3);
        this._split.addWidget(w4);
        this._split.addWidget(w5);
        diff(this._split.children(), test);
        PWidget.attach(this._split, domNode);
    }

    update(domNode, element) {
        super.update(domNode, element);
        element.select(".p-Widget")
            .style("width", this.width() + "px")
            .style("height", this.height() + "px")
            ;
        console.log(`Size:  ${this.width()},${this.height()} `);
        this._split.update();
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    content: { (): Widget[]; (_: Widget[]): SplitPanel; };
}
SplitPanel.prototype._class += " phosphor_DockPanel";

SplitPanel.prototype.publish("content", [], "widgetArray", "widgets", null, { tags: ["Basic"], render: false });
