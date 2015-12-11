"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../layout/Surface", "../layout/Border", "../chart/MultiChart", "../common/Text", "../other/Legend"], factory);
    } else {
        root.composite_MegaChart = factory(
                root.layout_Surface,
                root.layout_Border,
                root.chart_MultiChart,
                root.common_Text,
                root.other_Legend
            )
        ;
    }
}(this, function (Surface, Border, MultiChart, Text, Legend) {
    function MegaChart() {
        Surface.call(this);

        this._tag = "div";
        this._chart = new MultiChart();
        var context = this;
        this._chart.click = function () {
            context.click.apply(this, arguments);
        };

        this._layout = new Border();
        
        this._valueTitle = new Text();
        this._domainTitle = new Text();
    }
    MegaChart.prototype = Object.create(Surface.prototype);
    MegaChart.prototype.constructor = MegaChart;
    MegaChart.prototype._class += " composite_MegaChart";

    MegaChart.prototype._1DChartTypes = MultiChart.prototype._1DChartTypes;
    MegaChart.prototype._2DChartTypes = MultiChart.prototype._2DChartTypes;
    MegaChart.prototype._NDChartTypes = MultiChart.prototype._NDChartTypes;
    MegaChart.prototype._anyChartTypes = MultiChart.prototype._anyChartTypes;
    MegaChart.prototype._allChartTypes = MultiChart.prototype._allChartTypes;

    MegaChart.prototype.publishProxy("valueAxisTitle","_valueTitle","text");
    MegaChart.prototype.publishProxy("domainAxisTitle","_domainTitle","text");
    
    MegaChart.prototype.publish("showLegend",false,"boolean","Show/Hide Legend", null, {tags:["Basic"]});
    
    MegaChart.prototype.publish("gutter", 0, "number", "Gap Between Cells",null,{tags:["Basic"]});
    
    MegaChart.prototype.publishProxy("chartType", "_chart", "chartType"); 
        
    MegaChart.prototype.enter = function (domNode, element) {
        Surface.prototype.enter.apply(this, arguments);
        
        this._layout.setContent("center", this._chart.chartType(this.chartType()));
        
        this._layout.setContent("right", new Legend().fixedSize(true).targetWidget(this._layout.getContent("center")));
        
        this._layout.setContent("left", this._valueTitle.rotation(-90));
        this._layout.setContent("bottom", this._domainTitle);
        
        this.widget(this._layout);
    };
    MegaChart.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);
        
        if(this._layout !== null){
            this._layout
                .gutter(this.gutter())
                .leftShrinkWrap(true)
                .rightShrinkWrap(true)
                .bottomShrinkWrap(true);
        
            this._layout
                .getContent("center")
                    .columns(this.columns())
                    .data(this.data());
            
            if(this._layout.getContent("center").chartType() !== this.chartType()){
                this._layout.getContent("center").chartType(this.chartType());
            }
        }
        if(this.showLegend()){
            this._layout.setContent("right", new Legend().fixedSize(true).targetWidget(this._layout.getContent("center")));
        } else {
            this._layout.clearContent("right");
        }
    };
    MegaChart.prototype.exit = function (domNode, element) {
        Surface.prototype.exit.apply(this, arguments);
    };

    return MegaChart;
}));