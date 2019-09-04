# QuartileCandlestick

<!--meta
{
    "source": "https://github.com/hpcc-systems/Visualization/blob/master/packages/chart/src/QuartileCandlestick.ts#L4",
    "extends": "SVGWidget"
}
-->

QuartileCandlestick displays a five number summary of a range of numeric values. The five-number summary is the minimum, first quartile, median, third quartile, and maximum.

```sample-code
import { QuartileCandlestick } from "@hpcc-js/chart";

new QuartileCandlestick()
    .target("target")
    .columns(["Min","25%","50%","75%","Max"])
    .data([100,250,350,400,500])
    .render()
    ;
```

_orientation_ can be used to render this chart either vertically or horizontally.

_lineWidth_ and _candleWidth_ can be used to set the pixel width of the lines and the overall pixel width of the drawn portion of this chart respectively. _candleWidth_ also controls the height of the drawn portion while using 'horizontal' orientation.

_edgePadding_ sets the pixel padding between the edges of the containing element and the minimum/maximum lines.

_roundedCorners_ sets the pixel radius of the drawn lines.

_upperTextRotation_ and _lowerTextRotation_ sets the degrees of rotation for the column labels and column values respectively.

```sample-code
import { QuartileCandlestick } from "@hpcc-js/chart";

new QuartileCandlestick()
    .target("target")
    .columns(["Min","25%","50%","75%","Max"])
    .data([100,200,300,400,500])
    .orientation("vertical")
    .lineWidth(2)
    .candleWidth(80)
    .edgePadding(20)
    .roundedCorners(0)
    .upperTextRotation(-90)
    .lowerTextRotation(-90)
    .render()
    ;
```

_lineColor_ sets the fill color of the lines.

_textColor_ sets the fill color of the labels and values.

_innerRectColor_ sets the fill color of the inner rectangles between the first and third quartiles.

```sample-code
import { QuartileCandlestick } from "@hpcc-js/chart";

new QuartileCandlestick()
    .target("target")
    .columns(["Min","25%","50%","75%","Max"])
    .data([100,250,350,400,500])
    .orientation("vertical")
    .lineColor("#999")
    .textColor("#555")
    .innerRectColor("#000")
    .lineWidth(2)
    .candleWidth(80)
    .edgePadding(20)
    .roundedCorners(0)
    .upperTextRotation(-90)
    .lowerTextRotation(-90)
    .render()
    ;
```

_showLabels_ and _showValues_ are true by default but can be used to hide the labels and values.

```sample-code
import { QuartileCandlestick } from "@hpcc-js/chart";

new QuartileCandlestick()
    .target("target")
    .columns(["Min","25%","50%","75%","Max"])
    .data([1,497,498,499,500])
    .showLabels(false)
    .showValues(false)
    .lineColor("#999")
    .innerRectColor("#000")
    .lineWidth(2)
    .candleWidth(80)
    .edgePadding(20)
    .roundedCorners(0)
    .upperTextRotation(-90)
    .lowerTextRotation(-90)
    .render()
    ;
```

## API

## Published Properties
```@hpcc-js/chart:QuartileCandlestick
```
