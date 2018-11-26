import { Column } from "@hpcc-js/chart";

new Column()
    .target("target")
    .columns(["Male/Female Astronauts Per Year", "Female Astronauts", "Male Astronauts"])
    .data([
        ["1985", 2, 11],
        ["1987", 2, 13],
        ["1990", 5, 18],
        ["1992", 3, 16],
        ["1995", 5, 14],
        ["1996", 8, 27],
        ["1998", 4, 21],
        ["2000", 3, 14],
        ["2004", 2, 9],
        ["2009", 3, 11]
    ])
    .paletteID("FlatUI_Chinese")
    .tooltipValueFormat(",.0f")
    .showValue(true)
    .showValueAsPercent("series")
    .render()
    ;
