import { ReactTimeline } from "@hpcc-js/timeline";
import { LabelledRect } from "@hpcc-js/react";
import { Pie } from "@hpcc-js/chart";

const timeline = new ReactTimeline()
    .rangeRenderer(LabelledRect)
    .target("target")
    .columns(["Label", "start", "end"])
    .data(random_datetime_ranges(10))
    .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
    .render()
    ;
const tooltipWidth = 120;
const tooltipHeight = 120;
const div = document.createElement("div");
div.style.width = tooltipWidth+"px";
div.style.height = tooltipHeight+"px";
div.style.backgroundColor = "#FFF";
timeline.tooltip().tooltipContent(div);
timeline.tooltip()
    .tooltipWidth(tooltipWidth)
    .tooltipHeight(tooltipHeight)
    .tooltipContent(div)
    ;

const pie = new Pie();
timeline.tooltip().onShowContent = function (node) {
    pie
        .target(null)
        .target(node)
        .columns(["Index", "Value"])
        .data(this.data()[3].weights.map((n, i)=>{
            return [i, n];
        }))
        .render();
};

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
        const ret = new Date(d1) - new Date(d2) > 0 ? [`Random Range #${row_idx}`, d2, d1] : [`Random Range #${row_idx}`, d1, d2];
        ret[3] = {
            weights: [
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random(),
                Math.random()
            ]
        };
        return ret;
    });
}

