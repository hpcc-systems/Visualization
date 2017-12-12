import * as Tooltip from "dijit/Tooltip";
// import * as arrayUtil from "dojo/_base/array";
import * as declare from "dojo/_base/declare";
// import * as query from "dojo/query";

export const GridHelper = declare(null, {
    allowTextSelection: true,
    noDataMessage: "<span class='dojoxGridNoData'>...empty...</span>",
    loadingMessage: "<span class='dojoxGridNoData'>loading...</span>",

    postCreate: function fn(inherited) {
        this.inherited(fn, arguments);

        this.__hpcc_tooltip = new Tooltip({
            connectId: [this.id],
            selector: "td,.dgrid-resize-header-container",
            showDelay: 400,
            getContent(node) {
                if (node.offsetWidth <= node.scrollWidth) {
                    return node.innerHTML;
                }
                return "";
            }
        });
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
