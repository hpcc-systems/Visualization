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
                legacyRequire(["test/DataFactory", "src/dgrid/Table"], function (DataFactory, Table) {
                    var table = new Table()
                        .columns(["Subject", "Year 1", "Year 2", "Year 3", "Year 4"])
                        .data([
                            ["with 2 undefined", , 83, , 72],
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
            empty: function (callback) {
                legacyRequire(["test/DataFactory", "src/dgrid/Table"], function (DataFactory, Table) {
                    var table = new Table()
                        .columns(["Subject", "Year 1", "Year 2", "Year 3", "Year 4"])
                        .data([
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
            },
            sortAPI: function (callback) {
                legacyRequire(["test/DataFactory", "src/dgrid/Table"], function (DataFactory, Table) {
                    var table = new Table()
                        .columns(DataFactory.Table.large.columns)
                        .data(DataFactory.Table.large.data)
                        .sortable(true)
                        .sortBy("Long")
                        ;
                    callback(table);
                    setTimeout(function () {
                        table
                            .sortBy("Lat")
                            .sortByDescending(true)
                            .render()
                            ;
                    }, 5000);
                });
            }
        },
        NestedTable: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/dgrid/Table"], function (DataFactory, Table) {
                    callback(new Table()
                        .columns(["Mother", "Father", { label: "Children", columns: ["Name", "sex", "age"] }, { label: "Pets", columns: ["Name", "type"] }])
                        .data([
                            ["Jane", "John", [["Mary", "f", 4], ["Bob", "m", 6], ["Tim", "m", 1]], [["Spot", "dog"], ["Smelly", "cat"], ["Goldie", "Fish"], ["Hammy", "Hamster"]]],
                            ["Penelope", "Alex", [["Bill", "m", 1]], []],
                            ["Jill", "Marcus", [], [["Flappy", "parrot"], ["Stinky", "cat"], ["Rolf", "dog"]]],
                            ["Susan", "Robert", [["Jack", "m", 4], ["Alice", "f", 6]], []]
                        ])
                    );
                });
            },
            regularColumns: function (callback) {
                legacyRequire(["test/DataFactory", "src/dgrid/Table"], function (DataFactory, Table) {
                    callback(new Table()
                        .columns(["Mother", "Father", "Children"])
                        .data([
                            ["Geography", 75, [
                                ["Geography", 75, 68, 65],
                                ["English", 45, 55, 52],
                                ["Math", 98, 92, 90],
                                ["Science", 66, 60, 72]
                            ], 65],
                            ["English", 45, [], 52],
                            ["Math", 98, [
                                ["Geography", 75, 68, 65],
                                ["English", 45, 55, 52],
                                ["Science", 66, 60, 72]
                            ], 90],
                            ["Science", 66, [
                                ["Geography", 75, 68, 65],
                                ["Math", 98, 92, 90],
                                ["Science", 66, 60, 72]
                            ], 72]
                        ])
                    );
                });
            }
        }
    };
}));
