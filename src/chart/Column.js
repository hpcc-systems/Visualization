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

        this._linearGap = 25;
    }
    Column.prototype = Object.create(XYAxis.prototype);
    Column.prototype._class += " chart_Column";
    Column.prototype.implements(I2DChart.prototype);

    Column.prototype.publish("paletteID", "default", "set", "Palette ID", Column.prototype._palette.switch(),{tags:['Basic','Shared']});

    Column.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());

        var column = this.svgData.selectAll(".columnRect")
            .data(this.formattedData())
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
            .style("fill", function (d) { return context._palette(d[0]); })
            .each(function (d) {
                var element = d3.select(this);
                var dataPos = context.dataScale(d[0]);
                var dataLen = 10;
                switch (context.xAxisType()) {
                    case "ordinal":
                        dataLen = context.dataScale.rangeBand();
                        break;
                    case "linear":
                    case "time":
                        dataLen = Math.max(Math.abs(context.dataScale(2) - context.dataScale(1)) * (100 - context._linearGap) / 100, 5);
                        dataPos -= dataLen / 2;
                        break;
                }
                var valuePos = context.valueScale(d[1]);
                if (context.orientation() === "horizontal") {
                    element.transition()
                        .attr("x", dataPos)
                        .attr("width", dataLen)
                        .attr("y", valuePos)
                        .attr("height", height - valuePos)
                    ;
                } else {
                    element.transition()
                        .attr("x", 0)
                        .attr("width", valuePos)
                        .attr("y", dataPos)
                        .attr("height", dataLen)
                    ;
                }
            })
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
