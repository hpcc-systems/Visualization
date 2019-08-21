# Area

_Column chart (vertical bars with an X/Y Axis)_

```sample-code
import { Column } from "@hpcc-js/chart";

new Column()
    .target("target")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .render()
    ;
```

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/Area.ts#L3",
    "extends": "Scatter"
}
```

```javascript
import { Column } from "@hpcc-js/chart";

new Column()
    .target("target")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:Column
```
