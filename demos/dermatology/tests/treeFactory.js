"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_treeFactory = factory();
    }
}(this, function () {
    return {
        CirclePacking: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/CirclePacking"], function (DataFactory, CirclePacking) {
                    callback(new CirclePacking()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            },
            flare: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/CirclePacking"], function (DataFactory, CirclePacking) {
                    callback(new CirclePacking()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            }
        },
        Dendrogram: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/Dendrogram"], function (DataFactory, Dendrogram) {
                    callback(new Dendrogram()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            },
            flare: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/Dendrogram"], function (DataFactory, Dendrogram) {
                    callback(new Dendrogram()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            }
        },
        Indented: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/Indented"], function (DataFactory, Indented) {
                    callback(new Indented()
                        .columns(["label", "size"])
                        .data(DataFactory.Tree.default.data)
                    );
                });
            },
            flare: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/Indented"], function (DataFactory, Indented) {
                    callback(new Indented()
                        .columns(["label", "size"])
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            },
            xml: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/Indented"], function (DataFactory, Indented) {
                    callback(new Indented()
                        .columns(["Col A", "Col B", "Col C"])
                        .xmlColumn("Col C")
                        .data([
                            ["", "", '<?xml version="1.0" encoding="UTF-8"?><breakfast_menu><food><name>Belgian Waffles</name><price>$5.95</price><description>Two of our famous Belgian Waffles with plenty of real maple syrup</description><calories>650</calories></food><food><name>Strawberry Belgian Waffles</name><price>$7.95</price><description>Light Belgian waffles covered with strawberries and whipped cream</description><calories>900</calories></food><food><name>Berry-Berry Belgian Waffles</name><price>$8.95</price><description>Light Belgian waffles covered with an assortment of fresh berries and whipped cream</description><calories>900</calories></food><food><name>French Toast</name><price>$4.50</price><description>Thick slices made from our homemade sourdough bread</description><calories>600</calories></food><food><name>Homestyle Breakfast</name><price>$6.95</price><description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns</description><calories>950</calories></food></breakfast_menu>'],
                            ["", "", '<?xml version="1.0" encoding="UTF-8"?><breakfast_menu><food><name>Belgian Waffles</name><price>$5.95</price><description>Two of our famous Belgian Waffles with plenty of real maple syrup</description><calories>650</calories></food><food><name>Strawberry Belgian Waffles</name><price>$7.95</price><description>Light Belgian waffles covered with strawberries and whipped cream</description><calories>900</calories></food><food><name>Berry-Berry Belgian Waffles</name><price>$8.95</price><description>Light Belgian waffles covered with an assortment of fresh berries and whipped cream</description><calories>900</calories></food><food><name>French Toast</name><price>$4.50</price><description>Thick slices made from our homemade sourdough bread</description><calories>600</calories></food><food><name>Homestyle Breakfast</name><price>$6.95</price><description>Two eggs, bacon or sausage, toast, and our ever-popular hash browns</description><calories>950</calories></food></breakfast_menu>']
                        ])
                    );
                });
            }
        },
        SunburstPartition: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/SunburstPartition"], function (DataFactory, SunburstPartition) {
                    callback(new SunburstPartition()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            },
            flare: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/SunburstPartition"], function (DataFactory, SunburstPartition) {
                    callback(new SunburstPartition()
                        .data(DataFactory.Tree.flare.data)
                    );
                });
            }

        },

        Treemap: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/Treemap"], function (DataFactory, Treemap) {
                    callback(new Treemap()
                        .columns(["label", "size"])
                        .data(DataFactory.Tree.default.data)
                        .tilingMethod("treemapBinary")
                    );
                });
            },
            flare: function (callback) {
                legacyRequire(["test/DataFactory", "src/tree/Treemap"], function (DataFactory, Treemap) {
                    callback(new Treemap()
                        .columns(["label", "size"])
                        .data(DataFactory.Tree.flare.data)
                        .showRoot(true)
                        .paddingInner(2)
                        .paddingOuter(4)
                        .paddingTop(18)
                        .parentFontSize(12)
                        .leafFontSize(10)
                    );
                });
            },
            page_html: function (callback) {
                legacyRequire(["src/tree/Treemap"], function (Treemap) {
                    let get_data = function (e) {
                        return {
                            "label": e.tagName,
                            "size": e.outerHTML.length,
                            "children": e.children.map(get_data)
                        }
                    };
                    var _data = get_data(document.querySelector("main"));
                    callback(new Treemap()
                        .columns(["label", "size"])
                        .data(_data)
                        .showRoot(true)
                        .paddingInner(2)
                        .paddingOuter(4)
                        .paddingTop(18)
                        .parentFontSize(12)
                        .leafFontSize(10)
                    );
                });
            }
        }
    };
}));