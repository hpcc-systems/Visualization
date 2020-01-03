# vertex.tsx

"Vertex" React Component - replacement for Vertex widget used in Graphs, which is a combination of a [Icon](./icon.md) and an [TextBox](./text.md)

```sample-code
import { Vertex, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Vertex)
    .target("target")
    .prop("icon", {
        faChar: "fa-user",
        height: 64,
        stroke: "black"
        
    })
    .prop("text", "Hello And Welcome!")
    .prop("textHeight", 12)
    .render()
;
```
