# HexBin

<!--meta

-->

HexBin and [Contour](./Contour.md) serve a similar purpose. They summarize high density data across two continuous axes.


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { HexBin } from "@hpcc-js/chart";

      new HexBin()
          .target("placeholder")
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
    </script>
  </hpcc-vitepress>
</ClientOnly>


_binSize_ can be used to set the size of the hexagon bins. The results can be seen in the below example.


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { HexBin } from "@hpcc-js/chart";

      let binSize = 5;

      const widget = new HexBin()
          .target("placeholder")
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
    </script>
  </hpcc-vitepress>
</ClientOnly>


For documentation on axis-specific properties take a look at the [Axis Documentation](./XYAxis.md).

## API

## Published Properties
```@hpcc-js/chart:HexBin
```
