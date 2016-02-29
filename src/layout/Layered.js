"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../layout/AbsoluteSurface", "../common/TextBox", "../common/Text", "css!./Layered.css"], factory);
    } else {
        root.layout_Layered = factory(root.d3, root.common_HTMLWidget, root.layout_AbsoluteSurface, root.common_TextBox, root.common_Text);
    }
}(this, function (d3, HTMLWidget, AbsoluteSurface, TextBox, Text) {
    function Layered() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    Layered.prototype = Object.create(HTMLWidget.prototype);
    Layered.prototype.constructor = Layered;
    Layered.prototype._class += " layout_Layered";

    Layered.prototype.publish("surfacePadding", 0, "number", "Padding");

    Layered.prototype.publish("widgets", [], "widgetArray", "widgets", null, { tags: ["Private"] });

    Layered.prototype.addLayer = function(widget) {
        var widgets = this.widgets();
        widgets.push(widget ? widget : new Text().text("No widget defined for layer."));
        this.widgets(widgets);
        return this;
    };

    Layered.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._contentContainer = element.append("div")
            .attr("class", "container")
        ;
    };

    Layered.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        element.style("padding", this.surfacePadding() + "px");

        var content = this._contentContainer.selectAll(".content.id" + this.id()).data(this.widgets(), function (d) { return d.id(); });
        content.enter().append("div")
            .attr("class", "content id" + this.id())
            .each(function (widget, idx) {
                widget.target(this);
            })
        ;
        content
            .each(function (widget, idx) {
                widget
                    .resize({ width: context.clientWidth(), height: context.clientHeight() })
                    .render()
                ;
            })
        ;
        content.exit()
            .each(function (widget, idx) {
                widget
                    .target(null)
                ;
            })
            .remove()
        ;
        content.order();
    };

    return Layered;
}));
