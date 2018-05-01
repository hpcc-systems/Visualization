import { expect } from "chai";

import { Query } from "@hpcc-js/comms";
import { ESP_URL } from "../testLib";

describe("test/esp/ecl/query", function () {
    it.skip("basic", async function () {
        const query: Query = await Query.attach({ baseUrl: ESP_URL }, "roxie", "peopleaccounts.4");
        const resultNames = await query.resultNames();
        expect(resultNames.length).to.be.greaterThan(0);
        for (const resultName of resultNames) {
            const fields = await query.resultFields(resultName);
            expect(fields).has.length;
            expect(fields.length).to.be.greaterThan(0);
        }
    });
    it.skip("requestSchema", async function () {
        const query = await Query.attach({ baseUrl: ESP_URL }, "roxie", "peopleaccounts.4");
        const fields = query.requestFields();
        expect(fields.length).to.be.greaterThan(0);
    });
});
