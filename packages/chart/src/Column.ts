import { INDChart, ITooltip } from "@hpcc-js/api";
import { d3SelectionType, publish } from "@hpcc-js/common";
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

    layerEnter(host: XYAxis, element: d3SelectionType, duration: number = 250) {
        super.layerEnter(host, element, duration);
        const context = this;
        this
            .tooltipHTML(function (d) {
                let value = d.row[d.idx];
                if (value instanceof Array) {
                    value = value[1] - value[0];
                }
                return context.tooltipFormat({ label: d.row[0], series: context.layerColumns(host)[d.idx], value });
            })
            ;
    }

    adjustedData(host: XYAxis) {
        const retVal = this.layerData(host).map(row => {
            let prevValue = 0;
            return row.map((cell, idx) => {
                if (idx === 0) {
                    return cell;
                }
                if (idx >= this.layerColumns(host).length) {
                    return cell;
                }
                const retVal2 = host.yAxisStacked() ? [prevValue, prevValue + cell] : cell;
                prevValue += cell;
                return retVal2;
            }, this);
        }, this);
        return retVal;
    }

    layerUpdate(host: XYAxis, element: d3SelectionType, duration: number = 250) {
        super.layerUpdate(host, element, duration);
        const isHorizontal = host.orientation() === "horizontal";
        const context = this;

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        let dataLen = 10;
        let offset = 0;
        switch (host.xAxisType()) {
            case "ordinal":
                dataLen = host.bandwidth();
                offset = -dataLen / 2;
                break;
            case "linear":
            case "time":
                dataLen = Math.max(Math.abs(host.dataPos(2) - host.dataPos(1)) * (100 - this._linearGap) / 100, dataLen);
                offset = -dataLen / 2;
                break;
            default:
        }

        this.tooltip.direction(isHorizontal ? "n" : "e");

        const columnScale = d3ScaleBand()
            .domain(context.layerColumns(host).filter(function (_d, idx) { return idx > 0; }))
            .rangeRound(isHorizontal ? [0, dataLen] : [dataLen, 0])
            ;

        const column = element.selectAll(".dataRow")
            .data(this.adjustedData(host))
            ;
        const hostData = host.data();
        column.enter().append("g")
            .attr("class", "dataRow")
            .merge(column)
            .each(function (dataRow, dataRowIdx) {
                const element = d3Select(this);

                const columnRect = element.selectAll("rect").data(dataRow.filter(function (_d, i) { return i < context.layerColumns(host).length; }).map(function (d, i) {
                    return {
                        column: context.layerColumns(host)[i],
                        row: dataRow,
                        origRow: hostData[dataRowIdx],
                        value: d,
                        idx: i
                    };
                }).filter(function (d) { return d.value !== null && d.idx > 0; }), (d: any) => d.column);

                const columnRectEnter = columnRect
                    .enter().append("rect")
                    .attr("class", (d, i) => "columnRect series series-" + context.cssTag(d.column))
                    .call(host._selection.enter.bind(host._selection))
                    .on("mouseout.tooltip", context.tooltip.hide)
                    .on("mousemove.tooltip", context.tooltip.show)
                    .on("click", function (d: any) {
                        context.click(host.rowToObj(d.origRow), d.column, host._selection.selected(this));
                    })
                    .on("dblclick", function (d: any) {
                        context.dblclick(host.rowToObj(d.origRow), d.column, host._selection.selected(this));
                    })
                    ;

                const domainLength = host.yAxisStacked() ? dataLen : columnScale.bandwidth();
                renderRect(columnRectEnter, true);
                renderRect(columnRectEnter.merge(columnRect).transition().duration(duration), false);

                columnRect.exit().transition().duration(duration)
                    .style("opacity", 0)
                    .remove()
                    ;

                function renderRect(selection, enterFlag) {
                    selection
                        .each(function (d) {
                            const domainPos = host.dataPos(dataRow[0]) + (host.yAxisStacked() ? 0 : columnScale(d.column)) + offset;
                            const upperValuePos = host.valuePos(d.value instanceof Array ? d.value[1] : d.value);
                            const lowerValuePos = host.valuePos(d.value instanceof Array ? d.value[0] : 0);
                            const valuePos = Math.min(lowerValuePos, upperValuePos);
                            const valueLength = Math.abs(upperValuePos - lowerValuePos);
                            d3Select(this)
                                .attr(isHorizontal ? "x" : "y", domainPos)
                                .attr(isHorizontal ? "y" : "x", valuePos)
                                .attr(isHorizontal ? "width" : "height", domainLength)
                                .attr(isHorizontal ? "height" : "width", valueLength)
                                .style("fill", (d: any) => context._palette(d.column))
                                .style("opacity", enterFlag ? 0 : 1)
                                ;
                        });
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
