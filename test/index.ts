import { Test } from "../src/html/test";

import "./index.css";

const test = new Test()
    .target("placeholder2")
    .columns(["label", "weight"])
    .data([
        ["Test200", 200],
        ["Test100", 100]
    ])
    .render()
    ;
