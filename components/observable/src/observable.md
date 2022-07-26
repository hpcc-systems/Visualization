# Observable

**tag**: `<hpcc-observable>`

<ClientOnly>
  <hpcc-vitepress preview_border="0px" preview_height_ratio=0.6 style="width:100%;height:800px">
    <hpcc-observable style="width:100%;height:100%">
      md`# Covid cases in the world for select countries`

      import { bubblemap } from "@gordonsmith/bubble-map-design-board"

      bubblemap

      md`# Confirmed Cases v Deaths (${my_country}) - ${lastDate.toLocaleDateString("en-US", {dateStyle: "medium"})}`

      chart;

      //  Dependencies
      my_country = "Germany";
      import { chart, lastDate } with { my_country as overrideLocation } from "@gordonsmith/irish-confirmed-cases-v-deaths";
    </hpcc-observable>

    <script type="module">
      import "@hpcc-js/wc-observable";
    </script>
  </hpcc-vitepress>
</ClientOnly>

::: tip
See [Getting Started](../../../README) for details on how to include @hpcc-js/web-components in your application
:::

## `HPCCObservableElement`

## Events

## More Examples

### Observable Markdown

**tag**:  `<hpcc-observable mode="markdown">`

<ClientOnly>
  <hpcc-vitepress preview_border="0px" preview_height_ratio=0.75 style="width:100%;height:800px">
    <hpcc-observable mode="markdown" style="width:100%;height:100%">
      # Liquid Fun

      ```
      canvas;

      //  Dependencies
      import { canvas } from "@mbostock/liquidfun";
      ```
    </hpcc-observable>

    <script type="module">
      import "@hpcc-js/wc-observable";
    </script>
  </hpcc-vitepress>
</ClientOnly>


## Credits

### @observablehq/runtime

_The Observable runtime lets you run Observable notebooks as true reactive programs in any JavaScript environment: on your personal website, integrated into your web application or interactive dashboard. Take your notebook to any distant shore the web platform reaches._

* [Home Page](https://observablehq.com/@observablehq/how-observable-runs)
* [GitHub](https://github.com/observablehq/runtime)

### @observablehq/parser

_Parser for Observable flavour of JavaScript._

* [GitHub](https://github.com/observablehq/parser)

### @observablehq/stdlib

_The Observable standard library._

* [Home Page](https://observablehq.com/@observablehq/standard-library)
* [GitHub](https://github.com/observablehq/stdlib)

### @observablehq/inspector

_This library implements the default value renderer for Observable programs. When used with the Observable runtime as observers, inspectors can insert elements into the DOM and render interactive displays for arbitrary values._

* [GitHub](https://github.com/observablehq/inspector)

