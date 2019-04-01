import { HTMLWidget } from "@hpcc-js/common";
import { safeEncode } from "@hpcc-js/util";
import { select as d3Select } from "d3-selection";

export class SimpleTable extends HTMLWidget {
    protected _table;
    protected _tbody;
    protected _thead;
    protected _theadRow;
    constructor() {
        super();
    }

    protected transformData() {
        return this.data();
    }

    enter(domNode, element) {
        super.enter(domNode, element);

        this._table = element.append("table");
        this._thead = this._table.append("thead");
        this._theadRow = this._thead.append("tr");
        this._tbody = this._table.append("tbody");
    }

    update(domNode, element) {
        super.update(domNode, element);
        const context = this;
        this._table
            .style("width", this.autoWidth() ? "auto" : "100%")
            ;
        const theadTrSelection = this._theadRow.selectAll("th").data(this.columns());
        const theadTrUpdate = theadTrSelection.enter()
            .append("th")
            .attr("class", (n, i) => `th-${i}`)
            .merge(theadTrSelection)
            ;
        if (this.renderHtmlDataCells()) {
            theadTrUpdate.html(d => d as string);
        } else {
            theadTrUpdate.text(d => d as string);
        }
        theadTrSelection.exit().remove();
        const trSelection = this._tbody.selectAll("tr").data(this.transformData());
        trSelection.enter()
            .append("tr")
            .merge(trSelection)
            .each(function (this, d) {
                const tr = d3Select(this);
                const tdSelection = tr.selectAll("td").data(d);
                const tdUpdate = tdSelection.enter()
                    .append("td")
                    .attr("class", (n, i) => `col-${i}`)
                    .merge(tdSelection as any)
                    .attr("title", _d => safeEncode(_d as string))
                    ;
                if (context.renderHtmlDataCells()) {
                    tdUpdate.html(_d => _d as string);
                } else {
                    tdUpdate.text(_d => _d as string);
                }
                tdSelection.exit().remove();
            })
            ;
        trSelection.exit().remove();
    }
}
SimpleTable.prototype._class += " html_SimpleTable";

export interface SimpleTable {
    renderHtmlDataCells(): boolean;
    renderHtmlDataCells(_: boolean): this;
    autoWidth(): boolean;
    autoWidth(_: boolean): this;
}
SimpleTable.prototype.publish("renderHtmlDataCells", false, "boolean", "enable or disable HTML within cells");
SimpleTable.prototype.publish("autoWidth", false, "boolean", "If true, table width will be set to 'auto'. If false, the width is set to '100%'");
