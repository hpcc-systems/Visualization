import { expect } from "chai";
import { Workunit } from "../index.node";

describe("Workunit", () => {
    it("basic", () => {
        expect(Workunit).to.exist;
    });

    it.skip("query", async () => {
        const wus = await Workunit.query({ baseUrl: "http://localhost:8010/" }, {});
        expect(wus).to.have.length;
        expect(wus.length).to.be.greaterThan(0);
        const names = await wus[0].fetchServiceNames();
        console.log(names);
    });
});
