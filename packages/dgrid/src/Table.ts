import { HTMLWidget } from "@hpcc-js/common";
import { Memory, PagingGrid } from "@hpcc-js/dgrid-shim";
import { select as d3Select } from "d3-selection";

import "../src/Table.css";

export class Table extends HTMLWidget {
    _store;
    _dgridDiv;
    _dgrid;
    MAX_SAFE_INTEGER = 999999;
    _prevPagination;
    _prevChecksum;

    constructor() {
        super();
        this._tag = "div";
        this._store = new Memory();
    }

    dgridColumns() {
        return this.fields().map(function (field, idx) {
            return {
                field: "field_" + idx,
                label: field.label()
            };
        });
    }

    dgridData() {
        return this.data().map(function (row, idx) {
            const retVal = {
                id: idx
            };
            row.forEach(function (cell, idx2) {
                retVal["field_" + idx2] = cell;
            });
            return retVal;
        });
    }

    enter(domNode, element) {
        HTMLWidget.prototype.enter.apply(this, arguments);
        this._dgridDiv = element
            .append("div")
            .attr("class", "placeholder")
            ;
        this._dgrid = new PagingGrid({
            columns: this.dgridColumns(),
            collection: this._store,
            selectionMode: "single",
            cellNavigation: false,
            pagingLinks: 1,
            pagingTextBox: true,
            previousNextArrows: true,
            firstLastArrows: true,
            rowsPerPage: 100,
            pageSizeOptions: [10, 25, 100, 1000]
        }, this._dgridDiv.node());
        this._dgrid.on("dgrid-select", (evt) => {
            if (evt.rows && evt.rows.length) {
                this.click(this.data()[evt.rows[0].id], "", true);
            }
        });
        this._dgrid.refresh();
    }

    safeGetBBox(classID) {
        const domNode = d3Select(classID).node();
        if (domNode) {
            return domNode.getBoundingClientRect();
        }
        return null;
    }

    calcVisibleRows() {
        const contentBBox = this.safeGetBBox(".dgrid-content");
        let rowBBox = this.safeGetBBox(".dgrid-row");
        if (!rowBBox) {
            rowBBox = {
                height: 27  //  Dermatology default height
            };
        }
        return Math.max(Math.floor(contentBBox.height / rowBBox.height), 1);
    }

    update(domNode, element) {
        HTMLWidget.prototype.update.apply(this, arguments);
        this._dgridDiv
            .style("width", this.width() + "px")
            .style("height", this.height() - 2 + "px")
            ;
        this._dgrid.resize();
        if (this._prevChecksum !== this._db.checksum()) {
            this._prevChecksum = this._db.checksum();
            this._store.setData(this.dgridData());
        }
        // const visibleRows = this.calcVisibleRows();
        // if (this._prevPagination !== this.pagination() || this._prevVisibleRows !== visibleRows) {
        // this._dgrid.set("rowsPerPage", this.pagination() ? visibleRows : this.MAX_SAFE_INTEGER);
        // this._dgrid.set("firstLastArrows", this.pagination() ? true : false);
        // this._dgrid.set("previousNextArrows", this.pagination() ? true : false);
        // this._dgrid.set("pagingLinks", this.pagination() ? 3 : 0);
        this._dgrid.refresh();
        this._prevPagination = this.pagination();
        // }
    }

    exit(domNode, element) {
        HTMLWidget.prototype.exit.apply(this, arguments);
    }

    click(row, col, sel) {
    }

    pagination: { (): boolean; (_: boolean): Table; };
}
Table.prototype._class += " dgrid_Table";

Table.prototype.publish("pagination", false, "boolean", "Enable or disable pagination", null, { tags: ["Private"] });
