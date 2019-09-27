# JSEditor

<!--meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/JSEditor.ts#L3",
    "extends": "Editor"
}
-->

JSEditor displays an editable snippet of JavaScript with syntax coloring and code folding.

```sample-code
import { JSEditor } from "@hpcc-js/codemirror";

const code = `
function foo(a, b) {
    return a + b;
}
function bar(c, d) {
    return foo(c, d) + (c * d);
}
`;

let count = 0;
new JSEditor()
    .target("target")
    .javascript(code)
    .render()
    ;            

```

## API

## Published Properties
```@hpcc-js/codemirror:JSEditor
```
