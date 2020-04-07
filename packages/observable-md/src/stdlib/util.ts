import { Widget } from "@hpcc-js/common";
import { require as d3Require } from "d3-require";

export const hpccRequire = d3Require.alias({
    //    "@hpcc-js/dgrid": "../../packages/dgrid/dist/index.js"
});

let g_divID = 0;

function row2arr(row: { [key: string]: any }, fields: any[]): any[] {
    const retVal: any[] = [];
    fields.forEach((f, i) => {
        if (row === undefined) {
            retVal.push("");
        } else if (f instanceof Object) {
            let children = row[f.label];
            if (!Array.isArray(children)) {
                children = [children];
            }
            retVal.push(children.map(childRow => row2arr(childRow, f.columns)));
        } else {
            retVal.push(row[f]);
        }
    });
    return retVal;
}

function calcColumns(row) {
    const retVal = [];
    for (const key in row) {
        const col = row[key];
        if (Array.isArray(col)) {
            retVal.push({
                label: key,
                columns: calcColumns(col[0])
            });
        } else if (col instanceof Object) {
            retVal.push({
                label: key,
                columns: calcColumns(col)
            });
        } else {
            retVal.push(key);
        }
    }
    return retVal;
}

function json2ColData(data: object[], _columns: string[] = []): { columns: string[], data: any[][] } {
    if (data.length === 0 && _columns.length === 0) {
        return {
            columns: [],
            data: []
        };
    }
    let columns = [];
    if (columns.length === 0) {
        columns = calcColumns(data[0]);
    } else {
        columns = [..._columns];
    }
    return {
        columns,
        data: data.map(row => [...row2arr(row, columns), row])
    };
}

function appendProperties<T extends Widget>(div: any, help: any, widget: T, props: { height?: number, [key: string]: any } = {}) {
    // const pubProps = {};
    widget.publishedProperties(false, true).forEach(meta => {
        // pubProps[meta.id] = meta;
        const val = widget[meta.id]();
        switch (meta.type) {
            case "propertyArray":
                help[meta.id] = val.filter(item => item.valid()).map(item => {
                    const tmp = {};
                    appendProperties(div[meta.id], tmp, item, props[meta.id]);
                    return tmp;
                });
                break;
            case "widget":
                div[meta.id] = {};
                help[meta.id] = {};
                appendProperties(div[meta.id], help[meta.id], widget[meta.id](), props[meta.id]);
                break;
            default:
                if (props[meta.id]) {
                    widget[meta.id](props[meta.id]);
                }
                div[meta.id] = function () { return widget[meta.id].apply(widget, arguments); };
                help[meta.id] = `${meta.description} (${meta.type})`;
        }
    });
}

export function placeholder<T extends Widget>(widget: T, props: { height?: number, skipJson?: boolean, skipClick?: boolean, [key: string]: any } = {}, includeJson = true, includeClick = true) {
    const divID = `placeholder-${++g_divID}`;
    const div: any = document.createElement("div");
    div.id = divID;
    Object.defineProperty(div, "value", {
        enumerable: false,
        writable: true,
        value: null
    });
    div.style.height = `${props.height || 240}px`;
    delete props.height;

    Object.getPrototypeOf(widget)._idSeed = "observable-md";

    if (includeJson) {
        //  workaround dgrid weirdness on very first render ---
        let first = widget.classID() === "dgrid_Table";
        div.json = (json: object[], fields: string[] = []) => {
            const { columns, data } = json2ColData(json, fields);
            if (first) {
                setTimeout(() => {
                    updateWidget(columns, data);
                }, 200);
                first = false;
            } else {
                updateWidget(columns, data);
            }
            return div;
        };
    }

    if (includeClick) {
        widget
            .on("click", (row, col, sel, ext) => {
                div.value = sel ? row.__lparam ? row.__lparam : row : null;
                div.dispatchEvent(new CustomEvent("input"));
            })
            ;
    }

    div.help = {};
    appendProperties(div, div.help, widget, props);

    div.__widget = widget;
    return { div, widget };

    function updateWidget(columns, data) {
        widget
            .columns(columns)
            .data(data)
            .lazyRender()
            ;
    }
}
