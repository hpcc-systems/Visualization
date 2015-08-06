"use strict";
define(["src/common/Utility"], function (Utility) {
    describe("utility", function () {
        it("util-naturalSort-test", function (done) {
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

            var sortedListE = Utility.naturalSort(list2,"ascending",0,false);
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

            done();
        });
    });
});

