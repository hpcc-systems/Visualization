"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.gauge", "../../chart/I1DChart"], factory);
    } else {
        root.Gauge = factory(root.d3, root.HTMLWidget, root.amcharts, root.I1DChart);
    }
}(this, function(d3, HTMLWidget, AmCharts, I1DChart) {
    function Gauge() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Gauge";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._colors = [];
    };
    
    Gauge.prototype = Object.create(HTMLWidget.prototype);
    Gauge.prototype.implements(I1DChart.prototype);
    
    Gauge.prototype.publish("paletteID", "default", "set", "Palette ID", Gauge.prototype._palette.switch());
    Gauge.prototype.publish("colorType", "a", "set", "", ["a","b","c"]);
    
    Gauge.prototype.publish("marginLeft", 0, "number", "Margin (Left)");
    Gauge.prototype.publish("marginRight", 0, "number", "Margin (Right)");
    
    Gauge.prototype.publish("low", 0, "number", "Gauge lower bound");
    Gauge.prototype.publish("high", 100, "number", "Gauge higher bound");

    Gauge.prototype.publish("numBands", null, "number", "");
    Gauge.prototype.publish("bandsColor", [], "array", "");
    Gauge.prototype.publish("bandsStartValue", [], "array", "");
    Gauge.prototype.publish("bandsEndValue", [], "array", "");
    Gauge.prototype.publish("bandsInnerRadius", [], "array", "");
    
    Gauge.prototype.publish("axisThickness", 1, "number", "");
    Gauge.prototype.publish("axisAlpha", 0.2, "number", "");
    Gauge.prototype.publish("tickAlpha", 0.2, "number", "");
    Gauge.prototype.publish("valueInterval", 20, "number", "");
    Gauge.prototype.publish("bottomText", "", "string", "");
    
    Gauge.prototype.publish("animateDuration", 2, "number", "");

    Gauge.prototype.updateChartOptions = function() {

        var context = this;
        this._chart.type = "gauge";
        this._chart.theme = "none";
        this._chart.pathToImages = "//cdn.amcharts.com/lib/3/images/";
        this._chart.dataDateFormat = this._dataDateFormat;

        this._chart.startDuration = this._animateDuration;
        this._chart.rotate = this._orientation === "vertical"; // this messes up the hover over things
        this._chart.categoryField = this._categoryField;
        
        this._chart.labelPosition = this._labelPosition;
                        
        this._chart.guides = [];
        this._chart.titles = [];
        this._chart.allLabels = [];
        
        this._chart.marginLeft = this._marginLeft;
        this._chart.marginRight = this._marginRight;
        
        this._chart.axes[0].axisThickness = this._axisThickness;
        this._chart.axes[0].axisAlpha = this._axisAlpha;
        this._chart.axes[0].tickAlpha = this._tickAlpha;
        this._chart.axes[0].valueInterval = this._valueInterval;
        this._chart.axes[0].bands = [];
        this._chart.axes[0].bottomText = this._bottomText;
        this._chart.axes[0].axisThickness = this._axisThickness;
        this._chart.axes[0].bottomTextYOffset = -20;
        this._chart.axes[0].endValue = this._high;
        this._chart.axes[0].startValue = this._low;

        // 3 Color Methods
        if (this._colorType == 'a') {
            for (var i = 0, l = this._numBands; i < l; i++) {
                var band = {
                    color: this._bandsColor[i],
                    startValue: this._bandsStartValue[i],
                    endValue: this._bandsEndValue[i],
                    innerRadius: this._bandsInnerRadius[i],
                }
                this._chart.axes[0].bands.push(band);
            }
        }
        if (this._colorType == 'b') {
            for (var i = 0, l = this._high; i < l; i++) {
                var band = {
                    color: this._palette(i, this._low, this._high),
                    startValue: i,
                    endValue: i+1,
                    //innerRadius: this._bandsInnerRadius[i] || '', // this has a cool effect might be useful?
                    innerRadius: this._bandsInnerRadius[0]
                }
                this._chart.axes[0].bands.push(band);
            } 
        }
        if (this._colorType == 'c') {
            var band = {
                color: this._palette(this._data, this._low, this._high),
                startValue: this._low,
                endValue: this._high,
                innerRadius: this._bandsInnerRadius[0],
            }
            this._chart.axes[0].bands.push(band);
        }
        
        this._chart.axes[0].bottomText = this._bottomText.replace("[[data]]",this._data);
        
        return this._chart;
    };

    Gauge.prototype.update = function(domNode, element) {
        var context = this;   
        this._palette = this._palette.switch(this._paletteID);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        this.updateChartOptions();
        this._chart.arrows[0].setValue(this._data);
        
        this._chart.validateNow();
        this._chart.validateData();   
    };

    Gauge.prototype.enter = function(domNode, element) {
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var initObj = {
            theme: "none",
            type: "gauge",
            axes: [{}],
            arrows:[{}]
        }
        this._chart = AmCharts.makeChart(domNode, initObj);

    };
        
    Gauge.prototype.testData = function() {
        this.numBands(3);
        this.bandsColor(["#84b761","#fdd400","#cc4748"]);
        this.bandsEndValue([90,130,220]);
        this.bandsStartValue([0,90,130]);
        this.bandsInnerRadius([null,null,"95%"])
        this.bottomText("[[data]] km/h");
        this.high(220);
        this.low(0);
        this.data(100);
        this.axisThickness(1);
        this.axisAlpha(0.2);
        this.tickAlpha(0.2);
        this.valueInterval(20); 
        
        return this;
    };
    
    return Gauge;
}));
