"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["d3", "../common/HTMLWidget", "../other/Persist", "../layout/Grid", "../common/Widget", "css!./PropertyEditor"], factory);
    } else {
        root.other_PropertyEditor = factory(root.d3, root.common_HTMLWidget, root.other_Persist, root.layout_Grid, root.common_Widget);
    }
}(this, function (d3, HTMLWidget, Persist, Grid, Widget) {
    function hasProperties(type) {
        switch (type) {
            case "widget":
            case "widgetArray":
            case "propertyArray":
                return true;
        }
        return false;
    }

    function PropertyEditor() {
        HTMLWidget.call(this);
        this._parentPropertyEditor = null;

        this._tag = "div";
        this._show_settings = false;
    }
    PropertyEditor.prototype = Object.create(HTMLWidget.prototype);
    PropertyEditor.prototype.constructor = PropertyEditor;
    PropertyEditor.prototype._class += " other_PropertyEditor";

    PropertyEditor.prototype.publish("showFields", false, "boolean", "If true, widget.fields() will display as if it was a publish parameter.",null,{tags:["Basic"]});
    PropertyEditor.prototype.publish("showData", false, "boolean", "If true, widget.data() will display as if it was a publish parameter.", null, { tags: ["Basic"] });
    
    PropertyEditor.prototype.publish("sorting", "none", "set", "Specify the sorting type",["none","A-Z","Z-A","type"],{tags:["Basic"],icons:["fa-sort","fa-sort-alpha-asc","fa-sort-alpha-desc","fa-sort-amount-asc"]});

    PropertyEditor.prototype.publish("hideNonWidgets", false, "boolean", "Hides non-widget params (at this tier only)",null,{tags:["Basic"]});

    PropertyEditor.prototype.publish("label", "", "string", "Label to display in header of property editor table",null,{tags:["Basic"]});
    PropertyEditor.prototype.publish("filterTags", "", "set", "Only show Publish Params of this type",["Basic","Intermediate","Advance",""], {});
    PropertyEditor.prototype.publish("excludeTags", [], "array", "Exclude this array of tags",null, {});
    PropertyEditor.prototype.publish("excludeParams", [], "array", "Exclude this array of params (widget.param)",null, {});

    PropertyEditor.prototype.publish("widget", null, "widget", "Widget",null,{tags:["Basic"], render:false});

    PropertyEditor.prototype.parentPropertyEditor = function (_) {
        if (!arguments.length) return this._parentPropertyEditor;
        this._parentPropertyEditor = _;
        return this;
    };

    PropertyEditor.prototype._widgetOrig = PropertyEditor.prototype.widget;
    PropertyEditor.prototype.widget = function (_) {
        if (arguments.length && this._widgetOrig() === _) return this;
        var retVal = PropertyEditor.prototype._widgetOrig.apply(this, arguments);
        if (arguments.length) {
            this.watchWidget(_);
            if (_ instanceof Grid) {
                var context = this;
                _.postSelectionChange = function () {
                    context._selectedItems = _._selectionBag.get().map(function (item) { return item.widget; });
                    context.render();
                };
            }
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

    PropertyEditor.prototype.rootWidgets = function () {
        if (this._selectedItems && this._selectedItems.length) {
            return this._selectedItems;
        }
        return this.show_settings() ? [this] : this.widget() ? [this.widget()] : [];
    };

    PropertyEditor.prototype.update = function (domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);

        var context = this;

        var rootWidgets = this.rootWidgets().filter(function(w) {
            if (w._owningWidget && w._owningWidget.excludeObjs instanceof Array) {
                if (w._owningWidget.excludeObjs.indexOf(w.classID()) !== -1) {
                    return false;
                }
            }
            return true;
        });

        var table = element.selectAll(".table" + this.id()).data(rootWidgets, function (d) { return d.id(); });
        table.enter().append("table")
            .attr("class", "property-table table" + this.id())
            .each(function (d) {
                var table = d3.select(this);
                table.append("thead").append("tr").append("th").datum(table)
                    .attr("colspan", "2")
                    .each(function (d) {
                        var th = d3.select(this);
                        th.append("span");
                        context.thButtons(th);
                    })
                ;
                table.append("tbody");
            })
        ;
        table
            .each(function (d) {
                var element = d3.select(this);
                element.select("thead > tr > th > span")
                    .text(function (d) {
                        var spanText = '';
                        if(context.label()){
                            spanText += context.label();
                        }
                        return spanText;
                    })
                ;
                element.selectAll("i")
                        .classed("fa-eye",!context.hideNonWidgets())
                        .classed("fa-eye-slash",context.hideNonWidgets());
                context.renderInputs(element.select("tbody"), d);
            })
        ;
        table.exit()
            .each(function (d) {
                context.renderInputs(element.select("tbody"), null);
            })
            .remove()
        ;
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

    PropertyEditor.prototype.thButtons = function (th) {
        var context = this;
        var collapseIcon = th.append("i")
            .attr("class", "fa fa-minus-square-o")
            .on("click", function (d) {
                d
                    .classed("property-table-collapsed", !d.classed("property-table-collapsed"))
                ;
                collapseIcon
                    .classed("fa-minus-square-o", !d.classed("property-table-collapsed"))
                    .classed("fa-plus-square-o", d.classed("property-table-collapsed"))
                ;
            })
        ;
        if (this.parentPropertyEditor() === null) {
            var sortIcon = th.append("i")
                .attr("class", "fa " + context.__meta_sorting.ext.icons[context.sorting_options().indexOf(context.sorting())])
                .on("click", function () {
                    var sort = context.sorting();
                    var types = context.sorting_options();
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
                .on("click", function () {
                    hideParamsIcon
                        .classed("fa-eye", context.hideNonWidgets())
                        .classed("fa-eye-slash", !context.hideNonWidgets())
                    ;
                    context.hideNonWidgets(!context.hideNonWidgets()).render();
                })
            ;
            hideParamsIcon
                    .classed("fa-eye", !context.hideNonWidgets())
                    .classed("fa-eye-slash", context.hideNonWidgets())
            ;
        }
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
                case "propertyArray":
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
            var typeOrder = ["boolean","number","string","html-color","array","object","widget","widgetArray","propertyArray"];
            paramArr.sort(function(a,b){
                if(a.type === b.type){
                    return a.id < b.id ? -1 : 1;
                }else{
                    return typeOrder.indexOf(a.type) < typeOrder.indexOf(b.type) ? -1 : 1;
                }
            });
        } else if(this.sorting() === "A-Z") {
            paramArr.sort(function(a,b){ return a.id < b.id ? -1 : 1;});
        }  else if(this.sorting() === "Z-A") {
            paramArr.sort(function(a,b){ return a.id > b.id ? -1 : 1;});
        }
    };

    PropertyEditor.prototype.filterInputs = function(d) {
        var discArr = Persist.discover(d);
        if ((this.filterTags() || this.excludeTags().length > 0 || this.excludeParams.length > 0) && d instanceof PropertyEditor === false) {
            var context = this;
            return discArr.filter(function(param, idx) {
                for (var i = 0; i < context.excludeParams().length; i++) {
                    var arr = context.excludeParams()[i].split(".");
                    var widgetName, obj, excludeParam;
                    if (arr.length > 2) {
                        widgetName = arr[0];
                        obj = arr[1];
                        excludeParam = arr[2];
                    } else {
                        widgetName = arr[0];
                        excludeParam = arr[1];   
                    }
                    if (d.class().indexOf(widgetName) !== -1) {
                        if (param.id === excludeParam) {
                            return false;
                        }
                        return true;
                    }
                }
                if (context.excludeTags().length > 0 && param.ext && param.ext.tags && param.ext.tags.some(function(item){ return (context.excludeTags().indexOf(item) > -1); })) {
                   return false; 
                }
                if ((context.filterTags() && param.ext && param.ext.tags && param.ext.tags.indexOf(context.filterTags()) !== -1) || !context.filterTags()) {
                    return true;
                }
                return false;
            });
        }
        return discArr;
    };

    PropertyEditor.prototype.renderInputs = function (element, d) {
        var context = this;
        var discArr = [];
        var showFields = !this.show_settings() && this.showFields();
        if (d) {
            discArr = this.filterInputs(d).filter(function (prop) { return prop.id !== "fields" ? true : showFields; });
            if (!this.show_settings() && this.showData() && d.data) {
                discArr.push({ id: "data", type: "array" });
            }
            if (this.hideNonWidgets()) {
                discArr = discArr.filter(function (n) {
                    return hasProperties(n.type);
                });
            }
            this._rowSorting(discArr);
        }

        var rows = element.selectAll("tr.prop" + this.id()).data(discArr, function (d) { return d.id; });
        rows.enter().append("tr")
            .attr("class", "property-wrapper prop" + this.id())
            .each(function (param) {
                var tr = d3.select(this);
                if (hasProperties(param.type)) {
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
                    context.enterInputs(d, inputCell, param);
                }
            })
        ;
        rows.each(function (param) {
            var tr = d3.select(this);
            tr.classed("disabled", d[param.id + "_disabled"] && d[param.id + "_disabled"]());
            if (hasProperties(param.type)) {
                context.updateWidgetRow(d, tr.select("td"), param);
            } else {
                context.updateInputs(d, param);
            }
        });
        rows.exit().each(function (param) {
            var tr = d3.select(this);
            if (hasProperties(param.type)) {
                context.updateWidgetRow(d, tr.select("td"), null);
            }
        }).remove();
        rows.order();
    };
    
    PropertyEditor.prototype.updateWidgetRow = function (widget, element, param) {
        var tmpWidget = [];
        if (widget && param) {
            tmpWidget = widget[param.id]() || [];
        }
        var widgetArr = tmpWidget instanceof Array ? tmpWidget : [tmpWidget];
        if (param && param.ext && param.ext.autoExpand) {
            //  remove empties and ensure last row is an empty  ---
            var lastModified = true;
            var noEmpties = widgetArr.filter(function (row, idx) {
                lastModified = row.publishedModified();
                row._owner = widget;
                return lastModified || idx === widgetArr.length - 1;
            }, this);
            var changed = widgetArr.length - noEmpties.length;
            if (lastModified) {
                changed = true;
                noEmpties.push(new param.ext.autoExpand(widget));
            }
            if (changed) {
                widget[param.id](noEmpties);
                widgetArr = noEmpties;
            }
        }

        var context = this;
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
        widgetCell
            .each(function (w) {
                d3.select(this).property("data-propEditor")
                    .parentPropertyEditor(context)
                    .showFields(context.showFields())
                    .showData(context.showData())
                    .sorting(context.sorting())
                    .filterTags(context.filterTags())
                    .excludeTags(context.excludeTags())
                    .excludeParams(context.excludeParams())
                    .hideNonWidgets(context.hideNonWidgets() && w._class.indexOf("layout_") >= 0)
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

    PropertyEditor.prototype.setProperty = function (widget, id, value) {
        //  With PropertyExt not all "widgets" have a render, if not use parents render...
        var propEditor = this;
        while (propEditor && widget) {
            if (propEditor === this) {
                widget[id](value);
            }
            
            if (widget.render) {
                var tmpPE = propEditor;
                widget.render(function (w) {
                    tmpPE.render();
                });
                propEditor = null;
            } else {
                propEditor = propEditor.parentPropertyEditor();
                widget = propEditor.widget();
            }
        }
    };

    PropertyEditor.prototype.enterInputs = function (widget, cell, param) {
        cell.classed(param.type+"-cell",true);
        var context = this;
        switch (param.type) {
            case "boolean":
                cell.append("input")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .attr("type", "checkbox")
                    .on("change", function () {
                        context.setProperty(widget, param.id, this.checked);
                    })
                ;
                break;
            case "set":
                cell.append("select")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .on("change", function () {
                        context.setProperty(widget, param.id, this.value);
                    })
                    .each(function (d) {
                        var input = d3.select(this);
                        var set = widget[param.id + "_options"]();
                        for (var i = 0; i < set.length; i++) {
                            input.append("option").attr("value", set[i]).text(set[i]);
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
                        context.setProperty(widget, param.id, JSON.parse(this.value));
                    })
                ;
                break;
            default:

                cell.append("input")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .on("change", function () {
                        context.setProperty(widget, param.id, this.value);
                    })
                ;
                if (param.type === "html-color" && !this.isIE) {
                    cell.append("input")
                        .attr("id", this.id() + "_" + param.id + "_2")
                        .classed("property-input", true)
                        .attr("type", "color")
                        .on("change", function () {
                            context.setProperty(widget, param.id, this.value);
                        })
                    ;
                }
                break;
        }
    };

    PropertyEditor.prototype.updateInputs = function (widget, param) {
        var element = d3.selectAll("#" + this.id() + "_" + param.id + ", #" + this.id() + "_" + param.id + "_2");
        var val = widget ? widget[param.id]() : "";
        element.property("disabled", widget[param.id + "_disabled"] && widget[param.id + "_disabled"]());
        switch (param.type) {
            case "array":
            case "object":
                element.property("value", JSON.stringify(val, function replacer(key, value) {
                    if (value instanceof Widget) {
                        return Persist.serialize(value);
                    }
                    return value;
                }));
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