# Pie

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/Pie.ts#L11",
    "extends": "SVGWidget"
}
```

A circular statistical graphic, which is divided into slices to illustrate numerical proportion. In a pie chart, the arc length of each slice, is proportional to the quantity it represents. (See also: [HalfPie](#./HalfPie.md) and [QuarterPie](#./QuarterPie.md) )
```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 144]
    ])
    .target("target")
    .render()
    ;
```
In the below example the 'showSeriesValue' is used to display the value next to each slice label.
```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 144]
    ])
    .target("target")
    .showSeriesValue(true)
    .render()
    ;
```
In the below example the 'innerRadius' is used to transform the pie chart into a donut chart.
'showSeriesPercentage' displays the percentage next to each slice label.
```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 144]
    ])
    .target("target")
    .innerRadius(62)
    .showSeriesPercentage(true)
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:Pie
```
