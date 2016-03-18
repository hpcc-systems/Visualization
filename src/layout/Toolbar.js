"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "css!./Toolbar"], factory);
    } else {
        root.layout_Toolbar = factory(root.d3, root.common_HTMLWidget);
    }
}(this, function (d3, HTMLWidget) {
    function Toolbar() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    Toolbar.prototype = Object.create(HTMLWidget.prototype);
    Toolbar.prototype.constructor = Toolbar;
    Toolbar.prototype._class += " layout_Toolbar";

    Toolbar.prototype.publish("title", "", "string", "Title",null,{tags:["Intermediate"]});
    
    Toolbar.prototype.publish("fontSize", null, "number", "Title Font Size (px)", null, { tags: ["Advanced"], optional: true });
    Toolbar.prototype.publish("fontColor", null, "html-color", "Title Font Color", null, { tags: ["Advanced"], optional: true });
    Toolbar.prototype.publish("fontFamily", null, "string", "Title Font Family", null, { tags: ["Advanced"], optional: true });
    Toolbar.prototype.publish("fontBold", true, "boolean", "Enable Bold Title Font", null, { tags: ["Advanced"], optional: true });
    Toolbar.prototype.publish("backgroundColor", null, "html-color", "Background Color", null, { tags: ["Intermediate"], optional: true });
    
    Toolbar.prototype.publish("responsive", true, "boolean", "Adapts to pixel width",null,{tags:["Basic"]});
    
    Toolbar.prototype.publish("widgets", [], "widgetArray", "Child widgets of the toolbar",null,{tags:["Basic"]});
    Toolbar.prototype.publish("widgetClasses", [], "array", "Array of Html Element classes to be assigned to the child widgets (shares index with widgets param)",null,{tags:["Basic"]});

    Toolbar.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
    };

    Toolbar.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        element
            .attr("title", context.title())
            .style("background-color", this.backgroundColor())
        ;

        var title = element.selectAll("div.toolbar-title")
                .data(this.title() ? [this.title()] : []);
        title.enter().append("div").classed("toolbar-title",true).each(function(){
            var div = d3.select(this);
            var span = div.append("span").text("QQQ");

            var box = this.getBoundingClientRect();
            var spanBox = span.node().getBoundingClientRect();
            var offset = (box.height/2) - (spanBox.height/2) - (spanBox.top - box.top);
            span.style("padding", offset+"px");
        });
        title.selectAll("div.toolbar-title > span")
            .style("font-size", this.fontSize_exists() ? this.fontSize() + "px" : null)
            .style("color", this.fontColor_exists() ? this.fontColor() : null)
            .style("font-family", this.fontFamily_exists() ? this.fontFamily() : null)
            .style("font-weight", this.fontBold_exists() ? (this.fontBold() ? "bold" : "normal") : null)
            .style("background-color", this.backgroundColor_exists() ? this.backgroundColor() : null)
            .text(context.title())
        ;
        title.exit().remove();
        
        var childWidgets = element.selectAll("div.toolbar-child")
                .data(this.widgets() !== null ? this.widgets() : [],function(d){return d.id();});
        
        childWidgets.enter().insert("div", "div.toolbar-title")
            .each(function(d,i){
                var widgetClass = context.widgetClasses()[i] ? context.widgetClasses()[i] + " toolbar-child" : "toolbar-child";
                d3.select(this).classed(widgetClass,true);
                d.target(this);
            });
        childWidgets.exit().each(function(d){
            d.target(null);
        }).remove();
        childWidgets.order();
    };

    Toolbar.prototype.render = function (callback) {
        var context = this;
        HTMLWidget.prototype.render.call(this, function (w) {
            var toolbarBBox = context.element().node().getBoundingClientRect();
            var minX = toolbarBBox.left + toolbarBBox.width;
            context.element().selectAll("div.toolbar-child")
                .each(function (d, i) {
                    var childBBox = this.getBoundingClientRect();
                    if (minX > childBBox.left)
                        minX = childBBox.left;
                })
            ;
            context.element().select(".toolbar-title span")
                .style("width", (minX - toolbarBBox.left - 4) + "px")
            ;
            if (callback) {
                callback(w);
            }
        });
    };

    Toolbar.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
        this.widgets().forEach(function (w) {
            w.target(null);
        });
    };

    return Toolbar;
}));