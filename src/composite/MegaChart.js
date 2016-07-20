"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["../layout/Border", "../chart/MultiChart", "../common/Text", "../other/Legend", "../layout/Toolbar", "../form/Select", "../form/Button", "../common/Utility"], factory);
    } else {
        root.composite_MegaChart = factory(root.layout_Border, root.chart_MultiChart, root.common_Text, root.other_Legend, root.layout_Toolbar, root.form_Select, root.form_Button, root.common_Utility);
    }
}(this, function (Border, MultiChart, Text, Legend, Toolbar, Select, Button, Utility) {
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

    MegaChart.prototype.publishReset();

    MegaChart.prototype.publishProxy("valueAxisTitle", "_valueTitle", "text");
    MegaChart.prototype.publishProxy("domainAxisTitle","_domainTitle","text");
    
    MegaChart.prototype.publish("legendPosition","right","set","Position of the Legend widget", ["none","top","right","bottom","left"], {tags:["Basic"]});
    
    MegaChart.prototype.publish("showToolbar",true,"boolean","Enable/Disable Toolbar widget", null, {tags:["Basic"]});
    MegaChart.prototype.publish("showChartSelect",true,"boolean","Show/Hide the chartType dropdown in the toolbar", null, {tags:["Basic"]});
    MegaChart.prototype.publish("showCSV",true,"boolean","Show/Hide CSV button", null, {tags:["Basic"]});
    
    MegaChart.prototype.publishProxy("title", "_toolbar", "title");

    //TODO:  Proxy + themes not working...
    MegaChart.prototype.publish("titleFontSize", null, "number", "Title Font Size (px)", null, { tags: ["Advanced"], optional: true });
    MegaChart.prototype.publish("titleFontColor", null, "html-color", "Title Font Color", null, { tags: ["Advanced"], optional: true });
    MegaChart.prototype.publish("titleFontFamily", null, "string", "Title Font Family", null, { tags: ["Advanced"], optional: true });
    MegaChart.prototype.publish("titleFontBold", true, "boolean", "Enable Bold Title Font", null, { tags: ["Advanced"], optional: true });
    MegaChart.prototype.publish("titleBackgroundColor", null, "html-color", "Background Color", null, { tags: ["Intermediate"], optional: true });

    MegaChart.prototype.publishProxy("chartType", "_chart", "chartType");
    MegaChart.prototype.publishProxy("chart", "_chart", "chart");

    MegaChart.prototype.toolbarWidgets = function (_) {
        if (!arguments.length) return this._toolbar.widgets();
        this._toolbar.widgets(_);
        return this;
    };

    MegaChart.prototype.chartTypeDefaults = function (_) {
        if (!arguments.length) return this._chart.chartTypeDefaults();
        this._chart.chartTypeDefaults(_);
        return this;
    };

    MegaChart.prototype.fields = function (_) {
        if (!arguments.length) return this._chart.fields();
        this._chart.fields(_);
        return this;
    };

    MegaChart.prototype.columns = function (_) {
        if (!arguments.length) return this._chart.columns();
        this._chart.columns(_);
        return this;
    };

    MegaChart.prototype.data = function (_) {
        if (!arguments.length) return this._chart.data();
        this._chart.data(_);
        return this;
    };

    MegaChart.prototype.enter = function (domNode, element) {
        Border.prototype.enter.apply(this, arguments);
        var context = this;
        
        this.topShrinkWrap(false).topPercentage(0).topSize(30);

        this._csvButton = new Button()
            .id(this.id() + "_csv")
            .value("CSV")
        ;
        this._csvButton.click = function (a) {
            Utility.downloadBlob("CSV", context._chart.export("CSV"));
        };

        this._chartTypeSelect = new Select()
            .id(this.id() + "_chartType")
            .selectOptions(this._allChartTypes.map(function (a) { return [a.id, a.display]; }))
            .value(this.chartType())
        ;
        this._chartTypeSelect.change = function (a) {
            context.chartType(a.value()).render();
        };

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

        if (this.legendPosition() !== "none") {
            this.setContent(this.legendPosition(), this._legend)[this.legendPosition()+"ShrinkWrap"](true);
        }
    };
    
    MegaChart.prototype.update = function (domNode, element) {
        function showHideButton(twArr, button, show) {
            if (show && twArr.indexOf(button) === -1) {
                twArr.push(button);
            } else if (!show) {
                var idx = twArr.indexOf(button);
                if (idx >= 0) {
                    twArr.splice(idx, 1);
                }
            }
        }
        var twArr = this.toolbarWidgets();
        showHideButton(twArr, this._csvButton, this.showCSV());
        showHideButton(twArr, this._chartTypeSelect, this.showChartSelect());
        this.toolbarWidgets(twArr);

        if (this._prevShowToolbar !== this.showToolbar()) {
            this.setContent("top", this.showToolbar() ? this._toolbar : null);
            this._prevShowToolbar = this.showToolbar();
        }

        //TODO:  Proxy + themes not working...
        this._toolbar
            .fontSize(this.titleFontSize())
            .fontColor(this.titleFontColor())
            .fontFamily(this.titleFontFamily())
            .fontBold(this.titleFontBold())
            .backgroundColor(this.titleBackgroundColor())
        ;

        this._chart
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