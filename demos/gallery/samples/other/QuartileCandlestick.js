import { QuartileCandlestick } from "@hpcc-js/chart";

new QuartileCandlestick()
    .target("target")
    .columns(["Min","25%","50%","75%","Max"])
    .data([122,315,456,987,1354])
    .lineWidth(10)
    .candleWidth(80)
    .textPadding(8)
    .labelFontSize(14)
    .valueFontSize(14)
    .lineColor("#333")
    .innerRectColor("white")
    .upperTextRotation(-60)
    .lowerTextRotation(-60)
    .edgePadding(10)
    .roundedCorners(0)
    .render()
    ;
