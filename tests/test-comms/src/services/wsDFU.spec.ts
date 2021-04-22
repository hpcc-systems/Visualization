import { expect } from "chai";

import { DFUService, Workunit } from "@hpcc-js/comms";
import { ESP_URL } from "../testLib";

describe("WsDFU", function () {
    this.timeout(5000);
    it("basic", function () {
        const service = new DFUService({ baseUrl: ESP_URL });
        expect(service).exist;

        return Workunit.submit({ baseUrl: ESP_URL }, "hthor", "OUTPUT(DATASET([{42, 'Hello and Welcome'}],{INTEGER id, STRING msg}),, '~hpcc-js::test', OVERWRITE);").then((wu) => {
            return wu.watchUntilComplete();
        }).then((wu) => {
            return service.DFUQuery({}).then(response => {
                expect(response).to.exist;
                expect(response.DFULogicalFiles.DFULogicalFile.length).to.be.greaterThan(-1);
                return wu;
            });
        }).then((wu) => {
            return wu.delete();
        });
    });
});
