"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "./Common2D"], factory);
    } else {
        root.Pie = factory(root.d3, root.Common2D);
    }
}(this, function (d3, Common2D) {

    function Pie() {
        Common2D.call(this);
        this._class = "google_Pie";
        this._type = "pie";

    };

    Pie.prototype = Object.create(Common2D.prototype);
    
    Pie.prototype.publish("is3D", true, "boolean", "Enable 3D");
    Pie.prototype.publish("chartAreaWidth", "80%", "string", "Chart Area Width");
    Pie.prototype.publish("chartAreaHeight", "80%", "string", "Chart Area Height");
    Pie.prototype.publish("fontSize", 12, "number", "Font Size");
    Pie.prototype.publish("fontName", "Calibri", "string", "Font Name");
    Pie.prototype.publish("pieHole", 0, "number", "Pie Hole Size");
    
    Pie.prototype.publish("pieStartAngle", 0, "number", "Pie Start Angle");
    
    Pie.prototype.publish("legendAlignment", "center", "set", "Legend Alignment", ["","start","center","end"]);
    Pie.prototype.publish("legendPosition", "top", "set", "Legend Position", ["","bottom","labeled","left","none","right","top"]);
    Pie.prototype.publish("legendFontColor", "#000", "html-color", "Legend Font Color");
    Pie.prototype.publish("legendFontName", "Calibri", "string", "Legend Font Name");
    Pie.prototype.publish("legendFontSize", 12, "number", "Legend Font Size");
    Pie.prototype.publish("legendFontBold", true, "boolean", "Legend Font Bold");
    Pie.prototype.publish("legendFontItalic", true, "boolean", "Legend Font Italic");

    Pie.prototype.is3D = function (_) {
        if (!arguments.length) return this._is3D;
        this._is3D = _;
        return this;
    }

    Pie.prototype.enter = function (domNode, element) {
        var context = this;
        Common2D.prototype.enter.apply(this, arguments);
    };

    Pie.prototype.update = function (domNode, element) {
        var context = this;      
        Common2D.prototype.update.apply(this, arguments);
    };

    return Pie;
}));
