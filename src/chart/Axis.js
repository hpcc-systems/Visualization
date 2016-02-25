"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/Utility", "css!./Axis"], factory);
    } else {
        root.chart_Axis = factory(root.d3, root.common_SVGWidget, root.common_Utility);
    }
}(this, function (d3, SVGWidget, Utility) {
    function Axis() {
        SVGWidget.call(this);
        this._drawStartPos = "origin";

        this.d3Axis = d3.svg.axis();

        this
            .type("linear")
            .timePattern(this.timePattern())
        ;
    }
    Axis.prototype = Object.create(SVGWidget.prototype);
    Axis.prototype.constructor = Axis;
    Axis.prototype._class += " chart_Axis";

    Axis.prototype.publish("title", "", "string", "Title");
    Axis.prototype.publish("orientation", "bottom", "set", "Orientation", ["left", "top", "right", "bottom"]);
    Axis.prototype.publish("type", "ordinal", "set", "Type", ["none", "ordinal", "linear", "pow", "log", "time"]);
    Axis.prototype.publish("timePattern", "%Y-%m-%d", "string", "Time Series Pattern", null, { disable: function (w) { return w.type() !== "time"; } });
    Axis.prototype.publish("powExponent", 2, "number", "Exponent for Pow on Value Axis", null, { disable: function (w) { return w.type() !== "pow"; } });
    Axis.prototype.publish("logBase", 10, "number", "Base for log on Value Axis", null, { disable: function (w) { return w.type() !== "log"; } });
    Axis.prototype.publish("ordinals", [], "array", "Ordinal Values", null, { disable: function (w) { return w.type() !== "ordinal"; } });
    Axis.prototype.publish("tickCount", null, "number", "Tick Count", null, { optional: true, disable: function (w) { return w.type() === "ordinal"; } });
    Axis.prototype.publish("tickFormat", null, "string", "Tick Format", null, { optional: true, disable: function (w) { return w.type() === "ordinal"; } });
    Axis.prototype.publish("low", null, "any", "Low", null, { optional: true, disable: function (w) { return w.type() === "ordinal"; } });
    Axis.prototype.publish("high", null, "any", "High", null, { optional: true, disable: function (w) { return w.type() === "ordinal"; } });
    Axis.prototype.publish("overlapMode", "none", "set", "Label Overlap Mode", ["none", "stagger", "hide", "rotate"]);
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

    Axis.prototype.range = function (range) {
        if (this.d3Scale.rangeRoundBands) {
            this.d3Scale.rangeRoundBands(range, 0.1);
        } else if (this.d3Scale.rangeRound) {
            this.d3Scale.range(range);
        }
    };

    Axis.prototype.invert = function (pos) {
        return this.d3Scale.invert(pos);
    };

    Axis.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this.svg = element.append("g");
        this.svgText = this.svg.append("text");
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
                    var length, delta, newLow, newHigh;
                    if (this.isHorizontal()) {
                        length = this.width();
                        this.d3Scale.range([0, length]);
                        delta = length * this.extend() / 100;
                        newLow = this.d3Scale.invert(-delta);
                        newHigh = this.d3Scale.invert(length + delta);
                    } else {
                        length = this.height();
                        this.d3Scale.range([length, 0]);
                        delta = length * this.extend() / 100;
                        newLow = this.d3Scale.invert(length + delta);
                        newHigh = this.d3Scale.invert(-delta);
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
    };

    Axis.prototype.adjustText = function (svg, tickOverlapModulus) {
        var isHoriztontal = this.isHorizontal();
        var isLeft = this.orientation() === "left";
        var isBottom = this.orientation() === "bottom";
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

    Axis.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        var overlap = this.calcOverflow(element);

        this.range(this.isHorizontal() ? [overlap.left, this.width() - overlap.right] : [this.height() - overlap.top - overlap.bottom, 0]);

        var context = this;
        this.svg
            .call(this.d3Axis)
            .transition()
            .attr("class", this.isHorizontal() ? "x" : "y")
            .attr("transform", function (d) {
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
            })
            .style("visibility", this.type() === "none" ? "hidden" : null)
        ;
        this.adjustText(this.svg, overlap.tickOverlapModulus);

        var svgLine = this.svg.select("path.domain");
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
    };

    return Axis;
}));
