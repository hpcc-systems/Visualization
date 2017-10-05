
//  dgrid  ---
import * as ColumnResizer from "dgrid/extensions/ColumnResizer";
import * as CompoundColumns from "dgrid/extensions/CompoundColumns";
import * as nlsPagination from "dgrid/extensions/nls/pagination";
import * as Pagination from "dgrid/extensions/Pagination";
import * as _Grid from "dgrid/Grid";
import * as Keyboard from "dgrid/Keyboard";
import * as OnDemandGrid from "dgrid/OnDemandGrid";
import * as Selection from "dgrid/Selection";
import * as declare from "dojo/_base/declare";

import "css!dgrid/css/dgrid.css";

export const Grid = declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, CompoundColumns]);
Grid.prototype.i18nPagination = nlsPagination.root;

export const PagingGrid = declare([_Grid, Pagination, Keyboard, Selection, ColumnResizer, CompoundColumns]);
PagingGrid.prototype.i18nPagination = nlsPagination.root;
