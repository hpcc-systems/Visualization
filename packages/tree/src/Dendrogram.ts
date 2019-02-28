import { ITree } from "@hpcc-js/api";
import { PropertyExt, SVGZoomWidget, Utility } from "@hpcc-js/common";
import { cluster as d3Cluster, hierarchy as d3Hierarchy, tree as d3Tree } from "d3-hierarchy";
import { interpolateHsl as d3InterpolateHsl, interpolateNumber as d3InterpolateNumber } from "d3-interpolate";
import { select as d3Select } from "d3-selection";

import "../src/Dendrogram.css";

export class DendrogramColumn extends PropertyExt {
    _owner: Dendrogram;

    constructor() {
        super();
    }

    owner(): Dendrogram;
    owner(_: Dendrogram): this;
    owner(_?: Dendrogram): Dendrogram | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }
    valid(): boolean {
        return !!this.column();
    }

    column: { (): string; (_: string): Dendrogram; };
}
DendrogramColumn.prototype._class += " tree_Dendrogram.DendrogramColumn";

DendrogramColumn.prototype.publish("column", null, "set", "Field", function (this: DendrogramColumn) { return this._owner ? this._owner.columns() : []; }, { optional: true });

// ===
export class Dendrogram extends SVGZoomWidget {
    Column;
    _d3LayoutCluster;
    _d3LayoutTree;
    _d3Layout;

    constructor() {
        super();
        ITree.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";

        this._d3LayoutCluster = d3Cluster();
        this._d3LayoutTree = d3Tree();
    }

    dendrogramData() {
        if (this.data().length === 0) return [];
        if (!this.mappings().filter(mapping => mapping.valid()).length) {
            return this.data();
        }
        const view = this._db.rollupView(this.mappings().map(function (mapping) { return mapping.column(); }));
        const retVal = {
            key: "root",
            values: view.entries()
        };
        return formatData(retVal);

        function formatData(node) {
            return {
                label: node.key,
                children: node.values.filter(function (value) { return !(value instanceof Array); }).map(function (value) { return formatData(value); }),
                origRows: node.values
            };
        }
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._renderElement
            .attr("opacity", 0)
            .transition().duration(500)
            .attr("opacity", 1)
            ;
        this._selection.widgetElement(this._renderElement);
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;
        const isVertical = this.orientation() === "vertical";

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._d3Layout = this.dendrogram() ? this._d3LayoutCluster : this._d3LayoutTree;

        const data = this.dendrogramData();
        const root = d3Hierarchy(data);

        const dataNodes = root.descendants();

        const sizes = dataNodes.map(n => {
                return _findSize(n);
                function _findSize(node) {
                    if (typeof node.data.size !== "undefined") {
                        return node.data.size;
                    } else if (typeof node.children !== "undefined" && node.children.length > 0) {
                        let ret = 0;
                        for (const child of node.children) {
                            ret += _findSize(child);
                        }
                        return ret;
                    }
                    return 0;
                }
            })
            .filter(n => n !== null)
            ;
        const min = Math.min(...sizes);
        const max = Math.max(...sizes.slice(this.interpolateRoot() ? 0 : 1));
        const interpRadius = d3InterpolateNumber(this.interpolateCircleRadiusMin(), this.interpolateCircleRadiusMax());
        const interpColor = d3InterpolateHsl(this.interpolateCircleColorLower(), this.interpolateCircleColorUpper());
        let labelWidths = [];
        let leafCount = 0;
        const leafParents = [];
        let depthMax = 0;
        const depthCounts = [];
        const depthSizes = [];
        if (this.fitRadiusToLabel()) {
            labelWidths = dataNodes.map((d, i) => {
                if (!depthCounts[d.depth]) {
                    depthCounts[d.depth] = 0;
                }
                if (!depthSizes[d.depth]) {
                    depthSizes[d.depth] = [];
                }
                depthSizes[d.depth].push(d.data.size);
                if (d.depth > depthMax) {
                    depthMax = d.depth;
                }
                if (!d.children) {
                    leafCount++;
                    if (leafParents.indexOf(d.parent) === -1) {
                        leafParents.push(d.parent);
                    }
                }
                return this.textSize(d.data.label).width;
            });
        }
        const depthMinimums = depthSizes.map(sizes => {
            return Math.min(...sizes);
        });
        const depthMaximums = depthSizes.map(sizes => {
            return Math.max(...sizes);
        });

        const maxLabelWidth = Math.max(...labelWidths);

        if (this.radial()) {
            if (this.fitRadiusToLabel()) {
                const bigRadius = (leafCount + leafParents.length) * (maxLabelWidth / 2) / Math.PI;
                this._d3Layout
                    .size([360, bigRadius])
                    ;

                this._d3Layout.separation(function(a, b) {
                    return a.parent === b.parent ? 1 : 2;
                });
            } else {
                this._d3Layout
                    .size([360, this.separation() * 2])
                    ;
                this._d3Layout.separation(function(a, b) {
                    return (a.parent === b.parent ? 1 : 2) / a.depth;
                });
            }
        } else {
            if (this.fitRadiusToLabel()) {
                this._d3Layout.nodeSize([maxLabelWidth, maxLabelWidth * 4]);
            } else {
                this._d3Layout.nodeSize([14, this.separation()]);
            }
            this._d3Layout.separation(function(a, b) {
                return a.parent === b.parent ? 1 : 2;
            });
        }

        this._d3Layout(root);
        const links = root.descendants().slice(1);

        //  Lines  ---
        function linkVertical(d) {
            return "M" + d.parent.x + "," + d.parent.y
                + "C" + d.parent.x + "," + (d.parent.y + d.y) / 2
                + " " + d.x + "," + (d.parent.y + d.y) / 2
                + " " + d.x + "," + d.y;
        }

        function linkHorizontal(d) {
            return "M" + d.y + "," + d.x
                + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
        }
        function diagonal(d) {
            return isVertical ? linkVertical(d) : linkHorizontal(d);
        }

        function project(x, y) {
            const angle = (x - 90) / 180 * Math.PI;
            const radius = y;
            return [radius * Math.cos(angle), radius * Math.sin(angle)];
        }

        function radialDiagonal(d) {
            return "M" + project(d.x, d.y)
                + "C" + project(d.x, (d.y + d.parent.y) / 2)
                + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
                + " " + project(d.parent.x, d.parent.y);
        }

        const transitionDuration = this._renderCount ? 500 : 0;
        const lines = this._renderElement.selectAll(".link").data(links);
        lines.enter().append("path")
            .attr("class", "link")
            .attr("d", this.radial() ? radialDiagonal : diagonal)
            ;
        lines.transition().duration(transitionDuration)
            .attr("d", this.radial() ? radialDiagonal : diagonal)
            ;
        lines.exit().remove();

        //  Nodes  ---
        function nodeTransform(d) {
            if (context.radial()) {
                return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
            }
            return context.orientation() === "horizontal" ? "translate(" + d.y + "," + d.x + ")" : "translate(" + d.x + "," + d.y + ")";
        }

        const nodes = this._renderElement.selectAll(".node").data(dataNodes);

        nodes.transition().duration(transitionDuration)
            .attr("transform", nodeTransform)
            ;
        const enterNodes = nodes.enter().append("g")
            .attr("class", "node")
            .attr("transform", nodeTransform)
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                let tmp = d;
                while (tmp.children) {
                    tmp = tmp.children[0];
                }
                if (d.depth > 0) {
                    context.click(context.rowToObj(tmp.origRows[0]), context.mappings()[d.depth - 1].column(), true);
                }
            })
            .on("dblclick", function (d) {
                let tmp = d;
                while (tmp.children) {
                    tmp = tmp.children[0];
                }
                if (d.depth > 0) {
                    context.dblclick(context.rowToObj(tmp.origRows[0]), context.mappings()[d.depth - 1].column(), true);
                }
            })
            .each(function () {
                const e = d3Select(this);
                e.append("circle");
                e.append("text");
            })
            ;

        enterNodes.merge(nodes).select("circle")
            .attr("r", (d, i) => {
                if (this.fitRadiusToLabel()) {
                    return this.textSize(d.data.label).width / 1.5;
                }
                if (this.interpolateSizeToRadius() && (i > 0 || this.interpolateRoot())) {
                    let sizeRatio;
                    if (this.interpolateByDepth()) {
                        sizeRatio = depthMaximums[d.depth] === depthMinimums[d.depth] ? 1 : (sizes[i] - depthMinimums[d.depth]) / (depthMaximums[d.depth] - depthMinimums[d.depth]);
                    } else {
                        sizeRatio = max === min ? 1 : (sizes[i] - min) / (max - min);
                    }
                    return interpRadius(sizeRatio);
                }
                return this.circleRadius();
            })
            .style("fill", (d, i) => {
                if (this.interpolateSizeToCircleColor() && (i > 0 || this.interpolateRoot())) {
                    let sizeRatio;
                    if (this.interpolateByDepth()) {
                        sizeRatio = depthMaximums[d.depth] === depthMinimums[d.depth] ? 1 : (sizes[i] - depthMinimums[d.depth]) / (depthMaximums[d.depth] - depthMinimums[d.depth]);
                    } else {
                        sizeRatio = max === min ? 1 : (sizes[i] - min) / (max - min);
                    }
                    return interpColor(sizeRatio);
                }
                return this._palette(d.data.label);
            })
            .append("title")
            .text(function (d) { return d.data.label; })
            ;
        const textOffsetX = this.labelInNode() ? 0 : this.circleRadius() + 2;
        enterNodes.merge(nodes).select("text")
            .attr("dx", function (d, i) {
                const sizeRatio = max === min ? 1 : (sizes[i] - min) / (max - min);
                const radius = interpRadius(sizeRatio);
                const _textOffsetX = context.interpolateSizeToRadius() && !context.labelInNode() && (i > 0 || context.interpolateRoot()) ? radius + 2 : textOffsetX;
                if (context.radial()) {
                    if (d.children) {
                        return d.x < 180 ? -_textOffsetX : _textOffsetX;
                    } else {
                        return d.x < 180 ? _textOffsetX : -_textOffsetX;
                    }
                } else if (isVertical) {
                    return d.children ? _textOffsetX : -_textOffsetX;
                }
                return d.children ? -_textOffsetX : _textOffsetX;
            })
            .attr("dy", "0.25em")
            .style("text-anchor", function (d) {
                if (context.labelInNode()) {
                    return "middle";
                }
                if (context.radial()) {
                    if (d.children) {
                        return d.x < 180 ? "end" : "start";
                    } else {
                        return d.x < 180 ? "start" : "end";
                    }
                } else if (isVertical) {
                    return d.children ? "start" : "end";
                }
                return d.children ? "end" : "start";
            })
            .attr("transform", function (d) {
                if (context.radial()) {
                    return d.x < 180 ? null : "rotate(180)";
                } else if (isVertical) {
                    return "rotate(-66)";
                }
                return null;
            })
            .text(function (d) { return d.data.label; })
            ;
        nodes.exit().remove();

        if (!this._renderCount) {
            context.zoomToFit();
        }
    }

    paletteID: { (): string; (_: string): Dendrogram; };
    useClonedPalette: { (): boolean; (_: boolean): Dendrogram; };
    mappings: { (): DendrogramColumn[]; (_: DendrogramColumn[]): Dendrogram; };

    circleRadius: { (): number; (_: number): Dendrogram; };
    separation: { (): number; (_: number): Dendrogram; };
    dendrogram: { (): boolean; (_: boolean): Dendrogram; };
    radial: { (): boolean; (_: boolean): Dendrogram; };
    orientation: { (): string; (_: string): Dendrogram; };

    //  ITree
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  SimpleSelectionMixin
    _selection;
}
Dendrogram.prototype._class += " tree_Dendrogram";
Dendrogram.prototype.implements(ITree.prototype);
Dendrogram.prototype.mixin(Utility.SimpleSelectionMixin);
Dendrogram.prototype.Column = DendrogramColumn;

export interface Dendrogram {
    labelInNode(): boolean;
    labelInNode(_: boolean): this;
    interpolateCircleRadiusMin(): number;
    interpolateCircleRadiusMin(_: number): this;
    interpolateCircleRadiusMax(): number;
    interpolateCircleRadiusMax(_: number): this;
    interpolateRoot(): boolean;
    interpolateRoot(_: boolean): this;

    interpolateSizeToRadius(): boolean;
    interpolateSizeToRadius(_: boolean): this;
    interpolateSizeToCircleColor(): boolean;
    interpolateSizeToCircleColor(_: boolean): this;
    interpolateCircleColorLower(): string;
    interpolateCircleColorLower(_: string): this;
    interpolateCircleColorUpper(): string;
    interpolateCircleColorUpper(_: string): this;

    fitRadiusToLabel(): boolean;
    fitRadiusToLabel(_: boolean): this;

    interpolateByDepth(): boolean;
    interpolateByDepth(_: boolean): this;

}

Dendrogram.prototype.publish("paletteID", "default", "set", "Color palette for this widget", Dendrogram.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Dendrogram.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Dendrogram.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: DendrogramColumn });

Dendrogram.prototype.publish("labelInNode", true, "boolean", "If true, a node's label will be placed within its shape");
Dendrogram.prototype.publish("circleRadius", 4.5, "number", "Text offset from circle");

Dendrogram.prototype.publish("interpolateByDepth", false, "boolean", "If true, radius and/or color are interpolated based on other nodes of the same depth");
Dendrogram.prototype.publish("fitRadiusToLabel", true, "boolean", "Node radius is based on widest node label", null, { disable: w => w.labelInNode() });
Dendrogram.prototype.publish("interpolateSizeToRadius", false, "boolean", "If true, interpolateCircleRadiusMin and interpolateCircleRadiusMax reflect the size property of a data node", null, { disable: w => w.fitRadiusToLabel() });
Dendrogram.prototype.publish("interpolateCircleRadiusMin", 4.5, "number", "Minimum radius of circle (based on size and only when interpolateSizeToRadius is true)", null, { disable: w => w.interpolateSizeToRadius() === false });
Dendrogram.prototype.publish("interpolateCircleRadiusMax", 14.5, "number", "Maximum radius of circle (based on size and only when interpolateSizeToRadius is true)", null, { disable: w => w.interpolateSizeToRadius() === false });
Dendrogram.prototype.publish("interpolateSizeToCircleColor", false, "boolean", "If true, interpolateCircleColorLower and interpolateCircleColorUpper reflect the color of a data node");
Dendrogram.prototype.publish("interpolateCircleColorLower", "#27ae60", "html-color", "Color used to represent the node with the lowest size property");
Dendrogram.prototype.publish("interpolateCircleColorUpper", "#e74c3c", "html-color", "Color used to represent the node with the highest size property");
Dendrogram.prototype.publish("interpolateRoot", true, "boolean", "If true, the root node size will be used as max");

Dendrogram.prototype.publish("separation", 240, "number", "Leaf Separation");
Dendrogram.prototype.publish("dendrogram", true, "boolean", "Dendrogram");
Dendrogram.prototype.publish("radial", false, "boolean", "Radial");
Dendrogram.prototype.publish("orientation", "horizontal", "set", "Orientation", ["horizontal", "vertical"], { tags: ["Private"], disable: w => w.radial() });
