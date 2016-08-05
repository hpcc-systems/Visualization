"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Axis", "d3"], factory);
    } else {
        root.amchart_SerialAxis = factory(root.amchart_Axis, root.d3);
    }
}(this, function(Axis, d3) {
    function SerialAxis() {
        Axis.call(this);

        this._parser = d3.time.format("%Y-%m-%d").parse;
    }
    SerialAxis.prototype = Object.create(Axis.prototype);
    SerialAxis.prototype.constructor = SerialAxis;
    SerialAxis.prototype._class += " amchart_SerialAxis";

    SerialAxis.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisBaselineColor", "#000000", "html-color", "X Axis Baseline Color",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisFontColor", "#000000", "html-color", "Horizontal Axis Text Style (Color)",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisTitle", "", "string", "X-Axis Title",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisTitleFontColor", "#000000", "html-color", "Axis Title Text Style (Color)",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisLabelRotation", 0, "number", "Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:"range",tags:["Intermediate","Shared"]});
    SerialAxis.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width",null,{tags:["Intermediate","Shared"]});
    SerialAxis.prototype.publish("axisAlpha", 1, "number", "Axis Alpha",null,{tags:["Intermediate"]});
    SerialAxis.prototype.publish("axisAutoGridCount", true, "boolean", "Specifies Whether Number of GridCount Is Specified Automatically, According To The Axis Size",null,{tags:["Advanced"]});
    SerialAxis.prototype.publish("axisGridPosition", "start", "set", "Specifies If A Grid Line Is Placed On The Center of A Cell or On The Beginning of A Cell", ["start","middle"],{tags:["Advanced"]});
    SerialAxis.prototype.publish("axisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:["Intermediate"]});
    SerialAxis.prototype.publish("axisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});
    SerialAxis.prototype.publish("axisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    SerialAxis.prototype.publish("axisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    SerialAxis.prototype.publish("axisGridAlpha", 0.0, "number", "Grid alpha.",null,{tags:["Intermediate"]});
    //SerialAxis.prototype.publish("axisMinimum", null, "number", "",null,{tags:["Intermediate"]});

    SerialAxis.prototype.publish("startOnAxis", true, "boolean", "Draw Chart Starting On Axis.",null,{tags:["Intermediate"]});
    SerialAxis.prototype.publish("axisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");
    SerialAxis.prototype.publish("axisType", "ordinal", "set", "X-Axis Type", ["ordinal", "linear", "time", "pow", "log", "none"]);
    SerialAxis.prototype.publish("axisTickFormat", "", "string", "Y-Axis Tick Format");
    
    SerialAxis.prototype.publish("position", null, "set", "Position of Axis", ["top", "bottom", "left", "right"]);
    
    SerialAxis.prototype.publish("axisMinValue", null, "number", "Y axis Minimum value",null,{});
    SerialAxis.prototype.publish("axisMaxValue", null, "number", "Y axis Maximum value",null,{});
    
    SerialAxis.prototype.publish("axislabelFrequency", null, "number", "Y axis Label Frequency",null,{});

    SerialAxis.prototype.publish("axisBaseValue", null, "number", "Y axis Base Value",null,{});

    SerialAxis.prototype.publish("axisGridCount", null, "number", "Y axis Grid Count",null,{});

    var axisTypeTimePattern = SerialAxis.prototype.axisTypeTimePattern;
    SerialAxis.prototype.axisTypeTimePattern = function (_) {
        var retVal = axisTypeTimePattern.apply(this, arguments);
        if (arguments.length) {
            this._parser = d3.time.format(_).parse;
        }
        return retVal;
    };

    return SerialAxis;
}));
