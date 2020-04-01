import * as hpccChart from "@hpcc-js/chart";
import * as commonMod from "@hpcc-js/common";
import * as hpccLayout from "@hpcc-js/layout";
import { div } from "./util";

const Charts = {
    area: "Area",
    bar: "Bar",
    bubble: "Bubble",
    bubbleXY: "BubbleXY",
    bullet: "Bullet",
    column: "Column",
    contour: "Contour",
    gantt: "Gantt",
    gauge: "Gauge",
    halfPie: "HalfPie",
    hexBin: "HexBin",
    line: "Line",
    pie: "Pie",
    quarterPie: "QuarterPie",
    quartileCandlestick: "QuartileCandlestick",
    radar: "Radar",
    radialBar: "RadialBar",
    scatter: "Scatter",
    statChart: "StatChart",
    step: "Step",
    wordCloud: "WordCloud"
};

function chartFactory(type) {
    return function* (props: { title?: string, height?: number, [key: string]: any } = {}) {
        // const hpccChart = await import("@hpcc-js/chart");
        // const hpccLayout = await import("@hpcc-js/layout");
        const chart = new hpccChart[type]();
        const cp = new hpccLayout.ChartPanel()
            .widget(chart)
            .on("click", (row, col, sel) => {
                _div.notify(sel ? {
                    col,
                    row: row.__lparam || row
                } : null);
            })
            ;

        const _div = div([cp, chart], props);

        yield _div;

        _div.widget
            .target(_div)
            .lazyRender()
            ;
    };
}

let palID = 0;
export const chart = {
    async createOrdinalPalette(items: { [fieldID: string]: string }) {
        // const commonMod = await import("@hpcc-js/common");
        const id = "pal_" + ++palID;
        const fields = Object.keys(items);
        const colors = fields.map(f => items[f]);
        const pal = commonMod.Palette.ordinal(id, colors);
        fields.map(pal);
        return id;
    }
};

for (const key in Charts) {
    chart[key] = chartFactory(Charts[key]);
}
