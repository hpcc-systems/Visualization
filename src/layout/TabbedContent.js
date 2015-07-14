"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../layout/Surface", "../chart/Pie", "../chart/MultiChart", "../google/Line", "../common/Text", "css!./TabbedContent"], factory);
    } else {
        root.form_Form = factory(root.d3, root.common_HTMLWidget, root.layout_Surface, root.chart_Pie, root.chart_MultiChart, root.chart_Line, root.common_Text);
    }
}(this, function (d3, HTMLWidget, Surface, Pie, MultiChart, Line, Text) {
    function TabbedContent() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._tabButtons = [];
        this._tabAnnotations = [];
    }
    TabbedContent.prototype = Object.create(HTMLWidget.prototype);
    TabbedContent.prototype._class += " layout_TabbedContent";

    TabbedContent.prototype.publish("activeTabIdx", 0, "number", "Index of active tab",null,{});
    
    TabbedContent.prototype.publish("widgets", [], "widgetArray", "widgets",null,{tags:['Private']});
    TabbedContent.prototype.publish("labels", [], "array", "Array of tab labels sharing an index with 'widgets'",null,{tags:['Private']});


    TabbedContent.prototype.testData = function () {
        this
            .addTab(new MultiChart().testData(), "MultiChart", true)
            .addTab(new Pie().testData(), "Pie Chart")
            .addTab(new Line().testData(), "Line Chart")
            .addTab(new TabbedContent()
                        .labels([]).widgets([])//TODO:Figure out why this is necessary
                        .addTab(new Pie().testData(), "Another Pie Chart")
                        .addTab(new Line().testData(), "Another Line Chart")
                ,"Nested Example")
        ;
        return this;
    };
    
    TabbedContent.prototype.addTab = function(widget, label, isActive) {
        var widgetArr = this.widgets();
        var labelsArr = this.labels();
        
        widget = new Surface().widget(widget ? widget : new Text().text("No widget defined for tab") );
        
        if(isActive){
            this.activeTabIdx(widgetArr.length);
        }
        
        labelsArr.push(label);
        widgetArr.push(widget);
        
        this.labels(labelsArr);
        this.widgets(widgetArr);
        return this;
    };

    TabbedContent.prototype.widgetSize = function (widgetDiv) {
        var width = this.clientWidth() - this.calcFrameWidth(widgetDiv);
        var height = this.clientHeight() - this.calcFrameHeight(widgetDiv);
        
        var tcBox = this._tabContainer.node().getBoundingClientRect();
        if(typeof (tcBox.height) !== 'undefined'){
            height -= tcBox.height;
        }
        return { width: width, height: height };
    };

    TabbedContent.prototype.createContainers = function (element) {
        var context = this;
        var groupClass = "tab-group-"+context.id();

        var tabs = this._tabContainer.selectAll(".tab-button").data(this.widgets());

        tabs.enter().append("span").classed("tab-button",true)
            .each(function (tab, idx) {
                var tabBtnClass = "tab-button tab-group-"+context.id();
                tabBtnClass += idx === context.activeTabIdx() ? " active" : "";
                var el = context._tabButtons[idx] = d3.select(this)
                    .attr("class", tabBtnClass)
                    .style("cursor","pointer")
                    .html(function() { return context.labels()[idx]; })
                    .on("click", function() {
                        element.selectAll("."+groupClass+".tab-button")
                            .classed("active", false);
                        el.classed("active", true);
                        element.selectAll("."+groupClass+".tab-content")
                            .style("display", "none")
                            .classed("active", false);
                        element.select(".tab-content-"+idx)
                            .style("display", "block")
                            .classed("active", true);
                        context.activeTabIdx(idx);
                        context.updateTabContent();
                    })
                ;
            }
        );

        var content = this._contentContainer.selectAll(".tab-content").data(this.widgets());
        
        content.enter().append("div")
            .each(function (tab, idx) {
                var el = context._tabButtons[idx] = d3.select(this)
                    .attr("class", "tab-content tab-content-"+idx+" "+groupClass)
                    .style("display", "none")
                ;
                if (idx === context.activeTabIdx()) {
                    el.style("display", "block");
                    el.classed("active", true);
                }
                if (!context.widgets()[idx].target()) {
                    context.widgets()[idx].target(this);
                }
            }
        );

        this.updateTabContent();
    };
    
    TabbedContent.prototype.updateTabContent = function () {
        var context = this;
        var content = this._contentContainer.selectAll(".tab-content").data(this.widgets());
        
        content.selectAll('div')
            .each(function (tab, idx) {
                var el = d3.select(this);
                if (idx === context.activeTabIdx()) {
                    el.style("display", "block");
                    el.classed("active", true);
                }
                var wSize = context.widgetSize(el);
                el
                    .style('width', wSize.width + "px")
                    .style('height', wSize.height + "px")
                ;
                context.widgets()[idx].resize(wSize).render();
            }
        );
    };

    TabbedContent.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._tabContainer = element.append("div").attr("class", "tabContainer");
        this._contentContainer = element.append("div").attr("class", "contentContainer")
    };

    TabbedContent.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this.createContainers(element);
    };

    return TabbedContent;
}));
