"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../layout/Popup", "../other/Table", "css!./Tooltip"], factory);
    } else {
        root.layout_Tooltip = factory(root.d3, root.common_HTMLWidget, root.layout_Popup, root.chart_Table);
    }
}(this, function (d3, HTMLWidget, Popup, Table) {
    function Tooltip() {
        HTMLWidget.call(this);
        this._tag = "div";
    }
    Tooltip.prototype = Object.create(HTMLWidget.prototype);
    Tooltip.prototype._class += " layout_Tooltip";
    
    Tooltip.prototype.publish("tooltipState", false, "boolean", "State of the popup, visible (true) or hidden (false)",null,{});
    Tooltip.prototype.publish("offsetY", 10, "number", "Vertical offset from the cursor",null,{});
    Tooltip.prototype.publish("offsetX", 10, "number", "Horizontal offset from the cursor",null,{});
    Tooltip.prototype.publish("top", null, "number", "CSS top property",null,{});
    Tooltip.prototype.publish("left", null, "number", "CSS left property",null,{});
    Tooltip.prototype.publish("position", "fixed", "set", "Value of the 'position' property",["absolute", "relative", "fixed", "static", "initial", "inherit" ],{tags:['Private']});
    Tooltip.prototype.publish("widget", null, "widget", "Widget",null,{tags:['Private']});

    Tooltip.prototype.showTooltip = function(data, columns) {
        this._table
            .columns(columns)
            .data([data])
            .render()
        ;
        this.tooltipState(true).render();
    };
    
    Tooltip.prototype.hideTooltip = function(data) {
        this.tooltipState(false).render();
    };
    
    Tooltip.prototype.registerWidget = function(widget) {
        var context = this;
        widget
            .on("mouseover", function(d, i) {
                var data = [],
                columns = [];
                columns.push(widget._columns[0], i);
                data.push(d[widget._columns[0]], d[i]);
                context.showTooltip(data, columns);
            })
            .on("mouseout", function() {
                context.hideTooltip();
            })
            .on("mousemove", function() {
                var table = d3.select(context._table.node()).select("table"),
                    height = table.node().offsetHeight,
                    width = table.node().offsetWidth,
                    rect;
                
                if (widget._parentRelativeDiv) { //This is because charts do not get assigned this when they are inside the MultiChart
                    rect = widget._parentRelativeDiv.node().getBoundingClientRect();
                } else {
                    rect = widget._parentWidget._parentRelativeDiv.node().getBoundingClientRect();
                }
                
                var bottom = rect.bottom - height - context.offsetY(),
                    right = rect.right - width - context.offsetX();
                
                if (d3.event.pageY >= bottom) {
                    context.top(d3.event.pageY - context.offsetY() - height);    
                } else {
                    context.top(d3.event.pageY + context.offsetY());
                }
                if (d3.event.pageX >= right) {
                    context.left(d3.event.pageX - context.offsetX() - width) ;    
                } else {
                    context.left(d3.event.pageX + context.offsetX());
                }
                
                context.render();
            })
        ;
        
        return this;
    };
    
    Tooltip.prototype.enter = function () {
        HTMLWidget.prototype.enter.apply(this, arguments);

        this._table = new Table();
        this.widget(new Popup().widget(this._table).popupState(true));
    };

    Tooltip.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        element
            .style("position",this.position())
            .style("left",this.left() + "px")
            .style("top",this.top() + "px")
        ;
        
        if (this.tooltipState()) {
            element.style("display", "block");
        } else {
            element.style("display", "none");
        }
        
        var widgets = element.selectAll("#" + this._id + " > .tooltipWidget").data(this.widget() ? [this.widget()] : [], function (d) { return d._id; });
        widgets.enter().append("div")
            .attr("class", "tooltipWidget")
            .each(function (d) {
                d.target(this);
            })
        ;

        if (this._table.node()) {
            var table = d3.select(this._table.node()).select("table");
            this.widget()._size.width = table.node().offsetWidth;
            this.widget()._size.height = table.node().offsetHeight;
            d3.select(".popupWidget > div").style("overflow", "visible");
        }
    };

    Tooltip.prototype.render = function (callback) {
        var context = this;
        HTMLWidget.prototype.render.call(this, function (widget) {
            if (context.widget()) {
                context.widget().render(function (widget) {
                    if (callback) {
                        callback(widget);
                    }
                });
            } else {
                if (callback) {
                    callback(widget);
                }
            }
        });
        
        return this;
    };

    return Tooltip;
}));
