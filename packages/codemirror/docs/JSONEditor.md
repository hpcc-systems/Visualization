# JSONEditor

<!--meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/JSONEditor.ts#L3",
    "extends": "Editor"
}
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

## API

## Published Properties
```@hpcc-js/codemirror:JSONEditor
```
