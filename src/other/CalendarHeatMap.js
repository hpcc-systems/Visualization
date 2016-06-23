"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../common/Palette", "../common/Utility", "css!./CalendarHeatMap"], factory);
    } else {
        root.other_CalendarHeatMap = factory(root.d3, root.common_HTMLWidget, root.common_Palette, root.common_Utility);
    }
}(this, function (d3, HTMLWidget, Palette, Utility) {
    function CalendarHeatMap(target) {
        HTMLWidget.call(this);
    }
    CalendarHeatMap.prototype = Object.create(HTMLWidget.prototype);
    CalendarHeatMap.prototype.constructor = CalendarHeatMap;
    CalendarHeatMap.prototype._class += " other_CalendarHeatMap";

    CalendarHeatMap.prototype._palette = Palette.rainbow("default");
    CalendarHeatMap.prototype.publish("paletteID", "YlOrRd", "set", "Palette ID", CalendarHeatMap.prototype._palette.switch(), { tags: ["Basic", "Shared"] });

    CalendarHeatMap.prototype.publish("dateColumn", null, "set", "Date Column", function () { return this.columns(); }, { optional: true });
    CalendarHeatMap.prototype.publish("datePattern", "%Y-%m-%d", "string", "Date Pattern");
    CalendarHeatMap.prototype.publish("aggrType", null, "set", "Aggregation Type", [null, "mean", "median", "sum", "min", "max"], { optional: true });
    CalendarHeatMap.prototype.publish("aggrColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: function (w) { return !w.aggrType(); } });
    CalendarHeatMap.prototype.publish("aggrDeltaColumn", null, "set", "Aggregation Field", function () { return this.columns(); }, { optional: true, disable: function (w) { return !w.aggrType(); } });

    CalendarHeatMap.prototype.calendarData = function () {
        var dateParser = d3.time.format(this.datePattern()).parse;
        var valueFormatter = this.aggrDeltaColumn() ? d3.format(".1%") : d3.format("s");
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
    };

    CalendarHeatMap.prototype.calcDelta = function (row) {
        return (row.Close - row.Open) / row.Open;
    };

    CalendarHeatMap.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        d3.select(domNode.parentNode).style("overflow", "scroll");
        this._selection = new Utility.SimpleSelection(element);
    };

    CalendarHeatMap.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._palette = this._palette.switch(this.paletteID());

        var width = this.width(),
            cellSize = (width / 12) / 5,
            height = cellSize * 8;

        var data = this.calendarData();
        var mappedData = d3.map(data, function (d) { return d.dateKey; });
        var dateExtent = d3.extent(data, function (d) {
            return d.dateKey.getFullYear();
        });
        var context = this;
        var svg = element.selectAll("svg").data(d3.range(dateExtent[0], dateExtent[1] + 1));
        svg.enter().append("svg")
            .each(function (d) {
                var svg = d3.select(this);
                var g = svg.append("g");
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

        var dataExtent = d3.extent(data, function (d) {
            return d.values.aggregate;
        });
        if (this.aggrDeltaColumn()) {
            var max = Math.max(Math.abs(dataExtent[0], dataExtent[1]));
            dataExtent = [-max, max];
        }
        var dayRect = svg.select(".days").selectAll(".day").data(function (d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); });
        dayRect.enter().append("rect")
            .attr("class", "day")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                var data = mappedData.get(d);
                if (data && data.values && data.values && data.values.length) {
                    context.click(context.rowToObj(data.values[0]), context.dateColumn(), context._selection.selected(this));
                }
            })
            .append("title")
        ;
        dayRect
            .attr("x", function (d) { return d3.time.weekOfYear(d) * cellSize; })
            .attr("y", function (d) { return d.getDay() * cellSize; })
            .attr("width", cellSize)
            .attr("height", cellSize)
        ;
        dayRect.select("title")
            .text(function (d) { return d; })
        ;
        dayRect.filter(function (d) { return mappedData.has(d); })
            .style("fill", function (d) {
                var row = mappedData.get(d);
                if (!row || !row.values || !row.values.aggregate) {
                    return null;
                }
                return context._palette(row.values.aggregate, dataExtent[0], dataExtent[1]);
            })
          .select("title")
            .text(function (d) {
                var data = mappedData.get(d);
                return data.key + ": " + data.formattedValues;
            })
        ;
        dayRect.exit().remove();

        var monthPath = svg.select(".months").selectAll(".month").data(function (d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); });
        monthPath.enter().append("path")
            .attr("class", "month")
        ;
        monthPath
            .attr("d", calcMonthPath)
        ;
        monthPath.exit().remove();

        function calcMonthPath(t0) {
            var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
                d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
                d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
            return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize +
                "H" + w0 * cellSize + "V" + 7 * cellSize +
                "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize +
                "H" + (w1 + 1) * cellSize + "V" + 0 +
                "H" + (w0 + 1) * cellSize + "Z";
        }
    };

    CalendarHeatMap.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    //  Events  ---
    CalendarHeatMap.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return CalendarHeatMap;
}));