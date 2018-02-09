import { IHighlight } from "@hpcc-js/api";
import { publish, publishProxy, Text, Utility, Widget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";

import { Border2 } from "./Border2";
import { Legend } from "./Legend";
import { Modal } from "./Modal";
import { Button, Spacer, TitleBar, ToggleButton } from "./TitleBar";

import "../src/ChartPanel.css";
export class ChartPanel extends Border2 implements IHighlight {

    protected _legend = new Legend(this);
    private _modal = new Modal();

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
    private _toggleLegend = new ToggleButton("fa-list-ul", "Legend")
        .selected(false)
        .on("click", () => {
            if (this._toggleLegend.selected()) {
                this._legend.visible(true);
            } else {
                this._legend.visible(false);
            }
            this.render();
        });
    private _buttonDownload = new Button("fa-download", "Download")
        .on("click", () => {
            this.downloadCSV();
        });
    private _titleBar = new TitleBar().buttons([this._buttonDownload, this._toggleLegend, new Spacer(), this._toggleInfo]);

    @publishProxy("_titleBar", undefined, undefined, { reset: true })
    title: publish<this, string>;
    @publish("")
    description: publish<this, string>;
    @publish(5000, "number", "progressHalflife")
    progressHalflife: { (): number; (_: number): ChartPanel; };
    @publish(1.2, "number", "progressDecay")
    progressDecay: { (): number; (_: number): ChartPanel; };
    @publish(2, "number", "progressSize")
    progressSize: { (): number; (_: number): ChartPanel; };
    @publish(50, "number", "progressBlurSize")
    progressBlurSize: { (): number; (_: number): ChartPanel; };
    @publish("#7bed9f", "string", "progressHexBlurColor")
    progressHexBlurColor: { (): string; (_: string): ChartPanel; };
    @publish(0.35, "number", "progressBlurOpacity")
    progressBlurOpacity: { (): number; (_: number): ChartPanel; };
    @publish("#2ed573", "string", "progressHexColor")
    progressHexColor: { (): string; (_: string): ChartPanel; };
    @publish(true, "boolean", "progressBarBlur")
    progressBarBlur: { (): boolean; (_: boolean): ChartPanel; };
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
        this._titleBar.buttons([this._buttonDownload, new Spacer(), this._toggleLegend]);
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

    enter(domNode, element) {
        super.enter(domNode, element);
        this._modal
            .target(this.target())
            .relativeTargetId(this.id())
            ;

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
        if (this._prevChartDataFamily !== this._legend.dataFamily()) {
            this._prevChartDataFamily = this._legend.dataFamily();
            switch (this._prevChartDataFamily) {
                case "any":
                    this._toggleLegend.selected(false);
                    this._legend.visible(false);
                    break;
            }
        }
        super.update(domNode, element);
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    startMyProgress() {
        this.startProgress(this.target());
    }
    finishMyProgress() {
        this.updateProgress(this.target(), 1000, 100);
    }
    exitMyProgress() {
        this.exitProgress(this.target());
    }
    startThatProgress(elm) {
        this.startProgress(elm);
    }
    finishThatProgress(elm) {
        this.updateProgress(elm, 1000, 100);
    }
    finishProgress(elm) {
        elm.progress_stopped = false;
        this.updateProgress(elm, this.progressHalflife(), 3);
    }
    startProgress(elm) {
        elm.progress_stopped = false;
        this.updateProgress(elm, this.progressHalflife(), 10);
    }
    exitProgress(elm) {
        elm.progress_stopped = true;
        const element = document.getElementById("hpccjs-progress-style-for-" + elm.id);
        if (element) element.parentNode.removeChild(element);
    }
    updateProgress(elm, halflife, perc) {
        const percLimit = 95;
        halflife *= this.progressDecay();
        const bar_size = this.progressSize();
        const bar_color = this.progressHexColor();
        perc = perc ? perc : 10;
        const _id = elm.id;
        const _style_id = "hpccjs-progress-style-for-" + _id;
        if (!!elm.progress_stopped) {
            return;
        }
        const context = this;
        let _style = document.getElementById(_style_id);
        if (_style) {
            _style.innerHTML = _styles();
        } else {
            _style = document.createElement("style");
            _style.id = _style_id;
            _style.innerHTML = _styles();
            elm.insertBefore(_style, elm.firstChild);
        }
        if (perc < percLimit) {
            setTimeout(function () {
                const _remaining = 100 - perc;
                context.updateProgress(elm, halflife, perc + (_remaining / 2));
            }, perc === 10 ? 100 : halflife);
        } else if (perc === 100) {
            setTimeout(function () {
                context.exitProgress(elm);
            }, halflife);
        }
        function _styles() {
            const blur_opacity = context.progressBlurOpacity();
            const blur_opacity_hex = blur_opacity * 255 >= 16 ? Math.floor(blur_opacity * 255).toString(16).slice(-2) : "00";
            const blur_color = context.progressHexBlurColor() ? context.progressHexBlurColor() : bar_color;
            const blur_size = context.progressBlurSize();
            const blur_fx = context.progressBarBlur() ? `background: radial-gradient(ellipse at 50% 50%, ${blur_color}${blur_opacity_hex}, ${blur_color}00, #00000000 ${blur_size}px);` : "";
            return `
                #${_id}::before{
                    content:" ";display:block;position:absolute;
                    height:${bar_size}px;width:${perc}%;
                    left:0;top:0;
                    background-color: ${bar_color};
                    transition: width ${(halflife / 1000)}s;
                }
                #${_id}::after{
                    content:" ";display:block;position:absolute;
                    height:${blur_size}px;width:${blur_size * 2}px;
                    left:calc(${perc}% - ${blur_size}px);
                    top:${-((blur_size / 2) - (bar_size / 2))}px;
                    background-color: ${bar_color};
                    transition: left ${(halflife / 1000)}s;
                    transform: rotate(1deg) translate(-${blur_size / 2.5}px,0px) scale(1.5,0.5);
                    ${blur_fx}
                }
            `;
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
