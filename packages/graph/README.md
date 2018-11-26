# @hpcc-js/graph
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [Sankey](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/graph/Sankey.js)
* [Graph](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/graph/Les%20Miserables.js) / [Graph (Example 2)](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/graph/Different%20Nodes.js)
* [Subgraph](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/graph/Custom%20Colors.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple Graph</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <script src="https://unpkg.com/@hpcc-js/util"></script>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/graph"></script>
    </head>
    <body>
        <div id="placeholder" style="width:400px;height:400px;"></div>
        <script>
            var verts = [
                { "name": "John Doe", "icon": "" },
                { "name": "Jane Doe", "icon": "" },
                { "name": "123 Main Street", "icon": "", "centroid": true }
            ].map(node=>{
                return new window["@hpcc-js/graph"].Vertex()
                    .text(node.name)
                    .faChar(node.icon)
                    ;
            });
            var chart = new window["@hpcc-js/graph"].Graph()
                .target("placeholder")
                .layout("Circle")
                .data({
                    vertices: verts,
                    edges: [
                        new window["@hpcc-js/graph"].Edge().sourceVertex(verts[2]).targetVertex(verts[0]),
                        new window["@hpcc-js/graph"].Edge().sourceVertex(verts[2]).targetVertex(verts[1]),
                    ]
                })
                .render();
            console.log("Other layout options:",chart.__meta_layout.set);
        </script>
    </body>
</html>
```