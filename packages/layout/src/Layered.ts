import { HTMLWidget, Text } from "@hpcc-js/common";

import "../src/Layered.css";

export class Layered extends HTMLWidget {
    protected _contentContainer;
    constructor() {
        super();

        this._tag = "div";
    }

    addLayer(widget) {
        const widgets = this.widgets();
        widgets.push(widget ? widget : new Text().text("No widget defined for layer."));
        this.widgets(widgets);
        return this;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._contentContainer = element.append("div")
            .attr("class", "container")
            ;
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        const context = this;

        element.style("padding", this.surfacePadding() + "px");

        const content = this._contentContainer.selectAll(".content.id" + this.id()).data(this.widgets(), function (d) { return d.id(); });
        content.enter().append("div")
            .attr("class", "content id" + this.id())
            .each(function (widget, idx) {
                widget.target(this);
            })
            .merge(content)
            .each(function (widget, idx) {
                widget
                    .resize({ width: context.clientWidth(), height: context.clientHeight() })
                    .render()
                    ;
            })
            ;
        content.exit()
            .each(function (widget, idx) {
                widget
                    .target(null)
                    ;
            })
            .remove()
            ;
        content.order();
    }
}
Layered.prototype._class += " layout_Layered";

export interface Layered {
    surfacePadding(): number;
    surfacePadding(_: number): this;
    widgets(): any[];
    widgets(_: any[]): this;
}
Layered.prototype.publish("surfacePadding", 0, "number", "Padding");
Layered.prototype.publish("widgets", [], "widgetArray", "widgets", null, { tags: ["Private"] });
