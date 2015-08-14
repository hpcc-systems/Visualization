/**
 * @file Resizable Surface
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Surface", "css!./ResizeSurface"], factory);
    } else {
        root.common_ResizeSurface = factory(root.d3, root.common_Surface);
    }
}(this, function (d3, Surface) {
    /**
     * @class common_ResizeSurface
     * @extends common_Surface
     */
    function ResizeSurface() {
        Surface.call(this);

        this.handleWidth = 8;
        this.handles = [{ loc: "NW" }, { loc: "N" }, { loc: "NE" }, { loc: "E" }, { loc: "SE" }, { loc: "S" }, { loc: "SW" }, { loc: "W" }];

        this._allowResize = true;

        var context = this;
        this.dispatch = d3.dispatch("sizestart", "size", "sizeend");
        this.drag = d3.behavior.drag()
            .origin(function (d) { return d; })
            .on("dragstart", function (d) {
                context.dispatch.sizestart(context, d.loc);
                if (context._allowResize) {
                    d3.event.sourceEvent.stopPropagation();
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
                if (context._allowResize) {
                    d3.event.sourceEvent.stopPropagation();
                    var _dx = d3.event.x - context._dragHandlePos.x;
                    var _dy = d3.event.y - context._dragHandlePos.y;
                    var delta = { x: 0, y: 0, w: 0, h: 0 };
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
                    var posSize = {
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
                        .pos({ x: posSize.x, y: posSize.y }, false, false)
                        .size({ width: posSize.width, height: posSize.height })
                        .render()
                        .getBBox(true)
                    ;
                    context.dispatch.size(context, d.loc);
                    context._prevPosSize = posSize;
                }
            })
            .on("dragend", function (d) {
                if (context._allowResize) {
                    d3.event.sourceEvent.stopPropagation();
                    context
                        .showContent(true)
                        .render()
                    ;
                    context._container.getBBox(true);
                    context._titleRect.getBBox(true);
                    context.dispatch.sizeend(context, d.loc);
                }
            })
        ;
    }
    ResizeSurface.prototype = Object.create(Surface.prototype);
    ResizeSurface.prototype.constructor = ResizeSurface;
    ResizeSurface.prototype._class += " common_ResizeSurface";

    ResizeSurface.prototype.allowResize = function (_) {
        if (!arguments.length) return this._allowResize;
        this._allowResize = _;
        return this;
    };

    ResizeSurface.prototype.move = function (_) {
        var retVal = Surface.prototype.move.apply(this, arguments);
        this.updateHandles(this._domNode, this._element);
        return retVal;
    };

    ResizeSurface.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);
        this.updateHandles(domNode, element);
    };

    ResizeSurface.prototype.updateHandles = function (domNode, element) {
        var sizeHandles = this._parentElement.selectAll("rect").data(this.handles, function (d) { return d.loc; });
        sizeHandles.enter().append("rect")
            .attr("class", function (d) { return "resize" + d.loc; })
            .call(this.drag)
        ;

        var l = this._pos.x + this._container._pos.x - this._container.width() / 2;
        var t = this._pos.y + this._titleRect._pos.y - this._titleRect.height() / 2;
        var r = this._pos.x + this._container._pos.x + this._container.width() / 2;
        var b = this._pos.y + this._container._pos.y + this._container.height() / 2;
        var w = r - l;
        var h = b - t;
        var context = this;
        sizeHandles
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
                d3.select(this)
                    .attr("x", d.x)
                    .attr("y", d.y)
                    .attr("width", d.width)
                    .attr("height", d.height)
                ;
            })
        ;
    };

    return ResizeSurface;
}));
