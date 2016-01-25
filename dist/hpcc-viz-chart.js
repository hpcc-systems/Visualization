if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/XYAxis.js',["d3", "../common/SVGWidget", "../common/Utility", "css!./XYAxis"], factory);
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
        this._selection = new Utility.SimpleSelection(this.svgData);
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
                if (domainMin !== undefined && domainMax !== undefined) {
                    this.dataScale.domain([domainMin, domainMax]);
                }
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

    return XYAxis;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Scatter.js',["d3", "../common/SVGWidget", "./XYAxis", "../api/INDChart", "../api/ITooltip", "css!./Scatter"], factory);
    } else {
        root.chart_Scatter = factory(root.d3, root.common_SVGWidget, root.chart_XYAxis, root.api_INDChart, root.api_ITooltip);
    }
}(this, function (d3, SVGWidget, XYAxis, INDChart, ITooltip) {
    function Scatter(target) {
        XYAxis.call(this);
        INDChart.call(this);
        ITooltip.call(this);
    }
    Scatter.prototype = Object.create(XYAxis.prototype);
    Scatter.prototype.constructor = Scatter;
    Scatter.prototype._class += " chart_Scatter";
    Scatter.prototype.implements(INDChart.prototype);
    Scatter.prototype.implements(ITooltip.prototype);

    Scatter.prototype.publish("paletteID", "default", "set", "Palette ID", Scatter.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Scatter.prototype.publish("pointShape", "cross", "set", "Shape of the data points", ["circle", "rectangle", "cross"]);
    Scatter.prototype.publish("pointSize", 6, "number", "Point Size");
    Scatter.prototype.publish("interpolate", "", "set", "Interpolate Data", ["", "linear", "step", "step-before", "step-after", "basis", "bundle", "cardinal", "monotone"]);
    Scatter.prototype.publish("interpolateFill", false, "boolean", "Fill Interpolation");
    Scatter.prototype.publish("interpolateFillOpacity", 0.66, "number", "Fill Interpolation Opacity");
    Scatter.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    Scatter.prototype.xPos = function (d) {
        return this.orientation() === "horizontal" ? this.dataPos(d.label) : this.valuePos(d.value);
    };

    Scatter.prototype.yPos = function (d) {
        return this.orientation() === "horizontal" ? this.valuePos(d.value) : this.dataPos(d.label);
    };

    Scatter.prototype.updateChart = function (domNode, element, margin, width, height, isHorizontal) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        if (this._prevPointShape !== this.pointShape()) {
            this.svgData.selectAll(".data").remove();
            this._prevPointShape = this.pointShape();
        }

        function mapShape(shape) {
            switch (shape) {
                case "rectangle":
                    return "rect";
                case "circle":
                    return "circle";
                case "cross":
                    return "path";
            }
        }

        var data = this.flattenData().map(function (d) {
            d.shape = mapShape(context.pointShape());
            return d;
        });

        var points = this.svgData.selectAll(".point").data(data, function (d, idx) { return d.shape + "_" + idx; });
        points.enter().append("g")
            .attr("class", "point")
            .each(function (d) {
                var element = d3.select(this);
                element
                    .append("circle")
                    .attr("class", "pointSelection")
                    .on("mouseover.tooltip", function (d) {
                        context.tooltipShow(context.data()[d.rowIdx], context.columns(), d.colIdx);
                    })
                    .on("mouseout.tooltip", function (d) {
                        context.tooltipShow();
                    })
                    .on("mousemove.tooltip", function (d) {
                        context.tooltipShow(context.data()[d.rowIdx], context.columns(), d.colIdx);
                    })
                    .call(context._selection.enter.bind(context._selection))
                    .on("click", function (d, idx) {
                        context.click(context.rowToObj(context.data()[d.rowIdx]), context.columns()[d.colIdx], context._selection.selected(this));
                    })
                ;
                element
                    .append(d.shape)
                    .attr("class", "pointShape")
                ;
            })
        ;
        points
            .each(function (d) {
                var elementSelection = d3.select(this).select(".pointSelection");
                elementSelection
                    .attr("cx", function (d) { return context.xPos(d); })
                    .attr("cy", function (d) { return context.yPos(d); })
                    .attr("r", context.pointSize())
                ;

                var element = d3.select(this).select(".pointShape");
                switch (d.shape) {
                    case "rect":
                        element
                            .attr("x", function (d) { return context.xPos(d) - context.pointSize() / 2; })
                            .attr("y", function (d) { return context.yPos(d) - context.pointSize() / 2; })
                            .attr("width", context.pointSize())
                            .attr("height", context.pointSize())
                            .style("fill", function (d, idx) { return context._palette(context.columns()[d.colIdx]); })
                        ;
                        break;
                    case "circle":
                        element
                            .attr("cx", function (d) { return context.xPos(d); })
                            .attr("cy", function (d) { return context.yPos(d); })
                            .attr("r", context.pointSize() / 2)
                            .style("fill", function (d, idx) { return context._palette(context.columns()[d.colIdx]); })
                        ;
                        break;
                    case "path":
                        element
                            .attr("d", function (d) {
                                return "M" + (context.xPos(d) - context.pointSize() / 2) + " " + (context.yPos(d) - context.pointSize() / 2) + " " +
                                    "L" + (context.xPos(d) + context.pointSize() / 2) + " " + (context.yPos(d) + context.pointSize() / 2) + " " +
                                    "M" + (context.xPos(d) - context.pointSize() / 2) + " " + (context.yPos(d) + context.pointSize() / 2) + " " +
                                    "L" + (context.xPos(d) + context.pointSize() / 2) + " " + (context.yPos(d) - context.pointSize() / 2);
                                })
                            .style("stroke", function (d, idx) { return context._palette(context.columns()[d.colIdx]); })
                        ;
                        break;
                }
            })
        ;
        points.exit()
            .remove()
        ;

        var areas = this.svgData.selectAll(".area").data(this.columns().filter(function (d, idx) { return context.interpolate() && context.interpolateFill() && idx > 0; }));
        areas.enter().append("path")
            .attr("class", "area")
        ;
        var area = d3.svg.area()
            .interpolate(this.interpolate())
        ;
        if (isHorizontal) {
            area
                .x(function (d) { return context.xPos(d); })
                .y0(function (d) { return height; })
                .y1(function (d) { return context.yPos(d); })
            ;
        } else {
            area
                .y(function (d) { return context.yPos(d); })
                .x0(function (d) { return 0; })
                .x1(function (d) { return context.xPos(d); })
            ;
        }
        areas.each(function (d, idx) {
            var element = d3.select(this);
            element
                .attr("d", area(data.filter(function (d2) { return d2.colIdx === idx + 1; })))
                .style("opacity", context.interpolateFillOpacity())
                .style("stroke", "none")
                .style("fill", function (d, i) { return d3.hsl(context._palette(context.columns()[idx + 1])).brighter(); })
            ;
        });
        areas.exit().remove();

        var lines = this.svgData.selectAll(".line").data(this.columns().filter(function (d, idx) { return context.interpolate() && idx > 0; }));
        lines.enter().append("path")
            .attr("class", "line")
        ;
        var line = d3.svg.line()
            .x(function (d) { return context.xPos(d); })
            .y(function (d) { return context.yPos(d); })
            .interpolate(this.interpolate())
        ;
        lines.each(function (d, idx) {
            var element = d3.select(this);
            var data2 = data.filter(function (d2) { return d2.colIdx === idx + 1; });
            element
                .attr("d", line(data2))
                .style("stroke", function (d, i) { return context._palette(context.columns()[idx + 1]); })
                .style("fill", "none")
            ;
        });
        lines.exit().remove();
    };

    Scatter.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return Scatter;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Area.js',["d3", "./Scatter"], factory);
    } else {
        root.chart_Area = factory(root.d3, root.chart_Scatter);
    }
}(this, function (d3, Scatter) {
    function Area(target) {
        Scatter.call(this);

        this.interpolate("linear");
        this.interpolateFill(true);
    }
    Area.prototype = Object.create(Scatter.prototype);
    Area.prototype.constructor = Area;
    Area.prototype._class += " chart_Area";

    return Area;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Column.js',["d3", "./XYAxis", "../api/INDChart", "../api/ITooltip", "css!./Column"], factory);
    } else {
        root.chart_Column = factory(root.d3, root.chart_XYAxis, root.api_INDChart, root.api_ITooltip);
    }
}(this, function (d3, XYAxis, INDChart, ITooltip) {
    function Column(target) {
        XYAxis.call(this);
        INDChart.call(this);
        ITooltip.call(this);

        this._linearGap = 25;
    }
    Column.prototype = Object.create(XYAxis.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " chart_Column";
    Column.prototype.implements(INDChart.prototype);
    Column.prototype.implements(ITooltip.prototype);

    Column.prototype.publish("paletteID", "default", "set", "Palette ID", Column.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Column.prototype.publish("stacked", false, "boolean", "Stacked Bars", null, { tags: ["Basic"] });
    Column.prototype.publish("stackedOpacity", 0.66, "number", "Fill Stacked Opacity", null, { tags: ["Basic"] });
    Column.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    Column.prototype.updateChart = function (domNode, element, margin, width, height, isHorizontal) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        var dataLen = 10;
        var offset = 0;
        switch (this.xAxisType()) {
            case "ordinal":
                dataLen = this.dataScale.rangeBand();
                offset = 0;
                break;
            case "linear":
            case "time":
                dataLen = Math.max(Math.abs(this.dataScale(2) - this.dataScale(1)) * (100 - this._linearGap) / 100, dataLen);
                offset = -dataLen/2;
                break;
        }

        var columnScale = d3.scale.ordinal()
            .domain(context.columns().filter(function (d, idx) { return idx > 0; }))
            .rangeRoundBands(isHorizontal ? [0, dataLen] : [dataLen, 0])
        ;

        var column = this.svgData.selectAll(".dataRow")
            .data(this.formattedData())
        ;

        column.enter().append("g")
            .attr("class", "dataRow")
        ;

        column
            .each(function (dataRow, i) {
                var element = d3.select(this);

                var columnRect = element.selectAll("rect").data(dataRow.filter(function (d, i) { return i < context.columns().length; }).map(function (d, i) {
                    return {
                        column: context.columns()[i],
                        row: dataRow,
                        value: d,
                        idx: i
                    };
                }).filter(function (d, i) { return d.value !== null && d.idx > 0; }));

                columnRect
                  .enter().append("rect")
                    .attr("class", "columnRect")
                    .call(context._selection.enter.bind(context._selection))
                    .on("mouseover.tooltip", function (d) {
                        context.tooltipShow(d.row, context.columns(), d.idx);
                    })
                    .on("mouseout.tooltip", function (d) {
                        context.tooltipShow();
                    })
                    .on("mousemove.tooltip", function (d) {
                        context.tooltipShow(d.row, context.columns(), d.idx);
                    })
                    .on("click", function (d, idx) {
                        context.click(context.rowToObj(d.row), d.column, context._selection.selected(this));
                    })
                ;

                if (isHorizontal) {
                    columnRect.transition()
                        .attr("x", function (d) { return context.dataScale(dataRow[0]) + (context.stacked() ? 0 : columnScale(d.column)) + offset; })
                        .attr("width", context.stacked() ? dataLen : columnScale.rangeBand())
                        .attr("y", function (d) { return d.value instanceof Array ? context.valueScale(d.value[1]) : context.valueScale(d.value); })
                        .attr("height", function (d) { return d.value instanceof Array ? context.valueScale(d.value[0]) - context.valueScale(d.value[1]) : height - context.valueScale(d.value); })
                        .style("opacity", context.stacked() ? context.stackedOpacity() : 1)
                        .style("fill", function (d) { return context._palette(d.column); })
                    ;
                } else {
                    columnRect.transition()
                        .attr("y", function (d) { return context.dataScale(dataRow[0]) + (context.stacked() ? 0 : columnScale(d.column)) + offset; })
                        .attr("height", context.stacked() ? dataLen : columnScale.rangeBand())
                        .attr("x", function (d) { return d.value instanceof Array ? context.valueScale(d.value[0]) : 0; })
                        .attr("width", function (d) { return d.value instanceof Array ? context.valueScale(d.value[1]) - context.valueScale(d.value[0]) : context.valueScale(d.value); })
                        .style("opacity", context.stacked() ? context.stackedOpacity() : 1)
                        .style("fill", function (d) { return context._palette(d.column); })
                    ;
                }

                if (context.stacked()) {
                    columnRect.sort(function (l, r) {
                        return r - l;
                    });
                }

                columnRect.exit().transition()
                    .remove()
                ;
        });

        column.exit().transition()
            .remove()
        ;
    };

    return Column;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Bar',["./Column"], factory);
    } else {
        root.chart_Bar = factory(root.chart_Column);
    }
}(this, function (Column) {
    function Bar(target) {
        Column.call(this);

        this.orientation("vertical");
    }
    Bar.prototype = Object.create(Column.prototype);
    Bar.prototype.constructor = Bar;
    Bar.prototype._class += " chart_Bar";

    return Bar;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Bubble.js',["d3", "../common/SVGWidget", "../api/I2DChart", "../common/Text", "../common/FAChar", "../common/Utility", "../api/ITooltip", "css!./Bubble"], factory);
    } else {
        root.chart_Bubble = factory(root.d3, root.common_SVGWidget, root.api_I2DChart, root.common_Text, root.common_FAChar, root.common_Utility, root.api_ITooltip);
    }
}(this, function (d3, SVGWidget, I2DChart, Text, FAChar, Utility, ITooltip) {
    function Bubble(target) {
        SVGWidget.call(this);
        I2DChart.call(this);
        ITooltip.call(this);
        this._drawStartPos = "origin";

        this.labelWidgets = {};

        this.d3Pack = d3.layout.pack()
            .sort(function (a, b) { return a < b ? -1 : a > b ? 1 : 0; })
            .size([this.width(), this.height()])
            .value(function (d) { return d[1]; })
        ;
    }
    Bubble.prototype = Object.create(SVGWidget.prototype);
    Bubble.prototype.constructor = Bubble;
    Bubble.prototype._class += " chart_Bubble";
    Bubble.prototype.implements(I2DChart.prototype);
    Bubble.prototype.implements(ITooltip.prototype);

    Bubble.prototype.publish("paletteID", "default", "set", "Palette ID", Bubble.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Bubble.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    Bubble.prototype.size = function (_) {
        var retVal = SVGWidget.prototype.size.apply(this, arguments);
        if (arguments.length) {
            this.d3Pack
                .size([this.width(), this.height()])
            ;
        }
        return retVal;
    };

    Bubble.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._selection = new Utility.SimpleSelection(element);
    };

    Bubble.prototype.update = function (domNode, element) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        var node = element.selectAll(".node")
            .data(this.data().length ? this.d3Pack.nodes({ children: this.cloneData() }).filter(function (d) { return !d.children; }) : [], function (d) { return d[0]; })
        ;

        //  Enter  ---
        node.enter().append("g")
            .attr("class", "node")
            .attr("opacity", 0)
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d), context.columns()[1], context._selection.selected(this));
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("circle")
                    .attr("r", function (d) { return d.r; })
                    .on("mouseover.tooltip", function (d) {
                        context.tooltipShow(d, context.columns(), 1);
                    })
                    .on("mouseout.tooltip", function (d) {
                        context.tooltipShow();
                    })
                    .on("mousemove.tooltip", function (d) {
                        context.tooltipShow(d, context.columns(), 1);
                    })
                ;
                if (d.__viz_faChar) {
                    context.labelWidgets[d[0]] = new FAChar()
                        .char(d.__viz_faChar)
                        .target(this)
                        .render()
                    ;
                } else {
                    context.labelWidgets[d[0]] = new Text()
                        .text(d[0])
                        .target(this)
                        .render()
                    ;
                }
            })
        ;

        //  Update  ---
        node.transition()
            .attr("opacity", 1)
            .each(function (d) {
                var element = d3.select(this);
                var pos = { x: d.x, y: d.y };
                element.select("circle").transition()
                    .attr("transform", function (d) { return "translate(" + pos.x + "," + pos.y + ")"; })
                    .style("fill", function (d) { return context._palette(d[0]); })
                    .attr("r", function (d) { return d.r; })
                    .select("title")
                        .text(function (d) { return d[0] + " (" + d[1] + ")"; })
                ;
                if (d.__viz_faChar) {
                    context.labelWidgets[d[0]]
                        .pos(pos)
                        .render()
                    ;
                } else {
                    var label = d[0];
                    var labelWidth = context.labelWidgets[d[0]].getBBox().width;
                    if (d.r * 2 < 16) {
                        label = "";
                    } else if (d.r * 2 < labelWidth) {
                        label = label[0] + "...";
                    }
                    context.labelWidgets[d[0]]
                        .pos(pos)
                        .text(label)
                        .render()
                    ;
                }
            })
        ;

        //  Exit  ---
        node.exit().transition()
            .style("opacity", 0)
            .remove()
        ;
    };

    Bubble.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        delete this._selection;
    };

    return Bubble;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Gantt.js',["./Bar"], factory);
    } else {
        root.chart_Gantt = factory(root.chart_Bar);
    }
}(this, function (Bar) {
    function Gantt(target) {
        Bar.call(this);

        this.orientation("vertical");
        this.xAxisType("ordinal");
        this.yAxisType("time");
    }
    Gantt.prototype = Object.create(Bar.prototype);
    Gantt.prototype.constructor = Gantt;
    Gantt.prototype._class += " chart_Gantt";

    return Gantt;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Line.js',["d3", "./Scatter", "css!./Line"], factory);
    } else {
        root.chart_Line = factory(root.d3, root.chart_Scatter);
    }
}(this, function (d3, Scatter) {
    function Line(target) {
        Scatter.call(this);

        this.interpolate("linear");
    }
    Line.prototype = Object.create(Scatter.prototype);
    Line.prototype.constructor = Line;
    Line.prototype._class += " chart_Line";

    return Line;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/MultiChart',["d3", "../common/SVGWidget", "../common/Utility", "../api/INDChart"], factory);
    } else {
        root.chart_MultiChart = factory(root.d3, root.common_SVGWidget, root.common_Utility, root.api_INDChart);
    }
}(this, function (d3, SVGWidget, Utility, INDChart) {
    function MultiChart() {
        SVGWidget.call(this);
        INDChart.call(this);

        this._allCharts = {};
        this._allChartTypes.forEach(function (item) {
            var newItem = JSON.parse(JSON.stringify(item));
            newItem.widget = null;
            this._allCharts[item.id] = newItem;
            this._allCharts[item.display] = newItem;
            this._allCharts[item.widgetClass] = newItem;
        }, this);
    }
    MultiChart.prototype = Object.create(SVGWidget.prototype);
    MultiChart.prototype.constructor = MultiChart;
    MultiChart.prototype._class += " chart_MultiChart";
    MultiChart.prototype.implements(INDChart.prototype);

    MultiChart.prototype._1DChartTypes = [
        { id: "SUMMARY", display: "Summary", widgetClass: "chart_Summary" },
        { id: "C3_GAUGE", display: "Gauge (C3)", widgetClass: "c3chart_Gauge" }
    ].map(function(item) { item.family = "1D"; return item;});
    MultiChart.prototype._2DChartTypes = [
        { id: "BUBBLE", display: "Bubble", widgetClass: "chart_Bubble" },
        { id: "PIE", display: "Pie", widgetClass: "chart_Pie" },
        { id: "GOOGLE_PIE", display: "Pie (Google)", widgetClass: "google_Pie" },
        { id: "C3_DONUT", display: "Donut (C3)", widgetClass: "c3chart_Donut" },
        { id: "C3_PIE", display: "Pie (C3)", widgetClass: "c3chart_Pie" },
        { id: "AM_FUNNEL", display: "Area (amCharts)", widgetClass: "amchart_Funnel" },
        { id: "AM_PIE", display: "Pie (amCharts)", widgetClass: "amchart_Pie" },
        { id: "AM_PYRAMID", display: "Area (amCharts)", widgetClass: "amchart_Pyramid" },
        { id: "WORD_CLOUD", display: "Word Cloud", widgetClass: "other_WordCloud" }
    ].map(function(item) { item.family = "2D"; return item;});
    MultiChart.prototype._NDChartTypes = [
        { id: "COLUMN", display: "Column", widgetClass: "chart_Column" },
        { id: "BAR", display: "Bar", widgetClass: "chart_Bar" },
        { id: "LINE", display: "Line", widgetClass: "chart_Line" },
        { id: "AREA", display: "Area", widgetClass: "chart_Area" },
        { id: "STEP", display: "Step", widgetClass: "chart_Step" },
        { id: "SCATTER", display: "Scatter", widgetClass: "chart_Scatter" },
        { id: "GOOGLE_BAR", display: "Bar (Google)", widgetClass: "google_Bar" },
        { id: "GOOGLE_COLUMN", display: "Column (Google)", widgetClass: "google_Column" },
        { id: "GOOGLE_LINE", display: "Line (Google)", widgetClass: "google_Line" },
        { id: "GOOGLE_SCATTER", display: "Scatter (Google)", widgetClass: "google_Scatter" },
        { id: "GOOGLE_COMBO", display: "Combo (Google)", widgetClass: "google_Combo" },
        { id: "C3_AREA", display: "Area (C3)", widgetClass: "c3chart_Area" },
        { id: "C3_BAR", display: "Bar (C3)", widgetClass: "c3chart_Bar" },
        { id: "C3_COLUMN", display: "Column (C3)", widgetClass: "c3chart_Column" },
        { id: "C3_LINE", display: "Line (C3)", widgetClass: "c3chart_Line" },
        { id: "C3_SCATTER", display: "Scatter (C3)", widgetClass: "c3chart_Scatter" },
        { id: "C3_STEP", display: "Step (C3)", widgetClass: "c3chart_Step" },
        { id: "C3_COMBO", display: "Combo (C3)", widgetClass: "c3chart_Combo" },
        { id: "AM_AREA", display: "Area (amCharts)", widgetClass: "amchart_Area" },
        { id: "AM_BAR", display: "Bar (amCharts)", widgetClass: "amchart_Bar" },
        { id: "AM_LINE", display: "Line (amCharts)", widgetClass: "amchart_Line" },
        { id: "AM_SCATTER", display: "Scatter (amCharts)", widgetClass: "amchart_Scatter" },
        { id: "AM_COLUMN", display: "Column (amCharts)", widgetClass: "amchart_Column" },
        { id: "AM_GANTT", display: "Gantt (amCharts)", widgetClass: "amchart_Gantt" },
        { id: "AM_COMBO", display: "Combo (amCharts)", widgetClass: "amchart_Combo" },
    ].map(function(item) { item.family = "ND"; return item;});
    MultiChart.prototype._anyChartTypes = [
        { id: "TABLE", display: "Table", widgetClass: "other_Table" }
    ].map(function(item) { item.family = "any"; return item;});
    MultiChart.prototype._allChartTypes = MultiChart.prototype._1DChartTypes.concat(MultiChart.prototype._2DChartTypes.concat(MultiChart.prototype._NDChartTypes.concat(MultiChart.prototype._anyChartTypes)));

    MultiChart.prototype.publishReset();
    MultiChart.prototype.publish("chartType", "BUBBLE", "set", "Chart Type", MultiChart.prototype._allChartTypes.map(function (item) { return item.id; }),{tags:["Basic"]});
    MultiChart.prototype.publish("chart", null, "widget", "Chart",null,{tags:["Basic"]});

    MultiChart.prototype.fields = function (_) {
        var retVal = SVGWidget.prototype.fields.apply(this, arguments);
        if (arguments.length && this.chart()) {
            this.chart().fields(_);
        }
        return retVal;
    };

    MultiChart.prototype.columns = function (_) {
        var retVal = SVGWidget.prototype.columns.apply(this, arguments);
        if (arguments.length && this.chart()) {
            this.chart().columns(_);
        }
        return retVal;
    };

    MultiChart.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length && this.chart()) {
            this.chart().data(_);
        }
        return retVal;
    };

    MultiChart.prototype._origChart = MultiChart.prototype.chart;
    MultiChart.prototype.chart = function (_) {
        var retVal = MultiChart.prototype._origChart.apply(this, arguments);
        if (arguments.length) {
            var context = this;
            _.click = function (row, column, selected) {
                context.click(row, column, selected);
            };
        }
        return retVal;
    };

    MultiChart.prototype.hasOverlay = function () {
        return this.chart() && this.chart().hasOverlay();
    };

    MultiChart.prototype.visible = function (_) {
        if (!arguments.length) return this.chart() && this.chart().visible();
        if (this.chart()) {
            this.chart().visible(_);
        }
        return this;
    };

    MultiChart.prototype.chartTypeProperties = function (_) {
        if (!arguments.length) return this._chartTypeProperties;
        this._chartTypeProperties = _;
        return this;
    };
    
    MultiChart.prototype.getChartDataFamily = function () {
        return this._allCharts[this.chartType()].family;
    };

    MultiChart.prototype.requireContent = function (chartType, callback) {
        Utility.requireWidget(this._allCharts[chartType].widgetClass).then(function(Widget) {
            callback(new Widget());
        });
    };

    MultiChart.prototype.switchChart = function (callback) {
        if (this._switchingTo === this.chartType()) {
            if (callback) {
                callback(this);
            }
            return;
        } else if (this._switchingTo) {
            console.log("Attempting switch to:  " + this.chartType() + ", before previous switch is complete (" + this._switchingTo + ")");
        }
        this._switchingTo = this.chartType();
        var oldContent = this.chart();
        var context = this;
        this.requireContent(this.chartType(), function (newContent) {
            if (newContent !== oldContent) {
                var size = context.size();
                newContent
                    .fields(context.fields())
                    .data(context.data())
                    .size(size)
                ;
                if (context._chartTypeProperties) {
                    for (var key in context._chartTypeProperties) {
                        if (newContent[key]) {
                            try {
                                newContent[key](context._chartTypeProperties[key]);
                            } catch (e) {
                                console.log("Exception Setting Property:  " + key);
                            }
                        } else {
                            console.log("Unknown Property:  " + key);
                        }
                    }
                    delete context._chartTypeProperties;
                }
                context.chart(newContent);
                if (oldContent) {
                    oldContent
                        .data([])
                        .size({ width: 1, height: 1 })
                        .render()
                    ;
                }
            }
            delete context._switchingTo;
            if (callback) {
                callback(this);
            }
        });
    };

    MultiChart.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var content = element.selectAll(".multiChart").data(this.chart() ? [this.chart()] : [], function (d) { return d._id; });
        content.enter().append("g")
            .attr("class", "multiChart")
            .each(function (d) {
                d.target(this);
            })
        ;

        var size = this.size();
        content
            .each(function (d) {
                d
                    .size(size)
                    .render()
                ;
            })
        ;

        content.exit().transition()
            .each(function (d) { d.target(null); })
            .remove()
        ;
    };

    MultiChart.prototype.exit = function (domNode, element) {
        if (this.chart()) {
            this.chart().target(null);
        }
        SVGWidget.prototype.exit.apply(this, arguments);
    };


    MultiChart.prototype.render = function (callback) {
        if (this.chartType() && (!this.chart() || (this.chart().classID() !== this._allCharts[this.chartType()].widgetClass))) {
            var context = this;
            var args = arguments;
            this.switchChart(function () {
                SVGWidget.prototype.render.apply(context, args);
            });
            return this;
        }
        return SVGWidget.prototype.render.apply(this, arguments);
    };

    return MultiChart;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/MultiChartSurface.js',["d3", "../common/ResizeSurface", "./MultiChart", "../api/INDChart"], factory);
    } else {
        root.chart_MultiChartSurface = factory(root.d3, root.common_ResizeSurface, root.chart_MultiChart, root.api_INDChart);
    }
}(this, function (d3, ResizeSurface, MultiChart, INDChart) {
    function MultiChartSurface() {
        ResizeSurface.call(this);
        INDChart.call(this);

        this._title = "MultiChartSurface";

        this._content = new MultiChart();
        var context = this;
        this._content.click = function (row, column) {
            context.click(row, column);
        };
        this._menu.click = function (d) {
            context._content.chartType(d).render();
        };
        this.content(this._content);
        this.mode("all");
    }
    MultiChartSurface.prototype = Object.create(ResizeSurface.prototype);
    MultiChartSurface.prototype.constructor = MultiChartSurface;
    MultiChartSurface.prototype._class += " chart_MultiChartSurface";
    MultiChartSurface.prototype.implements(INDChart.prototype);

    MultiChartSurface.prototype.publish("mode", "2D", "set", "Chart Type", ["1D", "2D", "ND", "all"]);
    MultiChartSurface.prototype.publishProxy("chartType", "_content");

    MultiChartSurface.prototype.columns = function (_) {
        if (!arguments.length) return this.content().columns();
        this.content().columns(_);
        return this;
    };

    MultiChartSurface.prototype.data = function (_) {
        if (!arguments.length) return this.content().data();
        this.content().data(_);
        return this;
    };

    MultiChartSurface.prototype._origMode = MultiChartSurface.prototype.mode;
    MultiChartSurface.prototype.mode = function (_) {
        var retVal = MultiChartSurface.prototype._origMode.apply(this, arguments);
        if (arguments.length) {
            this._mode = _;
            switch (this._mode) {
                case "1d":
                case "1D":
                    this.menu(this.content()._1DChartTypes.map(function (item) { return item.display; }).sort());
                    break;
                case "2d":
                case "2D":
                    this.menu(this.content()._2DChartTypes.concat(this.content()._NDChartTypes.concat(this.content()._anyChartTypes)).map(function (item) { return item.display; }).sort());
                    break;
                case "multi":
                    /* falls through */
                case "ND":
                    this.menu(this.content()._NDChartTypes.concat(this.content()._anyChartTypes).map(function (item) { return item.display; }).sort());
                    break;
                case "all":
                    /* falls through */
                default:
                    this.menu(this.content()._allChartTypes.map(function (item) { return item.display; }).sort());
            }
        }
        return retVal;
    };

    return MultiChartSurface;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Pie.js',["d3", "../common/SVGWidget", "../api/I2DChart", "../common/Text", "../common/FAChar", "../common/Utility", "../api/ITooltip", "css!./Pie"], factory);
    } else {
        root.chart_Pie = factory(root.d3, root.common_SVGWidget, root.api_I2DChart, root.common_Text, root.common_FAChar, root.common_Utility, root.api_ITooltip);
    }
}(this, function (d3, SVGWidget, I2DChart, Text, FAChar, Utility, ITooltip) {
    function Pie(target) {
        SVGWidget.call(this);
        I2DChart.call(this);
        ITooltip.call(this);

        this.labelWidgets = {};

        this.d3Pie = d3.layout.pie()
            .padAngle(0.0025)
            .sort(function (a, b) {
                return a < b ? -1 : a > b ? 1 : 0;
            })
            .value(function (d) { return d[1]; })
        ;
        this.d3Arc = d3.svg.arc()
            .padRadius(this.calcRadius())
            .innerRadius(this.innerRadius())
        ;
    }
    Pie.prototype = Object.create(SVGWidget.prototype);
    Pie.prototype.constructor = Pie;
    Pie.prototype._class += " chart_Pie";
    Pie.prototype.implements(I2DChart.prototype);
    Pie.prototype.implements(ITooltip.prototype);

    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});
    Pie.prototype.publish("outerText", false, "boolean", "Sets label position inside or outside chart",null,{tags:["Basic"]});
    Pie.prototype.publish("innerRadius", 0, "number", "Sets inner pie hole radius as a percentage of the radius of the pie chart",null,{tags:["Basic"]});

    Pie.prototype.calcRadius = function (_) {
        return Math.min(this._size.width, this._size.height) / 2 - 2;
    };

    Pie.prototype.intersection = function (pointA, pointB) {
        return this.intersectCircle(pointA, pointB);
    };

    Pie.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._selection = new Utility.SimpleSelection(element);
    };

    Pie.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
        this.d3Arc.innerRadius(this.innerRadius_exists() ? this.calcRadius() * this.innerRadius() / 100 : 0);
        var arc = element.selectAll(".arc").data(this.d3Pie(this.data()), function (d) { return d.data[0]; });

        //  Enter  ---
        arc.enter().append("g")
            .attr("class", "arc")
            .attr("opacity", 0)
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("path")
                    .on("mouseover.tooltip", function (d) {
                        context.tooltipShow(d.data, context.columns(), 1);
                    })
                    .on("mouseout.tooltip", function (d) {
                        context.tooltipShow();
                    })
                    .on("mousemove.tooltip", function (d) {
                        context.tooltipShow(d.data, context.columns(), 1);
                    })
                    .on("mouseover", arcTween(0, 0))
                    .on("mouseout", arcTween(-5, 150))
                ;
                if (d.data.__viz_faChar) {
                    context.labelWidgets[d.data[0]] = new FAChar()
                        .char(d.data.__viz_faChar)
                        .target(this)
                        .render()
                    ;
                } else {
                    context.labelWidgets[d.data[0]] = new Text()
                        .text(d.data[0])
                        .target(this)
                        .render()
                    ;
                }
            })
        ;

        //  Update  ---
        arc.transition()
            .attr("opacity", 1)
            .each(function (d) {
                d.outerRadius = context.calcRadius() - 5;
                var pos = { x: 0, y: 1 };
                if (context.outerText()) {
                    var xFactor = Math.cos((d.startAngle + d.endAngle - Math.PI) / 2);
                    var yFactor = Math.sin((d.startAngle + d.endAngle - Math.PI) / 2);

                    var textBBox = context.labelWidgets[d.data[0]].getBBox();
                    var textOffset = Math.abs(xFactor) > Math.abs(yFactor) ? textBBox.width : textBBox.height;
                    pos.x = xFactor * (context.calcRadius() + textOffset);
                    pos.y = yFactor * (context.calcRadius() + textOffset);
                } else {
                    var centroid = context.d3Arc.centroid(d);
                    pos = { x: centroid[0], y: centroid[1] };
                }

                var element = d3.select(this);
                element.select("path").transition()
                    .attr("d", context.d3Arc)
                    .style("fill", function (d) { return context._palette(d.data[0]); })
                ;
                context.labelWidgets[d.data[0]]
                    .pos(pos)
                    .render()
                    .element()
                        .classed("innerLabel", !context.outerText())
                        .classed("outerLabel", context.outerText())
                ;
            })
        ;

        //  Exit  ---
        arc.exit().transition()
            .style("opacity", 0)
            .remove()
        ;

        //  Label Lines  ---
        if (context.outerText()) {
            var lines = element.selectAll("line").data(this.d3Pie(this.data()), function (d) { return d.data[0]; });
            lines.enter().append("line")
              .attr("x1", 0)
              .attr("x2", 0)
              .attr("y1", -this.calcRadius() - 3)
              .attr("y2", -this.calcRadius() - 8)
              .attr("stroke", "gray")
              .attr("transform", function (d) {
                  return "rotate(" + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ")";
              });
            lines.transition()
              .attr("transform", function (d) {
                  return "rotate(" + (d.startAngle + d.endAngle) / 2 * (180 / Math.PI) + ")";
              });
            lines.exit().remove();
        }

        function arcTween(outerRadiusDelta, delay) {
            return function() {
                d3.select(this).transition().delay(delay).attrTween("d", function (d) {
                    var i = d3.interpolate(d.outerRadius, context.calcRadius() + outerRadiusDelta);
                    return function (t) { d.outerRadius = i(t); return context.d3Arc(d); };
                });
            };
        }
    };

    Pie.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
        delete this._selectionBag;
    };

    return Pie;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Step.js',["d3", "./Scatter"], factory);
    } else {
        root.chart_Step = factory(root.d3, root.chart_Scatter);
    }
}(this, function (d3, Scatter) {
    function Step(target) {
        Scatter.call(this);

        this.interpolate("step");
    }
    Step.prototype = Object.create(Scatter.prototype);
    Step.prototype.constructor = Step;
    Step.prototype._class += " chart_Step";

    return Step;
}));




(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Summary.js',["d3", "../common/HTMLWidget", "../api/I1DChart", "css!font-awesome", "css!./Summary"], factory);
    } else {
        root.chart_Summary = factory(root.d3, root.common_HTMLWidget, root.api_I1DChart);
    }
}(this, function (d3, HTMLWidget, I1DChart) {
    function Summary() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._drawStartPos = "center";

    }
    Summary.prototype = Object.create(HTMLWidget.prototype);
    Summary.prototype.constructor = Summary;
    Summary.prototype.implements(I1DChart.prototype);
    Summary.prototype._class += " chart_Summary";

    Summary.prototype.publish("colorFill", "#3498db", "html-color", "Fill Color", null);
    Summary.prototype.publish("colorStroke", "#ffffff", "html-color", "Fill Color", null);
    Summary.prototype.publish("valueIcon", "fa-briefcase", "string", "FA Char icon class");
    Summary.prototype.publish("moreText", "More Info", "string", "More text");
    Summary.prototype.publish("moreIcon", "fa-info-circle", "string", "FA Char icon class");
    Summary.prototype.publish("fixedSize", true, "boolean", "Fix Size to Min Width/Height");
    Summary.prototype.publish("minWidth", 225, "number", "Minimum Width");
    Summary.prototype.publish("minHeight", 150, "number", "Minimum Height");

    Summary.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._mainDiv = element.append("div")
        ;
        var context = this;
        this._headerDiv = this._mainDiv.append("h2")
            .on("click", function (d) {
                var clickEvent = {};
                clickEvent[context.columns()] = context.data();
                context.click(clickEvent, "value");
            })
        ;
        this._textDiv = this._mainDiv.append("div")
            .attr("class", "text")
            .on("click", function (d) {
                var clickEvent = {};
                clickEvent[context.columns()] = context.data();
                context.click(clickEvent, "text");
            })
        ;
    };

    Summary.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        element
            .style({
                width: this.fixedSize() ? this.minWidth() + "px" : "100%",
                height: this.fixedSize() ? this.minHeight() + "px" : "100%"
            })
        ;
        this._mainDiv
            .attr("class", "content bgIcon " + this.valueIcon())
            .style({
                "background-color": this.colorFill(),
                "color": this.colorStroke(),
                "min-width": this.minWidth() + "px",
                "min-height": this.minHeight() + "px"
            })
        ;
        this._headerDiv
            .style("color", this.colorStroke())
            .text(this.data())
        ;
        this._textDiv
            .text(this.columns())
        ;
        var context = this;
        var moreDivs = this._mainDiv.selectAll(".more").data(this.moreText() ? [this.moreText()] : []);
        moreDivs.enter()
            .append("div")
            .attr("class", "more")
            .on("click", function (d) {
                var clickEvent = {};
                clickEvent[context.columns()] = context.data();
                context.click(clickEvent, "more");
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("i");
                element.append("span");
            })
        ;
        moreDivs
            .attr("style", "background-color:" + d3.rgb(this.colorFill()).darker(0.75))
        ;
        moreDivs.select("i")
            .attr("class", "fa " + this.moreIcon())
        ;
        moreDivs.select("span")
            .text(this.moreText())
        ;
        moreDivs.exit().remove();
    };

    Summary.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Summary;
}));

