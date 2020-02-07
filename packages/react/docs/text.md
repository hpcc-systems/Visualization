# text.tsx

Simple "Text" React Components.

## Text

```sample-code
import { Text, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Text)
    .target("target")
    .prop("anchor", "middle")
    .prop("baseline", "middle")
    .prop("height", 18)
    .prop("fill", "black")
    .prop("text", "Hello and Welcome!")
    .render()
;
```

## Multi Line Text

```sample-code
import { Text, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(Text)
    .target("target")
    .prop("anchor", "middle")
    .prop("baseline", "middle")
    .prop("height", 18)
    .prop("fill", "black")
    .prop("text", "Hello\nand\nWelcome!")
    .render()
;
```

## TextBox

```sample-code
import { TextBox, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(TextBox)
    .target("target")
    .prop("padding", 8)
    .prop("fill", "lightgrey")
    .prop("stroke", "darkgrey")
    .prop("text", "Hello and Welcome!")
    .render()
;
```

## Multi Line TextBox

```sample-code
import { TextBox, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(TextBox)
    .target("target")
    .prop("padding", 8)
    .prop("fill", "lightgrey")
    .prop("stroke", "darkgrey")
    .prop("text", "Hello\nand\nWelcome!")
    .render()
;
```
