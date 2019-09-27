# HTMLEditor

<!--meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/HTMLEditor.ts#L3",
    "extends": "Editor"
}
-->

HTMLEditor displays an editable snippet of HTML with syntax coloring and code folding.

```sample-code
import { HTMLEditor } from "@hpcc-js/codemirror";

new HTMLEditor()
    .html(`\
<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>hpcc-js</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="packages/util/dist/index.js"></script>
        <script src="packages/common/dist/index.js"></script>
        <script src="packages/api/dist/index.js"></script>
        <script src="packages/codemirror/dist/index.js"></script>
    </head>
    <body onload="alert('hello world')">
        <div id="target" style="width:500px;height:500px;"></div>
    </body>
</html>
`)
    .target("target")
    .render()
    ;

```

## API

## Published Properties
```@hpcc-js/codemirror:HTMLEditor
```
