"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../layout/Surface", "../common/TextBox", "../common/Text", "css!./Tabbed"], factory);
    } else {
        root.layout_Tabbed = factory(root.d3, root.common_HTMLWidget, root.layout_Surface, root.common_TextBox, root.common_Text);
    }
}(this, function (d3, HTMLWidget, Surface, TextBox, Text) {
    function Tabbed() {
        HTMLWidget.call(this);

        this._tag = "div";
    }
    Tabbed.prototype = Object.create(HTMLWidget.prototype);
    Tabbed.prototype.constructor = Tabbed;
    Tabbed.prototype._class += " layout_Tabbed";

    Tabbed.prototype.publish("showTabs", true, "boolean", "Show Tabs", null, {});
    Tabbed.prototype.publish("surfacePadding", 4, "number", "Padding");
    Tabbed.prototype.publish("activeTabIdx", 0, "number", "Index of active tab", null, {});

    Tabbed.prototype.publish("labels", [], "array", "Array of tab labels sharing an index with ", null, { tags: ["Private"] });
    Tabbed.prototype.publish("tabLocation", "bottom", "set", "Position the tabs at the bottom of the widget", ["top", "bottom"], { tags: ["Private"] });
    Tabbed.prototype.publish("widgets", [], "widgetArray", "widgets", null, { tags: ["Private"] });

    Tabbed.prototype.clearTabs = function () {
        this.widgets([]);
        return this;
    };

    Tabbed.prototype.addTab = function (widget, label, isActive, callback) {
        var widgetSize = widget.size();
        if(widgetSize.width === 0 && widgetSize.height === 0){
            widget.size({width:"100%",height:"100%"});
        }
        var labels = this.labels();
        var widgets = this.widgets();
        if (isActive) {
            this.activeTabIdx(this.widgets().length);
        }
        labels.push(label);
        var surface = new Surface().widget(widget ? widget : new Text().text("No widget defined for tab"));
        widgets.push(surface);
        this.labels(labels);
        this.widgets(widgets);
        if (callback) {
            callback(surface);
        }
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
        this._contentContainer = element.append("div");
        this._contentContainer.attr("id", "content_container");
    };

    Tabbed.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        var context = this;

        // if (this._tabContainer) {this._tabContainer.remove();}
        // this._tabContainer = element.insert("div", this.tabLocation() === "bottom" ? null : "div");
        // this._tabContainer.attr("class", "on_" + this.tabLocation());

        this._tabContainer = element.selectAll("#tab_contanier").data([this.tabLocation()], function(d) {return d;});
        this._tabContainer
            .enter()
            .insert("div", function(d1) {
                var x = d1 === "top" ? "#content_container" : null;
                console.log(x, d1);
                return x;
            })
            .attr("class", function(d2) {
                return "on_" + d2;
            })
            .attr("id", "tab_contanier")
        ;

        element.style("padding", this.surfacePadding() + "px");

        var tabs = this._tabContainer.selectAll(".tab-button.id" + this.id()).data(this.showTabs() ? this.labels() : [], function (d) { return d; });
        tabs.enter().append("span")
            .attr("class", "tab-button id" + this.id())
            .style("cursor", "pointer")
            .on("click", function (d, idx) {
                context.click(context.widgets()[idx].widget(), d, idx);
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
            .each(function (surface, idx) {
                surface.visible(context.activeTabIdx() === idx);
                if (context.activeTabIdx() === idx) {
                    var wSize = context.widgetSize(d3.select(this));
                    surface
                        .surfaceBorderWidth(context.showTabs() ? null : 0)
                        .surfacePadding(context.showTabs() ? null : 0)
                        .resize(wSize)
                    ;
                }
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

    Tabbed.prototype.click = function (widget, column, idx) {
    };

    return Tabbed;
}));
