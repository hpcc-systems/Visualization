import { ChartSeries } from "@hpcc-js/composite";

new ChartSeries()
    .target("target")
    .chartType("Area")
    .prependMissingData(true)
    .titleSuffix(" - Burglary rate per 100,000")
    .data([
        ["Aventura",919],["Aventura",601],["Aventura",478],["Aventura",578],["Aventura",507],["Aventura",548],["Aventura",451],["Aventura",499],["Aventura",421],["Aventura",370],["Aventura",353],["Aventura",464],["Aventura",327],["Aventura",262],["Aventura",221],["Aventura",203],["Aventura",210],
        ["Miami Lakes",750],["Miami Lakes",730],["Miami Lakes",755],["Miami Lakes",642],["Miami Lakes",564],["Miami Lakes",537],["Miami Lakes",588],["Miami Lakes",647],["Miami Lakes",412],["Miami Lakes",312],["Miami Lakes",295],["Miami Lakes",280],["Miami Lakes",307],
        ["Seminole",633],["Seminole",904],["Seminole",1062],["Seminole",665],["Seminole",447],["Seminole",429],["Seminole",488],["Seminole",574],["Seminole",688],["Seminole",504],["Seminole",464],["Seminole",606],["Seminole",394],["Seminole",277],["Seminole",322],
        ["Wellington",887],["Wellington",683],["Wellington",969],["Wellington",758],["Wellington",649],["Wellington",699],["Wellington",637],["Wellington",513],["Wellington",547],["Wellington",618],["Wellington",705],["Wellington",532],["Wellington",467],["Wellington",403],["Wellington",438],["Wellington",353],
        ["Weston",491],["Weston",273],["Weston",174],["Weston",227],["Weston",119],["Weston",193],["Weston",217],["Weston",235],["Weston",194],["Weston",249],["Weston",209],["Weston",206],["Weston",179],["Weston",219],["Weston",114],["Weston",89],["Weston",459]
    ])
    .render()
    ;