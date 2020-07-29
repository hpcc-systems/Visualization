# @hpcc-js/observable-md
_A combination of the [Observable HQ](https://observablehq.com) runtime and Markdown_

Demo:  https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/storyboard/index.html 

##  Hello World

```html
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>@hpcc-js/observable-md</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@hpcc-js/common/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="./index.css">
    <script src="https://cdn.jsdelivr.net/npm/@hpcc-js/observable-md/dist/index.full.js" type="text/javascript" charset="utf-8"></script>
    <script>
        var omdMod = window["@hpcc-js/observable-md"]
    </script>
</head>

<body onresize="doResize()">
    <div id="placeholder">
    </div>
    <script>
        var app = new omdMod.ObservableMD()
            .target("placeholder")
            .markdown("" +
"# ${hw} ${tick}                    \n" +
"                                   \n" +
"```                                \n" +
"hw = 'Hello' + 'World';            \n" +
"tick = {                           \n" +
"  let i = 0;                       \n" +
"  while (true) {                   \n" +
"    yield ++i;                     \n" +
"  }                                \n" +
"}                                  \n" +
"```                                \n")
            ;

        doResize();

        function doResize() {
            if (app) {
                app
                    .resize()
                    .lazyRender()
                    ;
            }
        }
    </script>
</body>

</html>
```
