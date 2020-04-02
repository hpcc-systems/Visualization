import { require as d3Require } from "d3-require";
import { placeholder } from "./util";

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
    return async function* (props: { title?: string, height?: number, [key: string]: any } = {}) {
        const [hpccChart, hpccLayout] = await Promise.all([d3Require("@hpcc-js/chart"), d3Require("@hpcc-js/layout")]);
        const chart = new hpccChart[type]();
        const cp = new hpccLayout.ChartPanel()
            .widget(chart)
            ;

        const { div, widget } = placeholder(cp, props);

        yield div;

        widget
            .target(div)
            .lazyRender()
            ;
    };
}

let palID = 0;
export const chart = {
    async createOrdinalPalette(items: { [fieldID: string]: string }) {
        const hpccCommon = await d3Require("@hpcc-js/common");
        const id = "pal_" + ++palID;
        const fields = Object.keys(items);
        const colors = fields.map(f => items[f]);
        const pal = hpccCommon.Palette.ordinal(id, colors);
        fields.map(pal);
        return id;
    }
};

for (const key in Charts) {
    chart[key] = chartFactory(Charts[key]);
}
