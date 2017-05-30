var hpccLoader = window["@hpcc-js/loader"];
//var require = hpccLoader.amd("./node_modules/@hpcc-js", { "test": "../test" }, "../../node_modules");
var require = window["@hpcc-js/loader"].bundle("../packages");
require(["@hpcc-js/other", "@hpcc-js/marshaller"], function (hpccOther, hpccMarshaller) {
    var Comms = hpccOther.Comms;
    var Marshaller = hpccMarshaller.HTML;
    var myUrl = new Comms.ESPUrl()
        .url(document.URL)
        ;
    var newUrl = null;
    if (myUrl._params["Wuid"]) {
        newUrl = new Comms.WsWorkunits()
            .protocol((myUrl._params["Protocol"] || "http") + ":")
            .hostname(myUrl._params["Hostname"])
            .port(myUrl._params["Port"])
            .wuid(myUrl._params["Wuid"])
            .resultName(myUrl._params["ResultName"])
            ;
    } else if (myUrl._params["QueryID"]) {
        newUrl = new Comms.WsECL()
            .protocol((myUrl._params["Protocol"] || "http") + ":")
            .hostname(myUrl._params["Hostname"])
            .port(myUrl._params["Port"])
            .target(myUrl._params["Target"])
            .query(myUrl._params["QueryID"])
            ;
    }
    if (newUrl) {
        var garph = new Marshaller()
            .target("placeholder")
            .ddlUrl(newUrl.constructUrl())
            // .layout("Hierarchy")
            .render()
            ;
    }
});

