"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "./XYAxis", "../api/INDChart", "css!./Scatter"], factory);
    } else {
        root.chart_Column = factory(root.d3, root.common_SVGWidget, root.chart_XYAxis, root.api_INDChart);
    }
}(this, function (d3, SVGWidget, XYAxis, INDChart) {
    function Scatter(target) {
        XYAxis.call(this);
        INDChart.call(this);
    }
    Scatter.prototype = Object.create(XYAxis.prototype);
    Scatter.prototype._class += " chart_Scatter";
    Scatter.prototype.implements(INDChart.prototype);

    Scatter.prototype.publish("paletteID", "default", "set", "Palette ID", Scatter.prototype._palette.switch(),{tags:['Basic','Shared']});
    Scatter.prototype.publish("pointShape", "cross", "set", "Shape of the data points", ["circle", "rectangle", "cross"]);
    Scatter.prototype.publish("pointSize", 8, "number", "Point Size");

    Scatter.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());

        if (this._prevPointShape !== this.pointShape()) {
            this.svgData.selectAll(".data").remove();
            this._prevPointShape = this.pointShape();
        }

        var column = this.svgData.selectAll(".data")
            .data(this._data, function (d) { return d; })
        ;

        column.enter().append("g")
            .attr("class", "data")
        ;

        column
            .each(function (d, i) {
                var element = d3.select(this);
                var title;
                var title1;
                var cx, cy, x, y, x1, y1, x2, y2;
                var point = element.selectAll(".point").data(d.filter(function(d, i) {return i > 0;}));
                var point1 = element.selectAll(".point1").data(d.filter(function(d, i) {return i > 0;}));
                switch (context.pointShape()) {
                    case "circle" :
                        title = point
                          .enter().append("circle")
                            .attr("class", "point")
                            .on("click", function (d2, idx) {
                                context.click(context.rowToObj(d), context._columns[idx + 1]);
                            })
                            .append("title")
                        ;
                        break;

                    case "rectangle" :
                        title = point
                          .enter().append("rect")
                            .attr("class", "point")
                            .on("click", function (d2, idx) {
                                context.click(context.rowToObj(d), context._columns[idx + 1]);
                            })
                            .append("title")
                        ;
                        break;

                    case "cross" :
                        title = point
                          .enter().append("line")
                            .attr("class", "point")
                            .on("click", function (d2, idx) {
                                context.click(context.rowToObj(d), context._columns[idx + 1]);
                            })
                            .append("title")
                        ;
                        title1 = point1
                            .enter().append("line")
                            .attr("class", "point1")
                            .on("click", function (d2, idx) {
                                context.click(context.rowToObj(d), context._columns[idx + 1]);
                            })
                            .append("title1")
                        ;
                        break;
                }
                if (context.orientation() === "horizontal") {
                    switch (context.pointShape()) {
                        case "circle" :
                            cx = "cx";
                            cy = "cy";
                            break;

                        case "rectangle" :
                            x = "x";
                            y = "y";
                            break;

                        case "cross" :
                            x1 = "x1";
                            x2 = "x2";
                            y1 = "y1";
                            y2 = "y2";
                            break;
                    }
                } else {
                   switch (context.pointShape()) {
                       case "circle" :
                           cx = "cy";
                           cy = "cx";
                           break;

                       case "rectangle" :
                           x = "y";
                           y = "x";
                           break;

                       case "cross" :
                           x1 = "y1";
                           x2 = "y2";
                           y1 = "x1";
                           y2 = "x2";
                           break;
                   }
                }

                switch (context.pointShape()) {
                    case "circle" :
                        point.transition()
                            .attr("r", context.pointSize()/2)
                            .attr(cx, function (d2, idx) { return context.dataScale(d[0]) + context.dataScale.rangeBand()/2 ;})
                            .attr(cy, function (d2, idx) { return context.valueScale(d2); })
                            .style("fill", function (d2, idx) { return context._palette(context._columns[idx + 1]); })
                        ;
                        break;

                    case "rectangle" :
                        point.transition()
                            .attr(x, function (d2, idx) { return context.dataScale(d[0]) + context.dataScale.rangeBand()/2 - context.pointSize()/2;})
                            .attr(y, function (d2, idx) { return context.valueScale(d2) - context.pointSize()/2; })
                            .attr("width", context.pointSize())
                            .attr("height", context.pointSize())
                            .style("fill", function (d2, idx) { return context._palette(context._columns[idx + 1]); })
                        ;
                        break;

                    case "cross" :
                        point.transition()
                            .attr(x1, function (d2, idx) { return context.dataScale(d[0]) + context.dataScale.rangeBand()/2 - context.pointSize()/2;})
                            .attr(y1, function (d2, idx) { return context.valueScale(d2) - context.pointSize()/2; })
                            .attr(x2, function (d2, idx) { return context.dataScale(d[0]) + context.dataScale.rangeBand()/2 + context.pointSize()/2;})
                            .attr(y2, function (d2, idx) { return context.valueScale(d2) + context.pointSize()/2; })
                            .style("stroke", function (d2, idx) { return context._palette(context._columns[idx + 1]); })
                        ;
                        point1.transition()
                            .attr(x1, function (d2, idx) { return context.dataScale(d[0]) + context.dataScale.rangeBand()/2 - context.pointSize()/2;})
                            .attr(y1, function (d2, idx) { return context.valueScale(d2) + context.pointSize()/2; })
                            .attr(x2, function (d2, idx) { return context.dataScale(d[0]) + context.dataScale.rangeBand()/2 + context.pointSize()/2;})
                            .attr(y2, function (d2, idx) { return context.valueScale(d2) - context.pointSize()/2; })
                            .style("stroke", function (d2, idx) { return context._palette(context._columns[idx + 1]); })
                        ;
                        break;
                }

                title
                    .text(function (d2, idx) { return d[0] + " (" + d2 + ")" + ": " + context._columns[idx + 1]; })
                ;
                point.exit().remove();
                point1.exit().remove();
            })
        ;
        column.exit().remove();
    };

    Scatter.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return Scatter;
}));
