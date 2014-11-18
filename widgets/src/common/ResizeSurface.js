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
        this.handles = [{ loc: "N" }, { loc: "NE" }, { loc: "E" }, { loc: "SE" }, { loc: "S" }, { loc: "SW" }, { loc: "W" }, { loc: "NW" }];

        var context = this;
        this.drag = d3.behavior.drag()
            .origin(function (d) {return d; })
            .on("dragstart", function (d) {
                context._dragResize = d;
                context._dragStartPos = context.pos();
                context._dragStartSize = context.size();
            })
        ;
    };
    ResizeSurface.prototype = Object.create(Surface.prototype);

    ResizeSurface.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);

        this._content.loc = "CONTENT";
        this._content.element()
            .call(this.drag)
        ;
        var sizeHandles = element.selectAll("rect").data(this.handles, function (d) { return d.loc; })
        ;
        sizeHandles.enter().append("rect")
            .attr("class", function (d) { return "resize" + d.loc; })
            .call(this.drag)
        ;
        var l = this._container.pos().x - this._container.width() / 2;
        var t = this._titleRect.pos().y - this._titleRect.height() / 2;
        var r = this._container.pos().x + this._container.width() / 2;
        var b = this._container.pos().y + this._container.height() / 2;
        var w = r - l;
        var h = b - t;
        var context = this;
        sizeHandles
            .each(function (d) {
                switch (d.loc) {
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
                    case "NW":
                        d.x = l - context.handleWidth / 2;
                        d.y = t - context.handleWidth / 2;
                        d.width = context.handleWidth;
                        d.height = context.handleWidth;
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
