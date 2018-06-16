import { HTMLWidget, publish } from "@hpcc-js/common";
import { Grid, PagingGrid } from "@hpcc-js/dgrid-shim";
import { DBStore } from "./DBStore";

import "../src/Common.css";

export class Common extends HTMLWidget {
    protected _columns = [];
    protected _store = new DBStore(this._db);
    protected _dgridDiv;
    protected _dgrid;
    protected _prevPaging;

    constructor() {
        super();
        this._tag = "div";
    }

    @publish(false, "boolean", "Enable paging")
    pagination: publish<this, boolean>;

    enter(domNode, element) {
        super.enter(domNode, element);
        this._dgridDiv = element.append("div")
            .attr("class", "flat")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);
        if (this._prevPaging !== this.pagination()) {
            this._prevPaging = this.pagination();
            if (this._dgrid) {
                this._dgrid.destroy();
                this._dgridDiv = element.append("div")
                    .attr("class", "flat")
                    ;
            }
            this._dgrid = new (this._prevPaging ? PagingGrid : Grid)({
                columns: this._columns,
                collection: this._store,
                selectionMode: "single",
                deselectOnRefresh: true,
                cellNavigation: false,
                pagingLinks: 1,
                pagingTextBox: true,
                previousNextArrows: true,
                firstLastArrows: true,
                rowsPerPage: 25,
                pageSizeOptions: [1, 10, 25, 100, 1000]
            }, this._dgridDiv.node());
            this._dgrid.on("dgrid-select", (evt) => {
                if (evt.rows && evt.rows.length && evt.rows[0].data) {
                    this.click(this.rowToObj(evt.rows[0].data.__origRow), "", true);
                }
            });
            this._dgrid.on("dgrid-deselect", (evt) => {
                if (evt.rows && evt.rows.length && evt.rows[0].data) {
                    this.click(this.rowToObj(evt.rows[0].data.__origRow), "", false);
                }
            });
        }
        this._dgridDiv
            .style("width", this.width() + "px")
            .style("height", this.height() - 2 + "px")
            ;
        this._dgrid.resize();
    }

    click(row, col, sel) {
    }
}
Common.prototype._class += " dgrid_Common";
