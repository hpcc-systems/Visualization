import { INDChart, ITooltip } from "@hpcc-js/api";
import { d3Event, InputField, Text } from "@hpcc-js/common";
import { format as d3Format } from "d3-format";
import { scaleBand as d3ScaleBand } from "d3-scale";
import { local as d3Local, select as d3Select } from "d3-selection";
import { XYAxis } from "./XYAxis.ts";

import "../src/Column.css";

export class Column extends XYAxis {
    static __inputs: InputField[] = [{
        id: "label",
        type: "string"
    }, {
        id: "values",
        type: "number",
        multi: true
    }];

    protected _linearGap: number;
    private textLocal = d3Local<Text>();
    private stackedTextLocal = d3Local<Text>();
    private isHorizontal: boolean;

    constructor() {
        super();
        INDChart.call(this);
        ITooltip.call(this);

        this._selection.skipBringToTop(true);

        this._linearGap = 25.0;
    }

    layerEnter(host: XYAxis, element, duration: number = 250) {
        super.layerEnter(host, element, duration);

        const context = this;
        this
            .tooltipHTML(function (d) {
                switch (context.tooltipStyle()) {
                    case "series-table":
                        return context.tooltipFormat({
                            label: d.row[0],
                            arr: context.columns().slice(1).map(function (column, i) {
                                return {
                                    label: column,
                                    color: context._palette(column),
                                    value: d.row[i + 1]
                                };
                            })
                        });
                    default:
                        let value = d.row[d.idx];
                        if (value instanceof Array) {
                            value = value[1] - value[0];
                        }
                        return context.tooltipFormat({ label: d.row[0], series: context.layerColumns(host)[d.idx], value });
                }
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

    layerUpdate(host: XYAxis, element, duration: number = 250) {
        super.layerUpdate(host, element, duration);
        const isHorizontal = host.orientation() === "horizontal";
        this.isHorizontal = isHorizontal;
        const context = this;

        if (this.tabNavigation() && host.parentRelativeDiv) {
            host.parentRelativeDiv
                .attr("tabindex", "0")
                .attr("role", "group")
                .attr("aria-label", `${this.columns()[0] || "Chart"} data`);
        } else if (host.parentRelativeDiv) {
            host.parentRelativeDiv
                .attr("tabindex", null)
                .attr("role", null)
                .attr("aria-label", null);
        }

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
        const formatPct = d3Format(context.showValueAsPercentFormat());

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
            .paddingInner(Math.max(this.xAxisSeriesPaddingInner(), 0.05))
            .paddingOuter(0)
            ;
        let domainSums = [];
        const seriesSums = [];
        const columnLength = this.columns().length;
        const rowData = this.data();
        if (this.showValue() && this.showValueAsPercent() === "series") {
            rowData.forEach((row) => {
                row.filter((_, idx) => idx > 0 && idx < columnLength).forEach((col, idx) => {
                    if (seriesSums[idx + 1] === undefined) {
                        seriesSums[idx + 1] = 0;
                    }
                    seriesSums[idx + 1] += col;
                });
            });
        }

        if (this.showDomainTotal() || (this.showValue() && this.showValueAsPercent() === "domain")) {
            domainSums = rowData.map(row => {
                return row.filter((cell, idx) => idx > 0 && idx < columnLength).reduce((sum, cell) => {
                    return sum + cell;
                }, 0);
            });
        }

        const column = element.selectAll(".dataRow")
            .data(this.adjustedData(host))
            ;
        const hostData = host.data();
        const axisSize = this.getAxisSize(host);
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
                    .on("mouseout.tooltip", function (d: any) {
                        if (!context.tooltipInnerTextEllipsedOnly() || (d.innerTextObj && d.innerTextObj.isTruncated)) {
                            context.tooltip.hide.apply(context, arguments);
                        }
                    })
                    .on("mousemove.tooltip", function (d: any) {
                        if (!context.tooltipInnerTextEllipsedOnly() || (d.innerTextObj && d.innerTextObj.isTruncated)) {
                            context.tooltip.show.apply(context, arguments);
                        }
                    })
                    .call(host._selection.enter.bind(host._selection))
                    .on("click", function (d: any) {
                        context.click(host.rowToObj(d.origRow), d.column, host._selection.selected(this));
                    })
                    .on("dblclick", function (d: any) {
                        context.dblclick(host.rowToObj(d.origRow), d.column, host._selection.selected(this));
                    })
                    .on("keydown", function (evt, d: any) {
                        if (context.tabNavigation()) {
                            const event = d3Event();
                            if (event.code === "Space" || event.key === "Enter") {
                                event.preventDefault();
                                host._selection.click(this);
                            }
                        }
                    })
                    .style("opacity", 0)
                    .each(function (this: SVGElement, d: any) {
                        const element = d3Select(this);
                        element.append("rect")
                            .attr("class", "columnRect series series-" + context.cssTag(d.column))
                            ;
                        element.append("text")
                            .attr("class", "columnRectText")
                            .style("stroke", "transparent")
                            ;
                    })
                    ;
                columnGEnter.transition().duration(duration)
                    .style("opacity", 1)
                    ;
                const domainLength = host.yAxisStacked() ? dataLen : columnScale.bandwidth();
                columnGEnter.merge(columnGRect as any)
                    .attr("tabindex", context.tabNavigation() ? 0 : null) // Tabster Groupper manages these inner focusables
                    .attr("role", context.tabNavigation() ? "button" : null) // ARIA role for accessibility
                    .attr("aria-label", context.tabNavigation() ? (d: any) => `${d.origRow[0]} - ${d.column}: ${d.value instanceof Array ? d.value[1] - d.value[0] : d.value}` : null)
                    .each(function (this: SVGElement, d: any) {
                        const element = d3Select(this);
                        const domainPos = host.dataPos(dataRow[0]) + (host.yAxisStacked() ? 0 : columnScale(d.column)) + offset;
                        const upperValue = d.value instanceof Array ? d.value[1] : d.value;
                        let valueText = d.origRow[d.idx];
                        if (context.showValue()) {
                            const dm = context.dataMeta();
                            switch (context.showValueAsPercent()) {
                                case "series":
                                    const seriesSum = typeof dm.sum !== "undefined" ? dm.sum : seriesSums[d.idx];
                                    valueText = formatPct(valueText / seriesSum);
                                    break;
                                case "domain":
                                    const domainSum = typeof dm.sum !== "undefined" ? dm.sum : domainSums[dataRowIdx];
                                    valueText = formatPct(valueText / domainSum);
                                    break;
                                case null:
                                default:
                                    valueText = d3Format(context.showValueFormat())(valueText);
                                    break;
                            }
                        }
                        const upperValuePos = host.valuePos(upperValue);
                        const lowerValuePos = host.valuePos(d.value instanceof Array ? d.value[0] : 0);
                        const valuePos = Math.min(lowerValuePos, upperValuePos);
                        const valueLength = Math.abs(upperValuePos - lowerValuePos);

                        const innerTextHeight = context.innerTextFontSize();
                        const innerTextPadding = context.innerTextPadding_exists() ? context.innerTextPadding() : innerTextHeight / 2.5;

                        const dataRect = context.intersectRectRect(
                            {
                                x: isHorizontal ? domainPos : valuePos,
                                y: isHorizontal ? valuePos : domainPos,
                                width: isHorizontal ? domainLength : valueLength,
                                height: isHorizontal ? valueLength : domainLength
                            },
                            {
                                x: 0,
                                y: 0,
                                width: axisSize.width,
                                height: axisSize.height
                            }
                        );

                        const _rects = element.select("rect").transition().duration(duration)
                            .style("fill", (d: any) => context.fillColor(d.row, d.column, d.value, d.origRow))
                            ;

                        if (isHorizontal) {
                            _rects
                                .attr("x", domainPos)
                                .attr("y", valuePos)
                                .attr("width", domainLength)
                                .attr("height", valueLength)
                                ;
                        } else {
                            _rects
                                .attr("y", domainPos)
                                .attr("x", valuePos)
                                .attr("height", domainLength)
                                .attr("width", valueLength)
                                ;
                        }
                        const _texts = element.select("text").transition().duration(duration)
                            .style("font-size", innerTextHeight + "px")
                            .style("fill", (d: any) => context.textColor(d.row, d.column, d.value, d.origRow))
                            ;

                        _texts.style("font-family", context.innerTextFontFamily_exists() ? context.innerTextFontFamily() : null);

                        const padding = context.innerTextPadding_exists() ? context.innerTextPadding() : 8;

                        const textHeightOffset = innerTextHeight / 2.7;

                        if (isHorizontal) { // Column
                            const y = dataRect.y + dataRect.height - innerTextPadding;
                            _texts
                                .attr("x", domainPos + (domainLength / 2))
                                .attr("y", y + textHeightOffset)
                                .attr("transform", `rotate(-90, ${domainPos + (domainLength / 2)}, ${y})`)
                                ;
                        } else { // Bar
                            _texts
                                .attr("x", dataRect.x + padding)
                                .attr("y", domainPos + (domainLength / 2) + textHeightOffset)
                                ;
                        }
                        _texts
                            .attr("height", domainLength)
                            .attr("width", valueLength)
                            ;
                        if (context.showInnerText()) {
                            _texts
                                .text((d: any) => {
                                    const innerText = context.innerText(d.origRow, d.origRow[columnLength], d.idx);
                                    if (innerText) {
                                        const clippedValueLength = isHorizontal ? dataRect.height : dataRect.width;
                                        const innerTextObj = context.calcInnerText(clippedValueLength, innerText, valueText);
                                        d.innerTextObj = innerTextObj;

                                        return innerTextObj.text;
                                    }
                                    return "";
                                })
                                ;
                        }
                        const dataText = element.selectAll(".dataText").data(context.showValue() ? [`${upperValue}`] : []);
                        const dataTextEnter = dataText.enter().append("g")
                            .attr("class", "dataText")
                            .each(function (this: SVGElement, d) {
                                context.textLocal.set(this, new Text().target(this).colorStroke_default("transparent"));
                            });
                        dataTextEnter.merge(dataText as any)
                            .each(function (this: SVGElement) {
                                const pos = { x: 0, y: 0 };
                                const valueFontFamily = context.valueFontFamily();
                                const valueFontSize = context.valueFontSize();
                                const textSize = context.textSize(valueText, valueFontFamily, valueFontSize);

                                const isPositive = parseFloat(valueText) >= 0;

                                let valueAnchor = context.valueAnchor() ? context.valueAnchor() : isHorizontal ? "middle" : "start";

                                const leftSpace = dataRect.x;
                                const rightSpace = axisSize.width - (dataRect.x + dataRect.width);
                                const topSpace = dataRect.y;
                                const bottomSpace = axisSize.height - (dataRect.y + dataRect.height);

                                let noRoomInside;
                                let isOutside;
                                let noRoomOnExpectedSide;

                                if (d.innerTextObj) {
                                    const { padding, valueTextWidth } = d.innerTextObj;
                                    isOutside = false;
                                    if (isHorizontal) { // Column
                                        valueAnchor = "middle";
                                        pos.x = domainPos + (domainLength / 2);

                                        if (d.innerTextObj.category === 4) {
                                            isOutside = true;
                                            pos.y = valuePos - padding - (valueFontSize / 2);
                                        } else {
                                            pos.y = valuePos + padding + (valueFontSize / 2);
                                        }
                                    } else { // Bar
                                        valueAnchor = "start";
                                        if (d.innerTextObj.category === 4) {
                                            isOutside = true;
                                            pos.x = (valueLength + valuePos) + padding;
                                        } else {
                                            pos.x = (valueLength + valuePos) - valueTextWidth - padding;
                                        }
                                        pos.y = domainPos + (domainLength / 2);
                                    }
                                } else {
                                    /*
                                    IF this.valueCentered() and NO ROOM INSIDE
                                        ...then ASSUME THERES ROOM OUTSIDE
                                        IF NO ROOM OUTSIDE ON EXPECTED SIDE
                                            ...then ASSUME THERES ROOM ON THE OPPOSITE SIDE
                                    */
                                    if (isHorizontal) { // Column
                                        noRoomInside = dataRect.height < textSize.height;
                                        isOutside = !context.valueCentered() || noRoomInside;

                                        pos.x = dataRect.x + (dataRect.width / 2);

                                        if (isOutside) {
                                            if (isPositive) {
                                                noRoomOnExpectedSide = topSpace < textSize.height + padding;
                                                if (noRoomOnExpectedSide) {
                                                    if (!noRoomInside) {
                                                        isOutside = false;
                                                        pos.y = dataRect.y + (dataRect.height / 2);
                                                    } else {
                                                        pos.y = dataRect.y + dataRect.height + textSize.height;
                                                    }
                                                } else {
                                                    pos.y = dataRect.y - (textSize.height / 2) - padding;
                                                }
                                            } else {
                                                noRoomOnExpectedSide = bottomSpace < textSize.height;
                                                if (noRoomOnExpectedSide) {
                                                    if (!noRoomInside) {
                                                        isOutside = false;
                                                        pos.y = dataRect.y + (dataRect.height / 2);
                                                    } else {
                                                        pos.y = dataRect.y - (textSize.height / 2) - padding;
                                                    }
                                                } else {
                                                    pos.y = dataRect.y + textSize.height + padding;
                                                }
                                            }
                                        } else {
                                            pos.y = dataRect.y + (dataRect.height / 2);
                                        }
                                    } else { // Bar
                                        noRoomInside = dataRect.width < textSize.width;
                                        isOutside = !context.valueCentered() || noRoomInside;

                                        pos.y = dataRect.y + (dataRect.height / 2);

                                        if (isOutside) {
                                            if (isPositive) {
                                                noRoomOnExpectedSide = rightSpace < textSize.width + padding;
                                                if (noRoomOnExpectedSide) {
                                                    if (context.showInnerText() || !noRoomInside) {
                                                        isOutside = false;
                                                        pos.x = dataRect.x + (dataRect.width / 2);
                                                    } else {
                                                        pos.x = dataRect.x - (textSize.width - padding);
                                                    }
                                                } else {
                                                    pos.x = dataRect.x + dataRect.width + (textSize.width / 2) + padding;
                                                }
                                            } else {
                                                noRoomOnExpectedSide = leftSpace < textSize.width;
                                                if (noRoomOnExpectedSide) {
                                                    if (context.showInnerText() || !noRoomInside) {
                                                        isOutside = false;
                                                        pos.x = dataRect.x + (dataRect.width / 2);
                                                    } else {
                                                        pos.x = dataRect.x + dataRect.width + (textSize.width - padding);
                                                    }
                                                } else {
                                                    pos.x = dataRect.x - (textSize.width - padding);
                                                }
                                            }
                                        } else {
                                            pos.x = dataRect.x + (dataRect.width / 2);
                                        }
                                    }
                                }
                                const textColor = isOutside ? null : context.textColor(d.row, d.column, d.value, d.origRow);

                                //  Prevent overlapping labels on stacked columns
                                const columns = context.columns();
                                const hideValue = (context.yAxisStacked() && noRoomInside) ||
                                    (isOutside && context.yAxisStacked() && columns.indexOf(d.column) !== columns.length - 1);
                                context.textLocal.get(this)
                                    .pos(pos)
                                    .anchor(valueAnchor)
                                    .fontFamily(valueFontFamily)
                                    .fontSize(valueFontSize)
                                    .text(`${valueText}`)
                                    .colorFill(textColor)
                                    .visible(context.showValue() && !hideValue)
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

                const value4pos = host.yAxisStacked() ? domainSums[dataRowIdx] : Math.max(...dataRow.filter((_, idx) => idx > 0 && idx < columnLength));
                const stackedTotalText = element.selectAll(".stackedTotalText").data(context.showDomainTotal() ? [domainSums[dataRowIdx]] : []);
                const stackedTotalTextEnter = stackedTotalText.enter().append("g")
                    .attr("class", "stackedTotalText")
                    .each(function (this: SVGElement, d) {
                        context.stackedTextLocal.set(this, new Text().target(this).colorStroke_default("transparent"));
                    });
                stackedTotalTextEnter.merge(stackedTotalText as any)
                    .each(function (this: SVGElement, d: any) {
                        const pos = { x: 0, y: 0 };
                        const domainPos = host.dataPos(dataRow[0]);
                        const valuePos = host.valuePos(value4pos);

                        const valueFontFamily = context.valueFontFamily();
                        const valueFontSize = context.valueFontSize();
                        const textSize = context.textSize(d, valueFontFamily, valueFontSize);

                        const isPositive = parseFloat(d) >= 0;
                        let valueAnchor: "start" | "middle" | "end" = "middle";
                        if (isHorizontal) {
                            pos.x = domainPos;
                            if (isPositive) {
                                pos.y = valuePos - textSize.height / 2;
                            } else {
                                pos.y = valuePos + textSize.height / 2;
                            }
                        } else {
                            valueAnchor = "start";
                            pos.y = domainPos;
                            if (isPositive) {
                                pos.x = valuePos + textSize.width / 2;
                            } else {
                                pos.x = valuePos - textSize.width / 2;
                            }
                        }

                        context.stackedTextLocal.get(this)
                            .pos(pos)
                            .anchor(valueAnchor)
                            .fontFamily(valueFontFamily)
                            .fontSize(valueFontSize)
                            .text(d)
                            .render()
                            ;

                    });
                stackedTotalText.exit()
                    .each(function (this: SVGElement, d) {
                        context.textLocal.get(this).target(null);
                    })
                    .remove()
                    ;
            });
        column.exit().transition().duration(duration)
            .remove()
            ;
    }

    calcInnerText(offset, innerText, valueText) {
        const fontFamily = this.innerTextFontFamily_exists() ? this.innerTextFontFamily() : "Verdana";
        const fontSize = this.innerTextFontSize();
        const valueFontFamily = this.valueFontFamily_exists() ? this.valueFontFamily() : "Verdana";
        const valueFontSize = this.valueFontSize();
        const padding = this.innerTextPadding_exists() ? this.innerTextPadding() : fontSize / 2.5;
        const valueTextWidth = this.isHorizontal ? valueFontSize : this.textSize(valueText, valueFontFamily, valueFontSize).width;
        const ellipsisWidth = this.textSize("...", fontFamily, fontSize).width;
        const innerTextWidth = this.textSize(innerText, fontFamily, fontSize).width;
        const origInnerText = innerText;

        const fullWidth = (padding * 3) + innerTextWidth + valueTextWidth;
        const fullWidth2 = (padding * 3) + ellipsisWidth + valueTextWidth;
        const fullWidth3 = (padding * 1) + valueTextWidth;
        /*
        Categories:
            1) room to display inner text (with padding) AND value text (with padding)
            2) room to display ellipsis (with padding) AND value text (with padding)
            3) room to display value text only (with padding)
            4) no room to display any text except value on the outside
        */
        let category = 4;
        if (fullWidth < offset) {
            category = 1;
        } else if (fullWidth2 < offset) {
            const excessWidth = offset - fullWidth2;
            let _text = "";
            for (const letter of innerText) {
                if (this.textSize(_text + letter, fontFamily, fontSize).width > excessWidth) {
                    innerText = _text + "...";
                    break;
                } else {
                    _text += letter;
                }
            }
            category = 2;
        } else if (fullWidth3 < offset) {
            innerText = "";
            category = 3;
        } else {
            innerText = "";
        }

        return {
            text: innerText,
            isTruncated: origInnerText !== innerText,
            padding,
            category,
            valueTextWidth
        };
    }

    innerText(origRow, lparam, idx): string {
        return origRow[0];
    }
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
    showInnerText(): boolean;
    showInnerText(_: boolean): this;
    showValueFormat(): string;
    showValueFormat(_: string): this;
    showValueAsPercent(): null | "series" | "domain";
    showValueAsPercent(_: null | "series" | "domain"): this;
    showValueAsPercentFormat(): string;
    showValueAsPercentFormat(_: string): this;
    showDomainTotal(): boolean;
    showDomainTotal(_: boolean): this;
    valueCentered(): boolean;
    valueCentered(_: boolean): this;
    valueAnchor(): "start" | "middle" | "end";
    valueAnchor(_: "start" | "middle" | "end"): this;
    valueFontFamily(): string;
    valueFontFamily(_: string): this;
    valueFontFamily_exists(): boolean;
    valueFontSize(): number;
    valueFontSize(_: number): this;
    xAxisSeriesPaddingInner(): number;
    xAxisSeriesPaddingInner(_: number): this;
    innerTextFontFamily(): string;
    innerTextFontFamily(_: string): this;
    innerTextFontFamily_exists(): boolean;
    innerTextFontSize(): number;
    innerTextFontSize(_: number): this;
    innerTextPadding(): number;
    innerTextPadding(_: number): this;
    innerTextPadding_exists(): boolean;
    tooltipInnerTextEllipsedOnly(): boolean;
    tooltipInnerTextEllipsedOnly(_: boolean): this;

    //  INDChart  ---
    fillColor(row, column, value, origRow): string;
    textColor(row, column, value, origRow): string;
    dblclick(row, column, selected): void;

    //  ITooltip  ---
    tooltip;
    tooltipHTML(_): string;
    tooltipFormat(_): string;
    tooltipStyle(): "default" | "none" | "series-table";
    tooltipStyle(_: "default" | "none" | "series-table"): this;
}

Column.prototype.publish("valueFontFamily", null, "string", "Font family of value text", null, { optional: true });
Column.prototype.publish("valueFontSize", 12, "number", "Height of value text (pixels)");
Column.prototype.publish("innerTextFontFamily", null, "string", "Font family of inner text", null, { optional: true });
Column.prototype.publish("innerTextPadding", 8, "number", "Offset of inner text (pixels)", null, { optional: true });
Column.prototype.publish("innerTextFontSize", 12, "number", "Height of inner text (pixels)");
Column.prototype.publish("paletteID", "default", "set", "Color palette for this widget", () => Column.prototype._palette.switch(), { tags: ["Basic", "Shared"] });
Column.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });
Column.prototype.publish("showValue", false, "boolean", "Show Value in column");
Column.prototype.publish("showInnerText", false, "boolean", "Show Label in column");
Column.prototype.publish("showValueFormat", ",", "string", "D3 Format for Value", null, { disable: (w: Column) => !w.showValue() || !!w.showValueAsPercent() });
Column.prototype.publish("showValueAsPercent", null, "set", "If showValue is true, optionally show value as a percentage by Series or Domain", [null, "series", "domain"], { disable: w => !w.showValue(), optional: true });
Column.prototype.publish("showValueAsPercentFormat", ".0%", "string", "D3 Format for %", null, { disable: (w: Column) => !w.showValue() || !w.showValueAsPercent() });
Column.prototype.publish("showDomainTotal", false, "boolean", "Show Total Value for Stacked Columns", null);
Column.prototype.publish("valueCentered", false, "boolean", "Show Value in center of column");
Column.prototype.publish("valueAnchor", "middle", "set", "text-anchor for shown value text", ["start", "middle", "end"]);
Column.prototype.publish("xAxisSeriesPaddingInner", 0.0, "number", "Determines the ratio of the range that is reserved for blank space between band (0->1)");
Column.prototype.publish("tooltipInnerTextEllipsedOnly", false, "boolean", "Show tooltip only when inner text is truncated with an ellipsis");

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
