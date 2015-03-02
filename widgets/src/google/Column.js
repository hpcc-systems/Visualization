"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./CommonND"], factory);
    } else {
        root.Column = factory(root.d3, root.CommonND);
    }
}(this, function (d3, CommonND) {

    function Column() {
        CommonND.call(this);
        this._class = "google_Column";
        this._type = "column";
    };
    
    Column.prototype = Object.create(Common.prototype);
    
    Column.prototype.publish("legendAlignment", "center", "set", "Legend Alignment", ["","start","center","end"]);
    Column.prototype.publish("legendPosition", "top", "set", "Legend Position", ["","bottom","labeled","left","none","right","top"]);
    Column.prototype.publish("legendFontColor", "#000", "html-color", "Legend Font Color");
    Column.prototype.publish("legendFontName", "Calibri", "string", "Legend Font Name");
    Column.prototype.publish("legendFontSize", 12, "number", "Legend Font Size");
    Column.prototype.publish("legendFontBold", true, "boolean", "Legend Font Bold");
    Column.prototype.publish("legendFontItalic", true, "boolean", "Legend Font Italic");
    
    Column.prototype.publish("animationDuration", 0, "number", "Animation Duration");
    Column.prototype.publish("animationOnStartup", true, "boolean", "Animate On Startup");
    Column.prototype.publish("animationEasing", "linear", "set", "Animation Easing", ["","linear","in","out","inAndOut"]);
    
    Bar.prototype.publish("orientation", "vertical", "set", "Bar Orientation", ["","vertical","horizontal"]);

    Column.prototype.enter = function (domNode, element) {
        var context = this;
        CommonND.prototype.enter.apply(this, arguments);
    };

    Column.prototype.update = function (domNode, element) {
        var context = this;      
        CommonND.prototype.update.apply(this, arguments);
    };

    return Column;
}));
