import { HTMLWidget } from "@hpcc-js/common";
import { select as d3Select } from "d3-selection";

export class SimpleTable extends HTMLWidget {
    protected _table;
    protected _tbody;
    protected _thead;
    _transformedData;
    constructor() {
        super();
    }
    enter(domNode, element) {
        super.enter(domNode, element);

        this._table = element.append("table");
        this._thead = this._table.append("thead").append("tr");
        this._tbody = this._table.append("tbody");
    }
    update(domNode, element) {
        super.update(domNode, element);
        this._table
            .style("width", this.autoWidth() ? "auto" : "100%")
            ;
        const theadTrSelection = this._thead.selectAll("th").data(this.columns());
        theadTrSelection.enter()
            .append("th")
            .each(function(n, i) {
                d3Select(this)
                    .classed("th-" + i, true)
                    ;
            })
            .merge(theadTrSelection)
            .text(_d => (_d).toString())
            ;
        theadTrSelection.exit().remove();
        const trSelection = this._tbody.selectAll("tr").data(this.transformData(this.data()));
        trSelection.enter()
            .append("tr")
            .merge(trSelection)
            .each(function(d) {
                const tr = d3Select(this);
                const tdSelection = tr.selectAll("td").data(d);
                tdSelection.enter()
                    .append("td")
                    .each(function(n, i) {
                        d3Select(this)
                            .classed("col-" + i, true)
                            ;
                    })
                    .merge(tdSelection)
                    .text(_d => (_d).toString())
                    ;
                tdSelection.exit().remove();
            })
            ;
        trSelection.exit().remove();
    }
    transformData(data) {
        return data;
    }
}
SimpleTable.prototype._class += " html_SimpleTable";

export interface SimpleTable {
    autoWidth(): boolean;
    autoWidth(_: boolean): this;
}
SimpleTable.prototype.publish("autoWidth", false, "boolean", "If true, table width will be set to 'auto'. If false, the width is set to '100%'");
