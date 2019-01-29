# @hpcc-js/other
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [CalendarHeatMap](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/time/Calendar.js)
* [IconList](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/misc/IconList.js)
* [Html](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/other/Html.js)
* [MorphText](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/other/MorphText.js)
* [HeatMap](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/other/HeatMap.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple CalendarHeatMap</title>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/other"></script>
    </head>
    <body>
        <div id="placeholder" style="width:400px;height:400px;"></div>
        <script>
            var columns = ["Date", "Value"];
            var data = [
                ["2019-08-30", "8835.96"],
                ["2019-08-29", "9857.98"],
                ["2019-08-28", "10809.85"],
                ["2019-08-27", "11860.03"],
                ["2019-08-24", "12664.39"]
            ];
            new window["@hpcc-js/other"].CalendarHeatMap()
                .columns(columns)
                .data(data)
                .dateColumn("Date")
                .aggrColumn("Value")
                .aggrType("mean")
                .target("placeholder")
                .render()
                ;
        </script>
    </body>
</html>
```