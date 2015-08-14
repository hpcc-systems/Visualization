/**
 * @file c3 Chart Area
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./CommonND"], factory);
    } else {
        root.c3chart_Area = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    /**
     * @class c3chart_Area
     * @extends c3chart_CommonND
     */
    function Area(target) {
        CommonND.call(this);
        /**
         * Specifies the widget type of the c3 Widget/HPCC Widget.
         * @member {string} _type
         * @memberof c3chart_Area
         * @private
         */
        this._type = "area";
    }
    Area.prototype = Object.create(CommonND.prototype);
    Area.prototype.constructor = Area;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_Area
     * @private
     */
    Area.prototype._class += " c3chart_Area";

    Area.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("lineWidth", 1.0, "number", "Line Width",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("lineDashStyle", [], "array", "Dashed Lines",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("lineOpacity", 1.0, "number", "Line Alpha",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("fillOpacity", 0.2, "number", "Opacity of The Fill Color",null,{tags:["Basic","Exp","Shared"]});

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof c3chart_Area
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Area.prototype.enter = function (domNode, element) {
        console.log(domNode);
        console.log(element);
        CommonND.prototype.enter.apply(this, arguments);
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof c3chart_Area
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Area.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        if (this.isStacked()) {
            this.c3Chart.groups([this._columns.slice(1, this._columns.length)]);
        } else {
            this.c3Chart.groups([]);
        }

        element.selectAll(".c3-line").style({
            "stroke-width": this.lineWidth()+"px",
            "stroke-opacity": this.lineOpacity(),
            "stroke-dasharray": this.lineDashStyle().toString()
        });

        element.selectAll(".c3-area").style({
            "opacity": this.fillOpacity()
        });
    };

    return Area;
}));
