import { ITree } from "@hpcc-js/api";
import { HTMLWidget, PropertyExt, Utility } from "@hpcc-js/common";
import { hierarchy as d3Hierarchy, treemap as d3Treemap } from "d3-hierarchy";

import "../src/Treemap.css";

export class TreemapColumn extends PropertyExt {
    _owner;
    constructor(owner) {
        super();
        this._owner = owner;
    }
}
TreemapColumn.prototype._class += " tree_Dendrogram.TreemapColumn";

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

    treemapData() {
        if (!this.mappings().filter(function (mapping) { return mapping.column(); }).length) {
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

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        const root = d3Hierarchy(this.treemapData())
            .sum(function (d) {
                return d.size || 50;
            })
            ;

        this._d3Treemap
            .size([this.width(), this.height()])
            ;
        this._d3Treemap(root);

        this._elementDIV
            .style("font-size", this.fontSize_exists() ? this.fontSize() + "px" : null)
            .style("line-height", this.fontSize_exists() ? (this.fontSize() + 2) + "px" : null)
            ;

        const context = this;
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
            .style("left", function (d) { return (d.x0 + Math.max(0, d.x1 - d.x0) / 2) + "px"; })
            .style("top", function (d) { return (d.y0 + Math.max(0, d.y1 - d.y0) / 2) + "px"; })
            .style("width", function () { return 0 + "px"; })
            .style("height", function () { return 0 + "px"; })
            .merge(node)
            .attr("title", tooltip)
            .text(function (d) { return d.children ? null : d.data.label; })
            .style("background", function (d) { return d.children ? context._palette(d.data.label) : null; })
            .transition().duration(this.transitionDuration())
            .style("opacity", function (d) { return d.children ? 1 : null; })
            .style("left", function (d) { return d.x0 + "px"; })
            .style("top", function (d) { return d.y0 + "px"; })
            .style("width", function (d) { return Math.max(0, d.x1 - d.x0) + "px"; })
            .style("height", function (d) { return Math.max(0, d.y1 - d.y0) + "px"; })
            ;
        node.exit().transition().duration(this.transitionDuration())
            .style("opacity", 0)
            .remove()
            ;
        function tooltip(d) {
            if (d.children) {
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

    fontSize_exists: () => boolean;

    //  ITree
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;
}
Treemap.prototype._class += " tree_Treemap";
Treemap.prototype.implements(ITree.prototype);
Treemap.prototype.mixin(Utility.SimpleSelectionMixin);
Treemap.prototype.Column = TreemapColumn;

export interface TreemapColumn {
    column(): string;
    column(_: string): this;
}
TreemapColumn.prototype.publish("column", null, "set", "Field", function () { return this._owner ? this._owner.columns() : []; }, { optional: true });

export interface Treemap {
    paletteID(): string;
    paletteID(_: string): this;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    mappings(): TreemapColumn[];
    mappings(_: TreemapColumn[]): this;
    aggrType(): string;
    aggrType(_: string): this;
    aggrColumn(): string;
    aggrColumn(_: string): this;
    fontSize(): number;
    fontSize(_: number): this;
    transitionDuration(): number;
    transitionDuration(_: number): this;
}
Treemap.prototype.publish("paletteID", "default", "set", "Palette ID", Treemap.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Treemap.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Treemap.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: TreemapColumn });
Treemap.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true });
Treemap.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: (w) => !w.aggrType() });
Treemap.prototype.publish("fontSize", null, "number", "Font Size", null, { optional: true });
Treemap.prototype.publish("transitionDuration", 250, "number", "Transition Duration");
