# Contour

<!--meta

-->

Contour and [HexBin](./HexBin.md) serve a similar purpose. They summarize high density data across two continuous axes.


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Contour } from "@hpcc-js/chart";

      new Contour()
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


_contourBandwidth_ can be used to control the standard deviation of the contour algorithm. The results can be seen in the below example.


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Contour } from "@hpcc-js/chart";

      let bandwidth = 10;

      const widget = new Contour()
          .target("placeholder")
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
    </script>
  </hpcc-vitepress>
</ClientOnly>


For documentation on axis-specific properties take a look at the [Axis Documentation](./XYAxis.md).

## API

## Published Properties
```@hpcc-js/chart:Contour
```
