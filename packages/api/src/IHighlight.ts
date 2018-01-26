export interface IHighlight {
    highlightColumn(column: string): this;
}

export function instanceOfIHighlight(w: any): w is IHighlight {
    return typeof (w as any).highlightColumn === "function";
}
