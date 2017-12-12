import { Scatter } from "@hpcc-js/chart";
import { Utility, WidgetArray, } from "@hpcc-js/common";
import { Connection } from "@hpcc-js/comms";
import { Table } from "@hpcc-js/dgrid";
import { Form, Input, Slider } from "@hpcc-js/form";
import { GMapGraph } from "@hpcc-js/map";
import { select as d3Select } from "d3-selection";
import { timeFormat as d3TimeFormat, timeParse as d3TimeParse } from "d3-time-format";

const params: any = Utility.urlParams();
const demomode = params.demomode !== undefined ? params.demomode : true;
const detailsCache = {};

export class Main {
    baseUrlXXX = "http://10.239.190.101:8002/WsEcl/forms/default/query/myroxie_dataland";
    connWeCare = new Connection({ baseUrl: "http://10.241.100.159:8002/WsEcl/submit/query/roxie", type: "jsonp" });
    // this.connPersonAddresses = Comms.createESPConnection(baseUrl + "/personaddresses");
    // this.connPersonToLocations = Comms.createESPConnection(baseUrl + "/personstolocations")
    googleMaps = new Connection({ baseUrl: "https://maps.googleapis.com/maps/api", type: "get" });
    dateFormatterYm = d3TimeFormat("%Y%m");
    dateFormatterYmd = d3TimeFormat("%Y%m%d");
    dateParser = d3TimeParse("%Y-%m-%d");

    formZip1;
    formZip2;
    formZip3;
    form;

    addressChart;
    addressTable;
    addressMarkers = [];

    peopleTable;
    addressMap;

    mainRequest;

    individuals;
    individualIdx;

    individualAddresses;
    debugTable;

    constructor() {
    }

    clear() {
        d3Select("#mapPage q strong").text("Address History");
        d3Select("#addressPage q strong").text("Address History");
        this.peopleTable.data([]).render();
        this.addressChart.regions([]).data([]).render();
        this.addressTable.data([]).render();
        this.syncSelection(null, []);
        this.addressMap.data([]).zoomToFit();
        this.loadDebugTable([]);
        return this;
    }

    cleanAddress(address, callback) {
        this.googleMaps.send("geocode/json", {
            address
        }).then(function (response) {
            if (response.results.length) {
                callback({
                    address: response.results[0].formatted_address,
                    zip: response.results[0].address_components.filter(function (item, idx) {
                        if (item.types.indexOf("postal_code") >= 0) {
                            return true;
                        }
                        return false;
                    }).map(function (item, idx) {
                        return item.short_name;
                    })[0],
                    lat: response.results[0].geometry.location.lat,
                    lng: response.results[0].geometry.location.lng
                });
            }
            callback({});
        });
    }

    formatAddr(input, radius) {
        const context = this;
        if (input.__hpcc_address && input.__hpcc_address.address === input.value() && input.__hpcc_radius === radius) {
            return;
        }
        input.__hpcc_radius = radius;
        if (input.__hpcc_marker) {
            input.__hpcc_marker.setMap(null);
            input.__hpcc_marker = null;
        }
        if (input.__hpcc_circle) {
            input.__hpcc_circle.setMap(null);
            input.__hpcc_circle = null;
        }
        this.cleanAddress(input.value(), function (response) {
            if (response.address) {
                input.value(response.address).render();
                input.__hpcc_address = response;
                input.__hpcc_marker = context.addressMap.createMarker(response.lat, response.lng, { fillColor: context.addressChart._palette(input.name()), title: input.__hpcc_address.address });
                input.__hpcc_circle = context.addressMap.createCircle(response.lat, response.lng, { fillColor: context.addressChart._palette(input.name()), radius });
            }
            context.refreshLocations();
        });
    }

    formatDate(input) {
        this.refreshLocations();
    }

    refreshLocations = Utility.debounce(function () {
        const request = this.form.values();
        const regions = [];
        const context = this;
        function formatZipDate(id, _zipDate, _range) {
            const range = +_range;
            if (_zipDate && range) {
                const zipX1 = context.dateParser(_zipDate);
                const zipX2 = context.dateParser(_zipDate);
                zipX1.setMonth(zipX1.getMonth() - range);
                zipX2.setMonth(zipX2.getMonth() + range);
                return {
                    colorID: id,
                    x0: context.dateFormatterYmd(zipX1),
                    x1: context.dateFormatterYmd(zipX2)
                };
            }
            return null;
        }
        if (request.zip1Date) {
            regions.push(formatZipDate("zip1", request.zip1Date, request.zip1DateRange));
        }
        if (request.zip2Date) {
            regions.push(formatZipDate("zip2", request.zip2Date, request.zip2DateRange));
        }
        if (request.zip3Date) {
            regions.push(formatZipDate("zip3", request.zip3Date, request.zip3DateRange));
        }
        this.addressChart
            .regions(regions)
            .render()
            ;
        if (request.zip1 && request.zip1DistRange) {
            this.formatAddr(this.formZip1, request.zip1DistRange);
        }
        if (request.zip2 && request.zip2DistRange) {
            this.formatAddr(this.formZip2, request.zip2DistRange);
        }
        if (request.zip3 && request.zip3DistRange) {
            this.formatAddr(this.formZip3, request.zip3DistRange);
        }
    }, 250);

    initSearch(id) {
        const context = this;
        this.formZip1 = new Input()
            .name("zip1")
            .label("Location 1")
            .type("textarea")
            .value(20007)
            .on("change", function (w) {
                context.refreshLocations();
            })
            ;
        this.formZip2 = new Input()
            .name("zip2")
            .label("Location 2")
            .type("textarea")
            .value(99501)
            .on("change", function (w) {
                context.refreshLocations();
            })
            ;
        this.formZip3 = new Input()
            .name("zip3")
            .label("Location 3")
            .type("textarea")
            .value("")
            .on("change", function (w) {
                context.refreshLocations();
            })
            ;
        this.form = new Form()
            .target(id)
            .inputs([
                new WidgetArray()
                    .content([
                        this.formZip1,
                        new Input()
                            .name("zip1Date")
                            .label("Date")
                            .type("date")
                            .value("2005-10-05")
                            .on("change", function (w) {
                                context.formatDate(w);
                            }),
                        new Input()
                            .name("zip1DateRange")
                            .label("+/- Months")
                            .type("number")
                            .value(4)
                            .on("change", function (w) {
                                context.refreshLocations(w);
                            }),
                        new Input()
                            .name("zip1DistRange")
                            .label("Radius")
                            .type("number")
                            .value(5)
                            .on("change", function (w) {
                                context.refreshLocations(w);
                            })
                    ]), new WidgetArray()
                        .content([
                            this.formZip2,
                            new Input()
                                .name("zip2Date")
                                .label("Date")
                                .type("date")
                                .value("2008-08-24")
                                .on("change", function (w) {
                                    context.formatDate(w);
                                }),
                            new Input()
                                .name("zip2DateRange")
                                .label("+/- Months")
                                .type("number")
                                .value(4)
                                .on("change", function (w) {
                                    context.refreshLocations(w);
                                }),
                            new Input()
                                .name("zip2DistRange")
                                .label("Radius")
                                .type("number")
                                .value(5)
                                .on("change", function (w) {
                                    context.refreshLocations(w);
                                })
                        ]), new WidgetArray()
                            .content([
                                this.formZip3,
                                new Input()
                                    .name("zip3Date")
                                    .label("Date")
                                    .type("date")
                                    .value("")
                                    .on("change", function (w) {
                                        context.formatDate(w);
                                    }),
                                new Input()
                                    .name("zip3DateRange")
                                    .label("+/- Months")
                                    .type("number")
                                    .value(4)
                                    .on("change", function (w) {
                                        context.refreshLocations(w);
                                    }),
                                new Input()
                                    .name("zip3DistRange")
                                    .label("Radius")
                                    .type("number")
                                    .value(5)
                                    .on("change", function (w) {
                                        context.refreshLocations(w);
                                    })
                            ]),
                (new Slider()
                    .name("radius") as Slider)
                    .label("Location Radius")
                    .low(1)
                    .high(50)
                    .step(1)
                    .value(3),
                (new Slider()
                    .name("age") as Slider)
                    .label("Age (18-100)")
                    .low(18)
                    .high(100)
                    .step(1)
                    .allowRange(true)
                    .value([35, 50])
            ])
            .showSubmit(true)
            .omitBlank(true)
            .on("clear", function (request) {
                context.clear();
            }).on("click", function (request) {
                context.clear();
                context.refreshLocations();
                const data = JSON.stringify(context.form.data());
                localStorage.setItem("formData", data);

                context.mainRequest = {};
                const locations = [];
                function parseDate(address, date, _range, prefix, dateId) {
                    const range = +_range;
                    if (address && address.zip && date && range) {
                        context.mainRequest[prefix] = address.zip;
                        const zipDate = new Date(date);
                        context.mainRequest[dateId] = context.dateFormatterYmd(zipDate);
                        const from = new Date(date);
                        const to = new Date(date);
                        from.setMonth(zipDate.getMonth() - range);
                        to.setMonth(zipDate.getMonth() + range);
                        context.mainRequest[prefix + "lowyyyymm"] = context.dateFormatterYm(from);
                        context.mainRequest[prefix + "highyyyymm"] = context.dateFormatterYm(to);
                        locations.push("" + address.lat + " " + address.lng + "," + context.dateFormatterYmd(zipDate));
                    }
                }
                parseDate(context.formZip1.__hpcc_address, request.zip1Date, request.zip1DateRange, "zip1", "date1");
                parseDate(context.formZip2.__hpcc_address, request.zip2Date, request.zip2DateRange, "zip2", "date2");
                parseDate(context.formZip3.__hpcc_address, request.zip3Date, request.zip3DateRange, "zip3", "date3");
                context.mainRequest.radius = request.radius;
                context.mainRequest.agelow = request.age[0];
                context.mainRequest.agehigh = request.age[1];
                context.mainRequest.demomode = demomode;
                context.mainRequest.bestfitmax = 10;
                const tmp = JSON.stringify(context.mainRequest);
                console.log(tmp);
                // @ts-ignore
                const newRequestXXX = {
                    "zip1": "19146", "date1": "19980101", "zip1lowyyyymm": "199703", "zip1highyyyymm": "199811", "zip2": "80528", "date2": "20020101",
                    "zip2lowyyyymm": "200103", "zip2highyyyymm": "200211", "radius": 10, "agelow": 40, "agehigh": 55, "demomode": false, "bestfitmax": 10
                };
                context.connWeCare.send("wecares.serialoffenderfinderservice/json", newRequestXXX/*context.mainRequest*/).then(function (response) {
                    const bestFit = response["wecares.serialoffenderfinderserviceResponse"].Results.BestFit.Row;
                    context.loadDebugTable(bestFit);
                    context.individuals = [];
                    context.individualIdx = {};
                    const dedupAddresses = {};
                    context.individualAddresses = {};
                    bestFit.forEach(function (row) {
                        if (!context.individualIdx[row.did]) {
                            context.individualIdx[row.did] = context.individuals.length;
                            context.individualAddresses[row.did] = [];
                            context.individuals.push(row);
                        }
                        const addr_id = row.rawaid + "_" + row.first_seen + "_" + row.last_seen;
                        if (!dedupAddresses[addr_id]) {
                            dedupAddresses[addr_id] = true;
                            context.individualAddresses[row.did].push(row);
                        }
                    });
                    context.loadPersonTable(context.individuals);
                });
            })
            .render(function (w) {
                const data = null; // localStorage.getItem("formData");
                if (data) {
                    w.data(JSON.parse(data));
                }
                context.refreshLocations();
            })
            ;
    }

    initPeople(id) {
        const context = this;
        this.peopleTable = new Table()
            .target(id)
            .columns(["Name", "Score", "# Crims", "Details", "Lex ID"])
            .on("click", function (row, col, sel) {
                try {
                    context.syncSelection(context.peopleTable, [row]);
                } catch (e) {
                }
            })
            .render()
            ;
    }

    loadPersonTable(_people) {
        const context = this;
        this.peopleTable
            .data(_people.map(function (row) {
                return [row.name, row.score, row.crim_records, context.individualAddresses[row.did].length, row.did, row];
            }))
            .render()
            ;
    }

    initAddressMap(id: string) {
        this.addressMap = new GMapGraph()
            .target(id)
            .render()
            ;
    }

    loadAddressMap(_addresses) {
        this.addressMap
            .data(_addresses.map(function (row) {
                return [+row.geo_lat, +row.geo_long];
            }))
            .zoomToFit()
            ;
    }

    initAddressTable(id) {
        const context = this;
        this.addressTable = new Table()
            .target(id)
            .columns(["Address", "Dist. 1", "Dist. 2", "Dist. 3", "Seen"])
            // .multiSelect(false)
            .on("click", function (row) {
                context.syncSelection(context.addressTable, [row.__lparam]);
            })
            .render()
            ;
    }

    formatAddressTableData(_addresses) {
        return _addresses.map(function (row, idx) {
            return [row.address, row.locationgeodistance_1, row.locationgeodistance_2, row.locationgeodistance_3, row.first_seen + "->" + row.last_seen, row];
        });
    }

    loadAddressTable(_addresses) {
        this.addressTable
            .data(this.formatAddressTableData(_addresses))
            .render()
            ;
    }

    initAddressChart(id) {
        const context = this;
        this.addressChart = new Scatter()
            .target(id)
            .paletteID("Set1")
            .interpolate("catmullRom")
            .xAxisType("time")
            .xAxisTypeTimePattern("%Y%m%d")
            .xAxisDomainLow("19700101")
            .xAxisDomainHigh("20180101")
            .yAxisTitle("Miles")
            .yAxisTickCount(4)
            .yAxisType("pow")
            .yAxisTypePowExponent(1 / 3)
            .columns(["Date", "zip1", "zip2", "zip3"])
            .selectionMode(true)
            .on("selection", function (selection) {
                context.syncSelection(context.addressChart, selection);
            })
            .render()
            ;
    }

    loadAddressChart(details) {
        this.addressChart
            .data(details.map(function (row) {
                return ["" + row.first_seen + "15", row.locationgeodistance_1, row.locationgeodistance_2, row.locationgeodistance_3, row];
            }))
            .resetSelection()
            .render()
            ;
    }

    fetchDetails(did) {
        if (detailsCache[did]) {
            return Promise.resolve(detailsCache[did]);
        }
        this.mainRequest.did = did;
        return this.connWeCare.send("wecares.serialoffenderdetailsservice/json", this.mainRequest).then(function (response) {
            detailsCache[did] = response["wecares.serialoffenderdetailsserviceResponse"].Results.Results.Row;
            return detailsCache[did];
        });
    }

    syncSelection(sourceWidget, selection) {
        const context = this;
        this.addressMarkers = this.addressMarkers.filter(function (marker) {
            marker.setMap(null);
            marker = null;
            return false;
        });
        switch (sourceWidget) {
            case this.peopleTable:
                if (selection.length) {
                    const row = selection[0];
                    if (row) {
                        d3Select("#mapPage q strong").text(row.Name);
                        d3Select("#addressPage q strong").text(row.Name);
                        this.fetchDetails(row.__lparam.did).then(function (details) {
                            const addresses = details.map(function (addrRow) {
                                context.addressMarkers.push(context.addressMap.createMarker(addrRow.geo_lat, addrRow.geo_long, { fillColor: "green", title: addrRow.address }, true));
                                return addrRow;
                            });
                            context.loadAddressTable(addresses);
                            context.loadAddressMap(addresses);
                            context.loadAddressChart(addresses);
                        });
                    }
                } else {
                    d3Select("#mapPage q strong").text("Address History");
                    d3Select("#addressPage q strong").text("Address History");
                    this.loadAddressTable([]);
                    this.loadAddressMap([]);
                    this.loadAddressChart([]);
                }
                break;

            case this.addressTable:
                const selectionData2 = selection.map(function (row) {
                    context.addressMarkers.push(context.addressMap.createMarker(row.geo_lat, row.geo_long, { fillColor: "green", title: row.address }));
                    return [row.geo_lat, row.geo_long];
                }, this);
                this.addressMap.zoomTo(selectionData2);
                break;

            case this.addressChart:
                const selectionData3 = selection.map(function (row) {
                    const addrRow = row[row.length - 1];
                    if (addrRow.__details) {
                        context.addressMarkers.push(context.addressMap.createMarker(addrRow.geo_lat, addrRow.geo_long, { fillColor: "green", title: addrRow.__details.address }, true));
                    }
                    return addrRow;
                });
                this.loadAddressMap(selectionData3);
                this.loadAddressTable(selectionData3);
                break;
        }
    }

    initDebugTable(id) {
        this.debugTable = new Table()
            .target(id)
            .columns([])
            .data([])
            .pagination(true)
            .on("click", function (row) {
            })
            // .render()
            ;
    }

    loadDebugTable(details) {
        if (details.length === 0) {
            details = [{ "": "" }];
        }
        const columns = [];
        const data = details.map(function (row, idx) {
            const retVal = [];
            for (const key in row) {
                if (idx === 0) {
                    columns.push(key);
                }
                retVal.push(row[key]);
            }
            return retVal;
        });
        this.debugTable
            .columns(columns)
            .data(data)
            .render()
            ;
    }

}
