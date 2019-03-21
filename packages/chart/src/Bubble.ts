import { I2DChart, ITooltip } from "@hpcc-js/api";
import { FAChar, InputField, ISize, SVGWidget, Text, Utility } from "@hpcc-js/common";
import { hierarchy as d3Hierarchy, pack as d3Pack } from "d3-hierarchy";
import { select as d3Select } from "d3-selection";

import "../src/Bubble.css";

export class Bubble extends SVGWidget {
    static __inputs: InputField[] = [{
        id: "label",
        type: "string"
    }, {
        id: "value",
        type: "number"
    }];

    labelWidgets;
    d3Pack;

    constructor() {
        super();
        I2DChart.call(this);
        ITooltip.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";

        this.labelWidgets = {};

        this.d3Pack = d3Pack()
            .size([this.width(), this.height()])
            .padding(1.5)
            ;
    }

    size(): ISize;
    size(_): this;
    size(_?): ISize | this {
        const retVal = super.size.apply(this, arguments);
        if (arguments.length) {
            this.d3Pack
                .size([this.width(), this.height()])
                ;
        }
        return retVal;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._selection.widgetElement(element);
        const context = this;
        this
            .tooltipHTML(function (d) {
                switch (context.tooltipStyle()) {
                    case "series-table":
                        return context.tooltipFormat({
                            label: d[0],
                            arr: context.columns().slice(1).map(function (column, i) {
                                return {
                                    label: column,
                                    color: context._palette(d[0]),
                                    value: d[1]
                                };
                            })
                        });
                    default:
                        return context.tooltipFormat({ label: d.data[0], value: d.data[1] });
                }
            })
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        const root = d3Hierarchy({ children: this.cloneData() })
            .sum(function (d) { return d[1]; })
            .sort(function (b, a) {
                return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
            })
            ;
        this.d3Pack(root);

        const node = element.selectAll(".node").data(root.children || [], d => d.data[0]);

        //  Enter  ---
        node.enter().append("g")
            .attr("class", (d, i) => "node series series-" + this.cssTag(d.data[0]))
            .attr("opacity", 0)
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .each(function (d) {
                const element2 = d3Select(this);
                const pos = { x: d.x, y: d.y };
                element2.append("circle")
                    .attr("transform", "translate(" + pos.x + "," + pos.y + ")")
                    .attr("r", 0)
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
                    ;
                if (d.__viz_faChar) {
                    context.labelWidgets[d.data[0]] = new FAChar()
                        .char(d.__viz_faChar)
                        .target(this)
                        .render()
                        ;
                } else {
                    context.labelWidgets[d.data[0]] = new Text()
                        .text(d.data[0])
                        .target(this)
                        .render()
                        ;
                }
            })
            .merge(node).transition()
            .attr("opacity", 1)
            .each(function (d) {
                const element2 = d3Select(this);
                const pos = { x: d.x, y: d.y };
                element2.select("circle").transition()
                    .attr("transform", "translate(" + pos.x + "," + pos.y + ")")
                    .style("fill", context.fillColor(d.data, context.columns()[1], d.data[1]))
                    .attr("r", d.r)
                    .select("title")
                    .text(d.data[0] + " (" + d.data[1] + ")")
                    ;
                if (d.__viz_faChar) {
                    context.labelWidgets[d.data[0]]
                        .pos(pos)
                        .render()
                        ;
                } else {
                    context.labelWidgets[d.data[0]]
                        .pos(pos)
                        .colorFill_default(context.textColor(d.data, context.columns()[1], d.data[1]))
                        .width(d.r * 2)
                        .text(d.data[0])
                        .render()
                        ;
                }
            })
            ;

        //  Exit  ---
        node.exit().transition()
            .style("opacity", 0)
            .remove()
            ;
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    paletteID: { (): string; (_: string): Bubble; };
    useClonedPalette: { (): boolean; (_: boolean): Bubble; };

    //  I2DChart
    _palette;
    fillColor: (row: any[], column: string, value: number) => string;
    textColor: (row: any[], column: string, value: number) => string;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  ITooltip
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;
    tooltipStyle: () => "default" | "none" | "series-table";

    //  SimpleSelectionMixin
    _selection;
}
Bubble.prototype._class += " chart_Bubble";
Bubble.prototype.implements(I2DChart.prototype);
Bubble.prototype.implements(ITooltip.prototype);
Bubble.prototype.mixin(Utility.SimpleSelectionMixin);

Bubble.prototype.publish("paletteID", "default", "set", "Color palette for this widget", Bubble.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Bubble.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
