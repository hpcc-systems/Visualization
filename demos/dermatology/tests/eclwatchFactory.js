"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_graphFactory = factory();
    }
}(this, function () {
    return {
        WU: {
            Graph: function (callback) {
                legacyRequire(["test/DataFactory", "src/eclwatch/WUGraph"], function (DataFactory, WUGraph) {
                    var graph = new WUGraph()
                        .baseUrl("http://192.168.3.22:8010/")
                        //.wuid("W20180421-040152")  // GenData - hthor
                        .wuid("W20180329-153028") // sqagg-multiPart(true)
                        //.wuid("W20180329-152400")
                        //.wuid("W20180329-153043")
                        //.wuid("W20180317-091825")  // BadWordSearch
                        .graphID("graph1")
                        ;
                    callback(graph);
                });
            },
            Timeline: function (callback) {
                legacyRequire(["test/DataFactory", "src/eclwatch/WUTimeline"], function (DataFactory, WUTimeline) {
                    var timeline = new WUTimeline()
                        .baseUrl("http://192.168.3.22:8010/")
                        // .wuid("W20180421-040152")  // GenData - hthor
                        .wuid("W20180329-153028") // sqagg-multiPart(true)
                        //.wuid("W20180329-152400")
                        //.wuid("W20180329-153043")
                        //.wuid("W20180317-091825")  // BadWordSearch
                        ;
                    callback(timeline);
                });
            },
            Grid: function (callback) {
                legacyRequire(["test/DataFactory", "src/eclwatch/WUResult"], function (DataFactory, WUResult) {
                    callback(new WUResult()
                        .wsWorkunitsUrl("http://192.168.3.22:8010")
                        .wuid("W20180421-040152")  // GenData - hthor
                        //.wuid("W20180329-153028") // sqagg-multiPart(true)
                        //.wuid("W20180329-152400")
                        //.wuid("W20180329-153043")
                        //.wuid("W20180317-091825")  // BadWordSearch
                        .sequence(1)
                    );
                });
            }
        },
        WUResult: {
            Nested: function (callback) {
                legacyRequire(["src/eclwatch/WUResult"], function (WUResult) {
                    callback(new WUResult()
                        .wsWorkunitsUrl("http://192.168.3.22:8010")
                        .wuid("W20170627-102820")
                        .resultName("NestedChildDataset")
                    );
                });
            },
            Nested2: function (callback) {
                legacyRequire(["src/eclwatch/WUResult"], function (WUResult) {
                    callback(new WUResult()
                        .wsWorkunitsUrl("http://192.168.3.22:8010")
                        .wuid("W20170630-090707")
                        .resultName("All")
                    );
                });
            },
            LargeBySeq: function (callback) {
                legacyRequire(["src/eclwatch/WUResult"], function (WUResult) {
                    callback(new WUResult()
                        .wsWorkunitsUrl("http://192.168.3.22:8010")
                        .wuid("W20170424-070701")
                        .sequence(1)
                    );
                });
            },
            LargeByName: function (callback) {
                legacyRequire(["src/eclwatch/WUResult"], function (WUResult) {
                    callback(new WUResult()
                        .wsWorkunitsUrl("http://192.168.3.22:8010")
                        .wuid("W20170424-070701")
                        .resultName("Result 1")
                    );
                });
            }
        },
        WUStatus: {
            Nested: function (callback) {
                legacyRequire(["src/eclwatch/WUStatus"], function (WUStatus) {
                    callback(new WUStatus()
                        .baseUrl("http://192.168.3.22:8010")
                        .wuid("W20180430-094127")
                    );
                });
            }
        }
    };
}));
