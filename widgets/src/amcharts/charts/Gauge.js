"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3/d3", "../../common/HTMLWidget", "amcharts.gauge", "../../chart/I1DChart"], factory);
    } else {
        root.Gauge = factory(root.d3, root.HTMLWidget, root.amcharts, root.I1DChart);
    }
//}(this, function (d3, SVGWidget, amcharts) {
}(this, function(d3, HTMLWidget, AmCharts, I1DChart) {
    function Gauge() {
        HTMLWidget.call(this);
        this._class = "amcharts_charts_Gauge";
        this._tag = "div";

        this._chart = null;
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
    
    Gauge.prototype.publish("animateStartDuration", 1, "number", "");

    Gauge.prototype.getChartOptions = function() {
        var context = this;
        var chartOptions = {
            "type": "gauge",
            "pathToImages": "http://cdn.amcharts.com/lib/3/images/",
            "balloonText": '',
            "labelPosition": this._labelPosition,
            "marginLeft": this._marginLeft,
            "marginRight": this._marginRight,
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "startDuration": this._animateStartDuration,
            "axes": [{
                "axisThickness":this._axisThickness,
                "axisAlpha":this._axisAlpha,
                "tickAlpha":this._tickAlpha,
                "valueInterval":this._valueInterval,
                "bands": [],
                "bottomText": this._bottomText,
                "bottomTextYOffset": -20,
                "endValue": this._high,
                "startValue": this._low,
                }],
                "arrows": [{}]
        };
        
        // 3 Color Methods
        if (this._colorType == 'a') {
            for (var i = 0, l = this._numBands; i < l; i++) {
                var band = {
                    color: this._bandsColor[i],
                    startValue: this._bandsStartValue[i],
                    endValue: this._bandsEndValue[i],
                    innerRadius: this._bandsInnerRadius[i],
                }
                chartOptions.axes[0].bands.push(band);
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
                chartOptions.axes[0].bands.push(band);
            } 
        }
        if (this._colorType == 'c') {
            var band = {
                color: this._palette(this._data, this._low, this._high),
                startValue: this._low,
                endValue: this._high,
                innerRadius: this._bandsInnerRadius[0],
            }
            chartOptions.axes[0].bands.push(band);
        }
        
        chartOptions.axes[0].bottomText = this._bottomText.replace("[[data]]",this._data);
        
        return chartOptions;
    };

    Gauge.prototype.update = function(domNode, element) {
        var context = this;   
        this._palette = this._palette.switch(this._paletteID);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';

        var chartOptions = this.getChartOptions();
        
        mergeJSON(chartOptions,this._chart);
        this._chart.arrows[0].setValue(this._data);
        
        this._chart.validateNow();
                
        //TODO: REMOVE THIS when we're using the licensed version...
        document.getElementsByTagName('svg')[0].nextElementSibling.innerHTML = '';
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
    
    Gauge.prototype.enter = function(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        
        domNode.style.width = this.size().width + 'px';
        domNode.style.height = this.size().height + 'px';
        
        var chartOptions = this.getChartOptions();
        this._chart = AmCharts.makeChart(domNode, chartOptions);
    };
    
    function mergeJSON(source1,source2){
        var mergedJSON = source2;
        for (var attrname in source1) {
            if(mergedJSON.hasOwnProperty(attrname)) {
                if(source1[attrname] != null && typeof(source1[attrname]) === 'object'){
                    mergeJSON(source1[attrname], mergedJSON[attrname]);
                } else {
                    mergedJSON[attrname] = source1[attrname];
                }
            } else {
                mergedJSON[attrname] = source1[attrname];
            }
        }
    }

    return Gauge;
}));
