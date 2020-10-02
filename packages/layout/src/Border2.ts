import { BBox, HTMLWidget, Platform, Widget } from "@hpcc-js/common";

import "../src/Border2.css";

export type OverflowT = "hidden" | "scroll" | "visible" | "auto";
export type ChartPanelSectionT = "top" | "right" | "bottom" | "left" | "center";
export class WidgetDiv {
    private _div;
    private _overlay: boolean = false;
    private _overflowX: OverflowT = "visible";
    private _overflowY: OverflowT = "visible";
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

    overflowX(): OverflowT;
    overflowX(_: OverflowT): this;
    overflowX(_?: OverflowT): OverflowT | this {
        if (!arguments.length) return this._overflowX;
        this._overflowX = _;
        this._div.style("overflow-x", _);
        return this;
    }
    overflowY(): OverflowT;
    overflowY(_: OverflowT): this;
    overflowY(_?: OverflowT): OverflowT | this {
        if (!arguments.length) return this._overflowY;
        this._overflowY = _;
        this._div.style("overflow-y", _);
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
                .style("width", `${size.width}px`)
                .style("height", `${size.height}px`)
                ;
            this._widget.resize(size);
        }
        return this;
    }

    async render(getBBox?, availableHeight?: number, availableWidth?: number): Promise<BBox | undefined> {
        let overflowX = this.overflowX();
        if(!this.overlay() && overflowX === "visible") {
            overflowX = null;
        }
        let overflowY = this.overflowY();
        if(!this.overlay() && overflowY === "visible") {
            overflowY = null;
        }
        this._div
            .style("height", this.overlay() ? "0px" : null)
            .style("overflow-x", overflowX)
            .style("overflow-y", overflowY)
            ;
        if (this._widget) {
            return this._widget.renderPromise().then(w => {
                if (getBBox && this._widget.visible()) {
                    const retVal = this._widget.getBBox();
                    retVal.width += 8;
                    if (availableHeight !== undefined && retVal.height > availableHeight) {
                        retVal.width += Platform.getScrollbarWidth();
                    }
                    if (availableWidth !== undefined && retVal.width > availableWidth) {
                        retVal.height += Platform.getScrollbarWidth();
                    }
                    if (this.overlay()) {
                        retVal.height = 0;
                    } else {
                        retVal.height += 4;
                    }
                    return retVal;
                }
                return getBBox ? { x: 0, y: 0, width: 0, height: 0 } : undefined;
            });
        } else {
            return Promise.resolve(getBBox ? { x: 0, y: 0, width: 0, height: 0 } : undefined);
        }
    }
}

export class Border2 extends HTMLWidget {

    protected _bodyElement;

    protected _topWA: WidgetDiv;
    protected _leftWA: WidgetDiv;
    protected _centerWA: WidgetDiv;
    protected _rightWA: WidgetDiv;
    protected _bottomWA: WidgetDiv;
    protected _topPrevOverflow: OverflowT;
    protected _leftPrevOverflow: OverflowT;
    protected _rightPrevOverflow: OverflowT;
    protected _bottomPrevOverflow: OverflowT;

    constructor() {
        super();
        this._tag = "div";
    }

    enter(domNode, element) {
        super.enter(domNode, element);
            
        const topElement = element.append("header");

        this._bodyElement = element.append("div").attr("class", "body");
        const centerElement = this._bodyElement.append("div").attr("class", "center");
        const leftElement = this._bodyElement.append("div").attr("class", "lhs");
        const rightElement = this._bodyElement.append("div").attr("class", "rhs");

        const bottomElement = element.append("div").attr("class", "footer");

        this._topWA = new WidgetDiv(topElement);
        this._centerWA = new WidgetDiv(centerElement);
        this._leftWA = new WidgetDiv(leftElement);
        this._rightWA = new WidgetDiv(rightElement);
        this._bottomWA = new WidgetDiv(bottomElement);
    }

    update(domNode, element) {
        super.update(domNode, element);
        this._topWA.element().style("display", this.showTop() ? null : "none");
        this._rightWA.element().style("display", this.showRight() ? null : "none");
        this._bottomWA.element().style("display", this.showBottom() ? null : "none");
        this._leftWA.element().style("display", this.showLeft() ? null : "none");
        if(this.topOverflowX() !== this._topWA.overflowX()) {
            this._topWA.overflowX(this.topOverflowX());
        }
        if(this.rightOverflowX() !== this._rightWA.overflowX()) {
            this._rightWA.overflowX(this.rightOverflowX());
        }
        if(this.bottomOverflowX() !== this._bottomWA.overflowX()) {
            this._bottomWA.overflowX(this.bottomOverflowX());
        }
        if(this.leftOverflowX() !== this._leftWA.overflowX()) {
            this._leftWA.overflowX(this.leftOverflowX());
        }
        if(this.topOverflowY() !== this._topWA.overflowY()) {
            this._topWA.overflowY(this.topOverflowY());
        }
        if(this.rightOverflowY() !== this._rightWA.overflowY()) {
            this._rightWA.overflowY(this.rightOverflowY());
        }
        if(this.bottomOverflowY() !== this._bottomWA.overflowY()) {
            this._bottomWA.overflowY(this.bottomOverflowY());
        }
        if(this.leftOverflowY() !== this._leftWA.overflowY()) {
            this._leftWA.overflowY(this.leftOverflowY());
        }
        this.element()
            .style("width", `${this.width()}px`)
            .style("height", `${this.height()}px`)
            ;
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

    swap(sectionA: ChartPanelSectionT, sectionB: ChartPanelSectionT): this {
        const a = this[sectionA]();
        const b = this[sectionB]();
        this.targetNull(a);
        this.targetNull(b);
        this[`_${sectionA}WA`].widget(null);
        this[`_${sectionB}WA`].widget(null);
        this[sectionA](b);
        this[sectionB](a);
        return this;
    }

    render(callback?: (w: Widget) => void): this {
        const retVal = super.render(w => {
            if (this._topWA) {
                this._topWA
                    .widget(this.top())
                    .overlay(this.topOverlay())
                    .render(true).then(async topBBox => {
                        const bottomBBox: BBox = await this._bottomWA.widget(this.bottom()).render(true, undefined, this.width()) as BBox;
                        const availableHeight = this.height() - (topBBox.height + bottomBBox.height);
                        const leftBBox: BBox = await this._leftWA.widget(this.left()).render(true, availableHeight) as BBox;
                        const rightBBox: BBox = await this._rightWA.widget(this.right()).render(true, availableHeight) as BBox;
                        
                        if (this.bottomHeight_exists()) {
                            bottomBBox.height = this.bottomHeight();
                        }
                        const bodyWidth = this.width() - (leftBBox.width + rightBBox.width);
                        const bodyHeight = this.height() - (topBBox.height + bottomBBox.height);
                        
                        const centerOverflowX = this.centerOverflowX();
                        const centerOverflowY = this.centerOverflowY();

                        const scrollCenterX = ["auto", "scroll"].indexOf(centerOverflowX) !== -1;
                        const scrollCenterY = ["auto", "scroll"].indexOf(centerOverflowY) !== -1;
                        if(scrollCenterX || scrollCenterY) {
                            this._centerWA
                                .overflowX(this.centerOverflowX())
                                .overflowY(this.centerOverflowY())
                                .widget(this.center())
                                .resize({
                                    width: bodyWidth,
                                    height: bodyHeight
                                })
                                .render()
                                ;
                        }
                        this._bodyElement.style("height", `${bodyHeight}px`);
                        const promises = [
                            this._topWA
                                .overflowX(this.topOverflowX())
                                .overflowY(this.topOverflowY())
                                .resize({
                                    width: this.width(),
                                    height: topBBox.height
                                })
                                .render(),
                            this._leftWA
                                .overflowX(this.leftOverflowX())
                                .overflowY(this.leftOverflowY())
                                .resize({
                                    width: leftBBox.width,
                                    height: bodyHeight
                                })
                                .render(),
                            this._rightWA
                                .overflowX(this.rightOverflowX())
                                .overflowY(this.rightOverflowY())
                                .resize({
                                    width: rightBBox.width,
                                    height: bodyHeight
                                })
                                .render(),
                            this._centerWA
                                .overflowX(this.centerOverflowX())
                                .overflowY(this.centerOverflowY())
                                .widget(this.center())
                                .resize({
                                    width: bodyWidth,
                                    height: bodyHeight
                                })
                                .render(),
                            this._bottomWA
                                .overflowX(this.bottomOverflowX())
                                .overflowY(this.bottomOverflowY())
                                .resize({
                                    width: this.width(),
                                    height: bottomBBox.height
                                })
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
    topOverflowX(): OverflowT;
    topOverflowX(_: OverflowT): this;
    rightOverflowX(): OverflowT;
    rightOverflowX(_: OverflowT): this;
    bottomOverflowX(): OverflowT;
    bottomOverflowX(_: OverflowT): this;
    leftOverflowX(): OverflowT;
    leftOverflowX(_: OverflowT): this;
    centerOverflowX(): OverflowT;
    centerOverflowX(_: OverflowT): this;
    topOverflowY(): OverflowT;
    topOverflowY(_: OverflowT): this;
    rightOverflowY(): OverflowT;
    rightOverflowY(_: OverflowT): this;
    bottomOverflowY(): OverflowT;
    bottomOverflowY(_: OverflowT): this;
    leftOverflowY(): OverflowT;
    leftOverflowY(_: OverflowT): this;
    centerOverflowY(): OverflowT;
    centerOverflowY(_: OverflowT): this;
    showTop(): boolean;
    showTop(_: boolean): this;
    showRight(): boolean;
    showRight(_: boolean): this;
    showBottom(): boolean;
    showBottom(_: boolean): this;
    showLeft(): boolean;
    showLeft(_: boolean): this;
    topOverflowX_default(_: OverflowT);
    rightOverflowX_default(_: OverflowT);
    bottomOverflowX_default(_: OverflowT);
    leftOverflowX_default(_: OverflowT);
    centerOverflowX_default(_: OverflowT);
    topOverflowY_default(_: OverflowT);
    rightOverflowY_default(_: OverflowT);
    bottomOverflowY_default(_: OverflowT);
    leftOverflowY_default(_: OverflowT);
    centerOverflowY_default(_: OverflowT);
}
Border2.prototype.publish("showTop", true, "boolean", "If true, top widget adapter will display");
Border2.prototype.publish("showRight", true, "boolean", "If true, right widget adapter will display");
Border2.prototype.publish("showBottom", true, "boolean", "If true, bottom widget adapter will display");
Border2.prototype.publish("showLeft", true, "boolean", "If true, left widget adapter will display");
Border2.prototype.publish("topOverflowX", "visible", "set", "Sets the overflow-x css style for the top widget adapter", ["hidden", "scroll", "visible", "auto"]);
Border2.prototype.publish("rightOverflowX", "visible", "set", "Sets the overflow-x css style for the right widget adapter", ["hidden", "scroll", "visible", "auto"]);
Border2.prototype.publish("bottomOverflowX", "visible", "set", "Sets the overflow-x css style for the bottom widget adapter", ["hidden", "scroll", "visible", "auto"]);
Border2.prototype.publish("leftOverflowX", "visible", "set", "Sets the overflow-x css style for the left widget adapter", ["hidden", "scroll", "visible", "auto"]);
Border2.prototype.publish("centerOverflowX", "visible", "set", "Sets the overflow-x css style for the center widget adapter", ["hidden", "scroll", "visible", "auto"]);
Border2.prototype.publish("topOverflowY", "visible", "set", "Sets the overflow-y css style for the top widget adapter", ["hidden", "scroll", "visible", "auto"]);
Border2.prototype.publish("rightOverflowY", "visible", "set", "Sets the overflow-y css style for the right widget adapter", ["hidden", "scroll", "visible", "auto"]);
Border2.prototype.publish("bottomOverflowY", "visible", "set", "Sets the overflow-y css style for the bottom widget adapter", ["hidden", "scroll", "visible", "auto"]);
Border2.prototype.publish("leftOverflowY", "visible", "set", "Sets the overflow-y css style for the left widget adapter", ["hidden", "scroll", "visible", "auto"]);
Border2.prototype.publish("centerOverflowY", "visible", "set", "Sets the overflow-y css style for the center widget adapter", ["hidden", "scroll", "visible", "auto"]);
Border2.prototype.publish("top", null, "widget", "Top Widget", undefined, { render: false });
Border2.prototype.publish("topOverlay", false, "boolean", "Overlay Top Widget");
Border2.prototype.publish("left", null, "widget", "Left Widget", undefined, { render: false });
Border2.prototype.publish("center", null, "widget", "Center Widget", undefined, { render: false });
Border2.prototype.publish("right", null, "widget", "Right Widget", undefined, { render: false });
Border2.prototype.publish("bottom", null, "widget", "Bottom Widget", undefined, { render: false });
Border2.prototype.publish("bottomHeight", null, "number", "Bottom Fixed Height", undefined, { optional: true });
