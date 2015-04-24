"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/SVGWidget", "./ISlider", "css!./Slider"], factory);
    } else {
        root.other_Slider = factory(root.common_SVGWidget, root.other_ISlider);
    }
}(this, function (SVGWidget, ISlider) {
    function Slider() {
        SVGWidget.call(this);
        ISlider.call(this);
        this._class = "other_Slider";

        this._selectionLabel = "";

        this.xScale = d3.scale.linear()
            .clamp(true)
        ;
        var context = this;
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
              .tickFormat(function (d) { return d; })
              .tickSize(0)
              .tickPadding(12)
        ;
    };
    Slider.prototype = Object.create(SVGWidget.prototype);
    Slider.prototype.implements(ISlider.prototype);

    Slider.prototype.publish("allowRange", false, "boolean", "Allow Range Selection");
    Slider.prototype.publish("low", 0, "number", "Low");
    Slider.prototype.publish("high", 100, "number", "High");
    Slider.prototype.publish("step", 10, "number", "Step");
    Slider.prototype.publish("selectionLabel", "", "string", "Selection Label");

    Slider.prototype.testData = function (_) {
        this.columns("Percent");
        this.data(66);
        return this;
    };

    Slider.prototype.testData2 = function (_) {
        this.allowRange(true);
        this.columns("Percent");
        this.data([44, 66]);
        return this;
    };

    Slider.prototype.data = function (_) {
        var retVal = SVGWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            if (this.brushg) {
                this.brushg
                    .call(this.brush.extent(this._allowRange ? this._data : [this._data, this._data]))
                ;
            }
        }
        return retVal;
    };

    Slider.prototype.enter = function (domNode, element) {
        if ((this._high - this._low) / this._step <= 10) {
            this.axis.tickValues(d3.merge([d3.range(this._low, this._high, this._step), [this._high]]));
        }

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
    };

    Slider.prototype.update = function (domNode, element) {
        var context = this;
        var width = this.width() - 50;  //TODO - 50 should be "padding"

        this.xScale
            .domain([this._low, this._high])
            .range([-width/2, width/2])
        ;

        this.axisElement
            .call(this.axis)
        ;

        var range = this.xScale.range();
        this.brushg.select(".background")
            .attr("x", range[0])
            .attr("width", range[1] - range[0])
        ;

        this.handle
            .attr("d", function (d) { return context.handlePath(d); })
        ;

        if (this._initHandle === undefined) {
            this._initHandle = true;
            var selVal = [this._low, this._low];
            if (this._allowRange && this._data) {
                var selVal = this._data;
            } else if (this._data){
                selVal = [this._data, this._data];
            }
            this.brushg
                .call(this.brush.extent(selVal))
            ;
        }
    };

    Slider.prototype.brushstart = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
    };

    Slider.prototype.brushmove = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
        if (!this._allowRange) {
            var mouseX = this.xScale.invert(d3.mouse(self)[0]);
            d3.select(self)
                .call(this.brush.extent([mouseX, mouseX]))
            ;
        }
    };

    Slider.prototype.brushend = function (d, self) {
        if (!d3.event || !d3.event.sourceEvent) return;
        d3.event.sourceEvent.stopPropagation();
        if (!this._allowRange) {
            var mouseX = this.nearestStep(this.xScale.invert(d3.mouse(self)[0]));
            d3.select(self)
                .call(this.brush.extent([mouseX, mouseX]))
            ;
            this._data = mouseX;
            if (this._selectionLabel) {
                var clickData = {};
                clickData[this._selectionLabel] = mouseX;
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
        return this._low + Math.round((value - this._low) / this._step) * this._step;
    }

    Slider.prototype.handlePath = function (d, i) {
        var e = +(d === "e");
        var x = e ? 1 : -1;
        var xOffset = this._allowRange ? 0.5 : 0.0;
        var y = 18;
        var retVal = "M" + (xOffset * x) + "," + y
            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
            + "V" + (2 * y - 6)
            + "A6,6 0 0 " + e + " " + (xOffset * x) + "," + (2 * y)
        ;
        if (this._allowRange) {
            retVal += "Z"
                + "M" + (2.5 * x) + "," + (y + 8)
                + "V" + (2 * y - 8)
                + "M" + (4.5 * x) + "," + (y + 8)
                + "V" + (2 * y - 8)
            ;
        } else {
            retVal += "M" + (1 * x) + "," + (y + 8)
                + "V" + (2 * y - 8)
            ;
        };
        return retVal;
    };

    return Slider;
}));
