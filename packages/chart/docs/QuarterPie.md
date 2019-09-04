# QuarterPie

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/QuarterPie.ts#L3",
    "extends": "Pie"
}
```

```sample-code
import { QuarterPie } from "@hpcc-js/chart";

new QuarterPie()
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
import { QuarterPie } from "@hpcc-js/chart";

new QuarterPie()
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
```@hpcc-js/chart:QuarterPie
```
