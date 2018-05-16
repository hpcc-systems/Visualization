import { INDChart, ITooltip } from "@hpcc-js/api";
import { d3SelectionType, local as d3Local, Text } from "@hpcc-js/common";
import { scaleBand as d3ScaleBand } from "d3-scale";
import { select as d3Select } from "d3-selection";
import "d3-transition";
import { XYAxis } from "./XYAxis";

import "../src/Column.css";

export class Column extends XYAxis {
    protected _linearGap: number;
    private textLocal = d3Local<Text>();

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

                const columnGRect = element.selectAll(".dataCell").data(dataRow.filter(function (_d, i) { return i < context.layerColumns(host).length; }).map(function (d, i) {
                    return {
                        column: context.layerColumns(host)[i],
                        row: dataRow,
                        origRow: hostData[dataRowIdx],
                        value: d,
                        idx: i
                    };
                }).filter(function (d) { return d.value !== null && d.idx > 0; }), (d: any) => d.column);

                const columnGEnter = columnGRect
                    .enter().append("g")
                    .attr("class", "dataCell")
                    .style("opacity", 0)
                    .each(function (this: SVGElement, d) {
                        const element = d3Select(this);
                        element.append("rect")
                            .attr("class", "columnRect series series-" + context.cssTag(d.column))
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
                    })
                    ;
                columnGEnter.transition().duration(duration)
                    .style("opacity", 1)
                    ;

                const domainLength = host.yAxisStacked() ? dataLen : columnScale.bandwidth();
                columnGEnter.merge(columnGRect).each(function (this: SVGElement, d) {
                    const element = d3Select(this);
                    const domainPos = host.dataPos(dataRow[0]) + (host.yAxisStacked() ? 0 : columnScale(d.column)) + offset;
                    const upperValue = d.value instanceof Array ? d.value[1] : d.value;
                    const upperValuePos = host.valuePos(upperValue);
                    const lowerValuePos = host.valuePos(d.value instanceof Array ? d.value[0] : 0);
                    const valuePos = Math.min(lowerValuePos, upperValuePos);
                    const valueLength = Math.abs(upperValuePos - lowerValuePos);
                    element.select("rect").transition().duration(duration)
                        .attr(isHorizontal ? "x" : "y", domainPos)
                        .attr(isHorizontal ? "y" : "x", valuePos)
                        .attr(isHorizontal ? "width" : "height", domainLength)
                        .attr(isHorizontal ? "height" : "width", valueLength)
                        .style("fill", (d: any) => context._palette(d.column))
                        ;

                    const dataText = element.selectAll(".dataText").data(context.showValue() ? [`${upperValue}`] : []);
                    const dataTextEnter = dataText.enter().append("g")
                        .attr("class", "dataText")
                        .each(function (this: SVGElement, d) {
                            context.textLocal.set(this, new Text().target(this));
                        });
                    dataTextEnter.merge(dataText)
                        .each(function (this: SVGElement, d) {
                            const isPositive = upperValue >= 0;
                            context.textLocal.get(this)
                                .pos(isHorizontal ?
                                    {
                                        x: domainPos + domainLength / 2,
                                        y: isPositive ? valuePos - 12 : valuePos + valueLength + 12
                                    } : {
                                        x: isPositive ? valuePos + valueLength + 12 : valuePos - 12,
                                        y: domainPos + domainLength / 2
                                    })
                                .anchor(isHorizontal ? "middle" : "start")
                                .text(`${upperValue}`)
                                .visible(context.showValue())
                                .render()
                                ;
                        });
                    dataText.exit()
                        .each(function (this: SVGElement, d) {
                            context.textLocal.get(this).target(null);
                        })
                        .remove()
                        ;
                });
                columnGRect.exit().transition().duration(duration)
                    .style("opacity", 0)
                    .remove()
                    ;
            });
        column.exit().transition().duration(duration)
            .remove()
            ;
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

export interface Column {
    paletteID(): string;
    paletteID(_: string): this;
    useClonedPalette(): boolean;
    useClonedPalette(_: boolean): this;
    showValue(): boolean;
    showValue(_: boolean): this;
}

Column.prototype.publish("paletteID", "default", "set", "Palette ID", () => Column.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Column.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Column.prototype.publish("showValue", false, "boolean", "Show Value in column");
/*
const origUseClonedPalette = Column.prototype.useClonedPalette;
Column.prototype.useClonedPalette = function (this: Column, _?) {
    const retVal = origUseClonedPalette.apply(this, arguments);
    if (arguments.length) {
        this._useClonedPalette = _;
    }
    return retVal;;
}
*/
