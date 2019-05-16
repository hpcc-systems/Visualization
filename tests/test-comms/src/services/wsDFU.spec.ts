import { expect } from "chai";

import { DFUService } from "@hpcc-js/comms";
import { ESP_URL, isTravis } from "../testLib";

describe("WsDFU", function () {
    this.timeout(5000);
    it("basic", function () {
        const service = new DFUService({ baseUrl: ESP_URL });
        expect(service).exist;
        return service.DFUQuery({}).then(response => {
            expect(response).to.exist;
            expect(response.DFULogicalFiles.DFULogicalFile.length).to.be.greaterThan(-1);
            return response;
        });
    });
});
