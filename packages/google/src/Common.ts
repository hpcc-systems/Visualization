import { HTMLWidget } from "@hpcc-js/common";
import { addListener, arrayToDataTable, createChart, isLoaded, load, removeAllListeners } from "./Loader";

// import "goog!visualization,1,packages:[corechart]";

export class Common extends HTMLWidget {
    _chartLibrary = "visualization";
    _chartPackage = "corechart";
    _chartType;
    _selection;
    _palette;
    _chart;

    constructor() {
        super();

        this._tag = "div";

        this._selection = {};
    }

    formatData() {
        let data = null;
        if (this.data().length) {
            data = [this.columns()].concat(this.data().map(function (row, row_idx) {
                return row.map(function (cell, idx) {
                    if (idx > 0) {
                        if (isNaN(cell)) {
                            console.log("Invalid Data:  " + cell + " (" + row_idx + ", " + idx + ")");
                        }
                        return parseFloat(cell);
                    }
                    return cell;
                });
            }));
        } else {
            data = [
                ["", { role: "annotation" }],
                ["", ""]
            ];
        }
        return arrayToDataTable(data);
    }

    getChartOptions() {
        const colors = this.columns().filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        const chartOptions = {
            backgroundColor: {
                stroke: this.backgroundColorStroke(),
                strokeWidth: this.backgroundColorStrokeWidth(),
                fill: this.backgroundColorFill()
            },
            width: this.width(),
            height: this.height(),
            colors,
            fontSize: this.fontSize(),
            fontName: this.fontFamily(),
            fontColor: this.fontColor(),
            title: this.title(),
            titlePosition: this.titlePosition(),

            chartArea: {
                width: this.chartAreaWidth(),
                height: this.chartAreaHeight(),
                left: this.chartAreaLeft(),
                top: this.chartAreaTop()
            },
            animation: {
                duration: this.animationDuration(),
                startup: this.animationOnStartup(),
                easing: this.animationEasing()
            },
            legend: {
                alignment: this.legendAlignment(),
                position: this.showLegend() ? this.legendPosition() : "none",
                maxLines: 2,
                textStyle: {
                    color: this.legendFontColor(),
                    fontName: this.legendFontFamily(),
                    fontSize: this.legendFontSize(),
                    bold: this.legendFontBold(),
                    italic: this.legendFontItalic()
                }
            }
        };
        return chartOptions;
    }

    getNumSeries() {
        return this.columns().slice(1).length;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("overflow", "hidden");
    }

    init(domNode, element) {
        if (this._chart) {
            return;
        }

        this._chart = createChart(this._chartLibrary, this._chartType, domNode);

        const context = this;
        addListener(this._chart, "select", function () {
            const selectedItem = context._chart.getSelection()[0];
            if (selectedItem) {
                context._selection = {
                    data: context.rowToObj(context.data()[selectedItem.row]),
                    column: context.columns()[selectedItem.column] || null
                };
            } else {
                context._selection = { data: {}, column: null };
            }
            context.click(context._selection.data, context._selection.column, Object.keys(context._selection.data).length !== 0);
        });
    }

    kill(domNode, element) {
        if (!this._chart) {
            return;
        }

        removeAllListeners(this._chart);
        element.html("");
        delete this._chart;
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        if (this.data().length && this.columns().length) {
            this.init(domNode, element);
            this._chart.draw(this.formatData(), this.getChartOptions());
        } else {
            this.kill(domNode, element);
        }
    }

    render(callback?) {
        if (isLoaded(this._chartPackage)) {
            return super.render(callback);
        }
        load(this._chartPackage).then(() => {
            super.render(callback);
        });
        return this;
    }

    click(row, col, sel) {
    }

    fontSize: { (): number; (_: number): Common };
    fontSize_exists: () => boolean;
    fontFamily: { (): string; (_: string): Common };
    fontFamily_exists: () => boolean;
    fontColor: { (): string; (_: string): Common };
    fontColor_exists: () => boolean;
    showLegend: { (): boolean; (_: boolean): Common };
    showLegend_exists: () => boolean;
    legendFontColor: { (): string; (_: string): Common };
    legendFontColor_exists: () => boolean;
    legendFontFamily: { (): string; (_: string): Common };
    legendFontFamily_exists: () => boolean;
    legendFontSize: { (): number; (_: number): Common };
    legendFontSize_exists: () => boolean;
    legendFontBold: { (): boolean; (_: boolean): Common };
    legendFontBold_exists: () => boolean;
    legendFontItalic: { (): boolean; (_: boolean): Common };
    legendFontItalic_exists: () => boolean;
    chartAreaWidth: { (): string; (_: string): Common };
    chartAreaWidth_exists: () => boolean;
    chartAreaHeight: { (): string; (_: string): Common };
    chartAreaHeight_exists: () => boolean;
    chartAreaTop: { (): string; (_: string): Common };
    chartAreaTop_exists: () => boolean;
    chartAreaLeft: { (): string; (_: string): Common };
    chartAreaLeft_exists: () => boolean;
    legendAlignment: { (): string; (_: string): Common };
    legendAlignment_exists: () => boolean;
    legendPosition: { (): string; (_: string): Common };
    legendPosition_exists: () => boolean;
    animationDuration: { (): number; (_: number): Common };
    animationDuration_exists: () => boolean;
    animationOnStartup: { (): boolean; (_: boolean): Common };
    animationOnStartup_exists: () => boolean;
    animationEasing: { (): string; (_: string): Common };
    animationEasing_exists: () => boolean;
    title: { (): string; (_: string): Common };
    title_exists: () => boolean;
    titlePosition: { (): string; (_: string): Common };
    titlePosition_exists: () => boolean;
    backgroundColorStroke: { (): string; (_: string): Common };
    backgroundColorStroke_exists: () => boolean;
    backgroundColorStrokeWidth: { (): number; (_: number): Common };
    backgroundColorStrokeWidth_exists: () => boolean;
    backgroundColorFill: { (): string; (_: string): Common };
    backgroundColorFill_exists: () => boolean;
}
Common.prototype._class += " google_Common";

Common.prototype.publish("fontSize", null, "number", "Font Size", null, { tags: ["Basic", "Shared"] });
Common.prototype.publish("fontFamily", null, "string", "Font Name", null, { tags: ["Basic", "Shared"] });
Common.prototype.publish("fontColor", null, "html-color", "Font Color", null, { tags: ["Basic", "Shared"] });

Common.prototype.publish("showLegend", false, "boolean", "Show Legend", null, { tags: ["Basic", "Shared"] });

// below ones are TODO ... BOLD/ITALTIC needs to be 1 param maybe?
Common.prototype.publish("legendFontColor", null, "html-color", "Legend Font Color", null, { tags: ["Private"] });
Common.prototype.publish("legendFontFamily", null, "string", "Legend Font Name", null, { tags: ["Private"] });
Common.prototype.publish("legendFontSize", null, "number", "Legend Font Size", null, { tags: ["Private"] });
Common.prototype.publish("legendFontBold", false, "boolean", "Legend Font Bold", null, { tags: ["Private"] });
Common.prototype.publish("legendFontItalic", false, "boolean", "Legend Font Italic", null, { tags: ["Private"] });

Common.prototype.publish("chartAreaWidth", null, "string", "Chart Area Width", null, { tags: ["Advanced"] }); // num or string
Common.prototype.publish("chartAreaHeight", null, "string", "Chart Area Height", null, { tags: ["Advanced"] });
Common.prototype.publish("chartAreaTop", null, "string", "Chart Area Distance From Top", null, { tags: ["Advanced"] }); // num or string (google default auto)
Common.prototype.publish("chartAreaLeft", null, "string", "Chart Area Distance From Left", null, { tags: ["Advanced"] });

// TODO: Remove the legend params ... above shared params????
Common.prototype.publish("legendAlignment", "center", "set", "Legend Alignment", ["", "start", "center", "end"], { tags: ["Private"] });
Common.prototype.publish("legendPosition", "right", "set", "Legend Position", ["", "bottom", "labeled", "left", "right", "top"], { tags: ["Private"] });

// TODO:Do these apply to animating between data sets?
Common.prototype.publish("animationDuration", 0, "number", "Animation Duration", null, { tags: ["Advanced"] });
Common.prototype.publish("animationOnStartup", true, "boolean", "Animate On Startup", null, { tags: ["Advanced"] });
Common.prototype.publish("animationEasing", "linear", "set", "Animation Easing", ["linear", "in", "out", "inAndOut"], { tags: ["Advanced"] });

Common.prototype.publish("title", "", "string", "Text To Display Above The Chart", null, { tags: ["Private"] });
Common.prototype.publish("titlePosition", "out", "set", "Position of Title", ["in", "out", "none"], { tags: ["Private"] });

// need to see if this is going to be shared these 3 below
Common.prototype.publish("backgroundColorStroke", null, "html-color", "Background Border Color", null, { tags: ["Advanced", "Shared"] });
Common.prototype.publish("backgroundColorStrokeWidth", 0, "number", "Background Border Width", null, { tags: ["Advanced", "Shared"] });
Common.prototype.publish("backgroundColorFill", "transparent", "html-color", "Background Color", null, { tags: ["Advanced", "Shared"] });
