
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('composite/MegaChart.js',["../layout/Border", "../chart/MultiChart", "../common/Text", "../other/Legend", "../other/Toolbar", "../form/Select"], factory);
    } else {
        root.composite_MegaChart = factory(
                root.layout_Border,
                root.chart_MultiChart,
                root.common_Text,
                root.other_Legend,
                root.other_Toolbar,
                root.form_Select
            )
        ;
    }
}(this, function (Border, MultiChart, Text, Legend, Toolbar, Select) {
    function MegaChart() {
        Border.call(this);

        this._tag = "div";
        this._chart = new MultiChart();
        var context = this;
        this._chart.click = function () {
            context.click.apply(this, arguments);
        };

        this._toolbar = new Toolbar();
        
        this._valueTitle = new Text();
        this._domainTitle = new Text();
    }
    MegaChart.prototype = Object.create(Border.prototype);
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
    
    MegaChart.prototype.publish("showToolbar",true,"boolean","Enable/Disable Toolbar widget", null, {tags:["Basic"]});
    MegaChart.prototype.publish("showChartSelect",true,"boolean","Show/Hide the chartType dropdown in the toolbar", null, {tags:["Basic"]});
    
    MegaChart.prototype.publishProxy("chartType", "_chart", "chartType");
    MegaChart.prototype.publishProxy("title", "_toolbar", "title");
    MegaChart.prototype.publishProxy("toolbarWidgets", "_toolbar", "widgets");    
    MegaChart.prototype.chartTypeProperties = function (_) {
        if (!arguments.length) return this._chart.chartTypeProperties();
        this._chart.chartTypeProperties(_);
        return this;
    };

    MegaChart.prototype.enter = function (domNode, element) {
        Border.prototype.enter.apply(this, arguments);
        var context = this;
        
        this.setContent("center", this._chart);
        
        this._legend = new Legend().fixedSize(true).targetWidget(this._chart);
        this._legend.orientation(["top","bottom"].indexOf(this.legendPosition()) !== -1 ? "horizontal" : "vertical");
        
        this._prevLegendPosition = this.legendPosition();
        
        if(this.valueAxisTitle()){
            this.setContent("left", this._valueTitle.rotation(-90)).leftShrinkWrap(true);
        }
        if(this.domainAxisTitle()){
            this.setContent("bottom", this._domainTitle).bottomShrinkWrap(true);
        }
        if(this.showToolbar()){
            this.topShrinkWrap(false).topPercentage(0).topSize(30);
            var chartTypeSelect = new Select()
                .selectOptions(this._allChartTypes.map(function(a){return [a.id,a.display];}))
                .value(this.chartType())
            ;
            chartTypeSelect.change = function(a){
                context.chartType(a.value()).render();
            };
            this.toolbarWidgets([chartTypeSelect]);
            this.setContent("top", this._toolbar);
        }
        if(this.legendPosition() !== "none"){
            this.setContent(this.legendPosition(), this._legend)[this.legendPosition()+"ShrinkWrap"](true);
        }
    };
    
    MegaChart.prototype.update = function (domNode, element) {

        this._chart
                .columns(this.columns())
                .data(this.data());

        if(this._chart.chartType() !== this.chartType()){
            this._chart.chartType(this.chartType());
        }
        
        if(this._prevLegendPosition !== this.legendPosition()){
            if(this._prevLegendPosition !== "none"){
                this.clearContent(this._prevLegendPosition);
            } 
            this._prevLegendPosition = this.legendPosition();
            if(this.legendPosition() !== "none"){
                this._legend = new Legend().fixedSize(true).targetWidget(this.getContent("center"));
                this.setContent(this.legendPosition(), this._legend);
                this._legend.orientation(["top","bottom"].indexOf(this.legendPosition()) !== -1 ? "horizontal" : "vertical");
            }
        }
        this._contentClasses = this.getContentClasses();
        
        if(this.valueAxisTitle() && this._contentClasses.left !== "common_Text"){
            if(this.legendPosition() !== "left"){
                this.setContent("left", this._valueTitle.rotation(-90));
            }
        }
        if(this.domainAxisTitle() && this._contentClasses.bottom !== "common_Text"){
            if(this.legendPosition() !== "bottom"){
                this.setContent("bottom", this._domainTitle).bottomShrinkWrap(true);
            }
        }
        if(this.domainAxisTitle() && this._contentClasses.top !== "other_Toolbar"){
            if(this.legendPosition() !== "top"){
                this.setContent("top", this._toolbar).topShrinkWrap(false);
            }
        }
        
        this._legend.dataFamily(this._chart.getChartDataFamily());
        
        
        Border.prototype.update.apply(this, arguments);
    };
    
    MegaChart.prototype.exit = function (domNode, element) {
        Border.prototype.exit.apply(this, arguments);
    };
    
    MegaChart.prototype.getContentClasses = function () {
        var obj = {};
        var t = this.getContent("top");
        var r = this.getContent("right");
        var b = this.getContent("bottom");
        var l = this.getContent("left");
        obj.top = t !== null ? t.classID() : undefined;
        obj.right = r !== null ? r.classID() : undefined;
        obj.bottom = b !== null ? b.classID() : undefined;
        obj.left = l !== null ? l.classID() : undefined;
        return obj;
    };

    //  Events  ---
    MegaChart.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return MegaChart;
}));
