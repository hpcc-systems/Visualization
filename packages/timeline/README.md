# @hpcc-js/timeline
This package is part of the mono repository "@hpcc-js" (aka Visualization Framework), for more information including [Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start), [Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html) and [Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials), please visit the main page on GitHub:  [hpcc-systems/Visualization](https://github.com/hpcc-systems/Visualization).

## Exported Widgets
* [MiniGantt](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/playground.html?./samples/misc/Mini%20Gantt.js)

## Stand-alone HTML Example
```html
<html>
    <head>
        <title>Simple MiniGantt</title>
        <script src="https://unpkg.com/@hpcc-js/util"></script>
        <script src="https://unpkg.com/@hpcc-js/common"></script>
        <script src="https://unpkg.com/@hpcc-js/api"></script>
        <script src="https://unpkg.com/@hpcc-js/chart"></script>
        <script src="https://unpkg.com/@hpcc-js/timeline"></script>
    </head>
    <body>
        <div id="placeholder" style="width:800px;height:600px;"></div>
        <script>
            var chart = new window["@hpcc-js/timeline"].MiniGantt()
                .target("placeholder")
                .columns(["Label", "start", "end"])
                .data([
                    ["Range #1","2004-01-04T01:36:44.0Z","2005-10-05T01:59:16.0Z",""],
                    ["Range #2","2004-03-07T17:12:44.0Z","2004-12-07T02:16:06.0Z",""],
                    ["Range #3","2004-07-20T18:10:42.0Z","2005-07-22T02:30:31.0Z",""],
                    ["Range #4","2004-09-09T05:53:17.0Z","2005-01-10T07:40:42.0Z",""],
                    ["Event #1","2004-09-09T21:43:52.0Z"],
                    ["Range #5","2005-01-04T05:30:36.0Z","2005-11-17T11:51:53.0Z",""],
                    ["Range #6","2005-01-22T20:57:02.0Z","2005-06-12T05:28:33.0Z",""],
                    ["Range #7","2005-04-18T15:26:23.0Z","2005-07-23T08:46:24.0Z",""],
                    ["Range #8","2005-05-25T16:01:00.0Z","2005-06-17T23:18:56.0Z",""],
                    ["Range #9","2005-06-19T09:38:40.0Z","2005-07-16T17:17:16.0Z",""]
                ])
                .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                .render();
        </script>
    </body>
</html>
```

## Getting Started with @hpccjs
* _[Quick Start](https://github.com/hpcc-systems/Visualization/wiki/Quick-Start)_
* _[Tutorials](https://github.com/hpcc-systems/Visualization/wiki/Tutorials)_
* _[Gallery](https://raw.githack.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html)_ ([alt](https://rawgit.com/hpcc-systems/Visualization/master/demos/gallery/gallery.html))
* _[Wiki](https://github.com/hpcc-systems/Visualization/wiki)_
