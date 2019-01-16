import { JSONEditor } from "@hpcc-js/codemirror";

const code = {
    "fruit": "Apple",
    "size": "Large",
    "color": "Red",
    "tags": ["witch", "snake"]
};

new JSONEditor()
    .target("target")
    .json(code)
    .render()
    ;