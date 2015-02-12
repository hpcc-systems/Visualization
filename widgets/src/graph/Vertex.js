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

    Vertex.prototype.publishProxy("faChar", "_icon");
    Vertex.prototype.publishProxy("icon_shape_color_fill", "_icon", "shape_color_fill");
    Vertex.prototype.publishProxy("icon_shape_color_stroke", "_icon", "shape_color_stroke");
    Vertex.prototype.publishProxy("icon_image_color_fill", "_icon", "image_color_fill");

    Vertex.prototype.publishProxy("text", "_textBox");
    Vertex.prototype.publishProxy("anchor", "_textBox");
    Vertex.prototype.publishProxy("textbox_shape_color_stroke", "_textBox", "shape_color_stroke");
    Vertex.prototype.publishProxy("textbox_shape_color_fill", "_textBox", "shape_color_fill");
    Vertex.prototype.publishProxy("textbox_text_color_fill", "_textBox", "text_color_fill");

    Vertex.prototype.testData = function (_) {
        this._icon.testData();
        this._textBox.testData();
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
        this._icon.render();
        var iconClientSize = this._icon.getBBox(true);
        this._textBox.render();
        var bbox = this._textBox.getBBox(true);
        this._icon
            .move({ x: -(bbox.width / 2) + (iconClientSize.width / 3), y: -(bbox.height / 2) - (iconClientSize.height / 3) })
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
