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
    var _chartTypes = new MultiChart()._NDChartTypes;
    function MegaChart() {
        Surface.call(this);

        this._tag = "div";
        
        this._layout = new Border();
        
        this._chart = new MultiChart();
        this._valueTitle = new Text();
        this._domainTitle = new Text();
    }
    MegaChart.prototype = Object.create(Surface.prototype);
    MegaChart.prototype.constructor = MegaChart;
    MegaChart.prototype._class += " composite_MegaChart";

    MegaChart.prototype.publishProxy("valueAxisTitle","_valueTitle","text");
    MegaChart.prototype.publishProxy("domainAxisTitle","_domainTitle","text");
    
    MegaChart.prototype.publish("showLegend",false,"boolean","Show/Hide Legend", null, {tags:["Basic"]});
    
    MegaChart.prototype.publish("gutter", 8, "number", "Gap Between Cells",null,{tags:["Basic"]});
    
    MegaChart.prototype.publish("chartType", "LINE", "set", "Chart Type", _chartTypes.map(function (item) { return item.id; }),{tags:["Basic"]});
    
    MegaChart.prototype.click = function(obj) {
        if(obj.id === this.id()+"_toggle_legend"){
            this.showLegend(!this.showLegend()).render();
        }
    };
    
    MegaChart.prototype.enter = function (domNode, element) {
        Surface.prototype.enter.apply(this, arguments);
        
        this._layout.setContent("center",new MultiChart().chartType(this.chartType()));
        
        this._layout.setContent("right", new Legend().targetWidget(this._layout.getContent("center")));
        
        this._layout.setContent("bottom", this._valueTitle.rotation(-90));
        this._layout.setContent("left", this._domainTitle);
        
        this.buttonAnnotations([{
                id:this.id()+"_toggle_legend",
                label: this.showLegend() ? "\uf0da" : "\uf0d9",
                shape:"square",
                diameter:14,
                padding:"0px 5px",
                font:"FontAwesome"
            }]);
        
        this.widget(this._layout);
    };
    MegaChart.prototype.update = function (domNode, element) {
        Surface.prototype.update.apply(this, arguments);
        
        this.buttonAnnotations([{
                id:this.id()+"_toggle_legend",
                label: this.showLegend() ? "\uf0d9" : "\uf0da",
                shape:"square",
                diameter:14,
                padding:"0px 5px",
                font:"FontAwesome"
            }]);
        
        if(this._layout !== null){
            this._layout
                .gutter(this.gutter())
                .leftShrinkWrap(true)
                .rightShrinkWrap(true)
                .bottomShrinkWrap(true);
        
            this._layout
                .getContent("center")
                    .data(this.data())
                    .columns(this.columns());
            
            if(this._layout.getContent("center").chartType() !== this.chartType()){
                this._layout.getContent("center").chartType(this.chartType());
            }
        }
        
        if(this.showLegend()){
            this._layout.setContent("right", new Legend().targetWidget(this._layout.getContent("center")));
        } else {
            this._layout.clearContent("right");
        }
        if(this.valueAxisTitle() !== ""){
            this._layout.setContent("left", this._valueTitle);
        } else {
            this._layout.clearContent("left");
        }
        
        if(this.domainAxisTitle() !== ""){
            this._layout.setContent("bottom", this._domainTitle);
        } else {
            this._layout.clearContent("bottom");
        }
        this._layout.render();
    };
    MegaChart.prototype.exit = function (domNode, element) {
        Surface.prototype.exit.apply(this, arguments);
    };

    return MegaChart;
}));