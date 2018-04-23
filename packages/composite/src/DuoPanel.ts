import { HTMLWidget } from "@hpcc-js/common";
import { Table } from "@hpcc-js/dgrid";
import { Slider } from "@hpcc-js/form";
import { ChartPanel } from "@hpcc-js/layout";

export class LineupButton extends HTMLWidget {
    private _icon: string;
    private _tooltip: string;

    constructor(icon: string, tooltip?: string) {
        super();
        this._tag = "a";
        this._icon = icon;
        this._tooltip = tooltip;
    }

    icon() {
        return this._icon;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        element
            .attr("href", "#")
            .attr("title", this._tooltip)
            .on("click", this.click)
            .on("mousemove", this.mouseMove)
            .on("mouseout", this.mouseOut)
            .append("i")
            .style("width", "28px")
            .style("padding", "4px")
            .style("background-color", "#333")
            .style("color", "#fff")
            .style("padding", "4px")
            .style("margin", "4px")
            .style("border-radius", "4px")
            .text(`${this._icon}`)
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        element.classed("disabled", !this.enabled());
    }

    //  Events  ---
    click(d, idx, groups) {
    }

    mouseMove(d, idx, groups) {
    }

    mouseOut(d, idx, groups) {
    }

    enabled() {
        return true;
    }
}
LineupButton.prototype._class += " composite_LineupButton";

export class DuoPanel extends ChartPanel {
    protected _absolute = new Slider().low(1995).high(2018);
    protected _columns = [];
    protected _data = [];
    protected _lineup = [
        {src: "src/dgrid/Table", proto: Table, icon: "A", variableName: "_base", columns: "*", params: {}},
        {src: "src/dgrid/Table", proto: Table, icon: "B", variableName: "_base", columns: ["Letter", "Lat", "Lng"], params: {}},
        {src: "src/dgrid/Table", proto: Table, icon: "C", variableName: "_base", columns: ["Letter", "Date"], params: {}}
    ];
    protected _currentLineup;
    constructor() {
        super();
        this._tag = "div";
    }

    columns(): string[];
    columns(_: string[], asDefault?: boolean): this;
    columns(_?: string[], asDefault?: boolean): string[] | this {
        if (!arguments.length) return this._columns;
        this._columns = _;
        return this;
    }
    data(_?) {
        if (!arguments.length) return this._data;
        this._data = _;
        return this;
    }

    nextLineup(obj) {
        const w = new obj.proto();
        if (this.widget() !== null) {
            this.widget().target(null);
        }
        w.columns(this.lineupColumns(obj)).data(this.lineupData(obj));
        if (typeof obj.params !== "undefined") {
            Object.keys(obj.params).forEach(p => {
                const _p = p;
                const _v = obj.params[_p];
                if (typeof w[_p] === "function") {
                    w[_p](_v);
                } else {
                    console.log(`${_p} not a function`);
                }
            });
        }
        this._currentLineup = this.baseIdx();
        return w;
    }
    lineupColumns(obj) {
        if (typeof obj.columns !== "undefined") {
            if (obj.columns === "*") {
                return JSON.parse(JSON.stringify(this.columns()));
            } else {
                return obj.columns;
            }
        }
        console.error("lineupColumns needs lineup obj argument to contain valid obj.columns");
        return [];
    }
    lineupData(obj) {
        if (typeof obj.columns !== "undefined") {
            const _data = JSON.parse(JSON.stringify(this.data()));
            if (typeof obj.columns === "string" && obj.columns === "*") {
                return _data;
            } else if (obj.columns instanceof Array) {
                const col_idx_arr = obj.columns.map(col => {
                    return this.columns().indexOf(col);
                });
                return _data.map(row => {
                    const _ret = [];
                    row.forEach((cell, idx) => {
                        if (col_idx_arr.indexOf(idx) !== -1) {
                            _ret.push(cell);
                        }
                    });
                    return _ret;
                });
            }
        }
        console.error("lineupData needs lineup obj argument to contain valid obj.columns");
        return [];
    }
    initTitleBar() {
        const _toolbarButtons = [];
        this._lineup.forEach((obj, obj_idx) => {
            const _icon = obj.icon;
            const btn = new LineupButton(_icon, _icon)
                .on("click", () => {
                    this.baseIdx(obj_idx);
                    this.setWidget(this.nextLineup(obj));
                });
            _toolbarButtons.push(btn);
        });
        this._titleBar.buttons(_toolbarButtons);
    }
    setWidget(w) {
        this.widget(w);
        this.center(w);
        if (!w.target()) {
            w.target(this.element().select("center").node());
        }
        w.render();
    }
    enter(domNode, element) {
        console.log(`this.data() = ${JSON.stringify(this.data())}`);
        if (this._lineup.length) {
            this.setWidget(this.nextLineup(this._lineup[this.baseIdx()]));
            this.initTitleBar();
        }
        element
            .style("position", "relative")
            ;
        const absoluteDiv = element.append("div")
            .classed("absolute-widget", true)
            .style("position", "absolute")
            .style("left", "60%")
            .style("top", "90%")
            .style("width", "40%")
            .style("height", "10%")
            .style("z-index", 3000)
            ;
        this._absolute
            .target(absoluteDiv.node())
            .columns(this.absoluteColumns())
            .data(this.lineupData({columns: this.absoluteColumns()}))
            .render()
            ;
        super.enter(domNode, element);
        console.log(`this.data() = ${JSON.stringify(this.data())}`);
    }
    update(domNode, element) {
        console.log(`this.data() = ${JSON.stringify(this.data())}`);
        super.update(domNode, element);
        if (this.baseIdx() !== this._currentLineup) {
            this.widget(
                this.nextLineup(this._lineup[this.baseIdx()])
            );
            this.initTitleBar();
        }
        console.log(`this.data() = ${JSON.stringify(this.data())}`);
    }

}
DuoPanel.prototype._class += " composite_DuoPanel";

export interface DuoPanel {
    absoluteColumns(): any;
    absoluteColumns(_: any): this;
    baseIdx(): number;
    baseIdx(_: number): this;
    dateColumn(_: string): this;
    dateColumn(): string;
    dateColumn(_: string): this;
    latitudeColumn(): string;
    latitudeColumn(_: string): this;
    longitudeColumn(): string;
    longitudeColumn(_: string): this;
}
DuoPanel.prototype.publish("absoluteColumns", [], "array");
DuoPanel.prototype.publish("baseIdx", 0, "number");
DuoPanel.prototype.publish("dateColumn", null, "string");
DuoPanel.prototype.publish("latitudeColumn", null, "string");
DuoPanel.prototype.publish("longitudeColumn", null, "string");
