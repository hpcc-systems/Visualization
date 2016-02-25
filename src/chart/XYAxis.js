"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "./Axis", "../common/Utility", "css!./XYAxis"], factory);
    } else {
        root.chart_XYAxis = factory(root.d3, root.common_SVGWidget, root.chart_Axis, root.common_Utility);
    }
}(this, function (d3, SVGWidget, Axis, Utility) {
    function XYAxis() {
        SVGWidget.call(this);
        this._drawStartPos = "origin";

        this.domainAxis = new Axis()
            .orientation("bottom")
            .type("ordinal")
            .overlapMode("stagger")
            .shrinkToFit("high")
            .extend(0)
        ;
        this.valueAxis = new Axis()
            .orientation("left")
            .type("linear")
            .shrinkToFit("high")
        ;
    }
    XYAxis.prototype = Object.create(SVGWidget.prototype);
    XYAxis.prototype.constructor = XYAxis;
    XYAxis.prototype._class += " chart_XYAxis";

    XYAxis.prototype.publish("orientation", "horizontal", "set", "Selects orientation for the axis", ["horizontal", "vertical"]);
    XYAxis.prototype.publish("selectionMode", false, "boolean", "Range Selector");

    XYAxis.prototype.publishProxy("xAxisTickCount", "domainAxis", "tickCount");
    XYAxis.prototype.publishProxy("xAxisTickFormat", "domainAxis", "tickFormat");
    XYAxis.prototype.publishProxy("xAxisType", "domainAxis", "type");
    XYAxis.prototype.publishProxy("xAxisTypeTimePattern", "domainAxis", "timePattern");
    XYAxis.prototype.publish("xAxisDomainLow", null, "string", "X-Axis Low", null, { optional: true, disable: function (w) { return w.xAxisType() === "ordinal"; } });
    XYAxis.prototype.publish("xAxisDomainHigh", null, "string", "X-Axis High", null, { optional: true, disable: function (w) { return w.xAxisType() === "ordinal"; } });
    XYAxis.prototype.publishProxy("xAxisOverlapMode", "domainAxis", "overlapMode");
    XYAxis.prototype.publishProxy("xAxisLabelRotation", "domainAxis", "labelRotation");
    XYAxis.prototype.publishProxy("xAxisDomainPadding", "domainAxis", "extend");

    XYAxis.prototype.publishProxy("yAxisTitle", "valueAxis", "title");
    XYAxis.prototype.publishProxy("yAxisTickCount", "valueAxis", "tickCount");
    XYAxis.prototype.publishProxy("yAxisTickFormat", "valueAxis", "tickFormat");
    XYAxis.prototype.publishProxy("yAxisType", "valueAxis", "type");
    XYAxis.prototype.publishProxy("yAxisTypeTimePattern", "valueAxis", "timePattern");
    XYAxis.prototype.publishProxy("yAxisTypePowExponent", "valueAxis", "powExponent");
    XYAxis.prototype.publishProxy("yAxisTypeLogBase", "valueAxis", "logBase");
    XYAxis.prototype.publish("yAxisDomainLow", null, "string", "Y-Axis Low", null, { optional: true, disable: function (w) { return w.yAxisType() === "ordinal"; } });
    XYAxis.prototype.publish("yAxisDomainHigh", null, "string", "Y-Axis High", null, { optional: true, disable: function (w) { return w.yAxisType() === "ordinal"; } });
    XYAxis.prototype.publishProxy("yAxisDomainPadding", "valueAxis", "extend");

    XYAxis.prototype.publish("regions", [], "array", "Regions");

    XYAxis.prototype.publish("sampleData", "", "set", "Display Sample Data", ["", "ordinal", "ordinalRange", "linear", "time-x", "time-y"]);

    XYAxis.prototype.resetSelection = function () {
        this._prevBrush = null;
        return this;
    };

    XYAxis.prototype.columns = function (_) {
        return SVGWidget.prototype.columns.apply(this, arguments);
    };

    XYAxis.prototype.parseData = function (d) {
        return this.domainAxis.parse(d);
    };

    XYAxis.prototype.parseValue = function (d) {
        return this.valueAxis.parse(d, true);
    };

    XYAxis.prototype.formatData = function (d) {
        return this.domainAxis.format(d);
    };

    XYAxis.prototype.formatValue = function (d) {
        return this.valueAxis.format(d, true);
    };

    XYAxis.prototype.parsedData = function () {
        return this.data().map(function (row) {
            return row.map(function (cell, idx) {
                if (idx === 0) {
                    return this.parseData(cell);
                } if (idx >= this.columns().length) {
                    return cell;
                }
                return this.parseValue(cell);
            }, this);
        }, this);
    };

    XYAxis.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this.svg = element.append("g");
        this.svgRegions = element.append("g");
        this.svgData = this.svg.append("g");

        this.domainAxis
            .target(this.svg.node())
        ;
        this.valueAxis
            .target(this.svg.node())
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
        var selected = this.data().filter(function (d) {
            var pos = d[0];
            if (this.xAxisType() ==="ordinal") {
                pos = this.domainAxis.d3Scale(pos) + (this.domainAxis.d3Scale.rangeBand ? this.domainAxis.d3Scale.rangeBand() / 2 : 0);
            }
            if (this.orientation() === "horizontal") {
                return (pos >= this.xBrush.extent()[0] && pos <= this.xBrush.extent()[1]);
            }
            return (pos >= this.yBrush.extent()[0] && pos <= this.yBrush.extent()[1]);
        }, this);
        this.selection(selected);
    }, 250);

    XYAxis.prototype.dataPos = function (d) {
        return this.domainAxis.scalePos(d);
    };

    XYAxis.prototype.valuePos = function (d) {
        return this.valueAxis.scalePos(d);
    };

    XYAxis.prototype.setScaleRange = function (width, height) {
        this.xAxis.width(width);
        this.yAxis.height(height);
    };

    XYAxis.prototype.calcMargin = function (domNode, element, isHorizontal) {
        var margin = {
            top: !isHorizontal && this.selectionMode() ? 10 : 2,
            right: isHorizontal && this.selectionMode() ? 10 : 2,
            bottom: 2,
            left: 2
        };
        var width = this.width() - margin.left - margin.right;
        var height = this.height() - margin.top - margin.bottom;

        var xHeight = 30;
        var yWidth = 30;
        for (var i = 0; i < 10; ++i) {
            this.xAxis.width(width - yWidth).height(0);
            var xAxisOverlap = this.xAxis.calcOverflow(element);

            this.yAxis.width(0).height(height - xHeight);
            var yAxisOverlap = this.yAxis.calcOverflow(element);

            var newXHeight = xAxisOverlap.depth;
            var newYWidth = yAxisOverlap.depth;

            if (newXHeight === xHeight && newYWidth === yWidth) {
                xHeight = newXHeight;
                yWidth = newYWidth;
                break;
            }
            xHeight = newXHeight;
            yWidth = newYWidth;
        }
        this.xAxis
            .x(width / 2 + yWidth / 2 + margin.left)
            .y(height + margin.top)
            .width(width - yWidth)
        ;
        this.yAxis
            .x(margin.left)
            .y(height / 2 - xHeight / 2 + margin.top)
            .height(height - xHeight)
        ;
        margin.left += yWidth;
        margin.bottom += xHeight;
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

        this.domainAxis
            .orientation(isHorizontal ? "bottom" : "left")
            .title(this.columns()[0])
        ;
        this.valueAxis
            .orientation(isHorizontal ? "left" : "bottom")
        ;
        this.xAxis = isHorizontal ? this.domainAxis : this.valueAxis;
        this.yAxis = isHorizontal ? this.valueAxis : this.domainAxis;
        var xBrush = isHorizontal ? this.xBrush : this.yBrush;
        var yBrush = isHorizontal ? this.yBrush : this.xBrush;
        var yBrushExtent = yBrush.extent();

        //  Update Domain  ---
        switch (this.xAxisType()) {
            case "ordinal":
                this.domainAxis.ordinals(this.data().map(function (d) { return d[0]; }));
                break;
            default:
                var domainMin = this.xAxisDomainLow() ? this.xAxisDomainLow() : this.domainAxis.parseInvert(d3.min(this.parsedData(), function (data) {
                    return data[0];
                }));
                var domainMax = this.xAxisDomainHigh() ? this.xAxisDomainHigh() : this.domainAxis.parseInvert(d3.max(this.parsedData(), function (data) {
                    return data[0];
                }));
                if (domainMin !== undefined && domainMax !== undefined) {
                    this.domainAxis
                        .low(domainMin)
                        .high(domainMax)
                    ;
                }
                break;
        }

        var min = this.yAxisDomainLow() ? this.yAxisDomainLow() : this.valueAxis.parseInvert(d3.min(this.parsedData(), function (data) {
            return d3.min(data.filter(function (cell, i) { return i > 0 && context.columns()[i] && context.columns()[i].indexOf("__") !== 0 && cell !== null; }), function (d) { return d instanceof Array ? d[0] : d; });
        }));
        var max = this.yAxisDomainHigh() ? this.yAxisDomainHigh() : this.valueAxis.parseInvert(d3.max(this.parsedData(), function (data) {
            return d3.max(data.filter(function (cell, i) { return i > 0 && context.columns()[i] && context.columns()[i].indexOf("__") !== 0 && cell !== null; }), function (d) { return d instanceof Array ? d[1] : d; });
        }));
        this.valueAxis
            .low(min)
            .high(max)
        ;

        //  Calculate Margins  ---
        this.margin = this.calcMargin(domNode, element, isHorizontal);
        this.domainAxis.render();
        this.valueAxis.render();

        //  Update Range  ---
        var width = this.width() - this.margin.left - this.margin.right;
        if (width < 0) width = 0;
        var height = this.height() - this.margin.top - this.margin.bottom;
        if (height < 0) height = 0;
        var maxCurrExtent = isHorizontal ? width : height;
        var maxOtherExtent = isHorizontal ? height : width;

        //  Render  ---
        this.svgData.transition()
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        ;

        this.xBrush
            .x(this.domainAxis.d3Scale)
        ;
        this.yBrush
            .y(this.domainAxis.d3Scale)
        ;
        if (this.selectionMode()) {
            if (this._prevXAxisType !== this.xAxisType()) {
                this._prevXAxisType = this.xAxisType();
                this._prevBrush = null;
            }
            if (!this._prevBrush) {
                switch (this.xAxisType()) {
                    case "ordinal":
                        xBrush.extent([0, maxCurrExtent]);
                        break;
                    default:
                        xBrush.extent(this.domainAxis.d3Scale.domain());
                        break;
                }
            } else if (this._prevBrush && this._prevBrush.orientation !== this.orientation()) {
                switch (this.xAxisType()) {
                    case "ordinal":
                        xBrush.extent([maxCurrExtent - yBrushExtent[0] * maxCurrExtent / this._prevBrush.maxCurrExtent, maxCurrExtent - yBrushExtent[1] * maxCurrExtent / this._prevBrush.maxCurrExtent]);
                        break;
                    default:
                        xBrush.extent(yBrushExtent);
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
            .call(xBrush)
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
