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
    
    MegaChart.prototype.publish("legendPosition","right","set","Position of the Legend widget", ["none","top","right","bottom","left"], {tags:["Basic"]});
    
    MegaChart.prototype.publish("gutter", 0, "number", "Gap Between Cells",null,{tags:["Basic"]});
    
    MegaChart.prototype.publishProxy("chartType", "_chart", "chartType"); 

    MegaChart.prototype.enter = function (domNode, element) {
        Surface.prototype.enter.apply(this, arguments);
        
        this._layout.setContent("center", this._chart.chartType(this.chartType()));
        
        this._legend = new Legend().fixedSize(true).targetWidget(this._chart);
        this._legend.orientation(["top","bottom"].indexOf(this.legendPosition()) !== -1 ? "horizontal" : "vertical");
        
        this._prevLegendPosition = this.legendPosition();
        
        if(this.valueAxisTitle()){
            this._layout.setContent("left", this._valueTitle.rotation(-90));
        }
        if(this.domainAxisTitle()){
            this._layout.setContent("bottom", this._domainTitle);
        }
        if(this.legendPosition() !== "none"){
            this._layout.setContent(this.legendPosition(), this._legend);
        }
        
        this.widget(this._layout);
    };
    
    MegaChart.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);
        
        this._layout
            .gutter(this.gutter())
            .topShrinkWrap(true)
            .leftShrinkWrap(true)
            .rightShrinkWrap(true)
            .bottomShrinkWrap(true);


        this._chart
                .columns(this.columns())
                .data(this.data());

        if(this._chart.chartType() !== this.chartType()){
            this._chart.chartType(this.chartType());
        }
        
        if(this._prevLegendPosition !== this.legendPosition()){
            if(this._prevLegendPosition !== "none"){
                this._layout.clearContent(this._prevLegendPosition);
            } 
            this._prevLegendPosition = this.legendPosition();
            if(this.legendPosition() !== "none"){
                this._legend = new Legend().fixedSize(true).targetWidget(this._layout.getContent("center"));
                this._layout.setContent(this.legendPosition(), this._legend);
                this._legend.orientation(["top","bottom"].indexOf(this.legendPosition()) !== -1 ? "horizontal" : "vertical");
            }
        }
        this._contentClasses = this.getContentClasses();
        
        if(this.valueAxisTitle() && this._contentClasses.left !== "common_Text"){
            if(this.legendPosition() !== "left"){
                this._layout.setContent("left", this._valueTitle.rotation(-90));
            }
        }
        if(this.domainAxisTitle() && this._contentClasses.bottom !== "common_Text"){
            if(this.legendPosition() !== "bottom"){
                this._layout.setContent("bottom", this._domainTitle);
            }
        }
        
        this._legend.dataFamily(this._chart.getChartDataFamily());
    };
    
    MegaChart.prototype.exit = function (domNode, element) {
        Surface.prototype.exit.apply(this, arguments);
    };
    
    MegaChart.prototype.getContentClasses = function () {
        var obj = {};
        var t = this._layout.getContent("top");
        var r = this._layout.getContent("right");
        var b = this._layout.getContent("bottom");
        var l = this._layout.getContent("left");
        obj.top = t !== null ? t.classID() : undefined;
        obj.right = r !== null ? r.classID() : undefined;
        obj.bottom = b !== null ? b.classID() : undefined;
        obj.left = l !== null ? l.classID() : undefined;
        return obj;
    };

    return MegaChart;
}));