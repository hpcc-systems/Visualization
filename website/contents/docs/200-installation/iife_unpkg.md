---
title: Using "iife" with the "unpkg" Server 
root: '/docs'
parents: ['Installation']
---

[(github sources)](https://github.com/hpcc-systems/Visualization/tree/master/demos/quickstart/iife_unpkg)

The quickest way to get started is to simply reference the required packages directly from "unpkg" servers.  The main downside to this, is that you need to manually include all dependencies and need to take care of global namespace pollution:

```html
<head>
...
    <script src="https://unpkg.com/@hpcc-js/common"></script>
    <script src="https://unpkg.com/@hpcc-js/api"></script>
    <script src="https://unpkg.com/@hpcc-js/chart"></script>
    <script>
        var Column = window["@hpcc-js/chart"].Column;
    </script>
...
</head>

<body>
    <div id="placeholder">
        <!--  Placeholder for Visualization  -->
    </div>
    <script>
        var columnChart = new Column()      //  Create new instance of Column
            .target("placeholder")          //  Nominate target on web page 
            .columns(["Subject", "Result"]) //  Set "Columns"
            .data([                         //  Set "Data"
                ["English", 45],
                ["Irish", 28],
                ["Math", 98],
                ["Geography", 48],
                ["Science", 82]
            ])
            .render()                       //  Render
            ;
    </script>
</body>
```

