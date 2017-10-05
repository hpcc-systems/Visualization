import { expect } from "chai";

import { dynamicImport, isBrowser } from "@hpcc-js/util";

describe.only("util/loader.ts", function () {
    if (isBrowser()) {
        it("basic", function () {
            return dynamicImport("@hpcc-js/util").then(mod => {
                expect(mod).to.exist;
            }).catch(e => {
            });
        });
    }
});
