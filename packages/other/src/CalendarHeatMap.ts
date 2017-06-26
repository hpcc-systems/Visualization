import { HTMLWidget, Palette, Utility } from "@hpcc-js/common";
import { extent as d3Extent, range as d3Range } from "d3-array";
import { map as d3Map } from "d3-collection";
import { format as d3Format } from "d3-format";
import { select as d3Select } from "d3-selection";
import { timeDays as d3TimeDays, timeMonths as d3TimeMonths, timeWeek as d3TimeWeek } from "d3-time";
import { timeParse as d3TimeParse } from "d3-time-format";

import "../src/CalendarHeatMap.css";

export class CalendarHeatMap extends HTMLWidget {
    _prevDateColumn;
    _prevAggrType;
    _prevAggrColumn;
    _prevAggrDeltaColumn;
    _view;

    constructor() {
        super();

        Utility.SimpleSelectionMixin.call(this);
    }

    calendarData() {
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
            row.formattedValues = valueFormatter(row.values.aggregate);
            row.origRows = valueFormatter(row.values);
            return row;
        });
    }

    calcDelta(row) {
        return (row.Close - row.Open) / row.Open;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        d3Select(domNode.parentNode).style("overflow", "scroll");
        this._selection.widgetElement(element);
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
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
        svg.enter().append("svg")
            .each(function (d) {
                const svg2 = d3Select(this);
                const g = svg2.append("g");
                g
                    .append("text")
                    .style("text-anchor", "middle")
                    ;
                g.append("g")
                    .attr("class", "days")
                    ;
                g.append("g")
                    .attr("class", "months")
                    ;
            })
            ;
        svg
            .attr("width", width)
            .attr("height", height)
            ;
        svg.select("g")
            .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")")
            ;
        svg.select("text")
            .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
            .text(function (d) { return d; })
            ;
        svg.exit().remove();

        let dataExtent: [any, any] = d3Extent<number>(data, function (d: any) {
            return d.values.aggregate;
        });
        if (this.aggrDeltaColumn()) {
            const max = Math.max(Math.abs(+dataExtent[0]), Math.abs(+dataExtent[1]));
            dataExtent = [-max, max];
        }
        const dayRect = svg.select(".days").selectAll(".day").data(function (d) { return d3TimeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); });
        dayRect.enter().append("rect")
            .attr("class", "day")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                const data2 = mappedData.get(d);
                if (data2 && data2.values && data2.values && data2.values.length) {
                    context.click(context.rowToObj(data2.values[0]), context.dateColumn(), context._selection.selected(this));
                }
            })
            .on("dblclick", function (d) {
                const data2 = mappedData.get(d);
                if (data2 && data2.values && data2.values && data2.values.length) {
                    context.dblclick(context.rowToObj(data2.values[0]), context.dateColumn(), context._selection.selected(this));
                }
            })
            .append("title")
            ;
        dayRect
            .attr("x", function (d) { return d3TimeWeek.count(d[0], d[1]) * cellSize; })
            .attr("y", function (d) { return d.getDay() * cellSize; })
            .attr("width", cellSize)
            .attr("height", cellSize)
            ;
        dayRect.select("title")
            .text(function (d) { return d; })
            ;
        dayRect.filter(function (d) { return mappedData.has(d); })
            .style("fill", function (d) {
                const row = mappedData.get(d);
                if (!row || !row.values || !row.values.aggregate) {
                    return null;
                }
                return context._palette(row.values.aggregate, dataExtent[0], dataExtent[1]);
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
            ;
        monthPath
            .attr("d", calcMonthPath)
            ;
        monthPath.exit().remove();

        function calcMonthPath(t0) {
            const t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0);
            const d0 = t0.getDay();
            const w0 = d3TimeWeek.count(t0[0], t0[1]);
            const d1 = t1.getDay();
            const w1 = d3TimeWeek.count(t1[0], t1[1]);
            return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize +
                "H" + w0 * cellSize + "V" + 7 * cellSize +
                "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize +
                "H" + (w1 + 1) * cellSize + "V" + 0 +
                "H" + (w0 + 1) * cellSize + "Z";
        }
    }

    exit(domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
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
CalendarHeatMap.prototype.publish("paletteID", "YlOrRd", "set", "Palette ID", CalendarHeatMap.prototype._palette.switch(), { tags: ["Basic", "Shared"] });

CalendarHeatMap.prototype.publish("dateColumn", null, "set", "Date Column", function () { return this.columns(); }, { optional: true });
CalendarHeatMap.prototype.publish("datePattern", "%Y-%m-%d", "string", "Date Pattern");
CalendarHeatMap.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true });
CalendarHeatMap.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: (w) => !w.aggrType() });
CalendarHeatMap.prototype.publish("aggrDeltaColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: (w) => !w.aggrType() });
