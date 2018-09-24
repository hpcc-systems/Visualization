import { isArray } from "@hpcc-js/util";
import { ascending as d3Ascending, descending as d3Descending } from "d3-array";
import { select as d3Select } from "d3-selection";
import { timeFormat as d3TimeFormat } from "d3-time-format";

function _naturalSort(a, b, order, idx, sortCaseSensitive) {
    const re = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi;
    const sre = /(^[ ]*|[ ]*$)/g;
    const dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
    const ore = /^0/;
    const i = function (s) { return !sortCaseSensitive && ("" + s).toLowerCase() || "" + s; };
    // convert all to strings strip whitespace
    const x = i(idx ? a[idx] : a).replace(sre, "") || "";
    const y = i(idx ? b[idx] : b).replace(sre, "") || "";
    // chunk/tokenize
    const xN = x.replace(re, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0");
    const yN = y.replace(re, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0");
    // numeric or date detection
    const xD = (xN.length !== 1 && x.match(dre) && Date.parse(x));
    const yD = xD && y.match(dre) && Date.parse(y) || null;
    let oFxNcL;
    let oFyNcL;
    // first try and sort Hex codes or Dates
    if (yD) {
        if (xD < yD) {
            return order === "ascending" ? -1 : 1;
        } else if (xD > yD) {
            return order === "ascending" ? 1 : -1;
        }
    }
    // natural sorting through split numeric strings and default strings
    for (let cLoc = 0, numS = Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
        // find floats not starting with "0", string or 0 if not defined (Clint Priest)
        oFxNcL = !(xN[cLoc] || "").match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
        oFyNcL = !(yN[cLoc] || "").match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
        // handle numeric vs string comparison - number < string - (Kyle Adams)
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
            return (isNaN(oFxNcL)) ? 1 : -1;
        } else if (typeof oFxNcL !== typeof oFyNcL) {
            // rely on string comparison if different types - i.e. "02" < 2 != "02" < "2"
            oFxNcL += "";
            oFyNcL += "";
        }
        if (oFxNcL < oFyNcL) { return order === "ascending" ? -1 : 1; }
        if (oFxNcL > oFyNcL) { return order === "ascending" ? 1 : -1; }
    }
    return 0;
}

//  Selection Bag(s)  ---
export class SelectionBase {
    protected __widget;
    private __svgGlowID: string;

    constructor(widget) {
        //  Can't import Widget or SVGWidget as it breaks AMD loading...
        this.__widget = widget;
    }

    svgGlowID(): string {
        if (this.__svgGlowID === undefined) {
            this.__svgGlowID = this.__widget.svgGlowID && this.__widget.svgGlowID() || "";
        }
        return this.__svgGlowID;
    }
}

export class SelectionBag extends SelectionBase {
    items;
    constructor(widget) {
        super(widget);
        this.items = {};
    }

    clear() {
        for (const key in this.items) {
            this.items[key].element()
                .classed("selected", false)
                .attr("filter", null)
                ;
        }
        this.items = {};
    }

    isEmpty() {
        for (const _key in this.items) { // jshint ignore:line
            return false;
        }
        return true;
    }

    append(item) {
        this.items[item._id] = item;
        item.element()
            .classed("selected", true)
            .attr("filter", this.svgGlowID() ? `url(#${this.svgGlowID()})` : null)
            ;
    }

    remove(item) {
        this.items[item._id].element()
            .classed("selected", false)
            .attr("filter", null)
            ;
        delete this.items[item._id];
    }

    isSelected(item) {
        return this.items[item._id] !== undefined;
    }

    get() {
        const retVal = [];
        for (const key in this.items) {
            retVal.push(this.items[key]);
        }
        return retVal;
    }

    set(itemArray) {
        this.clear();
        itemArray.forEach(function (item) {
            this.append(item);
        }, this);
    }

    click = function (item, d3Event) {
        if (d3Event.ctrlKey) {
            if (this.items[item._id]) {
                this.remove(item);
            } else {
                this.append(item);
            }
        } else {
            this.clear();
            this.append(item);
        }
    };
}

export class SimpleSelection extends SelectionBase {
    constructor(widget, widgetElement, skipBringToTop?) {
        super(widget);
        this.widgetElement(widgetElement);
        this.skipBringToTop(skipBringToTop);
    }

    _widgetElement;
    widgetElement(_) {
        if (!arguments.length) return this._widgetElement;
        this._widgetElement = _;
        return this;
    }

    _skipBringToTop;
    skipBringToTop(_) {
        if (!arguments.length) return this._skipBringToTop;
        this._skipBringToTop = _;
        return this;
    }

    _initialSelection;
    enter(elements) {
        const context = this;
        elements
            .each(function (d) {
                const selected = context._initialSelection ? context._initialSelection.indexOf(JSON.stringify(d)) >= 0 : false;
                d3Select(this)
                    .classed("selected", selected)
                    .classed("deselected", !selected)
                    .attr("filter", context.svgGlowID() && selected ? `url(#${context.svgGlowID()})` : null)
                    ;
            })
            .on("click.SimpleSelection", function () {
                context.click(this);
            })
            .on("mouseover.SimpleSelection", function () {
                context.mouseOver(this);
            })
            .on("mouseout.SimpleSelection", function () {
                context.mouseOut(this);
            })
            ;
    }
    click(domNode) {
        if (!this._skipBringToTop) {
            domNode.parentNode.appendChild(domNode);
        }
        const element = d3Select(domNode);
        const wasSelected = element.classed("selected");
        this._widgetElement.selectAll(".selected")
            .classed("selected", false)
            .classed("deselected", true)
            .attr("filter", null)
            ;
        if (!wasSelected) {
            element
                .classed("selected", true)
                .classed("deselected", false)
                .attr("filter", this.svgGlowID() ? `url(#${this.svgGlowID()})` : null)
                ;
        }
    }
    mouseOver(domNode) {
        d3Select(domNode)
            .classed("over", true)
            ;
    }
    mouseOut(domNode) {
        d3Select(domNode)
            .classed("over", null)
            ;
    }
    selected(domNode) {
        return d3Select(domNode).classed("selected");
    }
    selection(_) {
        if (!arguments.length) {
            const retVal = [];
            if (this._widgetElement) {
                this._widgetElement.selectAll(".selected")
                    .each(function (d) { retVal.push(JSON.stringify(d)); })
                    ;
            }
            return retVal;
        }
        if (this._widgetElement) {
            const context = this;
            this._widgetElement.selectAll(".selected,.deselected")
                .each(function (d) {
                    const selected = _.indexOf(JSON.stringify(d)) >= 0;
                    d3Select(this)
                        .classed("selected", selected)
                        .classed("deselected", !selected)
                        .attr("filter", context.svgGlowID() ? `url(#${context.svgGlowID()})` : null)
                        ;
                })
                ;
        } else {
            this._initialSelection = _;
        }
        return this;
    }
}

export function SimpleSelectionMixin(skipBringToTop) {
    this._selection = new SimpleSelection(this, null, skipBringToTop);
}

SimpleSelectionMixin.prototype.serializeState = function () {
    return {
        selection: this._selection.selection(),
        data: this.data()
    };
};

SimpleSelectionMixin.prototype.deserializeState = function (state) {
    if (state) {
        this._selection.selection(state.selection);
        if (state.data) {
            this.data(state.data);
        }
    }
    return this;
};

const perf: any = window.performance;
const now = perf && (perf.now || perf.mozNow || perf.msNow || perf.oNow || perf.webkitNow);

//  Template   ---
//  https://github.com/Matt-Esch/string-template (MIT)
const nargs = /\{([0-9a-zA-Z_\[\]]+)\}/g;
export function template(tpl: string, _args) {
    if (!tpl) return "";
    let args;

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1];
    } else {
        args = new Array(arguments.length - 1);
        for (let i = 1; i < arguments.length; ++i) {
            args[i - 1] = arguments[i];
        }
    }

    if (!args || !args.hasOwnProperty) {
        args = {};
    }

    //  Array handling
    for (const key in args) {
        if (isArray(args[key])) {
            args[key].forEach(function (row, idx) {
                args[key + "[" + idx + "]"] = row;
            });
        }
    }

    return tpl.replace(nargs, function replaceArg(match, i, index) {
        let result;

        if (tpl[index - 1] === "{" &&
            tpl[index + match.length] === "}") {
            return i;
        } else {
            result = args.hasOwnProperty(i) ? args[i] : null;
            if (result === null || result === undefined) {
                return "";
            }

            return result;
        }
    });
}

export function naturalSort(data, order, idx, sortCaseSensitive) {
    return data.slice(0).sort(function (a, b) {
        return _naturalSort(a, b, order, idx, sortCaseSensitive);
    });
}

export function multiSort(data, sortBy) {
    if (sortBy && sortBy.length) {
        data.sort(function (l, r) {
            for (let i = 0; i < sortBy.length; ++i) {
                const lVal = l[sortBy[i].idx];
                const rVal = r[sortBy[i].idx];
                if (lVal !== rVal) {
                    return sortBy[i].reverse ? d3Descending(lVal, rVal) : d3Ascending(lVal, rVal);
                }
            }
            return 0;
        });
    }
    return data;
}

export const Selection = SelectionBag;

export function urlParams() {
    const def = window.location.search.split("?")[1];
    const retVal = {};
    if (def) {
        def.split("&").forEach(function (param) {
            const paramParts = param.split("=");
            switch (paramParts.length) {
                case 1:
                    retVal[decodeURIComponent(paramParts[0])] = undefined;
                    break;
                case 2:
                    retVal[decodeURIComponent(paramParts[0])] = decodeURIComponent(paramParts[1]);
                    break;
                default:
                    throw new Error("Invalid URL Param:  " + param);
            }
        });
    }
    return retVal;
}

export function endsWith(str: string, searchStr: string, pos?: number) {
    const subjectString = str.toString();
    if (typeof pos !== "number" || !isFinite(pos) || Math.floor(pos) !== pos || pos > subjectString.length) {
        pos = subjectString.length;
    }
    pos -= searchStr.length;
    const lastIndex = subjectString.indexOf(searchStr, pos);
    return lastIndex !== -1 && lastIndex === pos;
}

export function d3ArrayAdapter(array) {
    return {
        ownerDocument: {
            // tslint:disable-next-line:object-literal-shorthand
            createElement: function (_tagName) {
                return {
                    get __data__() { return this.row; },
                    set __data__(_) { this.row = array[this.index] = _; }
                };
            },
            // tslint:disable-next-line:object-literal-shorthand
            createElementNS: function (_ns, tagName) {
                return this.createElement(tagName);
            }
        },
        // tslint:disable-next-line:object-literal-shorthand
        querySelectorAll: function (selectors) {
            if (selectors) throw new Error("unsupported");
            const context = this;
            return array.map(function (row, idx) {
                return {
                    ownerDocument: context.ownerDocument,
                    parentNode: context,
                    get __data__() { return row; },
                    set __data__(_) { array[idx] = _; }
                };
            });
        },
        // tslint:disable-next-line:object-literal-shorthand
        appendChild: function (node) {
            node.parentNode = this;
            node.index = array.length;
            array.push(null);
            return node;
        },
        // tslint:disable-next-line:object-literal-shorthand
        insertBefore: function (node, referenceNode) {
            const idx = array.indexOf(node.__data__);
            const refIdx = array.indexOf(referenceNode.__data__);
            if (idx > refIdx) {
                array.splice(refIdx, 0, array.splice(idx, 1)[0]);
            } else if (idx < refIdx - 1) {
                array.splice(refIdx - 1, 0, array.splice(idx, 1)[0]);
            }
            return node;
        },
        // tslint:disable-next-line:object-literal-shorthand
        removeChild: function (node) {
            array.splice(array.indexOf(node.__data__), 1);
            return node;
        }
    };
}

export function downloadBlob(format, blob, id?, ext?) {
    const currentdate = new Date();
    const timeFormat = d3TimeFormat("%Y-%m-%dT%H_%M_%S");
    const nowTime = timeFormat(currentdate);
    id = id || "data" + "_" + nowTime + "." + format.toLowerCase();

    const filename = id + (ext ? "." + ext : "");

    let mimeType = "";
    switch (format) {
        case "TSV":
            mimeType = "text/tab-seperated-values";
            break;
        case "JSON":
            mimeType = "application/json";
            break;
        default:
            mimeType = "text/csv";
    }

    let a = document.createElement("a");
    if (navigator.msSaveBlob) { // IE10+
        a = null;
        return navigator.msSaveBlob(new Blob([blob], { type: mimeType }), filename);
    } else if ("download" in a) { // html 5
        a.href = "data:" + mimeType + "," + encodeURIComponent(blob);
        a.setAttribute("download", filename);
        document.body.appendChild(a);
        setTimeout(function () {
            a.click();
            document.body.removeChild(a);
        }, 10);
        return true;
    } else { // old chrome and FF:
        a = null;
        const frame = document.createElement("iframe");
        document.body.appendChild(frame);
        frame.src = "data:" + mimeType + "," + encodeURIComponent(blob);

        setTimeout(function () {
            document.body.removeChild(frame);
        }, 100);
        return true;
    }
}
export function widgetPath(classID) {
    return "../" + classID.split("_").join("/");
}
export function parseClassID(classID, prefix = "..") {
    const parts = classID.split(".");
    const classParts = parts[0].split("_");
    return {
        package: `@hpcc-js/${classParts[0]}`,
        path: prefix + "/" + parts[0].split("_").join("/"),
        widgetID: classParts.length > 1 ? classParts[1] : null,
        memberWidgetID: parts.length > 1 ? parts[1] : null
    };
}

export function checksum(s) {
    if (s instanceof Array) {
        s = s.join("") + s.length;
    }
    switch (typeof s) {
        case "string":
            break;
        default:
            s = "" + s;
    }
    let chk = 0x12345678;
    for (let i = 0, l = s.length; i < l; ++i) {
        chk += (s.charCodeAt(i) * (i + 1));
    }
    // tslint:disable-next-line:no-bitwise
    return (chk & 0xffffffff).toString(16);
}
export function getTime() {
    return (now && now.call(perf)) || (new Date().getTime());
}
export function mixin(dest, _sources) {
    dest = dest || {};
    for (let i = 1, l = arguments.length; i < l; i++) {
        _mixin(dest, arguments[i]);
    }
    return dest;
}

function _mixin(dest, source) {
    let s;
    const empty = {};
    for (const key in source) {
        s = source[key];
        if (!(key in dest) || (dest[key] !== s && (!(key in empty) || empty[key] !== s))) {
            dest[key] = s;
        }
    }
    return dest;
}

export function exists(prop, scope) {
    if (!prop || !scope) {
        return false;
    }
    const propParts = prop.split(".");
    let testScope = scope;
    for (let i = 0; i < propParts.length; ++i) {
        const item = propParts[i];
        if (testScope[item] === undefined) {
            return false;
        }
        testScope = testScope[item];
    }
    return true;
}

export function logStringify(obj) {
    const cache = [];
    return JSON.stringify(obj, function (_key, value) {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
                return;
            }

            cache.push(value);
        }
        return value;
    });
}

export function debounce(func, threshold = 100, execAsap = false) {
    return function debounced(..._dummyArgs) {
        const obj = this || {};
        const args = arguments;
        function delayed() {
            if (!execAsap)
                func.apply(obj, args);
            obj.__hpcc_debounce_timeout = null;
        }
        if (obj.__hpcc_debounce_timeout)
            clearTimeout(obj.__hpcc_debounce_timeout);
        else if (execAsap)
            func.apply(obj, args);
        obj.__hpcc_debounce_timeout = setTimeout(delayed, threshold);
    };
}

export function parseVersionString(versionString) {
    const _sp = versionString.split(".");
    return {
        major: parseInt(_sp[0].replace("v", "")),
        minor: parseInt(_sp[1]),
        patch: parseInt(_sp[2].split("-")[0])
    };
}

export function removeHTMLFromString(str: string, div?: HTMLDivElement) {
    div = div ? div : document.createElement("div");
    div.innerHTML = str;
    return div.textContent || div.innerText || "";
}
