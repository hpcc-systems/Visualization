import { MultiChart } from "@hpcc-js/chart";
import { Database, Text, Utility } from "@hpcc-js/common";
import { Button, Input, Select } from "@hpcc-js/form";
import { Border, Grid, Toolbar } from "@hpcc-js/layout";
import { Legend } from "@hpcc-js/other";
import { select as d3Select } from "d3-selection";
import "d3-transition";

import "../src/MegaChart.css";

export class MegaChart extends Border {
    _chart = new MultiChart();
    _toolbar = new Toolbar();
    _valueTitle = new Text();
    _domainTitle = new Text();
    _legend: Legend = new Legend();
    _csvButton;
    _infoButton;
    _maximizeButton;
    _legendButton;
    _chartTypeSelect;
    _prevLegendPosition;
    _prevShowToolbar;
    _1DChartTypes;
    _2DChartTypes;
    _NDChartTypes;
    _anyChartTypes;
    _allChartTypes;
    _contentClasses;

    constructor() {
        super();
        this._tag = "div";
        const context = this;
        this._chart.click = function () {
            context.click.apply(context, arguments);
        };
        this._chart.dblclick = function () {
            context.dblclick.apply(context, arguments);
        };
    }

    toolbarWidgets(_?) {
        if (!arguments.length) return this._toolbar.widgets();
        this._toolbar.widgets(_);
        return this;
    }

    chartTypeDefaults(_?) {
        if (!arguments.length) return this._chart.chartTypeDefaults();
        this._chart.chartTypeDefaults(_);
        return this;
    }

    chartTypeProperties(_?) {
        if (!arguments.length) return this._chart.chartTypeProperties();
        this._chart.chartTypeProperties(_);
        return this;
    }

    fields(): Database.Field[];
    fields(_: Database.Field[]): this;
    fields(_?: Database.Field[]): Database.Field[] | this {
        if (!arguments.length) return this._chart.fields();
        this._chart.fields(_);
        return this;
    }

    columns(): string[];
    columns(_: string[], asDefault?: boolean): this;
    columns(_?: string[], asDefault?: boolean): string[] | this {
        if (!arguments.length) return this._chart.columns();
        this._chart.columns(_, asDefault);
        return this;
    }

    data(_?) {
        if (!arguments.length) return this._chart.data();
        this._chart.data(_);
        return this;
    }

    downloadCSV() {
        Utility.downloadBlob("CSV", this._chart.export("CSV"));
        return this;
    }

    enter(domNode, element) {
        Border.prototype.enter.apply(this, arguments);
        const context = this;

        this.topShrinkWrap(false).topPercentage(0).topSize(30);

        this._csvButton = new Button()
            .classed({ "composite_MegaChart-CSV": true })
            .id(this.id() + "_csv")
            .value("CSV")
            ;
        this._csvButton.click = function (a) {
            context.downloadCSV();
        };

        this._infoButton = new Button()
            .classed({ "composite_MegaChart-Info": true })
            .id(this.id() + "_info")
            .value(this.infoIcon())
            ;

        this._maximizeButton = new Button()
            .classed({ "composite_MegaChart-Maximize": true })
            .id(this.id() + "_maximize")
            .value("\uf2d0")
            ;
        this._maximizeButton.click = function (buttonWidget) {
            const target = context.target();
            let node = target;
            const isMaximized = d3Select(target).classed("__hpccisMaximized");

            // Find the layout_Grid ancestor
            const parentGrid = context.locateAncestor("layout_Grid");
            if (parentGrid) {
                node = parentGrid.element().node();
            } else {
                node = document.body;
            }

            const targetElement = d3Select(context.target()) as any;
            if (isMaximized) {
                // Restore from maximized to natural size/position
                const targetParentBox = target.parentElement.getBoundingClientRect();
                const targetPaddingTop = parseInt(getComputedStyle(target, null).getPropertyValue("padding-top").replace("px", ""));
                const targetPaddingLeft = parseInt(getComputedStyle(target, null).getPropertyValue("padding-left").replace("px", ""));
                const targetPaddingRight = parseInt(getComputedStyle(target, null).getPropertyValue("padding-right").replace("px", ""));
                const targetPaddingBottom = parseInt(getComputedStyle(target, null).getPropertyValue("padding-bottom").replace("px", ""));
                context.contentDiv.style("opacity", 0).transition(100);
                targetElement.transition()// .duration(3000)
                    .style("top", targetParentBox.top + "px")
                    .style("left", targetParentBox.left + "px")
                    .style("width", (targetParentBox.width - targetPaddingLeft - targetPaddingRight) + "px")
                    .style("height", (targetParentBox.height - targetPaddingTop - targetPaddingBottom) + "px")
                    .each("end", function () {
                        targetElement.style("position", target.__old_position);
                        targetElement.style("z-index", target.__old_zindex);
                        targetElement.style("background-color", target.__old_backgroundColor);
                        targetElement.style("box-shadow", target.__old_boxshadow);
                        context
                            .resize({
                                width: targetParentBox.width - targetPaddingLeft - targetPaddingRight,
                                height: targetParentBox.height - targetPaddingTop - targetPaddingBottom
                            })
                            .render(function () {
                                context.contentDiv.transition()
                                    .style("opacity", 1);
                            });
                        buttonWidget.value("\uf2d0").render();
                    });
            } else {
                // Maximize this MegaChart
                target.__old_position = target.style.position;
                target.__old_zindex = target.style.zIndex;
                target.__old_boxshadow = target.style.boxShadow;
                target.__old_backgroundColor = context.element().style("background-color");
                const grid = d3Select(node).datum() as Grid;
                const gridTarget = grid.target();
                const gridBox = grid ? gridTarget.getBoundingClientRect() : node.getBoundingClientRect();
                const gridPaddingTop = parseInt(getComputedStyle(gridTarget, null).getPropertyValue("padding-top").replace("px", ""));
                const gridPaddingLeft = parseInt(getComputedStyle(gridTarget, null).getPropertyValue("padding-left").replace("px", ""));
                const gridPaddingRight = parseInt(getComputedStyle(gridTarget, null).getPropertyValue("padding-right").replace("px", ""));
                const gridPaddingBottom = parseInt(getComputedStyle(gridTarget, null).getPropertyValue("padding-bottom").replace("px", ""));
                context.contentDiv.style("opacity", 0).transition(100);
                targetElement
                    .style("position", "fixed")
                    .style("z-index", 999999)
                    .style("box-shadow", "0 8px 8px 0 rgba(0,0,0,.14),0 12px 4px -8px rgba(0,0,0,.2),0 4px 20px 0 rgba(0,0,0,.12)")
                    .style("background-color", target.__old_backgroundColor)
                    .transition()// .duration(3000)
                    .style("top", (gridBox.top + gridPaddingTop) + "px")
                    .style("left", (gridBox.left + gridPaddingLeft) + "px")
                    .style("width", (gridBox.width - gridPaddingLeft - gridPaddingRight) + "px")
                    .style("height", (gridBox.height - gridPaddingTop - gridPaddingBottom) + "px")
                    .each("end", function () {
                        targetElement.style("background-color", context.maximizedBackgroundColor());
                        context
                            .resize({
                                width: (gridBox.width - gridPaddingLeft - gridPaddingRight),
                                height: (gridBox.height - gridPaddingTop - gridPaddingBottom)
                            })
                            .render(function () {
                                context.contentDiv.transition()
                                    .style("opacity", 1);
                            });
                        buttonWidget.value("\uf2d1").render();
                    });
            }

            d3Select(target).classed("__hpccisMaximized", !isMaximized);
        };

        this._legendButton = new Input()
            .classed({ "composite_MegaChart-legend": true })
            .id(this.id() + "_legend")
            .type("checkbox")
            .inlineLabel("Legend:  ")
            ;
        this._legendButton.click = function (a) {
            context.render();
        };

        this._chartTypeSelect = new Select()
            .classed({ "composite_MegaChart-chartType": true })
            .id(this.id() + "_chartType")
            .selectOptions(this._allChartTypes.map(function (a) { return [a.id, a.display]; }))
            .value(this.chartType())
            ;
        this._chartTypeSelect.change = function (a) {
            context.chartType(a.value()).render();
        };

        this.setContent("center", this._chart);

        this._legend
            .targetWidget(this._chart)
            .orientation(["top", "bottom"].indexOf(this.legendPosition()) !== -1 ? "horizontal" : "vertical")
            .fixedSize(true)
            ;

        this._prevLegendPosition = this.legendPosition();

        if (this.valueAxisTitle()) {
            this.setContent("left", this._valueTitle.rotation(-90)).leftShrinkWrap(true);
        }
        if (this.domainAxisTitle()) {
            this.setContent("bottom", this._domainTitle).bottomShrinkWrap(true);
        }

        if (this.legendPosition() !== "none") {
            this.setContent(this.legendPosition(), this._legend)[this.legendPosition() + "ShrinkWrap"](true);
        }
    }

    update(domNode, element) {
        function showHideButton(twArr, button, show) {
            if (show && twArr.indexOf(button) === -1) {
                twArr.push(button);
            } else if (!show) {
                const idx = twArr.indexOf(button);
                if (idx >= 0) {
                    twArr.splice(idx, 1);
                }
            }
        }

        this._chartTypeSelect.value(this.chartType());
        const twArr = this.toolbarWidgets();
        showHideButton(twArr, this._csvButton, this.showCSV());
        showHideButton(twArr, this._maximizeButton, this.showMaximize());
        showHideButton(twArr, this._legendButton, this.toolbarShowLegend());
        showHideButton(twArr, this._chartTypeSelect, this.showChartSelect());
        showHideButton(twArr, this._infoButton, this.showInfoButton());
        this.toolbarWidgets(twArr);

        if (this._prevShowToolbar !== this.showToolbar()) {
            this.setContent("top", this.showToolbar() ? this._toolbar : null);
            this._prevShowToolbar = this.showToolbar();
        }

        // TODO:  Proxy + themes not working...
        this._toolbar
            .fontSize(this.titleFontSize())
            .fontColor(this.titleFontColor())
            .fontFamily(this.titleFontFamily())
            .fontBold(this.titleFontBold())
            .backgroundColor(this.titleBackgroundColor())
            ;

        this._chart
            .data(this.data());

        if (this.chartType() !== this.chartType()) {
            this.chartType(this.chartType());
        }

        let legendPosition = this.legendPosition();
        if (this.toolbarShowLegend() && !this._legendButton.checked()) {
            legendPosition = "none";
        }
        if (this._prevLegendPosition !== legendPosition) {
            if (this._prevLegendPosition !== "none") {
                this.clearContent(this._prevLegendPosition);
            }
            this._prevLegendPosition = legendPosition;
            if (legendPosition !== "none") {
                this._legend = new Legend().targetWidget(this.getContent("center").fixedSize(true));
                this.setContent(legendPosition, this._legend);
                this._legend.orientation(["top", "bottom"].indexOf(legendPosition) !== -1 ? "horizontal" : "vertical");
            }
        }
        this._contentClasses = this.getContentClasses();

        if (this.valueAxisTitle() && this._contentClasses.left !== "common_Text") {
            if (legendPosition !== "left") {
                this.setContent("left", this._valueTitle.rotation(-90));
            }
        }
        if (this.domainAxisTitle() && this._contentClasses.bottom !== "common_Text") {
            if (legendPosition !== "bottom") {
                this.setContent("bottom", this._domainTitle).bottomShrinkWrap(true);
            }
        }

        this._legend.dataFamily(this._chart.getChartDataFamily());

        Border.prototype.update.apply(this, arguments);
    }

    exit(domNode, element) {
        Border.prototype.exit.apply(this, arguments);
    }

    getContentClasses() {
        const obj: any = {};
        const t = this.getContent("top");
        const r = this.getContent("right");
        const b = this.getContent("bottom");
        const l = this.getContent("left");
        obj.top = t !== null ? t.classID() : undefined;
        obj.right = r !== null ? r.classID() : undefined;
        obj.bottom = b !== null ? b.classID() : undefined;
        obj.left = l !== null ? l.classID() : undefined;
        return obj;
    }

    serializeState() {
        const state: any = {
            title: this.title(),
            data: this.data()
        };
        const chart = this.chart();
        if (chart) {
            if (chart.serializeState) {
                state.chart = chart.serializeState();
                delete state.chart.data;
            }
        }
        return state;
    }

    deserializeState(state) {
        if (state) {
            this
                .title(state.title)
                .data(state.data)
                ;
            const chart = this.chart();
            if (chart && state.chart) {
                if (chart.serializeState) {
                    chart.deserializeState(state.chart);
                }
            }
        }
        return this;
    }

    //  Events  ---
    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    dblclick(row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    showToolbar: { (): boolean; (_: boolean): MegaChart };
    showToolbar_exists: () => boolean;
    titleFontSize: { (): number; (_: number): MegaChart };
    titleFontSize_exists: () => boolean;
    titleFontColor: { (): string; (_: string): MegaChart };
    titleFontColor_exists: () => boolean;
    titleFontFamily: { (): string; (_: string): MegaChart };
    titleFontFamily_exists: () => boolean;
    titleFontBold: { (): boolean; (_: boolean): MegaChart };
    titleFontBold_exists: () => boolean;
    titleBackgroundColor: { (): string; (_: string): MegaChart };
    titleBackgroundColor_exists: () => boolean;
    maximizedBackgroundColor: { (): string; (_: string): MegaChart };
    maximizedBackgroundColor_exists: () => boolean;
    showChartSelect: { (): boolean; (_: boolean): MegaChart };
    showChartSelect_exists: () => boolean;
    showCSV: { (): boolean; (_: boolean): MegaChart };
    showCSV_exists: () => boolean;
    showMaximize: { (): boolean; (_: boolean): MegaChart };
    showMaximize_exists: () => boolean;
    toolbarShowLegend: { (): boolean; (_: boolean): MegaChart };
    toolbarShowLegend_exists: () => boolean;
    showInfoButton: { (): boolean; (_: boolean): MegaChart };
    showInfoButton_exists: () => boolean;
    infoIcon: { (): string; (_: string): MegaChart };
    infoIcon_exists: () => boolean;
    legendPosition: { (): string; (_: string): MegaChart };
    legendPosition_exists: () => boolean;

    title: { (): string; (_: string): Text };
    title_exists: () => boolean;

    domainAxisTitle: { (): string; (_: string): Text };
    domainAxisTitle_exists: () => boolean;
    valueAxisTitle: { (): string; (_: string): Text };
    valueAxisTitle_exists: () => boolean;

    chartType: { (): string; (_: string): MegaChart };
    chartType_exists: () => boolean;
    chart: { (): any; (_: any): MegaChart };
    chart_exists: () => boolean;
}
MegaChart.prototype._class += " composite_MegaChart";

MegaChart.prototype._1DChartTypes = MultiChart.prototype._1DChartTypes;
MegaChart.prototype._2DChartTypes = MultiChart.prototype._2DChartTypes;
MegaChart.prototype._NDChartTypes = MultiChart.prototype._NDChartTypes;
MegaChart.prototype._anyChartTypes = MultiChart.prototype._anyChartTypes;
MegaChart.prototype._allChartTypes = MultiChart.prototype._allChartTypes;

MegaChart.prototype.publishReset();

MegaChart.prototype.publish("showToolbar", true, "boolean", "Enable/Disable Toolbar widget", null, { tags: ["Basic"] });
MegaChart.prototype.publishProxy("title", "_toolbar", "title");
MegaChart.prototype.publish("titleFontSize", null, "number", "Title Font Size (px)", null, { tags: ["Advanced"], optional: true });
MegaChart.prototype.publish("titleFontColor", null, "html-color", "Title Font Color", null, { tags: ["Advanced"], optional: true });
MegaChart.prototype.publish("titleFontFamily", null, "string", "Title Font Family", null, { tags: ["Advanced"], optional: true });
MegaChart.prototype.publish("titleFontBold", true, "boolean", "Enable Bold Title Font", null, { tags: ["Advanced"], optional: true });
MegaChart.prototype.publish("titleBackgroundColor", null, "html-color", "Background Color", null, { tags: ["Intermediate"], optional: true });
MegaChart.prototype.publish("maximizedBackgroundColor", "#FFFFFF", "html-color", "Background Color while maximized", null, { tags: ["Intermediate"], optional: true });

MegaChart.prototype.publish("showChartSelect", true, "boolean", "Show/Hide the chartType dropdown in the toolbar", null, { tags: ["Basic"] });
MegaChart.prototype.publish("showCSV", true, "boolean", "Show/Hide CSV button", null, { tags: ["Basic"] });
MegaChart.prototype.publish("showMaximize", false, "boolean", "Show/Hide Maximize button", null, { tags: ["Basic"] });
MegaChart.prototype.publish("toolbarShowLegend", false, "boolean", "Show/Hide Legend button", null, { tags: ["Basic"] });
MegaChart.prototype.publish("showInfoButton", false, "boolean", "Show/Hide Info button in toolbar", null, { tags: ["Basic"] });
MegaChart.prototype.publish("infoIcon", "\uf05a", "string", "Help Icon", null, { tags: ["Basic"] });

MegaChart.prototype.publish("legendPosition", "none", "set", "Position of the Legend widget", ["none", "top", "right", "bottom", "left"], { tags: ["Basic"] });
MegaChart.prototype.publishProxy("legendFormat", "_legend", "rainbowFormat");
MegaChart.prototype.publishProxy("legendBins", "_legend", "rainbowBins");

MegaChart.prototype.publishProxy("domainAxisTitle", "_domainTitle", "text");
MegaChart.prototype.publishProxy("valueAxisTitle", "_valueTitle", "text");

MegaChart.prototype.publishProxy("chartType", "_chart", "chartType");
MegaChart.prototype.publishProxy("chart", "_chart", "chart");
