import { expect } from "chai";

import { SashaService } from "@hpcc-js/comms";
import { ESP_URL } from "../testLib";

describe("WsSasha", function () {
    it("basic", function () {
        const service = new SashaService({ baseUrl: ESP_URL });
        expect(service).exist;
    });
});
