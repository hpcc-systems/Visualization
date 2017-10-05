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
                        .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                        .tickFormat("%H:%M")
                        .data([
                            ["Start", "2016-07-01T09:12:15.0Z"],
                            ["item-1", "2016-07-01T09:10:00.0Z", "2016-07-01T09:45:00.0Z"],
                            ["item-2", "2016-07-01T11:00:00.0Z", "2016-07-01T12:00:00.0Z"],
                            ["item-3", "2016-07-01T09:20:00.0Z", "2016-07-01T12:20:00.0Z"],
                            ["item-3a", "2016-07-01T09:21:00.0Z", "2016-07-01T12:11:00.0Z"],
                            ["item-3b", "2016-07-01T09:22:00.0Z", "2016-07-01T12:12:00.0Z"],
                            ["item-3c", "2016-07-01T09:23:00.0Z", "2016-07-01T12:13:00.0Z"],
                            ["item-3d", "2016-07-01T09:24:00.0Z", "2016-07-01T12:14:00.0Z"],
                            ["item-3e", "2016-07-01T09:25:00.0Z", "2016-07-01T12:15:00.0Z"],
                            ["item-4", "2016-07-01T09:15:00.0Z", "2016-07-01T12:20:00.0Z"],
                            ["item-6", "2016-07-01T10:00:00.0Z", "2016-07-01T10:50:00.0Z"],
                            ["item-7", "2016-07-01T10:30:01.0Z", "2016-07-01T10:40:00.0Z"],
                            ["10 O'Clock", "2016-07-01T10:00:00.0Z"],
                            ["11 O'Clock", "2016-07-01T11:00:00.0Z"],
                            ["12 O'Clock", "2016-07-01T12:00:00.0Z"],
                            ["Finish", "2016-07-01T12:30:45.0Z"]
                        ])
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
