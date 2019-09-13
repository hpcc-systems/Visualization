# Area

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/Area.ts#L3",
    "extends": "Scatter"
}
```

An area chart represents the change in one or more series over a continuous or discrete axis. Data points are plotted and then connected by line segments to show the value of a quantity at several different intervals.
```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
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
Two or more series are commonly compared with an area chart.
```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
    .columns(["Category", "Value 1", "Value 2"])
    .data([
        ["A", 34, 90],
        ["B", 55, 50],
        ["C", 89, 75],
        ["D", 144, 66]
    ])
    .target("target")
    .showValue(true)
    .render()
    ;
```
An area chart supports n-number of numeric values per data row. A series is created for each column as needed. 
```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
    .columns(["Category", "Value 1", "Value 2", "Value 3"])
    .data([
        ["A", 34, 90, 82],
        ["B", 55, 50, 65],
        ["C", 89, 75, 43],
        ["D", 144, 66, 56]
    ])
    .target("target")
    .render()
    ;
```
For documentation on axis-specific properties, like those used in the below example, take a look at the [Axis Documentation](./Axis.md)</a>.
```sample-code
import { Area } from "@hpcc-js/chart";

new Area()
    .columns(["Value 1", "Value 2"])
    .data([
        [144, 90],
        [89, 50],
        [55, 75],
        [34, 66]
    ])
    .target("target")
    .xAxisType("linear")
    .xAxisTitle("X-Axis Title")
    .yAxisTitle("Y-Axis Title")
    .xAxisTickCount(30)
    .xAxisOverlapMode("rotate")
    .xAxisLabelRotation(90)
    .pointShape("circle")
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:Area
```
