/**
 * @file c3 Chart CommonND
 * @author HPCC Systems
 */

"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["./Common", "../api/INDChart"], factory);
    } else {
        root.c3chart_CommonND = factory(root.c3chart_Common, root.api_INDChart);
    }
}(this, function (Common, INDChart) {
    /**
     * @class c3chart_CommonND
     * @abstract
     * @extends c3chart_Common
     * @implements api_INDChart
     * @noinit
     */
    function CommonND(target) {
        Common.call(this);
        INDChart.call(this);

        var context = this;
        this._config.color = {
            pattern: this._palette.colors()
        };

        this._config.data.onclick = function (d, element) {
            context.click(context.rowToObj(context._data[d.index]), d.id);
        };
        this._config.data.color = function (color, d) {
            return context._palette(d.id ? d.id : d);
        };
    }
    CommonND.prototype = Object.create(Common.prototype);
    CommonND.prototype.constructor = CommonND;
    /**
     * Specifies the class name of the container.
     * @member {string} _class
     * @memberof c3chart_CommonND
     * @private
     */
    CommonND.prototype._class += " c3chart_CommonND";
    CommonND.prototype.implements(INDChart.prototype);

    CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch(), {tags:["Basic","Shared"]});

    CommonND.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width",null,{tags:["Intermediate","Shared"]});

    CommonND.prototype.publish("xAxisBaselineColor", null, "html-color", "X Axis Baseline Color",null,{tags:["Basic","Shared"]});
    CommonND.prototype.publish("yAxisBaselineColor", null, "html-color", "Y Axis Baseline Color",null,{tags:["Basic","Shared"]});

    CommonND.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:["Basic","Shared"]});
    CommonND.prototype.publish("yAxisFontColor", null, "html-color", "Y Axis Text Font Color",null,{tags:["Basic","Shared"]});

    CommonND.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size",null,{tags:["Basic","Shared"]});
    CommonND.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Text Font Name",null,{tags:["Basic","Shared"]});

    CommonND.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:["Intermediate","Shared"]});

    CommonND.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:["Intermediate","Shared"]});
    CommonND.prototype.publish("xAxisTitle", "", "string", "X-Axis Title",null,{tags:["Intermediate","Shared"]});

    CommonND.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:["Advanced","Shared"]});
    CommonND.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:["Advanced","Shared"]});
    CommonND.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Title Text Style (Font Size)",null,{tags:["Advanced","Shared"]});

    CommonND.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:["Advanced","Shared"]});
    CommonND.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:["Advanced","Shared"]});
    CommonND.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:["Advanced","Shared"]});

    CommonND.prototype.publish("xAxisType", "category", "set", "X-Axis Type", ["category", "timeseries", "indexed"],{tags:["Intermediate"]});
    CommonND.prototype.publish("subchart", false, "boolean", "Show SubChart",null,{tags:["Private"]});

    CommonND.prototype.publish("showXGrid", false, "boolean", "Show X Grid",null,{tags:["Intermediate"]});
    CommonND.prototype.publish("showYGrid", false, "boolean", "Show Y Grid",null,{tags:["Intermediate"]});

    CommonND.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @private
     * @memberof c3chart_CommonND
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    CommonND.prototype.enter = function (domNode, element) {
        if (this.subchart()) {
            this._config.subchart = {
                show: true, size: {
                    height: 20
                }
            };
        }

        this._config.axis.x = {
            type: this.xAxisType(),
            tick: {
                rotate: this.xAxisLabelRotation(),
                multiline: false
            },
            label:{
                text: this.xAxisTitle(),
                position: "outer-center"
            }
        };
        this._config.axis.y = {
            label:{
                text: this.yAxisTitle(),
                position: "outer-center"
            }
        };
        this._config.grid = {
            x: {
                show: this.showXGrid(),
            },
            y: {
                show: this.showYGrid(),
            }
        };

        switch (this.xAxisType()) {
        case "category":
            this._config.axis.tick = {
                centered: true,
                multiline: false
            };
            break;
        case "timeseries":
            this._config.data.x = this._columns[0];
            this._config.axis.tick = {
                format: "%d %b %Y"
            };
            break;
        }

        Common.prototype.enter.apply(this, arguments);
    };

    /**
     * The function that is called when this widget "enters" the web page. after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof c3chart_CommonND
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    CommonND.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        element.selectAll(".c3 svg").style({ "font-size": this.axisFontSize()+"px" });
        element.selectAll(".c3 svg text").style({ "font-family": this.axisFontFamily() });

        element.selectAll(".c3 .c3-axis.c3-axis-x text").style({ "fill": this.xAxisFontColor() });
        element.selectAll(".c3 .c3-axis.c3-axis-y text").style({ "fill": this.yAxisFontColor() });

        element.selectAll(".c3 .c3-axis path").style({ "stroke-width": this.axisLineWidth()+"px" });
        element.selectAll(".c3 .c3-axis-x path, .c3 .c3-axis-x line").style({ "stroke": this.xAxisBaselineColor() });
        element.selectAll(".c3 .c3-axis-y path, .c3 .c3-axis-y line").style({ "stroke": this.yAxisBaselineColor() });

        element.selectAll(".c3-axis-x-label").style({
            "font-family": this.xAxisTitleFontFamily(),
            //"font-weight": "",
            "font-size": this.xAxisTitleFontSize(),
            "stroke": this.xAxisTitleFontColor()
        });
        element.selectAll(".c3-axis-y-label").style({
            "font-family": this.yAxisTitleFontFamily(),
            //"font-weight": "",
            "font-size": this.yAxisTitleFontSize(),
            "stroke": this.yAxisTitleFontColor()
        });
    };

    /**
     * Builds and returns an c3chart configuration Object based on publish param values.
     * @method getChartOptions
     * @memberof c3chart_CommonND
     * @instance
     * @private
     * @returns {Object}
     */
    CommonND.prototype.getChartOptions = function () {
        var chartOptions = Common.prototype.getChartOptions.apply(this, arguments);

        switch (this.xAxisType()) {
            case "category":
                chartOptions.categories = this.getC3Categories();
                chartOptions.columns = this.getC3Columns();
                break;
            case "indexed":
            case "timeseries":
                chartOptions.columns = this.getC3Columns();
                break;
        }

        return chartOptions;
    };

    return CommonND;
}));
