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
    };
    Line.prototype = Object.create(XYAxis.prototype);
    Line.prototype._class += " chart_Line";
    Line.prototype.implements(INDChart.prototype);

    Line.prototype.publish("paletteID", "default", "set", "Palette ID", Line.prototype._palette.switch());

    Line.prototype.enter = function (domNode, element) {
        XYAxis.prototype.enter.apply(this, arguments);
        var context = this;
    };

    Line.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        var d3Line = d3.svg.line()
            .x(function (d) {
                switch (context._xScale) {
                    case "DATE":
                        return context.x(context.parseDate(d[0]));
                }
                return context.x(d[0]) + (context.x.rangeBand ? context.x.rangeBand() / 2 : 0);
            })
            .y(function (d) { return context.y(d[1]); })
        ;

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
            .datum(function (d, i) { return context._data.map(function (row, rowIdx) { return [row[0], row[i + 1]];}); })
            .attr("d", d3Line)
        ;

        line.exit().remove();
    };

    return Line;
}));
