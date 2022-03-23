import { Palette } from "@hpcc-js/common";

export class ITree {
    _palette;

    //  Events  ---
    click(row, column, selected) {
    }

    dblclick(row, column, selected) {
    }
}
ITree.prototype._palette = Palette.ordinal("default");
