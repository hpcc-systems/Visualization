# shape.tsx

Simple "Shape" React Components.

## Circle

```sample-code
import { Circle, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Circle)
    .target("target")
    .prop("radius", 64)
    .prop("fill", "lightgrey")
    .prop("stroke", "black")
    .render()
;
```

## Square

```sample-code
import { Square, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Square)
    .target("target")
    .prop("radius", 64)
    .prop("cornerRadius", 5)
    .prop("fill", "lightgrey")
    .prop("stroke", "black")
    .render()
;
```

## Rectangle

```sample-code
import { Rectangle, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Rectangle)
    .target("target")
    .prop("width", 128)
    .prop("height", 64)
    .prop("cornerRadius", 5)
    .prop("fill", "lightgrey")
    .prop("stroke", "black")
    .render()
;
```

## Shape

Single component which can be a `square`:

```sample-code
import { Shape, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Shape)
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

...or a `circle`:

```sample-code
import { Shape, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Shape)
    .target("target")
    .prop("shape", "circle")
    .prop("height", 64)
    .prop("fill", "lightgrey")
    .prop("stroke", "black")
    .prop("faCharFill", "black")
    .prop("faChar", "fa-user")
    .render()
;
```
