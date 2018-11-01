import { HTMLWidget, Text } from "@hpcc-js/common";

import "../src/Layered.css";

export type LayerPlacement = "default" | "top" | "right" | "bottom" | "left" | "center";

export class Layered extends HTMLWidget {
    protected _contentContainer;
    _widgetPlacements;
    _widgetRatios;
    constructor() {
        super();

        this._tag = "div";
        this._widgetPlacements = [];
        this._widgetRatios = [];
    }

    addLayer(widget, placement: LayerPlacement = "default", widthRatio: number = 1, heightRatio: number = 1) {
        const widgets = this.widgets();
        widgets.push(widget ? widget : new Text().text("No widget defined for layer."));
        this.widgets(widgets);
        this._widgetPlacements.push(placement);
        this._widgetRatios.push([widthRatio, heightRatio]);
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
                const clientSize = {
                    width: context.clientWidth(),
                    height: context.clientHeight()
                };
                const widgetSize = context.widgetSize(idx, clientSize);
                const widgetPosition = context.widgetPosition(idx, clientSize, widgetSize);
                console.log("widgetPosition", widgetPosition);
                this.style.top = widgetPosition.y + "px";
                this.style.left = widgetPosition.x + "px";
                widget
                    .resize(widgetSize)
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

    widgetSize(idx, clientSize) {
        if (this._widgetPlacements[idx] === "default") {
            return {
                width: clientSize.width * this._widgetRatios[idx][0],
                height: clientSize.height * this._widgetRatios[idx][1]
            };
        } else {
            return {
                width: clientSize.width * this._widgetRatios[idx][0],
                height: clientSize.height * this._widgetRatios[idx][1]
            };
        }
    }
    widgetPosition(idx, clientSize, widgetSize) {
        switch (this._widgetPlacements[idx]) {
            default:
                return {
                    x: 0,
                    y: 0
                };
            case "top":
                return {
                    x: (clientSize.width / 2) - (widgetSize.width / 2),
                    y: 0
                };
            case "bottom":
                return {
                    x: (clientSize.width / 2) - (widgetSize.width / 2),
                    y: clientSize.height - widgetSize.height
                };
            case "left":
                return {
                    x: 0,
                    y: (clientSize.height / 2) - (widgetSize.height / 2)
                };
            case "right":
                return {
                    x: clientSize.width - widgetSize.width,
                    y: (clientSize.height / 2) - (widgetSize.height / 2)
                };
            case "center":
                return {
                    x: (clientSize.width / 2) - (widgetSize.width / 2),
                    y: (clientSize.height / 2) - (widgetSize.height / 2)
                };
        }
    }

    surfacePadding: { (): number; (_: string): Layered; };
    widgets: { (): any[]; (_: any[]): Layered; };
}
Layered.prototype._class += " layout_Layered";

Layered.prototype.publish("surfacePadding", 0, "number", "Padding");
Layered.prototype.publish("widgets", [], "widgetArray", "widgets", null, { tags: ["Private"] });
