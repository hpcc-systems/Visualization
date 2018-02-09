import { HTMLWidget, Text } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";
import { Surface } from "./Surface";

import "../src/Tabbed.css";

export class Tabbed extends HTMLWidget {
    _tabContainer;
    _contentContainer;

    constructor() {
        super();

        this._tag = "div";
    }

    clearTabs() {
        this.labels([]);
        this.widgets([]);
        return this;
    }

    addTab(widget, label, isActive?, callback?) {
        const widgetSize = widget.size();
        if (widgetSize.width === 0 && widgetSize.height === 0) {
            widget.size({ width: "100%", height: "100%" });
        }
        const labels = this.labels();
        const widgets = this.widgets();
        if (isActive) {
            this.activeTabIdx(this.widgets().length);
        }
        labels.push(label);
        const surface = new Surface().widget(widget ? widget : new Text().text("No widget defined for tab"));
        widgets.push(surface);
        this.labels(labels);
        this.widgets(widgets);
        if (callback) {
            callback(surface);
        }
        return this;
    }

    widgetSize(widgetDiv) {
        const width = this.clientWidth();
        let height = this.clientHeight();

        const tcBox = this._tabContainer.node().getBoundingClientRect();
        if (typeof (tcBox.height) !== "undefined") {
            height -= tcBox.height;
        }
        return { width, height };
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._tabContainer = element.append("div");
        this._contentContainer = element.append("div");
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        const context = this;

        element.style("padding", this.surfacePadding_exists() ? this.surfacePadding() + "px" : null);

        const tabs = this._tabContainer.selectAll(".tab-button.id" + this.id()).data(this.showTabs() ? this.labels() : [], function (d) { return d; });
        tabs.enter().append("span")
            .attr("class", "tab-button id" + this.id())
            .style("cursor", "pointer")
            .on("click", function (d, idx) {
                context.click(context.widgets()[idx].widget(), d, idx);
                context
                    .activeTabIdx(idx)
                    .render()
                    ;
            }).merge(tabs)
            .classed("active", function (d, idx) { return context.activeTabIdx() === idx; })
            .text(function (d) { return d; })
            ;
        tabs.exit().remove();

        const content = this._contentContainer.selectAll(".tab-content.id" + this.id()).data(this.widgets(), function (d) { return d.id(); });
        content.enter().append("div")
            .attr("class", "tab-content id" + this.id())
            .each(function (widget, idx) {
                widget.target(this);
            }).merge(content)
            .classed("active", function (d, idx) { return context.activeTabIdx() === idx; })
            .style("display", function (d, idx) { return context.activeTabIdx() === idx ? "block" : "none"; })
            .each(function (surface, idx) {
                surface.visible(context.activeTabIdx() === idx);
                if (context.activeTabIdx() === idx) {
                    const wSize = context.widgetSize(d3Select(this));
                    surface
                        .surfaceBorderWidth(context.showTabs() ? null : 0)
                        .surfacePadding(context.showTabs() ? null : 0)
                        .resize(wSize)
                        ;
                }
            })
            ;
        content.exit()
            .each(function (widget, idx) {
                widget
                    .target(null)
                    ;
            })
            .remove();

        switch (this.tabLocation()) {
            case "bottom":
                this._tabContainer
                    .attr("class", "on_bottom")
                    .style("top", (this._contentContainer.node().offsetHeight + this.surfacePadding()) + "px")
                    .style("position", "absolute")
                    ;
                this._contentContainer
                    .style("top", this.surfacePadding_exists() ? this.surfacePadding() + "px" : null)
                    .style("position", "absolute")
                    ;
                break;
            default:
                this._tabContainer
                    .attr("class", "on_top")
                    .style("top", null)
                    .style("position", "relative")
                    ;
                this._contentContainer
                    .style("top", (this._tabContainer.node().offsetHeight + this.surfacePadding()) + "px")
                    .style("position", "absolute")
                    ;
                break;
        }
    }

    click(widget, column, idx) {
    }

    surfacePadding_default: { (): number; (_: number): Tabbed; };
    surfacePadding_exists: () => boolean;
}
Tabbed.prototype._class += " layout_Tabbed";

export interface Tabbed {
    showTabs(): boolean;
    showTabs(_: boolean): this;
    surfacePadding(): number;
    surfacePadding(_: number): this;
    activeTabIdx(): number;
    activeTabIdx(_: number): this;
    labels(): any[];
    labels(_: any[]): this;
    tabLocation(): string;
    tabLocation(_: string): this;
    widgets(): any[];
    widgets(_: any[]): this;
}
Tabbed.prototype.publish("showTabs", true, "boolean", "Show Tabs", null, {});
Tabbed.prototype.publish("surfacePadding", 4, "number", "Padding");
Tabbed.prototype.publish("activeTabIdx", 0, "number", "Index of active tab", null, {});
Tabbed.prototype.publish("labels", [], "array", "Array of tab labels sharing an index with ", null, { tags: ["Private"] });
Tabbed.prototype.publish("tabLocation", "top", "set", "Position the tabs at the bottom of the widget", ["top", "bottom"], { tags: ["Private"] });
Tabbed.prototype.publish("widgets", [], "widgetArray", "widgets", null, { tags: ["Private"] });
