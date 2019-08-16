import { HPCCMarkdown } from "./hpccMarkdown.js";

// @ts-ignore
import * as XXX from "../docs/test.md";

export function test() {
    return new HPCCMarkdown()
        .target("placeholder")
        .markdown(XXX)
        .render()
        ;
}
