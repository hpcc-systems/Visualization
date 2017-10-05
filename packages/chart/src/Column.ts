import { INDChart, ITooltip } from "@hpcc-js/api";
import { publish } from "@hpcc-js/common";
import { scaleBand as d3ScaleBand } from "d3-scale";
import { select as d3Select } from "d3-selection";
import "d3-transition";
import { XYAxis } from "./XYAxis";

import "../src/Column.css";

export class Column extends XYAxis {
    _linearGap: number;

    constructor() {
        super();
        INDChart.call(this);
        ITooltip.call(this);

        this._linearGap = 25.0;
    }

    enter(_domNode, _element) {
        XYAxis.prototype.enter.apply(this, arguments);
        const context = this;
        this
            .tooltipHTML(function (d) {
                let value = d.row[d.idx];
                if (value instanceof Array) {
                    value = value[1] - value[0];
                }
                return context.tooltipFormat({ label: d.row[0], series: context.columns()[d.idx], value });
            })
            ;
    }

    adjustedData() {
        const retVal = this.data().map(function (row) {
            let prevValue = 0;
            return row.map(function (cell, idx) {
                if (idx === 0) {
                    return cell;
                }
                if (idx >= this.columns().length) {
                    return cell;
                }
                const retVal2 = this.yAxisStacked() ? [prevValue, prevValue + cell] : cell;
                prevValue += cell;
                return retVal2;
            }, this);
        }, this);
        return retVal;
    }

    updateChart(_domNode, _element, _margin, _width, height, isHorizontal, duration) {
        const context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        let dataLen = 10;
        let offset = 0;
        switch (this.xAxisType()) {
            case "ordinal":
                dataLen = this.domainAxis.d3Scale.bandwidth();
                offset = -dataLen / 2;
                break;
            case "linear":
            case "time":
                dataLen = Math.max(Math.abs(this.dataPos(2) - this.dataPos(1)) * (100 - this._linearGap) / 100, dataLen);
                offset = -dataLen / 2;
                break;
            default:
        }

        this.tooltip.direction(isHorizontal ? "n" : "e");

        const columnScale = d3ScaleBand()
            .domain(context.columns().filter(function (_d, idx) { return idx > 0; }))
            .rangeRound(isHorizontal ? [0, dataLen] : [dataLen, 0])
            ;

        const column = this.svgData.selectAll(".dataRow")
            .data(this.adjustedData())
            ;

        column.enter().append("g")
            .attr("class", "dataRow")
            .merge(column)
            .each(function (dataRow) {
                const element = d3Select(this);

                const columnRect = element.selectAll("rect").data(dataRow.filter(function (_d, i) { return i < context.columns().length; }).map(function (d, i) {
                    return {
                        column: context.columns()[i],
                        row: dataRow,
                        value: d,
                        idx: i
                    };
                }).filter(function (d) { return d.value !== null && d.idx > 0; }), (d: any) => d.column);

                const columnRectEnter = columnRect
                    .enter().append("rect")
                    .attr("class", "columnRect")
                    .call(context._selection.enter.bind(context._selection))
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
                    .on("click", function (d: any) {
                        context.click(context.rowToObj(d.row), d.column, context._selection.selected(this));
                    })
                    .on("dblclick", function (d: any) {
                        context.dblclick(context.rowToObj(d.row), d.column, context._selection.selected(this));
                    })
                    ;

                renderRect(columnRectEnter, true);
                renderRect(columnRectEnter.merge(columnRect).transition().duration(duration), false);

                columnRect.exit().transition().duration(duration)
                    .style("opacity", 0)
                    .remove()
                    ;

                function renderRect(selection, enterFlag) {
                    if (isHorizontal) {
                        selection
                            .attr("x", function (d: any) { return context.dataPos(dataRow[0]) + (context.yAxisStacked() ? 0 : columnScale(d.column)) + offset; })
                            .attr("width", context.yAxisStacked() ? dataLen : columnScale.bandwidth())
                            .attr("y", function (d: any) { return d.value instanceof Array ? context.valuePos(d.value[1]) : context.valuePos(d.value); })
                            .attr("height", function (d: any) { return d.value instanceof Array ? context.valuePos(d.value[0]) - context.valuePos(d.value[1]) : height - context.valuePos(d.value); })
                            .style("fill", function (d: any) { return context._palette(d.column); })
                            ;
                    } else {
                        selection
                            .attr("y", function (d: any) { return context.dataPos(dataRow[0]) + (context.yAxisStacked() ? 0 : columnScale(d.column)) + offset; })
                            .attr("height", context.yAxisStacked() ? dataLen : columnScale.bandwidth())
                            .attr("x", function (d: any) { return d.value instanceof Array ? context.valuePos(d.value[0]) : 0; })
                            .attr("width", function (d: any) { return d.value instanceof Array ? context.valuePos(d.value[1]) - context.valuePos(d.value[0]) : context.valuePos(d.value); })
                            .style("fill", function (d: any) { return context._palette(d.column); })
                            ;
                    }
                    selection.style("opacity", enterFlag ? 0 : 1);
                }

            });

        column.exit().transition().duration(duration)
            .remove()
            ;
    }

    @publish("default", "set", "Palette ID", () => Column.prototype._palette.switch(), { tags: ["Basic", "Shared"] })
    paletteID: publish<this, string>;
    @publish(false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] })
    _useClonedPalette: boolean;
    useClonedPalette(_?: boolean): boolean | this {
        if (!arguments.length) return this._useClonedPalette;
        this._useClonedPalette = _;
        return this;
    }

    //  INDChart  ---
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;

    //  ITooltip  ---
    tooltip;
    tooltipHTML: (_) => string;
    tooltipFormat: (_) => string;
}
Column.prototype._class += " chart_Column";
Column.prototype.implements(INDChart.prototype);
Column.prototype.implements(ITooltip.prototype);
