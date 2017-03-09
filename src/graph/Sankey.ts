import { max as d3Max, median as d3Median, mean as d3Mean, min as d3Min, sum as d3Sum } from "d3-array";
import { sankey as d3Sankey } from "d3-sankey";
import { select as d3Select } from "d3-selection";
import * as Palette from "../common/Palette";
import { PropertyExt } from "../common/PropertyExt";
import { SVGWidget } from "../common/SVGWidget";
import * as Utility from "../common/Utility";
import "./Sankey.css";

const d3Aggr = {
    mean: d3Mean,
    median: d3Median,
    min: d3Min,
    max: d3Max,
    sum: d3Sum
};

export class Column extends PropertyExt {
    _owner;

    constructor(owner) {
        super();
        this._owner = owner;
    }

    aggregate(values) {
        switch (this.aggrType()) {
            case null:
            case undefined:
            case "":
                return values.length;
            default:
                var columns = this._owner.columns();
                const colIdx = columns.indexOf(this.aggrColumn());
                return d3Aggr[this.aggrType()](values, function (value) {
                    return +value[colIdx];
                });
        }
    };

    column: { (): Column[]; (_: Column[]): Column; };
    aggrType: { (): string; (_: string): Column; };
    aggrColumn: { (): string; (_: string): Column; };

}
Column.prototype._class += " graph_Sankey.Column";

Column.prototype.publish("column", null, "set", "Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });
Column.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true, disable: function (w) { return !w._owner || w._owner.mappings().indexOf(w) === 0; } });
Column.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true, disable: function (w) { return !w._owner || !w.aggrType() || w._owner.mappings().indexOf(w) === 0; } });

export class Sankey extends SVGWidget {
    Column;
    _palette;
    _d3Sankey;
    _d3SankeyPath;
    _selection;

    constructor() {
        super();
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";
    }

    sankeyData() {
        const vertexIndex = {};
        const retVal = {
            vertices: [],
            edges: []
        };
        const mappings = this.mappings().filter(function (mapping) { return mapping.column(); });
        mappings.forEach(function (mapping, idx) {
            let view = this._db.rollupView([mapping.column()]);
            view.entries().forEach(function (row) {
                const id = mapping.column() + ":" + idx + ":" + row.key;
                if (!vertexIndex[id]) {
                    retVal.vertices.push({
                        __id: id,
                        __category: mapping.column(),
                        name: row.key,
                        origRow: row.values
                    });
                    vertexIndex[id] = retVal.vertices.length - 1;
                }
            }, this);
        }, this);
        mappings.forEach(function (mapping, idx) {
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
                            value: mapping2.aggregate(value.value)
                        });
                    });
                });
            }
        }, this);

        return retVal;
    };

    enter(domNode, element) {
        super.enter(domNode, element);

        this._d3Sankey = new d3Sankey();
        this._d3SankeyPath = this._d3Sankey.link();
        this._selection.widgetElement(element);
    };

    update(domNode, element) {
        super.update(domNode, element);

        this._palette = this._palette.switch(this.paletteID());

        const sankeyData = this.sankeyData();
        this._d3Sankey
            .size([this.width(), this.height()])
            .nodeWidth(this.vertexWidth())
            .nodePadding(this.vertexPadding())
            .nodes(sankeyData.vertices)
            .links(sankeyData.edges)
            .layout(32)
            ;

        const context = this;

        // Links ---
        const link = element.selectAll(".link").data(sankeyData.edges);
        link.enter().append("path")
            .attr("class", "link")
            .each(function () {
                d3Select(this)
                    .append("title")
                    ;
            })
            .merge(link)
            .attr("d", this._d3SankeyPath)
            .style("stroke-width", function (d) { return Math.max(1, d.dy); })
            .sort(function (a, b) { return b.dy - a.dy; })
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
            .on("click", function (d) {
                context.click(context.rowToObj(d.origRow[0]), "", context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.origRow[0]), "", context._selection.selected(this));
            })
            .each(function () {
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
                return "translate(" + d.x + "," + d.y + ")";
            })
            .each(function () {
                const n = d3Select(this);
                n.select("rect")
                    .attr("height", function (d: any) { return d.dy; })
                    .attr("width", context._d3Sankey.nodeWidth())
                    .style("fill", function (d: any) { return context._palette(d.name); })
                    .style("cursor", (context.xAxisMovement() || context.yAxisMovement()) ? null : "default")
                    ;
                n.select("text")
                    .attr("x", -6)
                    .attr("y", function (d: any) { return d.dy / 2; })
                    .attr("dy", ".35em")
                    .attr("text-anchor", "end")
                    .attr("transform", null)
                    .text(function (d: any) { return d.name; })
                    .filter(function (d: any) { return d.x < context.width() / 2; })
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
    };

    paletteID: { (): string; (_: string): Sankey; };
    mappings: { (): Column[]; (_: Column[]): Sankey; };
    vertexWidth: { (): number; (_: number): Sankey; };
    vertexPadding: { (): number; (_: number): Sankey; };
    xAxisMovement: { (): boolean; (_: boolean): Sankey; };
    yAxisMovement: { (): boolean; (_: boolean): Sankey; };

    exit(domNode, element) {
        super.exit(domNode, element);
    };

    //  Events  ---
    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    dblclick(row, column, selected) {
        console.log("Double Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };
}
Sankey.prototype._class += " graph_Sankey";
Sankey.prototype.Column = Column;
Sankey.prototype.mixin(Utility.SimpleSelectionMixin);

Sankey.prototype._palette = Palette.ordinal("default");

Sankey.prototype.publish("paletteID", "default", "set", "Palette ID", Sankey.prototype._palette.switch());
Sankey.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: Column });
Sankey.prototype.publish("vertexWidth", 36, "number", "Vertex Width");
Sankey.prototype.publish("vertexPadding", 40, "number", "Vertex Padding");
Sankey.prototype.publish("xAxisMovement", false, "boolean", "Enable x-axis movement");
Sankey.prototype.publish("yAxisMovement", false, "boolean", "Enable y-axis movement");
