"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../layout/Surface", "../chart/Pie", "../chart/MultiChart", "../google/Line", "../common/Text", "css!./Tabbed"], factory);
    } else {
        root.form_Form = factory(root.d3, root.common_HTMLWidget, root.layout_Surface, root.chart_Pie, root.chart_MultiChart, root.chart_Line, root.common_Text);
    }
}(this, function (d3, HTMLWidget, Surface, Pie, MultiChart, Line, Text) {
    function Tabbed() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    Tabbed.prototype = Object.create(HTMLWidget.prototype);
    Tabbed.prototype.constructor = Tabbed;
    Tabbed.prototype._class += " layout_Tabbed";

    Tabbed.prototype.publish("padding", 4, "number", "Padding");
    Tabbed.prototype.publish("activeTabIdx", 0, "number", "Index of active tab", null, {});

    Tabbed.prototype.publish("labels", [], "array", "Array of tab labels sharing an index with 'widgets'", null, { tags: ["Private"] });
    Tabbed.prototype.publish("widgets", [], "widgetArray", "widgets", null, { tags: ["Private"] });

    Tabbed.prototype.testData = function () {
        this
            .addTab(new MultiChart().testData(), "MultiChart", true)
            .addTab(new Pie().testData(), "Pie Chart")
            .addTab(new Line().testData(), "Line Chart")
            .addTab(new Tabbed()
                        .labels([]).widgets([])//TODO:Figure out why this is necessary
                        .addTab(new Pie().testData(), "Another Pie Chart")
                        .addTab(new Line().testData(), "Another Line Chart",true),"Nested Example")
        ;
        return this;
    };
    
    Tabbed.prototype.addTab = function (widget, label, isActive) {
        var labels = this.labels();
        var widgets = this.widgets();
        if (isActive) {
            this.activeTabIdx(this.widgets().length);
        }
        labels.push(label);
        widgets.push(new Surface().widget(widget ? widget : new Text().text("No widget defined for tab")));
        this.labels(labels);
        this.widgets(widgets);
        return this;
    };

    Tabbed.prototype.widgetSize = function (widgetDiv) {
        var width = this.clientWidth();
        var height = this.clientHeight();

        var tcBox = this._tabContainer.node().getBoundingClientRect();
        if(typeof (tcBox.height) !== "undefined"){
            height -= tcBox.height;
        }
        return { width: width, height: height };
    };

    Tabbed.prototype.enter = function (domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._tabContainer = element.append("div");
        this._contentContainer = element.append("div");
    };

    Tabbed.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        element.style("padding", this.padding() + "px");

        var tabs = this._tabContainer.selectAll(".tab-button.id" + this.id()).data(this.labels(), function (d) { return d; });
        tabs.enter().append("span")
            .attr("class", "tab-button id" + this.id())
            .style("cursor", "pointer")
            .on("click", function (d, idx) {
                context
                    .activeTabIdx(idx)
                    .render()
                ;
            })
        ;
        tabs
            .classed("active", function (d, idx) { return context.activeTabIdx() === idx; })
            .text(function (d) { return d; })
        ;
        tabs.exit().remove();

        var content = this._contentContainer.selectAll(".tab-content.id" + this.id()).data(this.widgets(), function (d) { return d.id(); });
        content.enter().append("div")
            .attr("class", "tab-content id" + this.id())
            .each(function (widget, idx) {
                widget.target(this);
            })
        ;
        content
            .classed("active", function (d, idx) { return context.activeTabIdx() === idx; })
            .style("display", function (d, idx) { return context.activeTabIdx() === idx ? "block" : "none"; })
            .each(function (widget, idx) {
                var wSize = context.widgetSize(d3.select(this));
                widget.resize(wSize).render();
            })
        ;
        content.exit()
            .each(function (widget, idx) {
                widget
                    .target(null)
                ;
            })
            .remove();
    };

    return Tabbed;
}));
