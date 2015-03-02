"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonND"], factory);
    } else {
        root.Bar = factory(root.d3, root.CommonND);
    }
}(this, function (d3, CommonND) {

    function Bar() {
        CommonND.call(this);
        this._class = "google_Bar";
        this._type = "bar";
    };
    
    Bar.prototype = Object.create(CommonND.prototype);

    Bar.prototype.publish("legendAlignment", "center", "set", "Legend Alignment", ["","start","center","end"]);
    Bar.prototype.publish("legendPosition", "top", "set", "Legend Position", ["","bottom","labeled","left","none","right","top"]);
    Bar.prototype.publish("legendFontColor", "#000", "html-color", "Legend Font Color");
    Bar.prototype.publish("legendFontName", "Calibri", "string", "Legend Font Name");
    Bar.prototype.publish("legendFontSize", 12, "number", "Legend Font Size");
    Bar.prototype.publish("legendFontBold", true, "boolean", "Legend Font Bold");
    Bar.prototype.publish("legendFontItalic", true, "boolean", "Legend Font Italic");
    
    Bar.prototype.publish("animationDuration", 0, "number", "Animation Duration");
    Bar.prototype.publish("animationOnStartup", true, "boolean", "Animate On Startup");
    Bar.prototype.publish("animationEasing", "linear", "set", "Animation Easing", ["","linear","in","out","inAndOut"]);
    
    Bar.prototype.publish("orientation", "vertical", "set", "Bar Orientation", ["","vertical","horizontal"]);
    
    Bar.prototype.enter = function (domNode, element) {
        var context = this;
        CommonND.prototype.enter.apply(this, arguments);
    };

    Bar.prototype.update = function (domNode, element) {
        var context = this;      
        CommonND.prototype.update.apply(this, arguments);
    };

    return Bar;
}));
