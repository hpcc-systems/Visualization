"use strict";
define(["d3", "src/common/Database"], function (d3, Database) {
    describe("Database", function (done) {
        var testColumns = ["Subject", "Year 1", "Year 2", "Year 3"];
        var testData = [
                    ["Geography", 75, 68, 65],
                    ["English", 45, 55, 52],
                    ["Math", 98, 92, 90],
                    ["Science", 44, { color: "pink" }, 66]
        ];
        var testGrid = [testColumns].concat(testData);
        var db;
        it("create", function () {
            db = new Database.Grid()
                .legacyColumns(testColumns, true)
                .legacyData(testData, true)
            ;
            assert.deepEqual(db.legacyColumns(), testColumns, "assert 1");
            assert.deepEqual(db.row(0), db.legacyColumns(), "assert 2");
            assert.deepEqual(db.data(), testData, "assert 3");
            assert.deepEqual(db.row(0), testColumns, "assert 4");
            assert.deepEqual(db.row(3), ["Math", 98, 92, 90], "assert 5");
            assert.deepEqual(db.column(0), ["Subject", "Geography", "English", "Math", "Science"], "assert 6");
            assert.deepEqual(db.column(3), ["Year 3", 65, 52, 90, 66], "assert 7");
            var fields = db.fields();
        });
        it("mask/format", function () {
            var fields = [
                new Database.Field().label("Subject"),
                new Database.Field().label("Year 1").type("number").format(".0%"),
                new Database.Field().label("Year 1 Date").type("time").mask("%d/%m/%Y").format("%a %d %b, %Y")
            ];
            var data = [
                ["Geography", 75/100, "01/07/2014"],
                ["English", 90/200, "08/07/2014"],
                ["Math", 8/10, "15/07/2014"],
                ["Science", 666/1000, "22/07/2014"]
            ];
            var formattedData = [
                ["Geography", "75%", "Tue 01 Jul, 2014"],
                ["English", "45%", "Tue 08 Jul, 2014"],
                ["Math", "80%", "Tue 15 Jul, 2014"],
                ["Science", "67%", "Tue 22 Jul, 2014"]
            ];
            assert.equal(fields[0].label(), "Subject", "assert 1");
            var formatDB = new Database.Grid()
                .fields(fields, true)
                .legacyData(data, true)
            ;
            assert.deepEqual(formatDB.data(), data, "assert 2");
            assert.deepEqual(formatDB.formattedData(), formattedData, "assert 3");
            var newDB = formatDB.clone();
            assert.deepEqual(formatDB.data(), newDB.data(), "assert 4");
            assert.deepEqual(formatDB.formattedData(), newDB.formattedData(), "assert 5");
        });
        it("modification", function () {
            var x = db.grid();
            assert.deepEqual(db.grid(), testGrid, "grid equals 1");
            assert.notDeepEqual(db.row(1), db.row(2));
            db.row(1, db.row(2));
            assert.deepEqual(db.row(1), db.row(2));
            assert.deepEqual(db.grid(), [
                    ["Subject", "Year 1", "Year 2", "Year 3"],
                    ["English", 45, 55, 52],
                    ["English", 45, 55, 52],
                    ["Math", 98, 92, 90],
                    ["Science", 44, { color: "pink" }, 66]
            ], "grid equals 2");
            assert.notDeepEqual(db.column(1), db.column(2));
            db.column(1, db.column(2));
            assert.deepEqual(db.column(1), db.column(2));
            assert.deepEqual(db.grid(), [
                    ["Subject", "Year 2", "Year 2", "Year 3"],
                    ["English", 55, 55, 52],
                    ["English", 55, 55, 52],
                    ["Math", 92, 92, 90],
                    ["Science", { color: "pink" }, { color: "pink" }, 66]
            ]);
            assert.equal(db.cell(2, 2), 55);
            assert.equal(db.cell(3, 3), 90);
            assert.equal(db.cell(1, 1, 33).cell(1,1), 33);
            var fields = db.fields();
            var newDB = new Database.Grid();
            var fields2 = db.fields();
            var db2 = db.clone().pivot();
            for (var i = 0; i < db.length() ; ++i) {
                assert.deepEqual(db.row(i), db2.column(i));
            }
        });
        it("json", function () {
            var jsonDB = new Database.Grid()
                .grid(testGrid)
            ;
            var jsonDB2 = new Database.Grid()
                .json(jsonDB.json())
            ;
            var jsonDB3 = new Database.Grid()
                .legacyColumns(testColumns)
                .legacyData(testData)
            ;
            assert.deepEqual(jsonDB.grid(), jsonDB2.grid());
            assert.deepEqual(jsonDB.grid(), jsonDB3.grid());
            assert.deepEqual(jsonDB.columns(), jsonDB3.columns());
            assert.deepEqual(jsonDB.data(), jsonDB3.data());
            assert.deepEqual(jsonDB.json(), jsonDB3.json());
        });
        it("nesting", function () {
            var db = new Database.Grid().jsonObj([{ "clean_st": "LA", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "AK", "clean_error": "E412", "Cnt": "5" }, { "clean_st": "WA", "clean_error": "E422", "Cnt": "3" }, { "clean_st": "SC", "clean_error": "S800", "Cnt": "203" }, { "clean_st": "AK", "clean_error": "E412", "Cnt": "3" }, { "clean_st": "NM", "clean_error": "E427", "Cnt": "3" }, { "clean_st": "WY", "clean_error": "S820", "Cnt": "1" }, { "clean_st": "KS", "clean_error": "SC10", "Cnt": "1" }, { "clean_st": "WA", "clean_error": "E423", "Cnt": "1" }, { "clean_st": "PR", "clean_error": "S800", "Cnt": "8" }, { "clean_st": "NE", "clean_error": "E412", "Cnt": "2" }, { "clean_st": "NH", "clean_error": "S800", "Cnt": "93" }, { "clean_st": "OR", "clean_error": "S840", "Cnt": "1" }, { "clean_st": "TX", "clean_error": "E421", "Cnt": "13" }, { "clean_st": "NH", "clean_error": "E412", "Cnt": "1" }, { "clean_st": "FL", "clean_error": "SA00", "Cnt": "4" }, { "clean_st": "GA", "clean_error": "E427", "Cnt": "2" }, { "clean_st": "AZ", "clean_error": "S900", "Cnt": "2" }, { "clean_st": "SD", "clean_error": "E412", "Cnt": "1" }, { "clean_st": "NC", "clean_error": "E421", "Cnt": "2" }, { "clean_st": "MO", "clean_error": "S880", "Cnt": "1" }, { "clean_st": "MI", "clean_error": "SB00", "Cnt": "1" }, { "clean_st": "IL", "clean_error": "S920", "Cnt": "1" }, { "clean_st": "WI", "clean_error": "E421", "Cnt": "7" }, { "clean_st": "LA", "clean_error": "S800", "Cnt": "270" }, { "clean_st": "GA", "clean_error": "E412", "Cnt": "8" }, { "clean_st": "CA", "clean_error": "E421", "Cnt": "20" }, { "clean_st": "KY", "clean_error": "E421", "Cnt": "1" }, { "clean_st": "MI", "clean_error": "E412", "Cnt": "3" }, { "clean_st": "MO", "clean_error": "S800", "Cnt": "285" }, { "clean_st": "WI", "clean_error": "E422", "Cnt": "2" }, { "clean_st": "PA", "clean_error": "SA00", "Cnt": "1" }, { "clean_st": "CA", "clean_error": "E422", "Cnt": "2" }, { "clean_st": "FL", "clean_error": "E422", "Cnt": "5" }, { "clean_st": "WI", "clean_error": "S800", "Cnt": "262" }, { "clean_st": "CO", "clean_error": "S820", "Cnt": "1" }, { "clean_st": "NY", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "TX", "clean_error": "SA00", "Cnt": "6" }, { "clean_st": "WA", "clean_error": "E412", "Cnt": "1" }, { "clean_st": "CA", "clean_error": "E423", "Cnt": "1" }, { "clean_st": "CO", "clean_error": "S900", "Cnt": "2" }, { "clean_st": "NC", "clean_error": "E422", "Cnt": "3" }, { "clean_st": "", "clean_error": "E214", "Cnt": "2" }, { "clean_st": "RI", "clean_error": "S800", "Cnt": "77" }, { "clean_st": "MN", "clean_error": "S840", "Cnt": "1" }, { "clean_st": "TN", "clean_error": "E422", "Cnt": "2" }, { "clean_st": "TX", "clean_error": "E505", "Cnt": "1" }, { "clean_st": "FL", "clean_error": "E600", "Cnt": "1" }, { "clean_st": "MO", "clean_error": "S820", "Cnt": "1" }, { "clean_st": "WV", "clean_error": "S810", "Cnt": "1" }, { "clean_st": "MN", "clean_error": "E412", "Cnt": "5" }, { "clean_st": "ND", "clean_error": "S800", "Cnt": "29" }, { "clean_st": "WI", "clean_error": "S820", "Cnt": "29" }, { "clean_st": "TN", "clean_error": "E423", "Cnt": "1" }, { "clean_st": "IA", "clean_error": "E412", "Cnt": "5" }, { "clean_st": "NE", "clean_error": "S800", "Cnt": "105" }, { "clean_st": "GA", "clean_error": "S8A0", "Cnt": "1" }, { "clean_st": "CA", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "FL", "clean_error": "E421", "Cnt": "12" }, { "clean_st": "", "clean_error": "E212", "Cnt": "1" }, { "clean_st": "TX", "clean_error": "E427", "Cnt": "1" }, { "clean_st": "CO", "clean_error": "S880", "Cnt": "1" }, { "clean_st": "FL", "clean_error": "S800", "Cnt": "1885" }, { "clean_st": "WV", "clean_error": "E412", "Cnt": "3" }, { "clean_st": "NV", "clean_error": "S800", "Cnt": "138" }, { "clean_st": "WI", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "NY", "clean_error": "S910", "Cnt": "1" }, { "clean_st": "TX", "clean_error": "E412", "Cnt": "14" }, { "clean_st": "TN", "clean_error": "E421", "Cnt": "5" }, { "clean_st": "AL", "clean_error": "S800", "Cnt": "219" }, { "clean_st": "NC", "clean_error": "S800", "Cnt": "422" }, { "clean_st": "OH", "clean_error": "S880", "Cnt": "1" }, { "clean_st": "ND", "clean_error": "E421", "Cnt": "1" }, { "clean_st": "FL", "clean_error": "E427", "Cnt": "3" }, { "clean_st": "DE", "clean_error": "S800", "Cnt": "32" }, { "clean_st": "AR", "clean_error": "E421", "Cnt": "3" }, { "clean_st": "MN", "clean_error": "E421", "Cnt": "5" }, { "clean_st": "PA", "clean_error": "S810", "Cnt": "1" }, { "clean_st": "ID", "clean_error": "E412", "Cnt": "6" }, { "clean_st": "AK", "clean_error": "S800", "Cnt": "55" }, { "clean_st": "NM", "clean_error": "E412", "Cnt": "5" }, { "clean_st": "OR", "clean_error": "E423", "Cnt": "1" }, { "clean_st": "MS", "clean_error": "S800", "Cnt": "192" }, { "clean_st": "CO", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "AZ", "clean_error": "S800", "Cnt": "329" }, { "clean_st": "ID", "clean_error": "S820", "Cnt": "4" }, { "clean_st": "WY", "clean_error": "S810", "Cnt": "1" }, { "clean_st": "ND", "clean_error": "E427", "Cnt": "2" }, { "clean_st": "PR", "clean_error": "E412", "Cnt": "1" }, { "clean_st": "NY", "clean_error": "SB00", "Cnt": "1" }, { "clean_st": "KS", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "MI", "clean_error": "S800", "Cnt": "541" }, { "clean_st": "MA", "clean_error": "S880", "Cnt": "1" }, { "clean_st": "WV", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "AZ", "clean_error": "E421", "Cnt": "7" }, { "clean_st": "OK", "clean_error": "S820", "Cnt": "1" }, { "clean_st": "LA", "clean_error": "E412", "Cnt": "3" }, { "clean_st": "OR", "clean_error": "E421", "Cnt": "2" }, { "clean_st": "NE", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "MN", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "AR", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "PA", "clean_error": "E505", "Cnt": "1" }, { "clean_st": "MD", "clean_error": "S880", "Cnt": "2" }, { "clean_st": "SC", "clean_error": "E421", "Cnt": "1" }, { "clean_st": "LA", "clean_error": "S910", "Cnt": "1" }, { "clean_st": "UT", "clean_error": "SB00", "Cnt": "1" }, { "clean_st": "CO", "clean_error": "E421", "Cnt": "3" }, { "clean_st": "HI", "clean_error": "E421", "Cnt": "1" }, { "clean_st": "DE", "clean_error": "E412", "Cnt": "1" }, { "clean_st": "ME", "clean_error": "S800", "Cnt": "54" }, { "clean_st": "NY", "clean_error": "E412", "Cnt": "10" }, { "clean_st": "KY", "clean_error": "S800", "Cnt": "209" }, { "clean_st": "OK", "clean_error": "S800", "Cnt": "180" }, { "clean_st": "IN", "clean_error": "E412", "Cnt": "4" }, { "clean_st": "KS", "clean_error": "E421", "Cnt": "1" }, { "clean_st": "GA", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "AZ", "clean_error": "E422", "Cnt": "4" }, { "clean_st": "SC", "clean_error": "E427", "Cnt": "2" }, { "clean_st": "LA", "clean_error": "E421", "Cnt": "2" }, { "clean_st": "OR", "clean_error": "E412", "Cnt": "1" }, { "clean_st": "CT", "clean_error": "E412", "Cnt": "6" }, { "clean_st": "WA", "clean_error": "S800", "Cnt": "445" }, { "clean_st": "MN", "clean_error": "E427", "Cnt": "5" }, { "clean_st": "FL", "clean_error": "E412", "Cnt": "7" }, { "clean_st": "CA", "clean_error": "SA00", "Cnt": "1" }, { "clean_st": "MT", "clean_error": "E412", "Cnt": "2" }, { "clean_st": "AL", "clean_error": "SA00", "Cnt": "1" }, { "clean_st": "IN", "clean_error": "E421", "Cnt": "1" }, { "clean_st": "CA", "clean_error": "S880", "Cnt": "4" }, { "clean_st": "GU", "clean_error": "S800", "Cnt": "1" }, { "clean_st": "UT", "clean_error": "S900", "Cnt": "2" }, { "clean_st": "CT", "clean_error": "S890", "Cnt": "1" }, { "clean_st": "AK", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "OK", "clean_error": "S810", "Cnt": "2" }, { "clean_st": "ND", "clean_error": "E412", "Cnt": "2" }, { "clean_st": "NJ", "clean_error": "E421", "Cnt": "2" }, { "clean_st": "NM", "clean_error": "S800", "Cnt": "84" }, { "clean_st": "UT", "clean_error": "S820", "Cnt": "5" }, { "clean_st": "VA", "clean_error": "S8B0", "Cnt": "1" }, { "clean_st": "CA", "clean_error": "S910", "Cnt": "1" }, { "clean_st": "VA", "clean_error": "E412", "Cnt": "3" }, { "clean_st": "NJ", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "IN", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "TX", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "WY", "clean_error": "E412", "Cnt": "4" }, { "clean_st": "WV", "clean_error": "S800", "Cnt": "54" }, { "clean_st": "MI", "clean_error": "S900", "Cnt": "2" }, { "clean_st": "NV", "clean_error": "E412", "Cnt": "3" }, { "clean_st": "NY", "clean_error": "E427", "Cnt": "1" }, { "clean_st": "IL", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "IL", "clean_error": "E412", "Cnt": "13" }, { "clean_st": "NJ", "clean_error": "SA00", "Cnt": "1" }, { "clean_st": "WA", "clean_error": "S8A0", "Cnt": "1" }, { "clean_st": "CA", "clean_error": "S8C0", "Cnt": "1" }, { "clean_st": "CO", "clean_error": "E412", "Cnt": "7" }, { "clean_st": "DC", "clean_error": "E412", "Cnt": "1" }, { "clean_st": "GA", "clean_error": "S800", "Cnt": "660" }, { "clean_st": "IA", "clean_error": "S800", "Cnt": "151" }, { "clean_st": "WY", "clean_error": "S800", "Cnt": "23" }, { "clean_st": "TN", "clean_error": "E600", "Cnt": "1" }, { "clean_st": "MD", "clean_error": "S800", "Cnt": "445" }, { "clean_st": "PA", "clean_error": "E600", "Cnt": "1" }, { "clean_st": "NY", "clean_error": "S8B0", "Cnt": "1" }, { "clean_st": "NJ", "clean_error": "E427", "Cnt": "1" }, { "clean_st": "TX", "clean_error": "S800", "Cnt": "1751" }, { "clean_st": "CT", "clean_error": "E423", "Cnt": "1" }, { "clean_st": "OH", "clean_error": "E412", "Cnt": "5" }, { "clean_st": "KS", "clean_error": "S820", "Cnt": "1" }, { "clean_st": "NY", "clean_error": "E600", "Cnt": "1" }, { "clean_st": "NJ", "clean_error": "E412", "Cnt": "5" }, { "clean_st": "NY", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "OK", "clean_error": "E412", "Cnt": "2" }, { "clean_st": "MA", "clean_error": "E421", "Cnt": "1" }, { "clean_st": "AR", "clean_error": "S820", "Cnt": "1" }, { "clean_st": "PA", "clean_error": "S820", "Cnt": "2" }, { "clean_st": "MA", "clean_error": "S910", "Cnt": "1" }, { "clean_st": "NY", "clean_error": "E421", "Cnt": "8" }, { "clean_st": "UT", "clean_error": "E412", "Cnt": "9" }, { "clean_st": "NY", "clean_error": "S890", "Cnt": "2" }, { "clean_st": "CO", "clean_error": "S800", "Cnt": "443" }, { "clean_st": "MN", "clean_error": "S800", "Cnt": "401" }, { "clean_st": "FL", "clean_error": "E214", "Cnt": "1" }, { "clean_st": "UT", "clean_error": "S880", "Cnt": "1" }, { "clean_st": "OH", "clean_error": "E421", "Cnt": "7" }, { "clean_st": "IN", "clean_error": "S810", "Cnt": "1" }, { "clean_st": "CA", "clean_error": "S800", "Cnt": "2645" }, { "clean_st": "OR", "clean_error": "S800", "Cnt": "311" }, { "clean_st": "WA", "clean_error": "S810", "Cnt": "1" }, { "clean_st": "FL", "clean_error": "E216", "Cnt": "1" }, { "clean_st": "VT", "clean_error": "E430", "Cnt": "1" }, { "clean_st": "NY", "clean_error": "S800", "Cnt": "1206" }, { "clean_st": "IL", "clean_error": "S800", "Cnt": "696" }, { "clean_st": "MS", "clean_error": "E412", "Cnt": "4" }, { "clean_st": "NV", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "NC", "clean_error": "SA00", "Cnt": "1" }, { "clean_st": "MA", "clean_error": "S800", "Cnt": "441" }, { "clean_st": "MI", "clean_error": "S880", "Cnt": "1" }, { "clean_st": "GA", "clean_error": "E600", "Cnt": "2" }, { "clean_st": "TX", "clean_error": "S891", "Cnt": "1" }, { "clean_st": "OH", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "IA", "clean_error": "S8C0", "Cnt": "1" }, { "clean_st": "KS", "clean_error": "S810", "Cnt": "1" }, { "clean_st": "CA", "clean_error": "S890", "Cnt": "3" }, { "clean_st": "WI", "clean_error": "S880", "Cnt": "1" }, { "clean_st": "VT", "clean_error": "S800", "Cnt": "37" }, { "clean_st": "FL", "clean_error": "S820", "Cnt": "1" }, { "clean_st": "VA", "clean_error": "E421", "Cnt": "4" }, { "clean_st": "VA", "clean_error": "S890", "Cnt": "2" }, { "clean_st": "PA", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "ME", "clean_error": "E412", "Cnt": "3" }, { "clean_st": "MO", "clean_error": "E421", "Cnt": "4" }, { "clean_st": "IL", "clean_error": "E422", "Cnt": "2" }, { "clean_st": "CT", "clean_error": "S800", "Cnt": "238" }, { "clean_st": "UT", "clean_error": "E427", "Cnt": "1" }, { "clean_st": "MI", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "ND", "clean_error": "S880", "Cnt": "1" }, { "clean_st": "TN", "clean_error": "S800", "Cnt": "369" }, { "clean_st": "IL", "clean_error": "E421", "Cnt": "3" }, { "clean_st": "MO", "clean_error": "E422", "Cnt": "3" }, { "clean_st": "MT", "clean_error": "E421", "Cnt": "1" }, { "clean_st": "VI", "clean_error": "E421", "Cnt": "2" }, { "clean_st": "ID", "clean_error": "S800", "Cnt": "126" }, { "clean_st": "MA", "clean_error": "E412", "Cnt": "6" }, { "clean_st": "MS", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "VA", "clean_error": "S800", "Cnt": "461" }, { "clean_st": "LA", "clean_error": "S880", "Cnt": "2" }, { "clean_st": "SD", "clean_error": "S800", "Cnt": "43" }, { "clean_st": "VT", "clean_error": "E412", "Cnt": "3" }, { "clean_st": "FL", "clean_error": "S880", "Cnt": "2" }, { "clean_st": "NC", "clean_error": "S980", "Cnt": "1" }, { "clean_st": "TX", "clean_error": "E600", "Cnt": "1" }, { "clean_st": "MD", "clean_error": "SA00", "Cnt": "1" }, { "clean_st": "AL", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "MI", "clean_error": "E421", "Cnt": "4" }, { "clean_st": "HI", "clean_error": "S800", "Cnt": "53" }, { "clean_st": "IA", "clean_error": "S920", "Cnt": "1" }, { "clean_st": "VI", "clean_error": "E412", "Cnt": "1" }, { "clean_st": "OH", "clean_error": "SA00", "Cnt": "1" }, { "clean_st": "AL", "clean_error": "E421", "Cnt": "2" }, { "clean_st": "MD", "clean_error": "E421", "Cnt": "5" }, { "clean_st": "PA", "clean_error": "E412", "Cnt": "11" }, { "clean_st": "IA", "clean_error": "E427", "Cnt": "1" }, { "clean_st": "FL", "clean_error": "S900", "Cnt": "2" }, { "clean_st": "MS", "clean_error": "E421", "Cnt": "4" }, { "clean_st": "UT", "clean_error": "E422", "Cnt": "3" }, { "clean_st": "NH", "clean_error": "E421", "Cnt": "3" }, { "clean_st": "AL", "clean_error": "E427", "Cnt": "2" }, { "clean_st": "UT", "clean_error": "E421", "Cnt": "2" }, { "clean_st": "VA", "clean_error": "SA00", "Cnt": "2" }, { "clean_st": "SD", "clean_error": "E421", "Cnt": "2" }, { "clean_st": "AR", "clean_error": "S900", "Cnt": "1" }, { "clean_st": "OK", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "MI", "clean_error": "S820", "Cnt": "1" }, { "clean_st": "KY", "clean_error": "E412", "Cnt": "1" }, { "clean_st": "NY", "clean_error": "S880", "Cnt": "2" }, { "clean_st": "MO", "clean_error": "E412", "Cnt": "3" }, { "clean_st": "WV", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "MT", "clean_error": "S860", "Cnt": "1" }, { "clean_st": "OK", "clean_error": "E423", "Cnt": "1" }, { "clean_st": "CA", "clean_error": "E412", "Cnt": "16" }, { "clean_st": "MD", "clean_error": "E412", "Cnt": "6" }, { "clean_st": "NJ", "clean_error": "S800", "Cnt": "495" }, { "clean_st": "NC", "clean_error": "E412", "Cnt": "4" }, { "clean_st": "TX", "clean_error": "S860", "Cnt": "2" }, { "clean_st": "PA", "clean_error": "E421", "Cnt": "11" }, { "clean_st": "IA", "clean_error": "E422", "Cnt": "1" }, { "clean_st": "NY", "clean_error": "SA00", "Cnt": "2" }, { "clean_st": "IL", "clean_error": "S8A0", "Cnt": "1" }, { "clean_st": "GA", "clean_error": "S880", "Cnt": "1" }, { "clean_st": "WV", "clean_error": "E421", "Cnt": "1" }, { "clean_st": "IL", "clean_error": "S810", "Cnt": "1" }, { "clean_st": "IA", "clean_error": "S880", "Cnt": "2" }, { "clean_st": "MT", "clean_error": "S800", "Cnt": "69" }, { "clean_st": "VT", "clean_error": "E421", "Cnt": "2" }, { "clean_st": "SC", "clean_error": "E412", "Cnt": "2" }, { "clean_st": "IN", "clean_error": "S800", "Cnt": "311" }, { "clean_st": "UT", "clean_error": "S800", "Cnt": "165" }, { "clean_st": "GA", "clean_error": "E421", "Cnt": "8" }, { "clean_st": "CO", "clean_error": "S890", "Cnt": "1" }, { "clean_st": "OK", "clean_error": "E421", "Cnt": "3" }, { "clean_st": "ID", "clean_error": "E421", "Cnt": "3" }, { "clean_st": "KS", "clean_error": "S800", "Cnt": "150" }, { "clean_st": "SC", "clean_error": "S820", "Cnt": "1" }, { "clean_st": "TX", "clean_error": "S880", "Cnt": "3" }, { "clean_st": "MN", "clean_error": "S810", "Cnt": "1" }, { "clean_st": "OH", "clean_error": "S800", "Cnt": "637" }, { "clean_st": "AR", "clean_error": "S800", "Cnt": "134" }, { "clean_st": "PA", "clean_error": "S800", "Cnt": "647" }, { "clean_st": "IA", "clean_error": "E421", "Cnt": "1" }, { "clean_st": "PA", "clean_error": "E422", "Cnt": "2" }, { "clean_st": "WA", "clean_error": "E421", "Cnt": "4" }, { "clean_st": "DC", "clean_error": "S800", "Cnt": "90" }]);
            var tmp = db.length();
            var tmp2 = db.width();
        });
    });
});
