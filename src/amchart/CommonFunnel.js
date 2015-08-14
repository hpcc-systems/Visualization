/**
 * @file AmChart CommonFunnel
 * @author HPCC Systems
 */

"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.funnel", "require"], factory);
    } else {
        root.amchart_CommonFunnel = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require);
    }
}(this, function(d3, HTMLWidget, AmCharts, require) {
    /**
     * @class amchart_CommonFunnel
     * @abstract
     * @extends common_HTMLWidget
     * @noinit
     */
    function CommonFunnel() {
        HTMLWidget.call(this);
        /**
         * Specifies the HTML tag type of the container.
         * @member {string} _tag
         * @memberof amchart_CommonFunnel
         * @private
         */
        this._tag = "div";

        /**
         * AmChart widget/chart object.
         * @member {Object} _chart
         * @memberof amchart_CommonFunnel
         * @private
         */
        this._chart = {};
    }
    CommonFunnel.prototype = Object.create(HTMLWidget.prototype);
    CommonFunnel.prototype.constructor = CommonFunnel;
    CommonFunnel.prototype._class += " amchart_CommonFunnel";

    CommonFunnel.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:["Basic","Shared"]});
    CommonFunnel.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:["Basic","Shared"]});
    CommonFunnel.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    CommonFunnel.prototype.publish("flip", true, "boolean", "Flip Chart",null,{tags:["Intermediate"]});
    CommonFunnel.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting",null,{tags:["Intermediate"]});

    CommonFunnel.prototype.publish("marginLeft", 0, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    CommonFunnel.prototype.publish("marginRight", 0, "number", "Margin (Right)",null,{tags:["Intermediate"]});

    CommonFunnel.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    CommonFunnel.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    CommonFunnel.prototype.publish("labelPosition", "center", "set", "Label Position", ["left","right","center"],{tags:["Intermediate"]});

    CommonFunnel.prototype.publish("showScrollbar", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate"]});

    CommonFunnel.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)",null,{tags:["Private"]});

    CommonFunnel.prototype.publish("Depth3D", 0, "number", "3D Depth (px)",null,{tags:["Basic"]});
    CommonFunnel.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)",null,{tags:["Basic"]});

    CommonFunnel.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    /**
     * Updates underlying AmChart widget object, with options from publish parameters.
     * @method updateChartOptions
     * @memberof amchart_CommonFunnel
     * @instance
     * @private
     * @returns {Object}
     */
    CommonFunnel.prototype.updateChartOptions = function() {

        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.flip();

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.labelPosition = this.labelPosition();

        this.titles = [];
        this.baloon = {};

        this._chart.titleField = this._columns[0];
        this._chart.valueField = this._columns[1];

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();

        var sortingMethod = function(a,b){ return a[1] > b[1] ? 1 : -1; };
        if(this.reverseDataSorting()){
            sortingMethod = function(a,b){ return a[1] < b[1] ? 1 : -1; };
        }
        this._data = this._data.sort(sortingMethod);

        // DataProvider
        this._chart.dataProvider = this.formatData(this._data);

        // Color Palette
        this._chart.colors = this._data.map(function (row) {
            return this._palette(row[0]);
        }, this);

        // Scroll Bar
        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    /**
     * Formats data passed via data() correctly for AmCharts underlying widget.
     * @method formatData
     * @memberof amchart_CommonFunnel
     * @instance
     * @private
     * @params {Array} dataArr Data array from data() method.
     * @returns {Array}
     */
    CommonFunnel.prototype.formatData = function(dataArr){
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow){
            var dataObj = {};
            context._columns.forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    /**
     * Sets the columns for the data being passed into the widget via .data() method.
     * @method columns
     * @memberof amchart_CommonFunnel
     * @instance
     * @public
     * @param {String[]} _ An array of strings representing the column names for data passed to widget.
     * @returns {Widget}
     * @example widget
     * .columns(["ID", "Year 1", "Year 2"])
     * .data([ [40, 66, 60], [30, 98, 92]  ])
     * .render();
     */
    CommonFunnel.prototype.columns = function(colArr) {
        if (!arguments.length) return this._columns;
        var retVal = HTMLWidget.prototype.columns.apply(this, arguments);
        var context = this;
        if (arguments.length) {
            this._categoryField = colArr[0];
            this._valueField = [];
            colArr.slice(1,colArr.length).forEach(function(col){
                context._valueField.push(col);
            });
            this._columns = colArr;
            return this;
        }
        return retVal;
    };

    /**
     * The function that is called when this widget "enters" the web page.
     * @method enter
     * @protected
     * @instance
     * @memberof amchart_CommonFunnel
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    CommonFunnel.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        var initObj = {
            theme: "none",
            type: "funnel",
            autoResize: true,
            autoMargins: true,
            chartScrollbar: {}
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickSlice", function(e) {
            context.click(context.rowToObj(context._data[e.dataItem.index]));
        });
    };

    /**
     * The function that is called when this widget "enters" the web page, after enter() and everytime the widget is updated with subsequent render calls.
     * @method update
     * @memberof amchart_CommonFunnel
     * @instance
     * @protected
     * @param {HTMLElement} domeNode HTML DOMNode of widget container.
     * @param {D3Selection} element d3 selection object of widget.
     */
    CommonFunnel.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return CommonFunnel;
}));
