"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Common2D"], factory);
    } else {
        root.google_Pie = factory(root.d3, root.google_Common2D);
    }
}(this, function (d3, Common2D) {

    function Pie() {
        Common2D.call(this);

        this._chartType = "PieChart";
    };
    Pie.prototype = Object.create(Common2D.prototype);
    Pie.prototype._class += " google_Pie";

    Pie.prototype.publish("is3D", true, "boolean", "Enable 3D");
    Pie.prototype.publish("pieHole", 0, "number", "Pie Hole Size",null,{min:0,max:0.9,step:0.1});
    Pie.prototype.publish("pieStartAngle", 0, "number", "Pie Start Angle");
    
    Pie.prototype.publish("pieSliceText", "percentage", "set", "The content of the text displayed on the slice" ,["none","label","value","percentage"]);
    Pie.prototype.publish("pieSliceTextStyleColor", "#FFFFFF", "hmtl-color", "Specifies the slice text style.");
    Pie.prototype.publish("pieSliceTextStyleFontName", null, "string", "Specifies the slice text style.");
    Pie.prototype.publish("pieSliceTextStyleFontSize", null, "number", "Specifies the slice text style.");

    Pie.prototype.publish("pieSliceBorderColor", "#FFFFFF", "html-color", "The color of the slice borders");
    Pie.prototype.publish("pieResidueSliceColor", "#ccc", "html-color", "Color for the combination slice that holds all slices below sliceVisibilityThreshold");
    Pie.prototype.publish("pieResidueSliceLabel", "Other", "string", "A label for the combination slice that holds all slices below sliceVisibilityThreshold");
    
    Pie.prototype.publish("sliceVisibilityThreshold", 1/720, "number", "The slice relative part, below which a slice will not show individually."); // 1/720
    
    Pie.prototype.publish("slicesColor", [], "array", "Per slice");
    Pie.prototype.publish("slicesOffset", [], "array", "Per slice");
    Pie.prototype.publish("slicesTextStyle", [], "array", "Per slice"); // overrides pieSliceTextStyle
    
    Pie.prototype.getChartOptions = function () {
        var retVal = Common2D.prototype.getChartOptions.apply(this, arguments);

        retVal.colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);
        
        retVal.is3D = this.is3D();
        retVal.pieHole = this.pieHole();
        retVal.pieStartAngle = this.pieStartAngle();
        retVal.pieSliceText = this.pieSliceText();
        retVal.pieSliceTextStyle = {
            color: this.pieSliceTextStyleColor(),
            fontName: this.pieSliceTextStyleFontName(),
            fontSize: this.pieSliceTextStyleFontSize()
        }
        retVal.pieSliceBorderColor = this.pieSliceBorderColor();
        retVal.pieResidueSliceColor = this.pieResidueSliceColor();
        retVal.pieResidueSliceLabel = this.pieResidueSliceLabel();
        retVal.sliceVisibilityThreshold = this.sliceVisibilityThreshold();
        
        retVal.slices = initSlices(this.getNumSlices());
        
        this.slicesColor().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==='undefined') {
               retVal.slices[i] = {}; 
            }
            retVal.slices[i].color = d;
        });
        this.slicesOffset().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==='undefined') {
               retVal.slices[i] = {}; 
            }
            retVal.slices[i].offset = d;
        });  
        this.slicesTextStyle().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==='undefined') {
               retVal.slices[i] = {}; 
            }
            retVal.slices[i].textStyle = d;
        });    
        return retVal;
    };

    Pie.prototype.getNumSlices = function() {
        return this.data().length;
    }

    function initSlices(num) {
        var slices = [];
        for (var i = 0; i < num; i++) {
            slices.push({});
        }
        return slices;
    } 
    
    Pie.prototype.enter = function (domNode, element) {
        Common2D.prototype.enter.apply(this, arguments);
    };

    Pie.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
    };

    return Pie;
}));
