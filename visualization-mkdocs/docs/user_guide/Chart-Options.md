## Chart Options

### Publish Parameters

Chart options can be set with functions called _"Publish Parmeters"_.

Publish Parameters are desgined to be self documenting, with the name describing their function. They can be discovered and possible values explored via the [Dermatology](http://rawgit.com/hpcc-systems/Visualization/master/demos/dermatology.html) and [Playground](http://rawgit.com/hpcc-systems/Visualization/master/apps/SampleSite/playground.html) pages.

#### Example Usage

```javascript
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
    .stacked(true) // <----- Publish Parameter (sets Column Chart to display stacked columns)
    .render()
```

-----------------------------------------------------------------------------------------------------

There are currently 7 kinds of Publish Parameters:

* [set](#set)<br>
* [html-color](#html-color)<br>
* [boolean](#boolean)<br>
* [number](#number)<br>
* [string](#string)<br>
* [array](#array)<br>
* [object](#object)<br>

#### set

Set Publish Parameters are parameters with a fixed set of possible values that are predefined per widget.

#### html-color

A html-color Publish Parameter allows you to specify a HEX color value in the format: ```(#FFFFFF)```

#### boolean

A boolean Publish Parameter accepts one of two values: ```true``` or ```false```

#### number

A number Publish Parameter can accept any javascript number as a value. Ex: ```1000```, ```0.5```, ```1-e-6```

#### string

A string Publish Parameter accepts a string input and is normally used for displaying the specified value based on what the Publish Parameter does.

#### array

An array Publish Parameter accepts an array or array of arrays (dependent on the invidual parameter). Ex: ["value1","value2"]

#### object

A object Publish Parameter accepts an object for input and its many values utilized for the parameters purpose. Ex: {}



