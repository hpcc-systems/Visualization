import { JSONEditor } from "@hpcc-js/codemirror";
import { HTMLWidget, Utility } from "@hpcc-js/common";
// import { Slider } from "@hpcc-js/form";
import { select as d3Select } from "d3-selection";
// import * as Persist from "./Persist";

import "../src/ParamEditor.css";

export class ParamEditor extends HTMLWidget {
    pane;
    tabs;
    child_widget_inc = 0;
    constructor() {
        super();
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this.tabs = element.append("div")
            .classed("param-type-tabs", true)
            ;
        this.pane = element.append("div")
            .classed("input-pane", true)
            ;

    }

    update(domNode, element) {
        super.update(domNode, element);
        const tabs = this.getAllRequiredTabs();
        if (!tabs.length) return;
        const context = this;
        this.tabs
            .selectAll(`#${context.id()} > .param-type-tabs > .param-type-tab`).data(tabs)
            .enter()
            .append("div")
            .classed("param-type-tab", true)
            .attr("data-category", n => n)
            .text(n => n)
            .on("click", function () {
                element.selectAll(`#${context.id()} > .param-type-tabs > .param-type-tab`).classed("selected", false);
                const tab = d3Select(this);
                tab.classed("selected", true);
                const category = tab.attr("data-category");
                context.pane.node().innerHTML = "";
                context.insertVisibleInputs(context.widget(), context.pane, function (param) {
                    const matches = context.getParamCategories(context.widget(), param);
                    return matches.indexOf(category) !== -1;
                });
            })
            ;
        const selectedTab = element.select(`#${context.id()} > .param-type-tabs > .param-type-tab.selected,#${context.id()} > .param-type-tabs > .param-type-tab`);
        selectedTab.classed("selected", true);
        const category = selectedTab.attr("data-category");
        this.insertVisibleInputs(this.widget(), this.pane, function (param) {
            const matches = context.getParamCategories(context.widget(), param);
            return matches.indexOf(category) !== -1;
        });
    }

    exit(domNode, element) {
        // super.exit(domNode, element);

    }

    insertVisibleInputs(widget, container, filter?, paramId?, proxyMethod?) {
        const context = this;
        const data = widget.publishedProperties()
            .filter(p => proxyMethod ? p.id === proxyMethod : true)
            .filter(filter ? filter : n => n)
            ;
        const paramEnter = container
            .selectAll(`.input-wrapper`)
            .data(data)
            .enter()
            .append("div")
            .classed("input-wrapper", true);
        paramEnter
            .each(function (param) {
                const wrapper = d3Select(this);
                const _val = _getParamValue(param);
                let inp;
                const label = wrapper.append("label").text(proxyMethod ? `${paramId} (proxy: ${proxyMethod})` : param.id);
                switch (param.type) {
                    case "widget":
                        new ParamEditor()
                            .target(wrapper.node())
                            .widget(widget[param.id]())
                            .render()
                            ;
                        break;
                    case "widgetArray":
                        widget[param.id]().forEach(function (_widget) {
                            new ParamEditor()
                                .target(wrapper.node())
                                .widget(_widget)
                                .render()
                                ;
                        });
                        break;
                    case "proxy":
                        label.style("display", "none");
                        context.insertVisibleInputs(widget[param.proxy], wrapper, null, param.id, param.method);
                        break;
                    case "set":
                        inp = wrapper.append("select");
                        inp.selectAll("option").data(param.set)
                            .enter()
                            .append("option")
                            .text(n => n);
                        inp.node().value = _val;
                        inp.on("change", function () {
                            widget[param.id](this.value).render();
                        });
                        break;
                    case "boolean":
                        inp = wrapper.append("input").attr("type", "checkbox");
                        inp.node().checked = _val;
                        inp.on("click", function () {
                            widget[param.id](!!this.checked).render();
                        });
                        break;
                    case "array":
                    case "object":
                    case "propertyArray":
                        const str_val = Utility.logStringify(_val);
                        label.classed("top-left", _val || _val === 0);
                        new JSONEditor()
                            .target(wrapper.node())
                            .text(str_val)
                            .render()
                            ;
                        break;
                    case "html-color":
                        inp = wrapper.append("input").classed("half-width", true);
                        const inp2 = wrapper.append("input").classed("half-width", true);
                        inp2.attr("type", "color");
                        label.classed("top-left", _val || _val === 0);
                        inp.attr("value", param => _val);
                        const onchange = function () {
                            widget[param.id](this.value).render();
                            inp.node().value = this.value;
                            (inp2.node() as HTMLInputElement).value = this.value;
                        };
                        inp.on("change", onchange);
                        inp2.on("change", onchange);
                        break;
                    default:
                        inp = wrapper.append("input");
                        label.classed("top-left", _val || _val === 0);
                        inp.attr("value", param => _val);
                        inp.on("change", function () {
                            if (this.value === "") {
                                label.classed("top-left", false);
                            }
                            widget[param.id](this.value).render();
                        });
                        break;
                }
                wrapper.node().appendChild(label.node());
                wrapper.classed(`param-type-${param.type}`, true);
                const categories = context.getParamCategories(widget, param);
                categories.forEach(function (category) {
                    const tab_class = category.split(" ").join("_");
                    wrapper.classed(`tab-${tab_class}`, true);
                });
            });

        function _getParamValue(param) {
            const _val = widget[param.id]();
            switch (param.type) {
                case "array":
                case "object":
                    return JSON.stringify(_val, null, "    ");
                case "widget":
                case "widgetArray":
                    return `TODO(${param.type})`;
                default:
                    return _val;
            }
        }
    }

    getAllRequiredTabs(): string[] {
        const tabs = [];
        const categories = this.paramCategories();
        const _widget = this.widget();
        if (_widget) {
            _widget.publishedProperties().forEach(p => {
                const match_count = 0;
                Object.keys(categories).forEach(key => {
                    if (tabs.indexOf(key) === -1 && this.paramMatchesCategory(_widget, p, categories[key])) {
                        console.log("key", key);
                        console.log("p", p);
                        tabs.push(key);
                    }
                });
                if (match_count === 0 && tabs.indexOf("Misc") === -1) {
                    tabs.push("Misc");
                }
            });
        }
        return tabs;
    }
    getParamCategories(widget, p) {
        const ret = [];
        const categories = this.paramCategories();
        const categories_arr = Object.keys(categories);
        for (let i = 0; i < categories_arr.length; i++) {
            const key = categories_arr[i];
            if (ret.indexOf(key) === -1 && this.paramMatchesCategory(widget, p, categories[key])) {
                if (!categories[key].priority) {
                    ret.push(key);
                } else {
                    return [key];
                }
            }
        }
        return ret.length === 0 ? ["Misc"] : ret;
    }
    paramMatchesCategory(widget, param, category) {
        if (!category) {
            return true;
        } else if (category.matches) {
            for (let i = 0; i < category.matches.length; i++) {
                if (this.paramMatchesString(param, category.matches[i])) {
                    return true;
                }
            }
        } else if (category.types) {
            if (param.type === "proxy") {
                let _widget = widget[param.proxy];
                let _params = _widget.publishedProperties().filter(n => n.id === param.method);
                while (_params[0] && _params[0].type === "proxy") {
                    _widget = _widget[_params[0].proxy];
                    _params = _widget.publishedProperties().filter(n => n.id === _params[0].method);
                }
                return category.types.indexOf(_params[0].type) !== -1;
            } else {
                return category.types.indexOf(param.type) !== -1;
            }
        } else if (category.tags) {
            if (param.ext && param.ext.tags) {
                for (let i = 0; i < category.tags.length; i++) {
                    const tag = category.tags[i];
                    if (param.ext.tags.indexOf(tag) !== -1) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    paramMatchesString(p, str) {
        return p.id.toLowerCase().indexOf(str) !== -1;
    }
}
ParamEditor.prototype._class += " other_ParamEditor";

export interface ParamEditor {
    widget(): any;
    widget(_: any): this;
    paramCategories(): any;
    paramCategories(_: any): this;
}

ParamEditor.prototype.publish("showFields", false, "boolean", "If true, widget.fields() will display as if it was a publish parameter.", null, { tags: ["Basic"] });
ParamEditor.prototype.publish("showData", false, "boolean", "If true, widget.data() will display as if it was a publish parameter.", null, { tags: ["Basic"] });
ParamEditor.prototype.publish("show_settings", false, "boolean", "show_settings", null, { tags: ["Basic"] });
ParamEditor.prototype.publish("widget", null, "widget", "Widget", null, { tags: ["Basic"], render: false });
ParamEditor.prototype.publish("paramCategories", {
    Widgets: { types: ["widgetArray", "widget"] },
    JSON: { types: ["array", "object"] },
    Color: { matches: ["color", "paletteid"] },
    Font: { matches: ["font"] },
    yAxis: { matches: ["yaxis"] },
    xAxis: { matches: ["xaxis"] },
    Tooltip: { matches: ["tooltip"] },
    Private: { tags: ["Private"], priority: true },
}, "object", "Used in categorizing published properties", null, { tags: ["Basic"], render: false });
