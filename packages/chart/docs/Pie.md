# Pie

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/Pie.ts#L11",
    "extends": "SVGWidget"
}
```

```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .columns(["Category", "Value"])
    .data([
        ["A", 144],
        ["B", 89],
        ["C", 55],
        ["D", 34]
    ])
    .target("target")
    .render()
    ;
```
```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .columns(["Category", "Value"])
    .data([
        ["A", 144],
        ["B", 89],
        ["C", 55],
        ["D", 34]
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
```@hpcc-js/chart:Pie
```
