import { expect } from "chai";

import { Connection, WorkunitsService, WUQuery } from "@hpcc-js/comms";
import { isBrowser } from "@hpcc-js/util";
import { ESP_URL, isCI } from "../testLib";

describe("WsWorkunits", function () {
    describe("POST", function () {
        const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "post" }));
        doTest(wsWorkunits);
    });
    describe("GET", function () {
        const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "get" }));
        doTest(wsWorkunits);
    });
    if (isBrowser) {
        describe("JSONP", function () {
            const wsWorkunits = new WorkunitsService(new Connection({ baseUrl: ESP_URL, type: "jsonp" }));
            doTest(wsWorkunits);
        });
    }
});

function doTest(wsWorkunits: WorkunitsService) {
    let wu: WUQuery.ECLWorkunit;
    it("WUCreate", function () {
        return wsWorkunits.WUCreate().then(response => {
            expect(response).exist;
            expect(response.Workunit).exist;
            wu = response.Workunit;
            return response;
        });
    });
    it("WUQuery", function () {
        return wsWorkunits.WUQuery().then(response => {
            expect(response).exist;
            expect(response.Workunits).exist;
            expect(response.Workunits.ECLWorkunit).to.have.length;
            return response;
        });
    });
    it("WUInfo", function () {
        return wsWorkunits.WUInfo({ Wuid: wu.Wuid }).then(response => {
            expect(response).exist;
            expect(response.Workunit).exist;
            return response;
        });
    });
    if (!isCI) {
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
    it("WUDelete", function () {
        return wsWorkunits.WUAction({ Wuids: [wu.Wuid], WUActionType: "Delete" }).then(response => {
            expect(response).exist;
            expect(response.ActionResults.WUActionResult).exist;
            expect(response.ActionResults.WUActionResult).to.have.length;
            return response;
        });
    });
}
