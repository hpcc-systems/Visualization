import { HTMLWidget, Platform } from "@hpcc-js/common";
import { Widget } from "@hpcc-js/common";
import { Grid } from "@hpcc-js/layout";
import { select as d3Select, selectAll as d3SelectAll } from "d3-selection";
import * as Persist from "./Persist";

import "../src/PropertyEditor.css";

function hasProperties(type) {
    switch (type) {
        case "widget":
        case "widgetArray":
        case "propertyArray":
            return true;
        default:
    }
    return false;
}

export class PropertyEditor extends HTMLWidget {
    _widgetOrig;
    _parentPropertyEditor;
    _show_settings: boolean;
    _selectedItems;
    __meta_sorting;
    _watch;

    constructor() {
        super();
        this._parentPropertyEditor = null;

        this._tag = "div";
        this._show_settings = false;
    }

    parentPropertyEditor(_?: PropertyEditor): PropertyEditor {
        if (!arguments.length) return this._parentPropertyEditor;
        this._parentPropertyEditor = _;
        return this;
    }

    show_settings(): boolean;
    show_settings(_: boolean): PropertyEditor;
    show_settings(_?: boolean): boolean | PropertyEditor {
        if (!arguments.length) {
            return this._show_settings;
        }
        this._show_settings = _;
        return this;
    }

    rootWidgets() {
        if (this._selectedItems && this._selectedItems.length) {
            return this._selectedItems;
        }
        return this.show_settings() ? [this] : this.widget() ? [this.widget()] : [];
    }

    update(domNode, element2) {
        super.update(domNode, element2);

        const context = this;

        const rootWidgets = this.rootWidgets().filter(function (w) {
            if (w._owningWidget && w._owningWidget.excludeObjs instanceof Array) {
                if (w._owningWidget.excludeObjs.indexOf(w.classID()) !== -1) {
                    return false;
                }
            }
            return true;
        });

        const table2 = element2.selectAll(".table" + this.id()).data(rootWidgets, function (d) { return d.id(); });
        table2.enter().append("table")
            .attr("class", "property-table table" + this.id())
            .each(function () {
                const table = d3Select(this);
                table.append("thead").append("tr").append("th").datum(table)
                    .attr("colspan", "2")
                    .each(function () {
                        const th = d3Select(this);
                        th.append("span");
                        context.thButtons(th);
                    })
                    ;
                table.append("tbody");
            })
            .merge(table2)
            .each(function (d2) {
                const element = d3Select(this);
                element.select("thead > tr > th > span")
                    .text(function (d: any) {
                        let spanText = "";
                        if (context.label()) {
                            spanText += context.label();
                        }
                        if (d && d.classID) {
                            if (spanText) {
                                spanText += " - ";
                            }
                            spanText += d.classID();
                        }
                        return spanText;
                    })
                    ;
                element.selectAll("i")
                    .classed("fa-eye", !context.hideNonWidgets())
                    .classed("fa-eye-slash", context.hideNonWidgets());
                context.renderInputs(element.select("tbody"), d2);
            })
            ;
        table2.exit()
            .each(function () {
                context.renderInputs(element2.select("tbody"), null);
            })
            .remove()
            ;
    }

    exit(domNode, element) {
        super.exit(domNode, element);
        this.watchWidget(null);
    }

    private watchDepth = 0;
    watchWidget(widget) {
        if (this._watch) {
            if ((window as any).__hpcc_debug) {
                --this.watchDepth;
                console.log("watchDepth:  " + this.watchDepth);
            }
            this._watch.remove();
            delete this._watch;
        }
        if (widget) {
            const context = this;
            this._watch = widget.monitor(function (_paramId, newVal, oldVal) {
                if (oldVal !== newVal) {
                    context.lazyRender();
                }
            });
            if ((window as any).__hpcc_debug) {
                ++this.watchDepth;
                console.log("watchDepth:  " + this.watchDepth);
            }
        }
    }

    thButtons(th) {
        const context = this;
        const collapseIcon = th.append("i")
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
            const sortIcon = th.append("i")
                .attr("class", "fa " + context.__meta_sorting.ext.icons[context.sorting_options().indexOf(context.sorting())])
                .on("click", function () {
                    const sort = context.sorting();
                    const types = context.sorting_options();
                    const icons = context.__meta_sorting.ext.icons;
                    sortIcon
                        .classed(icons[types.indexOf(sort)], false)
                        .classed(icons[(types.indexOf(sort) + 1) % types.length], true)
                        ;
                    context.sorting(types[(types.indexOf(sort) + 1) % types.length]).render();
                })
                ;
            const hideParamsIcon = th.append("i")
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
    }

    gatherDataTree(widget) {
        if (!widget) return null;
        const retVal = {
            label: widget.id() + " (" + widget.classID() + ")",
            children: []
        };
        const arr2 = Persist.discover(widget);
        arr2.forEach(function (prop) {
            const node = {
                label: prop.id,
                children: []
            };
            switch (prop.type) {
                case "widget":
                    node.children.push(this.gatherDataTree(widget[prop.id]()));
                    break;
                case "widgetArray":
                case "propertyArray":
                    const arr = widget[prop.id]();
                    if (arr) {
                        arr.forEach(function (item) {
                            node.children.push(this.gatherDataTree(item));
                        }, this);
                    }
                    break;
                default:
            }
            retVal.children.push(node);
        }, this);
        return retVal;
    }

    getDataTree() {
        return this.gatherDataTree(this.widget());
    }

    _rowSorting(paramArr) {
        if (this.sorting() === "type") {
            const typeOrder = ["boolean", "number", "string", "html-color", "array", "object", "widget", "widgetArray", "propertyArray"];
            paramArr.sort(function (a, b) {
                if (a.type === b.type) {
                    return a.id < b.id ? -1 : 1;
                } else {
                    return typeOrder.indexOf(a.type) < typeOrder.indexOf(b.type) ? -1 : 1;
                }
            });
        } else if (this.sorting() === "A-Z") {
            paramArr.sort(function (a, b) { return a.id < b.id ? -1 : 1; });
        } else if (this.sorting() === "Z-A") {
            paramArr.sort(function (a, b) { return a.id > b.id ? -1 : 1; });
        }
    }

    filterInputs(d) {
        const discArr = Persist.discover(d);
        if ((this.filterTags() || this.excludeTags().length > 0 || this.excludeParams.length > 0) && d instanceof PropertyEditor === false) {
            const context = this;
            return discArr.filter(function (param, _idx) {
                for (const excludeParamItem of context.excludeParams()) {
                    const arr = excludeParamItem.split(".");
                    let widgetName;
                    let obj;
                    let excludeParam;
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
                if (context.excludeTags().length > 0 && param.ext && param.ext.tags && param.ext.tags.some(function (item) { return (context.excludeTags().indexOf(item) > -1); })) {
                    return false;
                }
                if ((context.filterTags() && param.ext && param.ext.tags && param.ext.tags.indexOf(context.filterTags()) !== -1) || !context.filterTags()) {
                    return true;
                }
                return false;
            });
        }
        return discArr;
    }

    renderInputs(element, d) {
        const context = this;
        let discArr = [];
        const showFields = !this.show_settings() && this.showFields();
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

        const rows = element.selectAll("tr.prop" + this.id()).data(discArr, function (d2) { return d2.id; });
        rows.enter().append("tr")
            .attr("class", "property-wrapper prop" + this.id())
            .each(function (param) {
                const tr = d3Select(this);
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
                    const inputCell = tr.append("td")
                        .classed("property-input-cell", true)
                        ;
                    context.enterInputs(d, inputCell, param);
                }
            }).merge(rows)
            .each(function (param) {
                const tr = d3Select(this);
                tr.classed("disabled", d[param.id + "_disabled"] && d[param.id + "_disabled"]());
                tr.attr("title", param.description);
                if (hasProperties(param.type)) {
                    context.updateWidgetRow(d, tr.select("td"), param);
                } else {
                    context.updateInputs(d, param);
                }
            });
        rows.exit().each(function (param) {
            const tr = d3Select(this);
            if (hasProperties(param.type)) {
                context.updateWidgetRow(d, tr.select("td"), null);
            }
        }).remove();
        rows.order();
    }

    updateWidgetRow(widget, element, param) {
        let tmpWidget = [];
        if (widget && param) {
            tmpWidget = widget[param.id]() || [];
        }
        let widgetArr = tmpWidget instanceof Array ? tmpWidget : [tmpWidget];
        if (param && param.ext && param.ext.autoExpand) {
            //  remove empties and ensure last row is an empty  ---
            let lastModified = true;
            const noEmpties = widgetArr.filter(function (row, idx) {
                lastModified = row.publishedModified();
                row._owner = widget;
                return lastModified || idx === widgetArr.length - 1;
            }, this);
            let changed = !!(widgetArr.length - noEmpties.length);
            if (lastModified) {
                changed = true;
                noEmpties.push(new param.ext.autoExpand(widget));
            }
            if (changed) {
                widget[param.id](noEmpties);
                widgetArr = noEmpties;
            }
        }

        const context = this;
        const widgetCell = element.selectAll("div.propEditor" + this.id()).data(widgetArr, function (d) { return d.id(); });
        widgetCell.enter().append("div")
            .attr("class", "property-input-cell propEditor" + this.id())
            .each(function (w) {
                d3Select(this)
                    .attr("data-widgetid", w.id())
                    .property("data-propEditor", new PropertyEditor().label(param.id).target(this))
                    ;
            }).merge(widgetCell)
            .each(function (w) {
                d3Select(this).property("data-propEditor")
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
            .each(function () {
                const element2 = d3Select(this);
                element2.property("data-propEditor")
                    .widget(null)
                    .render()
                    .target(null)
                    ;
                element2
                    .property("data-propEditor", null)
                    ;
            })
            .remove()
            ;
    }

    setProperty(widget, id, value) {
        //  With PropertyExt not all "widgets" have a render, if not use parents render...
        let propEditor: PropertyEditor = this;
        while (propEditor && widget) {
            if (propEditor === this) {
                widget[id](value);
            }

            if (widget._parentElement) {
                const tmpPE = propEditor;
                widget.render(function () {
                    tmpPE.render();
                });
                propEditor = null;
            } else {
                propEditor = propEditor.parentPropertyEditor();
                widget = propEditor.widget();
            }
        }
    }

    enterInputs(widget, cell, param) {
        cell.classed(param.type + "-cell", true);
        const context = this;
        if (typeof (param.ext.editor_input) === "function") {
            param.ext.editor_input(this, widget, cell, param);
        }
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
                    .each(function () {
                        const input = d3Select(this);
                        const set = widget[param.id + "_options"]();
                        for (const setItem of set) {
                            input.append("option").attr("value", setItem).text(setItem);
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
            if(param.ext && param.ext.range){
                cell.append("span")
                    .classed("property-input-span", true)
                    .attr("id", this.id() + "_" + param.id + "_currentVal")
                    .text(param.defaultValue)
                ;
                cell.append("input")
                    .attr("type", "range")
                    .attr("step", param.ext.range.step)
                    .attr("min", param.ext.range.min)
                    .attr("max", param.ext.range.max)
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .on("input", function () {
                        context.setProperty(widget, param.id, this.value);
                        d3.select('#'+this.id+"_currentVal").text('Current Value: '+this.value);
                    })
                    .on("change", function () {
                        context.setProperty(widget, param.id, this.value);
                        d3.select('#'+this.id+"_currentVal").text('Current Value: '+this.value);
                    })
                    ;
            } else {
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
            }
                break;
        }
    }

    updateInputs(widget, param) {
        const element = d3SelectAll("#" + this.id() + "_" + param.id + ", #" + this.id() + "_" + param.id + "_2");
        const val = widget ? widget[param.id]() : "";
        element.property("disabled", widget[param.id + "_disabled"] && widget[param.id + "_disabled"]());
        switch (param.type) {
            case "array":
            case "object":
                element.property("value", JSON.stringify(val, function replacer(_key, value) {
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
                if(param.ext && param.ext.range){
                    d3.select("#" + this.id() + "_" + param.id + "_currentVal").text('Current Value: '+val);
                }
                element.property("value", val);
                break;
        }
    }

    showFields: { (): boolean; (_: boolean): PropertyEditor; };
    showData: { (): boolean; (_: boolean): PropertyEditor; };

    sorting: { (): string; (_: string): PropertyEditor; };
    sorting_options: () => string[];

    hideNonWidgets: { (): boolean; (_: boolean): PropertyEditor; };

    label: { (): string; (_: string): PropertyEditor; };
    filterTags: { (): string; (_: string): PropertyEditor; };
    excludeTags: { (): string[]; (_: string[]): PropertyEditor; };
    excludeParams: { (): string[]; (_: string[]): PropertyEditor; };

    widget(): Widget;
    widget(_: Widget): PropertyEditor;
    widget(_?: Widget): Widget | PropertyEditor {
        if (arguments.length && this._widgetOrig() === _) return this;
        const retVal = PropertyEditor.prototype._widgetOrig.apply(this, arguments);
        if (arguments.length) {
            this.watchWidget(_);
            if (_ instanceof Grid) {
                const context = this;
                _.postSelectionChange = function () {
                    context._selectedItems = _._selectionBag.get().map(function (item) { return item.widget; });
                    context.lazyRender();
                };
            }
        }
        return retVal;
    }
}
PropertyEditor.prototype._class += " other_PropertyEditor";

PropertyEditor.prototype.publish("showFields", false, "boolean", "If true, widget.fields() will display as if it was a publish parameter.", null, { tags: ["Basic"] });
PropertyEditor.prototype.publish("showData", false, "boolean", "If true, widget.data() will display as if it was a publish parameter.", null, { tags: ["Basic"] });

PropertyEditor.prototype.publish("sorting", "none", "set", "Specify the sorting type", ["none", "A-Z", "Z-A", "type"], { tags: ["Basic"], icons: ["fa-sort", "fa-sort-alpha-asc", "fa-sort-alpha-desc", "fa-sort-amount-asc"] });

PropertyEditor.prototype.publish("hideNonWidgets", false, "boolean", "Hides non-widget params (at this tier only)", null, { tags: ["Basic"] });

PropertyEditor.prototype.publish("label", "", "string", "Label to display in header of property editor table", null, { tags: ["Basic"] });
PropertyEditor.prototype.publish("filterTags", "", "set", "Only show Publish Params of this type", ["Basic", "Intermediate", "Advance", ""], {});
PropertyEditor.prototype.publish("excludeTags", [], "array", "Exclude this array of tags", null, {});
PropertyEditor.prototype.publish("excludeParams", [], "array", "Exclude this array of params (widget.param)", null, {});

PropertyEditor.prototype.publish("widget", null, "widget", "Widget", null, { tags: ["Basic"], render: false });

PropertyEditor.prototype._widgetOrig = PropertyEditor.prototype.widget;
