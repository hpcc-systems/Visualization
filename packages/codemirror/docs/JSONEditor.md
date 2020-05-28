# JSONEditor

<!--meta

-->

JSONEditor displays an editable snippet of JSON with syntax coloring and code folding.

```sample-code
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
```

JSONEditor extends [Editor](./Editor.md).

## API

## Published Properties
```@hpcc-js/codemirror:JSONEditor
```
