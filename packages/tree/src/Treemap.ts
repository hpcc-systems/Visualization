import { ITree } from "@hpcc-js/api";
import { HTMLWidget, Palette, PropertyExt, Utility } from "@hpcc-js/common";
import { rgb as d3rgb } from "d3-color";
import { hierarchy as d3Hierarchy, treemap as d3Treemap, treemapBinary as d3treemapBinary, treemapDice as d3treemapDice, treemapResquarify as d3treemapResquarify, treemapSlice as d3treemapSlice, treemapSliceDice as d3treemapSliceDice, treemapSquarify as d3treemapSquarify } from "d3-hierarchy";

import "../src/Treemap.css";

export class TreemapColumn extends PropertyExt {
    _owner: Treemap;

    constructor() {
        super();
    }

    owner(): Treemap;
    owner(_: Treemap): this;
    owner(_?: Treemap): Treemap | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.column();
    }

    column: { (): string; (_: string): TreemapColumn; };
}
TreemapColumn.prototype._class += " tree_Dendrogram.TreemapColumn";

TreemapColumn.prototype.publish("column", null, "set", "Field", function (this: TreemapColumn) { return this._owner ? this._owner.columns() : []; }, { optional: true });

// ===
export class Treemap extends HTMLWidget {
    Column;
    protected _d3Treemap;
    protected _elementDIV;
    protected _selection;
    constructor() {
        super();
        ITree.call(this);
        Utility.SimpleSelectionMixin.call(this);
    }

    private getTilingMethod() {
        switch (this.tilingMethod()) {
            case "treemapBinary":
                return d3treemapBinary;
            case "treemapDice":
                return d3treemapDice;
            case "treemapSlice":
                return d3treemapSlice;
            case "treemapSliceDice":
                return d3treemapSliceDice;
            case "treemapResquarify":
                return d3treemapResquarify;
            case "treemapSquarify":
            default:
                return d3treemapSquarify;
        }
    }

    treemapData() {
        if (!this.mappings().filter(mapping => mapping.valid()).length) {
            return this.data();
        }

        const view = this._db.aggregateView(this.mappings().map(function (mapping) { return mapping.column(); }), this.aggrType(), this.aggrColumn());
        const retVal = {
            key: "root",
            values: view.entries()
        };
        return formatData(retVal);

        function formatData(node): any {
            if (node.values instanceof Array) {
                const children = node.values.filter(function (value) {
                    return !(value instanceof Array);
                }).map(function (value) {
                    return formatData(value);
                });
                const retVal2: any = {
                    label: node.key
                };
                if (children.length) {
                    retVal2.children = children;
                } else {
                    retVal2.size = 22;
                }
                return retVal2;
            }
            return {
                label: node.key,
                size: node.values.aggregate,
                origRows: node.values
            };
        }
    }

    enter(_domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._d3Treemap = d3Treemap();

        this._elementDIV = element.append("div");
        this._selection.widgetElement(this._elementDIV);
    }

    update(_domNode, _element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        const context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        const root = d3Hierarchy(this.treemapData())
            .sum(this.nodeWeight)
            ;

        this._d3Treemap
            .size([this.width(), this.height()])
            .paddingInner(this.paddingInner())
            .paddingOuter(this.paddingOuter())
            .paddingTop(this.paddingTop())
            ;
        if (["treemapSquarify", "treemapResquarify"].indexOf(this.tilingMethod()) !== -1) {
            this._d3Treemap.tile(this.getTilingMethod()["ratio"](this.squarifyRatio()));
        } else {
            this._d3Treemap.tile(this.getTilingMethod());
        }
        this._d3Treemap(root);

        this._elementDIV
            .style("font-size", this.fontSize_exists() ? this.fontSize() + "px" : null)
            .style("line-height", this.fontSize_exists() ? (this.fontSize() + 2) + "px" : null)
            ;

        const node = this._elementDIV.selectAll(".node").data(root.descendants());
        node.enter().append("div")
            .attr("class", "node")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                if (d && d.origRows) {
                    let columnLabel = "";
                    context.mappings().forEach(function (mapping) {
                        if (mapping.column()) {
                            columnLabel = mapping.column();
                        }
                    });
                    context.click(context.rowToObj(d.origRows[0]), columnLabel, context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                if (d && d.origRows) {
                    let columnLabel = "";
                    context.mappings().forEach(function (mapping) {
                        if (mapping.column()) {
                            columnLabel = mapping.column();
                        }
                    });
                    context.dblclick(context.rowToObj(d.origRows[0]), columnLabel, context._selection.selected(this));
                }
            })
            .merge(node)
            .style("left", function (d) { return (d.x0 + Math.max(0, d.x1 - d.x0) / 2) + "px"; })
            .style("top", function (d) { return (d.y0 + Math.max(0, d.y1 - d.y0) / 2) + "px"; })
            .style("width", function () { return 0 + "px"; })
            .style("height", function () { return 0 + "px"; })
            .style("font-size", function (d) { return (d.children ? context.parentFontSize() : context.leafFontSize()) + "px"; })
            .style("line-height", function (d) { return (d.children ? context.parentFontSize() : context.leafFontSize()) + "px"; })
            .attr("title", tooltip)
            .html(function (d) {
                if (!context.showRoot() && d.depth === 0) {
                    return null;
                }
                if (d.children) {
                    if (context.enableParentLabels()) {
                        return context.parentWeightHTML(d);
                    } else {
                        return null;
                    }
                } else {
                    return context.leafWeightHTML(d);
                }
            })
            .style("background", function (d) {
                if (!context.showRoot() && d.depth === 0) {
                    this.style.color = "transparent";
                    return "transparent";
                }
                const light_dark = context.brighterLeafNodes() ? "brighter" : "darker";
                let _color;
                if (context.usePaletteOnParentNodes()) {
                    _color = d.children ? context._palette(d.data.label) : d3rgb(context._palette(d.parent.data.label))[light_dark](1);
                } else {
                    if (d.depth > context.depthColorLimit()) {
                        _color = d3rgb(d.parent.color)[light_dark](1);
                    } else {
                        _color = context._palette(d.data.label);
                    }
                    d.color = _color;
                }
                this.style.color = Palette.textColor(_color);
                return _color;
            })
            .transition().duration(this.transitionDuration())
            .style("pointer-events", function (d) { return !context.showRoot() && d.depth === 0 ? "none" : "all"; })
            .style("opacity", function (d) { return d.children ? 1 : null; })
            .style("left", function (d) { return d.x0 + "px"; })
            .style("top", function (d) { return d.y0 + "px"; })
            .style("width", function (d) { return Math.max(0, d.x1 - d.x0) + "px"; })
            .style("height", function (d) { return Math.max(0, d.y1 - d.y0) + "px"; })
            .each(function (d) {
                if (d.depth === 0) {
                    this.style.color = !context.showRoot() ? "transparent" : "";
                    this.style.borderColor = !context.showRoot() ? "transparent" : "";
                }
            })
            ;
        node.exit().transition().duration(this.transitionDuration())
            .style("opacity", 0)
            .remove()
            ;
        function tooltip(d) {
            if (d.children && !context.enableParentTooltips()) {
                return null;
            }
            let retVal = d.data.label + " (" + d.value + ")";
            while (d.parent && d.parent.parent) {
                retVal = d.parent.data.label + " -> " + retVal;
                d = d.parent;
            }
            return retVal;
        }
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    nodeWeight (d) {
        return d.size || 1;
    }

    parentWeightHTML(d) {
        return this.showParentWeight() ? `<span class="treemap-parent-label">${d.data.label}</span><span class="treemap-parent-value">${d.value}${this.weightSuffix()}</span>` : `<span class="treemap-parent-label">${d.data.label}</span>`;
    }

    leafWeightHTML(d) {
        return this.showLeafWeight() ? `<span class="treemap-leaf-label">${d.data.label}</span><span class="treemap-leaf-value">${d.value}${this.weightSuffix()}</span>` : `<span class="treemap-leaf-label">${d.data.label}</span>`;
    }

    paletteID: { (): string[]; (_: string[]): Treemap; };
    useClonedPalette: { (): boolean[]; (_: boolean[]): Treemap; };
    mappings: { (): TreemapColumn[]; (_: TreemapColumn[]): Treemap; };
    aggrType: { (): string; (_: string): Treemap; };
    aggrColumn: { (): string; (_: string): Treemap; };
    fontSize: { (): number; (_: number): Treemap; };
    fontSize_exists: () => boolean;
    paddingInner: { (): number; (_: number): Treemap; };
    paddingOuter: { (): number; (_: number): Treemap; };
    paddingTop: { (): number; (_: number): Treemap; };
    parentFontSize: { (): number; (_: number): Treemap; };
    leafFontSize: { (): number; (_: number): Treemap; };
    brighterLeafNodes: { (): boolean; (_: boolean): Treemap; };
    showRoot: { (): boolean; (_: boolean): Treemap; };
    enableParentLabels: { (): boolean; (_: boolean): Treemap; };
    enableParentTooltips: { (): boolean; (_: boolean): Treemap; };
    showParentWeight: { (): boolean; (_: boolean): Treemap; };
    showLeafWeight: { (): boolean; (_: boolean): Treemap; };
    usePaletteOnParentNodes: { (): boolean; (_: boolean): Treemap; };
    depthColorLimit: { (): number; (_: number): Treemap; };
    squarifyRatio: { (): number; (_: number): Treemap; };
    weightSuffix: { (): string; (_: string): Treemap; };
    tilingMethod: { (): string; (_: string): Treemap; };

    transitionDuration: { (): number[]; (_: number[]): Treemap; };

    //  ITree
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;
}
Treemap.prototype._class += " tree_Treemap";
Treemap.prototype.implements(ITree.prototype);
Treemap.prototype.mixin(Utility.SimpleSelectionMixin);
Treemap.prototype.Column = TreemapColumn;

Treemap.prototype.publish("paletteID", "default", "set", "Color palette for this widget", Treemap.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Treemap.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Treemap.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: TreemapColumn });
Treemap.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true });
Treemap.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: (w) => !w.aggrType() });
Treemap.prototype.publish("fontSize", null, "number", "Font Size", null, { optional: true });
Treemap.prototype.publish("paddingInner", 18.6, "number", "Pixel spacing between each sibling node");
Treemap.prototype.publish("paddingOuter", 30, "number", "Pixel padding of parent nodes");
Treemap.prototype.publish("paddingTop", 41.4, "number", "Additional top pixel padding of parent nodes");
Treemap.prototype.publish("showRoot", false, "boolean", "Show root element");
Treemap.prototype.publish("parentFontSize", 18, "number", "Parent font-size");
Treemap.prototype.publish("leafFontSize", 16, "number", "Leaf font-size");
Treemap.prototype.publish("usePaletteOnParentNodes", false, "boolean", "Assign a color from the palette to every parent node");
Treemap.prototype.publish("depthColorLimit", 1, "number", "Assign a color from the palette to node with depth lower than this value", null, { optional: true, disable: (w) => w.usePaletteOnParentNodes() });
Treemap.prototype.publish("squarifyRatio", 1, "number", "Specifies the desired aspect ratio of the generated rectangles (must be >= 1)", null, { optional: true, disable: (w) => ["treemapSquarify", "treemapResquarify"].indexOf(w.tilingMethod()) === -1 });
Treemap.prototype.publish("showParentWeight", true, "boolean", "Show weight of parent nodes");
Treemap.prototype.publish("showLeafWeight", true, "boolean", "Show weight of leaf nodes");
Treemap.prototype.publish("weightSuffix", "", "string", "Weight suffix (ex: 'ms')");
Treemap.prototype.publish("brighterLeafNodes", false, "boolean", "Brighter/darker leaf node color (false = darker)");
Treemap.prototype.publish("enableParentLabels", true, "boolean", "Enable parent labels");
Treemap.prototype.publish("enableParentTooltips", true, "boolean", "Enable parent tooltips");
Treemap.prototype.publish("transitionDuration", 250, "number", "Transition Duration");
Treemap.prototype.publish("tilingMethod", "treemapSquarify", "set", "Transition Duration", ["treemapBinary", "treemapDice", "treemapResquarify", "treemapSlice", "treemapSliceDice", "treemapSquarify"]);
