# HexBin

```meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/HexBin.ts#L9",
    "extends": "XYAxis"
}
```

```sample-code
import { HexBin } from "@hpcc-js/chart";

new HexBin()
    .columns(["Value 1", "Value 2"])
    .data(getData())
    .target("target")
    .xAxisType("linear")
    .render()
    ;
function getData(){
    const data = Array(1000).fill(1)
        .map((n,i)=>{
            return [
                Math.round(Math.random() * 100),
                Math.round(Math.random() * 100)
            ]
        })
        .filter(n=>n[0] - n[1] > 0)
        ;
    console.log(data);
    return data;
}
```

## API

## Published Properties
```@hpcc-js/chart:HexBin
```
