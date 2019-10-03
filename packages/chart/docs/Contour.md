# Contour

<!--meta
{
    "id": 6230,
    "name": "Contour",
    "kind": 128,
    "kindString": "Class",
    "flags": {
        "isExported": true
    },
    "sources": [
        {
            "fileName": "Contour.ts",
            "line": 7,
            "character": 20
        },
        {
            "fileName": "Contour.ts",
            "line": 75,
            "character": 24
        }
    ],
    "extendedTypes": [
        {
            "type": "reference",
            "name": "XYAxis",
            "id": 693
        }
    ],
    "folder": "packages/chart"
}
-->

Contour and [HexBin](./HexBin.md) serve a similar purpose. They summarize high density data across two continuous axes.

```sample-code
import { Contour } from "@hpcc-js/chart";

new Contour()
    .target("target")
    .columns(["X-Value", "Y-Value"])
    .data(randomData(1000))
    .xAxisType("linear")
    .render()
    ;

function randomData(count){
    return Array(count).fill(1).map((n,x)=>{
        const y = Math.sqrt(x) * Math.random();
        return [x,y];
    });
}
```

_contourBandwidth_ can be used to control the standard deviation of the contour algorithm. The results can be seen in the below example.

```sample-code
import { Contour } from "@hpcc-js/chart";

let bandwidth = 10;

const widget = new Contour()
    .target("target")
    .columns(["X-Value", "Y-Value"])
    .data(randomData(1000))
    .xAxisType("linear")
    .xAxisTickCount(10)
    .contourBandwidth(bandwidth)
    .render()
    ;

function randomData(count){
    return Array(count).fill(1).map((n,x)=>{
        const y = Math.sqrt(x) * Math.random();
        return [x,y];
    });
}
let interval = 10;
setInterval(function(){
    const next = bandwidth + interval;
    if(next > 100 || next <= 0){
        interval *= -1;
    }
    bandwidth += interval;
    widget
        .xAxisTitle("bandwidth = " + bandwidth)
        .contourBandwidth(bandwidth)
        .render()
        ;
},1000);
```

For documentation on axis-specific properties take a look at the [Axis Documentation](./XYAxis.md).

## API

## Published Properties
```@hpcc-js/chart:Contour
```
