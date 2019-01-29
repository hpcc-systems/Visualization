# @hpcc-js/comms
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [Connection](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/comms/Connection.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple Connection+Codemirror</title>
        <script src="https://unpkg.com/@hpcc-js/util"></script>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/comms"></script>
        <script src="https://unpkg.com/@hpcc-js/codemirror"></script>
    </head>
    <body>
        <div id="placeholder" style="width:800px;height:600px;"></div>
        <script>
            new window["@hpcc-js/comms"].Connection({
                    baseUrl: "https://api.pushshift.io/",
                    type: "get"
                })
                .send("reddit/search/submission/", {
                    "subreddit":"askreddit",
                    "sort":"desc",
                    "sort_type":"created_utc",
                    "size":"5",
                }).then((json) => {
                    new window["@hpcc-js/codemirror"].JSONEditor()
                        .target("placeholder")
                        .json(json)
                        .render()
                        ;
                })
                .catch((e) => {
                    console.error(e);
                })
                ;
        </script>
    </body>
</html>
```

## Getting Started with @hpccjs
* _[Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start)_
* _[Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials)_
* _[Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html)_ ([alt](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html))
* _[Wiki](https://github.com/hpcc-systems/Visualization/wiki)_
