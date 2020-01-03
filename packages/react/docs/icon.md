# icon.tsx

Simple "Icon" React Component, which is a combination of a [Shape](./shape.md) and an [FAChar](./faChar.md)

## Icon

```sample-code
import { Icon, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Icon)
    .target("target")
    .prop("shape", "circle")
    .prop("radius", 64)
    .prop("fill", "lightgrey")
    .prop("stroke", "black")
    .prop("faChar", "")
    .render()
;
```

