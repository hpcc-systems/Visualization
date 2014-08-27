(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./D3Widget", "./Icon", "./Shape", "./Text", "./FAChar", "css!./Surface"], factory);
    } else {
        root.Graph = factory(root.D3Widget, root.Icon, root.Shape, root.Text, root.FAChar);
    }
}(this, function (D3Widget, Icon, Shape, Text, FAChar) {
    function Surface() {
        D3Widget.call(this);

        this._class = "surface";
        this._icon = new Icon();
        this._container = new Shape()
            .shape("rect")
        ;
        this._titleRect = new Shape()
            .class("title")
            .shape("rect")
        ;
        this._text = new Text()
            .class("title")
        ;
        this._menu = new FAChar()
            .class("more")
            .char("\uf0c9")
        ;
        this._faChar = "\uf07b";
        this._title = "";

        this._content = null;
    };
    Surface.prototype = Object.create(D3Widget.prototype);

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
        this._menu
            .target(domNode)
            .render()
        ;
        this._text
            .target(domNode)
            .render()
        ;
        this._container
            .target(domNode)
            .render()
        ;
        if (this._content) {
            var g = element.append("g")
                .attr("clip-path", "url(#" + this.id() + "_clip)")
                .node()
            ;
            this._content
                .target(g)
                .render()
            ;
        }
    };

    Surface.prototype.update = function (domNode, element) {
        var iconClientSize = this._icon.getBBox();
        var menuClientSize = this._menu.getBBox();
        var xOffset = iconClientSize.width / 7;
        var yOffset = iconClientSize.height * 4 / 5;
        var yOffset2 = iconClientSize.height * 1 / 5;
        this._titleRect
            .pos({ x: xOffset / 2, y: -(this._size.height / 2) + iconClientSize.height / 2 })
            .size({ width: this._size.width - xOffset, height: menuClientSize.height })
            .render()
        ;
        this._icon
            .pos({ x: -(this._size.width / 2) + iconClientSize.width / 2, y: -(this._size.height / 2) + iconClientSize.height / 2 })
        ;
        this._menu
            .pos({ x: (this._size.width / 2) - menuClientSize.width / 2 - 2, y: -(this._size.height / 2) + iconClientSize.height / 2})
        ;
        this._text
            .pos({ x: (iconClientSize.width / 2 - menuClientSize.width / 2) / 2, y: -(this._size.height / 2) + iconClientSize.height / 2 - 1 })
            .text(this._title)
            .render()
        ;
        this._container
            .pos({ x: xOffset / 2, y: yOffset / 2 })
            .size({ width: this._size.width - xOffset, height: this._size.height - yOffset })
            .render()
        ;
        if (this._content) {
            this._clipRect
                .attr("x", - this._size.width / 2 + xOffset)
                .attr("y", -this._size.height / 2 + yOffset)
                .attr("width", this._size.width - xOffset)
                .attr("height", this._size.height - yOffset)
            ;
            this._content
                .pos({ x: xOffset / 2, y: yOffset / 2 })
                .render()
            ;
        }
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
