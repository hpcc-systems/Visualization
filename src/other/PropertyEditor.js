"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../other/Persist", "../layout/Grid", "css!./PropertyEditor"], factory);
    } else {
        root.other_PropertyEditor = factory(root.d3, root.common_HTMLWidget, root.other_Persist, root.layout_Grid);
    }
}(this, function (d3, HTMLWidget, Persist, Grid) {
    function PropertyEditor() {
        HTMLWidget.call(this);

        this._tag = "div";
        this._show_settings = false;
    }
    PropertyEditor.prototype = Object.create(HTMLWidget.prototype);
    PropertyEditor.prototype.constructor = PropertyEditor;
    PropertyEditor.prototype._class += " other_PropertyEditor";

    PropertyEditor.prototype.publish("showColumns", true, "boolean", "If true, widget.columns() will display as if it was a publish parameter.",null,{tags:["Basic"]});
    PropertyEditor.prototype.publish("showData", true, "boolean", "If true, widget.data() will display as if it was a publish parameter.",null,{tags:["Basic"]});
    
    PropertyEditor.prototype.publish("sorting", "none", "set", "Specify the sorting type",["none","A-Z","Z-A","type"],{tags:["Basic"],icons:["fa-sort","fa-sort-alpha-asc","fa-sort-alpha-desc","fa-sort-amount-asc"]});
    PropertyEditor.prototype.publish("collapsed", false, "boolean", "If true, the table will default to collapased",null,{tags:["Basic"]});
    PropertyEditor.prototype.publish("hideNonWidgets", false, "boolean", "Hides non-widget params (at this tier only)",null,{tags:["Basic"]});
    
    PropertyEditor.prototype.publish("label", "", "string", "Label to display in header of property editor table",null,{tags:["Basic"]});
    
    PropertyEditor.prototype.publish("widget", null, "widget", "Widget",null,{tags:["Basic"], render:false});

    PropertyEditor.prototype._widgetOrig = PropertyEditor.prototype.widget;
    PropertyEditor.prototype.widget = function (_) {
        if (arguments.length && this._widgetOrig() === _) return this;
        var retVal = PropertyEditor.prototype._widgetOrig.apply(this, arguments);
        if (arguments.length) {
            this.watchWidget(_);
        }
        return retVal;
    };
    
    PropertyEditor.prototype.show_settings = function (_) {
        if (!arguments.length) {
            return this._show_settings;
        }
        this._show_settings = _;
        return this;
    };

    PropertyEditor.prototype.rootWidget = function (_) {
        return this.show_settings() ? this : this.widget();
    };

    PropertyEditor.prototype.rootWidgetAsArray = function (_) {
        var rootWidget = this.rootWidget();
        return rootWidget ? [rootWidget] : [];
    };

    PropertyEditor.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var context = this;
        var table = element.selectAll(".table" + this.id()).data(this.rootWidgetAsArray());
        table.enter().append("table")
            .attr("class", "property-table table" + this.id())
            .each(function (d) {
                context._table = d3.select(this);
                context._table.append("thead").append("tr").append("th")
                    .attr("colspan", "2")
                    .each(function (d) {
                        var th = d3.select(this);
                        th.append("span");
                        context.thButtons(th);
                    })
                ;
                context._table.append("tbody");
            })
        ;
        table
            .each(function (d) {
                var element = d3.select(this);
                element.select("thead > tr > th > span")
                    .text(function (d) {
                        var spanText = '';
                        if(context.label()){
                            spanText += context.label() + ": ";
                        }
                        spanText += d.classID();
                        return spanText;
                    })
                ;
                element.selectAll("i").each(function(){
                    var i = d3.select(this);
                    if(i.classed("fa-eye") || i.classed("fa-eye-slash")){
                        i
                            .classed("fa-eye",!context.hideNonWidgets())
                            .classed("fa-eye-slash",context.hideNonWidgets())
                        ;
                    }
                });
                context.renderInputs(element.select("tbody"), d);
            })
        ;
        table.exit()
            .each(function (d) {
                context.renderInputs(element.select("tbody"), null);
            })
            .remove()
        ;

        if (this.rootWidget() instanceof Grid) {
            this.rootWidget().postSelectionChange = function () {
                var selectedItems = context.rootWidget()._selectionBag.get().map(function (item) { return item.widget; });
                var tablePath = "#" + this.id() + " > table";
                element.selectAll(tablePath + " [data-widgetid] tr").style("display", "none");
                var selected = selectedItems.map(function(n){return n.id();});
                if(selected.length > 0){
                    var selectString = selected.map(function(n){
                        return '[data-widgetid="'+n+'"] tr';
                    }).join(",");
                    element.selectAll(tablePath + " > tbody > tr.property-widget-wrapper").style("display", "table-row");
                    element.selectAll(selectString).style("display","table-row");
                    context.hideNonWidgets(true).render();
                    
                    if(selected.length > 0){
                        var pe;
                        d3.selectAll(".other_PropertyEditor").each(function(){
                            var _pe = d3.select(this).datum();
                            if(selected.indexOf(_pe.widget().id()) !== -1){
                                _pe.hideNonWidgets(false).render();
                                pe = _pe;
                            } else {
                                _pe.hideNonWidgets(true).render();
                            }
                        });
                        d3.select("#"+pe.id()).selectAll(".other_PropertyEditor").each(function(){
                            d3.select(this).datum().hideNonWidgets(false).render();
                        });
                    } else {
                        d3.selectAll(".other_PropertyEditor").each(function(){
                            d3.select(this).datum().hideNonWidgets(false).render();
                        });
                    }
                } else {
                    element.selectAll(tablePath + " tr").style("display", "table-row");
                    d3.selectAll(".other_PropertyEditor").each(function(){
                        d3.select(this).datum().hideNonWidgets(false).render();
                    });
                }
                context.render();
            };
        }
    };
    
    PropertyEditor.prototype.exit = function (domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
        this.watchWidget(null);
    };

    var watchDepth = 0;
    PropertyEditor.prototype.watchWidget = function (widget) {
        if (this._watch) {
            if (window.__hpcc_debug) {
                --watchDepth;
                console.log("watchDepth:  " + watchDepth);
            }
            this._watch.remove();
            delete this._watch;
        }
        if (widget) {
            var context = this;
            this._watch = widget.monitor(function (paramId, newVal, oldVal) {
                if (oldVal !== newVal) {
                    context.lazyRender();
                }
            });
            if (window.__hpcc_debug) {
                ++watchDepth;
                console.log("watchDepth:  " + watchDepth);
            }
        }
    };

    PropertyEditor.prototype.lazyRender = PropertyEditor.prototype.debounce(function () {
        this.render();
    }, 100);

    PropertyEditor.prototype.thButtons = function (th) {
        var context = this;
        var collapseIcon = th.append("i")
            .attr("class", "fa fa-minus-square-o")
            .on("click", function () {
                context._table
                    .classed("property-table-collapsed", !context.collapsed())
                ;
                collapseIcon
                    .classed("fa-minus-square-o", !context._table.classed("property-table-collapsed"))
                    .classed("fa-plus-square-o", context._table.classed("property-table-collapsed"))
                ;
                context.collapsed(!context.collapsed());
            })
        ;
        var sortIcon = th.append("i")
            .attr("class", "fa " + context.__meta_sorting.ext.icons[context.__meta_sorting.set.indexOf(context.sorting())])
            .on("click", function () {
                var sort = context.sorting();
                var types = context.__meta_sorting.set;
                var icons = context.__meta_sorting.ext.icons;
                sortIcon
                    .classed(icons[types.indexOf(sort)], false)
                    .classed(icons[(types.indexOf(sort) + 1) % types.length], true)
                ;
                context.sorting(types[(types.indexOf(sort) + 1) % types.length]).render();
            })
        ;
        var hideParamsIcon = th.append("i")
            .attr("class", "fa " + (context.hideNonWidgets() ? "fa-eye-slash" : "fa-eye"))
            .on("click",function(){
                hideParamsIcon
                    .classed("fa-eye", context.hideNonWidgets())
                    .classed("fa-eye-slash", !context.hideNonWidgets())
                ;
                context.hideNonWidgets(!context.hideNonWidgets()).render();
            })
        ;
        hideParamsIcon
                .classed("fa-eye",!context.hideNonWidgets())
                .classed("fa-eye-slash",context.hideNonWidgets())
        ;
    };

    PropertyEditor.prototype.gatherDataTree = function (widget) {
        if (!widget) return null;
        var retVal = {
            label: widget.id() + " (" + widget.classID() + ")",
            children: []
        };
        var arr = Persist.discover(widget);
        arr.forEach(function (prop) {
            var node = {
                label: prop.id,
                children: []
            };
            switch (prop.type) {
                case "widget":
                    node.children.push(this.gatherDataTree(widget[prop.id]()));
                    break;
                case "widgetArray":
                    var arr = widget[prop.id]();
                    if (arr) {
                        arr.forEach(function (item) {
                            node.children.push(this.gatherDataTree(item));
                        }, this);
                    }
                    break;
            }
            retVal.children.push(node);
        }, this);
        return retVal;
    };

    PropertyEditor.prototype.getDataTree = function () {
        return this.gatherDataTree(this.rootWidget());
    };
    
    PropertyEditor.prototype._rowSorting = function (paramArr) {
        if(this.sorting() === "type"){
            var typeOrder = ["boolean","number","string","html-color","array","object","widget","widgetArray"];
            paramArr.sort(function(a,b){
                if(a.type === b.type){
                    return a.id < b.id ? -1 : 1;
                }else{
                    return typeOrder.indexOf(a.type) < typeOrder.indexOf(b.type) ? -1 : 1;
                }
            });
            }
        else if(this.sorting() === "A-Z") {
            paramArr.sort(function(a,b){ return a.id < b.id ? -1 : 1;});
        }
        else if(this.sorting() === "Z-A") {
            paramArr.sort(function(a,b){ return a.id > b.id ? -1 : 1;});
        }
    };

    PropertyEditor.prototype.renderInputs = function (element, d) {
        var discArr = [];
        if (d) {
            discArr = Persist.discover(d);
            if (!this.show_settings() && this.showData()) {
                discArr.push({ id: "data", type: "array" });
            }
            if (!this.show_settings() && this.showColumns()) {
                discArr.push({ id: "columns", type: "array" });
            }
            if (this.hideNonWidgets()) {
                discArr = discArr.filter(function (n) {
                    return n.type === "widget" || n.type === "widgetArray";
                });
            }
            this._rowSorting(discArr);
        }

        var context = this;
        var rows = element.selectAll("tr.prop" + this.id()).data(discArr, function (d) { return d.id; });
        rows.enter().append("tr")
            .attr("class", "property-wrapper prop" + this.id())
            .each(function (param) {
                var tr = d3.select(this);
                if (param.type === "widget" || param.type === "widgetArray") {
                    tr.classed("property-widget-wrapper", true);
                    tr.append("td")
                        .attr("colspan", "2")
                    ;
                } else {
                    tr.classed("property-input-wrapper", true);
                    tr.append("td")
                        .classed("property-label", true)
                        .text(param.id)
                    ;
                    var inputCell = tr.append("td")
                        .classed("property-input-cell", true)
                    ;
                    context.enterInputs(inputCell, param);
                }
            })
        ;
        rows.each(function (param) {
            var tr = d3.select(this);
            if (param.type === "widget" || param.type === "widgetArray") {
                context.updateWidgetRow(tr.select("td"), param);
            } else {
                context.updateInputs(param);
            }
        });
        rows.exit().each(function (param) {
            var tr = d3.select(this);
            if (param.type === "widget" || param.type === "widgetArray") {
                context.updateWidgetRow(tr.select("td"), null);
            }
        }).remove();
        rows.order();
    };
    
    PropertyEditor.prototype.updateWidgetRow = function (element, param) {
        var widget = [];
        if (this.rootWidget() && param) {
            widget = this.rootWidget()[param.id]() || [];
        }
        var widgetArr = widget instanceof Array ? widget : [widget];

        var widgetCell = element.selectAll("div.propEditor" + this.id()).data(widgetArr, function (d) { return d.id(); });
        widgetCell.enter().append("div")
            .attr("class", "property-input-cell propEditor" + this.id())
            .each(function (w) {
                d3.select(this)
                    .attr("data-widgetid", w.id())
                    .property("data-propEditor", new PropertyEditor().label(param.id).target(this))
                ;
            })
        ;
        var context = this;
        widgetCell
            .each(function (w) {
                d3.select(this).property("data-propEditor")
                    .showColumns(context.showColumns())
                    .showData(context.showData())
                    .widget(w)
                    .render()
                ;
            })
        ;
        widgetCell.exit()
            .each(function (w) {
                var element = d3.select(this);
                element.property("data-propEditor")
                    .widget(null)
                    .render()
                    .target(null)
                ;
                element
                    .property("data-propEditor", null)
                ;
            })
            .remove()
        ;
    };

    PropertyEditor.prototype.enterInputs = function (cell, param) {
        var widget = this.rootWidget();
        cell.classed(param.type+"-cell",true);
        switch (param.type) {
            case "boolean":
                cell.append("input")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .attr("type", "checkbox")
                    .on("change", function () {
                        widget[param.id](this.checked).render();
                    })
                ;
                break;
            case "set":
                cell.append("select")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .on("change", function () {
                        widget[param.id](this.value).render();
                    })
                    .each(function (d) {
                        var input = d3.select(this);
                        for (var i = 0; i < param.set.length; i++) {
                            input.append("option").attr("value", param.set[i]).text(param.set[i]);
                        }
                    })
                ;
                break;
            case "array":
            case "object":
                cell.append("textarea")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .on("change", function () {
                        widget[param.id](JSON.parse(this.value)).render();
                    })
                ;
                break;
            default:
                cell.append("input")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .on("change", function () {
                        widget[param.id](this.value).render();
                    })
                ;
                if (param.type === "html-color" && !this.isIE) {
                    cell.append("input")
                        .attr("id", this.id() + "_" + param.id + "_2")
                        .classed("property-input", true)
                        .attr("type", "color")
                        .on("change", function () {
                            widget[param.id](this.value).render();
                        })
                    ;
                }
                break;
        }
    };

    PropertyEditor.prototype.updateInputs = function (param) {
        var element = d3.selectAll("#" + this.id() + "_" + param.id + ", #" + this.id() + "_" + param.id + "_2");
        var val = this.rootWidget() ? this.rootWidget()[param.id]() : "";
        switch (param.type) {
            case "array":
            case "object":
                element.property("value", JSON.stringify(val));
                break;
            case "boolean":
                element.property("checked", val);
                break;
            default:
                element.property("value", val);
                break;
        }
    };
    
    return PropertyEditor;
}));