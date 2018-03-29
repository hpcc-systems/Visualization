"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_layoutFactory = factory();
    }
}(this, function () {
    return {
        AbsoluteSurface: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/AbsoluteSurface", "src/chart/Column"], function (DataFactory, AbsoluteSurface, Column) {
                    callback(new AbsoluteSurface()
                        .widget(new Column()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                        .widgetY(DataFactory.AbsoluteSurface.simple.widgetY)
                        .widgetWidth(DataFactory.AbsoluteSurface.simple.widgetWidth)
                        .widgetHeight(DataFactory.AbsoluteSurface.simple.widgetHeight)
                        .widgetX(DataFactory.AbsoluteSurface.simple.widgetX)
                    );
                });
            }
        },
        ChartPanel: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/ChartPanel", "src/chart/Column"], function (DataFactory, ChartPanel, Column) {
                    callback(new ChartPanel()
                        .widget(new Column())
                        .title("Hello and Welcome!")
                        // .description("Sample description for the chart being displayed...")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            responsive: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/ChartPanel", "src/dgrid/Table", "src/phosphor/DockPanel"], function (DataFactory, ChartPanel, Column, DockPanel) {
                    let cp1 = new ChartPanel().widget(new Column()).titleIcon("#").title("Responsive Chart Panel")
                        .columns(DataFactory.ND.subjects.columns).data(DataFactory.Table.large.data);
                    let cp2 = new ChartPanel().widget(new Column()).titleIcon("#").title("Responsive Chart Panel")
                        .columns(DataFactory.ND.subjects.columns).data(DataFactory.Table.large.data);
                    let cp3 = new ChartPanel().widget(new Column()).titleIcon("#").title("Responsive Chart Panel")
                        .columns(DataFactory.ND.subjects.columns).data(DataFactory.Table.large.data);
                    let cp4 = new ChartPanel().widget(new Column()).titleIcon("#").title("Responsive Chart Panel")
                        .columns(DataFactory.ND.subjects.columns).data(DataFactory.Table.large.data);
                    let cp5 = new ChartPanel().widget(new Column()).titleIcon("#").title("Responsive Chart Panel")
                        .columns(DataFactory.ND.subjects.columns).data(DataFactory.Table.large.data);
                    let cp6 = new ChartPanel().widget(new Column()).titleIcon("#").title("Responsive Chart Panel")
                        .columns(DataFactory.ND.subjects.columns).data(DataFactory.Table.large.data);
                    let cp7 = new ChartPanel().widget(new Column()).titleIcon("#").title("Responsive Chart Panel")
                        .columns(DataFactory.ND.subjects.columns).data(DataFactory.Table.large.data);
                    let _dirs = ["top", "right", "bottom", "left"];
                    let dp = new DockPanel()
                        .addWidget(cp1, "Chart Panel (cp1)")
                        .addWidget(cp2, "Chart Panel (cp2)", `split-${arr_rand(_dirs)}`, cp1)
                        .addWidget(cp3, "Chart Panel (cp3)", `split-${arr_rand(_dirs)}`, cp2)
                        .addWidget(cp4, "Chart Panel (cp4)", `split-${arr_rand(_dirs)}`, cp3)
                        .addWidget(cp5, "Chart Panel (cp5)", `split-${arr_rand(_dirs)}`, cp4)
                        .addWidget(cp6, "Chart Panel (cp6)", `split-${arr_rand(_dirs)}`, cp5)
                        .addWidget(cp7, "Chart Panel (cp7)", `split-${arr_rand(_dirs)}`, cp6)
                        ;
                    callback(dp);
                    function arr_rand(arr) {
                        return arr[Math.floor(arr.length * Math.random())];
                    }
                });
            },
            choro: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/ChartPanel", "src/map/ChoroplethStates"], function (DataFactory, ChartPanel, ChoroplethStates) {
                    var mc = new ChartPanel()
                        .widget(new ChoroplethStates())
                        // .legendPosition("bottom")
                        .title("US States Choropleth")
                        .columns(DataFactory.States.simple.columns)
                        .data(DataFactory.States.simple.data)
                        ;
                    callback(mc);
                });
            }
        },
        Accordion: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Accordion", "src/other/Table", "src/layout/Surface", "src/chart/MultiChart", "src/chart/Line", "src/chart/Column"], function (DataFactory, Accordion, Table, Surface, MultiChart, Line, Column) {
                    callback(
                        new Accordion()
                            .pushListItem(new Accordion().pushListItem(
                                new Line()
                                    .columns(DataFactory.ND.subjects.columns)
                                    .data(DataFactory.ND.subjects.data)
                            )
                            )
                            .pushListItem(new Accordion().pushListItem(
                                new Table()
                                    .size({ height: 200, width: 600 })
                                    .columns(DataFactory.Table.large.columns)
                                    .data(DataFactory.Table.large.data)
                            )
                            )
                            .pushListItem(new Accordion()
                                .pushListItem(
                                new MultiChart()
                                    .size({ height: 200, width: 200 })
                                    .columns(DataFactory.ND.subjects.columns)
                                    .data(DataFactory.ND.subjects.data)
                                )
                                .pushListItem(
                                new Surface()
                                    .size({ height: 200, width: 200 })
                                    .title(DataFactory.Surface.simple.title)
                                    .widget(new Line()
                                        .columns(DataFactory.ND.subjects.columns)
                                        .data(DataFactory.ND.subjects.data)
                                    )
                                )
                            )
                    );
                }
                );
            }
        },
        Border: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Border", "src/chart/Pie", "src/chart/MultiChartSurface", "src/chart/Line", "src/chart/Column", "src/chart/Step"], function (DataFactory, Border, Pie, MultiChartSurface, Line, Column, Step) {
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
            }
        },
        Cell: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Cell", "src/chart/Line"], function (DataFactory, Cell, Line) {
                    callback(new Cell()
                        .title(DataFactory.Surface.simple.title)
                        .widget(new Line()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                        .buttonAnnotations(DataFactory.Surface.simple.buttonAnnotations)
                    );
                });
            }
        },
        Grid: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Grid", "src/chart/Pie", "src/chart/MultiChartSurface", "src/chart/Line", "src/chart/Column", "src/chart/Step"], function (DataFactory, Grid, Pie, MultiChartSurface, Line, Column, Step) {
                    callback(new Grid()
                        .setContent(0, 0, new Pie()
                            .columns(DataFactory.TwoD.subjects.columns)
                            .data(DataFactory.TwoD.subjects.data), "", 2, 2
                        )
                        .setContent(0, 2, new Pie()
                            .columns(DataFactory.TwoD.subjects.columns)
                            .data(DataFactory.TwoD.subjects.data)
                            .paletteID("Dark2"), "", 2, 2
                        )
                        .setContent(2, 0, new Pie()
                            .columns(DataFactory.TwoD.subjects.columns)
                            .data(DataFactory.TwoD.subjects.data)
                            .paletteID("Paired"), "", 2, 2
                        )
                        .setContent(2, 2, new Pie()
                            .columns(DataFactory.TwoD.subjects.columns)
                            .data(DataFactory.TwoD.subjects.data)
                            .paletteID("Pastel2"), "", 2, 2
                        )
                        .setContent(0, 4, new Line()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                            , "Title AAA", 4, 4
                        )
                        .setContent(4, 0, new MultiChartSurface()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                            , "Title BBB", 4, 8
                        )
                    );
                });
            },
            hoverIndicator: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Grid", "src/chart/Pie", "src/chart/Step"], function (DataFactory, Grid, Pie, Step) {
                    var pie1 = new Pie()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                        ;
                    var pie2 = new Pie()
                        .columns(DataFactory.TwoD.subjects.columns)
                        .data(DataFactory.TwoD.subjects.data)
                        ;
                    var step1 = new Step()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                        ;
                    var step2 = new Step()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                        ;
                    var grid = new Grid()
                        .setContent(0, 0, pie1, "Updates Step1")
                        .setContent(0, 1, pie2, "Updates Step1 & Step2")
                        .setContent(1, 0, step1, "Step1")
                        .setContent(1, 1, step2, "Step2")
                        ;
                    grid.content()[0].indicateTheseIds([grid.content()[2].id()]);
                    grid.content()[1].indicateTheseIds([grid.content()[2].id(), grid.content()[3].id()]);
                    callback(grid);
                });
            },
            complex: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Grid", "src/chart/Pie", "src/chart/Area", "src/chart/Line", "src/other/Table", "src/map/GMap"], function (DataFactory, Grid, Pie, Area, Line, Table, GMap) {
                    var d = DataFactory.ND.subjects.data;
                    var c = DataFactory.ND.subjects.columns;
                    callback(
                        new Grid()
                            .setContent(0, 0, new GMap()
                                .columns(DataFactory.GMap.simple.columns)
                                .data(DataFactory.GMap.simple.data), "", 2, 2)
                            .setContent(2, 0, new Area().columns(c).data(d))
                            .setContent(2, 1,
                                new Grid()
                                    .setContent(0, 0, new Line().data(d).columns(c))
                                    .setContent(0, 1, new Area().data(d).columns(c))
                            )
                            .setContent(3, 0, new Table().columns(["Col 1", "Col 2", "Col 3"]).data([[1, 2, 3], [4, 5, 6]]))
                            .setContent(3, 1, new Pie()
                                .columns(DataFactory.TwoD.subjects.columns)
                                .data(DataFactory.TwoD.subjects.data))
                            .setContent(4, 0, new Area().data(d).columns(c), "", 1, 2)
                    );
                });
            },
            hugeTables: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Grid", "src/other/Table"], function (DataFactory, Grid, Table) {
                    var colCount = 10;
                    var rowCount = 1000;
                    var t1 = new Table().columns(_columns(colCount)).data(_rows(colCount, rowCount));
                    var t2 = new Table().columns(_columns(colCount)).data(_rows(colCount, rowCount));
                    var t3 = new Table().columns(_columns(colCount)).data(_rows(colCount, rowCount));
                    var t4 = new Table().columns(_columns(colCount)).data(_rows(colCount, rowCount));
                    var t5 = new Table().columns(_columns(colCount)).data(_rows(colCount, rowCount));
                    var t6 = new Table().columns(_columns(colCount)).data(_rows(colCount, rowCount));
                    ;
                    var grid = new Grid()
                        .setContent(0, 0, t1, "Table 1")
                        .setContent(0, 1, t2, "Table 2")
                        .setContent(1, 0, t3, "Table 3")
                        .setContent(1, 1, t4, "Table 4")
                        .setContent(2, 0, t5, "Table 5")
                        .setContent(2, 1, t6, "Table 6")
                        ;
                    callback(grid);
                    function _columns(n) {
                        var ret = [];
                        for (var i = 1; i <= n; i++) {
                            ret.push("Column " + i);
                        }
                        return ret;
                    }
                    function _rows(n, m) {
                        var ret = [];
                        for (var i = 1; i <= m; i++) {
                            var ret2 = [];
                            var rowStr = "Row " + i;
                            for (var j = 1; j <= n; j++) {
                                ret2.push(rowStr + " Cell " + j);
                            }
                            ret.push(ret2);
                        }
                        return ret;
                    }
                });
            }
        },
        Layered: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Layered", "src/layout/AbsoluteSurface", "src/chart/Pie", "src/chart/MultiChartSurface", "src/chart/Line", "src/chart/Column", "src/chart/Step"], function (DataFactory, Layered, AbsoluteSurface, Pie, MultiChartSurface, Line, Column, Step) {
                    var retVal = new Layered()
                        .addLayer(new AbsoluteSurface().widgetX(0).widgetY(0).widgetWidth(100).widgetHeight(100).widget(new Pie()
                            .columns(DataFactory.TwoD.subjects.columns)
                            .data(DataFactory.TwoD.subjects.data)
                        )
                        )
                        .addLayer(new AbsoluteSurface().widgetX(40).widgetY(40).widgetWidth(50).widgetHeight(50).opacity(0.66).widget(new Line()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                        )
                        .addLayer(new AbsoluteSurface().widgetX(30).widgetY(10).widgetWidth(40).widgetHeight(60).widget(new Column()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                        )
                        ;
                    callback(retVal);
                });
            }
        },
        Modal: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Modal", "src/chart/Line"], function (DataFactory, Modal, Line) {
                    callback(new Modal()
                        .relativeTargetId("cellSurface")
                        .title('A Simple Modal')
                        .widget(new Line()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                            .size({ width: 500, height: 400 })
                        )
                        .on("closeModal", function () {
                            console.log("closeModal hook");
                        })
                    );
                });
            }
        },
        Popup: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Popup", "src/layout/Surface", "src/common/Icon"], function (DataFactory, Popup, Surface, Icon) {
                    var retVal = new Popup();

                    retVal.widget(new Surface().widget(new Icon().faChar(DataFactory.FAChar.simple.char)));

                    callback(retVal);
                });
            },
            shrink: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Popup", "src/layout/Surface", "src/other/Table"], function (DataFactory, Popup, Surface, Table) {
                    var retVal = new Popup();

                    retVal
                        .widget(new Table()
                            .columns(DataFactory.Table.simple.columns)
                            .data(DataFactory.Table.simple.data)
                            .fixedSize(true)
                        )
                        .shrinkWrap(true)
                        ;

                    callback(retVal);
                });
            },
            shrink2: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Popup", "src/layout/Surface", "src/chart/Line"], function (DataFactory, Popup, Surface, Line) {
                    var retVal = new Popup();

                    retVal
                        .widget(new Line()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                            .size({ width: 500, height: 400 })
                        )
                        .shrinkWrap(true)
                        ;

                    callback(retVal);
                });
            }
        },
        Surface: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Surface", "src/chart/Line"], function (DataFactory, Surface, Line) {
                    callback(new Surface()
                        .title(DataFactory.Surface.simple.title)
                        .buttonAnnotations(DataFactory.Surface.simple.buttonAnnotations)
                        .widget(new Line()
                            .columns(DataFactory.ND.subjects.columns)
                            .data(DataFactory.ND.subjects.data)
                        )
                    );
                });
            }
        },
        Tabbed: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/layout/Tabbed", "src/chart/Pie", "src/chart/MultiChartSurface", "src/chart/Line", "src/chart/Column", "src/chart/Step"], function (DataFactory, Tabbed, Pie, MultiChartSurface, Line, Column, Step) {
                    callback(new Tabbed()
                        .addTab(
                            new Pie()
                                .columns(DataFactory.TwoD.subjects.columns)
                                .data(DataFactory.TwoD.subjects.data)
                            , "Pie Chart", true)
                        .addTab(
                            new Line()
                                .columns(DataFactory.ND.subjects.columns)
                                .data(DataFactory.TwoD.subjects.data)
                            , "Line Chart")
                        .addTab(
                            new Column()
                                .columns(DataFactory.ND.subjects.columns)
                                .data(DataFactory.ND.subjects.data)
                            , "Column Chart"
                        )
                        .addTab(new Tabbed()
                            .addTab(
                                new Step()
                                    .columns(DataFactory.ND.subjects.columns)
                                    .data(DataFactory.ND.subjects.data)
                                , "Step Chart"
                            )
                            .addTab(
                                new Pie()
                                    .columns(DataFactory.TwoD.subjects.columns)
                                    .data(DataFactory.TwoD.subjects.data)
                                , "Pie Chart", true), "Nested Example"
                        )
                    );
                });
            }
        }
    };
}));
