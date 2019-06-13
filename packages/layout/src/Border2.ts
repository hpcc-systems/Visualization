import { BBox, HTMLWidget, Widget } from "@hpcc-js/common";

import "../src/Border2.css";

export class WidgetDiv {
    private _div;
    private _overlay: boolean = false;
    private _widget: Widget;

    constructor(div) {
        this._div = div;
    }

    overlay(): boolean;
    overlay(_: boolean): this;
    overlay(_?: boolean): boolean | this {
        if (!arguments.length) return this._overlay;
        this._overlay = _;
        return this;
    }

    element() {
        return this._div;
    }

    node(): SVGElement | HTMLElement {
        return this._div.node();
    }

    widget(): Widget;
    widget(_: Widget): this;
    widget(_?: Widget): Widget | this {
        if (!arguments.length) return this._widget;
        if (this._widget !== _) {
            if (this._widget) {
                this._widget.target(null);
            }
            this._widget = _;
            if (this._widget) {
                this._widget.target(this._div.node());
            }
        }
        return this;
    }

    resize(size: { width: number, height: number }) {
        if (this._widget) {
            this._div
                .style("height", `${size.height}px`)
                ;
            this._widget.resize(size);
        }
        return this;
    }

    async render(getBBox?): Promise<BBox | undefined> {
        this._div
            .style("height", this.overlay() ? "0px" : null)
            .style("overflow", this.overlay() ? "visible" : null)
            ;

        if (this._widget) {
            return this._widget.renderPromise().then(w => {
                if (getBBox && this._widget.visible()) {
                    const retVal = this._widget.getBBox();
                    retVal.width += 8;
                    if (this.overlay()) {
                        retVal.height = 0;
                    } else {
                        retVal.height += 8;
                    }
                    return retVal;
                }
                return getBBox ? { x: 0, y: 0, width: 0, height: 0 } : undefined;
            });
        }
        return Promise.resolve(getBBox ? { x: 0, y: 0, width: 0, height: 0 } : undefined);
    }
}

export class Border2 extends HTMLWidget {

    protected _topWA: WidgetDiv;
    protected _leftWA: WidgetDiv;
    protected _centerWA: WidgetDiv;
    protected _rightWA: WidgetDiv;
    protected _bottomWA: WidgetDiv;

    constructor() {
        super();
        this._tag = "div";
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._topWA = new WidgetDiv(element.append("header"));
        const body = element.append("div").attr("class", "body");
        this._centerWA = new WidgetDiv(body.append("div").attr("class", "center"));
        this._leftWA = new WidgetDiv(body.append("div").attr("class", "lhs"));
        this._rightWA = new WidgetDiv(body.append("div").attr("class", "rhs"));
        this._bottomWA = new WidgetDiv(element.append("div").attr("class", "footer"));
    }

    update(domNode, element) {
        super.update(domNode, element);
    }

    private targetNull(w?: Widget) {
        if (w) {
            w.target(null);
        }
    }

    exit(domNode, element) {
        this.targetNull(this.center());
        this.targetNull(this.bottom());
        this.targetNull(this.right());
        this.targetNull(this.left());
        this.targetNull(this.top());
        super.exit(domNode, element);
    }

    render(callback?: (w: Widget) => void): this {
        const retVal = super.render(w => {
            if (this._topWA) {
                this._topWA
                    .widget(this.top())
                    .overlay(this.topOverlay())
                    .render(true).then(async topBBox => {
                        const leftBBox: BBox = await this._leftWA.widget(this.left()).render(true) as BBox;
                        const rightBBox: BBox = await this._rightWA.widget(this.right()).render(true) as BBox;
                        const bottomBBox: BBox = await this._bottomWA.widget(this.bottom()).render(true) as BBox;
                        if (this.bottomHeight_exists()) {
                            bottomBBox.height = this.bottomHeight();
                        }
                        if (this.topHeight_exists()) {
                            topBBox.height = this.topHeight();
                        }
                        const promises = [
                            this._topWA
                                .resize({ width: this.width(), height: topBBox.height })
                                .render(),
                            this._leftWA
                                .resize({ width: leftBBox.width, height: this.height() - (topBBox.height + bottomBBox.height) })
                                .render(),
                            this._rightWA
                                .resize({ width: rightBBox.width, height: this.height() - (topBBox.height + bottomBBox.height) })
                                .render(),
                            this._centerWA
                                .widget(this.center())
                                .resize({ width: this.width() - (leftBBox.width + rightBBox.width), height: this.height() - (topBBox.height + bottomBBox.height) })
                                .render(),
                            this._bottomWA
                                .resize({ width: this.width(), height: bottomBBox.height })
                                .render()
                        ];
                        Promise.all(promises).then(promises => {
                            if (callback) {
                                callback(this);
                            }
                        });
                    })
                    ;
            } else {
                if (callback) {
                    callback(this);
                }
            }
        });
        return retVal;
    }
}
Border2.prototype._class += " layout_Border2";

export interface Border2 {
    top(): Widget;
    top(_: Widget): this;
    topOverlay(): boolean;
    topOverlay(_: boolean): this;
    topHeight(): number;
    topHeight(_: number): this;
    topHeight_exists(): boolean;
    left(): Widget;
    left(_: Widget): this;
    center(): Widget;
    center(_: Widget): this;
    right(): Widget;
    right(_: Widget): this;
    bottom(): Widget;
    bottom(_: Widget): this;
    bottomHeight(): number;
    bottomHeight(_: number): this;
    bottomHeight_exists(): boolean;
}
Border2.prototype.publish("top", null, "widget", "Top Widget", undefined, { render: false });
Border2.prototype.publish("topOverlay", false, "boolean", "Overlay Top Widget");
Border2.prototype.publish("topHeight", null, "number", "Top Fixed Height (pixels)", undefined, { optional: true });
Border2.prototype.publish("left", null, "widget", "Left Widget", undefined, { render: false });
Border2.prototype.publish("center", null, "widget", "Center Widget", undefined, { render: false });
Border2.prototype.publish("right", null, "widget", "Right Widget", undefined, { render: false });
Border2.prototype.publish("bottom", null, "widget", "Bottom Widget", undefined, { render: false });
Border2.prototype.publish("bottomHeight", null, "number", "Bottom Fixed Height", undefined, { optional: true });
