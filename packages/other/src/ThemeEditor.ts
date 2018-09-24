import { HTMLWidget } from "@hpcc-js/common";
import * as Persist from "./Persist";

import "../src/ThemeEditor.css";

function hasLocalStorage(): boolean {
    const mod = "@hpcc-js/other";
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch (e) {
        return false;
    }
}

//  Polyfill for IE in file:// mode  ----
const _localStorage: { getItem: (id: string) => any; } = hasLocalStorage() ? localStorage : {
    getItem(id: string): any {
        return undefined;
    }
};

const getThemes = function (idx?) {
    if (typeof ((window as any).g_defaultThemes) === "function") {
        (window as any).g_defaultThemes(idx);
    }
    return JSON.parse(_localStorage.getItem("themeEditorThemes") || "{}");
};
const getSerials = function (idx?) {
    if (typeof ((window as any).g_defaultSerials) === "function") {
        (window as any).g_defaultSerials(idx);
    }
    return JSON.parse(_localStorage.getItem("themeEditorSerials") || "{}");
};
const getThemeNames = function (idx?) {
    const loadedThemes = getThemes();
    let themes = [];
    for (const themeName in loadedThemes) {
        themes.push(themeName);
    }
    if (typeof (idx) !== "undefined" && typeof (themes[idx]) !== "undefined") {
        themes = themes[idx];
    }
    return themes;
};
const getSerialNames = function (idx?) {
    const loadedSerials = getSerials();
    let serials = [];
    for (const serialName in loadedSerials) {
        serials.push(serialName);
    }
    if (typeof (idx) !== "undefined" && typeof (serials[idx]) !== "undefined") {
        serials = serials[idx];
    }
    return serials;
};
const tableNeedsRedraw = function (context) {
    let needsRedraw = false;
    if (typeof (context._current_grouping) === "undefined") {
        context._current_grouping = context._group_params_by;
    } else if (context._current_grouping !== context._group_params_by) {
        needsRedraw = true;
    }
    if (typeof (context._showing_columns) === "undefined") {
        context._showing_columns = context.showColumns();
    } else if (context._showing_columns !== context.showColumns()) {
        needsRedraw = true;
    }
    if (typeof (context._showing_data) === "undefined") {
        context._showing_data = context.showData();
    } else if (context._showing_data !== context.showData()) {
        needsRedraw = true;
    }
    return needsRedraw;
};
const camelizeString = function (str) {
    const spacedText = str.split(/(?=[0-9A-Z])/).map(function (n) { return n.length > 1 ? n + " " : n; }).join("");
    return spacedText.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

const tableInputHtml = function (rowObj, value, widgetArr, idSuffix) {
    let inputHtml = "";
    let id = "te-input-" + rowObj.id + "-" + idSuffix;

    let inputType;
    if (typeof (rowObj.ext) !== "undefined" && typeof (rowObj.ext.inputType) !== "undefined") {
        inputType = rowObj.ext.inputType;
    }

    if (typeof (rowObj.inputID) !== "undefined") {
        id = rowObj.inputID;
    }

    const dataWIDs = "data-paramid='" + rowObj.id + "' data-wids='" + widgetArr.map(function (w) {
        if (typeof (w.widget) === "object") {
            return w.widget._id;
        } else {
            return w;
        }
    }).join(",") + "'";
    switch (rowObj.type) {
        case "boolean":
            const checked = value ? " checked" : "";
            inputHtml = "<input id='" + id + "' " + dataWIDs + " type='checkbox' class='te-checkbox te-input'" + checked + ">"; break;
        case "number":
            if (typeof (inputType) !== "undefined") {
                if (inputType === "textarea") {
                    inputHtml = "<textarea id='" + id + "' class='te-textarea te-input' " + dataWIDs + ">" + value + "</textarea>";
                } else if (inputType === "range") {
                    inputHtml = "<input id='" + id + "' class='te-input' type='range' " + dataWIDs + " value='" + value + "'  min='" + rowObj.ext.min + "' max='" + rowObj.ext.max + "' step='" + rowObj.ext.step + "'>";
                }
            } else {
                inputHtml = "<input id='" + id + "' type='text' class='te-text te-input' " + dataWIDs + " value='" + value + "'>";
            }
            break;
        case "string":
            if (typeof (inputType) !== "undefined") {
                if (inputType === "textarea") {
                    inputHtml = "<textarea id='" + id + "' class='te-textarea te-input' " + dataWIDs + ">" + value + "</textarea>";
                }
            } else {
                inputHtml = "<input id='" + id + "' type='text' class='te-text te-input' value='" + value + "' " + dataWIDs + ">";
            }
            break;
        case "html-color":
            const valueAttr = value === "" ? "" : " value='" + value + "'";
            inputHtml = "<input id='" + id + "' type='text' class='te-html-color-input te-input' " + dataWIDs + " " + valueAttr + ">";
            inputHtml += "<input type='color' class='te-html-color-button te-input' " + dataWIDs + " " + valueAttr + ">";
            break;
        case "set":
            const options = _options(rowObj, value);
            inputHtml = "<select id='" + id + "' class='te-select te-input'" + dataWIDs + ">" + options + "</select>";
            break;
        case "array":
            inputHtml = "<textarea id='" + id + "' class='te-textarea te-input' data-type='array' " + dataWIDs + ">" + value + "</textarea>";
            break;
        default:
            break;
    }
    if (typeof (rowObj.ext.saveButton) !== "undefined") {
        inputHtml += "<button id='" + rowObj.ext.saveButtonID + "'>" + rowObj.ext.saveButton + "</button>";
    }
    return inputHtml;

    function _options(obj, val) {
        let options = "";
        obj.set.forEach(function (s) {
            const selected = s === val ? " selected" : "";
            options += "<option value='" + s + "'" + selected + ">" + s + "</option>";
        });
        return options;
    }
};

export class ThemeEditor extends HTMLWidget {
    _current_grouping;
    _showing_columns;
    _showing_data;
    _contentEditors;
    _showSettings;
    _defaultThemes;
    _widgetObjsById;
    _sharedProperties;
    getThemes;
    getSerials;
    getDefaultThemes;
    getDefaultSerials;

    constructor() {
        super();

        this._tag = "div";
        this._current_grouping = undefined;
        this._showing_columns = undefined;
        this._showing_data = undefined;
        this.columns(["Key", "Value"]);
        this._contentEditors = [];
        this._showSettings = true;

        this._defaultThemes = [];

        this._widgetObjsById = {};
    }

    showSettings(_?) {
        if (!arguments.length) {
            return this._showSettings;
        }
        this._showSettings = _;
        return this;
    }

    onChange(widget, propID) { }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._placeholderElement.style("overflow", "auto");
    }

    widgetProperty(widget, propID, _?) {
        if (_ === undefined) {
            return widget[propID]();
        }
        return widget[propID](_);
    }

    load(elmValue) { }

    save(themeName) { }

    needsPropTableRedraw() {
        const ret = document.getElementById("te-themeEditorOptions") === null;
        return ret;
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        if (tableNeedsRedraw(this)) {
            element.selectAll("#" + this._id + " > table").remove();
        }
        this._current_grouping = this.paramGrouping();
        this._widgetObjsById[this._id] = this;
        this._sharedProperties = this.findSharedProperties(this.data());

        const needsPropertiesTableRedraw = this.needsPropTableRedraw();
        if (needsPropertiesTableRedraw && this.showSettings()) {
            const teParams = Persist.discover(this);
            for (const i in teParams) {
                if (teParams[i].ext.tags.indexOf(this.editorComplexity()) !== -1) {
                    const teParamVal = this[teParams[i].id]();
                    if (teParams[i].id === "loadedTheme" || teParams[i].id === "loadedSerial") {
                        teParams[i].inputID = "te-load-theme";
                    }
                    teParams[i].input = tableInputHtml(teParams[i], teParamVal, [this._id], this._id);
                } else {
                    delete teParams[i];
                }
            }
            domNode.innerHTML = this.propertiesTableHtml(teParams);
            const evt = document.createEvent("Events");
            evt.initEvent("TE Properties Ready", true, true);
            document.dispatchEvent(evt);
        }

        this.buildTableObjects(domNode, this._sharedProperties);

        this.initFunctionality(domNode);
    }

    exit(domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    }

    click(d) {
    }

    propertiesTableHtml(editorParams) {
        const tableObj = {
            id: "te-themeEditorOptions",
            label: "Editor Options",
            rowArr: []
        };
        const modeTableObj = {
            id: "te-tableModeOptions",
            label: this.themeMode() ? "Save/Load Theme" : "Save/Load Serial",
            rowArr: []
        };
        for (const i in editorParams) {
            if (this.themeMode()) {
                if (editorParams[i].ext.tags.indexOf("Theme") === -1 && editorParams[i].ext.tags.indexOf("Serial") === -1) {
                    tableObj.rowArr.push({
                        th: camelizeString(editorParams[i].id),
                        td: editorParams[i].input,
                        trClass: "propertyRow"
                    });
                } else if (editorParams[i].ext.tags.indexOf("Theme") !== -1) {
                    modeTableObj.rowArr.push({
                        th: camelizeString(editorParams[i].id),
                        td: editorParams[i].input,
                        trClass: "propertyRow"
                    });
                }
            } else {
                if (editorParams[i].ext.tags.indexOf("Serial") === -1 && editorParams[i].ext.tags.indexOf("Theme") === -1) {
                    tableObj.rowArr.push({
                        th: camelizeString(editorParams[i].id),
                        td: editorParams[i].input,
                        trClass: "propertyRow"
                    });
                } else if (editorParams[i].ext.tags.indexOf("Serial") !== -1) {
                    modeTableObj.rowArr.push({
                        th: camelizeString(editorParams[i].id),
                        td: editorParams[i].input,
                        trClass: "propertyRow"
                    });
                }
            }

        }
        let html = "";
        if (tableObj.rowArr.length > 0) {
            html += this.tableObjHtml(tableObj);
        }
        if (modeTableObj.rowArr.length > 0) {
            html += this.tableObjHtml(modeTableObj);
        }
        return html;
    }
    buildTableObjects(targetElement, propObjs) {
        let sectionObjs = {};
        if (this.themeMode()) {
            sectionObjs = {
                chartColorSection: {
                    id: "te-colorOptions",
                    label: "Chart Colors",
                    rowObjArr: []
                },
                surfaceSection: {
                    id: "te-containerOptions",
                    label: "Container Styles/Colors",
                    rowObjArr: []
                },
                fontSection: {
                    id: "te-fontOptions",
                    label: "Font Styles/Colors",
                    rowObjArr: []
                }
            };
        } else {
            sectionObjs = {
                nonSurfaceSection: {
                    id: "te-chartOptions",
                    label: "Chart Properties",
                    rowObjArr: []
                }
            };
        }
        for (const p in propObjs) {
            if (this.themeMode()) {
                if (p.toUpperCase().indexOf("FONT") !== -1 && !(propObjs[p].arr[0].widget._class.indexOf("layout_Surface") !== -1 && p.toUpperCase().indexOf("COLOR") !== -1)) {
                    sectionObjs["fontSection"].rowObjArr.push(propObjs[p]);
                } else if (p === "paletteID") {
                    sectionObjs["chartColorSection"].rowObjArr.push(propObjs[p]);
                } else if (propObjs[p].arr[0].widget._class.indexOf("layout_Surface") !== -1) {
                    sectionObjs["surfaceSection"].rowObjArr.push(propObjs[p]);
                }
            } else {
                if (propObjs[p].arr[0].widget._class.indexOf("layout_Surface") === -1) {
                    sectionObjs["nonSurfaceSection"].rowObjArr.push(propObjs[p]);
                }
            }
        }
        let html = "";
        for (const i in sectionObjs) {
            html += this.sharedPropertyTableHtml(sectionObjs[i]);
        }
        targetElement.innerHTML += html;
    }

    initFunctionality(elm) {
        const context = this;
        _expandCollapse(elm);
        _inputOnChange(elm);
        _inputOnClick(elm);
        function _inputOnClick(elm2) {
            if (context.showSettings()) {
                const saveBtn = document.getElementById("te-save-button");
                saveBtn.onclick = function (e) {
                    const clickedElm: any = e.srcElement;
                    const themeName = clickedElm.previousSibling.value;
                    if (themeName.length > 1) {
                        const loadSelect = document.getElementById("te-load-theme");
                        const loadOptions = loadSelect.getElementsByTagName("option");
                        let saveExists = false;
                        for (const i in loadOptions) {
                            const val = loadOptions[i].value;
                            if (val === themeName) {
                                saveExists = true;
                            }
                        }
                        if (!saveExists) {
                            loadSelect.innerHTML += "<option value='" + themeName + "'>" + themeName + "</option>";
                        }
                        clickedElm.previousSibling.value = "";
                        (loadSelect as any).value = themeName;
                    } else {
                        alert("Save Name cannot be empty.");
                    }
                };
            }
        }
        function _inputOnChange(elm2) {
            const teInputs = elm2.getElementsByClassName("te-input");
            for (const i in teInputs) {
                if (isNaN(parseInt(i))) break;
                const inputElm = teInputs[i];
                const inputID = inputElm.getAttribute("id");
                if (inputID === "te-load-theme") {
                    inputElm.onchange = function (e) {
                        const elm3 = e.srcElement;
                        context.load(elm3.value);
                    };
                } else if (inputID !== null && inputID.indexOf("te-input-themeMode") !== -1) {
                    inputElm.onchange = function (e) {
                        const elm3 = e.srcElement;
                        context.themeMode(elm3.checked);

                        const name = document.getElementById("te-load-theme");
                        const nameToLoad = name !== null ? (name as any).value : "Default";
                        context.load(nameToLoad);
                    };
                } else if (inputElm.tagName === "INPUT" || inputElm.tagName === "SELECT" || inputElm.tagName === "TEXTAREA") {
                    inputElm.onchange = function (e) {
                        const elm3 = e.srcElement;

                        let id = elm3.getAttribute("id");

                        if (elm3.className.split(" ").indexOf("te-html-color-button") !== -1) {
                            id = elm3.previousSibling.getAttribute("id");
                            elm3.previousSibling.value = elm3.value;
                        }
                        const elmType = elm3.getAttribute("type");
                        const splitId = id.split("-");
                        const genericId = splitId.slice(0, splitId.length - 1).join("-") + "-";

                        const widsStr = elm3.getAttribute("data-wids");
                        const paramId = elm3.getAttribute("data-paramid");
                        const widArr = widsStr.split(",");
                        widArr.forEach(function (wid) {
                            const individualId = genericId + wid;
                            const indElm = document.getElementById(individualId);
                            if (elmType === "checkbox") {
                                (indElm as any).checked = elm3.checked;
                                context._widgetObjsById[wid][paramId](elm3.checked);
                            } else if (elm3.getAttribute("data-type") === "array") {
                                (indElm as any).value = elm3.value;
                                try {
                                    context._widgetObjsById[wid][paramId](JSON.parse(elm3.value));
                                } catch (e) { }
                            } else {
                                (indElm as any).value = elm3.value;
                                context._widgetObjsById[wid][paramId](elm3.value);

                                if (indElm.className.split(" ").indexOf("te-html-color-input") !== -1) {
                                    (indElm.nextSibling as any).value = elm3.value;
                                } else if (indElm.className.split(" ").indexOf("te-html-color-button") !== -1) {
                                    (indElm.previousSibling as any).value = elm3.value;
                                }
                            }
                        });
                        context.data().forEach(function (d) {
                            d.render();
                        });
                    };
                }
            }
        }
        function _expandCollapse(elm2) {
            const tableArr = elm2.getElementsByClassName("te-section-table");
            for (const i in tableArr) {
                if (typeof (tableArr[i].getElementsByTagName) === "function") {
                    const thead = tableArr[i].getElementsByTagName("thead");
                    thead[0].onclick = function (e) {
                        let elm3 = e.toElement;
                        if (elm3.tagName === "TH") {
                            elm3 = elm3.parentElement.parentElement;
                        }
                        const parent = elm3.parentElement;
                        let tbodyClass = "";
                        if (parent.className.split(" ").indexOf("expanded") === -1) {
                            parent.className = "te-section-table expanded";
                            tbodyClass = "shown";
                        } else {
                            parent.className = "te-section-table collapsed";
                            tbodyClass = "hidden";
                        }
                        const tbody = parent.getElementsByTagName("tbody");
                        tbody[0].className = tbodyClass;
                    };
                }
            }
            const sharedRowArr = elm2.getElementsByClassName("sharedPropertyRow");
            for (const n in sharedRowArr) {
                if (typeof (sharedRowArr[n].getElementsByClassName) === "function") {
                    const label = sharedRowArr[n].getElementsByClassName("te-label");
                    label[0].onclick = function (e) {
                        const elm3 = e.toElement;
                        const parent = elm3.parentElement;
                        let subRowClass = "";
                        if (parent.className.split(" ").indexOf("expanded") === -1) {
                            parent.className = "sharedPropertyRow expanded";
                            subRowClass = "shown";
                        } else {
                            parent.className = "sharedPropertyRow collapsed";
                            subRowClass = "hidden";
                        }
                        let nextSib = parent.nextSibling;
                        while (nextSib !== null) {
                            if (nextSib.className.split(" ").indexOf("sharedPropertyRow") === -1) {
                                nextSib.className = "propertyRow " + subRowClass;
                                nextSib = nextSib.nextSibling;
                            } else {
                                nextSib = null;
                            }
                        }
                    };
                }
            }
        }
    }
    sharedPropertyTableHtml(sectionObj) {
        const tableObj = {
            id: sectionObj.id,
            label: sectionObj.label,
            rowArr: []
        };
        sectionObj.rowObjArr.forEach(function (rowObj) {
            rowObj.arr.forEach(function (widgetObj, widgetIdx) {
                if (widgetIdx === 0) {
                    tableObj.rowArr.push({
                        th: _sharedPropertyLabel(rowObj),
                        td: _sharedPropertyInput(rowObj),
                        trClass: "sharedPropertyRow collapsed"
                    });
                }
                tableObj.rowArr.push({
                    th: _propertyLabel(widgetObj),
                    td: _propertyInput(rowObj, widgetIdx),
                    trClass: "propertyRow hidden"
                });
            });
        });

        return this.tableObjHtml(tableObj);

        function _propertyLabel(widgetObj) {
            const splitClass = widgetObj.widget.classID().split("_");
            const displayClass = splitClass.join("/");
            return displayClass + " <i>[" + widgetObj.widget._id + "]</i>";
        }
        function _sharedPropertyLabel(rowObj) {
            return camelizeString(rowObj.id);
        }

        function _propertyInput(rowObj, idx) {
            const value = _value(rowObj, idx);
            const html = tableInputHtml(rowObj, value, [rowObj.arr[idx]], rowObj.arr[idx].widget._id);
            return html;

            function _value(rowObj2, idx2) {
                const value2 = rowObj2.arr[idx2].widget[rowObj2.id]();
                return value2 !== null ? value2 : "";
            }
        }
        function _sharedPropertyInput(rowObj) {
            const value = _sharedValue(rowObj);
            const html = tableInputHtml(rowObj, value, rowObj.arr, "shared");
            return html;

            function _sharedValue(rowObj2) {
                const value2 = rowObj2.arr[0].widget[rowObj2.id]();
                rowObj2.arr.forEach(function (w, i) {
                    if (value2 !== w.widget[w.id]()) {
                        return "";
                    }
                });
                if (value2 !== null) {
                    if (rowObj2.type === "array") {
                        return JSON.stringify(value2);
                    }
                    return value2;
                }
                return "";
            }
        }
    }

    tableObjHtml(tableObj) {
        let html = "<table id='" + tableObj.id + "' class='te-section-table expanded'>";
        html += "<thead><tr><th colspan='2'>" + tableObj.label + "</th></tr></thead>";
        html += "<tbody>";
        tableObj.rowArr.forEach(function (rowObj) {
            html += this.tableRowObjHtml(rowObj);
        }, this);
        html += "</tbody>";
        return html + "</table>";
    }
    tableRowObjHtml(rowObj) {
        let html = typeof (rowObj.trClass) !== "undefined" ? "<tr class='" + rowObj.trClass + "'>" : "<tr>";
        html += "<th class='te-label'>" + rowObj.th + "</th>";
        html += "<td>" + rowObj.td + "</td>";
        return html + "</tr>";
    }

    setWidgetObjsById(widgetProp) {
        const context = this;
        const val = widgetProp.widget[widgetProp.id]();
        if (widgetProp.type === "widgetArray") {
            val.forEach(function (widget) {
                context._widgetObjsById[widget._id] = widget;
            });
        } else if (widgetProp.type === "widget" && val !== null) {
            this._widgetObjsById[val._id] = val;
        }
    }
    checkTagFilter(tagArr) {
        const allowTags = ["Basic"];
        let ret = false;
        tagArr.forEach(function (tag) {
            if (allowTags.indexOf(tag) !== -1) {
                ret = true;
            }
        });
        return ret;
    }
    findSharedProperties(data) {
        const context = this;
        let propsByID;
        if (typeof (data) !== "undefined" && data.length > 0) {
            let allProps = [];
            propsByID = {};
            const surfacePropsByID = {};
            const nonSurfacePropsByID = {};
            data.forEach(function (widget) {
                const gpResponse = _getParams(widget, 0);
                allProps = allProps.concat(gpResponse);
            });
            allProps.forEach(function (prop) {
                if (["widget", "widgetArray"].indexOf(prop.type) !== -1) {
                    context.setWidgetObjsById(prop);
                } else if (context.checkTagFilter(prop.ext.tags)) {
                    const tempIdx = prop.id;
                    if (prop.widget._class.indexOf("Surface") !== -1) {
                        if (typeof (surfacePropsByID[tempIdx]) === "undefined") {
                            surfacePropsByID[tempIdx] = { arr: [] };
                        }
                        surfacePropsByID[tempIdx].id = prop.id;
                        surfacePropsByID[tempIdx].description = prop.description;
                        surfacePropsByID[tempIdx].type = prop.type;
                        surfacePropsByID[tempIdx].set = prop.set;
                        surfacePropsByID[tempIdx].ext = prop.ext;
                        surfacePropsByID[tempIdx].arr.push(prop);
                    } else {
                        if (typeof (nonSurfacePropsByID[tempIdx]) === "undefined") {
                            nonSurfacePropsByID[tempIdx] = { arr: [] };
                        }
                        nonSurfacePropsByID[tempIdx].id = prop.id;
                        nonSurfacePropsByID[tempIdx].description = prop.description;
                        nonSurfacePropsByID[tempIdx].type = prop.type;
                        nonSurfacePropsByID[tempIdx].set = prop.set;
                        nonSurfacePropsByID[tempIdx].ext = prop.ext;
                        nonSurfacePropsByID[tempIdx].arr.push(prop);
                    }
                    if (typeof (propsByID[tempIdx]) === "undefined") {
                        propsByID[tempIdx] = { arr: [] };
                    }
                    propsByID[tempIdx].id = prop.id;
                    propsByID[tempIdx].description = prop.description;
                    propsByID[tempIdx].type = prop.type;
                    propsByID[tempIdx].set = prop.set;
                    propsByID[tempIdx].ext = prop.ext;
                    propsByID[tempIdx].arr.push(prop);
                }
            });
        }
        return propsByID;

        function _getParams(widgetObj, depth) {
            let retArr = [];
            if (widgetObj !== null) {
                const paramArr = Persist.discover(widgetObj);
                paramArr.forEach(function (param, i1) {
                    if (typeof (param.ext.tags) !== "undefined") {
                        retArr.push({
                            id: param.id,
                            type: param.type,
                            description: param.description,
                            set: param.set,
                            ext: param.ext,
                            widget: widgetObj
                        });
                    }
                    if (param.type === "widgetArray") {
                        const childWidgetArray = context.widgetProperty(widgetObj, param.id);
                        childWidgetArray.forEach(function (childWidget) {
                            const cwArr = _getParams(childWidget, depth + 1);
                            retArr = retArr.concat(cwArr);
                        });
                    } else if (param.type === "widget") {
                        const childWidget = context.widgetProperty(widgetObj, param.id);
                        const temp = _getParams(childWidget, depth + 1);
                        retArr = retArr.concat(temp);
                    }
                });
            }
            return retArr;
        }
    }

    themeMode: { (): boolean; (_: boolean): ThemeEditor };
    themeMode_exists: () => boolean;
    saveTheme: { (): string; (_: string): ThemeEditor };
    saveTheme_exists: () => boolean;
    loadedTheme: { (): string; (_: string): ThemeEditor };
    loadedTheme_exists: () => boolean;
    saveSerial: { (): string; (_: string): ThemeEditor };
    saveSerial_exists: () => boolean;
    loadedSerial: { (): string; (_: string): ThemeEditor };
    loadedSerial_exists: () => boolean;
    showColumns: { (): boolean; (_: boolean): ThemeEditor };
    showColumns_exists: () => boolean;
    showData: { (): boolean; (_: boolean): ThemeEditor };
    showData_exists: () => boolean;
    shareCountMin: { (): number; (_: number): ThemeEditor };
    shareCountMin_exists: () => boolean;
    paramGrouping: { (): string; (_: string): ThemeEditor };
    paramGrouping_exists: () => boolean;
    editorComplexity: { (): string; (_: string): ThemeEditor };
    editorComplexity_exists: () => boolean;
    sectionTitle: { (): string; (_: string): ThemeEditor };
    sectionTitle_exists: () => boolean;
    collapsibleSections: { (): boolean; (_: boolean): ThemeEditor };
    collapsibleSections_exists: () => boolean;
}
ThemeEditor.prototype._class += " other_ThemeEditor";

ThemeEditor.prototype.publish("themeMode", true, "boolean", "Edit default values", null, { tags: ["Basic"] });
ThemeEditor.prototype.publish("saveTheme", "", "string", "Save Theme", null, { tags: ["Basic", "Theme"], saveButton: "Save", saveButtonID: "te-save-button" });
ThemeEditor.prototype.publish("loadedTheme", getThemeNames(1), "set", "Loaded Theme", getThemeNames(), { tags: ["Basic", "Theme"] });
ThemeEditor.prototype.publish("saveSerial", "", "string", "Save Serial", null, { tags: ["Basic", "Serial"], saveButton: "Save", saveButtonID: "te-save-button" });
ThemeEditor.prototype.publish("loadedSerial", getSerialNames(0), "set", "Loaded Serial", getSerialNames(), { tags: ["Basic", "Serial"] });
ThemeEditor.prototype.publish("showColumns", true, "boolean", "Show Columns", null, { tags: ["Intermediate"] });
ThemeEditor.prototype.publish("showData", true, "boolean", "Show Data", null, { tags: ["Intermediate"] });
ThemeEditor.prototype.publish("shareCountMin", 1, "number", "Share Count Min", null, { tags: ["Private"] });
ThemeEditor.prototype.publish("paramGrouping", "By Param", "set", "Param Grouping", ["By Param", "By Widget"], { tags: ["Private"] });
ThemeEditor.prototype.publish("editorComplexity", "Basic", "set", "Choose what publish properties to display within the editor.", ["Basic", "Intermediate", "Advanced", "Private"], { tags: ["Private"] });
ThemeEditor.prototype.publish("sectionTitle", "", "string", "Section Title", null, { tags: ["Private"] });
ThemeEditor.prototype.publish("collapsibleSections", true, "boolean", "Collapsible Sections", null, { tags: ["Intermediate"] });

ThemeEditor.prototype.getThemes = getThemes;
ThemeEditor.prototype.getSerials = getSerials;
ThemeEditor.prototype.getDefaultThemes = getThemeNames;
ThemeEditor.prototype.getDefaultSerials = getSerialNames;
