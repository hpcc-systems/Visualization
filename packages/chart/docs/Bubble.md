# Bubble

<!--meta

-->

A bubble chart represents a categorical data by displaying circles sized relative to each category's value. The circles are sized automatically to fit their target element.

```sample-code
import { Bubble } from "@hpcc-js/chart";

new Bubble()
    .target("target")
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 144]
    ])
    .render()
    ;
```

_paletteID_ can be used to assign an ordinal color palette.

_selectionGlowColor_ can be used to change the glow color when a bubble is selected.

```sample-code
import { Bubble } from "@hpcc-js/chart";

new Bubble()
    .target("target")
    .columns(["Category", "Value"])
    .data([
        ["A", 34],
        ["B", 55],
        ["C", 89],
        ["D", 1440]
    ])
    .paletteID("FlatUI_British")
    .selectionGlowColor("#00FF00")
    .render()
    ;
```

For documentation on tooltip properties, take a look at the [Tooltip Documentation](../packages/common/docs/Tooltip.md)

## API

## Published Properties
```@hpcc-js/chart:Bubble
```
