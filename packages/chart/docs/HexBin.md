# HexBin

<!--meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/HexBin.ts#L9",
    "extends": "XYAxis"
}
-->

HexBin and [Contour](./Contour.md) serve a similar purpose. They summarize high density data across two continuous axes.

```sample-code
import { HexBin } from "@hpcc-js/chart";

new HexBin()
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

_binSize_ can be used to set the size of the hexagon bins. The results can be seen in the below example.

```sample-code
import { HexBin } from "@hpcc-js/chart";

let binSize = 5;

const widget = new HexBin()
    .target("target")
    .columns(["X-Value", "Y-Value"])
    .data(randomData(1000))
    .xAxisType("linear")
    .xAxisTickCount(10)
    .binSize(binSize)
    .render()
    ;

function randomData(count){
    return Array(count).fill(1).map((n,x)=>{
        const y = Math.sqrt(x) * Math.random();
        return [x,y];
    });
}
let interval = 5;
setInterval(function(){
    const next = binSize + interval;
    if(next > 20 || next <= 0){
        interval *= -1;
    }
    binSize += interval;
    widget
        .xAxisTitle("binSize = " + binSize)
        .binSize(binSize)
        .render()
        ;
},1000);
```

For documentation on axis-specific properties take a look at the [Axis Documentation](./XYAxis.md).

## API

## Published Properties
```@hpcc-js/chart:HexBin
```
