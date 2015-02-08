"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/SVGWidget", "../common/Icon", "../common/TextBox", "css!./Vertex"], factory);
    } else {
        root.Entity = factory(root.d3, root.SVGWidget, root.Icon, root.TextBox);
    }
}(this, function (d3, SVGWidget, Icon, TextBox) {
    function Vertex() {
        SVGWidget.call(this);
        this._class = "graph_Vertex";

        this._icon = new Icon();
        this._textBox = new TextBox();
    };
    Vertex.prototype = Object.create(SVGWidget.prototype);

    Vertex.prototype.faChar = function (_) {
        if (!arguments.length) return this._icon.faChar();
        this._icon.faChar(_);
        return this;
    };

    Vertex.prototype.text = function (_) {
        if (!arguments.length) return this._textBox.text();
        this._textBox.text(_);
        return this;
    };

    //  Render  ---
    Vertex.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
        this._icon
            .target(domNode)
            .render()
        ;
        this._textBox
            .target(domNode)
            .render()
        ;
    };

    Vertex.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
        var pos = this._textBox.pos();
        var bbox = this._textBox.getBBox();
        var w = bbox.width;
        var h = bbox.height;
        var iconClientSize = this._icon.getBBox();
        this._icon
            .move({ x: -(w / 2) + (iconClientSize.width / 3), y: -(h / 2) - (iconClientSize.height / 3) })
        ;
    };

    //  Methods  ---
    Vertex.prototype.intersection = function (pointA, pointB) {
        var i1 = this._icon.intersection(pointA, pointB, this._pos);
        if (i1)
            return i1;
        var i2 = this._textBox.intersection(pointA, pointB, this._pos);
        if (i2)
            return i2;
        return null;
    };

    return Vertex;
}));
