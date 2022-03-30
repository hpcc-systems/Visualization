import { Palette } from "@hpcc-js/common";

//  Use old school class declaration as this is a mixin  ---
export function ITree() {
}
ITree.prototype.constructor = ITree;

//  Events  ---
ITree.prototype.click = function (row, column, selected) {
};

ITree.prototype.dblclick = function (row, column, selected) {
};

ITree.prototype._palette = Palette.ordinal("default");
