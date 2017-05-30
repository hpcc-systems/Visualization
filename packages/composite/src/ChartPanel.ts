import { HTMLWidget, publish, publishProxy, Utility } from "@hpcc-js/common";
import { Border2 } from "@hpcc-js/layout";
import { Legend } from "./Legend";
import { MultiChart } from "./multiChart";
import { Button, IClickHandler, Item, Spacer, TitleBar, ToggleButton } from "./TitleBar";

import "../src/ChartPanel.css";

class Summary extends HTMLWidget {

    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        element.append("p");
    }

    update(domNode, element) {
        super.update(domNode, element);
        element.select("p").text(this.text());
    }
}
interface Summary {
    text(): string;
    text(_: string): this;
}
Summary.prototype.publish("text", "", "string");

export class ChartPanel extends Border2 implements IClickHandler {

    private _toggleLegend: ToggleButton = new ToggleButton(this, "fa-info").selected(false);
    private _buttonDownload: Button = new Button(this, "fa-download");

    private _titleBar = new TitleBar();

    private _legend = new Legend(this);

    @publishProxy("_titleBar", undefined, undefined, { reset: true })
    title: publish<this, string>;
    @publish(null, "widget", "Multi Chart")
    _multiChart: MultiChart;
    multiChart(): MultiChart;
    multiChart(_: MultiChart): this;
    multiChart(_?: MultiChart): MultiChart | this {
        if (!arguments.length) return this._multiChart;
        this._multiChart = _;

        const context = this;
        this._multiChart.click = function () {
            context.click.apply(context, arguments);
        };
        this._multiChart.dblclick = function () {
            context.dblclick.apply(context, arguments);
        };
        this._multiChart.vertex_click = function () {
            context.vertex_click.apply(context, arguments);
        };
        this._multiChart.vertex_dblclick = function () {
            context.vertex_dblclick.apply(context, arguments);
        };
        this._multiChart.edge_click = function () {
            context.edge_click.apply(context, arguments);
        };
        this._multiChart.edge_dblclick = function () {
            context.edge_dblclick.apply(context, arguments);
        };
        return this;
    }

    constructor() {
        super();
        this._tag = "div";
        this._titleBar.buttons([this._buttonDownload, new Spacer(this), this._toggleLegend]);
        this.multiChart(new MultiChart().chartType("COLUMN"));
    }

    chartType(): string;
    chartType(_: string): this;
    chartType(_?: string): string | this {
        if (!arguments.length) return this._multiChart.chartType();
        this._multiChart.chartType(_);
        return this;
    }

    chartTypeDefaults(_?) {
        if (!arguments.length) return this._multiChart.chartTypeDefaults();
        this._multiChart.chartTypeDefaults(_);
        return this;
    }

    chartTypeProperties(_?) {
        if (!arguments.length) return this._multiChart.chartTypeProperties();
        this._multiChart.chartTypeProperties(_);
        return this;
    }

    columns(): string[];
    columns(_: string[], asDefault?: boolean): this;
    columns(_?: string[], asDefault?: boolean): string[] | this {
        if (!arguments.length) return this._multiChart.columns();
        this._legend.columns(_, asDefault);
        return this;
    }

    data(_?) {
        if (!arguments.length) return this._multiChart.data();
        this._legend.data(_);
        return this;
    }

    downloadCSV() {
        Utility.downloadBlob("CSV", this._multiChart.export("CSV"));
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this.top(this._titleBar);
        this.center(this._multiChart);
        this.right(this._legend);

        this._legend
            .targetWidget(this._multiChart)
            .orientation("vertical")
            .title("")
            .visible(false)
            ;
    }

    private _prevChartDataFamily;
    update(domNode, element) {
        this._multiChart
            .columns(this._legend.filteredColumns())
            .data(this._legend.filteredData())
            ;
        if (this._prevChartDataFamily !== this._multiChart.getChartDataFamily()) {
            this._prevChartDataFamily = this._multiChart.getChartDataFamily();
            switch (this._prevChartDataFamily) {
                case "any":
                    this._toggleLegend.selected(false);
                    this._legend.visible(false);
                    break;
            }
        }
        this._legend.dataFamily(this._multiChart.getChartDataFamily());
        super.update(domNode, element);
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    // IClickHandler  ---
    titleBarClick(src: Item, d, idx: number, groups): void {
        switch (src) {
            case this._buttonDownload:
                this.downloadCSV();
                break;
            case this._toggleLegend:
                if (this._toggleLegend.selected()) {
                    this._legend.visible(true);
                } else {
                    this._legend.visible(false);
                }
                this.render();
                break;
        }
    }

    //  Event Handlers  ---
    //  Events  ---
    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    dblclick(row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }
    vertex_click(row, col, sel, more) {
        if (more && more.vertex) {
            console.log("Vertex click: " + more.vertex.id());
        }
    }

    vertex_dblclick(row, col, sel, more) {
        if (more && more.vertex) {
            console.log("Vertex double click: " + more.vertex.id());
        }
    }

    edge_click(row, col, sel, more) {
        if (more && more.edge) {
            console.log("Edge click: " + more.edge.id());
        }
    }

    edge_dblclick(row, col, sel, more) {
        if (more && more.edge) {
            console.log("Edge double click: " + more.edge.id());
        }
    }
}
ChartPanel.prototype._class += " composite_ChartPanel";
