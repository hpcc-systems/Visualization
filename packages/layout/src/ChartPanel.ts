import { publish, publishProxy, TextBox as Text, Utility, Widget } from "@hpcc-js/common";
import { Border2 } from "./Border2";
import { Legend } from "./Legend";
import { Modal } from "./Modal";
import { Button, IClickHandler, Item, TitleBar, ToggleButton } from "./TitleBar";

export class ChartPanel extends Border2 implements IClickHandler {

    private _titleBar = new TitleBar();
    private _modal = new Modal();

    private _legend = new Legend(this);
    @publish([
        {
            icon: "fa-filter",
            type: "ToggleButton",
            selected: false,
            init(btn) {
                if (!window.g_form) window.g_form = new Text().text("Placeholder for a form widget");
                this._modal
                    .title("Filter Modal")
                    .show(true)
                    .widget(window.g_form)
                    .render(n => {
                        n.resize().render();
                    });
                this._modal._close = function () {
                    btn.selected(false).render();
                };
            },
            on(btn) {
                this._modal.show(true).showPreview(false).render(n => {
                    n.resize().render();
                });
            },
            off(btn) {
                this._modal.show(false).render();
            },
            mouseenter(btn) {
                this._modal.showPreview(true).render(n => {
                    n.resize().render();
                });
            },
            mouseleave(btn) {
                if (this._modal.showPreview()) {
                    this._modal.show(false).showPreview(false).render();
                }
            },
        },
        {
            icon: "fa-info-circle",
            type: "ToggleButton",
            selected: false,
            on(btn) {
                this._modal
                    .title("Filter Modal")
                    .widget(new Text().text("Info about this ChartPanel"))
                    .show(true)
                    .render(n => {
                        n.resize().render(n => {
                            n._widget.resize().render();
                        });
                    });
                this._modal._close = function () {
                    btn.selected(false).render();
                };
            },
            off(btn) {
                this._modal.show(false).render();
            },
        },
        {
            icon: "fa-download",
            type: "Button",
            selected: false,
            click(btn) {
                this.downloadCSV();
            }
        },
        {
            icon: "fa-list-ul",
            type: "ToggleButton",
            selected: false,
            on(d) {
                this._legend.visible(true);
                this.render();
            },
            off(d) {
                this._legend.visible(false);
                this.render();
            },
            update(d) {
                if (this._prevChartDataFamily !== "ND") {
                    this._prevChartDataFamily = "ND";
                    switch (this._prevChartDataFamily) {
                        case "any":
                            d.ref.selected(false);
                            this._legend.visible(false);
                            break;
                    }
                }
            }
        },
    ], "array", "Buttons")
    button_json: any;
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
        this._titleBar.buttons(this.button_json().map(n => {
            switch (n.type) {
                case "Button":
                    n.ref = new Button(this, n.icon);
                    return n.ref;
                case "ToggleButton":
                    n.ref = new ToggleButton(this, n.icon).selected(!!n.selected);
                    return n.ref;
            }
        }));
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

        this._modal.target(this._target).relativeTargetId(this.id());

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
        this.button_json().forEach(n => {
            if (n.update) {
                n.update.call(this, n);
            }
        });
        this._legend.dataFamily("ND"); // this._widget.getChartDataFamily());
        super.update(domNode, element);
    }

    exit(domNode, element) {
        super.exit(domNode, element);
    }

    // IClickHandler  ---
    titleBarClick(src: Item, d, idx: number, groups): void {
        const clicked_button_arr = this.button_json().filter(n => n.ref === src);
        const args = arguments;
        clicked_button_arr.forEach(n => {
            if (src instanceof Button && n.click) {
                n.click.apply(this, args);
            } else if (src instanceof ToggleButton) {
                if (n.click) {
                    n.click.apply(this, args);
                }
                if (src.selected()) {
                    if (n.on) {
                        if (n.init) n.init.apply(this, args);
                        n.on.apply(this, args);
                    }
                } else {
                    if (n.off) {
                        n.off.apply(this, args);
                    }
                }
            }
        });
    }
    titleBarMouseEnter(src: Item, d, idx: number, groups): void {
        const clicked_button_arr = this.button_json().filter(n => n.ref === src);
        const args = arguments;
        clicked_button_arr.forEach(n => {
            if (n.mouseenter && n.init) {
                if (n.init) n.init.apply(this, args);
                n.mouseenter.apply(this, args);
            }
        });
    }
    titleBarMouseLeave(src: Item, d, idx: number, groups): void {
        const clicked_button_arr = this.button_json().filter(n => n.ref === src);
        const args = arguments;
        clicked_button_arr.forEach(n => {
            if (n.mouseleave) {
                n.mouseleave.apply(this, args);
            }
        });
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
