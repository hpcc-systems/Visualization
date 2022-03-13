# Drag and Zoom

**tag**: `<hpcc-zoom>`

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <script type="module">
        import "@hpcc-js/wc-layout";
    </script>

    <hpcc-zoom x="10" y="10" scale="0.63" style="width:100%;height:600px">
      <h1>HTML Ipsum Presents</h1>
      <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
      <h2>Header Level 2</h2>
      <ol>
      <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
      <li>Aliquam tincidunt mauris eu risus.</li>
      </ol>
      <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>
      <h3>Header Level 3</h3>
      <ul>
        <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
        <li>Aliquam tincidunt mauris eu risus.</li>
      </ul>
    </hpcc-zoom>
  </hpcc-vitepress>
</ClientOnly>

::: tip
See [Getting Started](../../../README) for details on how to include @hpcc-js/web-components in your application
:::

## `HPCCZoomElement`

## Events

### `changed`

_Emitted whenever the content is panned or zoomed_

## Credits

### d3-zoom

_Panning and zooming are popular interaction techniques which let the user focus on a region of interest by restricting the view. It is easy to learn due to direct manipulation: click-and-drag to pan (translate), spin the wheel to zoom (scale), or use touch. Panning and zooming are widely used in web-based mapping, but can also be used with visualizations such as time-series and scatterplots._

* [Home Page](https://observablehq.com/collection/@d3/d3-zoom)
* [GitHub](https://github.com/d3/d3-zoom)
