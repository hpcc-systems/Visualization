import { INDChart, ITooltip } from "@hpcc-js/api";
import { SVGWidget, Utility } from "@hpcc-js/common";
import { interpolate as d3interpolate } from "d3-interpolate";
import { scaleLinear as d3scaleLinear } from "d3-scale";

import { arc as d3arc } from "d3-shape";
import "../src/RadialBar.css";
export class RadialBar extends SVGWidget {
    protected svg;
    protected arc;
    protected arcs;
    protected arcWidth;
    protected axialAxis;
    protected radialAxis;
    constructor() {
        super();
        INDChart.call(this);
        ITooltip.call(this);
        Utility.SimpleSelectionMixin.call(this);
    }
    enter(domNode, element) {
        super.enter(domNode, element);
        this._selection.widgetElement(element);
        this
            .tooltipHTML(d => {
                return this.tooltipFormat({ label: d[0], value: d[1] });
            })
            ;
        this.axialAxis = element.append("g")
            .attr("class", "a axis")
            ;
        this.radialAxis = element.append("g")
            .attr("class", "r axis")
            ;
        this.arcs = element.append("g")
            .attr("class", "data")
            ;
    }
    update(domNode, element) {
        const chartRadius = (Math.min(this.width(), this.height()) / 2) - this.radiusPadding();
        const scale = d3scaleLinear()
            .domain([0, Math.max.apply(undefined, this.data().map(d => d[1])) * this.maxDomainMultiplier()])
            .range([0, this.maxRange()]);
        const ticks = scale.ticks(this.tickCount());
        this.arcWidth = (chartRadius - this.arcMinRadius() - this.data().length * this.arcPadding()) / this.data().length;
        this.arc = d3arc<number>()
            .innerRadius((d, i) => this.getInnerRadius(i))
            .outerRadius((d, i) => this.getOuterRadius(i))
            .startAngle(0)
            .endAngle((d) => scale(d));
        this.radialAxis
            .selectAll("g")
            .data(this.data(), d => d[0])
            .enter()
            .append("g")
            .append("circle").classed("circle1", true);
        element.selectAll(".circle1")
            .attr("r", (d, i) => this.getOuterRadius(i) + this.arcPadding())
            .attr("fill", "transparent")
            ;
        this.radialAxis.append("text").classed("text1", true);
        element.selectAll(".text1")
            .attr("x", -5)
            .attr("y", (d, i) => -this.getOuterRadius(i) + this.arcPadding())
            .text(d => d.name)
            ;
        const gTicks = this.axialAxis
            .selectAll("g")
            .data(ticks)
            .enter().append("g")
            .classed("g-tick", true)
            ;
        this.axialAxis.selectAll(".g-tick")
            .attr("transform", d => "rotate(" + (this.rad2deg(scale(d)) - 90) + ")")
            ;
        gTicks.append("line").classed("line1", true);
        element.selectAll(".line1")
            .attr("x2", chartRadius);
        gTicks.append("text").classed("text2", true);
        element.selectAll(".text2")
            .attr("x", chartRadius + 10)
            .style("text-anchor", d => (scale(d) >= Math.PI && scale(d) < 2 * Math.PI ? "end" : null))
            .attr("transform", d => "rotate(" + (90 - this.rad2deg(scale(d))) + "," + (chartRadius + 10) + ",0)")
            .text(d => d);
        this.arcs
            .selectAll("path")
            .data(this.data())
            .enter().append("path")
            .attr("class", "arc")
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show);
        element.selectAll(".arc")
            .style("fill", (d, i) => this._palette(i))
            .transition()
            .delay((d, i) => i * this.rowDelay())
            .duration(this.tweenDuration())
            .attrTween("d", (d, i) => {
                const interpolate = d3interpolate(0, d[1]);
                return t => this.arc(interpolate(t), i);
            });
        this.arcs
            .selectAll(".arc-text")
            .data(this.data())
            .enter().append("text")
            .attr("class", "arc-text");
        element.selectAll(".arc-text")
            .attr("x", -4)
            .attr("y", (d, i) => -(this.getInnerRadius(i) + this.getOuterRadius(i)) / 2)
            .attr("alignment-baseline", "middle")
            .attr("text-anchor", "end")
            .text(d => d[0]);
    }
    getInnerRadius(index) {
        return this.arcMinRadius() + (this.data().length - (index + 1)) * (this.arcWidth + this.arcPadding());
    }
    getOuterRadius(index) {
        return this.getInnerRadius(index) + this.arcWidth;
    }
    rad2deg(angle) {
        return angle * 180 / Math.PI;
    }
    //  INDChart
    _palette;
    fillColor: (row, column, value) => string;
    strokeColor: (row, column, value) => string;
    textColor: (row, column, value) => string;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;
    //  ITooltip
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;
    _selection;
}
RadialBar.prototype._class += " chart_RadialBar";
RadialBar.prototype.implements(INDChart.prototype);
RadialBar.prototype.implements(ITooltip.prototype);
RadialBar.prototype.mixin(Utility.SimpleSelectionMixin);
export interface RadialBar {
    paletteID(): string;
    paletteID(_: string): this;
    radiusPadding(): number;
    radiusPadding(_: number): this;
    maxRange(): number;
    maxRange(_: number): this;
    maxDomainMultiplier(): number;
    maxDomainMultiplier(_: number): this;
    rowDelay(): number;
    rowDelay(_: number): this;
    tweenDuration(): number;
    tweenDuration(_: number): this;
    tickCount(): number;
    tickCount(_: number): this;
    arcPadding(): number;
    arcPadding(_: number): this;
    arcMinRadius(): number;
    arcMinRadius(_: number): this;
}
RadialBar.prototype.publish("paletteID", "default", "set", "paletteID", RadialBar.prototype._palette.switch());
RadialBar.prototype.publish("radiusPadding", 40, "number", "Padding between chart edge and container edge (px)");
RadialBar.prototype.publish("rowDelay", 100, "number", "Delay between the start of each row animation (ms)");
RadialBar.prototype.publish("tweenDuration", 1000, "number", "Duration of a row's animation (ms)");
RadialBar.prototype.publish("maxRange", 2 * Math.PI, "number", "Maximum angular length of a bar (radians)");
RadialBar.prototype.publish("maxDomainMultiplier", 1.62, "number", "Multiplied by the highest value to determine the maximum arc length (>= 1.0)");
RadialBar.prototype.publish("tickCount", 10, "number", "Number of ticks to display");
RadialBar.prototype.publish("arcPadding", 10, "number", "arcPadding (pixels)");
RadialBar.prototype.publish("arcMinRadius", 10, "number", "arcMinRadius (pixels)");
