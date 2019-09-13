# @hpcc-js (aka Viz Framework 2.0)

---

```sample-carousel
```
_**Note**:  The above samples are randomly loaded from the [gallery website](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html)_

---

The **"@hpcc-js"** (Viz Framework 2.0) repository consists of a set of JavaScript packages containing **Visualizations**, **Layouts**, **Utilities** and **Communication Helpers**.

The primary motivation was to present a common API / Pattern for third party and bespoke visualizations, that can be **discovered** and **serialized** automatically.

_The obligatory Hello World example:_
```sample-code
import { Pie } from "@hpcc-js/chart";

new Pie()
    .target("target")
    .columns(["Label", "Weight"])
    .data([
        ["Hello", 42],
        ["World", 64]
    ])
    .render()
    ;
```

All packages are available via **NPM** / **CDN**, have been bundled in **es2015** compatible **UMD** packages and include **TypeScript Definitions**.


## Contents

* Getting Started:
    *   [Installation](#./installation.md)
    *   [Tutorial](#./tutorial.md)
    