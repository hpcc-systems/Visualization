"use strict";
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "amcharts.gauge", "../api/I1DChart"], factory);
    } else {
        root.amchart_Gauge = factory(root.d3, root.common_HTMLWidget, root.AmCharts, root.api_I1DChart);
    }
}(this, function(d3, HTMLWidget, AmCharts, I1DChart) {
    function Gauge() {
        HTMLWidget.call(this);
        this._tag = "div";

        this._chart = {};
    }

    Gauge.prototype = Object.create(HTMLWidget.prototype);
    Gauge.prototype.implements(I1DChart.prototype);
    Gauge.prototype._class += " amchart_Gauge";

    /**
     * Publish Params Common To Other Libraries
     */
    Gauge.prototype.publish("paletteID", "default", "set", "Palette ID", Gauge.prototype._palette.switch(), {tags:['Basic','Shared']});
    Gauge.prototype.publish("low", 0, "number", "Gauge lower bound", null, {tags:['Intermediate','Shared']});
    Gauge.prototype.publish("high", 100, "number", "Gauge higher bound", null, {tags:['Intermediate','Shared']});

    Gauge.prototype.publish("fontSize", null, "number", "Font Size",null,{tags:['Basic','Shared']});
    Gauge.prototype.publish("fontFamily", null, "string", "Font Name",null,{tags:['Basic','Shared','Shared']});
    Gauge.prototype.publish("fontColor", null, "html-color", "Font Color",null,{tags:['Basic','Shared']});

    /**
     * Publish Params Unique To This Widget
     */
    Gauge.prototype.publish("axisLineWidth", 1, "number", "Thickness of axis",null,{tags:['Intermediate']});

    Gauge.prototype.publish("colorType", "a", "set", "", ["a","b","c"],{tags:['Basic']});

    Gauge.prototype.publish("marginLeft", null, "number", "Margin (Left)",null,{tags:['Intermediate']});
    Gauge.prototype.publish("marginRight", null, "number", "Margin (Right)",null,{tags:['Intermediate']});
    Gauge.prototype.publish("marginTop", null, "number", "Margin (Top)",null,{tags:['Intermediate']});
    Gauge.prototype.publish("marginBottom", null, "number", "Margin (Bottom)",null,{tags:['Intermediate']});

    Gauge.prototype.publish("numBands", null, "number", "",null,{tags:['Intermediate']});
    Gauge.prototype.publish("bandsColor", [], "array", "Bands Color",null,{tags:['Basic']});
    Gauge.prototype.publish("bandsStartValue", [], "array", "Bands Start Value",null,{tags:['Advanced']});
    Gauge.prototype.publish("bandsEndValue", [], "array", "Bands End Value",null,{tags:['Advanced']});
    Gauge.prototype.publish("bandsInnerRadius", [], "array", "Bands Inner Radius",null,{tags:['Advanced']});

    Gauge.prototype.publish("axisAlpha", 0.2, "number", "Axis Alpha",null,{tags:['Intermediate']});
    Gauge.prototype.publish("tickAlpha", 0.2, "number", "Tick Alpha",null,{tags:['Intermediate']});
    Gauge.prototype.publish("valueInterval", 20, "number", "Value Interval",null,{tags:['Advanced']});
    Gauge.prototype.publish("bottomText", "", "string", "Text Along Bottom",null,{tags:['Intermediate']});
    Gauge.prototype.publish("bottomTextYOffset", -20, "number", "Bottom Text Vertical Offset",null,{tags:['Intermediate']});

    Gauge.prototype.publish("animatationDuration", 2, "number", "Animation Duration (sec)",null,{tags:['Intermediate']});

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
        if (this.colorType() === 'a') {
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
        if (this.colorType() === 'b') {
            for (i = 0, l = this.high() ; i < l; i++) {
                var b_band = {
                    color: this._palette(i, this.low(), this.high()),
                    startValue: i,
                    endValue: i+1,
                    //innerRadius: this._bandsInnerRadius[i] || '', // this has a cool effect might be useful?
                    innerRadius: this.bandsInnerRadius()[0]
                };
                this._chart.axes[0].bands.push(b_band);
            }
        }
        if (this.colorType() === 'c') {
            var c_band = {
                color: this._palette(this._data, this.low(), this.high()),
                startValue: this.low(),
                endValue: this.high(),
                innerRadius: this.bandsInnerRadius()[0]
            };
            this._chart.axes[0].bands.push(c_band);
        }

        this._chart.axes[0].bottomText = this.bottomText().replace("[[data]]",this._data);

        return this._chart;
    };

    Gauge.prototype.update = function(domNode, element) {
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
        };
        this._chart = AmCharts.makeChart(domNode, initObj);
    };

    Gauge.prototype.testData = function() {
        this.numBands(3);
        this.bandsColor(["#84b761","#fdd400","#cc4748"]);
        this.bandsEndValue([90,130,220]);
        this.bandsStartValue([0,90,130]);
        this.bandsInnerRadius([null, null, "95%"]);
        this.bottomText("[[data]] km/h");
        this.high(220);
        this.low(0);
        this.data(100);
        this.axisLineWidth(1);
        this.axisAlpha(0.2);
        this.tickAlpha(0.2);
        this.valueInterval(20);

        return this;
    };

    return Gauge;
}));
