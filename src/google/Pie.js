/**
* @file Google Pie Chart
* @author HPCC Systems
*/

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./Common2D"], factory);
    } else {
        root.google_Pie = factory(root.d3, root.google_Common2D);
    }
}(this, function (d3, Common2D) {
    /**
     * @class google_Pie
     * @extends google_Common2D
     */
    function Pie() {
        Common2D.call(this);
        /**
         * Specifies the widget type of the google Widget/HPCC Widget.
         * @member {string} _chartType
         * @memberof google_Pie
         * @private
         */
        this._chartType = "PieChart";
    }
    Pie.prototype = Object.create(Common2D.prototype);
    Pie.prototype.constructor = Pie;

    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof google_Pie
     * @private
     */
    Pie.prototype._class += " google_Pie";

    Pie.prototype.publish("is3D", false, "boolean", "Enable 3D",null,{tags:["Basic","Shared"]});

    Pie.prototype.publish("pieHole", 0, "number", "Pie Hole Size",null,{min:0,max:0.9,step:0.1,tags:["Intermediate"]});
    Pie.prototype.publish("pieStartAngle", 0, "number", "Pie Start Angle",null,{tags:["Advanced"]});

    Pie.prototype.publish("pieSliceText", "percentage", "set", "The Content of The Text Displayed On The Slice" ,["none","label","value","percentage"],{tags:["Basic"]});
    Pie.prototype.publish("pieSliceFontColor", null, "html-color", "Specifies The Slice Text Style (Color)",null,{tags:["Basic"]});
    Pie.prototype.publish("pieSliceFontFamily", null, "string", "Specifies The Slice Text Style (Font Name)",null,{tags:["Basic"]});
    Pie.prototype.publish("pieSliceFontSize", null, "number", "Specifies The Slice Text Style (Font Size)",null,{tags:["Basic"]});

    Pie.prototype.publish("pieSliceBorderColor", null, "html-color", "The Color of The Slice Borders",null,{tags:["Intermediate"]});
    Pie.prototype.publish("pieResidueSliceColor", null, "html-color", "Color For The Combination Slice That Holds All Slices Below SliceVisibilityThreshold",null,{tags:["Advanced"]});
    Pie.prototype.publish("pieResidueSliceLabel", "Other", "string", "A Label For The combination Slice That Holds All Slices Below SliceVisibilityThreshold",null,{tags:["Advanced"]});

    Pie.prototype.publish("sliceVisibilityThreshold", 1/720, "number", "The slice relative part, below which a slice will not show individually.",null,{tags:["Advanced"]});

    Pie.prototype.publish("slicesOffset", [], "array", "Per Slice Offset",null,{tags:["Advanced"]});
    Pie.prototype.publish("slicesTextStyle", [], "array", "Per Slice",null,{tags:["Private"]}); // overrides pieSliceTextStyle
    Pie.prototype.publish("slicesColor", [], "array", "Per Slice Color",null,{tags:["Private"]});

    /**
     * Builds and returns a google configuration object based on publish param values.
     * @method getChartOptions
     * @memberof google_Pie
     * @instance
     * @private
     * @returns {Object}
     */
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
            color: this.pieSliceFontColor(),
            fontName: this.pieSliceFontFamily(),
            fontSize: this.pieSliceFontSize()
        };
        retVal.pieSliceBorderColor = this.pieSliceBorderColor();
        retVal.pieResidueSliceColor = this.pieResidueSliceColor();
        retVal.pieResidueSliceLabel = this.pieResidueSliceLabel();
        retVal.sliceVisibilityThreshold = this.sliceVisibilityThreshold();

        retVal.slices = initSlices(this.getNumSlices());

        this.slicesColor().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==="undefined") {
               retVal.slices[i] = {};
            }
            retVal.slices[i].color = d;
        });
        this.slicesOffset().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==="undefined") {
               retVal.slices[i] = {};
            }
            retVal.slices[i].offset = d;
        });
        this.slicesTextStyle().forEach(function(d,i) {
            if (typeof(retVal.slices[i])==="undefined") {
               retVal.slices[i] = {};
            }
            retVal.slices[i].textStyle = d;
        });
        return retVal;
    };

    //TODO
    Pie.prototype.getNumSlices = function () {
        return this.data().length;
    };

    /**
     * Initializes empty object(s) for Pie slices.
     * @method initSlices
     * @memberof google_Pie
     * @instance
     * @protected
     * @param {Number} num Number of series.
     * @returns {Array}
     */
    function initSlices(num) {
        var slices = [];
        for (var i = 0; i < num; i++) {
            slices.push({});
        }
        return slices;
    }

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @memberof google_Pie
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Pie.prototype.enter = function (domNode, element) {
        Common2D.prototype.enter.apply(this, arguments);
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof google_Pie
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML/SVG DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    Pie.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
    };

    return Pie;
}));
