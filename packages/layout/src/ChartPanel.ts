import { IHighlight } from "@hpcc-js/api";
import { Button, Database, IconBar, ProgressBar, Spacer, Text, TitleBar, ToggleButton, Utility, Widget } from "@hpcc-js/common";
import { Table } from "@hpcc-js/dgrid";
import { select as d3Select } from "d3-selection";
import { Border2 } from "./Border2";
import { Carousel } from "./Carousel";
import { Legend } from "./Legend";
import { Modal } from "./Modal";

import "../src/ChartPanel.css";

export class ChartPanel extends Border2 implements IHighlight {

    protected _legend = new Legend(this);
    protected _progressBar = new ProgressBar();
    protected _autoScale = false;
    protected _resolutions = {
        tiny: { width: 100, height: 100 },
        small: { width: 300, height: 300 }
    };
    private _modal = new Modal();
    private _highlight: boolean;
    private _scale: number;
    private _orig_size: any;

    private _toggleInfo = new ToggleButton("fa-info-circle", ".Description")
        .selected(false)
        .on("enabled", () => {
            return this.description() !== "";
        })
        .on("click", () => {
            if (this._toggleInfo.selected()) {
                this._modal
                    .title(this.title())
                    .widget(new Text().text(this.description()))
                    .show(true)
                    .render()
                    ;

                const origCloseFunc = this._modal._close;
                this._modal._close = () => {
                    this._toggleInfo
                        .selected(false)
                        .render()
                        ;
                    this._modal._close = origCloseFunc;
                };
            }
        })
        .on("mouseMove", () => {
            /*
            this._modal.showPreview(true).render(n => {
                n.resize().render();
            });
            */
        })
        .on("mouseOut", () => {
            /*
            if (this._modal.showPreview()) {
                this._modal.show(false).showPreview(false).render();
            }
            */
        });

    private _toggleData = new ToggleButton("fa-table", "Data")
        .on("click", () => {
            this.dataVisible(this._toggleData.selected());
            this.render();
        });

    private _buttonDownload = new Button("fa-download", "Download")
        .on("click", () => {
            this.downloadCSV();
        });

    private _toggleLegend = new ToggleButton("fa-list-ul", "Legend")
        .selected(false)
        .on("click", () => {
            this.legendVisible(this._toggleLegend.selected());
            this.render();
        });

    protected _spacer = new Spacer();

    _titleBar = new TitleBar().buttons([this._toggleData, this._buttonDownload, this._spacer, this._toggleLegend]);

    protected _carousel = new Carousel();
    protected _table = new Table();
    protected _widget: Widget;

    protected _hideLegendToggleList = ["dgrid_Table"];

    constructor() {
        super();
        this._tag = "div";
    }

    fields(): Database.Field[];
    fields(_: Database.Field[]): this;
    fields(_?: Database.Field[]): this | Database.Field[] {
        if (!arguments.length) return this._widget.fields();
        this._legend.fields(_);
        this.refreshFields();
        return this;
    }
    refreshFields() {
        this._widget.fields(this._legend.filteredFields());
        this._table.fields(this._legend.filteredFields());
        return this;
    }

    columns(): string[];
    columns(_: string[], asDefault?: boolean): this;
    columns(_?: string[], asDefault?: boolean): string[] | this {
        if (!arguments.length) return this._widget.columns();
        this._legend.columns(_, asDefault);
        this.refreshColumns();
        return this;
    }
    refreshColumns() {
        this._widget.columns(this._legend.filteredColumns());
        this._table.columns(this._legend.filteredColumns());
        return this;
    }

    data(_?) {
        if (!arguments.length) return this._widget.data();
        this._legend.data(_);
        this.refreshData();
        return this;
    }
    refreshData() {
        this._widget.data(this._legend.filteredData());
        this._table.data(this._legend.filteredData());
        return this;
    }

    highlight(): boolean;
    highlight(_: boolean): this;
    highlight(_?: boolean): boolean | this {
        if (!arguments.length) return this._highlight;
        this._highlight = _;
        return this;
    }

    startProgress() {
        this._progressBar.start();
    }

    finishProgress() {
        this._progressBar.finish();
    }

    buttons(): Widget[];
    buttons(_: Widget[]): this;
    buttons(_?: Widget[]): this | Widget[] {
        if (!arguments.length) return this._titleBar.buttons();
        this._titleBar.buttons(_);
        return this;
    }

    downloadCSV() {
        Utility.downloadBlob("CSV", this._widget.export("CSV"));
        return this;
    }

    highlightColumn(column?: string): this {
        if (column) {
            const cssTag = `series-${this.cssTag(column)}`;
            this._centerWA.element().selectAll(".series")
                .each(function () {
                    const element = d3Select(this);
                    const highlight = element.classed(cssTag);
                    element
                        .classed("highlight", highlight)
                        .classed("lowlight", !highlight)
                        ;
                })
                ;
        } else {
            this._centerWA.element().selectAll(".series")
                .classed("highlight", false)
                .classed("lowlight", false)
                ;
        }
        return this;
    }

    getResponsiveMode(): "tiny" | "small" | "regular" | "none" {
        if (!this.enableAutoscaling()) return "none";
        if (!this._autoScale) return "regular";
        if (this.size().width <= this._resolutions.tiny.width || this.size().height <= this._resolutions.tiny.height) {
            return "tiny";
        } else if (this.size().width <= this._resolutions.small.width || this.size().height <= this._resolutions.small.height) {
            return "small";
        }
        return "regular";
    }

    setOrigSize() {
        this._orig_size = JSON.parse(JSON.stringify(this.size()));
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._modal
            .target(this.target())
            .relativeTargetId(this.id())
            ;

        this.top(this._titleBar);
        this.center(this._carousel);
        this.right(this._legend);

        this._legend
            .targetWidget(this._widget)
            .orientation("vertical")
            .title("")
            .visible(false)
            ;

        this._progressBar.enter(domNode, element);
        this.setOrigSize();
    }

    preUpdateTiny(element) {
        element.selectAll("div.body,div.title-text,div.icon-bar").style("display", "none");
    }

    preUpdateSmall(element) {
        const scale_x = this._orig_size.width / this._resolutions.small.width;
        const scale_y = this._orig_size.height / this._resolutions.small.height;
        this._scale = Math.min(scale_x, scale_y);
        const x_is_smaller = this._scale === scale_x;
        this.size({
            width: x_is_smaller ? this._resolutions.small.width : this._orig_size.width * (1 / this._scale),
            height: !x_is_smaller ? this._resolutions.small.height : this._orig_size.height * (1 / this._scale)
        });
        element.select("div.title-icon").style("position", "static");
        element.selectAll("lhs").style("display", "none");
        element.selectAll("div.body,div.title-text,div.icon-bar").style("display", "");
        element.selectAll("div.data-count").style("visibility", "hidden");
        element.style("transform", `scale(${this._scale})`);
    }

    preUpdateRegular(element) {
        element.selectAll("div.body,div.title-text,div.icon-bar").style("display", "");
        element.selectAll("div.data-count").style("visibility", "hidden");
        element.select("div.title-icon").style("position", "static");
        element.style("transform", "translate(0px,0px) scale(1)");
    }

    private _prevdataVisible;
    private _prevlegendVisible;
    private _prevChartDataFamily;
    private _prevChart;
    private _prevButtons;
    update(domNode, element) {
        if (this._prevdataVisible !== this.dataVisible()) {
            this._prevdataVisible = this.dataVisible();
            this._toggleData.selected(this._prevdataVisible);
            this._carousel.active(this._prevdataVisible ? 1 : 0);
        }

        if (this._prevlegendVisible !== this.legendVisible()) {
            this._prevlegendVisible = this.legendVisible();
            this._toggleLegend.selected(this._prevlegendVisible);
            this._legend.visible(this._prevlegendVisible);
        }

        const _responsiveMode = this.getResponsiveMode();
        switch (_responsiveMode) {
            case "tiny":
                this.preUpdateTiny(element);
                break;
            case "small":
                this.preUpdateSmall(element);
                break;
            case "regular":
                this.preUpdateRegular(element);
                break;
        }

        const chart = this._widget.classID() === "composite_MultiChart" ? this._widget["chart"]() : this._widget;
        this._legend.dataFamily(chart._dataFamily || "any");

        if (this._prevChartDataFamily !== this._legend.dataFamily()) {
            this._prevChartDataFamily = this._legend.dataFamily();
            switch (this._prevChartDataFamily) {
                case "any":
                    this._toggleLegend.selected(false);
                    this._legend.visible(false);
                    break;
            }
        }
        element.style("box-shadow", this.highlight() ? `inset 0px 0px 0px ${this.highlightSize()}px ${this.highlightColor()}` : "none");

        if (this._hideLegendToggleList.indexOf(chart.classID()) !== -1) {
            this._spacer.visible(false);
            this._toggleLegend.visible(false);
        } else {
            this._spacer.visible(true);
            this._toggleLegend.visible(true);
        }
        if (this._prevChart !== chart) {
            this._prevChart = chart;
            const widgetIconBar = chart ? chart["_titleBar"] || chart["_iconBar"] : undefined;
            if (widgetIconBar && widgetIconBar instanceof IconBar) {
                this._prevButtons = this._prevButtons || [...this.buttons()];
                const buttons: Widget[] = [
                    ...widgetIconBar.buttons(),
                    new Spacer(),
                    ...this._prevButtons
                ];
                widgetIconBar.buttons([]).render();
                this.buttons(buttons);
            } else if (this._prevButtons) {
                this.buttons(this._prevButtons);
            }
        }

        const hiddenButtons = [];
        if (!this.dataButtonVisible()) hiddenButtons.push(this._toggleData);
        if (!this.downloadButtonVisible()) hiddenButtons.push(this._buttonDownload);
        if (!this.legendButtonVisible()) hiddenButtons.push(this._toggleLegend);
        this._titleBar
            .hiddenButtons(hiddenButtons)
            .visible(this.titleVisible())
            ;
        this.topOverlay(this.titleOverlay() || !this.titleVisible());

        super.update(domNode, element);

        switch (_responsiveMode) {
            case "tiny":
                this.postUpdateTiny(element);
                break;
            case "small":
                this.postUpdateSmall(element);
                break;
            case "regular":
                this.postUpdateRegular(element);
                break;
        }
    }

    postUpdateTiny(element) {
        element.selectAll("div.body,div.title-text,div.icon-bar").style("display", "none");
        element.selectAll("div.data-count")
            .style("visibility", "visible")
            .style("font-size", (this.titleIconFontSize() / 3) + "px")
            .style("line-height", (this.titleIconFontSize() / 3) + "px")
            .style("left", this.titleIconFontSize() + "px")
            .text(this.data().length)
            ;
        element.style("transform", "translate(0px,0px) scale(1)");
        const iconDiv = element.selectAll("div.title-icon");
        const _node = iconDiv.node();
        const _container = element.node().parentElement;
        const containerRect = _container.getBoundingClientRect();
        if (_node) {
            const rect = iconDiv.node().getBoundingClientRect();
            const icon_top = containerRect.height / 2;
            iconDiv
                .style("position", "absolute")
                .style("left", `calc(50% - ${rect.width / 2}px)`)
                .style("top", `${icon_top - (rect.height / 2)}px`)
                ;
            element.selectAll("div.data-count")
                .style("position", "absolute")
                .style("left", `calc(50% + ${rect.width / 2}px)`)
                .style("top", `${icon_top - (rect.height / 2)}px`)
                ;
        }
    }

    postUpdateSmall(element) {
        element.selectAll("lhs").style("display", "none"); // TODO: a bug in Border2?
        element.selectAll("div.title-icon").style("position", "static");
        element.selectAll("div.body,div.title-text,div.icon-bar").style("display", "");
        element.selectAll("div.data-count").style("visibility", "hidden");
        const rect = element.node().getBoundingClientRect();
        const parentRect = element.node().parentElement.getBoundingClientRect();
        element.style("transform", `translate(${parentRect.x - rect.x}px, ${parentRect.y - rect.y}px) scale(${this._scale})`);
    }

    postUpdateRegular(element) {
        element.selectAll("div.title-icon").style("position", "static");
        element.selectAll("div.body,div.title-text,div.icon-bar").style("display", "");
        element.selectAll("div.data-count").style("visibility", "hidden");
    }

    exit(domNode, element) {
        this._progressBar.exit(domNode, element);
        super.exit(domNode, element);
    }

    //  Event Handlers  ---
    //  Events  ---
    click(row, column, selected) {
        // console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    dblclick(row, column, selected) {
        // console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    vertex_click(row, col, sel, more) {
        if (more && more.vertex) {
            // console.log("Vertex click: " + more.vertex.id());
        }
    }

    vertex_dblclick(row, col, sel, more) {
        if (more && more.vertex) {
            // console.log("Vertex double click: " + more.vertex.id());
        }
    }

    edge_click(row, col, sel, more) {
        if (more && more.edge) {
            // console.log("Edge click: " + more.edge.id());
        }
    }

    edge_dblclick(row, col, sel, more) {
        if (more && more.edge) {
            // console.log("Edge double click: " + more.edge.id());
        }
    }
}
ChartPanel.prototype._class += " layout_ChartPanel";

export interface ChartPanel {
    title(): string;
    title(_: string): this;
    titleVisible(): boolean;
    titleVisible(_: boolean): this;
    titleOverlay(): boolean;
    titleOverlay(_: boolean): this;
    title_exists(): boolean;
    titleFontSize(): number;
    titleFontSize(_: number): this;
    titleFontSize_exists(): boolean;
    titleIconFontSize(): number;
    titleIconFontSize(_: number): this;
    titleIconFontSize_exists(): boolean;
    dataVisible(): boolean;
    dataVisible(_: boolean): this;
    dataButtonVisible(): boolean;
    dataButtonVisible(_: boolean): this;
    downloadButtonVisible(): boolean;
    downloadButtonVisible(_: boolean): this;
    legendVisible(): boolean;
    legendVisible(_: boolean): this;
    legendButtonVisible(): boolean;
    legendButtonVisible(_: boolean): this;
    description(): string;
    description(_: string): this;
    description_exists(): boolean;
    widget(): Widget;
    widget(_: Widget): this;
    widget_exists(): boolean;
    enableAutoscaling(): boolean;
    enableAutoscaling(_: boolean): this;
    enableAutoscaling_exists(): boolean;
    highlightSize(): number;
    highlightSize(_: number): this;
    highlightSize_exists(): boolean;
    highlightColor(): string;
    highlightColor(_: string): this;
    highlightColor_exists(): boolean;
}

ChartPanel.prototype.publishReset();
ChartPanel.prototype.publishProxy("title", "_titleBar");
ChartPanel.prototype.publish("titleVisible", true, "boolean");
ChartPanel.prototype.publish("titleOverlay", false, "boolean");
ChartPanel.prototype.publishProxy("titleIcon", "_titleBar");
ChartPanel.prototype.publishProxy("titleIconFont", "_titleBar");
ChartPanel.prototype.publishProxy("titleFont", "_titleBar");
ChartPanel.prototype.publishProxy("titleIconFontSize", "_titleBar");
ChartPanel.prototype.publishProxy("titleFontSize", "_titleBar");
ChartPanel.prototype.publish("dataVisible", false, "boolean", "Show data table");
ChartPanel.prototype.publish("dataButtonVisible", true, "boolean", "Show data table button");
ChartPanel.prototype.publish("downloadButtonVisible", true, "boolean", "Show data download button");
ChartPanel.prototype.publish("legendVisible", false, "boolean", "Show legend");
ChartPanel.prototype.publish("legendButtonVisible", true, "boolean", "Show legend button");
ChartPanel.prototype.publishProxy("legend_showSeriesTotal", "_legend", "showSeriesTotal");
ChartPanel.prototype.publishProxy("legend_showLegendTotal", "_legend", "showLegendTotal");
ChartPanel.prototype.publish("description", "", "string");
ChartPanel.prototype.publish("widget", null, "widget", "Widget", undefined, { render: false });
ChartPanel.prototype.publish("enableAutoscaling", false, "boolean");
ChartPanel.prototype.publish("highlightSize", 4, "number");
ChartPanel.prototype.publish("highlightColor", "#e67e22", "html-color");
ChartPanel.prototype.publishProxy("progress_halfLife", "_progressBar", "halfLife");
ChartPanel.prototype.publishProxy("progress_decay", "_progressBar", "decay");
ChartPanel.prototype.publishProxy("progress_size", "_progressBar", "size");
ChartPanel.prototype.publishProxy("progress_color", "_progressBar", "color");
ChartPanel.prototype.publishProxy("progress_blurBar", "_progressBar", "blurBar");
ChartPanel.prototype.publishProxy("progress_blurSize", "_progressBar", "blurSize");
ChartPanel.prototype.publishProxy("progress_blurColor", "_progressBar", "blurColor");
ChartPanel.prototype.publishProxy("progress_blurOpacity", "_progressBar", "blurOpacity");

ChartPanel.prototype.widget = function (_?) {
    if (!arguments.length) return this._widget;
    this._carousel.widgets([_, this._table]);
    this._widget = _;
    this._widget
        .fields(this._legend.filteredFields())
        .data(this._legend.filteredData())
        ;

    const context = this;
    const tmpAny = this._widget as any;
    tmpAny.click = function () {
        context.click.apply(context, arguments);
    };
    tmpAny.dblclick = function () {
        context.dblclick.apply(context, arguments);
    };
    tmpAny.vertex_click = function () {
        context.vertex_click.apply(context, arguments);
    };
    tmpAny.vertex_dblclick = function () {
        context.vertex_dblclick.apply(context, arguments);
    };
    tmpAny.edge_click = function () {
        context.edge_click.apply(context, arguments);
    };
    tmpAny.edge_dblclick = function () {
        context.edge_dblclick.apply(context, arguments);
    };
    return this;
};
