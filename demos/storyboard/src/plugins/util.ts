let g_divID = 0;
export function _div(widgets: object[], props: { height?: number, [key: string]: any } = {}) {
    const divID = `widget${++g_divID}`;
    const div: any = document.createElement("div");
    div.id = divID;
    div.style.height = `${props.height || 240}px`;
    delete props.height;
    for (const key in props) {
        for (const w of widgets) {
            if (typeof w[key] === "function") {
                w[key](props[key]);
                break;
            }
        }
    }
    div.notify = function (_) {
        this.value = _;
        this.dispatchEvent(new CustomEvent("input"));
    }
    div.widget = widgets[0];
    div.value = null;
    return div;
}

export function div(widget: object | object[], props: { height?: number, [key: string]: any } = {}) {
    const widgets: any[] = !Array.isArray(widget) ? [widget] : widget;
    const div: any = _div(widgets, props);
    div.data = (json: object[], fields: string[] = []) => {
        const { columns, data } = json2ColData(json, fields);
        widgets[0]
            .columns(columns)
            .data(data)
            .lazyRender()
            ;
        return div;
    }
    return div;
}

export function editorDiv(widget: object | object[], props: { height?: number, [key: string]: any } = {}) {
    const widgets: any[] = !Array.isArray(widget) ? [widget] : widget;
    const div: any = _div(widgets, props);
    div.text = (text: string) => {
        widgets[0]
            .text(text)
            .lazyRender()
            ;
        return div;
    }
    return div;
}

export function row2arrXXX(row: { [key: string]: any }, fields: string[]): any[] {
    const retVal: any[] = [];
    fields.forEach((f, i) => retVal.push(i > 0 ? parseInt(row[f]) : row[f]));
    return retVal;
}

export function row2arr(row: { [key: string]: any }, fields: string[]): any[] {
    const retVal: any[] = [];
    fields.forEach((f, i) => retVal.push(row[f]));
    return retVal;
}

export function json2ColData(data: object[], columns: string[] = []): { columns: string[], data: any[][] } {
    if (data.length === 0 && columns.length === 0) {
        return {
            columns: [],
            data: []
        }
    }
    if (columns.length === 0) {
        columns = Object.keys(data[0]);
    }
    return {
        columns,
        data: data.map(row => [...row2arr(row, columns), row])
    }
}
