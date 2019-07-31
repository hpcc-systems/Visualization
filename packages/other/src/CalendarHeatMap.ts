import { HTMLWidget, Palette, Utility } from "@hpcc-js/common";
import { extent as d3Extent, range as d3Range } from "d3-array";
import { map as d3Map } from "d3-collection";
import { format as d3Format } from "d3-format";
import { select as d3Select } from "d3-selection";
import { timeDays as d3TimeDays, timeMonths as d3TimeMonths, timeWeek as d3TimeWeek, timeYear as d3TimeYear } from "d3-time";
import { timeParse as d3TimeParse } from "d3-time-format";

import "../src/CalendarHeatMap.css";

export class CalendarHeatMap extends HTMLWidget {
    _prevDateColumn;
    _prevAggrType;
    _prevAggrColumn;
    _prevAggrDeltaColumn;
    _view;
    _parentNode;

    constructor() {
        super();

        Utility.SimpleSelectionMixin.call(this);
    }

    calendarData() {
        if (this.fields().length === 0 || this.data().length === 0) {
            return [];
        }
        const dateParser = d3TimeParse(this.datePattern());
        const valueFormatter = this.aggrDeltaColumn() ? d3Format(".1%") : d3Format("s");
        if (this._prevDateColumn !== this.dateColumn() ||
            this._prevAggrType !== this.aggrType() ||
            this._prevAggrColumn !== this.aggrColumn() ||
            this._prevAggrDeltaColumn !== this.aggrDeltaColumn()) {
            this._prevDateColumn = this.dateColumn();
            this._prevAggrType = this.aggrType();
            this._prevAggrColumn = this.aggrColumn();
            this._prevAggrDeltaColumn = this.aggrDeltaColumn();
            this._view = this._db.aggregateView([this.dateColumn()], this.aggrType(), this.aggrColumn(), this.aggrDeltaColumn());
        }
        return this._view.entries().map(function (row) {
            row.dateKey = dateParser(row.key);
            row.formattedValues = valueFormatter(row.value.aggregate);
            row.origRows = row.value;
            return row;
        });
    }

    calcDelta(row) {
        return (row.Close - row.Open) / row.Open;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        d3Select(domNode.parentNode)
            .style("overflow-y", "scroll")
            .style("overflow-x", "hidden")
            .style("height", "100%")
            .style("width", "100%")
            ;
        this._selection.widgetElement(element);
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._palette = this._palette.switch(this.paletteID());

        const width = this.width();
        const cellSize = (width / 12) / 5;
        const height = cellSize * 8;

        const data = this.calendarData();
        const mappedData = d3Map(data, function (d: any) { return d.dateKey; });
        const dateExtent = d3Extent(data, function (d: any) {
            return d.dateKey.getFullYear();
        });
        const context = this;
        const svg = element.selectAll("svg").data(d3Range(+dateExtent[0], +dateExtent[1] + 1));
        const svgUpdate = svg.enter().append("svg")
            .each(function (d) {
                const svgElement = d3Select(this);
                const g = svgElement.append("g");
                g.append("text")
                    .style("text-anchor", "middle")
                    ;
                g.append("g")
                    .attr("class", "days")
                    ;

                const _d3TimeMonths = d3TimeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1));
                const _months = g.append("g").attr("class", "months");
                _d3TimeMonths.forEach(function (_m) {
                    _months.append("path")
                        .attr("class", "month")
                        .attr("d", calcMonthPath(_m))
                        .style("stroke", context.monthStrokeColor())
                        .style("stroke-width", context.monthStrokeWidth())
                        ;
                });
            })
            .merge(svg)
            .attr("width", width)
            .attr("height", height)
            ;
        svgUpdate.select("g")
            .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")")
            ;
        svgUpdate.select("text")
            .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
            .text(d => d)
            ;
        svg.exit().remove();

        let dataExtent: [any, any] = d3Extent<number>(data, function (d: any) {
            return d.value.aggregate;
        });
        if (this.aggrDeltaColumn()) {
            const max = Math.max(Math.abs(+dataExtent[0]), Math.abs(+dataExtent[1]));
            dataExtent = [-max, max];
        }
        const dayRect = svgUpdate.select(".days").selectAll(".day").data(function (d) { return d3TimeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); });
        const dayRectUpdate = dayRect.enter().append("rect")
            .attr("class", "day")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                const data2 = mappedData.get(d);
                if (data2 && data2.value && data2.value && data2.value.length) {
                    context.click(context.rowToObj(data2.value[0]), context.dateColumn(), context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                const data2 = mappedData.get(d);
                if (data2 && data2.value && data2.value && data2.value.length) {
                    context.dblclick(context.rowToObj(data2.value[0]), context.dateColumn(), context._selection.selected(this));
                }
            }).each(function (d) {
                const dayRectElement = d3Select(this);
                dayRectElement.append("title");
            })
            .merge(dayRect)
            .attr("x", function (d) { return d3TimeWeek.count(d3TimeYear(d), d) * cellSize; })
            .attr("y", function (d) { return d.getDay() * cellSize; })
            .attr("width", cellSize)
            .attr("height", cellSize)
            .style("stroke", this.dayStrokeColor())
            .style("stroke-width", this.dayStrokeWidth())
            .style("fill", null)
            ;
        dayRectUpdate.select("title")
            .text(d => d)
            ;
        dayRectUpdate.filter(function (d) { return mappedData.has(d); })
            .style("fill", function (d) {
                const row = mappedData.get(d);
                if (!row || !row.value || !row.value.aggregate) {
                    return null;
                }
                return context._palette(row.value.aggregate, dataExtent[0], dataExtent[1]);
            })
            .select("title")
            .text(function (d) {
                const data2 = mappedData.get(d);
                return data2.key + ": " + data2.formattedValues;
            })
            ;
        dayRect.exit().remove();

        const monthPath = svg.select(".months").selectAll(".month").data(function (d) { return d3TimeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); });
        monthPath.enter().append("path")
            .attr("class", "month")
            .merge(monthPath)
            .attr("d", calcMonthPath)
            .style("stroke", this.monthStrokeColor())
            .style("stroke-width", this.monthStrokeWidth())
            ;
        monthPath.exit().remove();

        function calcMonthPath(t0) {
            const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0);
            const d0 = t0.getDay();
            const w0 = d3TimeWeek.count(d3TimeYear(t0), t0);
            const d1 = t1.getDay();
            const w1 = d3TimeWeek.count(d3TimeYear(t1), t1);
            return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize +
                "H" + w0 * cellSize + "V" + 7 * cellSize +
                "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize +
                "H" + (w1 + 1) * cellSize + "V" + 0 +
                "H" + (w0 + 1) * cellSize + "Z";
        }
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    //  Events  ---
    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    dblclick(row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    _palette;
    paletteID: { (): string; (_: string): CalendarHeatMap };
    paletteID_exists: () => boolean;
    dateColumn: { (): string; (_: string): CalendarHeatMap };
    dateColumn_exists: () => boolean;
    datePattern: { (): string; (_: string): CalendarHeatMap };
    datePattern_exists: () => boolean;
    aggrType: { (): string; (_: string): CalendarHeatMap };
    aggrType_exists: () => boolean;
    aggrColumn: { (): string; (_: string): CalendarHeatMap };
    aggrColumn_exists: () => boolean;
    aggrDeltaColumn: { (): string; (_: string): CalendarHeatMap };
    aggrDeltaColumn_exists: () => boolean;

    //  SimpleSelectionMixin
    _selection;
}
CalendarHeatMap.prototype._class += " other_CalendarHeatMap";
CalendarHeatMap.prototype.mixin(Utility.SimpleSelectionMixin);
CalendarHeatMap.prototype._palette = Palette.rainbow("default");

export interface CalendarHeatMap {
    dayStrokeColor(): string;
    dayStrokeColor(_: string): this;
    monthStrokeColor(): string;
    monthStrokeColor(_: string): this;
    dayStrokeWidth(): number;
    dayStrokeWidth(_: number): this;
    monthStrokeWidth(): number;
    monthStrokeWidth(_: number): this;
}
CalendarHeatMap.prototype.publish("paletteID", "YlOrRd", "set", "Color palette for this widget", CalendarHeatMap.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
CalendarHeatMap.prototype.publish("dayStrokeColor", "#ccc", "html-color", "Color of day border");
CalendarHeatMap.prototype.publish("monthStrokeColor", "#000", "html-color", "Color of month border");
CalendarHeatMap.prototype.publish("dayStrokeWidth", 1, "number", "Pixel width of day border");
CalendarHeatMap.prototype.publish("monthStrokeWidth", 2, "number", "Pixel width of month border");
CalendarHeatMap.prototype.publish("dateColumn", null, "set", "Date Column", function () { return this.columns(); }, { optional: true });
CalendarHeatMap.prototype.publish("datePattern", "%Y-%m-%d", "string", "Date Pattern");
CalendarHeatMap.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true });
CalendarHeatMap.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: (w) => !w.aggrType() });
CalendarHeatMap.prototype.publish("aggrDeltaColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: (w) => !w.aggrType() });
