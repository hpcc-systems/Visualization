"use strict";
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.test_layoutFactory = factory();
    }
}(this, function () {
    function random_datetime_string() {
        const yyyy = 2004 + Math.floor(Math.random() * 15);
        const mm = 1 + Math.floor(Math.random() * 12);
        const dd = 1 + Math.floor(Math.random() * 28);
        const hh = 1 + Math.floor(Math.random() * 23);
        const min = 1 + Math.floor(Math.random() * 59);
        const sec = 0 + Math.floor(Math.random() * 59);
        return `${yyyy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}T${hh < 10 ? '0' + hh : hh}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}.0Z`;
    }
    function random_datetime_ranges(n) {
        return Array(n).fill("").map((row, row_idx) => {
            const d1 = random_datetime_string();
            const d2 = random_datetime_string();
            const icon = ["", "", ""][Math.floor(Math.random() * 3)];
            return new Date(d1) - new Date(d2) > 0 ? [`Random Range #${row_idx}`, d2, d1, icon] : [`Random Range #${row_idx}`, d1, d2, icon];
        });
    }
    function random_datetime_events(n) {
        return Array(n).fill("").map((row, row_idx) => {
            return [`Random Event #${row_idx}`, random_datetime_string()];
        });
    }
    return {
        MiniGantt: {
            simple: function (callback) {
                legacyRequire(["src/timeline/MiniGantt"], function (MiniGantt) {
                    let _data = random_datetime_ranges(20);
                    _data = _data.concat(random_datetime_events(20).map(n=>n.concat([undefined, -300 * Math.random()])));
                    callback(new MiniGantt()
                        .columns(["Label", "start", "end", "yoffset"])
                        .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                        .tickFormat('%Y %m %d')
                        .yOffsetColumn("yoffset")
                        .eventGroupOffset(0)
                        .data(_data)
                    );
                });
            },
            heavy: function (callback) {
                legacyRequire(["test/DataFactory", "src/timeline/MiniGantt"], function (DataFactory, MiniGantt) {
                    callback(new MiniGantt()
                        .columns(["Label", "start", "end"])
                        .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                        .tickFormat("%b,%Y")
                        .data(random_datetime_ranges(300))
                    );
                });
            },
            only_ranges: function (callback) {
                legacyRequire(["test/DataFactory", "src/timeline/MiniGantt"], function (DataFactory, MiniGantt) {
                    callback(new MiniGantt()
                        .columns(["Label", "start", "end"])
                        .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                        .data(random_datetime_ranges(20))
                    );
                });
            },
            only_events: function (callback) {
                legacyRequire(["test/DataFactory", "src/timeline/MiniGantt"], function (DataFactory, MiniGantt) {
                    let _data = random_datetime_events(20);
                    callback(new MiniGantt()
                        .columns(["Label", "start", "end", "yoffset"])
                        .eventGroupOffset(0)
                        .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                        .yOffsetColumn("yoffset")
                        .tickFormat("%b, %Y")
                        .data(_data.map(n=>n.concat([undefined,-300 * Math.random()])))
                    );
                });
            },
            one_event: function (callback) {
                legacyRequire(["test/DataFactory", "src/timeline/MiniGantt"], function (DataFactory, MiniGantt) {
                    callback(new MiniGantt()
                        .columns(["Label", "start", "end"])
                        .timePattern("%Y-%m-%dT%H:%M:%S.%LZ")
                        .data(random_datetime_events(1))
                    );
                });
            },
            emperors: function (callback) {
                legacyRequire(["test/DataFactory", "src/timeline/MiniGantt"], function (DataFactory, MiniGantt) {
                    //["name","birth","death","birth.cty","birth.prv","rise","reign.start","reign.end","cause","killer","dynasty","era"]
                    let icon_map = {
                        "Assassination": "",
                        "Captivity": "",
                        "Died in Battle": "",
                        "Execution": "",
                        "Natural Causes": "",
                        "Suicide": "",
                        "Unknown": ""
                    };
                    let color_map = {
                        "Constantinian": "#eb2f06",//15 de55039
                        "Flavian": "#079992",//6 p
                        "Gordian": "#3c6382",//22 p
                        "Julio-Claudian": "#4b6584",//5 p
                        "Nerva-Antonine": "#60a3bc",//7 p
                        "Severan": "#6a89cc",//8 p
                        "Theodosian": "#e58e26",//1 p
                        "Valentinian": "#e55039",//4 d
                    };
                    let _data = [];
                    _data.push([
                        "Principate",
                        "0001-01-01",
                        // "0284-01-01",
                        undefined,
                        "",
                        "#0c2461"
                    ]);
                    _data.push([
                        "Dominate",
                        "0285-01-01",
                        // "0395-01-17",
                        undefined,
                        "",
                        "#b71540"
                    ]);
                    _data = _data.concat(DataFactory.Emperors.data.map(row => {
                        let dynasty = row[10];
                        let cause = row[8];
                        return [
                            row[10],
                            row[6],
                            // row[7], 
                            undefined,
                            icon_map[cause],
                            color_map[dynasty]
                        ];
                    }));
                    _data.push()
                    callback(new MiniGantt()
                        .columns(["Label", "Range Start", "Range End", "FA Icon Char", "Color"])
                        .timePattern("%-Y-%m-%d")
                        .tickFormat("AD %-Y")
                        .data(_data)
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
