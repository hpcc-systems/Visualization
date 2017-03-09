import { map as d3Map } from "d3-collection";
import { event as d3Event, select as d3Select, selectAll as d3SelectAll } from "d3-selection";
import "d3-transition";
import { Main } from "./dermatologyApp";

export class MDLApp extends Main {
    _openMode;

    constructor() {
        super();
        this.initWidgetMenu();
        this.initFileMenu();
        this.initPropertiesSwitch("#switch-design");
        this.doResize();
        this.init();
    }

    initWidgetMenu() {
        const context = this;
        const categories = d3Select("#widgetDropDownUL").selectAll("li").data(d3Map(this._categories).entries());
        const catLI = categories.enter().append("li")
            .attr("class", "pure-menu-item pure-menu-has-children pure-menu-allow-hover")
            ;
        catLI.append("a")
            .attr("href", "#")
            .attr("class", "pure-menu-link")
            .text(function (d) { return d.key; })
            ;
        const catUL = catLI.append("ul")
            .attr("class", "pure-menu-children")
            ;
        const widgets = catUL.selectAll("li").data(function (d) {
            const retVal = [];
            for (const key in d.value) {
                if (d.value.hasOwnProperty(key)) {
                    const value = [];
                    for (const key2 in d.value[key]) {
                        if (d.value[key].hasOwnProperty(key2)) {
                            value.push({
                                text: key2,
                                key: key2,
                                value: d.value[key][key2]
                            });
                        }
                    }
                    retVal.push({
                        text: key,
                        key: value.length === 1 ? value[0].key : key,
                        value: value.length === 1 ? value[0].value : value
                    });
                }
            }
            return retVal;
        });
        const widgetsLI = widgets.enter().append("li")
            .attr("class", "pure-menu-item")
            .classed("pure-menu-has-children pure-menu-allow-hover", function (d) { return !d.value.widgetPath; })
            .on("click", function (d) {
                if (d.value.widgetPath) {
                    context.loadWidget(d.value.widgetPath, d.key);
                }
            })
            ;
        widgetsLI
            .append("a")
            .attr("href", "#")
            .attr("class", "pure-menu-link")
            .text(function (d) { return d.text; })
            ;
        const tests = widgetsLI.filter(function (d) { return d.value.length; }).append("ul")
            .attr("class", "pure-menu-children")
            .selectAll("li").data(function (d) { return d.value; })
            ;
        tests.enter().append("li")
            .attr("class", "pure-menu-item")
            .append("a")
            .attr("href", "#")
            .attr("class", "pure-menu-link")
            .text(function (d: any) { return d.text; })
            .on("click", function (d: any) {
                context.loadWidget(d.value.widgetPath, d.key);
            })
            ;
    };

    initFileMenu() {
        const context = this;
        const fileOpenInput = d3Select("#fileOpenInput")
            .on("change", function () {
                context.showSpinner();
                for (let i = 0, f; f = (<any>this).files[i]; i++) {
                    const reader = new FileReader();
                    reader.onload = (function (_theFile) {
                        return function (e) {
                            console.log("e readAsText = ", e);
                            console.log("e readAsText target = ", e.target);
                            try {
                                const json = JSON.parse(e.target.result);
                                switch (context._openMode) {
                                    case "theme":
                                        context.openTheme(json);
                                        break;
                                    default:
                                        context.openWidget(json);
                                }
                            } catch (ex) {
                                alert("ex when trying to parse json = " + ex);
                            }
                        };
                    })(f);
                    reader.readAsText(f);
                }
            })
            ;
        d3Select("#fileOpen")
            .on("click", function () {
                d3Event.preventDefault();
                context.closeFileMenu();
                d3Select("#fileOpenInput").property("accept", ".persist,.json");
                context._openMode = "persist";
                (<any>fileOpenInput.node()).click();
            })
            ;
        d3Select("#fileSave")
            .on("click", function () {
                d3Event.preventDefault();
                context.saveWidget();
                context.closeFileMenu();
            })
            ;
        d3Select("#stateSave")
            .on("click", function () {
                d3Event.preventDefault();
                context.saveWidget(true);
                context.closeFileMenu();
            })
            ;
        d3Select("#themeOpen")
            .on("click", function () {
                d3Event.preventDefault();
                context.closeFileMenu();
                d3Select("#fileOpenInput").property("accept", ".theme,.json");
                context._openMode = "theme";
                (<any>fileOpenInput.node()).click();
            })
            ;
        d3Select("#themeSave")
            .on("click", function () {
                d3Event.preventDefault();
                context.saveTheme();
                context.closeFileMenu();
            })
            ;
        d3Select("#themeReset")
            .on("click", function () {
                d3Event.preventDefault();
                context.showSpinner();
                context.resetTheme();
                context.closeFileMenu();
            })
            ;
        d3Select("#switch-clone")
            .on("click", function () {
                context.showClone();
                context.closeFileMenu();
            })
            ;
        this.showClone();
    };

    closeFileMenu() {
        const layout: any = document.querySelector(".mdl-layout");
        layout.MaterialLayout.toggleDrawer();
    };

    propertiesVisible() {
        const retVal = d3Select("#switch-design").property("checked");
        if (retVal) {
            d3Select("#cellSurface")
                .classed("mdl-cell--12-col", false)
                .classed("mdl-cell--8-col", true)
                ;
            d3Select("#cellProperties")
                .style("display", null)
                ;
        } else {
            d3Select("#cellSurface")
                .classed("mdl-cell--8-col", false)
                .classed("mdl-cell--12-col", true)
                ;
            d3Select("#cellProperties")
                .style("display", "none")
                ;
        }
        return retVal;
    };

    cloneVisible() {
        const retVal = d3Select("#switch-clone").property("checked");
        d3Select("#cellClone")
            .style("display", retVal ? null : "none")
            ;
        return retVal;
    };

    showSpinner(show = false) {
        d3Select("#surface")
            .style("opacity", 0)
            ;
        if (!show) {
            d3Select("#surface").transition().duration(750)
                .style("opacity", 1)
                ;
        }
        d3Select("#spinner")
            .classed("is-active", show)
            ;
    };

    doResize() {
        const showClone = d3Select("#switch-clone").property("checked");
        const cloneHeight = showClone ? window.innerHeight / 3 : 0;
        const cloneMargin = showClone ? 16 : 0;
        d3SelectAll("#surface")
            .style("height", window.innerHeight - 48 - 64 - cloneHeight - cloneMargin + "px")
            ;
        d3Select("#properties")
            .style("height", window.innerHeight - 48 - 64 - cloneHeight + "px")
            ;
        d3Select("#clone")
            .style("height", cloneHeight + "px")
            ;
        super.doResize();
        return this;
    };

}

