import { describe, expect, it, vi } from "vitest";

vi.mock("../src/Comms.ts", () => {
    function Basic(this: any) { }
    Basic.prototype.url = function (url?: string) {
        if (url !== undefined) {
            this._url = url;
            return this;
        }
        return this._url;
    };
    function ESPUrl() { }
    ESPUrl.prototype.url = function () { return this; };
    return { Basic, ESPUrl };
});

const { createResult } = await import("../src/ESP.ts");

describe("Roxie results", () => {
    it("filters string values while ignoring trailing spaces", async () => {
        const query = createResult("", "http://example.test/query") as any;
        const matchingRow = { name: "alpha   " };
        query.jsonp = async () => ({ QueryResponse: { Row: [matchingRow, { name: "beta" }] } });

        expect(await query.query({}, { name: "alpha " })).toEqual([matchingRow]);
    });
});