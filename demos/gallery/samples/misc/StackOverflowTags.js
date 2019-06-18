import { DockPanel } from "@hpcc-js/phosphor";
import { ChartPanel } from "@hpcc-js/layout";
import { Column } from "@hpcc-js/chart";

var chart1 = new ChartPanel()
	.widget(new Column().tooltipValueFormat(",.0f"))
    .columns(["StackOverflow Tag", "Today", "This Week"])
    .data(get_data().map(n=>[n[0],n[2],n[3]]))
    .title("Usage Today & This Week")
    .legendVisible(true)
    ;
var chart2 = new ChartPanel()
	.widget(new Column().tooltipValueFormat(",.0f"))
    .columns(["StackOverflow Tag", "All Time Tag Usage"])
    .data(get_data().map(n=>[n[0],n[1]]))
    .title("All-Time Usage")
    ;
new DockPanel()
    .addWidget(chart1, "")
    .addWidget(chart2, "")
    .hideSingleTabs(true)
    .target("target")
    .render()
    ;

function get_data(){
    return [
        ["javascript",1690160,834,4978],
        ["java",1463277,594,3687],
        ["c#",1247492,420,2661],
        ["php",1230920,413,2508],
        ["android",1138896,475,2947],
        ["python",1030566,784,5102],
        ["jquery",929172,199,1234],
        ["html",777254,315,1891],
        ["c++",586904,193,1211],
        ["ios",578145,196,1161],
        ["css",555329,204,1297],
        ["mysql",534607,169,1063],
        ["sql",460129,191,1109],
        ["asp.net",338503,82,447],
        ["ruby-on-rails",297563,60,357]
    ];
}