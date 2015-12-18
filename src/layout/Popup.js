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
    Popup.prototype.publish("shrinkWrap", false, "boolean", "The popup parent container either shrinks to the size of its contents (true) or expands to fit thge popup's parentDiv (false)",null,{});
    Popup.prototype.publish("centerPopup", "none", "set", "Center the widget in its container element (target) or in the window",["none", "container", "window"],{});
    Popup.prototype.publish("top", null, "number", "Top position property of popup",null,{});
    Popup.prototype.publish("bottom", null, "number", "Bottom position property of popup",null,{});
    Popup.prototype.publish("left", null, "number", "Left position property of popup",null,{});
    Popup.prototype.publish("right", null, "number", "Right position property of popup",null,{});
    Popup.prototype.publish("position", "relative", "set", "Value of the 'position' property",["absolute", "relative", "fixed", "static", "initial", "inherit" ],{tags:["Private"]});

    Popup.prototype.publish("widget", null, "widget", "Widget",null,{tags:["Private"]});

    Popup.prototype.updateState = function (visible) {
        visible  = visible || !this.popupState();
        this.popupState(visible).render();
    };

    Popup.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this.widget()
            .target(domNode)
        ;       
        this._originalPosition = this.position();
    };    

    Popup.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        element.style({
            visibility: this.popupState() ? null : "hidden",
            opacity: this.popupState() ? null : 0,
            width: this.shrinkWrap() ? this.widget().width() + "px": this._size.width + "px",
            height: this.shrinkWrap() ? this.widget().height() + "px" : this._size.height + "px",
        });
        if (this.widget().size().height === 0 ) {
            this.widget().resize(this.size());
        }
    };

    Popup.prototype.postUpdate = function (domNode, element) {
        var left, top; 
        switch (this.centerPopup()) {
            case "container":
                if (this._parentElement) {
                    left = parseInt(this._parentElement.style("width"))/2 - this.widget().width()/2;
                    top = parseInt(this._parentElement.style("height"))/2 - this.widget().height()/2;
                }
                this.position("absolute");
                break;

            case "window":
                left = window.innerWidth/2 - this.widget().width()/2;
                top = window.innerHeight/2 - this.widget().height()/2;
                this.position("fixed");
                break;

            default:
                left = 0;
                top = 0;
                this.position(this._originalPosition);
                break;
        } 

        this.pos({ x: left, y: top });
        
        HTMLWidget.prototype.postUpdate.apply(this, arguments);
        
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
