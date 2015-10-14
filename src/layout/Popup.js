"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../layout/Surface", "../common/Icon", "css!./Popup"], factory);
    } else {
        root.layout_Popup = factory(root.d3, root.common_HTMLWidget, root.layout_Surface, root.common_Icon);
    }
}(this, function (d3, HTMLWidget, Surface, Icon) {
    function Popup() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._surfaceButtons = [];
    }
    
    Popup.prototype = Object.create(HTMLWidget.prototype);
    Popup.prototype.constructor = Popup;
    Popup.prototype._class += " layout_Popup";
    
    Popup.prototype.publish("popupState", false, "boolean", "State of the popup, visible (true) or hidden (false)",null,{});
    Popup.prototype.publish("top", null, "number", "Top position property of popup",null,{});
    Popup.prototype.publish("bottom", null, "number", "Bottom position property of popup",null,{});
    Popup.prototype.publish("left", null, "number", "Left position property of popup",null,{});
    Popup.prototype.publish("right", null, "number", "Right position property of popup",null,{});
    Popup.prototype.publish("position", "relative", "set", "Value of the 'position' property",["absolute", "relative", "fixed", "static", "initial", "inherit" ],{tags:["Private"]});
    Popup.prototype.publish("widget", null, "widget", "Widget",null,{tags:["Private"]});

    Popup.prototype.widgetSize = function (widgetDiv) {
        var width = this.clientWidth() - this.calcFrameWidth(widgetDiv);
        var height = this.clientHeight() - this.calcFrameHeight(widgetDiv);
 
        return { width: width, height: height };
    };
    
    Popup.prototype.updateState = function (visible) {
            this.popupState(visible).render();
    };

    Popup.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;        

        this.visible(this.popupState());
        
        var widgets = element.selectAll("#" + this._id + " > .popupWidget").data(this.widget() ? [this.widget()] : [], function (d) { return d._id; });
        widgets.enter().append("div")
            .attr("class", "popupWidget")
            .each(function (d) {
                d.target(this);
            })
        ;
        widgets
            .each(function (d) {
                var widgetSize = context.widgetSize(d3.select(this));
                d.resize({ width: widgetSize.width, height: widgetSize.height });
            })
        ;
        widgets.exit().each(function (d) {
            d.target(null);
        }).remove();
    };
    Popup.prototype.postUpdate = function (domNode, element) {
        element
            .style("position",this.position())
            .style("left",this.left() + "px")
            .style("right",this.right() + "px")
            .style("top",this.top() + "px")
            .style("bottom",this.bottom() + "px")
        ;
    };

    Popup.prototype.exit = function (domNode, element) {
        if (this.widget()) {
            this.widget(null);
            this.render();
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Popup.prototype.click = function(obj) {
        console.log("Clicked: " + obj.id);
    };

    return Popup;
}));
