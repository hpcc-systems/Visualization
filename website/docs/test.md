# Hello and Welcome

This is a test markdown for documentation purposes!

##  Header 2

* Some JS source code:

```javascript
import { Pie } from "@hpcc-js/chart";

new Pie()
    .target("target")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75],
        ["English", 45],
        ["Math", 98],
        ["Science", 66]
    ])
    .render()
    ;
```

* Another exmaple:

```javascript
import { Column } from "@hpcc-js/chart";

new Column()
    .target("target")
    .columns(["Subject", "Year 1", "Year 2", "Year 3"])
    .data([
        ["Geography", 75, 68, 65],
        ["English", 45, 55, -52],
        ["Math", 98, 92, 90],
        ["Science", 66, 60, 72]
    ])
    .render()
    ;
```

```pp_Column
```


What else...
