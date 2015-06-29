"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./XYAxis", "../api/INDChart", "css!./Column"], factory);
    } else {
        root.chart_Column = factory(root.d3, root.chart_XYAxis, root.api_INDChart);
    }
}(this, function (d3, XYAxis, INDChart) {
    function Column(target) {
        XYAxis.call(this);
        INDChart.call(this);

        this._linearGap = 25;
    }
    Column.prototype = Object.create(XYAxis.prototype);
    Column.prototype._class += " chart_Column";
    Column.prototype.implements(INDChart.prototype);

    Column.prototype.publish("paletteID", "default", "set", "Palette ID", Column.prototype._palette.switch(),{tags:['Basic','Shared']});

    Column.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());

        var columnScale = d3.scale.ordinal()
            .domain(context._columns.filter(function (d, idx) { return idx > 0; }))
            .rangeRoundBands([0, context.dataScale.rangeBand()])
        ;

        var column = this.svgData.selectAll(".dataRow")
            .data(this.data())
        ;

        column.enter().append("g")
            .attr("class", "dataRow")
        ;

        column
            .each(function (dataRow, i) {
                var element = d3.select(this);

                var columnRect = element.selectAll("rect").data(dataRow.filter(function(d, i) {return i > 0;}));

                var title = columnRect
                  .enter().append("rect")
                    .attr("class", "columnRect")
                    .on("click", function (d, idx) {
                        context.click(context.rowToObj(dataRow), context._columns[idx + 1]);
                    })
                    .append("title")
                ;

                if (context.orientation() === "horizontal") {
                    columnRect.transition()
                        .attr("class", "columnRect")
                        .attr("x", function (d, idx) { return context.dataScale(dataRow[0]) + columnScale(context._columns[idx + 1]);})
                        .attr("width", columnScale.rangeBand())
                        .attr("y", function (d) { return context.valueScale(d); })
                        .attr("height", function (d) { return height - context.valueScale(d); })
                        .style("fill", function (d, idx) { return context._palette(context._columns[idx + 1]); })
                    ;
                } else {
                    columnRect.transition()
                        .attr("class", "columnRect")
                        .attr("y", function (d, idx) { return context.dataScale(dataRow[0]) + columnScale(context._columns[idx + 1]);})
                        .attr("height", columnScale.rangeBand())
                        .attr("x", function (d) { return 0; })
                        .attr("width", function (d) { return context.valueScale(d); })
                        .style("fill", function (d, idx) { return context._palette(context._columns[idx + 1]); })
                    ;
                }

                title
                    .text(function (d, idx) { return dataRow[0] + " (" + d + "," + " " + context._columns[idx + 1] + ")"; })
                ;

                columnRect.exit().transition()
                    .remove()
                ;
        });

        column.exit().transition()
            .remove()
        ;

    };

    return Column;
}));
