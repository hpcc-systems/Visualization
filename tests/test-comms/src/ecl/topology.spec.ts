import { expect } from "chai";

import { Topology } from "@hpcc-js/comms";
import { ESP_URL } from "../testLib";

describe("test/esp/ecl/Topology", function () {
    it("GetESPServiceBaseURL", function () {
        const topology = new Topology({ baseUrl: ESP_URL });
        return topology.GetESPServiceBaseURL("ws_ecl").then(response => {
            expect(response).is.string;
            expect(response).has.length;
        });
    });
});
