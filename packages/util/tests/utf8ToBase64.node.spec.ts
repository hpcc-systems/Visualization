import { describe, it, expect } from "vitest";
import { utf8ToBase64 } from "../src/index.ts";

describe("utf8ToBase64", () => {
    it("encodes multi-byte characters", () => {
        const sample = "Привет, 世界 👋";
        const expected = Buffer.from(sample, "utf8").toString("base64");
        expect(utf8ToBase64(sample)).toEqual(expected);
    });

    it("falls back when Buffer is unavailable", () => {
        const sample = "mañana ☀️";
        const expected = Buffer.from(sample, "utf8").toString("base64");
        const original = (globalThis as any).Buffer;
        (globalThis as any).Buffer = undefined;
        try {
            expect(utf8ToBase64(sample)).toEqual(expected);
        } finally {
            (globalThis as any).Buffer = original;
        }
    });
});
