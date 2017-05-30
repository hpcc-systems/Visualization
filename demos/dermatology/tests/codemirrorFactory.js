"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_otherFactory = factory();
    }
}(this, function (DataFactory, HeatMap, WordCloud, Table) {
    return {
        Table: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/codemirror/"], function (DataFactory, Table) {
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
            large: function (callback) {
                legacyRequire(["test/DataFactory", "src/dgrid/Table"], function (DataFactory, Table) {
                    callback(new Table()
                        .columns(DataFactory.Table.large.columns)
                        .data(DataFactory.Table.large.data)
                    );
                });
            }
        }
    };
}));
