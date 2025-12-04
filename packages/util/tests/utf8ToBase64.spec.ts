import { describe, it, expect } from "vitest";
import { utf8ToBase64 } from "@hpcc-js/util";

describe("utf8ToBase64", () => {
    it("encodes ASCII input", () => {
        expect(utf8ToBase64("hello world"))
            .toEqual("aGVsbG8gd29ybGQ=");
    });

    it("treats nullish values as empty string", () => {
        expect(utf8ToBase64(undefined as unknown as string)).toEqual("");
        expect(utf8ToBase64(null as unknown as string)).toEqual("");
    });

    it("check unicode request characters", () => {
        expect(utf8ToBase64("hello world")).toEqual(btoa("hello world"));
        expect(utf8ToBase64("g@s*!")).toEqual(btoa("g@s*!"));
        expect(utf8ToBase64("~@:!$%^&*()_-;'#***")).toEqual(btoa("~@:!$%^&*()_-;'#***"));
        expect(utf8ToBase64("!$%^&*()_-;'#:@~")).toEqual(btoa("!$%^&*()_-;'#:@~"));
        expect(utf8ToBase64("¬!£$%^&*()_-;'#:@~")).to.not.equal(btoa("¬!£$%^&*()_-;'#:@~"));
    });

    describe("incremental ASCII coverage", () => {
        const printableAscii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join("");
        const checkpoints = [1, 5, 10, 20, 32, 48, 64, 80, 95];
        const cases = checkpoints.map((len) => [len, printableAscii.slice(0, len)] as const);

        it.each(cases)("encodes first %i printable ASCII chars", (_length, sample) => {
            expect(utf8ToBase64(sample)).toEqual(btoa(sample));
        });
    });
});
