import { expect } from "chai";

import { Query } from "@hpcc-js/comms";
import { ESP_URL } from "../testLib";

describe("test/esp/ecl/query", function () {
    it("basic", async function () {
        const query: Query = await Query.attach({ baseUrl: ESP_URL }, "roxie", "peopleaccounts.1");
        const resultNames = await query.fetchResultNames();
        for (const resultName of resultNames) {
            const schema = await query.fetchResponseSchema(resultName);
            expect(schema).is.string;
            expect(schema).has.length;
        }
    });
    it("requestSchema", async function () {
        const query = await Query.attach({ baseUrl: ESP_URL }, "roxie", "peopleaccounts.1");
        const schema = await query.fetchRequestSchema();
        expect(schema).is.string;
        expect(schema).has.length;
    });
});
