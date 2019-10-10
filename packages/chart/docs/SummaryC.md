# SummaryC

<!--meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/SummaryC.ts#L4",
    "extends": "CanvasWidget"
}
-->

SummaryC is commonly used to emphasize significant data points within a dashboard. It requires _labelColumn_ and _valueColumn_ to be specified.

```sample-code
import { SummaryC } from "@hpcc-js/chart";

new SummaryC()
    .target("target")
    .columns(["Summary", "Score"])
    .data([
        ["Cars", 128]
    ])
    .labelColumn("Summary")
    .valueColumn("Score")
    .render()
    ;
```

_icon_ can be set to an empty string to prevent the default icon from displaying.

_fontSizeRatio_ can be used to set the font size ration between the value size and the label size.

```sample-code
import { SummaryC } from "@hpcc-js/chart";

new SummaryC()
    .target("target")
    .columns(["Summary", "Score"])
    .data([
        ["Cars", 128]
    ])
    .labelColumn("Summary")
    .valueColumn("Score")
    .icon("")
    .fontSizeRatio(0.38)
    .render()
    ;
```

_icon_ can also be used to assign a FontAwesome icon by class.

_iconSizeRatio_ can be used to control the icon's size relative to the overall height.

_colorFill_ sets the background color.

_colorStroke_ sets the text and icon color.

_iconBaseline_ controls the vertical placement of the icon.

```sample-code
import { SummaryC } from "@hpcc-js/chart";

new SummaryC()
    .target("target")
    .columns(["Summary", "Score"])
    .data([
        ["Users", 256]
    ])
    .labelColumn("Summary")
    .valueColumn("Score")
    .icon("fa-users")
    .colorFill("#eeeeee")
    .colorStroke("#30336b")
    .iconSizeRatio(0.5)
    .iconBaseline("middle")
    .render()
    ;
```

_playInterval_ can be used to cycle through multiple data rows. In the below example the play interval is set to 2000 milliseconds (two seconds).

```sample-code
import { SummaryC } from "@hpcc-js/chart";

new SummaryC()
    .target("target")
    .columns(["Summary", "Score", "Icon"])
    .data([
        ["Cars", 128, "fa-automobile"],
        ["Trucks", 64, "fa-truck"]
    ])
    .labelColumn("Summary")
    .valueColumn("Score")
    .iconColumn("Icon")
    .playInterval(2000)
    .render()
    ;
```

_iconColumn_, _colorFillColumn_ and _colorStrokeColumn_ can be set to designate data row columns for these properties. This allows the properties to change for each data row.

```sample-code
import { SummaryC } from "@hpcc-js/chart";

new SummaryC()
    .target("target")
    .columns(["Summary", "Score", "Icon", "Background", "TextColor"])
    .data([
        ["Cold days", 56, "fa-thermometer-0", "#95a5a6", "#34495e"],
        ["Cool days", 120, "fa-thermometer-1", "white", "#2980b9"],
        ["Warm days", 130, "fa-thermometer-2", "#f1c40f", "#d35400"],
        ["Hot days", 59, "fa-thermometer-3", "#c0392b", "#ecf0f1"]
    ])
    .labelColumn("Summary")
    .valueColumn("Score")
    .iconColumn("Icon")
    .colorFillColumn("Background")
    .colorStrokeColumn("TextColor")
    .playInterval(2000)
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:SummaryC
```
