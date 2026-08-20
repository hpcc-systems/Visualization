export * from "./__package__.ts";
//  dojo  ---
// import "dojo/has!webpack?dojo-webpack-plugin/amd/dojoES6Promise";

import declare from "dojo/_base/declare";
import _Deferred from "dojo/Deferred";
import _domConstruct from "dojo/dom-construct";
export const Deferred: any = _Deferred;
export const domConstruct: any = _domConstruct;

//  dstore  ---
import _Memory from "dojo-dstore/Memory";
import _QueryResults from "dojo-dstore/QueryResults";
export const Memory: any = _Memory;
export const QueryResults: any = _QueryResults;

//  dgrid  ---
import _Grid from "dgrid/Grid";
// import List from "dgrid/List";
import OnDemandGrid from "dgrid/OnDemandGrid";

import Keyboard from "dgrid/Keyboard";
import Selection from "dgrid/Selection";
import ColumnSet from "dgrid/ColumnSet";

import ColumnResizer from "dgrid/extensions/ColumnResizer";
import CompoundColumns from "dgrid/extensions/CompoundColumns";
import nlsPagination from "dgrid/extensions/nls/pagination";

//  Other ---
import { GridHelper, Pagination } from "./gridHelper.ts";

export const Grid = declare("Grid", [OnDemandGrid, Keyboard, Selection, ColumnResizer, CompoundColumns, GridHelper]);
Grid.prototype.i18nPagination = nlsPagination.root;

export const PagingGrid = declare("PagingGrid", [_Grid, Pagination, Keyboard, Selection, ColumnResizer, CompoundColumns, GridHelper]);
PagingGrid.prototype.i18nPagination = nlsPagination.root;

export const ColumnSetGrid = declare("ColumnSetGrid", [OnDemandGrid, ColumnSet, Keyboard, Selection, ColumnResizer, GridHelper]);
ColumnSetGrid.prototype.i18nPagination = nlsPagination.root;
