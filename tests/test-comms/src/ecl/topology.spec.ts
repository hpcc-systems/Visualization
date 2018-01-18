import { expect } from "chai";

import { Topology } from "@hpcc-js/comms";
import { ESP_URL } from "../testLib";

describe("@hpcc-js/comms-Topology", function () {
    this.timeout(5000);
    const topology = new Topology({ baseUrl: ESP_URL });

    it("Basic", function () {
        expect(topology).exist;
    });

    it("GetESPServiceBaseURL", function () {
        return topology.GetESPServiceBaseURL("ws_ecl").then(response => {
            expect(response).is.string;
            expect(response).has.length;
        });
    });

    it("Target Clusters", function () {
        return topology.fetchTargetClusters().then(response => {
            const promises = [];
            for (const targetCluster of response) {
                if (targetCluster.Type === "ThorCluster") {
                    promises.push(targetCluster.fetchMachines({
                        GetStorageInfo: true,
                        LocalFileSystemsOnly: true
                    }).then(machines => {
                    }));
                }
            }
            return Promise.all(promises);
        });
    });
});
