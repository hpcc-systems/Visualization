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
    }
    Vertex.prototype = Object.create(SVGWidget.prototype);
    Vertex.prototype.constructor = Vertex;
    Vertex.prototype._class += " graph_Vertex";

    Vertex.prototype.publishProxy("faChar", "_icon");
    Vertex.prototype.publishProxy("icon_shape_diameter", "_icon", "diameter");
    Vertex.prototype.publishProxy("icon_shape_colorFill", "_icon", "shape_colorFill");
    Vertex.prototype.publishProxy("icon_shape_colorStroke", "_icon", "shape_colorStroke");
    Vertex.prototype.publishProxy("icon_image_colorFill", "_icon", "image_colorFill");

    Vertex.prototype.publishProxy("text", "_textBox");
    Vertex.prototype.publishProxy("anchor", "_textBox");
    Vertex.prototype.publishProxy("textbox_shape_colorStroke", "_textBox", "shape_colorStroke");
    Vertex.prototype.publishProxy("textbox_shape_colorFill", "_textBox", "shape_colorFill");
    Vertex.prototype.publishProxy("textbox_text_colorFill", "_textBox", "text_colorFill");

    Vertex.prototype.publish("iconAnchor", "start", "set", "Icon Anchor Position", ["", "start", "middle", "end"],{tags:["Basic"]});
    
    Vertex.prototype.publish("tooltip", "", "string", "Tooltip", null, { tags: ["Private"] });

    Vertex.prototype.publish("annotationDiameter", 14, "number", "Annotation Diameter",null,{tags:["Private"]});
    Vertex.prototype.publish("annotationSpacing", 3, "number", "Annotation Spacing",null,{tags:["Private"]});
    Vertex.prototype.publish("annotationIcons", [], "array", "Annotations",null,{tags:["Private"]});

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
        this._icon
            .tooltip(this.tooltip())
            .render()
        ;
        var iconClientSize = this._icon.getBBox(true);
        this._textBox
            .tooltip(this.tooltip())
            .render()
        ;
        var bbox = this._textBox.getBBox(true);
        switch(this.iconAnchor()){
            case 'start':
                this._icon
                    .move({ 
                        x: -(bbox.width / 2) + (iconClientSize.width / 3),
                        y: -(bbox.height / 2) - (iconClientSize.height / 3) 
                    });
                break;
            case 'middle':
                this._icon
                    .move({ 
                        x: 0, 
                        y: -(bbox.height / 2) - (iconClientSize.height / 3) 
                    });
                break;
            case 'end':
                this._icon
                    .move({ 
                        x: (bbox.width / 2) - (iconClientSize.width / 3), 
                        y: -(bbox.height / 2) - (iconClientSize.height / 3) 
                    });
                break;
        }

        var context = this;
        var annotations = element.selectAll(".annotation").data(this.annotationIcons());
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
                annotationWidget
                    .diameter(context.annotationDiameter())
                    .shape_colorFill(context.textbox_shape_colorFill())
                    .shape_colorStroke(context.textbox_shape_colorStroke())
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
                xOffset -= aBBox.width + context.annotationSpacing();
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
