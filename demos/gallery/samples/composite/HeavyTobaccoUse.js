import { ChartSeries } from "@hpcc-js/composite";

const columns = ["US State", "1995", "1996", "1997", "1998", "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010"];
const data = [
    ["Arkansas",22.7,21.9,24.8,22.2,22.6,19.9,20.1,21.5,20.5,19.4,18.1,18.8,17.3,17,15.5,17.3],
    ["Indiana",24.3,24.9,21.7,20.7,22.5,22.4,21.5,23,21.1,19.5,20.8,18.6,18.2,19.7,17.1,16.3],
    ["Kentucky",24.9,27.9,27.6,28,25.6,26.8,26.2,29.1,26.8,23,23.5,24.3,23.5,20.5,20.6,19.3],
    ["Missouri",21.9,22.6,24.6,22.3,22.7,22.6,20,22,23.1,18.5,18.5,18.6,19.8,20.2,18.3,16.6],
    ["Nevada",23.3,25.1,23.4,23.6,24.3,22,20.8,21.1,20.3,16.5,16.6,15.6,16.1,16.4,15.8,16.5],
    ["Ohio",23.6,25.7,23.2,21.6,23.6,21.1,21.9,21.4,19.5,20.8,17.6,16.8,17.7,15.5,15.6,17.1],
    ["Oklahoma",20.2,21.5,21.4,20.2,22.4,19.8,23.1,21.8,20.3,19.9,19,18.9,20,18.5,18.8,17.5],
    ["Tennessee",24.2,25,23.7,22.7,21.9,21.6,19.7,22.9,21.1,21.5,20.4,18.4,20,18,17.6,15.7],
    ["West Virginia",23.7,23.9,24.5,24.9,23.8,23.1,23.5,23.8,22.6,21.8,21.3,21.3,21.7,21.5,20.7,23.2]
];

new ChartSeries()
    .target("target")
    .chartType("Area")
    .prependMissingData(true)
    .columns(columns)
    .data(data)
    .minimumChartHeight(100)
    .render()
    ;