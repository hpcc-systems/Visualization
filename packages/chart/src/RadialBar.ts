import { INDChart, ITooltip } from "@hpcc-js/api";
import { InputField, SVGWidget, Utility } from "@hpcc-js/common";
import { interpolate as d3Interpolate } from "d3-interpolate";
import { scaleBand as d3ScaleBand, scaleLinear as d3ScaleLinear } from "d3-scale";
import { arc as d3Arc } from "d3-shape";

import "../src/RadialBar.css";

export class RadialBar extends SVGWidget {
    static __inputs: InputField[] = [{
        id: "label",
        type: "any"
    }, {
        id: "values",
        type: "number"
    }];

    private _domainScale = d3ScaleBand();
    private _valueScale = d3ScaleLinear();
    private _d3Arc = d3Arc<[string, number]>()
        .startAngle(0)
        .endAngle((d) => this._valueScale(d[1]))
        ;

    protected _arcs;
    protected _axialAxis;
    protected _radialAxis;

    constructor() {
        super();
        INDChart.call(this);
        ITooltip.call(this);
        Utility.SimpleSelectionMixin.call(this);
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._selection.widgetElement(element);
        this.tooltipHTML(d => {
            return this.tooltipFormat({ label: d[0], value: d[1] });
        });

        this._radialAxis = element.append("g")
            .attr("class", "r axis")
            ;
        this._axialAxis = element.append("g")
            .attr("class", "a axis")
            ;
        this._arcs = element.append("g")
            .attr("class", "data")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;
        const maxValue = Math.max(this.valueDomainHigh_exists() ? this.valueDomainHigh() : 0, ...this.data().map(d => d[1]));

        this._valueScale
            .domain([0, maxValue])
            .range([0, this.radians(this.valueMaxAngle())])
            .nice()
            ;

        const ticks = this._valueScale.ticks(this.tickCount());

        const maxTextWidth = this.textSize(ticks.map(d => "" + d), "Verdana", 12).width;
        const chartRadius = (Math.min(this.width() - (10 + maxTextWidth) * 2, this.height() - (10 + 12) * 2) / 2);

        //  Domain Axis (x-axis)  ---
        const domainData = this.data().map(d => d[0]);

        this._domainScale
            .domain(domainData)
            .range([0, chartRadius])
            .padding(this.domainPadding())
            ;
        const domainPadding = this._domainScale.step() * this._domainScale.padding();

        const domainCircles = this._radialAxis.selectAll("circle").data(domainData);
        domainCircles.enter().append("circle")
            .attr("fill", "transparent")
            .merge(domainCircles)
            .attr("r", d => this._domainScale(d) + this._domainScale.step() - domainPadding / 2)
            ;
        domainCircles.exit().remove();

        const domainText = this._radialAxis.selectAll(".arc-text").data(domainData);
        domainText.enter().append("text")
            .attr("class", "arc-text")
            .attr("x", -4)
            .attr("alignment-baseline", "middle")
            .attr("text-anchor", "end")
            .merge(domainText)
            .attr("y", d => -this._domainScale(d) - this._domainScale.bandwidth() / 2)
            .text(d => d);
        domainText.exit().remove();

        //  Value Axis (y-axis)  ---
        const valueLines = this._axialAxis.selectAll("line").data(ticks);
        valueLines.enter().append("line")
            .merge(valueLines)
            .attr("x2", d => chartRadius * Math.cos(this._valueScale(d) - this.radians(90)))
            .attr("y2", d => chartRadius * Math.sin(this._valueScale(d) - this.radians(90)))
            ;
        valueLines.exit().remove();

        const valueText = this._axialAxis.selectAll("text").data(ticks);
        valueText.enter().append("text")
            .style("dominant-baseline", "central")
            .merge(valueText)
            .attr("x", d => (chartRadius + 10) * Math.cos(this._valueScale(d) - this.radians(90)))
            .attr("y", d => (chartRadius + 10) * Math.sin(this._valueScale(d) - this.radians(90)))
            .style("text-anchor", d => {
                const middleZone = 20;
                const angle = this.degrees(this._valueScale(d));
                if (angle >= 0 && angle <= middleZone ||
                    angle >= 180 - middleZone && angle <= 180 + middleZone ||
                    angle >= 360 - middleZone && angle <= 360
                ) {
                    return "middle";
                } else if (angle >= 180 && angle <= 360) {
                    return "end";
                } else {
                    return null;
                }
            })
            .text(d => d)
            ;
        valueText.exit().remove();

        const valueColumn = this.columns().length > 1 ? this.columns()[1] : "";
        //  Data (arcs) ---
        this._d3Arc
            .innerRadius(d => this._domainScale(d[0]))
            .outerRadius(d => this._domainScale(d[0]) + this._domainScale.bandwidth())
            ;
        const arcs = this._arcs.selectAll("path").data(this.data(), d => d[0]);
        arcs.enter().append("path")
            .attr("class", "arc")
            .call(this._selection.enter.bind(this._selection))
            .on("mouseout.tooltip", this.tooltip.hide)
            .on("mousemove.tooltip", this.tooltip.show)
            .on("click", function (d: any, _idx) {
                context.click(context.rowToObj(d), valueColumn, context._selection.selected(this));
            })
            .on("dblclick", function (d: any, _idx) {
                context.dblclick(context.rowToObj(d), valueColumn, context._selection.selected(this));
            })
            .merge(arcs)
            .style("fill", (d, i) => this.fillColor(d, d[0], d[1]))
            .transition()
            .delay((d, i) => i * this.transitionDelay())
            .duration(this.transitionDuration())
            .attrTween("d", (d, indx) => {
                const interpolate = d3Interpolate(d._current || 0, d[1]);
                d._current = d[1];
                return t => this._d3Arc([d[0], interpolate(t)], indx);
            })
            ;
        arcs.exit().remove();
    }

    degrees(radians) {
        return radians * 180 / Math.PI;
    }

    radians(degrees) {
        return degrees * Math.PI / 180;
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
    tickCount(): number;
    tickCount(_: number): this;
    domainPadding(): number;
    domainPadding(_: number): this;
    valueMaxAngle(): number;
    valueMaxAngle(_: number): this;
    valueDomainHigh(): number;
    valueDomainHigh(_: number): this;
    valueDomainHigh_exists(): boolean;
    transitionDelay(): number;
    transitionDelay(_: number): this;
    transitionDuration(): number;
    transitionDuration(_: number): this;
}
RadialBar.prototype.publish("paletteID", "default", "set", "paletteID", RadialBar.prototype._palette.switch());
RadialBar.prototype.publish("tickCount", 10, "number", "Number of ticks to display");
RadialBar.prototype.publish("domainPadding", 0.25, "number", "Padding between chart edge and container edge (0..1)");
RadialBar.prototype.publish("valueMaxAngle", 270, "number", "Maximum angular length of a bar (degrees)");
RadialBar.prototype.publish("valueDomainHigh", null, "number", "Value domain high", undefined, { optional: true });
RadialBar.prototype.publish("transitionDelay", 100, "number", "Delay between the start of each row animation (ms)");
RadialBar.prototype.publish("transitionDuration", 750, "number", "Duration of a row's animation (ms)");
