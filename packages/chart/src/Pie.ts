import { I2DChart, ITooltip } from "@hpcc-js/api";
import { InputField, SVGWidget, Utility } from "@hpcc-js/common";
import { degreesToRadians, normalizeRadians } from "@hpcc-js/util";
import { format as d3Format } from "d3-format";
import { interpolate as d3Interpolate } from "d3-interpolate";
import { select as d3Select } from "d3-selection";
import { arc as d3Arc, pie as d3Pie } from "d3-shape";

import "../src/Pie.css";

export class Pie extends SVGWidget {
    static __inputs: InputField[] = [{
        id: "label",
        type: "string"
    }, {
        id: "value",
        type: "number"
    }];

    protected _totalValue: number;

    d3Pie;
    d3Arc;
    d3LabelArc;
    private _labelPositions;
    private _smallValueLabelHeight;
    private _labelWidthLimit: number;
    private _quadIdxArr;
    private _minLabelTop = 0;
    private _maxLabelBottom = 0;
    private _seriesValueFormatter;
    private _seriesPercentageFormatter;
    constructor() {
        super();
        I2DChart.call(this);
        ITooltip.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this.d3Pie = d3Pie();

        this.d3Arc = d3Arc();
        this.d3LabelArc = d3Arc();
        this
            .tooltipTick_default(false)
            .tooltipOffset_default(0)
            ;
    }

    intersection(pointA, pointB) {
        return this.intersectCircle(this.calcOuterRadius(), pointA, pointB);
    }

    calcInnerRadius() {
        return this.innerRadius_exists() ? this.calcOuterRadius() * (this.innerRadius() as number) / 100 : 0;
    }

    calcOuterRadius() {
        const maxTextWidth = this.textSize(this.data().map(d => this.getLabelText({ data: d }, false)), "Verdana", 12).width;
        const horizontalLimit = this._size.width - (this.showLabels() ? maxTextWidth * 2 : 0) - 20;
        const verticalLimit = this._size.height - 12 * 3 - (this.showLabels() ? this._smallValueLabelHeight : 0);
        const outerRadius = Math.min(horizontalLimit, verticalLimit) / 2 - 2;
        if ((horizontalLimit / 2) - 2 < this.minOuterRadius()) {
            this._labelWidthLimit = maxTextWidth - (this.minOuterRadius() - ((horizontalLimit / 2) - 2));
        } else {
            this._labelWidthLimit = maxTextWidth;
        }
        if (outerRadius < this.minOuterRadius()) {
            return this.minOuterRadius();
        }
        return outerRadius;
    }

    calcSmallValueLabelHeight() {
        const smallDef = 0.1;
        const totalVal = this.data().reduce((acc, n) => acc + n[1], 0);
        let smallCount = 0;
        this.data().forEach(row => {
            if (row[1] / totalVal < smallDef) {
                smallCount++;
            }
        });
        return this.labelHeight() * smallCount;
    }

    calcTotalValue(): number {
        return this.data().reduce((acc, d) => {
            return acc + d[1];
        }, 0);
    }

    getLabelText(d, truncate?) {
        let len;
        let label = d.data[0];
        if (typeof this._labelWidthLimit !== "undefined" && truncate) {
            const labelWidth = this.textSize(label, "Verdana", this.labelHeight()).width;
            if (this._labelWidthLimit < labelWidth) {
                len = label.length * (this._labelWidthLimit / labelWidth) - 3;
                label = len < label.length ? label.slice(0, len) + "..." : label;
            }
        }
        if (this.showSeriesValue()) {
            label += ` : ${this._seriesValueFormatter(d.data[1])}`;
        }
        if (this.showSeriesPercentage()) {
            let sum = this._totalValue;
            const dm = this.dataMeta();
            if (typeof dm.sum !== "undefined") {
                sum = dm.sum;
            }
            const perc = (d.data[1] / sum) * 100;
            label += ` : ${this._seriesPercentageFormatter(perc)}%`;
        }
        return label;
    }
    _slices;
    _labels;
    enter(_domNode, element) {
        super.enter(_domNode, element);
        this._selection.widgetElement(element);
        this._slices = element.append("g");
        this._labels = element.append("g");
        const context = this;
        this
            .tooltipHTML(function (d) {
                switch (context.tooltipStyle()) {
                    case "series-table":
                        return context.tooltipFormat({
                            label: d.data[0],
                            arr: context.columns().slice(1).map(function (column, i) {
                                return {
                                    label: column,
                                    color: context._palette(d.data[0]),
                                    value: d.data[i + 1]
                                };
                            })
                        });
                    default:
                        return context.tooltipFormat({ label: d.data[0], value: d.data[1] });
                }
            })
            ;
    }

    update(_domNode, element) {
        super.update(_domNode, element);
        const context = this;
        this.updateD3Pie();
        this._palette = this._palette.switch(this.paletteID());
        this._seriesValueFormatter = d3Format(this.seriesValueFormat() as string);
        this._seriesPercentageFormatter = d3Format(this.seriesPercentageFormat() as string);
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
        this._smallValueLabelHeight = this.calcSmallValueLabelHeight();
        this._totalValue = this.calcTotalValue();
        const innerRadius = this.calcInnerRadius();
        const outerRadius = this.calcOuterRadius();
        const labelRadius = outerRadius + 12;
        this.d3Arc
            .innerRadius(innerRadius)
            .padRadius(outerRadius)
            .outerRadius(outerRadius)
            ;

        this._quadIdxArr = [[], [], [], []];
        const data = [...this.data()].sort((a, b) => {
            return a[1] - b[1] > 0 ? -1 : 1;
        });
        const arc = this._slices.selectAll(".arc").data(this.d3Pie(data), d => d.data[0]);

        this._labelPositions = [];

        //  Enter  ---
        arc.enter().append("g")
            .attr("class", (d, i) => "arc series series-" + this.cssTag(d.data[0]))
            .attr("opacity", 0)
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .each(function (d, i) {
                d3Select(this).append("path")
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
                    .on("mouseover", arcTween(0, 0))
                    .on("mouseout", arcTween(-5, 150))
                    ;
            })
            .merge(arc).transition()
            .attr("opacity", 1)
            .each(function (d, i) {
                const quad = context.getQuadrant(midAngle(d));
                context._quadIdxArr[quad].push(i);
                d.outerRadius = outerRadius - 5;
                const element2 = d3Select(this);
                element2.select("path").transition()
                    .attr("d", context.d3Arc)
                    .style("fill", context.fillColor(d.data, context.columns()[1], d.data[1]))
                    ;
            })
            ;

        //  Exit  ---
        arc.exit().transition()
            .style("opacity", 0)
            .remove()
            ;
        //  Labels  ---
        this.d3LabelArc
            .innerRadius(labelRadius)
            .outerRadius(labelRadius)
            ;
        const text = this._labels.selectAll("text").data(this.showLabels() ? this.d3Pie(data) : [], d => d.data[0]);

        const mergedText = text.enter().append("text")
            .on("mouseout.tooltip", context.tooltip.hide)
            .on("mousemove.tooltip", context.tooltip.show)
            .attr("dy", ".5em")
            .on("click", function (d) {
                context._slices.selectAll("g").filter(function (d2) {
                    if (d.data === d2.data) {
                        context._selection.click(this);
                    }
                });
                context.click(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .merge(text)
            .text(d => this.getLabelText(d, true))
            .each(function (d, i) {
                const pos = context.d3LabelArc.centroid(d);
                const mid_angle = midAngle(d);
                pos[0] = labelRadius * (context.isLeftSide(mid_angle) ? 1 : -1);
                context._labelPositions.push({
                    top: pos[1],
                    bottom: pos[1] + context.labelHeight()
                });
            });
        if (this.showLabels()) {
            this.adjustForOverlap();
            mergedText.transition()
                .style("font-size", this.labelHeight() + "px")
                .attr("transform", (d, i) => {
                    const pos = context.d3LabelArc.centroid(d);
                    pos[0] = labelRadius * (context.isLeftSide(midAngle(d)) ? 1 : -1);
                    pos[1] = context._labelPositions[i].top;
                    return "translate(" + pos + ")";
                })
                .style("text-anchor", d => this.isLeftSide(midAngle(d)) ? "start" : "end");
        }

        text.exit()
            .remove();

        const polyline = this._labels.selectAll("polyline").data(this.showLabels() ? this.d3Pie(data) : [], d => this.getLabelText(d, true));

        polyline.enter()
            .append("polyline")
            .merge(polyline).transition()
            .attr("points", function (d, i) {
                const pos = context.d3LabelArc.centroid(d);
                const pos1 = context.d3Arc.centroid(d);
                const pos2 = [...pos];
                pos[0] = labelRadius * (context.isLeftSide(midAngle(d)) ? 1 : -1);
                pos[1] = context._labelPositions[i].top;
                return [pos1, pos2, pos];
            });

        polyline.exit()
            .remove();

        this.centerOnLabels();

        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        function arcTween(outerRadiusDelta, delay) {
            return function () {
                d3Select(this).transition().delay(delay).attrTween("d", function (d: any) {
                    const i = d3Interpolate(d.outerRadius, outerRadius + outerRadiusDelta);
                    return function (t) { d.outerRadius = i(t); return context.d3Arc(d); };
                });
            };
        }
    }

    isLeftSide(midAngle) {
        midAngle = normalizeRadians(midAngle);
        const isLeft = midAngle > Math.PI * 2 ? midAngle : midAngle < Math.PI && midAngle > 0;
        return isLeft;
    }

    getQuadrant(radians) {
        let quad = 0;
        const rad = normalizeRadians(radians);
        quad = rad <= Math.PI * 1.0 && rad >= Math.PI * 0.5 ? 3 : quad;
        quad = rad <= Math.PI * 0.5 && rad >= Math.PI * 0.0 ? 2 : quad;
        quad = rad <= Math.PI * 0.0 && rad >= Math.PI * -0.5 ? 1 : quad;
        return quad;
    }

    centerOnLabels() {
        const gY = this.pos().y;
        const gY2 = gY * 2;
        const radius = this.calcOuterRadius();
        const top = Math.min(this._minLabelTop, -radius);
        const bottom = Math.max(this._maxLabelBottom, radius);
        const h = bottom - top;
        const heightDiff = gY2 - h;
        const absTop = Math.abs(this._minLabelTop);
        let yShift = 0;
        if (bottom > gY) {
            yShift = gY - bottom + (this.labelHeight() / 2);
            yShift -= heightDiff / 2;
        } else if (top < 0 && absTop > gY) {
            yShift = absTop - gY + (this.labelHeight() / 2);
            yShift += heightDiff / 2;
        }
        const pos = this.pos();
        this.pos({
            y: pos.y + yShift,
            x: pos.x
        });
    }

    adjustForOverlap() {
        const labelHeight = this.labelHeight();
        this._quadIdxArr.forEach((arr, quad) => {
            this._quadIdxArr[quad].sort((a, b) => {
                if (quad === 1 || quad === 2) {
                    return this._labelPositions[a].top > this._labelPositions[b].top ? -1 : 1;
                } else if (quad === 0 || quad === 3) {
                    return this._labelPositions[a].top > this._labelPositions[b].top ? 1 : -1;
                }
            });
            let prevTop;
            this._quadIdxArr[quad].forEach((n, i) => {
                if (i > 0) {
                    if (quad === 1 || quad === 2) {
                        if (prevTop < this._labelPositions[n].bottom) {
                            const overlap = this._labelPositions[n].bottom - prevTop;
                            this._labelPositions[n].top -= overlap;
                            this._labelPositions[n].bottom -= overlap;
                        }
                    } else if (quad === 0 || quad === 3) {
                        if (prevTop + labelHeight > this._labelPositions[n].top) {
                            const overlap = Math.abs(this._labelPositions[n].top) - Math.abs(prevTop + labelHeight);
                            this._labelPositions[n].top -= overlap;
                            this._labelPositions[n].bottom -= overlap;
                        }
                    }
                }
                prevTop = this._labelPositions[n].top;
            });
        });
        this._minLabelTop = 0;
        this._maxLabelBottom = 0;
        this._quadIdxArr.forEach((arr, quad) => {
            this._quadIdxArr[quad].forEach((n, i) => {
                if (this._minLabelTop > this._labelPositions[n].top) {
                    this._minLabelTop = this._labelPositions[n].top;
                }
                if (this._maxLabelBottom < this._labelPositions[n].bottom) {
                    this._maxLabelBottom = this._labelPositions[n].bottom;
                }
            });
        });
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    updateD3Pie() {
        const startAngle = normalizeRadians(degreesToRadians(this.startAngle()));
        this.d3Pie
            .padAngle(0.0025)
            .startAngle(startAngle)
            .endAngle(2 * Math.PI + startAngle)
            .sort(function (b, a) {
                return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
            })
            .value(function (d) {
                return d[1];
            })
            ;
    }

    paletteID: (_?: string) => string | Pie;
    useClonedPalette: (_?: boolean) => boolean | Pie;
    outerText: (_?: boolean) => boolean | Pie;
    innerRadius: { (): number; (_: number): Pie; };
    innerRadius_exists: () => boolean;

    //  I2DChart
    _palette;
    fillColor: (row: any[], column: string, value: number) => string;
    textColor: (row: any[], column: string, value: number) => string;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  ITooltip
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;
    tooltipStyle: () => "default" | "none" | "series-table";
    tooltipTick: { (): boolean; (_: boolean): Pie; };
    tooltipTick_default: { (): boolean; (_: boolean): Pie; };
    tooltipOffset: { (): number; (_: number): Pie; };
    tooltipOffset_default: { (): number; (_: number): Pie; };

    //  SimpleSelectionMixin
    _selection: Utility.SimpleSelection;
}

Pie.prototype._class += " chart_Pie";
Pie.prototype.implements(I2DChart.prototype);
Pie.prototype.implements(ITooltip.prototype);
Pie.prototype.mixin(Utility.SimpleSelectionMixin);
export interface Pie {
    showSeriesValue(): boolean;
    showSeriesValue(_: boolean): this;
    seriesValueFormat(): string;
    seriesValueFormat(_: string): this;
    showSeriesPercentage(): boolean;
    showSeriesPercentage(_: boolean): this;
    minOuterRadius(): number;
    minOuterRadius(_: number): this;
    startAngle(): number;
    startAngle(_: number): this;
    labelHeight(): number;
    labelHeight(_: number): this;
    seriesPercentageFormat(): string;
    seriesPercentageFormat(_: string): this;
    showLabels(): boolean;
    showLabels(_: boolean): this;
}
Pie.prototype.publish("showLabels", true, "boolean", "If true, wedge labels will display");
Pie.prototype.publish("showSeriesValue", false, "boolean", "Append data series value next to label", null, { disable: w => !w.showLabels() });
Pie.prototype.publish("seriesValueFormat", ",.0f", "string", "Number format used for formatting series values", null, { disable: w => !w.showSeriesValue() });
Pie.prototype.publish("showSeriesPercentage", false, "boolean", "Append data series percentage next to label", null, { disable: w => !w.showLabels() });
Pie.prototype.publish("seriesPercentageFormat", ",.0f", "string", "Number format used for formatting series percentages", null, { disable: w => !w.showSeriesPercentage() });
Pie.prototype.publish("paletteID", "default", "set", "Color palette for this widget", Pie.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Pie.prototype.publish("innerRadius", 0, "number", "Sets inner pie hole radius as a percentage of the radius of the pie chart", null, { tags: ["Basic"], range: { min: 0, step: 1, max: 100 } });
Pie.prototype.publish("minOuterRadius", 20, "number", "Minimum outer radius (pixels)");
Pie.prototype.publish("startAngle", 0, "number", "Starting angle of the first (and largest) wedge (degrees)");
Pie.prototype.publish("labelHeight", 12, "number", "Font size of labels (pixels)", null, { disable: w => !w.showLabels() });
