## AMD Examples
The below examples illustrate how to display a widget from scratch, using AMD (RequireJS):

#### HPCC Column Chart (CDN)
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <!-- Configuration Scripts -->
    <script src="//viz.hpccsystems.com/v1.6.6/dist-amd/hpcc-viz.js"></script> <!-- RequireJS Library Auto Loads -->
    <script src="//viz.hpccsystems.com/v1.6.6/dist-amd/hpcc-bundles.js"></script>
    <script> 
        require.config({
            paths: {
                "src": "//viz.hpccsystems.com/v1.6.6/dist-amd",
                "font-awesome": "//viz.hpccsystems.com/v1.6.6/dist-amd/font-awesome/css/font-awesome.min",
                "amchartsImg": "//viz.hpccsystems.com/v1.6.6/dist-amd/img/amcharts/" /* Only needed if using AmCharts */
            }
        });
    </script>
</head>
    <body>
        <!-- HPCC Column Chart Widget -->
        <div id="widget-wrapper"></div>
        <script>
            require(["src/chart/Column"], function (Column) {
                var columnWidget = new Column()
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
            });
        </script>
    </body>
</html>
```
<h4>Output:</h4>
<p align="center">
  <img src="../../images/hpcc-column-chart.jpg" alt="HPCC Column Chart"/>
</p>