# @hpcc-js/html
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [BooleanInput](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/html/FieldsetForm.js)
* [NumberInput](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/html/FieldsetForm.js)
* [SetInput](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/html/FieldsetForm.js)
* [StringInput](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/html/FieldsetForm.js)
* [FieldsetForm](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/html/FieldsetForm.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple StringInput</title>
        <script src="https://unpkg.com/@hpcc-js/util"></script>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/html"></script>
    </head>
    <body>
        <div id="placeholder" style="width:800px;height:600px;"></div>
        <script>
            var widget = new window["@hpcc-js/html"].StringInput()
                .target("placeholder")
                .label("Enter Some Text")
                .fixedWidth(160)
                .render()
                ;
        </script>
    </body>
</html>
```

## Getting Started with @hpccjs
* _[Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start)_
* _[Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials)_
* _[Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html)_ ([alt](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html))
* _[Wiki](https://github.com/hpcc-systems/Visualization/wiki)_
