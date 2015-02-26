"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../common/HTMLWidget", "../chart/I2DChart", "goog!visualization,1,packages:[corechart]"], factory);
    } else {
        root.Common = factory(root.d3, root.HTMLWidget, root.I2DChart);
    }
}(this, function (d3, HTMLWidget, I2DChart) {

    function Common(tget) {
        HTMLWidget.call(this);
        I2DChart.call(this);
        this._class = "google_Common";

        this._tag = "div";

        this.columns([]);
        this.data([]);
        this._data_google = [];
    };
    Common.prototype = Object.create(HTMLWidget.prototype);
    Common.prototype.implements(I2DChart.prototype);

    Common.prototype.publish("paletteID", "default", "set", "Palette ID", Common.prototype._palette.switch());

    Common.prototype.publish("legendShow", true, "boolean", "Show Legend");
    Common.prototype.publish("legendAlignment", "center", "set", "Legend Alignment", ["", "start", "center", "end"]);
    Common.prototype.publish("legendPosition", "right", "set", "Legend Position", ["", "bottom", "labeled", "left", "right", "top"]);
    Common.prototype.publish("legendFontColor", "#000", "html-color", "Legend Font Color");
    Common.prototype.publish("legendFontName", null, "string", "Legend Font Name");
    Common.prototype.publish("legendFontSize", null, "number", "Legend Font Size");
    Common.prototype.publish("legendFontBold", false, "boolean", "Legend Font Bold");
    Common.prototype.publish("legendFontItalic", false, "boolean", "Legend Font Italic");

    Common.prototype.publish("chartAreaWidth", "80%", "string", "Chart Area Width");
    Common.prototype.publish("chartAreaHeight", "80%", "string", "Chart Area Height");


    Common.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        
        this._palette = this._palette.switch(this._paletteID);
    }
    
    Common.prototype.data = function (_) {
        var retVal = HTMLWidget.prototype.data.apply(this, arguments);
        if (arguments.length) {
            var data = null;
            if (this._data.length) {
                data = [this._columns].concat(this._data);
            } else {
                data = [
                    ['', { role: 'annotation' }],
                    ['', '']      
                ];
            }
            this._data_google = google.visualization.arrayToDataTable(data);
        }
        return retVal;
    };

    Common.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var colors = this._columns.filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        this._chartOptions = {
            backgroundColor: "none",
            width: this.width(),
            height: this.height(),
            colors: colors,
            chartArea: {
                width: this._chartAreaWidth,
                height: this._chartAreaHeight
            },
            legend: {
                alignment: this._legendAlignment,
                position: this._legendShow ? this._legendPosition : "none",
                maxLines: 2,
                textStyle: {
                    color: this._legendFontColor,
                    fontName: this._legendFontName,
                    fontSize: this._legendFontSize,
                    bold: this._legendFontBold,
                    italic: this._legendFontItalic,
                }
            },
        };
    }

    return Common;
}));
