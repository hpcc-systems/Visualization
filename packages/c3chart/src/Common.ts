import { generate as c3Generate } from "@hpcc-js/c3-shim";
import { HTMLWidget } from "@hpcc-js/common";

import "../src/Common.css";

export class Common extends HTMLWidget {
    _type;
    _config;
    _prevColumnIDs;
    xAxisType;
    c3Chart;

    constructor() {
        super();

        const context = this;
        this._tag = "div";
        this._type = "unknown";
        this._config = {
            axis: {
            },
            legend: {
                position: "bottom",
                show: true
            },
            data: {}
        };
        this._prevColumnIDs = [];

        this._config.data.onclick = function (d, element) {
            context.click(context.rowToObj(context.data()[d.index]), d.id, context.c3Chart.selected().length > 0);
        };
    }

    type(_) {
        if (!arguments.length) return this._type;
        this._type = _;
        return this;
    }

    getC3Series() {
        return this.columns().filter(function (d, i) { return i > 0; });
    }

    getC3Rows() {
        const retVal = [this.columns().filter(function (item, idx) { return idx > 0; })].concat(this.data().map(function (row) {
            return row.filter(function (cell, idx) {
                return idx > 0;
            });
        }));
        return retVal;
    }

    getC3Categories() {
        const retVal = this.data().map(function (row, idx) { return row[0]; });
        return retVal;
    }

    getC3Column(colNum) {
        const retVal = [this.columns()[colNum]].concat(this.data().map(function (row, idx) { return row[colNum]; }));
        return retVal;
    }

    getC3Columns(total?) {
        if (!this.data().length) {
            return [];
        }
        total = total || this.columns().length;
        const retVal = [];
        const s = typeof this.xAxisType === "function" && this.xAxisType() === "time" ? 0 : 1;
        for (let i = s; i < total; ++i) {
            retVal.push(this.getC3Column(i));
        }
        return retVal;
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("overflow", "hidden");

        this._config.size = {
            width: this.width(),
            height: this.height()
        };
        this._config.transition = {
            duration: this.animationDuration()
        };
        this._config.data.type = this._type;
        if (this._type !== "gauge") {
            this._config.legend = {
                position: this.legendPosition()
            };
        }
        this._config.data.selection = {
            enabled: true,
            multiple: false
        };
        this._config.bindto = element.append("div").datum(null);

        this._config.data.columns = [];

        this.c3Chart = c3Generate(this._config);
    }

    update(domNode, element) {
        super.update(domNode, element);

        if (this.showLegend()) {
            this.c3Chart.legend.show();
        } else {
            this.c3Chart.legend.hide();
        }

        this.c3Chart.resize({
            width: this.width(),
            height: this.height()
        });

        const options = this.getChartOptions();
        const columnIDs = options.columns.map(function (row) { return row[0]; });
        options.unload = this._prevColumnIDs.filter(function (i) { return columnIDs.indexOf(i) < 0; });
        this.c3Chart.load(options);
        this._prevColumnIDs = columnIDs;

        element.selectAll(".c3 text")
            .style("stroke", this.fontColor())
            .style("fill", this.fontColor())
            .style("font-size", this.fontSize_exists() ? this.fontSize() + "px" : null)
            .style("font-family", this.fontFamily())
            .attr("font-family", this.fontFamily())
            ;

        element.selectAll(".c3 .c3-legend-item text")
            .style("fill", this.legendFontColor())
            .style("font-size", this.legendFontSize_exists() ? this.legendFontSize() + "px" : null)
            .style("font-family", this.legendFontFamily())
            .style("font-weight", this.legendFontBold() ? "bold" : "normal")
            .style("font-style", this.legendFontItalic() ? "italic" : "normal")
            .attr("font-family", this.legendFontFamily())
            ;
    }

    getChartOptions(): any {
        return {};
    }

    click: (row, column, selected) => void;

    showLegend: { (): boolean; (_: boolean): Common };
    showLegend_exists: () => boolean;
    legendFontColor: { (): string; (_: string): Common };
    legendFontColor_exists: () => boolean;
    legendFontSize: { (): number; (_: number): Common };
    legendFontSize_exists: () => boolean;
    legendFontFamily: { (): string; (_: string): Common };
    legendFontFamily_exists: () => boolean;
    legendFontBold: { (): boolean; (_: boolean): Common };
    legendFontBold_exists: () => boolean;
    legendFontItalic: { (): boolean; (_: boolean): Common };
    legendFontItalic_exists: () => boolean;
    fontSize: { (): number; (_: number): Common };
    fontSize_exists: () => boolean;
    fontFamily: { (): string; (_: string): Common };
    fontFamily_exists: () => boolean;
    fontColor: { (): string; (_: string): Common };
    fontColor_exists: () => boolean;
    legendPosition: { (): string; (_: string): Common };
    legendPosition_exists: () => boolean;
    animationDuration: { (): number; (_: number): Common };
    animationDuration_exists: () => boolean;
}
Common.prototype._class += " c3chart_Common";

Common.prototype.publish("showLegend", false, "boolean", "Show/Hide Legend", null, { tags: ["Basic", "Shared"] });
Common.prototype.publish("legendFontColor", null, "html-color", "Legend Font Color", null, { tags: ["Intermediate", "Shared"] });
Common.prototype.publish("legendFontSize", null, "number", "Legend Font Size", null, { tags: ["Intermediate", "Shared"] });
Common.prototype.publish("legendFontFamily", null, "string", "Legend Font Name", null, { tags: ["Private", "Shared"] });
Common.prototype.publish("legendFontBold", false, "boolean", "Legend Font Bold", null, { tags: ["Private", "Shared"] });
Common.prototype.publish("legendFontItalic", false, "boolean", "Legend Font Italic", null, { tags: ["Private", "Shared"] });

Common.prototype.publish("fontSize", null, "number", "Font Size", null, { tags: ["Basic", "Shared"] });
Common.prototype.publish("fontFamily", null, "string", "Font Name", null, { tags: ["Basic", "Shared", "Shared"] });
Common.prototype.publish("fontColor", null, "html-color", "Font Color", null, { tags: ["Basic", "Shared"] });

Common.prototype.publish("legendPosition", "right", "set", "Legend Position", ["bottom", "right"], { tags: ["Intermediate"] });
Common.prototype.publish("animationDuration", 0, "number", "Animation Duration", null, { tags: ["Advanced"] });
