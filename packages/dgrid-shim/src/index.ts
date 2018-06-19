//  dojo  ---
// import "dojo/has!webpack?dojo-webpack-plugin/amd/dojoES6Promise";

import * as declare from "dojo/_base/declare";
import * as Deferred from "dojo/Deferred";
import * as domConstruct from "dojo/dom-construct";
export {
    Deferred,
    domConstruct
};

//  dstore  ---
import * as Memory from "dojo-dstore/Memory";
import * as QueryResults from "dojo-dstore/QueryResults";
export {
    Memory,
    QueryResults
};

//  dgrid  ---
import * as _Grid from "dgrid/Grid";
// import * as List from "dgrid/List";
import * as OnDemandGrid from "dgrid/OnDemandGrid";

import * as Keyboard from "dgrid/Keyboard";
import * as Selection from "dgrid/Selection";

import * as ColumnHider from "dgrid/extensions/ColumnHider";
import * as ColumnResizer from "dgrid/extensions/ColumnResizer";
import * as CompoundColumns from "dgrid/extensions/CompoundColumns";
import * as nlsPagination from "dgrid/extensions/nls/pagination";
import * as Pagination from "dgrid/extensions/Pagination";

//  Other ---
import { GridHelper } from "./gridHelper";

export const Grid = declare([OnDemandGrid, Keyboard, Selection, ColumnHider, ColumnResizer, CompoundColumns, GridHelper]);
Grid.prototype.i18nPagination = nlsPagination.root;

export const PagingGrid = declare([_Grid, Pagination, Keyboard, Selection, ColumnHider, ColumnResizer, CompoundColumns, GridHelper]);
PagingGrid.prototype.i18nPagination = nlsPagination.root;
