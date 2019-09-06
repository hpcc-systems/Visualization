# Column

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/Column.ts#L10",
    "extends": "XYAxis"
}
```

```sample-code
import { Column } from "@hpcc-js/chart";

new Column()
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 144]
    ])
    .target("target")
    .yAxisDomainLow(0)
    .render()
    ;
```
```sample-code
import { Column } from "@hpcc-js/chart";

new Column()
    .columns(["Category", "Value 1", "Value 2"])
    .data([
        ["A", 34, 90],
        ["B", 55, 50],
        ["C", 89, 75],
        ["D", 144, 66]
    ])
    .target("target")
    .xAxisOrdinalPaddingInner(0.38)
    .xAxisOrdinalPaddingOuter(0.62)
    .xAxisFocus(true)
    .render()
    ;
```
```sample-code
import { Column } from "@hpcc-js/chart";

new Column()
    .columns(["Category", "Value 1", "Value 2", "Value 3"])
    .data([
        ["A", 34, 90, 82],
        ["B", 55, 50, 65],
        ["C", 89, 75, 43],
        ["D", 144, 66, 56]
    ])
    .target("target")
    .showValue(true)
    .valueCentered(true)
    .yAxisStacked(true)
    .render()
    ;
```
```sample-code
import { Column } from "@hpcc-js/chart";

new Column()
    .columns(["Value 1", "Value 2"])
    .data([
        [144, 90],
        [89, 50],
        [55, 75],
        [34, 66]
    ])
    .target("target")
    .xAxisType("linear")
    .render()
    ;
```
```sample-code
import { Column } from "@hpcc-js/chart";

new Column()
    .columns(["Value 1", "Value 2", "Value 3"])
    .data([
        [34, 90, 82],
        [55, 50, 65],
        [89, 75, 43],
        [144, 66, 56]
    ])
    .target("target")
    .xAxisType("linear")
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:Column
```
