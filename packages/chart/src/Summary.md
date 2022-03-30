# Summary

<!--meta

-->

Summary is commonly used to emphasize significant data points within a dashboard. It requires _labelColumn_ and _valueColumn_ to be specified.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Summary } from "@hpcc-js/chart";

      new Summary()
          .target("placeholder")
          .columns(["Summary", "Score"])
          .data([
              ["Cars", 128]
          ])
          .labelColumn("Summary")
          .valueColumn("Score")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

_icon_ can be set to an empty string to prevent the default icon from displaying.

_hideMoreWrapper_ can hide the 'more info' section.

_textFontSize_ can be used to set the label font size.

_headerFontSize_ can be used to set the value font size.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Summary } from "@hpcc-js/chart";

      new Summary()
          .target("placeholder")
          .columns(["Summary", "Score"])
          .data([
              ["Cars", 128]
          ])
          .labelColumn("Summary")
          .valueColumn("Score")
          .icon("")
          .hideMoreWrapper(true)
          .headerFontSize(120)
          .textFontSize(20)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

_icon_ can also be used to specify a class to be given to the icon's html element. In the example below a FontAwesome class is assigned.

_colorFill_ sets the background color.

_colorStroke_ sets the text and icon color.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Summary } from "@hpcc-js/chart";

      new Summary()
          .target("placeholder")
          .columns(["Summary", "Score"])
          .data([
              ["Users", 256]
          ])
          .labelColumn("Summary")
          .valueColumn("Score")
          .icon("fa-users")
          .colorFill("#eeeeee")
          .colorStroke("#30336b")
          .hideMoreWrapper(true)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

_moreIcon_ can be used to specify a class to be given to the 'more info' icon's html element. In the example below a FontAwesome class is assigned.

_moreText_ can be used to specify content for the 'more info' section.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Summary } from "@hpcc-js/chart";

      new Summary()
          .target("placeholder")
          .columns(["Summary", "Score"])
          .data([
              ["Users", 256]
          ])
          .labelColumn("Summary")
          .valueColumn("Score")
          .icon("fa-users")
          .colorFill("#eeeeee")
          .colorStroke("#30336b")
          .moreIcon("fa-user-md")
          .moreText("32 doctors")
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

_moreIcon_ can also be set to an empty string to prevent the default icon from displaying.

If _moreTextHTML_ is set to _true_ then the content within _moreText_ will be rendered as HTML.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Summary } from "@hpcc-js/chart";

      new Summary()
          .target("placeholder")
          .columns(["Summary", "Score"])
          .data([
              ["Tweets", 512]
          ])
          .labelColumn("Summary")
          .valueColumn("Score")
          .icon("fa-twitter")
          .colorFill("#eeeeee")
          .colorStroke("#30336b")
          .moreIcon("")
          .moreText("<button onclick=\"alert('More info here')\">Click for more info</button>")
          .moreTextHTML(true)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

_playInterval_ can be used to cycle through multiple data rows. In the below example the play interval is set to 2000 milliseconds (two seconds).

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Summary } from "@hpcc-js/chart";

      new Summary()
          .target("placeholder")
          .columns(["Summary", "Score"])
          .data([
              ["Cars", 128],
              ["Trucks", 64]
          ])
          .labelColumn("Summary")
          .valueColumn("Score")
          .icon("")
          .hideMoreWrapper(true)
          .headerFontSize(120)
          .textFontSize(20)
          .playInterval(2000)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

_iconColumn_, _moreIconColumn_, _moreTextColumn_, _colorFillColumn_ and _colorStrokeColumn_ can be set to designate data row columns for these properties. This allows the properties to change for each data row.

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="height:400px">
    </div>
    <script type="module">
      import { Summary } from "@hpcc-js/chart";

      new Summary()
          .target("placeholder")
          .columns(["Summary", "Score", "Icon", "MoreIcon", "Details", "Background", "TextColor"])
          .data([
              ["Cars", 128, "fa-automobile", "fa-truck", "64 Trucks", "grey", "black"],
              ["Cold days", 256, "fa-thermometer-empty", "fa-thermometer", "16 Hot days", "#30336b", "white"]
          ])
          .labelColumn("Summary")
          .valueColumn("Score")
          .iconColumn("Icon")
          .moreTextColumn("Details")
          .moreIconColumn("MoreIcon")
          .colorFillColumn("Background")
          .colorStrokeColumn("TextColor")
          .playInterval(2000)
          .render()
          ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

## API

## Published Properties

```@hpcc-js/chart:Summary
```
