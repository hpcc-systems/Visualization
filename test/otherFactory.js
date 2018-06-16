"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_otherFactory = factory();
    }
}(this, function (DataFactory, HeatMap, WordCloud, Table) {
    return {
        HeatMap: {
            simple: function (callback) {
                require(["test/DataFactory", "src/other/HeatMap"], function (DataFactory, HeatMap) {
                    callback(new HeatMap()
                        .columns(DataFactory.HeatMap.simple.columns)
                        .data(DataFactory.HeatMap.simple.data)
                    );
                });
            },
            skew: function (callback) {
                require(["test/DataFactory", "src/other/HeatMap"], function (DataFactory, HeatMap) {
                    callback(new HeatMap()
                        .columns(DataFactory.HeatMap.skew.columns)
                        .data(DataFactory.HeatMap.skew.data)
                        .topLeftX(-10000).topLeftY(-10000)
                        .bottomRightX(10000).bottomRightY(10000)
                    );
                });
            },
            rapidInterval: function (callback) {
                require(["test/DataFactory", "src/other/HeatMap"], function (DataFactory, HeatMap) {
                    var heat = new HeatMap().columns(DataFactory.HeatMap.center.columns).data(DataFactory.HeatMap.center.data)
                        .topLeftX(-10000).topLeftY(-10000)
                        .bottomRightX(10000).bottomRightY(10000)
                        .radius(13).blur(5)
                    ;
                    var step = 400;
                    var renderTimeLimit = 2000;
                    var mitosisLoop = setInterval(function(){
                        var prevRenderTime = new Date().getTime();
                        var newData = [];
                        heat.data().forEach(function(n){
                            var splitChance = 1/(heat.data().length/20);
                            var rand = Math.random();
                            if(rand <= splitChance * n[2] * 5){
                                _split(n);
                            } else if (rand <= splitChance * 100) {
                                _move(n);
                            } else {
                                n[2] = rand >= 0.999999 ? 1 : n[2];
                                newData.push(n);
                            }
                        });
                        heat.data(newData).render();
                        if(new Date().getTime() - prevRenderTime > renderTimeLimit){
                            clearInterval(mitosisLoop);
                        }
                        function _split(c){
                            var o = step + (Math.random()*step);
                            newData.push(c);
                            newData.push([[c[0],c[1]-o,c[2]],[c[0]+o,c[1],c[2]],[c[0],c[1]+o,c[2]],[c[0]-o,c[1],c[2]]][Math.floor(Math.random()*4)]);
                        }
                        function _move(cell){
                            var movedCell = [cell[0] + (step*Math.random()*[-1,1][Math.floor(Math.random()*2)]),cell[1] + (step*Math.random()*[-1,1][Math.floor(Math.random()*2)]),cell[2] * 0.99];
                            if(movedCell[2] > 0.01){
                                newData.push(movedCell);
                            }
                        }
                    },100);
                    callback(heat);
                });
            }
        },
        WordCloud: {
            simple: function (callback) {
                require(["test/DataFactory", "src/other/WordCloud"], function (DataFactory, WordCloud) {
                    var words = DataFactory.WordCloud.simple.words.map(function (d) {
                        return [d, 1 + Math.random() * 100];
                    });
                    callback(new WordCloud()
                        .columns(DataFactory.WordCloud.simple.columns)
                        .data(words)
                    );
                });
            }
        },
        Table: {
            simple: function (callback) {
                require(["test/DataFactory", "src/other/Table"], function (DataFactory, Table) {
                    var table = new Table()
                        .columns(["Subject", "Year 1", "Year 2", "Year 3", "Year 4"])
                        .data([
                            ["Width 2 undefined", , "", , 72],
                            ["English II", 17, "", 83, 93],
                            ["English III", 6, "", 64, 93],
                            ["Width Blank", 7, "", 52, 83],
                            ["Geography II", 16, "", 52, 83],
                            ["Width 2 undefined", , "", , 72],
                            ["Science", 66, "", 85, 6],
                            ["Science II", 46, "", 53, 7],
                            ["With 2 NULL", null, "", null, 7],
                            ["Math", 98, "", 23, 13],
                            ["Math II", 76, "", 34, 6],
                            ["Math III", 80, "", 27, 8]
                        ])
                        ;
                    callback(table);
                });
            },
            widget: function (callback) {
                require(["test/DataFactory", "src/other/Table", "src/form/CheckBox", "src/chart/Column"], function (DataFactory, Table, CheckBox, Column) {
                    callback(new Table()
                        .columns(["Label", "Lat", "Long", "Pin", "Forth Column", "Fifth Column", "sixth Column", "Seventh Column", "eighth Column", "Nineth Column", "Tenth Column"])
                        .data([
                            ["Label0", 37.665074, -122.384375, "green-dot.png", 4525, 4243545, 24354, 54, 2552345, 2455, 245435],
                            ["Label1", 39.709455, -104.969859, new Table().fixedSize(true).fixedHeader(false).columns(["Subject", "Year 1", "Year 2", "Year 3"]).data([["Math", 76, 63, 87], ["History", 65, 87, 67], ["Science", 88, 91, 78]]), 4525, 423545, 24354, 524, 2552345, 2455, 245435],
                            ["Label2", 32.690680, -117.178540, new CheckBox().name("checkbox-test").label("Checkbox Test").value(true), 4525, 423545, 24354, 354, 2552345, 2455, 245435],
                            ["Label4", 41.244123, -95.961610, new Column().columns(["Subject", "Year 1", "Year 2", "Year 3"]).data([["Math", 76, 65, 87], ["History", 65, 87, 67], ["Science", 88, 91, 78]]), 4525, 423545, 24354, 564, 2552345, 2455, 245435],
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
                            ["Label1", 45.777062, -108.549835, "red-dot.png", 4525, 423545, 24354, 54, 25523345, 2455, 245435]])
                        .minWidgetHeight(200)
                        .minWidgetWidth(200)
                    );
                });
            },
            large: function (callback) {
                require(["test/DataFactory", "src/other/Table"], function (DataFactory, Table) {
                    callback(new Table()
                    .columns(DataFactory.Table.large.columns)
                    .data(DataFactory.Table.large.data)
                    .fixedHeader(true)
                    );
                });
            },
            totalled: function (callback) {
                require(["test/DataFactory", "src/other/Table"], function (DataFactory, Table) {
                    var table = new Table()
                        .columns(DataFactory.Table.large.columns)
                        .data(DataFactory.Table.large.data)
                        .totalledColumns([1, 2, 5, 6, 7])
                        .totalledLabel("Total")
                    ;
                    callback(table);
                });
            },
            formatted: function (callback) {
                require(["test/DataFactory", "src/other/Table"], function (DataFactory, Table) {
                    var table = new Table()
                        .columns(DataFactory.Table.formatted.columns)
                        .data(DataFactory.Table.formatted.data)
                    ;
                    table.fields()[0].format(".2f");
                    table.fields()[2].format(".6r");
                    table.fields()[4].type("time").mask("%Y-%_m-%_d").format("%d %b '%y");
                    callback(table);
                });
            }
        },
        NestedTable: {
            simple: function (callback) {
                require(["test/DataFactory", "src/other/NestedTable"], function (DataFactory, NestedTable) {
                    callback(new NestedTable()
                        .columns(["Subject", "Year 1", { label: "Year2", columns: ["Subject", "Year 1", "Year 2", "Year 3"] }, "Year 3"])
                        .data([
                                ["Geography", 75, [["Geography", 75, 68, 65],
                                                ["English", 45, 55, 52],
                                                ["Math", 98, 92, 90],
                                                ["Science", 66, 60, 72]], 65],
                                ["English", 45, [], 52],
                                ["Math", 98, [["Geography", 75, 68, 65],
                                                ["English", 45, 55, 52],
                                                ["Science", 66, 60, 72]], 90],
                                ["Science", 66, [["Geography", 75, 68, 65],
                                                ["Math", 98, 92, 90],
                                                ["Science", 66, 60, 72]], 72]
                        ])
                    );
                });
            },
            regularColumns: function (callback) {
                require(["test/DataFactory", "src/other/NestedTable"], function (DataFactory, NestedTable) {
                    callback(new NestedTable()
                        .columns(["Subject", "Year 1", "Children", "Year 3"])
                        .data([
                                ["Geography", 75, [["Geography", 75, 68, 65],
                                                ["English", 45, 55, 52],
                                                ["Math", 98, 92, 90],
                                                ["Science", 66, 60, 72]], 65],
                                ["English", 45, [], 52],
                                ["Math", 98, [["Geography", 75, 68, 65],
                                                ["English", 45, 55, 52],
                                                ["Science", 66, 60, 72]], 90],
                                ["Science", 66, [["Geography", 75, 68, 65],
                                                ["Math", 98, 92, 90],
                                                ["Science", 66, 60, 72]], 72]
                        ])
                    );
                });
            }
        },
        Toolbar: {
            simple: function (callback) {
                require(["test/DataFactory", "src/composite/MegaChart", "src/form/Select"], function (DataFactory, MegaChart, Select) {
                    callback(new MegaChart()
                        .chartType("LINE")
                        .title("Simple Toolbar")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data));
                });
            },
            megaChart: function (callback) {
                require(["test/DataFactory", "src/layout/Border", "src/chart/Pie", "src/chart/MultiChartSurface", "src/chart/Line", "src/chart/Column", "src/chart/Step"], function (DataFactory, Border, Pie, MultiChartSurface, Line, Column, Step) {
                    callback(new Border()
                        .setContent("top", new Pie()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                        .setContent("right", new Line()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                        .setContent("bottom", new Column()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                        .setContent("left", new Step()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                        .setContent("center", new MultiChartSurface()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                    );
                });
            },
        },
        Legend: {
            simple: function (callback) {
                require(["test/DataFactory", "src/layout/Border", "src/chart/Line", "src/other/Legend"], function (DataFactory, Border, Line, Legend) {
                    var line = new Line()
                        .columns(DataFactory.ND.ampolar.columns)
                        .data(DataFactory.ND.ampolar.data)
                    var legend = new Legend().targetWidget(line);
                    callback(new Border()
                        .setContent("center", line)
                        .setContent("right", legend)
                    );
                });
            }
        },
        Html: {
            simple: function (callback) {
                require(["src/other/Html"], function (Html) {
                    var w = new Html();
                    w.html('<div style="border:1px solid red;padding:10px;margin:20px;font-size:24px;">Text in a div!</div>');
                    callback(w);
                });
            },
            array: function (callback) {
                require(["src/other/Html"], function (Html) {
                    var w = new Html();
                    var arr = [];
                    var testCellCount = 300;
                    for(var i = 0;i<testCellCount;i++){
                        arr.push('<div style="border:1px solid red;float:left;margin:10px;padding:10px;font-size:20px;">Test '+i+'</div>');
                    }
                    w.data(arr);
                    callback(w);
                });
            }
        },
        AutoCompleteText: {
            simple: function (callback) {
                require(["src/other/AutoCompleteText", "test/DataFactory"], function (AutoCompleteText, DataFactory) {
                    callback(new AutoCompleteText()
                        .columns(["Col Label", "Col Value"])
                        .data([
                            ["Math", 0],
                            ["Science", 1],
                            ["Geography", 3],
                            ["Irish", 5],
                            ["English", 7],
                            ["Spanish", 2],
                            ["Physics", 4],
                            ["Astrology", 6]
                        ])
                        .label("Label:  ")
                        .valueColumn("Col Value")
                        .textColumn("Col Label")
                    );
                });
            },
        },
        Select: {
             simple: function (callback) {
                 require(["src/other/Select"], function (Select) {
                     callback(new Select()
                        .columns(["Col Label", "Col Value"])
                        .data([
                            ["Math", 0],
                            ["Science", 1],
                            ["Geography", 3],
                            ["Irish", 5],
                            ["English", 7],
                            ["Spanish", 2],
                            ["Physics", 4],
                            ["Astrology", 6]
                        ])
                        .label("Label:  ")
                        .valueColumn("Col Value")
                        .textColumn("Col Label")
                    );
                 });
             }
        },
        RadioCheckbox: {
            simple: function (callback) {
                require(["src/other/RadioCheckbox"], function (RadioCheckbox) {
                    callback(new RadioCheckbox()
                            .columns(["Col Label", "Col Value"])
                            .data([
                                ["Math", 0],
                                ["Science", 1],
                                ["Geography", 3],
                                ["Irish", 5],
                                ["English", 7],
                                ["Spanish", 2],
                                ["Physics", 4],
                                ["Astrology", 6]
                            ])
                            .label("Label:  ")
                            .valueColumn("Col Value")
                            .textColumn("Col Label")
                    );
                });
            }
        },
        CalendarHeatMap: {
            simple: function (callback) {
                require(["test/DataFactory", "src/other/CalendarHeatMap"], function (DataFactory, CalendarHeatMap) {
                    //DataFactory.Sample.StockMarket.data.length = 1500;
                    callback(new CalendarHeatMap()
                        .columns(DataFactory.Sample.StockMarket.columns)
                        .data(DataFactory.Sample.StockMarket.data)
                        .dateColumn("Date")
                        .aggrType("mean")
                        .aggrColumn("Close")
                    );
                });
            }
        },
        Opportunity: {
            simple: function (callback) {
                require(["test/DataFactory","src/other/Opportunity"], function (DataFactory,Opportunity) {
                    callback(new Opportunity()
                        .columns(DataFactory.OpportunityData.Sample.dropdownList)
                        .data(DataFactory.OpportunityData.Sample.data)
                    );
                });
            }
        }
    };
}));
