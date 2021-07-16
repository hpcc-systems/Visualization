import { expect } from "chai";
import { Workunit } from "../index.node";

const connection = { baseUrl: "http://localhost:8010/" };

describe("Workunit", () => {
    it("basic", () => {
        expect(Workunit).to.exist;
    });

    it.only("clone", async () => {
        const wu = await Workunit.create(connection);
        await wu.update({ QueryText: "123;" });
        await wu.submit("thor");
        await wu.watchUntilComplete();
        const newWu = await wu.clone();
        expect(newWu).to.exist;
        await newWu.delete();
        await wu.delete();
    });

    it.skip("query", async () => {
        const wus = await Workunit.query({ baseUrl: "http://localhost:8010/" }, {});
        expect(wus).to.have.length;
        expect(wus.length).to.be.greaterThan(0);
        const names = await wus[0].fetchServiceNames();
        console.log(names);
    });
});
