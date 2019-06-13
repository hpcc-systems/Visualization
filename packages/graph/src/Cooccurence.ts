import { INDChart, ITooltip } from "@hpcc-js/api";
import { Palette, SVGWidget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";
import { Edge } from "./Edge";
import { Vertex } from "./Vertex";

type SortModeType = "none" | "row-alpha-asc" | "row-alpha-desc" | "column-alpha-asc" | "column-alpha-desc";

type EdgeRowType = [string, string, number];

export class Cooccurence extends SVGWidget {

    private _g: any;
    protected _drawStartPos: "center" | "origin";
    private _edges: EdgeRowType[] = [];
    _palette: any;

    constructor() {
        super();
        INDChart.call(this);
        ITooltip.call(this);
        this._drawStartPos = "origin";
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._g = element.append("g");
        this._g.append("rect");
    }

    resolveDataShape() {
        if (this.data() && this.data().edges) {
            this.edges(this.data().edges.map(edge => {
                return [
                    edge.sourceVertex().text(),
                    edge.targetVertex().text(),
                    edge.weight()
                ];
            }));
        } else if (this.data() instanceof Array && this.data().length === 0 && this.edges().length > 0) {
            const vertices = [];
            const vertexMap = {};
            const edges = [];
            this.edges().forEach(row => {
                if (!vertexMap[row[0]]) {
                    vertexMap[row[0]] = new Vertex().text(row[0]);
                    vertices.push(vertexMap[row[0]]);
                }
                if (!vertexMap[row[1]]) {
                    vertexMap[row[1]] = new Vertex().text(row[1]);
                    vertices.push(vertexMap[row[1]]);
                }

                edges.push(
                    new Edge()
                        .sourceVertex(vertexMap[row[0]])
                        .targetVertex(vertexMap[row[1]])
                        .weight(row[2])
                );
            });
            this.data({
                vertices,
                edges
            });
        }
    }

    update(domNode, element) {
        super.update(domNode, element);

        this.resolveDataShape();

        this._palette = this._palette.switch(this.paletteID());

        let maxLabelWidth = 0;
        let maxColLabelWidth = 0;
        let minValue;
        let maxValue;
        const leftLabelArr = [];
        const topLabelArr = [];
        const dataMap = {};
        this.edges().forEach(row => {
            if (leftLabelArr.indexOf(row[0]) === -1) {
                const w = this.textSize(row[0], this.fontFamily(), this.fontSize()).width;
                if (w > maxLabelWidth) maxLabelWidth = w;
                leftLabelArr.push(row[0]);
            }
            if (topLabelArr.indexOf(row[1]) === -1) {
                const w = this.textSize(row[1], this.fontFamily(), this.fontSize()).width;
                if (w > maxColLabelWidth) maxColLabelWidth = w;
                topLabelArr.push(row[1]);
            }
            if (typeof minValue === "undefined" || minValue > row[2]) minValue = row[2];
            if (typeof maxValue === "undefined" || maxValue < row[2]) maxValue = row[2];
            if (!dataMap[`${row[0]}_${row[1]}`]) {
                dataMap[`${row[0]}_${row[1]}`] = row[2];
                dataMap[`${row[1]}_${row[0]}`] = dataMap[`${row[0]}_${row[1]}`];
            }
        });

        const gridWidth = this.width() - (this.labelPadding() * 3) - maxLabelWidth;
        const gridHeight = this.height() - (this.labelPadding() * 3) - maxColLabelWidth;
        let cellWidth = Math.floor(gridWidth / topLabelArr.length);
        let cellHeight = Math.floor(gridHeight / leftLabelArr.length);
        const gridOffsetX = (this.labelPadding() * 2) + maxLabelWidth;
        const gridOffsetY = (this.labelPadding() * 2) + maxColLabelWidth;

        if (this.squareCells()) {
            if (cellWidth > cellHeight) {
                cellWidth = cellHeight;
            } else {
                cellHeight = cellWidth;
            }
        }
        const minCellDimension = Math.min(cellWidth, cellHeight);
        const fontSize = minCellDimension < this.fontSize() ? minCellDimension : this.fontSize();

        this.applySort();

        const context = this;
        const rowSelection = this._g.selectAll(".row").data(leftLabelArr);
        const rowEnter = rowSelection
            .enter()
            .append("g")
            .attr("class", "row")
            ;
        rowEnter
            .each(function (d, i) {
                const rowOffset = gridOffsetY + (cellHeight * i);
                const row = d3Select(this)
                    .attr("transform", `translate(0,${rowOffset})`)
                    ;
                const cellData = topLabelArr.map(topLabel => dataMap[`${d}_${topLabel}`]);
                const cellSelection = row.selectAll(".cell").data(cellData);
                row.append("text");
                cellSelection.enter()
                    .append("rect")
                    .attr("class", "cell")
                    ;
                row.append("rect");
            })
            ;
        rowEnter
            .merge(rowSelection)
            .each(function (d, i) {
                const rowOffset = gridOffsetY + (cellHeight * i);
                const row = d3Select(this)
                    .attr("transform", `translate(0,${rowOffset})`)
                    ;
                const cellData = topLabelArr.map(topLabel => dataMap[`${d}_${topLabel}`]);
                const cellSelection = row.selectAll(".cell").data(cellData);
                row.select("text")
                    .attr("alignment-baseline", "central")
                    .attr("dx", (context.labelPadding() / 2) + maxLabelWidth)
                    .attr("dy", cellHeight / 2)
                    .style("font-size", fontSize + "px")
                    .style("font-family", context.fontFamily())
                    .attr("text-anchor", "end")
                    .text(d)
                    ;
                cellSelection.enter()
                    .append("rect")
                    .attr("class", "cell")
                    .merge(cellSelection as any)
                    .attr("x", (c, i) => (cellWidth * i) + gridOffsetX)
                    .attr("y", 0)
                    .attr("width", cellWidth)
                    .attr("height", cellHeight)
                    .attr("fill", (val, i) => {
                        if (isNaN(val)) return "transparent";
                        return context._palette(val, minValue, maxValue);
                    })
                    ;
                row.append("rect")
                    .attr("height", 1)
                    .attr("width", this.width)
                    .attr("fill", "white")
                    ;
            })
            ;
        const colSelection = this._g.selectAll(".col").data(topLabelArr);
        colSelection.enter().append("g")
            .attr("class", "col")
            .each(function (d, i) {
                const row = d3Select(this);
                row.append("text");
                row.append("rect");
            })
            .merge(colSelection)
            .each(function (d, i) {
                const row = d3Select(this)
                    .attr("transform", `translate(${gridOffsetX + (cellWidth * i)},0)`);

                row.select("text")
                    .attr("alignment-baseline", "central")
                    .attr("text-anchor", "start")
                    .attr("transform", "rotate(-90.1)")
                    .attr("dx", -context.labelPadding() - maxColLabelWidth)
                    .attr("dy", cellWidth / 2)
                    .style("font-size", fontSize + "px")
                    .style("font-family", context.fontFamily())
                    .text(d)
                    ;
                row.select("rect")
                    .attr("height", context.height())
                    .attr("width", 1)
                    .attr("fill", "white")
                    ;
            });

        colSelection.exit().remove();

    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    applySort() {
        switch (this.sortMode()) {
            case "row-alpha-asc":
                this.edges().sort((a, b) => {
                    if (a[0] === b[0]) {
                        return a[1] > b[1] ? 1 : -1;
                    } else {
                        return a[0] > b[0] ? 1 : -1;
                    }
                });
                break;
            case "row-alpha-desc":
                this.edges().sort((a, b) => {
                    if (a[0] === b[0]) {
                        return a[1] > b[1] ? -1 : 1;
                    } else {
                        return a[0] > b[0] ? -1 : 1;
                    }
                });
                break;
            case "column-alpha-asc":
                this.edges().sort((a, b) => {
                    if (a[1] === b[1]) {
                        return a[0] > b[0] ? 1 : -1;
                    } else {
                        return a[1] > b[1] ? 1 : -1;
                    }
                });
                break;
            case "column-alpha-desc":
                this.edges().sort((a, b) => {
                    if (a[1] === b[1]) {
                        return a[0] > b[0] ? -1 : 1;
                    } else {
                        return a[1] > b[1] ? -1 : 1;
                    }
                });
                break;
        }
    }

    edges(): EdgeRowType[];
    edges(_: EdgeRowType[]): this;
    edges(_?: EdgeRowType[]): any | this {
        if (!arguments.length) return this._edges;
        this._edges = _;
        return this;
    }
}
Cooccurence.prototype._class += " graph_Cooccurence";
Cooccurence.prototype.implements(INDChart.prototype);
Cooccurence.prototype.implements(ITooltip.prototype);
Cooccurence.prototype._palette = Palette.rainbow("default");

export interface Cooccurence {
    paletteID(): string;
    paletteID(_: string): this;
    labelPadding(): number;
    labelPadding(_: number): this;
    fontSize(): number;
    fontSize(_: number): this;
    fontFamily(): string;
    fontFamily(_: string): this;
    lowColor(): string;
    lowColor(_: string): this;
    highColor(): string;
    highColor(_: string): this;
    squareCells(): boolean;
    squareCells(_: boolean): this;
    sortMode(): SortModeType;
    sortMode(_: SortModeType): this;
}

Cooccurence.prototype.publish("paletteID", "Reds", "set", "Color palette for this widget", Cooccurence.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Cooccurence.prototype.publish("sortMode", "none", "set", "Category sorting mode", ["none", "row-alpha-asc", "row-alpha-desc", "column-alpha-asc", "column-alpha-desc"]);
Cooccurence.prototype.publish("labelPadding", 8, "number", "Padding (pixels)");
Cooccurence.prototype.publish("fontSize", 12, "number", "Font size (pixels)");
Cooccurence.prototype.publish("fontFamily", "Arial", "string", "Font family");
Cooccurence.prototype.publish("lowColor", "#FFF", "html-color", "Color that represents the min value");
Cooccurence.prototype.publish("highColor", "#000", "html-color", "Color that represents the max value");
Cooccurence.prototype.publish("squareCells", false, "boolean", "If true, cells will render as squares");
