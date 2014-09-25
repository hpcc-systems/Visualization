(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Icon", "./Shape", "./Text", "./FAChar", "./Menu", "css!./Surface"], factory);
    } else {
        root.Graph = factory(root.SVGWidget, root.Icon, root.Shape, root.Text, root.FAChar, root.Menu);
    }
}(this, function (SVGWidget, Icon, Shape, Text, FAChar, Menu) {
    function Surface() {
        SVGWidget.call(this);

        this._class = "surface";
        this._icon = new Icon();
        this._container = new Shape()
            .class("container")
            .shape("rect")
        ;
        this._titleRect = new Shape()
            .class("title")
            .shape("rect")
        ;
        this._text = new Text()
            .class("title")
        ;
        this._menu = new Menu()
            .faChar("\uf0c9")
        ;

        this._faChar = "\uf07b";
        this._title = "";

        this._content = null;
    };
    Surface.prototype = Object.create(SVGWidget.prototype);

    Surface.prototype.faChar = function (_) {
        if (!arguments.length) return this._faChar;
        this._faChar = _;
        return this;
    };

    Surface.prototype.title = function (_) {
        if (!arguments.length) return this._title;
        this._title = _;
        return this;
    };

    Surface.prototype.content = function (_) {
        if (!arguments.length) return this._content;
        this._content = _;
        switch (this._content.class()) {
            case "bar":
                this.faChar("\uf080")
                break;
            case "bubble":
                this.faChar("\uf192")
                break;
            case "pie":
                this.faChar("\uf200")
                break;
            case "table":
                this.faChar("\uf0ce")
                break;
        }

        return this;
    };

    Surface.prototype.enter = function (domNode, element) {
        this._clipRect = element.append("defs").append("clipPath")
            .attr("id", this.id() + "_clip")
            .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", this._size.width)
                .attr("height", this._size.height)
        ;
        this._titleRect
            .target(domNode)
            .render()
        ;
        this._icon
            .faChar(this._faChar)
            .shape("circle")
            .target(domNode)
            .render()
        ;
        var menuViz = false;
        this._text
            .target(domNode)
            .render()
        ;
        this._container
            .target(domNode)
            .render()
        ;
        this._menu
            .target(domNode)
            .render()
        ;
    };

    Surface.prototype.update = function (domNode, element) {
        var textClientSize = this._text.getBBox(true);
        var iconClientSize = this._icon.getBBox(true);
        var menuClientSize = this._menu.getBBox(true);
        var titleHeight = Math.max(textClientSize.height, menuClientSize.height);
        var xOffset = iconClientSize.width / 7;
        var yOffset = iconClientSize.height * 4 / 5;
        this._titleRect
            .pos({ x: xOffset / 2, y: -(this._size.height / 2) + iconClientSize.height / 2 })
            .size({ width: this._size.width - xOffset, height: titleHeight })
            .render()
        ;
        this._icon
            .pos({ x: -(this._size.width / 2) + iconClientSize.width / 2, y: -(this._size.height / 2) + iconClientSize.height / 2 })
        ;
        this._menu
            .pos({ x: (this._size.width / 2) - menuClientSize.width / 2 - 2, y: -(this._size.height / 2) + iconClientSize.height / 2 })
        ;
        this._text
            .pos({ x: (iconClientSize.width / 2 - menuClientSize.width / 2) / 2, y: -(this._size.height / 2) + iconClientSize.height / 2 })
            .text(this._title)
            .render()
        ;
        this._container
            .pos({ x: xOffset / 2, y: yOffset / 2 })
            .size({ width: this._size.width - xOffset, height: this._size.height - yOffset })
            .render()
        ;

        var context = this;
        var content = element.selectAll(".content").data(this._content ? [this._content] : [], function (d) { return d._id; });
        content.enter().append("g")
            .attr("class", "content")
            .attr("clip-path", "url(#" + this.id() + "_clip)")
            .each(function (d) {
                var padding = {
                    left: 4,
                    top: 4,
                    right: 4,
                    bottom: 4
                };
                var containerSize = context._container.getBBox();
                d
                    .target(this)
                    .size({
                        width: containerSize.width - (padding.left + padding.right),
                        height: containerSize.height - (padding.top + padding.bottom)
                    })
                ;
            })
        ;
        if (this._content) {
            this._clipRect
                .attr("x", -this._size.width / 2 + xOffset)
                .attr("y", -this._size.height / 2 + yOffset)
                .attr("width", this._size.width - xOffset)
                .attr("height", this._size.height - yOffset)
            ;
        }
        content
            .each(function (d) {
                d
                    .pos({ x: xOffset / 2, y: yOffset / 2 })
                    .render()
                ;
            })
        ;

        content.exit().transition()
            .each(function (d) { d.target(null); })
            .remove()
        ;

        this._menu.element().node().parentNode.appendChild(this._menu.element().node());
    };

    Surface.prototype.intersection = function (pointA, pointB) {
        var hits = [];
        var i1 = this._icon.intersection(pointA, pointB, this._pos);
        if (i1) {
            hits.push({i: i1, d: this.distance(i1, pointB)});
        }
        var i2 = this._titleRect.intersection(pointA, pointB);
        if (i2) {
            hits.push({i: i2, d: this.distance(i2, pointB)});
        }
        var i3 = this._container.intersection(pointA, pointB);
        if (i3) {
            hits.push({i: i3, d: this.distance(i3, pointB)});
        }
        var nearest = null;
        hits.forEach(function (item) {
            if (nearest === null || nearest.d > item.d) {
                nearest = item;
            }
        });
        return nearest && nearest.i ? nearest.i : null;
    };

    return Surface;
}));
