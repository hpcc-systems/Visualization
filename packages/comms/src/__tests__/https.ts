import * as https from "https";
import { ESPConnection } from "../espConnection";
import { WorkunitsService } from "../services/wsWorkunits";
import { trustwave } from "../pem/trustwave";
import { expect } from "chai";

const extraRootAgent = new https.Agent({
    ca: trustwave
});

const acceptUnauthorizedAgent = new https.Agent({
    rejectUnauthorized: false
});

describe("https", () => {
    it("fetch fail", () => {
        let hasResponse = false;
        return fetch("https://play.hpccsystems.com:18010/WsWorkunits/WUQuery.json").then(response => {
            hasResponse = true;
        }).catch(e => {
            return true;
        }).then(() => {
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
