"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./XYAxis", "../api/INDChart", "css!./Line"], factory);
    } else {
        root.chart_Line = factory(root.d3, root.chart_XYAxis, root.api_INDChart);
    }
}(this, function (d3, XYAxis, INDChart) {
    function Line(target) {
        XYAxis.call(this);
        INDChart.call(this);
    }
    Line.prototype = Object.create(XYAxis.prototype);
    Line.prototype._class += " chart_Line";
    Line.prototype.implements(INDChart.prototype);

    Line.prototype.publish("paletteID", "default", "set", "Palette ID", Line.prototype._palette.switch(),{tags:['Basic','Shared']});

    Line.prototype.enter = function (domNode, element) {
        XYAxis.prototype.enter.apply(this, arguments);
    };

    Line.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;
        var d3Line;
        var horizontalFunction = function (d) {
            switch (context._xScale) {
                case "DATE":
                    return context.dataScale(context.parseDate(d[0]));
            }
            return context.dataScale(d[0]) + (context.dataScale.rangeBand ? context.dataScale.rangeBand() / 2 : 0);
        };

        var verticalFunction = function (d) {
            return context.valueScale(d[1]);
        };

        this._palette = this._palette.switch(this.paletteID());

        if (this.orientation() === "horizontal") {
            d3Line = d3.svg.line()
                .x(horizontalFunction)
                .y(verticalFunction)
            ;
        } else {
            d3Line = d3.svg.line()
                .y(horizontalFunction)
                .x(verticalFunction)
            ;
        }

        var line = this.svgData.selectAll(".dataLine")
            .data(this._columns.filter(function(d, i) {return i > 0;}))
        ;

        line.enter().append("path")
            .attr("class", "dataLine")
        ;
        line
            .style("stroke", function (d, i) {
                return context._palette(context._columns[i + 1]);
            })
            .append("title")
            .text(function(d) { return d; })
        ;
        line
            .datum(function (d, i) { return context.formattedData().map(function (row, rowIdx) { return [row[0], row[i + 1]];}); })
            .attr("d", d3Line)
        ;

        line.exit().remove();
    };

    return Line;
}));
