import { HTMLWidget, Widget } from "@hpcc-js/common";

import "../src/AbsoluteSurface.css";

export class AbsoluteSurface extends HTMLWidget {
    constructor() {
        super();

        this._tag = "div";
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        let xPos = 0;
        let yPos = 0;
        let width = this.clientWidth();
        let height = this.clientHeight();
        switch (this.units()) {
            case "pixels":
                xPos = this.widgetX();
                yPos = this.widgetY();
                width = this.widgetWidth() === "" ? width - xPos : Number(this.widgetWidth());
                height = this.widgetHeight() === "" ? height - yPos : Number(this.widgetHeight());
                break;
            case "percent":
                xPos = this.widgetX() * width / 100;
                yPos = this.widgetY() * height / 100;
                width = this.widgetWidth() === "" ? width - xPos : Number(this.widgetWidth()) * width / 100;
                height = this.widgetHeight() === "" ? height - yPos : Number(this.widgetHeight()) * height / 100;
                break;
        }
        element.style("opacity", this.opacity());

        const widgets = element.selectAll("#" + this._id + " > .placeholder").data(this.widget() ? [this.widget()] : [], function (d) { return d._id; });
        widgets.enter().append("div")
            .attr("class", "placeholder")
            .each(function (d) {
                d.target(this);
            })
            .merge(widgets)
            .style("left", xPos + "px")
            .style("top", yPos + "px")
            .style("width", width + "px")
            .style("bottom", height + "px")
            .each(function (d) {
                d
                    .resize({ width, height })
                    ;
            })
            ;
        widgets.exit().each(function (d) {
            d.target(null);
        }).remove();
    }

    exit(domNode, element) {
        if (this.widget()) {
            this.widget(null);
            this.render();
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    }
}
AbsoluteSurface.prototype._class += " layout_AbsoluteSurface";

export interface AbsoluteSurface {
    units(): string;
    units(_: string): this;
    widgetX(): number;
    widgetX(_: number): this;
    widgetY(): number;
    widgetY(_: number): this;
    widgetWidth(): string;
    widgetWidth(_: string): this;
    widgetHeight(): string;
    widgetHeight(_: string): this;
    widget(): Widget;
    widget(_: Widget): this;
    opacity(): number;
    opacity(_: number): this;
}
AbsoluteSurface.prototype.publish("units", "percent", "set", "Units", ["pixels", "percent"]);
AbsoluteSurface.prototype.publish("widgetX", 0, "number", "Widget XPos");
AbsoluteSurface.prototype.publish("widgetY", 0, "number", "Widget YPos");
AbsoluteSurface.prototype.publish("widgetWidth", "100", "string", "Widget Width, omit for full");
AbsoluteSurface.prototype.publish("widgetHeight", "100", "string", "Widget Height, omit for full");
AbsoluteSurface.prototype.publish("widget", null, "widget", "Widget", null, { tags: ["Private"] });
AbsoluteSurface.prototype.publish("opacity", 1, "number", "Opacity");
