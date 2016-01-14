"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./SerialAxis"], factory);
    } else {
        root.amchart_XYAxis = factory(root.amchart_SerialAxis);
    }
}(this, function (SerialAxis) {
    function XYAxis() {
        SerialAxis.call(this);
    }
    XYAxis.prototype = Object.create(SerialAxis.prototype);
    XYAxis.prototype.constructor = XYAxis;
    XYAxis.prototype._class += " amchart_XYAxis";

    XYAxis.prototype.publish("axisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{ override: true, tags:["Advanced"]});
    XYAxis.prototype.publish("axisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{ override: true, tags:["Advanced"]});
    XYAxis.prototype.publish("axisTickFormat", null, "string", "Y-Axis Tick Format", null, { override: true, optional: true });
    XYAxis.prototype.publish("axisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{ override: true, tags:["Advanced"]});
    XYAxis.prototype.publish("axisGridAlpha", 0.2, "number", "Grid alpha.",null,{override: true, tags:["Intermediate"]});

    return XYAxis;
}));
