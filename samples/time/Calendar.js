import { CalendarHeatMap } from "@hpcc-js/other";

new CalendarHeatMap()
    .target("target")
    .columns(["Date", "Weight"])
    .data([
        ["2010-09-30", "10835.96"],
        ["2010-09-29", "10857.98"],
        ["2010-09-28", "10809.85"],
        ["2010-09-27", "10860.03"],
        ["2010-09-24", "10664.39"],
        ["2010-09-23", "10738.48"],
        ["2010-09-22", "10761.11"],
        ["2010-09-21", "10753.39"],
        ["2010-09-20", "10608.08"]
    ])
    .dateColumn("Date")
    .aggrType("mean")
    .aggrColumn("Weight")
    .render()
    ;
