import { describe, it, expect } from "vitest";

import * as https from "https";
import { ESPConnection, WorkunitsService } from "@hpcc-js/comms";
import { trustwave } from "../src/pem/trustwave.ts";

const extraRootAgent = new https.Agent({
    ca: trustwave
});

const acceptUnauthorizedAgent = new https.Agent({
    rejectUnauthorized: false
});

describe("https", () => {
    it.skip("fetch fail", () => {
        let hasResponse = false;
        return fetch("https://play.hpccsystems.com:18010/WsWorkunits/WUQuery.json").then(() => {
            hasResponse = true;
        }).finally(() => {
            expect(hasResponse).to.be.false;
        });
    });

    it("fetch with trustwave", () => {
        return fetch("https://play.hpccsystems.com:18010/WsWorkunits/WUQuery.json", { agent: extraRootAgent } as any).then(response => {
            return true;
        }).catch(e => {
            throw e;
        });
    });

    it("fetch acceptUnauthorized", () => {
        return fetch("https://play.hpccsystems.com:18010/WsWorkunits/WUQuery.json", { agent: acceptUnauthorizedAgent } as any).then(response => {
            return true;
        }).catch(e => {
            throw e;
        });
    });

    it("generic", () => {
        return fetch("https://jsonplaceholder.typicode.com/todos/1").then(response => {
            return response.json();
        }).then(json => {
            console.info(json);
        }).catch(e => {
            console.info(e.message);
            throw e;
        });

    });

    it("ESPConnection", () => {
        const connection = new ESPConnection({ baseUrl: "https://play.hpccsystems.com:18010/" }, "WsWorkunits", "1.8");
        return connection.send("WUQuery", {}).then(response => {
            return true;
        });
    });

    it("WsWorkunits", () => {
        const service = new WorkunitsService({ baseUrl: "https://play.hpccsystems.com:18010" });
        return service.WUQuery({}).then(response => {
            return true;
        });
    });

});
