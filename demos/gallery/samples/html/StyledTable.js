import { StyledTable } from "@hpcc-js/html";

new StyledTable()
    .theadColumnStyles([
        {
            "background-color": "black",
            "font-weight":"bold",
            "font-style":"italic",
            "color": "white"
        },
        {
            "background-color": "black",
            "font-weight":"bold",
            "font-style":"italic",
            "color": "white"
        }
    ])
    .evenRowStyles({
        "background-color":"#555",
        "color": "white"
    })
    .tbodyColumnStyles([
        {
            "padding": "4px"
        },
        {
            "font-style":"italic",
            "font-weight":"bold",
            "padding": "4px"
        }
    ])
    .lastRowStyles({
        "background-color":"#FFF",
        "color": "#000"
    })
    .target("target")
    .columns(["Year","Percent"])
    .data([
        ["1999","14%"],
        ["2000","12%"],
        ["2001","11%"],
        ["2002","9%"],
        ["2003","6%"],
        ["2004","4%"],
        ["Other (23)","44%"]
    ])
    .render()
    ;
