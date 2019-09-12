# QuarterPie

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/QuarterPie.ts#L3",
    "extends": "Pie"
}
```

<a href="#chart_Pie" onclick="showPageByClass('chart_Pie')">Pie</a>, <a href="#chart_HalfPie" onclick="showPageByClass('chart_HalfPie')">HalfPie</a> and <a href="#chart_QuarterPie" onclick="showPageByClass('chart_QuarterPie')">QuarterPie</a> are effectively the same class, but have different starting and ending angles. They support all of the same properties.
```sample-code
import { QuarterPie } from "@hpcc-js/chart";

new QuarterPie()
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
```sample-code
import { QuarterPie } from "@hpcc-js/chart";

new QuarterPie()
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
    .showSeriesValue(true)
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:QuarterPie
```
