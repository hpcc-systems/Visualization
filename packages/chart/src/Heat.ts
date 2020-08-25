import { max, Palette } from "@hpcc-js/common";
import { XYAxis } from "./XYAxis";
import * as _simpleheat from "simpleheat";

const simpleheat = (window as any).simpleheat || (_simpleheat && _simpleheat.default) || _simpleheat;

export class Heat extends XYAxis {

    protected _domForeignObject;
    protected _domCanvas;
    protected _heat;

    constructor() {
        super();
        this
            .xAxisGuideLines_default(true)
            .yAxisGuideLines_default(true)
            ;
    }

    layerEnter(host: XYAxis, element, duration: number = 250) {
        super.layerEnter(host, element, duration);
        this._domForeignObject = this.svg.insert("foreignObject", `#${this.id() + "_clippath"}`);
        this._domCanvas = this._domForeignObject.append("xhtml:body")
            .style("margin", "0px")
            .style("padding", "0px")
            .style("background-color", "none")
            .append("canvas")
            ;
        this._heat = simpleheat(this._domCanvas.node());
    }

    layerUpdate(host: XYAxis, element, duration: number = 250) {
        super.layerUpdate(host, element);

        this._palette = this._palette.switch(this.paletteID());

        let width = this.width() - this.margin.left - this.margin.right;
        if (width < 0) width = 0;
        let height = this.height() - this.margin.top - this.margin.bottom;
        if (height < 0) height = 0;

        this._domForeignObject
            .attr("x", this.margin.left)
            .attr("y", this.margin.top)
            .attr("width", width)
            .attr("height", height)
            ;
        this._domCanvas
            .attr("width", width)
            .attr("height", height)
            ;

        const data = host.orientation() === "horizontal" ?
            this.data().map(r => [host.dataPos(r[0]), host.valuePos(r[1]), r[2]]) :
            this.data().map(r => [host.valuePos(r[1]), host.dataPos(r[0]), r[2]])
            ;

        const maxWeight = max(data, r => r[2]);

        if (this.paletteID() !== "default") {
            const gradient = {};
            const count = 8;
            const reverse = this.reversePalette();
            for (let i = 0; i < count; ++i) {
                gradient[i / count] = this._palette((reverse ? count - i : i) / count, 0, 1);
            }
            this._heat.gradient(gradient);
        }

        this._heat.resize();
        this._heat
            .clear()
            .radius(this.radius(), this.blur())
            .max(maxWeight)
            .data(data)
            .draw(this.minOpacity())
            ;
    }
}

Heat.prototype._class += " chart_Heat";
Heat.prototype._palette = Palette.rainbow("default");

export interface Heat {
    paletteID(): string;
    paletteID(_: string): this;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    reversePalette(): boolean;
    reversePalette(_: boolean): this;

    radius(): number;
    radius(_: number): this;
    blur(): number;
    blur(_: number): this;
    minOpacity(): number;
    minOpacity(_: number): this;
}

Heat.prototype.publish("paletteID", "default", "set", "Color palette for this widget", Heat.prototype._palette.switch(), { tags: ["Basic"] });
Heat.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Heat.prototype.publish("reversePalette", false, "boolean", "Reverse Palette Colors", null, { disable: w => w.paletteID() === "default" });

Heat.prototype.publish("radius", 25, "number", "Point radius (25 by default)");
Heat.prototype.publish("blur", 15, "number", "Point blur radius (15 by default)");
Heat.prototype.publish("minOpacity", 0.05, "number", "Minimum point opacity (0.05 by default)");
