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

    TextBox.prototype.enter = function (domNode, element) {
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
        this._text
            .render()
        ;

        var bbox = this._text.getBBox();
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
