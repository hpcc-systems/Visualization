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
        const valueSize = (this.orientation() === "horizontal" ? this.width() : this.height()) - this.lineWidth();
        const domainSize = this.orientation() === "horizontal" ? this.height() : this.width();
        const scale = d3ScaleLinear()
            .domain([
                this.data()[0],
                this.data()[4]
            ])
            .range([
                this.edgePadding(),
                valueSize - this.edgePadding()
            ])
            ;
        const candleWidth = this.candleWidth_exists() ? this.candleWidth() : domainSize;
        const lineWidth = this.lineWidth();
        const lineColor = this.lineColor();
        const roundedCorners = this.roundedCorners();
        const q0x = this.edgePadding();
        let q1x = scale(this.data()[1]);
        let q2x = scale(this.data()[2]);
        let q3x = scale(this.data()[3]);
        const dataTop = -candleWidth / 2;
        const dataBottom = candleWidth / 2;
        const upperTextRotation = this.upperTextRotation();
        const lowerTextRotation = this.lowerTextRotation();
        const padding = this.textPadding();
        const labelFontSize = this.labelFontSize();
        const valueFontSize = this.valueFontSize();
        const sz = Math.max(labelFontSize, valueFontSize);
        const q4x = valueSize - q0x;
        while (q1x - q0x < sz) {
            q1x += sz;
        }
        while (q2x - q1x < sz) {
            q2x += sz;
        }
        while (q3x - q2x < sz) {
            q3x += sz;
        }
        while (q4x - q3x < sz) {
            q3x -= sz;
        }
        while (q3x - q2x < sz) {
            q2x -= sz;
        }
        while (q2x - q1x < sz) {
            q1x -= sz;
        }
        let transX = (-valueSize / 2) - (this.lineWidth() / 2);
        let transY = 0;
        let rotate = 0;
        const s = 1;
        let textScale = 1;
        let labelAnchor = "start";
        let valueAnchor = "end";
        if (this.orientation() === "vertical") {
            transX = 0;
            transY = valueSize / 2 + (this.lineWidth() / 2);
            rotate = -90;
            labelAnchor = "end";
            valueAnchor = "start";
            textScale = -1;
        }
        this._g
            .style("shape-rendering", "crispEdges")
            .attr("transform", `translate(${transX},${transY})rotate(${rotate})scale(${s})`)
            ;
        this._leftLine
            .attr("fill", lineColor)
            .attr("height", candleWidth)
            .attr("width", lineWidth)
            .attr("x", q0x)
            .attr("y", dataTop)
            .attr("rx", roundedCorners)
            .attr("ry", roundedCorners)
            ;
        this._rightLine
            .attr("class", "right-line")
            .attr("fill", lineColor)
            .attr("height", candleWidth)
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
            .attr("y", -lineWidth / 2)
            ;
        this._midOuterRect
            .attr("fill", lineColor)
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("x", q1x)
            .attr("y", dataTop)
            .attr("rx", roundedCorners)
            .attr("ry", roundedCorners)
            ;
        this._midInnerRect1
            .attr("fill", this.innerRectColor())
            .attr("height", candleWidth - (lineWidth * 2))
            .attr("width", q2x - (q1x + (lineWidth * 2)))
            .attr("x", q1x + lineWidth)
            .attr("y", lineWidth - (candleWidth / 2))
            .attr("rx", roundedCorners * 0.618)
            .attr("ry", roundedCorners * 0.618)
            ;
        this._midInnerRect2
            .attr("fill", this.innerRectColor())
            .attr("height", candleWidth - (lineWidth * 2))
            .attr("width", q3x - q2x - lineWidth)
            .attr("x", q2x)
            .attr("y", lineWidth - (candleWidth / 2))
            .attr("rx", roundedCorners * 0.618)
            .attr("ry", roundedCorners * 0.618)
            ;
        this._q0text
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("display", this.showLabels() ? null : "none")
            .attr("fill", this.textColor())
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q0x}, ${dataTop - padding})rotate(${upperTextRotation})scale(${textScale})`)
            .attr("font-size", labelFontSize)
            .attr("text-anchor", labelAnchor)
            .attr("alignment-baseline", "hanging")
            .text(this.columns()[0])
            ;
        this._q1text
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("display", this.showLabels() ? null : "none")
            .attr("fill", this.textColor())
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q1x}, ${dataTop - padding})rotate(${upperTextRotation})scale(${textScale})`)
            .attr("font-size", labelFontSize)
            .attr("text-anchor", labelAnchor)
            .attr("alignment-baseline", "middle")
            .text(this.columns()[1])
            ;
        this._q2text
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("display", this.showLabels() ? null : "none")
            .attr("fill", this.textColor())
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q2x}, ${dataTop - padding})rotate(${upperTextRotation})scale(${textScale})`)
            .attr("font-size", labelFontSize)
            .attr("text-anchor", labelAnchor)
            .attr("alignment-baseline", "middle")
            .text(this.columns()[2])
            ;
        this._q3text
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("display", this.showLabels() ? null : "none")
            .attr("fill", this.textColor())
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q3x}, ${dataTop - padding})rotate(${upperTextRotation})scale(${textScale})`)
            .attr("font-size", labelFontSize)
            .attr("text-anchor", labelAnchor)
            .attr("alignment-baseline", "middle")
            .text(this.columns()[3])
            ;
        this._q4text
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("display", this.showLabels() ? null : "none")
            .attr("fill", this.textColor())
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q4x + lineWidth}, ${dataTop - padding})rotate(${upperTextRotation})scale(${textScale})`)
            .attr("font-size", labelFontSize)
            .attr("text-anchor", labelAnchor)
            .attr("alignment-baseline", "baseline")
            .text(this.columns()[4])
            ;
        this._q0val
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("display", this.showValues() ? null : "none")
            .attr("fill", this.textColor())
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q0x}, ${dataBottom + padding})rotate(${lowerTextRotation})scale(${textScale})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", valueAnchor)
            .attr("alignment-baseline", "hanging")
            .text(this.data()[0])
            ;
        this._q1val
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("display", this.showValues() ? null : "none")
            .attr("fill", this.textColor())
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q1x}, ${dataBottom + padding})rotate(${lowerTextRotation})scale(${textScale})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", valueAnchor)
            .attr("alignment-baseline", "middle")
            .text(this.data()[1])
            ;
        this._q2val
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("display", this.showValues() ? null : "none")
            .attr("fill", this.textColor())
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q2x}, ${dataBottom + padding})rotate(${lowerTextRotation})scale(${textScale})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", valueAnchor)
            .attr("alignment-baseline", "middle")
            .text(this.data()[2])
            ;
        this._q3val
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("display", this.showValues() ? null : "none")
            .attr("fill", this.textColor())
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q3x}, ${dataBottom + padding})rotate(${lowerTextRotation})scale(${textScale})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", valueAnchor)
            .attr("alignment-baseline", "middle")
            .text(this.data()[3])
            ;
        this._q4val
            .attr("height", candleWidth)
            .attr("width", q3x - q1x)
            .attr("display", this.showValues() ? null : "none")
            .attr("fill", this.textColor())
            .attr("x", 0)
            .attr("y", 0)
            .attr("transform", `translate(${q4x + lineWidth}, ${dataBottom + padding})rotate(${lowerTextRotation})scale(${textScale})`)
            .attr("font-size", valueFontSize)
            .attr("text-anchor", valueAnchor)
            .attr("alignment-baseline", "baseline")
            .text(this.data()[4])
            ;
    }
}
QuartileCandlestick.prototype._class += " chart_QuartileCandlestick";

export interface QuartileCandlestick {
    orientation(): "horizontal" | "vertical";
    orientation(_: "horizontal" | "vertical"): this;
    textPadding(): number;
    textPadding(_: number): this;
    edgePadding(): number;
    edgePadding(_: number): this;
    candleWidth(): number;
    candleWidth(_: number): this;
    candleWidth_exists(): boolean;
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
    textColor(): string;
    textColor(_: string): this;
    showLabels(): boolean;
    showLabels(_: boolean): this;
    showValues(): boolean;
    showValues(_: boolean): this;
}
QuartileCandlestick.prototype.publish("textColor", "black", "html-color", "Color of label and value text");
QuartileCandlestick.prototype.publish("showLabels", true, "boolean", "If true, labels will be shown");
QuartileCandlestick.prototype.publish("showValues", true, "boolean", "If true, values will be shown");
QuartileCandlestick.prototype.publish("orientation", "horizontal", "set", "Determines layout", ["horizontal", "vertical"]);
QuartileCandlestick.prototype.publish("valueFontSize", 12, "number", "Font size of value text (pixels)");
QuartileCandlestick.prototype.publish("labelFontSize", 12, "number", "Font size of label text (pixels)");
QuartileCandlestick.prototype.publish("roundedCorners", 8, "number", "Radius of rounded rect corners (pixels)");
QuartileCandlestick.prototype.publish("lineWidth", 4, "number", "Width of lines (pixels)");
QuartileCandlestick.prototype.publish("candleWidth", null, "number", "Height of outer rect (pixels)", null, {optional: true});
QuartileCandlestick.prototype.publish("textPadding", 8, "number", "Padding between outer rect and text (pixels)");
QuartileCandlestick.prototype.publish("edgePadding", 30, "number", "Padding between outer rect and left/right sides (pixels)");
QuartileCandlestick.prototype.publish("lineColor", "#333", "html-color", "Color of outer rect and lines");
QuartileCandlestick.prototype.publish("innerRectColor", "white", "html-color", "Color of the inner rects");
QuartileCandlestick.prototype.publish("upperTextRotation", -60, "number", "Rotation of label text (degrees)");
QuartileCandlestick.prototype.publish("lowerTextRotation", -60, "number", "Rotation of value text (degrees)");
