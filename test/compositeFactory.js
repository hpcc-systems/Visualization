"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_compositeFactory = factory();
    }
}(this, function () {
    var compositeFactory = {
        MegaChart: {
            simple: function (callback) {
                require(["test/DataFactory", "src/composite/MegaChart"], function (DataFactory, MegaChart) {
                    var mc = new MegaChart()
                        .domainAxisTitle("Simple Domain Title")
                        .valueAxisTitle("Simple Value Title")
                        .showLegend(true)
                        .title("Simple MegaChart Title")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    ;
                    callback(mc);
                });
            },
        },
        CommandWidget: {
            simple: function (callback) {
                require(["src/composite/CommandWidget", "src/chart/Pie", "src/layout/Grid", "src/map/GMap"], 
                function (CommandWidget,Pie,Grid,GMap) {
                    var pie = new Pie()
                        .columns(["Subject","Year 1"])
                        .data([["Geography",75],["English",45],["Math",98],["Science",66]])
                    ;
                    var gmap = new GMap()
                        .columns([])
                        .data([[26.1040835, -80.1534063, null, null, 0.234]])
                        .zoom(14)
                        .centerLat(26.1040835)
                        .centerLong(-80.1534063)
                    ;
                    var cmd1 = new CommandWidget().title("Pie").widget(pie);
                    var cmd2 = new CommandWidget().title("Map").widget(gmap);
                    callback(
                            new Grid()
                            .designMode(true)
                            .hideDragHandles(true)
                            .hideDesignGrid(true)
                            .disableCellSelection(true)
                            .restrictDraggingOut(true)
                            .cellDensity(20)
                            .setContent(0,0,cmd1)
                            .setContent(1,0,cmd2)
                        );
                });
            }
        },
    };

    return compositeFactory;
}));
