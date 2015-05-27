"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "./ISlider", "../common/Icon", "css!./Slider"], factory);
    } else {
        root.other_Slider = factory(root.d3, root.common_SVGWidget, root.other_ISlider, root.common_Icon);
    }
}(this, function (d3, SVGWidget, ISlider, Icon) {
    function Slider() {
        SVGWidget.call(this);
        ISlider.call(this);

        this.selectionLabel("");
        this._playing = false;
        this._loop = false;

        this.xScale = d3.scale.linear()
            .clamp(true)
        ;

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
            .x(this.xScale)
            .extent([0, 0])
            .on("brushstart", function (d) { context.brushstart(d, this); })
            .on("brush", function (d) { context.brushmove(d, this); })
            .on("brushend", function (d) { context.brushend(d, this); })
        ;
        this.brush.empty = function () {
            return false;
        };

        this.axis = d3.svg.axis()
              .scale(this.xScale)
              .orient("bottom")
              .tickValues(null)
              .tickFormat(function (d) { return d; })
              .tickSize(0)
              .tickPadding(12)
        ;
    }
    Slider.prototype = Object.create(SVGWidget.prototype);
    Slider.prototype._class += " other_Slider";
    Slider.prototype.implements(ISlider.prototype);

    Slider.prototype.publish("padding", 16, "number", "Outer Padding", null, { tags: ["Basic"] });
    Slider.prototype.publish("fontSize", null, "number", "Font Size", null, { tags: ["Basic"] });
    Slider.prototype.publish("fontFamily", null, "string", "Font Name", null, { tags: ["Basic"] });
    Slider.prototype.publish("fontColor", null, "html-color", "Font Color", null, { tags: ["Basic"] });

    Slider.prototype.publish("allowRange", false, "boolean", "Allow Range Selection", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("low", 0, "number", "Low", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("high", 100, "number", "High", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("step", 10, "number", "Step", null, { tags: ["Intermediate"] });
    Slider.prototype.publish("selectionLabel", "", "string", "Selection Label", null, { tags: ["Intermediate"] });

    Slider.prototype.publish("showPlay", false, "boolean", "Show Play Button");
    Slider.prototype.publish("playInterval", 1000, "number", "Play Interval");
    Slider.prototype.publishProxy("playDiameter", "_playIcon", "diameter", 32);
    Slider.prototype.publish("playGutter", 12, "number", "Play Gutter");
    Slider.prototype.publishProxy("loopDiameter", "_loopIcon", "diameter", 24);
    Slider.prototype.publish("loopGutter", 4, "number", "Play Gutter");

    Slider.prototype.testData = function (_) {
        this.columns("Percent");
        this.data(20);
        return this;
    };

    Slider.prototype.testData2 = function (_) {
        this.allowRange(true);
        this.columns("Percent");
        this.data([20, 40]);
        return this;
    };

    Slider.prototype.play = function () {
        this._playing = true;
        this._playIcon
            .faChar("\uf04c")
            .render()
        ;
        var tick = this.data();
        if (tick < this.low() || tick >= this.high()) {
            tick = this.low();
            this
                .data(tick)
                .render()
            ;
        }
        var context = this;
        this.intervalHandler = setInterval(function () {
            tick += context.step();
            if (tick > context.high()) {
                if (context._loop === true) {
                    tick = context.low();
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

    Slider.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            if (this.brushg) {
                this.brushg
                    .call(this.brush.extent(this.allowRange() ? this._data : [this._data, this._data]))
                ;
            }
        }
        return retVal;
    };

    Slider.prototype.enter = function (domNode, element) {
        this.axisElement = element.append("g")
            .attr("class", "x axis")
        ;

        this.brushg = element.append("g")
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
            .target(domNode)
            .render()
        ;

        this._loopIcon
            .target(domNode)
            .render()
        ;
    };

    Slider.prototype.update = function (domNode, element) {
        var context = this;
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

        this.xScale
            .domain([this.low(), this.high()])
            .range([-width / 2, width / 2 - (this.showPlay() ? this.loopDiameter() + this.loopGutter() + this.playDiameter() + this.playGutter() : 0)])
        ;

        if ((this.high() - this.low()) / this.step() <= 10) {
            this.axis.tickValues(d3.merge([d3.range(this.low(), this.high(), this.step()), [this.high()]]));
        } else {
            this.axis.tickValues(null);
        }
        this.axisElement
            .call(this.axis)
        ;

        this.axisElement.selectAll('.tick > text')
            .style('fill', this.fontColor())
            .style('font-size', this.fontSize())
            .style('font-family', this.fontFamily())
        ;

        var range = this.xScale.range();
        this.brushg.select(".background")
            .attr("x", range[0])
            .attr("width", range[1] - range[0])
        ;

        this.handle
            .attr("d", function (d) { return context.handlePath(d); })
        ;

        this.brushg
            .call(this.brush.extent(this.allowRange() ? this._data : [this._data, this._data]))
        ;
    };

    Slider.prototype.brushstart = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
    };

    Slider.prototype.brushmove = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
        if (!this.allowRange()) {
            var mouseX = this.xScale.invert(d3.mouse(self)[0]);
            d3.select(self)
                .call(this.brush.extent([mouseX, mouseX]))
            ;
        }
    };

    Slider.prototype.brushend = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
        if (!this.allowRange()) {
            var mouseX = this.nearestStep(this.xScale.invert(d3.mouse(self)[0]));
            d3.select(self)
                .call(this.brush.extent([mouseX, mouseX]))
            ;
            this._data = mouseX;
            if (this.selectionLabel()) {
                var clickData = {};
                clickData[this.selectionLabel()] = mouseX;
                this.click(clickData);
            } else {
                this.click(mouseX);
            }
        } else {
            var extent = this.brush.extent();
            extent[0] = this.nearestStep(extent[0]);
            extent[1] = this.nearestStep(extent[1]);
            this._data = extent;
            d3.select(self)
                .call(this.brush.extent(extent))
            ;
            this.newSelection(extent[0], extent[1]);
        }
    };

    Slider.prototype.nearestStep = function (value) {
        return this.low() + Math.round((value - this.low()) / this.step()) * this.step();
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
