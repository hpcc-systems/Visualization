import { HPCCMarkdown } from "./hpccMarkdown.js";

// @ts-ignore
import * as ColumnMD from "../docs/Column.md";

export function test() {
    return new HPCCMarkdown()
        .target("placeholder")
        .markdown(ColumnMD)
        .render()
        ;
}
