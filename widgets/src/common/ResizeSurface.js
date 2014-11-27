(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Surface", "css!./ResizeSurface"], factory);
    } else {
        root.Graph = factory(root.Surface);
    }
}(this, function (Surface) {
    function ResizeSurface() {
        Surface.call(this);

        this.handleWidth = 8;
        this.handles = [{ loc: "NW" }, { loc: "N" }, { loc: "NE" }, { loc: "E" }, { loc: "SE" }, { loc: "S" }, { loc: "SW" }, { loc: "W" }];

        var context = this;
        this.dispatch = d3.dispatch("sizestart", "size", "sizeend");
        this.drag = d3.behavior.drag()
            .origin(function (d) { return d; })
            .on("dragstart", function (d) {
                d3.event.sourceEvent.stopPropagation();
                context._dragHandlePos = { x: d.x, y: d.y };
                context._dragStartPos = context.pos();
                context._dragStartSize = context.size();
                context.showContent(false);
                context.dispatch.sizestart();
            })
            .on("drag", function (d) {
                d3.event.sourceEvent.stopPropagation();
                var _dx = d3.event.x - context._dragHandlePos.x;
                var _dy = d3.event.y - context._dragHandlePos.y;
                var delta = { x: 0, y: 0, w: 0, h: 0 };
                switch (d.loc) {
                    case "NW":
                        delta.x = _dx / 2;
                        delta.w = -_dx;
                    case "N":
                        delta.y = _dy / 2;
                        delta.h = -_dy;
                        break;
                    case "NE":
                        delta.y = _dy / 2;
                        delta.h = -_dy;
                    case "E":
                        delta.x = _dx / 2;
                        delta.w = _dx;
                        break;
                    case "SE":
                        delta.x = _dx / 2;
                        delta.w = _dx;
                    case "S":
                        delta.y = _dy / 2;
                        delta.h = _dy;
                        break;
                    case "SW":
                        delta.y = _dy / 2;
                        delta.h = _dy;
                    case "W":
                        delta.x = _dx / 2;
                        delta.w = -_dx;
                        break;
                }
                context
                    .pos({ x: context._dragStartPos.x + delta.x, y: context._dragStartPos.y + delta.y }, false, false)
                    .size({ width: context._dragStartSize.width + delta.w, height: context._dragStartSize.height + delta.h })
                    .render()
                    .getBBox(true)
                ;
                context.dispatch.size();
            })
            .on("dragend", function (d) {
                d3.event.sourceEvent.stopPropagation();
                context
                    .showContent(true)
                    .render()
                ;
                context.dispatch.sizeend();
            })
        ;
    };
    ResizeSurface.prototype = Object.create(Surface.prototype);

    ResizeSurface.prototype.pos = function (_) {
        var retVal = Surface.prototype.pos.apply(this, arguments);
        if (arguments.length && this._parentElement) {
            this.updateHandles(this._domNode, this._element);
        }
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

        var l = this.pos().x + this._container.pos().x - this._container.width() / 2;
        var t = this.pos().y + this._titleRect.pos().y - this._titleRect.height() / 2;
        var r = this.pos().x + this._container.pos().x + this._container.width() / 2;
        var b = this.pos().y + this._container.pos().y + this._container.height() / 2;
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
