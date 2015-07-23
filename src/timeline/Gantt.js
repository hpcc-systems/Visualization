"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../chart/XYAxis", "../api/INDChart", "css!./Gantt"], factory);
    } else {
        root.chart_Column = factory(root.d3, root.chart_XYAxis, root.api_INDChart);
    }
}(this, function (d3, SVGWidget, XYAxis, INDChart) {
    function Gantt() {
        XYAxis.call(this);
        INDChart.call(this);

        this._linearGap = 25;
    }
    Gantt.prototype = Object.create(XYAxis.prototype);
    Gantt.prototype._class += " common_Gantt";
    Gantt.prototype.implements(INDChart.prototype);

    Gantt.prototype.publish("paletteID", "default", "set", "Palette ID", Gantt.prototype._palette.switch(),{tags:['Basic','Shared']});
    Gantt.prototype.publish("stacked", false, "boolean", "Stacked Bars");

    // Gantt.prototype.publish("shape", "circle", "set", "Shape Type", ["circle", "square"],{tags:['Private']});
    // Gantt.prototype.publishProxy("faChar", "_faChar", "char");
    // Gantt.prototype.publishProxy("image_colorFill", "_faChar", "text_colorFill");

    Gantt.prototype.updateChart = function (domNode, element, margin, width, height) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());

        var dataLen = 10;
        var offset = 0;
        switch (this.xAxisType()) {
            case "ordinal":
                dataLen = this.dataScale.rangeBand();
                offset = 0;
                break;
            case "linear":
            case "time":
                dataLen = Math.max(Math.abs(this.dataScale(2) - this.dataScale(1)) * (100 - this._linearGap) / 100, dataLen);
                offset = -dataLen/2;
                break;
        }

        var columnScale = d3.scale.ordinal()
            .domain(context._columns.filter(function (d, idx) { return idx > 0; }))
            .rangeRoundBands([0, dataLen])
        ;

        var column = this.svgData.selectAll(".dataRow")
            .data(this.formattedData())
        ;

        column.enter().append("g")
            .attr("class", "dataRow")
        ;

        column
            .each(function (dataRow, i) {
                var element = d3.select(this);

                var columnRect = element.selectAll("rect").data(dataRow.filter(function (d, i) {return i > 0;}));

                columnRect
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
                        .attr("x", function (d, idx) { return context.dataScale(dataRow[0]) + (context.stacked() ? 0 : columnScale(context._columns[idx + 1])) + offset;})
                        .attr("width", context.stacked() ? dataLen : columnScale.rangeBand())
                        .attr("y", function (d) { return d instanceof Array ? context.valueScale(d[1]) : context.valueScale(d) ; })
                        .attr("height", function (d) {  return  d instanceof Array ? context.valueScale(d[0]) - context.valueScale(d[1]) : height - context.valueScale(d) ; })
                        .style("fill", function (d, idx) { return context._palette(context._columns[idx + 1]); })
                    ;
                } else {
                    columnRect.transition()
                        .attr("class", "columnRect")
                        .attr("y", function (d, idx) { return context.dataScale(dataRow[0]) + (context.stacked() ? 0 : columnScale(context._columns[idx + 1])) + offset;})
                        .attr("height", context.stacked() ? dataLen : columnScale.rangeBand())
                        .attr("x", function (d) { return d instanceof Array ? context.valueScale(d[0]) : 0 ; })
                        .attr("width", function (d) {  return  d instanceof Array ? context.valueScale(d[1]) - context.valueScale(d[0]) : context.valueScale(d) ; })
                        .style("fill", function (d, idx) { return context._palette(context._columns[idx + 1]); })
                    ;
                }

                columnRect.select("title")
                    .text(function (d, idx) { return dataRow[0] + " (" + d + "," + " " + context._columns[idx + 1] + ")"; })
                ;

                if (context.stacked()) {
                    columnRect.sort(function (l, r) {
                        return r - l;
                    });
                }

                columnRect.exit().transition()
                    .remove()
                ;
        });

        column.exit().transition()
            .remove()
        ;

    };

    return Gantt;

}));
