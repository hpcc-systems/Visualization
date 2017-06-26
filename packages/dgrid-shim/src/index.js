import * as declare from "dojo/_base/declare";
import * as _Memory from "dstore/Memory";
import * as OnDemandGrid from 'dgrid/OnDemandGrid';
import * as Keyboard from "dgrid/Keyboard";
import * as Selection from "dgrid/Selection";
import * as ColumnResizer from "dgrid/extensions/ColumnResizer";
import * as Pagination from "dgrid/extensions/Pagination";

import * as nlsPagination from "dgrid/extensions/nls/pagination";
import "dgrid/css/dgrid.css";

export const Memory = _Memory;
export const Grid = declare([OnDemandGrid, Keyboard, Selection, ColumnResizer]);
Grid.prototype.i18nPagination = nlsPagination.root;

export const PagingGrid = declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, Pagination]);
PagingGrid.prototype.i18nPagination = nlsPagination.root;
