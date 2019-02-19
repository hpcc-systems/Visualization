# @hpcc-js/phosphor
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [DockPanel](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/layout/Dock%20Panel.js)
* [TabPanel](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/layout/TabPanel.js)
* [SplitPanel](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/layout/SplitPanel.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple DockPanel</title>
        <script src="https://unpkg.com/@hpcc-js/util"></script>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/chart"></script>
        <script src="https://unpkg.com/@hpcc-js/phosphor"></script>
    </head>
    <body>
        <div id="placeholder" style="width:800px;height:600px;"></div>
        <script>
            const columns = ["Subject", "Result"];
            const data = [
                ["English", 45],
                ["Irish", 28],
                ["Math", 98],
                ["Geography", 48],
                ["Science", 82]
            ];
            const area = new window["@hpcc-js/chart"].Area()
                .columns(columns)
                .data(data);
            const line = new window["@hpcc-js/chart"].Line()
                .columns(columns)
                .data(data);
            const bubble = new window["@hpcc-js/chart"].Bubble()
                .columns(columns)
                .data(data);
            new window["@hpcc-js/phosphor"].DockPanel()
                .addWidget(area, "<drag me>")
                .addWidget(bubble, "<drag me>", "split-right", area)
                .addWidget(line, "<drag me>", "split-bottom", area)
                .target("placeholder")
                .render();
        </script>
    </body>
</html>
```

## Getting Started with @hpccjs
* _[Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start)_
* _[Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials)_
* _[Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html)_ ([alt](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html))
* _[Wiki](https://github.com/hpcc-systems/Visualization/wiki)_
