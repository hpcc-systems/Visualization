"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./XYAxis", "../api/INDChart", "../api/ITooltip", "css!./Column"], factory);
    } else {
        root.chart_Column = factory(root.d3, root.chart_XYAxis, root.api_INDChart, root.api_ITooltip);
    }
}(this, function (d3, XYAxis, INDChart, ITooltip) {
    function Column(target) {
        XYAxis.call(this);
        INDChart.call(this);
        ITooltip.call(this);

        this._linearGap = 25;
    }
    Column.prototype = Object.create(XYAxis.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " chart_Column";
    Column.prototype.implements(INDChart.prototype);
    Column.prototype.implements(ITooltip.prototype);

    Column.prototype.publish("paletteID", "default", "set", "Palette ID", Column.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Column.prototype.publish("stacked", false, "boolean", "Stacked Bars", null, { tags: ["Basic"] });
    Column.prototype.publish("stackedOpacity", 0.66, "number", "Fill Stacked Opacity", null, { tags: ["Basic"] });
    Column.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    Column.prototype.updateChart = function (domNode, element, margin, width, height, isHorizontal) {
        var context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

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
            .domain(context.columns().filter(function (d, idx) { return idx > 0; }))
            .rangeRoundBands(isHorizontal ? [0, dataLen] : [dataLen, 0])
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

                var columnRect = element.selectAll("rect").data(dataRow.filter(function (d, i) { return i < context.columns().length; }).map(function (d, i) {
                    return {
                        column: context.columns()[i],
                        row: dataRow,
                        value: d,
                        idx: i
                    };
                }).filter(function (d, i) { return d.value !== null && d.idx > 0; }));

                columnRect
                  .enter().append("rect")
                    .attr("class", "columnRect")
                    .call(context._selection.enter.bind(context._selection))
                    .on("mouseover.tooltip", function (d) {
                        context.tooltipShow(d.row, context.columns(), d.idx);
                    })
                    .on("mouseout.tooltip", function (d) {
                        context.tooltipShow();
                    })
                    .on("mousemove.tooltip", function (d) {
                        context.tooltipShow(d.row, context.columns(), d.idx);
                    })
                    .on("click", function (d, idx) {
                        context.click(context.rowToObj(d.row), d.column, context._selection.selected(this));
                    })
                ;

                if (isHorizontal) {
                    columnRect.transition()
                        .attr("class", "columnRect")
                        .attr("x", function (d) { return context.dataScale(dataRow[0]) + (context.stacked() ? 0 : columnScale(d.column)) + offset; })
                        .attr("width", context.stacked() ? dataLen : columnScale.rangeBand())
                        .attr("y", function (d) { return d.value instanceof Array ? context.valueScale(d.value[1]) : context.valueScale(d.value); })
                        .attr("height", function (d) { return d.value instanceof Array ? context.valueScale(d.value[0]) - context.valueScale(d.value[1]) : height - context.valueScale(d.value); })
                        .style("opacity", context.stacked() ? context.stackedOpacity() : 1)
                        .style("fill", function (d) { return context._palette(d.column); })
                    ;
                } else {
                    columnRect.transition()
                        .attr("class", "columnRect")
                        .attr("y", function (d) { return context.dataScale(dataRow[0]) + (context.stacked() ? 0 : columnScale(d.column)) + offset; })
                        .attr("height", context.stacked() ? dataLen : columnScale.rangeBand())
                        .attr("x", function (d) { return d.value instanceof Array ? context.valueScale(d.value[0]) : 0; })
                        .attr("width", function (d) { return d.value instanceof Array ? context.valueScale(d.value[1]) - context.valueScale(d.value[0]) : context.valueScale(d.value); })
                        .style("opacity", context.stacked() ? context.stackedOpacity() : 1)
                        .style("fill", function (d) { return context._palette(d.column); })
                    ;
                }

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

    return Column;
}));
