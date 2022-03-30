# Bullet

<!--meta

-->

The Bullet chart displays a title and subtitle along with three types of values to the right. Each row's values are placed relative to the other values in that row. Their placement is unaffected by the values in other rows.


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Bullet } from "@hpcc-js/chart";

      new Bullet()
          .target("placeholder")
          .columns(["title", "subtitle", "measures"])
          .data([
              ["Revenue", "US$, in thousands", [220, 270, 345]],
              ["Profit  ", "%", [21, 23]],
              ["Order Size", "US$, average", [100, 320, 432]],
              ["New Customers", "count", [1000, 1650, 1943]],
              ["Satisfaction", "out of 5", [3.2, 4.7, 4.9]]
          ])
          .titleColumn("title")
          .subtitleColumn("subtitle")
          .measuresColumn("measures")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>


In this example "markers" have been added. 


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Bullet } from "@hpcc-js/chart";

      new Bullet()
          .target("placeholder")
          .columns(["title", "subtitle", "measures", "markers"])
          .data([
              ["Revenue", "US$, in thousands", [220, 270], [250, 25]],
              ["Profit  ", "%", [21, 23], [26]],
              ["Order Size", "US$, average", [100, 320], [150, 550]],
              ["New Customers", "count", [1000, 1650], [190, 540, 750, 850, 2100]],
              ["Satisfaction", "out of 5", [3.2, 4.7], [4.4]]
          ])
          .titleColumn("title")
          .subtitleColumn("subtitle")
          .measuresColumn("measures")
          .markersColumn("markers")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>


In this example "ranges" have been added. 


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Bullet } from "@hpcc-js/chart";

      new Bullet()
          .target("placeholder")
          .columns(["title", "subtitle", "ranges", "measures", "markers"])
          .data([
              ["Revenue", "US$, in thousands", [150, 225, 300], [220, 270], [250, 25]],
              ["Profit  ", "%", [20, 25, 30], [21, 23], [26]],
              ["Order Size", "US$, average", [350, 500, 600], [100, 320], [550]],
              ["New Customers", "count", [1400, 2000, 2500], [1000, 1650], 2100],
              ["Satisfaction", "out of 5", [3.5, 4.25, 5], [3.2, 4.7], [4.4]]
          ])
          .titleColumn("title")
          .subtitleColumn("subtitle")
          .rangesColumn("ranges")
          .measuresColumn("measures")
          .markersColumn("markers")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>


## API

## Published Properties
```@hpcc-js/chart:Bullet
```
