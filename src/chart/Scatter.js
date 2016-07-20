"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "./XYAxis", "../api/INDChart", "../api/ITooltip", "css!./Scatter"], factory);
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
