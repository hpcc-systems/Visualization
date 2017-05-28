"use strict";
define(["src/common/Utility"], function (Utility) {
    describe("utility", function () {
        it("util-naturalSort-test", function () {
            var list1 = ["a","b","c","AA","AB","AB123","CD456",123,456,"111","222"];

            // Without "idx"
            var sortedListA = Utility.naturalSort(list1,"ascending",null,false);
            var expectedListA = ["111", 123, "222", 456, "a", "AA", "AB", "AB123", "b", "c", "CD456"];

            var sortedListB = Utility.naturalSort(list1,"descending",null,false);
            var expectedListB = [456, "222", 123, "111", "CD456", "c", "b", "AB123", "AB", "AA", "a"];

            var sortedListC = Utility.naturalSort(list1,"ascending",null,true);
            var expectedListC = ["111", 123, "222", 456, "AA", "AB", "AB123", "CD456", "a", "b", "c"];

            var sortedListD = Utility.naturalSort(list1,"descending",null,true);
            var expectedListD = [456, "222", 123, "111", "c", "b", "a", "CD456", "AB123", "AB", "AA"];

            // With "idx"
            var list2 = [
                            [37.665074, -122.384375, "green-dot.png"],
                            [32.690680, -117.178540],
                            [39.709455, -104.969859],
                            [41.244123, -95.961610],
                            [32.688980, -117.192040],
                            [45.786490, -108.526600],
                            [45.796180, -108.535652],
                            [45.774320, -108.494370],
                            [45.777062, -108.549835, "red-dot.png"]
            ];
            var sortedListE = Utility.naturalSort(list2, "ascending", 0, false);
            var expectedListE = [[32.68898,-117.19204],[32.69068,-117.17854],[37.665074,-122.384375,"green-dot.png"],[39.709455,-104.969859],[41.244123,-95.96161],[45.77432,-108.49437],[45.78649,-108.5266],[45.79618,-108.535652],[45.777062,-108.549835,"red-dot.png"]];

            var sortedListF = Utility.naturalSort(list2,"descending",0,false);
            var expectedListF = [[45.777062,-108.549835,"red-dot.png"],[45.79618,-108.535652],[45.78649,-108.5266],[45.77432,-108.49437],[41.244123,-95.96161],[39.709455,-104.969859],[37.665074,-122.384375,"green-dot.png"],[32.69068,-117.17854],[32.68898,-117.19204]];

            var sortedListG = Utility.naturalSort(list2,"descending",1,false);
            var expectedListG = [[41.244123,-95.96161],[39.709455,-104.969859],[45.77432,-108.49437],[45.78649,-108.5266],[45.79618,-108.535652],[45.777062,-108.549835,"red-dot.png"],[32.69068,-117.17854],[32.68898,-117.19204],[37.665074,-122.384375,"green-dot.png"]];


            assert.deepEqual(sortedListA,expectedListA);
            assert.deepEqual(sortedListB,expectedListB);
            assert.deepEqual(sortedListC,expectedListC);
            assert.deepEqual(sortedListD,expectedListD);

            assert.deepEqual(sortedListE,expectedListE);
            assert.deepEqual(sortedListF,expectedListF);
            assert.deepEqual(sortedListG,expectedListG);
        });

        it("util-multiSort-test", function () {
            var list = [
                ["a", 1, "a"],
                ["b", 3, "d"],
                ["b", 3, "e"],
                ["a", 1, "b"],
                ["a", 1, "c"],
                ["a", 2, "a"],
                ["b", 3, "f"],
                ["a", 2, "b"],
                ["b", 2, "c"],
                ["b", 1, "g"]
            ];
            Utility.multiSort(list, [{ idx: 0 }, { idx: 1 }, { idx: 2 }]);
            assert.deepEqual(list, [
                ["a", 1, "a"],
                ["a", 1, "b"],
                ["a", 1, "c"],
                ["a", 2, "a"],
                ["a", 2, "b"],
                ["b", 1, "g"],
                ["b", 2, "c"],
                ["b", 3, "d"],
                ["b", 3, "e"],
                ["b", 3, "f"]
            ]);
            Utility.multiSort(list, [{ idx: 0, reverse: true }, { idx: 1, reverse: true }, { idx: 2, reverse: true }]);
            assert.deepEqual(list, [
                ["b", 3, "f"],
                ["b", 3, "e"],
                ["b", 3, "d"],
                ["b", 2, "c"],
                ["b", 1, "g"],
                ["a", 2, "b"],
                ["a", 2, "a"],
                ["a", 1, "c"],
                ["a", 1, "b"],
                ["a", 1, "a"]
            ]);
            Utility.multiSort(list, [{ idx: 1}, { idx: 2, reverse: true }]);
            assert.deepEqual(list, [
                ["b", 1, "g"],
                ["a", 1, "c"],
                ["a", 1, "b"],
                ["a", 1, "a"],
                ["b", 2, "c"],
                ["a", 2, "b"],
                ["a", 2, "a"],
                ["b", 3, "f"],
                ["b", 3, "e"],
                ["b", 3, "d"]
            ]);
            Utility.multiSort(list, [{ idx: 2, reverse: true }]);
            assert.deepEqual(list, [
                ["b", 1, "g"],
                ["b", 3, "f"],
                ["b", 3, "e"],
                ["b", 3, "d"],
                ["a", 1, "c"],
                ["b", 2, "c"],
                ["a", 1, "b"],
                ["a", 2, "b"],
                ["a", 1, "a"],
                ["a", 2, "a"]
            ]);
            Utility.multiSort(list, [{ idx: 0 }]);
            assert.deepEqual(list, [
                ["a", 1, "c"],
                ["a", 1, "b"],
                ["a", 2, "b"],
                ["a", 1, "a"],
                ["a", 2, "a"],
                ["b", 1, "g"],
                ["b", 3, "f"],
                ["b", 3, "e"],
                ["b", 3, "d"],
                ["b", 2, "c"]
            ]);
        });

        it("util-d3arrayapater-test", function () {
            var arr = ["a", "b", "c", "d", "e", "f", "z"];
            var arr1 = arr.map(function(row) {return row;});
            var arr2 = ["z", "x", "a", "c", "f", "b"];
            var tmp = d3.select(Utility.d3ArrayAdapter(arr1));
            var sel = tmp.selectAll("");
            var join = sel.data(arr2, function (d) { return d; });
            join.enter().append("")
                .each(function (d) {
                    //console.log("enter:  " + d);
                })
            ;
            join
                .each(function (d) {
                    //console.log("update:  " + d);
                })
            ;
            join.exit()
                .each(function (d) {
                    //console.log("exit:  " + d);
                }).remove()
            ;
            join.order();
            assert.deepEqual(arr1, arr2);
            assert.deepEqual(sel.filter(function (d, i) { return i % 2 === 1; }).data(), arr.filter(function (d, i) { return i % 2 === 1; }));
            assert.deepEqual(join.filter(function (d, i) { return i % 2 === 1; }).data(), arr2.filter(function (d, i) { return i % 2 === 1; }));
        });
    });
});

