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
    private _prevSortBy: string;
    private _prevSortByDescending: boolean;
    private _prevMultiSelect: boolean;

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
    @publish(25, "number", "Page size")
    pageSize: publish<this, number>;
    @publish(false, "boolean", "Enable sorting by column")
    sortable: publish<this, boolean>;
    @publish(null, "set", "Default 'sort by' Column ID", function () { return this.columns(); }, { optional: true })
    sortBy: publish<this, string>;
    @publish(false, "boolean", "Default 'sort by' descending", null, { disable: self => !self.sortBy() })
    sortByDescending: publish<this, boolean>;
    @publish(false, "boolean", "Multiple Selection")
    multiSelect: publish<this, boolean>;
    @publish(true, "boolean", "Render HTML")
    renderHtml: publish<this, boolean>;

    //  Backward Compatibility
    mulitSelect(): boolean;
    mulitSelect(_?: boolean): this;
    mulitSelect(_?: boolean): this | boolean {
        return this.multiSelect.apply(this, arguments);
    }

    protected formatSortBy(): [{ property: string, descending: boolean }] | undefined {
        const idx = this.columns().indexOf(this.sortBy());
        return idx >= 0 ? [{ property: idx.toString(), descending: this.sortByDescending() }] : undefined;
    }

    selection() {
        const retVal = [];
        for (const id in this._dgrid.selection) {
            if (this._dgrid.selection[id]) {
                const storeItem = this._store.get(+id);
                retVal.push(this.rowToObj(storeItem));
            }
        }
        return retVal;
    }

    enter(domNode, element) {
        super.enter(domNode, element);
        this._dgridDiv = element.append("div")
            .attr("class", "flat")
            ;
    }

    update(domNode, element) {
        super.update(domNode, element);

        this._store.renderHtml(this.renderHtml());

        if (!this._dgrid || this._prevPaging !== this.pagination() ||
            this._prevSortBy !== this.sortBy() ||
            this._prevSortByDescending !== this.sortByDescending() ||
            this._prevMultiSelect !== this.multiSelect()) {

            this._prevPaging = this.pagination();
            this._prevSortBy = this.sortBy();
            this._prevSortByDescending = this.sortByDescending();
            this._prevMultiSelect = this.multiSelect();
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
                selectionMode: this.multiSelect() ? "extended" : "single",
                deselectOnRefresh: true,
                cellNavigation: false,
                pagingLinks: 1,
                pagingTextBox: true,
                previousNextArrows: true,
                firstLastArrows: true,
                rowsPerPage: this.pageSize(),
                pageSizeOptions: [1, 10, 25, 50, 100, 1000]
            }, this._dgridDiv.node());
            this._dgrid.on("dgrid-select", (evt) => {
                if (evt.rows && evt.rows.length && evt.rows[0].data) {
                    this.click(this.rowToObj(evt.rows[0].data.__origRow), "", true, { selection: this.selection() });
                }
            });
            this._dgrid.on("dgrid-deselect", (evt) => {
                if (evt.rows && evt.rows.length && evt.rows[0].data) {
                    this.click(this.rowToObj(evt.rows[0].data.__origRow), "", false, { selection: this.selection() });
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

    click(row, col, sel, more) {
    }
}
Common.prototype._class += " dgrid_Common";
