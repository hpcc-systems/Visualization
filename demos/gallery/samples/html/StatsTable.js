import { StatsTable } from "@hpcc-js/html";

new StatsTable()
    .target("target")
    .columns(["Name", "2019 Total net worth", "Year change"])
    .data([
        ["Jeff Bezos", 138000000000, -1880000000],
        ["Bill Gates", 98200000000, -173000000],
        ["Bernard Arnault", 82800000000, -234000000],
        ["Warren Buffett", 82700000000, -333000000],
        ["Amancio Ortega", 68100000000, 262000000],
        ["Mark Zuckerberg", 67800000000, 472000000],
        ["Larry Page", 56600000000, -168000000],
        ["Larry Ellison", 56200000000, 165000000],
        ["Sergey Brin", 55000000000, -187000000],
        ["Carlos Slim", 54000000000, -330000000],
    ])
    .theadColumnStyles([
        {"text-align":"left"},
        {"text-align":"right"},
        {"text-align":"right"}
    ])
    .secondColumnWidth("250px")
    .thirdColumnFormat("$,.0f")
    .render()
    ;
