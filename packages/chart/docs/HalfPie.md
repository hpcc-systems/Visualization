# HalfPie

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/HalfPie.ts#L3",
    "extends": "Pie"
}
```

```sample-code
import { HalfPie } from "@hpcc-js/chart";

new HalfPie()
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
import { HalfPie } from "@hpcc-js/chart";

new HalfPie()
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
```@hpcc-js/chart:HalfPie
```
