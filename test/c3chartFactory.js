"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_c3chartFactory = factory();
    }
}(this, function () {
    return {
        Bar: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Bar"], function (DataFactory, Bar) {
                    callback(new Bar()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
        },
        Column: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Column"], function (DataFactory, Column) {
                    callback(new Column()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    );
                });
            },
        },
        Combo: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Combo"], function (DataFactory, Combo) {
                    callback(new Combo()
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                        .types(["bar","line","area"])
                    );
                });
            },
            complex: function (callback) {
                require(["test/DataFactory", "src/layout/Grid", "src/c3chart/Combo"], function (DataFactory, Grid, Combo) {
                    var grid = new Grid()
                            .setContent(0,0,new Combo()
                                .columns(DataFactory.ND.random.columns(4))
                                .data(DataFactory.ND.random.data(6,4))
                                .types(["bar","line","spline"]))
                            .setContent(1,0,new Combo()
                                .columns(DataFactory.ND.random.columns(4))
                                .data(DataFactory.ND.random.data(6,4))
                                .types(["bar","area","area-spline"]))
                            .setContent(2,0,new Combo()
                                .columns(DataFactory.ND.random.columns(4))
                                .data(DataFactory.ND.random.data(6,4))
                                .types(["bar","step","area-step"]))
                            .setContent(3,0,new Combo()
                                .columns(DataFactory.ND.random.columns(6))
                                .data(DataFactory.ND.random.data(6,6))
                                .types(["spline","scatter","scatter","scatter","scatter"]))
                    
                    callback(grid);
                });
            },
        },
        Donut: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Donut"], function (DataFactory, Donut) {
                    callback(new Donut()
                    .columns(DataFactory.TwoD.subjects.columns)
                    .data(DataFactory.TwoD.subjects.data)
                    );
                });
            }
        },
        Scatter: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Scatter"], function (DataFactory, Scatter) {
                    callback(new Scatter()
                    .columns(DataFactory.ND.subjects.columns)
                    .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Line: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Line"], function (DataFactory, Line) {
                    callback(new Line()
                    .columns(DataFactory.ND.subjects.columns)
                    .data(DataFactory.ND.subjects.data)
                    );
                });
            },
            timeX: function (callback) {
                require(["test/DataFactory", "src/c3chart/Line"], function (DataFactory, Line) {
                    callback(new Line()
                        .columns(DataFactory.timeX.default.columns)
                        .data(DataFactory.timeX.default.data)
                        //.columns(["label","byte_size"])
                        //.data([[20131114,845147771520],[20131115,845413861248],[20131116,845505046272],[20131117,846118100352],[20131118,846815387520],[20131120,847483538304],[20131121,848162887296],[20131121,848779954560],[20131123,849061577088],[20131123,849153726336],[20131124,849854513664],[20131125,850557859584],[20131126,851211172992],[20131127,851889617280],[20131128,852545173632],[20131129,852752958336],[20131201,852844167936],[20131202,853507409280],[20131202,854414364672],[20131203,854995444224],[20131204,855066112512],[20131205,855282908928],[20131206,855454788480],[20131208,855546772224],[20131208,856267511808],[20131209,857036201856],[20131210,857698048896],[20131211,858319536000],[20131211,858890092032],[20131212,859089970560],[20131214,859764154752],[20131216,859847545344],[20131218,859847545344],[20131218,860506351104],[20131218,861132780672],[20131218,861729010560],[20131218,862317015168],[20131219,862488915072],[20131221,862571083008],[20131221,863204073600],[20131223,864069229440],[20131223,864803207424],[20131224,865362761088],[20131226,865874510976],[20131226,866033377152],[20140102,866107161984],[20140102,866629983744],[20140102,866867457408],[20140102,866919303168],[20140106,869617986048],[20140107,870452642688],[20140108,871214039040],[20140110,828437649715],[20140113,829887489940],[20140113,830613864760],[20140115,831310784445],[20140115,831970936585],[20140116,832187879445],[20140117,832312265970],[20140121,835244163510],[20140127,838614476420],[20140128,839308270975],[20140129,839957439170],[20140130,840173330100],[20140131,840286689245],[20140203,842534622410],[20140205,843211207580],[20140205,843944253870],[20140206,844159658620],[20140207,844265172090],[20140208,844981442250],[20140210,846364895910],[20140211,847066987280],[20140213,847797417615],[20140214,848094160425],[20140214,848235440245],[20140219,849107136165],[20140224,852474869255],[20140225,854763116670],[20140228,856639460125],[20140228,856773138090],[20140301,857649151595],[20140302,858632952885],[20140303,859444042745],[20140304,860257107255],[20140630,813619339776],[20131111,842380263552],[20140306,860981718395],[20140307,861228144860],[20140308,861356256210],[20140309,862191022525],[20140310,862998410555],[20131108,839430444288],[20131109,842172309888],[20140310,863763402010],[20140312,864499909960],[20140313,865185181035],[20140314,865414689385],[20140314,865533828670],[20140315,866325237000],[20140317,867830391880],[20140317,867103647315],[20131030,836162244864],[20131108,838431302400],[20140630,813520106496],[20131108,840793452288],[20131109,841431800832],[20131108,837709744896],[20140630,797961535872],[20131024,830278809600],[20131107,836810452992],[20131111,844527790080],[20131111,842854300416],[20131108,837618497280],[20131107,837423931392],[20131108,840188184960]])
                        .xAxisType("time")
                        .xAxisTypeTimePattern("%Y-%m-%dT%H:%M:%S")
                        .xAxisLabelRotation(-45)
                        //.xAxisTypeTimePattern("%Y%m%d")
                        //.yAxisType("linear")
                    );
                });
            },
        },
        Area: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Area"], function (DataFactory, Area) {
                    callback(new Area()
                    .columns(DataFactory.ND.subjects.columns)
                    .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Pie: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Pie"], function (DataFactory, Pie) {
                    callback(new Pie()
                    .columns(DataFactory.TwoD.subjects.columns)
                    .data(DataFactory.TwoD.subjects.data)
                    );
                });
            }
        },
        Step: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Step"], function (DataFactory, Step) {
                    callback(new Step()
                    .columns(DataFactory.ND.subjects.columns)
                    .data(DataFactory.ND.subjects.data)
                    );
                });
            }
        },
        Gauge: {
            simple: function (callback) {
                require(["test/DataFactory", "src/c3chart/Gauge"], function (DataFactory, Gauge) {
                    callback(new Gauge()
                    .columns(DataFactory.OneD.subjects.columns)
                    .data(DataFactory.OneD.subjects.data)
                    );
                });
            }
        }
    };
}));