import { IInput } from "@hpcc-js/api";
import { SVGWidget } from "@hpcc-js/common";
import { drag as d3Drag } from "d3-drag";
import { format as d3Format } from "d3-format";
import { scaleLinear as d3ScaleLinear } from "d3-scale";
import { event as d3Event, select as d3Select } from "d3-selection";
import { timeFormat as d3TimeFormat, timeParse as d3TimeParse } from "d3-time-format";

import "../src/Slider.css";

export class Slider extends SVGWidget {
    xScale;

    moveMode: "both" | "left" | "right";
    moveStartPos: number;

    slider;

    handleLeft;
    handleLeftPos: number = 0;
    handleLeftStartPos: number;

    handleRight;
    handleRightPos: number = 0;
    handleRightStartPos: number;

    constructor() {
        super();
        IInput.call(this);
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this.resize({ width: this.width(), height: 50 });

        this.xScale = d3ScaleLinear()
            .clamp(true);

        this.slider = element.append("g")
            .attr("class", "slider")
            ;
        if (this.low() === null && this.high() === null) {
            if (this.lowDatetime() !== null && this.highDatetime() !== null) {
                const time_parser = d3TimeParse(this.timePattern() ? this.timePattern() : "%Q");
                this.low(time_parser(this.lowDatetime()).getTime());
                this.high(time_parser(this.highDatetime()).getTime());
            }
        }
        this.slider.append("line")
            .attr("class", "track")
            .select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
            .attr("class", "track-inset")
            .select(function () { return this.parentNode.appendChild(this.cloneNode(true)); })
            .attr("class", "track-overlay")
            .call(d3Drag()
                .on("start", () => {
                    this.moveStartPos = d3Event.x;
                    this.handleLeftStartPos = this.handleLeftPos;
                    this.handleRightStartPos = this.handleRightPos;
                    if (this.allowRange() && this.handleLeftPos <= d3Event.x && d3Event.x <= this.handleRightPos) {
                        this.moveMode = "both";
                    } else if (Math.abs(d3Event.x - this.handleLeftPos) < Math.abs(d3Event.x - this.handleRightPos)) {
                        this.moveMode = "left";
                    } else {
                        this.moveMode = "right";
                    }
                    this.moveHandleTo(d3Event.x);
                })
                .on("drag", () => {
                    this.moveHandleTo(d3Event.x);
                })
                .on("end", () => {
                    this.moveHandleTo(d3Event.x);
                    this.data([[this.xScale.invert(this.handleLeftPos), this.xScale.invert(this.handleRightPos)]]);
                }));

        this.slider.insert("g", ".track-overlay")
            .attr("class", "ticks")
            .attr("transform", `translate(0, ${this.fontSize() + (this.tickHeight() / 2)})`)
            ;

        this.handleRight = this.slider.insert("path", ".track-overlay")
            .attr("class", "handle")
            ;

        this.handleLeft = this.slider.insert("path", ".track-overlay")
            .attr("class", "handle")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;
        this.xScale
            .domain([this.low(), this.high()])
            .range([0, this.width() - this.padding() * 2])
            ;

        this.slider
            .attr("transform", "translate(" + (-this.width() / 2 + this.padding()) + "," + 0 + ")");

        this.slider.selectAll("line.track,line.track-inset,line.track-overlay")
            .attr("x1", this.xScale.range()[0])
            .attr("x2", this.xScale.range()[1])
            ;
        let tickText;
        const x_distance = (this.width() - (this.padding() * 2)) / (this.tickCount() - 1);

        const tick_text_arr = [];
        if (this.tickDateFormat() !== null && this.timePattern() !== null) {
            const Q_parser = d3TimeParse("%Q");
            const time_formatter = d3TimeFormat(this.tickDateFormat());
            const time_segment = (this.high() - this.low()) / (this.tickCount() - 1);
            for (let i = 0; i < this.tickCount(); i++) {
                const date_to_parse = "" + (this.low() + (time_segment * i));
                const parsed_date = Q_parser(date_to_parse);
                tick_text_arr.push(time_formatter(parsed_date));
            }
        } else {
            const value_formatter = d3Format(this.tickValueFormat());
            const value_segment = (this.high() - this.low()) / (this.tickCount() - 1);
            for (let i = 0; i < this.tickCount(); i++) {
                const tick_value = this.low() + (value_segment * i);
                tick_text_arr.push(value_formatter(tick_value));
            }
        }
        tickText = this.slider.selectAll("g.tick").data(tick_text_arr);
        const tickTextEnter = tickText.enter().append("g").attr("class", "tick");

        tickTextEnter.append("text").attr("class", "tick-text");
        tickTextEnter.append("line").attr("class", "tick-line");
        tickTextEnter
            .merge(tickText)
            .each(function (d, i) {
                const x = x_distance * i;

                d3Select(this).select("text.tick-text")
                    .style("font-size", context.fontSize())
                    .attr("x", function () {
                        if (i === 0) return x - 2;
                        return i === context.tickCount() - 1 ? x + 2 : x;
                    })
                    .attr("y", context.tickHeight() + (context.tickOffset() / 2) + context.fontSize())
                    .attr("text-basline", "text-before-edge")
                    .attr("text-anchor", function () {
                        if (i === 0) return "start";
                        return i === context.tickCount() - 1 ? "end" : "middle";
                    })
                    .text(() => d)
                    ;

                d3Select(this).select("line.tick-line")
                    .attr("x1", x)
                    .attr("x2", x)
                    .attr("y1", context.tickOffset() - 1)
                    .attr("y2", context.tickOffset() + context.tickHeight())
                    .style("stroke", "#000")
                    .style("stroke-width", 1)
                    ;
            });
        this.slider.node().appendChild(this.handleRight.node());
        this.slider.node().appendChild(this.handleLeft.node());
        this.handleLeftPos = this.lowPos();
        this.handleRightPos = this.highPos();
        this.updateHandles();
    }

    updateHandles() {
        this.handleLeft
            .attr("transform", `translate(${this.handleLeftPos}, -28)`)
            .attr("d", (d) => this.handlePath("l"))
            ;
        this.handleRight
            .attr("transform", `translate(${this.handleRightPos}, -28)`)
            .attr("d", (d) => this.handlePath("r"))
            ;
    }

    lowPos(): number {
        let data = [[this.low(), this.high()]];
        if (this.data().length > 0 && typeof this.data()[0][0] === "number" && typeof this.data()[0][1] === "number") {
            data = this.data();
        }
        return this.xScale(data[0][0]);
    }

    highPos(): number {
        let data = [[this.low(), this.high()]];
        if (this.data().length > 0 && typeof this.data()[0][0] === "number" && typeof this.data()[0][1] === "number") {
            data = this.data();
        }
        return this.xScale(data[0][this.allowRange() ? 1 : 0]);
    }

    moveHandleTo(pos) {
        if (this.allowRange()) {
            switch (this.moveMode) {
                case "both":
                    this.handleLeftPos = this.handleLeftStartPos + pos - this.moveStartPos;
                    this.handleRightPos = this.handleRightStartPos + pos - this.moveStartPos;
                    break;
                case "left":
                    this.handleLeftPos = pos;
                    if (this.handleLeftPos > this.handleRightPos) {
                        this.handleRightPos = this.handleLeftPos;
                    }
                    break;
                case "right":
                    this.handleRightPos = pos;
                    if (this.handleRightPos < this.handleLeftPos) {
                        this.handleLeftPos = this.handleRightPos;
                    }
                    break;
            }
        } else {
            this.handleLeftPos = this.handleRightPos = pos;
        }

        this.handleLeftPos = this.constrain(this.handleLeftPos);
        this.handleRightPos = this.constrain(this.handleRightPos);
        this.value(this.allowRange() ? this.xScale.invert(this.handleLeftPos) : [this.xScale.invert(this.handleLeftPos), this.xScale.invert(this.handleRightPos)]);
        this.updateHandles();
    }

    constrain(pos: number): number {
        const range = this.xScale.range();
        if (pos < range[0]) pos = range[0];
        if (pos > range[1]) pos = range[1];
        return this.nearestStep(pos);
    }

    nearestStep(pos) {
        const value = this.xScale.invert(pos);
        return this.xScale(this.low() + Math.round((value - this.low()) / this.step()) * this.step());
    }

    handlePath = function (d) {
        const e = +(d === "r");
        const x = e ? 1 : -1;
        const xOffset = this.allowRange() ? 0.5 : 0.0;
        const y = 18;
        let retVal = "M" + (xOffset * x) + "," + y +
            "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) +
            "V" + (2 * y - 6) +
            "A6,6 0 0 " + e + " " + (xOffset * x) + "," + (2 * y)
            ;
        if (this.allowRange()) {
            retVal += "Z" +
                "M" + (2.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8) +
                "M" + (4.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8)
                ;
        } else {
            retVal += "M" + (1 * x) + "," + (y + 8) +
                "V" + (2 * y - 8)
                ;
        }
        return retVal;
    };

    name: (_?: string) => string | this;
}
Slider.prototype._class += " form_Slider";
Slider.prototype.implements(IInput.prototype);

export interface Slider {
    padding(): number;
    padding(_: number): this;
    fontSize(): number;
    fontSize(_: number): this;
    fontFamily(): string;
    fontFamily(_: string): this;
    fontColor(): string;
    fontColor(_: string): this;
    allowRange(): boolean;
    allowRange(_: boolean): this;
    low(): number;
    low(_: number): this;
    high(): number;
    high(_: number): this;
    step(): number;
    step(_: number): this;
    lowDatetime(): string;
    lowDatetime(_: string): this;
    highDatetime(): string;
    highDatetime(_: string): this;
    stepDatetime(): number;
    stepDatetime(_: number): this;
    selectionLabel(): string;
    selectionLabel(_: string): this;
    label(): string;
    label(_: string): this;
    value(): any;
    value(_: any): this;
    validate(): string;
    validate(_: string): this;
    tickCount(): number;
    tickCount(_: number): this;
    tickOffset(): number;
    tickOffset(_: number): this;
    tickHeight(): number;
    tickHeight(_: number): this;
    tickDateFormat(): string;
    tickDateFormat(_: string): this;
    tickValueFormat(): string;
    tickValueFormat(_: string): this;
    timePattern(): string;
    timePattern(_: string): this;

    padding_exists(): boolean;
    fontSize_exists(): boolean;
    fontFamily_exists(): boolean;
    fontColor_exists(): boolean;
    allowRange_exists(): boolean;
    low_exists(): boolean;
    step_exists(): boolean;
    high_exists(): boolean;
    selectionLabel_exists(): boolean;
    name_exists(): boolean;
    label_exists(): boolean;
    value_exists(): boolean;
    validate_exists(): boolean;
}

Slider.prototype.publish("padding", 16, "number", "Outer Padding", null, { tags: ["Basic"] });
Slider.prototype.publish("fontSize", 12, "number", "Font Size", null, { tags: ["Basic"] });
Slider.prototype.publish("fontFamily", null, "string", "Font Name", null, { tags: ["Basic"] });
Slider.prototype.publish("fontColor", null, "html-color", "Font Color", null, { tags: ["Basic"] });

Slider.prototype.publish("allowRange", false, "boolean", "Allow Range Selection", null, { tags: ["Intermediate"] });
Slider.prototype.publish("low", null, "number", "Low", null, { tags: ["Intermediate"] });
Slider.prototype.publish("high", null, "number", "High", null, { tags: ["Intermediate"] });
Slider.prototype.publish("step", 10, "number", "Step", null, { tags: ["Intermediate"] });
Slider.prototype.publish("lowDatetime", null, "string", "Low", null, { tags: ["Intermediate"] });
Slider.prototype.publish("highDatetime", null, "string", "High", null, { tags: ["Intermediate"] });
Slider.prototype.publish("selectionLabel", "", "string", "Selection Label", null, { tags: ["Intermediate"] });

Slider.prototype.publish("timePattern", "%Y-%m-%d", "string");

Slider.prototype.publish("tickCount", 10, "number");
Slider.prototype.publish("tickOffset", 5, "number");
Slider.prototype.publish("tickHeight", 8, "number");
Slider.prototype.publish("tickDateFormat", null, "string");
Slider.prototype.publish("tickValueFormat", ",.0f", "string");

const name = Slider.prototype.name;
Slider.prototype.name = function (_: any): any {
    const retVal = name.apply(this, arguments);
    if (arguments.length) {
        const val = _ instanceof Array ? _ : [_];
        SVGWidget.prototype.columns.call(this, val);
    }
    return retVal;
};

const value = Slider.prototype.value;
Slider.prototype.value = function (_?: any): any {
    const retVal = value.apply(this, arguments);
    if (!arguments.length) {
        if (!this.allowRange()) {
            return SVGWidget.prototype.data.call(this)[0][0];
        }
        return SVGWidget.prototype.data.call(this)[0];
    } else {
        SVGWidget.prototype.data.call(this, [this.allowRange() ? _ : [_, _]]);
    }
    return retVal;
};
