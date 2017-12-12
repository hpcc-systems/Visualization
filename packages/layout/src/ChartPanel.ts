import { publish, publishProxy, Utility, Widget } from "@hpcc-js/common";
import { Border2 } from "./Border2";
import { Legend } from "./Legend";
import { Button, IClickHandler, Item, Spacer, TitleBar, ToggleButton } from "./TitleBar";

export class ChartPanel extends Border2 implements IClickHandler {

    private _toggleLegend: ToggleButton = new ToggleButton(this, "fa-info").selected(false);
    private _buttonDownload: Button = new Button(this, "fa-download");

    private _titleBar = new TitleBar();

    private _legend = new Legend(this);

    @publishProxy("_titleBar", undefined, undefined, { reset: true })
    title: publish<this, string>;
    @publish(null, "widget", "Multi Chart")
    _widget: Widget;
    widget(): Widget;
    widget(_: Widget): this;
    widget(_?: Widget): Widget | this {
        if (!arguments.length) return this._widget;
        this._widget = _;

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
    }

    constructor() {
        super();
        this._tag = "div";
        this._titleBar.buttons([this._buttonDownload, new Spacer(this), this._toggleLegend]);
    }

    columns(): string[];
    columns(_: string[], asDefault?: boolean): this;
    columns(_?: string[], asDefault?: boolean): string[] | this {
        if (!arguments.length) return this._widget.columns();
        this._legend.columns(_, asDefault);
        return this;
    }

    data(_?) {
        if (!arguments.length) return this._widget.data();
        this._legend.data(_);
        return this;
    }

    downloadCSV() {
        Utility.downloadBlob("CSV", this._widget.export("CSV"));
        return this;
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this.top(this._titleBar);
        this.center(this._widget);
        this.right(this._legend);

        this._legend
            .targetWidget(this._widget)
            .orientation("vertical")
            .title("")
            .visible(false)
            ;
    }

    private _prevChartDataFamily;
    update(domNode, element) {
        this._widget
            .columns(this._legend.filteredColumns())
            .data(this._legend.filteredData())
            ;
        if (this._prevChartDataFamily !== "ND") { // this._widget.getChartDataFamily()) {
            this._prevChartDataFamily = "ND"; // this._widget.getChartDataFamily();
            switch (this._prevChartDataFamily) {
                case "any":
                    this._toggleLegend.selected(false);
                    this._legend.visible(false);
                    break;
            }
        }
        this._legend.dataFamily("ND"); // this._widget.getChartDataFamily());
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
ChartPanel.prototype._class += " layout_ChartPanel";
