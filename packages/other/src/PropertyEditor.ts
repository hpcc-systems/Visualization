import { HTMLWidget, Platform, PropertyExt, Widget } from "@hpcc-js/common";
import { Grid } from "@hpcc-js/layout";
import { local as d3Local, select as d3Select, selectAll as d3SelectAll } from "d3-selection";
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
    private _childPE = d3Local<PropertyEditor>();

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

    depth(): number {
        let retVal = 0;
        let parent = this.parentPropertyEditor();
        while (parent) {
            ++retVal;
            parent = parent.parentPropertyEditor();
        }
        return retVal;
    }

    _show_header = true;
    show_header(): boolean;
    show_header(_: boolean): PropertyEditor;
    show_header(_?: boolean): boolean | PropertyEditor {
        if (!arguments.length) {
            return this._show_header;
        }
        this._show_header = _;
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

    update(domNode, element) {
        super.update(domNode, element);

        const context = this;

        const rootWidgets = this.rootWidgets().filter(function (w) {
            if (w._owningWidget && w._owningWidget.excludeObjs instanceof Array) {
                if (w._owningWidget.excludeObjs.indexOf(w.classID()) !== -1) {
                    return false;
                }
            }
            return true;
        });

        const table = element.selectAll(`table.property-table.table-${this.depth()}`).data(rootWidgets, function (d) {
            //  We reuse the existing DOM Nodes and this node _might_ have been a regular Input previously  ---
            if (typeof d.id !== "function") {
                return `meta-${d.id}`;
            }
            return d.id();
        });
        table.enter().append("table")
            .attr("class", `property-table table-${this.depth()}`)
            .each(function () {
                const tableElement = d3Select(this);

                //  Header  ---
                if (context._show_header && context.parentPropertyEditor() === null) {
                    tableElement.append("thead").append("tr").append("th")// .datum(tableElement)
                        .attr("colspan", "2")
                        .each(function () {
                            context.enterHeader(d3Select(this));
                        })
                        ;
                }

                //  Body  ---
                tableElement.append("tbody");
            })
            .merge(table)
            .each(function (tableData) {
                const tableElement = d3Select(this);

                //  Header  ---
                if (context._show_header && context.parentPropertyEditor() === null) {
                    context.updateHeader(tableElement.select("thead > tr > th"));
                }

                //  Body  ---
                context.renderInputs(tableElement.select("tbody"), tableData);
            })
            ;
        table.exit()
            .each(function () {
                context.renderInputs(element.select("tbody"), null);
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
                    const propEditor = context.parentPropertyEditor() || context;
                    propEditor.lazyRender();
                }
            });
            if ((window as any).__hpcc_debug) {
                ++this.watchDepth;
                console.log("watchDepth:  " + this.watchDepth);
            }
        }
    }

    enterHeader(th) {
        const context = this;

        th.append("span");
        th.append("i")
            .attr("class", "expandIcon fa")
            .on("click", function () {
                switch (context.peInputIcon()) {
                    case "fa-caret-up":
                    case "fa-caret-right":
                        context.element().selectAll(`.table-${context.depth()} > tbody > tr > .headerRow > .peInput > .property-table-collapsed`)
                            .classed("property-table-collapsed", false)
                            ;
                        context.element().selectAll(`.table-${context.depth()} > tbody > tr > .headerRow > .peInput > i`)
                            .classed("fa-minus-square-o", true)
                            .classed("fa-plus-square-o", false)
                            ;
                        break;
                    case "fa-caret-down":
                        context.element().selectAll(`.table-${context.depth()} > tbody > tr > .headerRow > .peInput > div`)
                            .classed("property-table-collapsed", true)
                            ;
                        context.element().selectAll(`.table-${context.depth()} > tbody > tr > .headerRow > .peInput > i`)
                            .classed("fa-minus-square-o", false)
                            .classed("fa-plus-square-o", true)
                            ;
                        break;
                }
                context.refreshExpandIcon();
            })
            ;

        const sortIcon = th.append("i")
            .attr("class", "sortIcon fa")
            .on("click", function () {
                context.refreshSortIcon(sortIcon, true);
            })
            ;

        th.append("i")
            .attr("class", "hideParamsIcon fa")
            .on("click", function () {
                context.hideNonWidgets(!context.hideNonWidgets()).render();
            })
            ;
    }

    updateHeader(th) {
        const widget: any = this.widget();
        let spanText = "";
        if (widget) {
            if (widget.label) {
                spanText += widget.label();
            }
            if (widget.classID) {
                if (spanText) {
                    spanText += " - ";
                }
                spanText += widget.classID();
            }
        }
        th.select("span")
            .text(spanText)
            ;
        this.refreshExpandIcon();
        this.refreshSortIcon(th.select(".sortIcon"));
        this.refreshHideParamsIcon(th.select(".hideParamsIcon"));
    }

    peInputCount() {
        return this.element().selectAll(`.table-${this.depth()} > tbody > tr > .headerRow > .peInput > div`).size();
    }

    peInputCollapsedCount() {
        return this.element().selectAll(`.table-${this.depth()} > tbody > tr > .headerRow > .peInput > div.property-table-collapsed`).size();
    }

    peInputIcon(): "fa-caret-down" | "fa-caret-up" | "fa-caret-right" {
        const collapsed = this.peInputCollapsedCount();
        if (collapsed === 0) {
            return "fa-caret-down";
        } else if (collapsed === this.peInputCount()) {
            return "fa-caret-up";
        }
        return "fa-caret-right";
    }

    refreshExpandIcon() {
        const newIcon = this.peInputIcon();
        this.element().select(`.table-${this.depth()} > thead > tr > th > .expandIcon`)
            .classed("fa-caret-up", false)
            .classed("fa-caret-right", false)
            .classed("fa-caret-down", false)
            .classed(newIcon, true)
            ;
    }

    refreshSortIcon(sortIcon, increment = false) {
        const sort = this.sorting();
        const types = this.sorting_options();
        const icons = this.__meta_sorting.ext.icons;
        if (increment) {
            sortIcon.classed(icons[types.indexOf(sort)], false);
            this.sorting(types[(types.indexOf(sort) + 1) % types.length]).render();
        } else {
            sortIcon
                .classed(icons[(types.indexOf(sort)) % types.length], true)
                .attr("title", sort)
                ;
        }
    }

    refreshHideParamsIcon(hideParamsIcon) {
        hideParamsIcon
            .classed("fa-eye", !this.hideNonWidgets())
            .classed("fa-eye-slash", this.hideNonWidgets())
            ;
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
                    let excludeParam;
                    if (arr.length > 2) {
                        widgetName = arr[0];
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

    updateWidgetRow(widget: PropertyExt, element, param) {
        let tmpWidget = [];
        if (widget && param) {
            tmpWidget = widget[param.id]() || [];
        }
        let widgetArr = tmpWidget instanceof Array ? tmpWidget : [tmpWidget];
        if (param && param.ext && param.ext.autoExpand) {
            //  remove empties and ensure last row is an empty  ---
            let lastModified = true;
            const noEmpties = widgetArr.filter(function (row, idx) {
                lastModified = row.valid();
                row._owner = widget;
                return lastModified || idx === widgetArr.length - 1;
            }, this);
            const widgetDisabled = widget[param.id + "_disabled"] && widget[param.id + "_disabled"]();
            let changed = !!(widgetArr.length - noEmpties.length);
            if (lastModified && !widgetDisabled) {
                changed = true;
                const autoExpandWidget = new param.ext.autoExpand()
                    .owner(widget)
                    ;
                // autoExpandWidget.monitor((id, newVal, oldVal, source) => {
                // widget.broadcast(param.id, newVal, oldVal, source);
                // });
                noEmpties.push(autoExpandWidget);
            }
            if (changed) {
                widget[param.id](noEmpties);
                widgetArr = noEmpties;
            }
        }

        const context = this;
        element.classed("headerRow", true);
        const peInput = element.selectAll(`div.peInput-${this.depth()}`).data(widgetArr, function (d) { return d.id(); });
        peInput.enter().append("div")
            .attr("class", `peInput peInput-${this.depth()}`)
            .each(function (w) {
                const peInputElement = d3Select(this);

                //  Header  ---
                peInputElement.append("span");
                peInputElement.append("i")
                    .attr("class", "fa")
                    .on("click", function (d) {
                        const clickTarget = peInputElement.select("div");
                        clickTarget
                            .classed("property-table-collapsed", !clickTarget.classed("property-table-collapsed"))
                            ;
                        d3Select(this)
                            .classed("fa-minus-square-o", !clickTarget.classed("property-table-collapsed"))
                            .classed("fa-plus-square-o", clickTarget.classed("property-table-collapsed"))
                            ;
                        context.refreshExpandIcon();
                    })
                    ;

                //  Body  ---
                const peDiv = peInputElement.append("div")
                    // .attr("class", `property- input - cell propEditor-${context.depth() }`)
                    ;
                context._childPE.set(this, new PropertyEditor().label(param.id).target(peDiv.node() as HTMLElement));
            })
            .merge(peInput)
            .each(function (w) {
                const peInputElement = d3Select(this);
                const clickTarget = peInputElement.select("div");

                //  Header  ---
                d3Select(this).select("span")
                    .text(`${param.id}`)
                    ;

                d3Select(this).select("i")
                    .classed("fa-minus-square-o", !clickTarget.classed("property-table-collapsed"))
                    .classed("fa-plus-square-o", clickTarget.classed("property-table-collapsed"))
                    ;

                //  Body  ---
                context._childPE.get(this)
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
        peInput.exit()
            .each(function (w) {
                context._childPE.get(this)
                    .widget(null)
                    .render()
                    .target(null)
                    ;
                context._childPE.remove(this);
            })
            .remove()
            ;
    }

    setProperty(widget, id, value) {
        //  With PropertyExt not all "widgets" have a render, if not use top most render...
        let topWidget: Widget;
        let topPropEditor: Widget;
        let propEditor: PropertyEditor = this;
        let oldValue;
        while (propEditor && widget) {
            if (propEditor === this) {
                oldValue = widget[id]();
                widget[id](value);
            }
            if (propEditor) {
                topPropEditor = propEditor;
                const w: PropertyExt = propEditor.widget();
                if (w instanceof Widget) {
                    topWidget = w;
                }
            }
            propEditor = propEditor.parentPropertyEditor();
        }
        if (topWidget) {
            topWidget.render();
        }
        if (topPropEditor) {
            topPropEditor.broadcast(id, value, oldValue, widget);
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
                    ;
                break;
            case "array":
            case "object":
                cell.append("textarea")
                    .attr("id", this.id() + "_" + param.id)
                    .classed("property-input", true)
                    .attr("autocomplete", "off")
                    .attr("autocorrect", "off")
                    .attr("autocapitalize", "off")
                    .attr("spellcheck", "false")
                    .on("change", function () {
                        let value;
                        try {
                            value = JSON.parse(this.value);
                        } catch (e) {
                            value = this.value;
                        }
                        context.setProperty(widget, param.id, value);
                    })
                    ;
                break;
            default:
                if (param.ext && param.ext.range) {
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
                            d3Select("#" + this.id + "_currentVal").text("Current Value: " + this.value);
                        })
                        .on("change", function () {
                            context.setProperty(widget, param.id, this.value);
                            d3Select("#" + this.id + "_currentVal").text("Current Value: " + this.value);
                        })
                        ;
                } else {
                    cell.append(param.ext && param.ext.multiline ? "textarea" : "input")
                        .attr("id", this.id() + "_" + param.id)
                        .classed("property-input", true)
                        .attr("autocomplete", "off")
                        .attr("autocorrect", "off")
                        .attr("autocapitalize", "off")
                        .attr("spellcheck", "false")
                        .on("change", function () {
                            context.setProperty(widget, param.id, this.value);
                        })
                        ;
                    if (param.type === "html-color" && !Platform.isIE) {
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
            case "boolean":
                element.property("checked", val);
                break;
            case "set":
                const options = element.selectAll("option").data<string | { value: string, text: string }>(widget[param.id + "_options"]());
                options.enter().append("option")
                    .merge(options)
                    .attr("value", (d: any) => (d && d.value !== undefined) ? d.value : d)
                    .text((d: any) => (d && d.text !== undefined) ? d.text : d)
                    ;
                options.exit().remove();
                element.property("value", val);
                break;
            case "array":
            case "object":
                element.property("value", JSON.stringify(val, function replacer(_key, value) {
                    if (value instanceof Widget) {
                        return Persist.serialize(value);
                    }
                    return value;
                }));
                break;
            default:
                if (param.ext && param.ext.range) {
                    d3Select("#" + this.id() + "_" + param.id + "_currentVal").text("Current Value: " + val);
                }
                element.property("value", val && val.length && val.length > 100000 ? "...too big to display..." : val);
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

    widget: { (): PropertyExt; (_: PropertyExt): PropertyEditor };
}
PropertyEditor.prototype._class += " other_PropertyEditor";

PropertyEditor.prototype.publish("showFields", false, "boolean", "If true, widget.fields() will display as if it was a publish parameter.", null, { tags: ["Basic"] });
PropertyEditor.prototype.publish("showData", false, "boolean", "If true, widget.data() will display as if it was a publish parameter.", null, { tags: ["Basic"] });

PropertyEditor.prototype.publish("sorting", "none", "set", "Specify the sorting type", ["none", "A-Z", "Z-A", "type"], { tags: ["Basic"], icons: ["fa-sort", "fa-sort-alpha-asc", "fa-sort-alpha-desc", "fa-sort-amount-asc"] });

PropertyEditor.prototype.publish("hideNonWidgets", false, "boolean", "Hides non-widget params (at this tier only)", null, { tags: ["Basic"] });

PropertyEditor.prototype.publish("label", "", "string", "Label to display in header of property editor table", null, { tags: ["Basic"] });
PropertyEditor.prototype.publish("filterTags", "", "set", "Only show Publish Params of this type", ["Basic", "Intermediate", "Advance", ""], {});
PropertyEditor.prototype.publish("excludeTags", ["Private"], "array", "Exclude this array of tags", null, {});
PropertyEditor.prototype.publish("excludeParams", [], "array", "Exclude this array of params (widget.param)", null, {});

PropertyEditor.prototype.publish("widget", null, "widget", "Widget", null, { tags: ["Basic"], render: false });

const _widgetOrig = PropertyEditor.prototype.widget;
(PropertyEditor.prototype as any).widget = function (_?: Widget): Widget | PropertyEditor {
    if (arguments.length && _widgetOrig.call(this) === _) return this;
    const retVal = _widgetOrig.apply(this, arguments);
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
};
