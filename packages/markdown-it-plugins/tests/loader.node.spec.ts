import { describe, it, expect } from "vitest";
import { DataFile } from "../src/loader.ts";

describe("loader", () => {
    it.skip("penguins.csv", async () => {
        const penguins = await DataFile.attach("../docs/data/penguins.csv")!;
        expect(penguins).to.exist;
        const data = await penguins!.csv();
        expect(data).to.exist;
        expect(data.length).to.be.greaterThan(0);
    });

    it.skip("earthquates.csv", async () => {
        const earthquakes = await DataFile.attach("../docs/data/earthquakes.csv")!;
        expect(earthquakes).to.exist;
        const data = await earthquakes!.csv();
        expect(data).toBeDefined();
        expect(data.length).toBeGreaterThan(0);
    });

    it.skip("preidctions.csv", async () => {
        const predictions = await DataFile.attach("docs/data/predictions.json");
        expect(predictions).toBeDefined();
        const data = await predictions!.json();
        expect(data).toBeDefined();
        expect(Object.keys(data).length).toBeGreaterThan(0);
    });
});