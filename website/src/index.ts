import { HPCCIndexPanel } from "./hpccIndex.js";

// @ts-ignore
import * as indexJson from "../src-umd/index.json";

// @ts-ignore
// import * as ColumnMD from "../docs/Column.md";

console.log(indexJson);
export function test() {
    return new HPCCIndexPanel()
        .target("placeholder")
        .data(indexJson)
        .render()
        ;
    /*
return new HPCCMarkdown()
    .target("placeholder")
     .markdown(ColumnMD)
    .render()
    ;
    */
}
