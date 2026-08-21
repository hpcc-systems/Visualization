import { ReactTimelineSeries } from "@hpcc-js/timeline";
import { LabelledRect } from "@hpcc-js/react";

const timeline = new ReactTimelineSeries()
    .rangeRenderer(LabelledRect)
    .target("target")
    .columns(["Label", "start", "end", "evenOdd"])
    .seriesColumn("evenOdd")
    .data(random_datetime_ranges(10).map((n, i)=>{
        n.push(i%2);
        return n;
    }))
    .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
    .render()
    ;
timeline.tooltip()
    .tooltipWidth(200)
    .tooltipHeight(20)
    .tooltipHTML(d=>{
        return `<b>${d[0]}</b>`;
    });

function random_datetime_string() {
    const yyyy = 2004 + Math.floor(Math.random() * 2);
    const mm = 1 + Math.floor(Math.random() * 12);
    const dd = 1 + Math.floor(Math.random() * 28);
    const hh = 1 + Math.floor(Math.random() * 23);
    const min = 1 + Math.floor(Math.random() * 59);
    const sec = 0 + Math.floor(Math.random() * 59);
    return `${yyyy}-${mm < 10 ? "0" + mm : mm}-${dd < 10 ? "0" + dd : dd}T${hh < 10 ? "0" + hh : hh}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}.0Z`;
}

function random_datetime_ranges(n) {
    return Array(n).fill("").map((row, row_idx) => {
        const d1 = random_datetime_string();
        const d2 = random_datetime_string();
        return new Date(d1) - new Date(d2) > 0 ? [`Random Range #${row_idx}`, d2, d1] : [`Random Range #${row_idx}`, d1, d2];
    });
}

