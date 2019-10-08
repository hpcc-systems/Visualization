# Radar

<!--meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/Radar.ts#L6",
    "extends": "SVGWidget"
}
-->

Radar displays continuous data across n-number of categories (rows) and n-number of series (columns).

```sample-code
import { Radar } from "@hpcc-js/chart";

new Radar()
    .target("target")
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 144]
    ])
    .render()
    ;
```

_fontFamily_ and _fontSize_ can be used to control the font family and size used for the labels and guidelines.

_pointShape_ and _pointSize_ can be used to control the shape and size of the data points. 

```sample-code
import { Radar } from "@hpcc-js/chart";

new Radar()
    .target("target")
    .columns(["Hour", "Value"])
    .data([
        ["Dec", 134],
        ["Jan", 95],
        ["Feb", 80],
        ["Mar", 65],
        ["Apr", 59],
        ["May", 51],
        ["Jun", 58],
        ["Jul", 72],
        ["Aug", 79],
        ["Sep", 104],
        ["Oct", 134],
        ["Nov", 124]
    ])
    .fontFamily("Verdana")
    .fontSize(14)
    .pointShape("circle")
    .pointSize(3)
    .render()
    ;
```

_fillOpacity_ can be used to control the opacity of the background color created by each series.

_valueGuideRatios_ can be used to control placement, and count, of the guide lines.

_labelPaddingRatio_ shrinks the chart's visible area between its column labels.

```sample-code
import { Radar } from "@hpcc-js/chart";

new Radar()
    .target("target")
    .columns(["Category", "Value 1", "Value 2"])
    .data([
        ["A", 34, 190],
        ["B", 55, 150],
        ["C", 89, 35],
        ["D", 144, 36]
    ])
    .valueGuideRatios([0.5, 1.0])
    .labelPaddingRatio(0.8)
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:Radar
```
