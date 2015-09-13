# Getting Started
Installation details for both  [users](https://github.com/hpcc-systems/Visualization/wiki#end-users) and  [developers](https://github.com/hpcc-systems/Visualization/wiki#developers) are found below. 

What follow are a number of examples that illustrate how to use the HPCC platform, and we begin with the obligatory hello world example!
```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">   
    <link rel="stylesheet" type="text/css" href="../src/common/TextBox.css">
    <link rel="stylesheet" type="text/css" href="../src/common/Text.css">
    <link rel="stylesheet" type="text/css" href="../src/common/Shape.css">
    <script src="http://rawgit.com/jrburke/requirejs/2.1.17/require.js"></script>
    <script src="../src/config.js"></script>
    <script>
        require(["../src/common/TextBox"], function (TextBox) {
            new TextBox()
                    .target("helloWorld")
                    .text("Hello\nWorld!")
                    .render()
            ;
        });
    </script>
</head>
<body>
<div id="helloWorld" style="width:100%; height:100vh">
</div>
</body>
</html>
```

RequireJS is called with the inclusion of

    <script src="http://rawgit.com/jrburke/requirejs/2.1.17/require.js"></script>
    
and it allows the opening of all our js files without their inclusion in the header.


## 2. A simple Bar Chart

[Demo](http://rawgit.com/Evan1415/hpcc_viz/master/HELLO_WORLD_EXAMPLES/Bar.html)

In this example we will just include a simple bar chart, embedding the source data in the actual html file. Loading files will come up later. 
The data used illustrates the average frequency of letters that occur in a given sentence. 

``` html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="../src/amchart/Bar.css">
    <script src="http://rawgit.com/jrburke/requirejs/2.1.17/require.js"></script>
    <script src="../src/config.js"></script>
    <script>
        require(["../src/amchart/Bar"], function (AmBar) {
            new AmBar()
                    .target("ambar")
                    .columns(["Letter", "Frequency"])
                    .data([
                        ['A', .08167],
                        ['B', .01492],
                        ['C', .02782],
                        ['D', .04253],
                        ['E', .12702],
                        ['F', .02288],
                        ['G', .02015],
                        ['H', .06094],
                        ['I', .06966],
                        ['J', .00153],
                        ['K', .00772],
                        ['L', .04025],
                        ['M', .02406],
                        ['N', .06749],
                        ['O', .07507],
                        ['P', .01929],
                        ['Q', .00095],
                        ['R', .05987],
                        ['S', .06327],
                        ['T', .09056],
                        ['U', .02758],
                        ['V', .00978],
                        ['W', .02360],
                        ['X', .00150],
                        ['Y', .01974],
                        ['Z', .00074],
                    ])
                    .render()
            ;
        });
    </script>
</head>
<body>
<div id="ambar" style="width:100%; height:100vh">
</div>
</body>
</html>

## 3. A simple Pie Chart

[Demo](http://rawgit.com/Evan1415/hpcc_viz/master/HELLO_WORLD_EXAMPLES/Pie.html)
In this example we display the most popular operating systems in a pie chart. 
``` html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="../src/google/Pie.css">
    <script src="http://rawgit.com/jrburke/requirejs/2.1.17/require.js"></script>
    <script src="../src/config.js"></script>
    <script>
        require(["../src/google/Pie"], function (GPie) {
            new GPie()
                    .target("gpie")
                    .testData()
                    .render()
            ;
        });
    </script>
</head>
<body>
<div id="gpie" style="width:100%; height:100vh">
</div>

</body>
</html>
```
Instead of inserting data manually the .testData() method calls the data in this case, which is contained in INDChart.js
