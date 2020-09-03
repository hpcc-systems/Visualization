import { max, Palette } from "@hpcc-js/common";
import { XYAxis } from "./XYAxis";

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

    radius(r: number): this {
        this.radiusX(r);
        this.radiusY(r);
        return this;
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
        } else {
            this._heat.gradient(this._heat.defaultGradient);
        }

        this._heat.resize();

        const radiusX = this.radiusAsPercent() ? this.radiusX() * width / 100 : this.radiusX();
        const radiusY = this.radiusAsPercent() ? this.radiusY() * height / 100 : this.radiusY();

        this._heat
            .clear()
            .radius(radiusX, radiusY, this.blur())
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

    radiusX(): number;
    radiusX(_: number): this;
    radiusY(): number;
    radiusY(_: number): this;
    radiusAsPercent(): boolean;
    radiusAsPercent(_: boolean): this;
    blur(): number;
    blur(_: number): this;

    minOpacity(): number;
    minOpacity(_: number): this;
}

Heat.prototype.publish("paletteID", "default", "set", "Color palette for this widget", Heat.prototype._palette.switch(), { tags: ["Basic"] });
Heat.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Heat.prototype.publish("reversePalette", false, "boolean", "Reverse Palette Colors", null, { disable: w => w.paletteID() === "default" });

Heat.prototype.publish("radiusX", 25, "number", "Point X radius (25 by default)");
Heat.prototype.publish("radiusY", 25, "number", "Point Y radius (25 by default)");
Heat.prototype.publish("radiusAsPercent", false, "boolean", "Calculate RadiusX + RadiusY as % of size");
Heat.prototype.publish("blur", 15, "number", "Point blur radius (15 by default)");

Heat.prototype.publish("minOpacity", 0.05, "number", "Minimum point opacity (0.05 by default)");

//  The following code is a modified version of 
//   - https://github.com/mourner/simpleheat
//   - Licensed under BSD-2-Clause - https://github.com/mourner/simpleheat/blob/gh-pages/LICENSE
//  Changes:
//    *  Fixed TS syntax issues
//    *  Added support for eliptical shapes instead of circles

function simpleheat(canvas): void {
    if (!(this instanceof simpleheat)) return new simpleheat(canvas);

    this._canvas = canvas = typeof canvas === "string" ? document.getElementById(canvas) : canvas;

    this._ctx = canvas.getContext("2d");
    this._width = canvas.width;
    this._height = canvas.height;

    this._max = 1;
    this._data = [];
}

simpleheat.prototype = {

    defaultRadius: 25,

    defaultGradient: {
        0.4: "blue",
        0.6: "cyan",
        0.7: "lime",
        0.8: "yellow",
        1.0: "red"
    },

    data: function (data) {
        this._data = data;
        return this;
    },

    max: function (max) {
        this._max = max;
        return this;
    },

    add: function (point) {
        this._data.push(point);
        return this;
    },

    clear: function () {
        this._data = [];
        return this;
    },

    radius: function (rX, rY, blur) {
        blur = blur === undefined ? 15 : blur;

        // create a grayscale blurred ellipse image that we'll use for drawing points
        const ellipse = this._ellipse = this._createCanvas();
        const ctx = ellipse.getContext("2d");
        const rX2 = this._r = rX + blur;
        const rY2 = this._r = rY + blur;

        ellipse.width = rX2 * 2;
        ellipse.height = rY2 * 2;

        ctx.shadowOffsetX = ctx.shadowOffsetY = rX2 * 2;
        ctx.shadowOffsetY = ctx.shadowOffsetY = rY2 * 2;
        ctx.shadowBlur = blur;
        ctx.shadowColor = "black";

        ctx.beginPath();
        ctx.ellipse(-rX2, -rY2, rX, rY, 0, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        return this;
    },

    resize: function () {
        this._width = this._canvas.width;
        this._height = this._canvas.height;
    },

    gradient: function (grad) {
        // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
        const canvas = this._createCanvas(),
            ctx = canvas.getContext("2d"),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);

        canvas.width = 1;
        canvas.height = 256;

        for (const i in grad) {
            gradient.addColorStop(+i, grad[i]);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this._grad = ctx.getImageData(0, 0, 1, 256).data;

        return this;
    },

    draw: function (minOpacity) {
        if (!this._ellipse) this.radius(this.defaultRadius, this.defaultRadius);
        if (!this._grad) this.gradient(this.defaultGradient);

        const ctx = this._ctx;

        ctx.clearRect(0, 0, this._width, this._height);

        // draw a grayscale heatmap by putting a blurred ellipse at each data point
        for (let i = 0, len = this._data.length, p; i < len; i++) {
            p = this._data[i];
            ctx.globalAlpha = Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity);
            ctx.drawImage(this._ellipse, p[0] - this._r, p[1] - this._r);
        }

        // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
        const colored = ctx.getImageData(0, 0, this._width, this._height);
        this._colorize(colored.data, this._grad);
        ctx.putImageData(colored, 0, 0);

        return this;
    },

    _colorize: function (pixels, gradient) {
        for (let i = 0, len = pixels.length, j; i < len; i += 4) {
            j = pixels[i + 3] * 4; // get gradient color from opacity value

            if (j) {
                pixels[i] = gradient[j];
                pixels[i + 1] = gradient[j + 1];
                pixels[i + 2] = gradient[j + 2];
            }
        }
    },

    _createCanvas: function () {
        if (typeof document !== "undefined") {
            return document.createElement("canvas");
        } else {
            // create a new canvas instance in node.js
            // the canvas class needs to have a default constructor without any parameter
            return new this._canvas.constructor();
        }
    }
};
