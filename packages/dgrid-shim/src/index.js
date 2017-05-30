//  dojo  ---
import * as declare from "dojo/_base/declare";
import * as _Deferred from "dojo/Deferred";
import * as _domConstruct from "dojo/dom-construct";
export const Deferred = _Deferred;
export const domConstruct = _domConstruct;;

//  dstore  ---
import * as _Cache from "dstore/Cache";
import * as _Memory from "dstore/Memory";
import * as _QueryResults from "dstore/QueryResults"
import * as _SimpleQuery from 'dstore/SimpleQuery';
import * as _Store from "dstore/Store";
export const Cache = _Cache;
export const Memory = _Memory;
export const QueryResults = _QueryResults;
export const SimpleQuery = _SimpleQuery;
export const Store = _Store;

//  dgrid  ---
import * as Grid from "dgrid/Grid";
import * as List from "dgrid/List";
import * as OnDemandGrid from "dgrid/OnDemandGrid";
import * as Keyboard from "dgrid/Keyboard";
import * as Selection from "dgrid/Selection";
import * as ColumnResizer from "dgrid/extensions/ColumnResizer";
import * as CompoundColumns from "dgrid/extensions/CompoundColumns";
import * as Pagination from "dgrid/extensions/Pagination";
import * as nlsPagination from "dgrid/extensions/nls/pagination";

import "dgrid/css/dgrid.css";

export const Grid = declare([OnDemandGrid, Keyboard, Selection, ColumnResizer, CompoundColumns]);
Grid.prototype.i18nPagination = nlsPagination.root;

export const PagingGrid = declare([Grid, Pagination]);//, Keyboard, Selection, ColumnResizer, CompoundColumns]);
PagingGrid.prototype.i18nPagination = nlsPagination.root;
