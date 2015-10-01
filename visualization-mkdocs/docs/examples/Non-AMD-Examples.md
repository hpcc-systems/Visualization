## Non-AMD Examples
The below examples illustrate how to display a widget from scratch, using the Non-AMD Release:

#### HPCC Column Chart (CDN)
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="//viz.hpccsystems.com/v1.6.6/dist/hpcc-viz.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
    <script src="//cdn.rawgit.com/jeanlauliac/colorbrewer/v1.0.0/colorbrewer.js"></script>
    <script src="//viz.hpccsystems.com/v1.6.6/dist/hpcc-viz-common.js"></script>
    <script src="//viz.hpccsystems.com/v1.6.6/dist/hpcc-viz-layout.min.js"></script>
    <script src="//viz.hpccsystems.com/v1.6.6/dist/hpcc-viz-api.js"></script>
    <script src="//viz.hpccsystems.com/v1.6.6/dist/hpcc-viz-other.min.js"></script>
    <script src="//viz.hpccsystems.com/v1.6.6/dist/hpcc-viz-chart.min.js"></script>
</head>
    <body>
        <!-- HPCC Column Chart Widget -->
        <div id="widget-wrapper"></div>
        <script>
            var columnWidget = new chart_Column()
                .size({width:500,height:300})
                .target("widget-wrapper")
                .columns(["Subject", "Year 1"])
                .data([
                    ["Geography", 75],
                    ["English", 45],
                    ["Math", 98],
                    ["Science", 66]
                ])
                .on("click",  function(d) { console.log('Override Click: ' + JSON.stringify(d)); })
                .render()
            ;
        </script>
    </body>
</html>
```
