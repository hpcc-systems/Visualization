(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SVGWidget", "./Shape", "./FAChar", "css!./Icon"], factory);
    } else {
        root.Entity = factory(root.SVGWidget, root.Shape, root.FAChar);
    }
}(this, function (SVGWidget, Shape, FAChar) {
    function Icon() {
        SVGWidget.call(this);
        this._class = "icon";
        this._faChar = new FAChar();
        this._shape = new Shape();
    };
    Icon.prototype = Object.create(SVGWidget.prototype);

    Icon.prototype.shape = function (_) {
        if (!arguments.length) return this._shape.shape();
        this._shape.shape(_);
        return this;
    };

    Icon.prototype.fontSize = function (_) {
        if (!arguments.length) return this._faChar.fontSize();
        this._faChar.fontSize(_);
        return this;
    };

    Icon.prototype.faChar = function (_) {
        if (!arguments.length) return this._faChar.char();
        this._faChar.char(_);
        return this;
    };

    Icon.prototype.intersection = function (pointA, pointB) {
        return this._shape.intersection(pointA, pointB);
    };

    Icon.prototype.enter = function (domNode, element) {
        this._shape
            .target(domNode)
            .render()
        ;
        this._faChar
            .target(domNode)
            .render()
        ;
    };

    Icon.prototype.update = function (domNode, element) {
        var bbox = this._faChar.getBBox();
        var size = { width: bbox.width, height: this._faChar.fontSize() };
        if (this._shape.shape() === "circle") {
            size.width = (size.height - 1) * 2;
            size.height = (size.height - 1) * 2;
        } else if (this._shape.shape() === "rect") {
            size.width += 3;
            size.height += 0;
        }
        this._shape
            .size(size)
            .render()
        ;
        this._faChar
            .render()
        ;
    };

    return Icon;
}));
