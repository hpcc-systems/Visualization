# Palette

Palettes are managed in a global pool (by name / id), so that they can be shared between visualization instances.  Not only is the range of colors shared, but also (in the case of Ordinal) any associations are also shared.  

IOW if **Chart A** and **Chart B** are sharing the _category10_ `paletteID` and **Chart A** associates "red" with the word "Year 4", if **Chart B** also contains a data point called "Year 4" it will automatically be assigned the same Color (red).

* **Chart A** - assigned palette _category10_:

```sample-code
import { Bar } from "@hpcc-js/chart";

new Bar()
    .target("target")
    .paletteID("category10")
    .columns(["Subject", "Year 1", "Year 2", "Year 3", "Year 4"])
    .data([
        ["Geography", 75, 68, 65, 45],
        ["English", 45, 55, 52, 46],
        ["Math", 98, 92, 90, 47],
        ["Science", 66, 60, 72, 48]
    ])
    .yAxisDomainLow(0)
    .yAxisDomainHigh(100)
    .render()
    ;
```

* **Chart B** - also assigned palette _category10_:

```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .target("target")
    .paletteID("category10")
    .columns(["Category", "Value"])
    .data([
        ["Year 1", 34],
        ["Year 5", 34],
        ["Year 6", 55],
        ["Year 4", 89]
    ])
    .render()
    ;
```

**Note:**  "Year 1" and "Year 4" have been assigned consistent coloring!

If this behavior is undesirable, then individual widgets can set _useClonedPalette_ to `true`, then they will have their own local cloned copy:

* **Chart C** - assigned a "cloned" copy of palette _category10_:

```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .target("target")
    .paletteID("category10")
    .useClonedPalette(true)
    .columns(["Category", "Value"])
    .data([
        ["Year 1", 34],
        ["Year 5", 34],
        ["Year 6", 55],
        ["Year 4", 89]
    ])
    .render()
    ;
```

**Note:**  "Year 5" and "Year 6" now have the same colors as "Year 2" and "Year 3" from the first example above.

##  Ordinal

Ordinal palettes are typically used in visualizations with discrete values.  They include the following defaults:

```sample
import { OrdinalSample } from "./palette/ordinal.js";

const os = new OrdinalSample()
    .target("target")
    .render()
    ;
```

### Palette.ordinal

<!--meta:Palette.ordinal
{
    "id": 19908,
    "name": "ordinal",
    "kind": 32,
    "kindString": "Variable",
    "flags": {
        "isExported": true,
        "isConst": true
    },
    "sources": [
        {
            "fileName": "Palette.ts",
            "line": 318,
            "character": 20
        }
    ],
    "type": {
        "type": "reference",
        "name": "fetchOrdinalItem",
        "id": 19873
    },
    "defaultValue": " fetchOrdinalItem",
    "folder": "packages/common",
    "signatures": [
        {
            "id": 19874,
            "name": "fetchOrdinalItem",
            "kind": 4096,
            "kindString": "Call signature",
            "flags": {},
            "type": {
                "type": "array",
                "elementType": {
                    "type": "intrinsic",
                    "name": "string"
                }
            }
        },
        {
            "id": 19875,
            "name": "fetchOrdinalItem",
            "kind": 4096,
            "kindString": "Call signature",
            "flags": {},
            "parameters": [
                {
                    "id": 19876,
                    "name": "id",
                    "kind": 32768,
                    "kindString": "Parameter",
                    "flags": {},
                    "type": {
                        "type": "intrinsic",
                        "name": "string"
                    }
                },
                {
                    "id": 19877,
                    "name": "colors",
                    "kind": 32768,
                    "kindString": "Parameter",
                    "flags": {
                        "isOptional": true
                    },
                    "type": {
                        "type": "array",
                        "elementType": {
                            "type": "intrinsic",
                            "name": "string"
                        }
                    }
                }
            ],
            "type": {
                "type": "reference",
                "name": "ordinalPalleteFunc",
                "id": 19869
            }
        }
    ]
}
-->

Usage:
* `Palette.ordinal()`:  Returns a string array containing all the known ordinal palette IDs (equivalent to _Palette.ordinal.fetchOrdinalItem()_).
* `Palette.ordinal("hpcc10")`: Returns a function object that can then be used to convert string constants to colors (see example below).
* `Palette.ordinal("StarStipes", ["red", "white", "blue"])`:  Create a new ordinal palette called "StarStipes" with the supplied colors and returns a function object that can then be used to convert string constants to colors (see example below).

### Creating a custom palette

```javascript
import { Palette } from "@hpcc-js/common";

const defPalette = Palette.ordinal("default");
const jbPalette = Palette.ordinal("Jackie Brown", ["#BAA378", "#382E1C", "#453823", "#BAA378", "#2C2416", "#C0A172"]);

const a_color = defPalette("Year 1");
const another_color = jbPalette("Year 2");


```

### Using a custom palette

```sample-code
import { Palette } from "@hpcc-js/common";
import { Bubble } from "@hpcc-js/chart";

Palette.ordinal("Pretty in Pink", ["#ffc2cd", "#ff93ac", "#ff6289", "#fc3468", "#ff084a"]);

new Bubble()
    .target("target")
    .paletteID("Pretty in Pink")
    .columns(["Year", "Value"])
    .data([
        ["Year 1", 34],
        ["Year 5", 34],
        ["Year 6", 55],
        ["Year 4", 89]
    ])
    .render()
    ;
```

##  Rainbow

Rainbow palettes are used with visualizations that represent a range of values.  They include the following defaults:

```sample
import { RainbowSample } from "./palette/ordinal.js";

const os = new RainbowSample()
    .target("target")
    .render()
    ;
``` 

### Palette.rainbow

<!--meta:Palette.rainbow
{
    "id": 19909,
    "name": "rainbow",
    "kind": 32,
    "kindString": "Variable",
    "flags": {
        "isExported": true,
        "isConst": true
    },
    "sources": [
        {
            "fileName": "Palette.ts",
            "line": 319,
            "character": 20
        }
    ],
    "type": {
        "type": "reference",
        "name": "fetchRainbowItem",
        "id": 19890
    },
    "defaultValue": " fetchRainbowItem",
    "folder": "packages/common",
    "signatures": [
        {
            "id": 19891,
            "name": "fetchRainbowItem",
            "kind": 4096,
            "kindString": "Call signature",
            "flags": {},
            "type": {
                "type": "array",
                "elementType": {
                    "type": "intrinsic",
                    "name": "string"
                }
            }
        },
        {
            "id": 19892,
            "name": "fetchRainbowItem",
            "kind": 4096,
            "kindString": "Call signature",
            "flags": {},
            "parameters": [
                {
                    "id": 19893,
                    "name": "id",
                    "kind": 32768,
                    "kindString": "Parameter",
                    "flags": {},
                    "type": {
                        "type": "intrinsic",
                        "name": "string"
                    }
                },
                {
                    "id": 19894,
                    "name": "colors",
                    "kind": 32768,
                    "kindString": "Parameter",
                    "flags": {},
                    "type": {
                        "type": "array",
                        "elementType": {
                            "type": "intrinsic",
                            "name": "string"
                        }
                    }
                },
                {
                    "id": 19895,
                    "name": "steps",
                    "kind": 32768,
                    "kindString": "Parameter",
                    "flags": {
                        "isOptional": true
                    },
                    "type": {
                        "type": "intrinsic",
                        "name": "number"
                    }
                }
            ],
            "type": {
                "type": "reference",
                "name": "rainbowPalleteFunc",
                "id": 19884
            }
        }
    ]
}
-->

* `Palette.rainbow()`:  Returns a string array containing all the known rainbow palette IDs.
* `Palette.rainbow("hpcc10")`: Returns a function object that can then be used to convert values to a color on the rainbow (see example below).
* `Palette.rainbow("StarStipes", ["red", "white", "blue"])`:  Create a new rainbow palette called "StarStipes" with the supplied colors and returns a function object that can then be used to convert values to a color on the rainbow (see example below).

### Creating a custom palette

```javascript
import { Palette } from "@hpcc-js/common";

const shadesPalette = Palette.rainbow("Shades", ["#BAA378", "#382E1C", "#453823", "#BAA378", "#2C2416", "#C0A172"]);

const col1 = shadesPalette(33, 0, 100);     //  col1 = "#3f3420"
const col2 = shadesPalette(66, 0, 100);     //  col2 = "#8e7c5a"


```

### Using a custom palette

```sample-code
import { Palette } from "@hpcc-js/common";
import { ColumnFormat, Table } from "@hpcc-js/dgrid";

Palette.rainbow("Shades", ["#BAA378", "#382E1C", "#453823", "#BAA378", "#2C2416", "#C0A172"]);

new Table()
    .columnFormats([
        new ColumnFormat()
            .column("Series-1")
            .paletteID("Shades")
    ])
    .target("target")
    .columns(["Series-1"])
    .data([[0], [3], [4], [6], [9], [10], [12], [12], [14], [15], [21], [23]])
    .render()
    ;
```
