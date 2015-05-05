"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.gauge", "../api/I1DChart"], factory);
    } else {
        root.amcharts_Gauge = factory(root.d3, root.common_HTMLWidget, root.amcharts, root.api_I1DChart);
    }
}(this, function(d3, HTMLWidget, AmCharts, I1DChart) {
    function Gauge() {
        HTMLWidget.call(this);
        this._class = "amcharts_Gauge";
        this._tag = "div";

        this._chart = {};
        this._data;
        this._colors = [];
    };
    
    Gauge.prototype = Object.create(HTMLWidget.prototype);
    Gauge.prototype.implements(I1DChart.prototype);

    Gauge.prototype.publish("paletteID", "default", "set", "Palette ID", Gauge.prototype._palette.switch());
    Gauge.prototype.publish("colorType", "a", "set", "", ["a","b","c"]);
    
    Gauge.prototype.publish("marginLeft", null, "number", "Margin (Left)");
    Gauge.prototype.publish("marginRight", null, "number", "Margin (Right)");
    Gauge.prototype.publish("marginTop", null, "number", "Margin (Top)");
    Gauge.prototype.publish("marginBottom", null, "number", "Margin (Bottom)");

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
    Gauge.prototype.publish("bottomTextYOffset", -20, "number", "");
    
    Gauge.prototype.publish("animateDuration", 2, "number", "");

    Gauge.prototype.publish("globalTooltipText","[[category]]([[title]]): [[value]]", "string", "Tooltip Text");
    
    Gauge.prototype.updateChartOptions = function() {

        var context = this;
        this._chart.type = "gauge";
        this._chart.theme = "none";
        this._chart.pathToImages = "//cdn.rawgit.com/cdnjs/cdnjs/master/ajax/libs/amcharts/3.13.0/images/";

        this._chart.startDuration = this.animateDuration();
                        
        this._chart.titles = [];
        this._chart.allLabels = [];
        
        if (this.marginLeft()) { this._chart.marginLeft = this.marginLeft(); }
        if (this.marginRight()) { this._chart.marginRight = this.marginRight(); }
        if (this.marginTop()) { this._chart.marginTop = this.marginTop(); }
        if (this.marginBottom()) { this._chart.marginBottom = this.marginBottom(); }
        
        this._chart.axes[0].axisThickness = this.axisThickness();
        this._chart.axes[0].axisAlpha = this.axisAlpha();
        this._chart.axes[0].tickAlpha = this.tickAlpha();
        this._chart.axes[0].valueInterval = this.valueInterval();
        this._chart.axes[0].bands = [];
        this._chart.axes[0].bottomText = this.bottomText();
        this._chart.axes[0].axisThickness = this.axisThickness();
        this._chart.axes[0].bottomTextYOffset = this.bottomTextYOffset();
        this._chart.axes[0].endValue = this.high();
        this._chart.axes[0].startValue = this.low();

        // 3 Color Methods
        if (this.colorType() == 'a') {
            for (var i = 0, l = this.numBands(); i < l; i++) {
                var band = {
                    color: this.bandsColor()[i],
                    startValue: this.bandsStartValue()[i],
                    endValue: this.bandsEndValue()[i],
                    innerRadius: this.bandsInnerRadius()[i],
                }
                this._chart.axes[0].bands.push(band);
            }
        }
        if (this.colorType() == 'b') {
            for (var i = 0, l = this.high(); i < l; i++) {
                var band = {
                    color: this._palette(i, this.low(), this.high()),
                    startValue: i,
                    endValue: i+1,
                    //innerRadius: this._bandsInnerRadius[i] || '', // this has a cool effect might be useful?
                    innerRadius: this.bandsInnerRadius()[0]
                }
                this._chart.axes[0].bands.push(band);
            } 
        }
        if (this.colorType() == 'c') {
            var band = {
                color: this._palette(this._data, this.low(), this.high()),
                startValue: this.low(),
                endValue: this.high(),
                innerRadius: this.bandsInnerRadius()[0],
            }
            this._chart.axes[0].bands.push(band);
        }
        
        this._chart.axes[0].bottomText = this.bottomText().replace("[[data]]",this._data);
        
        return this._chart;
    };

    Gauge.prototype.update = function(domNode, element) {
        var context = this;   
        this._palette = this._palette.switch(this.paletteID()); 
        
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
