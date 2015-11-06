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
                        return [d, 10 + Math.random() * 14];
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
                    callback(new Table()
                        .columns(DataFactory.Table.simple.columns)
                        .data(DataFactory.Table.simple.data)
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
                    callback(new Table()
                        .columns(DataFactory.Table.large.columns)
                        .data(DataFactory.Table.large.data)
                        .totalledColumns([1,2,5,6,7])
                        .totalledLabel("Total")
                        .columnPatterns(["", "", ".6r", "", "", "", "", "", "", "", ""])
                    );
                });
            },
            formatted: function (callback) {
                require(["test/DataFactory", "src/other/Table"], function (DataFactory, Table) {
                    callback(new Table()
                        .columns(DataFactory.Table.formatted.columns)
                        .data(DataFactory.Table.formatted.data)
                        .columnPatterns([".4%", "", ".6r", "", "%d-%m-%y"])
                    );
                });
            }
        },
        ButtonAnnotations: {
            simple: function (callback) {
                require(["test/DataFactory", "src/other/ButtonAnnotations"], function (DataFactory, ButtonAnnotations) {
                    var b = new ButtonAnnotations()
                            .buttonHeight("46px")
                            .buttonPadding("0px 12px")
                            .backgroundColor("#FFFFFF")
                            .iconColor("#4C4A49")
                            .labelColor("#5C9ACD")
                            .borderColor("#CCCCCC")
                            .borderWidth("0 0 0 1px")
                            .iconSize("18px")
                        .data([
                            {icon:"fa-link",label:"Link",click:function(){console.log('Link btn has been clicked.');}},
                            {icon:"fa-th-large",click:function(){console.log('TH Large btn has been clicked.');}},
                        ])
                    ;
                    callback(b);
                });
            },
        },
        Toolbar: {
            simple: function (callback) {
                require(["test/DataFactory", "src/other/Toolbar", "src/layout/Border", "src/google/Column", "src/other/ButtonAnnotations"], function (DataFactory, Toolbar, Border, GColumn, ButtonAnnotations) {
                    var toolBar = new Toolbar()
                        .title("Testing")
                        .titleWidth("150px")
                        .backgroundColor("#FFFFFF")
                        .leftButtons(
                            new ButtonAnnotations()
                                .buttonHeight("30px")
                                .buttonMargin("8px 0px")
                                .buttonPadding("0px 12px")
                                .backgroundColor("#FFFFFF")
                                .iconColor("#4C4A49")
                                .labelColor("#5C9ACD")
                                .borderColor("#CCCCCC")
                                .borderWidth("0 0 0 1px")
                                .iconSize("18px")
                                .data([
                                    {icon:"fa-link",label:"Link",click:function(){console.log('Link btn has been clicked.');}},
                                    {icon:"fa-th-large",click:function(){console.log('TH Large btn has been clicked.');}},
                                ])
                        )
                        .rightButtons(
                            new ButtonAnnotations()
                                .buttonPadding("0px 12px")
                                .backgroundColor("#FFFFFF")
                                .iconColor("#4C4A49")
                                .labelColor("#5C9ACD")
                                .borderColor("#CCCCCC")
                                .borderWidth("0 0 0 1px")
                                .iconSize("18px")
                                .data([
                                    {icon:"fa-medkit",click:function(){console.log('Link btn has been clicked.');}},
                                    {icon:"fa-close",click:function(){console.log('TH Large btn has been clicked.');}},
                                ])
                        )
                    ;
                    var googleColumn = new GColumn().columns(DataFactory.ND.subjects.columns).data(DataFactory.ND.subjects.data);
                    callback(
                        new Border().gutter(0)
                        .topSize(46)
                        .topPercentage(0)
                        .setContent("top",toolBar)
                        .setContent("center",googleColumn)
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
        }
    };
}));
