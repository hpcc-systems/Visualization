"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
//        define(["d3", "../common/HTMLWidget", "../layout/Surface", "../form/Input", "../c3chart/Column", "css!./Popup", "css!font-awesome",], factory);
        define(["d3", "src/common/HTMLWidget", "src/layout/Surface", "src/form/Input", "src/c3chart/Column", "css!./Popup", "css!font-awesome",], factory);
    } else {
        root.layout_Popup = factory(root.d3, root.common_HTMLWidget, root.layout_Surface, root.form_Input, root.c3chart_Column);
    }
}(this, function (d3, HTMLWidget, Surface, Input, Column) {
    function Popup() {
        HTMLWidget.call(this);

        this._tag = "div";

        this._surfaceButtons = [];
    }
    Popup.prototype = Object.create(HTMLWidget.prototype);
    Popup.prototype._class += " layout_Popup";
    
    Popup.prototype.publish("popupState", false, "boolean", "State of the popup, visible (true) or hidden (false)",null,{});
    Popup.prototype.publish("top", null, "number", "Top position property of popup",null,{});
    Popup.prototype.publish("bottom", null, "number", "Bottom position property of popup",null,{});
    Popup.prototype.publish("left", null, "number", "Left position property of popup",null,{});
    Popup.prototype.publish("right", null, "number", "Right position property of popup",null,{});
    Popup.prototype.publish("position", "relative", "set", "Value of the 'position' property",["absolute", "relative", "fixed", "static", "initial", "inherit" ],{tags:['Private']});
    Popup.prototype.publish("showTestButton", false, "boolean", "Test Button in target",null,{});
    Popup.prototype.publish("buttonName", null, "string", "Button name property",null,{});
    Popup.prototype.publish("buttonLabel", "", "string", "Button label text",null,{});
    Popup.prototype.publish("widget", null, "widget", "Widget",null,{tags:['Private']});


    Popup.prototype.testData = function () {
        this.showTestButton(true);
        this.position("absolute");
        this.top(30);
        
        var context = this;
        this._testButton = new Input()
            .type("button")
            .value("Open Popup")
            .on("click", function () {
                context.updateState(!(context.popupState()));
            }, true)
        ; 

        this.widget(new Surface().widget(new Column().testData()));

        return this;
    };

    Popup.prototype.widgetSize = function (widgetDiv) {
        var width = this.clientWidth() - this.calcFrameWidth(widgetDiv);
        var height = this.clientHeight() - this.calcFrameHeight(widgetDiv);
 
        return { width: width, height: height };
    };
    
    Popup.prototype.updateState = function (visible) {
            this.popupState(visible).render();
    };
    
    Popup.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        if (this._testButton) {
            this._testButton.target(domNode.parentNode).render();
        }
    };

    Popup.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;        

        element
            .style("position",this.position())
            .style("left",this.left() + "px")
            .style("right",this.right() + "px")
            .style("top",this.top() + "px")
            .style("bottom",this.bottom() + "px")
        ;
        
        if (this.popupState()) {
            element.style("display", "block");
        } else {
            element.style("display", "none");
        }
        
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

    Popup.prototype.exit = function (domNode, element) {
        if (this.widget()) {
            this.widget(null);
            this.render();
        }
        HTMLWidget.prototype.exit.apply(this, arguments);
    };

    Popup.prototype.render = function (callback) {
        var context = this;
        HTMLWidget.prototype.render.call(this, function (widget) {
            if (context.widget()) {
                context.widget().render(function (widget) {
                    if (callback) {
                        callback(widget);
                    }
                });
            } else {
                if (callback) {
                    callback(widget);
                }
            }
        });
        
        return this;
    };

    Popup.prototype.click = function(obj) {
        console.log("Clicked: " + obj.id);
    };

    return Popup;
}));
