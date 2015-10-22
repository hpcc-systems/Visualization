"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../common/Widget"], factory);
    } else {
        root.amchart_Axis = factory(root.common_Widget);
    }
}(this, function(Widget) {
    function Axis() {
        Widget.call(this);
    }
    Axis.prototype = Object.create(Widget.prototype);
    Axis.prototype.constructor = Axis;
    Axis.prototype._class += " amchart_Axis";

    CommonSerial.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisBaselineColor", "#000000", "html-color", "X Axis Baseline Color",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisBaselineColor", "#000000", "html-color", "Y Axis baseline Color",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisFontColor", null, "html-color", "Horizontal Axis Text Style (Color)",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisFontColor", null, "html-color", "Vertical Axis Text Style (Color)",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisTitle", "", "string", "X-Axis Title",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("xAxisLabelRotation", null, "number", "X-Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:"range",tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("axisAlpha", 1, "number", "Axis Alpha",null,{tags:["Intermediate"]}); // share?

    //--

    CommonSerial.prototype.publish("xAxisAutoGridCount", true, "boolean", "Specifies Whether Number of GridCount Is Specified Automatically, According To The Axis Size",null,{tags:["Advanced"]});
    CommonSerial.prototype.publish("xAxisGridPosition", "start", "set", "Specifies If A Grid Line Is Placed On The Center of A Cell or On The Beginning of A Cell", ["start","middle"],{tags:["Advanced"]});

    CommonSerial.prototype.publish("xAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("xAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});
    CommonSerial.prototype.publish("yAxisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});

    CommonSerial.prototype.publish("xAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("xAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("xAxisGridAlpha", 0.0, "number", "Grid alpha.",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisGridAlpha", 0.0, "number", "Grid alpha.",null,{tags:["Intermediate"]});

    //CommonSerial.prototype.publish("yAxisMinimum", null, "number", "",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("yAxisTitleOffset", null, "number", "",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("startOnAxis", true, "boolean", "Draw Chart Starting On Axis.",null,{tags:["Intermediate"]});

    //--

    CommonSerial.prototype.publish("xAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");
    CommonSerial.prototype.publish("yAxisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");

    CommonSerial.prototype.publish("yAxisType", "linear", "set", "Y-Axis Type", ["none", "linear", "pow", "log", "time"],{tags:["Intermediate","Shared"]});
    CommonSerial.prototype.publish("xAxisType", "ordinal", "set", "X-Axis Type", ["ordinal", "linear", "time"]);

    CommonSerial.prototype.publish("yAxisTickFormat", "s", "string", "Y-Axis Tick Format");



    return Axis;
}));
