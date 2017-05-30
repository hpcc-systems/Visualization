import { INDChart } from "@hpcc-js/api";
import { format as d3Format } from "d3-format";
import { timeFormat as d3TimeFormat } from "d3-time-format";
import { Common } from "./Common";

export class CommonND extends Common {
    constructor() {
        super();
        INDChart.call(this);

        const context = this;
        this._config.color = {
            pattern: this._palette.colors()
        };

        this._config.data.color = function (color, d) {
            return context._palette(d.id ? d.id : d);
        };
    }

    enter(domNode, element) {
        if (this.subchart()) {
            this._config.subchart = {
                show: true, size: {
                    height: 20
                }
            };
        }

        let xAxisType;
        switch (this.xAxisType()) {
            case "time":
                xAxisType = "timeseries";
                break;
            default:
                xAxisType = this.xAxisType();
        }

        this._config.axis.x = {
            type: xAxisType,
            tick: {
                rotate: this.xAxisLabelRotation(),
                multiline: this.axisTickLabelMultiLine()
            },
            label: {
                text: this.xAxisTitle(),
                position: "outer-center"
            }
        };
        this._config.axis.y = {
            label: {
                text: this.yAxisTitle(),
                position: "outer-center"
            }
        };
        this._config.grid = {
            x: {
                show: this.showXGrid(),
            },
            y: {
                show: this.showYGrid(),
            }
        };

        switch (this.xAxisType()) {
            case "category":
                this._config.axis.tick = {
                    centered: true,
                    multiline: this.axisTickLabelMultiLine()
                };
                break;
            case "time":
                this.data(this.data().map(function (row, rIdx) {
                    return row.map(function (column, cIdx) {
                        if (cIdx === 0 && typeof column === "number") {
                            return column.toString();
                        } else {
                            return column;
                        }
                    });
                }));
                this._config.data.x = this.columns()[0];
                this._config.data.xFormat = this.xAxisTypeTimePattern();
                break;
        }

        Common.prototype.enter.apply(this, arguments);
    }

    update(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this.c3Chart.internal.config.axis_y_tick_format = this.yAxisTickFormat() ? d3Format(this.yAxisTickFormat()) : undefined;
        if (this.xAxisType() === "time") {
            this.c3Chart.internal.config.axis_x_tick_format = this.xAxisTickFormat() ? d3TimeFormat(this.xAxisTickFormat()) : "%Y-%m-%d %I:%M:%S %p";
        } else {
            this.c3Chart.internal.config.axis_x_tick_format = this.xAxisTickFormat() ? d3Format(this.xAxisTickFormat()) : undefined;
        }

        Common.prototype.update.apply(this, arguments);

        element.selectAll(".c3 svg").style("font-size", this.axisFontSize_exists() ? this.axisFontSize() + "px" : null);
        element.selectAll(".c3 svg text").style("font-family", this.axisFontFamily());

        element.selectAll(".c3 .c3-axis.c3-axis-x text").style("fill", this.xAxisFontColor());
        element.selectAll(".c3 .c3-axis.c3-axis-y text").style("fill", this.yAxisFontColor());

        element.selectAll(".c3 .c3-axis path").style("stroke-width", this.axisLineWidth_exists() ? this.axisLineWidth() + "px" : null);
        element.selectAll(".c3 .c3-axis-x path, .c3 .c3-axis-x line").style("stroke", this.xAxisBaselineColor());
        element.selectAll(".c3 .c3-axis-y path, .c3 .c3-axis-y line").style("stroke", this.yAxisBaselineColor());

        element.selectAll(".c3-axis-x-label")
            .style("font-family", this.xAxisTitleFontFamily())
            // "font-weight": "",
            .style("font-size", this.xAxisTitleFontSize())
            .style("stroke", this.xAxisTitleFontColor())
            ;

        element.selectAll(".c3-axis-y-label")
            .style("font-family", this.yAxisTitleFontFamily())
            // "font-weight": "",
            .style("font-size", this.yAxisTitleFontSize())
            .style("stroke", this.yAxisTitleFontColor())
            ;
    }

    getChartOptions() {
        const chartOptions = Common.prototype.getChartOptions.apply(this, arguments);

        switch (this.xAxisType()) {
            case "category":
                chartOptions.categories = this.getC3Categories();
                chartOptions.columns = this.getC3Columns();
                break;
            case "indexed":
            case "time":
                chartOptions.columns = this.getC3Columns();
                break;
        }

        return chartOptions;
    }

    paletteID: { (): string; (_: string): CommonND };
    paletteID_exists: () => boolean;
    axisLineWidth: { (): number; (_: number): CommonND };
    axisLineWidth_exists: () => boolean;
    xAxisBaselineColor: { (): string; (_: string): CommonND };
    xAxisBaselineColor_exists: () => boolean;
    yAxisBaselineColor: { (): string; (_: string): CommonND };
    yAxisBaselineColor_exists: () => boolean;
    xAxisFontColor: { (): string; (_: string): CommonND };
    xAxisFontColor_exists: () => boolean;
    yAxisFontColor: { (): string; (_: string): CommonND };
    yAxisFontColor_exists: () => boolean;
    axisFontSize: { (): number; (_: number): CommonND };
    axisFontSize_exists: () => boolean;
    axisFontFamily: { (): string; (_: string): CommonND };
    axisFontFamily_exists: () => boolean;
    xAxisLabelRotation: { (): number; (_: number): CommonND };
    xAxisLabelRotation_exists: () => boolean;
    yAxisTitle: { (): string; (_: string): CommonND };
    yAxisTitle_exists: () => boolean;
    xAxisTitle: { (): string; (_: string): CommonND };
    xAxisTitle_exists: () => boolean;
    xAxisTitleFontColor: { (): string; (_: string): CommonND };
    xAxisTitleFontColor_exists: () => boolean;
    xAxisTitleFontFamily: { (): string; (_: string): CommonND };
    xAxisTitleFontFamily_exists: () => boolean;
    xAxisTitleFontSize: { (): number; (_: number): CommonND };
    xAxisTitleFontSize_exists: () => boolean;
    yAxisTitleFontColor: { (): string; (_: string): CommonND };
    yAxisTitleFontColor_exists: () => boolean;
    yAxisTitleFontFamily: { (): string; (_: string): CommonND };
    yAxisTitleFontFamily_exists: () => boolean;
    yAxisTitleFontSize: { (): number; (_: number): CommonND };
    yAxisTitleFontSize_exists: () => boolean;
    xAxisType: { (): string; (_: string): CommonND };
    xAxisType_exists: () => boolean;
    subchart: { (): boolean; (_: boolean): CommonND };
    subchart_exists: () => boolean;
    showXGrid: { (): boolean; (_: boolean): CommonND };
    showXGrid_exists: () => boolean;
    showYGrid: { (): boolean; (_: boolean): CommonND };
    showYGrid_exists: () => boolean;
    useClonedPalette: { (): boolean; (_: boolean): CommonND };
    useClonedPalette_exists: () => boolean;
    xAxisTickFormat: { (): string; (_: string): CommonND };
    xAxisTickFormat_exists: () => boolean;
    yAxisTickFormat: { (): string; (_: string): CommonND };
    yAxisTickFormat_exists: () => boolean;
    xAxisTypeTimePattern: { (): string; (_: string): CommonND };
    xAxisTypeTimePattern_exists: () => boolean;
    yAxisTypeTimePattern: { (): string; (_: string): CommonND };
    yAxisTypeTimePattern_exists: () => boolean;
    axisTickLabelMultiLine: { (): boolean; (_: boolean): CommonND };
    axisTickLabelMultiLine_exists: () => boolean;

    //  INDChart
    _palette;
    click: (row, column, selected) => void;
    dblclick: (row, column, selected) => void;
}
CommonND.prototype._class += " c3chart_CommonND";
CommonND.prototype.implements(INDChart.prototype);

CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch(), { tags: ["Basic", "Shared"] });

CommonND.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width", null, { tags: ["Intermediate", "Shared"] });

CommonND.prototype.publish("xAxisBaselineColor", null, "html-color", "X Axis Baseline Color", null, { tags: ["Basic", "Shared"] });
CommonND.prototype.publish("yAxisBaselineColor", null, "html-color", "Y Axis Baseline Color", null, { tags: ["Basic", "Shared"] });

CommonND.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color", null, { tags: ["Basic", "Shared"] });
CommonND.prototype.publish("yAxisFontColor", null, "html-color", "Y Axis Text Font Color", null, { tags: ["Basic", "Shared"] });

CommonND.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size", null, { tags: ["Basic", "Shared"] });
CommonND.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Text Font Name", null, { tags: ["Basic", "Shared"] });

CommonND.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle", null, { tags: ["Intermediate", "Shared"] });

CommonND.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title", null, { tags: ["Intermediate", "Shared"] });
CommonND.prototype.publish("xAxisTitle", "", "string", "X-Axis Title", null, { tags: ["Intermediate", "Shared"] });

CommonND.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)", null, { tags: ["Advanced", "Shared"] });
CommonND.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)", null, { tags: ["Advanced", "Shared"] });
CommonND.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Title Text Style (Font Size)", null, { tags: ["Advanced", "Shared"] });

CommonND.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)", null, { tags: ["Advanced", "Shared"] });
CommonND.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)", null, { tags: ["Advanced", "Shared"] });
CommonND.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)", null, { tags: ["Advanced", "Shared"] });

CommonND.prototype.publish("xAxisType", "category", "set", "X-Axis Type", ["category", "time", "indexed"], { tags: ["Intermediate"] });

CommonND.prototype.publish("subchart", false, "boolean", "Show SubChart", null, { tags: ["Private"] });

CommonND.prototype.publish("showXGrid", false, "boolean", "Show X Grid", null, { tags: ["Intermediate"] });
CommonND.prototype.publish("showYGrid", false, "boolean", "Show Y Grid", null, { tags: ["Intermediate"] });

CommonND.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

CommonND.prototype.publish("xAxisTickFormat", "", "string", "X-Axis Tick Format", null, {});
CommonND.prototype.publish("yAxisTickFormat", null, "string", "Y-Axis Tick Format", null, { optional: true });

CommonND.prototype.publish("xAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern", null, {});
CommonND.prototype.publish("yAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern", null, {});

CommonND.prototype.publish("axisTickLabelMultiLine", false, "boolean", "Show Y Grid", null, { tags: ["Intermediate"] });
