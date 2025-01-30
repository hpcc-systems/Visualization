import { Palette, SVGWidget, Utility, select as d3Select } from "@hpcc-js/common";
import { compare2 } from "@hpcc-js/util";
import { sankey as d3Sankey, sankeyLinkHorizontal as d3SankeyLinkHorizontal } from "d3-sankey";
import { AnnotationColumn, toJsonObj } from "../react/dataGraph.ts";

import "./sankeyGraph.css";
import { EdgeBaseProps, VertexBaseProps } from "./graphT.ts";

export class SankeyGraph extends SVGWidget {

    protected _d3Sankey: any;
    protected _selection: any;

    constructor() {
        super();
        Utility.SimpleSelectionMixin.call(this, false);

        this._drawStartPos = "origin";
    }

    private _prevVertices: readonly VertexBaseProps[] = [];
    private _masterVertices: VertexBaseProps[] = [];
    private _masterVerticesMap: { [key: string]: VertexBaseProps } = {};
    mergeVertices() {
        const columns = this.vertexColumns();
        const annotationColumns = this.vertexAnnotationColumns();
        const catIdx = this.indexOf(columns, this.vertexCategoryColumn(), "category");
        const idIdx = this.indexOf(columns, this.vertexIDColumn(), "id");
        const labelIdx = this.indexOf(columns, this.vertexLabelColumn(), "label");
        const centroidIdx = this.indexOf(columns, this.vertexCentroidColumn(), "centroid");
        const vertexTooltipIdx = this.indexOf(columns, this.vertexTooltipColumn(), "tooltip");
        const annotationIdxs = annotationColumns.map(ac => this.indexOf(columns, ac.columnID(), ""));
        const vertices: VertexBaseProps[] = this.vertices().map((v): VertexBaseProps => {
            return {
                categoryID: "" + v[catIdx],
                id: "" + v[idIdx],
                text: "" + v[labelIdx],
                tooltip: "" + v[vertexTooltipIdx],
                origData: toJsonObj(v, columns),
                centroid: !!v[centroidIdx],
                annotationIDs: annotationIdxs.map((ai, i) => !!v[ai] ? annotationColumns[i].annotationID() : undefined).filter(a => !!a)
            };
        });
        const diff = compare2(this._prevVertices, vertices, d => d.id);
        diff.exit.forEach(item => {
            this._masterVertices = this._masterVertices.filter(i => i.id !== item.id);
        });
        diff.enter.forEach(item => {
            this._masterVertices.push(item);
            this._masterVerticesMap[item.id] = item;
        });
        this._prevVertices = vertices;
    }

    indexOf(columns: readonly string[], column: string, defColumn: string = ""): number {
        const retVal = columns.indexOf(column);
        return retVal >= 0 ? retVal : columns.indexOf(defColumn);
    }

    protected _prevEdges: readonly EdgeBaseProps[] = [];
    protected _masterEdges: EdgeBaseProps[] = [];
    mergeEdges() {
        const columns = this.edgeColumns();
        const idIdx = this.indexOf(columns, this.edgeIDColumn(), "id");
        const sourceIdx = this.indexOf(columns, this.edgeSourceColumn(), "source");
        const targetIdx = this.indexOf(columns, this.edgeTargetColumn(), "target");
        const labelIdx = this.indexOf(columns, this.edgeLabelColumn(), "label");
        const weightIdx = this.indexOf(columns, this.edgeWeightColumn(), "weight");
        const edges: EdgeBaseProps[] = this.edges().map(e => {
            const source = this._masterVerticesMap["" + e[sourceIdx]];
            if (!source) console.error(`Invalid edge source entity "${e[sourceIdx]}" does not exist.`);
            const target = this._masterVerticesMap["" + e[targetIdx]];
            if (!target) console.error(`Invalid edge target entity "${e[targetIdx]}" does not exist.`);
            return {
                type: "edge",
                id: idIdx >= 0 ? "" + e[idIdx] : "" + e[sourceIdx] + "->" + e[targetIdx],
                source,
                target,
                value: +e[weightIdx] || 0,
                label: labelIdx >= 0 ? ("" + e[labelIdx]) : "",
                origData: toJsonObj(e, columns)
            };
        }).filter(e => e.source && e.target);
        const diff = compare2(this._masterEdges, edges, d => d.id);
        diff.exit.forEach(item => {
            this._masterEdges = this._masterEdges.filter(i => i.id !== item.id);
        });
        diff.enter.forEach(item => {
            this._masterEdges.push(item);
        });
        this._prevEdges = edges;
    }

    sankeyData() {
        this.mergeVertices();
        this.mergeEdges();
        return {
            vertices: this._masterVertices,
            edges: this._masterEdges
        };
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._d3Sankey = d3Sankey();
        this._selection.widgetElement(element);
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._palette = this._palette.switch(this.paletteID());

        const strokeWidth = this.vertexStrokeWidth();

        const sankeyData = this.sankeyData();
        this._d3Sankey
            .nodeId(d => d.id)
            .extent([
                [0, 0],
                [this.width(), this.height()]
            ])
            // .nodeAlign(sankeyCenter)
            // .nodeWidth(this.vertexWidth())
            // .nodePadding(this.vertexPadding())
            ;
        if (sankeyData.vertices.length > 0) {
            this._d3Sankey({
                nodes: sankeyData.vertices,
                links: sankeyData.edges
            });
        }
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
            .style("stroke-width", (d: any) => Math.max(1, d.width))
            // .sort(function (a, b) { return b.width - a.width; })
            .select("title")
            .text(function (d) {
                return d.source.text + " → " + d.target.text + "\n" + d.value;
            })
            ;
        link.exit().remove();

        // Nodes ---
        const node = element.selectAll(".node").data(sankeyData.vertices);
        node.enter().append("g")
            .attr("class", "node")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (this: HTMLElement, d) {
                context.click(d.origData, "", context._selection.selected(this));
            })
            .on("dblclick", function (this: HTMLElement, d) {
                context.dblclick(d.origData, "", context._selection.selected(this));
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
                    .attr("height", (d: any) => {
                        return d.y1 - d.y0;
                    })
                    .attr("width", (d: any) => d.x1 - d.x0)
                    .style("fill", function (d: any) { return context._palette(d.categoryID); })
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
                    .text(function (d: any) {
                        return d.text;
                    })
                    .filter(function (d: any) {
                        return d.x0 < context.width() / 2;
                    })
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
SankeyGraph.prototype._class += " graph_SankeyGraph";
SankeyGraph.prototype.mixin(Utility.SimpleSelectionMixin);

SankeyGraph.prototype._palette = Palette.ordinal("category10");

export interface SankeyGraph {
    _palette: any;
    vertexColumns(): string[];
    vertexColumns(_: string[]): this;
    vertices(): Array<Array<string | number | boolean>>;
    vertices(_: Array<Array<string | number | boolean>>): this;
    vertexCategoryColumn(): string;
    vertexCategoryColumn(_: string): this;
    vertexIDColumn(): string;
    vertexIDColumn(_: string): this;
    vertexLabelColumn(): string;
    vertexLabelColumn(_: string): this;
    vertexCentroidColumn(): string;
    vertexCentroidColumn(_: string): this;
    vertexFAChar(): string;
    vertexFAChar(_: string): this;
    vertexFACharColumn(): string;
    vertexFACharColumn(_: string): this;
    vertexTooltipColumn(): string;
    vertexTooltipColumn(_: string): this;
    vertexAnnotationColumns(): AnnotationColumn[];
    vertexAnnotationColumns(_: AnnotationColumn[]): this;

    edgeColumns(): string[];
    edgeColumns(_: string[]): this;
    edges(): Array<Array<string | number | boolean>>;
    edges(_: Array<Array<string | number | boolean>>): this;
    edgeIDColumn(): string;
    edgeIDColumn(_: string): this;
    edgeLabelColumn(): string;
    edgeLabelColumn(_: string): this;
    edgeSourceColumn(): string;
    edgeSourceColumn(_: string): this;
    edgeTargetColumn(): string;
    edgeTargetColumn(_: string): this;
    edgeWeightColumn(): string;
    edgeWeightColumn(_: string): this;

    paletteID(): string;
    paletteID(_: string): this;
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

SankeyGraph.prototype.publish("paletteID", "category10", "set", "Color palette for this widget", SankeyGraph.prototype._palette.switch());

SankeyGraph.prototype.publish("xAxisMovement", false, "boolean", "Enable x-axis movement");
SankeyGraph.prototype.publish("yAxisMovement", false, "boolean", "Enable y-axis movement");

SankeyGraph.prototype.publish("vertexStrokeWidth", 1, "number", "Vertex Stroke Width");
SankeyGraph.prototype.publish("vertexStrokeColor", "darkgray", "string", "Vertex Stroke Color");
SankeyGraph.prototype.publish("vertexWidth", 36, "number", "Vertex Width");
SankeyGraph.prototype.publish("vertexPadding", 20, "number", "Vertex Padding");
SankeyGraph.prototype.publish("vertexColumns", [], "any", "Vertex Columns", null, { internal: true });
SankeyGraph.prototype.publish("vertices", [], "any", "Vertices (Nodes)", null, { internal: true });
SankeyGraph.prototype.publish("vertexCategoryColumn", "", "set", "Vertex Category ID column", function (this: SankeyGraph) { return this.vertexColumns(); }, { optional: true });
SankeyGraph.prototype.publish("vertexIDColumn", "", "set", "Vertex ID column", function (this: SankeyGraph) { return this.vertexColumns(); }, { optional: true });
SankeyGraph.prototype.publish("vertexLabelColumn", "", "set", "Vertex label column", function (this: SankeyGraph) { return this.vertexColumns(); }, { optional: true });
SankeyGraph.prototype.publish("vertexCentroidColumn", "", "set", "Vertex centroid column (boolean)", function (this: SankeyGraph) { return this.vertexColumns(); }, { optional: true });
SankeyGraph.prototype.publish("vertexFAChar", "?", "string", "Vertex default FAChar");
SankeyGraph.prototype.publish("vertexFACharColumn", "", "set", "Vertex FAChar column", function (this: SankeyGraph) { return this.vertexColumns(); }, { optional: true });
SankeyGraph.prototype.publish("vertexTooltipColumn", "", "set", "Vertex tooltip column", function (this: SankeyGraph) { return this.vertexColumns(); }, { optional: true });
SankeyGraph.prototype.publish("vertexAnnotationColumns", [], "propertyArray", "Annotations", null, { autoExpand: AnnotationColumn });

SankeyGraph.prototype.publish("edgeColumns", [], "any", "Edge columns", null, { internal: true });
SankeyGraph.prototype.publish("edges", [], "any", "Edges (Edges)", null, { internal: true });
SankeyGraph.prototype.publish("edgeIDColumn", "", "set", "Edge ID column", function (this: SankeyGraph) { return this.edgeColumns(); }, { optional: true });
SankeyGraph.prototype.publish("edgeLabelColumn", "", "set", "Edge label column", function (this: SankeyGraph) { return this.edgeColumns(); }, { optional: true });
SankeyGraph.prototype.publish("edgeSourceColumn", "", "set", "Edge source ID column", function (this: SankeyGraph) { return this.edgeColumns(); }, { optional: true });
SankeyGraph.prototype.publish("edgeTargetColumn", "", "set", "Edge target ID column", function (this: SankeyGraph) { return this.edgeColumns(); }, { optional: true });
SankeyGraph.prototype.publish("edgeWeightColumn", "", "set", "Edge weight column", function (this: SankeyGraph) { return this.edgeColumns(); }, { optional: true });
