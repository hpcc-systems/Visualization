import { ITree } from "@hpcc-js/api";
import { HTMLWidget, Palette, PropertyExt, Utility } from "@hpcc-js/common";
import { rgb as d3rgb } from "d3-color";
import { hierarchy as d3Hierarchy, treemap as d3Treemap, treemapBinary as d3treemapBinary, treemapDice as d3treemapDice, treemapResquarify as d3treemapResquarify, treemapSlice as d3treemapSlice, treemapSliceDice as d3treemapSliceDice, treemapSquarify as d3treemapSquarify } from "d3-hierarchy";
import { interpolateNumber as d3interpolate } from "d3-interpolate";
import p5 = require("p5");

import "../src/Treemap.css";

export class TreemapColumn3D extends PropertyExt {
    _owner: Treemap3D;

    constructor() {
        super();
    }

    owner(): Treemap3D;
    owner(_: Treemap3D): this;
    owner(_?: Treemap3D): Treemap3D | this {
        if (!arguments.length) return this._owner;
        this._owner = _;
        return this;
    }

    valid(): boolean {
        return !!this.column();
    }

    column: { (): string; (_: string): TreemapColumn3D; };
}
TreemapColumn3D.prototype._class += " tree_Dendrogram.TreemapColumn";

TreemapColumn3D.prototype.publish("column", null, "set", "Field", function (this: TreemapColumn3D) { return this._owner ? this._owner.columns() : []; }, { optional: true });

// ===
export class Treemap3D extends HTMLWidget {
    Column;
    protected _d3Treemap;
    protected _elementDIV;
    protected _selection;
    protected _p5;
    protected _p5Sketch;
    protected _p5Sketch2;
    protected _rot = [0, 0];
    protected _prevRot = [0, 0];
    protected _mouse = 0;
    protected _mouseX0 = 0;
    protected _mouseY0 = 0;
    protected _mouseX1 = 0;
    protected _mouseY1 = 0;
    protected _dragStrength = 0.01;
    protected _wheelZoom = 500;
    protected _wheelZoomMax = 1000;
    protected _wheelZoomMin = 100;
    protected _yshift = 0;
    protected _yshift_inc = -0.1;
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

        this._p5 = new p5(s => {
            this._p5Sketch = s;
            const context = this;
            s.setup = () => {
                const cnv = s.createCanvas(context.width(), context.height(), s.WEBGL);
                cnv.parent(this.id());
            };
            s.windowResized = () => {
                s.resizeCanvas(context.width(), context.height());
            };
            s.mousePressed = () => {
                this._mouseX0 = s.mouseX;
                this._mouseY0 = s.mouseY;
                this._prevRot = [...this._rot];
            };
            s.mouseDragged = () => {
                this._mouseX1 = s.mouseX;
                this._mouseY1 = s.mouseY;
                this._rot[0] = ((this._mouseX1 - this._mouseX0) * this._dragStrength) + this._prevRot[0];
                this._rot[1] = ((this._mouseY0 - this._mouseY1) * this._dragStrength) + this._prevRot[1];
            };
            s.mouseWheel = (event) => {
                this._wheelZoom -= event.delta;
                this._wheelZoom = this._wheelZoom > this._wheelZoomMax ? this._wheelZoomMax : this._wheelZoom;
                this._wheelZoom = this._wheelZoom <= this._wheelZoomMin ? this._wheelZoomMin : this._wheelZoom;
            };
        });
    }

    update(_domNode, _element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        const context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        const root = d3Hierarchy(this.treemapData())
            .sum(function (d) {
                return d.size || 1;
            })
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

        console.log("root.descendants()", root.descendants());
        const size2max = Math.max.apply(undefined, root.descendants().map(n => n.data.size2 ? n.data.size2 : 0));
        const size2mult = 10;
        const interp = d3interpolate(size2mult, size2mult * 10);
        root.descendants().forEach(n => {
            n["h"] = interp(n.data.size2 ? n.data.size2 / size2max : 0) * size2mult;
            n["z0"] = n.parent ? n.parent["z1"] : 0;
            n["z1"] = n["z0"] + n["h"];
        });

        this._p5Sketch.draw = () => {
            this._p5Sketch.background(255);
            if(!this.enableStroke()){
                this._p5Sketch.noStroke();
            }
            if(this.enableLighting()){
                this._p5Sketch.directionalLight(255, 255, 255, this._p5Sketch.height, this._p5Sketch.height, 0.25);
                this._p5Sketch.pointLight(255, 255, 255, 0, 0, this._p5Sketch.height);
            }

            this._p5Sketch.rotateX(this._rot[1]);
            this._p5Sketch.rotateY(this._rot[0]);

            this._p5Sketch.scale(this._wheelZoom * 0.001);

            root.descendants().forEach((n, i) => {
                const w = n["x1"] - n["x0"];
                const h = n["h"];
                const d = n["y1"] - n["y0"];
                const _transx = Math.floor(n["x0"] + (w / 2) - (this._size.width / 2));
                const _transy = -(n["z0"] + (h/2)) + (this._size.height/2);
                const _transz = Math.floor(n["y0"] + (d / 2) - (this._size.height / 2));
                this._p5Sketch.translate(_transx, _transy, _transz);
                n["color"] = !n.children ? d3rgb(n.parent["color"]).darker((n.depth - 2) * 0.5) : d3rgb(this._palette(i));
                this._p5Sketch.ambientMaterial(n["color"].r, n["color"].g, n["color"].b);
                this._p5Sketch.box(w, h, d);
                this._p5Sketch.translate(-_transx, -_transy, -_transz);
            });
        };
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    resize(size?) {
        const retVal = super.resize(size);
        this._p5Sketch.resizeCanvas(this._size.width, this._size.height);
        return retVal;
    }

    paletteID: { (): string[]; (_: string[]): Treemap3D; };
    useClonedPalette: { (): boolean[]; (_: boolean[]): Treemap3D; };
    mappings: { (): TreemapColumn3D[]; (_: TreemapColumn3D[]): Treemap3D; };
    aggrType: { (): string; (_: string): Treemap3D; };
    aggrColumn: { (): string; (_: string): Treemap3D; };
    fontSize: { (): number; (_: number): Treemap3D; };
    fontSize_exists: () => boolean;
    paddingInner: { (): number; (_: number): Treemap3D; };
    paddingOuter: { (): number; (_: number): Treemap3D; };
    paddingTop: { (): number; (_: number): Treemap3D; };
    parentFontSize: { (): number; (_: number): Treemap3D; };
    leafFontSize: { (): number; (_: number): Treemap3D; };
    brighterLeafNodes: { (): boolean; (_: boolean): Treemap3D; };
    showRoot: { (): boolean; (_: boolean): Treemap3D; };
    enableParentLabels: { (): boolean; (_: boolean): Treemap3D; };
    enableParentTooltips: { (): boolean; (_: boolean): Treemap3D; };
    showParentWeight: { (): boolean; (_: boolean): Treemap3D; };
    showLeafWeight: { (): boolean; (_: boolean): Treemap3D; };
    usePaletteOnParentNodes: { (): boolean; (_: boolean): Treemap3D; };
    depthColorLimit: { (): number; (_: number): Treemap3D; };
    squarifyRatio: { (): number; (_: number): Treemap3D; };
    boxSize: { (): number; (_: number): Treemap3D; };
    weightSuffix: { (): string; (_: string): Treemap3D; };
    tilingMethod: { (): string; (_: string): Treemap3D; };
    enableStroke: { (): boolean; (_: boolean): Treemap3D; };
    enableLighting: { (): boolean; (_: boolean): Treemap3D; };

    transitionDuration: { (): number[]; (_: number[]): Treemap3D; };

    //  ITree
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;
}
Treemap3D.prototype._class += " tree_Treemap";
Treemap3D.prototype.implements(ITree.prototype);
Treemap3D.prototype.mixin(Utility.SimpleSelectionMixin);
Treemap3D.prototype.Column = TreemapColumn3D;

Treemap3D.prototype.publish("boxSize", 18, "number", "Size of box (px)");
Treemap3D.prototype.publish("enableStroke", true, "boolean", "Enable edge stroke");
Treemap3D.prototype.publish("enableLighting", false, "boolean", "Enable lighting");
Treemap3D.prototype.publish("paletteID", "default", "set", "Palette ID", Treemap3D.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Treemap3D.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Treemap3D.prototype.publish("mappings", [], "propertyArray", "Source Columns", null, { autoExpand: TreemapColumn3D });
Treemap3D.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true });
Treemap3D.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: (w) => !w.aggrType() });
Treemap3D.prototype.publish("fontSize", null, "number", "Font Size", null, { optional: true });
Treemap3D.prototype.publish("paddingInner", 18.6, "number", "Pixel spacing between each sibling node");
Treemap3D.prototype.publish("paddingOuter", 30, "number", "Pixel padding of parent nodes");
Treemap3D.prototype.publish("paddingTop", 41.4, "number", "Additional top pixel padding of parent nodes");
Treemap3D.prototype.publish("showRoot", false, "boolean", "Show root element");
Treemap3D.prototype.publish("parentFontSize", 18, "number", "Parent font-size");
Treemap3D.prototype.publish("leafFontSize", 16, "number", "Leaf font-size");
Treemap3D.prototype.publish("usePaletteOnParentNodes", false, "boolean", "Assign a color from the palette to every parent node");
Treemap3D.prototype.publish("depthColorLimit", 1, "number", "Assign a color from the palette to node with depth lower than this value", null, { optional: true, disable: (w) => w.usePaletteOnParentNodes() });
Treemap3D.prototype.publish("squarifyRatio", 1, "number", "Specifies the desired aspect ratio of the generated rectangles (must be >= 1)", null, { optional: true, disable: (w) => ["treemapSquarify", "treemapResquarify"].indexOf(w.tilingMethod()) === -1 });
Treemap3D.prototype.publish("showParentWeight", true, "boolean", "Show weight of parent nodes");
Treemap3D.prototype.publish("showLeafWeight", true, "boolean", "Show weight of leaf nodes");
Treemap3D.prototype.publish("weightSuffix", "", "string", "Weight suffix (ex: 'ms')");
Treemap3D.prototype.publish("brighterLeafNodes", false, "boolean", "Brighter/darker leaf node color (false = darker)");
Treemap3D.prototype.publish("enableParentLabels", true, "boolean", "Enable parent labels");
Treemap3D.prototype.publish("enableParentTooltips", true, "boolean", "Enable parent tooltips");
Treemap3D.prototype.publish("transitionDuration", 250, "number", "Transition Duration");
Treemap3D.prototype.publish("tilingMethod", "treemapSquarify", "set", "Transition Duration", ["treemapBinary", "treemapDice", "treemapResquarify", "treemapSlice", "treemapSliceDice", "treemapSquarify"]);
