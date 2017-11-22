import { expect } from "chai";
import { endsWith, trim } from "@hpcc-js/util";

describe("String", function () {
    it("endsWith", function () {
        expect(endsWith("abcdef", "f")).true;
        expect(endsWith("abcdef", "ef")).true;
        expect(endsWith("abcdef", "def")).true;
        expect(endsWith("abcdef", "deff")).false;
        expect(endsWith("abcdef", "")).true;
        expect(endsWith("", "")).true;
        expect(endsWith("", "x")).false;
    });
    it("trim", function () {
        expect(trim("abcdefa", "a")).equals("bcdef");
        expect(trim("abcdefa", "b")).equals("abcdefa");
        expect(trim("abcdef", "f")).equals("abcde");
        expect(trim("abcdef", "a")).equals("bcdef");
        expect(trim("abcdef", "")).equals("abcdef");
        expect(trim("", "a")).equals("");
        expect(trim("", "")).equals("");
    });
});
