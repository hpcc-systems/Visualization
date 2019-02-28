import { SimpleTable } from "./SimpleTable";

export class StyledTable extends SimpleTable {
    constructor() {
        super();
    }
    update(domNode, element) {
        super.update(domNode, element);

        this.theadColumnStyles().forEach((styleObj, i) => {
            const columnSelection = element.selectAll(".th-" + i);
            Object.keys(styleObj).forEach(styleName => {
                columnSelection.style(styleName, styleObj[styleName]);
            });
        });
        this.tbodyColumnStyles().forEach((styleObj, i) => {
            const columnSelection = element.selectAll(".col-" + i);
            Object.keys(styleObj).forEach(styleName => {
                columnSelection.style(styleName, styleObj[styleName]);
            });
        });
        if (this.evenRowStyles_exists()) {
            this.applyStyleObject("tbody > tr:nth-child(even)", this.evenRowStyles());
        }
        if (this.lastRowStyles_exists()) {
            this.applyStyleObject("tbody > tr:last-child", this.lastRowStyles());
        }
    }
    applyStyleObject(selector, styleObject) {
        const lastRowSelection = this.element().selectAll(selector);
        Object.keys(styleObject).forEach(styleName => {
            lastRowSelection.style(styleName, styleObject[styleName]);
        });
    }
}
StyledTable.prototype._class += " html_StyledTable";

export interface StyledTable {
    tbodyColumnStyles(): any;
    tbodyColumnStyles(_: any): this;
    tbodyColumnStyles_default(_: any): this;
    tbodyColumnStyles_exists(): boolean;
    theadColumnStyles(): any;
    theadColumnStyles(_: any): this;
    theadColumnStyles_default(_: any): this;
    theadColumnStyles_exists(): boolean;
    lastRowStyles(): any;
    lastRowStyles(_: any): this;
    lastRowStyles_default(_: any): this;
    lastRowStyles_exists(): boolean;
    evenRowStyles(): any;
    evenRowStyles(_: any): this;
    evenRowStyles_default(_: any): this;
    evenRowStyles_exists(): boolean;
}

StyledTable.prototype.publish("theadColumnStyles", [], "array", 'Array of objects containing styles for the thead columns (ex: [{"color":"red"},{"color":"blue"}])');
StyledTable.prototype.publish("tbodyColumnStyles", [], "array", 'Array of objects containing styles for the tbody columns (ex: [{"color":"red"},{"color":"blue"}])');
StyledTable.prototype.publish("lastRowStyles", {}, "object", 'Object containing styles for the last row (ex: {"color":"red"})');
StyledTable.prototype.publish("evenRowStyles", {}, "object", 'Object containing styles for even rows (ex: {"background-color":"#AAA"})');
