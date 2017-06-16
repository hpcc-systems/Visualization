"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3","../layout/Border", "../chart/MultiChart", "../common/Text", "../other/Legend", "../layout/Toolbar", "../form/Select", "../form/Button", "../form/Input", "../common/Utility", "css!./MegaChart"], factory);
    } else {
        root.composite_MegaChart = factory(root.d3, root.layout_Border, root.chart_MultiChart, root.common_Text, root.other_Legend, root.layout_Toolbar, root.form_Select, root.form_Button, root.form_Input, root.common_Utility);
    }
}(this, function (d3, Border, MultiChart, Text, Legend, Toolbar, Select, Button, Input, Utility) {
    function MegaChart() {
        Border.call(this);

        this._tag = "div";
        this._chart = new MultiChart();
        var context = this;
        this._chart.click = function () {
            context.click.apply(context, arguments);
        };
        this._chart.dblclick = function () {
            context.dblclick.apply(context, arguments);
        };

        this._toolbar = new Toolbar();
        
        this._valueTitle = new Text();
        this._domainTitle = new Text();

        this._legend = new Legend();
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

    MegaChart.prototype.publish("showToolbar",true,"boolean","Enable/Disable Toolbar widget", null, {tags:["Basic"]});
    MegaChart.prototype.publishProxy("title", "_toolbar", "title");
    MegaChart.prototype.publish("titleFontSize", null, "number", "Title Font Size (px)", null, { tags: ["Advanced"], optional: true });
    MegaChart.prototype.publish("titleFontColor", null, "html-color", "Title Font Color", null, { tags: ["Advanced"], optional: true });
    MegaChart.prototype.publish("titleFontFamily", null, "string", "Title Font Family", null, { tags: ["Advanced"], optional: true });
    MegaChart.prototype.publish("titleFontBold", true, "boolean", "Enable Bold Title Font", null, { tags: ["Advanced"], optional: true });
    MegaChart.prototype.publish("titleBackgroundColor", null, "html-color", "Background Color", null, { tags: ["Intermediate"], optional: true });
    MegaChart.prototype.publish("maximizedBackgroundColor", '#FFFFFF', "html-color", "Background Color while maximized", null, { tags: ["Intermediate"], optional: true });

    MegaChart.prototype.publish("showChartSelect", true, "boolean", "Show/Hide the chartType dropdown in the toolbar", null, { tags: ["Basic"] });
    MegaChart.prototype.publish("showCSV", true, "boolean", "Show/Hide CSV button", null, { tags: ["Basic"] });
    MegaChart.prototype.publish("showMaximize", false, "boolean", "Show/Hide Maximize button", null, { tags: ["Basic"] });
    MegaChart.prototype.publish("toolbarShowLegend", false, "boolean", "Show/Hide Legend button", null, { tags: ["Basic"] });
    MegaChart.prototype.publish("showInfoButton", false, "boolean", "Show/Hide Info button in toolbar", null, { tags: ["Basic"] });
    MegaChart.prototype.publish("infoIcon", "\uf05a", "string", "Help Icon", null, { tags: ["Basic"] });

    MegaChart.prototype.publish("legendPosition", "none", "set", "Position of the Legend widget", ["none", "top", "right", "bottom", "left"], { tags: ["Basic"] });
    MegaChart.prototype.publishProxy("legendFormat", "_legend", "rainbowFormat");
    MegaChart.prototype.publishProxy("legendBins", "_legend", "rainbowBins");

    MegaChart.prototype.publishProxy("domainAxisTitle", "_domainTitle", "text");
    MegaChart.prototype.publishProxy("valueAxisTitle", "_valueTitle", "text");

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

    MegaChart.prototype.chartTypeProperties = function (_) {
        if (!arguments.length) return this._chart.chartTypeProperties();
        this._chart.chartTypeProperties(_);
        return this;
    };

    MegaChart.prototype.fields = function (_) {
        if (!arguments.length) return this._chart.fields();
        this._chart.fields(_);
        return this;
    };

    MegaChart.prototype.columns = function (_, asDefault) {
        if (!arguments.length) return this._chart.columns();
        this._chart.columns(_, asDefault);
        return this;
    };

    MegaChart.prototype.data = function (_) {
        if (!arguments.length) return this._chart.data();
        this._chart.data(_);
        return this;
    };

    MegaChart.prototype.downloadCSV = function () {
        Utility.downloadBlob("CSV", this._chart.export("CSV"));
        return this;
    };

    MegaChart.prototype.enter = function (domNode, element) {
        Border.prototype.enter.apply(this, arguments);
        var context = this;
        
        this.topShrinkWrap(false).topPercentage(0).topSize(30);

        this._csvButton = new Button()
            .classed({ "composite_MegaChart-CSV": true })
            .id(this.id() + "_csv")
            .value("CSV")
        ;
        this._csvButton.click = function (a) {
            context.downloadCSV();
        };
        
        this._infoButton = new Button()
            .classed({ "composite_MegaChart-Info": true })
            .id(this.id() + "_info")
            .value(this.infoIcon())
        ;
        
        this._maximizeButton = new Button()
            .classed({ "composite_MegaChart-Maximize": true })
            .id(this.id() + "_maximize")
            .value("\uf2d0")
        ;
        this._maximizeButton.click = function (buttonWidget) {
            var target = context.target();
            var node = target;
            var isMaximized = d3.select(target).classed('__hpccisMaximized');
            
            //Find the layout_Grid ancestor
            var parentGrid = context.locateAncestor("layout_Grid");
            if(parentGrid){
                node = parentGrid.element().node();
            } else {
                node = document.body;
            }
            
            var targetElement = d3.select(context.target());
            if(isMaximized){
                //Restore from maximized to natural size/position
                var targetParentBox = target.parentElement.getBoundingClientRect();
                var targetPaddingTop = parseInt(getComputedStyle(target, null).getPropertyValue('padding-top').replace('px',''));
                var targetPaddingLeft = parseInt(getComputedStyle(target, null).getPropertyValue('padding-left').replace('px',''));
                var targetPaddingRight = parseInt(getComputedStyle(target, null).getPropertyValue('padding-right').replace('px',''));
                var targetPaddingBottom = parseInt(getComputedStyle(target, null).getPropertyValue('padding-bottom').replace('px',''));
                context.contentDiv.style("opacity", 0).transition(100);
                targetElement.transition()//.duration(3000)
                    .style({
                        "top": targetParentBox.top+'px',
                        "left": targetParentBox.left+'px',
                        "width": (targetParentBox.width - targetPaddingLeft - targetPaddingRight)+'px',
                        "height": (targetParentBox.height - targetPaddingTop - targetPaddingBottom)+'px'
                    }).each("end", function () {
                        targetElement.style({
                            "position": target.__old_position,
                            "z-index": target.__old_zindex,
                            "background-color": target.__old_backgroundColor,
                            "box-shadow": target.__old_boxshadow
                    })
                ;
                        context
                            .resize({
                                "width": targetParentBox.width - targetPaddingLeft - targetPaddingRight,
                                "height": targetParentBox.height - targetPaddingTop - targetPaddingBottom
                            })
                            .render(function () {
                                context.contentDiv.transition()
                                    .style("opacity", 1);
                            });
                        buttonWidget.value("\uf2d0").render();
                    });
            } else {
                //Maximize this MegaChart
                target.__old_position = target.style.position;
                target.__old_zindex = target.style.zIndex;
                target.__old_boxshadow = target.style.boxShadow;
                target.__old_backgroundColor = context.element().style('background-color');
                var grid = d3.select(node).datum();
                var gridTarget = grid.target();
                var gridBox = grid ? gridTarget.getBoundingClientRect() : node.getBoundingClientRect();
                var gridPaddingTop = parseInt(getComputedStyle(gridTarget, null).getPropertyValue('padding-top').replace('px',''));
                var gridPaddingLeft = parseInt(getComputedStyle(gridTarget, null).getPropertyValue('padding-left').replace('px',''));
                var gridPaddingRight = parseInt(getComputedStyle(gridTarget, null).getPropertyValue('padding-right').replace('px',''));
                var gridPaddingBottom = parseInt(getComputedStyle(gridTarget, null).getPropertyValue('padding-bottom').replace('px',''));
                context.contentDiv.style("opacity", 0).transition(100);
                targetElement
                    .style({
                        "position":"fixed",
                        "z-index": 999999,
                        "box-shadow": "0 8px 8px 0 rgba(0,0,0,.14),0 12px 4px -8px rgba(0,0,0,.2),0 4px 20px 0 rgba(0,0,0,.12)",
                        "background-color": target.__old_backgroundColor
                    })
                    .transition()//.duration(3000)
                    .style({
                        "top": (gridBox.top + gridPaddingTop)+'px',
                        "left": (gridBox.left + gridPaddingLeft)+'px',
                        "width": (gridBox.width - gridPaddingLeft - gridPaddingRight)+'px',
                        "height": (gridBox.height - gridPaddingTop - gridPaddingBottom)+'px'
                    }).each("end", function () {
                        targetElement.style({
                        "background-color": context.maximizedBackgroundColor()
                        });
                        context
                            .resize({
                                "width": (gridBox.width - gridPaddingLeft - gridPaddingRight),
                                "height": (gridBox.height - gridPaddingTop - gridPaddingBottom)
                            })
                            .render(function () {
                                context.contentDiv.transition()
                                    .style("opacity", 1);
                            });
                        buttonWidget.value("\uf2d1").render();
                    });
            }
            
            d3.select(target).classed('__hpccisMaximized',!isMaximized);
        };

        this._legendButton = new Input()
            .classed({ "composite_MegaChart-legend": true })
            .id(this.id() + "_legend")
            .type("checkbox")
            .inlineLabel("Legend:  ")
        ;
        this._legendButton.click = function (a) {
            context.render();
        };

        this._chartTypeSelect = new Select()
            .classed({ "composite_MegaChart-chartType": true })
            .id(this.id() + "_chartType")
            .selectOptions(this._allChartTypes.map(function (a) { return [a.id, a.display]; }))
            .value(this.chartType())
        ;
        this._chartTypeSelect.change = function (a) {
            context.chartType(a.value()).render();
        };

        this.setContent("center", this._chart);
        
        this._legend
            .fixedSize(true)
            .targetWidget(this._chart)
            .orientation(["top", "bottom"].indexOf(this.legendPosition()) !== -1 ? "horizontal" : "vertical")
        ;
        
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

        this._chartTypeSelect.value(this.chartType());
        var twArr = this.toolbarWidgets();
        showHideButton(twArr, this._csvButton, this.showCSV());
        showHideButton(twArr, this._maximizeButton, this.showMaximize());
        showHideButton(twArr, this._legendButton, this.toolbarShowLegend());
        showHideButton(twArr, this._chartTypeSelect, this.showChartSelect());
        showHideButton(twArr, this._infoButton, this.showInfoButton());
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


        var legendPosition = this.legendPosition();
        if (this.toolbarShowLegend() && !this._legendButton.checked()) {
            legendPosition = "none";
        }
        if (this._prevLegendPosition !== legendPosition) {
            if(this._prevLegendPosition !== "none"){
                this.clearContent(this._prevLegendPosition);
            } 
            this._prevLegendPosition = legendPosition;
            if (legendPosition !== "none") {
                this._legend = new Legend().fixedSize(true).targetWidget(this.getContent("center"));
                this.setContent(legendPosition, this._legend);
                this._legend.orientation(["top", "bottom"].indexOf(legendPosition) !== -1 ? "horizontal" : "vertical");
            }
        }
        this._contentClasses = this.getContentClasses();
        
        if(this.valueAxisTitle() && this._contentClasses.left !== "common_Text"){
            if(legendPosition !== "left"){
                this.setContent("left", this._valueTitle.rotation(-90));
            }
        }
        if(this.domainAxisTitle() && this._contentClasses.bottom !== "common_Text"){
            if(legendPosition !== "bottom"){
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

    MegaChart.prototype.serializeState = function () {
        var state = {
            title: this.title(),
            data: this.data()
        };
        var chart = this.chart();
        if (chart) {
            if (chart.serializeState) {
                state.chart = chart.serializeState();
                delete state.chart.data;
            }
        }
        return state;
    };

    MegaChart.prototype.deserializeState = function (state) {
        if (state) {
            this
                .title(state.title)
                .data(state.data)
            ;
            var chart = this.chart();
            if (chart && state.chart) {
                if (chart.serializeState) {
                    chart.deserializeState(state.chart);
                }
            }
        }
        return this;
    };

    //  Events  ---
    MegaChart.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    MegaChart.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return MegaChart;
}));