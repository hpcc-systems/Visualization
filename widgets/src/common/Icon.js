(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./D3Widget", "./Shape", "./FAChar", "d3/d3"], factory);
    } else {
        root.Entity = factory(root.D3Widget, root.Shape, root.FAChar, root.d3);
    }
}(this, function (D3Widget, Shape, FAChar, d3) {
    function Icon(target) {
        D3Widget.call(this, target);
        this._class = "icon";
        this._faChar = new FAChar();
        this._shape = new Shape();
    };
    Icon.prototype = Object.create(D3Widget.prototype);

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
        this._shape
            .size({ width: (this._faChar.fontSize() - 1) * 2, height: (this._faChar.fontSize() - 1) * 2 })
            .render()
        ;
        this._faChar
            .render()
        ;
    };

    return Icon;
}));
