"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./XYAxis", "../api/I2DChart", "css!./Column"], factory);
    } else {
        root.chart_Column = factory(root.d3, root.chart_XYAxis, root.api_I2DChart);
    }
}(this, function (d3, XYAxis, I2DChart) {
    function Column(target) {
        XYAxis.call(this);
        I2DChart.call(this);
        this._class = "chart_Column";
    };
    Column.prototype = Object.create(XYAxis.prototype);
    Column.prototype.implements(I2DChart.prototype);

    Column.prototype.publish("paletteID", "default", "set", "Palette ID", Column.prototype._palette.switch());

    Column.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());

        var column = this.svgData.selectAll(".columnRect")
            .data(this._data)
        ;

        var title = column
          .enter().append("rect")
            .attr("class", "columnRect")
            .on("click", function (d) {
                context.click(context.rowToObj(d), context._columns[1]);
            })
            .append("title")
        ;

        column.transition()
            .attr("class", "columnRect")
            .attr("x", function (d) { return context.x(d[0]); })
            .attr("width", this.x.rangeBand())
            .attr("y", function (d) { return context.y(d[1]); })
            .attr("height", function (d) { return height - context.y(d[1]); })
            .style("fill", function (d) { return context._palette(d[0]); })
        ;

        title
            .text(function (d) { return d[0] + " (" + d[1] + ")"; })
        ;

        column.exit().transition()
            .remove()
        ;
    };

    return Column;
}));
