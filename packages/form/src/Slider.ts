import { IInput } from "@hpcc-js/api";
import { Axis } from "@hpcc-js/chart";
import { SVGWidget } from "@hpcc-js/common";
import { Icon } from "@hpcc-js/common";
import { brush as d3Brush } from "d3-brush";
import { event as d3Event, mouse as d3Mouse, select as d3Select } from "d3-selection";

import "../src/Slider.css";

export class Slider extends SVGWidget {
    _playing;
    _loop;

    axis;

    _playIcon;
    _loopIcon;

    brush: d3Brush;

    _inputElement;
    intervalHandler;
    brushg;
    sliderElement;
    loopDiameter;
    playDiameter;
    handle;

    constructor() {
        super();
        IInput.call(this);

        this.selectionLabel("");
        this._playing = false;
        this._loop = false;

        this.axis = new Axis()
            ;

        const context = this;
        this._playIcon = new Icon()
            .faChar("\uf04b")
            ;
        this._playIcon.click = function (d) {
            d3Event.stopPropagation();
            if (context._playing) {
                context.pause();
            } else {
                context.play();
            }
        };

        this._loopIcon = new Icon()
            .faChar("\uf01e")
            .image_colorFill(this._loop ? null : "#bbb")
            .shape_colorFill(this._loop ? null : "white")
            .paddingPercent(33)
            ;
        this._loopIcon.click = function (d) {
            if (context._loop) {
                context._loop = false;
            } else {
                context._loop = true;
            }
            context._loopIcon
                .image_colorFill(context._loop ? null : "#bbb")
                .shape_colorFill(context._loop ? null : "white")
                .render()
                ;
        };

        this.brush = d3Brush()
            .extent([0, 0])
            .on("start", function (d) { context.brushstart(d, this); })
            .on("brush", function (d) { context.brushmove(d, this); })
            .on("end", function (d) { context.brushend(d, this); })
            ;
        this.brush.empty = function () {
            return false;
        };

        this._inputElement = [];
    }

    play() {
        this._playing = true;
        this._playIcon
            .faChar("\uf04c")
            .render()
            ;
        let tick = this.data();
        if (tick < this.low() || tick >= this.high()) {
            tick = this.low();
            this
                .data(tick)
                .render()
                ;
            this._click();
        }
        const context = this;
        this.intervalHandler = setInterval(function () {
            tick += context.step();
            if (tick > context.high()) {
                if (context._loop === true) {
                    tick = context.low();
                    context
                        .data(tick)
                        .render()
                        ;
                    context._click();
                } else {
                    context.pause();
                }
            } else {
                context
                    .data(tick)
                    .render()
                    ;
                context._click();
            }
        }, context.playInterval());
    }

    pause() {
        this._playing = false;
        this._playIcon
            .faChar("\uf04b")
            .render()
            ;
        clearInterval(this.intervalHandler);
    }

    data(): any;
    data(_: any): this;
    data(_?: any): any | this {
        const retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            if (this.brushg) {
                this.brushg
                    .call(this.brush.extent(this.allowRange() ? this.data() : [this.data(), this.data()]))
                    ;
            }
        }
        return retVal;
    }

    enter(domNode, element) {
        this.sliderElement = element.append("g");
        this._inputElement.push(this.sliderElement);

        this.axis
            .target(this.sliderElement.node())
            .x(this.width())
            .y(0)
            .width(this.width() - this.padding())
            .low(this.low())
            .high(this.high())
            .render()
            ;

        this.axis.d3Axis
            // .tickValues(null)
            .tickSize(0)
            .tickPadding(12)
            ;

        this.brushg = this.sliderElement.append("g")
            .attr("class", "brush")
            .call(this.brush)
            ;

        this.brushg.select(".background")
            .attr("y", -9)
            .attr("height", 18)
            ;

        this.brushg.select(".extent")
            .attr("y", "-10")
            .attr("height", "20")
            ;

        this.brushg.selectAll(".resize").select("rect")
            .attr("x", function (d) { return d === "e" ? 0 : -8; })
            .attr("y", "-10")
            .attr("width", "8")
            .attr("height", "20")
            ;

        this.handle = this.brushg.selectAll(".resize").append("path")
            .attr("class", "handle")
            .attr("transform", "translate(0,-27)")
            ;

        this._playIcon
            .target(this.sliderElement.node())
            .render()
            ;

        this._loopIcon
            .target(this.sliderElement.node())
            .render()
            ;
    }

    update(domNode, element) {
        const context = this;
        let width = this.width() - this.padding() / 2;

        this._playIcon
            .pos({ x: width - (this.loopDiameter() + this.loopGutter() + this.playDiameter() / 2), y: 0 })
            .diameter(this.playDiameter())
            .display(this.showPlay())
            .render()
            ;

        this._loopIcon
            .pos({ x: width - (this.loopDiameter() / 2), y: 0 })
            .diameter(this.loopDiameter())
            .display(this.showPlay())
            .render()
            ;

        if ((+this.high() - +this.low()) / this.step() <= 10) {
            // this.axis.tickValues(d3.merge([d3.range(this.low(), this.high(), this.step()), [this.high()]]));
        } else {
            // this.axis.tickValues(null);
        }

        const offset = this.showPlay() ? this.loopDiameter() + this.loopGutter() + this.playDiameter() + this.playGutter() : 0;
        width -= offset;
        const overlap = this.axis.calcOverflow(element);
        this.axis
            .x(this.width() / 2 - offset / 2)
            .y(overlap.depth)
            .width(this.width() - this.padding() - offset)
            .low(this.low())
            .high(this.high())
            .render()
            ;

        this.brushg
            .attr("transform", "translate(" + this.padding() / 2 + ", 0)")
            ;

        this.handle
            .attr("d", function (d) { return context.handlePath(d); })
            ;

        if (this.data().length === 0) {
            if (this.allowRange()) {
                this.data([this.low(), this.low()]);
            } else {
                this.data(this.low());
            }
        }

        this.axis.d3Scale.clamp(true);
        this.brush
            // .x(this.axis.d3Scale)
            ;

        this.brushg
            .call(this.brush.extent(this.allowRange() ? this.data() : [this.data(), this.data()]))
            ;

        const bbox = this.sliderElement.node().getBBox();
        this.sliderElement.attr("transform", "translate(" + -this.width() / 2 + ", " + -(bbox.y + bbox.height / 2) + ")");
    }

    brushstart(d, self) {
        if (!d3Event || !d3Event.sourceEvent) return;
        d3Event.sourceEvent.stopPropagation();
    }

    brushmove(d, self) {
        if (!d3Event || !d3Event.sourceEvent) return;
        d3Event.sourceEvent.stopPropagation();
        if (!this.allowRange()) {
            const mouseX = this.axis.invert(d3Mouse(self)[0]);
            d3Select(self)
                .call(this.brush.extent([mouseX, mouseX]))
                ;
        }
    }

    brushend(d, self) {
        if (!d3Event || !d3Event.sourceEvent) return;
        d3Event.sourceEvent.stopPropagation();
        if (!this.allowRange()) {
            const mouseX = this.nearestStep(this.axis.invert(d3Mouse(self)[0]));
            d3Select(self)
                .call(this.brush.extent([mouseX, mouseX]))
                ;
            this.value(this.axis.parseInvert(mouseX));
            this._click();
        } else {
            const extent = this.brush.extent();
            extent[0] = this.nearestStep(extent[0]);
            extent[1] = this.nearestStep(extent[1]);
            d3Select(self)
                .call(this.brush.extent(extent))
                ;
            this.newSelection(this.axis.parseInvert(extent[0]), this.axis.parseInvert(extent[1]));
        }
    }

    nearestStep(value2) {
        switch (this.type()) {
            case "time":
                return value2;
            default:
                return +this.axis.parse(this.low()) + Math.round((value2 - +this.axis.parse(this.low())) / +this.step()) * +this.step();
        }
    }

    handlePath(d) {
        const e = +(d === "e");
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
    }

    _click() {
        if (this.selectionLabel()) {
            const clickData = {};
            clickData[this.selectionLabel()] = this.data();
            this.click(clickData);
        } else {
            this.click(this.data());
        }
    }

    click(data) {
    }

    newSelection(value, value2) {
        console.log("newSelection:  " + value + ", " + value2);
    }

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
    low: { (): string; (_: string): Slider };
    low_exists: () => boolean;
    high: { (): number; (_: number): Slider };
    high_exists: () => boolean;
    step: { (): number; (_: number): Slider };
    step_exists: () => boolean;
    selectionLabel: { (): string; (_: string): Slider };
    selectionLabel_exists: () => boolean;
    type: { (): string; (_: string): Axis };
    type_exists: () => boolean; showPlay: { (): boolean; (_: boolean): Slider };
    showPlay_exists: () => boolean;
    playInterval: { (): number; (_: number): Slider };
    playInterval_exists: () => boolean;
    playGutter: { (): number; (_: number): Slider };
    playGutter_exists: () => boolean;
    loopGutter: { (): number; (_: number): Slider };
    loopGutter_exists: () => boolean;

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
Slider.prototype.publish("low", "0", "string", "Low", null, { tags: ["Intermediate"] });
Slider.prototype.publish("high", "100", "string", "High", null, { tags: ["Intermediate"] });
Slider.prototype.publish("step", 10, "number", "Step", null, { tags: ["Intermediate"] });
Slider.prototype.publish("selectionLabel", "", "string", "Selection Label", null, { tags: ["Intermediate"] });

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

Slider.prototype.name = function (_: any): any {
    return Slider.prototype.columns.apply(this, arguments);
};

const value = Slider.prototype.value;
Slider.prototype.value = function (_?: any): any {
    const retVal = value.apply(this, arguments);
    if (arguments.length) {
        SVGWidget.prototype.data.apply(this, arguments);
    }
    return retVal;
};
