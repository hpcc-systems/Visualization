(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Shape", "./Text", "css!./TextBox"], factory);
    } else {
        root.Entity = factory(root.SVGWidget, root.Shape, root.Text);
    }
}(this, function (SVGWidget, Shape, Text) {
    function TextBox() {
        SVGWidget.call(this);

        this._fixedSize = null;
        this._padding = {
            left: 8,
            top: 8,
            right: 8,
            bottom: 8
        };

        this._class = "textbox";
        this._shape = new Shape()
            .shape("rect")
        ;
        this._text = new Text();
        this._content = null;
    };
    TextBox.prototype = Object.create(SVGWidget.prototype);

    TextBox.prototype.fixedSize = function (_) {
        if (!arguments.length) return this._fixedSize;
        this._fixedSize = _;
        return this;
    };

    TextBox.prototype.padding = function (_) {
        if (!arguments.length) return this._padding;
        this._padding = _;
        return this;
    };

    TextBox.prototype.text = function (_) {
        if (!arguments.length) return this._text.text();
        this._text.text(_);
        return this;
    };

    TextBox.prototype.anchor = function (_) {
        if (!arguments.length) return this._text.anchor();
        this._text.anchor(_);
        return this;
    };

    TextBox.prototype.content = function (_) {
        if (!arguments.length) return this._content;
        this._content = _;
        return this;
    };

    TextBox.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._shape
            .target(domNode)
            .render()
        ;
        this._text
            .target(domNode)
            .render()
        ;
    };

    TextBox.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var content = element.selectAll(".content").data(this._content ? [this._content] : [], function (d) { return d._id; });
        content.enter().insert("g", "#" + this._text.id())
            .attr("class", "content")
            .each(function (d) { d.target(this); })
        ;
        content
            .each(function (d) {d.render();})
        ;
        content.exit().transition()
            .each(function (d) { d.target(null); })
            .remove()
        ;

        var textBBox = this._text.getBBox(true);
        var contentBBox = { width: 0, height: 0 };
        if (this._content) {
            this._content.pos({ x: 0, y: +textBBox.height / 2 });

            var contentBBox = this._content.getBBox(true);
            this._text.pos({ x: 0, y: -(contentBBox.height) / 2 });
        }

        var bbox = {
            width: Math.max(textBBox.width, contentBBox.width),
            height: textBBox.height + contentBBox.height
        };
        var d = this.anchor();
        var size = {
            width: this._fixedSize ? this._fixedSize.width : bbox.width + this._padding.left + this._padding.right,
            height: this._fixedSize ? this._fixedSize.height : bbox.height + this._padding.top + this._padding.bottom
        };
        var pos = {
            x: 0 + (this.anchor() === "middle" ? 0 : size.width / 2 - this._padding.left),
            y: 0
        };
        this._shape
            .pos(pos)
            .size(size)
            .render()
        ;
    };

    return TextBox;
}));
