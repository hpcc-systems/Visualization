
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/SerialAxis.js',["../api/Axis", "d3"], factory);
    } else {
        root.amchart_SerialAxis = factory(root.amchart_Axis, root.d3);
    }
}(this, function(Axis, d3) {
    function SerialAxis() {
        Axis.call(this);

        this._parser = d3.time.format("%Y-%m-%d").parse;
    }
    SerialAxis.prototype = Object.create(Axis.prototype);
    SerialAxis.prototype.constructor = SerialAxis;
    SerialAxis.prototype._class += " amchart_SerialAxis";

    SerialAxis.prototype.publish("axisFontSize", null, "number", "X/Y Axis Text Font Size",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisBaselineColor", "#000000", "html-color", "X Axis Baseline Color",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisFontColor", "#000000", "html-color", "Horizontal Axis Text Style (Color)",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisTitle", "", "string", "X-Axis Title",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisTitleFontSize", null, "number", "Vertical Axis Title Text Style (Font Size)",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisTitleFontColor", "#000000", "html-color", "Axis Title Text Style (Color)",null,{tags:["Basic","Shared"]});
    SerialAxis.prototype.publish("axisLabelRotation", null, "number", "Axis Label Rotation", null, {min:0,max:90,step:0.1,inputType:"range",tags:["Intermediate","Shared"]});
    SerialAxis.prototype.publish("axisLineWidth", 1, "number", "Axis Line Width",null,{tags:["Intermediate","Shared"]});
    SerialAxis.prototype.publish("axisAlpha", 1, "number", "Axis Alpha",null,{tags:["Intermediate"]});
    SerialAxis.prototype.publish("axisAutoGridCount", true, "boolean", "Specifies Whether Number of GridCount Is Specified Automatically, According To The Axis Size",null,{tags:["Advanced"]});
    SerialAxis.prototype.publish("axisGridPosition", "start", "set", "Specifies If A Grid Line Is Placed On The Center of A Cell or On The Beginning of A Cell", ["start","middle"],{tags:["Advanced"]});
    SerialAxis.prototype.publish("axisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:["Intermediate"]});
    SerialAxis.prototype.publish("axisDashLength", 0, "number", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});
    SerialAxis.prototype.publish("axisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    SerialAxis.prototype.publish("axisFillColor", null, "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    SerialAxis.prototype.publish("axisGridAlpha", 0.0, "number", "Grid alpha.",null,{tags:["Intermediate"]});
    //SerialAxis.prototype.publish("axisMinimum", null, "number", "",null,{tags:["Intermediate"]});

    SerialAxis.prototype.publish("startOnAxis", true, "boolean", "Draw Chart Starting On Axis.",null,{tags:["Intermediate"]});
    SerialAxis.prototype.publish("axisTypeTimePattern", "%Y-%m-%d", "string", "Time Series Pattern");
    SerialAxis.prototype.publish("axisType", "ordinal", "set", "X-Axis Type", ["ordinal", "linear", "time", "pow", "log", "none"]);
    SerialAxis.prototype.publish("axisTickFormat", "", "string", "Y-Axis Tick Format");
    
    SerialAxis.prototype.publish("position", null, "set", "Position of Axis", ["top", "bottom", "left", "right"]);

    var axisTypeTimePattern = SerialAxis.prototype.axisTypeTimePattern;
    SerialAxis.prototype.axisTypeTimePattern = function (_) {
        var retVal = axisTypeTimePattern.apply(this, arguments);
        if (arguments.length) {
            this._parser = d3.time.format(_).parse;
        }
        return retVal;
    };

    return SerialAxis;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/CommonSerial.js',["d3", "../common/HTMLWidget", "amcharts.serial", "require", "../common/Utility", "./SerialAxis"], factory);
    } else {
        root.amchart_CommonSerial = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require, root.common_Utility, root.amchart_SerialAxis);
    }
}(this, function(d3, HTMLWidget, AmCharts, require, Utility, Axis) {
    function CommonSerial() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};

        this._selected = null;
        this._selections = [];

        this._dataUpdated = 0;
        this._prevDataUpdated = -1;
        this._columnsUpdated = 0;
        this._prevColumnsUpdated = -1;

        this._dateParserData = d3.time.format("%Y-%m-%d").parse;
        this._dateParserValue = d3.time.format("%Y-%m-%d").parse;

        this._colorObj = {};
        this._selectionObj = {};
    }
    CommonSerial.prototype = Object.create(HTMLWidget.prototype);

    CommonSerial.prototype.constructor = CommonSerial;
    CommonSerial.prototype._class += " amchart_CommonSerial";

    CommonSerial.prototype.publish("xAxes", [], "propertyArray", "xAxis", null, { max: 1, tags: ["Basic"] }); // max number of xAxes
    CommonSerial.prototype.publish("yAxes", [], "propertyArray", "yAxis", null, { tags: ["Basic"] });
    
    CommonSerial.prototype.publish("fontSize", 11, "number", "Font Size",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    CommonSerial.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("lineWidth", 1, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:"range",tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines",null,{tags:["Basic","Shared"]});
    CommonSerial.prototype.publish("lineOpacity", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Basic","Shared"]});

    CommonSerial.prototype.publish("dashedLineStyle", 0, "number", "Length of Dashed Line. 0 = none",null,{tags:["Advanced","Shared"]});

    CommonSerial.prototype.publish("marginLeft", null, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("marginRight", null, "number", "Margin (Right)",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    CommonSerial.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    CommonSerial.prototype.publish("showScrollbar", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("orientation", "horizontal", "set", "Orientation",["horizontal","vertical"],{tags:["Intermediate"]});

    CommonSerial.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)",null,{tags:["Private"]});
    CommonSerial.prototype.publish("useImgPatterns", false, "boolean", "Enable Image Pattern backgrounds",null,{tags:["Private"]});
    CommonSerial.prototype.publish("imgPatternArr", '["../ampatterns/black/pattern2.png"]', "string", "Background Pattern Images (Not used if '[]')",null,{inputType:"textarea",tags:["Private"]});

    CommonSerial.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("yAxisTickFormat", "s", "string", "Y-Axis Tick Format");
    CommonSerial.prototype.publish("sortDates", false, "boolean", "Sort date field for timeseries data");
    
    CommonSerial.prototype.publish("axisMinPeriod", "MM", "string", "Minimum period when parsing dates");

    //CommonSerial.prototype.publish("balloonType", "amchart", "set", "Balloon Type", ["hpcc", "amchart"]); TODO

    CommonSerial.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});
    CommonSerial.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

    CommonSerial.prototype.publish("showCursor", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("showFirstLabel", true, "boolean", "Show first label",null,{tags:["Intermediate","Shared"]});
    CommonSerial.prototype.publish("showLastLabel", true, "boolean", "Show last label",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("equalSpacing", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]});

    CommonSerial.prototype.publish("paletteGrouping", "By Column", "set", "Palette Grouping",["By Category","By Column"],{tags:["Basic"]});

    CommonSerial.prototype.publish("y2", [], "array", "Columns to associate with second Y-Axis");

    var xAxes = CommonSerial.prototype.xAxes;
    var yAxes = CommonSerial.prototype.yAxes;
    CommonSerial.prototype.Axes = function (type, idx) {
        var axe = type === "x" ? xAxes : yAxes;
        if (idx === undefined) {
            var context = this;
            var axes = axe.call(this);
            axes.forEach(function(axis) {
                axis._context = context;
            });
            return axes;
        }

        var axis;

        axis = axe.call(this)[idx];
        if (axis) {
             axis._context = this;
             return axis;
        }

        axis = new Axis();
        
        var currentAxes = axe.call(this);
        axis._context = this;
        currentAxes.push(axis);
        axe.call(this, currentAxes);
        return axis;
    };

    CommonSerial.prototype.xAxis = function (idx) {
        return this.Axes("x", idx);
    };

    CommonSerial.prototype.yAxis = function (idx) {
        return this.Axes("y", idx);
    };

    CommonSerial.prototype.formatData = function (d) {
        switch (this.xAxis()[0].axisType()) {
            case "time":
                return this.xAxis()[0]._parser(typeof d === "number" ? d.toString() : d);
            default:
                return d;
        }
    };

    CommonSerial.prototype.formatValue = function (d) {
        if (!d) {
            return d;
        }

        // NOT REALLY NEEDED
        if (d instanceof Array) {
            return d.map(function (item) {
                return this.formatValue(item);
            }, this);
        }

        switch (this.yAxis()[0].axisType()) {
            case "time":
                return this.yAxis()[0]._parser(typeof d === "number" ? d.toString() : d);
            default:
                if (typeof d === "string") {
                    return +d;
                }
                return d;
        }
    };

    CommonSerial.prototype.amFormatData = function(dataArr) {
        this._rangeType = null;
        var dataObjArr = [];
        var context = this;

        dataArr.forEach(function(dataRow) {
            var dataObj = {};
            dataRow.forEach(function(cell, cIdx) {
                var colName = context.columns()[cIdx];
                if (cell instanceof Array) {
                    var idx = cIdx - 1;
                    if (cell.length === 2) {
                        dataObj["openField" + idx] = context.formatValue(cell[0]);
                        dataObj["valueField" + idx] = context.formatValue(cell[1]);
                        context._rangeType = "normal";
                    } else {
                        dataObj["lowField" + idx] = context.formatValue(cell[0]);
                        dataObj["openField" + idx] = context.formatValue(cell[1]);
                        dataObj["closeField" + idx] = context.formatValue(cell[2]);
                        dataObj["highField" + idx] = context.formatValue(cell[3]);
                        context._rangeType = "candle-ohlc";
                    }
                } else {
                    if (cIdx === 0) {
                        dataObj[colName] = context.formatData(cell);
                    } else if (cIdx >= context.columns().length) {
                        dataObj[colName] = cell;
                    } else {
                        dataObj[colName] = context.formatValue(cell);
                    }
                }
            });
            dataObjArr.push(dataObj);
        });

        if (this.sortDates()) {
            var sortField = context.columns()[0];
            dataObjArr.sort(function (a, b) {
                return a[sortField] - b[sortField];
            });
        }

        return dataObjArr;
    };

    CommonSerial.prototype.updateChartOptions = function() {
        this._chart.type = "serial";
        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.orientation() === "vertical";

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.categoryAxis = {};
        //this._chart.titles = [];

        var xAxis = this.xAxis()[0];
        xAxis.type("x");

        this._chart.categoryAxis.position =  xAxis.position() ? xAxis.position() : "bottom";
        this._chart.categoryAxis.autoGridCount = xAxis.axisAutoGridCount();
        this._chart.categoryAxis.gridPosition = xAxis.axisGridPosition();
        this._chart.categoryAxis.axisAlpha = xAxis.axisAlpha();
        this._chart.categoryAxis.gridAlpha = xAxis.axisGridAlpha();
        this._chart.categoryAxis.startOnAxis = xAxis.startOnAxis();
        this._chart.categoryAxis.labelRotation = xAxis.axisLabelRotation();
        this._chart.categoryAxis.title = xAxis.axisTitle();

        this._chart.categoryAxis.axisColor = xAxis.axisBaselineColor();
        this._chart.categoryAxis.axisThickness = xAxis.axisLineWidth();
        this._chart.categoryAxis.boldPeriodBeginning = xAxis.axisBoldPeriodBeginning();
        this._chart.categoryAxis.dashLength = xAxis.axisDashLength();
        this._chart.categoryAxis.fillAlpha = xAxis.axisFillAlpha();
        this._chart.categoryAxis.fillColor = xAxis.axisFillColor();
        this._chart.categoryAxis.fontSize = xAxis.axisFontSize();
        this._chart.categoryAxis.color = xAxis.axisFontColor();
        this._chart.categoryAxis.titleColor = xAxis.axisTitleFontColor();
        this._chart.categoryAxis.titleFontSize = xAxis.axisTitleFontSize();

        this._chart.categoryAxis.showFirstLabel = this.showFirstLabel();
        this._chart.categoryAxis.showLastLabel = this.showLastLabel();

        this._chart.categoryAxis.equalSpacing = this.equalSpacing();

        switch(xAxis.axisType()) {
            case "time":
                this._chart.categoryAxis.parseDates = true;
                this._chart.categoryAxis.minPeriod = this.axisMinPeriod() ? this.axisMinPeriod() : undefined;
                this._chart.categoryAxis.logarithmic = false;

                if (xAxis.axisTickFormat()) {
                    this.dataFormatter = d3.time.format(xAxis.axisTickFormat());
                } else if (xAxis.axisTypeTimePattern()) {
                    this.dataFormatter = d3.time.format(xAxis.axisTypeTimePattern());
                } else {
                    this.dataFormatter =  function(v) { return v; };
                }

                break;
            case "log":
                this._chart.categoryAxis.parseDates = false;
                this._chart.categoryAxis.logarithmic = true;
                this.dataFormatter = xAxis.axisTickFormat() ? d3.format(xAxis.axisTickFormat()) : function(v) { return v; };
                break;
            case "linear":
                /* falls through */
            default:
                this._chart.categoryAxis.parseDates = false;
                this._chart.categoryAxis.logarithmic = false;
                this.dataFormatter = xAxis.axisTickFormat() ? d3.format(xAxis.axisTickFormat()) : function(v) { return v; };
                break;
        }

        var context = this;
        this._chart.categoryAxis.labelFunction = function(v1, v2, v3) {
            switch (xAxis.axisType()) {
                case "time":
                    return context.dataFormatter(xAxis.axisTickFormat() || xAxis.axisTypeTimePattern()  ? new Date(v2) : v2);
                default:
                    return context.dataFormatter(v1);
            }
        };

        for (var i = 0; i < this.yAxes().length; i++) {
            var yAxis = this.yAxis()[i];
            yAxis.type("y");

            if (!this._chart.valueAxes[i]) {
                this._chart.valueAxes.push(new AmCharts.ValueAxis());
            }

            this._chart.valueAxes[i].id = "v" + i;
            this._chart.valueAxes[i].position = yAxis.position() ? yAxis.position() : "left";
            this._chart.valueAxes[i].title = yAxis.axisTitle();
            this._chart.valueAxes[i].titleColor = yAxis.axisTitleFontColor();
            this._chart.valueAxes[i].titleFontSize = yAxis.axisTitleFontSize();
            this._chart.valueAxes[i].axisThickness = yAxis.axisLineWidth();
            this._chart.valueAxes[i].color = yAxis.axisFontColor();
            this._chart.valueAxes[i].fontSize = yAxis.axisFontSize();
            this._chart.valueAxes[i].axisColor = yAxis.axisBaselineColor();
            this._chart.valueAxes[i].axisAlpha = yAxis.axisAlpha();
            this._chart.valueAxes[i].fillColor = yAxis.axisFillColor();
            this._chart.valueAxes[i].fillAlpha = yAxis.axisFillAlpha();

            this._chart.valueAxes[i].gridAlpha = yAxis.axisGridAlpha();
            this._chart.valueAxes[i].dashLength = yAxis.axisDashLength();
            this._chart.valueAxes[i].boldPeriodBeginning = yAxis.axisBoldPeriodBeginning();

            switch(yAxis.axisType()) {
                case "time":
                    this._chart.valueAxes[i].type = "date";
                    this._chart.valueAxes[i].parseDates = true;
                    this._chart.valueAxes[i].minPeriod = this.axisMinPeriod() ? this.axisMinPeriod() : undefined;
                    this._chart.valueAxes[i].logarithmic = false;

                    if (yAxis.axisTickFormat()) {
                        this.valueFormatter = d3.time.format(yAxis.axisTickFormat());
                    } else if (yAxis.axisTypeTimePattern()) {
                        this.valueFormatter = d3.time.format(yAxis.axisTypeTimePattern());
                    } else {
                        this.valueFormatter =  function(v) { return v; };
                    }
                    break;
                case "log":
                    this._chart.valueAxes[i].parseDates = false;
                    this._chart.valueAxes[i].logarithmic = true;
                    this._chart.valueAxes[i].type = "numeric";
                    this.valueFormatter = yAxis.axisTickFormat() ? d3.format(yAxis.axisTickFormat()) : function(v) { return v; };
                    break;
                case "linear":
                    /* falls through */
                default:
                    this._chart.valueAxes[i].parseDates = false;
                    this._chart.valueAxes[i].type = "numeric";
                    this._chart.valueAxes[i].logarithmic = false;
                    this.valueFormatter = yAxis.axisTickFormat() ? d3.format(yAxis.axisTickFormat()) : function(v) { return v; };
                    break;
            }

            this._chart.valueAxes[i].labelFunction = function(v1, v2, v3) {
                switch (yAxis.axisType()) {
                    case "time":
                        return context.valueFormatter(yAxis.axisTickFormat() || yAxis.axisTypeTimePattern() ? new Date(v2) : v2);
                    default:
                        return context.valueFormatter(v1);
                }
            };
        }

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }
        
        if (this.showCursor()) {
            this._chart.chartCursor.enabled = true;
            this._chart.chartCursor.valueLineEnabled = true;
            this._chart.chartCursor.valueLineBalloonEnabled = true;
            this._chart.chartCursor.categoryBalloonEnabled = true;
        } else {
            this._chart.chartCursor.enabled = false;
            this._chart.chartCursor.valueLineEnabled = false;
            this._chart.chartCursor.valueLineBalloonEnabled = false;
            this._chart.chartCursor.categoryBalloonEnabled = false;
        }

        this._currXAxisTypes = this.xAxes().map(function(axe) { return axe.axisType(); }).toString();
        this._currYAxisTypes = this.yAxes().map(function(axe) { return axe.axisType(); }).toString();
        this._currXAxisTypeTimePatterns = this.xAxes().map(function(axe) { return axe.axisTypeTimePattern(); }).toString();
        this._currYAxisTypeTimePatterns = this.yAxes().map(function(axe) { return axe.axisTypeTimePattern(); }).toString();

        if (this._dataUpdated > this._prevDataUpdated || this._prevYAxisType !== this._currYAxisTypes || 
            this._prevXAxisType !== this._currXAxisTypes || this._prevXAxisTypeTimePattern !== this._currXAxisTypeTimePatterns || 
            this._prevYAxisTypeTimePattern !== this._currYAxisTypeTimePatterns || (this.paletteGrouping && this._prevPaletteGrouping !== this.paletteGrouping()) ||
            this._columnsUpdated > this._prevColumnsUpdated
        ) {
            this._chart.dataProvider = this.amFormatData(this.data());
        }
        this._chart.dataProvider = this.amFormatData(this.data());
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;
        this._prevXAxisTypes = this._currXAxisTypes;
        this._prevYAxisTypes = this._currYAxisTypes;
        this._prevXAxisTypeTimePatterns = this._currXAxisTypeTimePatterns;
        this._prevYAxisTypeTimePatterns = this._currXAxisTypeTimePatterns;

        if (this.paletteGrouping) {
            this._prevPaletteGrouping =  this.paletteGrouping();
        }

        this.amFormatColumns();

        var color;
        var cType;
        this._chart.colors = [];
        if (context._class.indexOf("amchart_Area") !== -1) {
            cType = "Area";
        }
        this._chart.dataProvider.forEach(function(dataPoint,i){
            context.columns().filter(function (d, i) { return i > 0; }).forEach(function(col, idx) {
                if (context.paletteGrouping() === "By Category") {
                    color = context._palette(i);
                } else {
                    color = context._palette(col); 
                }

                context._chart.colors.push(color); // needed to work with area and line chart and all?

                context._chart.dataProvider[i]["color" + idx] = color;

                if (cType !== "Area") {
                    context._chart.dataProvider[i]["linecolor" + idx] = context.lineColor() ? context.lineColor() : color;
                }

                if (context._colorObj[i] === undefined) {
                    context._colorObj[i] = {};
                }

                context._colorObj[i][idx] = {
                    color: color,
                    lineColor: context.lineColor() ? context.lineColor() : color
                };
            }); 
        });

        return this._chart;
    };

    CommonSerial.prototype.buildGraphObj = function(gType, i) {
        var context = this;
        var gObj = {};

        gObj.id = "g" + i;

        if (this.y2().indexOf(i) !== -1) {
            gObj.valueAxis = "v1";
        } else {
            gObj.valueAxis = "v0";
        }

        gObj.balloonFunction = function(d) {
            if (d.graph.type === "line") {
                return d.category + ", " + context.columns()[d.graph.index + 1]  + ": " + context.data()[d.index][d.graph.index + 1];
            } else {
                return d.category + ", " + context.columns()[d.graph.columnIndex + 1]  + ": " + context.data()[d.index][d.graph.columnIndex + 1];   
            }
        };
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineColor = context.lineColor();
        gObj.lineThickness = context.lineWidth();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop

        gObj.type = gType;

        gObj.title = "";
        var fieldArr = ["value","open","close","high","low"];
        fieldArr.forEach(function(field){
            if (typeof(context["_" + field + "Field"]) !== "undefined" && typeof(context["_" + field + "Field"][i]) !== "undefined"){
                gObj[field + "Field"] = context["_" + field + "Field"][i];
            }
        });

        try {
            if(context.useImgPatterns()) {
                var patternArr = JSON.parse(context.imgPatternArr());
                if(typeof (patternArr[i]) !== "undefined"){
                    gObj.pattern = patternArr[i];
                }
            } else {
                gObj.pattern = "";
            }
        } catch(e) {
            console.log("e:");
            console.log(e);
        }

        gObj.colorField = "color" + i;

        gObj.lineColorField = "linecolor" + i;
        gObj.fillColorsField = "fillcolor" + i;

        return gObj;
    };

    CommonSerial.prototype.amFormatColumns = function(ColArr) {
        this._categoryField = this.columns()[0];
        this._chart.categoryField = this.columns()[0];
        this._openField = [];
        this._closeField = [];
        this._valueField = this.columns().slice(1);
        return this;
    };

    CommonSerial.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        var context = this;
        var initObj = {
            type: "serial",
            addClassNames: true,
            chartScrollbar: {},
            chartCursor: {
                "enabled": false,
                "valueLineEnabled": false,
                "valueLineBalloonEnabled": false,
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "valueLineAlpha": 0.2,
                "oneBalloonOnly": true,
                "balloonPointerOrientation": "vertical",
                "valueBalloonsEnabled": false // always set false
            }
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickGraphItem", function(e) {
            var graph = e.graph;
            var data  = e.item.dataContext;
            var field;
            var field2;

            if (context._gType === "column") {
                field = graph.fillColorsField;
                field2 = graph.lineColorField;
            } else if (context._gType === "line") {
                field = graph.colorField;
            } else if (context._gType === "area") {
                field = graph.colorField;
            }
            if (field) {
                if (data[field] !== null && data[field] !== undefined) {
                    delete data[field];
                    data[field2] = context._colorObj[e.index][e.target.columnIndex].lineColor;
                    if (context.selectionMode() === "simple") {
                        if (context._selected !== null) {
                            delete context._selected.data[context._selected.field];
                            context._selected.data[context._selected.field2] = context._colorObj[context._selected.dIdx][context._selected.cIdx].lineColor;
                        }
                        context._selected = null;
                    }
                } else {
                    data[field] = context.selectionColor();
                    data[field2] = context.selectionColor();
                    if (context.selectionMode() === "simple") {
                        if (context._selected !== null) {
                            delete context._selected.data[context._selected.field];
                            context._selected.data[context._selected.field2] = context._colorObj[context._selected.dIdx][context._selected.cIdx].lineColor;
                        }
                        context._selected = {
                            field: field,
                            field2: field2,
                            data: data,
                            dIdx: e.index,
                            cIdx: e.target.columnIndex
                        };
                        context._selections.push(context._selected);
                    }
                }
                e.chart.validateData();
            }

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.columnIndex + 1], context._selected !== null);
        });
    };

    CommonSerial.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        if (!this.xAxis().length) {
            this.xAxis(0);
        }
        if (!this.yAxis().length) {
            this.yAxis(0);
        }

        if (this.y2().length) {
            this.yAxis(1);
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
    };

    CommonSerial.prototype.render = function(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    };

    CommonSerial.prototype.data = function(_) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    };

    CommonSerial.prototype.columns = function(_) {
        if (arguments.length) {
            this._columnsUpdated++;
        }
        return HTMLWidget.prototype.columns.apply(this, arguments);
    };

    return CommonSerial;
}));
if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Area.js',["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart", "css!./Area"], factory);
    } else {
        root.amchart_Area = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Area() {
        CommonSerial.call(this);
        this._tag = "div";
        this._gType = "line";
    }
    Area.prototype = Object.create(CommonSerial.prototype);
    Area.prototype.constructor = Area;
    Area.prototype._class += " amchart_Area";
    Area.prototype.implements(INDChart.prototype);

    Area.prototype.publish("paletteID", "default", "set", "Palette ID", Area.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Area.prototype.publish("stacked", false, "boolean", "Stack Chart",null,{tags:["Basic","Shared"]});
    Area.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Intermediate","Shared"]});
    Area.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:["Basic"]});

    Area.prototype.publish("bulletSize", 6, "number", "Bullet Size",null,{tags:["Intermediate"]});
    Area.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:["Basic"]});

    Area.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Area.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        // Stacked
        if(this.stacked()){
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Area.prototype.buildGraphs = function(gType) {
        this._chart.graphs = [];

        for(var i = 0; i < this.columns().length - 1; i++) {
            var gRetVal = CommonSerial.prototype.buildGraphObj.call(this, gType, i);
            var gObj = buildGraphObj.call(this, gRetVal, i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj, i) {
            // Area Specific Options
            gObj.fillAlphas = this.fillOpacity();
            gObj.bullet = this.bulletType();
            gObj.bulletSize = this.bulletSize();

            return gObj;
        }
    };

    Area.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Area;
}));



(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Column.js',["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart", "css!./Column"], factory);
    } else {
        root.amchart_Column = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Column() {
        CommonSerial.call(this);

        this._tag = "div";
        this._gType = "column";

        this.orientation("horizontal");
    }
    Column.prototype = Object.create(CommonSerial.prototype);
    Column.prototype.constructor = Column;
    Column.prototype._class += " amchart_Column";
    Column.prototype.implements(INDChart.prototype);

    Column.prototype.publish("paletteID", "default", "set", "Palette ID", Column.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Column.prototype.publish("stacked", false, "boolean", "Stack Chart",null,{tags:["Basic","Shared"]});
    Column.prototype.publish("fillOpacity", 0.7, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Intermediate","Shared"]});

    Column.prototype.publish("cylinderBars", false, "boolean", "Cylinder Bars",null,{tags:["Basic"]});
    Column.prototype.publish("circleRadius", 1, "number", "Circle Radius of Cylinder Bars",null,{tags:["Basic"]});

    Column.prototype.publish("columnWidth", 0.62, "number", "Column Width",null,{tags:["Basic"]});

    Column.prototype.publish("Depth3D", 0, "number", "3D Depth (px)",null,{tags:["Basic"]});
    Column.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)",null,{tags:["Basic"]});

    Column.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%","3d"],{tags:["Basic"]});
    Column.prototype.publish("useOhlcLines", false, "boolean", "Use OHLC Lines",null,{tags:["Intermediate"]});

    Column.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Column.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        if (this._rangeType === "candle-ohlc") {
            this._gType = this.useOhlcLines() ? "ohlc" : "candlestick";
        } else {
            this._gType = "column";
        }

        this.buildGraphs(this._gType);

        // Stacked
        if(this.stacked()){
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.categoryAxis.startOnAxis = false;

        return this._chart;
    };

    Column.prototype.buildGraphs = function(gType) {
        this._chart.graphs = [];

        for (var i = 0; i < this.columns().length - 1; i++) {
            var gRetVal = CommonSerial.prototype.buildGraphObj.call(this, gType, i);
            var gObj = buildGraphObj.call(this, gRetVal, i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj, i) {
            if (this.columnWidth()) {
                gObj.columnWidth = this.columnWidth();
            }

            if (this.cylinderBars()) {
                 gObj.topRadius = this.circleRadius();
            } else {
                 gObj.topRadius = undefined;
            }
            
            if (this._rangeType === "normal") {
                gObj.openField = "openField" + i;
                gObj.valueField = "valueField" + i;
            }
            if (this._rangeType === "candle-ohlc") {
                gObj.lowField = "lowField" + i;
                gObj.openField = "openField" + i;
                gObj.closeField = "closeField" + i;
                gObj.highField = "highField" + i;
            }

            gObj.fillAlphas = this.fillOpacity();

            return gObj;
        }
    };

    Column.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Column;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Bar.js',["d3", "./Column", "amcharts.serial", "../api/INDChart"], factory);
    } else {
        root.amchart_Bar = factory(root.d3, root.amchart_Column, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, Column, AmCharts, INDChart) {
    function Bar() {
        Column.call(this);
        this._tag = "div";
        this._gType = "column";

        this.orientation("vertical");
    }
    Bar.prototype = Object.create(Column.prototype);
    Bar.prototype.constructor = Bar;
    Bar.prototype._class += " amchart_Bar";

    return Bar;
}));



(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Combo.js',["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart", "css!./Combo"], factory);
    } else {
        root.amchart_Combo = factory(root.d3, root.amchart_CommonSerial, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, AmCharts, INDChart) {
    function Combo() {
        CommonSerial.call(this);
        this._tag = "div";
        //this._gType = "";
    }
    Combo.prototype = Object.create(CommonSerial.prototype);
    Combo.prototype.constructor = Combo;
    Combo.prototype._class += " amchart_Combo";
    Combo.prototype.implements(INDChart.prototype);

    Combo.prototype.publish("paletteID", "default", "set", "Palette ID", Combo.prototype._palette.switch(),{tags:["Basic","Shared"]});
    Combo.prototype.publish("stacked", false, "boolean", "Stack Chart",null,{tags:["Basic","Shared"]});
    Combo.prototype.publish("fillOpacity", 0.2, "number", "Opacity of The Fill Color", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Intermediate","Shared"]});
    Combo.prototype.publish("stackType", "regular", "set", "Stack Type",["none","regular","100%"],{tags:["Basic"]});

    Combo.prototype.publish("bulletSize", 6, "number", "Bullet Size",null,{tags:["Intermediate"]});
    Combo.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:["Basic"]});

    Combo.prototype.publish("defaultType", "column", "set", "Default chart type", ["column","line","spline","area","area-spline","step","area-step","scatter"],{tags:["Basic"]});
    Combo.prototype.publish("types", [], "array", "Array of chart types (ex:bar|line|spline|area|area-spline|step|area-step|scatter)",null,{tags:["Basic"]});
    
    Combo.prototype.publish("charts", [], "widgetArray", "widgets", null, { tags: ["Basic"] }); // perhaps we want to load up the params on a chart and pass in the chart and just read the params there?

    Combo.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Combo.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        // Stacked
        if(this.stacked()){
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

        this.buildGraphs(this._gType);

        this._chart.categoryAxis.startOnAxis = false;

        return this._chart;
    };

    Combo.prototype.buildGraphs = function() {
        this._chart.graphs = [];

        for (var i = 0; i < this.columns().length - 1; i++) {
            var gType = this.types()[i] || this.defaultType();
            var gRetVal = CommonSerial.prototype.buildGraphObj.call(this, gType, i);
            var gObj = buildGraphObj.call(this, gRetVal, i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj, i) {
            // Combo Specific Options
            if (gType !== "line") {
                gObj.fillAlphas = this.fillOpacity();
            }
            if (gType !== "column") {
                gObj.bullet = this.bulletType();
                gObj.bulletSize = this.bulletSize();
            }

            gObj.valueField = this.columns()[i + 1];
            
            gObj.type = gObj.type === "area" ? "line" : gObj.type; // an area chart is a line chart with fillOpacity set
            return gObj;
        }
    };

    Combo.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Combo;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/CommonFunnel',["d3", "../common/HTMLWidget", "amcharts.funnel", "require"], factory);
    } else {
        root.amchart_CommonFunnel = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require);
    }

}(this, function(d3, HTMLWidget, AmCharts, require) {
    function CommonFunnel() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};

        this._selected = null;
        this._selections = [];
        
        this._dataUpdated = 0;
        this._prevDataUpdated = -1;
        this._columnsUpdated = 0;
        this._prevColumnsUpdated = -1;
    }
    CommonFunnel.prototype = Object.create(HTMLWidget.prototype);
    CommonFunnel.prototype.constructor = CommonFunnel;
    CommonFunnel.prototype._class += " amchart_CommonFunnel";

    CommonFunnel.prototype.publish("fontSize", 11, "number", "Font Size",null,{tags:["Basic","Shared"]});
    CommonFunnel.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    CommonFunnel.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});

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
    CommonFunnel.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });
    CommonFunnel.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});

    CommonFunnel.prototype.updateChartOptions = function() {

        this._chart.startDuration = this.startDuration();
        this._chart.rotate = this.flip();

        this._chart.pullOutOnlyOne = this.selectionMode() === "simple";
        
        this._chart.color = this.fontColor();
        this._chart.colorField = "sliceColor";
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.labelPosition = this.labelPosition();

        this.titles = [];
        this.baloon = {};

        this._chart.titleField = this.columns()[0];
        this._chart.valueField = this.columns()[1];

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();

        var sortingMethod = function(a,b){ return a[1] > b[1] ? 1 : -1; };
        if(this.reverseDataSorting()){
            sortingMethod = function(a,b){ return a[1] < b[1] ? 1 : -1; };
        }
        this.data().sort(sortingMethod);

        // DataProvider
        if (this._dataUpdated > this._prevDataUpdated || this._columnsUpdated > this._prevColumnsUpdated) {
            this._chart.dataProvider = this.formatData(this.data());
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;

        // Color Palette
        this._chart.colors = this.data().map(function (row) {
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

    CommonFunnel.prototype.formatData = function(dataArr){
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow){
            var dataObj = {};
            context.columns().forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    CommonFunnel.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        var initObj = {
            type: "funnel",
            addClassNames: true,
            autoResize: true,
            autoMargins: true,
            chartScrollbar: {}
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickSlice", function(e) {   
            var field = e.chart.colorField;
            var data = e.dataItem.dataContext;

            if (data[field] !== null && data[field] !== undefined) {
                delete data[field];
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = null;
                }
            } else {
                data[field] = context.selectionColor();
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = {
                        field: field,
                        data: data,
                        cIdx: 1,
                        dIdx: e.dataItem.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.dataItem.index]), context.columns()[1], context._selected !== null);
        });
    };

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

    CommonFunnel.prototype.render = function(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    };

    CommonFunnel.prototype.data = function(_) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    };

    return CommonFunnel;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/CommonRadar',["d3", "../common/HTMLWidget", "amcharts.radar", "require"], factory);
    } else {
        root.amchart_CommonRadar = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require);
    }

}(this, function(d3, HTMLWidget, AmCharts, require) {
    function CommonRadar() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};

        this._selected = null;
        this._selections = [];
        
        this._dataUpdated = 0;
        this._prevDataUpdated = -1;
        this._columnsUpdated = 0;
        this._prevColumnsUpdated = -1;
    }
    CommonRadar.prototype = Object.create(HTMLWidget.prototype);
    CommonRadar.prototype.constructor = CommonRadar;
    CommonRadar.prototype._class += " amchart_CommonRadar";

    // NO X-Axis  !!!

    CommonRadar.prototype.publish("fontSize", 11, "number", "Font Size",null,{tags:["Basic","Shared"]});
    CommonRadar.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    CommonRadar.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    CommonRadar.prototype.publish("lineWidth", 2, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:"range",tags:["Basic","Shared"]});
    CommonRadar.prototype.publish("lineOpacity", 1, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Basic","Shared"]});
    CommonRadar.prototype.publish("dashedLineStyle", 0, "number", "",null,{tags:["Advanced","Shared"]});

    CommonRadar.prototype.publish("yAxisBaselineColor", null, "html-color", "Axis color",null,{tags:["Intermediate","Shared"]});

    CommonRadar.prototype.publish("axisFontSize", undefined, "number", "Size of value labels text. Will use chart's fontSize if not set.",null,{tags:["Basic","Shared"]});
    CommonRadar.prototype.publish("yAxisFontColor", undefined, "string", "Font Name",null,{tags:["Basic","Shared"]});

    CommonRadar.prototype.publish("yAxisTitle", "", "string", "Y-Axis Title",null,{tags:["Basic","Shared"]});
    CommonRadar.prototype.publish("yAxisTitleFontColor", null, "html-color", "Color of axis value labels. Will use chart's color if not set.",null,{tags:["Basic","Shared"]});
    CommonRadar.prototype.publish("yAxisTitleFontSize", null, "html-color", "Font Size of axis value labels. Will use chart's color if not set.",null,{tags:["Basic","Shared"]});

    CommonRadar.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis",null,{tags:["Basic","Shared"]});

    CommonRadar.prototype.publish("marginLeft", null, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    CommonRadar.prototype.publish("marginRight", null, "number", "Margin (Right)",null,{tags:["Intermediate"]});
    CommonRadar.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    CommonRadar.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    CommonRadar.prototype.publish("showScrollbar", false, "boolean", "Chart Scrollbar",null,{tags:["Intermediate"]});

    CommonRadar.prototype.publish("startDuration", 0.3, "number", "Start Duration (sec)",null,{tags:["Private"]});

    CommonRadar.prototype.publish("yAxisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{tags:["Advanced"]});
    CommonRadar.prototype.publish("yAxisGridPosition", "start", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{tags:["Advanced"]});

    //CommonRadar.prototype.publish("yAxisBoldPeriodBeginning", true, "boolean", "When parse dates is on for the category axis, the chart will try to highlight the beginning of the periods, like month, in bold.",null,{tags:["Advanced"]});
    //CommonRadar.prototype.publish("yAxisFillAlpha", 0, "number", "Fill opacity. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    //CommonRadar.prototype.publish("yAxisFillColor", "#FFFFFF", "html-color", "Fill color. Every second space between grid lines can be filled with color. Set fillAlpha to a value greater than 0 to see the fills.",null,{tags:["Intermediate"]});
    //CommonRadar.prototype.publish("yAxisGridAlpha", 0.2, "number", "Grid alpha.",null,{tags:["Intermediate"]});

    CommonRadar.prototype.publish("yAxisMinimum", [], "array", "",null,{tags:["Advanced"]});
    CommonRadar.prototype.publish("yAxisTitleOffset", [], "array", "",null,{tags:["Advanced"]});
    CommonRadar.prototype.publish("yAxisDashLength", [], "array", "Length of a dash. 0 means line is not dashed.",null,{tags:["Advanced"]});
    CommonRadar.prototype.publish("axisAlpha", 1, "number", "Axis opacity",null,{tags:["Intermediate"]});

    CommonRadar.prototype.publish("circularGrid", false, "boolean", "Circular Grid",null,{tags:["Intermediate"]}); // not dynamic

    CommonRadar.prototype.publish("bulletSize", 9, "number", "Bullet Size",null,{tags:["Intermediate"]});
    CommonRadar.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:["Intermediate"]});

    CommonRadar.prototype.publish("fillOpacity", 0.3, "number", "Shape Opacity", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Intermediate"]});
    CommonRadar.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    CommonRadar.prototype.publish("yAxisTickFormat", null, "string", "Y-Axis Tick Format", null, { optional: true });
    
    CommonRadar.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});
    CommonRadar.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

    CommonRadar.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.theme = "none";
        this._chart.type = "radar";
        this._chart.startDuration = this.startDuration();
        this._chart.categoryField = this.columns()[0];
        this._valueField = this.columns().slice(1);

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this.titles = [];

        // DataProvider
        if (this._dataUpdated > this._prevDataUpdated || this._columnsUpdated > this._prevColumnsUpdated) {
            this._chart.dataProvider = this.formatData(this.data());
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;

        // ValueAxis
        this._chart.valueAxes[0].title = this.yAxisTitle();
        this._chart.valueAxes[0].axisTitleOffset = this.yAxisTitleOffset();
        this._chart.valueAxes[0].minimum = this.yAxisMinimum();
        this._chart.valueAxes[0].axisAlpha = this.axisAlpha();
        this._chart.valueAxes[0].dashLength = this.yAxisDashLength() || this.dashedLineStyle();
        this._chart.valueAxes[0].axisColor = this.yAxisBaselineColor();
        this._chart.valueAxes[0].axisThickness = this.axisLineWidth();
        this._chart.valueAxes[0].titleColor = this.yAxisTitleFontColor();
        this._chart.valueAxes[0].titleFontSize = this.yAxisTitleFontSize();
        this._chart.valueAxes[0].fontSize = this.axisFontSize();
        this._chart.valueAxes[0].color = this.yAxisFontColor();

        this._chart.valueAxes[0].autoGridCount = this.yAxisAutoGridCount();
        this._chart.valueAxes[0].gridPosition = this.yAxisGridPosition();

        this._chart.valueAxes[0].labelFunction = function(d) {
            return d3.format(context.yAxisTickFormat())(d);
        };

        // Color Palette
        this._chart.colors = this.columns().filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        if(this.circularGrid()){ // not dynamic
            this._chart.valueAxes.forEach(function(va,i){
                context._chart.valueAxes[i].gridType = "circles";
            });
        }

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        return this._chart;
    };

    CommonRadar.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {};

        gObj.balloonFunction = function(d) {
            var balloonText = d.category + ", " + context.columns()[d.graph.index+1]  + ": " + context.data()[d.index][d.graph.columnIndex+1];
            return balloonText;
        };
        gObj.fillAlphas = context.fillOpacity();
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop

        gObj.type = gType;

        gObj.title = "";

        gObj.colorField = "selected" + i;

        return gObj;
    };

    CommonRadar.prototype.formatData = function(dataArr){
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow){
            var dataObj = {};
            context.columns().forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    CommonRadar.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        var initObj = {
            type: "radar",
            addClassNames: true,
            chartScrollbar: {}
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickGraphItem", function(e) {
            var graph = e.graph;
            var data  = e.item.dataContext;
            var field = graph.colorField;

            if (data[field] !== null && data[field] !== undefined) {
                delete data[field];
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = null;
                }
            } else {
                data[field] = context.selectionColor();
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = {
                        field: field,
                        data: data,
                        cIdx: e.target.index,
                        dIdx: e.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();
            
            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.index + 1], context._selected !== null);
        });
    };

    CommonRadar.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
    };

    CommonRadar.prototype.render = function(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    };

    CommonRadar.prototype.data = function(_) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    };

    CommonRadar.prototype.columns = function(_) {
        if (arguments.length) {
            this._columnsUpdated++;
        }
        return HTMLWidget.prototype.columns.apply(this, arguments);
    };

    return CommonRadar;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/XYAxis.js',["./SerialAxis"], factory);
    } else {
        root.amchart_XYAxis = factory(root.amchart_Axis);
    }
}(this, function(Axis) {
    function XYAxis() {
        Axis.call(this);
    }
    XYAxis.prototype = Object.create(Axis.prototype);
    XYAxis.prototype.constructor = XYAxis;
    XYAxis.prototype._class += " amchart_XYAxis";

    XYAxis.prototype.publish("axisAutoGridCount", true, "boolean", "Specifies whether number of gridCount is specified automatically, acoarding to the axis size",null,{ override: true, tags:["Advanced"]});
    XYAxis.prototype.publish("axisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{ override: true, tags:["Advanced"]});
    XYAxis.prototype.publish("axisTickFormat", null, "string", "Y-Axis Tick Format", null, { override: true, optional: true });
    XYAxis.prototype.publish("axisGridPosition", "middle", "set", "Specifies if a grid line is placed on the center of a cell or on the beginning of a cell", ["start","middle"],{ override: true, tags:["Advanced"]});
    XYAxis.prototype.publish("axisGridAlpha", 0.2, "number", "Grid alpha.",null,{override: true, tags:["Intermediate"]});

    return XYAxis;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/CommonXY',["d3", "../common/HTMLWidget", "amcharts.xy", "require", "./XYAxis"], factory);
    } else {
        root.amchart_CommonXY = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.require, root.amchart_SerialAxis);
    }
}(this, function(d3, HTMLWidget, AmCharts, require, Axis) {
    function CommonXY() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};

        this._selected = null;
        this._selections = [];

        this._dataUpdated = 0;
        this._prevDataUpdated = -1;
        this._columnsUpdated = 0;
        this._prevColumnsUpdated = -1;
    }
    CommonXY.prototype = Object.create(HTMLWidget.prototype);
    CommonXY.prototype.constructor = CommonXY;
    CommonXY.prototype._class += " amchart_CommonXY";

    CommonXY.prototype.publish("xAxes", [], "propertyArray", "widgets", null, { max: 1, tags: ["Basic"] }); // max number of xAxes
    CommonXY.prototype.publish("yAxes", [], "propertyArray", "widgets", null, { tags: ["Basic"] });

    CommonXY.prototype.publish("fontSize", 11, "number", "Font Size",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    CommonXY.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    CommonXY.prototype.publish("lineWidth", 0, "number", "Line Thickness", null, {min:0,max:10,step:1,inputType:"range",tags:["Basic","Shared"]});
    CommonXY.prototype.publish("lineColor", null, "html-color", "Color of the data/content lines",null,{tags:["Basic","Shared"]});
    CommonXY.prototype.publish("lineOpacity", 0, "number", "Line Opacity", null, {min:0,max:1,step:0.001,inputType:"range",tags:["Basic","Shared"]});

    CommonXY.prototype.publish("dashedLineStyle", 0, "number", "",null,{tags:["Advanced","Shared"]});

    CommonXY.prototype.publish("showScrollbar", false, "boolean", "Chart Scrollbar",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("bulletSize", 8, "number", "Bullet Size",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:["Intermediate"]});

    CommonXY.prototype.publish("marginLeft", 50, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("marginRight", 10, "number", "Margin (Right)",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("marginTop", 20, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    CommonXY.prototype.publish("marginBottom", 50, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    CommonXY.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    CommonXY.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});
    CommonXY.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

    // Axes
    var xAxes = CommonXY.prototype.xAxes;
    var yAxes = CommonXY.prototype.yAxes;
    CommonXY.prototype.Axes = function (type, idx) {
        var axe = type === "x" ? xAxes : yAxes;

        if (idx === undefined) {
            var context = this;
            var axes = axe.call(this);
            axes.forEach(function(axis) {
                axis._context = context;
            });
            return axes;
        }

        var axis;

        axis = axe.call(this)[idx];
        if (axis) {
             axis._context = this;
             return axis;
        }

        axis = new Axis();
        axis._context = this;
        var currentAxes = axe.call(this);
        currentAxes.push(axis);
        axe.call(this, currentAxes);
        return axis;
    };

    CommonXY.prototype.xAxis = function (idx) {
        return this.Axes("x", idx);
    };

    CommonXY.prototype.yAxis = function (idx) {
        return this.Axes("y", idx);
    };

    CommonXY.prototype.publish("showCursor", false, "boolean", "Show Chart Scrollbar",null,{tags:["Intermediate","Shared"]});

    CommonXY.prototype.updateChartOptions = function() {
        var context = this;

        this._chart.theme = "none";
        this._chart.type = "xy";

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        // left vAxis must always be 0 and bottom 1 !!

        var vAxisCount = 0;

        for (var iy = 0; iy < this.yAxes().length; iy++) {
            var yAxis = this.yAxis()[iy];

            this._chart.valueAxes[vAxisCount].position = yAxis.position() ? yAxis.position() : "left";
            this._chart.valueAxes[vAxisCount].axisAlpha = yAxis.axisAlpha();
            this._chart.valueAxes[vAxisCount].title = yAxis.axisTitle();
            this._chart.valueAxes[vAxisCount].axisThickness = yAxis.axisLineWidth();
            this._chart.valueAxes[vAxisCount].axisColor = yAxis.axisBaselineColor();
            this._chart.valueAxes[vAxisCount].color = yAxis.axisFontColor();
            this._chart.valueAxes[vAxisCount].titleFontSize = yAxis.axisTitleFontSize();
            this._chart.valueAxes[vAxisCount].titleColor = yAxis.axisTitleFontColor();
            this._chart.valueAxes[vAxisCount].autoGridCount = yAxis.axisAutoGridCount();
            this._chart.valueAxes[vAxisCount].gridPosition = yAxis.axisGridPosition();
            this._chart.valueAxes[vAxisCount].fillAlpha = yAxis.axisFillAlpha();
            this._chart.valueAxes[vAxisCount].fillColor = yAxis.axisFillColor();
            this._chart.valueAxes[vAxisCount].gridAlpha = yAxis.axisGridAlpha();
            this._chart.valueAxes[vAxisCount].dashLength = yAxis.axisDashLength();
            
            this._chart.valueAxes[vAxisCount].labelFunction = function(d) {
                return d3.format(yAxis.axisTickFormat())(d);
            };

            vAxisCount++;
        }

        for (var ix = 0; ix < this.xAxes().length; ix++) {
            var xAxis = this.xAxis()[ix];

            this._chart.valueAxes[vAxisCount].position = xAxis.position() ? xAxis.position() : "bottom";
            this._chart.valueAxes[vAxisCount].axisAlpha = xAxis.axisAlpha();
            this._chart.valueAxes[vAxisCount].title = xAxis.axisTitle();
            this._chart.valueAxes[vAxisCount].axisThickness = xAxis.axisLineWidth();
            this._chart.valueAxes[vAxisCount].axisColor = xAxis.axisBaselineColor();
            this._chart.valueAxes[vAxisCount].color = xAxis.axisFontColor();
            this._chart.valueAxes[vAxisCount].titleFontSize = xAxis.axisTitleFontSize();
            this._chart.valueAxes[vAxisCount].titleColor = xAxis.axisTitleFontColor();
            this._chart.valueAxes[vAxisCount].labelRotation = xAxis.axisLabelRotation();
            this._chart.valueAxes[vAxisCount].autoGridCount = xAxis.axisAutoGridCount();
            this._chart.valueAxes[vAxisCount].gridPosition = xAxis.axisGridPosition();
            this._chart.valueAxes[vAxisCount].fillAlpha = xAxis.axisFillAlpha();
            this._chart.valueAxes[vAxisCount].fillColor = xAxis.axisFillColor();
            this._chart.valueAxes[vAxisCount].gridAlpha = xAxis.axisGridAlpha();
            this._chart.valueAxes[vAxisCount].dashLength = xAxis.axisDashLength();

            if (xAxis.axisType() === "ordinal") {
                this._chart.valueAxes[vAxisCount].integersOnly = true;
                //this._chart.valueAxes[vAxisCount].maximum = this.data().length; // (off for now)
                this._chart.valueAxes[vAxisCount].labelFunction = function(a, b) {
                    if (b > context.data().length) {
                        return ""; // so the the last dots arent on the edge
                    }
                    return context.data().length && b > 0 ? context.data()[b-1][0] : "";
                };
            } else {
                this._chart.valueAxes[vAxisCount].labelFunction = function(d) {
                    return d3.format(xAxis.axisTickFormat())(d);
                };
            }

            vAxisCount++;
        }

        if (this._dataUpdated > this._prevDataUpdated || this._columnsUpdated > this._prevColumnsUpdated) {
            this._chart.dataProvider = this.formatData(this.data());
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;

        this._chart.dataProvider.forEach(function(dataPoint,i) {
            context._chart.dataProvider[i].color = context._palette(dataPoint[context.columns()[2]]); // By Y value
            context._chart.dataProvider[i].linecolor = context.lineColor() !== null ? context.lineColor() : context._palette(dataPoint[context.columns()[2]]);
        });

        this._chart.colors = [];

        if (this.showScrollbar()) {
            this._chart.chartScrollbar.enabled = true;
        } else {
            this._chart.chartScrollbar.enabled = false;
        }

        if (this.showCursor()) {
            this._chart.precision = this.xAxis(0).axisType() === "ordinal" ? 1 : undefined; // so ordinal will work with labelfunction 
            this._chart.chartCursor.enabled = true;
            this._chart.chartCursor.valueLineEnabled = true;
            this._chart.chartCursor.valueLineBalloonEnabled = true;
            this._chart.chartCursor.categoryBalloonEnabled = true;
        } else {
            this._chart.precision = undefined; // so ordinal will work with labelfunction
            this._chart.chartCursor.enabled = false;
            this._chart.chartCursor.valueLineEnabled = false;
            this._chart.chartCursor.valueLineBalloonEnabled = false;
            this._chart.chartCursor.categoryBalloonEnabled = false;
        }

        return this._chart;
    };

    CommonXY.prototype.buildGraphObj = function(gType,i) {
        var context = this;
        var gObj = {};

        gObj.balloonFunction = function(d) {
            var balloonText = context.columns()[d.graph.index]  + ": " + context.data()[d.index][d.graph.index];
            return balloonText;
        };
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineThickness = context.lineWidth();
        gObj.bullet = context.bulletType();
        gObj.bulletSize = context.bulletSize();
        gObj.dashLength = context.dashedLineStyle(); // TODO: convert to css Array Prop
        gObj.lineAlpha = context.lineOpacity();
        gObj.lineColor = context.lineColor();
        gObj.lineThickness = context.lineWidth();

        gObj.type = gType;

        gObj.colorField = "color" + i;
        gObj.lineColorField = "linecolor";

        // XY Values
        if (this.xAxis()[0].axisType() === "ordinal") {
            gObj.xField = "idx";
            gObj.yField = context.columns()[i];
        }
        if (this.xAxis()[0].axisType() === "linear") {
            gObj.xField = context.columns()[0];
            gObj.yField = context.columns()[1];
        }
        return gObj;
    };

    CommonXY.prototype.formatData = function(dataArr) {
        var context = this;
        var dataObjArr = [];
        dataArr.forEach(function(dataRow, i) {
            var dataObj = {};
            context.columns().forEach(function(colName, cIdx) {
                dataObj[colName] = dataRow[cIdx];
                dataObj["idx"] = i + 1;
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    CommonXY.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);

        var context = this;
        var initObj = {
            type: "xy",
            addClassNames: true,
            autoMargins: true,
            chartScrollbar: {},
            valueAxes: [],
            chartCursor: {
                "enabled": false,
                "valueLineEnabled": false,
                "valueLineBalloonEnabled": false,
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "valueLineAlpha": 0.2,
                "oneBalloonOnly": true,
                "balloonPointerOrientation": "vertical",
                "valueBalloonsEnabled": false //always set false
            },
            graphs: [{}],
            dataProvider: [{}],
            responsive: {
                enabled: true
            }
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickGraphItem", function(e) {
            var graph = e.graph;
            var data  = e.item.dataContext;
            var field = graph.colorField;

            if (data[field] !== null && data[field] !== undefined) {
                delete data[field];
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = null;
                }
            } else {
                data[field] = context.selectionColor();
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = {
                        field: field,
                        data: data,
                        cIdx: e.target.index,
                        dIdx: e.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.index], context._selected !== null);
        });
    };

    CommonXY.prototype.update = function(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        if (!this.xAxis().length) {
            this.xAxis(0);
        }
        if (!this.yAxis().length) {
            this.yAxis(0);
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }
    };

    CommonXY.prototype.render = function(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    };

    CommonXY.prototype.data = function(_) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    };
    
    CommonXY.prototype.columns = function(_) {
        if (arguments.length) {
            this._columnsUpdated++;
        }
        return HTMLWidget.prototype.columns.apply(this, arguments);
    };

    return CommonXY;
}));

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Funnel.js',["d3", "./CommonFunnel", "../api/I2DChart"], factory);
    } else {
        root.amchart_Funnel = factory(root.d3, root.amchart_CommonFunnel, root.api_I2DChart);
    }
}(this, function(d3, CommonFunnel, I2DChart) {
    function Funnel() {
        CommonFunnel.call(this);
    }
    Funnel.prototype = Object.create(CommonFunnel.prototype);
    Funnel.prototype.constructor = Funnel;
    Funnel.prototype._class += " amchart_Funnel";
    Funnel.prototype.implements(I2DChart.prototype);

    Funnel.prototype.publish("paletteID", "default", "set", "Palette ID", Funnel.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Funnel.prototype.publish("neckHeightPercent", 30, "number", "Neck Height %",null,{tags:["Basic"]});
    Funnel.prototype.publish("neckWidthPercent", 40, "number", "Neck Width %",null,{tags:["Basic"]});

    Funnel.prototype.enter = function(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    };

    Funnel.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);

        this._chart.balloonFunction = function(d) {
            var balloonText = d.title + ", " + d.value;
            return balloonText;
        };
        this._chart.neckHeight = this.neckHeightPercent()+"%";
        this._chart.neckWidth = this.neckWidthPercent()+"%";
    };

    Funnel.prototype.update = function(domNode, element) {
        CommonFunnel.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Funnel;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Gantt.js',["d3", "../common/HTMLWidget", "amcharts.gantt", "../api/INDChart", "require"], factory);
    } else {
        root.amchart_Gantt = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.api_INDChart, root.require);
    }
}(this, function(d3, HTMLWidget, AmCharts, INDChart, require) {
    function Gantt() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._chart = {};
        
        this._selected = null;
        this._selections = [];

        this._dataUpdated = 0;
        this._prevDataUpdated = -1;
        this._columnsUpdated = 0;
        this._prevColumnsUpdated = -1;

        this._dateParserData = d3.time.format("%Y-%m-%d").parse;
    }
    Gantt.prototype = Object.create(HTMLWidget.prototype);
    Gantt.prototype.constructor = Gantt;
    Gantt.prototype._class += " amchart_Gantt";
    Gantt.prototype.implements(INDChart.prototype); // 2d?

    Gantt.prototype.publish("paletteID", "default", "set", "Palette ID", Gantt.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Gantt.prototype.publish("fontFamily", "Verdana", "string", "Label Font Family",null,{tags:["Basic","Shared"]});
    Gantt.prototype.publish("fontSize", 11, "number", "Label Font Size",null,{tags:["Basic","Shared"]});
    Gantt.prototype.publish("fontColor", "#000000", "html-color", "Label Font Color",null,{tags:["Basic","Shared"]});

    Gantt.prototype.publish("depth3D", 0, "number", "3D Depth (px)",null,{tags:["Basic"]});
    Gantt.prototype.publish("angle3D", 0, "number", "3D Angle (Deg)",null,{tags:["Basic"]});

    Gantt.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });

    Gantt.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette", null, { tags: ["Intermediate", "Shared"] });

    Gantt.prototype.publish("timePattern", "%Y-%m-%d", "string", "Time Series Pattern");

    Gantt.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});

    Gantt.prototype.publish("brightnessStep", 0, "number", "Brightness step",null,{tags:["Basic"]});
    Gantt.prototype.publish("columnWidth", 0.5, "number", "column width",null,{tags:["Basic"]});
    Gantt.prototype.publish("minPeriod", "DD", "string", "Value axis minimum period",null,{tags:["Basic"]});

    Gantt.prototype.publish("guides", [], "array", "Vertical lines",null,{tags:["Intermediate"]});

    var timePattern = Gantt.prototype.timePattern;
    Gantt.prototype.timePattern = function (_) {
        var retVal = timePattern.apply(this, arguments);
        if (arguments.length) {
            this._dateParserData = d3.time.format(_).parse;
        }
        return retVal;
    };

    Gantt.prototype.updateChartOptions = function() {
        var context = this;
        
        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.depth3D = this.depth3D();
        this._chart.angle = this.angle3D();

        if (this._dataUpdated > this._prevDataUpdated || this._prevTimePattern !== this.timePattern()) {
            this._chart.dataProvider = [];
            var data = this.amFormattedData();
            for (var key in data) {
                var obj = {};
                obj.category = key;
                obj.segments = [];
                data[key].forEach(function (range) {
                    var segment = { "start": context._dateParserData(range[0]), "end": context._dateParserData(range[1]) };
                    obj.segments.push(segment);
                });
                this._chart.dataProvider.push(obj); 
            }
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevTimePattern = this.timePattern();
        
        this._chart.dataProvider.forEach(function(dataPoint,i){
            context._chart.dataProvider[i].color = context._palette(i);
        });

        this._chart.columnWidth = this.columnWidth();
        this._chart.colorField = "color";

        this._chart.valueAxes[0].type = "date";
        this._chart.valueAxes[0].minPeriod = this.minPeriod();

        this._chart.brightnessStep = this.brightnessStep() || undefined;

        this._chart.categoryField = "category";
        this._chart.segmentsField = "segments";
        this._chart.startDateField = "start";
        this._chart.endDateField = "end";

        this._chart.guides = this.guides();
    };

    Gantt.prototype.amFormattedData = function() {
        var obj = {};
        this.data().forEach(function (row) {
            if (!obj[row[0]]) {
                obj[row[0]] = [];
            }
            row.forEach(function (data, idx) {
                if (idx === 0) {
                    return;
                }
                obj[row[0]].push(data);
            });
        });
        return obj;
    };

    Gantt.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;

        var initObj = {
            "type": "gantt",
            "theme": "none",
            "autoMargins": true,
            "valueAxis": {},
            "graph": {
                "fillAlphas": 1,
                "balloonText": "<b>[[category]]</b>: [[open]] - [[value]]" // TODO replace with balloon function
            },
            "rotate": true,
            "dataProvider": [],
            "chartScrollbar": {},
            "export": {
                "enabled": true
             }
        };

        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);  
         
        this._chart.addListener("clickGraphItem", function(e) {        
            var data  = e.graph.segmentData;
            var field = "color";

            if (data[field] !== null && data[field] !== undefined) {
                delete data[field];
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = null;
                }
            } else {
                data[field] = context.selectionColor();
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = {
                        field: field,
                        data: data,
                        colIndex: e.target.columnIndex,
                        dIdx: e.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.index]), context.columns()[e.target.columnIndex + 1], context._selected !== null);
        });
    };

    Gantt.prototype.update = function(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    Gantt.prototype.render = function(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    };

    Gantt.prototype.data = function(_) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    };

    Gantt.prototype.columns = function(_) {
        if (arguments.length) {
            this._columnsUpdated++;
        }
        return HTMLWidget.prototype.columns.apply(this, arguments);
    };

    return Gantt;
}));



(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Gauge.js',["d3", "../common/HTMLWidget", "amcharts.gauge", "../api/I1DChart", "require"], factory);
    } else {
        root.amchart_Gauge = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.api_I1DChart, root.require);
    }
}(this, function(d3, HTMLWidget, AmCharts, I1DChart, require) {
    function Gauge() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};
    }
    Gauge.prototype = Object.create(HTMLWidget.prototype);
    Gauge.prototype.constructor = Gauge;
    Gauge.prototype._class += " amchart_Gauge";
    Gauge.prototype.implements(I1DChart.prototype);

    Gauge.prototype.publish("paletteID", "default", "set", "Palette ID", Gauge.prototype._palette.switch(), {tags:["Basic","Shared"]});
    Gauge.prototype.publish("low", 0, "number", "Gauge lower bound", null, {tags:["Intermediate","Shared"]});
    Gauge.prototype.publish("high", 100, "number", "Gauge higher bound", null, {tags:["Intermediate","Shared"]});

    Gauge.prototype.publish("fontSize", 11, "number", "Font Size",null,{tags:["Basic","Shared"]});
    Gauge.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    Gauge.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    Gauge.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis",null,{tags:["Intermediate"]});

    Gauge.prototype.publish("colorType", "a", "set", "", ["a","b","c"],{tags:["Basic"]});

    Gauge.prototype.publish("marginLeft", null, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    Gauge.prototype.publish("marginRight", null, "number", "Margin (Right)",null,{tags:["Intermediate"]});
    Gauge.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    Gauge.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    Gauge.prototype.publish("numBands", null, "number", "",null,{tags:["Intermediate"]});
    Gauge.prototype.publish("bandsColor", [], "array", "Bands Color",null,{tags:["Basic"]});
    Gauge.prototype.publish("bandsStartValue", [], "array", "Bands Start Value",null,{tags:["Advanced"]});
    Gauge.prototype.publish("bandsEndValue", [], "array", "Bands End Value",null,{tags:["Advanced"]});
    Gauge.prototype.publish("bandsInnerRadius", [], "array", "Bands Inner Radius",null,{tags:["Advanced"]});

    Gauge.prototype.publish("axisAlpha", 0.2, "number", "Axis Alpha",null,{tags:["Intermediate"]});
    Gauge.prototype.publish("tickAlpha", 0.2, "number", "Tick Alpha",null,{tags:["Intermediate"]});
    Gauge.prototype.publish("valueInterval", 20, "number", "Value Interval",null,{tags:["Advanced"]});
    Gauge.prototype.publish("bottomText", "", "string", "Text Along Bottom",null,{tags:["Intermediate"]});
    Gauge.prototype.publish("bottomTextYOffset", -20, "number", "Bottom Text Vertical Offset",null,{tags:["Intermediate"]});

    Gauge.prototype.publish("animatationDuration", 2, "number", "Animation Duration (sec)",null,{tags:["Intermediate"]});

    Gauge.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});

    Gauge.prototype.updateChartOptions = function() {
        this._chart.type = "gauge";
        this._chart.theme = "none";

        this._chart.startDuration = this.animatationDuration();

        this._chart.color = this.fontColor();
        this._chart.fontSize = this.fontSize();
        this._chart.fontFamily = this.fontFamily();

        this._chart.titles = [];
        this._chart.allLabels = [];

        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.axes[0].axisThickness = this.axisLineWidth();
        this._chart.axes[0].axisAlpha = this.axisAlpha();
        this._chart.axes[0].tickAlpha = this.tickAlpha();
        this._chart.axes[0].valueInterval = this.valueInterval();
        this._chart.axes[0].bands = [];
        this._chart.axes[0].bottomText = this.bottomText();
        this._chart.axes[0].bottomTextYOffset = this.bottomTextYOffset();
        this._chart.axes[0].endValue = this.high();
        this._chart.axes[0].startValue = this.low();

        // 3 Color Methods
        var i, l;
        if (this.colorType() === "a") {
            for (i = 0, l = this.numBands(); i < l; i++) {
                var a_band = {
                    color: this.bandsColor()[i],
                    startValue: this.bandsStartValue()[i],
                    endValue: this.bandsEndValue()[i],
                    innerRadius: this.bandsInnerRadius()[i],
                };
                this._chart.axes[0].bands.push(a_band);
            }
        }
        if (this.colorType() === "b") {
            for (i = 0, l = this.high() ; i < l; i++) {
                var b_band = {
                    color: this._palette(i, this.low(), this.high()),
                    startValue: i,
                    endValue: i+1,
                    //innerRadius: this._bandsInnerRadius[i] || "", // this has a cool effect might be useful?
                    innerRadius: this.bandsInnerRadius()[0]
                };
                this._chart.axes[0].bands.push(b_band);
            }
        }
        if (this.colorType() === "c") {
            var c_band = {
                color: this._palette(this.data(), this.low(), this.high()),
                startValue: this.low(),
                endValue: this.high(),
                innerRadius: this.bandsInnerRadius()[0]
            };
            this._chart.axes[0].bands.push(c_band);
        }

        this._chart.axes[0].bottomText = this.bottomText().replace("[[data]]",this.data());

        return this._chart;
    };

    Gauge.prototype.update = function(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this.updateChartOptions();
        this._chart.arrows[0].setValue(this.data());

        this._chart.validateNow();
        this._chart.validateData();
    };

    Gauge.prototype.enter = function(domNode, element) {
        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        var initObj = {
            type: "gauge",
            addClassNames: true,
            axes: [{}],
            arrows:[{}],
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    return Gauge;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Line.js',["d3", "./CommonSerial", "../api/INDChart"], factory);
    } else {
        root.amchart_Line = factory(root.d3, root.amchart_CommonSerial, root.api_INDChart);
    }
}(this, function(d3, CommonSerial, INDChart) {
    function Line() {
        CommonSerial.call(this);
        this._tag = "div";
        this._gType = "line";
    }
    Line.prototype = Object.create(CommonSerial.prototype);
    Line.prototype.constructor = Line;
    Line.prototype._class += " amchart_Line";
    Line.prototype.implements(INDChart.prototype);

    Line.prototype.publish("paletteID", "default", "set", "Palette ID", Line.prototype._palette.switch(), {tags:["Basic","Shared"]});
    Line.prototype.publish("smoothLines", false, "boolean", "Causes chart data lines to draw smoothly",null,{tags:["Basic","Shared"]});

    Line.prototype.publish("stepLines", false, "boolean", "Causes chart data lines to draw smoothly",null,{tags:["Basic"]});

    Line.prototype.publish("bulletSize", 6, "number", "Bullet Size",null,{tags:["Intermediate"]});
    Line.prototype.publish("bulletType", "round", "set", "Bullet Type", ["none", "round", "square", "triangleUp", "triangleDown", "triangleLeft", "triangleRight", "bubble", "diamond"],{tags:["Basic"]});

    Line.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Line.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Line.prototype.buildGraphs = function(gType) {
        this._chart.graphs = [];

        for (var i = 0; i < this.columns().length - 1; i++) {
            var gRetVal = CommonSerial.prototype.buildGraphObj.call(this, gType, i);
            var gObj = buildGraphObj.call(this, gRetVal, i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj, i) {
            if (this.stepLines()) {
                gObj.type = "step";
            } else if (this.smoothLines()) {
                gObj.type = "smoothedLine";
            } else {
                gObj.type = "line";
            }

            gObj.bullet = this.bulletType();
            gObj.bulletSize = this.bulletSize();

            return gObj;
        }
    };

    Line.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Line;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Pie.js',["d3", "../common/HTMLWidget", "amcharts.pie", "../api/I2DChart", "require"], factory);
    } else {
        root.amchart_Pie = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.api_I2DChart, root.require);
    }
}(this, function(d3, HTMLWidget, AmCharts, I2DChart, require) {
    function Pie() {
        HTMLWidget.call(this);
        this._tag = "div";
        this._chart = {};

        this._selected = null;
        this._selections = [];

        this._dataUpdated = 0;
        this._prevDataUpdated = -1;
        this._columnsUpdated = 0;
        this._prevColumnsUpdated = -1;
    }
    Pie.prototype = Object.create(HTMLWidget.prototype);
    Pie.prototype.constructor = Pie;
    Pie.prototype._class += " amchart_Pie";
    Pie.prototype.implements(I2DChart.prototype);

    Pie.prototype.publish("paletteID", "default", "set", "Palette ID", Pie.prototype._palette.switch(), {tags:["Basic","Shared"]});
    Pie.prototype.publish("fontSize", 11, "number", "Font Size",null,{tags:["Basic","Shared"]});
    Pie.prototype.publish("fontFamily", "Verdana", "string", "Font Name",null,{tags:["Basic","Shared","Shared"]});
    Pie.prototype.publish("fontColor", "#000000", "html-color", "Font Color",null,{tags:["Basic","Shared"]});

    Pie.prototype.publish("Depth3D", 0, "number", "3D Depth (px)",null,{tags:["Basic"]});
    Pie.prototype.publish("Angle3D", 0, "number", "3D Angle (Deg)",null,{tags:["Basic"]});

    Pie.prototype.publish("marginLeft", 0, "number", "Margin (Left)",null,{tags:["Intermediate"]});
    Pie.prototype.publish("marginRight", 0, "number", "Margin (Right)",null,{tags:["Intermediate"]});
    Pie.prototype.publish("marginTop", 0, "number", "Margin (Top)",null,{tags:["Intermediate"]});
    Pie.prototype.publish("marginBottom", 0, "number", "Margin (Bottom)",null,{tags:["Intermediate"]});

    Pie.prototype.publish("reverseDataSorting", false, "boolean", "Reverse Data Sorting",null,{tags:["Intermediate"]});

    Pie.prototype.publish("holePercent", 0, "number", "Hole Size (Percent)",null,{tags:["Basic"]});

    Pie.prototype.publish("radius", null, "number", "Radius",null,{tags:["Basic"]});
    Pie.prototype.publish("pieAlpha", [], "array", "Individual Alpha per Slice",null,{tags:["Private"]});

    Pie.prototype.publish("labelPosition", "outside", "set", "Label Position", ["inside","outside"],{tags:["Intermediate"]});

    Pie.prototype.publish("useClonedPalette", false, "boolean", "Enable or disable using a cloned palette",null,{tags:["Intermediate","Shared"]});
    Pie.prototype.publish("selectionMode", "simple", "set", "Selection Mode", ["simple", "multi"], { tags: ["Intermediate"] });
    Pie.prototype.publish("selectionColor", "#f00", "html-color", "Font Color",null,{tags:["Basic"]});

    Pie.prototype.calcRadius = function (_) {
        return Math.min(this._size.width, this._size.height) / 2 - 2;
    };

    Pie.prototype.updateChartOptions = function() {
        this._chart.type = "pie";
        
        this._chart.labelsEnabled = true;

        if (this.labelPosition()==="inside") {
            this._chart.radius = "50%";
            this._chart.labelRadius = -40;
            this._chart.pullOutRadius = "20%";
        } else {
            this._chart.radius = "45%";
            this._chart.labelRadius = 20;
            this._chart.pullOutRadius = "20%";
        }

        this._chart.labelFunction = function(d) {
            return d.title;
        };
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }

        this._chart.depth3D = this.Depth3D();
        this._chart.angle = this.Angle3D();
        this._chart.innerRadius = this.holePercent()+"%";
        this._chart.fontFamily = this.fontFamily();
        this._chart.fontSize = this.fontSize();
        this._chart.fontSize = this.fontSize();
        this._chart.color = this.fontColor();

        this._chart.titleField = this.columns()[0];
        this._chart.valueField = this.columns()[1];

        var sortingMethod;
        if(this.reverseDataSorting()){
            sortingMethod = function(a,b){ return a[1] < b[1] ? 1 : -1; };
        } else {
            sortingMethod = function(a,b){ return a[1] > b[1] ? 1 : -1; };
        }
        this.data().sort(sortingMethod);

        this._chart.colorField = "sliceColor";

        if (this._dataUpdated > this._prevDataUpdated || this._columnsUpdated > this._prevColumnsUpdated) {
            this._chart.dataProvider = this.formatData(this.data());
        }
        this._prevDataUpdated = this._dataUpdated;
        this._prevColumnsUpdated = this._columnsUpdated;

        this._chart.colors = this.data().map(function (row) {
            return this._palette(row[0]);
        }, this);
        this._chart.pullOutOnlyOne = this.selectionMode() === "simple";

        this.pieAlpha().forEach(function(d,i) {
            if (typeof(this._chart.chartData[i])==="undefined") {
                this._chart.chartData[i] = {};
            }
            this._chart.chartData[i].alpha = d;
        },this);

        return this._chart;
    };

    Pie.prototype.formatData = function(dataArr){
        var dataObjArr = [];
        var context = this;
        dataArr.forEach(function(dataRow){
            var dataObj = {};
            context.columns().forEach(function(colName,cIdx){
                dataObj[colName] = dataRow[cIdx];
            });
            dataObjArr.push(dataObj);
        });
        return dataObjArr;
    };

    Pie.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        var context = this;
        var initObj = {
            type: "pie",
            addClassNames: true,
            theme: "none"
        };
        if (typeof define === "function" && define.amd) {
            initObj.pathToImages = require.toUrl("amchartsImg");
        }
        this._chart = AmCharts.makeChart(domNode, initObj);
        this._chart.addListener("clickSlice", function(e) {
            var field = e.chart.colorField;
            var data = e.dataItem.dataContext;

            if (data[field] !== null && data[field] !== undefined) {
                delete data[field];
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = null;
                }
            } else {
                data[field] = context.selectionColor();
                if (context.selectionMode() === "simple") {
                    if (context._selected !== null) {
                        delete context._selected.data[context._selected.field];
                    }
                    context._selected = {
                        field: field,
                        data: data,
                        cIdx: 1,
                        dIdx: e.dataItem.index
                    };
                    context._selections.push(context._selected);
                }
            }

            e.chart.validateData();

            context.click(context.rowToObj(context.data()[e.dataItem.index]), context.columns()[1], context._selected !== null);
        });
    };

    Pie.prototype.update = function(domNode, element) {
        this._palette = this._palette.switch(this.paletteID());
        if (this.useClonedPalette()) {
            this._palette = this._palette.cloneNotExists(this.paletteID() + "_" + this.id());
        }

        domNode.style.width = this.size().width + "px";
        domNode.style.height = this.size().height + "px";

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    Pie.prototype.render = function(callback) {
        return HTMLWidget.prototype.render.apply(this, arguments);
    };

    Pie.prototype.data = function(_) {
        if (arguments.length) {
            this._dataUpdated++;
        }
        return HTMLWidget.prototype.data.apply(this, arguments);
    };

    Pie.prototype.columns = function(_) {
        if (arguments.length) {
            this._columnsUpdated++;
        }
        return HTMLWidget.prototype.columns.apply(this, arguments);
    };

    return Pie;
}));

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Polar.js',["d3", "./CommonRadar", "amcharts.radar", "../api/INDChart"], factory);
    } else {
        root.amchart_Polar = factory(root.d3, root.amchart_CommonRadar, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonRadar, AmCharts, INDChart) {
    function Polar() {
        CommonRadar.call(this);
        this._tag = "div";
        this._gType = "column";
    }
    Polar.prototype = Object.create(CommonRadar.prototype);
    Polar.prototype.constructor = Polar;
    Polar.prototype._class += " amchart_Polar";
    Polar.prototype.implements(INDChart.prototype);

    Polar.prototype.publish("paletteID", "default", "set", "Palette ID", Polar.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Polar.prototype.enter = function(domNode, element) {
        CommonRadar.prototype.enter.apply(this, arguments);
    };

    Polar.prototype.updateChartOptions = function() {
        CommonRadar.prototype.updateChartOptions.apply(this, arguments);

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Polar.prototype.buildGraphs = function(gType) {
        this._chart.graphs = [];

        for (var i = 0; i < this.columns().length - 1; i++) {
            var gRetVal = CommonRadar.prototype.buildGraphObj.call(this, gType, i);
            var gObj = buildGraphObj.call(this, gRetVal, this._valueField[i], i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj,valueField) {
            gObj.valueField = valueField;
            return gObj;
        }
    };

    Polar.prototype.update = function(domNode, element) {
        CommonRadar.prototype.update.apply(this, arguments);
        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();
    };

    return Polar;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Pyramid.js',["d3", "./CommonFunnel", "amcharts.funnel", "../api/I2DChart"], factory);
    } else {
        root.amchart_Pyramid = factory(root.d3, root.amchart_CommonFunnel, root.amcharts, root.api_I2DChart);
    }
}(this, function(d3, CommonFunnel, AmCharts, I2DChart) {
    function Pyramid() {
        CommonFunnel.call(this);
        this._tag = "div";
    }

    Pyramid.prototype = Object.create(CommonFunnel.prototype);
    Pyramid.prototype.constructor = Pyramid;
    Pyramid.prototype._class += " amchart_Pyramid";
    Pyramid.prototype.implements(I2DChart.prototype);

    Pyramid.prototype.publish("paletteID", "default", "set", "Palette ID", Pyramid.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Pyramid.prototype.enter = function(domNode, element) {
        CommonFunnel.prototype.enter.apply(this, arguments);
    };

    Pyramid.prototype.updateChartOptions = function() {
        CommonFunnel.prototype.updateChartOptions.apply(this, arguments);
    };

    Pyramid.prototype.update = function(domNode, element) {
        CommonFunnel.prototype.update.apply(this, arguments);
    };

    return Pyramid;
}));


(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define('amchart/Scatter.js',["d3", "./CommonXY", "amcharts.xy", "../api/INDChart"], factory);
    } else {
        root.amchart_Scatter = factory(root.d3, root.amchart_CommonXY, root.amcharts, root.api_INDChart);
    }
}(this, function(d3, CommonXY, AmCharts, INDChart) {
    function Scatter() {
        CommonXY.call(this);
        this._tag = "div";

        this._type = "Scatter";
        this._gType = "column";
    }
    Scatter.prototype = Object.create(CommonXY.prototype);
    Scatter.prototype.constructor = Scatter;
    Scatter.prototype._class += " amchart_Scatter";
    Scatter.prototype.implements(INDChart.prototype);

    Scatter.prototype.publish("paletteID", "default", "set", "Palette ID", Scatter.prototype._palette.switch(), {tags:["Basic","Shared"]});

    Scatter.prototype.publish("scatterType", "scatter", "set", "Bullet Type", ["scatter", "bubble"],{tags:["Basic"]});

    Scatter.prototype.enter = function(domNode, element) {
        CommonXY.prototype.enter.apply(this, arguments);
    };

    Scatter.prototype.updateChartOptions = function() {
        CommonXY.prototype.updateChartOptions.apply(this, arguments);

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Scatter.prototype.buildGraphs = function(gType) {
        this._chart.graphs = [];

        for (var i = 0; i < this.columns().length; i++) {
            var gRetVal = CommonXY.prototype.buildGraphObj.call(this, gType, i);
            var gObj = buildGraphObj.call(this, gRetVal, i);

            this._chart.addGraph(gObj);
        }

        function buildGraphObj(gObj) {
            if (this.scatterType() === "bubble") {
                gObj["valueField"] = this.columns()[2];
            } else {
                delete gObj["valueField"];
            }
            return gObj;
        }
    };

    Scatter.prototype.update = function(domNode, element) {
        CommonXY.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();

    };

    return Scatter;
}));
