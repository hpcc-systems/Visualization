import { expect } from "chai";

import { Connection, WorkunitsService, WUQuery } from "@hpcc-js/comms";

import { ESP_URL, isBrowser, isTravis } from "../testLib";

describe("WsWorkunits", function () {
    describe("POST", function () {
        const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "post" }));
        doTest(wsWorkunits);
    });
    describe("GET", function () {
        const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "get" }));
        doTest(wsWorkunits);
    });
    if (isBrowser()) {
        describe("JSONP", function () {
            const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "jsonp" }));
            doTest(wsWorkunits);
        });
    }
});

function doTest(wsWorkunits: WorkunitsService) {
    let wu: WUQuery.ECLWorkunit;
    it("WUQuery", function () {
        return wsWorkunits.WUQuery().then((response) => {
            expect(response).exist;
            expect(response.Workunits).exist;
            wu = response.Workunits.ECLWorkunit[0];
            return response;
        });
    });
    it("WUInfo", function () {
        return wsWorkunits.WUInfo({ Wuid: wu.Wuid }).then((response) => {
            expect(response).exist;
            expect(response.Workunit).exist;
            return response;
        });
    });
    if (!isTravis()) {
        /*
        it.skip("WUDetails", function () {
            return wsWorkunits.WUDetails({ WUID: wu.Wuid }).then((response) => {
                expect(response).exist;
                expect(response.WUID).to.equal(wu.Wuid);
                return response;
            });
        });
        */
    }
}
