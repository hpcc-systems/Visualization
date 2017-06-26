import { httpLoad, npmLoad } from "@hpcc-js/loader";
import { expect } from "chai";

describe("@hpcc-js/loader", () => {
    it.skip("npm", function () {
        return npmLoad("@hpcc-js/chart", "@hpcc-js/graph").then(([hpccChart, hpccGraph]) => {
            expect(hpccChart).to.exist;
            expect(hpccGraph).to.exist;
        });
    });
    it("file", function () {
        return httpLoad("file:///C:/Users/gordon/git/hpcc-js/builds/build-all/node_modules/", "@hpcc-js/chart", "@hpcc-js/graph").then(([hpccChart, hpccGraph]) => {
            expect(hpccChart).to.exist;
            expect(hpccGraph).to.exist;
        });
    });
});
