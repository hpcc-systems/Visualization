import { select as d3Select } from "d3-selection";
import "d3-transition";
import { Field, Grid } from "./Database";
import { } from "./Platform";
import { PropertyExt } from "./PropertyExt";
import { debounce } from "./Utility";

import "../src/Widget.css";

export type IPrimative = boolean | number | string | object;
export type IFieldType = "boolean" | "number" | "string" | "dataset" | "object" | "any";
export interface InputField {
    id: string;
    type: IFieldType;
    multi?: boolean;
    default?: IPrimative | InputField[];
    children?: InputField[];
}

export interface IPos {
    x: number;
    y: number;
}

export interface ISize {
    width: number;
    height: number;
}

export interface BBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface DataMetaT {
    min?: number;
    max?: number;
    mean?: number;
    stdDev?: number;
    sum?: number;
}

let g_fontSizeContext: CanvasRenderingContext2D;
const g_fontSizeContextCache: { [key: string]: ISize } = {};

let widgetID = 0;
export abstract class Widget extends PropertyExt {
    _idSeed: string;

    protected _tag: string;
    protected _isRootNode: boolean = true;

    protected _db = new Grid();
    protected _pos;
    protected _prevPos;
    protected _size;
    protected _widgetScale;
    protected _visible;
    protected _display;
    protected _dataMeta: DataMetaT = {};

    protected _target: null | HTMLElement | SVGElement;
    protected _placeholderElement;
    protected _parentWidget;

    protected _element;

    protected _renderCount;

    protected _overlayElement;

    constructor() {
        super();
        this._class = Object.getPrototypeOf(this)._class;
        this._id = this._idSeed + widgetID++;

        this._db = new Grid();
        this._pos = { x: 0, y: 0 };
        this._size = { width: 0, height: 0 };
        this._widgetScale = 1;
        this._visible = true;

        this._target = null;
        this._placeholderElement = null;
        this._parentWidget = null;

        this._element = d3Select(null);

        this._renderCount = 0;

        if ((window as any).__hpcc_debug) {
            if ((window as any).g_all === undefined) {
                (window as any).g_all = {};
            }
            (window as any).g_all[this._id] = this;
        }
        if ((window as any).__hpcc_theme) {
            this.applyTheme((window as any).__hpcc_theme);
        }
    }

    importJSON(_: string | object): this {
        this._db.json(_);
        return this;
    }

    export(_: "JSON" | "CSV" | "TSV" = "JSON") {
        switch (_) {
            case "CSV":
                return this._db.csv();
            case "TSV":
                return this._db.tsv();
            case "JSON":
            default:
                return this._db.json();
        }
    }

    leakCheck(newNode) {
        const context = this;
        const watchArray = [newNode];
        const destructObserver = new MutationObserver(function (mutations) {
            let leaks = false;
            mutations.forEach(function (mutation) {
                for (let i = 0; i < mutation.removedNodes.length; ++i) {
                    const node = mutation.removedNodes.item(i);
                    if (watchArray.indexOf(node) >= 0 && context._target) {
                        leaks = true;
                        destructObserver.disconnect();
                    }
                }
            });
            if (leaks) {
                console.log("leak:  " + context.id() + " - " + context.classID() + "\t\twidget.target(null); was not called for this widget before it was removed from the page.");
            }
        });
        let pNode = newNode.parentNode;
        while (pNode) {
            destructObserver.observe(pNode, { childList: true });
            watchArray.push(pNode);
            pNode = pNode.parentNode;
        }
    }

    renderCount(): number {
        return this._renderCount;
    }

    //  Implementation  ---
    columns(): string[];
    columns(_: string[], asDefault?: boolean): this;
    columns(_?: string[], asDefault?: boolean): string[] | this {
        if (!arguments.length) return this._db.legacyColumns();
        this._db.legacyColumns(_, asDefault);
        return this;
    }

    parsedData() {
        return this._db.parsedData();
    }

    formattedData() {
        return this._db.formattedData();
    }

    data(): any;
    data(_: any): this;
    data(_?: any): any | this {
        if (!arguments.length) return this._db.legacyData();
        this._db.legacyData(_);
        return this;
    }

    cloneData() {
        return this.data().map(function (row) { return row.slice(0); });
    }

    flattenData(columns: string[] = this.columns(), data: any = this.data()) {
        const retVal = [];
        data.forEach(function (row, rowIdx) {
            columns.filter(function (_col, idx) { return idx > 0; }).forEach(function (_col, idx) {
                const val = row[idx + 1];
                if (typeof val !== "undefined") {
                    const newItem = {
                        rowIdx,
                        colIdx: idx + 1,
                        label: row[0],
                        value: val
                    };
                    retVal.push(newItem);
                }
            }, this);
        }, this);
        return retVal;
    }

    rowToObj(row: any[]): object {
        if (!row) return {};
        const retVal: any = {};
        this.fields().forEach(function (field, idx) {
            retVal[field.label_default() || field.label()] = row[idx];
        });
        if (row.length === this.columns().length + 1) {
            retVal.__lparam = row[this.columns().length];
        }
        return retVal;
    }

    pos(): IPos;
    pos(_: IPos): this;
    pos(_?: IPos): IPos | this {
        if (!arguments.length) return this._pos;
        this._pos = _;
        if (this._overlayElement) {
            this._overlayElement
                .attr("transform", "translate(" + _.x + "," + _.y + ")scale(" + this._widgetScale + ")")
                ;
        }
        return this;
    }

    x(): number;
    x(_): this;
    x(_?): number | this {
        if (!arguments.length) return this._pos.x;
        this.pos({ x: _, y: this._pos.y });
        return this;
    }

    y(): number;
    y(_): this;
    y(_?): number | this {
        if (!arguments.length) return this._pos.y;
        this.pos({ x: this._pos.x, y: _ });
        return this;
    }

    size(): ISize;
    size(_): this;
    size(_?): ISize | this {
        if (!arguments.length) return this._size;
        this._size = _;
        if (this._overlayElement) {
            this._overlayElement
                .attr("width", _.width)
                .attr("height", _.height)
                ;
        }
        return this;
    }

    width(): number;
    width(_): this;
    width(_?): number | this {
        if (!arguments.length) return this._size.width;
        this.size({ width: _, height: this._size.height });
        return this;
    }

    height(): number;
    height(_): this;
    height(_?): number | this {
        if (!arguments.length) return this._size.height;
        this.size({ width: this._size.width, height: _ });
        return this;
    }

    resize(size?: ISize, delta: ISize = { width: 0, height: 0 }) {
        let width;
        let height;
        if (size && size.width && size.height) {
            width = size.width;
            height = size.height;
        } else {
            const style = window.getComputedStyle(this._target, null);
            width = parseFloat(style.getPropertyValue("width")) - delta.width;
            height = parseFloat(style.getPropertyValue("height")) - delta.height;
        }
        this.size({
            width,
            height
        });
        return this;
    }

    scale(): number;
    scale(_): Widget;
    scale(_?): number | Widget {
        if (!arguments.length) return this._widgetScale;
        this._widgetScale = _;
        if (this._overlayElement) {
            this._overlayElement
                .attr("transform", "translate(" + _.x + "," + _.y + ")scale(" + this._widgetScale + ")")
                ;
        }
        return this;
    }

    visible(): boolean;
    visible(_): this;
    visible(_?): boolean | this {
        if (!arguments.length) return this._visible;
        this._visible = _;
        if (this._element) {
            this._element
                .style("visibility", this._visible ? null : "hidden")
                .style("opacity", this._visible ? null : 0)
                ;
        }
        return this;
    }

    display(): boolean;
    display(_): this;
    display(_?): boolean | this {
        if (!arguments.length) return this._display;
        this._display = _;
        if (this._element) {
            this._element.style("display", this._display ? null : "none");
        }
        return this;
    }

    dataMeta(): DataMetaT;
    dataMeta(_): this;
    dataMeta(_?): DataMetaT | this {
        if (!arguments.length) return this._dataMeta;
        this._dataMeta = _;
        return this;
    }

    private _appData = new Object({});
    appData(key: string): any;
    appData(key: string, value: any): this;
    appData(key: string, value?: any): any | this {
        if (arguments.length < 2) return this._appData[key];
        this._appData[key] = value;
        return this;
    }

    calcSnap(snapSize) {
        function snap(x, gridSize) {
            function snapDelta(x2, gridSize2) {
                let dx = x2 % gridSize2;
                if (Math.abs(dx) > gridSize2 - Math.abs(dx)) {
                    dx = (gridSize2 - Math.abs(dx)) * (dx < 0 ? 1 : -1);
                }
                return dx;
            }
            return x - snapDelta(x, gridSize);
        }
        const l = snap(this._pos.x - this._size.width / 2, snapSize);
        const t = snap(this._pos.y - this._size.height / 2, snapSize);
        const r = snap(this._pos.x + this._size.width / 2, snapSize);
        const b = snap(this._pos.y + this._size.height / 2, snapSize);
        const w = r - l;
        const h = b - t;
        return [{ x: l + w / 2, y: t + h / 2 }, { width: w, height: h }];
    }

    //  DOM/SVG Node Helpers  ---
    toWidget(domNode): Widget | null {
        if (!domNode) {
            return null;
        }
        const element = d3Select(domNode);
        if (element) {
            const widget = element.datum();
            if (widget && widget instanceof Widget) {
                return widget;
            }
        }
        return null;
    }

    parentOverlay() {
        return null;
    }

    locateParentWidget(domNode?): Widget | null {
        domNode = domNode || (this._target ? this._target.parentNode : null);
        if (domNode) {
            const widget = this.toWidget(domNode);
            if (widget) {
                return widget;
            } else if (domNode.parentNode) {
                return this.locateParentWidget(domNode.parentNode);
            }
        }
        return null;
    }

    locateSVGNode(domNode): SVGSVGElement | null {
        if (!domNode) {
            return null;
        }
        if (domNode.tagName === "svg") {
            return domNode;
        }
        return this.locateSVGNode(domNode.parentNode);
    }

    locateOverlayNode() {
        let widget = this.locateParentWidget(this._target);
        while (widget) {
            const retVal = widget.parentOverlay();
            if (retVal) {
                return retVal;
            }
            widget = this.locateParentWidget(widget._target.parentNode);
        }
        return null;
    }

    locateAncestor(classID): Widget | null {
        return this.locateClosestAncestor([classID]);
    }

    locateClosestAncestor(classIDArr): Widget | null {
        let widget = this.locateParentWidget(this._target);
        while (widget) {
            if (classIDArr.indexOf(widget.classID()) !== -1) {
                return widget;
            }
            widget = this.locateParentWidget(widget._target.parentNode);
        }
        return null;
    }

    getAbsolutePos(domNode, w, h) {
        const root = this.locateSVGNode(domNode);
        if (!root) {
            return null;
        }
        let pos = root.createSVGPoint();
        const ctm = domNode.getCTM();
        pos = pos.matrixTransform(ctm);
        const retVal: any = {
            x: pos.x,
            y: pos.y
        };
        if (w !== undefined && h !== undefined) {
            let size = root.createSVGPoint();
            size.x = w;
            size.y = h;
            size = size.matrixTransform(ctm);
            retVal.width = size.x - pos.x;
            retVal.height = size.y - pos.y;
        }
        return retVal;
    }

    hasOverlay() {
        return this._overlayElement;
    }

    syncOverlay() {
        if (this._size.width && this._size.height) {
            const newPos = this.getAbsolutePos(this._overlayElement.node(), this._size.width, this._size.height);
            if (newPos && (!this._prevPos || newPos.x !== this._prevPos.x || newPos.y !== this._prevPos.y || newPos.width !== this._prevPos.width || newPos.height !== this._prevPos.height)) {
                const xScale = newPos.width / this._size.width;
                const yScale = newPos.height / this._size.height;
                this._placeholderElement
                    .style("left", newPos.x - (newPos.width / xScale) / 2 + "px")
                    .style("top", newPos.y - (newPos.height / yScale) / 2 + "px")
                    .style("width", newPos.width / xScale + "px")
                    .style("height", newPos.height / yScale + "px")
                    ;
                const transform = "scale(" + xScale + "," + yScale + ")";
                this._placeholderElement
                    .style("transform", transform)
                    .style("-moz-transform", transform)
                    .style("-ms-transform", transform)
                    .style("-webkit-transform", transform)
                    .style("-o-transform", transform)
                    ;
            }
            this._prevPos = newPos;
        }
    }

    getBBox(refresh = false, round = false): BBox {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    }

    textSize(_text: string | string[], fontName: string = "Verdana", fontSize: number = 12, bold: boolean = false): ISize {
        if (!g_fontSizeContext) {
            let fontSizeCalc = d3Select("body > #hpcc_js_font_size");
            if (fontSizeCalc.empty()) {
                fontSizeCalc = d3Select("body").append("canvas")
                    .attr("id", "hpcc_js_font_size")
                    ;
            }
            g_fontSizeContext = (fontSizeCalc.node() as HTMLCanvasElement).getContext("2d");
        }
        const text = _text instanceof Array ? _text : [_text];
        const hash = `${bold}::${fontSize}::${fontName}::${text.join("::")}`;
        let retVal = g_fontSizeContextCache[hash];
        if (!retVal) {
            g_fontSizeContext.font = `${bold ? "bold " : ""}${fontSize}px ${fontName}`;
            g_fontSizeContextCache[hash] = retVal = {
                width: Math.max(...text.map(t => g_fontSizeContext.measureText(("" + t).trim()).width)),
                height: fontSize * text.length
            };
        }
        return retVal;
    }

    element() {
        return this._element;
    }

    node() {
        return this._element.node();
    }

    target(): null | HTMLElement | SVGElement;
    target(_: null | string | HTMLElement | SVGElement): this;
    target(_?: null | string | HTMLElement | SVGElement): null | HTMLElement | SVGElement | this {
        if (!arguments.length) return this._target;
        if (this._target && _) {
            throw new Error("Target can only be assigned once.");
        }
        if (_ === null) {
            this._target = null;
            if (this.renderCount()) {
                this.exit();
            }
        } else if (typeof _ === "string") {
            this._target = document.getElementById(_);
        } else if (_ instanceof HTMLElement || _ instanceof SVGElement) {
            this._target = _;
        }
        return this;
    }

    isDOMHidden(): boolean {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
        // Note:  Will return false for visible===hidden (which is ok as it still takes up space on the page)
        return this._isRootNode && this._placeholderElement.node().offsetParent === null;
    }

    protected publishedWidgets(): Widget[] {
        let widgets = [];
        this.publishedProperties(true).forEach(function (meta) {
            if (!meta.ext || meta.ext.render !== false) {
                switch (meta.type) {
                    case "widget":
                        const widget = this[meta.id]();
                        if (widget) {
                            widgets.push(widget);
                        }
                        break;
                    case "widgetArray":
                        widgets = widgets.concat(this[meta.id]());
                        break;
                }
            }
        }, this);
        return widgets;
    }

    //  Render  ---
    private _prevNow = 0;
    render(callback?: (w: Widget) => void) {
        if ((window as any).__hpcc_debug) {
            const now = Date.now();
            if (now - this._prevNow < 500) {
                console.log("Double Render:  " + (now - this._prevNow) + " - " + this.id() + " - " + this.classID());
            }
            this._prevNow = now;
        }

        callback = callback || function () { };
        if (!this._placeholderElement || !this.visible() || this.isDOMHidden()) {
            callback(this);
            return this;
        }
        if (this._placeholderElement) {
            if (!this._tag)
                throw new Error("No DOM tag specified");

            const elements = this._placeholderElement.selectAll("#" + this._id).data([this], function (d) { return d._id; });
            elements.enter().append(this._tag)
                .classed(this._class, true)
                .attr("id", this._id)
                // .attr("opacity", 0.50)  //  Uncomment to debug position offsets  ---
                .each(function (context2) {
                    context2._element = d3Select(this);
                    context2.enter(this, context2._element);
                    if ((window as any).__hpcc_debug) {
                        context2.leakCheck(this);
                    }
                })
                .merge(elements)
                .each(function (context2) {
                    const element = d3Select(this);
                    const classed = context2.classed();
                    for (const key in classed) {
                        element.classed(key, classed[key]);
                    }
                    context2.preUpdate(this, context2._element);
                    context2.update(this, context2._element);
                    context2.postUpdate(this, context2._element);
                })
                ;
            elements.exit()
                .each(function (context2) {
                    d3Select(this).datum(null);
                    context2.exit(this, context2._element);
                })
                .remove()
                ;
            this._renderCount++;
        }

        //  ASync Render Contained Widgets  ---
        const widgets = this.publishedWidgets();

        const context = this;
        switch (widgets.length) {
            case 0:
                callback(this);
                break;
            case 1:
                widgets[0].render(function () {
                    callback(context);
                });
                break;
            default:
                let renderCount = widgets.length;
                widgets.forEach(function (widget, _idx) {
                    setTimeout(function () {
                        widget.render(function () {
                            if (--renderCount === 0) {
                                callback(context);
                            }
                        });
                    }, 0);
                });
                break;
        }
        return this;
    }

    renderPromise(): Promise<Widget> {
        return new Promise((resolve, reject) => {
            this.render((w: Widget) => {
                resolve(w);
            });
        });
    }

    lazyRender = debounce(function (debouncedCallback?: (w: Widget) => void) {
        this.render(debouncedCallback);
    }, 100);

    animationFrameRender(): this {
        if (requestAnimationFrame) {
            requestAnimationFrame(() => {
                this.render();
            });
        } else {
            //  Not a real replacement for requestAnimationFrame  ---
            this.renderPromise();
        }
        return this;
    }

    enter(_domNode: HTMLElement, _element) { }
    preUpdate(_domNode: HTMLElement, _element) { }
    update(_domNode: HTMLElement, _element) { }
    postUpdate(_domNode: HTMLElement, _element) { }
    exit(_domNode?: HTMLElement, _element?) {
        this.publishedWidgets().forEach(w => w.target(null));
    }
}
Widget.prototype._class += " common_Widget";

export interface Widget {
    fields(): Field[];
    fields(_: Field[]): this;
    classed(classID: string): boolean;
    classed(classID: string, _: boolean): this;
    classed(): { [classID: string]: boolean };
    classed(_: { [classID: string]: boolean }): this;
}

Widget.prototype._idSeed = "_w";

Widget.prototype.publishProxy("fields", "_db", "fields");
Widget.prototype.publish("classed", {}, "object", "HTML Classes", null, { tags: ["Private"] });
const origClassed = Widget.prototype.classed;
Widget.prototype.classed = function (this: Widget, str_obj?: string | { [classID: string]: boolean }, _?: boolean) {
    if (typeof str_obj === "string") {
        if (arguments.length === 1) return origClassed.call(this)[str_obj];
        const classed = origClassed.call(this);
        origClassed.call(this, { ...classed, [str_obj]: _ });
        return this;
    }
    return origClassed.apply(this, arguments);
};
