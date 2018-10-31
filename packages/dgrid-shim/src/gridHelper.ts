import * as _StoreMixin from "dgrid/_StoreMixin";
import * as DGridPagination from "dgrid/extensions/Pagination";
import * as Tooltip from "dijit/Tooltip";
import * as declare from "dojo/_base/declare";

export const GridHelper = declare(null, {
    allowTextSelection: true,
    noDataMessage: "<span class='dojoxGridNoData'>...empty...</span>",
    loadingMessage: "<span class='dojoxGridNoData'>loading...</span>",

    postCreate: function postCreate(inherited) {
        this.inherited(postCreate, arguments);

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

    clearSelection() {
        this.inherited(arguments);
        query("input[type=checkbox]", this.domNode).forEach(function (node) {
            node.checked = false;
            node.indeterminate = false;
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
    }
});
