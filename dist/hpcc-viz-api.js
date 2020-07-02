
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/I1DChart.js',["../common/Palette"], factory);
    } else {
        root.api_I1DChart = factory(root.common_Palette);
    }
}(this, function (Palette) {
    function I1DChart() {
    }
    I1DChart.prototype._palette = Palette.rainbow("default");

    //  Events  ---
    I1DChart.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    I1DChart.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return I1DChart;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/I2DChart.js',["../common/Palette"], factory);
    } else {
        root.api_I2DChart = factory(root.common_Palette);
    }
}(this, function (Palette) {
    function I2DChart() {
    }
    I2DChart.prototype._palette = Palette.ordinal("default");

    //  Events  ---
    I2DChart.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    I2DChart.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return I2DChart;
}));

(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/IGraph.js',[], factory);
    } else {
        root.api_IGraph = factory();
    }
}(this, function () {
    function IGraph() {
    }

    //  Events  ---
    IGraph.prototype.vertex_click = function (row, col, sel, more) {
        if (more && more.vertex) {
            console.log("Vertex click: " + more.vertex.id());
        }
    };

    IGraph.prototype.vertex_dblclick = function (row, col, sel, more) {
        if (more && more.vertex) {
            console.log("Vertex double click: " + more.vertex.id());
        }
    };

    IGraph.prototype.edge_click = function (row, col, sel, more) {
        if (more && more.edge) {
            console.log("Edge click: " + more.edge.id());
        }
    };

    IGraph.prototype.edge_dblclick = function (row, col, sel, more) {
        if (more && more.edge) {
            console.log("Edge double click: " + more.edge.id());
        }
    };

    return IGraph;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/IInput.js',["../common/Widget"], factory);
    } else {
        root.api_IInput = factory(root.common_Widget);
    }
}(this, function (Widget) {
    function IInput() {
        Widget.call(this);
    }
    IInput.prototype = Object.create(Widget.prototype);

    IInput.prototype.publish("name", "", "string", "HTML name for the input");
    IInput.prototype.publish("label", "", "string", "Descriptive label");
    IInput.prototype.publish("value", "", "string", "Input Current Value");
    IInput.prototype.publish("validate", null, "string", "Input Validation");

    //  Implementation  ---
    IInput.prototype.isValid = function () {
        if (this.validate()) {
            var re = new RegExp(this.validate());
            if (!re.test(this.value())) {
                return false;
            }
        }
        return true;
    };

    IInput.prototype.hasValue = function () {
        if (typeof this.type === "function") {
            switch (this.type()) {
                case "radio":
                    /* falls through */
                case "checkbox":
                    if (this.value() && this.value() !== "false") {
                        return true;
                    }
                    break;
                default:
                    if (this.value()) {
                        return true;
                    }
                    break;
            }
            return false;
        }
        return this.value() !== "";
    };

    //  Events  ---
    IInput.prototype.blur = function (w) {
    };
    IInput.prototype.click = function (w) {
    };
    IInput.prototype.dblclick = function (w) {
    };
    IInput.prototype.change = function (w) {
    };

    IInput.prototype.resetValue = function (w) {
        w.value(w._inputElement[0].node().value);
    };

    IInput.prototype.disable = function (disable) {
        this._inputElement.forEach(function(e, idx) {
            e.attr("disabled", disable ? "disabled" : null);
        });
    };

    IInput.prototype.setFocus = function () {
        if (this._inputElement.length) {
            this._inputElement[0].node().focus();
        }
    };

    return IInput;
}));


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/INDChart.js',["../common/Palette"], factory);
    } else {
        root.api_INDChart = factory(root.common_Palette);
    }
}(this, function (Palette) {
    function INDChart() {
    }
    INDChart.prototype._palette = Palette.ordinal("default");

    //  Events  ---
    INDChart.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    INDChart.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return INDChart;
}));

if (typeof define === "function" && define.amd) {
  define('css',[], function () { 
    return {
      load: function ($1, $2, load) { load() }
    } 
  })
};


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/ITooltip.js',["d3", "d3-tip", "../common/Widget", "css!./ITooltip"], factory);
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
                return _class.indexOf("ITooltip-tooltipStyle-") !== 0;
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
                var html = '<table class="ITooltip-series-table">' +
                    '<thead>' +
                    '<tr><th colspan="2">' + opts.label + '</th></tr>' +
                    '</thead>' +
                    '<tbody>';
                opts.arr.forEach(function (row) {
                    html += '<tr>';
                    html += '<td>';
                    html += '<div class="series-table-row-color" style="background-color:' + row.color + '"></div>';
                    html += '<div class="series-table-row-label">' + row.label + '</div>';
                    html += '</td>';
                    html += '<td><div class="series-table-row-value">' + row.value + '</div></td>';
                    html += '</tr>';
                });
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


(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define('api/ITree.js',["../common/Palette"], factory);
    } else {
        root.api_ITree = factory(root.common_Palette);
    }
}(this, function (Palette) {
    function ITree() {
    }
    ITree.prototype._palette = Palette.ordinal("default");

    //  Events  ---
    ITree.prototype.click = function (row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    ITree.prototype.dblclick = function (row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    };

    return ITree;
}));

