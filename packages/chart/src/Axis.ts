import { SVGWidget } from "@hpcc-js/common";
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft, axisRight as d3AxisRight, axisTop as d3AxisTop } from "d3-axis";
import { format as d3Format } from "d3-format";
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear, scaleLog as d3ScaleLog, scalePow as d3ScalePow, scaleTime as d3ScaleTime } from "d3-scale";
import { select as d3Select } from "d3-selection";
import { timeFormat as d3TimeFormat, timeParse as d3TimeParse } from "d3-time-format";

import "../src/Axis.css";

export interface IOverflow {
    left: number;
    top: number;
    right: number;
    bottom: number;
    depth: number;
    tickOverlapModulus: number;
}

export class Axis extends SVGWidget {
    _origType;
    _origTimePattern;

    protected parser;
    protected parserInvert;
    protected formatter: (date: Date) => string;
    protected d3Scale;
    protected d3Axis;
    protected d3Guides;
    protected _guideElement;
    protected svg;
    protected svgAxis;
    protected svgGuides;

    constructor(drawStartPosition: "origin" | "center" = "origin") {
        super();
        this._drawStartPos = drawStartPosition;

        this.updateScale();
    }

    lowValue() {
        return this.parse(this.low());
    }

    highValue() {
        return this.parse(this.high());
    }

    parse(d, forceNumeric?) {
        if (d instanceof Array) {
            return d.map(function (d2) {
                return this.parse(d2);
            }, this);
        }
        if (d !== undefined && d !== null) {
            if (this.parser) {
                return this.parser(typeof d === "number" ? d.toString() : d);
            }
            if (forceNumeric && typeof d === "string") {
                return +d;
            }
        }
        return d;
    }

    parseInvert(d) {
        if (d instanceof Array) {
            return d.map(function (d2) {
                return this.parseInvert(d2);
            }, this);
        }
        if (this.parserInvert && d) {
            return this.parserInvert(d);
        }
        return d;
    }

    format(d) {
        if (d instanceof Array) {
            return d.map(function (d2) {
                return this.format(d2);
            }, this);
        }
        if (d !== undefined && d !== null && this.formatter) {
            return this.formatter(d);
        }
        return d;
    }

    parseFormat(d) {
        return this.format(this.parse(d));
    }

    scalePos(d) {
        let retVal = this.d3Scale(this.parse(d));
        if (this.type() === "ordinal") {
            retVal += this.bandwidth() / 2;
        }
        return retVal;
    }

    bandwidth() {
        return this.d3Scale.bandwidth ? this.d3Scale.bandwidth() : 0;
    }

    isHorizontal() {
        switch (this.orientation()) {
            case "left":
            case "right":
                return false;
            default:
        }
        return true;
    }

    domain(_?) {
        if (!arguments.length) return this.d3Scale.domain();
        this.d3Scale.domain(_);
        return this;
    }

    range(_?) {
        if (!arguments.length) {
            if (this.d3Scale.rangeRoundBands) {
                return this.d3Scale.rangeExtent();
            } else if (this.d3Scale.rangeRound) {
                return this.d3Scale.range();
            }
        }
        if (this.d3Scale.rangeRoundBands) {
            this.d3Scale.rangeRoundBands(_, 0.1);
        } else if (this.d3Scale.rangeRound) {
            this.d3Scale.range(_);
        }
        return this;
    }

    invert(pos) {
        return this.d3Scale.invert(pos);
    }

    guideTarget(_) {
        this._guideElement = d3Select(_)
            .attr("class", this._class)
            ;
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this.svg = element.append("g");
        this.svgAxis = this.svg.append("g")
            .attr("class", "axis")
            ;
        this.svgGuides = (this._guideElement || element).append("g")
            .attr("class", "guide")
            ;
    }

    protected _prevOrientation;
    updateScale(): this {
        switch (this.type()) {
            case "ordinal":
                this.d3Scale = d3ScaleBand()
                    .paddingInner(this.ordinalPaddingInner())
                    .paddingOuter(this.ordinalPaddingOuter())
                    ;
                if (this.ordinals_exists()) {
                    this.d3Scale.domain(this.ordinals());
                }
                this.parser = null;
                if (this.ordinalMappings_exists()) {
                    const mappings = this.ordinalMappings();
                    this.formatter = (_: any) => mappings[_] || _;
                } else {
                    this.formatter = null;
                }
                break;
            case "linear":
                this.d3Scale = d3ScaleLinear();
                if (this.low_exists() && this.high_exists()) {
                    this.d3Scale.domain([this.lowValue(), this.highValue()]);
                }
                this.parser = null;
                this.formatter = this.tickFormat_exists() ? d3Format(this.tickFormat()) : null;
                break;
            case "pow":
                this.d3Scale = d3ScalePow()
                    .exponent(this.powExponent())
                    ;
                if (this.low_exists() && this.high_exists()) {
                    this.d3Scale.domain([this.lowValue(), this.highValue()]);
                }
                this.parser = null;
                this.formatter = this.tickFormat_exists() ? d3Format(this.tickFormat()) : null;
                break;
            case "log":
                this.d3Scale = d3ScaleLog()
                    .base(this.logBase())
                    ;
                if (this.low_exists() && this.high_exists()) {
                    this.d3Scale.domain([this.lowValue(), this.highValue()]);
                }
                this.parser = null;
                this.formatter = this.tickFormat_exists() ? d3Format(this.tickFormat()) : null;
                break;
            case "time":
                this.d3Scale = d3ScaleTime();
                if (this.low_exists() && this.high_exists()) {
                    this.d3Scale.domain([this.lowValue(), this.highValue()]);
                }
                this.parser = this.timePattern_exists() ? d3TimeParse(this.timePattern()) : null;
                this.parserInvert = this.timePattern_exists() ? d3TimeFormat(this.timePattern()) : null;
                this.formatter = this.tickFormat_exists() ? d3TimeFormat(this.tickFormat()) : null;
                break;
            default:
        }
        if (this._prevOrientation !== this.orientation()) {
            switch (this.orientation()) {
                case "left":
                    this.d3Axis = d3AxisLeft(this.d3Scale);
                    this.d3Guides = d3AxisLeft(this.d3Scale);
                    break;
                case "top":
                    this.d3Axis = d3AxisTop(this.d3Scale);
                    this.d3Guides = d3AxisTop(this.d3Scale);
                    break;
                case "right":
                    this.d3Axis = d3AxisRight(this.d3Scale);
                    this.d3Guides = d3AxisRight(this.d3Scale);
                    break;
                case "bottom":
                default:
                    this.d3Axis = d3AxisBottom(this.d3Scale);
                    this.d3Guides = d3AxisBottom(this.d3Scale);
                    break;
            }
            this._prevOrientation = this.orientation();
            if (this.svgAxis) {
                this.svgAxis.html("");
            }
            if (this.svgGuides) {
                this.svgGuides.html("");
            }
        }

        if (this.extend()) {
            switch (this.type()) {
                case "ordinal":
                    break;
                default:
                    let length;
                    let delta;
                    let low;
                    let high;
                    let newLow;
                    let newHigh;
                    if (this.isHorizontal()) {
                        length = this.width();
                        this.d3Scale.range([0, length]);
                        delta = length * this.extend() / 100;
                        low = this.d3Scale.invert(0);
                        newLow = this.d3Scale.invert(-delta);
                        high = this.d3Scale.invert(length);
                        newHigh = this.d3Scale.invert(length + delta);
                    } else {
                        length = this.height();
                        this.d3Scale.range([length, 0]);
                        delta = length * this.extend() / 100;
                        low = this.d3Scale.invert(length);
                        newLow = this.d3Scale.invert(length + delta);
                        high = this.d3Scale.invert(0);
                        newHigh = this.d3Scale.invert(-delta);
                    }
                    if (newLow === low) { //  Edge case when there is only one item in the domain  ---
                        newLow = low - low * this.extend() / 100;
                    }
                    if (newHigh === high) { //  Edge case when there is only one item in the domain  ---
                        newHigh = high + high * this.extend() / 100;
                    }
                    if ((Math as any).sign(low) !== (Math as any).sign(newLow)) {
                        newLow = 0;
                    }
                    if ((Math as any).sign(high) !== (Math as any).sign(newHigh)) {
                        newHigh = 0;
                    }
                    this.d3Scale.domain([newLow, newHigh]);
                    break;
            }
        }

        this.d3Axis
            .scale(this.d3Scale)
            .tickFormat(this.formatter)
            .ticks(this.tickCount())
            ;
        this.d3Guides
            .scale(this.d3Scale)
            .tickSize(this.tickLength_exists() ? -this.tickLength() : 0)
            .tickFormat("")
            .ticks(this.tickCount())
            ;
        const customTicks = this.ticks();
        if (customTicks.length) {
            this.d3Axis
                .tickValues(customTicks.map(d => this.parse(d.value)))
                .tickFormat((_d, i) => {
                    return customTicks[i].label;
                });
            this.d3Guides
                .tickValues(customTicks.map(d => this.parse(d.value)));
        }
        return this;
    }

    adjustText(svg, tickOverlapModulus) {
        const isHoriztontal = this.isHorizontal();
        const isLeft = this.orientation() === "left";
        const isBottom = this.orientation() === "bottom";
        const context = this;
        const textSelection = svg.selectAll(".tick > text")
            .style("font-family", this.fontFamily())
            .style("font-size", this.fontSize_exists() ? this.fontSize() + "px" : null)
            ;
        if (this.overlapMode() === "linebreak") {
            if (this.type() === "ordinal") {
                textSelection
                    .call(function () {
                        return context.linebreak.apply(context, arguments);
                    }, this.bandwidth())
                    ;
            }
        } else if (this.overlapMode() === "wrap") {
            if (this.type() === "ordinal") {
                textSelection
                    .call(function () {
                        return context.wrap.apply(context, arguments);
                    }, this.bandwidth())
                    ;
            }
        } else {
            switch (isHoriztontal ? this.overlapMode() : "none") {
                case "stagger":
                    textSelection
                        .style("text-anchor", "middle")
                        .attr("dy", function (_d, i) { return (isBottom ? 1 : -1) * ((isBottom ? 0.71 : 0) + i % tickOverlapModulus) + "em"; })
                        .attr("dx", 0)
                        .attr("visibility", null)
                        .attr("transform", "rotate(0)")
                        ;
                    break;
                case "hide":
                    textSelection
                        .style("text-anchor", "middle")
                        .attr("dy", (isBottom ? 0.71 : 0) + "em")
                        .attr("dx", 0)
                        .attr("visibility", function (_d, i) { return i % tickOverlapModulus ? "hidden" : null; })
                        .attr("transform", "rotate(0)")
                        ;
                    break;
                case "rotate":
                    const deg = -(this.labelRotation()) || 0;
                    if (deg !== 0 && tickOverlapModulus > 1) {
                        textSelection
                            .each(function () {
                                const elm = d3Select(this);
                                const bbox = elm.node().getBBox();
                                const dyOff = (isBottom ? 1 : -1) * Math.sin(Math.PI * (-Math.abs(deg) / 180));
                                elm
                                    .style("text-anchor", deg > 0 ? (isBottom ? "start" : "end") : (isBottom ? "end" : "start"))
                                    .attr("dy", (bbox.height / 2 * dyOff) + "px")
                                    .attr("dx", deg > 0 ? (isBottom ? "0.71em" : "-0.71em") : (isBottom ? "-0.71em" : "0.71em"))
                                    .attr("transform", "rotate(" + deg + ")")
                                    .attr("visibility", null)
                                    ;
                            })
                            ;
                        break;
                    }
                /* falls through */
                default:
                    textSelection
                        .style("text-anchor", isHoriztontal ? "middle" : isLeft ? "end" : "start")
                        .attr("dy", isHoriztontal ? ((isBottom ? 0.71 : 0) + "em") : "0.32em")
                        .attr("dx", 0)
                        .attr("visibility", null)
                        .attr("transform", "rotate(0)")
                        ;
            }
        }
    }

    calcTickOverlapModulus(element) {
        let retVal = 1;
        switch (this.overlapMode()) {
            case "rotate":
            case "stagger":
            case "hide":
                const bboxArr = [];
                element.selectAll(".tick > text").each(function () {
                    const bbox = this.getBoundingClientRect();
                    for (let i = bboxArr.length - 1; i >= 0; --i) {
                        if (bboxArr[i].right < bbox.left) {
                            break;
                        }
                        if (bboxArr.length + 1 - i > retVal) {
                            retVal = bboxArr.length + 1 - i;
                        }
                    }
                    bboxArr.push(bbox);
                });
                break;
            default:
        }
        return retVal;
    }

    calcOverflow(element, ignoreText?): IOverflow {
        this.updateScale();
        if (this.hidden()) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                depth: 0,
                tickOverlapModulus: 1
            };
        }
        const isHorizontal = this.isHorizontal();
        this.range(isHorizontal ? [0, this.width()] : [this.height(), 0]);
        const tmpSvg = element.append("g").attr("class", this.classID());
        const tmpSvgG = tmpSvg.append("g");
        tmpSvgG
            .attr("class", isHorizontal ? "x" : "y")
            .call(this.d3Axis)
            ;
        if (ignoreText) {
            element.selectAll(".tick > text").remove();
        }

        const retVal: IOverflow = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            depth: 0,
            tickOverlapModulus: this.calcTickOverlapModulus(tmpSvgG)
        };
        this.adjustText(tmpSvgG, retVal.tickOverlapModulus);

        const bbox = tmpSvgG.node().getBBox();
        retVal.depth = isHorizontal ? bbox.height : bbox.width;
        switch (this.shrinkToFit()) {
            case "low":
            case "both":
                retVal.left = isHorizontal ? -bbox.x : 0;
                retVal.bottom = isHorizontal ? 0 : -(this.height() - (bbox.height + bbox.y));
                break;
            default:
        }
        switch (this.shrinkToFit()) {
            case "high":
            case "both":
                retVal.top = isHorizontal ? 0 : -bbox.y;
                retVal.right = isHorizontal ? -(this.width() - bbox.x - bbox.width) : 0;
                break;
            default:
        }
        tmpSvg.remove();

        return retVal;
    }

    wrap(_text, bandSize, re) {
        re = re || /\s+/;
        const context = this;
        _text.each(function () {
            const text = d3Select(this);
            const words = text.text().split(re).reverse();
            let line = [];
            let lineNumber = 0;
            const lineHeight = 1.1;
            const x = text.attr("x");
            const y = text.attr("y");
            const fs = parseFloat(text.style("font-size")) || 10;
            const maxLinesPerBand = Math.floor(bandSize / (fs * lineHeight)) - 1;
            const minWordsPerLine = context.isHorizontal() ? 1 : Math.ceil(words.length / maxLinesPerBand);
            const dy = parseFloat(text.attr("dy"))
                ;
            let tspan = text.text(null).append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em")
                ;
            let wordsOnLine = 0;
            let word = words.pop();
            while (word) {
                line.push(word);
                tspan.text(line.join(" "));
                wordsOnLine++;
                if ((tspan.node() as any).getComputedTextLength() > bandSize && wordsOnLine >= minWordsPerLine) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    wordsOnLine = 0;
                }
                word = words.pop();
            }
            if (!context.isHorizontal()) {
                text.selectAll("tspan")
                    .attr("y", (-lineNumber / 2) + "em")
                    ;
            }
        });
    }

    linebreak(text, bandSize) {
        this.wrap(text, bandSize, "\n");
    }

    update(domNode, element) {
        super.update(domNode, element);

        this.svg.style("display", this.hidden() ? "none" : null);

        const overlap = this.calcOverflow(element);

        const lowerPos: number = this.isHorizontal() ? overlap.left : this.height() - overlap.top - overlap.bottom;
        const upperPos: number = this.isHorizontal() ? this.width() - overlap.right - this.padding() : 0 + this.padding();

        this.range(this.reverse() ? [upperPos, lowerPos] : [lowerPos, upperPos]);

        const context = this;
        function doPosition(element) {
            element.attr("transform", function () {
                switch (context.orientation()) {
                    case "left":
                        return "translate(" + overlap.depth + ", " + overlap.top + ")";
                    case "top":
                        return "translate(0," + overlap.depth + ")";
                    case "right":
                        return "translate(" + (context.width() - overlap.depth) + ", " + overlap.top + ")";
                    case "bottom":
                        return "translate(0," + (context.height() - overlap.depth) + ")";
                    default:
                }
                return "translate(0,0)";
            });
        }
        this.svg
            // .attr("class", this.isHorizontal() ? "x" : "y")
            .style("visibility", this.type() === "none" ? "hidden" : null)
            .transition()
            .call(doPosition)
            ;
        if (this._guideElement) {
            this.svgGuides
                .transition()
                .call(doPosition)
                ;
        }
        this.svgAxis
            .call(this.d3Axis)
            ;
        this.adjustText(this.svgAxis, overlap.tickOverlapModulus);

        const svgLineBBox = {
            x: this.pos().x,
            width: this.width()
        };
        const svgText = this.svgAxis.selectAll(".axisTitle").data(this.title() ? [this.title()] : []);
        const svgTextUpdate = svgText.enter().append("text")
            .attr("class", "axisTitle")
            .merge(svgText)
            ;
        const svgTitleTransition = svgTextUpdate.transition()
            .attr("dx", null)
            .style("text-anchor", "end")
            ;
        switch (this.orientation()) {
            case "left":
                svgTitleTransition
                    .attr("transform", "rotate(-90)")
                    .attr("x", -2)
                    .attr("y", 2)
                    .attr("dy", ".71em")
                    ;
                break;
            case "right":
                svgTitleTransition
                    .attr("transform", "rotate(-90)")
                    .attr("x", -2)
                    .attr("y", 4)
                    .attr("dx", null)
                    .attr("dy", "-.71em")
                    ;
                break;
            case "top":
                svgTitleTransition
                    .attr("transform", "rotate(0)")
                    .attr("x", svgLineBBox.width - 2)
                    .attr("y", 2)
                    .attr("dx", null)
                    .attr("dy", ".71em")
                    ;
                break;
            case "bottom":
                svgTitleTransition
                    .attr("transform", "rotate(0)")
                    .attr("x", svgLineBBox.width - 2)
                    .attr("y", -2)
                    .attr("dy", null)
                    ;
                break;
            default:
        }
        svgTitleTransition
            .text(this.title_exists() ? this.title() : "")
            ;
        svgText.exit().remove();
        this.svgGuides
            .call(this.d3Guides)
            .selectAll(".tick").classed("guide-0", d => d === 0 && this.low() < 0)
            ;
    }

    rerender() {
        this.svgAxis.call(this.d3Axis);
        this.svgGuides.call(this.d3Guides);
    }

    postUpdate(domNode, element) {
        super.postUpdate(domNode, element);
        if (this._guideElement) {
            this._guideElement
                .attr("transform", this._element.attr("transform"))
                ;
        }
    }
}
Axis.prototype._class += " chart_Axis";

export interface Axis {
    type(): string;
    type(_: string): this;
    type_exists(): boolean;
    timePattern(): string;
    timePattern(_: string): this;
    timePattern_exists(): boolean;
    reverse(): boolean;
    reverse(_: boolean): this;

    title(): string;
    title(_: string): this;
    title_exists(): boolean;
    orientation(): string;
    orientation(_: string): this;
    orientation_default(): string;
    orientation_default(_: string): this;
    powExponent(): number;
    powExponent(_: number): this;
    logBase(): number;
    logBase(_: number): this;
    ordinals(): string[];
    ordinals(_: string[]): this;
    ordinals_exists(): boolean;
    fontSize(): number;
    fontSize(_: number): this;
    fontSize_exists(): boolean;
    fontFamily(): string;
    fontFamily(_: string): this;
    tickCount(): number;
    tickCount(_: number): this;
    tickFormat(): string;
    tickFormat(_: string): this;
    tickFormat_exists(): boolean;
    tickLength(): number;
    tickLength(_: number): this;
    tickLength_exists(): boolean;
    ticks(): Array<{ value: string, label: string }>;
    ticks(_: Array<{ value: string, label: string }>): this;
    low(): any;
    low(_: any): this;
    low_exists(): boolean;
    high(): any;
    high(_: any): this;
    high_exists(): boolean;
    overlapMode(): string;
    overlapMode(_: string): this;
    overlapMode_default(): string;
    overlapMode_default(_: string): this;
    labelRotation(): number;
    labelRotation(_: number): this;
    shrinkToFit(): string;
    shrinkToFit(_: string): this;
    shrinkToFit_default(): string;
    shrinkToFit_default(_: string): this;
    extend(): number;
    extend(_: number): this;
    extend_default(): number;
    extend_default(_: number): this;
    hidden(): boolean;
    hidden(_: boolean): this;

    ordinalPaddingInner(): number;
    ordinalPaddingInner(_: number): this;
    ordinalPaddingOuter(): number;
    ordinalPaddingOuter(_: number): this;
    ordinalMappings(_: { [key: string]: string }): this;
    ordinalMappings(): { [key: string]: string };
    ordinalMappings_exists(): boolean;
    padding(): number;
    padding(_: number): this;
}

Axis.prototype.publish("type", "linear", "set", "Type", ["none", "ordinal", "linear", "pow", "log", "time"]);
Axis.prototype.publish("timePattern", "%Y-%m-%d", "string", "Time Series Pattern", null, { disable: (w: any) => w.type() !== "time" });
Axis.prototype.publish("reverse", false, "boolean", "Reverse");

Axis.prototype.publish("title", null, "string", "Title");
Axis.prototype.publish("orientation", "bottom", "set", "Placement/orientation of the axis", ["left", "top", "right", "bottom"]);
Axis.prototype.publish("powExponent", 2, "number", "Power exponent (disabled when type is not 'pow')", null, { disable: (w: any) => w.type() !== "pow" });
Axis.prototype.publish("logBase", 10, "number", "Logarithmic base (disabled when type is not 'log')", null, { disable: (w: any) => w.type() !== "log" });
Axis.prototype.publish("ordinals", [], "array", "Array of ordinal values to display (disabled when type is not 'ordinal')", null, { disable: (w: any) => w.type() !== "ordinal" });
Axis.prototype.publish("fontSize", null, "number", "Size of tick label font (pixels)", null, { optional: true });
Axis.prototype.publish("fontFamily", null, "string", "Font family of tick labels", null, { optional: true });
Axis.prototype.publish("tickCount", null, "number", "Number of ticks to display (disabled when type is 'ordinal')", null, { optional: true, disable: (w: any) => w.type() === "ordinal" });
Axis.prototype.publish("tickFormat", null, "string", "Format rules for tick text (disabled when type is 'ordinal')", null, { optional: true, disable: (w: any) => w.type() === "ordinal" });
Axis.prototype.publish("tickLength", null, "number", "Height (or width for left/right orientations) of the axis ticks (in pixels)", null, { optional: true });
Axis.prototype.publish("ticks", [], "array", "Custom tick labels", null, { optional: true }); // TODO: What does this control?
Axis.prototype.publish("low", null, "any", "Minimum tick value (disabled when type is ordinal)", null, { optional: true, disable: (w: any) => w.type() === "ordinal" });
Axis.prototype.publish("high", null, "any", "Maximum tick value (disabled when type is ordinal)", null, { optional: true, disable: (w: any) => w.type() === "ordinal" });
Axis.prototype.publish("overlapMode", "none", "set", "Specifies the behavior when tick labels overlap", ["none", "stagger", "hide", "rotate", "linebreak", "wrap"]);
Axis.prototype.publish("labelRotation", 33, "number", "Angle of rotation for tick labels (disabled when overlapMode is not 'rotate')", null, { optional: true, disable: (w: any) => w.overlapMode() !== "rotate" });
Axis.prototype.publish("shrinkToFit", "both", "set", "shrinkToFit", ["none", "low", "high", "both"]); // TODO: What does this control?
Axis.prototype.publish("extend", 5, "number", "Extend the axis range by this % beyond what is needed to display the data (disabled when type is 'ordinal')", null, { optional: true, disable: (w: any) => w.type() === "ordinal" });
Axis.prototype.publish("hidden", false, "boolean", "Hides axis when 'true'");

Axis.prototype.publish("ordinalPaddingInner", 0.1, "number", "Determines the ratio of the range that is reserved for blank space between band (0->1)", null, { disable: (w: Axis) => w.type() !== "ordinal" });
Axis.prototype.publish("ordinalPaddingOuter", 0.1, "number", "Determines the ratio of the range that is reserved for blank space before the first band and after the last band (0->1)", null, { disable: (w: Axis) => w.type() !== "ordinal" });
Axis.prototype.publish("ordinalMappings", null, "object", "Alternative label mappings (icons)", null, { optional: true });
Axis.prototype.publish("padding", 0, "number", "Padding space at top of axis (pixels)", null, { optional: true });

Axis.prototype._origType = Axis.prototype.type;
Axis.prototype.type = function (_?: string) {
    const retVal = Axis.prototype._origType.apply(this, arguments);
    if (_ !== undefined) {
        this._type = _;
        this.updateScale();
    }
    return retVal;
};

Axis.prototype._origTimePattern = Axis.prototype.timePattern;
Axis.prototype.timePattern = function (_?: string) {
    const retVal = Axis.prototype._origTimePattern.apply(this, arguments);
    if (_ !== undefined) {
        this._timePattern = _;
        this.updateScale();
    }
    return retVal;
};
