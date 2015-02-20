"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Icon", "./Shape", "./Text", "./FAChar", "./Menu", "css!./Surface"], factory);
    } else {
        root.Graph = factory(root.SVGWidget, root.Icon, root.Shape, root.Text, root.FAChar, root.Menu);
    }
}(this, function (SVGWidget, Icon, Shape, Text, FAChar, Menu) {
    function Surface() {
        SVGWidget.call(this);
        this._class = "common_Surface";

        this._menuPadding = 2;
        this._icon = new Icon()
            .padding_percent(50)
        ;
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
            .padding_percent(0)
        ;
        var context = this;
        this._menu.preShowMenu = function () {
            if (context._content && context._content.hasOverlay()) {
                context._content.visible(false);
            }
        }
        this._menu.postHideMenu = function () {
            if (context._content && context._content.hasOverlay()) {
                context._content.visible(true);
            }
        }

        this._showContent = true;
        this._content = null;
    };
    Surface.prototype = Object.create(SVGWidget.prototype);

    Surface.prototype.publish("show_title", true, "boolean", "Show Title");
    Surface.prototype.publish("faChar", "\uf07b", "string", "Title");
    Surface.prototype.publishProxy("icon_shape", "_icon", "shape");
    Surface.prototype.publish("title", "", "string", "Title");
    Surface.prototype.publish("menu");

    Surface.prototype.menu = function (_) {
        if (!arguments.length) return this._menu.data();
        this._menu.data(_);
        return this;
    };

    Surface.prototype.showContent = function (_) {
        if (!arguments.length) return this._showContent;
        this._showContent = _;
        if (this._content) {
            this._content.visible(this._showContent);
        }
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

    Surface.prototype.testData = function () {
        this.title("Hello and welcome!");
        this.menu(["aaa", "bbb", "ccc"]);
        return this;
    }

    Surface.prototype.enter = function (_domNode, _element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        var element = _element.append("g").attr("class", "frame");
        var domNode = element.node();
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
            .target(domNode)
        ;
        var menuViz = false;
        this._menu
            .target(_domNode)
        ;
        this._text
            .target(domNode)
        ;
        this._container
            .target(domNode)
        ;
    };

    Surface.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);

        this._icon
            .faChar(this._faChar)
            .shape(this.icon_shape())
            .display(this._show_title)
            .render()
        ;
        this._menu
            .render()
        ;
        this._text
            .text(this._title)
            .display(this._show_title)
            .render()
        ;
        var iconClientSize = this._icon.getBBox(true);
        var textClientSize = this._text.getBBox(true);
        var menuClientSize = this._menu.getBBox(true);
        var titleRegionHeight = Math.max(iconClientSize.height, textClientSize.height, menuClientSize.height);
        var yTitle = (-this._size.height + titleRegionHeight) / 2;

        var titleTextHeight = Math.max(textClientSize.height, menuClientSize.height);

        var topMargin = titleRegionHeight <= titleTextHeight ? 0 : (titleRegionHeight - titleTextHeight) / 2;
        var leftMargin = topMargin;

        this._titleRect
            .pos({ x: leftMargin, y: yTitle })
            .width(this._size.width - leftMargin * 2)
            .height(titleTextHeight)
            .display(this._show_title)
            .render()
        ;
        this._icon
            .move({ x: -this._size.width / 2 + iconClientSize.width / 2, y: yTitle })
        ;
        this._menu
            .move({ x: this._size.width / 2 - menuClientSize.width / 2 - this._menuPadding, y: yTitle })
        ;
        this._text
            .move({ x: (iconClientSize.width / 2 - menuClientSize.width / 2) / 2, y: yTitle })
        ;
        if (this._show_title) {
            this._container
                .pos({ x: leftMargin / 2, y: titleRegionHeight / 2 - topMargin / 2 })
                .width(this._size.width - leftMargin)
                .height(this._size.height - titleRegionHeight + topMargin)
                .render()
            ;
        } else {
            this._container
                .pos({ x: 0, y: 0 })
                .width(this._size.width)
                .height(this._size.height)
                .render()
            ;
        }

        if (this._showContent) {
            var xOffset = leftMargin;
            var yOffset = titleRegionHeight - topMargin;
            var context = this;
            var content = element.selectAll(".content").data(this._content ? [this._content] : [], function (d) { return d._id; });
            content.enter().append("g")
                .attr("class", "content")
                .attr("clip-path", "url(#" + this.id() + "_clip)")
                .each(function (d) {
                    d.target(this);
                })
            ;
            content
                .each(function (d) {
                    var padding = {
                        left: 4,
                        top: 4,
                        right: 4,
                        bottom: 4
                    };
                    d
                        .size({
                            width: context._size.width - xOffset - (padding.left + padding.right),
                            height: context._size.height - yOffset - (padding.top + padding.bottom)
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
        }

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
