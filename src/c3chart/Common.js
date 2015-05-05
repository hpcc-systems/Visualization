"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "c3", "../common/HTMLWidget", "css!./common"], factory);
    } else {
        root.c3chart_Common = factory(root.d3, root.c3, root.common_HTMLWidget);
    }
}(this, function (d3, c3, HTMLWidget) {
    function Common(target) {
        HTMLWidget.call(this);

        this._tag = "div";
        this._class = "c3chart_Common";
        this._type = "unknown";
        var context = this;
        this._config = {
            axis: {
            },
            legend: {
                position: 'bottom',
                show: true
            },
            data: {
                columns: [],
                rows: []
            }
        };
    };
    Common.prototype = Object.create(HTMLWidget.prototype);

    Common.prototype.publish("legendPosition", "right", "set", "Legend Position", ["bottom", "right"]);
    Common.prototype.publish("fontSize", 10, "number", "Font Size");
    Common.prototype.publish("fontName", "sans-serif", "string", "Font Name");
    Common.prototype.publish("fontColor", "#000", "html-color", "Font Color");
    Common.prototype.publish("legendFontColor", "#000", "html-color", "Font Color");
    Common.prototype.publish("legendFontSize", 10, "number", "Font Size");
    Common.prototype.publish("showLegend", true, "boolean", "Show/Hide Legend");

    Common.prototype.type = function (_) {
        if (!arguments.length) return this._type;
        this._type = _;
        return this;
    };

    Common.prototype.getC3Series = function() {
        return this._columns.filter(function (d, i) { return i > 0;});
    };

    Common.prototype.getC3Rows = function () {
        var retVal = [this._columns.filter(function (item, idx) { return idx > 0; })].concat(this._data.map(function (row) {
            return row.filter(function (cell, idx) {
                return idx > 0;
            })
        }));
        return retVal;
    };

    Common.prototype.getC3Categories = function () {
        var retVal = this._data.map(function (row, idx) { return row[0]; });
        return retVal;
    };

    Common.prototype.getC3Column = function (colNum) {
        var retVal = [this._columns[colNum]].concat(this._data.map(function (row, idx) { return row[colNum]; }));
        return retVal;
    };

    Common.prototype.getC3Columns = function (total) {
        if (!this._data.length) {
            return [];
        }
        total = total || this._columns.length;
        var retVal = [];
        for (var i = 1; i < total; ++i) {
            retVal.push(this.getC3Column(i));
        }
        return retVal;
    };

    Common.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        element.style("overflow", "hidden");

        this._config.size = {
            width: this.width(),
            height: this.height()
        };
        this._config.data.type = this._type;
        if (this._type !== "gauge") {
            this._config.legend = {
                position: this.legendPosition()
            };
        }
        this._config.bindto = element.append("div").datum(null);
        this.c3Chart = c3.generate(this._config);
    };

    Common.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        if (this.showLegend()) {
            this.c3Chart.legend.show();
        } else {
            this.c3Chart.legend.hide();
        }

        this.c3Chart.resize({
            width: this.width(),
            height: this.height()
        });

    };
    
    Common.prototype.updateStyles = function(element) {
        this.updateStyle(element,".c3 svg","font-size",this.fontSize()+"px");
        this.updateStyle(element,".c3 svg text","font-family",this.fontName());

        this.updateStyle(element,".c3 .c3-legend-item text","fill",this.legendFontColor());
        this.updateStyle(element,".c3-legend-item","font-size",this.legendFontSize()+"px");
    }

    Common.prototype.updateStyle = function(element,selector,property,value) {
        element.selectAll(selector).style(property,value);
    }

    return Common;
}));
