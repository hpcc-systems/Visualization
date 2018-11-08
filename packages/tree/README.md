# @hpcc-js/tree
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [CirclePacking](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/tree/Circle%20Packing/Circle%20Packing.js)
* [Dendrogram](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/tree/Dendrogram/Circular.js)
* [Indented](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/tree/Indented/Indented.js)
* [Sunburst](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/tree/Sunburst/Sunburst.js)
* [Treemap](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/tree/Tree%20Map/Tree%20Map.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple Dendrogram</title>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/tree"></script>
    </head>
    <body>
        <div id="placeholder" style="width:600px;height:180px;"></div>
        <script>
            var chart = new window["@hpcc-js/tree"].Dendrogram()
                .target("placeholder")
                .data({
                    label: "analytics",
                    children: [
                        {
                            label: "cluster",
                            children: [
                                { label: "AgglomerativeCluster" },
                                { label: "CommunityStructure"  },
                                { label: "HierarchicalCluster" },
                                { label: "MergeEdge" }
                            ]
                        },
                        {
                            label: "graph",
                            children: [
                                { label: "BetweennessCentrality"},
                                { label: "LinkDistance"},
                                { label: "MaxFlowMinCut"},
                                { label: "ShortestPaths"},
                                { label: "SpanningTree"}
                            ]
                        },
                    ]
                })
                .render();
        </script>
    </body>
</html>
```