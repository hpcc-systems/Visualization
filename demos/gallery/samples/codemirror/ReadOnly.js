import { JSEditor } from "@hpcc-js/codemirror";

const code = `\
function foo(a, b) {
    return a + b;
}
function bar(c, d) {
    return foo(c, d) + (c * d);
}
`;

new JSEditor()
    .target("target")
    .javascript(code)
    .readOnly(true)
    .render()
    ;