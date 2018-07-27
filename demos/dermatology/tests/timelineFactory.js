"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_layoutFactory = factory();
    }
}(this, function () {
    return {
        MiniGantt: {
            simple: function (callback) {
                legacyRequire(["test/DataFactory", "src/timeline/MiniGantt"], function (DataFactory, MiniGantt) {
                    callback(new MiniGantt()
                        .columns(["Label", "start", "end", "fontColor", "borderColor", "bgColor"])
                        .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                        .eventFontColorColumn("fontColor")
                        .eventBorderColorColumn("borderColor")
                        .eventBackgroundColorColumn("bgColor")
                        .hideDescriptionWhenCollapsed(false)
                        .data([
                            ["Start", "2016-07-01T09:12:15.0Z", undefined, "red", "#ccc", "#f8f8f8"],
                            ["Credit\nFraud", "2016-07-01T11:45:45.0Z", undefined, "black", "#ccc", "#f8f8f8"],
                            ["Credit Fraud", "2016-07-01T11:55:45.0Z", undefined, "black", "#ccc", "#f8f8f8"],
                            ["Finish", "2016-07-01T12:30:45.0Z", undefined, "green", "#ccc", "#f8f8f8"]
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
                        .columns(DataFactory.TimeLine.columns)
                        .timePattern("%Y-%m-%d")
                        .tickFormat("%H:%M")
                        .data(DataFactory.TimeLine.data)
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
