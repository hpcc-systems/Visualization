if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Common.js',["d3", "c3", "../common/HTMLWidget", "css!c3"], factory);
    } else {
        root.c3chart_Common = factory(root.d3, root.c3, root.common_HTMLWidget);
    }
}(this, function (d3, c3, HTMLWidget) {
    function Common(target) {
        HTMLWidget.call(this);

        this._tag = "div";
        this._type = "unknown";
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
        this._prevColumnIDs = [];
    }
    Common.prototype = Object.create(HTMLWidget.prototype);
    Common.prototype._class += " c3chart_Common";

    /**
     * Publish Params Common To Other Libraries
     */
    Common.prototype.publish("showLegend", false, "boolean", "Show/Hide Legend",null,{tags:['Basic','Shared']});
    Common.prototype.publish("legendFontColor", null, "html-color", "Legend Font Color",null,{tags:['Intermediate','Shared']});
    Common.prototype.publish("legendFontSize", null, "number", "Legend Font Size",null,{tags:['Intermediate','Shared']});
    Common.prototype.publish("legendFontFamily", null, "string", "Legend Font Name",null,{tags:['Private','Shared']});
    Common.prototype.publish("legendFontBold", false, "boolean", "Legend Font Bold",null,{tags:['Private','Shared']});
    Common.prototype.publish("legendFontItalic", false, "boolean", "Legend Font Italic",null,{tags:['Private','Shared']});

    Common.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    Common.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared','Shared']});
    Common.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});
    /**
     * Publish Params Unique To This Widget
     */
    Common.prototype.publish("legendPosition", "right", "set", "Legend Position", ["bottom", "right"],{tags:['Intermediate']});
    Common.prototype.publish("animationDuration", 0, "number", "Animation Duration",null,{tags:['Advanced']});

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
            });
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
        this._config.transition = {
            duration: this.animationDuration()
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

        var options = this.getChartOptions();
        var columnIDs = options.columns.map(function (row) { return row[0]; });
        options.unload = this._prevColumnIDs.filter(function (i) { return columnIDs.indexOf(i) < 0; });
        this.c3Chart.load(options);
        this._prevColumnIDs = columnIDs;

        element.selectAll(".c3 text")
                .style({
                    "stroke": this.fontColor(),
                    "fill": this.fontColor(),
                    "font-size": this.fontSize()+"px",
                    "font-family": this.fontFamily(),
                })
                .attr("font-family",this.fontFamily());

        element.selectAll(".c3 .c3-legend-item text")
                .style({
                    "fill": this.legendFontColor(),
                    "font-size": this.legendFontSize()+"px",
                    "font-family": this.legendFontFamily(),
                    "font-weight": this.legendFontBold() ? "bold" : "normal",
                    "font-style": this.legendFontItalic() ? "italic" : "normal"
                })
                .attr("font-family",this.legendFontFamily());
    };
    
    Common.prototype.getChartOptions = function () {
        return {};
    };

    return Common;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/CommonND.js',["./Common", "../api/INDChart"], factory);
    } else {
        root.c3chart_CommonND = factory(root.c3chart_Common, root.api_INDChart);
    }
}(this, function (Common, INDChart) {
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
    CommonND.prototype._class += " c3chart_CommonND";
    CommonND.prototype.implements(INDChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    CommonND.prototype.publish("paletteID", "default", "set", "Palette ID", CommonND.prototype._palette.switch(), {tags:['Basic','Shared']});

    CommonND.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width",null,{tags:['Intermediate','Shared']});

    CommonND.prototype.publish("xAxisBaselineColor", null, "html-color", "X Axis Baseline Color",null,{tags:['Basic','Shared']});
    CommonND.prototype.publish("yAxisBaselineColor", null, "html-color", "Y Axis Baseline Color",null,{tags:['Basic','Shared']});

    CommonND.prototype.publish("xAxisFontColor", null, "html-color", "X Axis Text Font Color",null,{tags:['Basic','Shared']});
    CommonND.prototype.publish("yAxisFontColor", null, "html-color", "Y Axis Text Font Color",null,{tags:['Basic','Shared']});

    CommonND.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size",null,{tags:['Basic','Shared']});
    CommonND.prototype.publish("axisFontFamily", null, "string", "X/Y Axis Text Font Name",null,{tags:['Basic','Shared']});

    CommonND.prototype.publish("xAxisLabelRotation", 0, "number", "X Axis Label Angle",null,{tags:['Intermediate','Shared']});

    CommonND.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:['Intermediate','Shared']});
    CommonND.prototype.publish("xAxisTitle", "", "string", "X-Axis Title",null,{tags:['Intermediate','Shared']});

    CommonND.prototype.publish("xAxisTitleFontColor", null, "html-color", "Horizontal Axis Title Text Style (Color)",null,{tags:['Advanced','Shared']});
    CommonND.prototype.publish("xAxisTitleFontFamily", null, "string", "Horizontal Axis Title Text Style (Font Name)",null,{tags:['Advanced','Shared']});
    CommonND.prototype.publish("xAxisTitleFontSize", null, "number", "Horizontal Axis Title Text Style (Font Size)",null,{tags:['Advanced','Shared']});

    CommonND.prototype.publish("yAxisTitleFontColor", null, "html-color", "Vertical Axis Title Text Style (Color)",null,{tags:['Advanced','Shared']});
    CommonND.prototype.publish("yAxisTitleFontFamily", null, "string", "Vertical Axis Title Text Style (Font Name)",null,{tags:['Advanced','Shared']});
    CommonND.prototype.publish("yAxisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:['Advanced','Shared']});

    /**
     * Publish Params Unique To This Library
     */
    CommonND.prototype.publish("xAxisType", "category", "set", "X-Axis Type", ["category", "timeseries", "indexed"],{tags:['Intermediate']});
    CommonND.prototype.publish("subchart", false, "boolean", "Show SubChart",null,{tags:['Private']});

    CommonND.prototype.publish("showXGrid", false, "boolean", "Show X Grid",null,{tags:['Intermediate']});
    CommonND.prototype.publish("showYGrid", false, "boolean", "Show Y Grid",null,{tags:['Intermediate']});

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
                position: 'outer-center'
            }
        };
        this._config.axis.y = {
            label:{
                text: this.yAxisTitle(),
                position: 'outer-center'
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
                format: '%d %b %Y'
            };
            break;
        }

        Common.prototype.enter.apply(this, arguments);
    };

    CommonND.prototype.update = function (domNode, element) {
        Common.prototype.update.apply(this, arguments);

        this._palette = this._palette.switch(this.paletteID());
        element.selectAll(".c3 svg").style({ "font-size": this.axisFontSize()+"px" });
        element.selectAll(".c3 svg text").style({ "font-family": this.axisFontFamily() });

        element.selectAll(".c3 .c3-axis.c3-axis-x text").style({ "fill": this.xAxisFontColor() });
        element.selectAll(".c3 .c3-axis.c3-axis-y text").style({ "fill": this.yAxisFontColor() });

        element.selectAll(".c3 .c3-axis path").style({ "stroke-width": this.axisLineWidth()+"px" });
        element.selectAll(".c3 .c3-axis-x path, .c3 .c3-axis-x line").style({ "stroke": this.xAxisBaselineColor() });
        element.selectAll(".c3 .c3-axis-y path, .c3 .c3-axis-y line").style({ "stroke": this.yAxisBaselineColor() });

        element.selectAll(".c3-axis-x-label").style({
            "font-family": this.xAxisTitleFontFamily(),
            //"font-weight": '',
            "font-size": this.xAxisTitleFontSize(),
            "stroke": this.xAxisTitleFontColor()
        });
        element.selectAll(".c3-axis-y-label").style({
            "font-family": this.yAxisTitleFontFamily(),
            //"font-weight": '',
            "font-size": this.yAxisTitleFontSize(),
            "stroke": this.yAxisTitleFontColor()
        });
    };

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


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Area.js',["./CommonND"], factory);
    } else {
        root.c3chart_Area = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Area(target) {
        CommonND.call(this);

        this._type = "area";
    }
    Area.prototype = Object.create(CommonND.prototype);
    Area.prototype._class += " c3chart_Area";

    /**
     * Publish Params Common To Other Libraries
     */
    Area.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:['Basic','Shared']});
    Area.prototype.publish("lineWidth", 1.0, "number", "Line Width",null,{tags:['Basic','Shared']});
    Area.prototype.publish("lineDashStyle", [], "array", "Dashed Lines",null,{tags:['Basic','Shared']});
    Area.prototype.publish("lineOpacity", 1.0, "number", "Line Alpha",null,{tags:['Basic','Shared']});
    Area.prototype.publish("fillOpacity", 0.2, "number", "Opacity of The Fill Color",null,{tags:['Basic','Exp','Shared']});

    /**
     * Publish Params Unique To This Library
     */

    Area.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };
    
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


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Column.js',["./CommonND"], factory);
    } else {
        root.c3chart_Column = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Column(target) {
        CommonND.call(this);

        this._type = "bar";
    }
    Column.prototype = Object.create(CommonND.prototype);
    Column.prototype._class += " c3chart_Column";

    /**
     * Publish Params Common To Other Libraries
     */
    Column.prototype.publish("isStacked", false, "boolean", "Stack Chart",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */   

    Column.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };

    Column.prototype.update = function (domNode, element) {
        CommonND.prototype.update.apply(this, arguments);

        if (this.isStacked()) {
            this.c3Chart.groups([this._columns.slice(1, this._columns.length)]);
        } else {
            this.c3Chart.groups([]);
        }
    };

    return Column;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Bar.js',["./Column"], factory);
    } else {
        root.c3chart_Bar = factory(root.c3chart_Column);
    }
}(this, function (Column) {
    function Bar(target) {
        Column.call(this);

        this._config.axis.rotated = true;
    }

    /**
     * Publish Params Common To Other Libraries
     */

    /**
     * Publish Params Unique To This Widget
     */   
    
    Bar.prototype = Object.create(Column.prototype);
    Bar.prototype._class += " c3chart_Bar";

    return Bar;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Common1D',["./Common", "../api/I1DChart"], factory);
    } else {
        root.c3chart_Common1D = factory(root.c3chart_Common, root.api_I1DChart);
    }
}(this, function (Common, I1DChart) {
    function Common1D(target) {
        Common.call(this);
        I1DChart.call(this);

        var context = this;
        this._config.color = {
            pattern: this._palette.colors()
        };

        this._config.data.onclick = function (d, element) {
            context.click(context.rowToObj(context._data[d.i1Dex]), d.id);
        };
        this._config.data.color = function (color, d) {
            return context._palette(d.id ? d.id : d);
        };
    }
    Common1D.prototype = Object.create(Common.prototype);
    Common1D.prototype._class += " c3chart_Common1D";
    Common1D.prototype.implements(I1DChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Common1D.prototype.publish("paletteID", "default", "set", "Palette ID", Common1D.prototype._palette.switch(), {tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */

    Common1D.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        Common.prototype.update.apply(this, arguments);
    };

    return Common1D;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Common2D',["./Common", "../api/I2DChart"], factory);
    } else {
        root.c3chart_Common2D = factory(root.c3chart_Common, root.api_I2DChart);
    }
}(this, function (Common, I2DChart) {
    function Common2D(target) {
        Common.call(this);
        I2DChart.call(this);

        var context = this;
        this._config.color = {
            pattern: this._palette.colors()
        };

        this._config.data.onclick = function (d, element) {
            context.click(context.rowToObj(context._data[d.index]), context._columns[1]);
        };
        this._config.data.color = function (color, d) {
            return context._palette(d.id ? d.id : d);
        };
    }
    Common2D.prototype = Object.create(Common.prototype);
    Common2D.prototype._class += " c3chart_Common2D";
    Common2D.prototype.implements(I2DChart.prototype);

    /**
     * Publish Params Common To Other Libraries
     */
    Common2D.prototype.publish("paletteID", "default", "set", "Palette ID", Common2D.prototype._palette.switch(), {tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */

    Common2D.prototype.update = function (domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        Common.prototype.update.apply(this, arguments);
    };

    return Common2D;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Donut.js',["./Common2D"], factory);
    } else {
        root.c3chart_Donut = factory(root.c3chart_Common2D);
    }
}(this, function (Common2D) {
    function Donut(target) {
        Common2D.call(this);

        this._type = "donut";
    }
    Donut.prototype = Object.create(Common2D.prototype);
    Donut.prototype._class += " c3chart_Donut";

    /**
     * Publish Params Common To Other Libraries
     */

    /**
     * Publish Params Unique To This Widget
     */   
    Donut.prototype.publish("showLabel", true, "boolean", "Show Label",null,{tags:['Basic']});
    //Donut.prototype.publish("labelFormat", null, "function", "???",null,{tags:['Intermediate']});
    //Donut.prototype.publish("labelThreshold", 0.05, "number", "???",null,{tags:['Intermediate']});
    Donut.prototype.publish("arcWidth", 45, "number", "Arc Width",null,{tags:['Basic']});
    Donut.prototype.publish("expand", true, "boolean", "Arc Explode",null,{tags:['Intermediate']});
    Donut.prototype.publish("title", "xxx", "string", "Center Label",null,{tags:['Intermediate']});

    Donut.prototype.enter = function (domNode, element) {
        this._config.donut = {
            label_show: this.showLabel(),
            width: this.arcWidth(),
            expand: this.expand(),
            title: this.title()
        };

        Common2D.prototype.enter.apply(this, arguments);
    };

    Donut.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);

        this.c3Chart.internal.config.donut_label_show = this.showLabel();
//        this.c3Chart.internal.config.donut_label_format = this.high();
//        this.c3Chart.internal.config.donut_label_threshold = this.showValueLabel() ? this.columns() : "";
        this.c3Chart.internal.config.donut_width = this.arcWidth();
        this.c3Chart.internal.config.donut_expand = this.expand();
        this.c3Chart.internal.config.donut_title = this.title();
    };

    Donut.prototype.getChartOptions = function () {
        var chartOptions = Common2D.prototype.getChartOptions.apply(this, arguments);

        var data = this._data.map(function (row, idx) {
            return [row[0], row[1]];
        }, this);

        chartOptions.columns = data;

        return chartOptions;
    };

    return Donut;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Gauge.js',["./Common1D"], factory);
    } else {
        root.c3chart_Gauge = factory(root.c3chart_Common1D);
    }
}(this, function (Common1D) {
    function Gauge(target) {
        Common1D.call(this);

        this._type = "gauge";

        var context = this;
        this._config.data.onclick = function (d, element) {
            var clickEvent = {};
            clickEvent[d.id] = d.value;
            context.click(clickEvent, d.id);
        };
        this._config.data.color = function (color, d) {
            return context._palette(context._data, context.low(), context.high());
        };
    }
    Gauge.prototype = Object.create(Common1D.prototype);
    Gauge.prototype._class += " c3chart_Gauge";

    /**
     * Publish Params Common To Other Libraries
     */
    Gauge.prototype.publish("low", 0, "number", "Gauge Lower Bound",null,{tags:['Intermediate','Shared']});
    Gauge.prototype.publish("high", 100, "number", "Gauge Higher Bound",null,{tags:['Intermediate','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Gauge.prototype.publish("valueFormat", "Percent", "set", "Value Display Format", ["Percent", "Value"],{tags:['Basic']});
    Gauge.prototype.publish("arcWidth", 10, "number", "Gauge Width of Arc",null,{tags:['Basic']});
    Gauge.prototype.publish("showLabels", true, "boolean", "Show Labels",null,{tags:['Basic']});
    Gauge.prototype.publish("showValueLabel", true, "boolean", "Show Value Label",null,{tags:['Basic']});

    Gauge.prototype.update = function (domNode, element) {
        this.c3Chart.internal.config.gauge_min = this.low();
        this.c3Chart.internal.config.gauge_max = this.high();
        this.c3Chart.internal.config.gauge_units = this.showValueLabel() ? this.columns() : "";
        this.c3Chart.internal.config.gauge_width = this.arcWidth();
        this.c3Chart.internal.config.gauge_label_format = this.valueFormat() === "Percent" ? null : function (value, ratio) { return value; };
        this.c3Chart.internal.config.gauge_label_show = this.showLabels();
        Common1D.prototype.update.apply(this, arguments);
    };

    Gauge.prototype.getChartOptions = function () {
        var chartOptions = Common1D.prototype.getChartOptions.apply(this, arguments);

        chartOptions.columns = [[this._columns, this._data]];

        return chartOptions;
    };

    return Gauge;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Line.js',["./CommonND"], factory);
    } else {
        root.c3chart_Line = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Line(target) {
        CommonND.call(this);

        this._type = "line";
    }
    Line.prototype = Object.create(CommonND.prototype);
    Line.prototype._class += " c3chart_Line";

    /**
     * Publish Params Common To Other Libraries
     */
    Line.prototype.publish("lineWidth", 1.0, "number", "Line Width",null,{tags:['Basic','Shared']});
    Line.prototype.publish("lineDashStyle", [], "array", "Dashed Lines",null,{tags:['Basic','Shared']});
    Line.prototype.publish("lineOpacity", 1.0, "number", "Line Alpha",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */

    Line.prototype.enter = function (domNode, element) {
        CommonND.prototype.enter.apply(this, arguments);
    };
    

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


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Pie.js',["./Common2D"], factory);
    } else {
        root.c3chart_Pie = factory(root.c3chart_Common2D);
    }
}(this, function (Common2D) {
    function Pie(target) {
        Common2D.call(this);

        this._type = "pie";
    }
    Pie.prototype = Object.create(Common2D.prototype);
    Pie.prototype._class += " c3chart_Pie";

    /**
     * Publish Params Common To Other Libraries
     */

    /**
     * Publish Params Unique To This Widget
     */   
    
    Pie.prototype.update = function (domNode, element) {
        Common2D.prototype.update.apply(this, arguments);
    };

    Pie.prototype.getChartOptions = function () {
        var chartOptions = Common2D.prototype.getChartOptions.apply(this, arguments);

        var data = this._data.map(function (row, idx) {
            return [row[0], row[1]];
        }, this);

        chartOptions.columns = data;

        return chartOptions;
    };

    return Pie;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Scatter.js',["./CommonND"], factory);
    } else {
        root.c3chart_Scatter = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Scatter(target) {
        CommonND.call(this);

        this._type = "scatter";
    }
    
    /**
     * Publish Params Common To Other Libraries
     */

    /**
     * Publish Params Unique To This Widget
     */   

    Scatter.prototype = Object.create(CommonND.prototype);
    Scatter.prototype._class += " c3chart_Scatter";

    return Scatter;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('c3chart/Step.js',["./CommonND"], factory);
    } else {
        root.c3chart_Step = factory(root.c3chart_CommonND);
    }
}(this, function (CommonND) {
    function Step(target) {
        CommonND.call(this);

        this._type = "step";
    }

    /**
     * Publish Params Common To Other Libraries
     */

    /**
     * Publish Params Unique To This Widget
     */   
    
    Step.prototype = Object.create(CommonND.prototype);
    Step.prototype._class += " c3chart_Step";

    return Step;
}));

