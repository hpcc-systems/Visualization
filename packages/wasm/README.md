# @hpcc-js/graphviz
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Bundling @hpcc-js/wasm?
If you bundle @hpcc-js/wasm with tools like rollupjs or webpack, note that the `wasm` files will not be included by default and should be copied to the target location as part of your build process.
Note:  The wasm files will get loaded "on demand" via the emscripten `moduleize` wrapper, which uses "fetch" to load it from the same location as the JS wrapper (which will be inside your bundled file).  This may cause issues when web pages are loaded with a `file://./somefile.html` type URN. 

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple Bar Chart</title>
        <script src="https://unpkg.com/@hpcc-js/graphviz"></script>
    </head>
    <body>
        <div id="placeholder"></div>
        <script>
            const dot = `
                digraph G {
                    node [shape=rect];

                    subgraph cluster_0 {
                        style=filled;
                        color=lightgrey;
                        node [style=filled,color=white];
                        a0 -> a1 -> a2 -> a3;
                        label = "process #1";
                    }

                    subgraph cluster_1 {
                        node [style=filled];
                        b0 -> b1 -> b2 -> b3;
                        label = "process #2";
                        color=blue
                    }

                    start -> a0;
                    start -> b0;
                    a1 -> b3;
                    b2 -> a3;
                    a3 -> a0;
                    a3 -> end;
                    b3 -> end;

                    start [shape=Mdiamond];
                    end [shape=Msquare];
                }
            `;
            doLayout(dot, "svg", "dot").then(svg => {
                const div = document.getElementByID("placholder");
                div.innerHTML = svg;
            });
        </script>
    </body>
</html>
```

## Getting Started with @hpccjs
* _[Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start)_
* _[Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials)_
* _[Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html)_ ([alt](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html))
* _[Wiki](https://github.com/hpcc-systems/Visualization/wiki)_
