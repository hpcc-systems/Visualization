"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./SVGWidget", "./Icon", "./Shape", "./Text", "./FAChar", "./Menu", "css!./Surface"], factory);
    } else {
        root.common_Surface = factory(root.d3, root.common_SVGWidget, root.common_Icon, root.common_Shape, root.common_Text, root.common_FAChar, root.common_Menu);
    }
}(this, function (d3, SVGWidget, Icon, Shape, Text, FAChar, Menu) {
    function Surface() {
        SVGWidget.call(this);

        this._menuPadding = 2;
        this._icon = new Icon()
            .faChar("\uf07b")
            .paddingPercent(50)
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
            .paddingPercent(0)
        ;
        var context = this;
        this._menu.preShowMenu = function () {
            if (context._content && context._content.hasOverlay()) {
                context._content.visible(false);
            }
        };
        this._menu.postHideMenu = function () {
            if (context._content && context._content.hasOverlay()) {
                context._content.visible(true);
            }
        };

        this._showContent = true;
        this._content = null;
        this._surfaceButtons = [];
    }
    Surface.prototype = Object.create(SVGWidget.prototype);
    Surface.prototype._class += " common_Surface";

    Surface.prototype.publish("showTitle", true, "boolean", "Show Title",null,{tags:["Basic"]});
    Surface.prototype.publish("title", "", "string", "Title",null,{tags:["Basic"]});
    Surface.prototype.publishProxy("titleFontSize", "_text", "fontSize");
    Surface.prototype.publish("showIcon", true, "boolean", "Show Title",null,{tags:["Advance"]});
    Surface.prototype.publishProxy("icon_faChar", "_icon", "faChar");
    Surface.prototype.publishProxy("icon_shape", "_icon", "shape");
    //Surface.prototype.publish("menu");
    Surface.prototype.publish("content", null, "widget", "Content",null,{tags:["Private"]});

    Surface.prototype.publish("buttonAnnotations", [], "array", "Button Array",null,{tags:["Intermediate"]});
    Surface.prototype.publish("buttonGutter", 25, "number", "Space Between Menu and Buttons",null,{tags:["Intermediate"]});

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
        return this;
    };

    Surface.prototype.testData = function () {
        this.title("Hello and welcome!");
        this.menu(["aaa", "bbb", "ccc"]);
        this.buttonAnnotations([{id:"button_1",label:"\uf010",shape:"square",diameter:14,padding:"0px 5px",font:"FontAwesome"}, {id:"button_2",label:"\uf00e",shape:"square",diameter:14,padding:"0px 5px",font:"FontAwesome"}]);

        return this;
    };

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
            .display(this.showTitle() && this.showIcon())
        ;
        this._icon
            .target(domNode)
            .render()
        ;
        this._menu
            .target(_domNode)
        ;
        this._text
            .target(domNode)
        ;
        this._container
            .target(domNode)
        ;
        this.buttonContainer = d3.select(this._target).append("div").attr("class", "svg-button-container");
    };

    Surface.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var context = this;

        var width = this.width() - 1;
        var height = this.height() - 1;

        this._icon
            .display(this.showTitle() && this.showIcon())
            .shape(this.icon_shape())
            .render()
        ;
        this._menu
            .render()
        ;
        this._text
            .text(this.title())
            .display(this.showTitle())
            .render()
        ;

        var surfaceButtons = this.buttonContainer.selectAll(".surface-button").data(this.buttonAnnotations());
        surfaceButtons.enter().append("button").attr("class","surface-button")
            .each(function (button, idx) {
                var el = context._surfaceButtons[idx] = d3.select(this)
                    .attr("class", "surface-button " + (button.class ? button.class : ''))
                    .attr("id", button.id)
                    .style('padding', button.padding)
                    .style('width', button.width)
                    .style('height', button.height)
                    .style("cursor","pointer");
                if (button.font === "FontAwesome") {
                    el
                      .append('i')
                      .attr("class","fa")
                      .text(function(d) { return button.label; })
                      .on("click", function(d) { context.click(d); });
                } else {
                    el
                      .text(function(d) { return button.label; })
                      .on("click", function(d) { context.click(d); });
                }
            })
        ;
        surfaceButtons.exit()
            .each(function (d, idx) {
                var element = d3.select(this);
                delete context._surfaceButtons[idx];
                element.remove();
            })
        ;

        var buttonClientHeight = this.showTitle() ? Math.max.apply(null,this._surfaceButtons.map(function(d) { return d.node().offsetHeight; })) : 0;
        var iconClientSize = this.showIcon() ? this._icon.getBBox(true) : {width:0, height: 0};
        var textClientSize = this._text.getBBox(true);
        var menuClientSize = this._menu.getBBox(true);
        var titleRegionHeight = Math.max(iconClientSize.height, textClientSize.height, menuClientSize.height, buttonClientHeight);
        var yTitle = (-height + titleRegionHeight) / 2;

        var titleTextHeight = Math.max(textClientSize.height, menuClientSize.height, buttonClientHeight);

        var topMargin = titleRegionHeight <= titleTextHeight ? 0 : (titleRegionHeight - titleTextHeight) / 2;
        var leftMargin = topMargin;

        this._titleRect
            .pos({ x: leftMargin, y: yTitle })
            .width(width - leftMargin * 2)
            .height(titleTextHeight)
            .display(this.showTitle())
            .render()
        ;
        this._icon
            .move({ x: -width / 2 + iconClientSize.width / 2, y: yTitle })
        ;
        this._menu
            .move({ x: width / 2 - menuClientSize.width / 2 - this._menuPadding, y: yTitle })
        ;
        this._text
            .move({ x: (iconClientSize.width / 2 - menuClientSize.width / 2) / 2, y: yTitle })
        ;

        var xPos = context._titleRect.node().getBoundingClientRect().left + (context._size.width - leftMargin * 2) - context.buttonGutter() - this.buttonContainer.node().offsetWidth + 'px';
        var yPos = context._titleRect.node().getBoundingClientRect().top + ((titleTextHeight - this.buttonContainer.node().offsetHeight) / 2) + 'px';
        this.buttonContainer.style('top', yPos);
        this.buttonContainer.style('left', xPos);

        if (this.showTitle()) {
            this._container
                .pos({ x: leftMargin / 2, y: titleRegionHeight / 2 - topMargin / 2 })
                .width(width - leftMargin)
                .height(height - titleRegionHeight + topMargin)
                .render()
            ;
        } else {
            this._container
                .pos({ x: 0, y: 0 })
                .width(width)
                .height(height)
                .render()
            ;
        }

        if (this._showContent) {
            var xOffset = leftMargin;
            var yOffset = titleRegionHeight - topMargin;

            var content = element.selectAll(".content").data(this.content() ? [this.content()] : [], function (d) { return d._id; });
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
                        .pos({ x: xOffset / 2, y: yOffset / 2 })
                        .size({
                            width: width - xOffset - (padding.left + padding.right),
                            height: height - yOffset - (padding.top + padding.bottom)
                        })
                    ;
                })
            ;
            if (this.content()) {
                this._clipRect
                    .attr("x", -width / 2 + xOffset)
                    .attr("y", -height / 2 + yOffset)
                    .attr("width", width - xOffset)
                    .attr("height", height - yOffset)
                ;
            }
            content.exit().transition()
                .each(function (d) { d.target(null); })
                .remove()
            ;
        }

        this._menu.element().node().parentNode.appendChild(this._menu.element().node()); // Make sure menu is on top (Z-Order POV)
    };

    Surface.prototype.exit = function (domNode, element) {
        if (this.content()) {
            this.content().target(null);
        }
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    Surface.prototype.render = function (callback) {
        if (!this.content()) {
            SVGWidget.prototype.render.apply(this, arguments);
        }
        SVGWidget.prototype.render.call(this);
        var context = this;
        if (this.content()) {
            this.content().render(function (contentWidget) {
                if (callback) {
                    callback(context);
                }
            });
        }
        return this;
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

    Surface.prototype.click = function(obj, widget) {
        console.log("Clicked: " + obj.id);
    };

    return Surface;
}));