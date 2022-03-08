# Split Panel

**tag**: `<hpcc-splitpanel>`

<ClientOnly>
  <hpcc-preview preview_border="0px" style="width:100%;height:600px">
    <hpcc-splitpanel orientation="horizontal" style="width:100%;height:100%">
      <div style="overflow:auto;min-width:48px">
        <h1>AAA Ipsum Presents</h1>
        <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
      </div>
      <div style="overflow:auto;min-width:48px">
        <h1>BBB Ipsum Presents</h1>
        <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
      </div>
    </hpcc-splitpanel>
  </hpcc-preview>
</ClientOnly>

::: tip
See [Getting Started](../../../../README) for details on how to include @hpcc-js/web-components in your application
:::

## `HPCCSplitPanelElement`

## Events

### `changed`

_Emitted whenever the content is panned or zoomed_

## More Examples

### Vertical

**tag**:  `<hpcc-splitpanel orientation="vertical">`

<ClientOnly>
  <hpcc-preview preview_border="0px" style="width:100%;height:600px">
    <hpcc-splitpanel orientation="vertical" style="width:100%;height:100%">
      <div style="overflow:auto;min-height:48px">
        <h1>HTML Ipsum Presents</h1>
        <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
      </div>
      <div style="overflow:auto;min-height:48px">
        <h1>HTML Ipsum Presents</h1>
        <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
      </div>
    </hpcc-splitpanel>
  </hpcc-preview>
</ClientOnly>

### Horizontal and vertical

**tag:**  `<hpcc-splitpanel>` and `<hpcc-splitpanel orientation="vertical">`

<ClientOnly>
  <hpcc-preview preview_border="0px" style="width:100%;height:600px">
    <hpcc-splitpanel orientation="horizontal" style="width:100%;height:100%">
      <div style="overflow:auto;min-width:48px">
        <h1>HTML Ipsum Presents</h1>
        <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
      </div>
      <hpcc-splitpanel orientation="vertical" style="width:100%;height:100%;border:0px;padding:0px;min-width:48px">
        <div style="overflow:auto;min-height:48px">
          <h1>HTML Ipsum Presents</h1>
          <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
        </div>
        <div style="overflow:auto;min-height:48px">
          <h1>HTML Ipsum Presents</h1>
          <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
        </div>
      </hpcc-splitpanel>
    </hpcc-splitpanel>
  </hpcc-preview>
</ClientOnly>

## Credits

### Lumino

_Lumino is a set of JavaScript packages, written in TypeScript, that provide a rich toolkit of widgets, layouts, events, and data structures. These enable developers to construct extensible high-performance desktop-like web applications, such as JupyterLab. Lumino was formerly known as PhosphorJS._

* [Home Page](https://lumino.readthedocs.io/en/latest/)
* [GitHub](https://github.com/jupyterlab/lumino)
