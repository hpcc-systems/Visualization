import * as declare from "dojo/_base/declare";
import * as _Memory from "dstore/Memory";
import * as OnDemandGrid from 'dgrid/OnDemandGrid';
import * as Keyboard from "dgrid/Keyboard";
import * as Selection from "dgrid/Selection";
import * as Pagination from "dgrid/extensions/Pagination";

import "dgrid/extensions/nls/pagination";
import "dgrid/css/dgrid.css";

export const Memory = _Memory;
export const Grid = declare([OnDemandGrid, Keyboard, Selection]);

export const PagingGrid = declare([OnDemandGrid, Keyboard, Selection, Pagination]);
PagingGrid.prototype.i18nPagination = {
    status: '${start} - ${end} of ${total} results',
    gotoFirst: 'Go to first page',
    gotoNext: 'Go to next page',
    gotoPrev: 'Go to previous page',
    gotoLast: 'Go to last page',
    gotoPage: 'Go to page',
    jumpPage: 'Jump to page',
    rowsPerPage: 'Number of rows per page'
};
