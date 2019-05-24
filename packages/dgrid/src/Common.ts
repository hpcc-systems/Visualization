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
    protected _prevSortBy;

    constructor() {
        super();
        this._tag = "div";
    }

    @publish("...empty...", "string", "No Data Message")
    noDataMessage: publish<this, string>;
    @publish("loading...", "string", "Loading Message")
    loadingMessage: publish<this, string>;
    @publish(false, "boolean", "Enable paging")
    pagination: publish<this, boolean>;
    @publish(false, "boolean", "Enable sorting by column")
    sortable: publish<this, boolean>;
    @publish("", "string", "Default sort by (Use '-' for descending sort)")
    sortBy: publish<this, string>;

    protected formatSortBy(): [{ property: string, descending: boolean }] | undefined {
        let sortBy = this.sortBy();
        if (!sortBy) return undefined;
        const descending = sortBy[0] === "-";
        if (descending) {
            sortBy = sortBy.substr(1);
        }
        const idx = this.columns().indexOf(sortBy);
        return idx >= 0 ? [{ property: idx.toString(), descending }] : undefined;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._dgridDiv = element.append("div")
            .attr("class", "flat")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        if (!this._dgrid || this._prevPaging !== this.pagination() || this._prevSortBy !== this.sortBy()) {
            this._prevPaging = this.pagination();
            this._prevSortBy = this.sortBy();
            if (this._dgrid) {
                this._dgrid.destroy();
                this._dgridDiv = element.append("div")
                    .attr("class", "flat")
                    ;
            }
            this._dgrid = new (this._prevPaging ? PagingGrid : Grid)({
                columns: this._columns,
                collection: this._store,
                sort: this.formatSortBy(),
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
            this._dgrid.refresh({});
        }
        this._dgrid.noDataMessage = `<span class='dojoxGridNoData'>${this.noDataMessage()}</span>`;
        this._dgrid.loadingMessage = `<span class='dojoxGridNoData'>${this.loadingMessage()}</span>`;

        this._dgridDiv
            .style("width", this.width() + "px")
            .style("height", this.height() - 2 + "px")
            ;
        this._dgrid.resize();
    }

    exit(domNode, element) {
        delete this._prevPaging;
        if (this._dgrid) {
            this._dgrid.destroy();
            delete this._dgrid;
        }
        super.exit(domNode, element);
    }

    click(row, col, sel) {
    }
}
Common.prototype._class += " dgrid_Common";
