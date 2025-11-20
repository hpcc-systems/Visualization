import { describe, it, expect } from "vitest";
import { normalize } from "../src/index.ts";

describe("normalize", () => {

    it("should normalize numeric arrays to 0-1 range", () => {
        const normFunc = normalize();
        expect([...normFunc([0, 5, 10])]).to.deep.equal([0, .5, 1]);
        expect([...normFunc([0, 10, 20])]).to.deep.equal([0, .5, 1]);
        expect([...normFunc([0, 1, 2, 3, 4])]).to.deep.equal([0, .25, .5, .75, 1]);
        expect([...normFunc([0, 10, 20, 30, 40])]).to.deep.equal([0, .25, .5, .75, 1]);
    });

    it("should handle constant values with zero range", () => {
        const normFunc = normalize();
        expect([...normFunc([5, 5, 5, 5])]).to.deep.equal([0, 0, 0, 0]);
    });
});

