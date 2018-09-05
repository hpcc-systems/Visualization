import { Palette } from "@hpcc-js/common";

export class ITree {
    _palette;

    //  Events  ---
    click(row, column, selected) {
        console.log("Click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }

    dblclick(row, column, selected) {
        console.log("Double click:  " + JSON.stringify(row) + ", " + column + ", " + selected);
    }
}
ITree.prototype._palette = Palette.ordinal("default");
Palette.appendOrdinalColors(ITree);
