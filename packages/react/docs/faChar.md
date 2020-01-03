# faChar.tsx

Simple "Font Awesome" character

## fa-question

Copy and past unicode char into code:

```sample-code
import { FAChar, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(FAChar)
    .target("target")
    .prop("height", 64)
    .prop("fill", "lightgrey")
    .prop("stroke", "black")
    .prop("faChar", "")
    .render()
;
```

## fa-user

...or use fa-* identifier

```sample-code
import { FAChar, SVGAdapter } from "@hpcc-js/react";

new SVGAdapter(FAChar)
    .target("target")
    .prop("height", 64)
    .prop("fill", "lightgrey")
    .prop("stroke", "black")
    .prop("faChar", "fa-user")
    .render()
;
```

