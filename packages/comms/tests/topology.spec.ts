import { describe, it, expect } from "vitest";

import { Topology } from "@hpcc-js/comms";
import { ESP_URL } from "./testLib.ts";

describe("@hpcc-js/comms-Topology", function () {
    const topology = Topology.attach({ baseUrl: ESP_URL });

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
            const promises: Promise<void>[] = [];
            for (const targetCluster of response) {
                if (targetCluster.Type === "ThorCluster") {
                    promises.push(targetCluster.fetchMachines({
                        GetStorageInfo: true,
                        LocalFileSystemsOnly: true
                    }).then(() => {
                    }));
                }
            }
            return Promise.all(promises);
        });
    });
});
