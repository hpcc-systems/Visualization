# Bullet

<!--meta
{
    "id": 5809,
    "name": "Bullet",
    "kind": 128,
    "kindString": "Class",
    "flags": {
        "isExported": true
    },
    "sources": [
        {
            "fileName": "Bullet.ts",
            "line": 7,
            "character": 19
        }
    ],
    "extendedTypes": [
        {
            "type": "reference",
            "name": "HTMLWidget"
        }
    ],
    "folder": "packages/chart"
}
-->

The Bullet chart displays a title and subtitle along with three types of values to the right. Each row's values are placed relative to the other values in that row. Their placement is unaffected by the values in other rows.

```sample-code
import { Bullet } from "@hpcc-js/chart";

new Bullet()
    .target("target")
    .columns(["title", "subtitle", "measures"])
    .data([
        ["Revenue", "US$, in thousands", [220, 270, 345]],
        ["Profit  ", "%", [21, 23]],
        ["Order Size", "US$, average", [100, 320, 432]],
        ["New Customers", "count", [1000, 1650, 1943]],
        ["Satisfaction", "out of 5", [3.2, 4.7, 4.9]]
    ])
    .titleColumn("title")
    .subtitleColumn("subtitle")
    .measuresColumn("measures")
    .render()
    ;
```

In this example "markers" have been added. 

```sample-code
import { Bullet } from "@hpcc-js/chart";

new Bullet()
    .target("target")
    .columns(["title", "subtitle", "measures", "markers"])
    .data([
        ["Revenue", "US$, in thousands", [220, 270], [250, 25]],
        ["Profit  ", "%", [21, 23], [26]],
        ["Order Size", "US$, average", [100, 320], [150, 550]],
        ["New Customers", "count", [1000, 1650], [190, 540, 750, 850, 2100]],
        ["Satisfaction", "out of 5", [3.2, 4.7], [4.4]]
    ])
    .titleColumn("title")
    .subtitleColumn("subtitle")
    .measuresColumn("measures")
    .markersColumn("markers")
    .render()
    ;
```

In this example "ranges" have been added. 

```sample-code
import { Bullet } from "@hpcc-js/chart";

new Bullet()
    .target("target")
    .columns(["title", "subtitle", "ranges", "measures", "markers"])
    .data([
        ["Revenue", "US$, in thousands", [150, 225, 300], [220, 270], [250, 25]],
        ["Profit  ", "%", [20, 25, 30], [21, 23], [26]],
        ["Order Size", "US$, average", [350, 500, 600], [100, 320], [550]],
        ["New Customers", "count", [1400, 2000, 2500], [1000, 1650], 2100],
        ["Satisfaction", "out of 5", [3.5, 4.25, 5], [3.2, 4.7], [4.4]]
    ])
    .titleColumn("title")
    .subtitleColumn("subtitle")
    .rangesColumn("ranges")
    .measuresColumn("measures")
    .markersColumn("markers")
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:Bullet
```
