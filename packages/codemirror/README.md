# @hpcc-js/codemirror
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [ECLEditor](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/codemirror/ECLEditor.js)
* [JSEditor](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/codemirror/JSEditor.js)
* [JSONEditor](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/codemirror/JSONEditor.js)
* [XMLEditor](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/codemirror/XMLEditor.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple JSONEditor</title>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/codemirror"></script>
    </head>
    <body>
        <div id="placeholder" style="width:400px;height:400px;"></div>
        <script>
            var code = {"fruit": "Apple","size": "Large","color": "Red"};

            new window["@hpcc-js/codemirror"].JSONEditor()
                .target("placeholder")
                .json(code)
                .render()
                ;
        </script>
    </body>
</html>
```