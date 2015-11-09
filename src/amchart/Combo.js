"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "./CommonSerial", "amcharts.serial", "../api/INDChart", "css!./Combo"], factory);
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

    Combo.prototype.publish("defaultType", "column", "set", "Default chart type", ["bar","line","spline","area","area-spline","step","area-step","scatter"],{tags:["Basic"]});
    Combo.prototype.publish("types", [], "array", "Array of chart types (ex:bar|line|spline|area|area-spline|step|area-step|scatter)",null,{tags:["Basic"]});
    
    Combo.prototype.publish("charts", [], "widgetArray", "widgets", null, { tags: ["Basic"] }); // perhaps we want to load up the params on a chart and pass in the chart and just read the params there?

    Combo.prototype.enter = function(domNode, element) {
        CommonSerial.prototype.enter.apply(this, arguments);
    };

    Combo.prototype.updateChartOptions = function() {
        CommonSerial.prototype.updateChartOptions.apply(this, arguments);

        this._chart.colors = this.columns().filter(function (d, i) { return i > 0; }).map(function (row) {
            return this._palette(row);
        }, this);

        // Stacked
        if(this.stacked()){
            this._chart.valueAxes[0].stackType = this.stackType();
        } else {
            this._chart.valueAxes[0].stackType = "none";
        }

        this.buildGraphs(this._gType);

        return this._chart;
    };

    Combo.prototype.buildGraphs = function() {
        this._chart.graphs = [];

        for(var i = 0; i < this.columns().length - 1; i++) {
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
            //console.log(gType)
            if (gType !== "column") {
                gObj.bullet = this.bulletType();
                gObj.bulletSize = this.bulletSize();
            }
            
            gObj.colorField = "selected" + i;

            gObj.type = gObj.type === "area" ? "line" : gObj.type; // an area chart is a line chart with fillOpacity set
            return gObj;
        }
    };

    Combo.prototype.update = function(domNode, element) {
        CommonSerial.prototype.update.apply(this, arguments);

        this.updateChartOptions();

        this._chart.validateNow();
        this._chart.validateData();

        // domNode.style.width = this.size().width + "px";
        // domNode.style.height = this.size().height + "px";
    };

    return Combo;
}));
