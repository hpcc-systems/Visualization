import { Column } from "../Column";
import { Pie } from "../Pie";

export class Test3 extends Column {

    constructor() {
        super();
        this
            .columns(["", "Dismissed", "Pending", "Assigned"])
            .data([
                ["Joe Cocker", 10, 1, 10],
                ["Steve Tyler", 20, 2, 11],
                ["Einar Solberg", 30, 3, 12]
            ])
            // .paletteID("siuReportPalette")
            .showValue(true)
            .showValueAsPercent("domain")
            .yAxisPadding(16)
            .yAxisDomainPadding(0)
            // .showValueAsPercentFormat(".2%")
            .showDomainTotal(true)
            .yAxisType("linear")
            .xAxisType("ordinal")
            // .maxPointSize(26)
            .xAxisOrdinalPaddingOuter(0.1)
            .xAxisOrdinalPaddingInner(0.6)
            .xAxisOverlapMode("stagger")
            .valueCentered(true)
            .valueAnchor("middle")
            // .xAxisSeriesPaddingInner(3)
            .yAxisStacked(true)
            .yAxisGuideLines(true)
            .yAxisHidden(true)
            .xAxisHidden(false)
            .xAxisFocus(false)
            .xAxisGuideLines(false)
            .render()
            ;
    }
}

export class Test1 extends Pie {

    constructor() {
        super();
        this.columns(["Subject", "Result"])
            .data([
                ["English", 45],
                ["Irish", 28],
                ["Math", 98],
                ["Geography", 48],
                ["Science", 82]
            ])
            .on("click", () => {
                setTimeout(() => {
                    this.selection([]);
                }, 1000);
                setTimeout(() => {
                    const data = this.data();
                    const rndIdx = Math.floor(Math.random() * data.length);
                    //  this.selection(data[rndIdx]);
                    this.selectByLabel(data[rndIdx][0]);
                }, 2000);
            })
            ;
    }
}

