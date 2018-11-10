import { JSONEditor } from "@hpcc-js/codemirror";

const code = `{"fruit": "Apple","size": "Large","color": "Red"}`;

new JSONEditor()
    .target("target")
    .json(code)
    .render()
    ;