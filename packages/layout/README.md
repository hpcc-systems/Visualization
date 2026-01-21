# @hpcc-js/layout
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/trunk/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [Carousel](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/Carousel.js)
* [ChartPanel](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/Chart%20Panel.js)
* [DockPanel](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/Dock%20Panel.js)
* [FlexGrid](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/FlexGrid.js)
* [HorizontalList](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/HorizontalList.js)
* [Modal](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/Modal.js)
* [VerticalList](https://rawgit.com/hpcc-systems/Visualization/trunk/demos/gallery/playground.html?./samples/layout/VerticalList.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple Carousel</title>
        <script src="https://unpkg.com/@hpcc-js/util"></script>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/chart"></script>
        <script src="https://unpkg.com/@hpcc-js/layout"></script>
    </head>
    <body>
        <div id="placeholder" style="width:800px;height:600px;"></div>
        <script>
            const columns = ["Subject", "Year 1", "Year 2", "Year 3"];
            const data = [
                ["Geography", 75, 68, 65],
                ["English", 45, 55, -52],
                ["Math", 98, 92, 90],
                ["Science", 66, 60, 72]
            ];
            
            const carousel = new window["@hpcc-js/layout"].Carousel()
                .widgets([
                    new window["@hpcc-js/chart"].Pie().columns(columns).data(data),
                    new window["@hpcc-js/chart"].Line().columns(columns).data(data),
                    new window["@hpcc-js/chart"].Column().columns(columns).data(data),
                    new window["@hpcc-js/chart"].Step().columns(columns).data(data)
                ]);
            var active = 0;
            setInterval(function () {
                carousel.active(++active % 4).render();
            }, 3000);
        </script>
    </body>
</html>
```

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="target" style="height:600px">
    </div>
    <script type="module">
        import { Column, Pie, Line, Step } from "@hpcc-js/chart";
        import { Carousel } from "@hpcc-js/layout";

        const columns = ["Subject", "Year 1", "Year 2", "Year 3"];
        const data = [
            ["Geography", 75, 68, 65],
            ["English", 45, 55, -52],
            ["Math", 98, 92, 90],
            ["Science", 66, 60, 72]
        ];

        const carousel = new Carousel()
            .widgets([
                new Pie().columns(columns).data(data),
                new Line().columns(columns).data(data),
                new Column().columns(columns).data(data),
                new Step().columns(columns).data(data)
            ])
            .target("target")
            .render()
            ;

        var active = 0;
        setInterval(function () {
            carousel.active(++active % 4).render();
        }, 3000);
    </script>
  </hpcc-vitepress>
</ClientOnly>