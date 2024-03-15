import { Bar } from "@hpcc-js/chart";

new Bar()
    .target("target")
    .columns(["", "Failed", "TODO", "Passed"])
    .data([
        ["Joe Cocker", 10, 10, 10],
        ["Stephen Tyler", 8, 10, 12],
        ["Einar Solberg", 19, 10, 1]
    ])
    .showValue(true)
    .showValueAsPercent("domain")
    .showValueAsPercentFormat(".2%")
    .showDomainTotal(true)
    .yAxisType("linear")
    .yAxisPadding(32)
    .yAxisDomainPadding(0)
    .xAxisType("ordinal")
    .maxPointSize(26)
    .xAxisOrdinalPaddingOuter(0.1)
    .xAxisOrdinalPaddingInner(0.6)
    .xAxisOverlapMode("stagger")
    .valueCentered(true)
    .valueAnchor("middle")
    .xAxisSeriesPaddingInner(3)
    .yAxisStacked(true)
    .yAxisGuideLines(true)
    .yAxisHidden(true)
    .yAxisDomainPadding(0.1)
    .xAxisHidden(false)
    .xAxisFocus(false)
    .xAxisGuideLines(false)
    .render()
    ;
