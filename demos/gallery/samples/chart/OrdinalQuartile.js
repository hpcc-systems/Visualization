import { OrdinalQuartile } from "@hpcc-js/chart";

new OrdinalQuartile()
    .target("target")
    .columns(["Min","25%","50%","75%","Max"])
    .data([122,315,456,987,1354])
    .roundedCorners(8)
    .lineWidth(4)
    .dataHeight(80)
    .textPadding(8)
    .edgePadding(80)
    .labelFontSize(14)
    .valueFontSize(14)
    .lineColor("#333")
    .labelTextRotation(-60)
    .valueTextRotation(-60)
    .render()
    ;
