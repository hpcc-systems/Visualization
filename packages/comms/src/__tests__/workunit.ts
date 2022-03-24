import { expect } from "chai";
import { Workunit, WorkunitsService } from "../index.node";

const connection = { baseUrl: "http://localhost:8010/" };

describe("Workunit", () => {
    it("basic", () => {
        expect(Workunit).to.exist;
    });

    it("clone", async () => {
        const wu = await Workunit.create(connection);
        await wu.update({ QueryText: "123;" });
        await wu.submit("thor");
        await wu.watchUntilComplete();
        const newWu = await wu.clone();
        expect(newWu).to.exist;
        await newWu.delete();
        await wu.delete();
    });

    it("ping", async () => {
        const service = new WorkunitsService(connection);
        const pingResponse = await service.Ping();
        expect(pingResponse.result).to.be.true;
    });

    it.skip("query", async () => {
        const wus = await Workunit.query(connection, {});
        expect(wus).to.have.length;
        expect(wus.length).to.be.greaterThan(0);
        const names = await wus[0].fetchServiceNames();
        console.info(names);
    });
});
