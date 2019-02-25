import { SimpleTable } from "./SimpleTable";

export class StyledTable extends SimpleTable {
    constructor() {
        super();
    }

    protected applyStyleObject(selection, styleObject) {
        Object.keys(styleObject).forEach(styleName => {
            selection.style(styleName, styleObject[styleName]);
        });
    }

    update(domNode, element) {
        super.update(domNode, element);

        element.selectAll("tr,th,td").attr("style", "");

        this.theadColumnStyles().forEach((styleObj, i) => {
            this.applyStyleObject(element.select(`.th-${i}`), styleObj);
        });
        this.tbodyColumnStyles().forEach((styleObj, i) => {
            this.applyStyleObject(element.selectAll(`.col-${i}`), styleObj);
        });
        const evenRowStylesExist = Object.keys(this.evenRowStyles()).length > 0;
        const lastRowStylesExist = Object.keys(this.lastRowStyles()).length > 0;
        const tbodyRows = element.selectAll("tbody > tr");
        if (evenRowStylesExist) {
            const tbodyEvenRows = tbodyRows.select(function(d, i) { return i % 2 ? this : null; });
            this.applyStyleObject(tbodyEvenRows, this.evenRowStyles());
        }
        if (lastRowStylesExist) {
            const tbodyLastRow = tbodyRows.select(function(d, i, arr) { return i === arr.length - 1 ? this : null; });
            this.applyStyleObject(tbodyLastRow, this.lastRowStyles());
        }
    }
}
StyledTable.prototype._class += " html_StyledTable";

export interface StyledTable {
    tbodyColumnStyles(): Array<{[styleID: string]: any}>;
    tbodyColumnStyles(_: Array<{[styleID: string]: any}>): this;
    tbodyColumnStyles_default(_: Array<{[styleID: string]: any}>): this;
    theadColumnStyles(): Array<{[styleID: string]: any}>;
    theadColumnStyles(_: Array<{[styleID: string]: any}>): this;
    theadColumnStyles_default(_: Array<{[styleID: string]: any}>): this;
    lastRowStyles(): {[styleID: string]: any};
    lastRowStyles(_: {[styleID: string]: any}): this;
    lastRowStyles_default(_: {[styleID: string]: any}): this;
    evenRowStyles(): {[styleID: string]: any};
    evenRowStyles(_: {[styleID: string]: any}): this;
    evenRowStyles_default(_: {[styleID: string]: any}): this;
}

StyledTable.prototype.publish("theadColumnStyles", [], "array", 'Array of objects containing styles for the thead columns (ex: [{"color":"red"},{"color":"blue"}])');
StyledTable.prototype.publish("tbodyColumnStyles", [], "array", 'Array of objects containing styles for the tbody columns (ex: [{"color":"red"},{"color":"blue"}])');
StyledTable.prototype.publish("lastRowStyles", {}, "object", 'Object containing styles for the last row (ex: {"color":"red"})');
StyledTable.prototype.publish("evenRowStyles", {}, "object", 'Object containing styles for even rows (ex: {"background-color":"#AAA"})');
