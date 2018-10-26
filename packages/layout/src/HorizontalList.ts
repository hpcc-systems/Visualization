import { FlexGrid } from "./FlexGrid";

export class HorizontalList extends FlexGrid {
    constructor() {
        super();
        this.orientation_default("horizontal");
        this.flexWrap_default("nowrap");
    }
}
HorizontalList.prototype._class += " layout_HorizontalList";

export interface HorizontalList {
    orientation_default(_: "horizontal" | "vertical");
    flexWrap_default(_: "nowrap" | "wrap" | "wrap-reverse");
}
