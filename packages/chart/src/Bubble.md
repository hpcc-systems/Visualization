# Bubble

<!--meta

-->

A bubble chart represents a categorical data by displaying circles sized relative to each category's value. The circles are sized automatically to fit their target element.


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Bubble } from "@hpcc-js/chart";

      new Bubble()
          .target("placeholder")
          .columns(["Category", "Value"])
          .data([
              ["A", 34],
              ["B", 55],
              ["C", 89],
              ["D", 144]
          ])
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>


_paletteID_ can be used to assign an ordinal color palette.

_selectionGlowColor_ can be used to change the glow color when a bubble is selected.


<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Bubble } from "@hpcc-js/chart";

      new Bubble()
          .target("placeholder")
          .columns(["Category", "Value"])
          .data([
              ["A", 34],
              ["B", 55],
              ["C", 89],
              ["D", 1440]
          ])
          .paletteID("FlatUI_British")
          .selectionGlowColor("#00FF00")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>


<!-- For documentation on tooltip properties, take a look at the [Tooltip Documentation](../../common/docs/Tooltip.md) -->

## API

## Published Properties
```@hpcc-js/chart:Bubble
```
