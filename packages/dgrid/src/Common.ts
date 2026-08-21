import { HTMLWidget, Selection } from "@hpcc-js/common";
import { Grid, PagingGrid } from "./dgrid-shim.ts";
import { DBStore } from "./DBStore.ts";
import { type ColumnType } from "./RowFormatter.ts";

import "../src/Common.css";

export class Common extends HTMLWidget {
    protected _columns: ColumnType[] = [];
    protected _store = new DBStore(this._db);
    protected _dgridDiv: Selection<HTMLDivElement, unknown, HTMLElement, unknown>;
    protected _dgrid: typeof PagingGrid | typeof Grid;
    protected _prevPaging: boolean;
    private _prevSortBy: string;
    private _prevSortByDescending: boolean;
    private _prevMultiSelect: boolean;
    private _selectedRowIDs = new Set<number>();
    private _selectionAnchorID?: number;

    constructor() {
        super();
        this._tag = "div";
    }

    protected formatSortBy(): [{ property: string, descending: boolean }] | undefined {
        const idx = this.columns().indexOf(this.sortBy());
        return idx >= 0 ? [{ property: idx.toString(), descending: this.sortByDescending() }] : undefined;
    }

    protected _supressEvents;
    selection(): any[];
    selection(_: any[]): this;
    selection(_?: any[]): any[] | this {
        if (!arguments.length) {
            return [...this._selectedRowIDs]
                .map(id => this._store.get(id))
                .filter(Boolean)
                .map(row => this.rowToObj(row));
        }
        this._supressEvents = true;
        this._selectedRowIDs.clear();
        let firstID: number | undefined;
        this.data().forEach((row, idx) => {
            if (_.indexOf(row) >= 0) {
                this._selectedRowIDs.add(idx);
                firstID ??= idx;
            }
        });
        this._selectionAnchorID = firstID;
        this._renderSelection();
        this._dgrid?.row(firstID).element?.scrollIntoView();
        this._supressEvents = false;
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
            this._dgrid = this._createGrid({
                ...this._gridColumnsConfig(),
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
            this._dgrid.on(".dgrid-content .dgrid-cell:click", (evt) => {
                if (this._supressEvents) return;
                const cell = this._dgrid.cell(evt);
                const rowID = +cell?.row?.id;
                const row = this._store.get(rowID);
                if (row) {
                    const selected = this._updateSelection(rowID, evt);
                    this.click(
                        this.rowToObj(row),
                        cell.column.label,
                        selected,
                        { selection: this.selection() }
                    );
                }
            });
            this._dgrid.on("dgrid-column-autofit", (evt) => {
                if (this._supressEvents) return;
                if (evt.detail?.label) {
                    const column = this._columns.find(c => c.label === evt.detail.label);
                    if (!column) return;
                    this.dblclickColResize(column.label, column);
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

    dblclickColResize(column, dgridColumn) {
    }

    private _updateSelection(rowID: number, event: MouseEvent): boolean {
        const toggle = event.ctrlKey || event.metaKey;
        if (this.multiSelect() && event.shiftKey && this._selectionAnchorID !== undefined) {
            if (!toggle) this._selectedRowIDs.clear();
            const first = Math.min(this._selectionAnchorID, rowID);
            const last = Math.max(this._selectionAnchorID, rowID);
            for (let id = first; id <= last; id++) this._selectedRowIDs.add(id);
        } else if (this.multiSelect() && toggle) {
            if (this._selectedRowIDs.has(rowID)) {
                this._selectedRowIDs.delete(rowID);
            } else {
                this._selectedRowIDs.add(rowID);
            }
            this._selectionAnchorID = rowID;
        } else if (!this.multiSelect() && toggle && this._selectedRowIDs.has(rowID)) {
            this._selectedRowIDs.delete(rowID);
            this._selectionAnchorID = undefined;
        } else {
            this._selectedRowIDs.clear();
            this._selectedRowIDs.add(rowID);
            this._selectionAnchorID = rowID;
        }
        this._renderSelection();
        return this._selectedRowIDs.has(rowID);
    }

    private _renderSelection(): void {
        if (!this._dgridDiv) return;
        this._dgridDiv.node().querySelectorAll(".dgrid-selected").forEach(element => element.classList.remove("dgrid-selected"));
        for (const rowID of this._selectedRowIDs) {
            this._dgrid?.row(rowID).element?.classList.add("dgrid-selected");
        }
    }

    protected _gridColumnsConfig(): object {
        return { columns: this._columns };
    }

    protected _createGrid(opts: any, node: HTMLElement): any {
        return new (this._prevPaging ? PagingGrid : Grid)(opts, node);
    }
}
Common.prototype._class += " dgrid_Common";

export interface Common {
    noDataMessage(): string;
    noDataMessage(_: string): this;
    loadingMessage(): string;
    loadingMessage(_: string): this;
    pagination(): boolean;
    pagination(_: boolean): this;
    pageSize(): number;
    pageSize(_: number): this;
    sortable(): boolean;
    sortable(_: boolean): this;
    sortBy(): string;
    sortBy(_: string): this;
    sortByDescending(): boolean;
    sortByDescending(_: boolean): this;
    multiSelect(): boolean;
    multiSelect(_: boolean): this;
    renderHtml(): boolean;
    renderHtml(_: boolean): this;
}

Common.prototype.publish("noDataMessage", "...empty...", "string", "No Data Message");
Common.prototype.publish("loadingMessage", "loading...", "string", "Loading Message");
Common.prototype.publish("pagination", false, "boolean", "Enable paging");
Common.prototype.publish("pageSize", 25, "number", "Page size");
Common.prototype.publish("sortable", false, "boolean", "Enable sorting by column");
Common.prototype.publish("sortBy", null, "set", "Default 'sort by' Column ID", function (this: Common) { return this.columns(); }, { optional: true });
Common.prototype.publish("sortByDescending", false, "boolean", "Default 'sort by' descending", undefined, { disable: self => !self.sortBy() });
Common.prototype.publish("multiSelect", false, "boolean", "Multiple Selection");
Common.prototype.publish("renderHtml", true, "boolean", "Render HTML");

