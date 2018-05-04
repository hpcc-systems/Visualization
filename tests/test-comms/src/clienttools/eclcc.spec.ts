import { expect } from "chai";
import { isBrowser } from "../testLib";

import { locateClientTools } from "@hpcc-js/comms";

describe("eclcc", function () {
    it.only("basic", function () {
        if (!isBrowser()) {
            expect(locateClientTools).to.be.a("function");
            return locateClientTools().then(clienttools => {
            }).catch(e => {
                //  No eclcc on travis...
            });
        }
    });
});
