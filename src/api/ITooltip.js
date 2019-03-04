"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "d3-tip", "../common/Widget", "css!./ITooltip"], factory);
    } else {
        root.api_ITooltip = factory(root.d3, root.d3.tip, root.common_Widget);
    }
}(this, function (d3, d3Tip, Widget, AbsoluteSurface, TextBox) {
    function ITooltip() {
        Widget.call(this);

        this._valueFormatter = d3.format(this.tooltipValueFormat());

        if (this.layerEnter) {
            var layerEnter = this.layerEnter;
            this.layerEnter = function (base, svgElement, domElement) {
                this.tooltipEnter(svgElement);
                layerEnter.apply(this, arguments);
            };
            var layerUpdate = this.layerUpdate;
            this.layerUpdate = function (base) {
                layerUpdate.apply(this, arguments);
                this.tooltipUpdate();
            };
            var layerExit = this.layerExit;
            this.layerExit = function (base) {
                layerExit.apply(this, arguments);
                this.tooltipExit();
            };
        } else {
            var enter = this.enter;
            this.enter = function (domNode, element) {
                this.tooltipEnter(element);
                enter.apply(this, arguments);
            };
            var update = this.update;
            this.update = function (domNode, element) {
                update.apply(this, arguments);
                this.tooltipUpdate();
            };
            var exit = this.exit;
            this.exit = function (domNode, element) {
                exit.apply(this, arguments);
                this.tooltipExit();
            };
        }
    }
    ITooltip.prototype = Object.create(Widget.prototype);

    ITooltip.prototype.publish("tooltipStyle", "default", "set", "Style", ["default", "series-table", "none"], {});
    ITooltip.prototype.publish("tooltipFollowMouse", false, "boolean", "If true, the tooltip will follow mouse movement", null, {});
    ITooltip.prototype.publish("tooltipValueFormat", ",.2f", "string", "Value Format", null, {});
    ITooltip.prototype.publish("tooltipSeriesColor", "#EAFFFF", "html-color", "Series Color", null, {});
    ITooltip.prototype.publish("tooltipLabelColor", "#CCFFFF", "html-color", "Label Color", null, {});
    ITooltip.prototype.publish("tooltipValueColor", "white", "html-color", "Value Color", null, {});
    ITooltip.prototype.publish("tooltipTick", true, "boolean", "Show tooltip tick", null, {});
    ITooltip.prototype.publish("tooltipOffset", 8, "number", "Offset from the cursor", null, {});

    ITooltip.prototype.tooltipEnter = function (element) {
        var context = this;
        this.tooltip = d3Tip()
            .attr("class", "d3-tip")
            .offset(function (d) {
                if(event && context.tooltipFollowMouse()){
                    var d3tipElement = document.querySelector(".d3-tip"); // d3Tip offers no reference to the '.d3-tip' element...?
                    d3tipElement.style.display = "block";
                    d3tipElement.style.left = context.tooltipOffset() + (event.clientX) + "px";
                    d3tipElement.style.top = event.clientY + "px";
                    return [];
                }
                switch (context.tooltip.direction()()) {
                    case "e":
                        return [0, context.tooltipOffset()];
                    default:
                        return [-context.tooltipOffset(), 0];
                }
            })
        ;
        element.call(this.tooltip);
    };

    ITooltip.prototype.tooltipUpdate = function () {
        var classed = this.tooltip.attr("class");
        classed = classed.split(" notick").join("") + (this.tooltipTick() ? "" : " notick") + (this.tooltipStyle() === "none" ? " hidden" : "");
        classed = classed.split(" ")
            .filter(function(_class){
                return _class.indexOf("ITooltip-tooltipStyle-")!==0
            })
            .join(" ")
            ;
        classed += " ITooltip-tooltipStyle-"+this.tooltipStyle();
        this.tooltip
            .attr("class", classed)
        ;
    };

    ITooltip.prototype.tooltipExit = function () {
        if (this.tooltip) {
            this.tooltip.destroy();
        }
    };

    var tooltipValueFormat = ITooltip.prototype.tooltipValueFormat;
    ITooltip.prototype.tooltipValueFormat = function (_) {
        var retVal = tooltipValueFormat.apply(this, arguments);
        if (arguments.length) {
            this._valueFormatter = d3.format(_);
        }
        return retVal;
    };

    ITooltip.prototype._tooltipHTML = function (d) {
        return d;
    };

    ITooltip.prototype.tooltipHTML = function (_) {
        return this.tooltip.html(_);
    };

    ITooltip.prototype.tooltipFormat = function (opts) {
        opts = opts || {};
        opts.label = opts.label === undefined ? "" : opts.label;
        opts.series = opts.series || "";
        if (opts.value instanceof Date) {
            opts.value = opts.value || "";
        } else {
            opts.value = this._valueFormatter(opts.value) || "";
        }
        switch (this.tooltipStyle()) {
            case "none":
                break;
            case "series-table":
                var html = '<table class="ITooltip-series-table">'
                    + '<thead>'
                    + '<tr><th colspan="2">'+opts.label+'</th></tr>'
                    + '</thead>'
                    + '<tbody>'
                opts.arr.forEach(function(row){
                    html += '<tr>';
                    html += '<td>';
                    html += '<div class="series-table-row-color" style="background-color:'+row.color+'"></div>';
                    html += '<div class="series-table-row-label">'+row.label+'</div>';
                    html += '</td>';
                    html += '<td><div class="series-table-row-value">'+row.value+'</div></td>';
                    html += '</tr>';
                })
                html += '</tbody>';
                html += '</table>';
                return html;
            default:
                if (opts.series) {
                    return "<span style='color:" + this.tooltipSeriesColor() + "'>" + opts.series + "</span> / <span style='color:" + this.tooltipLabelColor() + "'>" + opts.label + "</span>:  <span style='color:" + this.tooltipValueColor() + "'>" + opts.value + "</span>";
                }
                return "<span style='color:" + this.tooltipLabelColor() + "'>" + opts.label + "</span>:  <span style='color:" + this.tooltipValueColor() + "'>" + opts.value + "</span>";
        }
    };

    return ITooltip;
}));
