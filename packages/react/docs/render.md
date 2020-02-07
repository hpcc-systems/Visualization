# render.tsx

Renderer contains several functions / adapters to simplify the rendering of react components within a HPCC Widget.

The common example is a `SVGAdapter` which creates an SVG Element and renders the SVG React Component.

```sample-code
import { Icon, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Icon)
    .target("target")
    .prop("shape", "square")
    .prop("height", 64)
    .prop("fill", "lightgrey")
    .prop("stroke", "black")
    .prop("faCharFill", "black")
    .prop("faChar", "fa-user")
    .render()
;
```

Alternative use:

```sample-code
import { Icon, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Icon)
    .target("target")
    .props({
        shape: "square",
        height: 64,
        fill: "pink",
        stroke: "black",
        faCharFill: "black",
        faChar: "fa-plus"
    })
    .render()
    ;
```

Custom JSX:

```sample-code
import { React, SVGAdapter } from "@hpcc-js/react";

export const Circle = ({
    radius = 32,
    fill = "navy",
    stroke = fill
}) => <circle r={radius} fill={fill} stroke={stroke} />;

new SVGAdapter(Circle)
    .target("target")
    .props({
        fill: "pink",
        stroke: "black"
    })
    .render()
    ;

```
