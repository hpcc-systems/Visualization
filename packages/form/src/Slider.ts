import { IInput } from "@hpcc-js/api";
import { SVGWidget } from "@hpcc-js/common";
import { drag as d3Drag } from "d3-drag";
import { scaleLinear as d3ScaleLinear } from "d3-scale";
import { event as d3Event } from "d3-selection";

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
                    console.log(this.moveMode);
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
            .attr("transform", "translate(0," + 18 + ")")
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
        this.xScale
            .domain([this.low(), this.high()])
            .range([0, this.width() - this.padding() * 2])
            ;

        this.slider
            .attr("transform", "translate(" + (-this.width() / 2 + this.padding()) + "," + 0 + ")");

        this.slider.selectAll("line")
            .attr("x1", this.xScale.range()[0])
            .attr("x2", this.xScale.range()[1])
            ;

        const tickText = this.slider.select("g").selectAll("text").data(this.xScale.ticks(10));
        tickText.enter()
            .append("text")
            .merge(tickText)
            .attr("x", this.xScale)
            .attr("text-anchor", "middle")
            .text(d => d);

        this.handleLeftPos = this.lowPos();
        this.handleRightPos = this.highPos();
        this.updateHandles();
    }

    updateHandles() {
        this.handleLeft
            .attr("transform", "translate(" + this.handleLeftPos + ", -28)")
            .attr("d", (d) => this.handlePath("l"))
            ;
        this.handleRight
            .attr("transform", "translate(" + this.handleRightPos + ", -28)")
            .attr("d", (d) => this.handlePath("r"))
            ;
    }

    lowPos(): number {
        const data = this.data() || [[this.low(), this.high()]];
        return this.xScale(data[0][0]);
    }

    highPos(): number {
        const data = this.data() || [[this.low(), this.high()]];
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
        this.value(this.allowRange() ? this.xScale.invert(this.handleLeftPos) : [this.xScale.invert(this.handleLeftPos), this.xScale.invert(this.handleRightPos)])
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

    padding: { (): number; (_: number): Slider };
    padding_exists: () => boolean;
    fontSize: { (): number; (_: number): Slider };
    fontSize_exists: () => boolean;
    fontFamily: { (): string; (_: string): Slider };
    fontFamily_exists: () => boolean;
    fontColor: { (): string; (_: string): Slider };
    fontColor_exists: () => boolean;
    allowRange: { (): boolean; (_: boolean): Slider };
    allowRange_exists: () => boolean;
    low: { (): number; (_: number): Slider };
    low_exists: () => boolean;
    high: { (): number; (_: number): Slider };
    high_exists: () => boolean;
    step: { (): number; (_: number): Slider };
    step_exists: () => boolean;
    selectionLabel: { (): string; (_: string): Slider };
    selectionLabel_exists: () => boolean;

    /*
    type: { (): string; (_: string): Axis };
    type_exists: () => boolean; showPlay: { (): boolean; (_: boolean): Slider };

    showPlay_exists: () => boolean;
    playInterval: { (): number; (_: number): Slider };
    playInterval_exists: () => boolean;
    playGutter: { (): number; (_: number): Slider };
    playGutter_exists: () => boolean;
    loopGutter: { (): number; (_: number): Slider };
    loopGutter_exists: () => boolean;
    */

    //  IInput  ---
    name: (_?: string) => string | this;
    name_exists: () => boolean;
    label: { (): string; (_: string): Slider };
    label_exists: () => boolean;
    value: { (): any; (_: any): Slider };
    value_exists: () => boolean;
    validate: { (): string; (_: string): Slider };
    validate_exists: () => boolean;
}
Slider.prototype._class += " form_Slider";
Slider.prototype.implements(IInput.prototype);

Slider.prototype.publish("padding", 16, "number", "Outer Padding", null, { tags: ["Basic"] });
Slider.prototype.publish("fontSize", null, "number", "Font Size", null, { tags: ["Basic"] });
Slider.prototype.publish("fontFamily", null, "string", "Font Name", null, { tags: ["Basic"] });
Slider.prototype.publish("fontColor", null, "html-color", "Font Color", null, { tags: ["Basic"] });

Slider.prototype.publish("allowRange", false, "boolean", "Allow Range Selection", null, { tags: ["Intermediate"] });
Slider.prototype.publish("low", 0, "number", "Low", null, { tags: ["Intermediate"] });
Slider.prototype.publish("high", 100, "number", "High", null, { tags: ["Intermediate"] });
Slider.prototype.publish("step", 10, "number", "Step", null, { tags: ["Intermediate"] });
Slider.prototype.publish("selectionLabel", "", "string", "Selection Label", null, { tags: ["Intermediate"] });
/*
Slider.prototype.publishProxy("tickCount", "axis", "tickCount");
Slider.prototype.publishProxy("tickFormat", "axis", "tickFormat");
Slider.prototype.publishProxy("type", "axis");
Slider.prototype.publishProxy("timePattern", "axis");
Slider.prototype.publishProxy("powExponent", "axis", "powExponent");
Slider.prototype.publishProxy("logBase", "axis", "logBase");
Slider.prototype.publishProxy("overlapMode", "axis");
Slider.prototype.publishProxy("labelRotation", "axis");

Slider.prototype.publish("showPlay", false, "boolean", "Show Play Button");
Slider.prototype.publish("playInterval", 1000, "number", "Play Interval");
Slider.prototype.publishProxy("playDiameter", "_playIcon", "diameter", 32);
Slider.prototype.publish("playGutter", 4, "number", "Play Gutter");
Slider.prototype.publishProxy("loopDiameter", "_loopIcon", "diameter", 24);
Slider.prototype.publish("loopGutter", 4, "number", "Play Gutter");
*/

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
