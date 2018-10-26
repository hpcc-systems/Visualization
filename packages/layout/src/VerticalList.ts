import { FlexGrid } from "./FlexGrid";

export class VerticalList extends FlexGrid {
    constructor() {
        super();
        this.orientation_default("vertical");
        this.flexWrap_default("nowrap");
    }
}
VerticalList.prototype._class += " layout_VerticalList";

export interface VerticalList {
    orientation_default(_: "horizontal" | "vertical");
    flexWrap_default(_: "nowrap" | "wrap" | "wrap-reverse");
}
