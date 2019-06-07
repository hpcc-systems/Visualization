import { expect } from "chai";

import { Connection, serializeRequest } from "@hpcc-js/comms";
import { isBrowser } from "@hpcc-js/util";
import { ESP_URL, isTravis } from "./testLib";

describe.skip("Old Server", function () {
    it("authentication", function () {
        const transport = new Connection({
            baseUrl: "http://10.240.32.125:8010/",
            userID: "gosmith",
            password: "ch@ng3m3",
            type: "post"
        });
        return transport.send("WsWorkunits/WUQuery.json", {}).then((response) => {
            expect(true).to.be.true;
            return response;
        }).catch((e) => {
            expect(false).to.be.true;
        });
    });
});

describe("SSL", function () {
    it("port 18010", function () {
        const transport = new Connection({
            baseUrl: "https://play.hpccsystems.com:18010/",
            userID: "gosmith",
            password: "",
            type: "post",
            rejectUnauthorized: false
        });
        return transport.send("WsWorkunits/WUQuery.json", {}).then(function (response) {
            expect(true).to.be.true;
            return response;
        }).catch(function (e) {
            expect(false).to.be.true;
        });
    });

    it("port 8010", function () {
        const transport = new Connection({
            baseUrl: "http://play.hpccsystems.com:8010/",
            userID: "gosmith",
            password: "",
            type: "post"
        });
        return transport.send("WsWorkunits/WUQuery.json", {}).then(function (response) {
            expect(true).to.be.true;
            return response;
        }).catch(function (e) {
            expect(false).to.be.true;
        });
    });
});

describe("connection", function () {
    this.timeout(5000);
    it("Error:  no domain", function () {
        const transport = new Connection({ baseUrl: "http://1.1.1.1:8010/", timeoutSecs: 2 });
        return transport.send("no/service", {}).then(() => {
            expect.fail();
        }).catch((e) => {
            expect(e).exist;
        });
    });

    it("Error:  no service", function () {
        const transport = new Connection({ baseUrl: ESP_URL, timeoutSecs: 2 });
        return transport.send("no/service", {}).then(() => {
            expect.fail();
        }).catch((e) => {
            expect(e).exist;
        });
    });

    it.skip("JSONP", function () {
        if (!isTravis && isBrowser) {
            const transport = new Connection({ baseUrl: "http://10.241.100.159:800./wsEcl/submit/query/roxie", type: "jsonp" });
            const request = {
                bestfitmax: 1,
                Date1: "19900613",
                Address1: "1740 Maryland Ave",
                City1: "Charlotte",
                State1: "NC",
                Zip1: "28209",
                Zip1LowYYYYMM: "199002",
                Zip1HighYYYYMM: "199101",
                Date2: "19910829",
                Address2: "1512 Turnstone Ct",
                City2: "Rock Hill",
                State2: "SC",
                Zip2: "29732",
                Zip2LowYYYYMM: "199104",
                Zip2HighYYYYMM: "199204",
                Date3: "19990109",
                Address3: "6147 Garamond Ct",
                City3: "Charlotte",
                State3: "NC",
                Zip3: "28270",
                Zip3LowYYYYMM: "199809",
                Zip3HighYYYYMM: "199908",
                GeoDistanceThreshold: "5",
                demomode: true
            };
            return transport.send("wecares.serialoffenderfinderservice/json", request).then((response) => {
                expect(response).exist;
            });
        }
    });
});

const serialTests = [
    { from: 123, to: "123" },
    { from: "123", to: "123" },
    { from: { n: 123 }, to: "n=123" },
    { from: { s: "123" }, to: "s=123" },
    { from: { n: 123, s: "123" }, to: "n=123&s=123" },

    { from: "1&3", to: "1%263" },
    { from: { n: 123, s: "1&3" }, to: "n=123&s=1%263" },
    { from: { n: 123, c: { n: 123, s: "1&3" } }, to: "n=123&c.n=123&c.s=1%263" },

    { from: { n: 123, a: ["123", "234"] }, to: "n=123&a_i0=123&a_i1=234" },
    { from: { n: 123, a: ["123", "2&4"] }, to: "n=123&a_i0=123&a_i1=2%264" },
    { from: { n: 123, c: { n: 123, s: "1&3", a: ["123", "2&4"] } }, to: "n=123&c.n=123&c.s=1%263&c.a_i0=123&c.a_i1=2%264" },
    { from: { n: 123, c: { n: 123, s: "1&3", c2: { a: ["123", "2&4"] } } }, to: "n=123&c.n=123&c.s=1%263&c.c2.a_i0=123&c.c2.a_i1=2%264" }
];

describe("serializeRequest", function () {
    it.only("basic", function () {
        serialTests.forEach(test => expect(serializeRequest(test.from)).to.deep.equal(test.to));
    });
});
