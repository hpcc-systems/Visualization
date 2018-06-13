"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_layoutFactory = factory();
    }
}(this, function () {




    //example:
    // new MiniGantt()
    //             .timePattern('%Y-%m-%d')
    //             .tickFormat('%Y %M %d')
    //             .data(data)
    //             .target('timeline')
    //             .resize()
    //             .render()
    //             .display(true);
    const data =
        [
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-07"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-10"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-27"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-19"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-02"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-27"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-05-12"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-22"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-27"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-19"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-18"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-20"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-20"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-13"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-28"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-18"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-04"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-19"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-18"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-19"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-16"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-26"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-22"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-18"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-11"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-28"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-21"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-24"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-26"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-24"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-05-07"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-03"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-22"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-17"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-05"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-07-21"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-31"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-27"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-15"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-30"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-05"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-05-05"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-08"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-05-29"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-18"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-19"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-25"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-28"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-15"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-05-19"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-24"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-05-30"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-30"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-13"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-05-11"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-02"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-07-22"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-07-28"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-26"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-07-24"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-07-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-05-02"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-19"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-21"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-06"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-12"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-04"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-12"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-11"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-12"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-19"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-29"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-03"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-06-05"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-10"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-12"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-21"
            ],
            [
                "APPLIED FOR BENEFITS",
                "2017-03-09"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-24"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-18"
            ],
            [
                "NATIONAL COMPREHENSIVE REPORT ASSOCIATES",
                "2017-06-13"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-11"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-06"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-26"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-07-12"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-31"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-08"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-11"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-05"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-04-12"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-03-06"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-22"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-01-24"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-08-29"
            ],
            [
                "FLAT RATE COMPREHENSIVE REPORT",
                "2017-02-03"
            ],
            // [
            //     "Florida License",
            //     // "",
            //     "2017-01-05",
            //     "2017-05-30"
            // ],
            // [
            //     "Arizona License",
            //     // "",
            //     "2017-05-31",
            //     "2017-08-30"
            // ]
        ].map(n => {
            let sp = n[0].split(" ");
            n[0] = sp.length === 4 ? `${sp[0]} ${sp[1]}\n${sp[2]} ${sp[3]}` : n[0];
            return n;
        })


    return {
        MiniGantt: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/timeline/MiniGantt"], function (DataFactory, MiniGantt) {
                    callback(new MiniGantt()
                        .columns(["Label", "start", "end"])
                        .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                        .tickFormat("%H:%M")
                        .data([
                            ["Start", "2016-07-01T09:12:15.0Z"],
                            // ["item-1", "2016-07-01T09:10:00.0Z", "2016-07-01T09:45:00.0Z", { icon: "fa-user", description: "test" }],
                            // ["item-2", "2016-07-01T11:00:00.0Z", "2016-07-01T12:00:00.0Z"],
                            // ["item-3", "2016-07-01T09:20:00.0Z", "2016-07-01T12:20:00.0Z"],
                            ["Credit\nFraud", "2016-07-01T11:45:45.0Z"],
                            // ["item-4", "2016-07-01T09:15:00.0Z", "2016-07-01T12:20:00.0Z"],
                            ["Credit Fraud", "2016-07-01T11:55:45.0Z"],
                            // ["item-6", "2016-07-01T10:00:00.0Z", "2016-07-01T10:50:00.0Z"],
                            // ["item-7", "2016-07-01T10:30:01.0Z", "2016-07-01T10:40:00.0Z"],
                            ["Finish", "2016-07-01T12:30:45.0Z"]
                        ])
                    );
                });
            },
            heavy: function (callback) {
                legacyRequire(["test/DataFactory", "src/timeline/MiniGantt"], function (DataFactory, MiniGantt) {
                    const label_arr = ["Event", "Short Range", "Long Range"];
                    const icon_arr = [""];
                    callback(new MiniGantt()
                        .columns(["Label", "start", "end"])
                        .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                        .tickFormat("%H:%M")
                        .data(Array(300).fill("").map((row, row_idx) => {
                            const yyyy = 2004 + Math.floor(Math.random() * 15);
                            const mm = 1 + Math.floor(Math.random() * 12);
                            const dd = 1 + Math.floor(Math.random() * 28);
                            const hh = 1 + Math.floor(Math.random() * 23);
                            const min = 1 + Math.floor(Math.random() * 60);
                            const sec = 0 + Math.floor(Math.random() * 60);
                            const d1 = `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}T${hh < 10 ? '0' + hh : hh}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}.0Z`;
                            if (Math.random() > 0.1) {
                                return [`Random Event #${row_idx}`, d1];
                            }
                            const yyyy2 = 2004 + Math.floor(Math.random() * 15);
                            const mm2 = 1 + Math.floor(Math.random() * 12);
                            const dd2 = 1 + Math.floor(Math.random() * 28);
                            const hh2 = 1 + Math.floor(Math.random() * 23);
                            const min2 = 1 + Math.floor(Math.random() * 60);
                            const sec2 = 0 + Math.floor(Math.random() * 60);
                            const d2 = `${yyyy2}-${mm2 < 10 ? '0' + mm2 : mm2}-${dd2 < 10 ? '0' + dd2 : dd2}T${hh2 < 10 ? '0' + hh2 : hh2}:${min2 < 10 ? '0' + min2 : min2}:${sec2 < 10 ? '0' + sec2 : sec2}.0Z`;
                            return new Date(d1) - new Date(d2) > 0 ? [`Random Range a #${row_idx}`, d2, d1] : [`Random Range b #${row_idx}`, d1, d2];
                        }))
                    );
                });
            },
            all_events: function (callback) {
                legacyRequire(["test/DataFactory", "src/timeline/MiniGantt"], function (DataFactory, MiniGantt) {
                    callback(new MiniGantt()
                        .columns(["Label", "start", "end"])
                        .timePattern("%Y-%m-%d")
                        .tickFormat("%H:%M")
                        .data(data)
                    );
                });
            },
            WU: function (callback) {
                legacyRequire(["src/comms/Workunit", "src/timeline/MiniGantt"], function (Workunit, MiniGantt) {
                    var wu = Workunit.attach({ baseUrl: "http://192.168.3.22:8010" }, "W20171002-073414");
                    wu.fetchDetails({ AttributeToReturn: { Measure: "ts" } }).then(function (scopes) {
                        const data = [];
                        scopes.forEach(function (scope) {
                            scope.CAttributes.forEach(function (attr) {
                                data.push([scope.Name || scope.Id || attr.Name || scope.ScopeType, attr.Formatted, attr.FormattedEnd]);
                            });
                        });
                        callback(new MiniGantt()
                            .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                            .tickFormat("%H:%M")
                            .data(data)
                        );
                    });
                });
            }
        }
    };
}));
