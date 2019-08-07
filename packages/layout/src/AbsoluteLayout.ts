import { HTMLWidget } from "@hpcc-js/common";
import { event as d3Event } from "d3-selection";
import { IAbsoluteRect } from "./AbsolutePlaceholder";

export class AbsoluteLayout extends HTMLWidget {
    _wrapper;
    _dragIdx;
    _handles = [];
    _hoverRects;
    _hoverHandleRects;
    _canvas;
    _ctx;
    _parentRect;
    _startX;
    _startY;
    _currX;
    _currY;
    _endX;
    _endY;
    _startLayout;
    _rowSelection;
    _dragElement;
    // _colors = {n: "rgba(255,0,0,0.5)", e: "rgba(0,255,0,0.5)", s: "rgba(150,0,150,0.5)", w: "rgba(150,150,0,0.5)"};
    _colors = {n: "rgba(0,0,0,0.5)", e: "rgba(0,0,0,0.5)", s: "rgba(0,0,0,0.5)", w: "rgba(0,0,0,0.5)"};
    _paperSizes = {
        A0:	[2384, 3370],
        A1:	[1684, 2384],
        A2:	[1191, 1684],
        A3:	[842, 1191],
        A4:	[595, 842],
        A5:	[420, 595],
        A6:	[298, 420],
        A7:	[210, 298],
        A8:	[147, 210],
        A9:	[105, 147],
        A10: [74, 105]
    };
    _draggingWidget;
    _dragStartRect;
    _dropTarget;
    constructor() {
        super();
    }
    enter(domNode, element) {
        const [ width, height ] = this._paperSizes[this.paperSize()];
        this.resize({
            height,
            width
        });
        super.enter(domNode, element);

        const context = this;

        this._canvas = element.append("canvas")
            .style("position", "absolute")
            .attr("width", width)
            .attr("height", height)
            .style("z-index", this.designMode() ? 10000 : null)
            .on("mousemove", function() {
                context._currX = (d3Event as MouseEvent).clientX;
                context._currY = (d3Event as MouseEvent).clientY;
                const xDiff = context._currX - context._startX;
                const yDiff = context._currY - context._startY;
                if (context._draggingWidget) {
                    context._draggingWidget.applyDrag(xDiff, yDiff);
                    context._draggingWidget.snapSize(context.snapSize());
                }
                context.clearCanvas();
                context.drawAllHandles();
                const overlappedWidgets = context.getOverlappedWidgets(d3Event)
                    .filter(w => {
                        return w !== context._draggingWidget;
                    })
                    ;
                if (overlappedWidgets.length > 0) {
                    const w = overlappedWidgets[0];
                    const x = (d3Event as MouseEvent).clientX - context._parentRect.left - w._rect.left;
                    const y = (d3Event as MouseEvent).clientY - context._parentRect.top - w._rect.top;
                    const overlappedHandles = w.calcHoveredHandles(x, y);
                    w.drawHandles(overlappedHandles, w._rect.left, w._rect.top);
                    const cursorStyle = w.cursorStyle(overlappedHandles);
                    context.element().style("cursor", cursorStyle);
                } else {
                    context.element().style("cursor", "default");
                }
            })
            .on("mousedown", function() {
                context._startX = (d3Event as MouseEvent).clientX;
                context._startY = (d3Event as MouseEvent).clientY;
                const widgets = context.getOverlappedWidgets(d3Event);
                for (const i in widgets) {
                    const w = widgets[i];
                    const x = context._startX - context._parentRect.left - w._rect.left;
                    const y = context._startY - context._parentRect.top - w._rect.top;
                    const overlappedHandles = w.calcHoveredHandles(x, y);
                    if (overlappedHandles.length > 0) {
                        w._startLayout = w._rect;
                        context._draggingWidget = w;
                        w._startHandles = overlappedHandles;
                        break;
                    }
                }
            })
            .on("mouseup", function() {
                context._endX = (d3Event as MouseEvent).clientX;
                context._endY = (d3Event as MouseEvent).clientY;
                context._dropTarget = context.getDropTarget(d3Event);
                console.log("context._dropTarget", context._dropTarget);
                if (context._dropTarget) {
                    context.applyDropAction(context._draggingWidget, context._dropTarget);
                }
                const [ width, height ] = context._paperSizes[context.paperSize()];
                context.widgets().forEach(w => {
                    w.layout(w.pixelLayoutToPercentage(w._rect, width, height));
                });
                context._draggingWidget = undefined;
                context._dropTarget = undefined;
            })
            ;
        this._ctx = this._canvas.node().getContext("2d");
        this._wrapper = element.append("div")
            .style("position", "relative")
            .style("top", "0px")
            .style("left", "0px")
            .style("width", `${width}px`)
            .style("height", `${height}px`)
            ;

    }
    update(domNode, element) {
        super.update(domNode, element);

        const [ width, height ] = this._paperSizes[this.paperSize()];
        this._canvas
            .attr("width", width)
            .attr("height", height)
            ;
        const sz = this.snapSize();
        this._canvas
            .style("background-image", this.designMode() ? `radial-gradient(rgba(0,0,0,0.4) ${(1 / sz) * 100}%, transparent ${(1 / sz) * 100}%)` : null)
            .style("background-color", "transparent")
            .style("background-position", `${sz / 2}px ${sz / 2}px`)
            .style("background-size", `${sz}px ${sz}px`)
            .style("z-index", this.designMode() ? "10000" : null)
            ;
        this._ctx = this._canvas.node().getContext("2d");

        const context = this;

        this._wrapper
            .style("top", "0px")
            .style("left", "0px")
            .style("width", `${width}px`)
            .style("height", `${height}px`)
            .style("box-shadow", "inset 0px 0px 1px black")
            ;

        const rowSelection = this._wrapper.selectAll(".row").data(this.widgets(), (n, i) => i);
        rowSelection.enter()
            .append("div")
            .attr("class", "row")
            .style("position", "absolute")
            .style("overflow", "hidden")
            .merge(rowSelection)
            .style("box-shadow", "inset 0px 0px 1px black")
            .each(function(d, i) {
                const _widget = context.widgets()[i];
                if (typeof _widget.applyLayout === "function") {
                    _widget.applyLayout(this, width, height);
                }
                if (!_widget.target())_widget.target(this);
                _widget._parentWidget = context;
            })
            ;
        this._parentRect = domNode.getBoundingClientRect();

        if (this.designMode()) {
            this.drawAllHandles();
        }
    }
    getPaperSize() {
        return this._paperSizes[this.paperSize()];
    }
    applyDropAction(widget, target) {
        console.log("applyDropAction");
        console.log("widget", widget);
        console.log("target", target);
        // TODO - add tabbing/stacking logic here
    }
    getDropTarget(ev) {
        const dropWidgets = this.getOverlappedWidgets(d3Event)
            .filter(w => {
                return w !== this._draggingWidget;
            })
            ;
        if (dropWidgets.length > 0) {
            const widgets = this.getOverlappedWidgets(d3Event);
            for (const i in widgets) {
                const w = widgets[i];
                const x = (d3Event as MouseEvent).clientX - this._parentRect.left - w._rect.left;
                const y = (d3Event as MouseEvent).clientY - this._parentRect.top - w._rect.top;
                const overlappedHandles = w.calcHoveredHandles(x, y);
                if (overlappedHandles.indexOf("move") !== -1) {
                    return w;
                }
            }
        }
        return undefined;
    }
    getOverlappedWidgets(ev) {
        return this.widgets()
            .filter(w => {
                const rect = w._rect;
                const x = ev.clientX - this._parentRect.left;
                const y = ev.clientY - this._parentRect.top;
                const inX = rect.left < x && rect.left + rect.width > x;
                const inY = rect.top < y && rect.top + rect.height > y;
                return inX && inY;
            })
            ;
    }
    clearCanvas() {
        const [w, h] = this._paperSizes[this.paperSize()];
        this._ctx.clearRect(0, 0, w, h);
    }
    drawAllHandles() {
        return this.widgets().forEach(w => {
            const xo = w._rect.left;
            const yo = w._rect.top;
            w.drawHandles(Object.keys(w._dragHandles), xo, yo);
        })
        ;
    }
}

AbsoluteLayout.prototype._class += " layout_AbsoluteLayout";

export interface AbsoluteLayout {
    layoutWidth(): number;
    layoutWidth(_: number): this;
    layoutHeight(): number;
    layoutHeight(_: number): this;
    handleSize(): number;
    handleSize(_: number): this;
    widgets(): any;
    widgets(_: any): this;
    layout(): IAbsoluteRect[];
    layout(_: IAbsoluteRect[]): this;
    _layout: IAbsoluteRect[];
    snapSize(): number;
    snapSize(_: number): this;
    paperSize(): string;
    paperSize(_: string): this;
    backgroundColor(): string;
    backgroundColor(_: string): this;
    padding(): number;
    padding(_: number): this;
    borderColor(): string;
    borderColor(_: string): this;
    margin(): number;
    margin(_: number): this;
    designMode(): boolean;
    designMode(_: boolean): this;

}

AbsoluteLayout.prototype.publish("designMode", false, "boolean", "If true, placeholders can be moved and resized");
AbsoluteLayout.prototype.publish("padding", 8, "number", "Padding for the layout (pixels)");
AbsoluteLayout.prototype.publish("margin", 8, "number", "Margin for the layout (pixels)");
AbsoluteLayout.prototype.publish("borderColor", "rgba(0,0,0,0.3)", "string", "Color of the layout border");
AbsoluteLayout.prototype.publish("backgroundColor", "#FFF", "string", "Background color of the layout");
AbsoluteLayout.prototype.publish("paperSize", "A4", "set", "Preset Page Size Category", ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"]);
AbsoluteLayout.prototype.publish("layoutWidth", 300, "number", "Width of the containing element (pixels)");
AbsoluteLayout.prototype.publish("layoutHeight", 195, "number", "Height of the containing element (pixels)");
AbsoluteLayout.prototype.publish("handleSize", 5, "number", "Pixel width (or height) of resize handles");
AbsoluteLayout.prototype.publish("snapSize", 15, "number", "Padding between widgets and edges (pixels)");
AbsoluteLayout.prototype.publish("widgets", [], "widgetArray", "Widgets in the layout");
AbsoluteLayout.prototype.publish("layout", [], "array", "Layout of the widgets");
