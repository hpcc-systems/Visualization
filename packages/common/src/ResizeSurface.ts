import { dispatch as d3Dispatch } from "d3-dispatch";
import { drag as d3Drag } from "d3-drag";
import { event as d3Event, select as d3Select } from "d3-selection";
import { Surface } from "./Surface";

import "../src/ResizeSurface.css";

export class ResizeSurface extends Surface {

    protected handleWidth;
    protected handles;
    protected dispatch;
    protected drag;
    protected _domNode;
    protected _dragHandlePos;
    protected _dragStartPos;
    protected _dragStartSize;
    protected _prevPosSize;
    protected _textPosSize;
    protected _iconPosSize;

    constructor() {
        super();

        this.handleWidth = 8;
        this.handles = [{ loc: "NW" }, { loc: "N" }, { loc: "NE" }, { loc: "E" }, { loc: "SE" }, { loc: "S" }, { loc: "SW" }, { loc: "W" }];

        const context = this;
        this.dispatch = d3Dispatch("sizestart", "size", "sizeend");
        this.drag = d3Drag()
            .subject(function (d) { return d; })
            ;
        this.drag
            .on("start", function (d) {
                context.dispatch.call("sizestart", context, d.loc);
                if (context.allowResize()) {
                    d3Event.sourceEvent.stopPropagation();
                    context._dragHandlePos = { x: d.x, y: d.y };
                    context._dragStartPos = context.pos();
                    context._dragStartSize = context.size();
                    context._prevPosSize = {
                        x: context._dragStartPos.x,
                        y: context._dragStartPos.y,
                        width: context._dragStartSize.width,
                        height: context._dragStartSize.height
                    };
                    context._textPosSize = context._text.getBBox(true);
                    context._iconPosSize = context._icon.getBBox(true);
                    context.showContent(false);
                }
            })
            .on("drag", function (d) {
                if (context.allowResize()) {
                    d3Event.sourceEvent.stopPropagation();
                    const _dx = d3Event.x - context._dragHandlePos.x;
                    const _dy = d3Event.y - context._dragHandlePos.y;
                    const delta = { x: 0, y: 0, w: 0, h: 0 };
                    switch (d.loc) {
                        case "NW":
                            delta.x = _dx / 2;
                            delta.w = -_dx;
                        /* falls through */
                        case "N":
                            delta.y = _dy / 2;
                            delta.h = -_dy;
                            break;
                        case "NE":
                            delta.y = _dy / 2;
                            delta.h = -_dy;
                        /* falls through */
                        case "E":
                            delta.x = _dx / 2;
                            delta.w = _dx;
                            break;
                        case "SE":
                            delta.x = _dx / 2;
                            delta.w = _dx;
                        /* falls through */
                        case "S":
                            delta.y = _dy / 2;
                            delta.h = _dy;
                            break;
                        case "SW":
                            delta.y = _dy / 2;
                            delta.h = _dy;
                        /* falls through */
                        case "W":
                            delta.x = _dx / 2;
                            delta.w = -_dx;
                            break;
                    }
                    const posSize = {
                        x: context._dragStartPos.x + delta.x,
                        y: context._dragStartPos.y + delta.y,
                        width: context._dragStartSize.width + delta.w,
                        height: context._dragStartSize.height + delta.h
                    };
                    if (posSize.width < context._iconPosSize.width * 2 + context._textPosSize.width) {
                        posSize.x = context._prevPosSize.x;
                        posSize.width = context._prevPosSize.width;
                    }
                    if (posSize.height < context._textPosSize.height + 48) {
                        posSize.y = context._prevPosSize.y;
                        posSize.height = context._prevPosSize.height;
                    }
                    context
                        .pos({ x: posSize.x, y: posSize.y })
                        .size({ width: posSize.width, height: posSize.height })
                        .render()
                        .getBBox(true)
                        ;
                    context.dispatch.call("size", context, d.loc);
                    context._prevPosSize = posSize;
                }
            })
            .on("end", function (d) {
                if (context.allowResize()) {
                    d3Event.sourceEvent.stopPropagation();
                    context
                        .showContent(true)
                        .render()
                        ;
                    context._container.getBBox(true);
                    context._titleRect.getBBox(true);
                    context.dispatch.call("sizeend", context, d.loc);
                }
            })
            ;
    }

    move(_) {
        const retVal = super.move.apply(this, arguments);
        this.updateHandles(this._domNode, this._element);
        return retVal;
    }

    update(domNode, element) {
        super.update(domNode, element);
        this.updateHandles(domNode, element);
    }

    updateHandles(_domNode, _element) {
        const sizeHandles = this._parentElement.selectAll("rect").data(this.handles, function (d) { return d.loc; });
        const sizeHandlesEnter = sizeHandles.enter().append("rect")
            .attr("class", function (d) { return "resize" + d.loc; })
            .call(this.drag)
            ;

        const l = this._pos.x + this._container._pos.x - this._container.width() / 2;
        const t = this._pos.y + this._titleRect._pos.y - this._titleRect.height() / 2;
        const r = this._pos.x + this._container._pos.x + this._container.width() / 2;
        const b = this._pos.y + this._container._pos.y + this._container.height() / 2;
        const w = r - l;
        const h = b - t;
        const context = this;
        sizeHandlesEnter.merge(sizeHandles)
            .each(function (d) {
                switch (d.loc) {
                    case "NW":
                        d.x = l - context.handleWidth / 2;
                        d.y = t - context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "N":
                        d.x = l + context.handleWidth / 2;
                        d.y = t - context.handleWidth / 2;
                        d.width = w - context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "NE":
                        d.x = r - context.handleWidth / 2;
                        d.y = t - context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "E":
                        d.x = r - context.handleWidth / 2;
                        d.y = t + context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = h - context.handleWidth;
                        break;
                    case "SE":
                        d.x = r - context.handleWidth / 2;
                        d.y = b - context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "S":
                        d.x = l + context.handleWidth / 2;
                        d.y = b - context.handleWidth / 2;
                        d.width = w - context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "SW":
                        d.x = l - context.handleWidth / 2;
                        d.y = b - context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = context.handleWidth;
                        break;
                    case "W":
                        d.x = l - context.handleWidth / 2;
                        d.y = t + context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = h - context.handleWidth;
                        break;
                }
                d3Select(this)
                    .attr("x", d.x)
                    .attr("y", d.y)
                    .attr("width", d.width)
                    .attr("height", d.height)
                    ;
            })
            ;
    }
    allowResize: { (): boolean; (_: boolean): ResizeSurface; };
}
ResizeSurface.prototype._class += " common_ResizeSurface";

ResizeSurface.prototype.publish("allowResize", true, "boolean", "Sets if surface can be resized", null, { tags: ["Private", "Shared"] });
