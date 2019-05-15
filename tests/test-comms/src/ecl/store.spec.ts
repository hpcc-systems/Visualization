import { expect } from "chai";

import { Store } from "@hpcc-js/comms";
import { ESP_URL } from "../testLib";

describe.skip("@hpcc-js/comms-Topology", function () {
    this.timeout(5000);
    const store = Store.attach({ baseUrl: ESP_URL }, "HPCCClientApps", "testing", false);

    it("Basic", function () {
        expect(store).exist;
    });

    it("set/get", function () {
        return store.set("Key001", "42").then(response => {
            return store.get("Key001");
        }).then(response => {
            expect(response).to.equal("42");
            return store.set("Key001", "43");
        }).then(response => {
            return store.get("Key001");
        }).then(response => {
            expect(response).to.equal("43");
        });
    });

    it("delete", function () {
        return store.get("Key001").then(response => {
            expect(response).to.equal("43");
        }).then(response => {
            return store.delete("Key001");
        }).then(response => {
            return store.get("Key001");
        }).then(response => {
            expect(response).to.equal(undefined);
            return store.delete("Key001");
        }).then(response => {
            expect(response).to.equal(undefined);
        });
    });

    const store2 = Store.attach({ baseUrl: ESP_URL }, "HPCCApps", "monitor-testing", false);
    it("monitor", function (done) {
        const handle = store2.monitor(messages => {
            messages.forEach(m => console.log(`${m.key}:  ${m.oldValue} -> ${m.value}`));
            setTimeout(() => {
                handle.release();
                done();
            }, 1000);
        });
        store2.set("Key001", "22").then(() => {
            return store2.set("Key001", "23");
        }).then(() => {
            return store2.set("Key001", "24");
        }).then(() => {
            return store2.set("Key001", "25");
        }).then(() => {
            return store2.set("Key001", "26");
        }).then(() => {
            return store2.set("Key001", "27");
        }).then(() => {
            return store2.set("Key001", "28");
        }).then(() => {
            return store2.set("Key001", "29");
        });
        store2.set("Key007", "22").then(() => {
            return store2.set("Key007", "23");
        }).then(() => {
            return store2.set("Key007", "24");
        }).then(() => {
            return store2.set("Key007", "25");
        }).then(() => {
            return store2.set("Key007", "26");
        }).then(() => {
            return store2.set("Key007", "27");
        }).then(() => {
            return store2.set("Key007", "28");
        }).then(() => {
            return store2.set("Key007", "29");
        }).then(() => {
            return store2.set("Key007", "30");
        }).then(() => {
            return store2.set("Key007", "31");
        }).then(() => {
            return store2.delete("Key007");
        });
    });
});
