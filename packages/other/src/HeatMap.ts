import { CanvasWidget, Palette } from "@hpcc-js/common";
import _simpleheat from "simpleheat";

const simpleheat = (window as any).simpleheat || _simpleheat.default || _simpleheat;

export class HeatMap extends CanvasWidget {
    _heat;
    _palette;

    constructor() {
        super();
    }

    enter(domNode, element) {
        CanvasWidget.prototype.enter.apply(this, arguments);
        // canvas size needs to be set before render
        this.resize(this._size);
        this._heat = simpleheat(domNode);
    }

    update(domNode, element) {
        CanvasWidget.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        if (this.topLeftX_exists() && this.topLeftY_exists() && this.bottomRightX_exists() && this.bottomRightY_exists()) {
            this._heat.data(this.skewedData());
        } else {
            this._heat.data(this.data());
        }

        if (this.radius()) {
            this._heat.radius(this.radius(), this.blur());
        }
        if (this.usePalette()) {
            const grad = {};
            for (let idx = 1; idx <= this.colorCount(); idx++) {
                const value = idx / this.colorCount();
                grad[value] = this._palette(idx, 1, this.colorCount());
            }
            this._heat.defaultGradient = grad;
            this._heat.gradient(grad);
        } else if (this.gradient()) {
            this._heat.defaultGradient = this.gradient();
            this._heat.gradient(this.gradient());
        }

        this._heat.draw();
    }

    exit(domNode, element) {
        delete this._heat;
        CanvasWidget.prototype.exit.apply(this, arguments);
    }

    resize(size: any): this {
        const retVal = CanvasWidget.prototype.resize.apply(this, arguments);
        if (this._heat !== undefined) {
            this._heat.resize();
        }
        return retVal;
    }

    skewedData() {
        const context = this;
        const retArr = [];
        const arr = this.data();
        const box = this.element().node().getBoundingClientRect();

        const coordsWidth = this.bottomRightX() - this.topLeftX();
        const coordsHeight = this.bottomRightY() - this.topLeftY();

        const pixelValueX = coordsWidth / box.width;
        const pixelValueY = coordsHeight / box.height;

        arr.forEach(function (n) {
            const left = Math.abs(n[0] - context.topLeftX());
            const top = Math.abs(n[1] - context.topLeftY());

            const newX = left / pixelValueX;
            const newY = top / pixelValueY;

            retArr.push([newX, newY, n[2]]);
        });

        return retArr;
    }

    radius_exists: () => boolean;
    blur_exists: () => boolean;
    max_exists: () => boolean;
    gradient_exists: () => boolean;
    usePalette_exists: () => boolean;
    colorCount_exists: () => boolean;
    paletteID_exists: () => boolean;
    useClonedPalette_exists: () => boolean;
    topLeftX_exists: () => boolean;
    topLeftY_exists: () => boolean;
    bottomRightX_exists: () => boolean;
    bottomRightY_exists: () => boolean;
}
HeatMap.prototype._class += " other_HeatMap";
HeatMap.prototype._palette = Palette.rainbow("default");

export interface HeatMap {
    radius(): number;
    radius(_: number): this;
    blur(): number;
    blur(_: number): this;
    max(): number;
    max(_: number): this;
    gradient(): object;
    gradient(_: object): this;
    usePalette(): boolean;
    usePalette(_: boolean): this;
    colorCount(): number;
    colorCount(_: number): this;
    paletteID(): string;
    paletteID(_: string): this;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    topLeftX(): number;
    topLeftX(_: number): this;
    topLeftY(): number;
    topLeftY(_: number): this;
    bottomRightX(): number;
    bottomRightX(_: number): this;
    bottomRightY(): number;
    bottomRightY(_: number): this;
}
HeatMap.prototype.publish("radius", 15, "number", "Set point radius", null, { tags: ["Basic"] });
HeatMap.prototype.publish("blur", 15, "number", "Set point blur", null, { tags: ["Basic"] });
HeatMap.prototype.publish("max", 1, "number", "Set max data value", null, { tags: ["Basic"] });
HeatMap.prototype.publish("gradient", { 0.4: "blue", 0.6: "cyan", 0.7: "lime", 0.8: "yellow", 1.0: "red" }, "object", "Set gradient colors", null, { tags: ["Basic"] });
HeatMap.prototype.publish("usePalette", false, "boolean", "If true, uses paletteID and colorCount to determine gradient", null, { tags: ["Basic"] });
HeatMap.prototype.publish("colorCount", 10, "number", "Top left x-value", null, { tags: ["Basic"] });
HeatMap.prototype.publish("paletteID", "default", "set", "Palette ID", HeatMap.prototype._palette.switch(), { tags: ["Basic"] });
HeatMap.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
HeatMap.prototype.publish("topLeftX", null, "number", "Top left x-value", null, { tags: ["Basic"], optional: true });
HeatMap.prototype.publish("topLeftY", null, "number", "Top left y-value", null, { tags: ["Basic"], optional: true });
HeatMap.prototype.publish("bottomRightX", null, "number", "Bottom right x-value", null, { tags: ["Basic"], optional: true });
HeatMap.prototype.publish("bottomRightY", null, "number", "Bottom right y-value", null, { tags: ["Basic"], optional: true });
