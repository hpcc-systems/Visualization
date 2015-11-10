"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/Utility", "css!./XYAxis"], factory);
    } else {
        root.chart_XYAxis = factory(root.d3, root.common_SVGWidget, root.common_Utility);
    }
}(this, function (d3, SVGWidget, Utility) {
    function XYAxis(target) {
        SVGWidget.call(this);
        this._drawStartPos = "origin";

        this._dateParserData = d3.time.format("%Y-%m-%d").parse;
        this._dateParserValue = d3.time.format("%Y-%m-%d").parse;
    }
    XYAxis.prototype = Object.create(SVGWidget.prototype);
    XYAxis.prototype.constructor = XYAxis;
    XYAxis.prototype._class += " chart_XYAxis";

    XYAxis.prototype.publish("orientation", "horizontal", "set", "Selects orientation for the axis", ["horizontal", "vertical"]);
    XYAxis.prototype.publish("selectionMode", false, "boolean", "Range Selector");

    XYAxis.prototype.publish("xAxisTickCount", null, "number", "X-Axis Tick Count", null, { optional: true });
    XYAxis.prototype.publish("xAxisTickFormat", null, "string", "X-Axis Tick Format", null, { optional: true });
    XYAxis.prototype.publish("xAxisType", "ordinal", "set", "X-Axis Type", ["ordinal", "linear", "time"]);
    XYAxis.prototype.publish("xAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");
    XYAxis.prototype.publish("xAxisDomainLow", "", "string", "X-Axis Low");
    XYAxis.prototype.publish("xAxisDomainHigh", "", "string", "X-Axis High");
    XYAxis.prototype.publish("xAxisOverlapMode", "stagger", "set", "X-Axis Label Overlap Mode", ["none", "stagger", "hide", "rotate"]);
    XYAxis.prototype.publish("xAxisLabelRotation", null, "number", "X-Axis Label Rotation");

    XYAxis.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title");
    XYAxis.prototype.publish("yAxisTickCount", null, "number", "Y-Axis Tick Count", null, { optional: true });
    XYAxis.prototype.publish("yAxisTickFormat", null, "string", "Y-Axis Tick Format", null, { optional: true });
    XYAxis.prototype.publish("yAxisType", "linear", "set", "Y-Axis Type", ["none", "linear", "pow", "log", "time"]);
    XYAxis.prototype.publish("yAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");
    XYAxis.prototype.publish("yAxisTypePowExponent", 2, "number", "Exponent for Pow on Value Axis");
    XYAxis.prototype.publish("yAxisTypeLogBase", 10, "number", "Base for log on Value Axis");
    XYAxis.prototype.publish("yAxisDomainLow", "", "string", "Y-Axis Low");
    XYAxis.prototype.publish("yAxisDomainHigh", "", "string", "Y-Axis High");
    XYAxis.prototype.publish("yAxisDomainPadding", 5, "number", "Y-Axis Low/High Padding (if no low/high specified");

    XYAxis.prototype.publish("sortDates", false, "boolean", "Sort date field for timeseries data");
    XYAxis.prototype.publish("regions", [], "array", "Regions");

    XYAxis.prototype.publish("sampleData", "", "set", "Display Sample Data", ["", "ordinal", "ordinalRange", "linear", "time-x", "time-y"]);

    XYAxis.prototype.resetSelection = function () {
        this._prevBrush = null;
        return this;
    };

    var xAxisTypeTimePattern = XYAxis.prototype.xAxisTypeTimePattern;
    XYAxis.prototype.xAxisTypeTimePattern = function (_) {
        var retVal = xAxisTypeTimePattern.apply(this, arguments);
        if (arguments.length) {
            this._dateParserData = d3.time.format(_).parse;
        }
        return retVal;
    };

    var yAxisTypeTimePattern = XYAxis.prototype.yAxisTypeTimePattern;
    XYAxis.prototype.yAxisTypeTimePattern = function (_) {
        var retVal = yAxisTypeTimePattern.apply(this, arguments);
        if (arguments.length) {
            this._dateParserValue = d3.time.format(_).parse;
        }
        return retVal;
    };

    XYAxis.prototype.columns = function (_) {
        return SVGWidget.prototype.columns.apply(this, arguments);
    };

    XYAxis.prototype.formatData = function (d) {
        switch (this.xAxisType()) {
            case "time":
                return this._dateParserData(typeof d === "number" ? d.toString() : d);
            default:
                return d;
        }
    };

    XYAxis.prototype.formatValue = function (d) {
        if (!d) {
            return d;
        }
        if (d instanceof Array) {
            return d.map(function (item) {
                return this.formatValue(item);
            }, this);
        }
        switch (this.yAxisType()) {
            case "time":
                return this._dateParserValue(typeof d === "number" ? d.toString() : d);
            default:
                if (typeof d === "string") {
                    return +d;
                }
                return d;
        }
    };

    XYAxis.prototype.formattedData = function () {
        return this.data().map(function (row) {
            return row.map(function (cell, idx) {
                if (idx === 0) {
                    return this.formatData(cell);
                } if (idx >= this.columns().length) {
                    return cell;
                }
                return this.formatValue(cell);
            }, this);
        }, this);
    };

    XYAxis.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this.dataAxis = d3.svg.axis()
            .orient("bottom")
        ;

        this.valueAxis = d3.svg.axis()
            .orient("left")
        ;

        this.svg = element.append("g");
        this.svgRegions = element.append("g");
        this.svgData = this.svg.append("g");
        this.svgXAxis = this.svg.append("g");
        this.svgXAxisText = this.svgXAxis.append("text")
            .attr("y", -2)
            .style("text-anchor", "end")
        ;
        this.svgYAxis = this.svg.append("g");
        this.svgYAxisText = this.svgYAxis.append("text")
              .attr("transform", "rotate(-90)")
              .attr("x", -2)
              .attr("y", 2)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
        ;

        //  Brush  ---
        this.svgBrush = element.append("g")
            .attr("class", "brush")
        ;
        var context = this;
        this.xBrush = d3.svg.brush()
            .on("brush", function () {
                return context.brushMoved.apply(context, arguments);
            })
        ;
        this.yBrush = d3.svg.brush()
            .on("brush", function () {
                return context.brushMoved.apply(context, arguments);
            })
        ;
        this._selection = new SimpleSelection(this.svgData);
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
        var selected = this.formattedData().filter(function (d) {
            var pos;
            switch (this.xAxisType()) {
                case "ordinal":
                    pos = this.dataScale(d[0]) + (this.dataScale.rangeBand ? this.dataScale.rangeBand() / 2 : 0);
                    if (this.orientation() === "horizontal") {
                        return (pos >= this.xBrush.extent()[0] && pos <= this.xBrush.extent()[1]);
                    } else {
                        return (pos >= this.yBrush.extent()[0] && pos <= this.yBrush.extent()[1]);
                    }
                    break;
                default:
                    pos = d[0];
                    if (this.orientation() === "horizontal") {
                        return (pos >= this.xBrush.extent()[0] && pos <= this.xBrush.extent()[1]);
                    } else {
                        return (pos >= this.yBrush.extent()[0] && pos <= this.yBrush.extent()[1]);
                    }
                    break;
            }
        }, this);
        this.selection(selected);
    }, 250);

    XYAxis.prototype.dataPos = function (label) {
        var retVal = this.dataScale(this.formatData(label));
        if (this.xAxisType() === "ordinal") {
            retVal += this.dataScale.rangeBand() / 2;
        }
        return retVal;
    };

    XYAxis.prototype.valuePos = function (value) {
        return this.valueScale(this.formatValue(value));
    };

    XYAxis.prototype.setScaleRange = function (width, height) {
        if (this.currScale.rangeRoundBands) {
            this.currScale.rangeRoundBands([0, width], 0.1);
        } else if (this.currScale.rangeRound) {
            this.currScale.range([0, width]);
        }
        if (this.otherScale.rangeRoundBands) {
            this.otherScale.rangeRoundBands([height, 0], 0.1);
        } else if (this.otherScale.rangeRound) {
            this.otherScale.range([height, 0]);
        }
    };

    XYAxis.prototype.adjustXAxisText = function (xAxis, margin) {
        switch (this.xAxisOverlapMode()) {
            case "stagger":
                xAxis.selectAll(".tick > text")
                    .style("text-anchor", "middle")
                    .attr("dy", function (d, i) { return 0.71 + (i % margin.overlapModulus) + "em"; })
                    .attr("dx", 0)
                    .attr("visibility", null)
                    .attr("transform", "rotate(0)")
                ;
                break;
            case "hide":
                xAxis.selectAll(".tick > text")
                    .style("text-anchor", "middle")
                    .attr("dy", "0.71em")
                    .attr("dx", 0)
                    .attr("visibility", function (d, i) { return i % margin.overlapModulus ? "hidden" : null; })
                    .attr("transform", "rotate(0)")
                ;
                break;
            case "rotate":
                var deg = -(this.xAxisLabelRotation()) || 0;
                if (deg !== 0 && margin.overlapModulus > 1) {
                    xAxis.selectAll(".tick > text")
                        .each(function () {
                            var elm = d3.select(this);
                            var bbox = elm.node().getBBox();
                            var dyOff = Math.sin(Math.PI * (-Math.abs(deg) / 180));
                            elm
                                .style("text-anchor", deg > 0 ? "start" : "end")
                                .attr("dy", (bbox.height / 2 * dyOff) + "px")
                                .attr("dx", deg > 0 ? "0.71em" : "-0.71em") // .attr("dx", deg > 0 ? Math.abs(dyOff) + "em" : dyOff + "em")
                                .attr("transform", "rotate(" + deg + ")")
                                .attr("visibility", null)
                            ;
                        })
                    ;
                    break;
                }
                /* falls through */
            default:
                xAxis.selectAll(".tick > text")
                    .style("text-anchor", "middle")
                    .attr("dy", "0.71em")
                    .attr("dx", 0)
                    .attr("visibility", null)
                    .attr("transform", "rotate(0)")
                ;
        }
    };

    XYAxis.prototype.calcMargin = function (domNode, element, isHorizontal) {
        var margin = { top: this.selectionMode() ? 10 : 2, right: this.selectionMode() ? 10 : 2, bottom: this.selectionMode() ? 10 : 2, left: this.selectionMode() ? 10 : 2, overlapModulus: 1 };
        var height = this.height() - margin.top - margin.bottom;

        var test = element.append("g");

        this.setScaleRange(this.width(), this.height());
        if (this.yAxisType() !== "none") {
            var svgYAxis = test.append("g")
                .attr("class", isHorizontal ? "y axis" : "x axis")
                .call(this.otherAxis)
            ;

            var y_bbox = svgYAxis.node().getBBox();
            margin.left = y_bbox.width;
            margin.top -= y_bbox.y;
        }
        var width = this.width() - margin.left - margin.right;
        this.setScaleRange(width, this.height());

        var svgXAxis = test.append("g")
            .attr("class", isHorizontal ? "x axis" : "y axis")
            .attr("transform", "translate(" + margin.left + "," + height / 2 + ")")
            .call(this.currAxis)
        ;

        switch (this.xAxisOverlapMode()) {
            case "rotate":
            case "stagger":
            case "hide":
                var bboxArr = [];
                svgXAxis.selectAll(".tick > text").each(function (d) {
                    var bbox = this.getBoundingClientRect();
                    for (var i = bboxArr.length - 1; i >= 0; --i) {
                        if (bboxArr[i].right < bbox.left) {
                            break;
                        }
                        if (bboxArr.length + 1 - i > margin.overlapModulus) {
                            margin.overlapModulus = bboxArr.length + 1 - i;
                        }
                    }
                    bboxArr.push(bbox);
                });
                break;
        }
        this.adjustXAxisText(svgXAxis, margin);
        var x_bbox = svgXAxis.node().getBBox();
        margin.right -= width - (x_bbox.x + x_bbox.width);
        margin.bottom = x_bbox.height;
        this.setScaleRange(this.width() - margin.left - margin.right, this.height() - margin.top - margin.bottom);

        test.remove();
        return margin;
    };

    XYAxis.prototype.updateRegions = function (domNode, element, isHorizontal) {
        var context = this;

        var regions = this.svgRegions.selectAll(".region").data(this.regions());
        regions.enter().append("rect")
            .attr("class", "region")
        ;
        if (isHorizontal) {
            regions
                .attr("x", function (d) { return context.dataPos(d.x0); })
                .attr("y", 0)
                .attr("width", function (d) { return context.dataPos(d.x1) - context.dataPos(d.x0); })
                .attr("height", this.height())
                .style("stroke", function (d) { return context._palette(d.colorID); })
                .style("fill", function (d) { return d3.hsl(context._palette(d.colorID)).brighter(); })
            ;
        } else {
            regions
                .attr("x", 0)
                .attr("y", function (d) { return context.dataPos(d.x0); })
                .attr("width", this.width())
                .attr("height", function (d) { return context.dataPos(d.x0) - context.dataPos(d.x1); })
                .style("stroke", function (d) { return context._palette(d.colorID); })
                .style("fill", function (d) { return d3.hsl(context._palette(d.colorID)).brighter(); })
            ;
        }
        regions.exit().remove();
    };

    XYAxis.prototype.update = function (domNode, element) {
        var context = this;

        var isHorizontal = this.orientation() === "horizontal";
        this.updateRegions(domNode, element, isHorizontal);

        switch (this.xAxisType()) {
            case "linear":
                this.dataScale = d3.scale.linear();
                this.dataFormatter = d3.format(this.xAxisTickFormat());
                break;
            case "time":
                this.dataScale = d3.time.scale();
                this.dataFormatter = this.xAxisTickFormat() ? d3.time.format(this.xAxisTickFormat()) : null;

                if (this.sortDates()) {
                    this.data(Utility.naturalSort(this.data(), "ascending", 0));
                }
                break;
            case "ordinal":
                /* falls through */
            default:
                this.dataScale = d3.scale.ordinal();
                this.dataFormatter = null;
                break;
        }
        this.dataAxis
            .scale(this.dataScale)
            .ticks(this.xAxisTickCount())
            .tickFormat(this.dataFormatter)
        ;

        switch (this.yAxisType()) {
            case "pow":
                this.valueScale = d3.scale.pow()
                    .exponent(this.yAxisTypePowExponent())
                ;
                this.valueFormatter = d3.format(this.yAxisTickFormat());
                break;
            case "log":
                this.valueScale = d3.scale.log()
                    .base(this.yAxisTypeLogBase())
                ;
                this.valueFormatter = d3.format(this.yAxisTickFormat());
                break;
            case "time":
                this.valueScale = d3.time.scale();
                this.valueFormatter = this.yAxisTickFormat() ? d3.time.format(this.yAxisTickFormat()) : null;
                break;
            case "linear":
                /* falls through */
            default:
                this.valueScale = d3.scale.linear();
                this.valueFormatter = d3.format(this.yAxisTickFormat());
                break;
        }
        this.valueAxis
            .scale(this.valueScale)
            .ticks(this.yAxisTickCount())
            .tickFormat(this.valueFormatter)
        ;

        this.dataAxis.orient(isHorizontal ? "bottom" : "left");
        this.valueAxis.orient(isHorizontal ? "left" : "bottom");
        this.currAxis = isHorizontal ? this.dataAxis : this.valueAxis;
        this.otherAxis = isHorizontal ? this.valueAxis : this.dataAxis;
        this.currScale = isHorizontal ? this.dataScale : this.valueScale;
        this.otherScale = isHorizontal ? this.valueScale : this.dataScale;
        var currBrush = isHorizontal ? this.xBrush : this.yBrush;
        var otherBrush = isHorizontal ? this.yBrush : this.xBrush;
        var otherBrushExtent = otherBrush.extent();

        //  Update Domain  ---
        switch (this.xAxisType()) {
            case "ordinal":
                this.dataScale.domain(this.data().map(function (d) { return d[0]; }));
                break;
            default:
                var domainMin = this.xAxisDomainLow() ? this.formatData(this.xAxisDomainLow()) : d3.min(this.formattedData(), function (data) {
                    return data[0];
                });
                var domainMax = this.xAxisDomainHigh() ? this.formatData(this.xAxisDomainHigh()) : d3.max(this.formattedData(), function (data) {
                    return data[0];
                });
                this.dataScale.domain([domainMin, domainMax]);
                break;
        }

        var min = this.yAxisDomainLow() ? this.formatValue(this.yAxisDomainLow()) : d3.min(this.formattedData(), function (data) {
            return d3.min(data.filter(function (cell, i) { return i > 0 && context.columns()[i] && context.columns()[i].indexOf("__") !== 0 && cell !== null; }), function (d) { return d instanceof Array ? d[0] : d; });
        });
        var max = this.yAxisDomainHigh() ? this.formatValue(this.yAxisDomainHigh()) : d3.max(this.formattedData(), function (data) {
            return d3.max(data.filter(function (cell, i) { return i > 0 && context.columns()[i] && context.columns()[i].indexOf("__") !== 0 && cell !== null; }), function (d) { return d instanceof Array ? d[1] : d; });
        });
        switch (this.yAxisType()) {
            case "time":
                break;
            default:
                if (this.yAxisDomainLow() === "" && this.yAxisDomainHigh() === "") {
                    var valuePadding = (max - min) * this.yAxisDomainPadding() / 100;
                    var newMin = min - valuePadding;
                    if (min >= 0 && newMin < 0 || min === max)
                        newMin = 0;
                    min = newMin;
                    max = max + valuePadding;
                }
                break;
        }
        this.valueScale.domain([min, max]);

        //  Calculate Margins  ---
        this.margin = this.calcMargin(domNode, element, isHorizontal);

        //  Update Range  ---
        var width = this.width() - this.margin.left - this.margin.right,
            height = this.height() - this.margin.top - this.margin.bottom,
            maxCurrExtent = isHorizontal ? width : height,
            maxOtherExtent = isHorizontal ? height : width;

        //  Render  ---
        this.svg.transition()
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        ;

        this.svgXAxis.transition()
            .attr("class", isHorizontal ? "x axis" : "y axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.currAxis)
        ;

        this.svgXAxisText
            .attr("x", width - 2)
            .text(isHorizontal ? this.columns()[0] : this.yAxisTitle())
        ;

        this.svgYAxis.transition()
            .style("visibility", this.yAxisType() === "none" ? "hidden" : null)
            .attr("class", isHorizontal ? "y axis" : "x axis")
            .call(this.otherAxis)
            .each(function () {
                context.adjustXAxisText(context.svgXAxis, context.margin);
            })
        ;
        this.svgYAxisText.text(!isHorizontal ? this.columns()[0] : this.yAxisTitle());

        this.xBrush
            .x(this.dataScale)
        ;
        this.yBrush
            .y(this.dataScale)
        ;
        if (this.selectionMode()) {
            if (this._prevXAxisType !== this.xAxisType()) {
                this._prevXAxisType = this.xAxisType();
                this._prevBrush = null;
            }
            if (!this._prevBrush) {
                switch (this.xAxisType()) {
                    case "ordinal":
                        currBrush.extent([0, maxCurrExtent]);
                        break;
                    default:
                        currBrush.extent(this.dataScale.domain());
                        break;
                }
            } else if (this._prevBrush && this._prevBrush.orientation !== this.orientation()) {
                switch (this.xAxisType()) {
                    case "ordinal":
                        currBrush.extent([maxCurrExtent - otherBrushExtent[0] * maxCurrExtent / this._prevBrush.maxCurrExtent, maxCurrExtent - otherBrushExtent[1] * maxCurrExtent / this._prevBrush.maxCurrExtent]);
                        break;
                    default:
                        currBrush.extent(otherBrushExtent);
                        break;
                }
            }
            this._prevBrush = {
                orientation: this.orientation(),
                maxCurrExtent: maxCurrExtent
            };
        }

        this.svgBrush
            .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")")
            .style("display", this.selectionMode() ? null : "none")
            .call(currBrush)
            .selectAll(".background").transition()
                .attr("width", width)
                .attr("height", height)
        ;

        this.svgBrush.selectAll(".extent, .resize rect").transition()
            .attr(isHorizontal ? "y" : "x", 0)
            .attr(isHorizontal ? "height" : "width", maxOtherExtent)
        ;

        var handlePath = this.svgBrush.selectAll(".resize").selectAll("path").data(function (d) { return d; });
        handlePath.enter().append("path");
        handlePath.transition()
            .attr("d", function (d) { return context.resizeBrushHandle(d, width, height); })
        ;

        this.updateChart(domNode, element, this.margin, width, height, isHorizontal);
    };

    XYAxis.prototype.updateChart = function (domNode, element, margin, width, height, isHorizontal) {
    };

    XYAxis.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
        delete this._selection;
    };

    XYAxis.prototype.selection = function (selected) {
        console.log(selected);
    };


    //  Selection Bag(s)  ---
    function SelectionBag() {
        this.items = {};
    }

    SelectionBag.prototype.clear = function () {
        for (var key in this.items) {
            this.items[key].element().classed("selected", false);
        }
        this.items = {};
    };

    SelectionBag.prototype.isEmpty = function () {
        for (var key in this.items) { // jshint ignore:line
            return false;
        }
        return true;
    };

    SelectionBag.prototype.append = function (item) {
        this.items[item._id] = item;
        item.element().classed("selected", true);
    };

    SelectionBag.prototype.remove = function (item) {
        this.items[item._id].element().classed("selected", false);
        delete this.items[item._id];
    };

    SelectionBag.prototype.isSelected = function (item) {
        return this.items[item._id] !== undefined;
    };

    SelectionBag.prototype.get = function () {
        var retVal = [];
        for (var key in this.items) {
            retVal.push(this.items[key]);
        }
        return retVal;
    };

    SelectionBag.prototype.set = function (itemArray) {
        this.clear();
        itemArray.forEach(function (item, idx) {
            this.append(item);
        }, this);
    };

    SelectionBag.prototype.click = function (item, d3Event) {
        if (d3Event.ctrlKey) {
            if (this.items[item._id]) {
                this.remove(item);
            } else {
                this.append(item);
            }
        } else {
            this.clear();
            this.append(item);
        }
    };

    function SimpleSelection(widgetElement) {
        this._widgetElement = widgetElement;
    }
    SimpleSelection.prototype.enter = function (elements, idx) {
        var context = this;
        elements
            .on("click.SimpleSelection", function (d, idx) {
                var element = d3.select(this);
                var wasSelected = element.classed("selected");
                context._widgetElement.selectAll(".selected")
                    .classed("selected", null)
                ;
                if (!wasSelected) {
                    element.classed("selected", true);
                }
            })
            .on("mouseover.SimpleSelection", function (d, idx) {
                d3.select(this)
                    .classed("over", true)
                ;
            })
            .on("mouseout.SimpleSelection", function (d, idx) {
                d3.select(this)
                    .classed("over", null)
                ;
            })
        ;
    };
    SimpleSelection.prototype.selected = function (domNode) {
        return d3.select(domNode).classed("selected");
    };

    return XYAxis;
}));
