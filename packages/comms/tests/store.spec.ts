import { describe, it, expect } from "vitest";

import { Store } from "@hpcc-js/comms";
import { ESP_URL } from "./testLib.ts";

describe("@hpcc-js/comms-Topology", () => {
    it("set_get", async () => {
        const store = Store.attach({ baseUrl: ESP_URL }, "HPCCApps", `testing-${Math.random()}`, false);
        await store.set(`set_get`, "42");
        expect(await store.get("set_get")).to.equal("42");
        await store.set("set_get", "43");
        expect(await store.get("set_get")).to.equal("43");
        await store.delete("set_get");
    });

    it("delete", () => {
        const store = Store.attach({ baseUrl: ESP_URL }, "HPCCApps", `testing-${Math.random()}`, false);
        return store.set("delete", "44").then(response => {
            return store.get("delete");
        }).then(response => {
            expect(response).to.equal("44");
            return store.delete("delete");
        }).then(response => {
            return store.get("delete");
        }).then(response => {
            expect(response).to.equal(undefined);
            return store.delete("delete");
        }).then(response => {
            expect(response).to.equal(undefined);
        });
    });

    it("monitor", () => {
        const store = Store.attach({ baseUrl: ESP_URL }, "HPCCApps", `testing-${Math.random()}`, false);
        return new Promise<void>((done, fail) => {
            const handle = store.monitor(messages => {
                messages.forEach(m => console.log(`${m.key}:  ${m.oldValue} -> ${m.value}`));
                setTimeout(() => {
                    handle.release();
                    done();
                }, 1000);
            });
            store.set("monitor", "22").then(() => {
                return store.set("monitor", "23");
            }).then(() => {
                return store.set("monitor", "24");
            }).then(() => {
                return store.set("monitor", "25");
            }).then(() => {
                return store.set("monitor", "26");
            }).then(() => {
                return store.set("monitor", "27");
            }).then(() => {
                return store.set("monitor", "28");
            }).then(() => {
                return store.set("monitor", "29");
            });
            store.set("monitor-2", "22").then(() => {
                return store.set("monitor-2", "23");
            }).then(() => {
                return store.set("monitor-2", "24");
            }).then(() => {
                return store.set("monitor-2", "25");
            }).then(() => {
                return store.set("monitor-2", "26");
            }).then(() => {
                return store.set("monitor-2", "27");
            }).then(() => {
                return store.set("monitor-2", "28");
            }).then(() => {
                return store.set("monitor-2", "29");
            }).then(() => {
                return store.set("monitor-2", "30");
            }).then(() => {
                return store.set("monitor-2", "31");
            }).then(() => {
                return store.delete("monitor-2");
            });
        });
    });
});
