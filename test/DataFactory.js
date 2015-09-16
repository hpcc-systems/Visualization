"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["src/form/Input", "src/common/WidgetArray", "src/chart/MultiChartSurface", "src/layout/Surface", "src/chart/Column"], factory);
    } else {
        root.test_DataFactory = factory(root.form_Input, root.common_WidgetArray, root.chart_MultiChartSurface, root.layout_Surface, root.chart_Column);
    }
}(this, function (Input, WidgetArray, MultiChartSurface, Surface, Column) {
    var DataFactory = {
        OneD: {
            subjects: {
                columns: ["Result"],
                data: [66]
            },
            amgauge: {
                numBands: [3],
                bandsColor: ["#84b761","#fdd400","#cc4748"],
                bandsEndValue: [90,130,220],
                bandsStartValue: [0,90,130],
                bandsInnerRadius: [null, null, "95%"],
                bottomText: ["[[data]] km/h"],
                high: [220],
                low: [0],
                data: [100],
                axisLineWidth: [1],
                axisAlpha: [0.2],
                tickAlpha: [0.2],
                valueInterval: [20]
            }
        },
        TwoD: {
            subjects: {
                columns: ["Subject"],
                data: [
                    ["Geography", 75],
                    ["English", 45],
                    ["Math", 98],
                    ["Science", 66]
                ]
            }
        },
        ND: {
            subjects: {
                columns: ["Subject", "Year 1", "Year 2", "Year 3"],
                data: [
                    ["Geography", 75, 68, 65],
                    ["English", 45, 55, 52],
                    ["Math", 98, 92, 90],
                    ["Science", 66, 60, 72]
                ]
            },
            ampolar: {
                columns: ["Subject", "Year 1", "Year 2", "Year 3", "Year 4"],
                data: [
                    ["English", 5, 43, 41, 92],
                    ["English II", 17, 43, 83, 93],
                    ["English III", 6, 43, 64, 93],
                    ["Geography", 7, 45, 52, 83],
                    ["Geography II", 16, 73, 52, 83],
                    ["Geography III", 26, 83, 11, 72],
                    ["Science", 66, 60, 85, 6],
                    ["Science II", 46, 20, 53, 7],
                    ["Science III", 46, 20, 38, 7],
                    ["Math", 98, 30, 23, 13],
                    ["Math II", 76, 30, 34, 6],
                    ["Math III", 80, 30, 27, 8]
                ]
            },
            fivecolumn: { //amchart candle
                columns: ["Subject", "low", "open", "close", "high"],
                data: [
                    ["English", 5, 43, 61, 92],
                    ["English II", 7, 23, 83, 93],
                    ["English III", 6, 33, 64, 93],
                    ["Geography", 7, 45, 52, 83],
                    ["Geography II", 6, 73, 52, 83],
                    ["Geography III", 6, 23, 71, 82],
                    ["Science", 6, 60, 85, 96],
                    ["Science II", 16, 20, 53, 77],
                    ["Science III", 46, 20, 38, 7],
                    ["Math", 8, 30, 43, 63],
                    ["Math II", 26, 30, 64, 76],
                    ["Math III", 0, 30, 77, 88]
                ]
            }
        },
        Tree: {
            default: {
                data: 
                    {label: "root", children: [{
                        label: "A",
                        children: [{
                            label: "AA",
                            children: [{
                                label: "AAA"
                            }]
                        }, {
                            label: "AB",
                            children: [{
                                label: "ABA"
                            }]
                        }]
                    }, {
                        label: "B",
                        children: [{
                            label: "BA",
                            children: [{
                                label: "BAA"
                            }]
                        }, {
                            label: "BB"
                        }]
                    }]
                }
            }
        },
        Timeline: {
            default: {
                columns: ["Row Label", "Bar Label", "Start", "End"],
                data: [
                    ["Analysis", "", "2015-03-29", "2015-04-03"],
                    ["Design", "", "2015-04-03", "2015-05-13"],
                    ["Development", "", "2015-05-05", "2015-08-11"],
                    ["Testing", "", "2015-07-25", "2015-08-30"],
                    ["Release", "", "2015-08-30", "2015-09-03"]
                ]
            }
        },
        TreeMap: {
            default: {
                columns: [["Location", "Parent", "Market trade volume (size)", "Market increase/decrease (color)"]],
                data: [
                  ["Global",    "",                 0,                               0],
                  ["America",   "Global",             0,                               0],
                  ["Europe",    "Global",             0,                               0],
                  ["Asia",      "Global",             0,                               0],
                  ["Australia", "Global",             0,                               0],
                  ["Africa",    "Global",             0,                               0],
                  ["Brazil",    "America",            11,                              10],
                  ["USA",       "America",            52,                              31],
                  ["Mexico",    "America",            24,                              12],
                  ["Canada",    "America",            16,                              -23],
                  ["France",    "Europe",             42,                              -11],
                  ["Germany",   "Europe",             31,                              -2],
                  ["Sweden",    "Europe",             22,                              -13],
                  ["Italy",     "Europe",             17,                              4],
                  ["UK",        "Europe",             21,                              -5],
                  ["China",     "Asia",               36,                              4],
                  ["Japan",     "Asia",               20,                              -12],
                  ["India",     "Asia",               40,                              63],
                  ["Laos",      "Asia",               4,                               34],
                  ["Mongolia",  "Asia",               1,                               -5],
                  ["Israel",    "Asia",               12,                              24],
                  ["Iran",      "Asia",               18,                              13],
                  ["Pakistan",  "Asia",               11,                              -52],
                  ["Egypt",     "Africa",             21,                              0],
                  ["S. Africa", "Africa",             30,                              43],
                  ["Sudan",     "Africa",             12,                              2],
                  ["Congo",     "Africa",             10,                              12],
                  ["Zaire",     "Africa",             8,                               10]
                ]
            }
        },
        Form: {
            simple: {
                inputs: function () {
                    return [
                        new Input()
                            .name("textbox-test")
                            .label("Alphanumeric")
                            .type("textbox")
                            .validate("^[A-Za-z0-9]+$")
                            .value("SomeString123"),
                        new Input()
                            .name("number-test")
                            .label("Number Test")
                            .type("number")
                            .validate("\\d+")
                            .value(123),
                        new Input()
                            .name("select-test")
                            .label("Select Test")
                            .type("select")
                            .selectOptions(["A", "B", "C"])
                            .value("B"),
                        new WidgetArray()
                            .content([
                                new Input()
                                    .name("textbox-test")
                                    .label("Only Alpha")
                                    .type("textbox")
                                    .validate("^[A-Za-z]+$")
                                    .value("SomeString"),
                                new Input()
                                    .name("checkbox-test")
                                    .label("Checkbox Test")
                                    .type("checkbox")
                                    .value(true)
                            ]),
                        new Input()
                            .name("textarea-test")
                            .label("Textarea Test")
                            .type("textarea")
                            .value("Textarea Text")
                    ];
                }
            }
        },
        Slider: {
            simple: {
                columns: ["Percent"],
                data: [40]
            },
            range: {
                allowRange: true,
                columns: ["Percent"],
                data: [20, 40]
            }
        },
        FAChar: {
            simple: {
                char: ["\uf007"]
            }
        },
        List: {
            simple: {
                data: ["List item 1", "This is Item 2", "List item 3", "This is list item 4", "And finally 5"]
            }
        },
        Text: {
            simple: {
                text: ["Hello\nand\nWelcome!"]
            }
        },
        Surface: {
            simple: {
                title: ["Hello and welcome!"],
                menu: ["aaa", "bbb", "ccc"],
                buttonAnnotations: [{id:"button_1",label:"\uf010",shape:"square",diameter:14,padding:"0px 5px",font:"FontAwesome"}, {id:"button_2",label:"\uf00e",shape:"square",diameter:14,padding:"0px 5px",font:"FontAwesome"}],
                widget: function () { return new Surface().widget(new MultiChartSurface()) }
            }
        },
        AbsoluteSurface: {
            simple: {
                widgetX: [25],
                widgetY: [25],
                widgetWidth: [50],
                widgetHeight: [50],
                widget: function () { return new Column(); }
            }
        },
        Layered: {
            simple: {
                
            }
        },
        HeatMap: {
            simple: {
                columns: ["x", "y","Weight"],
                data: [[340, 280, 0.22532552290509789], [279, 78, 0.17218748760882907], [328, 336, 0.09651770381968094], [44, 263, 0.3316061590758984], [214, 477, 0.34511952287135683], [195, 485, 0.47588339388219036], [374, 396, 0.271679226500542], [360, 148, 0.18736486936235697], [80, 333, 0.8888903185554132], [202, 439, 0.8072545133759657], [347, 326, 0.7121907931949589], [214, 93, 0.8450257030767434], [427, 54, 0.9070942314279923], [338, 375, 0.7678188486462785], [135, 350, 0.748831574602582], [414, 146, 0.17446160174067626], [134, 454, 0.3971279668693425], [76, 166, 0.24240573560820156], [103, 1, 0.9879741685278576], [271, 438, 0.05501944785473689]]
            }
        },
        WordCloud: {
            simple: {
                columns: ["Word", "Weight"],
                words: ["Myriel", "Napoleon", "Mlle.Baptistine", "Mme.Magloire", "CountessdeLo", "Geborand", "Champtercier", "Cravatte", "Count", "OldMan", "Labarre", "Valjean", "Marguerite", "Mme.deR", "Isabeau", "Gervais", "Tholomyes", "Listolier", "Fameuil", "Blacheville", "Favourite", "Dahlia", "Zephine", "Fantine", "Mme.Thenardier", "Thenardier", "Cosette", "Javert", "Fauchelevent", "Bamatabois", "Perpetue", "Simplice", "Scaufflaire", "Woman1", "Judge", "Champmathieu", "Brevet", "Chenildieu", "Cochepaille", "Pontmercy", "Boulatruelle", "Eponine", "Anzelma", "Woman2", "MotherInnocent", "Gribier", "Jondrette", "Mme.Burgon", "Gavroche", "Gillenormand", "Magnon", "Mlle.Gillenormand", "Mme.Pontmercy", "Mlle.Vaubois", "Lt.Gillenormand", "Marius", "BaronessT", "Mabeuf", "Enjolras", "Combeferre", "Prouvaire", "Feuilly", "Courfeyrac", "Bahorel", "Bossuet", "Joly", "Grantaire", "MotherPlutarch", "Gueulemer", "Babet", "Claquesous", "Montparnasse", "Toussaint", "Child1", "Child2", "Brujon", "Mme.Hucheloup"]
            }
        },
        Table: {
            simple: {
                data: [[37.665074,-122.384375,"green-dot.png"],[32.69068,-117.17854],[39.709455,-104.969859],[41.244123,-95.96161],[32.68898,-117.19204],[45.78649,-108.5266],[45.79618,-108.535652],[45.77432,-108.49437],[45.777062,-108.549835,"red-dot.png"]],
                columns: ["Lat","Long","Pin"]
            },
            large: {
                data: [
                    ["Label1", 37.665074, -122.384375, "green-dot.png", 4525, 4243545, 24354, 54, 2552345, 2455, 245435],
                    ["Label2", 32.690680, -117.178540, "", 4525, 423545, 24354, 354, 2552345, 2455, 245435],
                    ["Label3", 39.709455, -104.969859, "", 4525, 423545, 24354, 524, 2552345, 2455, 245435],
                    ["Label4", 41.244123, -95.961610, "", 4525, 423545, 24354, 564, 2552345, 2455, 245435],
                    ["Label5", 32.688980, -117.192040, "", 4525, 423545, 24354, 454, 2552345, 2455, 245435],
                    ["Label6", 45.786490, -108.526600, "", 4525, 423545, 24354, 534, 2552345, 2455, 245435],
                    ["Label7", 45.796180, -108.535652, "", 4525, 423545, 24354, 254, 2552345, 2455, 245435],
                    ["Label8", 45.774320, -108.494370, "", 4525, 423545, 24354, 51, 2552345, 2455, 245435],
                    ["Label9", 37.665074, -122.384375, "green-dot.png", 4525, 423545, 24354, 504, 2552345, 2455, 245435],
                    ["Label0", 32.690680, -117.178540, "", 4525, 423545, 24304, 54, 2552345, 2455, 245435],
                    ["Label0", 39.709455, -104.969859, "", 4525, 423545, 249354, 54, 2552345, 2455, 245435],
                    ["Label9", 41.244123, -95.961610, "", 4525, 423545, 247354, 54, 2552345, 2455, 245435],
                    ["Label8", 32.688980, -117.192040, "", 4525, 423545, 243654, 54, 2552345, 2455, 245435],
                    ["Label7", 45.786490, -108.526600, "", 4525, 423545, 245354, 54, 2552345, 2455, 245435],
                    ["Label6", 45.796180, -108.535652, "", 4525, 423545, 243354, 54, 2552345, 2455, 245435],
                    ["Label5", 45.774320, -108.494370, "", 4525, 423545, 243454, 54, 2552345, 2455, 245435],
                    ["Label4", 37.665074, -122.384375, "green-dot.png", 4525, 423545, 243254, 54, 2552345, 2455, 245435],
                    ["Label3", 32.690680, -117.178540, "", 4525, 4243545, 24354, 54, 2552345, 2455, 245435],
                    ["Label2", 39.709455, -104.969859, "", 4525, 4233545, 24354, 54, 2552345, 2455, 245435],
                    ["Label1", 41.244123, -95.961610, "", 4525, 4235145, 24354, 54, 2552345, 2455, 245435],
                    ["Label1", 32.688980, -117.192040, "", 4525, 4523545, 24354, 54, 2552345, 2455, 245435],
                    ["Label2", 45.786490, -108.526600, "", 4525, 4263545, 24354, 54, 2552345, 2455, 245435],
                    ["Label3", 45.796180, -108.535652, "", 4525, 4235745, 24354, 54, 2552345, 2455, 245435],
                    ["Label4", 45.774320, -108.494370, "", 4525, 4235845, 24354, 54, 2552345, 2455, 245435],
                    ["Label5", 37.665074, -122.384375, "green-dot.png", 4525, 423545, 24354, 54, 2552345, 2455, 245435],
                    ["Label6", 32.690680, -117.178540, "", 4525, 423545, 24354, 54, 2552345, 20455, 245435],
                    ["Label7", 39.709455, -104.969859, "", 4525, 423545, 24354, 54, 2552345, 24955, 245435],
                    ["Label8", 41.244123, -95.961610, "", 4525, 423545, 24354, 54, 2552345, 24855, 245435],
                    ["Label9", 32.688980, -117.192040, "", 4525, 423545, 24354, 54, 2552345, 27455, 245435],
                    ["Label0", 45.786490, -108.526600, "", 4525, 423545, 24354, 54, 2552345, 24655, 245435],
                    ["Label0", 45.796180, -108.535652, "", 4525, 423545, 24354, 54, 2552345, 24555, 245435],
                    ["Label9", 45.774320, -108.494370, "", 4525, 423545, 24354, 54, 2552345, 24455, 245435],
                    ["Label8", 37.665074, -122.384375, "green-dot.png", 4525, 423545, 24354, 54, 23552345, 2455, 245435],
                    ["Label7", 32.690680, -117.178540, "", 4525, 423545, 24354, 54, 2552345, 2455, 2405435],
                    ["Label6", 39.709455, -104.969859, "", 4525, 423545, 24354, 54, 2552345, 2455, 2495435],
                    ["Label5", 41.244123, -95.961610, "", 4525, 423545, 24354, 54, 2552345, 2455, 2454835],
                    ["Label4", 32.688980, -117.192040, "", 4525, 423545, 24354, 54, 2552345, 2455, 2475435],
                    ["Label3", 45.786490, -108.526600, "", 4525, 423545, 24354, 54, 2552345, 2455, 2456435],
                    ["Label2", 45.796180, -108.535652, "", 4525, 423545, 24354, 54, 2552345, 2455, 2455435],
                    ["Label1", 45.774320, -108.494370, "", 4525, 423545, 24354, 54, 2552345, 2455, 2445435],
                    ["Label1", 45.777062, -108.549835, "red-dot.png", 4525, 423545, 24354, 54, 25523345, 2455, 245435]
                ],
                columns: ["Label", "Lat", "Long", "Pin", "Forth Column", "Fifth Column", "sixth Column", "Seventh Column", "eighth Column", "Nineth Column", "Tenth Column"]
            }
        },
        Graph: {
            simple: {
                nodes: [
                  { "name": "Myriel", "group": 1 },
                  { "name": "Napoleon", "group": 1 },
                  { "name": "Mlle.Baptistine", "group": 1 },
                  { "name": "Mme.Magloire", "group": 1 },
                  { "name": "CountessdeLo", "group": 1 },
                  { "name": "Geborand", "group": 1 },
                  { "name": "Champtercier", "group": 1 },
                  { "name": "Cravatte", "group": 1 },
                  { "name": "Count", "group": 1 },
                  { "name": "OldMan", "group": 1 },
                  { "name": "Labarre", "group": 2 },
                  { "name": "Valjean", "group": 2 },
                  { "name": "Marguerite", "group": 3 },
                  { "name": "Mme.deR", "group": 2 },
                  { "name": "Isabeau", "group": 2 },
                  { "name": "Gervais", "group": 2 },
                  { "name": "Tholomyes", "group": 3 },
                  { "name": "Listolier", "group": 3 },
                  { "name": "Fameuil", "group": 3 },
                  { "name": "Blacheville", "group": 3 },
                  { "name": "Favourite", "group": 3 },
                  { "name": "Dahlia", "group": 3 },
                  { "name": "Zephine", "group": 3 },
                  { "name": "Fantine", "group": 3 },
                  { "name": "Mme.Thenardier", "group": 4 },
                  { "name": "Thenardier", "group": 4 },
                  { "name": "Cosette", "group": 5 },
                  { "name": "Javert", "group": 4 },
                  { "name": "Fauchelevent", "group": 0 },
                  { "name": "Bamatabois", "group": 2 },
                  { "name": "Perpetue", "group": 3 },
                  { "name": "Simplice", "group": 2 },
                  { "name": "Scaufflaire", "group": 2 },
                  { "name": "Woman1", "group": 2 },
                  { "name": "Judge", "group": 2 },
                  { "name": "Champmathieu", "group": 2 },
                  { "name": "Brevet", "group": 2 },
                  { "name": "Chenildieu", "group": 2 },
                  { "name": "Cochepaille", "group": 2 },
                  { "name": "Pontmercy", "group": 4 },
                  { "name": "Boulatruelle", "group": 6 },
                  { "name": "Eponine", "group": 4 },
                  { "name": "Anzelma", "group": 4 },
                  { "name": "Woman2", "group": 5 },
                  { "name": "MotherInnocent", "group": 0 },
                  { "name": "Gribier", "group": 0 },
                  { "name": "Jondrette", "group": 7 },
                  { "name": "Mme.Burgon", "group": 7 },
                  { "name": "Gavroche", "group": 8 },
                  { "name": "Gillenormand", "group": 5 },
                  { "name": "Magnon", "group": 5 },
                  { "name": "Mlle.Gillenormand", "group": 5 },
                  { "name": "Mme.Pontmercy", "group": 5 },
                  { "name": "Mlle.Vaubois", "group": 5 },
                  { "name": "Lt.Gillenormand", "group": 5 },
                  { "name": "Marius", "group": 8 },
                  { "name": "BaronessT", "group": 5 },
                  { "name": "Mabeuf", "group": 8 },
                  { "name": "Enjolras", "group": 8 },
                  { "name": "Combeferre", "group": 8 },
                  { "name": "Prouvaire", "group": 8 },
                  { "name": "Feuilly", "group": 8 },
                  { "name": "Courfeyrac", "group": 8 },
                  { "name": "Bahorel", "group": 8 },
                  { "name": "Bossuet", "group": 8 },
                  { "name": "Joly", "group": 8 },
                  { "name": "Grantaire", "group": 8 },
                  { "name": "MotherPlutarch", "group": 9 },
                  { "name": "Gueulemer", "group": 4 },
                  { "name": "Babet", "group": 4 },
                  { "name": "Claquesous", "group": 4 },
                  { "name": "Montparnasse", "group": 4 },
                  { "name": "Toussaint", "group": 5 },
                  { "name": "Child1", "group": 10 },
                  { "name": "Child2", "group": 10 },
                  { "name": "Brujon", "group": 4 },
                  { "name": "Mme.Hucheloup", "group": 8 }
                ],
                "links": [
                  { "source": 1, "target": 0, "value": 1 },
                  { "source": 2, "target": 0, "value": 8 },
                  { "source": 2, "target": 0, "value": 8 },
                  { "source": 3, "target": 0, "value": 10 },
                  { "source": 3, "target": 2, "value": 6 },
                  { "source": 4, "target": 0, "value": 1 },
                  { "source": 5, "target": 0, "value": 1 },
                  { "source": 6, "target": 0, "value": 1 },
                  { "source": 7, "target": 0, "value": 1 },
                  { "source": 8, "target": 0, "value": 2 },
                  { "source": 9, "target": 0, "value": 1 },
                  { "source": 11, "target": 10, "value": 1 },
                  { "source": 11, "target": 3, "value": 3 },
                  { "source": 11, "target": 2, "value": 3 },
                  { "source": 11, "target": 0, "value": 5 },
                  { "source": 12, "target": 11, "value": 1 },
                  { "source": 13, "target": 11, "value": 1 },
                  { "source": 14, "target": 11, "value": 1 },
                  { "source": 15, "target": 11, "value": 1 },
                  { "source": 17, "target": 16, "value": 4 },
                  { "source": 18, "target": 16, "value": 4 },
                  { "source": 18, "target": 17, "value": 4 },
                  { "source": 19, "target": 16, "value": 4 },
                  { "source": 19, "target": 17, "value": 4 },
                  { "source": 19, "target": 18, "value": 4 },
                  { "source": 20, "target": 16, "value": 3 },
                  { "source": 20, "target": 17, "value": 3 },
                  { "source": 20, "target": 18, "value": 3 },
                  { "source": 20, "target": 19, "value": 4 },
                  { "source": 21, "target": 16, "value": 3 },
                  { "source": 21, "target": 17, "value": 3 },
                  { "source": 21, "target": 18, "value": 3 },
                  { "source": 21, "target": 19, "value": 3 },
                  { "source": 21, "target": 20, "value": 5 },
                  { "source": 22, "target": 16, "value": 3 },
                  { "source": 22, "target": 17, "value": 3 },
                  { "source": 22, "target": 18, "value": 3 },
                  { "source": 22, "target": 19, "value": 3 },
                  { "source": 22, "target": 20, "value": 4 },
                  { "source": 22, "target": 21, "value": 4 },
                  { "source": 23, "target": 16, "value": 3 },
                  { "source": 23, "target": 17, "value": 3 },
                  { "source": 23, "target": 18, "value": 3 },
                  { "source": 23, "target": 19, "value": 3 },
                  { "source": 23, "target": 20, "value": 4 },
                  { "source": 23, "target": 21, "value": 4 },
                  { "source": 23, "target": 22, "value": 4 },
                  { "source": 23, "target": 12, "value": 2 },
                  { "source": 23, "target": 11, "value": 9 },
                  { "source": 24, "target": 23, "value": 2 },
                  { "source": 24, "target": 11, "value": 7 },
                  { "source": 25, "target": 24, "value": 13 },
                  { "source": 25, "target": 23, "value": 1 },
                  { "source": 25, "target": 11, "value": 12 },
                  { "source": 26, "target": 24, "value": 4 },
                  { "source": 26, "target": 11, "value": 31 },
                  { "source": 26, "target": 16, "value": 1 },
                  { "source": 26, "target": 25, "value": 1 },
                  { "source": 27, "target": 11, "value": 17 },
                  { "source": 27, "target": 23, "value": 5 },
                  { "source": 27, "target": 25, "value": 5 },
                  { "source": 27, "target": 24, "value": 1 },
                  { "source": 27, "target": 26, "value": 1 },
                  { "source": 28, "target": 11, "value": 8 },
                  { "source": 28, "target": 27, "value": 1 },
                  { "source": 29, "target": 23, "value": 1 },
                  { "source": 29, "target": 27, "value": 1 },
                  { "source": 29, "target": 11, "value": 2 },
                  { "source": 30, "target": 23, "value": 1 },
                  { "source": 31, "target": 30, "value": 2 },
                  { "source": 31, "target": 11, "value": 3 },
                  { "source": 31, "target": 23, "value": 2 },
                  { "source": 31, "target": 27, "value": 1 },
                  { "source": 32, "target": 11, "value": 1 },
                  { "source": 33, "target": 11, "value": 2 },
                  { "source": 33, "target": 27, "value": 1 },
                  { "source": 34, "target": 11, "value": 3 },
                  { "source": 34, "target": 29, "value": 2 },
                  { "source": 35, "target": 11, "value": 3 },
                  { "source": 35, "target": 34, "value": 3 },
                  { "source": 35, "target": 29, "value": 2 },
                  { "source": 36, "target": 34, "value": 2 },
                  { "source": 36, "target": 35, "value": 2 },
                  { "source": 36, "target": 11, "value": 2 },
                  { "source": 36, "target": 29, "value": 1 },
                  { "source": 37, "target": 34, "value": 2 },
                  { "source": 37, "target": 35, "value": 2 },
                  { "source": 37, "target": 36, "value": 2 },
                  { "source": 37, "target": 11, "value": 2 },
                  { "source": 37, "target": 29, "value": 1 },
                  { "source": 38, "target": 34, "value": 2 },
                  { "source": 38, "target": 35, "value": 2 },
                  { "source": 38, "target": 36, "value": 2 },
                  { "source": 38, "target": 37, "value": 2 },
                  { "source": 38, "target": 11, "value": 2 },
                  { "source": 38, "target": 29, "value": 1 },
                  { "source": 39, "target": 25, "value": 1 },
                  { "source": 40, "target": 25, "value": 1 },
                  { "source": 41, "target": 24, "value": 2 },
                  { "source": 41, "target": 25, "value": 3 },
                  { "source": 42, "target": 41, "value": 2 },
                  { "source": 42, "target": 25, "value": 2 },
                  { "source": 42, "target": 24, "value": 1 },
                  { "source": 43, "target": 11, "value": 3 },
                  { "source": 43, "target": 26, "value": 1 },
                  { "source": 43, "target": 27, "value": 1 },
                  { "source": 44, "target": 28, "value": 3 },
                  { "source": 44, "target": 11, "value": 1 },
                  { "source": 45, "target": 28, "value": 2 },
                  { "source": 47, "target": 46, "value": 1 },
                  { "source": 48, "target": 47, "value": 2 },
                  { "source": 48, "target": 25, "value": 1 },
                  { "source": 48, "target": 27, "value": 1 },
                  { "source": 48, "target": 11, "value": 1 },
                  { "source": 49, "target": 26, "value": 3 },
                  { "source": 49, "target": 11, "value": 2 },
                  { "source": 50, "target": 49, "value": 1 },
                  { "source": 50, "target": 24, "value": 1 },
                  { "source": 51, "target": 49, "value": 9 },
                  { "source": 51, "target": 26, "value": 2 },
                  { "source": 51, "target": 11, "value": 2 },
                  { "source": 52, "target": 51, "value": 1 },
                  { "source": 52, "target": 39, "value": 1 },
                  { "source": 53, "target": 51, "value": 1 },
                  { "source": 54, "target": 51, "value": 2 },
                  { "source": 54, "target": 49, "value": 1 },
                  { "source": 54, "target": 26, "value": 1 },
                  { "source": 55, "target": 51, "value": 6 },
                  { "source": 55, "target": 49, "value": 12 },
                  { "source": 55, "target": 39, "value": 1 },
                  { "source": 55, "target": 54, "value": 1 },
                  { "source": 55, "target": 26, "value": 21 },
                  { "source": 55, "target": 11, "value": 19 },
                  { "source": 55, "target": 16, "value": 1 },
                  { "source": 55, "target": 25, "value": 2 },
                  { "source": 55, "target": 41, "value": 5 },
                  { "source": 55, "target": 48, "value": 4 },
                  { "source": 56, "target": 49, "value": 1 },
                  { "source": 56, "target": 55, "value": 1 },
                  { "source": 57, "target": 55, "value": 1 },
                  { "source": 57, "target": 41, "value": 1 },
                  { "source": 57, "target": 48, "value": 1 },
                  { "source": 58, "target": 55, "value": 7 },
                  { "source": 58, "target": 48, "value": 7 },
                  { "source": 58, "target": 27, "value": 6 },
                  { "source": 58, "target": 57, "value": 1 },
                  { "source": 58, "target": 11, "value": 4 },
                  { "source": 59, "target": 58, "value": 15 },
                  { "source": 59, "target": 55, "value": 5 },
                  { "source": 59, "target": 48, "value": 6 },
                  { "source": 59, "target": 57, "value": 2 },
                  { "source": 60, "target": 48, "value": 1 },
                  { "source": 60, "target": 58, "value": 4 },
                  { "source": 60, "target": 59, "value": 2 },
                  { "source": 61, "target": 48, "value": 2 },
                  { "source": 61, "target": 58, "value": 6 },
                  { "source": 61, "target": 60, "value": 2 },
                  { "source": 61, "target": 59, "value": 5 },
                  { "source": 61, "target": 57, "value": 1 },
                  { "source": 61, "target": 55, "value": 1 },
                  { "source": 62, "target": 55, "value": 9 },
                  { "source": 62, "target": 58, "value": 17 },
                  { "source": 62, "target": 59, "value": 13 },
                  { "source": 62, "target": 48, "value": 7 },
                  { "source": 62, "target": 57, "value": 2 },
                  { "source": 62, "target": 41, "value": 1 },
                  { "source": 62, "target": 61, "value": 6 },
                  { "source": 62, "target": 60, "value": 3 },
                  { "source": 63, "target": 59, "value": 5 },
                  { "source": 63, "target": 48, "value": 5 },
                  { "source": 63, "target": 62, "value": 6 },
                  { "source": 63, "target": 57, "value": 2 },
                  { "source": 63, "target": 58, "value": 4 },
                  { "source": 63, "target": 61, "value": 3 },
                  { "source": 63, "target": 60, "value": 2 },
                  { "source": 63, "target": 55, "value": 1 },
                  { "source": 64, "target": 55, "value": 5 },
                  { "source": 64, "target": 62, "value": 12 },
                  { "source": 64, "target": 48, "value": 5 },
                  { "source": 64, "target": 63, "value": 4 },
                  { "source": 64, "target": 58, "value": 10 },
                  { "source": 64, "target": 61, "value": 6 },
                  { "source": 64, "target": 60, "value": 2 },
                  { "source": 64, "target": 59, "value": 9 },
                  { "source": 64, "target": 57, "value": 1 },
                  { "source": 64, "target": 11, "value": 1 },
                  { "source": 65, "target": 63, "value": 5 },
                  { "source": 65, "target": 64, "value": 7 },
                  { "source": 65, "target": 48, "value": 3 },
                  { "source": 65, "target": 62, "value": 5 },
                  { "source": 65, "target": 58, "value": 5 },
                  { "source": 65, "target": 61, "value": 5 },
                  { "source": 65, "target": 60, "value": 2 },
                  { "source": 65, "target": 59, "value": 5 },
                  { "source": 65, "target": 57, "value": 1 },
                  { "source": 65, "target": 55, "value": 2 },
                  { "source": 66, "target": 64, "value": 3 },
                  { "source": 66, "target": 58, "value": 3 },
                  { "source": 66, "target": 59, "value": 1 },
                  { "source": 66, "target": 62, "value": 2 },
                  { "source": 66, "target": 65, "value": 2 },
                  { "source": 66, "target": 48, "value": 1 },
                  { "source": 66, "target": 63, "value": 1 },
                  { "source": 66, "target": 61, "value": 1 },
                  { "source": 66, "target": 60, "value": 1 },
                  { "source": 67, "target": 57, "value": 3 },
                  { "source": 68, "target": 25, "value": 5 },
                  { "source": 68, "target": 11, "value": 1 },
                  { "source": 68, "target": 24, "value": 1 },
                  { "source": 68, "target": 27, "value": 1 },
                  { "source": 68, "target": 48, "value": 1 },
                  { "source": 68, "target": 41, "value": 1 },
                  { "source": 69, "target": 25, "value": 6 },
                  { "source": 69, "target": 68, "value": 6 },
                  { "source": 69, "target": 11, "value": 1 },
                  { "source": 69, "target": 24, "value": 1 },
                  { "source": 69, "target": 27, "value": 2 },
                  { "source": 69, "target": 48, "value": 1 },
                  { "source": 69, "target": 41, "value": 1 },
                  { "source": 70, "target": 25, "value": 4 },
                  { "source": 70, "target": 69, "value": 4 },
                  { "source": 70, "target": 68, "value": 4 },
                  { "source": 70, "target": 11, "value": 1 },
                  { "source": 70, "target": 24, "value": 1 },
                  { "source": 70, "target": 27, "value": 1 },
                  { "source": 70, "target": 41, "value": 1 },
                  { "source": 70, "target": 58, "value": 1 },
                  { "source": 71, "target": 27, "value": 1 },
                  { "source": 71, "target": 69, "value": 2 },
                  { "source": 71, "target": 68, "value": 2 },
                  { "source": 71, "target": 70, "value": 2 },
                  { "source": 71, "target": 11, "value": 1 },
                  { "source": 71, "target": 48, "value": 1 },
                  { "source": 71, "target": 41, "value": 1 },
                  { "source": 71, "target": 25, "value": 1 },
                  { "source": 72, "target": 26, "value": 2 },
                  { "source": 72, "target": 27, "value": 1 },
                  { "source": 72, "target": 11, "value": 1 },
                  { "source": 73, "target": 48, "value": 2 },
                  { "source": 74, "target": 48, "value": 2 },
                  { "source": 74, "target": 73, "value": 3 },
                  { "source": 75, "target": 69, "value": 3 },
                  { "source": 75, "target": 68, "value": 3 },
                  { "source": 75, "target": 25, "value": 3 },
                  { "source": 75, "target": 48, "value": 1 },
                  { "source": 75, "target": 41, "value": 1 },
                  { "source": 75, "target": 70, "value": 1 },
                  { "source": 75, "target": 71, "value": 1 },
                  { "source": 76, "target": 64, "value": 1 },
                  { "source": 76, "target": 65, "value": 1 },
                  { "source": 76, "target": 66, "value": 1 },
                  { "source": 76, "target": 63, "value": 1 },
                  { "source": 76, "target": 62, "value": 1 },
                  { "source": 76, "target": 48, "value": 1 },
                  { "source": 76, "target": 58, "value": 1 }
                ]
            },
            vertex: {
                annotationIcons: [{ faChar: "\uf188", tooltip: "Test A", shape_colorFill: "white", image_colorFill: "red" }, { faChar: "\uf0ad", tooltip: "Test B", shape_colorFill: "green", shape_colorStroke: "green", image_colorFill: "white" }, { faChar: "\uf193", tooltip: "Test C", shape_colorFill: "navy", shape_colorStroke: "navy", image_colorFill: "white" }]
            }
        },
        Marshaller: {
            simple: {
                ddlUrl: '[ { "visualizations": [ { "color": "Red_Yellow_Blue", "id": "statesummary", "source": { "output": "View_statesummary", "mappings": { "weight": "Cnt", "state": "clean_st" }, "id": "statesum" }, "type": "CHORO", "title": "Count by State", "events": { "click": { "mappings": { "clean_st": "clean_st" }, "updates": [ { "visualization": "statedetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, "onSelect": { "mappings": { "clean_st": "clean_st" }, "updates": [ { "visualization": "statedetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, { "id": "statedetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_statedetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "State Error Details" }, { "color": "Red_Yellow_Blue", "id": "errorsummary", "source": { "output": "View_errorsummary", "mappings": { "weight": "Cnt", "label": "clean_error" }, "id": "errorsum" }, "type": "PIE", "title": "Count by error--aggregated client side", "events": { "click": { "mappings": { "clean_error": "clean_error" }, "updates": [ { "visualization": "errordetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, "onSelect": { "mappings": { "clean_error": "clean_error" }, "updates": [ { "visualization": "errordetails", "instance": "Ins001", "datasource": "details", "merge": false }, { "visualization": "alldetails", "instance": "Ins001", "datasource": "details", "merge": false } ] } }, { "id": "errordetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_errordetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "Error Code Details" }, { "id": "alldetails", "label": [ "State", "Error", "Count" ], "source": { "output": "View_alldetails", "mappings": { "value": [ "clean_st", "clean_error", "Cnt" ] }, "id": "details" }, "type": "TABLE", "title": "Details updated from both count by state and count by error" } ], "datasources": [ { "outputs": [ { "from": "View_statesummary", "id": "View_statesummary", "notify": [ "statesummary" ] } ], "databomb": true, "id": "statesum" }, { "outputs": [ { "from": "View_errorsummary", "id": "View_errorsummary", "notify": [ "errorsummary" ] } ], "databomb": true, "id": "errorsum" }, { "filter": [ "clean_st", "clean_error" ], "outputs": [ { "from": "View_statedetails", "id": "View_statedetails", "notify": [ "statedetails" ] }, { "from": "View_errordetails", "id": "View_errordetails", "notify": [ "errordetails" ] }, { "from": "View_alldetails", "id": "View_alldetails", "notify": [ "alldetails" ] } ], "databomb": true, "id": "details" } ], "enable": "true", "id": "Ins001_DatabombDashboard", "label": "DatabombDashboard", "title": "Databomb Dashboard", "primary": false } ]',
                databomb: '{"errorsum":[{"clean_error":"E212","Cnt":"1"},{"clean_error":"E214","Cnt":"3"},{"clean_error":"E216","Cnt":"1"},{"clean_error":"E412","Cnt":"204"},{"clean_error":"E421","Cnt":"174"},{"clean_error":"E422","Cnt":"43"},{"clean_error":"E423","Cnt":"6"},{"clean_error":"E427","Cnt":"24"},{"clean_error":"E430","Cnt":"1"},{"clean_error":"E505","Cnt":"2"},{"clean_error":"E600","Cnt":"7"},{"clean_error":"S400","Cnt":"3"},{"clean_error":"S800","Cnt":"19370"},{"clean_error":"S810","Cnt":"10"},{"clean_error":"S820","Cnt":"49"},{"clean_error":"S840","Cnt":"2"},{"clean_error":"S860","Cnt":"3"},{"clean_error":"S880","Cnt":"26"},{"clean_error":"S890","Cnt":"9"},{"clean_error":"S891","Cnt":"1"},{"clean_error":"S8A0","Cnt":"3"},{"clean_error":"S8B0","Cnt":"2"},{"clean_error":"S8C0","Cnt":"2"},{"clean_error":"S900","Cnt":"22"},{"clean_error":"S910","Cnt":"4"},{"clean_error":"S920","Cnt":"2"},{"clean_error":"S980","Cnt":"1"},{"clean_error":"SA00","Cnt":"21"},{"clean_error":"SB00","Cnt":"3"},{"clean_error":"SC10","Cnt":"1"}],"statesum":[{"clean_st":"AK","Cnt":"57"},{"clean_st":"AL","Cnt":"225"},{"clean_st":"AR","Cnt":"140"},{"clean_st":"AZ","Cnt":"342"},{"clean_st":"CA","Cnt":"2695"},{"clean_st":"CO","Cnt":"459"},{"clean_st":"CT","Cnt":"246"},{"clean_st":"DC","Cnt":"91"},{"clean_st":"DE","Cnt":"33"},{"clean_st":"FL","Cnt":"1924"},{"clean_st":"GA","Cnt":"683"},{"clean_st":"GU","Cnt":"1"},{"clean_st":"HI","Cnt":"54"},{"clean_st":"IA","Cnt":"163"},{"clean_st":"ID","Cnt":"139"},{"clean_st":"IL","Cnt":"718"},{"clean_st":"IN","Cnt":"318"},{"clean_st":"KS","Cnt":"155"},{"clean_st":"KY","Cnt":"211"},{"clean_st":"LA","Cnt":"279"},{"clean_st":"MA","Cnt":"450"},{"clean_st":"MD","Cnt":"459"},{"clean_st":"ME","Cnt":"57"},{"clean_st":"MI","Cnt":"554"},{"clean_st":"MN","Cnt":"419"},{"clean_st":"MO","Cnt":"297"},{"clean_st":"MS","Cnt":"201"},{"clean_st":"MT","Cnt":"73"},{"clean_st":"NC","Cnt":"433"},{"clean_st":"ND","Cnt":"35"},{"clean_st":"NE","Cnt":"108"},{"clean_st":"NH","Cnt":"97"},{"clean_st":"NJ","Cnt":"505"},{"clean_st":"NM","Cnt":"92"},{"clean_st":"NV","Cnt":"142"},{"clean_st":"NY","Cnt":"1237"},{"clean_st":"OH","Cnt":"652"},{"clean_st":"OK","Cnt":"190"},{"clean_st":"OR","Cnt":"316"},{"clean_st":"PA","Cnt":"678"},{"clean_st":"PR","Cnt":"9"},{"clean_st":"RI","Cnt":"77"},{"clean_st":"SC","Cnt":"209"},{"clean_st":"SD","Cnt":"46"},{"clean_st":"TN","Cnt":"378"},{"clean_st":"TX","Cnt":"1794"},{"clean_st":"UT","Cnt":"189"},{"clean_st":"VA","Cnt":"473"},{"clean_st":"VI","Cnt":"3"},{"clean_st":"VT","Cnt":"43"},{"clean_st":"WA","Cnt":"456"},{"clean_st":"WI","Cnt":"302"},{"clean_st":"WV","Cnt":"61"},{"clean_st":"WY","Cnt":"29"}],"details":[{"clean_st":"LA","clean_error":"S900","Cnt":"1"},{"clean_st":"WA","clean_error":"E422","Cnt":"3"},{"clean_st":"SC","clean_error":"S800","Cnt":"203"},{"clean_st":"NM","clean_error":"E427","Cnt":"3"},{"clean_st":"WY","clean_error":"S820","Cnt":"1"},{"clean_st":"KS","clean_error":"SC10","Cnt":"1"},{"clean_st":"WA","clean_error":"E423","Cnt":"1"},{"clean_st":"PR","clean_error":"S800","Cnt":"8"},{"clean_st":"NE","clean_error":"E412","Cnt":"2"},{"clean_st":"NH","clean_error":"S800","Cnt":"93"},{"clean_st":"OR","clean_error":"S840","Cnt":"1"},{"clean_st":"TX","clean_error":"E421","Cnt":"13"},{"clean_st":"NH","clean_error":"E412","Cnt":"1"},{"clean_st":"FL","clean_error":"SA00","Cnt":"4"},{"clean_st":"GA","clean_error":"E427","Cnt":"2"},{"clean_st":"AZ","clean_error":"S900","Cnt":"2"},{"clean_st":"SD","clean_error":"E412","Cnt":"1"},{"clean_st":"NC","clean_error":"E421","Cnt":"2"},{"clean_st":"MO","clean_error":"S880","Cnt":"1"},{"clean_st":"MI","clean_error":"SB00","Cnt":"1"},{"clean_st":"IL","clean_error":"S920","Cnt":"1"},{"clean_st":"WI","clean_error":"E421","Cnt":"7"},{"clean_st":"LA","clean_error":"S800","Cnt":"270"},{"clean_st":"GA","clean_error":"E412","Cnt":"8"},{"clean_st":"CA","clean_error":"E421","Cnt":"20"},{"clean_st":"KY","clean_error":"E421","Cnt":"1"},{"clean_st":"MI","clean_error":"E412","Cnt":"3"},{"clean_st":"MO","clean_error":"S800","Cnt":"285"},{"clean_st":"WI","clean_error":"E422","Cnt":"2"},{"clean_st":"PA","clean_error":"SA00","Cnt":"1"},{"clean_st":"CA","clean_error":"E422","Cnt":"2"},{"clean_st":"FL","clean_error":"E422","Cnt":"5"},{"clean_st":"WI","clean_error":"S800","Cnt":"262"},{"clean_st":"CO","clean_error":"S820","Cnt":"1"},{"clean_st":"NY","clean_error":"S900","Cnt":"1"},{"clean_st":"TX","clean_error":"SA00","Cnt":"6"},{"clean_st":"WA","clean_error":"E412","Cnt":"1"},{"clean_st":"CA","clean_error":"E423","Cnt":"1"},{"clean_st":"CO","clean_error":"S900","Cnt":"2"},{"clean_st":"NC","clean_error":"E422","Cnt":"3"},{"clean_st":"","clean_error":"E214","Cnt":"2"},{"clean_st":"RI","clean_error":"S800","Cnt":"77"},{"clean_st":"MN","clean_error":"S840","Cnt":"1"},{"clean_st":"TN","clean_error":"E422","Cnt":"2"},{"clean_st":"TX","clean_error":"E505","Cnt":"1"},{"clean_st":"FL","clean_error":"E600","Cnt":"1"},{"clean_st":"MO","clean_error":"S820","Cnt":"1"},{"clean_st":"WV","clean_error":"S810","Cnt":"1"},{"clean_st":"MN","clean_error":"E412","Cnt":"5"},{"clean_st":"ND","clean_error":"S800","Cnt":"29"},{"clean_st":"WI","clean_error":"S820","Cnt":"29"},{"clean_st":"TN","clean_error":"E423","Cnt":"1"},{"clean_st":"IA","clean_error":"E412","Cnt":"5"},{"clean_st":"NE","clean_error":"S800","Cnt":"105"},{"clean_st":"GA","clean_error":"S8A0","Cnt":"1"},{"clean_st":"CA","clean_error":"S900","Cnt":"1"},{"clean_st":"FL","clean_error":"E421","Cnt":"12"},{"clean_st":"AK","clean_error":"E412","Cnt":"1"},{"clean_st":"","clean_error":"E212","Cnt":"1"},{"clean_st":"TX","clean_error":"E427","Cnt":"1"},{"clean_st":"CO","clean_error":"S880","Cnt":"1"},{"clean_st":"FL","clean_error":"S800","Cnt":"1885"},{"clean_st":"WV","clean_error":"E412","Cnt":"3"},{"clean_st":"NV","clean_error":"S800","Cnt":"138"},{"clean_st":"WI","clean_error":"S900","Cnt":"1"},{"clean_st":"NY","clean_error":"S910","Cnt":"1"},{"clean_st":"TX","clean_error":"E412","Cnt":"14"},{"clean_st":"TN","clean_error":"E421","Cnt":"5"},{"clean_st":"AL","clean_error":"S800","Cnt":"219"},{"clean_st":"NC","clean_error":"S800","Cnt":"422"},{"clean_st":"OH","clean_error":"S880","Cnt":"1"},{"clean_st":"ND","clean_error":"E421","Cnt":"1"},{"clean_st":"FL","clean_error":"E427","Cnt":"3"},{"clean_st":"DE","clean_error":"S800","Cnt":"32"},{"clean_st":"AR","clean_error":"E421","Cnt":"3"},{"clean_st":"MN","clean_error":"E421","Cnt":"5"},{"clean_st":"PA","clean_error":"S810","Cnt":"1"},{"clean_st":"ID","clean_error":"E412","Cnt":"6"},{"clean_st":"AK","clean_error":"S800","Cnt":"55"},{"clean_st":"NM","clean_error":"E412","Cnt":"5"},{"clean_st":"OR","clean_error":"E423","Cnt":"1"},{"clean_st":"MS","clean_error":"S800","Cnt":"192"},{"clean_st":"CO","clean_error":"E422","Cnt":"1"},{"clean_st":"AZ","clean_error":"S800","Cnt":"329"},{"clean_st":"ID","clean_error":"S820","Cnt":"4"},{"clean_st":"WY","clean_error":"S810","Cnt":"1"},{"clean_st":"ND","clean_error":"E427","Cnt":"2"},{"clean_st":"PR","clean_error":"E412","Cnt":"1"},{"clean_st":"NY","clean_error":"SB00","Cnt":"1"},{"clean_st":"KS","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"S800","Cnt":"541"},{"clean_st":"MA","clean_error":"S880","Cnt":"1"},{"clean_st":"WV","clean_error":"S900","Cnt":"1"},{"clean_st":"AZ","clean_error":"E421","Cnt":"7"},{"clean_st":"OK","clean_error":"S820","Cnt":"1"},{"clean_st":"LA","clean_error":"E412","Cnt":"3"},{"clean_st":"OR","clean_error":"E421","Cnt":"2"},{"clean_st":"NE","clean_error":"E422","Cnt":"1"},{"clean_st":"MN","clean_error":"E422","Cnt":"1"},{"clean_st":"AR","clean_error":"E422","Cnt":"1"},{"clean_st":"PA","clean_error":"E505","Cnt":"1"},{"clean_st":"MD","clean_error":"S880","Cnt":"2"},{"clean_st":"SC","clean_error":"E421","Cnt":"1"},{"clean_st":"LA","clean_error":"S910","Cnt":"1"},{"clean_st":"UT","clean_error":"SB00","Cnt":"1"},{"clean_st":"CO","clean_error":"E421","Cnt":"3"},{"clean_st":"HI","clean_error":"E421","Cnt":"1"},{"clean_st":"DE","clean_error":"E412","Cnt":"1"},{"clean_st":"ME","clean_error":"S800","Cnt":"54"},{"clean_st":"NY","clean_error":"E412","Cnt":"10"},{"clean_st":"KY","clean_error":"S800","Cnt":"209"},{"clean_st":"OK","clean_error":"S800","Cnt":"180"},{"clean_st":"IN","clean_error":"E412","Cnt":"4"},{"clean_st":"KS","clean_error":"E421","Cnt":"1"},{"clean_st":"GA","clean_error":"S900","Cnt":"1"},{"clean_st":"AZ","clean_error":"E422","Cnt":"4"},{"clean_st":"SC","clean_error":"E427","Cnt":"2"},{"clean_st":"LA","clean_error":"E421","Cnt":"2"},{"clean_st":"OR","clean_error":"E412","Cnt":"1"},{"clean_st":"CT","clean_error":"E412","Cnt":"6"},{"clean_st":"WA","clean_error":"S800","Cnt":"445"},{"clean_st":"MN","clean_error":"E427","Cnt":"5"},{"clean_st":"FL","clean_error":"E412","Cnt":"7"},{"clean_st":"CA","clean_error":"SA00","Cnt":"1"},{"clean_st":"MT","clean_error":"E412","Cnt":"2"},{"clean_st":"AL","clean_error":"SA00","Cnt":"1"},{"clean_st":"IN","clean_error":"E421","Cnt":"1"},{"clean_st":"CA","clean_error":"S880","Cnt":"4"},{"clean_st":"GU","clean_error":"S800","Cnt":"1"},{"clean_st":"UT","clean_error":"S900","Cnt":"2"},{"clean_st":"CT","clean_error":"S890","Cnt":"1"},{"clean_st":"AK","clean_error":"S900","Cnt":"1"},{"clean_st":"OK","clean_error":"S810","Cnt":"2"},{"clean_st":"ND","clean_error":"E412","Cnt":"2"},{"clean_st":"NJ","clean_error":"E421","Cnt":"2"},{"clean_st":"NM","clean_error":"S800","Cnt":"84"},{"clean_st":"UT","clean_error":"S820","Cnt":"5"},{"clean_st":"VA","clean_error":"S8B0","Cnt":"1"},{"clean_st":"CA","clean_error":"S910","Cnt":"1"},{"clean_st":"VA","clean_error":"E412","Cnt":"3"},{"clean_st":"NJ","clean_error":"E422","Cnt":"1"},{"clean_st":"IN","clean_error":"E422","Cnt":"1"},{"clean_st":"TX","clean_error":"S900","Cnt":"1"},{"clean_st":"WY","clean_error":"E412","Cnt":"4"},{"clean_st":"WV","clean_error":"S800","Cnt":"54"},{"clean_st":"MI","clean_error":"S900","Cnt":"2"},{"clean_st":"NV","clean_error":"E412","Cnt":"3"},{"clean_st":"NY","clean_error":"E427","Cnt":"1"},{"clean_st":"IL","clean_error":"S900","Cnt":"1"},{"clean_st":"IL","clean_error":"E412","Cnt":"13"},{"clean_st":"NJ","clean_error":"SA00","Cnt":"1"},{"clean_st":"WA","clean_error":"S8A0","Cnt":"1"},{"clean_st":"CA","clean_error":"S8C0","Cnt":"1"},{"clean_st":"CO","clean_error":"E412","Cnt":"7"},{"clean_st":"DC","clean_error":"E412","Cnt":"1"},{"clean_st":"GA","clean_error":"S800","Cnt":"660"},{"clean_st":"IA","clean_error":"S800","Cnt":"151"},{"clean_st":"WY","clean_error":"S800","Cnt":"23"},{"clean_st":"TN","clean_error":"E600","Cnt":"1"},{"clean_st":"MD","clean_error":"S800","Cnt":"445"},{"clean_st":"PA","clean_error":"E600","Cnt":"1"},{"clean_st":"NY","clean_error":"S8B0","Cnt":"1"},{"clean_st":"NJ","clean_error":"E427","Cnt":"1"},{"clean_st":"TX","clean_error":"S800","Cnt":"1751"},{"clean_st":"CT","clean_error":"E423","Cnt":"1"},{"clean_st":"OH","clean_error":"E412","Cnt":"5"},{"clean_st":"KS","clean_error":"S820","Cnt":"1"},{"clean_st":"NY","clean_error":"E600","Cnt":"1"},{"clean_st":"NJ","clean_error":"E412","Cnt":"5"},{"clean_st":"NY","clean_error":"E422","Cnt":"1"},{"clean_st":"OK","clean_error":"E412","Cnt":"2"},{"clean_st":"MA","clean_error":"E421","Cnt":"1"},{"clean_st":"AR","clean_error":"S820","Cnt":"1"},{"clean_st":"PA","clean_error":"S820","Cnt":"2"},{"clean_st":"MA","clean_error":"S910","Cnt":"1"},{"clean_st":"NY","clean_error":"E421","Cnt":"8"},{"clean_st":"UT","clean_error":"E412","Cnt":"9"},{"clean_st":"NY","clean_error":"S890","Cnt":"2"},{"clean_st":"CO","clean_error":"S800","Cnt":"443"},{"clean_st":"MN","clean_error":"S800","Cnt":"401"},{"clean_st":"FL","clean_error":"E214","Cnt":"1"},{"clean_st":"UT","clean_error":"S880","Cnt":"1"},{"clean_st":"OH","clean_error":"E421","Cnt":"7"},{"clean_st":"IN","clean_error":"S810","Cnt":"1"},{"clean_st":"CA","clean_error":"S800","Cnt":"2645"},{"clean_st":"OR","clean_error":"S800","Cnt":"311"},{"clean_st":"WA","clean_error":"S810","Cnt":"1"},{"clean_st":"FL","clean_error":"E216","Cnt":"1"},{"clean_st":"VT","clean_error":"E430","Cnt":"1"},{"clean_st":"NY","clean_error":"S800","Cnt":"1206"},{"clean_st":"IL","clean_error":"S800","Cnt":"696"},{"clean_st":"MS","clean_error":"E412","Cnt":"4"},{"clean_st":"NV","clean_error":"E422","Cnt":"1"},{"clean_st":"NC","clean_error":"SA00","Cnt":"1"},{"clean_st":"MA","clean_error":"S800","Cnt":"441"},{"clean_st":"MI","clean_error":"S880","Cnt":"1"},{"clean_st":"GA","clean_error":"E600","Cnt":"2"},{"clean_st":"TX","clean_error":"S891","Cnt":"1"},{"clean_st":"OH","clean_error":"E422","Cnt":"1"},{"clean_st":"IA","clean_error":"S8C0","Cnt":"1"},{"clean_st":"KS","clean_error":"S810","Cnt":"1"},{"clean_st":"CA","clean_error":"S890","Cnt":"3"},{"clean_st":"WI","clean_error":"S880","Cnt":"1"},{"clean_st":"VT","clean_error":"S800","Cnt":"37"},{"clean_st":"FL","clean_error":"S820","Cnt":"1"},{"clean_st":"VA","clean_error":"E421","Cnt":"4"},{"clean_st":"VA","clean_error":"S890","Cnt":"2"},{"clean_st":"PA","clean_error":"S900","Cnt":"1"},{"clean_st":"ME","clean_error":"E412","Cnt":"3"},{"clean_st":"MO","clean_error":"E421","Cnt":"4"},{"clean_st":"IL","clean_error":"E422","Cnt":"2"},{"clean_st":"CT","clean_error":"S800","Cnt":"238"},{"clean_st":"UT","clean_error":"E427","Cnt":"1"},{"clean_st":"MI","clean_error":"E422","Cnt":"1"},{"clean_st":"ND","clean_error":"S880","Cnt":"1"},{"clean_st":"TN","clean_error":"S800","Cnt":"369"},{"clean_st":"IL","clean_error":"E421","Cnt":"3"},{"clean_st":"MO","clean_error":"E422","Cnt":"3"},{"clean_st":"MT","clean_error":"E421","Cnt":"1"},{"clean_st":"VI","clean_error":"E421","Cnt":"2"},{"clean_st":"ID","clean_error":"S800","Cnt":"126"},{"clean_st":"MA","clean_error":"E412","Cnt":"6"},{"clean_st":"MS","clean_error":"S900","Cnt":"1"},{"clean_st":"VA","clean_error":"S800","Cnt":"461"},{"clean_st":"LA","clean_error":"S880","Cnt":"2"},{"clean_st":"SD","clean_error":"S800","Cnt":"43"},{"clean_st":"VT","clean_error":"E412","Cnt":"3"},{"clean_st":"FL","clean_error":"S880","Cnt":"2"},{"clean_st":"NC","clean_error":"S980","Cnt":"1"},{"clean_st":"TX","clean_error":"E600","Cnt":"1"},{"clean_st":"MD","clean_error":"SA00","Cnt":"1"},{"clean_st":"AL","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"E421","Cnt":"4"},{"clean_st":"HI","clean_error":"S800","Cnt":"53"},{"clean_st":"IA","clean_error":"S920","Cnt":"1"},{"clean_st":"VI","clean_error":"E412","Cnt":"1"},{"clean_st":"OH","clean_error":"SA00","Cnt":"1"},{"clean_st":"AL","clean_error":"E421","Cnt":"2"},{"clean_st":"MD","clean_error":"E421","Cnt":"5"},{"clean_st":"PA","clean_error":"E412","Cnt":"11"},{"clean_st":"IA","clean_error":"E427","Cnt":"1"},{"clean_st":"FL","clean_error":"S900","Cnt":"2"},{"clean_st":"MS","clean_error":"E421","Cnt":"4"},{"clean_st":"UT","clean_error":"E422","Cnt":"3"},{"clean_st":"NH","clean_error":"E421","Cnt":"3"},{"clean_st":"AL","clean_error":"E427","Cnt":"2"},{"clean_st":"UT","clean_error":"E421","Cnt":"2"},{"clean_st":"VA","clean_error":"SA00","Cnt":"2"},{"clean_st":"SD","clean_error":"E421","Cnt":"2"},{"clean_st":"AR","clean_error":"S900","Cnt":"1"},{"clean_st":"OK","clean_error":"E422","Cnt":"1"},{"clean_st":"MI","clean_error":"S820","Cnt":"1"},{"clean_st":"KY","clean_error":"E412","Cnt":"1"},{"clean_st":"NY","clean_error":"S880","Cnt":"2"},{"clean_st":"MO","clean_error":"E412","Cnt":"3"},{"clean_st":"WV","clean_error":"E422","Cnt":"1"},{"clean_st":"MT","clean_error":"S860","Cnt":"1"},{"clean_st":"OK","clean_error":"E423","Cnt":"1"},{"clean_st":"CA","clean_error":"E412","Cnt":"16"},{"clean_st":"MD","clean_error":"E412","Cnt":"6"},{"clean_st":"NJ","clean_error":"S800","Cnt":"495"},{"clean_st":"NC","clean_error":"E412","Cnt":"4"},{"clean_st":"TX","clean_error":"S860","Cnt":"2"},{"clean_st":"PA","clean_error":"E421","Cnt":"11"},{"clean_st":"IA","clean_error":"E422","Cnt":"1"},{"clean_st":"NY","clean_error":"SA00","Cnt":"2"},{"clean_st":"IL","clean_error":"S8A0","Cnt":"1"},{"clean_st":"GA","clean_error":"S880","Cnt":"1"},{"clean_st":"WV","clean_error":"E421","Cnt":"1"},{"clean_st":"IL","clean_error":"S810","Cnt":"1"},{"clean_st":"IA","clean_error":"S880","Cnt":"2"},{"clean_st":"MT","clean_error":"S800","Cnt":"69"},{"clean_st":"VT","clean_error":"E421","Cnt":"2"},{"clean_st":"SC","clean_error":"E412","Cnt":"2"},{"clean_st":"IN","clean_error":"S800","Cnt":"311"},{"clean_st":"UT","clean_error":"S800","Cnt":"165"},{"clean_st":"GA","clean_error":"E421","Cnt":"8"},{"clean_st":"CO","clean_error":"S890","Cnt":"1"},{"clean_st":"OK","clean_error":"E421","Cnt":"3"},{"clean_st":"ID","clean_error":"E421","Cnt":"3"},{"clean_st":"KS","clean_error":"S800","Cnt":"150"},{"clean_st":"SC","clean_error":"S820","Cnt":"1"},{"clean_st":"TX","clean_error":"S880","Cnt":"3"},{"clean_st":"MN","clean_error":"S810","Cnt":"1"},{"clean_st":"OH","clean_error":"S800","Cnt":"637"},{"clean_st":"AR","clean_error":"S800","Cnt":"134"},{"clean_st":"PA","clean_error":"S800","Cnt":"647"},{"clean_st":"IA","clean_error":"E421","Cnt":"1"},{"clean_st":"PA","clean_error":"E422","Cnt":"2"},{"clean_st":"WA","clean_error":"E421","Cnt":"4"},{"clean_st":"DC","clean_error":"S800","Cnt":"90"}]}'
            },
            hipie: {
                ddlUrl: "http://10.241.100.159:8002/WsEcl/submit/query/roxie/hipie_testrelavator3.ins002_service/json"
            }
        },
        Counties: {
            simple: {
                columns:["County", "Weight"],
                rawData: [
                    { "county": 1073, "county_name": "JEFFERSON", "weight": 29.946185501741 }, { "county": 1097, "county_name": "MOBILE", "weight": 0.79566003616637 }, { "county": 1117, "county_name": "SHELBY", "weight": 1.5223596574691 }, { "county": 4005, "county_name": "COCONINO", "weight": 27.311773623042 }, { "county": 4013, "county_name": "MARICOPA", "weight": 34.386239749349 }, { "county": 4015, "county_name": "MOHAVE", "weight": 34.670437987486 }, { "county": 4019, "county_name": "PIMA", "weight": 31.969766028563 }, { "county": 4021, "county_name": "PINAL", "weight": 32.050522991908 }, { "county": 4025, "county_name": "YAVAPAI", "weight": 34.134956874683 }, { "county": 4027, "county_name": "YUMA", "weight": 39.511527048619 }, { "county": 5119, "county_name": "PULASKI", "weight": 21.796200345423 }, { "county": 6001, "county_name": "ALAMEDA", "weight": 30.243180376401 }, { "county": 6007, "county_name": "BUTTE", "weight": 32.895132965379 }, { "county": 6009, "county_name": "CALAVERAS", "weight": 31.181727904667 }, { "county": 6013, "county_name": "CONTRA COSTA", "weight": 32.185196670086 }, { "county": 6017, "county_name": "EL DORADO", "weight": 33.085461795452 }, { "county": 6019, "county_name": "FRESNO", "weight": 31.700962642409 }, { "county": 6023, "county_name": "HUMBOLDT", "weight": 31.504164625184 }, { "county": 6025, "county_name": "IMPERIAL", "weight": 33.086419753086 }, { "county": 6029, "county_name": "KERN", "weight": 31.370903445093 }, { "county": 6031, "county_name": "KINGS", "weight": 30.037376826368 }, { "county": 6037, "county_name": "LOS ANGELES", "weight": 32.862228288436 }, { "county": 6039, "county_name": "MADERA", "weight": 31.691553376421 }, { "county": 6041, "county_name": "MARIN", "weight": 33.940594059406 }, { "county": 6045, "county_name": "MENDOCINO", "weight": 32.19390926041 }, { "county": 6047, "county_name": "MERCED", "weight": 17.699115044248 }, { "county": 6053, "county_name": "MONTEREY", "weight": 34.339622641509 }, { "county": 6055, "county_name": "NAPA", "weight": 34.272114240381 }, { "county": 6057, "county_name": "NEVADA", "weight": 34.12581216775 }, { "county": 6059, "county_name": "ORANGE", "weight": 34.094352964946 }, { "county": 6061, "county_name": "PLACER", "weight": 33.368700265252 }, { "county": 6065, "county_name": "RIVERSIDE", "weight": 34.378409504182 }, { "county": 6067, "county_name": "SACRAMENTO", "weight": 31.127455133963 }, { "county": 6071, "county_name": "SAN BERNARDINO", "weight": 28.061278815951 }, { "county": 6073, "county_name": "SAN DIEGO", "weight": 33.416802684537 }, { "county": 6075, "county_name": "SAN FRANCISCO", "weight": 32.679686882265 }, { "county": 6077, "county_name": "SAN JOAQUIN", "weight": 33.220663908788 }, { "county": 6079, "county_name": "SAN LUIS OBISPO", "weight": 34.654426692559 }, { "county": 6081, "county_name": "SAN MATEO", "weight": 38.130056937369 }, { "county": 6083, "county_name": "SANTA BARBARA", "weight": 33.631012786686 }, { "county": 6085, "county_name": "SANTA CLARA", "weight": 23.539289157001 }, { "county": 6087, "county_name": "SANTA CRUZ", "weight": 33.450792851749 }, { "county": 6089, "county_name": "SHASTA", "weight": 33.199951497514 }, { "county": 6095, "county_name": "SOLANO", "weight": 29.988272742503 }, { "county": 6097, "county_name": "SONOMA", "weight": 32.117851341511 }, { "county": 6099, "county_name": "STANISLAUS", "weight": 28.860983743226 }, { "county": 6101, "county_name": "SUTTER", "weight": 30.02277904328 }, { "county": 6107, "county_name": "TULARE", "weight": 30.886966441677 }, { "county": 6111, "county_name": "VENTURA", "weight": 32.241761994195 }, { "county": 6113, "county_name": "YOLO", "weight": 33.095684803002 }, { "county": 8001, "county_name": "ADAMS", "weight": 36.59961064244 }, { "county": 8005, "county_name": "ARAPAHOE", "weight": 35.375019172759 }, { "county": 8013, "county_name": "BOULDER", "weight": 14.409178959917 }, { "county": 8031, "county_name": "DENVER", "weight": 29.526387009472 }, { "county": 8035, "county_name": "DOUGLAS", "weight": 34.816606207175 }, { "county": 8041, "county_name": "EL PASO", "weight": 35.803302523627 }, { "county": 8059, "county_name": "JEFFERSON", "weight": 30.013848159009 }, { "county": 8069, "county_name": "LARIMER", "weight": 31.525663161199 }, { "county": 8077, "county_name": "MESA", "weight": 6.4506267196576 }, { "county": 8101, "county_name": "PUEBLO", "weight": 13.887799136916 }, { "county": 8123, "county_name": "WELD", "weight": 13.152569809794 }, { "county": 9001, "county_name": "FAIRFIELD", "weight": 5.7392073825928 }, { "county": 9003, "county_name": "HARTFORD", "weight": 4.1802067946824 }, { "county": 9005, "county_name": "LITCHFIELD", "weight": 4.0793517742386 }, { "county": 9007, "county_name": "MIDDLESEX", "weight": 5.5014146494813 }, { "county": 9009, "county_name": "NEW HAVEN", "weight": 4.5156537753223 }, { "county": 9011, "county_name": "NEW LONDON", "weight": 5.0602409638554 }, { "county": 10003, "county_name": "NEW CASTLE", "weight": 32.839907589629 }, { "county": 11001, "county_name": "DISTRICT OF COLUMBIA", "weight": 9.2949842160645 }, { "county": 12001, "county_name": "ALACHUA", "weight": 10.877270713336 }, { "county": 12005, "county_name": "BAY", "weight": 36.272040302267 }, { "county": 12009, "county_name": "BREVARD", "weight": 11.407698791795 }, { "county": 12011, "county_name": "BROWARD", "weight": 23.280277164089 }, { "county": 12015, "county_name": "CHARLOTTE", "weight": 12.530881141916 }, { "county": 12017, "county_name": "CITRUS", "weight": 31.700110796504 }, { "county": 12019, "county_name": "CLAY", "weight": 35.153278138286 }, { "county": 12021, "county_name": "COLLIER", "weight": 15.993998499625 }, { "county": 12031, "county_name": "DUVAL", "weight": 34.893654890095 }, { "county": 12033, "county_name": "ESCAMBIA", "weight": 11.185959936182 }, { "county": 12035, "county_name": "FLAGLER", "weight": 18.70760442699 }, { "county": 12053, "county_name": "HERNANDO", "weight": 9.1261739485504 }, { "county": 12055, "county_name": "HIGHLANDS", "weight": 28.057742782152 }, { "county": 12057, "county_name": "HILLSBOROUGH", "weight": 26.866557815051 }, { "county": 12061, "county_name": "INDIAN RIVER", "weight": 10.33669311602 }, { "county": 12069, "county_name": "LAKE", "weight": 13.579952267303 }, { "county": 12071, "county_name": "LEE", "weight": 13.640759797284 }, { "county": 12073, "county_name": "LEON", "weight": 10.285270716088 }, { "county": 12081, "county_name": "MANATEE", "weight": 14.247875510429 }, { "county": 12083, "county_name": "MARION", "weight": 33.329608938547 }, { "county": 12085, "county_name": "MARTIN", "weight": 19.259129213483 }, { "county": 12086, "county_name": "MIAMI-DADE", "weight": 27.092726418329 }, { "county": 12087, "county_name": "MONROE", "weight": 19.3515704154 }, { "county": 12091, "county_name": "OKALOOSA", "weight": 29.375576745617 }, { "county": 12095, "county_name": "ORANGE", "weight": 29.856149076143 }, { "county": 12097, "county_name": "OSCEOLA", "weight": 14.039249514772 }, { "county": 12099, "county_name": "PALM BEACH", "weight": 30.592551486003 }, { "county": 12101, "county_name": "PASCO", "weight": 25.170105355575 }, { "county": 12103, "county_name": "PINELLAS", "weight": 28.425946424618 }, { "county": 12105, "county_name": "POLK", "weight": 28.673352628391 }, { "county": 12109, "county_name": "ST. JOHNS", "weight": 35.882708585248 }, { "county": 12111, "county_name": "ST. LUCIE", "weight": 12.200208550574 }, { "county": 12113, "county_name": "SANTA ROSA", "weight": 13.362801768106 }, { "county": 12115, "county_name": "SARASOTA", "weight": 33.847820200379 }, { "county": 12117, "county_name": "SEMINOLE", "weight": 26.554468579008 }, { "county": 12127, "county_name": "VOLUSIA", "weight": 26.636455186304 }, { "county": 12131, "county_name": "WALTON", "weight": 31.245500359971 }, { "county": 13067, "county_name": "COBB", "weight": 4.539857154585 }, { "county": 13089, "county_name": "DEKALB", "weight": 9.747504403993 }, { "county": 13121, "county_name": "FULTON", "weight": 13.174338679442 }, { "county": 13135, "county_name": "GWINNETT", "weight": 6.4834390415786 }, { "county": 15001, "county_name": "HAWAII", "weight": 15.918023582257 }, { "county": 15003, "county_name": "HONOLULU", "weight": 22.138866719872 }, { "county": 15007, "county_name": "KAUAI", "weight": 63.105998356615 }, { "county": 15009, "county_name": "MAUI", "weight": 27.947348340328 }, { "county": 17031, "county_name": "COOK", "weight": 13.833973012769 }, { "county": 17043, "county_name": "DUPAGE", "weight": 30.967531997975 }, { "county": 17089, "county_name": "KANE", "weight": 33.050309474687 }, { "county": 17097, "county_name": "LAKE", "weight": 11.594933064632 }, { "county": 17111, "county_name": "MCHENRY", "weight": 32.527401676338 }, { "county": 17143, "county_name": "PEORIA", "weight": 4.8459804658152 }, { "county": 17163, "county_name": "ST. CLAIR", "weight": 5.1138238205213 }, { "county": 17197, "county_name": "WILL", "weight": 26.516622872158 }, { "county": 17201, "county_name": "WINNEBAGO", "weight": 5.1221247332227 }, { "county": 18097, "county_name": "MARION", "weight": 12.886209495102 }, { "county": 22033, "county_name": "EAST BATON ROUGE", "weight": 3.0595813204509 }, { "county": 24003, "county_name": "ANNE ARUNDEL", "weight": 6.6849100860047 }, { "county": 24005, "county_name": "BALTIMORE", "weight": 5.1798561151079 }, { "county": 24013, "county_name": "CARROLL", "weight": 7.6580226904376 }, { "county": 24017, "county_name": "CHARLES", "weight": 5.6275122822689 }, { "county": 24021, "county_name": "FREDERICK", "weight": 5.8358521274122 }, { "county": 24025, "county_name": "HARFORD", "weight": 7.137490608565 }, { "county": 24027, "county_name": "HOWARD", "weight": 6.3063063063063 }, { "county": 24031, "county_name": "MONTGOMERY", "weight": 6.4765062307077 }, { "county": 24033, "county_name": "PRINCE GEORGES", "weight": 6.9953804091638 }, { "county": 24043, "county_name": "WASHINGTON", "weight": 7.9417293233083 }, { "county": 24047, "county_name": "WORCESTER", "weight": 16.55126937026 }, { "county": 24510, "county_name": "BALTIMORE CITY", "weight": 8.2386000766381 }, { "county": 25001, "county_name": "BARNSTABLE", "weight": 17.454806656291 }, { "county": 25005, "county_name": "BRISTOL", "weight": 7.4465049928673 }, { "county": 25009, "county_name": "ESSEX", "weight": 12.506881996697 }, { "county": 25013, "county_name": "HAMPDEN", "weight": 8.0384380719951 }, { "county": 25017, "county_name": "MIDDLESEX", "weight": 27.939008042895 }, { "county": 25021, "county_name": "NORFOLK", "weight": 24.315648164361 }, { "county": 25023, "county_name": "PLYMOUTH", "weight": 13.348746653687 }, { "county": 25025, "county_name": "SUFFOLK", "weight": 12.415510494486 }, { "county": 25027, "county_name": "WORCESTER", "weight": 8.4754797441365 }, { "county": 26049, "county_name": "GENESEE", "weight": 7.9543628475012 }, { "county": 26065, "county_name": "INGHAM", "weight": 6.1461497230659 }, { "county": 26075, "county_name": "JACKSON", "weight": 3.9448669201521 }, { "county": 26081, "county_name": "KENT", "weight": 3.5925196850394 }, { "county": 26093, "county_name": "LIVINGSTON", "weight": 4.7977422389464 }, { "county": 26099, "county_name": "MACOMB", "weight": 8.4649655731065 }, { "county": 26145, "county_name": "SAGINAW", "weight": 3.8956266078648 }, { "county": 26161, "county_name": "WASHTENAW", "weight": 12.490241998439 }, { "county": 27003, "county_name": "ANOKA", "weight": 35.361438748102 }, { "county": 27019, "county_name": "CARVER", "weight": 35.444806707033 }, { "county": 27037, "county_name": "DAKOTA", "weight": 3.7469454249253 }, { "county": 27053, "county_name": "HENNEPIN", "weight": 25.479191584629 }, { "county": 27123, "county_name": "RAMSEY", "weight": 27.0296014068 }, { "county": 27137, "county_name": "ST. LOUIS", "weight": 13.218235770165 }, { "county": 27139, "county_name": "SCOTT", "weight": 4.1739130434783 }, { "county": 27163, "county_name": "WASHINGTON", "weight": 2.2402757262432 }, { "county": 27171, "county_name": "WRIGHT", "weight": 32.163742690058 }, { "county": 29095, "county_name": "JACKSON", "weight": 27.766490586482 }, { "county": 29183, "county_name": "ST. CHARLES", "weight": 31.629914829075 }, { "county": 29189, "county_name": "ST. LOUIS", "weight": 43.333848292909 }, { "county": 29510, "county_name": "SAINT LOUIS CITY", "weight": 32.204861111111 }, { "county": 31109, "county_name": "LANCASTER", "weight": 2.2465753424658 }, { "county": 32003, "county_name": "CLARK", "weight": 31.380314013042 }, { "county": 32031, "county_name": "WASHOE", "weight": 24.548452960578 }, { "county": 34001, "county_name": "ATLANTIC", "weight": 25.995919682165 }, { "county": 34003, "county_name": "BERGEN", "weight": 6.9890009165903 }, { "county": 34005, "county_name": "BURLINGTON", "weight": 10.048802129547 }, { "county": 34007, "county_name": "CAMDEN", "weight": 8.2412255187124 }, { "county": 34009, "county_name": "CAPE MAY", "weight": 19.508037018997 }, { "county": 34013, "county_name": "ESSEX", "weight": 9.9226139294927 }, { "county": 34015, "county_name": "GLOUCESTER", "weight": 30.202724105163 }, { "county": 34017, "county_name": "HUDSON", "weight": 24.161710197397 }, { "county": 34021, "county_name": "MERCER", "weight": 8.074222668004 }, { "county": 34023, "county_name": "MIDDLESEX", "weight": 9.2441860465116 }, { "county": 34025, "county_name": "MONMOUTH", "weight": 9.3353822512486 }, { "county": 34027, "county_name": "MORRIS", "weight": 17.225352112676 }, { "county": 34029, "county_name": "OCEAN", "weight": 37.018672038429 }, { "county": 34031, "county_name": "PASSAIC", "weight": 8.7633451957295 }, { "county": 34035, "county_name": "SOMERSET", "weight": 8.638148377764 }, { "county": 34037, "county_name": "SUSSEX", "weight": 29.534510433387 }, { "county": 34039, "county_name": "UNION", "weight": 31.89460476788 }, { "county": 34041, "county_name": "WARREN", "weight": 29.438717067583 }, { "county": 35001, "county_name": "BERNALILLO", "weight": 28.118628359592 }, { "county": 36001, "county_name": "ALBANY", "weight": 3.9375203384315 }, { "county": 36005, "county_name": "BRONX", "weight": 30.396841886557 }, { "county": 36007, "county_name": "BROOME", "weight": 5.097312326228 }, { "county": 36027, "county_name": "DUTCHESS", "weight": 4.2664670658683 }, { "county": 36029, "county_name": "ERIE", "weight": 7.2621727283497 }, { "county": 36047, "county_name": "KINGS", "weight": 17.225350853669 }, { "county": 36055, "county_name": "MONROE", "weight": 7.4890687505814 }, { "county": 36059, "county_name": "NASSAU", "weight": 5.2696619295613 }, { "county": 36061, "county_name": "NEW YORK", "weight": 34.155087404751 }, { "county": 36063, "county_name": "NIAGARA", "weight": 10.821554770318 }, { "county": 36067, "county_name": "ONONDAGA", "weight": 4.6743533811156 }, { "county": 36071, "county_name": "ORANGE", "weight": 8.2626453031731 }, { "county": 36079, "county_name": "PUTNAM", "weight": 14.148471615721 }, { "county": 36081, "county_name": "QUEENS", "weight": 15.364354697103 }, { "county": 36085, "county_name": "RICHMOND", "weight": 6.269637246501 }, { "county": 36087, "county_name": "ROCKLAND", "weight": 27.891763306572 }, { "county": 36091, "county_name": "SARATOGA", "weight": 6.2885689097855 }, { "county": 36093, "county_name": "SCHENECTADY", "weight": 4.4991511035654 }, { "county": 36103, "county_name": "SUFFOLK", "weight": 7.5394862036156 }, { "county": 36111, "county_name": "ULSTER", "weight": 12.761714855434 }, { "county": 36119, "county_name": "WESTCHESTER", "weight": 29.387637203928 }, { "county": 37021, "county_name": "BUNCOMBE", "weight": 11.221203864256 }, { "county": 37063, "county_name": "DURHAM", "weight": 15.128449096099 }, { "county": 37067, "county_name": "FORSYTH", "weight": 9.2007937939744 }, { "county": 37081, "county_name": "GUILFORD", "weight": 28.909542850967 }, { "county": 37119, "county_name": "MECKLENBURG", "weight": 33.987464880052 }, { "county": 37179, "county_name": "UNION", "weight": 26.785714285714 }, { "county": 37183, "county_name": "WAKE", "weight": 8.7896810071831 }, { "county": 39017, "county_name": "BUTLER", "weight": 11.786600496278 }, { "county": 39023, "county_name": "CLARK", "weight": 14.401858304297 }, { "county": 39025, "county_name": "CLERMONT", "weight": 13.625229638702 }, { "county": 39035, "county_name": "CUYAHOGA", "weight": 12.534629658669 }, { "county": 39041, "county_name": "DELAWARE", "weight": 14.716382387941 }, { "county": 39049, "county_name": "FRANKLIN", "weight": 10.798621668187 }, { "county": 39057, "county_name": "GREENE", "weight": 11.068539804172 }, { "county": 39061, "county_name": "HAMILTON", "weight": 36.769337122667 }, { "county": 39085, "county_name": "LAKE", "weight": 12.217071175348 }, { "county": 39093, "county_name": "LORAIN", "weight": 13.587223587224 }, { "county": 39095, "county_name": "LUCAS", "weight": 13.123076923077 }, { "county": 39099, "county_name": "MAHONING", "weight": 31.380076783189 }, { "county": 39103, "county_name": "MEDINA", "weight": 16.013693419551 }, { "county": 39113, "county_name": "MONTGOMERY", "weight": 26.50459988693 }, { "county": 39151, "county_name": "STARK", "weight": 15.11240632806 }, { "county": 39153, "county_name": "SUMMIT", "weight": 13.199693285135 }, { "county": 39155, "county_name": "TRUMBULL", "weight": 29.438246232139 }, { "county": 39165, "county_name": "WARREN", "weight": 13.73673644967 }, { "county": 40109, "county_name": "OKLAHOMA", "weight": 27.656619689332 }, { "county": 40143, "county_name": "TULSA", "weight": 25.915538104015 }, { "county": 41005, "county_name": "CLACKAMAS", "weight": 25.209182578846 }, { "county": 41017, "county_name": "DESCHUTES", "weight": 12.440905697935 }, { "county": 41029, "county_name": "JACKSON", "weight": 27.052127022169 }, { "county": 41039, "county_name": "LANE", "weight": 25.60987654321 }, { "county": 41047, "county_name": "MARION", "weight": 10.069371452596 }, { "county": 41051, "county_name": "MULTNOMAH", "weight": 24.120918984281 }, { "county": 41067, "county_name": "WASHINGTON", "weight": 25.706513525767 }, { "county": 42003, "county_name": "ALLEGHENY", "weight": 22.365269461078 }, { "county": 42011, "county_name": "BERKS", "weight": 24.786427626038 }, { "county": 42017, "county_name": "BUCKS", "weight": 21.367236348479 }, { "county": 42029, "county_name": "CHESTER", "weight": 21.769354602664 }, { "county": 42043, "county_name": "DAUPHIN", "weight": 6.369785794814 }, { "county": 42045, "county_name": "DELAWARE", "weight": 15.37927114255 }, { "county": 42049, "county_name": "ERIE", "weight": 22.071725411728 }, { "county": 42071, "county_name": "LANCASTER", "weight": 20.179372197309 }, { "county": 42077, "county_name": "LEHIGH", "weight": 7.3121191604604 }, { "county": 42091, "county_name": "MONTGOMERY", "weight": 18.260730642241 }, { "county": 42095, "county_name": "NORTHAMPTON", "weight": 8.6726998491704 }, { "county": 42101, "county_name": "PHILADELPHIA", "weight": 7.0216526734423 }, { "county": 42129, "county_name": "WESTMORELAND", "weight": 1.5865820489574 }, { "county": 42133, "county_name": "YORK", "weight": 1.5625 }, { "county": 45013, "county_name": "BEAUFORT", "weight": 29.319371727749 }, { "county": 45015, "county_name": "BERKELEY", "weight": 18.962510897995 }, { "county": 45019, "county_name": "CHARLESTON", "weight": 30.38401077925 }, { "county": 45045, "county_name": "GREENVILLE", "weight": 9.6022727272727 }, { "county": 45051, "county_name": "HORRY", "weight": 6.7260370283572 }, { "county": 45079, "county_name": "RICHLAND", "weight": 31.786731786732 }, { "county": 45083, "county_name": "SPARTANBURG", "weight": 4.8632218844985 }, { "county": 47037, "county_name": "DAVIDSON", "weight": 26.933155217592 }, { "county": 47065, "county_name": "HAMILTON", "weight": 4.0015769761482 }, { "county": 47093, "county_name": "KNOX", "weight": 3.7659811006115 }, { "county": 47157, "county_name": "SHELBY", "weight": 17.265944442103 }, { "county": 47165, "county_name": "SUMNER", "weight": 40.969162995595 }, { "county": 47187, "county_name": "WILLIAMSON", "weight": 11.318009892348 }, { "county": 48029, "county_name": "BEXAR", "weight": 9.6375679095036 }, { "county": 48039, "county_name": "BRAZORIA", "weight": 17.557251908397 }, { "county": 48085, "county_name": "COLLIN", "weight": 9.860788863109 }, { "county": 48113, "county_name": "DALLAS", "weight": 9.6153846153846 }, { "county": 48121, "county_name": "DENTON", "weight": 7.3293172690763 }, { "county": 48141, "county_name": "EL PASO", "weight": 12.724623603691 }, { "county": 48157, "county_name": "FORT BEND", "weight": 12.584009269988 }, { "county": 48167, "county_name": "GALVESTON", "weight": 16.02023608769 }, { "county": 48201, "county_name": "HARRIS", "weight": 4.6453017154967 }, { "county": 48339, "county_name": "MONTGOMERY", "weight": 31.846984275992 }, { "county": 48439, "county_name": "TARRANT", "weight": 7.9620017628048 }, { "county": 48453, "county_name": "TRAVIS", "weight": 13.826591210787 }, { "county": 49011, "county_name": "DAVIS", "weight": 40.058055152395 }, { "county": 49035, "county_name": "SALT LAKE", "weight": 27.558536096065 }, { "county": 49049, "county_name": "UTAH", "weight": 17.96860223189 }, { "county": 49057, "county_name": "WEBER", "weight": 38.2081061863 }, { "county": 51041, "county_name": "CHESTERFIELD", "weight": 24.315143545913 }, { "county": 51059, "county_name": "FAIRFAX", "weight": 7.9613616888681 }, { "county": 51087, "county_name": "HENRICO", "weight": 24.006772009029 }, { "county": 51107, "county_name": "LOUDOUN", "weight": 7.3784722222222 }, { "county": 51153, "county_name": "PRINCE WILLIAM", "weight": 6.8582432232262 }, { "county": 51510, "county_name": "ALEXANDRIA", "weight": 6.0534325329726 }, { "county": 51760, "county_name": "RICHMOND", "weight": 16.079158936302 }, { "county": 53011, "county_name": "CLARK", "weight": 10.591067130249 }, { "county": 53033, "county_name": "KING", "weight": 31.749109104673 }, { "county": 53035, "county_name": "KITSAP", "weight": 13.962395543175 }, { "county": 53053, "county_name": "PIERCE", "weight": 12.965240468639 }, { "county": 53061, "county_name": "SNOHOMISH", "weight": 11.663844199831 }, { "county": 53063, "county_name": "SPOKANE", "weight": 9.5754829477701 }, { "county": 53067, "county_name": "THURSTON", "weight": 11.969351832678 }, { "county": 53073, "county_name": "WHATCOM", "weight": 36.384766672626 }, { "county": 53077, "county_name": "YAKIMA", "weight": 6.7676289635589 }, { "county": 55009, "county_name": "BROWN", "weight": 2.4074631357207 }, { "county": 55079, "county_name": "MILWAUKEE", "weight": 14.943187741061 }, { "county": 55133, "county_name": "WAUKESHA", "weight": 8.5109742618033 }
        ]
            }
        },
        Countries: {
            simple: {
                rawData: [
                    { "name": "United States", "weight": 29.946185501741 }, { "name": "China", "weight": 229.946185501741 }
                ]
            }
        },
        States: {
            simple: {
                columns: ["State", "Weight"],
                data: [["AL", 4779736], ["AK", 710231], ["AZ", 6392017], ["AR", 2915918], ["CA", 37253956], ["CO", 5029196], ["CT", 3574097], ["DC", 601723], ["FL", 18801310], ["GA", 9687653], ["HI", 1360301], ["ID", 1567582], ["IL", 12830632], ["IN", 6483802], ["IA", 3046355], ["ME", 1328361], ["MD", 5773552], ["MA", 6547629], ["MI", 9883640], ["MN", 5303925], ["MS", 2967297], ["MO", 5988927], ["MT", 989415], ["NE", 1826341], ["NV", 2700551], ["NH", 1316470], ["NJ", 8791894], ["NM", 2059179], ["NY", 19378102], ["NC", 9535483], ["ND", 672591], ["OH", 11536504], ["OK", 3751351], ["OR", 3831074], ["PA", 12702379], ["RI", 1052567], ["SC", 4625364], ["SD", 814180], ["TN", 6346105], ["TX", 25145561], ["UT", 2763885], ["VT", 625741], ["VA", 8001024], ["WA", 6724540], ["WV", 1852994], ["WI", 5686986], ["WY", 563626]]
            }, 
            heatmap: {
                heatData: [
                    [37.665074, -122.384375, 0.234],
                    [32.690680, -117.178540, 0.234],
                    [39.709455, -104.969859, 0.234],
                    [41.244123, -95.961610, 0.234],
                    [32.688980, -117.192040, 0.234],
                    [45.786490, -108.526600, 0.234],
                    [45.796180, -108.535652, 0.234],
                    [45.774320, -108.494370, 0.234],
                    [45.777062, -108.549835, 0.234]
                ]
            }
        },
        GMap: {
            simple: {
                columns: ["latitude", "longtitude", "pin", "circle"],
                data: [
                    [37.665074, -122.384375, { fillColor: "green" }, { radius: 50, fillColor: "red" }],
                    [32.690680, -117.178540],
                    [39.709455, -104.969859],
                    [41.244123, -95.961610],
                    [32.688980, -117.192040, null, { radius: 100, fillColor: "green", strokeColor: "green" }],
                    [45.786490, -108.526600],
                    [45.796180, -108.535652],
                    [45.774320, -108.494370],
                    [45.777062, -108.549835, { fillColor: "red" }]
                ]
            },
            heat: {
                data: [
                    [37.665074, -122.384375, null, null, 0.234],
                    [32.690680, -117.178540, null, null, 0.234],
                    [39.709455, -104.969859, null, null, 0.234],
                    [41.244123, -95.961610, { fillColor: "green" }, null, 0.234],
                    [32.688980, -117.192040, null, null, 0.234],
                    [45.786490, -108.526600, null, null, 0.234],
                    [45.796180, -108.535652, { fillColor: "red" }, null, 0.234],
                    [45.774320, -108.494370, null, null, 0.234],
                    [45.777062, -108.549835, null, null, 0.234]
                ]
            },
            graph: {
                data: [
                    [37.665074, -122.384375, { fillColor: "green" }, null, 0.234],
                    [32.690680, -117.178540, null, null, 0.234],
                    [39.709455, -104.969859, null, null, 0.234],
                    [41.244123, -95.961610, null, null, 0.234],
                    [32.688980, -117.192040, null, null, 0.234],
                    [45.786490, -108.526600, null, null, 0.234],
                    [45.796180, -108.535652, null, null, 0.234],
                    [45.774320, -108.494370, null, null, 0.234],
                    [45.777062, -108.549835, { fillColor: "red" }, null, 0.234]
                ]
            }
        }
    };
    return DataFactory;
}));
