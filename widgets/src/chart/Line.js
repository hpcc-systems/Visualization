(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./XYAxis", "./I2DChart", "../common/Palette", "css!./Line"], factory);
    } else {
        root.Line = factory(root.d3, root.XYAxis, root.I2DChart, root.Palette);
    }
}(this, function (d3, XYAxis, I2DChart, Palette) {
    function Line(target) {
        XYAxis.call(this);
        I2DChart.call(this);
        this._class = "chart_Line";
    };
    Line.prototype = Object.create(XYAxis.prototype);
    Line.prototype.implements(I2DChart.prototype);

    Line.prototype.d3Color = Palette.ordinal("category20");

    Line.prototype.enter = function (domNode, element) {
        XYAxis.prototype.enter.apply(this, arguments);
        var context = this;
    };

    Line.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;
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
            .style("stroke", function (d, i) {
                return context.d3Color(context._columns[i + 1]);
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
