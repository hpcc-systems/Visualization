import { JSEditor } from "@hpcc-js/codemirror";

const code = `alert("Hello World!!!");`;

new JSEditor()
    .target("target")
    .javascript(code)
    .render()
    ;