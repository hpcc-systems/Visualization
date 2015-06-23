"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../api/IInput", "../common/Icon", "css!./Slider"], factory);
    } else {
        root.other_Slider = factory(root.d3, root.common_SVGWidget, root.api_IInput, root.common_Icon);
    }
}(this, function (d3, SVGWidget, IInput, Icon) {
    function Slider() {
        SVGWidget.call(this);
        IInput.call(this);

        this._dateFormatter = d3.time.format("%Y-%m-%d");
        this._dateParser = this._dateFormatter.parse;

        this.selectionLabel("");
        this._playing = false;
        this._loop = false;

        var context = this;
        this._playIcon = new Icon()
            .faChar("\uf04b")
        ;
        this._playIcon.click = function (d) {
            d3.event.stopPropagation();
            if (context._playing) {
                context.pause();
            } else {
                context.play();
            }
        };

        this._loopIcon = new Icon()
            .faChar("\uf01e")
            .image_colorFill(this._loop ? null : "#bbb")
            .shape_colorFill(this._loop ? null : "white")
            .paddingPercent(33)
        ;
        this._loopIcon.click = function (d) {
            if (context._loop) {
                context._loop = false;
            } else {
                context._loop = true;
            }
            context._loopIcon
                .image_colorFill(context._loop ? null : "#bbb")
                .shape_colorFill(context._loop ? null : "white")
                .render()
            ;
        };

        this.brush = d3.svg.brush()
            .on("brushstart", function (d) { context.brushstart(this); })
            .on("brush", function (d) { context.brushmove(this); })
            .on("brushend", function (d) { context.brushend(this); })
        ;

        this.brush.empty = function () {
            return false;
        };

        this.axis = d3.svg.axis()
              .orient("bottom")
              .tickSize(0)
              .tickPadding(12)
        ;
    }
    Slider.prototype = Object.create(SVGWidget.prototype);
    Slider.prototype._class += " other_Slider";
    Slider.prototype.implements(IInput.prototype);

    Slider.prototype.publish("sampleData", "", "set", "Display Sample Data", ["", "linear", "linear range", "time", "time range"]);

    Slider.prototype.publish("padding", 16, "number", "Outer Padding", null, { tags: ["Basic"] });
    Slider.prototype.publish("fontSize", null, "number", "Font Size", null, { tags: ["Basic"] });
    Slider.prototype.publish("fontFamily", null, "string", "Font Name", null, { tags: ["Basic"] });
    Slider.prototype.publish("fontColor", null, "html-color", "Font Color", null, { tags: ["Basic"] });

    Slider.prototype.publish("axisType", "linear", "set", "Axis Type", ["linear", "time"]);
    Slider.prototype.publish("timeseriesPattern", "%Y-%m-%d", "string", "Time Series Pattern");
    Slider.prototype.publish("allowRange", false, "boolean", "Allow Range Selection", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("low", 0, "string", "Low", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("high", 100, "string", "High", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("step", 10, "string", "Step", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("selectionLabel", "", "string", "Selection Label", null, { tags: ["Intermediate"] });

    Slider.prototype.publish("showPlay", false, "boolean", "Show Play Button");
    Slider.prototype.publish("playInterval", 1000, "number", "Play Interval");
    Slider.prototype.publishProxy("playDiameter", "_playIcon", "diameter", 32);
    Slider.prototype.publish("playGutter", 12, "number", "Play Gutter");
    Slider.prototype.publishProxy("loopDiameter", "_loopIcon", "diameter", 24);
    Slider.prototype.publish("loopGutter", 4, "number", "Play Gutter");

    Slider.prototype._sampleData = Slider.prototype.sampleData;
    Slider.prototype.sampleData = function (_) {
        var retVal = Slider.prototype._sampleData.apply(this, arguments);
        if (arguments.length) {
            switch (_) {
                case "linear":
                    this.testDataLinear(false);
                    break;
                case "linear range":
                    this.testDataLinear(true);
                    break;
                case "time":
                    this.testDataTime(false);
                    break;
                case "time range":
                    this.testDataTime(true);
                    break;
            }
        }
        return retVal;
    };

    Slider.prototype.testData = function (_) {
        this.sampleData("linear");
        return this;
    };

    Slider.prototype.testDataLinear = function (allowRange) {
        this
            .allowRange(allowRange)
            .name("Year")
            .axisType("linear")
            .low(100)
            .high(200)
            .step(10)
            .value(allowRange ? [this.low(), this.low()] : this.low())
        ;
        return this;
    };

    Slider.prototype.testDataTime = function (allowRange) {
        this
            .allowRange(allowRange)
            .name("Percent")
            .axisType("time")
            .low("1999-07-03")
            .high("1999-07-12")
            .value(allowRange ? [this.low(), this.low()] : this.low())
        ;
        return this;
    };

    Slider.prototype._origName = Slider.prototype.name;
    Slider.prototype.name = function (_) {
        Slider.prototype._origName.apply(this, arguments);
        if (!arguments.length) {
            return Slider.prototype.columns.apply(this)[0];
        }
        return Slider.prototype.columns.call(this, [_]);
    };

    Slider.prototype._origValue = Slider.prototype.value;
    Slider.prototype.value = function (_) {
        Slider.prototype._origValue.apply(this, arguments);
        if (!arguments.length) {
            return Slider.prototype.data.apply(this, arguments)[0][0];
        }
        return Slider.prototype.data.call(this, [[_]]);
    };

    Slider.prototype._origtimeseriesPattern = Slider.prototype.timeseriesPattern;
    Slider.prototype.timeseriesPattern = function (_) {
        var retVal = Slider.prototype._origtimeseriesPattern.apply(this, arguments);
        if (arguments.length) {
            this._dateFormatter = d3.time.format(_);
            this._dateParser = this._dateFormatter.parse;
        }
        return retVal;
    };

    Slider.prototype.toInternalValue = function (value) {
        switch (this.axisType()) {
            case "time":
                if (value instanceof Array) {
                    return value.map(function (item) {
                        return this._dateParser(item);
                    }, this);
                }
                return this._dateParser(value);
        }
        if (value instanceof Array) {
            return value.map(function (item) {
                return parseFloat(item);
            }, this);
        }
        return parseFloat(value);
    };

    Slider.prototype.fromInternalValue = function (internalValue) {
        switch (this.axisType()) {
            case "time":
                return this._dateFormatter(new Date(internalValue));
        }
        return internalValue;
    };

    Slider.prototype.lowInternalValue = function () {
        return this.toInternalValue(this.low());
    };

    Slider.prototype.highInternalValue = function () {
        return this.toInternalValue(this.high());
    };

    Slider.prototype.internalValue = function () {
        return this.toInternalValue(this.value());
    };

    Slider.prototype.play = function () {
        this._playing = true;
        this._playIcon
            .faChar("\uf04c")
            .render()
        ;
        var tick = this.data();
        if (tick < this.lowInternalValue() || tick >= this.highInternalValue()) {
            tick = this.lowInternalValue();
            this
                .data(tick)
                .render()
            ;
        }
        var context = this;
        this.intervalHandler = setInterval(function () {
            tick += context.step();
            if (tick > context.highInternalValue()) {
                if (context._loop === true) {
                    tick = context.lowInternalValue();
                    context
                        .data(tick)
                        .render()
                    ;
                } else {
                    context.pause();
                }
            } else {
                context
                    .data(tick)
                    .render()
                ;
            }
        }, context.playInterval());
    };

    Slider.prototype.pause = function () {
        this._playing = false;
        this._playIcon
            .faChar("\uf04b")
            .render()
        ;
        clearInterval(this.intervalHandler);
    };

    Slider.prototype.enter = function (domNode, element) {
        this.sliderElement = element.append("g");
        this.axisElement = this.sliderElement.append("g")
            .attr("class", "x axis")
        ;

        this.brushg = this.sliderElement.append("g")
            .attr("class", "brush")
            .call(this.brush)
        ;

        this.brushg.select(".background")
            .attr("y", -9)
            .attr("height", 18)
        ;

        this.brushg.select(".extent")
            .attr("y", "-10")
            .attr("height", "20")
        ;

        this.brushg.selectAll(".resize").select("rect")
            .attr("x", function (d) { return d === "e" ? 0 : -8; })
            .attr("y", "-10")
            .attr("width", "8")
            .attr("height", "20")
        ;

        this.handle = this.brushg.selectAll(".resize").append("path")
            .attr("class", "handle")
            .attr("transform", "translate(0,-27)")
        ;

        this._playIcon
            .target(this.sliderElement.node())
            .render()
        ;

        this._loopIcon
            .target(this.sliderElement.node())
            .render()
        ;
    };

    Slider.prototype.calcDelta = function (domNode, element, leftPos, width) {
        var axisElement = element.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0, -64)")
             .call(this.axis)
        ;
        axisElement.selectAll('.tick > text')
            .style('fill', this.fontColor())
            .style('font-size', this.fontSize())
            .style('font-family', this.fontFamily())
        ;
        var x_bbox = axisElement.node().getBBox();
        var retVal = {
            left: x_bbox.x - leftPos,
            right: x_bbox.x - leftPos + x_bbox.width - width
        };
        axisElement.remove();
        return retVal;
    };

    Slider.prototype.update = function (domNode, element) {
        var context = this;
        if (this._prevAxisType !== this.axisType()) {
            this._prevAxisType = this.axisType();
            switch (this.axisType()) {
                case "linear":
                    this.dataScale = d3.scale.linear()
                        .clamp(true)
                    ;
                    break;
                case "time":
                    this.dataScale = d3.time.scale()
                        .clamp(true)
                    ;
                    //this.dataScale.ticks(d3.time.day);
                    break;
            }

            this.axis
                .scale(this.dataScale)
            ;

            this.brush
                .x(this.dataScale)
            ;
        }

        var leftPos = -this.width() / 2 + this.padding();
        var width = this.width() - this.padding() * 2;

        this._playIcon
            .pos({ x: width / 2 - (this.loopDiameter() + this.loopGutter() + this.playDiameter() / 2), y: 0 })
            .diameter(this.playDiameter())
            .display(this.showPlay())
            .render()
        ;

        this._loopIcon
            .pos({ x: width / 2 - (this.loopDiameter() / 2), y: 0 })
            .diameter(this.loopDiameter())
            .display(this.showPlay())
            .render()
        ;

        //if ((this.high() - this.low()) / this.step() <= 10) {
        //    this.axis.tickValues(d3.merge([d3.range(this.low(), this.high(), this.step()), [this.high()]]));
        //} else {
        //    this.axis.tickValues(null);
        //}

        width -= this.showPlay() ? this.loopDiameter() + this.loopGutter() + this.playDiameter() + this.playGutter() : 0;
        this.dataScale
            .domain([this.lowInternalValue(), this.highInternalValue()])
            .range([leftPos, leftPos + width])
        ;
        var delta = this.calcDelta(domNode, element, leftPos, width);
        this.dataScale
            .range([leftPos - delta.left, leftPos + width - delta.right])
        ;
        this.axisElement
            .call(this.axis)
        ;

        this.axisElement.selectAll('.tick > text')
            .style('fill', this.fontColor())
            .style('font-size', this.fontSize())
            .style('font-family', this.fontFamily())
        ;

        var range = this.dataScale.range();
        this.brushg.select(".background")
            .attr("x", range[0])
            .attr("width", range[1] - range[0])
        ;

        this.handle
            .attr("d", function (d) { return context.handlePath(d); })
        ;

        this.brushg
            .call(this.brush.extent(this.allowRange() ? this.internalValue() : [this.internalValue(), this.internalValue()]))
        ;

        var bbox = this.sliderElement.node().getBBox();
        this.sliderElement.attr("transform", "translate(0, " + -(bbox.y + bbox.height / 2) + ")");
    };

    Slider.prototype.mouseInternalValue = function (node) {
        var mousePos = d3.mouse(node)[0];
        return this.dataScale.invert(mousePos);
    };

    Slider.prototype.mouseValue = function (node) {
        return this.fromInternalValue(this.mouseInternalValue(node));
    };

    Slider.prototype.brushstart = function (node) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
    };

    Slider.prototype.brushmove = function (node) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
        if (!this.allowRange()) {
            //  Foce low/highThumb to work as one  ---
            var mouseInternalValue = this.nearestStep(this.mouseInternalValue(node));
            var formattedValue = this.toInternalValue(this.fromInternalValue(mouseInternalValue));
            d3.select(node)
                .call(this.brush.extent([formattedValue, formattedValue]))
            ;
        }
    };

    Slider.prototype.brushend = function (node) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
        if (!this.allowRange()) {
            var mouseInternalValue = this.nearestStep(this.mouseInternalValue(node));
            this.value(this.fromInternalValue(mouseInternalValue));
            d3.select(node)
                .call(this.brush.extent([this.internalValue(), this.internalValue()]))
            ;
        } else {
            var extent = this.brush.extent();
            extent[0] = this.nearestStep(extent[0]);
            extent[1] = this.nearestStep(extent[1]);
            this.value([this.fromInternalValue(extent[0]), this.fromInternalValue(extent[1])]);
            d3.select(node)
                .call(this.brush.extent(this.internalValue()))
            ;
        }
        if (this.selectionLabel()) {
            var clickData = {};
            clickData[this.selectionLabel()] = this.value();
            this.click(clickData);
        } else {
            this.click(this.value());
        }
    };

    Slider.prototype.nearestStep = function (value) {
        if (this.axisType() === "time") {
            return value.setHours(value.getHours() + 12);  //  Nearest day  ---
        }
        return this.lowInternalValue() + Math.round((value - this.lowInternalValue()) / this.step()) * this.step();
    };

    Slider.prototype.handlePath = function (d, i) {
        var e = +(d === "e");
        var x = e ? 1 : -1;
        var xOffset = this.allowRange() ? 0.5 : 0.0;
        var y = 18;
        var retVal = "M" + (xOffset * x) + "," + y +
            "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) +
            "V" + (2 * y - 6) +
            "A6,6 0 0 " + e + " " + (xOffset * x) + "," + (2 * y)
        ;
        if (this.allowRange()) {
            retVal += "Z" +
                "M" + (2.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8) +
                "M" + (4.5 * x) + "," + (y + 8) +
                "V" + (2 * y - 8)
            ;
        } else {
            retVal += "M" + (1 * x) + "," + (y + 8) +
                "V" + (2 * y - 8)
            ;
        }
        return retVal;
    };

    return Slider;
}));
