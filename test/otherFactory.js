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
        Image: {
            layered:function (callback) {
                require(["test/DataFactory", "src/layout/Layered", "src/layout/AbsoluteSurface", "src/other/Image", "src/other/HeatMap"], function (DataFactory, Layered, AbsoluteSurface, Image, HeatMap) {
                    var retVal = new Layered()
                        .addLayer(new AbsoluteSurface().widgetX(0).widgetY(0).widgetWidth(100).widgetHeight(100).widget(
                                new Image().source(DataFactory.Image.floorplan)
                            )
                        )
                        .addLayer(new AbsoluteSurface().widgetX(0).widgetY(0).widgetWidth(100).widgetHeight(100).opacity(0.66).widget(
                                new HeatMap()
                                    .columns(DataFactory.HeatMap.floorplan.columns)
                                    .data(DataFactory.HeatMap.floorplan.data)
                            )
                        )
                    ;
                    callback(retVal);
                });
            },
            simple: function (callback) {
                require(["test/DataFactory", "src/other/Image"], function (DataFactory, Image) {
                    callback(new Image().source(DataFactory.Image.floorplan));
                });
            },
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
                            ["Width 2 undefined", , 83, , 72],
                            ["English II", 17, 43, 83, 93],
                            ["English III", 6, 43, 64, 93],
                            ["Width Blank", 7, "", 52, 83],
                            ["Geography II", 16, 73, 52, 83],
                            ["Width 2 undefined", , 83, , 72],
                            ["Science", 66, 60, 85, 6],
                            ["Science II", 46, 20, 53, 7],
                            ["With 2 NULL", null, 20, null, 7],
                            ["Math", 98, 30, 23, 13],
                            ["Math II", 76, 30, 34, 6],
                            ["Math III", 80, 30, 27, 8]
                        ])
                    ;
                    callback(table);
                });
            },
            widget: function (callback) {
                require(["test/DataFactory", "src/other/Table"], function (DataFactory, Table) {
                    callback(new Table()
                        .columns(DataFactory.Table.widget.columns)
                        .data(DataFactory.Table.widget.data)
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
        Select: {
             simple: function (callback) {
                 require(["src/other/Select"], function (Select) {
                     callback(new Select()
                         .columns(["Col Label", "Col Value"])
                         .data([
                                ["GJS0", 0],
                                ["GJS1", 1],
                                ["GJS2", 2],
                                ["GJS3", 3],
                                ["GJS4", 4],
                                ["GJS5", 5],
                                ["GJS6", 6],
                                ["GJS7", 7],
                         ])
                    );
                 });
             }
       },    
    
    };
}));
