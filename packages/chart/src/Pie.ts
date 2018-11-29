import { I2DChart, ITooltip } from "@hpcc-js/api";
import { InputField, SVGWidget, Utility } from "@hpcc-js/common";
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

    labelWidgets;
    d3Pie;
    d3Arc;
    d3LabelArc;
    _labelPositions;
    _smallValueLabelHeight;
    _labelWidthLimit: number;
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
        const horizontalLimit = this._size.width - maxTextWidth * 2 - 20;
        const verticalLimit = this._size.height - 12 * 3 - this._smallValueLabelHeight;
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
        return 15 * smallCount;
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
            const labelWidth = this.textSize(label, "Verdana", 12).width;
            if (this._labelWidthLimit < labelWidth) {
                len = label.length * (this._labelWidthLimit / labelWidth) - 3;
                label = len < label.length ? label.slice(0, len) + "..." : label;
            }
        }
        if (this.showSeriesPercentage()) {
            const perc = ((d.data[1] / this._totalValue) * 100).toFixed(1).split(".0").join("");
            return `${label}: ${perc}%`;
        } else {
            return label;
        }
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
                return context.tooltipFormat({ label: d.data[0], value: d.data[1] });
            })
            ;
    }

    update(_domNode, element) {
        super.update(_domNode, element);
        const context = this;
        this.updateD3Pie();
        this._palette = this._palette.switch(this.paletteID());
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
        this.data().sort((a, b) => {
            return a[1] - b[1] > 0 ? -1 : 1;
        });
        const arc = this._slices.selectAll(".arc").data(this.d3Pie(this.data()), d => d.data[0]);

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
            .each(function (d) {
                const element2 = d3Select(this);
                element2.append("path")
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
                    .on("mouseover", arcTween(0, 0))
                    .on("mouseout", arcTween(-5, 150))
                    ;
            })
            .merge(arc).transition()
            .attr("opacity", 1)
            .each(function (d) {
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
        const text = this._labels.selectAll("text").data(this.d3Pie(this.data()), d => d.data[0]);

        const mergedText = text.enter().append("text")
            .on("mouseout.tooltip", context.tooltip.hide)
            .on("mousemove.tooltip", context.tooltip.show)
            .attr("dy", ".35em")
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
            .each(function (d) {
                const pos = context.d3LabelArc.centroid(d);
                const mid_angle = midAngle(d);
                pos[0] = labelRadius * (context.isLeftSide(mid_angle) ? 1 : -1);
                context._labelPositions.push({
                    top: pos[1],
                    right: pos[0] + 30,
                    bottom: pos[1] + 12,
                    left: pos[1]
                });
            });
        this.adjustForOverlap(false);
        mergedText
            .attr("transform", function (d, i) {
                const pos = context.d3LabelArc.centroid(d);
                const mid_angle = midAngle(d);
                pos[0] = labelRadius * (context.isLeftSide(mid_angle) ? 1 : -1);
                pos[1] = context._labelPositions[i].top;
                return "translate(" + pos + ")";
            })
            .style("text-anchor", function (d) {
                const mid_angle = midAngle(d);
                return context.isLeftSide(mid_angle) ? "start" : "end";
            });
        this.centerOnLabels();

        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        text.exit()
            .remove();

        const polyline = this._labels.selectAll("polyline").data(this.d3Pie(this.data()), d => this.getLabelText(d, true));

        polyline.enter()
            .append("polyline")
            .merge(polyline)
            .attr("points", function (d, i) {
                const pos = context.d3LabelArc.centroid(d);
                const pos1 = context.d3Arc.centroid(d);
                const pos2 = [...pos];
                const mid_angle = midAngle(d);
                pos[0] = labelRadius * (context.isLeftSide(mid_angle) ? 1 : -1);
                pos[1] = context._labelPositions[i].top;
                return [pos1, pos2, pos];
            });

        polyline.exit()
            .remove();

        this.centerOnLabels();

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
        midAngle = this.normalizeRadians(midAngle);
        const isLeft = midAngle > Math.PI * 2 ? midAngle : midAngle < Math.PI && midAngle > 0;
        return isLeft;
    }
    normalizeRadians(radians) {
        let ret = radians;
        if (radians > Math.PI) {
            while (ret > Math.PI) {
                ret -= Math.PI * 2;
            }
        } else if (radians < -Math.PI) {
            while (ret < -Math.PI) {
                ret += Math.PI * 2;
            }
        }
        return ret;
    }
    centerOnLabels() {
        const node = this.element().node();
        const svg = this.locateSVGNode(node);
        const svgRect = svg.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();
        this.pos({
            y: (svgRect.height / 2) - this.calcOuterRadius() - 12 + (nodeRect.height / 2),
            x: (svgRect.width / 2)
        });
    }
    adjustForOverlap(debug) {
        let maxRectHeight = 0;
        let resultArr = this._labelPositions;
        let overlapIndexArr = [];
        for (let i = 0; i < this.data().length && anyOverlapExists(resultArr); i++) {
            if (!debug) resultArr = repositionThem(resultArr);
        }
        return resultArr;
        function repositionThem(arr) {
            const leftRightValue = Math.floor(arr[0].right / 10) * 10;
            const leftOverlapIndexArr = [];
            const rightOverlapIndexArr = [];
            overlapIndexArr.sort((a, b) => {
                return arr[a].top - arr[b].top > 0 ? -1 : 1;
            });
            overlapIndexArr.forEach(idx => {
                if (leftRightValue === Math.floor(arr[idx].right / 10) * 10) {
                    leftOverlapIndexArr.push(idx);
                } else {
                    rightOverlapIndexArr.push(idx);
                }
            });
            for (let i = 0; i < leftOverlapIndexArr.length; i++) {
                adjustOneLabel(i, leftOverlapIndexArr);
            }
            for (let i = 0; i < rightOverlapIndexArr.length; i++) {
                adjustOneLabel(i, rightOverlapIndexArr);
            }
            return arr;
            function adjustOneLabel(i, indexArr) {
                const idx = indexArr[i];
                arr[idx].top = arr[idx].top - maxRectHeight * (i + 1);
                arr[idx].bottom = arr[idx].bottom - maxRectHeight * (i + 1);
            }
        }
        function anyOverlapExists(resultArr) {
            overlapIndexArr = [];
            for (let i = 0; i < resultArr.length; i++) {
                const rect = resultArr[i];
                const h = rect.bottom - rect.top;
                if (h > maxRectHeight) {
                    maxRectHeight = h;
                }
                if (rectOverlaps(rect, resultArr)) {
                    overlapIndexArr.push(i);
                }
            }
            return overlapIndexArr.length > 0;
        }
        function rectOverlaps(rect, arr) {
            let overlapCount = 0;
            const rectStandardRight = Math.floor(rect.right / 10) * 10;
            for (const rect2 of arr) {
                const rect2StandardRight = Math.floor(rect2.right / 10) * 10;
                if (_rectsOverlap(rect, rect2) && rect !== rect2 && rect.top < rect2.top && rectStandardRight === rect2StandardRight) {
                    overlapCount++;
                }
            }
            return overlapCount > 0;
            function _rectsOverlap(r1, r2) {
                return Math.max(r1.top, r2.top) - Math.min(r1.top, r2.top) < 12;
            }
        }
    }
    exit(_domNode, _element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    }

    updateD3Pie() {
        this.d3Pie
            .padAngle(0.0025)
            .startAngle(-Math.PI + this.normalizeRadians(this.startAngle()))
            .endAngle(Math.PI + this.normalizeRadians(this.startAngle()))
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
    showSeriesPercentage(): boolean;
    showSeriesPercentage(_: boolean): this;
    minOuterRadius(): number;
    minOuterRadius(_: number): this;
    startAngle(): number;
    startAngle(_: number): this;
}
Pie.prototype.publish("showSeriesPercentage", false, "boolean", "Append data series percentage next to label");
Pie.prototype.publish("paletteID", "default", "set", "Color palette for this widget", Pie.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Pie.prototype.publish("innerRadius", 0, "number", "Sets inner pie hole radius as a percentage of the radius of the pie chart", null, { tags: ["Basic"], range: { min: 0, step: 1, max: 100 } });
Pie.prototype.publish("minOuterRadius", 20, "number", "Minimum outer radius (pixels)");
Pie.prototype.publish("startAngle", 0, "number", "Starting angle of the first (and largest) wedge (radians)");
