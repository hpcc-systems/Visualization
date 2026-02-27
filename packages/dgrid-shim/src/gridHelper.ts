import * as _StoreMixin from "dgrid/_StoreMixin";
import * as DGridPagination from "dgrid/extensions/Pagination";
import * as Tooltip from "dijit/Tooltip";
import * as declare from "dojo/_base/declare";
import * as query from "dojo/_base/query";
import * as domClass from "dojo/dom-class";

export const GridHelper = declare(null, {
    allowTextSelection: true,
    noDataMessage: "<span class='dojoxGridNoData'>...empty...</span>",
    loadingMessage: "<span class='dojoxGridNoData'>loading...</span>",

    postCreate: function postCreate(inherited) {
        this.inherited(postCreate, arguments);

        //  Emit dgrid-column-autofit on double-mousedown over a resize handle.
        //  A native dblclick is never fired because dgrid calls e.preventDefault()
        //  on every mousedown on .dgrid-resize-handle.
        //  We use a capture-phase listener on headerNode so we fire BEFORE dgrid's
        //  bubble-phase delegated handler, allowing us to stopPropagation on the
        //  second click to prevent dgrid from starting a resize drag.
        const self = this;
        let _lastResizeDownTime = 0;
        let _lastResizeColId: string | null = null;
        this.headerNode.addEventListener("mousedown", function (evt: MouseEvent) {
            const target = evt.target as any;
            if (!target.classList.contains("dgrid-resize-handle")) return;
            const colId: string = target.columnId;
            const now = Date.now();
            const delta = now - _lastResizeDownTime;
            if (colId === _lastResizeColId && delta <= 300) {
                _lastResizeDownTime = 0;
                _lastResizeColId = null;
                evt.stopPropagation();
                evt.preventDefault();
                const detail = self.columns[colId];
                if (!detail) return;
                self.domNode.dispatchEvent(new CustomEvent("dgrid-column-autofit", { detail, bubbles: true, cancelable: true }));
            } else {
                _lastResizeDownTime = now;
                _lastResizeColId = colId;
            }
        }, { capture: true });

        this.__hpcc_tooltip_header = new Tooltip({
            connectId: [this.id],
            selector: ".dgrid-resize-header-container",
            showDelay: 400,
            getContent(node) {
                if (node.offsetWidth < node.scrollWidth - 4) {
                    return node.innerHTML;
                }
                return "";
            }
        });
        this.__hpcc_tooltip_header.position = ["above-centered", "below-centered", "before-centered", "after-centered"];

        this.__hpcc_tooltip = new Tooltip({
            connectId: [this.id],
            selector: "td",
            showDelay: 400,
            getContent(node) {
                if (node.offsetWidth <= node.scrollWidth) {
                    return node.innerHTML;
                }
                return "";
            }
        });
        this.__hpcc_tooltip.position = ["above-centered", "below-centered", "before-centered", "after-centered"];
    },

    refresh: function refresh(options) {
        this.inherited(refresh, arguments, [options || {
            keepScrollPosition: true,
            keepCurrentPage: true
        }]);
    },

    clearSelection: function clearSelection() {
        this.inherited(clearSelection, arguments);
        query("input[type=checkbox]", this.domNode).forEach(function (node) {
            node.checked = false;
            node.indeterminate = false;
        });
    },

    applyWidth: function (id: string, cssWidth: string) {
        const existingRule = this._columnSizes?.[id];
        if (existingRule?.set) {
            existingRule.set("width", cssWidth);
        } else {
            this.styleColumn(id, `width: ${cssWidth}`);
        }
    },

    resizeColumn: function resizeColumn(colId: string, widthPx: number) {
        this.applyWidth(colId, `${widthPx}px`);

        //  Reset the last visible column to auto so it fills remaining space.
        const lastColId: string | undefined = this._getResizedColumnWidths?.()?.lastColId;
        if (lastColId && lastColId !== colId) {
            this.applyWidth(lastColId, "auto");
        }
        this.resize();
    }/*,

    _onNotify(object, existingId) {
        this.inherited(arguments);
        if (this.onSelectedChangedCallback) {
            this.onSelectedChangedCallback();
        }
    },

    onSelectionChanged(callback) {
        this.onSelectedChangedCallback = callback;
        this.on("dgrid-select, dgrid-deselect, dgrid-refresh-complete", function (event) {
            callback(event);
        });
    },

    setSelection(arrayOfIDs) {
        this.clearSelection();
        const context = this;
        arrayUtil.forEach(arrayOfIDs, function (item, idx) {
            if (idx === 0) {
                const row = context.row(item);
                if (row.element) {
                    row.element.scrollIntoView();
                }
            }
            context.select(item);
        });
    },

    setSelected(items) {
        this.clearSelection();
        const context = this;
        arrayUtil.forEach(items, function (item, idx) {
            if (idx === 0) {
                const row = context.row(item);
                if (row.element) {
                    row.element.scrollIntoView();
                }
            }
            context.select(context.store.getIdentity(item));
        });
    },

    getSelected(store) {
        if (!store) {
            store = this.store;
        }
        const retVal = [];
        for (const id in this.selection) {
            if (this.selection[id]) {
                const storeItem = store.get(id);
                if (storeItem && storeItem.StateID !== 999) {
                    retVal.push(storeItem);
                }
            }
        }
        return retVal;
    }
    */
});

//defined as 9223372036854775807 in ESP, but TS complains of loss of precision
const UNKNOWN_NUM_ROWS = 9223372036854775000;

export const Pagination = declare([DGridPagination], {
    refresh(options?) {
        const self = this;
        const page = options && options.keepCurrentPage ?
            Math.min(this._currentPage, Math.ceil(this._total / this.rowsPerPage)) || 1 : 1;

        _StoreMixin.prototype.refresh.apply(this, arguments);

        // Reset to first page and return promise from gotoPage
        return this.gotoPage(page).then(function (results) {
            self._emitRefreshComplete();
            return results;
        });
    },

    _updateNavigation: function _updateNavigation(total) {
        this.inherited(_updateNavigation, arguments);

        if (total >= UNKNOWN_NUM_ROWS) {
            query(".dgrid-page-link:last-child", this.paginationNavigationNode).forEach(function (link) {
                domClass.toggle(link, "dgrid-page-disabled", true);
                if (!isNaN(parseInt(link.innerText, 10))) {
                    link.innerText = "???";
                }
                link.tabIndex = -1;
            });
            const pageText = query(".dgrid-status", this.paginationNode)[0];
            pageText.innerText = pageText?.innerText?.replace(/[0-9]{7,}/, "unknown");
        }
    }
});
