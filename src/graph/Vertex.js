"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/SVGWidget", "../common/Icon", "../common/TextBox", "css!./Vertex"], factory);
    } else {
        root.graph_Vertex = factory(root.d3, root.common_SVGWidget, root.common_Icon, root.common_TextBox);
    }
}(this, function (d3, SVGWidget, Icon, TextBox) {
    function Vertex() {
        SVGWidget.call(this);

        this._icon = new Icon();
        this._textBox = new TextBox();
        this._annotationWidgets = {};
    };
    Vertex.prototype = Object.create(SVGWidget.prototype);
    Vertex.prototype._class += " graph_Vertex";

    Vertex.prototype.publishProxy("faChar", "_icon");
    Vertex.prototype.publishProxy("icon_shape_color_fill", "_icon", "shape_color_fill");
    Vertex.prototype.publishProxy("icon_shape_color_stroke", "_icon", "shape_color_stroke");
    Vertex.prototype.publishProxy("icon_image_color_fill", "_icon", "image_color_fill");

    Vertex.prototype.publishProxy("text", "_textBox");
    Vertex.prototype.publishProxy("anchor", "_textBox");
    Vertex.prototype.publishProxy("textbox_shape_color_stroke", "_textBox", "shape_color_stroke");
    Vertex.prototype.publishProxy("textbox_shape_color_fill", "_textBox", "shape_color_fill");
    Vertex.prototype.publishProxy("textbox_text_color_fill", "_textBox", "text_color_fill");

    Vertex.prototype.publish("annotation_diameter", 14, "number", "Annotation Diameter");
    Vertex.prototype.publish("annotation_spacing", 3, "number", "Annotation Spacing");
    Vertex.prototype.publish("annotation_icons", [], "array", "Annotations");

    Vertex.prototype.testData = function (_) {
        this._icon.testData();
        this._textBox.testData();
        this.annotation_icons([{ faChar: "\uf188", tooltip: "Test A", shape_color_fill: "white", image_color_fill: "Red" }, { faChar: "\uf0ad", tooltip: "Test B", shape_color_fill: "green", shape_color_stroke: "green", image_color_fill: "white" }, { faChar: "\uf193", tooltip: "Test C", shape_color_fill: "navy", shape_color_stroke: "navy", image_color_fill: "white" }])
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

        var context = this;
        var annotations = element.selectAll(".annotation").data(this.annotation_icons());
        annotations.enter().append("g")
            .attr("class", "annotation")
            .each(function (d, idx) {
                context._annotationWidgets[idx] = new Icon()
                    .target(this)
                    .shape("square")
                ;
            })
        ;
        var xOffset = bbox.width / 2;
        var yOffset = bbox.height / 2;
        annotations
            .each(function (d, idx) {
                var annotationWidget = context._annotationWidgets[idx];
                var ddd = context.textbox_shape_color_stroke();
                annotationWidget
                    .diameter(context.annotation_diameter())
                    .shape_color_fill(context.textbox_shape_color_fill())
                    .shape_color_stroke(context.textbox_shape_color_stroke())
                ;
                for (var key in d) {
                    if (annotationWidget[key]) {
                        annotationWidget[key](d[key]);
                    }
                }
                annotationWidget.render();

                var aBBox = annotationWidget.getBBox(true);
                annotationWidget
                    .move({
                        x: xOffset - aBBox.width / 4,
                        y: yOffset + aBBox.height / 4
                    })
                ;
                xOffset -= aBBox.width + context.annotation_spacing();
            })
        ;
        annotations.exit()
            .each(function (d, idx) {
                var element = d3.select(this);
                delete context._annotationWidgets[idx];
                element.remove();
            })
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
