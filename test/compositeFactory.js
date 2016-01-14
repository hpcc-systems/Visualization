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
                        .chartType("LINE")
                        .domainAxisTitle("Simple Domain Title")
                        .valueAxisTitle("Simple Value Title")
                        .title("Simple MegaChart Title")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    ;
                    callback(mc);
                });
            },
            pie: function (callback) {
                require(["test/DataFactory", "src/composite/MegaChart"], function (DataFactory, MegaChart) {
                    var mc = new MegaChart()
                        .chartType("C3_PIE")
                        .legendPosition("bottom")
                        .title("Simple MegaChart Title")
                        .columns(DataFactory.ND.subjects.columns)
                        .data(DataFactory.ND.subjects.data)
                    ;
                    callback(mc);
                });
            },
        },
        Performance: {
            column: function (callback) {
                require(["test/DataFactory","src/layout/Grid","src/chart/Summary","src/chart/Column","src/c3chart/Column","src/amchart/Column"], function (DataFactory, Grid, Summary, Col, Col2, Col3) {
                    window.__hpcc_debug = true;
                    var c = DataFactory.ND.random.columns(50);
                    var d = DataFactory.ND.random.data(10,50);
                    var grid = new Grid();
                    var sum1 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    var sum2 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    var sum3 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    grid.setContent(0,0,new Grid().setContent(0,0,new Col().columns(c).data(d).render(r1),"",1,3).setContent(0,3,sum1),"HPCC Column");
                    grid.setContent(1,0,new Grid().setContent(0,0,new Col2().columns(c).data(d).render(r2),"",1,3).setContent(0,3,sum2),"C3 Column");
                    grid.setContent(2,0,new Grid().setContent(0,0,new Col3().startDuration(0).columns(c).data(d).render(r3),"",1,3).setContent(0,3,sum3),"AM Column");
                    callback(grid);
                    function r1(w){setInterval(function(){sum1.data([w.updateDuration()]).render();},1000);}
                    function r2(w){setInterval(function(){sum2.data([w.updateDuration()]).render();},1000);}
                    function r3(w){setInterval(function(){sum3.data([w.updateDuration()]).render();},1000);}
                });
            },
            bar: function (callback) {
                require(["test/DataFactory","src/layout/Grid","src/chart/Summary","src/chart/Bar","src/c3chart/Bar","src/amchart/Bar"], function (DataFactory, Grid, Summary, Bar, Bar2, Bar3) {
                    window.__hpcc_debug = true;
                    var c = DataFactory.ND.random.columns(50);
                    var d = DataFactory.ND.random.data(10,50);
                    var grid = new Grid();
                    var sum1 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    var sum2 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    var sum3 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    grid.setContent(0,0,new Grid().setContent(0,0,new Bar().columns(c).data(d).render(r1),"",1,3).setContent(0,3,sum1),"HPCC Bar");
                    grid.setContent(1,0,new Grid().setContent(0,0,new Bar2().columns(c).data(d).render(r2),"",1,3).setContent(0,3,sum2),"C3 Bar");
                    grid.setContent(2,0,new Grid().setContent(0,0,new Bar3().startDuration(0).columns(c).data(d).render(r3),"",1,3).setContent(0,3,sum3),"AM Bar");
                    callback(grid);
                    function r1(w){setInterval(function(){sum1.data([w.updateDuration()]).render();},100);}
                    function r2(w){setInterval(function(){sum2.data([w.updateDuration()]).render();},100);}
                    function r3(w){setInterval(function(){sum3.data([w.updateDuration()]).render();},100);}
                });
            },
            line: function (callback) {
                require(["test/DataFactory","src/layout/Grid","src/chart/Summary","src/chart/Line","src/c3chart/Line","src/amchart/Line"], function (DataFactory, Grid, Summary, Line, Line2, Line3) {
                    window.__hpcc_debug = true;
                    var c = DataFactory.ND.random.columns(50);
                    var d = DataFactory.ND.random.data(10,50);
                    var grid = new Grid();
                    var sum1 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    var sum2 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    var sum3 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    grid.setContent(0,0,new Grid().setContent(0,0,new Line().columns(c).data(d).render(r1),"",1,3).setContent(0,3,sum1),"HPCC Line");
                    grid.setContent(1,0,new Grid().setContent(0,0,new Line2().columns(c).data(d).render(r2),"",1,3).setContent(0,3,sum2),"C3 Line");
                    grid.setContent(2,0,new Grid().setContent(0,0,new Line3().startDuration(0).columns(c).data(d).render(r3),"",1,3).setContent(0,3,sum3),"AM Line");
                    callback(grid);
                    function r1(w){setInterval(function(){sum1.data([w.updateDuration()]).render();},100);}
                    function r2(w){setInterval(function(){sum2.data([w.updateDuration()]).render();},100);}
                    function r3(w){setInterval(function(){sum3.data([w.updateDuration()]).render();},100);}
                });
            },
            area: function (callback) {
                require(["test/DataFactory","src/layout/Grid","src/chart/Summary","src/chart/Area","src/c3chart/Area","src/amchart/Area"], function (DataFactory, Grid, Summary, Area, Area2, Area3) {
                    window.__hpcc_debug = true;
                    var c = DataFactory.ND.random.columns(50);
                    var d = DataFactory.ND.random.data(10,50);
                    var grid = new Grid();
                    var sum1 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    var sum2 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    var sum3 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    grid.setContent(0,0,new Grid().setContent(0,0,new Area().columns(c).data(d).render(r1),"",1,3).setContent(0,3,sum1),"HPCC Area");
                    grid.setContent(1,0,new Grid().setContent(0,0,new Area2().columns(c).data(d).render(r2),"",1,3).setContent(0,3,sum2),"C3 Area");
                    grid.setContent(2,0,new Grid().setContent(0,0,new Area3().startDuration(0).columns(c).data(d).render(r3),"",1,3).setContent(0,3,sum3),"AM Area");
                    callback(grid);
                    function r1(w){setInterval(function(){sum1.data([w.updateDuration()]).render();},100);}
                    function r2(w){setInterval(function(){sum2.data([w.updateDuration()]).render();},100);}
                    function r3(w){setInterval(function(){sum3.data([w.updateDuration()]).render();},100);}
                });
            },
            pie: function (callback) {
                require(["test/DataFactory","src/layout/Grid","src/chart/Summary","src/chart/Pie","src/c3chart/Pie","src/amchart/Pie"], function (DataFactory, Grid, Summary, Pie, Pie2, Pie3) {
                    window.__hpcc_debug = true;
                    var c = DataFactory.ND.random.columns(50);
                    var d = DataFactory.ND.random.data(10,50);
                    var grid = new Grid();
                    var sum1 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    var sum2 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    var sum3 = new Summary().columns(["milliseconds"]).data(["?"]).valueIcon("fa-clock-o").moreText("").moreIcon("").minWidth(175).minHeight(110);
                    grid.setContent(0,0,new Grid().setContent(0,0,new Pie().columns(c).data(d).render(r1),"",1,3).setContent(0,3,sum1),"HPCC Pie");
                    grid.setContent(1,0,new Grid().setContent(0,0,new Pie2().columns(c).data(d).render(r2),"",1,3).setContent(0,3,sum2),"C3 Pie");
                    grid.setContent(2,0,new Grid().setContent(0,0,new Pie3().columns(c).data(d).render(r3),"",1,3).setContent(0,3,sum3),"AM Pie");
                    callback(grid);
                    function r1(w){setInterval(function(){sum1.data([w.updateDuration()]).render();},100);}
                    function r2(w){setInterval(function(){sum2.data([w.updateDuration()]).render();},100);}
                    function r3(w){setInterval(function(){sum3.data([w.updateDuration()]).render();},100);}
                });
            },
        }
    };

    return compositeFactory;
}));
