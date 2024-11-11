import { Palette, PropertyExt, SVGWidget, Utility, max as d3Max, mean as d3Mean, median as d3Median, min as d3Min, sum as d3Sum } from "@hpcc-js/common";
import { sankey as d3Sankey, sankeyLinkHorizontal as d3SankeyLinkHorizontal } from "d3-sankey";
import { select as d3Select } from "d3-selection";

import "../src/Sankey.css";

const d3Aggr = {
    mean: d3Mean,
    median: d3Median,
    min: d3Min,
    max: d3Max,
    sum: d3Sum
};

export class SankeyColumn extends PropertyExt {
    _owner: Sankey;

    constructor() {
        super();
    }

    owner(): Sankey;
    owner(_: Sankey): this;
    owner(_?: Sankey): Sankey | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.column();
    }

    aggregate(values) {
        switch (this.aggrType()) {
            case null:
            case undefined:
            case "":
                return values.length;
            default:
                const columns = this._owner.columns();
                const colIdx = columns.indexOf(this.aggrColumn());
                return d3Aggr[this.aggrType()](values, function (value) {
                    return +value[colIdx];
                });
        }
    }
}
SankeyColumn.prototype._class += " graph_Sankey.SankeyColumn";

export interface SankeyColumn {
    column(): string;
    column(_: string): this;
    aggrType(): string;
    aggrType(_: string): this;
    aggrColumn(): string;
    aggrColumn(_: string): this;
}

SankeyColumn.prototype.publish("column", null, "set", "Field", function (this: SankeyColumn) { return this._owner ? this._owner.columns() : []; }, { optional: true });
SankeyColumn.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true, disable: w => !w._owner || w._owner.mappings().indexOf(w) === 0 });
SankeyColumn.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function (this: SankeyColumn) { return this._owner ? this._owner.columns() : []; }, { optional: true, disable: w => !w._owner || !w.aggrType() || w._owner.mappings().indexOf(w) === 0 });

export class Sankey extends SVGWidget {
    Column;
    _d3Sankey;
    _d3SankeyPath;
    _selection;

    constructor() {
        super();
        Utility.SimpleSelectionMixin.call(this, false);
        this._drawStartPos = "origin";
    }

    sankeyData() {
        const retVal = {
            vertices: [],
            edges: []
        };
        if (this.data().length === 0) return retVal;
        const vertexIndex = {};
        const valueIdx = 2;
        const mappings = this.mappings().filter(mapping => mapping.valid());
        mappings.forEach((mapping, idx) => {
            const view = this._db.rollupView([mapping.column()]);
            view.entries().forEach(function (row) {
                const id = mapping.column() + ":" + idx + ":" + row.key;
                if (!vertexIndex[id]) {
                    retVal.vertices.push({
                        __id: id,
                        __category: mapping.column(),
                        name: row.key,
                        origRow: row.value,
                        value: row.value[idx][valueIdx]
                    });
                    vertexIndex[id] = retVal.vertices.length - 1;
                }
            }, this);
        });
        mappings.forEach((mapping, idx) => {
            if (idx < mappings.length - 1) {
                const mapping2 = mappings[idx + 1];
                const view = this._db.rollupView([mapping.column(), mapping2.column()]);
                view.entries().forEach(function (row) {
                    const sourceID = mapping.column() + ":" + idx + ":" + row.key;
                    row.values.forEach(function (value) {
                        const targetID = mapping2.column() + ":" + (idx + 1) + ":" + value.key;
                        retVal.edges.push({
                            __id: sourceID + "_" + targetID,
                            source: vertexIndex[sourceID],
                            target: vertexIndex[targetID],
                            value: value.value[0][valueIdx]
                        });
                    });
                });
            }
        });

        return retVal;
    }
    enter(domNode, element) {
        super.enter(domNode, element);

        this._d3Sankey = new d3Sankey();
        this._selection.widgetElement(element);
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._palette = this._palette.switch(this.paletteID());

        const strokeWidth = this.vertexStrokeWidth();

        const sankeyData = this.sankeyData();
        const sw2 = strokeWidth * 2;
        this._d3Sankey
            .extent([
                [strokeWidth, strokeWidth],
                [this.width() - sw2, this.height() - sw2]
            ])
            .nodeWidth(this.vertexWidth())
            .nodePadding(this.vertexPadding())
            ;
        this._d3Sankey({
            nodes: sankeyData.vertices,
            links: sankeyData.edges
        });
        const context = this;

        // Links ---
        const link = element.selectAll(".link").data(sankeyData.edges);
        link.enter().append("path")
            .attr("class", "link")
            .each(function (this: HTMLElement) {
                d3Select(this)
                    .append("title")
                    ;
            })
            .merge(link)
            .attr("d", d3SankeyLinkHorizontal())
            .style("stroke-width", function (d) {
                return Math.max(1, d.width);
            })
            .sort(function (a, b) { return b.width - a.width; })
            .select("title")
            .text(function (d) {
                return d.source.name + " → " + d.target.name + "\n" + d.value;
            })
            ;
        link.exit().remove();
        // Nodes ---
        const node = element.selectAll(".node").data(sankeyData.vertices);
        node.enter().append("g")
            .attr("class", "node")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (this: HTMLElement, d) {
                context.click(context.rowToObj(d.origRow[0]), "", context._selection.selected(this));
            })
            .on("dblclick", function (this: HTMLElement, d) {
                context.dblclick(context.rowToObj(d.origRow[0]), "", context._selection.selected(this));
            })
            .each(function (this: HTMLElement) {
                const gElement = d3Select(this);
                gElement.append("rect");
                gElement.append("text");
            })
            /*
            .call(d3.behavior.drag()
                .origin(function (d) { return d; })
                .on("dragstart", function () {
                    this.parentNode.appendChild(this);
                })
                .on("drag", dragmove)
            )
            */
            .merge(node)
            .attr("transform", function (d) {
                let _x = 0;
                let _y = 0;
                if (d.x0) _x = d.x0;
                if (d.y0) _y = d.y0;
                return "translate(" + (_x + strokeWidth) + "," + (_y + strokeWidth) + ")";
            })
            .each(function (this: HTMLElement) {
                const n = d3Select(this);
                n.select("rect")
                    .attr("height", function (d: any) { return d.y1 - d.y0; })
                    .attr("width", context._d3Sankey.nodeWidth())
                    .style("fill", function (d: any) { return context._palette(d.name); })
                    .style("stroke", function (d: any) { return context.vertexStrokeColor(); })
                    .style("stroke-width", function (d: any) { return strokeWidth; })
                    .style("cursor", (context.xAxisMovement() || context.yAxisMovement()) ? null : "default")
                    ;
                n.select("text")
                    .attr("x", -6)
                    .attr("y", function (d: any) {
                        return (d.y1 - d.y0) / 2;
                    })
                    .attr("dy", ".35em")
                    .attr("text-anchor", "end")
                    .attr("transform", null)
                    .text(function (d: any) { return d.name; })
                    .filter(function (d: any) { return d.x0 < context.width() / 2; })
                    .attr("x", 6 + context._d3Sankey.nodeWidth())
                    .attr("text-anchor", "start")
                    ;
            });
        node.exit().remove();

        /*
        function dragmove(d) {
            var gElement = d3.select(this);
            if (context.xAxisMovement()) {
                d.x = Math.max(0, Math.min(context.width() - d.dx, d3.event.x));
            }
            if (context.yAxisMovement()) {
                d.y = Math.max(0, Math.min(context.height() - d.dy, d3.event.y));
            }
            gElement.attr("transform", "translate(" + d.x + "," + d.y + ")");
            context._d3Sankey.relayout();
            link.attr("d", context._d3SankeyPath);

            gElement.select("text")
                .attr("x", -6)
                .attr("y", function (d) { return d.dy / 2; })
                .attr("dy", ".35em")
                .attr("text-anchor", "end")
                .attr("transform", null)
                .text(function (d) { return d.name; })
                .filter(function (d) { return d.x < context.width() / 2; })
                    .attr("x", 6 + context._d3Sankey.nodeWidth())
                    .attr("text-anchor", "start")
            ;
        }
        */
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    //  Events  ---
    click(row, column, selected) {
    }

    dblclick(row, column, selected) {
    }
}
Sankey.prototype._class += " graph_Sankey";
Sankey.prototype.Column = SankeyColumn;
Sankey.prototype.mixin(Utility.SimpleSelectionMixin);

export interface Sankey {
    _palette;
    paletteID(): string;
    paletteID(_: string): this;
    mappings(): SankeyColumn[];
    mappings(_: SankeyColumn[]): this;
    vertexStrokeWidth(): number;
    vertexStrokeWidth(_: number): this;
    vertexStrokeColor(): string;
    vertexStrokeColor(_: string): this;
    vertexWidth(): number;
    vertexWidth(_: number): this;
    vertexPadding(): number;
    vertexPadding(_: number): this;
    xAxisMovement(): boolean;
    xAxisMovement(_: boolean): this;
    yAxisMovement(): boolean;
    yAxisMovement(_: boolean): this;
}

Sankey.prototype._palette = Palette.ordinal("default");

Sankey.prototype.publish("paletteID", "default", "set", "Color palette for this widget", Sankey.prototype._palette.switch());
Sankey.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: SankeyColumn });
Sankey.prototype.publish("vertexStrokeWidth", 1, "number", "Vertex Stroke Width");
Sankey.prototype.publish("vertexStrokeColor", "darkgray", "string", "Vertex Stroke Color");
Sankey.prototype.publish("vertexWidth", 36, "number", "Vertex Width");
Sankey.prototype.publish("vertexPadding", 40, "number", "Vertex Padding");
Sankey.prototype.publish("xAxisMovement", false, "boolean", "Enable x-axis movement");
Sankey.prototype.publish("yAxisMovement", false, "boolean", "Enable y-axis movement");
