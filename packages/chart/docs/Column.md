# Column

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/Column.ts#L10",
    "extends": "XYAxis"
}
```

[Bar](./Bar.md) and Column are effectively the same class, but have one different default value - their _orientation_. They support all of the same properties.
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
Two or more series are commonly compared with a column chart.
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
A column chart supports n-number of numeric values per data row. A series is created for each column as needed.  In the below example the series' are stacked together using the _yAxisStacked_ property.
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

## API

## Published Properties
```@hpcc-js/chart:Column
```
