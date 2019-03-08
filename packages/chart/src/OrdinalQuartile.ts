import { d3SelectionType, Palette, SVGWidget } from "@hpcc-js/common";
import { scaleLinear as d3ScaleLinear } from "d3-scale";

export class OrdinalQuartile extends SVGWidget {
    protected _g: d3SelectionType;
    protected _leftRect: d3SelectionType;
    protected _rightRect: d3SelectionType;
    protected _outerRect: d3SelectionType;
    protected _midInnerRect1: d3SelectionType;
    protected _midInnerRect2: d3SelectionType;
    protected _q0text: d3SelectionType;
    protected _q1text: d3SelectionType;
    protected _q2text: d3SelectionType;
    protected _q3text: d3SelectionType;
    protected _q4text: d3SelectionType;
    protected _q0val: d3SelectionType;
    protected _q1val: d3SelectionType;
    protected _q2val: d3SelectionType;
    protected _q3val: d3SelectionType;
    protected _q4val: d3SelectionType;
    _palette;
    constructor() {
        super();
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        this._g = element.append("g");
        this._outerRect = this._g.append("rect");
        this._leftRect = this._g.append("rect");
        this._rightRect = this._g.append("rect");
        this._midInnerRect1 = this._g.append("rect");
        this._midInnerRect2 = this._g.append("rect");
        this._q0text = this._g.append("text");
        this._q1text = this._g.append("text");
        this._q2text = this._g.append("text");
        this._q3text = this._g.append("text");
        this._q4text = this._g.append("text");
        this._q0val = this._g.append("text");
        this._q1val = this._g.append("text");
        this._q2val = this._g.append("text");
        this._q3val = this._g.append("text");
        this._q4val = this._g.append("text");
    }
    update(domNode, element) {
        super.update(domNode, element);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        const scale = d3ScaleLinear()
            .domain([
                this.data()[0],
                this.data()[4]
            ])
            .range([
                this.edgePadding(),
                this.width() - this.edgePadding()
            ])
            ;
        const dataHeight = this.dataHeight();
        const lineWidth = this.lineWidth();
        const lineColor = this.lineColor();
        const roundedCorners = this.roundedCorners();
        const q0x = this.edgePadding();
        const q1x = scale(this.data()[1]);
        const q2x = scale(this.data()[2]);
        const q3x = scale(this.data()[3]);
        const dataTop = -dataHeight / 2;
        const dataBottom = dataHeight / 2;
        const labelTextRotation = this.labelTextRotation();
        const valueTextRotation = this.valueTextRotation();
        const padding = this.textPadding();
        const labelFontSize = this.labelFontSize();
        const valueFontSize = this.valueFontSize();
        const q4x = this.width() - q0x;
        const transX = -this.width() / 2;
        const transY = 0;
        this._g
            .attr("transform", `translate(${transX},${transY})`)
            ;
        this._outerRect
            .attr("fill", lineColor)
            .attr("height", dataHeight)
            .attr("width", q4x - q0x)
            .attr("x", q0x)
            .attr("y", dataTop)
            .attr("rx", roundedCorners)
            .attr("ry", roundedCorners)
            ;
        this._leftRect
            .attr("fill", this._palette(0))
            .attr("height", dataHeight - (lineWidth * 2))
            .attr("width", q1x - q0x - lineWidth)
            .attr("x", q0x + lineWidth)
            .attr("y", dataTop + lineWidth)
            .attr("rx", roundedCorners * 0.618)
            .attr("ry", roundedCorners * 0.618)
            ;
        this._midInnerRect1
            .attr("fill", this._palette(1))
            .attr("height", dataHeight - (lineWidth * 2))
            .attr("width", q2x - (q1x + (lineWidth * 2)))
            .attr("x", q1x + lineWidth)
            .attr("y", lineWidth - (dataHeight / 2))
            .attr("rx", roundedCorners * 0.618)
            .attr("ry", roundedCorners * 0.618)
            ;
        this._midInnerRect2
            .attr("fill", this._palette(2))
            .attr("height", dataHeight - (lineWidth * 2))
            .attr("width", q3x - q2x - lineWidth)
            .attr("x", q2x)
            .attr("y", lineWidth - (dataHeight / 2))
            .attr("rx", roundedCorners * 0.618)
            .attr("ry", roundedCorners * 0.618)
            ;
        this._rightRect
            .attr("fill", this._palette(3))
            .attr("height", dataHeight - (lineWidth * 2))
            .attr("width", q4x - q3x - lineWidth)
            .attr("x", q3x)
            .attr("y", dataTop + lineWidth)
            .attr("rx", roundedCorners * 0.618)
            .attr("ry", roundedCorners * 0.618)
            ;
        this._q0text
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q0x}, ${dataTop - padding})rotate(${labelTextRotation})`)
            .attr("font-size", labelFontSize)
            .text(this.columns()[0])
            ;
        this._q1text
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q1x}, ${dataTop - padding})rotate(${labelTextRotation})`)
            .attr("font-size", labelFontSize)
            .text(this.columns()[1])
            ;
        this._q2text
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q2x}, ${dataTop - padding})rotate(${labelTextRotation})`)
            .attr("font-size", labelFontSize)
            .text(this.columns()[2])
            ;
        this._q3text
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q3x}, ${dataTop - padding})rotate(${labelTextRotation})`)
            .attr("font-size", labelFontSize)
            .text(this.columns()[3])
            ;
        this._q4text
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q4x}, ${dataTop - padding})rotate(${labelTextRotation})`)
            .attr("font-size", labelFontSize)
            .text(this.columns()[4])
            ;
        this._q0val
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q0x}, ${dataBottom + padding})rotate(${valueTextRotation})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", "end")
            .text(this.data()[0])
            ;
        this._q1val
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q1x}, ${dataBottom + padding})rotate(${valueTextRotation})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", "end")
            .text(this.data()[1])
            ;
        this._q2val
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q2x}, ${dataBottom + padding})rotate(${valueTextRotation})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", "end")
            .text(this.data()[2])
            ;
        this._q3val
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q3x}, ${dataBottom + padding})rotate(${valueTextRotation})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", "end")
            .text(this.data()[3])
            ;
        this._q4val
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q4x}, ${dataBottom + padding})rotate(${valueTextRotation})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", "end")
            .text(this.data()[4])
            ;
    }
}
OrdinalQuartile.prototype._class += " chart_OrdinalQuartile";
OrdinalQuartile.prototype._palette = Palette.ordinal("default");

export interface OrdinalQuartile {
    paletteID(): string;
    paletteID(_: string): this;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    textPadding(): number;
    textPadding(_: number): this;
    edgePadding(): number;
    edgePadding(_: number): this;
    dataHeight(): number;
    dataHeight(_: number): this;
    lineWidth(): number;
    lineWidth(_: number): this;
    lineColor(): string;
    lineColor(_: string): this;
    valueTextRotation(): number;
    valueTextRotation(_: number): this;
    labelTextRotation(): number;
    labelTextRotation(_: number): this;
    roundedCorners(): number;
    roundedCorners(_: number): this;
    labelFontSize(): number;
    labelFontSize(_: number): this;
    valueFontSize(): number;
    valueFontSize(_: number): this;
}
OrdinalQuartile.prototype.publish("paletteID", "default", "set", "Color palette for this widget", OrdinalQuartile.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
OrdinalQuartile.prototype.publish("useClonedPalette", true, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
OrdinalQuartile.prototype.publish("valueFontSize", 12, "number", "Font size of value text (pixels)");
OrdinalQuartile.prototype.publish("labelFontSize", 12, "number", "Font size of label text (pixels)");
OrdinalQuartile.prototype.publish("roundedCorners", 8, "number", "Radius of rounded rect corners (pixels)");
OrdinalQuartile.prototype.publish("lineWidth", 4, "number", "Width of lines (pixels)");
OrdinalQuartile.prototype.publish("dataHeight", 60, "number", "Height of outer rect (pixels)");
OrdinalQuartile.prototype.publish("textPadding", 8, "number", "Padding between outer rect and text (pixels)");
OrdinalQuartile.prototype.publish("edgePadding", 30, "number", "Padding between outer rect and left/right sides (pixels)");
OrdinalQuartile.prototype.publish("lineColor", "#333", "html-color", "Color of outer rect and lines");
OrdinalQuartile.prototype.publish("labelTextRotation", -60, "number", "Rotation of label text (degrees)");
OrdinalQuartile.prototype.publish("valueTextRotation", -60, "number", "Rotation of value text (degrees)");
