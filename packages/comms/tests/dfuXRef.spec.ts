import { describe, it, expect } from "vitest";
import { Connection, DFUXRefService } from "@hpcc-js/comms";

describe("DFUXRefService", () => {
    it("basic", () => {
        expect(DFUXRefService).to.exist;
    });

    it.skip("directories", async () => {
        const dfuXRefService = new DFUXRefService(new Connection({ baseUrl: "https://play.hpccsystems.com:18010/", rejectUnauthorized: false }));
        expect(dfuXRefService).to.exist;
        const xrefNodes = await dfuXRefService.DFUXRefListEx({}).then(response => {
            expect(response.DFUXRefListResult).to.exist;
            expect(response.DFUXRefListResult.XRefNode).to.have.length;
            return response.DFUXRefListResult.XRefNode;
        });
        await dfuXRefService.DFUXRefDirectories({ Cluster: xrefNodes[0].Name }).then(response => {
            expect(response.DFUXRefDirectoriesQueryResult).to.exist;
        });
    });

});
