import { Widget } from "@hpcc-js/common";

let g_divID = 0;

function row2arr(row: { [key: string]: any }, fields: string[]): any[] {
    const retVal: any[] = [];
    fields.forEach((f, i) => retVal.push(row[f]));
    return retVal;
}

function json2ColData(data: object[], columns: string[] = []): { columns: string[], data: any[][] } {
    if (data.length === 0 && columns.length === 0) {
        return {
            columns: [],
            data: []
        };
    }
    if (columns.length === 0) {
        columns = Object.keys(data[0]);
    }
    return {
        columns,
        data: data.map(row => [...row2arr(row, columns), row])
    };
}

function appendProperties<T extends Widget>(div: any, widget: T, props: { height?: number, [key: string]: any } = {}) {
    const pubProps = {};
    widget.publishedProperties(false, true).forEach(meta => {
        pubProps[meta.id] = meta;
        const val = widget[meta.id]();
        switch (meta.type) {
            case "propertyArray":
                div[meta.id] = val.filter(item => item.valid()).map(item => {
                    const tmp = {};
                    appendProperties(tmp, item, props[meta.id]);
                    return tmp;
                });
                break;
            case "widget":
                div[meta.id] = {};
                appendProperties(div[meta.id], widget[meta.id](), props[meta.id]);
                break;
            default:
                if (props[meta.id]) {
                    widget[meta.id](props[meta.id]);
                }
                div[meta.id] = `${meta.description} (${meta.type})`;
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
        div.json = (json: object[], fields: string[] = []) => {
            const { columns, data } = json2ColData(json, fields);
            widget
                .columns(columns)
                .data(data)
                .lazyRender()
                ;
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

    appendProperties(div, widget, props);

    div.__widget = widget;
    return { div, widget };
}
