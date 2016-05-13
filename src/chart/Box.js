"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/Palette", "../common/PropertyExt", "d3-box", "css!./Box"], factory);
    } else {
        root.graph_Graph = factory(root.d3, root.common_SVGWidget, root.common_Palette, root.common_PropertyExt, root.d3.box);
    }
}(this, function (d3, SVGWidget, Palette, PropertyExt, D3Box) {
    D3Box = D3Box || d3.box;

     function Box(target) {
        SVGWidget.call(this);
    }
    Box.prototype = Object.create(SVGWidget.prototype);
    Box.prototype.constructor = Box;
    Box.prototype._class += " chart_Box";

    Box.prototype.publish("stringProp", "defaultValue", "string", "Sample Property");

    Box.prototype.enter = function (domNode, element) {
        SVGWidget.prototype.enter.apply(this, arguments);
    };

    Box.prototype.update = function (domNode, element) {
        SVGWidget.prototype.update.apply(this, arguments);
    };

    Box.prototype.exit = function (domNode, element) {
        SVGWidget.prototype.exit.apply(this, arguments);
    };

    return Box;
}));
