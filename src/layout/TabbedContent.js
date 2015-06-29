"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "src/common/HTMLWidget", "src/api/IInput", "src/layout/Surface", "src/chart/Pie", "src/chart/MultiChart", "src/google/Line", "css!./TabbedContent"], factory);
    } else {
        root.form_Form = factory(root.d3, root.common_HTMLWidget, root.layout_IInput, root.layout_Surface, root.chart_Pie, root.chart_MultiChart, root.chart_Line);
    }
}(this, function (d3, HTMLWidget, IInput, Surface, Pie, MultiChart, Line) {
    function TabbedContent() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._tabButtons = [];
    }
    TabbedContent.prototype = Object.create(HTMLWidget.prototype);
    TabbedContent.prototype._class += " layout_TabbedContent";

    TabbedContent.prototype.publish("groupClass", "", "string", "Class to identify all elements in this tab grouping",null,{});
    TabbedContent.prototype.publish("tabAnnotations", null, "array", "Tab Array",null,{});

    TabbedContent.prototype.testData = function () {
        this.groupClass("tabTest");

        this.tabAnnotations([
            {
                id:"tab_1",
                label:"MultiChart",
                width:80,
                padding:"3px",
                class: "active",
                content: new Surface().widget(new MultiChart().testData())
            },{
                id:"tab_2",
                label:"Pie Chart",
                width:80,
                padding:"3px",
                class:"",
                content: new Surface().widget(new Pie().testData())
            },{
                id:"tab_3",
                label:"Line Chart",
                width:80,
                padding:"3px",
                class:"",
                content: new Surface().widget(new Line().testData())
            }
        ]);

        return this;
    };

    TabbedContent.prototype.widgetSize = function (widgetDiv) {
        var width = this.clientWidth() - this.calcFrameWidth(widgetDiv);
        var height = this.clientHeight() - this.calcFrameHeight(widgetDiv);
 
        return { width: width, height: height };
    };
    
    TabbedContent.prototype.createContainers = function (element) {
        element.classed(this.groupClass(), true);
        
        this._tabContainer = element.append("div").attr("class", "tabContainer").selectAll(".tab-button").data(this.tabAnnotations());
        
        var context = this;
        this._tabContainer.enter().append("span").classed("tab-button",true)
            .each(function (tab, idx) {
                var el = context._tabButtons[idx] = d3.select(this)
                    .attr("class", "tab-button " + tab.class)
                    .attr("for", tab.id)
                    .style('padding', tab.padding)
                    .style('width', tab.width)
                    .style('height', tab.height)
                    .style("cursor","pointer")
                    .html(function(d) { return tab.label; })
                    .on("click", function(d) { 
                        var cls = context.groupClass() === "" ? "" : "." + context.groupClass() + " ";
                        d3.selectAll(cls + ".tab-button")
                            .classed("active", false);
                        el.classed("active", true);
                        d3.selectAll(cls + ".tab-content")
                            .style("display", "none")
                            .classed("active", false);
                        d3.select("#" + tab.id)
                            .style("display", "block")
                            .classed("active", true);
                    })
                ;
            }
        );

        this._contentContainer = element.append("div").attr("class", "contentContainer").selectAll(".tab-content").data(this.tabAnnotations());
        this._contentContainer.enter().append("div").classed("tab-content",true)
            .each(function (tab, idx) {
                var el = context._tabButtons[idx] = d3.select(this)
                    .attr("class", "tab-content")
                    .attr("id", tab.id)
                    .style("display", "none")
                ;
                if (tab.class === "active") {
                    el.style("display", "block");
                    el.classed("active", true);
                }
                el
                    .style('width', context.widgetSize(el).width + "px")
                    .style('height', context.widgetSize(el).height + "px")
                ;
                tab.content.target(tab.id).render();
            }
        );
    };
    
    TabbedContent.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this.createContainers(element);
    };

    TabbedContent.prototype.update = function () {
        HTMLWidget.prototype.update.apply(this, arguments);
    };

    return TabbedContent;
}));
