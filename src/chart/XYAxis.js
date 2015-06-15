"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "css!./XYAxis"], factory);
    } else {
        root.chart_XYAxis = factory(root.d3, root.common_SVGWidget);
    }
}(this, function (d3, SVGWidget) {
    function XYAxis(target) {
        SVGWidget.call(this);
        this._drawStartPos = "origin";

        this._dateParser = d3.time.format("%Y-%m-%d").parse;
    }
    XYAxis.prototype = Object.create(SVGWidget.prototype);
    XYAxis.prototype._class += " chart_XYAxis";

    XYAxis.prototype.publish("orientation", "horizontal", "set", "Selects orientation for the axis", ["horizontal", "vertical"]);
    XYAxis.prototype.publish("valueAxisPadding", 5, "number", "Value Axis Padding Percent");

    XYAxis.prototype.publish("selectionMode", false, "boolean", "Range Selector");
    XYAxis.prototype.publish("xAxisType", "category", "set", "X-Axis Type", ["category", "timeseries", "indexed"]);
    XYAxis.prototype.publish("timeseriesPattern", "%Y-%m-%d", "string", "Time Series Pattern");

    var timeseriesPattern = XYAxis.prototype.timeseriesPattern;
    XYAxis.prototype.timeseriesPattern = function (_) {
        var retVal = timeseriesPattern.apply(this, arguments);
        if (arguments.length) {
            this._dateParser = d3.time.format(_).parse;
        }
        return retVal;
    };

    XYAxis.prototype.columns = function (_) {
        return SVGWidget.prototype.columns.apply(this, arguments);
    };

    XYAxis.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (!arguments.length) {
            switch (this.xAxisType()) {
                case "timeseries":
                    retVal = retVal.map(function (row) {
                        return row.map(function (cell, idx) { return idx === 0 ? this._dateParser(cell) : cell; }, this);
                    }, this);
                    break;
            }
        }
        return retVal;
    };

    XYAxis.prototype.enter = function (domNode, element) {
        this.dataScale = null;
        switch (this.xAxisType()) {
            case "timeseries":
                this.dataScale = d3.time.scale();
                break;
            default:
                this.dataScale = d3.scale.ordinal();
                break;
        }
        this.valueScale = d3.scale.linear();

        this.dataAxis = d3.svg.axis()
            .orient("bottom")
            .scale(this.dataScale)
        ;

        this.valueAxis = d3.svg.axis()
            .orient("left")
            .scale(this.valueScale)
            .tickFormat(d3.format(".2s"))
            .ticks(10)
        ;

        this.svg = element.append("g");
        this.svgData = this.svg.append("g");
        this.svgXAxis = this.svg.append("g");
        this.svgYAxis = this.svg.append("g");

        //  Brush  ---
        var context = this;

        // Bursh ---
        this.xBrush = d3.svg.brush()
            .x(this.dataScale)
            .on("brush", function () {
                return context.brushMoved.apply(context, arguments);
            })
        ;
        this.yBrush = d3.svg.brush()
            .y(this.dataScale)
            .on("brush", function () {
                return context.brushMoved.apply(context, arguments);
            })
        ;

        //  SVG  ---
        this.brush_g = element.append("g")
            .attr("class", "brush")
        ;
    };

    XYAxis.prototype.resizeBrushHandle = function (d, width, height) {
        var e, x, y;
        if (d === "e" || d === "w") {
            e = +(d === "e");
            x = e ? 1 : -1;
            y = height / 3;
            return "M" + (0.5 * x) + "," + y +
                "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) +
                "V" + (2 * y - 6) +
                "A6,6 0 0 " + e + " " + (0.5 * x) + "," + (2 * y) +
                "Z" +
                "M" + (2.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8) +
                "M" + (4.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8);
        } else {
            e = +(d === "s");
            y = e ? 1 : -1;
            x = width / 3;
            return "M" + x + ", " + (0.5 * y) +
                "A6,6 0 0 " + (e + 1) % 2 + " " + (x + 6) + "," + (6.5 * y) +
                "H" + (2 * x - 6) +
                "A6,6 0 0 " + (e + 1) % 2 + " " + (2 * x) + "," + (0.5 * y) +
                "Z" +
                "M" + (x + 8) + "," + (2.5 * y) +
                "H" + (2 * x - 8) +
                "M" + (x + 8) + "," + (4.5 * y) +
                "H" + (2 * x - 8);
        }
    };

    XYAxis.prototype.brushMoved = SVGWidget.prototype.debounce(function brushed() {
        var selected = this.data().filter(function (d) {
            var pos;
            switch (this.xAxisType()) {
                case "timeseries":
                    pos = d[0];
                    if (this.orientation() === "horizontal") {
                        return (pos >= this.xBrush.extent()[0] && pos <= this.xBrush.extent()[1]);
                    } else {
                        return (pos >= this.yBrush.extent()[0] && pos <= this.yBrush.extent()[1]);
                    }
                    break;
                default:
                    pos = this.dataScale(d[0]) + (this.dataScale.rangeBand ? this.dataScale.rangeBand() / 2 : 0);
                    if (this.orientation() === "horizontal") {
                        return (pos >= this.xBrush.extent()[0] && pos <= this.xBrush.extent()[1]);
                    } else {
                        return (pos >= this.yBrush.extent()[0] && pos <= this.yBrush.extent()[1]);
                    }
            }
        }, this);
        this.selection(selected);
    }, 250);

    XYAxis.prototype.calcMargin = function (domNode, element) {
        var margin = { top: this.selectionMode() ? 8 : 0, right: this.selectionMode() ? 8 : 0, bottom: 50, left: 50 };
        var height = this.height() - margin.top - margin.bottom;

        var test = element.append("g");

        var svgXAxis = test.append("g")
            .attr("class", this.orientation() === "horizontal" ? "x axis" : "y axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.currAxis)
        ;
        var svgYAxis = test.append("g")
            .attr("class", this.orientation() === "horizontal" ? "y axis" : "x axis")
            .call(this.otherAxis)
        ;

        var x_bbox = svgXAxis.node().getBBox();
        var y_bbox = svgYAxis.node().getBBox();
        margin.bottom = x_bbox.height;
        margin.left = y_bbox.width;
        test.remove();
        return margin;
    };

    XYAxis.prototype.update = function (domNode, element) {
        var context = this;

        var isHorizontal = this.orientation() === "horizontal";
        this.dataAxis.orient(isHorizontal ? "bottom" : "left");
        this.valueAxis.orient(isHorizontal ? "left" : "bottom");
        this.currAxis = isHorizontal ? this.dataAxis : this.valueAxis;
        this.otherAxis = isHorizontal ? this.valueAxis : this.dataAxis;

        //  Update Domain  ---
        switch (this.xAxisType()) {
            case "timeseries":
                var dateMin = d3.min(this.data(), function (data) {
                    return data[0];
                });
                var dateMax = d3.max(this.data(), function (data) {
                    return data[0];
                });
                this.dataScale.domain([dateMin, dateMax]);
                break;
            default:
                this.dataScale.domain(this.data().map(function (d) { return d[0]; }));
                break;
        }
        var min = d3.min(this.data(), function (data) {
            return d3.min(data.filter(function (cell, i) { return i > 0 && context._columns[i] && context._columns[i].indexOf("__") !== 0; }), function (d) { return +d; });
        });
        var max = d3.max(this.data(), function (data) {
            return d3.max(data.filter(function (row, i) { return i > 0 && context._columns[i] && context._columns[i].indexOf("__") !== 0; }), function (d) { return +d; });
        });
        var newMin = min - (max - min) * this.valueAxisPadding() / 100;
        if (min >= 0 && newMin < 0 || min === max)
            newMin = 0;
        var newMax = max + (max - min) * this.valueAxisPadding() / 100;
        this.valueScale.domain([newMin, newMax]);

        //  Calculate Range  ---
        if (this.dataScale.rangeRoundBands) {
            this.dataScale.rangeRoundBands([0, this.width()], 0.1);
        } else if (this.dataScale.rangeRound) {
            this.dataScale.range([0, this.width()]);
        }
        this.valueScale.range([this.height(), 0]);
        var margin = this.calcMargin(domNode, element);
        this.margin = margin;

        //  Update Range  ---
        var width = this.width() - margin.left - margin.right,
            height = this.height() - margin.top - margin.bottom,
            maxExtent = isHorizontal ? width : height;

        if (this.dataScale.rangeRoundBands) {
            this.dataScale.rangeRoundBands([0, maxExtent], 0.1);
        } else if (this.dataScale.rangeRound) {
            this.dataScale.range([0, maxExtent]);
        }
        this.valueScale.range([isHorizontal ? height : 0, isHorizontal ? 0 : width]);

        //  Render  ---
        this.svg.transition()
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

        this.svgXAxis.transition()
            .attr("class", isHorizontal ? "x axis" : "y axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.currAxis)
        ;

        this.svgYAxis.transition()
            .attr("class", isHorizontal ? "y axis" : "x axis")
            .call(this.otherAxis)
        ;

        //  Brush  ---
        var currBrush = isHorizontal ? this.xBrush : this.yBrush;
        var otherBrush = isHorizontal ? this.yBrush : this.xBrush;

        if (this.selectionMode()) {
            if (!this._prevBrush) {
                currBrush.extent([0, maxExtent]);
            } else if (this._prevBrush && this._prevBrush.orientation !== this.orientation()) {
                var otherExtent = otherBrush.extent();
                currBrush.extent([otherExtent[0] * maxExtent / this._prevBrush.maxExtent, otherExtent[1] * maxExtent / this._prevBrush.maxExtent]);
            }
            this._prevBrush = {
                orientation: this.orientation(),
                maxExtent: maxExtent
            };
        }

        this.brush_g
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
            .style("display", this.selectionMode() ? null : "none")
            .call(currBrush)
            .selectAll(".background").transition()
                .attr("width", width)
                .attr("height", height)
        ;

        this.brush_g.selectAll(".extent, .resize rect").transition()
            .attr(isHorizontal ? "y" : "x", 0)
            .attr(isHorizontal ? "height" : "width", isHorizontal ? height : width)
        ;

        var handlePath = this.brush_g.selectAll(".resize").selectAll("path").data(function (d) { return d; });
        handlePath.enter().append("path");
        handlePath.transition()
            .attr("d", function (d) { return context.resizeBrushHandle(d, width, height); })
        ;

        this.updateChart(domNode, element, margin, width, height);
    };

    XYAxis.prototype.updateChart = function (domNode, element, margin, width, height) {
    };

    XYAxis.prototype.selection = function (selected) {
        console.log(selected);
    };

    return XYAxis;
}));
