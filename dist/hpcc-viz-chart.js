if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Axis.js',["d3", "../common/SVGWidget", "../common/Utility", "css!./Axis"], factory);
    } else {
        root.chart_Axis = factory(root.d3, root.common_SVGWidget, root.common_Utility);
    }
}(this, function (d3, SVGWidget, Utility) {
    function Axis() {
        SVGWidget.call(this);
        this._drawStartPos = "origin";

        this.d3Axis = d3.svg.axis();
        this.d3Guides = d3.svg.axis();

        this.updateScale();
    }
    Axis.prototype = Object.create(SVGWidget.prototype);
    Axis.prototype.constructor = Axis;
    Axis.prototype._class += " chart_Axis";

    Axis.prototype.publish("title", "", "string", "Title");
    Axis.prototype.publish("orientation", "bottom", "set", "Orientation", ["left", "top", "right", "bottom"]);
    Axis.prototype.publish("type", "linear", "set", "Type", ["none", "ordinal", "linear", "pow", "log", "time"]);
    Axis.prototype.publish("timePattern", "%Y-%m-%d", "string", "Time Series Pattern", null, { disable: function (w) { return w.type() !== "time"; } });
    Axis.prototype.publish("powExponent", 2, "number", "Exponent for Pow on Value Axis", null, { disable: function (w) { return w.type() !== "pow"; } });
    Axis.prototype.publish("logBase", 10, "number", "Base for log on Value Axis", null, { disable: function (w) { return w.type() !== "log"; } });
    Axis.prototype.publish("ordinals", [], "array", "Ordinal Values", null, { disable: function (w) { return w.type() !== "ordinal"; } });
    Axis.prototype.publish("tickCount", null, "number", "Tick Count", null, { optional: true, disable: function (w) { return w.type() === "ordinal"; } });
    Axis.prototype.publish("tickFormat", null, "string", "Tick Format", null, { optional: true, disable: function (w) { return w.type() === "ordinal"; } });
    Axis.prototype.publish("tickLength", null, "number", "Tick Length", { optional: true });
    Axis.prototype.publish("low", null, "any", "Low", null, { optional: true, disable: function (w) { return w.type() === "ordinal"; } });
    Axis.prototype.publish("high", null, "any", "High", null, { optional: true, disable: function (w) { return w.type() === "ordinal"; } });
    Axis.prototype.publish("overlapMode", "none", "set", "Label Overlap Mode", ["none", "stagger", "hide", "rotate", "linebreak", "wrap"]);
    Axis.prototype.publish("labelRotation", 33, "number", "Label Rotation", null, { optional: true, disable: function (w) { return w.overlapMode() !== "rotate"; } });
    Axis.prototype.publish("shrinkToFit", "both", "set", "Size to fit", ["none", "low", "high", "both"]);
    Axis.prototype.publish("extend", 5, "number", "Extend axis %", { optional: true, disable: function (w) { return w.type() === "ordinal"; } });

    var type = Axis.prototype.type;
    Axis.prototype.type = function (_) {
        var retVal = type.apply(this, arguments);
        if (arguments.length) {
            this.updateScale();
        }
        return retVal;
    };

    var timePattern = Axis.prototype.timePattern;
    Axis.prototype.timePattern = function (_) {
        var retVal = timePattern.apply(this, arguments);
        if (arguments.length) {
            this.updateScale();
        }
        return retVal;
    };

    Axis.prototype.lowValue = function () {
        return this.parse(this.low());
    };

    Axis.prototype.highValue = function () {
        return this.parse(this.high());
    };

    Axis.prototype.parse = function (d, forceNumeric) {
        if (d instanceof Array) {
            return d.map(function (d2) {
                return this.parse(d2);
            }, this);
        }
        if (d !== undefined && d !== null) {
            if (this.parser) {
                return this.parser.parse(typeof d === "number" ? d.toString() : d);
            }
            if (forceNumeric && typeof d === "string") {
                return +d;
            }
        }
        return d;
    };

    Axis.prototype.parseInvert = function (d) {
        if (d instanceof Array) {
            return d.map(function (d2) {
                return this.parseInvert(d2);
            }, this);
        }
        if (this.parser) {
            return this.parser(d);
        }
        return d;
    };

    Axis.prototype.format = function (d) {
        if (d instanceof Array) {
            return d.map(function (d2) {
                return this.format(d2);
            }, this);
        }
        if (d !== undefined && d !== null && this.formatter) {
            return this.formatter(d);
        }
        return d;
    };

    Axis.prototype.scalePos = function (d) {
        var retVal = this.d3Scale(this.parse(d));
        if (this.type() === "ordinal") {
            retVal += this.d3Scale.rangeBand() / 2;
        }
        return retVal;
    };

    Axis.prototype.isHorizontal = function () {
        switch (this.orientation()) {
            case "left":
            case "right":
                return false;
        }
        return true;
    };

    Axis.prototype.domain = function (_) {
        if (!arguments.length) return this.d3Scale.domain();
        this.d3Scale.domain(_);
        return this;
    };

    Axis.prototype.range = function (_) {
        if (!arguments.length) {
            if (this.d3Scale.rangeRoundBands) {
                return this.d3Scale.rangeExtent();
            } else if (this.d3Scale.rangeRound) {
                return this.d3Scale.range();
            }
        }
        if (this.d3Scale.rangeRoundBands) {
            this.d3Scale.rangeRoundBands(_, 0.1);
        } else if (this.d3Scale.rangeRound) {
            this.d3Scale.range(_);
        }
        return this;
    };

    Axis.prototype.invert = function (pos) {
        return this.d3Scale.invert(pos);
    };

    Axis.prototype.guideTarget = function (_) {
        this._guideElement = d3.select(_)
            .attr("class", this._class)
        ;
    };

    Axis.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this.svg = element.append("g");
        this.svgAxis = this.svg.append("g")
            .attr("class", "axis")
        ;
        this.svgText = this.svgAxis.append("text");

        this.svg2 = (this._guideElement || element).append("g");
        this.svgGuides = this.svg2
            .attr("class", "guide")
        ;
    };

    Axis.prototype.updateScale = function () {
        switch (this.type()) {
            case "ordinal":
                this.d3Scale = d3.scale.ordinal();
                if (this.ordinals_exists()) {
                    this.d3Scale.domain(this.ordinals());
                }
                this.parser = null;
                this.formatter = null;
                break;
            case "linear":
                this.d3Scale = d3.scale.linear();
                if (this.low_exists() && this.high_exists()) {
                    this.d3Scale.domain([this.lowValue(), this.highValue()]);
                }
                this.parser = null;
                this.formatter = this.tickFormat_exists() ? d3.format(this.tickFormat()) : null;
                break;
            case "pow":
                this.d3Scale = d3.scale.pow()
                    .exponent(this.powExponent())
                ;
                if (this.low_exists() && this.high_exists()) {
                    this.d3Scale.domain([this.lowValue(), this.highValue()]);
                }
                this.parser = null;
                this.formatter = this.tickFormat_exists() ? d3.format(this.tickFormat()) : null;
                break;
            case "log":
                this.d3Scale = d3.scale.log()
                    .base(this.logBase())
                ;
                if (this.low_exists() && this.high_exists()) {
                    this.d3Scale.domain([this.lowValue(), this.highValue()]);
                }
                this.parser = null;
                this.formatter = this.tickFormat_exists() ? d3.format(this.tickFormat()) : null;
                break;
            case "time":
                this.d3Scale = d3.time.scale();
                if (this.low_exists() && this.high_exists()) {
                    this.d3Scale.domain([this.lowValue(), this.highValue()]);
                }
                this.parser = this.timePattern_exists() ? d3.time.format(this.timePattern()) : null;
                this.formatter = this.tickFormat_exists() ? d3.time.format(this.tickFormat()) : null;
                break;
        }

        if (this.extend()) {
            switch (this.type()) {
                case "ordinal":
                    break;
                default:
                    var length, delta, low, high, newLow, newHigh;
                    if (this.isHorizontal()) {
                        length = this.width();
                        this.d3Scale.range([0, length]);
                        delta = length * this.extend() / 100;
                        low = this.d3Scale.invert(0);
                        newLow = this.d3Scale.invert(-delta);
                        high = this.d3Scale.invert(length);
                        newHigh = this.d3Scale.invert(length + delta);
                    } else {
                        length = this.height();
                        this.d3Scale.range([length, 0]);
                        delta = length * this.extend() / 100;
                        low = this.d3Scale.invert(length);
                        newLow = this.d3Scale.invert(length + delta);
                        high = this.d3Scale.invert(0);
                        newHigh = this.d3Scale.invert(-delta);
                    }
                    if (Math.sign(low) !== Math.sign(newLow)) {
                        newLow = 0;
                    }
                    if (Math.sign(high) !== Math.sign(newHigh)) {
                        newHigh = 0;
                    }
                    this.d3Scale.domain([newLow, newHigh]);
                    break;
            }
        }
        this.d3Axis
            .orient(this.orientation())
            .scale(this.d3Scale)
            .tickFormat(this.formatter)
            .ticks(this.tickCount())
        ;
        this.d3Guides
            .orient(this.orientation())
            .scale(this.d3Scale)
            .tickSize(-this.tickLength())
            .tickFormat("")
            .ticks(this.tickCount())
        ;
    };

    Axis.prototype.adjustText = function (svg, tickOverlapModulus) {
        var isHoriztontal = this.isHorizontal();
        var isLeft = this.orientation() === "left";
        var isBottom = this.orientation() === "bottom";
        var context = this;
        if (this.overlapMode() === "linebreak") {
            if (this.type() === "ordinal") {
                svg.selectAll(".tick > text")
                    .call(function () {
                        return context.linebreak.apply(context, arguments);
                    }, this.d3Scale.rangeBand())
                ;
            }
        } else if (this.overlapMode() === "wrap") {
            if (this.type() === "ordinal") {
                svg.selectAll(".tick > text")
                    .call(function () {
                        return context.wrap.apply(context, arguments);
                    }, this.d3Scale.rangeBand())
                ;
            }
        } else {
            switch (isHoriztontal ? this.overlapMode() : "none") {
                case "stagger":
                    svg.selectAll(".tick > text")
                        .style("text-anchor", "middle")
                        .attr("dy", function (d, i) { return (isBottom ? 1 : -1) * ((isBottom ? 0.71 : 0) + i % tickOverlapModulus) + "em"; })
                        .attr("dx", 0)
                        .attr("visibility", null)
                        .attr("transform", "rotate(0)")
                    ;
                    break;
                case "hide":
                    svg.selectAll(".tick > text")
                        .style("text-anchor", "middle")
                        .attr("dy", (isBottom ? 0.71 : 0) + "em")
                        .attr("dx", 0)
                        .attr("visibility", function (d, i) { return i % tickOverlapModulus ? "hidden" : null; })
                        .attr("transform", "rotate(0)")
                    ;
                    break;
                case "rotate":
                    var deg = -(this.labelRotation()) || 0;
                    if (deg !== 0 && tickOverlapModulus > 1) {
                        svg.selectAll(".tick > text")
                            .each(function () {
                                var elm = d3.select(this);
                                var bbox = elm.node().getBBox();
                                var dyOff = (isBottom ? 1 : -1) * Math.sin(Math.PI * (-Math.abs(deg) / 180));
                                elm
                                    .style("text-anchor", deg > 0 ? (isBottom ? "start" : "end") : (isBottom ? "end" : "start"))
                                    .attr("dy", (bbox.height / 2 * dyOff) + "px")
                                    .attr("dx", deg > 0 ? (isBottom ? "0.71em" : "-0.71em") : (isBottom ? "-0.71em" : "0.71em"))
                                    .attr("transform", "rotate(" + deg + ")")
                                    .attr("visibility", null)
                                ;
                            })
                        ;
                        break;
                    }
                    /* falls through */
                default:
                    svg.selectAll(".tick > text")
                        .style("text-anchor", isHoriztontal ? "middle" : isLeft ? "end" : "start")
                        .attr("dy", isHoriztontal ? ((isBottom ? 0.71 : 0) + "em") : "0.32em")
                        .attr("dx", 0)
                        .attr("visibility", null)
                        .attr("transform", "rotate(0)")
                    ;
            }
        }
    };

    Axis.prototype.calcTickOverlapModulus = function (element) {
        var retVal = 1;
        switch (this.overlapMode()) {
            case "rotate":
            case "stagger":
            case "hide":
                var bboxArr = [];
                element.selectAll(".tick > text").each(function (d) {
                    var bbox = this.getBoundingClientRect();
                    for (var i = bboxArr.length - 1; i >= 0; --i) {
                        if (bboxArr[i].right < bbox.left) {
                            break;
                        }
                        if (bboxArr.length + 1 - i > retVal) {
                            retVal = bboxArr.length + 1 - i;
                        }
                    }
                    bboxArr.push(bbox);
                });
                break;
        }
        return retVal;
    };

    Axis.prototype.calcOverflow = function (element, ignoreText) {
        this.updateScale();
        var isHorizontal = this.isHorizontal();
        this.range(isHorizontal ? [0, this.width()] : [this.height(), 0]);
        var tmpSvg = element.append("g").attr("class", this.classID()).append("g");
        tmpSvg
            .attr("class", isHorizontal ? "x" : "y")
            .call(this.d3Axis)
        ;
        if (ignoreText) {
            element.selectAll(".tick > text").remove();
        }

        var retVal = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            tickOverlapModulus: this.calcTickOverlapModulus(tmpSvg)
        };
        this.adjustText(tmpSvg, retVal.tickOverlapModulus);

        var bbox = tmpSvg.node().getBBox();
        retVal.depth = isHorizontal ? bbox.height : bbox.width;
        switch (this.shrinkToFit()) {
            case "low":
            case "both":
                retVal.left = isHorizontal ? -bbox.x : 0;
                retVal.bottom = isHorizontal ? 0 : -(this.height() - (bbox.height + bbox.y));
                break;
        }
        switch (this.shrinkToFit()) {
            case "high":
            case "both":
                retVal.top = isHorizontal ? 0 : -bbox.y;
                retVal.right = isHorizontal ? -(this.width() - bbox.x - bbox.width) : 0;
                break;
        }
        tmpSvg.remove();

        return retVal;
    };

    Axis.prototype.wrap = function (text, bandSize, re) {
        re = re || /\s+/;
        var context = this;
        text.each(function () {
            var text = d3.select(this),
                words = text.text().split(re).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, 
                x = text.attr("x"),
                y = text.attr("y"),
                fs = parseFloat(text.style("font-size")) || 10,
                maxLinesPerBand = Math.floor(bandSize / (fs * lineHeight)) - 1,
                minWordsPerLine = context.isHorizontal() ? 1 : Math.ceil(words.length / maxLinesPerBand),
                dy = parseFloat(text.attr("dy"))
            ;
            var tspan = text.text(null).append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em")
            ;
            var wordsOnLine = 0;
            while ((word = words.pop())) {
                line.push(word);
                tspan.text(line.join(" "));
                wordsOnLine++;
                if (tspan.node().getComputedTextLength() > bandSize && wordsOnLine >= minWordsPerLine) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                    wordsOnLine = 0;
                }
            }
            if (!context.isHorizontal()) {
                text.selectAll("tspan")
                    .attr("y", (-lineNumber/2) + "em")
                ;
            }
        });
    };

    Axis.prototype.linebreak = function (text, bandSize) {
        this.wrap(text, bandSize, "\n");
    };

    Axis.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        var overlap = this.calcOverflow(element);

        this.range(this.isHorizontal() ? [overlap.left, this.width() - overlap.right] : [this.height() - overlap.top - overlap.bottom, 0]);

        var context = this;
        function doPosition(element) {
            element.attr("transform", function (d) {
                switch (context.orientation()) {
                    case "left":
                        return "translate(" + overlap.depth + ", " + overlap.top + ")";
                    case "top":
                        return "translate(0," + overlap.depth + ")";
                    case "right":
                        return "translate(" + (context.width() - overlap.depth) + ", " + overlap.top + ")";
                    case "bottom":
                        return "translate(0," + (context.height() - overlap.depth) + ")";
                }
                return "translate(0,0)";
            });
        }
        this.svg
            //.attr("class", this.isHorizontal() ? "x" : "y")
            .style("visibility", this.type() === "none" ? "hidden" : null)
            .transition()
            .call(doPosition)
        ;
        if (this._guideElement) {
            this.svg2
                .transition()
                .call(doPosition)
            ;
        }
        this.svgAxis
            .call(this.d3Axis)
        ;
        this.adjustText(this.svgAxis, overlap.tickOverlapModulus);

        var svgLine = this.svgAxis.select("path.domain");
        var svgLineBBox = svgLine.node().getBBox();
        switch (this.orientation()) {
            case "left":
                this.svgText.transition()
                    .attr("transform", "rotate(-90)")
                    .attr("x", -2)
                    .attr("y", 2)
                    .attr("dx", null)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text(this.title())
                ;
                break;
            case "right":
                this.svgText.transition()
                    .attr("transform", "rotate(-90)")
                    .attr("x", -2)
                    .attr("y", 4)
                    .attr("dx", null)
                    .attr("dy", "-.71em")
                    .style("text-anchor", "end")
                    .text(this.title())
                ;
                break;
            case "top":
                this.svgText.transition()
                    .attr("transform", "rotate(0)")
                    .attr("x", svgLineBBox.x + svgLineBBox.width - 2)
                    .attr("y", 2)
                    .attr("dx", null)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text(this.title())
                ;
                break;
            case "bottom":
                this.svgText.transition()
                    .attr("transform", "rotate(0)")
                    .attr("x", svgLineBBox.x + svgLineBBox.width - 2)
                    .attr("y", -2)
                    .attr("dx", null)
                    .attr("dy", null)
                    .style("text-anchor", "end")
                    .text(this.title())
                ;
                break;
        }
        this.svgGuides
            .call(this.d3Guides)
        ;
    };

    Axis.prototype.postUpdate = function (domNode, element) {
        SVGWidget.prototype.postUpdate.apply(this, arguments);
        if (this._guideElement) {
            this._guideElement
                .attr("transform", this._element.attr("transform"))
            ;
        }
    };

    return Axis;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/XYAxis.js',["d3", "../common/SVGWidget", "./Axis", "../common/Utility", "css!./XYAxis"], factory);
    } else {
        root.chart_XYAxis = factory(root.d3, root.common_SVGWidget, root.chart_Axis, root.common_Utility);
    }
}(this, function (d3, SVGWidget, Axis, Utility) {
    function XYAxis() {
        SVGWidget.call(this);
        Utility.SimpleSelectionMixin.call(this);

        this._drawStartPos = "origin";

        this.domainAxis = new Axis()
            .orientation_default("bottom")
            .type_default("ordinal")
            .overlapMode_default("stagger")
            .shrinkToFit_default("high")
            .extend_default(0)
        ;
        this.valueAxis = new Axis()
            .orientation_default("left")
            .type_default("linear")
            .shrinkToFit_default("high")
        ;
        var context = this;
        this.xBrush = d3.svg.brush()
            .on("brush", function () {
                return context.brushMoved();
            })
        ;
        this.yBrush = d3.svg.brush()
            .on("brush", function () {
                return context.brushMoved();
            })
        ;
    }
    XYAxis.prototype = Object.create(SVGWidget.prototype);
    XYAxis.prototype.constructor = XYAxis;
    XYAxis.prototype._class += " chart_XYAxis";
    XYAxis.prototype.mixin(Utility.SimpleSelectionMixin);

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
    XYAxis.prototype.publish("xAxisGuideLines", false, "boolean", "Y-Axis Guide Lines");
    XYAxis.prototype.publish("xAxisFocus", false, "boolean", "X-Axis Focus", null, { disable: function (w) { return w.orientation() !== "horizontal"; } });
    XYAxis.prototype.publish("xAxisFocusHeight", 80, "number", "X-Axis Focus Height", null, { disable: function (w) { return !w.xAxisFocus(); } });

    XYAxis.prototype.publishProxy("yAxisTitle", "valueAxis", "title");
    XYAxis.prototype.publishProxy("yAxisTickCount", "valueAxis", "tickCount");
    XYAxis.prototype.publishProxy("yAxisTickFormat", "valueAxis", "tickFormat");
    XYAxis.prototype.publishProxy("yAxisType", "valueAxis", "type");
    XYAxis.prototype.publishProxy("yAxisTypeTimePattern", "valueAxis", "timePattern");
    XYAxis.prototype.publishProxy("yAxisTypePowExponent", "valueAxis", "powExponent");
    XYAxis.prototype.publishProxy("yAxisTypeLogBase", "valueAxis", "logBase");
    XYAxis.prototype.publish("yAxisStacked", false, "boolean", "Stacked Chart", null, { tags: ["Basic"], disable: function (w) { return w.xAxisType() !== "ordinal" || w._class.indexOf("chart_Column") < 0; } });
    XYAxis.prototype.publish("yAxisDomainLow", null, "string", "Y-Axis Low", null, { optional: true, disable: function (w) { return w.yAxisType() === "ordinal"; } });
    XYAxis.prototype.publish("yAxisDomainHigh", null, "string", "Y-Axis High", null, { optional: true, disable: function (w) { return w.yAxisType() === "ordinal"; } });
    XYAxis.prototype.publishProxy("yAxisDomainPadding", "valueAxis", "extend");
    XYAxis.prototype.publish("yAxisGuideLines", true, "boolean", "Y-Axis Guide Lines");

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
        var retVal = this.data().map(function (row) {
            var prevValue = 0;
            return row.map(function (cell, idx) {
                if (idx === 0) {
                    return this.parseData(cell);
                } if (idx >= this.columns().length) {
                    return cell;
                }
                var retVal = this.yAxisStacked() ? [prevValue, prevValue + this.parseValue(cell)] : this.parseValue(cell);
                prevValue += this.parseValue(cell);
                return retVal;
            }, this);
        }, this);
        return retVal;
    };

    XYAxis.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this.svg = element.append("g");
        this.svgRegions = element.append("g");
        this.svgDomainGuide = this.svg.append("g");
        this.svgValueGuide = this.svg.append("g");
        this.svgData = this.svg.append("g");

        this.svgDataClipRect = this.svg.append("clipPath")
            .attr("id", this.id() + "_clippath")
          .append("rect")
            .attr("x", 0)
            .attr("y", 0)
        ;
        this.svgData = this.svg.append("g")
            .attr("clip-path", "url(#" + this.id() + "_clippath)")
        ;
        this._selection.widgetElement(this.svgData);

        this.svgFocus = element.append("g");

        this.domainAxis
            .target(this.svg.node())
            .guideTarget(this.svgDomainGuide.node())
        ;
        this.valueAxis
            .target(this.svg.node())
            .guideTarget(this.svgValueGuide.node())
        ;

        //  Brush  ---
        this.svgBrush = element.append("g")
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
            right: isHorizontal && (this.selectionMode() || this.xAxisFocus()) ? 10 : 2,
            bottom: (this.xAxisFocus() ? this.xAxisFocusHeight() : 0) + 2,
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

        //  Update Range  ---
        var width = this.width() - this.margin.left - this.margin.right;
        if (width < 0) width = 0;
        var height = this.height() - this.margin.top - this.margin.bottom;
        if (height < 0) height = 0;
        var maxCurrExtent = isHorizontal ? width : height;
        var maxOtherExtent = isHorizontal ? height : width;

        //  Render  ---
        this.domainAxis
            .tickLength(this.xAxisGuideLines() ? maxOtherExtent : 0)
            .render()
        ;
        this.valueAxis
            .tickLength(this.yAxisGuideLines() ? maxCurrExtent : 0)
            .render()
        ;

        this.svgDataClipRect
            .attr("width", width)
            .attr("height", height)
        ;
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

        this.updateFocusChart(domNode, element, this.margin, width, height, isHorizontal);
        this.updateChart(domNode, element, this.margin, width, height, isHorizontal, 250);
    };

    XYAxis.prototype.updateFocusChart = function (domNode, element, margin, width, height, isHorizontal) {
        var context = this;
        var focusChart = this.svgFocus.selectAll("#" + this.id() + "_focusChart").data(this.xAxisFocus() ? [true] : []);
        focusChart.enter().append("g")
            .attr("id", this.id() + "_focusChart")
            .each(function (d) {
                context.focusChart = new context.constructor()
                    .target(this)
                ;
                context.focusChart.xBrush
                    .on("brush.focus", function () {
                        syncAxis();
                        context.updateChart(domNode, element, margin, width, height, isHorizontal, 0);
                    })
                ;
            })
        ;
        focusChart
            .each(function (d) {
                context.copyPropsTo(context.focusChart);
                context.focusChart
                    .xAxisFocus(false)
                    .selectionMode(true)
                    .tooltipStyle("none")
                    .orientation("horizontal")
                    .xAxisGuideLines(false)
                    .xAxisDomainLow(null)
                    .xAxisDomainHigh(null)
                    .yAxisGuideLines(false)
                    .x(context.width() / 2)
                    .y(context.height() - context.xAxisFocusHeight() / 2)
                    .width(context.width())
                    .height(context.xAxisFocusHeight())
                    .columns(context.columns())
                    .data(context.data())
                    .render()
                ;
                syncAxis();
            })
        ;
        focusChart.exit()
            .each(function (d) {
                if (context.focusChart) {
                    context.focusChart
                        .target(null)
                    ;
                    delete context.focusChart;
                }
            })
            .remove()
        ;

        function syncAxis() {
            if (context.focusChart.xAxisType() !== "ordinal") {
                context.xAxis.domain(context.focusChart.xBrush.extent());
            } else {
                var brushExtent = context.focusChart.xBrush.extent();
                var brushWidth = brushExtent[1] - brushExtent[0];
                var scale = brushWidth / width;
                context.xAxis.range([-brushExtent[0] / scale, (width - brushExtent[0]) / scale]);
            }
            context.xAxis.svgAxis.call(context.xAxis.d3Axis);
            context.xAxis.svgGuides.call(context.xAxis.d3Guides);
        }
    };

    XYAxis.prototype.updateChart = function (domNode, element, margin, width, height, isHorizontal, duration) {
    };

    XYAxis.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    XYAxis.prototype.selection = function (selected) {
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

        this
            .xAxisGuideLines_default(true)
            .yAxisGuideLines_default(true)
        ;
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

    Scatter.prototype.enter = function (domNode, element) {
        XYAxis.prototype.enter.apply(this, arguments);
        var context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: d.label, series: context.columns()[d.colIdx], value: d.value });
            })
        ;
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
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
                    .call(context._selection.enter.bind(context._selection))
                    .on("click", function (d, idx) {
                        context.click(context.rowToObj(context.data()[d.rowIdx]), context.columns()[d.colIdx], context._selection.selected(this));
                    })
                    .on("dblclick", function (d, idx) {
                        context.dblclick(context.rowToObj(context.data()[d.rowIdx]), context.columns()[d.colIdx], context._selection.selected(this));
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

        this
            .interpolate_default("linear")
            .interpolateFill_default(true)
        ;
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
    Column.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    Column.prototype.enter = function (domNode, element) {
        XYAxis.prototype.enter.apply(this, arguments);
        var context = this;
        this
            .tooltipHTML(function (d) {
                var value = d.row[d.idx];
                if (value instanceof Array) {
                    value = value[1] - value[0];
                }
                return context.tooltipFormat({ label: d.row[0], series: context.columns()[d.idx], value: value });
            })
        ;
    };

    XYAxis.prototype.adjustedData = function () {
        var retVal = this.data().map(function (row) {
            var prevValue = 0;
            return row.map(function (cell, idx) {
                if (idx === 0) {
                    return cell;
                } if (idx >= this.columns().length) {
                    return cell;
                }
                var retVal = this.yAxisStacked() ? [prevValue, prevValue + cell] : cell;
                prevValue += cell;
                return retVal;
            }, this);
        }, this);
        return retVal;
    };

    Column.prototype.updateChart = function (domNode, element, margin, width, height, isHorizontal, duration) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        var dataLen = 10;
        var offset = 0;
        switch (this.xAxisType()) {
            case "ordinal":
                dataLen = this.domainAxis.d3Scale.rangeBand();
                offset = -dataLen / 2;
                break;
            case "linear":
            case "time":
                dataLen = Math.max(Math.abs(this.dataPos(2) - this.dataPos(1)) * (100 - this._linearGap) / 100, dataLen);
                offset = -dataLen/2;
                break;
        }

        var columnScale = d3.scale.ordinal()
            .domain(context.columns().filter(function (d, idx) { return idx > 0; }))
            .rangeRoundBands(isHorizontal ? [0, dataLen] : [dataLen, 0])
        ;

        var column = this.svgData.selectAll(".dataRow")
            .data(this.adjustedData())
        ;

        column.enter().append("g")
            .attr("class", "dataRow")
        ;

        this.tooltip.direction(isHorizontal ? "n" : "e");
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
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
                    .on("click", function (d, idx) {
                        context.click(context.rowToObj(d.row), d.column, context._selection.selected(this));
                    })
                    .on("dblclick", function (d, idx) {
                        context.dblclick(context.rowToObj(d.row), d.column, context._selection.selected(this));
                    })
                ;

                if (isHorizontal) {
                    columnRect.transition().duration(duration)
                        .attr("x", function (d) { return context.dataPos(dataRow[0]) + (context.yAxisStacked() ? 0 : columnScale(d.column)) + offset; })
                        .attr("width", context.yAxisStacked() ? dataLen : columnScale.rangeBand())
                        .attr("y", function (d) { return d.value instanceof Array ? context.valuePos(d.value[1]) : context.valuePos(d.value); })
                        .attr("height", function (d) { return d.value instanceof Array ? context.valuePos(d.value[0]) - context.valuePos(d.value[1]) : height - context.valuePos(d.value); })
                        .style("fill", function (d) { return context._palette(d.column); })
                    ;
                } else {
                    columnRect.transition().duration(duration)
                        .attr("y", function (d) { return context.dataPos(dataRow[0]) + (context.yAxisStacked() ? 0 : columnScale(d.column)) + offset; })
                        .attr("height", context.yAxisStacked() ? dataLen : columnScale.rangeBand())
                        .attr("x", function (d) { return d.value instanceof Array ? context.valuePos(d.value[0]) : 0; })
                        .attr("width", function (d) { return d.value instanceof Array ? context.valuePos(d.value[1]) - context.valuePos(d.value[0]) : context.valuePos(d.value); })
                        .style("fill", function (d) { return context._palette(d.column); })
                    ;
                }

                columnRect.exit().transition().duration(duration)
                    .remove()
                ;
        });

        column.exit().transition().duration(duration)
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

        this
            .orientation_default("vertical")
        ;
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
        Utility.SimpleSelectionMixin.call(this);

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
    Bubble.prototype.mixin(Utility.SimpleSelectionMixin);

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
        this._selection.widgetElement(element);
        var context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: d[0], value: d[1] });
            })
        ;
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
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d), context.columns()[1], context._selection.selected(this));
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("circle")
                    .attr("r", function (d) { return d.r; })
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
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
    };

    return Bubble;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Bullet.js',["d3", "../common/HTMLWidget", "../common/Utility", "d3-bullet", "css!./Bullet"], factory);
    } else {
        root.chart_Bullet = factory(root.d3, root.common_HTMLWidget, root.common_Utility, root.d3.bullet);
    }
}(this, function (d3, HTMLWidget, Utility, D3Bullet) {
    D3Bullet = D3Bullet || d3.bullet || window.d3.bullet;

    function Bullet(target) {
        HTMLWidget.call(this);
        Utility.SimpleSelectionMixin.call(this, true);
    }
    Bullet.prototype = Object.create(HTMLWidget.prototype);
    Bullet.prototype.constructor = Bullet;
    Bullet.prototype._class += " chart_Bullet";

    Bullet.prototype.publish("titleColumn", null, "set", "Title Column", function () { return this.columns(); }, { optional: true });
    Bullet.prototype.publish("subtitleColumn", null, "set", "Subtitle Column", function () { return this.columns(); }, { optional: true });
    Bullet.prototype.publish("rangesColumn", null, "set", "Ranges Column", function () { return this.columns(); }, { optional: true });
    Bullet.prototype.publish("measuresColumn", null, "set", "Measures Column", function () { return this.columns(); }, { optional: true });
    Bullet.prototype.publish("markersColumn", null, "set", "Markers Column", function () { return this.columns(); }, { optional: true });

    Bullet.prototype.bulletData = function () {
        var columns = this.columns();
        return this.data().map(function (row) {
            return {
                title: valueOf(row, this.titleColumn()),
                subtitle: valueOf(row, this.subtitleColumn()),
                ranges: valueOf(row, this.rangesColumn()),
                measures: valueOf(row, this.measuresColumn()),
                markers: valueOf(row, this.markersColumn()),
                origRow: row
            };
        }, this);

        function valueOf(row, column) {
            var colIdx = columns.indexOf(column);
            if (colIdx >= 0) {
                if (row[colIdx] instanceof Array) {
                    return row[colIdx];
                }
                return [row[colIdx]];
            }
            return [];
        }
    };

    Bullet.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        d3.select(domNode.parentNode).style("overflow", "auto");
        this._selection.widgetElement(element);
    };

    Bullet.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        var margin = { top: 8, right: 16, bottom: 20, left: 16 },
        width = this.width() - margin.left - margin.right,
        height = 50 - margin.top - margin.bottom;

        var svg = element.selectAll("svg").data(this.bulletData());
        svg.enter().append("svg")
            .attr("class", "bullet")
            .call(this._selection.enter.bind(this._selection))
            .on("click", function (d) {
                context.click(context.rowToObj(d.origRow), context.titleColumn(), context._selection.selected(this));
            })
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.origRow), context.titleColumn(), context._selection.selected(this));
            })
            .each(function (d) {
                var element = d3.select(this);
                var bulletBar = element.append("g")
                    .attr("class", "bulletBar")
                ;
                var bulletTitle = bulletBar.append("g")
                    .attr("class", "bulletTitle")
                ;
                bulletTitle.append("text")
                  .attr("class", "title")
                ;
                bulletTitle.append("text")
                  .attr("class", "subtitle")
                  .attr("dy", "1em")
                ;
            })
        ;

        //  Title ---
        var title = svg.select(".bulletTitle")
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + height / 2 + ")")
        ;
        title.select(".title")
            .text(function (d) { return d.title; })
        ;
        title.select(".subtitle")
            .text(function (d) { return d.subtitle; })
        ;
        var titleWidth = 0;
        title.each(function () {
            var bbox = this.getBBox();
            if (bbox.width > titleWidth) {
                titleWidth = bbox.width;
            }
        });

        //  Bullet Chart ---
        var chart = new D3Bullet()
            .width(width - titleWidth)
            .height(height)
        ;
        svg
            .attr("width", width)
            .attr("height", height + margin.top + margin.bottom)
        ;
        svg.select(".bulletBar")
            .attr("transform", "translate(" + (titleWidth + margin.left) + "," + margin.top + ")")
            .call(chart)
        ;
        svg.exit().remove();
    };

    Bullet.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    //  Events ---
    Bullet.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    Bullet.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + "," + selected);
    };

    return Bullet;
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

        this
            .orientation_default("vertical")
            .xAxisType_default("ordinal")
            .yAxisType_default("time")
        ;
    }
    Gantt.prototype = Object.create(Bar.prototype);
    Gantt.prototype.constructor = Gantt;
    Gantt.prototype._class += " chart_Gantt";

    return Gantt;
}));



(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/HexBin.js',["d3", "../common/SVGWidget", "./XYAxis", "../api/INDChart", "../api/ITooltip", "../common/Palette", "d3-hexbin", "css!./HexBin"], factory);
    } else {
        root.chart_HexBin = factory(root.d3, root.common_SVGWidget, root.chart_XYAxis, root.api_INDChart, root.api_ITooltip, root.common_Palette);
    }
}(this, function (d3, SVGWidget, XYAxis, INDChart, ITooltip, Palette, D3HexBin) {
    D3HexBin = D3HexBin || d3.hexbin || window.d3.hexbin;

    function HexBin(target) {
        XYAxis.call(this);
        INDChart.call(this);
        ITooltip.call(this);
        this._hexbin = new D3HexBin();

        this
            .xAxisGuideLines_default(false)
            .yAxisGuideLines_default(false)
        ;
    }
    HexBin.prototype = Object.create(XYAxis.prototype);
    HexBin.prototype.constructor = HexBin;
    HexBin.prototype._class += " chart_HexBin";
    HexBin.prototype.implements(INDChart.prototype);
    HexBin.prototype.implements(ITooltip.prototype);

    HexBin.prototype._palette = Palette.rainbow("default");

    HexBin.prototype.publish("paletteID", "Blues", "set", "Palette ID", HexBin.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
    HexBin.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
    HexBin.prototype.publish("binSize", 20, "number", "Bin radius");

    HexBin.prototype.xPos = function (d) {
        return this.orientation() === "horizontal" ? this.dataPos(d.label) : this.valuePos(d.value);
    };

    HexBin.prototype.yPos = function (d) {
        return this.orientation() === "horizontal" ? this.valuePos(d.value) : this.dataPos(d.label);
    };

    HexBin.prototype.updateChart = function (domNode, element, margin, width, height, isHorizontal, duration) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this._hexbin
            .size([width, height])
            .radius(this.binSize())
        ;

        var data = this.flattenData();
        var dataPoints = data.map(function (d, idx) { return [context.xPos(d), context.yPos(d)]; });
        var hexBinPoints = this._hexbin(dataPoints);
        var maxBinPoints = d3.max(hexBinPoints, function (d) { return d.length; });

        var points = this.svgData.selectAll(".hexagon").data(hexBinPoints, function (d, idx) { return d.i + "_" + d.j; });
        points.enter().append("path")
            .attr("class", "hexagon")
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(0)"; })
        ;
        points.transition().duration(duration)
            .attr("d", this._hexbin.hexagon())
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(1)"; })
            .style("fill", function (d) { return context._palette(d.length, 0, maxBinPoints); })
        ;
        points.exit().transition().duration(duration)
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")scale(0)"; })
            .remove()
        ;
    };

    HexBin.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return HexBin;
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

        this
            .interpolate_default("linear")
        ;
    }
    Line.prototype = Object.create(Scatter.prototype);
    Line.prototype.constructor = Line;
    Line.prototype._class += " chart_Line";

    return Line;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/MultiChart',["d3", "../common/HTMLWidget", "../common/Utility", "../api/INDChart"], factory);
    } else {
        root.chart_MultiChart = factory(root.d3, root.common_HTMLWidget, root.common_Utility, root.api_INDChart);
    }
}(this, function (d3, HTMLWidget, Utility, INDChart) {
    function MultiChart() {
        HTMLWidget.call(this);
        INDChart.call(this);

        this._tag = "div";

        this._allCharts = {};
        this._allChartTypes.forEach(function (item) {
            var newItem = JSON.parse(JSON.stringify(item));
            newItem.widget = null;
            this._allCharts[item.id] = newItem;
            this._allCharts[item.display] = newItem;
            this._allCharts[item.widgetClass] = newItem;
        }, this);
        this._chartTypeDefaults = {};
        this._chartTypeProperties = {};
    }
    MultiChart.prototype = Object.create(HTMLWidget.prototype);
    MultiChart.prototype.constructor = MultiChart;
    MultiChart.prototype._class += " chart_MultiChart";
    MultiChart.prototype.implements(INDChart.prototype);

    MultiChart.prototype._1DChartTypes = [
        { id: "C3_GAUGE", display: "Gauge (C3)", widgetClass: "c3chart_Gauge" }
    ].map(function(item) { item.family = "1D"; return item;});
    MultiChart.prototype._2DChartTypes = [
        { id: "SUMMARY", display: "Summary", widgetClass: "chart_Summary" },
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
        { id: "HEXBIN", display: "Hex Bin", widgetClass: "chart_HexBin" },
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
    MultiChart.prototype._mapChartTypes = [
        { id: "CHORO_USSTATES", display: "US State Choropleth", widgetClass: "map_ChoroplethStates" },
        { id: "CHORO_USCOUNTIES", display: "US County Choropleth", widgetClass: "map_ChoroplethCounties" },
        { id: "CHORO_COUNTRIES", display: "Country Choropleth", widgetClass: "map_ChoroplethCountries" },
        { id: "GOOGLE_MAP", display: "Google Map", widgetClass: "map_GMapLayered" },
        { id: "OPENSTREET", display: "Open Street Map", widgetClass: "map_OpenStreet" }
    ].map(function (item) { item.family = "map"; return item; });
    MultiChart.prototype._anyChartTypes = [
        { id: "TABLE", display: "Table", widgetClass: "other_Table" },
        { id: "TABLE_NESTED", display: "Nested Table", widgetClass: "other_NestedTable" },
        { id: "TABLE_CALENDAR", display: "Table driven Calendar Heat Map", widgetClass: "other_CalendarHeatMap" },
        { id: "TABLE_BULLET", display: "Table driven bullet chart", widgetClass: "chart_Bullet" },
        { id: "TABLE_SELECT", display: "Table driven select", widgetClass: "other_Select" },
        { id: "TABLE_AUTOCOMPLETE", display: "Table driven auto complete", widgetClass: "other_AutoCompleteText" },
        { id: "TABLE_TREE", display: "Table driven tree", widgetClass: "tree_Dendrogram" },
        { id: "TABLE_TREEMAP", display: "Table driven Treemap", widgetClass: "tree_Treemap" },
        { id: "TABLE_SANKEY", display: "Table driven Sankey", widgetClass: "graph_Sankey" },
        { id: "TABLE_GMAP_PIN", display: "Table driven Google Map (pins)", widgetClass: "map_GMapPin" },
        { id: "TABLE_GMAP_PINLINE", display: "Table driven Google Map (pins/lines)", widgetClass: "map_GMapPinLine" }
    ].map(function (item) { item.family = "any"; return item; });
    MultiChart.prototype._allChartTypes =
        MultiChart.prototype._1DChartTypes.concat(
        MultiChart.prototype._2DChartTypes.concat(
        MultiChart.prototype._NDChartTypes.concat(
        MultiChart.prototype._mapChartTypes.concat(
        MultiChart.prototype._anyChartTypes
    ))));
    MultiChart.prototype._allMap = d3.map(MultiChart.prototype._allChartTypes, function (item) { return item.family; });
    MultiChart.prototype._allFamilies = MultiChart.prototype._allMap.keys();
    MultiChart.prototype._allChartTypesMap = {};
    MultiChart.prototype._allChartTypesByClass = {};
    MultiChart.prototype._allChartTypes.forEach(function (item) {
        item.widgetPath = Utility.widgetPath(item.widgetClass);
        MultiChart.prototype._allChartTypesMap[item.id] = item;
        MultiChart.prototype._allChartTypesByClass[item.widgetClass] = item;
    }, this);

    MultiChart.prototype.publishReset();
    MultiChart.prototype.publish("chartType", "BUBBLE", "set", "Chart Type", MultiChart.prototype._allChartTypes.map(function (item) { return item.id; }),{tags:["Basic"]});
    MultiChart.prototype.publish("chart", null, "widget", "Chart",null,{tags:["Basic"]});

    MultiChart.prototype.fields = function (_) {
        var retVal = HTMLWidget.prototype.fields.apply(this, arguments);
        if (this.chart()) {
            if (!arguments.length) return this.chart().fields();
            this.chart().fields(_);
        }
        return retVal;
    };

    MultiChart.prototype.columns = function (_) {
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        if (this.chart()) {
            if (!arguments.length) return this.chart().columns();
            this.chart().columns(_);
        }
        return retVal;
    };

    MultiChart.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (this.chart()) {
            if (!arguments.length) return this.chart().data();
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
                context.click.apply(context, arguments);
            };
            _.dblclick = function (row, column, selected) {
                context.dblclick.apply(context, arguments);
            };
            if (this._chartMonitor) {
                this._chartMonitor.remove();
                delete this._chartMonitor;
            }
            this._chartMonitor = _.monitor(function (key, newVal, oldVal) {
                context.broadcast(key, newVal, oldVal, _);
            });
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

    MultiChart.prototype.chartTypeDefaults = function (_) {
        if (!arguments.length) return this._chartTypeDefaults;
        this._chartTypeDefaults = _;
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
        HTMLWidget.prototype.update.apply(this, arguments);
        var content = element.selectAll(".multiChart").data(this.chart() ? [this.chart()] : [], function (d) { return d._id; });
        content.enter().append("div")
            .attr("class", "multiChart")
            .each(function (d) {
                d.target(this);
            })
        ;

        var currChart = this.chart();
        if (currChart) {
            for (var key in this._chartTypeDefaults) {
                if (currChart[key + "_default"]) {
                    try {
                        currChart[key + "_default"](this._chartTypeDefaults[key]);
                    } catch (e) {
                        console.log("Exception Setting Default:  " + key);
                    }
                } else {
                    console.log("Unknown Default:  " + key);
                }
            }
            this._chartTypeDefaults = {};
            for (var propKey in this._chartTypeProperties) {
                if (currChart[propKey]) {
                    try {
                        currChart[propKey](this._chartTypeProperties[propKey]);
                    } catch (e) {
                        console.log("Exception Setting Property:  " + propKey);
                    }
                } else {
                    console.log("Unknown Property:  " + propKey);
                }
            }
            this._chartTypeProperties = {};
        }

        var context = this;
        content
            .each(function (d) { d.resize(context.size()); })
        ;

        content.exit().transition()
            .each(function (d) { d.target(null); })
            .remove()
        ;
    };

    MultiChart.prototype.exit = function (domNode, element) {
        if (this._chartMonitor) {
            this._chartMonitor.remove();
            delete this._chartMonitor;
        }
        if (this.chart()) {
            this.chart().target(null);
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };


    MultiChart.prototype.render = function (callback) {
        if (this.chartType() && (!this.chart() || (this.chart().classID() !== this._allCharts[this.chartType()].widgetClass))) {
            var context = this;
            var args = arguments;
            this.switchChart(function () {
                HTMLWidget.prototype.render.apply(context, args);
            });
            return this;
        }
        return HTMLWidget.prototype.render.apply(this, arguments);
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
        Utility.SimpleSelectionMixin.call(this);

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
        this
            .tooltipTick_default(false)
            .tooltipOffset_default(0)
        ;
    }
    Pie.prototype = Object.create(SVGWidget.prototype);
    Pie.prototype.constructor = Pie;
    Pie.prototype._class += " chart_Pie";
    Pie.prototype.implements(I2DChart.prototype);
    Pie.prototype.implements(ITooltip.prototype);
    Pie.prototype.mixin(Utility.SimpleSelectionMixin);

    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});
    Pie.prototype.publish("outerText", false, "boolean", "Sets label position inside or outside chart",null,{tags:["Basic"]});
    Pie.prototype.publish("innerRadius", 0, "number", "Sets inner pie hole radius as a percentage of the radius of the pie chart",null,{tags:["Basic"]});

    Pie.prototype.pointInArc = function (pt, ptData) {
        var r1 = this.d3Arc.innerRadius()(ptData),
            r2 = this.d3Arc.outerRadius()(ptData),
            theta1 = this.d3Arc.startAngle()(ptData),
            theta2 = this.d3Arc.endAngle()(ptData);

        var dist = pt.x * pt.x + pt.y * pt.y,
            angle = Math.atan2(pt.x, -pt.y);

        angle = (angle < 0) ? (angle + Math.PI * 2) : angle;

        return (r1 * r1 <= dist) && (dist <= r2 * r2) && (theta1 <= angle) && (angle <= theta2);
    };

    Pie.prototype.boxInArc = function (pos, bb, ptData) {
        var topLeft = { x: pos.x + bb.x, y: pos.y + bb.y };
        var topRight = { x: topLeft.x + bb.width, y: topLeft.y };
        var bottomLeft = { x: topLeft.x, y: topLeft.y + bb.height };
        var bottomRight = { x: topLeft.x + bb.width, y: topLeft.y + bb.height };
        return this.pointInArc(topLeft, ptData) && this.pointInArc(topRight, ptData) && this.pointInArc(bottomLeft, ptData) && this.pointInArc(bottomRight, ptData);
    };

    Pie.prototype.calcRadius = function (_) {
        return Math.min(this._size.width, this._size.height) / 2 - 2;
    };

    Pie.prototype.intersection = function (pointA, pointB) {
        return this.intersectCircle(pointA, pointB);
    };

    Pie.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._selection.widgetElement(element);
        var context = this;
        this
            .tooltipHTML(function (d) {
                return context.tooltipFormat({ label: d.data[0], value: d.data[1] });
            })
        ;
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
            .on("dblclick", function (d) {
                context.dblclick(context.rowToObj(d.data), context.columns()[1], context._selection.selected(this));
            })
            .each(function (d) {
                var element = d3.select(this);
                element.append("path")
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
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
                        .style("opacity", (context.outerText() || context.boxInArc(pos, context.labelWidgets[d.data[0]].getBBox(), d)) ? null : 0)
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

        this
            .interpolate_default("step")
        ;
    }
    Step.prototype = Object.create(Scatter.prototype);
    Step.prototype.constructor = Step;
    Step.prototype._class += " chart_Step";

    return Step;
}));




(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('chart/Summary.js',["d3", "../common/HTMLWidget", "../api/I2DChart", "css!font-awesome", "css!./Summary"], factory);
    } else {
        root.chart_Summary = factory(root.d3, root.common_HTMLWidget, root.api_I2DChart);
    }
}(this, function (d3, HTMLWidget, I2DChart) {
    var TEXT = "text";
    var HTML = "html";

    function Summary() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._drawStartPos = "center";
        this.playInterval(this.playInterval());
        this._playIntervalIdx = 0;
    }
    Summary.prototype = Object.create(HTMLWidget.prototype);
    Summary.prototype.constructor = Summary;
    Summary.prototype.implements(I2DChart.prototype);
    Summary.prototype._class += " chart_Summary";

    Summary.prototype.publish("iconColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
    Summary.prototype.publish("icon", "fa-briefcase", "string", "FA Char icon class", null, { disable: function (w) { return w.iconColumn(); } });
    Summary.prototype.publish("labelColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
    Summary.prototype.publish("labelHTML", false, "boolean", "Allow HTML", null);
    Summary.prototype.publish("valueColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
    Summary.prototype.publish("valueHTML", false, "boolean", "Allow HTML");
    Summary.prototype.publish("moreTextColumn", null, "set", "Select display value", function () { return this.columns(); }, { optional: true });
    Summary.prototype.publish("moreText", "More Info", "string", "More text", null, { disable: function (w) { return w.moreTextColumn(); } });
    Summary.prototype.publish("moreTextHTML", false, "boolean", "Allow HTML");
    Summary.prototype.publish("moreIcon", "fa-info-circle", "string", "FA Char icon class");
    Summary.prototype.publish("colorFillColumn", null, "set", "Column for color", function () { return this.columns(); }, { optional: true });
    Summary.prototype.publish("colorFill", "#3498db", "html-color", "Fill Color", null, { disable: function (w) { return w.colorFillColumn(); } });
    Summary.prototype.publish("colorStrokeColumn", null, "set", "Column for color", function () { return this.columns(); }, { optional: true });
    Summary.prototype.publish("colorStroke", "#ffffff", "html-color", "Fill Color", null, { disable: function (w) { return w.colorStrokeColumn(); } });
    Summary.prototype.publish("fixedSize", true, "boolean", "Fix Size to Min Width/Height");
    Summary.prototype.publish("minWidth", 225, "number", "Minimum Width");
    Summary.prototype.publish("minHeight", 150, "number", "Minimum Height");
    Summary.prototype.publish("playInterval", null, "number", "Play Interval", null, { optional: true });

    var playInterval = Summary.prototype.playInterval;
    Summary.prototype.playInterval = function (_) {
        var retVal = playInterval.apply(this, arguments);
        if (arguments.length) {
            if (this._playIntervalHandle) {
                clearInterval(this._playIntervalHandle);
            }
            var context = this;
            if (_) {
                this._playIntervalHandle = setInterval(function () {
                    context._playIntervalIdx++;
                    if (context._renderCount && context.data().length) {
                        context.render();
                    }
                }, _);
            }
        }
        return retVal;
    };

    Summary.prototype.summaryData = function () {
        var labelFieldIdx = 0;
        if (this.labelColumn_exists()) {
            labelFieldIdx = this.columns().indexOf(this.labelColumn());
        }
        var iconFieldIdx;  //  undefined
        if (this.iconColumn_exists()) {
            iconFieldIdx = this.columns().indexOf(this.iconColumn());
        }
        var valueFieldIdx = 1;
        if (this.valueColumn_exists()) {
            valueFieldIdx = this.columns().indexOf(this.valueColumn());
        }
        var moreTextIdx;  //  undefined
        if (this.moreTextColumn_exists()) {
            moreTextIdx = this.columns().indexOf(this.moreTextColumn());
        }
        var colorFillIdx;  //  undefined
        if (this.colorFillColumn_exists()) {
            colorFillIdx = this.columns().indexOf(this.colorFillColumn());
        }
        var colorStrokeIdx;  //  undefined
        if (this.colorStrokeColumn_exists()) {
            colorStrokeIdx = this.columns().indexOf(this.colorStrokeColumn());
        }
        return this.formattedData().map(function (row) {
            return {
                icon: iconFieldIdx === undefined ? this.icon() : row[iconFieldIdx],
                label: row[labelFieldIdx],
                value: row[valueFieldIdx],
                more: moreTextIdx === undefined ? this.moreText() : row[moreTextIdx],
                fill: colorFillIdx === undefined ? this.colorFill() : row[colorFillIdx],
                stroke: colorStrokeIdx === undefined ? this.colorStroke() : row[colorStrokeIdx]
            };
        }, this);
    };


    Summary.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._mainDiv = element.append("div")
        ;
        var context = this;
        this._headerDiv = this._mainDiv.append("h2")
            .on("click", function (d) {
                context.click(context.data()[context._playIntervalIdx], context.columns()[1], true);
            })
            .on("dblclick", function (d) {
                context.dblclick(context.data()[context._playIntervalIdx], context.columns()[1], true);
            })
        ;
        this._textDiv = this._mainDiv.append("div")
            .attr("class", "text")
            .on("click", function (d) {
                context.click(context.data()[context._playIntervalIdx], context.columns()[1], true);
            })
            .on("dblclick", function (d) {
                context.dblclick(context.data()[context._playIntervalIdx], context.columns()[1], true);
            })
        ;
    };

    Summary.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        if (this.data().length) {

        }
        var data = this.summaryData();
        if (this._playIntervalIdx >= data.length) {
            this._playIntervalIdx = 0;
        }
        var row = this._playIntervalIdx < data.length ? data[this._playIntervalIdx] : ["", ""];
        element
            .style({
                width: this.fixedSize() ? this.minWidth_exists() ? this.minWidth() + "px" : null : "100%",
                height: this.fixedSize() ? this.minHeight_exists() ? this.minHeight() + "px" : null : "100%"
            })
        ;
        this._mainDiv
            .attr("class", "content bgIcon " + row.icon)
            .transition()
            .style({
                "background-color": row.fill,
                "color": row.stroke,
                "min-width": this.minWidth_exists() ? this.minWidth() + "px" : null,
                "min-height": this.minHeight_exists() ? this.minHeight() + "px" : null
            })
        ;
        this._headerDiv
            .transition()
            .style("color", row.stroke)
            [this.valueHTML() ? HTML : TEXT](row.value)
        ;
        this._textDiv
            [this.valueHTML() ? HTML : TEXT](row.label)
        ;
        var context = this;
        var moreDivs = this._mainDiv.selectAll(".more").data([row.more]);
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
            .transition()
            .style("background-color", d3.rgb(row.fill).darker(0.75))
        ;
        moreDivs.select("i")
            .attr("class", "fa " + this.moreIcon())
        ;
        moreDivs.select("span")
            [this.moreTextHTML() ? HTML : TEXT](function (d) { return d; })
        ;
        moreDivs.exit().remove();
    };

    Summary.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    return Summary;
}));

