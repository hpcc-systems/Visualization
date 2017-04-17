/**
 * @file c3 Chart Line
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Line = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    /**
     * @class c3chart_Line
     * @extends c3chart_CommonND
     */
    function Line(target) {
        CommonND.call(this);
        /**
         * Specifies the widget type of the c3 Widget/HPCC Widget.
         * @member {string} _type
         * @memberof c3chart_Line
         * @private
         */
        this._type = "line";
    }
    Line.prototype = Object.create(CommonND.prototype);
    Line.prototype.constructor = Line;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_Line
     * @private
     */
    Line.prototype._class += " c3chart_Line";

    Line.prototype.publish("lineWidth", 1.0, "number", "Line Width",null,{tags:["Basic","Shared"]});
    Line.prototype.publish("lineDashStyle", [], "array", "Dashed Lines",null,{tags:["Basic","Shared"]});
    Line.prototype.publish("lineOpacity", 1.0, "number", "Line Alpha",null,{tags:["Basic","Shared"]});

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof c3chart_Line
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Line.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof c3chart_Line
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Line.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        element.selectAll(".c3-line").style({
            "stroke-width": this.lineWidth()+"px",
            "stroke-opacity": this.lineOpacity(),
            "stroke-dasharray": this.lineDashStyle().toString(),
        });
    };

    return Line;
}));
