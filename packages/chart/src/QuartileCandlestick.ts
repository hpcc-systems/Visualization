import { SVGWidget } from "@hpcc-js/common";
import { scaleLinear as d3ScaleLinear } from "d3-scale";

export class QuartileCandlestick extends SVGWidget {
    protected _g;
    protected _leftLine;
    protected _rightLine;
    protected _midLine;
    protected _midOuterRect;
    protected _midInnerRect1;
    protected _midInnerRect2;
    protected _q0text;
    protected _q1text;
    protected _q2text;
    protected _q3text;
    protected _q4text;
    protected _q0val;
    protected _q1val;
    protected _q2val;
    protected _q3val;
    protected _q4val;
    constructor() {
        super();
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        this._g = element.append("g");
        this._leftLine = this._g.append("rect");
        this._rightLine = this._g.append("rect");
        this._midLine = this._g.append("rect");
        this._midOuterRect = this._g.append("rect");
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
        const upperTextRotation = this.upperTextRotation();
        const lowerTextRotation = this.lowerTextRotation();
        const padding = this.textPadding();
        const labelFontSize = this.labelFontSize();
        const valueFontSize = this.valueFontSize();
        const q4x = this.width() - q0x;
        const transX = -this.width() / 2;
        const transY = 0;
        this._g
            .attr("transform", `translate(${transX},${transY})`)
            ;
        this._leftLine
            .attr("fill", lineColor)
            .attr("height", dataHeight)
            .attr("width", lineWidth)
            .attr("x", q0x)
            .attr("y", dataTop)
            .attr("rx", roundedCorners)
            .attr("ry", roundedCorners)
            ;
        this._rightLine
            .attr("fill", lineColor)
            .attr("height", dataHeight)
            .attr("width", lineWidth)
            .attr("x", q4x)
            .attr("y", dataTop)
            .attr("rx", roundedCorners)
            .attr("ry", roundedCorners)
            ;
        this._midLine
            .attr("fill", lineColor)
            .attr("height", lineWidth)
            .attr("width", q4x - q0x)
            .attr("x", q0x)
            .attr("y", 0)
            ;
        this._midOuterRect
            .attr("fill", lineColor)
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", q1x)
            .attr("y", dataTop)
            .attr("rx", roundedCorners)
            .attr("ry", roundedCorners)
            ;
        this._midInnerRect1
            .attr("fill", this.innerRectColor())
            .attr("height", dataHeight - (lineWidth * 2))
            .attr("width", q2x - (q1x + (lineWidth * 2)))
            .attr("x", q1x + lineWidth)
            .attr("y", lineWidth - (dataHeight / 2))
            .attr("rx", roundedCorners * 0.618)
            .attr("ry", roundedCorners * 0.618)
            ;
        this._midInnerRect2
            .attr("fill", this.innerRectColor())
            .attr("height", dataHeight - (lineWidth * 2))
            .attr("width", q3x - q2x - lineWidth)
            .attr("x", q2x)
            .attr("y", lineWidth - (dataHeight / 2))
            .attr("rx", roundedCorners * 0.618)
            .attr("ry", roundedCorners * 0.618)
            ;
        this._q0text
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q0x}, ${dataTop - padding})rotate(${upperTextRotation})`)
            .attr("font-size", labelFontSize)
            .text(this.columns()[0])
            ;
        this._q1text
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q1x}, ${dataTop - padding})rotate(${upperTextRotation})`)
            .attr("font-size", labelFontSize)
            .text(this.columns()[1])
            ;
        this._q2text
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q2x}, ${dataTop - padding})rotate(${upperTextRotation})`)
            .attr("font-size", labelFontSize)
            .text(this.columns()[2])
            ;
        this._q3text
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q3x}, ${dataTop - padding})rotate(${upperTextRotation})`)
            .attr("font-size", labelFontSize)
            .text(this.columns()[3])
            ;
        this._q4text
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q4x}, ${dataTop - padding})rotate(${upperTextRotation})`)
            .attr("font-size", labelFontSize)
            .text(this.columns()[4])
            ;
        this._q0val
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q0x}, ${dataBottom + padding})rotate(${lowerTextRotation})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", "end")
            .text(this.data()[0])
            ;
        this._q1val
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q1x}, ${dataBottom + padding})rotate(${lowerTextRotation})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", "end")
            .text(this.data()[1])
            ;
        this._q2val
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q2x}, ${dataBottom + padding})rotate(${lowerTextRotation})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", "end")
            .text(this.data()[2])
            ;
        this._q3val
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q3x}, ${dataBottom + padding})rotate(${lowerTextRotation})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", "end")
            .text(this.data()[3])
            ;
        this._q4val
            .attr("height", dataHeight)
            .attr("width", q3x - q1x)
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q4x}, ${dataBottom + padding})rotate(${lowerTextRotation})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", "end")
            .text(this.data()[4])
            ;
    }
}
QuartileCandlestick.prototype._class += " chart_QuartileCandlestick";

export interface QuartileCandlestick {
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
    innerRectColor(): string;
    innerRectColor(_: string): this;
    lowerTextRotation(): number;
    lowerTextRotation(_: number): this;
    upperTextRotation(): number;
    upperTextRotation(_: number): this;
    roundedCorners(): number;
    roundedCorners(_: number): this;
    labelFontSize(): number;
    labelFontSize(_: number): this;
    valueFontSize(): number;
    valueFontSize(_: number): this;
}
QuartileCandlestick.prototype.publish("valueFontSize", 12, "number", "Font size of value text (pixels)");
QuartileCandlestick.prototype.publish("labelFontSize", 12, "number", "Font size of label text (pixels)");
QuartileCandlestick.prototype.publish("roundedCorners", 8, "number", "Radius of rounded rect corners (pixels)");
QuartileCandlestick.prototype.publish("lineWidth", 4, "number", "Width of lines (pixels)");
QuartileCandlestick.prototype.publish("dataHeight", 60, "number", "Height of outer rect (pixels)");
QuartileCandlestick.prototype.publish("textPadding", 8, "number", "Padding between outer rect and text (pixels)");
QuartileCandlestick.prototype.publish("edgePadding", 30, "number", "Padding between outer rect and left/right sides (pixels)");
QuartileCandlestick.prototype.publish("lineColor", "#333", "html-color", "Color of outer rect and lines");
QuartileCandlestick.prototype.publish("innerRectColor", "white", "html-color", "Color of the inner rects");
QuartileCandlestick.prototype.publish("upperTextRotation", -60, "number", "Rotation of label text (degrees)");
QuartileCandlestick.prototype.publish("lowerTextRotation", -60, "number", "Rotation of value text (degrees)");
